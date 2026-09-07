const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
  await p.waitForTimeout(1500);
  const m=await p.evaluate(()=>{
    const hero=document.querySelector('img[src*="torn-edge"]');
    const masked=[...document.querySelectorAll('div')].filter(d=>{
      const cs=getComputedStyle(d);
      return /edge-white-top/.test(cs.webkitMaskImage||cs.maskImage||'');
    });
    return {heroEdge:!!hero && hero.complete && hero.naturalWidth>0,
            masked:masked.length,
            heights:masked.map(d=>Math.round(d.getBoundingClientRect().height)),
            fills:masked.map(d=>{const cs=getComputedStyle(d);
              return /url/.test(cs.backgroundImage)?'texture':'flat';}),
            // no masked strip should be a zero-height no-op
            allVisible:masked.every(d=>d.getBoundingClientRect().height>10)};
  });
  ck('hero torn edge renders', m.heroEdge);
  ck('three masked torn edges added', m.masked===3, `${m.masked}`);
  ck('every torn edge has real height', m.allVisible, m.heights.join(','));
  ck('two carry their section texture', m.fills.filter(f=>f==='texture').length===2, m.fills.join(','));
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
