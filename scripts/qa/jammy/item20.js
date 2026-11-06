const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// Format Versatility: "Every hour is golden hour." needs room above it.
// QA: "Increase padding above ... The headline is too close the section above
// it."
//
// This section follows the features band, which ends in a hard photographic
// edge -- so the heading had no visual breathing space at all. Figma's 54px
// (node 1:332) put the heading's INK 49px below that edge, because padding is
// measured to the em box and the cap height starts ~5px lower.
//
// Measured against the band's edge rather than the section's padding value:
// padding alone would not have caught this, and it is the visible gap QA
// reported.
(async()=>{
  const b=await chromium.launch();
  for(const [w,label,min] of [[1920,'wide',80],[1440,'desktop',80],[1024,'narrow desktop',56],[768,'tablet',44],[390,'phone',44]]){
    const p=await b.newContext({viewport:{width:w,height:1000}}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
    await p.waitForTimeout(600);

    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const h=[...document.querySelectorAll('h2')].find(e=>/every hour is golden hour/i.test(e.textContent));
      if(!h) return null;
      const sec=h.closest('section');
      const prev=sec.previousElementSibling;
      const rg=document.createRange(); rg.selectNodeContents(h);
      const ink=rg.getBoundingClientRect();
      const body=sec.querySelector('p');
      return {
        gapFromBandEdge: prev ? Math.round(ink.top - prev.getBoundingClientRect().bottom) : null,
        inkFromSectionTop: Math.round(ink.top - sec.getBoundingClientRect().top),
        paddingTop: getComputedStyle(sec).paddingTop,
        paddingBottom: getComputedStyle(sec).paddingBottom,
        headingToBody: body ? Math.round(body.getBoundingClientRect().top - ink.bottom) : null,
        prevIsFeatures: prev ? /jammy-features-section/.test(prev.className) : false,
      };
    });

    console.log(`\n  --- ${label} (${w}px) ---`);
    if(!m){ ck('golden hour heading found', false); await p.close(); continue; }
    ck('it still follows the features band', m.prevIsFeatures);
    // The number that matters: ink to the band's hard edge. Was 49px at
    // desktop, which QA called too close.
    ck('the headline has room below the band',
       m.gapFromBandEdge>=min, `${m.gapFromBandEdge}px of clear space (need >=${min})`);
    // Guard the other direction too -- this should not become a chasm.
    ck('the gap is not excessive', m.gapFromBandEdge<=140, `${m.gapFromBandEdge}px`);
    // Figma's 56px below the tiles is unchanged; only the top moved.
    ck('bottom padding left at the design value',
       parseFloat(m.paddingBottom)<=56, `${m.paddingBottom}`);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
