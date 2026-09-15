const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// The white above section 7's heading, measured to the BURLAP'S LAST PAINTED
// ROW rather than to section 6's bottom edge. Those are ~160px apart at 1440:
// the burlap mask's bottom tear starts at row 997 of 1262, so the last fifth
// of that element is transparent by design. A box-based check read 41px and
// passed while the client was looking at 200px of blank paper -- exactly the
// measurement that hid the defect, so this one samples pixels.
//
// Burlap is tan (r noticeably above b); white paper is neutral. Finding the
// lowest tan row is what locates the visible edge.
(async()=>{
  const b=await chromium.launch();
  for(const [w,label] of [[1440,'desktop'],[1100,'narrow desktop'],[768,'tablet'],[390,'mobile']]){
    const p=await b.newContext({viewport:{width:w,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
    await p.waitForTimeout(1200);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const h6=[...document.querySelectorAll('h2')].find(e=>/highest standards/i.test(e.textContent));
      const s6=h6.closest('section');
      const h7=[...document.querySelectorAll('h2')].find(e=>/what makes/i.test(e.textContent));
      const rg=document.createRange(); rg.selectNodeContents(h7);
      // Every piece of section 6's artwork the lift could collide with.
      const art=['roc-logo','ann-certified','hen-standing']
        .map(k=>s6.querySelector(`img[src*="${k}"]`)).filter(Boolean)
        .map(e=>e.getBoundingClientRect()).filter(r=>r.width>0);
      return {s6top:Math.round(s6.getBoundingClientRect().top+scrollY),
              s6bottom:Math.round(s6.getBoundingClientRect().bottom+scrollY),
              inkTop:Math.round(rg.getBoundingClientRect().top+scrollY),
              artBottom: art.length?Math.round(Math.max(...art.map(r=>r.bottom+scrollY))):null};
    });
    const top = m.s6top + Math.round((m.s6bottom-m.s6top)*0.55);
    const height = Math.min(700, m.inkTop-top+220);
    const buf = await p.screenshot({clip:{x:0,y:top,width:w,height},fullPage:true});
    // Decoded in the page rather than with a PNG library: the repo has no
    // image dependency and a QA script is not a reason to add one. The data
    // URL is same-origin so the canvas stays untainted.
    const lowestTan = await p.evaluate(({b64,height}) => new Promise(res => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = img.width; c.height = img.height;
        c.getContext('2d').drawImage(img,0,0);
        const d = c.getContext('2d').getImageData(0,0,img.width,img.height).data;
        let lowest = null;
        for (let y=0;y<img.height;y++){
          let tan=0;
          for (let x=0;x<img.width;x++){
            const i=(y*img.width+x)*4;
            // r >= g as well as r > b. Burlap is warm (239,214,188) so red
            // leads both. The green heading's antialiasing against white
            // gives (177,203,153): r-b is 24, which passed a red-vs-blue test
            // alone, and 44% of that row cleared the threshold -- so the
            // check located the "tear" at the heading's own letters, 193px
            // BELOW the ink it was measuring against, and reported a negative
            // gap on a correct layout.
            if (d[i]-d[i+2] > 18 && d[i] > 170 && d[i] >= d[i+1]) tan++;
          }
          if (tan/img.width > 0.25) lowest = y;
        }
        res(lowest===null ? null : lowest/(img.height/height));
      };
      img.onerror = () => res(null);
      img.src = 'data:image/png;base64,'+b64;
    }), {b64: buf.toString('base64'), height});
    const tearY = lowestTan===null ? null : top + lowestTan;
    console.log(`\n  --- ${label} (${w}px) ---`);
    ck('the burlap tear is visible above this section', tearY!==null);
    if (tearY!==null){
      const gap = Math.round(m.inkTop - tearY);
      // The client asked for "about 40 pixels" at desktop. Narrower screens
      // keep the ungated stack and run larger, which is correct -- the lift
      // only applies from 1100px.
      // Every width, not just desktop. This used to assert only `gap > 0`
      // below 1100px, on the grounds that narrow screens kept an unlifted
      // stack -- so when the client reported ~105px of dead white at 390 the
      // suite was green. Narrow screens have their own lift now and hold the
      // same ~40px target.
      ck('heading ink sits ~40px below the visible tear', gap>=15 && gap<=70,
         `${gap}px below the tear`);
    }
    // The lift must never pull the white band over section 6's own artwork.
    // At an ungated -15.5vw this failed at 390 (-3px) while every desktop
    // measurement was green.
    if (tearY !== null && m.inkTop - tearY > 6) {
      // The band between the tear and the heading must be EMPTY. Box-based
      // clearance is useless here: section 6's hen runs to 97% of the
      // section's height on a phone, so comparing boxes reports a collision
      // at every narrow width even though the tear crops the hen well above
      // the heading. That false reading nearly had me revert a correct fix.
      // This samples the rendered pixels instead.
      const band = await p.screenshot({clip:{x:0, y:Math.ceil(tearY)+2, width:w,
                                             height:Math.max(1,Math.floor(m.inkTop-tearY)-4)},
                                       fullPage:true});
      const painted = await p.evaluate(({b64}) => new Promise(res => {
        const img=new Image();
        img.onload=()=>{
          const cv=document.createElement('canvas');
          cv.width=img.width; cv.height=img.height;
          cv.getContext('2d').drawImage(img,0,0);
          const d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data;
          let n=0,t=0;
          for(let y=0;y<cv.height;y++) for(let x=0;x<cv.width;x+=3){
            const o=(y*cv.width+x)*4; t++;
            if(Math.min(d[o],d[o+1],d[o+2])<232) n++;
          }
          res(t? n/t*100 : 0);
        };
        img.onerror=()=>res(null);
        img.src='data:image/png;base64,'+b64;
      }), {b64: band.toString('base64')});
      if (painted !== null)
        ck('nothing from section 6 hangs into the gap', painted < 1.5,
           `${painted.toFixed(1)}% of the band is painted`);
    }
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
