const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
  await p.waitForTimeout(2200);
  // Targets read from the Figma node tree (file muIeDVJN5mgz3Ep0hualTF,
  // frame 5:32) rather than measured off a flattened render.
  const m=await p.evaluate(async()=>{
    await document.fonts.ready;
    const h1=document.querySelector('h1');
    const wordmark=h1.querySelector('img[src*="hero-wordmark"]');
    const ribbon=h1.querySelector('img[src*="hero-ribbon"]');
    const welcome=[...h1.querySelectorAll('span')].find(s=>
      /welcome to/i.test(s.textContent) && !s.className.includes('sr-only'));
    const sub=[...document.querySelectorAll('span')].find(s=>
      /organic regenerative eggs/i.test(s.textContent) && !s.className.includes('sr-only'));
    const band=[...h1.querySelectorAll('div')].find(d=>
      getComputedStyle(d).mixBlendMode==='multiply');
    const sr=h1.querySelector('.sr-only');
    const srcs=sr?getComputedStyle(sr):null;
    const pct=el=>+(el.getBoundingClientRect().width/innerWidth*100).toFixed(1);
    return {wordmarkPct:pct(wordmark), wordmarkOK:wordmark.complete&&wordmark.naturalWidth>0,
            ribbonPct:pct(ribbon), ribbonOK:ribbon.complete&&ribbon.naturalWidth>0,
            welcomeFace:welcome?getComputedStyle(welcome).fontFamily.split(',')[0].replace(/["']/g,''):null,
            subFace:sub?getComputedStyle(sub).fontFamily.split(',')[0].replace(/["']/g,''):null,
            bandBlend:band?getComputedStyle(band).mixBlendMode:null,
            bandOpacity:band?+getComputedStyle(band).opacity:null,
            srHidden:srcs?(srcs.position==='absolute'&&parseFloat(srcs.width)<=1):false,
            h1HasName:(h1.textContent||'').trim().length>10};
  });
  ck('wordmark at the node width', Math.abs(m.wordmarkPct-68.0)<1.0, `${m.wordmarkPct}% vs 68.0%`);
  ck('wordmark artwork loads', m.wordmarkOK);
  ck('ribbon at the node width', Math.abs(m.ribbonPct-28.9)<1.0, `${m.ribbonPct}% vs 28.9%`);
  ck('ribbon vector loads', m.ribbonOK);
  ck('"WELCOME TO" in Rockwell', m.welcomeFace==='rockwell', m.welcomeFace);
  ck('sub-line in Rockwell', m.subFace==='rockwell', m.subFace);
  ck('sub-line band multiplies over the photo', m.bandBlend==='multiply', m.bandBlend);
  ck('band at the node opacity', Math.abs(m.bandOpacity-0.4)<0.05, `${m.bandOpacity} vs 0.4`);
  ck('h1 carries an accessible name', m.h1HasName);
  ck('that name is visually hidden', m.srHidden);
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
