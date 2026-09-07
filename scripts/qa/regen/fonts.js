const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:900}}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  await p.waitForTimeout(2500);
  const r=await p.evaluate(async()=>{
    await document.fonts.ready;
    // document.fonts.check() returns true for faces it cannot actually load,
    // so compare rendered glyph widths against the generic fallbacks instead.
    const mk=fam=>{const s=document.createElement('span');
      s.style.cssText=`position:absolute;visibility:hidden;font:400 100px ${fam};white-space:nowrap`;
      s.textContent='Regenerative Handgloves'; document.body.appendChild(s);
      const w=s.getBoundingClientRect().width; s.remove(); return Math.round(w);};
    const base={serif:mk('serif'),sans:mk('sans-serif'),cursive:mk('cursive'),mono:mk('monospace')};
    // Only the faces the page actually renders in. Rockwell sits in the
    // stacks behind Ultra as a fallback and never paints, so testing it
    // would assert something the page does not do.
    const want={'nexa-rust-script-shad-2':mk('"nexa-rust-script-shad-2"'),
                'Ultra':mk('"Ultra"'),'din-condensed':mk('"din-condensed"'),
                'Lato':mk('"Lato"')};
    return {base,want,
            kit:(document.querySelector('link[href*="typekit"]')||{}).href||''};
  });
  console.log(`  kit: ${r.kit.split('/').pop()}`);
  console.log(`  fallback widths: ${Object.entries(r.base).map(([k,v])=>k+' '+v).join(', ')}\n`);
  for(const [fam,w] of Object.entries(r.want)){
    const isFallback=Object.values(r.base).some(v=>Math.abs(v-w)<=2);
    ck(`${fam} renders its own face`, !isFallback, `${w}px`);
  }
  ck('using the client-owned kit', /gqk7pcv/.test(r.kit), r.kit.split('/').pop());
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
