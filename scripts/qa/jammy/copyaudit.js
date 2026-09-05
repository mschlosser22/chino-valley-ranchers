const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?'  '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(70);}
  await p.waitForTimeout(1300);
  const txt=await p.evaluate(()=>{
    const s=document.querySelector('.jammy')||document.body;
    return s.innerText.replace(/\s+/g,' ');
  });
  // QA quoted the hero line exactly. Figma has the OLD wording ("can make").
  ck('hero line is QA wording, not the design\'s',
     /The only egg with a golden, jammy center that makes any meal a moment\./.test(txt));
  ck('the design\'s superseded "can make" wording is gone',
     !/that can make any meal a moment/.test(txt));
  ck('Trader Joe\'s line present and sentence case',
     /Available now at Trader Joe’s\.|Available now at Trader Joe's\./.test(txt));
  ck('"every time." present in body copy', /jammy center, every time\./.test(txt));
  ck('all four tile labels present', ['Salad','Toast','Snack','Ramen'].every(l=>txt.includes(l)));
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
