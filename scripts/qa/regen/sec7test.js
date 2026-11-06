const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const [w,label] of [[1440,'desktop'],[390,'mobile']]){
    const p=await b.newContext({viewport:{width:w,height:1500},deviceScaleFactor:2}).then(c=>c.newPage());
    const bad=[],errs=[];
    p.on('response',r=>{if(r.status()>=400&&/images\/regen/.test(r.url()))bad.push(r.url().split('/').pop())});
    p.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,60))});
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(70);}
    await p.waitForTimeout(1600);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const soil=document.querySelector('img[src*="soil-block"]');
      const s=soil.closest('section');
      const h=s.querySelector('h2'); const sp=[...h.querySelectorAll('span')];
      const mk=el=>{const rg=document.createRange();rg.selectNodeContents(el);return rg.getBoundingClientRect().width;};
      const arrows=[...s.querySelectorAll('img[src*="arr-"]')];
      const h3=[...s.querySelectorAll('h3')];
      const better=[...s.querySelectorAll('p')].filter(e=>/^better for|^better eggs/i.test(e.textContent.trim()));
      return {what:+(mk(sp[0])/innerWidth*100).toFixed(1),
              regen:+(mk(sp[1])/innerWidth*100).toFixed(1),
              diff:+(mk(sp[2])/innerWidth*100).toFixed(1),
              soilPct:+(soil.getBoundingClientRect().width/innerWidth*100).toFixed(1),
              soilAlt:(soil.getAttribute('alt')||'').length,
              soilOK:soil.complete&&soil.naturalWidth>0,
              arrows:arrows.length,
              arrowsVisible:arrows.filter(a=>a.getBoundingClientRect().width>0).length,
              arrowsOK:arrows.every(a=>a.complete&&a.naturalWidth>0),
              titles:h3.length,
              uniqueTitles:new Set(h3.map(e=>e.textContent.trim())).size,
              better:better.length,
              betterUnderlined:better.every(e=>parseFloat(getComputedStyle(e).borderBottomWidth)>=2),
              scriptFace:getComputedStyle(sp[1]).fontFamily.split(',')[0].replace(/["']/g,''),
              overflow:document.documentElement.scrollWidth>innerWidth+1};
    });
    console.log(`\n  --- ${label} (${w}px) ---`);
    ck('script face on "Regenerative"', m.scriptFace==='nexa-rust-script-shad-2', m.scriptFace);
    if(w===1440){
      ck('"WHAT MAKES" at design width', Math.abs(m.what-31.1)<1.5, `${m.what}% vs 31.1%`);
      ck('"Regenerative" at design width', Math.abs(m.regen-45.3)<1.5, `${m.regen}% vs 45.3%`);
      ck('"DIFFERENT?" at design width', Math.abs(m.diff-28.1)<1.5, `${m.diff}% vs 28.1%`);
      // 72.92%, not the 51.6% this asserted before: that figure was measured
      // off a flattened render and is the visible SOIL BLOCK, excluding the
      // sky's transparent margin. The design's artwork node (Farm-minified 1)
      // is 1513 of the 2075 artboard, and its 1513x1029 aspect (1.4704)
      // matches the asset's 1500x1020 (1.4706) exactly, which the 51.6%
      // reading cannot -- at that width the node would be 728px tall, not
      // 1029. The sky has to reach its full width to sit behind the intro
      // copy, which is what the client asked for.
      ck('soil diagram at design width', Math.abs(m.soilPct-72.92)<1.5, `${m.soilPct}% vs 72.92%`);
      ck('four arrows visible', m.arrowsVisible===4, `${m.arrowsVisible}`);
        // Four, not eight: the callouts used to be rendered twice -- one
      // absolutely positioned set and one stacked set, each hidden at the
      // other breakpoint -- so a screen reader announced every topic twice.
      ck('four callout titles, rendered once', m.titles===4, `${m.titles}`);
    } else {
      ck('arrows hidden on phones', m.arrowsVisible===0, `${m.arrowsVisible}`);
    }
    ck('soil diagram carries descriptive alt', m.soilAlt>40, `${m.soilAlt} chars`);
    ck('soil diagram loads', m.soilOK);
    ck('four distinct callout topics', m.uniqueTitles===4, `${m.uniqueTitles}`);
    ck('arrow artwork loads', m.arrowsOK);
    ck('three BETTER lines present', m.better===3, `${m.better}`);
    ck('BETTER lines are underlined', m.betterUnderlined);
    ck('no console errors', errs.length===0, errs.slice(0,2).join(' | '));
    ck('no broken regen assets', bad.length===0, bad.join(','));
    ck('no horizontal overflow', !m.overflow);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
