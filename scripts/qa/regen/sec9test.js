const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const [w,label] of [[1440,'desktop'],[390,'mobile']]){
    const p=await b.newContext({viewport:{width:w,height:900},deviceScaleFactor:2}).then(c=>c.newPage());
    const bad=[],errs=[];
    p.on('response',r=>{if(r.status()>=400&&/images\/regen/.test(r.url()))bad.push(r.url().split('/').pop())});
    p.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,60))});
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(70);}
    await p.waitForTimeout(1600);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const h=[...document.querySelectorAll('h2')].find(e=>/pasture raised/i.test(e.textContent));
      const s=h.closest('section');
      const ps=[...s.querySelectorAll('p')];
      const cs=getComputedStyle(h);
      const bb=s.getBoundingClientRect();
      const lines=Math.round(h.getBoundingClientRect().height/parseFloat(cs.lineHeight));
      return {ff:cs.fontFamily.split(',')[0].replace(/["']/g,''),
              colour:cs.color, align:cs.textAlign,
              lines, aspect:+(bb.width/bb.height).toFixed(2),
              claims:ps.length,
              ruled:ps.filter(e=>parseFloat(getComputedStyle(e).borderBottomWidth)>=2).length,
              claimColour:ps.length?getComputedStyle(ps[0]).color:null,
              isLiveText:h.textContent.trim().length>30,
              bgSet:/prefooter-bg/.test(getComputedStyle(s).backgroundImage),
              overflow:document.documentElement.scrollWidth>innerWidth+1};
    });
    console.log(`\n  --- ${label} (${w}px) ---`);
    ck('heading in Ultra', m.ff==='Ultra', m.ff);
    ck('heading in design orange', m.colour==='rgb(248, 160, 20)', m.colour);
    ck('heading is live text, not baked artwork', m.isLiveText);
    ck('heading centred as drawn', m.align==='center', m.align);
    if(w===1440){
      ck('band aspect matches', Math.abs(m.aspect-3.34)<0.12, `${m.aspect} vs 3.34`);
      ck('heading breaks in three lines', m.lines===3, `${m.lines}`);
    }
    ck('two claims present', m.claims===2, `${m.claims}`);
    ck('a rule separates the claims', m.ruled===1, `${m.ruled}`);
    ck('claims are white', m.claimColour==='rgb(255, 255, 255)', m.claimColour);
    ck('carton photograph set as the ground', m.bgSet);
    ck('no console errors', errs.length===0, errs.slice(0,2).join(' | '));
    ck('no broken regen assets', bad.length===0, bad.join(','));
    ck('no horizontal overflow', !m.overflow);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
