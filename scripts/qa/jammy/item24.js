// QA: "The 'Easy and ready to eat' icon is missing parts of the graphic.
// use this svg: Icon-Easy.svg"
//
// The old file had ONE path -- the hand. The supplied art has four: the hand
// plus three short motion lines above it, which is what was missing.
//
// Two checks, because either alone can be fooled. Counting <path> elements in
// the file proves the geometry shipped, but not that it is visible (a path can
// sit outside the viewBox, be clipped, or be painted in the background colour
// -- which is exactly how art goes missing). So the second check measures
// RENDERED INK: it screenshots the icon on the page and counts distinct dark
// marks across the rows where the motion lines live.
//
// Measure ink by COLOUR, not alpha. This is an <img> over a photographic
// section, so an element screenshot captures the backdrop behind it and every
// pixel comes back opaque -- an alpha-based count reports the full raster
// width as ink and cannot see anything. Distance to forest #2F4421 is what
// separates the glyph from the photo.
const { chromium } = require('playwright');
const fs=require('fs');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const svg=fs.readFileSync('public/images/jammy/svg/icon-easy-ready.svg','utf8');
  const nPaths=(svg.match(/<path/g)||[]).length;
  // 1 = the old hand-only file; the supplied art is 4.
  ck('the icon carries all four paths', nPaths===4, `${nPaths} path(s)`);

  const b=await chromium.launch();
  const ctx=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2});
  const p=await ctx.newPage();
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const cell=p.locator('.jammy-feature').filter({hasText:'Easy and ready to eat'});
  await cell.scrollIntoViewIfNeeded();
  await p.waitForTimeout(1200);
  const img=cell.locator('img');

  const meta=await img.evaluate(e=>({src:e.getAttribute('src'),complete:e.complete,
    natW:e.naturalWidth, w:e.getBoundingClientRect().width, h:e.getBoundingClientRect().height}));
  ck('the icon loaded', meta.complete && meta.natW>0, meta.src);
  // Aspect 0.7559: at h:46 the art wants ~34.8 wide. objectFit is "contain",
  // so a wrong box letterboxes rather than distorting -- the icon just comes
  // out smaller than its neighbours instead of looking broken.
  ck('rendered at the art\'s own aspect', Math.abs(meta.w/meta.h-0.7559)<0.02,
     `${meta.w.toFixed(1)}x${meta.h.toFixed(1)} = ${(meta.w/meta.h).toFixed(4)}`);

  const shot=await img.screenshot();
  const sharp=require('sharp');
  const {width:w,height:h}=await sharp(shot).metadata();
  const raw=await sharp(shot).removeAlpha().raw().toBuffer();
  const marksAt=(pct)=>{
    const y=Math.floor(h*pct/100); let runs=0, prev=false;
    for(let x=0;x<w;x++){
      const i=(y*w+x)*3;
      const d=Math.hypot(raw[i]-47, raw[i+1]-68, raw[i+2]-33);
      const on=d<90;
      if(on&&!prev) runs++;
      prev=on;
    }
    return runs;
  };
  const rows=[10,14,18].map(marksAt);
  // The hand alone gives 1-2 marks across these rows; with the motion lines
  // present every one of them reads 3.
  ck('three motion lines render above the hand', rows.every(r=>r===3),
     `marks at rows 10/14/18%: ${rows.join('/')}`);

  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
