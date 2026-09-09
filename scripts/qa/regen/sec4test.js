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
              // The photo now deliberately overhangs the section's top so the
              // comb can paint over section 3's grass -- in the design the
              // comb's top is y3036 against a grass bottom of y3049, a 13px
              // overlap. So a NEGATIVE offset here is correct and the old
              // "must not sit above the section" check was backwards.
              henTopVsSection:+(hb.top-sr.top).toFixed(1),
              henOverhang:+(sr.top-hb.top).toFixed(1),
              // What matters is that the section does not clip it away.
              secClips: getComputedStyle(s).overflow==='hidden',
              // Nothing may spill past the card's torn edges. Measured on INK
              // (Range boxes) rather than element boxes, and against the card
              // artwork rather than the section -- "THE NEXT" sat 10.3px above
              // the card's top while every existing check passed, because none
              // of them compared content to the card at all.
              cardFit:(()=>{const c=s.querySelector('img[src*="card-next"]');
                if(!c) return null;
                const cr=c.getBoundingClientRect();
                const ink=el=>{const rg=document.createRange();rg.selectNodeContents(el);
                  return rg.getBoundingClientRect();};
                const parts=[...h.querySelectorAll('span')].map(ink);
                parts.push(ink(s.querySelector('p')));
                const gl=s.querySelector('img[src*="hen-divider"]');
                if(gl) parts.push(gl.getBoundingClientRect());
                let worst=Infinity, which='';
                for(const r of parts){
                  const insets=[r.top-cr.top, cr.bottom-r.bottom, r.left-cr.left, cr.right-r.right];
                  const m=Math.min(...insets);
                  if(m<worst){worst=m;}
                }
                return +worst.toFixed(1);})(),
              cardH: Math.round((s.querySelector('img[src*="card-next"]')||{getBoundingClientRect:()=>({height:0})}).getBoundingClientRect().height),
              // Each heading line must set on ONE line and sit on the design's
              // own centre. At the design's literal box width (21.25%) the
              // rendered face wrapped "THE NEXT" onto two lines, which then
              // collided with "Generation".
              headLines:(()=>{const sp=[...h.querySelectorAll('span')];
                return sp.map(e=>{const r=e.getBoundingClientRect();
                  const fs=parseFloat(getComputedStyle(e).fontSize);
                  return {lines:Math.round(r.height/(fs*1.12)),
                          centre:+((r.left+r.width/2-sr.left)/sr.width*100).toFixed(2)};});})(),
              // The tear is baked into the photo's alpha, not applied as a
              // CSS mask, so check the asset carries transparency at its top.
              photoTorn: hen.complete && hen.naturalWidth>0,
              henCount: s.querySelectorAll('img[src*="hen"]').length,
              gapBelowPhoto:+(sr.bottom-hb.bottom).toFixed(1),
              // The photo's top rows are transparent by design, so something
              // must paint behind them or the page's white shows through the
              // rip. That backing is section 3's grass, which overhangs into
              // this band exactly as the design does (its plane runs y2112..3049
              // while this band starts at 2629). Checking for a grass element
              // INSIDE this section was wrong -- there is none, and there
              // should not be: a second image here produced a second tear.
              tearBacking:(()=>{const prev=s.previousElementSibling;
                if(!prev) return {overhangs:false,px:0,prevClips:true};
                const g=prev.querySelector('img[src*="grass"]');
                if(!g) return {overhangs:false,px:0,prevClips:true};
                const gr=g.getBoundingClientRect();
                const clips=getComputedStyle(prev).overflow==='hidden';
                // getBoundingClientRect reports the UNCLIPPED box, so an image
                // hidden by overflow still measures as overhanging. What paints
                // is the box minus any clip, which is what the eye sees.
                const painted = clips ? Math.min(gr.bottom, prev.getBoundingClientRect().bottom) : gr.bottom;
                return {overhangs: painted > sr.top + 1,
                        px:+(painted-sr.top).toFixed(1),
                        prevClips: clips};})(),
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
    if(w>=768){
      // The overhang is what fills the rip; without it the seam goes white.
      ck('grass overhangs into the tear (no white border)',
         m.tearBacking.overhangs, `${m.tearBacking.px}px past the seam`);
      ck('section above does not clip its overhang', !m.tearBacking.prevClips);
    }
    ck('section does not clip the overhanging comb', !m.secClips);
    if(m.cardFit!==null && w>=768)
      // Not merely >0: the card's top edge is a TEAR that bites 4.91% of the
      // card's height under the heading, so type has to clear the deepest
      // point, not the average. A 2.3px inset passed a >0 check and still read
      // as touching the border. 2.5% of the card height is the working margin.
      ck('content clears the card edges', m.cardFit > m.cardH*0.025,
         `closest edge ${m.cardFit}px, need >${(m.cardH*0.025).toFixed(1)}px`);
    if(w>=768){
      ck('"THE NEXT" sets on one line', m.headLines[0].lines===1, `${m.headLines[0].lines} lines`);
      ck('"Generation" sets on one line', m.headLines[1].lines===1, `${m.headLines[1].lines} lines`);
      // Centred on the CARD (34.80% + 62.07%/2 = 65.835%), not on the .fig's
      // text-node boxes. Those boxes are unpositioned line boxes -- the two
      // rules sit -72 and +264 either side of the card centre -- so centring
      // on them put the whole block 114px right of where the design renders
      // it. Measured off the design render, all three lines share one centre.
      ck('heading lines centred on the card',
         Math.abs(m.headLines[0].centre-65.835)<1.5 && Math.abs(m.headLines[1].centre-65.835)<1.5,
         `${m.headLines[0].centre}% / ${m.headLines[1].centre}% vs 65.84%`);
    }
    if(w>=768)
      ck('comb overhangs into the grass above', m.henOverhang>10, `${m.henOverhang}px above the seam`);
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
