const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// Differentiators: the ramen illustration's shine marks must ANIMATE only.
// QA: "Need the animated shine graphics in the ramen illustration to not sit
// on top of static shine graphics. Remove the static shine graphics."
//
// The SVG had four four-pointed stars baked in (paths Vector_3..Vector_6, all
// fill #2F4421), and the component overlaid four animated sparkle PNGs at
// those same measured positions -- so each mark was drawn twice, and the
// static one stayed lit while the animated one pulsed.
//
// The test hides the animated overlays and looks at what is left behind them.
// A leftover baked-in star shows as brand-green ink in the box it occupied.
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
  await p.waitForTimeout(800);

  const setup=await p.evaluate(async()=>{
    const art=[...document.querySelectorAll('img')].find(i=>/illo-upgrades/.test(i.getAttribute('src')||''));
    if(!art) return null;
    const stage=art.parentElement;
    const sparks=[...stage.querySelectorAll('img[src*="sparkle"]')];
    // Freeze the float/pulse so the capture is stable, and hide the overlays.
    stage.style.animation='none';
    sparks.forEach(s=>{ s.style.animation='none'; s.style.opacity='0'; });
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    return {count:sparks.length,
            animated:sparks.length>0,
            boxes:sparks.map(s=>{const r=s.getBoundingClientRect();
              return {x:Math.round(r.x), y:Math.round(r.y+window.scrollY),
                      w:Math.round(r.width), h:Math.round(r.height)};})};
  });
  if(!setup){ ck('ramen illustration found', false); }
  else {
    ck('the four shine marks are animated overlays', setup.count===4, `${setup.count} sparkle overlays`);

    // Sample each overlay's footprint with the overlays invisible.
    let worst=0, worstIdx=-1;
    for(let i=0;i<setup.boxes.length;i++){
      const bx=setup.boxes[i];
      const buf=await p.screenshot({clip:{x:bx.x,y:bx.y,width:Math.max(1,bx.w),height:Math.max(1,bx.h)},fullPage:true});
      const pct=await p.evaluate(({b64})=>new Promise(res=>{
        const img=new Image();
        img.onload=()=>{
          const cv=document.createElement('canvas'); cv.width=img.width; cv.height=img.height;
          cv.getContext('2d').drawImage(img,0,0);
          const d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data;
          let dark=0,total=0;
          for(let k=0;k<d.length;k+=4){
            total++;
            // brand green #2F4421 against the orange band
            if(d[k]<110 && d[k+1]<95 && d[k+2]<80) dark++;
          }
          res(total? dark/total*100 : 0);
        };
        img.onerror=()=>res(0);
        img.src='data:image/png;base64,'+b64;
      }),{b64:buf.toString('base64')});
      if(pct>worst){ worst=pct; worstIdx=i; }
    }
    // With the baked-in stars present this read 20-40% in each box; with them
    // gone three boxes are 0% and the fourth is 1.1% -- the bowl's own rim,
    // which that sparkle happens to sit beside, verified by eye.
    ck('no static shine left under the animated ones', worst<6,
       `worst box ${worst.toFixed(1)}% green ink (sparkle ${worstIdx})`);
  }

  // And the source itself should no longer carry them.
  const svg=await (await fetch('http://localhost:7500/images/jammy/svg/illo-upgrades.svg')).text();
  const paths=(svg.match(/<path\b/g)||[]).length;
  ck('the SVG no longer ships the baked-in stars', paths===166, `${paths} paths (was 170)`);

  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
