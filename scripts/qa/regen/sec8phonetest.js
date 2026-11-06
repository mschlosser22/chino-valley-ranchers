const { chromium } = require('playwright');
const sharp = require('sharp');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// Pre-footer on phones -- review items WI-5 and WI-6.
//
// WI-5: the pre-footer's photograph is the open carton (asset x0-930 of 2075)
// beside a rebuilt dark ramp for the type. Below 768 it was cropped `right
// top`, which showed only the ramp -- the carton was gone on every phone.
// It is now stacked: the carton fills the width above, the type sits below it
// on solid ground. Checked by SAMPLING PIXELS in the band above the heading,
// not by reading background-position, because the defect is what shows.
//
// WI-6: the headline was smaller than the "BETTER FOR..." lines in section 7
// (0.82x at 390), and the claims wrapped to orphans ("practices." alone).
(async()=>{
  const b=await chromium.launch();
  for(const w of [360,390,430,768]){
    const p=await b.newContext({viewport:{width:w,height:900},deviceScaleFactor:1}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(50);}
    await p.waitForTimeout(1000);
    const sec=p.locator('.regen-prefooter-section');
    await sec.scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
    const m=await sec.evaluate(s=>{
      const h=s.querySelector('h2'); const sb=s.getBoundingClientRect();
      const rg=document.createRange(); rg.selectNodeContents(h); const ink=rg.getBoundingClientRect();
      const better=[...document.querySelectorAll('.regen-diff-better p, body *')].find(e=>e.children.length===0&&/better eggs for you/i.test(e.textContent));
      // Per-line widths, from the client rects of each text node's range.
      const lines=el=>{const r=document.createRange(); r.selectNodeContents(el);
        const rows={}; for(const q of r.getClientRects()){const k=Math.round(q.top); rows[k]=(rows[k]||0)+q.width;}
        return Object.keys(rows).sort((a,b)=>a-b).map(k=>rows[k]);};
      return {h2Top:ink.top-sb.top, vw:innerWidth,
              h2fs:parseFloat(getComputedStyle(h).fontSize),
              betterFs:better?parseFloat(getComputedStyle(better).fontSize):null,
              claimFs:[...s.querySelectorAll('p')].map(x=>parseFloat(getComputedStyle(x).fontSize)),
              wraps:[h,...s.querySelectorAll('p')].map(lines)};
    });
    console.log(`  --- ${w}px ---`);
    if(w<768){
      // Sample the band above the heading: the carton is warm cardboard and
      // egg (R well above B); the ramp it replaced is olive-to-black.
      const box=await sec.boundingBox();
      const bandH=Math.max(1,Math.floor(Math.min(m.h2Top-10, w*0.40)));
      const shot=await p.screenshot({clip:{x:0,y:box.y+Math.round(w*0.06),width:w,height:bandH}});
      const {data,info}=await sharp(shot).removeAlpha().raw().toBuffer({resolveWithObject:true});
      let warm=0,n=0; for(let i=0;i<data.length;i+=3*7){n++; if(data[i]-data[i+2]>40) warm++;}
      ck(`${w}: carton shows above the type`, warm/n>=0.20, `${(warm/n*100).toFixed(0)}% of samples warm`);
      ck(`${w}: type sits below the carton`, m.h2Top>=w*0.66, `heading ink ${m.h2Top.toFixed(0)}px down vs ${(w*0.66).toFixed(0)}`);
      ck(`${w}: claims at body size`, m.claimFs.every(f=>f>=16), m.claimFs.join('/')+'px');
    }
    ck(`${w}: headline leads the BETTER lines`, m.betterFs && m.h2fs/m.betterFs>=1.15,
       `${m.h2fs}px / ${m.betterFs}px = ${(m.h2fs/m.betterFs).toFixed(2)}`);
    if(w!==768){
      const orphan=m.wraps.map(L=>L.length>1?L[L.length-1]/Math.max(...L):1);
      ck(`${w}: no orphaned last lines`, orphan.every(r=>r>=0.40), orphan.map(r=>r.toFixed(2)).join(' / '));
    }
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
