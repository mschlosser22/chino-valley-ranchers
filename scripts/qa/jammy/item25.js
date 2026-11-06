// QA, "Every hour is golden hour" tiles: "Text within each container should
// use the Cubano text in white anchored in the top left corner ... Please
// ensure that the text is not tilted, it should sit in the top left corner
// with equal padding on the left and top. Remove the drop shadow from the
// text. If readability is a concern, add a slight gradient overlay at the top
// of the images, do not put drop shadows on text."
//
// Runs at several widths on purpose. The tilt and the padding were correct at
// 1440 and wrong at 768, because the outer two labels never crossed the
// IntersectionObserver's threshold there and kept their inline resting
// transform. A single-width check would have called this fixed.
//
// Contrast is measured against RENDERED PIXELS, which is the only way to see
// whether the gradient actually does the shadow's old job. Sampling the
// brightest decile of the ground under the ink gives the worst case rather
// than an average that a dark corner would flatter.
const { chromium } = require('playwright');
const sharp = require('sharp');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
const lum=([r,g,b])=>{const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};
  return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)};
(async()=>{
  const b=await chromium.launch();

  for(const W of [390,768,1440]){
    const p=await b.newContext({viewport:{width:W,height:900},deviceScaleFactor:1}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    await p.locator('.jammy-tiles').scrollIntoViewIfNeeded();
    // Past the 4s fallback, so labels that never intersect are settled too.
    await p.waitForTimeout(5000);

    const m=await p.evaluate(()=>[...document.querySelectorAll('[data-tile]')].map(el=>{
      const s=el.querySelector('[data-sticker]'); if(!s) return null;
      const cs=getComputedStyle(s);
      const tb=el.getBoundingClientRect(), sb=s.getBoundingClientRect();
      return {text:s.textContent, L:+(sb.left-tb.left).toFixed(1), T:+(sb.top-tb.top).toFixed(1),
              tr:cs.transform, sh:cs.textShadow, op:+cs.opacity,
              font:cs.fontFamily.split(',')[0].replace(/["']/g,''), color:cs.color};
    }).filter(Boolean));

    console.log(`  --- ${W}px ---`);
    ck(`${W}: every label visible`, m.every(x=>x.op===1), m.map(x=>x.op).join(','));
    ck(`${W}: Cubano`, m.every(x=>/cubano/i.test(x.font)), m[0]?.font);
    ck(`${W}: white`, m.every(x=>x.color==='rgb(255, 255, 255)'), m[0]?.color);
    // Identity matrix or none. rotate(-12deg) reads as matrix(0.978..., -0.207...).
    ck(`${W}: not tilted`, m.every(x=>x.tr==='none'||x.tr==='matrix(1, 0, 0, 1, 0, 0)'),
       m.map(x=>x.tr==='matrix(1, 0, 0, 1, 0, 0)'?'square':x.tr).join(' '));
    // Equal left and top. The old 8%/8% resolved against different axes, so it
    // measured 53/35 on the wide tile and 15/41 on the narrow ones.
    ck(`${W}: equal left and top padding`, m.every(x=>Math.abs(x.L-x.T)<0.6),
       m.map(x=>`${x.text.trim()} ${x.L}/${x.T}`).join('  '));
    ck(`${W}: no drop shadow`, m.every(x=>x.sh==='none'),
       m.map(x=>x.sh).find(s=>s!=='none')||'none');

    if(W===1440){
      for(const t of await p.locator('[data-tile]').all()){
        const lab=await t.evaluate(e=>{const s=e.querySelector('[data-sticker]');
          const tb=e.getBoundingClientRect(), sb=s.getBoundingClientRect();
          return {t:s.textContent.trim(), x:sb.left-tb.left, y:sb.top-tb.top,
                  w:sb.width, h:sb.height};});
        const shot=await t.screenshot();
        const {width:w,height:h}=await sharp(shot).metadata();
        const raw=await sharp(shot).removeAlpha().raw().toBuffer();
        let px=[];
        for(let y=Math.max(0,Math.round(lab.y)-6);y<Math.min(h,Math.round(lab.y+lab.h)+6);y++)
          for(let x=Math.max(0,Math.round(lab.x)-6);x<Math.min(w,Math.round(lab.x+lab.w)+6);x++){
            const i=(y*w+x)*3, c=[raw[i],raw[i+1],raw[i+2]];
            if(c[0]>225&&c[1]>225&&c[2]>225) continue;   // the glyph itself
            px.push(c);
          }
        px.sort((a,b)=>lum(b)-lum(a));
        const bg=px[Math.floor(px.length*0.10)];          // brightest decile
        const cr=(lum([255,255,255])+0.05)/(lum(bg)+0.05);
        // Without the gradient these measured 3.27:1 (Snack) and 3.40:1
        // (Toast) -- the two near-white frames.
        ck(`1440: "${lab.t}" white label clears WCAG AA on its tile`, cr>=4.5,
           `${cr.toFixed(2)}:1`);
      }
      const grad=await p.evaluate(()=>{
        const be=getComputedStyle(document.querySelector('[data-tile]'),'::before');
        return {content:be.content, bg:be.backgroundImage, h:be.height};
      });
      ck('1440: a gradient overlay sits at the top of the tiles',
         grad.content!=='none' && /linear-gradient/.test(grad.bg), grad.h);
    }
    await p.close();
  }

  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
