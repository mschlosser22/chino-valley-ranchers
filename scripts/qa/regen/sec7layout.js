const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// Section 7's diagram, its four callouts and their arrows.
//
// The sky has to run BEHIND the intro copy: in the design the artwork
// (Farm-minified 1) is at y5671 while the intro text runs y5850..6214, so the
// sky starts 179px above the paragraph. The build had the diagram in plain
// flow below the text at 54.9% wide, so the copy sat on bare white.
//
// The arrows are measured against text INK, not element boxes. The design's
// own arrow for "Animals" does cross that callout's text NODE -- the box is
// 247px tall for four short lines -- while clearing its glyphs, so a
// box-based check reproduces the defect instead of catching it.
(async()=>{
  const b=await chromium.launch();
  for(const [w,label] of [[1440,'desktop'],[1100,'narrow desktop'],[768,'tablet'],[390,'mobile'],[360,'small phone']]){
    const p=await b.newContext({viewport:{width:w,height:1000},deviceScaleFactor:1}).then(c=>c.newPage());
    const bad=[];
    p.on('response',r=>{if(r.status()>=400&&/images\/regen/.test(r.url()))bad.push(r.url().split('/').pop())});
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
    await p.waitForTimeout(1200);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const h=[...document.querySelectorAll('h2')].find(e=>/what makes/i.test(e.textContent));
      const s=h.closest('section');
      const sec=s.getBoundingClientRect();
      const stage=s.querySelector('.regen-soil__stage').getBoundingClientRect();
      const art=s.querySelector('.regen-soil__art');
      // The intro is the first <p> that is not inside a callout.
      const intro=[...s.querySelectorAll('p')].find(el=>!el.closest('.regen-callout'));
      const ir=intro.getBoundingClientRect();
      const arrows=[...s.querySelectorAll('.regen-callout__arrow')];
      const items=[...s.querySelectorAll('.regen-callout')].map((c,i)=>{
        const rg=document.createRange(); rg.selectNodeContents(c.querySelector('p'));
        const ink=rg.getBoundingClientRect();
        const a=arrows[i]?arrows[i].getBoundingClientRect():null;
        const shown=a&&a.width>0;
        return {t:c.querySelector('h3').textContent.trim(),
                pos:getComputedStyle(c).position,
                arrowShown:!!shown,
                // Ink-to-ink, both axes.
                crosses: shown ? !(ink.right<a.left||ink.left>a.right||
                                   ink.bottom<a.top||ink.top>a.bottom) : false,
                inSection: ink.left>=sec.left-1 && ink.right<=sec.right+1,
                rightGap: Math.round(sec.right-ink.right)};
      });
      // Sample the artwork behind each callout's text. Soil reads dark and
      // brown; sky and bare paper read pale. The "Farming" block sat with its
      // heading and first lines on the dirt through three different x
      // positions -- the design's own offset put it there, because the design's
      // block is 340 artwork-rows tall and runs past the artwork's bottom edge
      // while ours is 230 and sat inside the soil's widest band.
      const onSoil = (()=>{
        const img=s.querySelector('.regen-soil__art');
        const st2=s.querySelector('.regen-soil__stage').getBoundingClientRect();
        const cv=document.createElement('canvas');
        cv.width=img.naturalWidth; cv.height=img.naturalHeight;
        const ctx=cv.getContext('2d'); ctx.drawImage(img,0,0);
        const d=ctx.getImageData(0,0,cv.width,cv.height).data;
        return [...s.querySelectorAll('.regen-callout')].map(c=>{
          // The HEADING's band, not the whole block. The block is mostly
          // paper even when its top lines are on the dirt, so a whole-block
          // average washed the defect out: at the position the client
          // rejected it read 8% against a 12% threshold I had invented, and
          // passed. Sampled here the two states are 4.2% and 0.0%, so the
          // check asserts zero rather than a fitted bound.
          const rg=document.createRange(); rg.selectNodeContents(c.querySelector('h3'));
          const b=rg.getBoundingClientRect();
          let dark=0, n=0;
          for(let gy=0; gy<8; gy++) for(let gx=0; gx<24; gx++){
            const px=b.left+b.width*(gx+0.5)/24, py=b.top+b.height*(gy+0.5)/8;
            const ix=Math.round((px-st2.left)/st2.width*cv.width);
            const iy=Math.round((py-st2.top)/st2.height*cv.height);
            if(ix<0||iy<0||ix>=cv.width||iy>=cv.height) { n++; continue; }
            const o=(iy*cv.width+ix)*4;
            const al=d[o+3];
            n++;
            if(al>120){
              const r=d[o],g=d[o+1],bl=d[o+2];
              // Soil: dark and warm. Sky: bright, and blue-dominant.
              if((r+g+bl)/3 < 140 && r >= bl) dark++;
            }
          }
          return {t:c.querySelector('h3').textContent.trim(),
                  darkPct:+(dark/n*100).toFixed(1)};
        });
      })();
      const arrowInk = arrows.filter(a=>a.getBoundingClientRect().width>0)
        .map(a=>({src:a.getAttribute('src').split('/').pop(),
                  w:a.naturalWidth, h:a.naturalHeight}));
      const narrow=(()=>{
        const spans=[...h.querySelectorAll('span')];
        const introEl=[...s.querySelectorAll('p')].find(p=>!p.closest('.regen-callout')&&!p.closest('.regen-diff-better'));
        const stageEl=s.querySelector('.regen-soil__stage');
        const c0=s.querySelector('.regen-callout');
        if(!introEl||!stageEl||!c0) return null;
        const B=e=>e.getBoundingClientRect();
        let minGap=Infinity;
        for(let i=1;i<spans.length;i++)
          minGap=Math.min(minGap, B(spans[i]).top-B(spans[i-1]).bottom);
        return {headOverlap: minGap<0?Math.round(minGap):0,
                introFs:Math.round(parseFloat(getComputedStyle(introEl).fontSize)),
                // Characters per line, from the widest rendered line and the
                // paragraph's average glyph width.
                introCpl:(()=>{const rg=document.createRange(); rg.selectNodeContents(introEl);
                  const rows={}; for(const q of rg.getClientRects()){const k=Math.round(q.top); rows[k]=(rows[k]||0)+q.width;}
                  const ws=Object.values(rows), sum=ws.reduce((a,b)=>a+b,0);
                  return Math.round(Math.max(...ws)*introEl.textContent.trim().length/sum);})(),
                calloutFs:Math.round(parseFloat(getComputedStyle(c0.querySelector('p')).fontSize)),
                stagePct:+(B(stageEl).width/innerWidth*100).toFixed(0),
                gutter:Math.round(B(c0).left)};
      })();
      return {arrowInk, onSoil, narrow, innerW:innerWidth,
              artW:+(stage.width/sec.width*100).toFixed(2),
              artLoaded:art.complete&&art.naturalWidth>0,
              // Positive = the sky reaches up past the paragraph's last line.
              skyOverlap: Math.round(ir.bottom-stage.top),
              introHasStacking: getComputedStyle(intro).zIndex!=='auto',
              items,
              overflow:document.documentElement.scrollWidth>innerWidth+1};
    });
    const innerW=m.innerW;
    console.log(`\n  --- ${label} (${w}px) ---`);
    ck('soil diagram loads', m.artLoaded);
    if(w>=1024){
      // 72.92%: Farm-minified 1 is 1513 of the 2075 artboard.
      ck('diagram at design width', Math.abs(m.artW-72.92)<1.5, `${m.artW}% vs 72.92%`);
      // The design's sky starts 179px above the intro text on a 2075 artboard.
      // Scaled to the viewport that is 179/2075 of the section width; require
      // the paragraph to actually sit ON the sky rather than above it.
      const want=Math.round(179/2075*w);
      ck('the sky runs behind the intro copy',
         m.skyOverlap > want*0.6, `paragraph overlaps the sky by ${m.skyOverlap}px (design ~${want})`);
      ck('intro copy has its own stacking context', m.introHasStacking);
    }
    for(const it of m.items){
      if(w>=1024){
        ck(`"${it.t}" is positioned`, it.pos==='absolute', it.pos);
        ck(`"${it.t}" arrow is drawn`, it.arrowShown);
        // The whole point: no arrow may touch its own glyphs.
        ck(`"${it.t}" arrow clears its own text`, !it.crosses,
           it.crosses?'crosses the copy':'clear');
      } else {
        ck(`"${it.t}" stacks in flow`, it.pos==='static', it.pos);
      }
      ck(`"${it.t}" stays inside the section`, it.inSection);
    }
    // No callout may sit on the SOIL. The soil is the dark, saturated lower
    // half of the artwork; the sky above it is pale and the callouts are
    // meant to overlap that. So this samples the pixels actually behind each
    // block's glyphs and fails on dark ones -- a box test against the
    // artwork cannot tell sky from soil, and the design's own blocks overlap
    // the artwork's box freely.
    if (w>=1024) for (const c of m.onSoil) {
      ck(`"${c.t}" does not sit on the soil`, c.darkPct === 0,
         c.darkPct ? `${c.darkPct}% of the heading's ground is soil` : 'over sky/paper');
    }
    // arr-animals shipped as a bare arc: its export had cropped the head off,
    // and nothing noticed, because loading and placing an asset says nothing
    // about what is DRAWN in it.
    //
    // This asserts the asset's dimensions, not a cleverer statistic. Three
    // attempts at inferring "has an arrowhead" from the bitmap -- stroke
    // thickness ratio, local ink density, and branching cross-sections --
    // each passed the headless arc, because a curve's own bend reproduces
    // every signal a head produces. The one unambiguous fact is that the
    // repaired artwork is 271x79 where the cropped one was 225x79: the head
    // is 46px of ink that the broken export did not contain. If this asset is
    // ever re-exported, re-measure and update the expectation here rather
    // than widening it.
    if (w>=1024) {
      const an = m.arrowInk.find(a=>/arr-animals/.test(a.src));
      if (an) ck('the animals arrow includes its head',
                 an.w===271 && an.h===79, `${an.w}x${an.h}, expected 271x79`);
    }
    // Narrow screens get a layout built for them rather than the design's
    // desktop proportions scaled down. Before this, at 390px: the heading's
    // three lines overlapped by 5px (their negative margins are tuned for a
    // 155px display size), the intro was a 154px ribbon at 13px because its
    // max-width is the design's 42%, the diagram rendered 201px wide, and the
    // wrapper's 3% side padding came to 12px.
    if(w<1024 && m.narrow){
      ck('heading lines do not overlap', m.narrow.headOverlap===0,
         `${m.narrow.headOverlap}px overlap`);
      ck('body copy is readable', m.narrow.introFs>=15 && m.narrow.calloutFs>=15,
         `intro ${m.narrow.introFs}px, callouts ${m.narrow.calloutFs}px`);
      // A readable MEASURE, 35-75 characters a line. This used to assert the
      // intro was wider than 70% of the viewport -- right when it was a 154px
      // ribbon on phones, but it rewarded the opposite failure on tablets,
      // where a full-width intro ran ~135 characters a line (review WI-11).
      ck('running text has a usable measure', m.narrow.introCpl>=35 && m.narrow.introCpl<=75,
         `${m.narrow.introCpl} characters a line`);
      ck('the diagram fills the column', m.narrow.stagePct>80, `${m.narrow.stagePct}%`);
      // A percentage gutter vanishes on a phone: the wrapper's 3% is 12px at
      // 390. This one holds at every size.
      ck('content keeps a real gutter', m.narrow.gutter>=16, `${m.narrow.gutter}px`);
    }
    ck('no broken regen assets', bad.length===0, bad.join(','));
    ck('no horizontal overflow', !m.overflow);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
