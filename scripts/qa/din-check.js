const { chromium } = require('playwright');
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000}}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:'Cookie consent'}).getByRole('button',{name:'Reject all'}).click().catch(()=>{});
  await p.waitForTimeout(2000);
  const r=await p.evaluate(async()=>{
    await document.fonts.ready;
    const din=[...document.fonts].filter(f=>f.family==='din-condensed').map(f=>`${f.weight}:${f.status}`);
    const c=document.createElement('canvas').getContext('2d');
    c.font='40px din-condensed'; const w1=c.measureText('EXPLORE JAMMY').width;
    c.font='40px Arial'; const w2=c.measureText('EXPLORE JAMMY').width;
    const btn=[...document.querySelectorAll('a,button')].find(x=>/explore jammy/i.test(x.textContent));
    return {din, renders:Math.abs(w1-w2)>1, w1:+w1.toFixed(1), w2:+w2.toFixed(1),
            btnFont: btn?getComputedStyle(btn).fontFamily:'button not found'};
  });
  console.log('din-condensed faces:', r.din.join(', ')||'NONE');
  console.log('renders (≠Arial):', r.renders, `(${r.w1} vs ${r.w2})`);
  console.log('Explore Jammy button font:', r.btnFont.slice(0,44));
  await b.close();
})();
