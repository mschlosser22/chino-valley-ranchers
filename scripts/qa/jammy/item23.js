// QA: "Product Features (A Shortcut with Showmanship) Section - The background
// image appears to have some kind of lowered opacity overlay on it. Please
// remove. (Please ensure this asset is being used: shutterstock_131701991-edit)"
//
// The overlay was a white gradient ::before on the section, not anything on
// the image itself -- features-bg.jpg already matches the supplied asset (mean
// abs difference below 1/255 per channel, identical yolk RGB; the delta is
// JPEG compression).
//
// Asserts the RENDERED RESULT, not just that the rule is gone. A scrim could
// come back as an inline style, a filter, an opacity on the wrapper, or a
// second pseudo-element, and a rule-level check would miss all of those. The
// profile test is what actually catches it: the removed gradient peaked at
// 0.34 alpha of white across the middle of the band and cleared at the edges,
// so with it present the middle measures BRIGHTER than the edges. The bare
// photograph is the other way round -- the yolk sits mid-frame and is darker
// than the egg white at the margins.
const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const ctx=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});
  const p=await ctx.newPage();
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  await p.locator('.jammy-features-section').scrollIntoViewIfNeeded();
  await p.waitForTimeout(1500);

  const st=await p.evaluate(()=>{
    const sec=document.querySelector('.jammy-features-section');
    const wrap=document.querySelector('.jammy-features-bg');
    const img=wrap.querySelector('img');
    const be=getComputedStyle(sec,'::before'), af=getComputedStyle(sec,'::after');
    return {src:img.getAttribute('src'),
            before:be.content, beforeBg:be.backgroundImage,
            after:af.content,  afterBg:af.backgroundImage,
            wrapOpacity:+getComputedStyle(wrap).opacity, wrapFilter:getComputedStyle(wrap).filter,
            imgOpacity:+getComputedStyle(img).opacity,  imgFilter:getComputedStyle(img).filter,
            loaded:img.naturalWidth>0};
  });

  ck('the supplied asset is the one in use', /features-bg\.jpg$/.test(st.src), st.src);
  ck('the photo actually loaded', st.loaded);
  ck('no ::before scrim', st.before==='none'||st.beforeBg==='none', `content ${st.before}`);
  ck('no ::after scrim',  st.after==='none'||st.afterBg==='none',  `content ${st.after}`);
  ck('photo at full opacity', st.wrapOpacity===1 && st.imgOpacity===1,
     `wrapper ${st.wrapOpacity}, img ${st.imgOpacity}`);
  ck('no filter washing the photo', st.wrapFilter==='none' && st.imgFilter==='none',
     `${st.wrapFilter} / ${st.imgFilter}`);

  // The rendered-pixel check. Sample a band low in the section, below the
  // label rows, so glyph ink cannot skew the average.
  const shot=await p.locator('.jammy-features-section').screenshot();
  const sharp=require('sharp');
  const {width:w,height:h}=await sharp(shot).metadata();
  const raw=await sharp(shot).raw().toBuffer();
  const ch=raw.length/(w*h);
  const row=(y)=>{const o=[];for(let x=0;x<w;x++){const i=(y*w+x)*ch;o.push((raw[i]+raw[i+1]+raw[i+2])/3);}return o;};
  let acc=new Array(w).fill(0), n=0;
  for(let y=Math.floor(h*0.80);y<Math.floor(h*0.90);y+=2){const r=row(y);for(let x=0;x<w;x++)acc[x]+=r[x];n++;}
  const prof=acc.map(v=>v/n);
  const avg=(a,b)=>prof.slice(Math.floor(w*a),Math.floor(w*b)).reduce((s,v)=>s+v,0)/(Math.floor(w*b)-Math.floor(w*a));
  const edges=(avg(0,0.08)+avg(0.92,1))/2, mid=avg(0.34,0.66);
  // Bare photograph measures about -20 here (yolk mid-frame, egg white at the
  // margins); with the scrim it measures about +2.7. A first cut of this bound
  // was `< 5`, which PASSED the scrim -- the thing the check exists to catch.
  // -10 sits between the two states with ~10 points of margin either side.
  ck('no white wash across the middle of the band', mid-edges < -10,
     `middle ${mid.toFixed(1)} vs edges ${edges.toFixed(1)} (${(mid-edges).toFixed(1)})`);

  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
