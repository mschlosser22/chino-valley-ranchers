const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// Jammy page, QA item 1: the "Mind the drip" drop-in must be smooth.
// QA: "a little jerky/glitchy when it animates/drops in. Once it's in place,
// the looping animation looks good."
//
// Two separate causes, both asserted here:
//
//  1. A 23.9px drop-shadow sat on the <h1> WRAPPING the animating <img>, so
//     the blur was re-rendered over the moving wordmark every frame. That is
//     a real repaint, and it dropped 5 frames over 20ms (worst 24.8ms) during
//     a 1.25s animation. The filter belongs on the layer that moves.
//
//  2. The keyframes carried one cubic-bezier on the shorthand, which CSS
//     applies BETWEEN EVERY PAIR of keyframes -- so the wordmark eased out and
//     back in at each one and visibly slowed mid-drop. Each segment now
//     carries the easing its phase needs.
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000}}).then(c=>c.newPage());
  // Warm the route first. These are frame-timing assertions, and the very
  // first request after a dev-server rebuild pays for compilation -- which
  // shows up as dropped frames that have nothing to do with the animation.
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  await p.waitForTimeout(400);
  await p.reload({waitUntil:'domcontentloaded'});

  // Frame cadence through the whole drop-in, measured live.
  const frames=await p.evaluate(()=>new Promise(res=>{
    const out=[]; let last=performance.now(); const t0=last;
    const tick=()=>{
      const now=performance.now(); out.push(now-last); last=now;
      if(now-t0<1700) requestAnimationFrame(tick); else res(out);
    };
    requestAnimationFrame(tick);
  }));
  const long=frames.filter(f=>f>20).length;
  const worst=Math.max(...frames);

  const m=await p.evaluate(()=>{
    const art=document.querySelector('[data-lockup-art]');
    const h1=art.closest('h1');
    const cs=getComputedStyle(art), hs=getComputedStyle(h1);
    return {artFilter:cs.filter, h1Filter:hs.filter,
            artWillChange:cs.willChange,
            finalOpacity:cs.opacity,
            wobble:hs.animationName};
  });

  // The blur must be on the animating element, not an ancestor of it.
  ck('the drop-shadow is on the artwork, not its wrapper',
     /drop-shadow/.test(m.artFilter) && !/drop-shadow/.test(m.h1Filter),
     `art: ${m.artFilter.slice(0,40)} | h1: ${m.h1Filter}`);
  ck('the artwork is promoted for compositing',
     /transform/.test(m.artWillChange), m.artWillChange);

  // Cadence, with bounds taken from 5 runs of each state rather than picked:
  //   before -- 3-8 long frames, worst 22.1-26.7ms, ~170 frames rendered
  //   after  -- 0-1 long frames, worst 18.9-21.0ms, ~189 frames rendered
  // Frame timing varies between runs, so these sit in the gap between the two
  // distributions instead of demanding a perfect run.
  ck('few dropped frames during the drop-in', long<=2, `${long} frames over 20ms`);
  ck('no long frame stalls', worst<22, `worst frame ${worst.toFixed(1)}ms`);
  // The most reliable signal: with the repaint gone the browser fits
  // noticeably more frames into the same window.
  ck('the browser is not stalling on repaints', frames.length>=180,
     `${frames.length} frames in 1700ms (was ~170)`);

  // The keyframes must carry their own per-segment easing.
  const eased=await p.evaluate(()=>{
    for(const sheet of document.styleSheets){
      let rules; try{ rules=sheet.cssRules; }catch(e){ continue; }
      for(const r of rules){
        if(r.type===CSSRule.KEYFRAMES_RULE && r.name==='jammyDripBounce'){
          let n=0;
          for(const k of r.cssRules) if(k.style.animationTimingFunction) n++;
          return {found:true, withEasing:n, total:r.cssRules.length};
        }
      }
    }
    return {found:false};
  });
  ck('the bounce keyframes carry per-segment easing',
     eased.found && eased.withEasing>=4,
     eased.found?`${eased.withEasing} of ${eased.total} keyframes`:'keyframes not found');

  // And it still ends where it should, handing off to the loop QA liked.
  await p.waitForTimeout(1200);
  const end=await p.evaluate(()=>{
    const art=document.querySelector('[data-lockup-art]');
    const m=new DOMMatrixReadOnly(getComputedStyle(art).transform);
    return {op:getComputedStyle(art).opacity, y:+m.m42.toFixed(1),
            wobble:getComputedStyle(art.closest('h1')).animationName};
  });
  ck('settles fully visible and in place', end.op==='1' && Math.abs(end.y)<1, `opacity ${end.op}, y ${end.y}`);
  ck('hands off to the looping wobble', end.wobble==='jammyWobble', end.wobble);

  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
