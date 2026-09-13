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
  for(const [w,label] of [[1440,'desktop'],[1100,'narrow desktop'],[390,'mobile']]){
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
      const arrowInk = arrows.filter(a=>a.getBoundingClientRect().width>0)
        .map(a=>({src:a.getAttribute('src').split('/').pop(),
                  w:a.naturalWidth, h:a.naturalHeight}));
      return {arrowInk,
              artW:+(stage.width/sec.width*100).toFixed(2),
              artLoaded:art.complete&&art.naturalWidth>0,
              // Positive = the sky reaches up past the paragraph's last line.
              skyOverlap: Math.round(ir.bottom-stage.top),
              introHasStacking: getComputedStyle(intro).zIndex!=='auto',
              items,
              overflow:document.documentElement.scrollWidth>innerWidth+1};
    });
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
    ck('no broken regen assets', bad.length===0, bad.join(','));
    ck('no horizontal overflow', !m.overflow);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
