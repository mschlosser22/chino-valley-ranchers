const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000}}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(90);}
  await p.waitForTimeout(1200);
  const r=await p.evaluate(async()=>{
    await document.fonts.ready;
    const el=[...document.querySelectorAll('.jammy p')].find(x=>/Trader Joe/.test(x.textContent));
    if(!el) return null;
    const c=getComputedStyle(el);
    return {text:el.textContent.trim(), font:c.fontFamily.split(',')[0].replace(/["']/g,''),
            weight:c.fontWeight, size:c.fontSize, transform:c.textTransform, rendered:el.innerText.trim()};
  });
  ck('line found', !!r, r?r.text:'missing');
  if(r){
    ck('font is proxima-nova', r.font==='proxima-nova', r.font);
    ck('weight is bold (700)', r.weight==='700', r.weight);
    ck('not uppercased', r.transform==='none', r.transform);
    ck('renders in sentence case', r.rendered==="Available now at Trader Joe’s.", r.rendered);
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
