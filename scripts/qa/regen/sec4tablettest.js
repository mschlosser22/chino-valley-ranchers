const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// Section 4's card between 768 and 1036 -- review item WI-12.
//
// In this range the card's type has floors (so it stays readable), but the
// floors broke the design's proportions: "THE NEXT" hit its 24px floor while
// "Generation" kept scaling, so the script's 1.31x lead over it fell to
// 1.12-1.14x; the content was packed at the top of the card (17.7px above,
// 119.4px below at 1024); and the hen divider sat on the paragraph's first
// line. sec4test only runs at 390 and 1440, so none of this was measured.
(async()=>{
  const b=await chromium.launch();
  for(const w of [768,900,1024,1036,1060,1100]){
    const p=await b.newContext({viewport:{width:w,height:1000},deviceScaleFactor:1}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(50);}
    await p.waitForTimeout(1000);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const st=document.querySelector('.regen-next-stage');
      const sp=[...st.querySelectorAll('h2 span')];
      const ink=el=>{const rg=document.createRange();rg.selectNodeContents(el);return rg.getBoundingClientRect();};
      const card=st.querySelector('img[src*="card-next"]').getBoundingClientRect();
      const div=st.querySelector('img[src*="hen-divider"]').getBoundingClientRect();
      const para=ink(st.querySelector('p'));
      return {ratio:+(ink(sp[1]).width/ink(sp[0]).width).toFixed(2),
              topInset:+(ink(sp[0]).top-card.top).toFixed(1),
              botInset:+(card.bottom-para.bottom).toFixed(1),
              divClear:+(para.top-div.bottom).toFixed(1)};
    });
    console.log(`  --- ${w}px ---`);
    ck(`${w}: script line leads by the design's 1.31x`, Math.abs(m.ratio-1.31)<=0.08, `${m.ratio}x`);
    // Two regimes. 768-1036 is the tablet block this item rebalances, held
    // to 1.5x. Above 1036 the card is on the design's own coordinates, and
    // the design itself carries ~1.6x more space below the content than
    // above (47.4 / 75.8px at 1440, 63.5 / 101.3 at 1920), so it is held to
    // that proportion instead -- 1100 sat at 6.8x before this block was
    // narrowed, with the divider on the paragraph.
    const tablet = w<=1036;
    ck(`${w}: content balanced in the card`, m.botInset<=(tablet?1.5:1.7)*m.topInset,
       `${m.topInset}px above, ${m.botInset}px below (${(m.botInset/m.topInset).toFixed(2)}x, limit ${tablet?1.5:1.7}x)`);
    ck(`${w}: hen divider clear of the paragraph`, m.divClear>=(tablet?3:2), `${m.divClear}px`);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
