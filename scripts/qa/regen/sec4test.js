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
      // The card is its own artwork now, and the hen is the design's own
      // cut-out at design resolution -- h.parentElement is the full-width
      // absolute stage, and hen-large.webp was replaced by hen-next.webp.
      const sr=s.getBoundingClientRect();
      const cardEl=s.querySelector('img[src*="card-next"]');
      const card=cardEl.getBoundingClientRect();
      // One photograph now, torn in its own alpha: the design's Background
      // layer already contains the foreground hen, so the separate cut-out
      // was drawing a second copy of the same bird.
      const hen=s.querySelector('img[src*="hens-next"]');
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
              pasture:!!s.querySelector('img[src*="hens-next"]'),
              // The rooster's head must not be cut by the section's own top
              // edge: in the design the hen sits 24.43% down the band, and
              // the tear is a mask on the PHOTO, not a paper strip over it.
              henTopVsSection:+(hb.top-sr.top).toFixed(1),
              henClipped: hb.top < sr.top - 1,
              // The tear is baked into the photo's alpha, not applied as a
              // CSS mask, so check the asset carries transparency at its top.
              photoTorn: hen.complete && hen.naturalWidth>0,
              henCount: s.querySelectorAll('img[src*="hen"]').length,
              gapBelowPhoto:+(sr.bottom-hb.bottom).toFixed(1),
              sectionRatio:+(sr.height/innerWidth).toFixed(3),
              overflow:document.documentElement.scrollWidth>innerWidth+1};
    });
    console.log(`\n  --- ${label} (${w}px) ---`);
    // The design sets this in Ultra, not DIN Condensed -- read from the text
    // node, same correction as section 3's AGRICULTURE.
    ck('"THE NEXT" in Ultra', m.din==='Ultra', m.din);
    ck('the seam is a tear in the photo', m.photoTorn);
    // hens-next.webp plus hen-divider.png -- a third would be the duplicate
    // cut-out that was drawing the same bird twice.
    ck('no duplicate hen', m.henCount===2, `${m.henCount} hen images`);
    ck('photo leaves no gap at the bottom', m.gapBelowPhoto<=1, `${m.gapBelowPhoto}px`);
    ck('rooster is not clipped by the section edge', !m.henClipped, `hen top ${m.henTopVsSection}px inside`);
    if(w>=768) ck('band at design height', Math.abs(m.sectionRatio-0.657)<0.02, `${m.sectionRatio} vs 0.657`);
    ck('"Generation" in the script face', m.script==='nexa-rust-script-shad-2', m.script);
    // Colours from the .fig fillPaints: #00608B and #F9A115.
    ck('teal from the design', m.tealCol==='rgb(0, 96, 139)', m.tealCol);
    ck('orange from the design', m.orangeCol==='rgb(249, 161, 21)', m.orangeCol);
    if(w===1440){
      // From the .fig, not a screenshot: card (Layer 2 copy 9) 1288 of 2075
      // = 62.07%; THE NEXT 441 = 21.25%; Generation 573 = 27.61%. The word
      // widths are ink measurements, so they sit a little under the design's
      // text-node boxes, which carry side bearings.
      ck('card at design width', Math.abs(m.cardPct-62.07)<1.5, `${m.cardPct}% vs 62.07%`);
      ck('"THE NEXT" at design width', Math.abs(m.nextPct-21.25)<2, `${m.nextPct}% vs 21.25%`);
      ck('"Generation" at design width', Math.abs(m.genPct-27.61)<3, `${m.genPct}% vs 27.61%`);
      ck('hen overlaps the card', m.henOverlaps);
    }
    ck('hen cut-out loads', m.henOK);
    ck('hen divider present', m.divider);
    ck('photographic ground present', m.pasture);
    ck('no broken regen assets', bad.length===0, bad.join(','));
    ck('no horizontal overflow', !m.overflow);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
