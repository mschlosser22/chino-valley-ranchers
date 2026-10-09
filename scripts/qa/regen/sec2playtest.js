const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// The video's play control -- review item WI-3.
//
// Its position and size came from artboard percentages applied to the frame
// (see sec2test), which left it 24.9px wide at 360 -- far under a 44px thumb
// target -- with a 1px ring, and at 1440 the "Hear Chris" arrow ended 33px
// above and 45px right of it, pointing at the treeline.
(async()=>{
  const b=await chromium.launch();
  for(const w of [360,390,768,1440]){
    const p=await b.newContext({viewport:{width:w,height:900},deviceScaleFactor:2}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(50);}
    await p.waitForTimeout(1000);
    const m=await p.evaluate(()=>{
      const btn=document.querySelector('button[aria-label*="Play"]');
      const fr=btn.parentElement.getBoundingClientRect(), r=btn.getBoundingClientRect();
      // The visible ring is whichever of the button and its descendants
      // carries the white border.
      // Only WHITE borders count: the play triangle is drawn with transparent
      // borders, and counting those read the 1px ring as 3px.
      const ring=Math.max(0,...[btn,...btn.querySelectorAll('*')].map(e=>{
        const cs=getComputedStyle(e);
        return /rgb\(255, 255, 255\)/.test(cs.borderTopColor)?parseFloat(cs.borderTopWidth)||0:0;}));
      const arrow=document.querySelector('img[src*="arrow-hear"]');
      let tip=null;
      if(arrow && getComputedStyle(arrow).display!=='none'){
        const a=arrow.getBoundingClientRect();
        // The arrow runs down-left: its tip is the box's bottom-left corner.
        const dx=Math.max(r.left-a.left, 0, a.left-r.right), dy=Math.max(r.top-a.bottom, 0, a.bottom-r.bottom);
        tip={dist:+Math.hypot(dx,dy).toFixed(1), frameW:fr.width};
      }
      return {w:+r.width.toFixed(1), h:+r.height.toFixed(1),
              centre:+(((r.top+r.bottom)/2-fr.top)/fr.height*100).toFixed(1), ring, tip};
    });
    console.log(`  --- ${w}px ---`);
    ck(`${w}: play control is a 44px thumb target`, m.w>=44&&m.h>=44, `${m.w}x${m.h}`);
    // Layer 77's centre: (1600+83.5-1314)/698 = 52.9% down the frame.
    ck(`${w}: ring centred where the design puts it`, Math.abs(m.centre-52.9)<=2, `${m.centre}% vs 52.9%`);
    ck(`${w}: ring stroke at least 2px`, m.ring>=2, `${m.ring}px`);
    // In the design the arrow's tip (Shape 4 copy 4, bottom-left at 1172,1672)
    // sits 11px right of the ring at the ring's own height -- 1% of the frame.
    // 2.5% leaves room for rasterisation; a 10%-of-frame limit passed the
    // misplaced arrow at both 768 and 1440.
    if(m.tip) ck(`${w}: "Hear Chris" arrow ends at the ring`, m.tip.dist<=m.tip.frameW*0.025,
                 `${m.tip.dist}px away (limit ${(m.tip.frameW*0.025).toFixed(0)})`);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
