const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const [w,label] of [[1440,'desktop'],[390,'mobile']]){
    const p=await b.newContext({viewport:{width:w,height:1200},deviceScaleFactor:2}).then(c=>c.newPage());
    const bad=[],errs=[];
    p.on('response',r=>{if(r.status()>=400&&/images\/regen/.test(r.url()))bad.push(r.url().split('/').pop())});
    p.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,80))});
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(70);}
    await p.waitForTimeout(1500);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const h=[...document.querySelectorAll('h2')].find(e=>/highest standards/i.test(e.textContent));
      const s=h.closest('section');
      const rg=document.createRange(); rg.selectNodeContents(h);
      const ink=rg.getBoundingClientRect();
      const roc=s.querySelector('img[src*="roc-logo"]');
      const ann=s.querySelector('img[src*="ann-certified"]');
      const hen=s.querySelector('img[src*="hen-standing-photo"]');
      const cs=getComputedStyle(s);
      return {ff:getComputedStyle(h).fontFamily.split(',')[0].replace(/["']/g,''),
              colour:getComputedStyle(h).color,
              headPct:+(ink.width/innerWidth*100).toFixed(1),
              rocPct:+(roc.getBoundingClientRect().width/innerWidth*100).toFixed(1),
              annPct:+(ann.getBoundingClientRect().width/innerWidth*100).toFixed(1),
              rocAlt:roc.getAttribute('alt'),
              rocOK:roc.complete&&roc.naturalWidth>0,
              henOK:hen.complete&&hen.naturalWidth>0,
              tiled:/repeat/.test(cs.backgroundRepeat)&&!/cover/.test(cs.backgroundSize),
              overflow:document.documentElement.scrollWidth>innerWidth+1};
    });
    console.log(`\n  --- ${label} (${w}px) ---`);
    ck('heading in Ultra', m.ff==='Ultra', m.ff);
    ck('heading in design red', m.colour==='rgb(176, 16, 16)', m.colour);
    if(w===1440){
      ck('heading at design width', Math.abs(m.headPct-63.0)<1.5, `${m.headPct}% vs 63.0%`);
      ck('ROC mark at design width', Math.abs(m.rocPct-25.9)<1.5, `${m.rocPct}% vs 25.9%`);
      ck('annotation at design width', Math.abs(m.annPct-11.6)<1.5, `${m.annPct}% vs 11.6%`);
    }
    ck('ROC mark carries its name as alt', /regenerative organic certified/i.test(m.rocAlt||''), m.rocAlt);
    ck('ROC mark loads', m.rocOK);
    ck('hen cut-out loads', m.henOK);
    ck('burlap tiles rather than scaling', m.tiled);
    ck('no console errors on the page', errs.length===0, errs.slice(0,2).join(' | '));
    ck('no broken regen assets', bad.length===0, bad.join(','));
    ck('no horizontal overflow', !m.overflow);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
