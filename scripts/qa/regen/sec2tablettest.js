// Section 2 from 640 to 1023 (review item WI-14).
// Two defects. From 640 to 767 the "You want more?" annotation was shown
// beside a frame that already fills the width, so 73% of it was clipped off
// the right edge. And at 768 the frame dropped from full width to 62.4% in
// one step -- 38% narrower one pixel later.
const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:640,height:1000}}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const m=()=>p.evaluate(async()=>{
    await document.fonts.ready;
    const more=[...document.querySelectorAll('div[aria-hidden="true"]')].find(e=>/want/i.test(e.textContent)&&/more\?/i.test(e.textContent));
    const shown=getComputedStyle(more).display!=='none';
    // Rendered ink, not the box: the text is rotated.
    const rg=document.createRange(); rg.selectNodeContents(more);
    const right=Math.max(...[...rg.getClientRects()].map(r=>r.right));
    const arrow=document.querySelector('img[src*="arrow-more"]');
    const aShown=getComputedStyle(arrow).display!=='none';
    return {shown, right, aShown, aRight:arrow.getBoundingClientRect().right,
            frame:document.querySelector('.regen-video').getBoundingClientRect().width, iw:innerWidth};
  });
  for(const w of [640,700]){
    await p.setViewportSize({width:w,height:1000}); await p.waitForTimeout(200);
    const r=await m();
    ck(`"You want more?" hidden or inside the viewport at ${w}`, !r.shown || r.right<=r.iw, r.shown?`right ${Math.round(r.right)} of ${w}`:'hidden');
    ck(`its arrow hidden or inside the viewport at ${w}`, !r.aShown || r.aRight<=r.iw, r.aShown?`right ${Math.round(r.aRight)}`:'hidden');
  }
  for(const w of [768,900,1023]){
    await p.setViewportSize({width:w,height:1000}); await p.waitForTimeout(200);
    const r=await m();
    ck(`"You want more?" shown with 8px to spare at ${w}`, r.shown && r.right<w-8, `right ${Math.round(r.right)} of ${w}`);
  }
  let prev=null, worst={d:0};
  for(let w=760;w<=1030;w+=2){
    await p.setViewportSize({width:w,height:1000}); await p.waitForTimeout(60);
    const r=await m();
    if(prev){const d=(prev.f-r.frame)/prev.f; if(d>worst.d) worst={d,w};}
    prev={f:r.frame};
  }
  ck('video frame never narrows more than 2% between adjacent widths (760..1030)',
     worst.d<=0.02, `worst drop ${(worst.d*100).toFixed(1)}% at ${worst.w||'-'}`);
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
