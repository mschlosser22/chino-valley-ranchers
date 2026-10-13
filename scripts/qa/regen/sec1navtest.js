// The hero photograph under the nav (review item WI-15).
// Below lg the nav is opaque (Nav.js only sets lg:bg-opacity-80), so the top
// 64px of the photograph -- the cattle's backs at 390 -- painted under a solid
// bar. The photograph now starts at the nav's bottom there. At lg and up the
// nav is translucent and the photograph runs under it, as the design draws.
const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const out={};
  for(const w of [390,768,1023,1024,1440]){
    const p=await b.newContext({viewport:{width:w,height:900}}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.evaluate(()=>document.fonts.ready);
    const m=await p.evaluate(()=>{
      const img=document.querySelector('img[src*="hero-cattle"]');
      const nav=document.querySelector('nav');
      const navBg=getComputedStyle(nav).backgroundColor;
      const a=(navBg.match(/rgba?\(([^)]+)\)/)||[,'0,0,0,0'])[1].split(',').map(Number);
      const opaque=a.length<4||a[3]>=0.99;
      const lock=[...document.querySelectorAll('.regen-hero-lockup img')].map(e=>{const r=e.getBoundingClientRect();return [r.left,r.top,r.width].map(v=>+v.toFixed(1))});
      return {top:img.getBoundingClientRect().top, navBot:nav.getBoundingClientRect().bottom, opaque, lock};
    });
    out[w]=m;
    if(m.opaque) ck(`photo starts below the opaque nav at ${w}`, m.top>=m.navBot-0.5, `photo top ${m.top}, nav bottom ${m.navBot}`);
    else ck(`photo runs under the translucent nav at ${w}`, m.top<=0.5, `photo top ${m.top}`);
    console.log(`        lockup at ${w}: ${JSON.stringify(m.lock)}`);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
