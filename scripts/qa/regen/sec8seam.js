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
  for(const [w,label] of [[1440,'desktop'],[1100,'narrow desktop'],[768,'tablet'],[390,'mobile']]){
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
    const cropTop = g.top - Math.ceil(Math.abs(g.marginTop)) - 12;
    const height = Math.ceil(Math.abs(g.marginTop)) + 40;
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
        res({wanderCss:(hi-lo)/2});
      };
      img.onerror=()=>res(null);
      img.src='data:image/png;base64,'+b64;
    }), {b64: buf.toString('base64'), w, height});

    if (wander) {
      // The asset's rip is 56px of a 2075-wide image, so it scales with the
      // viewport. Require most of it to survive rendering.
      const expected = 56 * w / 2075;
      ck('the seam is torn, not a straight cut',
         wander.wanderCss > expected * 0.45,
         `${wander.wanderCss.toFixed(0)}px of wander (asset would give ~${expected.toFixed(0)})`);
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
