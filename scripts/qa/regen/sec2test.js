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
      const anns=[...s.querySelectorAll('img[src*="ann-"]')];
      const btn=s.querySelector('button');
      return {ff:getComputedStyle(h).fontFamily.split(',')[0].replace(/["']/g,''),
              colour:getComputedStyle(h).color,
              headPct:+(ink.width/innerWidth*100).toFixed(1),
              framePct:+(fr.width/innerWidth*100).toFixed(1),
              aspect:+(fr.width/fr.height).toFixed(3),
              stillOK:still.complete&&still.naturalWidth>0,
              anns:anns.length, annOK:anns.every(a=>a.complete&&a.naturalWidth>0),
              annVisible:anns.filter(a=>a.getBoundingClientRect().width>0).length,
              // "You want more?" sits on the paper OUTSIDE the frame in the
              // design, with a small gap past the right edge. Assert the
              // relationship, not a coordinate -- it was wrong three ways
              // (clipped inside, then straddling, then hidden behind the
              // border) and each wrong version still passed a width check.
              moreOutside:(()=>{const m=s.querySelector('img[src*="ann-more"]');
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
              lockH:(()=>{const o={};
                for(const [k,sel] of [['hear','ann-hear'],['more','ann-more']]){
                  const el=s.querySelector(`img[src*="${sel}"]`); if(!el) continue;
                  const r=el.getBoundingClientRect();
                  if(r.height>0) o[k]=+(r.height/fr.height*100).toFixed(2);}
                return o;})(),
              // Play ring geometry, and whether the annotation lands on it.
              // It had been `inset-0 m-auto`, i.e. centred, which ignores the
              // design entirely: 43.5%/39.31% at 13% wide against the design's
              // 47.90%/58.55% at 8.05%. Sitting high and oversized, it collided
              // with the "Hear Chris" text -- in the design the two never touch
              // (text ends y1565, ring starts y1600).
              play:(()=>{const el=s.querySelector('button'); if(!el) return null;
                const r=el.getBoundingClientRect();
                const h=s.querySelector('img[src*="ann-hear"]');
                const hr=h&&h.getBoundingClientRect();
                return {left:+((r.left-fr.left)/fr.width*100).toFixed(2),
                        top:+((r.top-fr.top)/fr.height*100).toFixed(2),
                        w:+(r.width/fr.width*100).toFixed(2),
                        hits: hr && hr.width>0 ? !(hr.right<r.left||hr.left>r.right||
                                                   hr.bottom<r.top||hr.top>r.bottom) : false};})(),
              btn:!!btn, btnLabel:btn&&btn.getAttribute('aria-label'),
              overflow:document.documentElement.scrollWidth>innerWidth+1};
    });
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
      // Layer 77: x994 y1600 167x167 on the 1135x698 frame.
      if (m.play) {
        ck('play ring at design position',
           Math.abs(m.play.left-47.90)<1.5 && Math.abs(m.play.top-58.55)<2,
           `${m.play.left}%/${m.play.top}% vs 47.90%/58.55%`);
        ck('play ring at design size', Math.abs(m.play.w-8.05)<1.2, `${m.play.w}% vs 8.05%`);
        ck('annotation clear of the play ring', !m.play.hits, m.play.hits ? 'overlapping' : 'clear');
      }
      // Design lockups: hear 517x195 -> 27.94% of the 698px frame; more
      // 166x289 -> 41.40%. Sized from the .fig node tree.
      if (m.lockH.hear !== undefined)
        ck('"Hear Chris" lockup at design height', Math.abs(m.lockH.hear-27.94)<2.5,
           `${m.lockH.hear}% vs 27.94%`);
      if (m.lockH.more !== undefined)
        ck('"You want more?" lockup at design height', Math.abs(m.lockH.more-41.40)<2.5,
           `${m.lockH.more}% vs 41.40%`);
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
        // The one that matters visually: it must not touch the painted border.
        if (m.moreOutside.clearsStroke !== null)
          ck('"You want more?" clear of the painted border',
             m.moreOutside.clearsStroke,
             `${m.moreOutside.strokeGap}px past the stroke`);
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
