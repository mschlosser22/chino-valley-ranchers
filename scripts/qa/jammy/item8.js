const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000}}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(90);}
  await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>{
    const el=document.querySelector('[data-badge]');
    if(!el) return null;
    const img=el.querySelector('img');
    const c=getComputedStyle(el);
    const bb=el.getBoundingClientRect();
    const host=el.parentElement.getBoundingClientRect();
    const t=c.transform;
    let rot=0;
    const m=t.match(/matrix\(([-\d.]+),\s*([-\d.]+)/);
    if(m) rot=Math.round(Math.atan2(parseFloat(m[2]),parseFloat(m[1]))*180/Math.PI);
    return {
      src: img?img.getAttribute('src'):null,
      alt: img?img.getAttribute('alt'):null,
      loaded: img?(img.complete&&img.naturalWidth>0):false,
      widthPct: +(100*bb.width/host.width).toFixed(1),
      square: Math.abs(bb.width-bb.height)<2,
      rot,
      liveText: el.textContent.trim(),
    };
  });
  ck('badge present', !!r);
  if(r){
    ck('uses supplied artwork', (r.src||'').endsWith('protein-bubble.svg'), r.src);
    ck('artwork loads', r.loaded);
    ck('no tilt', Math.abs(r.rot)<1, `${r.rot}deg`);
    ck('scale reduced to 36%', Math.abs(r.widthPct-36)<1.5, `${r.widthPct}%`);
    ck('square, matching the artwork', r.square);
    ck('type is in the artwork, not overlaid', r.liveText==='', r.liveText||'(none)');
    ck('accessible name kept', r.alt==='24g of protein per bag', r.alt);
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
