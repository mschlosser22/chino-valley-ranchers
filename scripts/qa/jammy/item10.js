const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
const ALTS=['Jammy egg mascot playing a saxophone','Jammy egg mascot running with a fork','Jammy egg relaxing in a bowl of ramen'];
(async()=>{
  const b=await chromium.launch();
  for(const [w,label] of [[1440,'desktop'],[390,'mobile']]){
    const p=await b.newContext({viewport:{width:w,height:1200},deviceScaleFactor:2}).then(c=>c.newPage());
    const bad=[];
    p.on('response',r=>{if(r.status()>=400&&/images\/jammy/.test(r.url()))bad.push(r.url().split('/').pop())});
    await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(80);}
    await p.waitForTimeout(1200);
    await p.addStyleTag({content:'*{animation:none !important;transition:none !important}'});
    await p.waitForTimeout(300);
    const d=await p.evaluate(A=>A.map(a=>{
      const i=document.querySelector(`img[alt="${a}"]`); if(!i) return {missing:true,a};
      const r=i.getBoundingClientRect();
      return {a,src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0,
              w:+r.width.toFixed(1), h:+r.height.toFixed(1)};
    }),ALTS);
    console.log(`\n  --- ${label} (${w}px) ---`);
    d.forEach(x=>console.log(`    ${(x.src||'MISSING').split('/').pop().padEnd(20)} ${x.w}x${x.h}`));
    ck('three illustrations present', d.every(x=>!x.missing));
    ck('all three are vector', d.every(x=>/\.svg$/.test(x.src||'')));
    ck('all three load', d.every(x=>x.loaded));
    ck('no broken jammy assets', bad.length===0, bad.join(','));
    ck('layered-PNG illustration gone', await p.evaluate(()=>!document.querySelector('img[src*="illo-easy-body"],img[src*="illo-easy-arm"]')));
    // the fork egg must render at the size it did before the swap (278.9 x 219.8 at 1440)
    if(w===1440){
      const f=d[1];
      ck('fork egg keeps its original render size', Math.abs(f.w-278.9)<2&&Math.abs(f.h-219.8)<2, `${f.w}x${f.h} vs 278.9x219.8`);
      const hs=d.map(x=>x.h);
      ck('no illustration dominates the row', (Math.max(...hs)-Math.min(...hs))/Math.max(...hs)<0.15, hs.join('/'));
    }
    ck('card-2 sparkles removed', await p.evaluate(()=>{
      const i=document.querySelector('img[alt="Jammy egg mascot running with a fork"]');
      return i.closest('article').querySelectorAll('img[src*="sparkle"]').length===0;
    }));
    ck('card-3 shines intact', await p.evaluate(()=>{
      const i=document.querySelector('img[alt="Jammy egg relaxing in a bowl of ramen"]');
      return i.closest('article').querySelectorAll('img[src*="sparkle"]').length===4;
    }));
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
