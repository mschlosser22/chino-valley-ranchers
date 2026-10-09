const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// Photo row tiles stay inside the photo grid -- review item WI-2.
//
// Measured against the GRID (the band between the frame's two painted rules),
// not against the frame image. The frame fills the whole section, so a tile
// can sit inside the frame while running 33px past the grid's bottom rule --
// which is what happened on phones: the section holds a 150px floor, the
// grid between the rules is 117px of that at 390, but each tile was a fixed
// 150px tall. sec5test's "photos sit inside the bottom rule" measures the grid
// box itself, which is why the overrun slipped past it. A spot-check that
// measured tiles against the frame image made the same mistake and reported
// 13px.
//
// Also checks the shared close-up photograph actually covers its windows: at
// 360 the window was 150px tall while the background rendered 128.7px, leaving
// a white notch.
(async()=>{
  const b=await chromium.launch();
  for(const w of [360,390,430,768,1440,2400]){
    const p=await b.newContext({viewport:{width:w,height:1000},deviceScaleFactor:1}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(50);}
    await p.waitForTimeout(1000);
    const m=await p.evaluate(()=>{
      const frame=document.querySelector('img[src*="row-frame"]');
      const s=frame.closest('section');
      const grid=[...s.children].find(e=>e.classList.contains('grid'));
      const g=grid.getBoundingClientRect();
      const tiles=[...grid.querySelectorAll('img, [role="img"]')].map(e=>{
        const r=e.getBoundingClientRect();
        return {name:(e.getAttribute('src')||e.getAttribute('aria-label')).split('/').pop().slice(0,24),
                over:Math.max(g.top-r.top, r.bottom-g.bottom)};
      });
      // Shared shot is 1306x734; size is a % of the window width.
      const cover=[...grid.querySelectorAll('[role="img"]')].map(e=>{
        const r=e.getBoundingClientRect(); const cs=getComputedStyle(e);
        const pct=parseFloat(cs.backgroundSize)/100;
        return {rendered:+(r.width*pct*734/1306).toFixed(1), box:+r.height.toFixed(1)};
      });
      return {gridH:+g.height.toFixed(1), tiles, cover};
    });
    console.log(`  --- ${w}px (grid ${m.gridH}px tall) ---`);
    const worst=m.tiles.reduce((a,t)=>t.over>a.over?t:a,{over:-1e9});
    ck(`${w}: every tile inside the photo grid`, worst.over<=1, `worst ${worst.name} ${worst.over.toFixed(1)}px past the grid`);
    const thin=m.cover.filter(c=>c.rendered<c.box-0.5);
    ck(`${w}: shared photograph covers every window`, thin.length===0,
       thin.map(c=>`${c.rendered}px drawn in a ${c.box}px window`).join(', ')||'all covered');
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
