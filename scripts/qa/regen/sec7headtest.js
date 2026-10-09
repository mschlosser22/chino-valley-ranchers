const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// Section 7's heading below 1024 -- review item WI-10.
//
// Under 1024 the three lines were plain vw (7.6 / 15 / 7.6), uncapped. The
// script "Regenerative" reached 153.5px at 1023 and then dropped to the
// desktop size at 1024 -- a 60px jump across one pixel of viewport -- and on
// phones it set wider than the hero's own "Regenerative" wordmark, so the
// page's second heading out-shouted its first.
(async()=>{
  const b=await chromium.launch();
  const size={}, ink={};
  for(const w of [390,768,1023,1024]){
    const p=await b.newContext({viewport:{width:w,height:900},deviceScaleFactor:1}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(50);}
    await p.waitForTimeout(1000);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const sp=[...document.querySelectorAll('.regen-diff-wrap h2 span')];
      const rg=document.createRange(); rg.selectNodeContents(sp[1]);
      return {fs:sp.map(e=>parseFloat(getComputedStyle(e).fontSize)),
              scriptInk:rg.getBoundingClientRect().width,
              wordmark:document.querySelector('img[src*="hero-wordmark"]').getBoundingClientRect().width};
    });
    size[w]=m.fs[1]; ink[w]=m;
    await p.close();
  }
  await b.close();
  console.log(`  script size: ${Object.entries(size).map(([w,v])=>`${w}:${v.toFixed(1)}`).join('  ')}`);
  ck('script capped at 92px at 1023', size[1023]<=92, `${size[1023].toFixed(1)}px`);
  ck('no jump at the 1024 breakpoint', Math.abs(size[1023]-size[1024])<=2,
     `${size[1023].toFixed(1)} -> ${size[1024].toFixed(1)}px`);
  ck('390: section 7 script narrower than the hero wordmark', ink[390].scriptInk<ink[390].wordmark,
     `${ink[390].scriptInk.toFixed(0)}px vs ${ink[390].wordmark.toFixed(0)}px`);
  ck('slab lines at least the page\'s 26px tier on phones', ink[390].fs[0]>=26 && ink[390].fs[2]>=26,
     `${ink[390].fs[0].toFixed(1)} / ${ink[390].fs[2].toFixed(1)}px`);
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
