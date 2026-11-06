const { chromium } = require('playwright');
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
  await p.waitForTimeout(1500);
  const r=await p.evaluate(async()=>{
    await document.fonts.ready;
    const mk=el=>{const rg=document.createRange();rg.selectNodeContents(el);return rg.getBoundingClientRect().width;};
    const pct=w=>+(w/innerWidth*100).toFixed(1);
    const out=[];
    const h1=document.querySelector('h1');
    out.push(['1 hero wordmark', pct(mk([...h1.querySelectorAll('span')].pop())), 68.0]);
    const h=t=>[...document.querySelectorAll('h2')].find(e=>t.test(e.textContent));
    out.push(['2 What is heading', pct(mk(h(/what is regenerative/i))), 73.7]);
    out.push(['2 video frame', pct(document.querySelector('img[src*="video-still"]').parentElement.getBoundingClientRect().width), 54.3]);
    const agri=h(/agriculture/i);
    out.push(['3 torn card', pct(agri.parentElement.getBoundingClientRect().width), 62.7]);
    out.push(['3 red sign', pct(document.querySelector('img[src*="sign-purchase"]').getBoundingClientRect().width), 24.2]);
    const gen=h(/generation/i); const gs=[...gen.querySelectorAll('span')];
    out.push(['4 torn card', pct(gen.parentElement.getBoundingClientRect().width), 52.5]);
    out.push(['4 THE NEXT', pct(mk(gs[0])), 20.9]);
    out.push(['4 Generation', pct(mk(gs[1])), 28.0]);
    const cols=[...document.querySelector('img[src*="row-barn"]').closest('.grid').children]
      .map(c=>pct(c.getBoundingClientRect().width));
    [25.2,13.3,14.4,47.1].forEach((want,i)=>out.push([`5 column ${i+1}`, cols[i], want]));
    out.push(['6 Highest heading', pct(mk(h(/highest standards/i))), 63.0]);
    out.push(['6 ROC mark', pct(document.querySelector('img[src*="roc-logo"]').getBoundingClientRect().width), 25.9]);
    const diff=h(/what makes/i); const ds=[...diff.querySelectorAll('span')];
    out.push(['7 WHAT MAKES', pct(mk(ds[0])), 31.1]);
    out.push(['7 Regenerative', pct(mk(ds[1])), 45.3]);
    out.push(['7 DIFFERENT?', pct(mk(ds[2])), 28.1]);
    out.push(['7 soil diagram', pct(document.querySelector('img[src*="soil-block"]').getBoundingClientRect().width), 51.6]);
    const pf=h(/pasture raised/i).closest('section').getBoundingClientRect();
    out.push(['9 band aspect x10', +(pf.width/pf.height*10).toFixed(1), 33.4]);
    return out;
  });
  console.log(`  ${'ELEMENT'.padEnd(22)} ${'LIVE'.padStart(7)} ${'DESIGN'.padStart(7)}   DELTA`);
  console.log('  '+'-'.repeat(52));
  let worst=0, off=0;
  r.forEach(([n,live,want])=>{
    const d=Math.abs(live-want); worst=Math.max(worst,d);
    if(d>1.5) off++;
    console.log(`  ${n.padEnd(22)} ${String(live).padStart(7)} ${String(want).padStart(7)}   ${d.toFixed(1)}${d>1.5?'  <-- OFF':''}`);
  });
  console.log(`\n  ${r.length} measurements, worst delta ${worst.toFixed(1)}, ${off} outside 1.5%`);
  await b.close();
})();
