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
        photos: row.querySelectorAll('img[src*="row-"]:not([src*="row-frame"])').length,
        // The hen close-up was a pre-cropped 882x870 square dropped into a
        // portrait slot, so `cover` cut the comb off and filled the frame with
        // head. The design's own source is 1306x734 -- a wide frame with room
        // around the bird. A source narrower than 1.5:1 here means someone has
        // swapped a tight crop back in.
        henSource:(()=>{const im=row.querySelector('img[src*="row-hen-c"]');
          if(!im||!im.naturalWidth) return null;
          return {aspect:+(im.naturalWidth/im.naturalHeight).toFixed(3),
                  w:im.naturalWidth, h:im.naturalHeight};})(),
        allAlt: [...row.querySelectorAll('img[src*="row-"]:not([src*="row-frame"])')].every(im => (im.getAttribute('alt') || '').length > 3),
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
      ck('photos sit inside the bottom tear', m.gridInsetBottom > 4, `${m.gridInsetBottom}px`);
    }
    ck('the section above shows through the tear', m.overlapsAbove > 4, `${m.overlapsAbove}px overlap`);
    ck('four photographs', m.photos === 5, `${m.photos}`);
    if (m.henSource)
      ck('hen close-up uses the full frame, not a tight crop',
         m.henSource.aspect > 1.5, `${m.henSource.w}x${m.henSource.h}, aspect ${m.henSource.aspect}`);
    ck('every photograph has alt text', m.allAlt);
    ck('no horizontal overflow', !m.overflow);
    await p.context().close();
  }
  await b.close();
  const pass = R.filter(Boolean).length;
  console.log(`\n${pass}/${R.length} passed`);
  process.exit(pass === R.length ? 0 : 1);
})();
