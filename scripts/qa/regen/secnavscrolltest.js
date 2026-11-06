// Headings clear the fixed nav when scrolled to (review item WI-19).
// The nav is fixed and 64px tall, so anything scrolled into view by an anchor
// link or by keyboard focus landed underneath it: every h2 on the page ended
// at top 0, hidden. scroll-padding-top reserves the nav's height.
const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const w of [390,1440]){
    const p=await b.newContext({viewport:{width:w,height:800}}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const navBot=await p.evaluate(()=>document.querySelector('nav').getBoundingClientRect().bottom);
    const n=await p.evaluate(()=>document.querySelectorAll('h2').length);
    for(let i=0;i<n;i++){
      const r=await p.evaluate(i=>{const h=document.querySelectorAll('h2')[i];
        scrollTo(0,0); h.scrollIntoView({block:'start'});
        return {top:h.getBoundingClientRect().top, txt:h.textContent.trim().replace(/\s+/g,' ').slice(0,28)};},i);
      ck(`"${r.txt}" clears the nav at ${w}`, r.top>=navBot-0.5, `top ${Math.round(r.top)}, nav ${navBot}`);
    }
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
