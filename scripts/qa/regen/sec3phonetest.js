const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// Section 3 (Regenerative Agriculture) on phones -- review item WI-8.
//
// The desktop lockup is a script "Regenerative" over an Ultra "AGRICULTURE"
// of about the same ink width; on phones the script shrank to 0.59x of it.
// The carton -- which in the design sits on the PURCHASE sign -- floated
// 332px above it at the top of the stack, and the "Get 'em here" arrow
// stopped 10px short of the sign it points at.
//
// Moving images over the sign risks them stealing its taps, so the sign is
// hit-tested at two points: elementFromPoint must land on the /products link.
(async()=>{
  const b=await chromium.launch();
  for(const w of [360,390,430,767]){
    const p=await b.newContext({viewport:{width:w,height:900},deviceScaleFactor:1}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(50);}
    await p.waitForTimeout(1000);
    await p.locator('.regen-agri-stage a[href="/products"]').scrollIntoViewIfNeeded();
    await p.waitForTimeout(500);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const st=document.querySelector('.regen-agri-stage');
      const sp=[...st.querySelector('h2').querySelectorAll('span')];
      const ink=el=>{const rg=document.createRange();rg.selectNodeContents(el);return rg.getBoundingClientRect();};
      const sign=st.querySelector('a[href="/products"]').getBoundingClientRect();
      const carton=st.querySelector('img[src*="carton"]').getBoundingClientRect();
      const getem=st.querySelector('img[src*="ann-getem"]').getBoundingClientRect();
      const link=st.querySelector('a[href="/products"]');
      const hit=(x,y)=>{const e=document.elementFromPoint(x,y); return !!e && (e===link||link.contains(e));};
      return {ratio:+(ink(sp[0]).width/ink(sp[1]).width).toFixed(2),
              cartonGap:Math.round(sign.top-carton.bottom),
              getemGap:Math.round(getem.top-sign.bottom),
              hitTop:hit((sign.left+sign.right)/2, sign.top+8),
              hitLowerRight:hit(sign.right-8, sign.bottom-8),
              pfs:parseFloat(getComputedStyle(st.querySelector('p')).fontSize)};
    });
    console.log(`  --- ${w}px ---`);
    ck(`${w}: script and display lines read as one lockup`, Math.abs(m.ratio-0.96)<=0.08, `${m.ratio}x vs 0.96x`);
    ck(`${w}: carton sits on the PURCHASE sign`, m.cartonGap<0, `${m.cartonGap}px ${m.cartonGap<0?'overlap':'apart'}`);
    ck(`${w}: "Get 'em here" arrow reaches the sign`, m.getemGap<0, `${m.getemGap}px`);
    ck(`${w}: sign's top centre taps through to /products`, m.hitTop);
    ck(`${w}: sign's lower right taps through to /products`, m.hitLowerRight);
    ck(`${w}: body copy 15-17px`, m.pfs>=15&&m.pfs<=17, `${m.pfs}px`);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
