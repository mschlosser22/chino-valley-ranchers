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
      // The card is its own artwork now, not the heading's padded parent --
      // that parent is the full-width absolute wrapper, which measured 100%.
      const card=s.querySelector('img[src*="card-agri"]').getBoundingClientRect();
      const secr=s.getBoundingClientRect();
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
              // Mobile readability. The section is laid out from the design's
              // absolute coordinates, which at 390px gave a 237px band and
              // 4.5px body type -- and every width check still passed. Also
              // check the copy has a ground behind it: stacked over bare grass
              // it was unreadable.
              // The stage carries a translateY on desktop to halve the gap
              // below the tear. Applied unscoped it also moved the phone's
              // stacked layout 117px above its own section -- content outside
              // its section, which no width or font check would notice.
              // On desktop the stage is deliberately lifted to halve the gap
              // under the tear, and it overhangs the section's top edge -- the
              // grass behind it is what shows, which is correct. On phones the
              // stage IS the content, so lifting it puts copy over the section
              // above. Only the phone case is a fault.
              stageAbove:(()=>{const st=s.querySelector('.regen-agri-stage');
                if(!st) return null;
                return +(secr.top-st.getBoundingClientRect().top).toFixed(1);})(),
              bodyPx:parseFloat(getComputedStyle(s.querySelector('p')).fontSize),
              copyGround:(()=>{const el=s.querySelector('p');
                const bg=getComputedStyle(el).backgroundColor;
                return bg && bg!=='rgba(0, 0, 0, 0)' && bg!=='transparent';})(),
              overflow:document.documentElement.scrollWidth>innerWidth+1};
    });
    console.log(`\n  --- ${label} (${w}px) ---`);
    ck('"Regenerative" in the script face', m.script==='nexa-rust-script-shad-2', m.script);
    ck('"AGRICULTURE" in DIN Condensed', m.din==='din-condensed', m.din);
    if(w===1440){
      // 64.77%: the design's own card (Layer 2 copy 8, 1344 of the 2075
      // artboard). The old 62.7% was measured off a screenshot.
      ck('card at design width', Math.abs(m.cardPct-64.77)<1.5, `${m.cardPct}% vs 64.77%`);
      ck('sign at design width', Math.abs(m.signPct-24.2)<1.5, `${m.signPct}% vs 24.2%`);
      ck('sign aspect matches', Math.abs(m.signAspect-1.39)<0.05, `${m.signAspect}`);
    }
    if(m.stageAbove!==null && w<768)
      ck('stacked content stays inside its section', m.stageAbove<=1, `${m.stageAbove}px above`);
    ck('body copy is readable', m.bodyPx>=13, `${m.bodyPx}px`);
    if(w<768) ck('copy has a ground behind it on phones', m.copyGround);
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
