const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const [w,label] of [[1440,'desktop'],[390,'mobile']]){
    const p=await b.newContext({viewport:{width:w,height:1200},deviceScaleFactor:2}).then(c=>c.newPage());
    const bad=[],errs=[];
    p.on('response',r=>{if(r.status()>=400&&/images\/regen/.test(r.url()))bad.push(r.url().split('/').pop())});
    p.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,80))});
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(70);}
    await p.waitForTimeout(1500);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const h=[...document.querySelectorAll('h2')].find(e=>/highest standards/i.test(e.textContent));
      const s=h.closest('section');
      const rg=document.createRange(); rg.selectNodeContents(h);
      const ink=rg.getBoundingClientRect();
      const roc=s.querySelector('img[src*="roc-logo"]');
      const ann=s.querySelector('img[src*="ann-certified"]');
      const hen=s.querySelector('img[src*="hen-standing-photo"]');
      const cs=getComputedStyle(s);
      return {ff:getComputedStyle(h).fontFamily.split(',')[0].replace(/["']/g,''),
              colour:getComputedStyle(h).color,
              headPct:+(ink.width/innerWidth*100).toFixed(1),
              rocPct:+(roc.getBoundingClientRect().width/innerWidth*100).toFixed(1),
              annPct:+(ann.getBoundingClientRect().width/innerWidth*100).toFixed(1),
              rocAlt:roc.getAttribute('alt'),
              rocOK:roc.complete&&roc.naturalWidth>0,
              henOK:hen.complete&&hen.naturalWidth>0,
              tiled:/repeat/.test(cs.backgroundRepeat)&&!/cover/.test(cs.backgroundSize),
              // The heading sets on ONE line and its ink spans the two columns.
              // It wrapped to two at 4.67vw without nowrap, which the design
              // never does.
              head:(()=>{const rg=document.createRange(); rg.selectNodeContents(h);
                const ink=rg.getBoundingClientRect();
                const fs=parseFloat(getComputedStyle(h).fontSize);
                const grid=s.querySelector('.regen-standards-grid');
                const gw=grid?grid.getBoundingClientRect().width:0;
                return {lines:Math.round(ink.height/(fs*1.05)),
                        inkW:Math.round(ink.width), gridW:Math.round(gw)};})(),
              // The copy sits directly on the burlap, so the ground carries a
              // wash to keep it legible -- the design's ground reads at mean
              // luminance 193 against this texture's raw 176.
              wash:/linear-gradient/.test(cs.backgroundImage),
              // The annotation's arrow curves up-LEFT, so its lockup has to sit
              // just right of the ROC mark and overlap it vertically for the
              // tip to point at the logo. At left:-6% of its column the arrow
              // curved up into empty burlap instead.
              annPoints:(()=>{const roc=s.querySelector('img[src*="roc-logo"]');
                const ann=s.querySelector('img[src*="ann-certified"]');
                if(!roc||!ann) return null;
                const r=roc.getBoundingClientRect(), a=ann.getBoundingClientRect();
                // The arrow's TIP is what has to point at the mark: it sits at
                // 13.2% across and 0.4% down the asset. Checking the lockup's
                // box instead passed both the correct placement and the one
                // the client reported, where the tip curved up into empty
                // burlap well above the logo.
                const tipX=a.left+a.width*0.132, tipY=a.top+a.height*0.004;
                return {gap:Math.round(a.left-r.right),
                        tipAboveMark:Math.round(r.top-tipY),
                        tipRightOfMark:Math.round(tipX-r.right),
                        overlapsVertically: a.top < r.bottom && a.bottom > r.top};})(),
              overflow:document.documentElement.scrollWidth>innerWidth+1};
    });
    console.log(`\n  --- ${label} (${w}px) ---`);
    ck('heading in Ultra', m.ff==='Ultra', m.ff);
    ck('heading in design red', m.colour==='rgb(176, 16, 20)', m.colour);
    if(w===1440){
      ck('heading at design width', Math.abs(m.headPct-63.0)<1.5, `${m.headPct}% vs 63.0%`);
      // 27.42%: the design's "Regen Organic Cert" is 569 of the 2075 artboard.
      // The old 25.9% was measured off a screenshot.
      ck('ROC mark at design width', Math.abs(m.rocPct-27.42)<1.5, `${m.rocPct}% vs 27.42%`);
      ck('annotation at design width', Math.abs(m.annPct-11.6)<1.5, `${m.annPct}% vs 11.6%`);
    }
    ck('ROC mark carries its name as alt', /regenerative organic certified/i.test(m.rocAlt||''), m.rocAlt);
    ck('ROC mark loads', m.rocOK);
    ck('hen cut-out loads', m.henOK);
    ck('burlap tiles rather than scaling', m.tiled);
    ck('ground carries a wash so the copy reads', m.wash);
    if(m.annPoints && w>=768){
      ck('annotation sits beside the ROC mark',
         m.annPoints.gap > -40 && m.annPoints.gap < 80, `${m.annPoints.gap}px from the logo`);
      // The tip must be level with the mark, not floating above it. In the
      // design the arrow spans y5039..5153 inside the logo's y4970..5188.
      ck('arrow tip is level with the mark',
         m.annPoints.tipAboveMark < 20,
         `tip ${m.annPoints.tipAboveMark}px above the logo's top`);
    }
    if(w===1440){
      ck('heading sets on one line', m.head.lines===1, `${m.head.lines} lines`);
      ck('heading spans the two columns',
         Math.abs(m.head.inkW-m.head.gridW)<40, `${m.head.inkW}px vs ${m.head.gridW}px`);
    }
    ck('no console errors on the page', errs.length===0, errs.slice(0,2).join(' | '));
    ck('no broken regen assets', bad.length===0, bad.join(','));
    ck('no horizontal overflow', !m.overflow);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
