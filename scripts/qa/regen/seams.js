const { chromium } = require('playwright');
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
  await p.waitForTimeout(1500);
  const secs=await p.evaluate(()=>{
    const inScope=[...document.querySelectorAll('section')].filter(s=>
      s.querySelector('img[src*="/images/regen/"]') ||
      /regenerative|standards|generation|better for/i.test(s.textContent));
    return inScope.map((s,i)=>{
      const r=s.getBoundingClientRect();
      const h=s.querySelector('h1,h2');
      const cs=getComputedStyle(s);
      return {i, label:(h?h.textContent.replace(/\s+/g,' ').trim().slice(0,30):'(no heading)'),
              top:Math.round(r.top+scrollY), bottom:Math.round(r.bottom+scrollY),
              height:Math.round(r.height),
              bg:cs.backgroundColor, bgImg:(cs.backgroundImage.match(/regen\/([a-z-]+)\./)||[])[1]||'none',
              overflow:cs.overflow};
    });
  });
  console.log('  SECTION STACK');
  secs.forEach(s=>console.log(`   ${String(s.i).padStart(2)}. y ${String(s.top).padStart(5)}-${String(s.bottom).padStart(5)}  h${String(s.height).padStart(4)}  bg=${s.bgImg.padEnd(14)} ${s.label}`));
  // any gaps or overlaps between consecutive sections?
  console.log('\n  BOUNDARIES');
  for(let i=1;i<secs.length;i++){
    const gap=secs[i].top-secs[i-1].bottom;
    const flag = gap===0 ? 'flush' : (gap>0 ? `GAP ${gap}px` : `overlap ${-gap}px`);
    console.log(`   ${secs[i-1].i}->${secs[i].i}  y${secs[i-1].bottom}  ${flag}`);
  }
  require('fs').writeFileSync(__dirname+'/regen/secs.json',JSON.stringify(secs));
  await b.close();
})();
