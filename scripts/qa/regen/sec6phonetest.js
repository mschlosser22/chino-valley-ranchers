const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// Section 6 (Highest Standards) below 768px -- review item WI-1.
//
// The burlap mask is stretched to the section's own height and its bottom tear
// starts at row 998 of 1262: everything below 79.1% of the section is torn
// away. Stacked on a phone, the hen was the last thing in the column and
// always landed in that band -- its bottom sat at 98% of the section and the
// tear cut it through the body, legs and feet gone. The fix puts the ROC mark
// and the hen side by side (as the desktop design does), so the hen has to
// clear the tear, not merely the section box.
//
// Also guards the phone type: the heading had dropped to 20px -- smaller than
// the 22px "BETTER FOR..." lines further down, inverting the page hierarchy --
// sat 21px off-centre at 360 because of nowrap in a narrow column, and the
// body copy was 13px against 16px everywhere else on the page.
(async()=>{
  const b=await chromium.launch();
  for(const w of [360,390,430,600,700]){
    const p=await b.newContext({viewport:{width:w,height:900},deviceScaleFactor:2}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
    await p.waitForTimeout(1200);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const h=[...document.querySelectorAll('h2')].find(e=>/highest standards/i.test(e.textContent));
      const s=h.closest('section'); const sb=s.getBoundingClientRect();
      const hen=s.querySelector('img[src*="hen-standing-photo"]').getBoundingClientRect();
      const roc=s.querySelector('img[src*="roc-logo"]').getBoundingClientRect();
      const para=s.querySelector('p');
      const rg=document.createRange(); rg.selectNodeContents(h); const ink=rg.getBoundingClientRect();
      const better=[...document.querySelectorAll('body *')].find(e=>e.children.length===0&&/better for the land/i.test(e.textContent));
      return {
        henBotPct:+((hen.bottom-sb.top)/sb.height*100).toFixed(1),
        rocBotPct:+((roc.bottom-sb.top)/sb.height*100).toFixed(1),
        // Side by side means the two boxes share rows and do not share columns.
        // A centre-distance test passed the stacked layout: the logo sits right
        // on top of the hen, so their centres were closer than the hen is tall.
        sideBySide: roc.right <= hen.left + 4 && Math.min(roc.bottom,hen.bottom) - Math.max(roc.top,hen.top) > 0,
        inkOff:+((ink.left+ink.right)/2-innerWidth/2).toFixed(1),
        h2fs:parseFloat(getComputedStyle(h).fontSize),
        betterFs:better?parseFloat(getComputedStyle(better).fontSize):null,
        pfs:parseFloat(getComputedStyle(para).fontSize),
        headToPara:+(para.getBoundingClientRect().top-ink.bottom).toFixed(1),
        gutter:+(para.getBoundingClientRect().left-sb.left).toFixed(1),
        overflow:document.documentElement.scrollWidth>innerWidth+1,
      };
    });
    console.log(`  --- ${w}px ---`);
    // 78.5% leaves a margin under the 79.1% where the rip begins.
    ck(`${w}: hen clears the burlap tear`, m.henBotPct<=78.5, `hen bottom at ${m.henBotPct}% (tear from 79.1%)`);
    ck(`${w}: ROC mark clears the burlap tear`, m.rocBotPct<=78.5, `${m.rocBotPct}%`);
    ck(`${w}: ROC mark and hen sit side by side`, m.sideBySide);
    ck(`${w}: heading centred`, Math.abs(m.inkOff)<=3, `${m.inkOff}px off centre`);
    ck(`${w}: heading not smaller than the BETTER lines`, m.betterFs!==null && m.h2fs>=m.betterFs,
       `${m.h2fs}px vs ${m.betterFs}px`);
    ck(`${w}: body copy at the page's 16px`, m.pfs>=16, `${m.pfs}px`);
    ck(`${w}: heading clear of the paragraph`, m.headToPara>=12, `${m.headToPara}px`);
    // 7% of the viewport, the column the rest of the page's phone sections use.
    ck(`${w}: page gutter`, Math.abs(m.gutter-w*0.07)<=3, `${m.gutter}px vs ${(w*0.07).toFixed(1)}px`);
    ck(`${w}: no horizontal overflow`, !m.overflow);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
