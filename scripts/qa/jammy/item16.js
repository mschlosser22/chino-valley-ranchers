const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(80);}
  await p.waitForTimeout(1500);

  const d=await p.evaluate(()=>{
    const sax=document.querySelector('.jammy-sax');
    const imgs=[...sax.querySelectorAll('img')];
    const main=imgs.find(i=>/mascot/i.test(i.getAttribute('alt')||''));
    return {total:imgs.length,
            mainSrc:main&&main.getAttribute('src'),
            notes:imgs.filter(i=>/pl-note/.test(i.getAttribute('src')||'')).length,
            legacy:imgs.filter(i=>/pl-leg|pl-sax|playlists-art-torso/.test(i.getAttribute('src')||'')).length,
            walk:getComputedStyle(sax.querySelector('div')).animationName};
  });
  ck('mascot is the clean vector', /illo-texture\.svg$/.test(d.mainSrc||''), d.mainSrc);
  ck('no cut-out part layers remain', d.legacy===0, `${d.legacy} found`);
  ck('musical notes kept (QA allows them)', d.notes===3, `${d.notes}`);
  ck('whole-body walk retained', d.walk==='jammyWalk', d.walk);

  // The seam test: sample the torso's right edge across a full animation
  // cycle. The old build exposed panel red inside the body as the sax swung.
  const box=await p.evaluate(()=>{
    const s=document.querySelector('.jammy-sax'); s.scrollIntoView({block:'center'});
    return null;
  });
  await p.waitForTimeout(700);
  const clip=await p.evaluate(()=>{
    const r=document.querySelector('.jammy-sax').getBoundingClientRect();
    return {x:Math.round(r.left),y:Math.round(r.top),width:Math.round(r.width),height:Math.round(r.height)};
  });
  const fs=require('fs');
  for(let i=0;i<8;i++){
    await p.screenshot({path:`${__dirname}/sax/frame${i}.png`,clip});
    await p.waitForTimeout(150);   // 1.1s walk cycle -> 8 frames spans it
  }
  await b.close();

  // any panel-red pixel fully enclosed by mascot ink is a hole
  // No pixel assertion for "the seam is gone".
  //
  // Three attempts at one, all rejected. Scanning the frame for enclosed
  // background flagged the legs apart and the sax bell. Looking for
  // dead-vertical edges flagged the panel's own background wordmark. Scoping
  // to the white body mass flagged the gap between the legs -- and scored the
  // OLD, broken build at 22px against this one at 113px, ranking the fix as
  // worse than the defect.
  //
  // The defect was never really "background inside the silhouette"; it was a
  // straight cut edge in artwork that should have been drawn continuous, and
  // that is a judgement about draughtsmanship, not a pixel threshold. What is
  // asserted instead is the thing that actually caused it: no cut-out part
  // layers, one clean vector, and no per-part animation to swing them apart.
  // Those are structural and cannot regress silently. The visual result was
  // reviewed frame by frame across a full walk cycle.

  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
