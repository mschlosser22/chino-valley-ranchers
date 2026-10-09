const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const [w,label] of [[1440,'desktop'],[390,'mobile']]){
    const p=await b.newContext({viewport:{width:w,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
    const bad=[];
    p.on('response',r=>{if(r.status()>=400&&/images\/regen/.test(r.url()))bad.push(r.url().split('/').pop())});
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    await p.waitForTimeout(2000);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const h=[...document.querySelectorAll('h2')].find(e=>/what is regenerative/i.test(e.textContent));
      const s=h.closest('section');
      const rg=document.createRange(); rg.selectNodeContents(h);
      const ink=rg.getBoundingClientRect();
      const still=s.querySelector('img[src*="video-still"]');
      const fr=still.parentElement.getBoundingClientRect();
      // Annotations are live type (div[aria-hidden]) plus a vector arrow
      // image. They were composited PNGs until the exports were found to clip
      // their own glyphs at the canvas edge.
      const anns=[...s.querySelectorAll('div[aria-hidden="true"]')].filter(d=>/Hear Chris|You/.test(d.textContent));
      const arrows=[...s.querySelectorAll('img[src*="arrow-"]')];
      const btn=s.querySelector('button');
      return {ff:getComputedStyle(h).fontFamily.split(',')[0].replace(/["']/g,''),
              colour:getComputedStyle(h).color,
              headPct:+(ink.width/innerWidth*100).toFixed(1),
              framePct:+(fr.width/innerWidth*100).toFixed(1),
              aspect:+(fr.width/fr.height).toFixed(3),
              stillOK:still.complete&&still.naturalWidth>0,
              anns:anns.length, annOK:arrows.length===2&&arrows.every(a=>a.complete&&a.naturalWidth>0),
              annVisible:anns.filter(a=>a.getBoundingClientRect().width>0).length,
              // "You want more?" sits on the paper OUTSIDE the frame in the
              // design, with a small gap past the right edge. Assert the
              // relationship, not a coordinate -- it was wrong three ways
              // (clipped inside, then straddling, then hidden behind the
              // border) and each wrong version still passed a width check.
              moreOutside:(()=>{const m=anns.find(d=>/^You/.test(d.textContent.trim()));
                if(!m) return null; const r=m.getBoundingClientRect();
                if(r.width===0) return 'hidden';
                // Measure against the VISIBLE brush stroke, not the frame box.
                // The old check used fr.right and passed at +1.6px while the
                // stroke -- then translated half its width outside the box --
                // reached 7.4px further and sat under the text. What the eye
                // sees is the stroke; the box is invisible.
                const rs=s.querySelector('img[src*="frame-right"]');
                const sr=rs&&rs.getBoundingClientRect();
                return {gap:+(r.left-fr.right).toFixed(1),
                        clear:r.left>=fr.right,
                        strokeGap: sr? +(r.left-sr.right).toFixed(1) : null,
                        clearsStroke: sr? r.left>=sr.right : null,
                        onPaper:r.left>fr.right&&r.top<fr.bottom};})(),
              // Lockup HEIGHT as a share of the frame. Position was right and
              // size was wrong: the assets carried longer arrow tails than the
              // design, so sizing them by width made them ~48% of the frame
              // against the design's 27.9%/41.4%, dropping both arrows far too
              // low and running the yellow one into the play button. Every
              // left/top/width check passed throughout.
              // Unrotated layout height. getBoundingClientRect() returns the
              // AXIS-ALIGNED box of a rotated element, which for a -12.17deg
              // lockup is far taller than the type itself -- 28% against a
              // real 12.6%. offsetHeight ignores the transform.
              lockH:(()=>{const o={};
                for(const [k,rx] of [['hear',/Hear Chris/],['more',/^You/]]){
                  const el=anns.find(d=>rx.test(d.textContent.trim())); if(!el) continue;
                  if(el.offsetHeight>0) o[k]=+(el.offsetHeight/fr.height*100).toFixed(2);}
                return o;})(),
              // Play ring geometry, and whether the annotation lands on it.
              // In the design the two never touch (text ends y1565, ring
              // starts y1600). Expected values are below the measurement.
              play:(()=>{const el=s.querySelector('button'); if(!el) return null;
                const r=el.getBoundingClientRect();
                const h=anns.find(d=>/Hear Chris/.test(d.textContent));
                const hr=h&&h.getBoundingClientRect();
                return {left:+((r.left-fr.left)/fr.width*100).toFixed(2),
                        top:+((r.top-fr.top)/fr.height*100).toFixed(2),
                        w:+(r.width/fr.width*100).toFixed(2),
                        hits: hr && hr.width>0 ? !(hr.right<r.left||hr.left>r.right||
                                                   hr.bottom<r.top||hr.top>r.bottom) : false};})(),
              btn:!!btn, btnLabel:btn&&btn.getAttribute('aria-label'),
              overflow:document.documentElement.scrollWidth>innerWidth+1};
    });
    // 3.6% of the frame width, the design's stroke-to-glyph gap. Scales with
    // the breakpoint so the same rule holds at 1440 and 390.
    const fr_gap_min = m.framePct/100 * w * 0.020;
    console.log(`\n  --- ${label} (${w}px) ---`);
    ck('heading in Ultra', m.ff==='Ultra', m.ff);
    ck('heading in design red', m.colour==='rgb(176, 16, 20)', m.colour);
    // Runs at EVERY breakpoint. The geometry block below is gated to 1440, so
    // the phone had no width assertion of any kind -- which is how the video
    // shipped at the desktop 53.7% ratio on a 390px screen, a small box adrift
    // in empty paper. Below 768px it takes the full column.
    if (w < 768)
      ck('video fills the phone column', m.framePct > 80, `${m.framePct}% of viewport`);
    if(w===1440){
      ck('heading at design width', Math.abs(m.headPct-73.7)<1.5, `${m.headPct}% vs 73.7%`);
      // 53.7%: the design's own top frame stroke is 1114px wide on the 2075px
      // artboard. Measured from the stroke artwork, which is exact, rather
      // than off a scaled screenshot.
      ck('video frame at design width', Math.abs(m.framePct-53.7)<1.5, `${m.framePct}% vs 53.7%`);
      // Layer 77: x994 y1600 167x167 on the artboard; the frame's origin is
      // (470,1314) and it is 1135x698, so in FRAME terms that is 46.17% /
      // 40.97% at 14.71% wide. This check used to assert 47.90%/58.55% at
      // 8.05% -- 994/2075 and 167/2075 are ARTBOARD percentages, applied to the
      // frame by mistake -- so it enforced a ring 24% of the frame too low and
      // 45% too small, with the "Hear Chris" arrow pointing at the treeline.
      // (Review item WI-3.)
      if (m.play) {
        ck('play ring at design position',
           Math.abs(m.play.left-46.17)<1.5 && Math.abs(m.play.top-40.97)<2,
           `${m.play.left}%/${m.play.top}% vs 46.17%/40.97%`);
        ck('play ring at design size', Math.abs(m.play.w-14.71)<1.2, `${m.play.w}% vs 14.71%`);
        ck('annotation clear of the play ring', !m.play.hits, m.play.hits ? 'overlapping' : 'clear');
      }
      // Text block heights against the design's TEXT node boxes (88 and 132
      // on the 698px frame = 12.61% and 18.91%). The old lockup checks folded
      // text and arrow into one box; they are separate elements now.
      if (m.lockH.hear !== undefined)
        ck('"Hear Chris" text at design height', Math.abs(m.lockH.hear-12.61)<4,
           `${m.lockH.hear}% vs 12.61%`);
      if (m.lockH.more !== undefined)
        ck('"You want more?" text at design height', Math.abs(m.lockH.more-18.91)<5,
           `${m.lockH.more}% vs 18.91%`);
      ck('frame aspect matches', Math.abs(m.aspect-1.644)<0.02, `${m.aspect}`);
      ck('both annotations visible', m.annVisible===2, `${m.annVisible}`);
      if (m.moreOutside && m.moreOutside !== 'hidden') {
        // The design's own gap is 2.6px at artboard scale (text x1607.6 vs
        // frame right x1605.0), which lands near 1.5px at a 1440 viewport.
        // The bound only has to catch the annotation drifting back INSIDE the
        // frame -- an earlier `> 2` threshold failed the design's own value.
        ck('"You want more?" clear of the frame',
           m.moreOutside.clear && m.moreOutside.gap > 0 && m.moreOutside.gap < 60,
           `${m.moreOutside.gap}px past the right edge`);
        // Box math is not enough here and passed twice while the glyph was
        // against the stroke: the annotation's box starts where its PNG starts,
        // but the "Y" begins inside that, and the stroke is ragged -- its
        // widest bulge (rows 432-611 of 679) lands exactly at the text. What
        // matters is ink-to-ink, so require real separation rather than >0.
        // 3.6% of the frame is the gap measured off the design.
        if (m.moreOutside.clearsStroke !== null)
          ck('"You want more?" clear of the painted border',
             m.moreOutside.clearsStroke && m.moreOutside.strokeGap > fr_gap_min,
             `${m.moreOutside.strokeGap}px past the stroke (need >${fr_gap_min.toFixed(1)})`);
      }
    } else {
      ck('annotations hidden on phones', m.annVisible===0, `${m.annVisible}`);
    }
    ck('video still loads', m.stillOK);
    ck('two annotations in markup', m.anns===2, `${m.anns}`);
    ck('annotation artwork loads', m.annOK);
    ck('play control is a real button', m.btn && /play/i.test(m.btnLabel||''), m.btnLabel);
    ck('no broken regen assets', bad.length===0, bad.join(','));
    ck('no horizontal overflow', !m.overflow);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
