const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// The pre-footer's top seam must be a TORN edge, not a straight cut.
//
// Measured from rendered pixels: the first non-white row per column. A clean
// cut gives the same row in every column; a rip wanders. The asset's own
// profile is 56px deep at 2075 wide, which renders ~39px at 1440.
//
// Two traps this has already fallen into:
//  - The page's dark nav bar sits at the top of any full-page crop and reads
//    as "non-white" in every column, which made a broken seam measure as
//    perfectly uniform. It is skipped explicitly.
//  - The section is pulled up by its own tear depth, so the seam lies ABOVE
//    the section's box top. Cropping from the box top measures solid
//    photograph and reports zero wander whatever the seam looks like.
(async()=>{
  const b=await chromium.launch();
  // 2200 and 2560 matter specifically: above 2075px the section's min-height
  // clamps at 622 while the width keeps growing, so `cover` scales by width
  // and crops the surplus height. That is the only regime where a vertical
  // `center` anchor can shear the tear flat, and nothing below 2075 exercises it.
  for(const [w,label] of [[2560,'ultrawide'],[2200,'wide'],[1440,'desktop'],[1100,'narrow desktop'],[768,'tablet'],[390,'mobile']]){
    const p=await b.newContext({viewport:{width:w,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
    const bad=[];
    p.on('response',r=>{if(r.status()>=400&&/images\/regen/.test(r.url()))bad.push(r.url().split('/').pop())});
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
    await p.waitForTimeout(1000);

    const g=await p.evaluate(()=>{
      const s=document.querySelector('.regen-prefooter-section');
      const cs=getComputedStyle(s);
      const prev=s.previousElementSibling;
      return {top:Math.round(s.getBoundingClientRect().top+scrollY),
              height:Math.round(s.getBoundingClientRect().height),
              bg:cs.backgroundImage,
              z:cs.zIndex,
              prevZ:prev?getComputedStyle(prev).zIndex:null,
              marginTop:parseFloat(cs.marginTop)};
    });

    console.log(`\n  --- ${label} (${w}px) ---`);
    // The tear lives in the photograph's own alpha, as in sections 4-6. A
    // JPEG cannot carry one, which is why the seam was a hard line.
    ck('the pre-footer photo is the torn (alpha) asset',
       /prefooter-bg\.webp/.test(g.bg), g.bg.slice(0,60));
    // It must paint ABOVE the band it tears into. Section 7's lift wrapper is
    // z-index 2; at 1 the white simply covered the torn rows.
    ck('the pre-footer paints above the band it tears into',
       g.prevZ === 'auto' || Number(g.z) > Number(g.prevZ),
       `z ${g.z} vs previous ${g.prevZ}`);
    ck('the section is pulled up over the band above', g.marginTop < 0, `${g.marginTop}px`);

    // Now the pixels. Crop from above the section's box top, since the tear
    // sits in the lifted region.
    // The window must clear the tear's deepest trough, not just its peaks.
    // At |marginTop| + 40 it cut the troughs off and capped every reading at
    // ~24px: at 2560 that failed a seam whose real wander is 68px. The rip is
    // 56/622 of the section's height, so take twice that plus the lift.
    const cropTop = g.top - Math.ceil(Math.abs(g.marginTop)) - 12;
    const height = Math.ceil(Math.abs(g.marginTop)) + Math.ceil(56 / 622 * g.height * 2) + 24;
    const buf = await p.screenshot({clip:{x:0,y:cropTop,width:w,height},fullPage:true});
    const wander = await p.evaluate(({b64,w,height}) => new Promise(res=>{
      const img=new Image();
      img.onload=()=>{
        const cv=document.createElement('canvas');
        cv.width=img.width; cv.height=img.height;
        cv.getContext('2d').drawImage(img,0,0);
        const d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data;
        const px=(x,y)=>{const o=(y*cv.width+x)*4; return [d[o],d[o+1],d[o+2]];};
        // Find the SEAM, not merely the first non-white pixel. Whatever sits
        // in the band above -- the sticky nav on wide viewports, the "BETTER
        // EGGS FOR YOU" line on a phone -- is also non-white, and taking the
        // first dark row per column measured that text instead: the seam read
        // as 0px of wander at 390px while rendering a perfectly good tear.
        //
        // The photograph is the only thing here that is opaque all the way
        // down to the bottom of the crop. So scan each column UPWARD from the
        // last row and stop at the first white pixel: that boundary is the
        // torn edge, and text floating above it cannot be mistaken for it.
        const firsts=[];
        for(let x=0;x<cv.width;x+=4){
          let f=0;
          for(let y=cv.height-1;y>=0;y--){
            const c=px(x,y);
            if(Math.min(...c)>=225){f=y+1;break;}
          }
          firsts.push(f);
        }
        const lo=Math.min(...firsts), hi=Math.max(...firsts);
        const q=firsts.length>>2;
        const quarterMins=[0,1,2,3].map(i=>Math.min(...firsts.slice(i*q,(i+1)*q))/2);
        res({wanderCss:(hi-lo)/2, quarterMins});
      };
      img.onerror=()=>res(null);
      img.src='data:image/png;base64,'+b64;
    }), {b64: buf.toString('base64'), w, height});

    // A uniform minimum across the width means the tear's peaks are being
    // clipped by a straight edge -- the section's own top. Overall wander
    // does NOT catch this: at 2200 the rip still measured 27-42px per quarter
    // while every quarter's minimum sat at exactly row 65, which is the flat
    // border the client reported.
    if (wander && wander.quarterMins) {
      const mins = wander.quarterMins;
      const spread = Math.max(...mins) - Math.min(...mins);
      ck('the tear is not clipped flat by the section edge',
         spread > 1.5, `quarter minima ${mins.map(v=>v.toFixed(0)).join('/')} (spread ${spread.toFixed(1)}px)`);
    }
    if (wander) {
      // The asset's rip wanders 56 rows of a 622-tall image. What reaches the
      // screen is that fraction of the section's own height, NOT a fraction of
      // the viewport width: above 2075px the height clamps at 622 while the
      // width keeps growing, so scaling by width overstated the expectation
      // (69px against a correctly-rendered 24px) and failed a good page.
      const expected = 56 / 622 * g.height;
      ck('the seam is torn, not a straight cut',
         wander.wanderCss > expected * 0.45,
         `${wander.wanderCss.toFixed(0)}px of wander (this section's height gives ~${expected.toFixed(0)})`);
    } else {
      ck('the seam could be measured', false);
    }
    ck('no broken regen assets', bad.length===0, bad.join(','));
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
