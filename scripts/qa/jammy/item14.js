const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const [w,label,min] of [[390,'mobile 390',20],[360,'mobile 360',20],[1440,'desktop',20]]){
    const p=await b.newContext({viewport:{width:w,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(80);}
    await p.waitForTimeout(1200);
    const r=await p.evaluate(()=>{
      const h=[...document.querySelectorAll('h2')].find(e=>/class of its own/i.test(e.textContent));
      const sec=h.closest('section');
      const rg=document.createRange(); rg.selectNodeContents(h);
      const hb=rg.getBoundingClientRect();
      const cards=[...sec.querySelectorAll('article')].map(a=>{
        const t=a.querySelector('p').getBoundingClientRect();
        return Math.min(t.left, innerWidth-t.right);
      });
      const imgs=[...sec.querySelectorAll('article img')].map(i=>{
        const r=i.getBoundingClientRect(); return Math.min(r.left, innerWidth-r.right);
      });
      return {hMin:Math.round(Math.min(hb.left, innerWidth-hb.right)),
              cardMin:Math.round(Math.min(...cards)),
              imgMin:Math.round(Math.min(...imgs)),
              pageOverflow:document.documentElement.scrollWidth>innerWidth+1};
    });
    console.log(`\n  --- ${label} ---`);
    ck('heading clears the page edge', r.hMin>=min, `${r.hMin}px`);
    ck('card copy clears the page edge', r.cardMin>=min, `${r.cardMin}px`);
    ck('illustrations stay on-page', r.imgMin>=0, `${r.imgMin}px`);
    ck('no horizontal page scroll', !r.pageOverflow);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
