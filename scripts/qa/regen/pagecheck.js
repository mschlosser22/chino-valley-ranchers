const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const [w,label] of [[1440,'desktop'],[1024,'tablet'],[768,'small tablet'],[390,'phone'],[360,'small phone']]){
    const p=await b.newContext({viewport:{width:w,height:900},deviceScaleFactor:1}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
    await p.waitForTimeout(1200);
    const m=await p.evaluate(()=>{
      const de=document.documentElement;
      // anything sticking out past the viewport
      const wide=[...document.querySelectorAll('body *')].filter(e=>{
        const r=e.getBoundingClientRect();
        return r.width>0 && (r.right>innerWidth+2 || r.left<-2);
      }).slice(0,4).map(e=>e.tagName+'.'+(e.className||'').toString().split(' ')[0].slice(0,24));
      return {overflow:de.scrollWidth>innerWidth+1,
              scrollW:de.scrollWidth, vw:innerWidth,
              wide, height:document.body.scrollHeight};
    });
    console.log(`\n  --- ${label} (${w}px) ---   page ${m.height}px`);
    ck('no horizontal scroll', !m.overflow, m.overflow?`${m.scrollW} > ${m.vw}`:'');
    ck('nothing overhangs the viewport', m.wide.length===0, m.wide.join(', '));
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
