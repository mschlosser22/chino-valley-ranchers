// Section 6 at tablet widths (review item WI-13).
// The annotation used to be positioned against the hen's column, so its arrow
// only met the ROC mark at the width it was tuned for: at 768 the tip sat
// 59px ABOVE the mark's "e". It is now positioned against the mark itself.
// The body copy also fell to 13px here, and the burlap's bottom tear (which
// starts 78.5% down the shape, row 997 of 1262) must clear the mark and the
// annotation across the whole range.
const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:768,height:1000}}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const measure=()=>p.evaluate(async()=>{
    await document.fonts.ready;
    const h=[...document.querySelectorAll('h2')].find(e=>/highest standards/i.test(e.textContent));
    const s=h.closest('section'), sr=s.getBoundingClientRect();
    const roc=s.querySelector('img[src*="roc-logo"]').getBoundingClientRect();
    const annEl=s.querySelector('img[src*="ann-certified"]');
    const a=annEl.getBoundingClientRect();
    const shown=getComputedStyle(annEl).display!=='none';
    // Same tip model as sec6test: the tip is 13.2% across and 0.4% down the
    // annotation; the target is 98.2% across and 21% down the mark.
    const tipX=a.left+a.width*0.132, tipY=a.top+a.height*0.004;
    const tgtX=roc.left+roc.width*0.982, tgtY=roc.top+roc.height*0.21;
    const copy=s.querySelector('.regen-standards-copy');
    const cr=copy.getBoundingClientRect();
    return {shown, tipX:Math.round(tipX-tgtX), tipY:Math.round(tipY-tgtY),
      H:sr.height, rocBot:roc.bottom-sr.top, annBot:shown?a.bottom-sr.top:0,
      fs:parseFloat(getComputedStyle(copy).fontSize),
      copyClipped:copy.scrollHeight>copy.clientHeight+1,
      copyBot:cr.bottom-sr.top};
  });
  for(const w of [768,820,900,1024,1440]){
    await p.setViewportSize({width:w,height:1000}); await p.waitForTimeout(250);
    const m=await measure();
    console.log(`\n  --- ${w}px ---`);
    ck(`annotation shown at ${w}`, m.shown);
    ck(`arrow tip at the design's +30,+16 from the mark at ${w}`,
       Math.abs(m.tipX-30)<=14 && Math.abs(m.tipY-16)<=14, `tip +${m.tipX},+${m.tipY}`);
    if(w<1024) ck(`body copy at least 15px at ${w}`, m.fs>=15, `${m.fs}px`);
  }
  console.log('\n  --- sweep 768..1100 ---');
  let worst={r:0};
  for(let w=768;w<=1100;w+=16){
    await p.setViewportSize({width:w,height:1000}); await p.waitForTimeout(150);
    const m=await measure();
    const r=Math.max(m.rocBot,m.annBot)/m.H;
    if(r>worst.r) worst={r,w};
  }
  ck('ROC mark and annotation clear the bottom tear (<= 0.785H) across 768..1100',
     worst.r<=0.785, `worst ${worst.r.toFixed(3)}H at ${worst.w}`);
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
