const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for (const [w,label] of [[1440,'desktop'],[390,'mobile']]) {
    const p=await b.newContext({viewport:{width:w,height:1000}}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(80);}
    await p.waitForTimeout(1200);
    const r=await p.evaluate(()=>{
      const h=document.querySelector('.jammy-curve');
      if(!h) return null;
      const img=h.querySelector('img');
      const bb=h.getBoundingClientRect();
      return {tag:h.tagName, src:img&&img.getAttribute('src'), alt:img&&img.getAttribute('alt'),
              loaded:img?(img.complete&&img.naturalWidth>0):false,
              w:Math.round(bb.width),
              noSvg:!h.querySelector('svg'),
              overflow:document.documentElement.scrollWidth<=window.innerWidth+1};
    });
    console.log(`\n  --- ${label} (${w}px) ---`);
    ck('heading is an h2', r&&r.tag==='H2', r?r.tag:'missing');
    ck('uses the exported lockup', r&&(r.src||'').endsWith('what-is-a-jammy-egg.png'), r?r.src:'');
    ck('artwork loads', r&&r.loaded);
    ck('wording in alt text', r&&r.alt==='What is a jammy egg?', r?r.alt:'');
    ck('textPath removed', r&&r.noSvg);
    ck('no horizontal overflow', r&&r.overflow);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
