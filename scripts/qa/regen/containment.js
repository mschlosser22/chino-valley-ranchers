const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const [w,label] of [[1440,'desktop'],[1024,'tablet'],[390,'phone']]){
    const p=await b.newContext({viewport:{width:w,height:1000},deviceScaleFactor:1}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.waitForTimeout(2000);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      window.scrollTo(0,0);
      const out=[];
      // No decorative element may spill out of its own section. This is what
      // "measured correctly but looks broken" actually looks like in the DOM:
      // the numbers matched their targets while the carton ran 136px past the
      // section and collided with the next heading.
      document.querySelectorAll('section').forEach((sec,i)=>{
        const sb=sec.getBoundingClientRect();
        sec.querySelectorAll('img[src*="/images/regen/"]').forEach(img=>{
          const r=img.getBoundingClientRect();
          if(r.height<4) return;
          // object-fit backgrounds are meant to fill; only overhang of
          // foreground artwork is a defect.
          if(!/carton\.|hen-(standing|peck)/.test(img.getAttribute('src')||'')) return;
          const over=Math.round(r.bottom-sb.bottom);
          if(over>2) out.push({sec:i, src:img.getAttribute('src').split('/').pop(), over});
        });
      });
      // A FOREGROUND element must not cover a heading. Backgrounds sit behind
      // type by design, so only positioned artwork with a z-index counts.
      const clashes=[];
      document.querySelectorAll('h2').forEach(h=>{
        const hb=h.getBoundingClientRect();
        document.querySelectorAll('img[src*="/images/regen/"]').forEach(img=>{
          const cs=getComputedStyle(img);
          if(cs.position==='absolute' && cs.zIndex==='auto') return;  // background layer
          if(!/carton\.|hen-(standing|peck)/.test(img.getAttribute('src')||'')) return;
          const r=img.getBoundingClientRect();
          if(r.height<4) return;
          if(r.bottom>hb.top+4 && r.top<hb.bottom-4 && r.right>hb.left && r.left<hb.right){
            // Record the box overlap; whether it is a real clash is decided
            // below by sampling the rendered pixels. Section 6's hen runs to
            // 97% of its section's height on a phone, so its box reaches
            // section 7's heading, but the burlap's torn edge crops it well
            // above -- a box test alone failed a correct layout.
            clashes.push({label:img.getAttribute('src').split('/').pop()+' over "'+h.textContent.trim().slice(0,22)+'"',
                          x:Math.round(Math.max(r.left,hb.left)),
                          y:Math.round(Math.max(r.top,hb.top)),
                          w:Math.round(Math.min(r.right,hb.right)-Math.max(r.left,hb.left)),
                          h:Math.round(Math.min(r.bottom,hb.bottom)-Math.max(r.top,hb.top)),
                          sy:Math.round(scrollY)});
          }
        });
      });
      return {overflow:out, clashes};
    });
    console.log(`\n  --- ${label} (${w}px) ---`);
    ck('nothing spills past its section', m.overflow.length===0,
       m.overflow.map(o=>`${o.src} +${o.over}px`).join(', '));
    // A box overlap only counts if something is actually PAINTED in the
    // intersection over the heading's own rows. The hen is cropped by the
    // tear, so its box overlaps while its pixels do not.
    const real=[];
    for (const c of m.clashes){
      if (c.w<4 || c.h<4) continue;
      const shot=await p.screenshot({clip:{x:Math.max(0,c.x), y:c.sy+c.y,
                                           width:Math.max(1,c.w), height:Math.max(1,c.h)},
                                     fullPage:true});
      const pct=await p.evaluate(({b64})=>new Promise(res=>{
        const img=new Image();
        img.onload=()=>{
          const cv=document.createElement('canvas');
          cv.width=img.width; cv.height=img.height;
          cv.getContext('2d').drawImage(img,0,0);
          const d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data;
          let warm=0,t=0;
          for(let y=0;y<cv.height;y++) for(let x=0;x<cv.width;x+=2){
            const o=(y*cv.width+x)*4; t++;
            // photographic artwork is warm and mid-toned; the headings are
            // flat green/teal and the ground is white
            const R=d[o],G=d[o+1],B=d[o+2];
            if(R-B>45 && R>110 && R<240 && G<R-18) warm++;
          }
          res(t? warm/t*100 : 0);
        };
        img.onerror=()=>res(0);
        img.src='data:image/png;base64,'+b64;
      }), {b64: shot.toString('base64')});
      if (pct > 2) real.push(`${c.label} (${pct.toFixed(1)}% painted)`);
    }
    ck('nothing covers a heading', real.length===0, real.join('; '));
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
