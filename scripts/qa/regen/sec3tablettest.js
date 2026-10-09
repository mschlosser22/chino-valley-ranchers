const { chromium } = require('playwright');
const sharp = require('sharp');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// Section 3 between the phone layout and desktop -- review item WI-9.
//
// From 768 the section returns to the design's absolute layout, where the
// body copy is 1.574cqw: 12.1px at 768, below anything readable and below
// sec3test's own 13px floor -- which only runs at 390 and 1440, so it never
// saw this range. The copy sits on a torn paper card beside the PURCHASE
// sign, so a larger size has to stay on the card and clear of the sign.
(async()=>{
  const b=await chromium.launch();
  for(const w of [768,800,899,1024,1100]){
    const p=await b.newContext({viewport:{width:w,height:1000},deviceScaleFactor:1}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(50);}
    await p.waitForTimeout(1000);
    await p.evaluate(()=>document.querySelector('.regen-agri-stage p').scrollIntoView({block:'center'}));
    await p.waitForTimeout(400);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const st=document.querySelector('.regen-agri-stage');
      const para=st.querySelector('p');
      const rg=document.createRange(); rg.selectNodeContents(para); const ink=rg.getBoundingClientRect();
      const card=st.querySelector('img[src*="card-agri"]').getBoundingClientRect();
      const sign=st.querySelector('a[href="/products"]').getBoundingClientRect();
      return {fs:parseFloat(getComputedStyle(para).fontSize),
              ink:{l:ink.left,r:ink.right,b:ink.bottom}, cardB:card.bottom,
              clearSign:+(sign.left-ink.right).toFixed(1)};
    });
    // Paper actually PAINTED below the copy. The card image's box runs past
    // its torn bottom edge into transparent rows, so a box-based clearance
    // reads ~40px even where the copy has run onto grass. For each column
    // under the copy, count the paper-coloured rows down from the ink's
    // bottom, and take the shortest.
    {
      const y0=Math.ceil(m.ink.b)+1, h=Math.max(2,Math.ceil(m.cardB-y0)+4);
      const shot=await p.screenshot({clip:{x:Math.floor(m.ink.l),y:y0,width:Math.floor(m.ink.r-m.ink.l),height:h}});
      const {data,info}=await sharp(shot).removeAlpha().raw().toBuffer({resolveWithObject:true});
      let minRun=1e9;
      for(let x=0;x<info.width;x+=3){
        let run=0;
        for(let y=0;y<info.height;y++){const i=(y*info.width+x)*3;
          if(data[i]>225&&data[i+1]>222&&data[i+2]>215) run++; else break;}
        minRun=Math.min(minRun,run);
      }
      m.clearBottom=minRun;
    }
    console.log(`  --- ${w}px ---`);
    ck(`${w}: body copy at least 14px`, m.fs>=14, `${m.fs}px`);
    ck(`${w}: copy stays on the card`, m.clearBottom>=8, `${m.clearBottom}px of paper under the copy`);
    ck(`${w}: copy clear of the PURCHASE sign`, m.clearSign>0, `${m.clearSign}px`);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
