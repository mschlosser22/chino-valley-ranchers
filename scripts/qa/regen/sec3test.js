const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const [w,label] of [[1440,'desktop'],[390,'mobile']]){
    const p=await b.newContext({viewport:{width:w,height:1100},deviceScaleFactor:2}).then(c=>c.newPage());
    const bad=[];
    p.on('response',r=>{if(r.status()>=400&&/images\/regen/.test(r.url()))bad.push(r.url().split('/').pop())});
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    await p.waitForTimeout(2200);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const h=[...document.querySelectorAll('h2')].find(e=>/agriculture/i.test(e.textContent));
      const s=h.closest('section');
      const spans=[...h.querySelectorAll('span')];
      const card=h.parentElement.getBoundingClientRect();
      const signLink=s.querySelector('a[href="/products"]');
      const sign=s.querySelector('img[src*="sign-purchase"]');
      const sr=sign.getBoundingClientRect();
      const grass=s.querySelector('img[src*="grass"]');
      return {script:getComputedStyle(spans[0]).fontFamily.split(',')[0].replace(/["']/g,''),
              din:getComputedStyle(spans[1]).fontFamily.split(',')[0].replace(/["']/g,''),
              cardPct:+(card.width/innerWidth*100).toFixed(1),
              signPct:+(sr.width/innerWidth*100).toFixed(1),
              signAspect:+(sr.width/sr.height).toFixed(2),
              isLink:!!signLink, signAlt:sign.getAttribute('alt'),
              grassOK:grass&&grass.complete&&grass.naturalWidth>0,
              burst:!!s.querySelector('img[src*="burst"]'),
              carton:!!s.querySelector('img[src*="carton"]'),
              ann:!!s.querySelector('img[src*="ann-getem"]'),
              overflow:document.documentElement.scrollWidth>innerWidth+1};
    });
    console.log(`\n  --- ${label} (${w}px) ---`);
    ck('"Regenerative" in the script face', m.script==='nexa-rust-script-shad-2', m.script);
    ck('"AGRICULTURE" in DIN Condensed', m.din==='din-condensed', m.din);
    if(w===1440){
      ck('card at design width', Math.abs(m.cardPct-62.7)<1.5, `${m.cardPct}% vs 62.7%`);
      ck('sign at design width', Math.abs(m.signPct-24.2)<1.5, `${m.signPct}% vs 24.2%`);
      ck('sign aspect matches', Math.abs(m.signAspect-1.39)<0.05, `${m.signAspect}`);
    }
    ck('sign is a real link to /products', m.isLink);
    ck('sign carries its wording as alt text', /purchase our organic/i.test(m.signAlt||''), m.signAlt);
    ck('grass ground loads', m.grassOK);
    ck('carton present', m.carton);
    ck('burst present', m.burst);
    ck('"Get em here!" annotation present', m.ann);
    ck('no broken regen assets', bad.length===0, bad.join(','));
    ck('no horizontal overflow', !m.overflow);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
