const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();

  // ── mobile ──
  const p=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  let hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(80);}
  await p.waitForTimeout(1400);
  const m=await p.evaluate(()=>{
    const g=document.querySelector('.jammy-features');
    const sec=document.querySelector('.jammy-features-section');
    const cs=getComputedStyle(g);
    const items=[...g.children];
    const r1=items[0].getBoundingClientRect(), r6=items[5].getBoundingClientRect();
    const ov=items.map(el=>{
      const h3=el.querySelector('h3');
      const rg=document.createRange(); rg.selectNodeContents(h3);
      return rg.getBoundingClientRect().width - el.getBoundingClientRect().width;
    });
    return {cols:cs.gridTemplateColumns.split(' ').length,
            bg:getComputedStyle(sec).backgroundColor,
            photo:getComputedStyle(document.querySelector('.jammy-features-bg')).display,
            scrollable:g.scrollWidth>g.clientWidth+2,
            twoRows:r6.top>r1.bottom-4,
            maxOverflow:Math.max(...ov),
            pageOverflow:document.documentElement.scrollWidth>window.innerWidth+1};
  });
  console.log('  --- mobile (390px) ---');
  ck('five columns', m.cols===5, `${m.cols}`);
  ck('two rows (item 6 starts row 2)', m.twoRows);
  ck('solid colour block, not white', m.bg==='rgb(163, 210, 238)', m.bg);
  ck('photo backdrop hidden', m.photo==='none');
  ck('row scrolls sideways', m.scrollable);
  ck('no label overflows its cell', m.maxOverflow<=1, `${m.maxOverflow}px`);
  ck('page itself does not scroll sideways', !m.pageOverflow);
  await p.close();

  // ── desktop unchanged ──
  const q=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
  await q.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await q.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  hh=await q.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await q.evaluate(v=>scrollTo(0,v),y);await q.waitForTimeout(80);}
  await q.waitForTimeout(1200);
  const d=await q.evaluate(()=>{
    const g=document.querySelector('.jammy-features');
    const sec=document.querySelector('.jammy-features-section');
    return {cols:getComputedStyle(g).gridTemplateColumns.split(' ').length,
            bg:getComputedStyle(sec).backgroundColor,
            photo:getComputedStyle(document.querySelector('.jammy-features-bg')).display,
            scrollable:g.scrollWidth>g.clientWidth+2};
  });
  console.log('\n  --- desktop (1440px) ---');
  ck('still five columns', d.cols===5, `${d.cols}`);
  ck('still white', d.bg==='rgb(255, 255, 255)', d.bg);
  ck('photo backdrop still shown', d.photo!=='none', d.photo);
  ck('no sideways scroll on desktop', !d.scrollable);
  await q.close();

  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
