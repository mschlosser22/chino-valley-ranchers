const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
  await p.waitForTimeout(2200);
  const m=await p.evaluate(async()=>{
    await document.fonts.ready;
    const vw=innerWidth, pct=v=>+(v/vw*100).toFixed(1);
    const h1=document.querySelector('h1'), sec=h1.closest('section');
    const top=sec.getBoundingClientRect().top;
    const y=el=>pct(el.getBoundingClientRect().top-top);
    const q=s=>sec.querySelector(s);
    const welcome=[...h1.querySelectorAll('span')].find(s=>/welcome to/i.test(s.textContent)&&!s.className.includes('sr-only'));
    const band=[...h1.querySelectorAll('div')].find(d=>getComputedStyle(d).mixBlendMode==='multiply');
    const sub=[...document.querySelectorAll('span')].find(s=>/organic regenerative eggs/i.test(s.textContent)&&!s.className.includes('sr-only'));
    return {ribbon:y(q('img[src*="hero-ribbon"]')), welcome:y(welcome),
            wordmark:y(q('img[src*="hero-wordmark"]')), band:y(band), sub:y(sub),
            carton:y(q('img[src*="carton"]')), hen:y(q('img[src*="hen-standing"]')),
            stageH:pct(sec.firstElementChild.getBoundingClientRect().height)};
  });
  // Targets are node Y positions as a share of the 2075 artboard WIDTH.
  // A percentage `top` resolves against container HEIGHT, so the component
  // scales each by 2075/1326; these assert the rendered result, not the input.
  const want={ribbon:13.8, welcome:15.5, wordmark:15.9, band:26.2, sub:26.8, carton:28.5, hen:45.0};
  for(const [k,v] of Object.entries(want)){
    const match=100-Math.abs(m[k]-v)/v*100;
    ck(`${k} at its node position`, match>=98, `${m[k]}% vs ${v}%  (${match.toFixed(1)}% match)`);
  }
  ck('stage carries the photo aspect', Math.abs(m.stageH-63.9)<1.0, `${m.stageH}% vs 63.9%`);
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
