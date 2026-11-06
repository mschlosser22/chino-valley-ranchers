const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// The hero lockup on phones -- review item WI-4.
//
// The lockup is the desktop artboard scaled by the viewport, so on a phone it
// is a miniature: "ORGANIC REGENERATIVE EGGS" rendered at 7.8px at 360 and
// "WELCOME TO" at 10px. Rendered size is measured as the type's font-size
// times the h1's actual on-screen scale, since the fix enlarges the lockup
// with a transform rather than by changing the font sizes.
//
// Enlarging it can push the wordmark off the sides of the screen (the
// section clips), so that is checked too. There is deliberately NO "clear of
// the carton" check: the design overlaps them -- the carton's top is at 53.9%
// of the band and the sub-line's band runs to 57.3% -- and a first version of
// this suite asserted clearance and failed the design itself at every width.
(async()=>{
  const b=await chromium.launch();
  for(const w of [360,390,430,480,560,639]){
    const p=await b.newContext({viewport:{width:w,height:844},deviceScaleFactor:2}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    await p.waitForTimeout(1200);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const h1=document.querySelector('h1');
      const scale=h1.getBoundingClientRect().width/h1.offsetWidth;
      const spans=[...h1.querySelectorAll('span')].filter(s=>!s.classList.contains('sr-only'));
      const sizeOf=rx=>{const s=spans.find(x=>rx.test(x.textContent));return s?+(parseFloat(getComputedStyle(s).fontSize)*scale).toFixed(1):null;};
      const wm=h1.querySelector('img[src*="hero-wordmark"]').getBoundingClientRect();
      const carton=document.querySelector('img[src*="carton.webp"]').getBoundingClientRect();
      const sec=h1.closest('section').getBoundingClientRect();
      const sub=spans.find(x=>/organic regenerative eggs/i.test(x.textContent));
      const rg=document.createRange(); rg.selectNodeContents(sub); const subInk=rg.getBoundingClientRect();
      return {scale:+scale.toFixed(3), sub:sizeOf(/organic regenerative eggs/i), welcome:sizeOf(/welcome to/i),
              wmL:+wm.left.toFixed(1), wmR:+wm.right.toFixed(1), vw:innerWidth,
              subBottom:subInk.bottom, cartonTop:carton.top, cartonBottom:carton.bottom, secBottom:sec.bottom};
    });
    console.log(`  --- ${w}px (lockup scale ${m.scale}) ---`);
    ck(`${w}: sub-line legible`, m.sub>=10, `${m.sub}px rendered`);
    ck(`${w}: "WELCOME TO" legible`, m.welcome>=12, `${m.welcome}px rendered`);
    ck(`${w}: wordmark stays on screen`, m.wmL>=0 && m.wmR<=m.vw, `x ${m.wmL}..${m.wmR} of ${m.vw}`);
    ck(`${w}: carton inside the section`, m.cartonBottom<=m.secBottom+1, `${(m.cartonBottom-m.secBottom).toFixed(1)}px past`);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
