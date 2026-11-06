const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// "A Shortcut with Showmanship": every feature icon + label must sit on the
// same line. QA: "'Consistent every time' text + target icon are not lined up
// with the other icons + text blocks."
//
// The icons were sized from each asset's own viewBox, so icon-consistent.svg
// rendered at its native 63x58 against the other nine's 46-47. These icons are
// edge-to-edge ink, so that made it visibly bigger AND pushed its label 12px
// below the rest of its row (72px from the cell top against 60px).
//
// Asserting the LABEL positions rather than the icon sizes: the labels are
// what the eye lines up, and they are what QA reported.
(async()=>{
  const b=await chromium.launch();
  for(const [w,label] of [[1440,'desktop'],[1024,'narrow desktop'],[861,'tablet'],[390,'phone']]){
    const p=await b.newContext({viewport:{width:w,height:1000}}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
    await p.waitForTimeout(700);

    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const feats=[...document.querySelectorAll('.jammy-feature')];
      if(!feats.length) return null;
      const rows=feats.map(f=>{
        const img=f.querySelector('img'), h3=f.querySelector('h3');
        const fr=f.getBoundingClientRect(), ir=img.getBoundingClientRect(), tr=h3.getBoundingClientRect();
        return {label:h3.textContent.trim(),
                file:img.getAttribute('src').split('/').pop(),
                iconH:Math.round(ir.height), iconW:Math.round(ir.width),
                iconBottom:Math.round(ir.bottom-fr.top),
                textTop:Math.round(tr.top-fr.top)};
      });
      return {rows, count:feats.length};
    });

    console.log(`\n  --- ${label} (${w}px) ---`);
    if(!m){ ck('feature list found', false); await p.close(); continue; }

    ck('all ten features present', m.count===10, `${m.count}`);

    // One label baseline for every cell. The defect gave two (60 and 72).
    const tops=[...new Set(m.rows.map(r=>r.textTop))];
    const spread=Math.max(...tops)-Math.min(...tops);
    ck('every label starts on the same line', spread<=1,
       `${tops.length} distinct tops ${JSON.stringify(tops)} (spread ${spread}px)`);

    // And one icon height, so no icon reads heavier than its neighbours.
    const hs=[...new Set(m.rows.map(r=>r.iconH))];
    ck('every icon occupies the same height', hs.length===1, JSON.stringify(hs));

    // The one QA named, called out by name so a failure says which.
    const odd=m.rows.find(r=>/consistent every time/i.test(r.label));
    if(odd){
      const others=m.rows.filter(r=>r!==odd);
      const ref=others[0].textTop;
      ck('"Consistent every time" lines up with the rest',
         Math.abs(odd.textTop-ref)<=1, `its label at ${odd.textTop}px, others at ${ref}px`);
      ck('its target icon is no taller than the others',
         odd.iconH<=Math.max(...others.map(r=>r.iconH)),
         `${odd.iconW}x${odd.iconH} vs others ${Math.max(...others.map(r=>r.iconH))}px tall`);
    } else ck('"Consistent every time" found', false);

    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
