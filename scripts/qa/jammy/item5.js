const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000}}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  await p.waitForTimeout(1200);
  const WANT='The only egg with a golden, jammy center that makes any meal a moment.';
  const r=await p.evaluate(()=>{
    const hero=document.querySelector('.jammy section');
    const sub=hero.querySelector('p');
    const meta=document.querySelector('meta[property="og:description"]');
    return {visible:(sub?sub.textContent:'').replace(/\s+/g,' ').trim(),
            meta:meta?meta.getAttribute('content'):''};
  });
  ck('hero copy matches QA', r.visible===WANT, r.visible);
  ck('og:description matches QA', r.meta===WANT, r.meta);
  ck('no stale "can make"', !r.visible.includes('can make') && !r.meta.includes('can make'));
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
