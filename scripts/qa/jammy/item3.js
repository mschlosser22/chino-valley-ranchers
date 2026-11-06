const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000}}).then(c=>c.newPage());

  // --- landing page buttons (data-lift) ---
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(90);}
  await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(1200);

  const lifts=await p.locator('[data-lift]').all();
  ck('data-lift elements found', lifts.length>0, `${lifts.length}`);
  let shadowed=0, scaled=0;
  for(const el of lifts){
    await el.scrollIntoViewIfNeeded().catch(()=>{});
    await el.hover({force:true}).catch(()=>{});
    await p.waitForTimeout(700);
    const st=await el.evaluate(e=>({sh:getComputedStyle(e).boxShadow, tr:getComputedStyle(e).transform}));
    if(st.sh && st.sh!=='none') shadowed++;
    if(/matrix\(1\.0[3-9]/.test(st.tr)) scaled++;
  }
  ck('no drop shadow on hover', shadowed===0, `${shadowed}/${lifts.length} shadowed`);
  ck('scale applied on hover', scaled===lifts.length, `${scaled}/${lifts.length} scaled`);
  await p.close();

  // --- homepage band button ---
  const p2=await b.newContext({viewport:{width:1440,height:1000}}).then(c=>c.newPage());
  await p2.goto('http://localhost:7500/',{waitUntil:'networkidle',timeout:60000});
  await p2.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const btn=p2.locator('.jammy-cta__cta').first();
  await btn.scrollIntoViewIfNeeded(); await p2.waitForTimeout(600);
  const before=await btn.evaluate(e=>getComputedStyle(e).transform);
  await btn.hover({force:true}); await p2.waitForTimeout(350);
  const after=await btn.evaluate(e=>({sh:getComputedStyle(e).boxShadow, tr:getComputedStyle(e).transform}));
  ck('band button: no hover shadow', !after.sh || after.sh==='none', after.sh);
  ck('band button: scales on hover', /matrix\(1\.0[3-9]/.test(after.tr), `${before} -> ${after.tr}`);

  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
