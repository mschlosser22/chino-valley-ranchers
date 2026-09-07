const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const [w,label] of [[1440,'desktop'],[390,'mobile']]){
    const p=await b.newContext({viewport:{width:w,height:1400},deviceScaleFactor:2}).then(c=>c.newPage());
    const bad=[];
    p.on('response',r=>{if(r.status()>=400&&/images\/regen/.test(r.url()))bad.push(r.url().split('/').pop())});
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(70);}
    await p.waitForTimeout(1600);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const h=[...document.querySelectorAll('h2')].find(e=>/generation/i.test(e.textContent));
      const s=h.closest('section');
      const sp=[...h.querySelectorAll('span')];
      const mk=el=>{const rg=document.createRange();rg.selectNodeContents(el);return rg.getBoundingClientRect().width;};
      const card=h.parentElement.getBoundingClientRect();
      const hen=s.querySelector('img[src*="hen-large"]');
      const hb=hen.getBoundingClientRect();
      return {din:getComputedStyle(sp[0]).fontFamily.split(',')[0].replace(/["']/g,''),
              script:getComputedStyle(sp[1]).fontFamily.split(',')[0].replace(/["']/g,''),
              tealCol:getComputedStyle(sp[0]).color,
              orangeCol:getComputedStyle(sp[1]).color,
              cardPct:+(card.width/innerWidth*100).toFixed(1),
              nextPct:+(mk(sp[0])/innerWidth*100).toFixed(1),
              genPct:+(mk(sp[1])/innerWidth*100).toFixed(1),
              henOK:hen.complete&&hen.naturalWidth>0,
              henOverlaps: hb.right>card.left,
              divider:!!s.querySelector('img[src*="hen-divider"]'),
              pasture:!!s.querySelector('img[src*="pasture"]'),
              overflow:document.documentElement.scrollWidth>innerWidth+1};
    });
    console.log(`\n  --- ${label} (${w}px) ---`);
    ck('"THE NEXT" in DIN Condensed', m.din==='din-condensed', m.din);
    ck('"Generation" in the script face', m.script==='nexa-rust-script-shad-2', m.script);
    ck('teal sampled from the design', m.tealCol==='rgb(0, 90, 130)', m.tealCol);
    ck('orange sampled from the design', m.orangeCol==='rgb(240, 160, 20)', m.orangeCol);
    if(w===1440){
      ck('card at design width', Math.abs(m.cardPct-52.5)<1.5, `${m.cardPct}% vs 52.5%`);
      ck('"THE NEXT" at design width', Math.abs(m.nextPct-20.9)<1.5, `${m.nextPct}% vs 20.9%`);
      ck('"Generation" at design width', Math.abs(m.genPct-28.0)<1.5, `${m.genPct}% vs 28.0%`);
      ck('hen overlaps the card', m.henOverlaps);
    }
    ck('hen cut-out loads', m.henOK);
    ck('hen divider present', m.divider);
    ck('pasture ground present', m.pasture);
    ck('no broken regen assets', bad.length===0, bad.join(','));
    ck('no horizontal overflow', !m.overflow);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
