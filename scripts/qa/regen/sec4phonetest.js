const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// Section 4 (The Next Generation) on phones -- review item WI-7.
//
// The stacked phone block put the paper ground straight under the section's
// top, so the hens photograph -- the point of the section -- showed as a 31px
// strip. The heading's ranking had also inverted: in the design the script
// "Generation" is 1.31x the width of "THE NEXT"; on phones it was 0.79x.
// Body type ran 14px at 360 and grew uncapped to 29.9px at 767.
(async()=>{
  const b=await chromium.launch();
  for(const w of [360,390,430,767]){
    const p=await b.newContext({viewport:{width:w,height:900},deviceScaleFactor:1}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(50);}
    await p.waitForTimeout(1000);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const stage=document.querySelector('.regen-next-stage');
      const s=stage.closest('section'); const sb=s.getBoundingClientRect();
      const h=stage.querySelector('h2'), para=stage.querySelector('p');
      const photo=s.querySelector('img[src*="hens-next"]').getBoundingClientRect();
      const sp=[...h.querySelectorAll('span')];
      const ink=el=>{const rg=document.createRange();rg.selectNodeContents(el);return rg.getBoundingClientRect();};
      const lines=(()=>{const rg=document.createRange(); rg.selectNodeContents(para);
        const rows={}; for(const q of rg.getClientRects()){const k=Math.round(q.top); rows[k]=(rows[k]||0)+q.width;}
        return Object.keys(rows).sort((a,b)=>a-b).map(k=>rows[k]);})();
      return {ratio:+(ink(sp[1]).width/ink(sp[0]).width).toFixed(2),
              // Photo visible between the section's top and the heading's ground.
              photoShown:Math.round(Math.min(h.getBoundingClientRect().top,photo.bottom)-Math.max(sb.top,photo.top)),
              pfs:parseFloat(getComputedStyle(para).fontSize),
              lastLine:Math.round(lines[lines.length-1]||0),
              gapBelowPhoto:Math.round(sb.bottom-photo.bottom)};
    });
    console.log(`  --- ${w}px ---`);
    ck(`${w}: script line ranks over the display line`, Math.abs(m.ratio-1.31)<=0.08, `${m.ratio}x vs 1.31x`);
    ck(`${w}: hens photograph shows above the copy`, m.photoShown>=w*0.35, `${m.photoShown}px vs ${(w*0.35).toFixed(0)}`);
    ck(`${w}: body copy 15-17px`, m.pfs>=15&&m.pfs<=17, `${m.pfs}px`);
    ck(`${w}: no one-word last line`, m.lastLine>80, `${m.lastLine}px`);
    ck(`${w}: photo leaves no gap at the bottom`, m.gapBelowPhoto<=1, `${m.gapBelowPhoto}px`);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
