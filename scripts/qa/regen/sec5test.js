const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const [w,label] of [[1440,'desktop'],[390,'mobile']]){
    const p=await b.newContext({viewport:{width:w,height:900},deviceScaleFactor:2}).then(c=>c.newPage());
    const bad=[];
    p.on('response',r=>{if(r.status()>=400&&/images\/regen/.test(r.url()))bad.push(r.url().split('/').pop())});
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(70);}
    await p.waitForTimeout(1400);
    const m=await p.evaluate(()=>{
      const s=document.querySelector('img[src*="row-barn"]').closest('section');
      const grid=s.querySelector('.grid');
      const imgs=[...s.querySelectorAll('img')];
      const top=[...grid.children];
      const cols=top.map(c=>+(c.getBoundingClientRect().width/innerWidth*100).toFixed(1));
      const stack=top.find(c=>c.tagName==='DIV');
      return {topLevel:top.length, cols,
              stacked: stack? stack.querySelectorAll('img').length : 0,
              total:imgs.length,
              allLoaded:imgs.every(i=>i.complete&&i.naturalWidth>0),
              allAlt:imgs.every(i=>(i.getAttribute('alt')||'').length>8),
              uniqueAlt:new Set(imgs.map(i=>i.getAttribute('alt'))).size,
              heights:[...new Set(top.map(c=>Math.round(c.getBoundingClientRect().height)))],
              overflow:document.documentElement.scrollWidth>innerWidth+1};
    });
    console.log(`\n  --- ${label} (${w}px) ---`);
    ck('four top-level columns', m.topLevel===4, `${m.topLevel}`);
    ck('column two holds two stacked photos', m.stacked===2, `${m.stacked}`);
    ck('five photographs in total', m.total===5, `${m.total}`);
    if(w===1440){
      const want=[25.2,13.3,14.4,47.1];
      ck('columns at the design fractions',
         m.cols.every((c,i)=>Math.abs(c-want[i])<1.2), m.cols.join(' / '));
      ck('all columns share one band height', m.heights.length===1, m.heights.join(','));
    }
    ck('every photo loads', m.allLoaded);
    ck('every photo has real alt text', m.allAlt);
    ck('alt text is not duplicated', m.uniqueAlt===m.total, `${m.uniqueAlt}/${m.total} unique`);
    ck('no broken regen assets', bad.length===0, bad.join(','));
    ck('no horizontal overflow', !m.overflow);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
