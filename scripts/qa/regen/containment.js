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
          if(r.bottom>hb.top+4 && r.top<hb.bottom-4 && r.right>hb.left && r.left<hb.right)
            clashes.push(img.getAttribute('src').split('/').pop()+' over "'+h.textContent.trim().slice(0,22)+'"');
        });
      });
      return {overflow:out, clashes:[...new Set(clashes)]};
    });
    console.log(`\n  --- ${label} (${w}px) ---`);
    ck('nothing spills past its section', m.overflow.length===0,
       m.overflow.map(o=>`${o.src} +${o.over}px`).join(', '));
    ck('nothing covers a heading', m.clashes.length===0, m.clashes.join('; '));
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
