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
    await p.waitForTimeout(2000);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const h1=document.querySelector('h1'); const sec=h1.closest('section');
      // The wordmark is a placed image in the Figma (node 6:2), not live
      // type -- the texture speckle, white outline and shadow are baked in.
      // Measure the artwork, and check the faces on the two text elements
      // that really are type.
      const mark=h1.querySelector('img[src*="hero-wordmark"]');
      const ink=mark.getBoundingClientRect();
      const welcome=[...h1.querySelectorAll('span')].find(s=>
        /welcome to/i.test(s.textContent) && !s.className.includes('sr-only'));
      const hens=[...sec.querySelectorAll('img[src*="hen-"]')];
      // The hero tear is a masked div now, matching how the rest of the
      // site builds page tears (see components/slider/EggSlider.js).
      const edge=[...sec.querySelectorAll('div')].find(d=>
        /regen\/torn-edge/.test(getComputedStyle(d).webkitMaskImage||getComputedStyle(d).maskImage||''));
      const cart=sec.querySelector('img[src*="carton"]');
      return {ff:getComputedStyle(welcome).fontFamily.split(',')[0].replace(/"/g,''),
              pct:+(ink.width/innerWidth*100).toFixed(1),
              hens:hens.length,
              henVisible:hens.filter(h=>h.getBoundingClientRect().width>0).length,
              henLoaded:hens.every(h=>h.complete&&h.naturalWidth>0),
              edgeOK:!!edge&&edge.getBoundingClientRect().height>10,
              cartOK:cart&&cart.complete&&cart.naturalWidth>0,
              overflow:document.documentElement.scrollWidth>innerWidth+1};
    });
    console.log(`\n  --- ${label} (${w}px) ---`);
    ck('"WELCOME TO" in Rockwell, as the node specifies', m.ff==='rockwell', m.ff);
    if(w===1440) ck('wordmark artwork at the node width', Math.abs(m.pct-68)<1.0, `${m.pct}% vs 68%`);
    ck('three hen silhouettes in the markup', m.hens===3, `${m.hens}`);
    ck('hen artwork loads', m.henLoaded);
    if(w===1440) ck('hens visible on desktop', m.henVisible===3, `${m.henVisible}`);
    else ck('hens hidden on phones', m.henVisible===0, `${m.henVisible} visible`);
    ck('torn edge loads', m.edgeOK);
    ck('carton loads', m.cartOK);
    ck('no broken regen assets', bad.length===0, bad.join(','));
    ck('no horizontal overflow', !m.overflow);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
