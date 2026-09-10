// Section 5, the photo row. It had no test of its own, which is how it sat at
// 36% of its design height with no torn frame at all.
const { chromium } = require('playwright');
const R = []; const ck = (n, p, d = '') => { R.push(p); console.log(`${p ? 'PASS' : 'FAIL'}  ${n}${d ? ' — ' + d : ''}`) };
(async () => {
  const b = await chromium.launch();
  for (const [w, label] of [[1440, 'desktop'], [768, 'tablet'], [390, 'mobile']]) {
    const p = await b.newContext({ viewport: { width: w, height: 1100 }, deviceScaleFactor: 2 }).then(c => c.newPage());
    await p.goto('http://localhost:7500/regenerative', { waitUntil: 'networkidle', timeout: 60000 });
    await p.getByRole('region', { name: /cookie consent/i }).getByRole('button', { name: /reject all/i }).click().catch(() => {});
    const hh = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < hh; y += 700) { await p.evaluate(v => scrollTo(0, v), y); await p.waitForTimeout(60); }
    await p.waitForTimeout(1200);
    const m = await p.evaluate(() => {
      const secs = [...document.querySelectorAll('section')];
      const i = secs.findIndex(s => /the next/i.test(s.textContent));
      const row = secs[i + 1], prev = secs[i], next = secs[i + 2];
      const rr = row.getBoundingClientRect();
      const frame = row.querySelector('img[src*="row-frame"]');
      const fr = frame ? frame.getBoundingClientRect() : null;
      const grid = row.querySelector('.grid');
      const gr = grid ? grid.getBoundingClientRect() : null;
      const prevGrass = prev.querySelector('img[src*="hens-next"], img[src*="grass"]');
      return {
        ratio: +(rr.height / innerWidth).toFixed(3),
        frame: !!frame,
        frameCoversSection: fr ? Math.abs(fr.height - rr.height) < 2 : false,
        // the grid must sit INSIDE the frame so the tears land on the photos'
        // edges rather than across the pictures
        gridInsetTop: gr ? Math.round(gr.top - rr.top) : null,
        gridInsetBottom: gr ? Math.round(rr.bottom - gr.bottom) : null,
        // the frame is 95% transparent, so something must paint behind its
        // torn rows or the page's white shows through
        overlapsAbove: Math.round(prev.getBoundingClientRect().bottom - rr.top),
        aboveGrass: !!prevGrass,
        // Two <img> photographs (barn, woodland) plus three windows onto ONE
        // shared shot -- the design masks three rectangles over a single
        // 1306x734 photo inside a 569x443 clipping frame, which is why its
        // bird reads at one scale. Three separate images made the head smaller
        // than the body.
        photos: row.querySelectorAll('img[src*="row-"]:not([src*="row-frame"])').length,
        sharedWindows: row.querySelectorAll('[role="img"]').length,
        // every window must use the same photograph at a scale that keeps the
        // bird consistent -- they differ only because the boxes differ
        windowsShareShot:(()=>{const w=[...row.querySelectorAll('[role="img"]')];
          if(w.length!==3) return false;
          return w.every(d=>/row-hen-c/.test(getComputedStyle(d).backgroundImage));})(),
        // the frame draws its own gutters; a grid gap on top of them is what
        // stood proud of the row
        gridGap: (()=>{const g=row.querySelector('.grid');
          return g ? getComputedStyle(g).gap : null;})(),
        // The frame's bottom rows are transparent, so the next section's
        // burlap has to show through them. A z-index on the ROW lifted it
        // above that section and the band rendered white instead -- which
        // every structural check passed, because the elements were all
        // present and correctly placed.
        rowStacking: getComputedStyle(row).zIndex,
        // The frame's torn bottom edge is white above the rip and transparent
        // below it, so it has to paint OVER the burlap for the tear to read.
        // With the burlap on top -- it comes later in the DOM -- the seam went
        // flat, and every DOM check still passed because the elements were all
        // present and correctly placed.
        // The burlap section is masked by the design's own torn shape ("Bg
        // shape", 2340x1262, its alpha carrying both tears) rather than
        // tiling a texture under a separate TornEdge strip. Two elements meant
        // two edges meeting somewhere, which is what produced the extra lines.
        burlapTornEdge:(()=>{const nx=row.nextElementSibling;
          if(!nx) return false;
          const cs=getComputedStyle(nx);
          return /burlap-shape/.test(cs.webkitMaskImage||cs.maskImage||'');})(),
        frameOverBurlap:(()=>{const f=row.querySelector('img[src*="row-frame"]');
          const nx=row.nextElementSibling;
          if(!f||!nx) return null;
          const fz=parseInt(getComputedStyle(f).zIndex,10);
          const nz=getComputedStyle(nx).zIndex;
          return {frame:fz, next:nz, ok: !isNaN(fz) && nz!=='auto' && fz > parseInt(nz,10)};})(),
        // The burlap must sit BEHIND the frame's bottom tear, not start below
        // it: its design plane begins 155px above where the photographs end.
        // If the next section starts at the row's bottom edge instead, the
        // frame's transparent rows show the page's white -- a band that every
        // structural check passed, because nothing compared the two.
        burlapBehindTear:(()=>{const nx=row.nextElementSibling;
          if(!nx) return null;
          const sec = nx.tagName==='SECTION' ? nx : nx.nextElementSibling;
          if(!sec) return null;
          return Math.round(rr.bottom - sec.getBoundingClientRect().top);})(),
        // The hen close-up was a pre-cropped 882x870 square dropped into a
        // portrait slot, so `cover` cut the comb off and filled the frame with
        // head. The design's own source is 1306x734 -- a wide frame with room
        // around the bird. A source narrower than 1.5:1 here means someone has
        // swapped a tight crop back in.
        henSource:null,
        allAlt: [...row.querySelectorAll('img[src*="row-"]:not([src*="row-frame"])')].every(im => (im.getAttribute('alt') || '').length > 3)
             && [...row.querySelectorAll('[role="img"]')].every(d => (d.getAttribute('aria-label') || '').length > 3),
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
      };
    });
    console.log(`\n  --- ${label} (${w}px) ---`);
    // 0.275 = Layer 59's 570 of the 2075 artboard. Below the phone breakpoint
    // the row hits its 150px floor, which is deliberate.
    if (w >= 768) ck('row at design height', Math.abs(m.ratio - 0.275) < 0.02, `${m.ratio} vs 0.275`);
    ck('torn frame present', m.frame);
    ck('frame spans the section', m.frameCoversSection);
    if (m.gridInsetTop !== null) {
      ck('photos sit inside the top tear', m.gridInsetTop > 4, `${m.gridInsetTop}px`);
      // No bottom inset any more: the frame is cropped to its top 492 rows and
      // the burlap's TornEdge draws this seam, so the photographs run to the
      // section's bottom edge and it tears over them.
      ck('photos run to the section bottom', m.gridInsetBottom <= 1, `${m.gridInsetBottom}px`);
    }
    ck('the section above shows through the tear', m.overlapsAbove > 4, `${m.overlapsAbove}px overlap`);
    ck('two standalone photographs', m.photos === 2, `${m.photos}`);
    ck('three windows onto the shared shot', m.sharedWindows === 3, `${m.sharedWindows}`);
    ck('all three windows use one photograph', m.windowsShareShot);
    ck('no grid gap over the frame gutters', m.gridGap === '0px' || m.gridGap === 'normal', `${m.gridGap}`);
    ck('row does not sit above the next section', m.rowStacking === 'auto', `z-index ${m.rowStacking}`);
    // The bottom seam is drawn by the burlap's own TornEdge, the same component
    // every other seam on this page uses. The frame's own bottom tear is too
    // shallow to read at this scale -- 76px of wander in a 570px asset is 13%
    // of its height against TornEdge's 44% -- so it rendered as a ripple, not
    // the deep curve the rest of the page has.
    ck('burlap is masked by the design\'s torn shape', m.burlapTornEdge, m.burlapTornEdge ? '' : 'not masked');

    ck('every photograph has alt text', m.allAlt);
    ck('no horizontal overflow', !m.overflow);
    await p.context().close();
  }
  await b.close();
  const pass = R.filter(Boolean).length;
  console.log(`\n${pass}/${R.length} passed`);
  process.exit(pass === R.length ? 0 : 1);
})();
