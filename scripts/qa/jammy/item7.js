// QA: "Can you please remove 'Available at Trader Joe's' from the Jammy
// landing page."
//
// This suite used to assert the OPPOSITE -- that the line was present, in
// bold Proxima Nova, not uppercased, and rendering in sentence case (it had
// shipped in Cubano and uppercased, which was an earlier QA item). The
// business has since asked for the line to come off the page entirely, so
// every one of those checks is obsolete and the suite guards the removal
// instead.
//
// Checks the RENDERED page, not the source. The line could come back from a
// revert of the component, a stale CMS block, or a different component that
// renders the same copy -- scanning the DOM text catches all three, where
// grepping one file would not. Matches on "Trader Joe" alone rather than the
// full sentence so a reworded variant ("Now at Trader Joe's") is caught too.
const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000}}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(90);}
  await p.waitForTimeout(1200);

  const found=await p.evaluate(()=>{
    const hits=[...document.querySelectorAll('.jammy *')]
      .filter(e=>e.children.length===0 && /Trader Joe/i.test(e.textContent))
      .map(e=>e.textContent.trim());
    return {hits, bodyHas:/Trader Joe/i.test(document.querySelector('.jammy').innerText)};
  });
  ck('no "Trader Joe" text anywhere in the landing page',
     found.hits.length===0 && !found.bodyHas,
     found.hits.length?found.hits.join(' | '):'none');

  // The line sat in a gap-based flex column, so removing it should not strand
  // whitespace. Its former neighbours are the body paragraph and the bag art.
  const layout=await p.evaluate(()=>{
    const h2=[...document.querySelectorAll('.jammy h2')].find(x=>/hard part/i.test(x.textContent));
    if(!h2) return null;
    const col=h2.parentElement;
    const kids=[...col.children].map(e=>e.tagName.toLowerCase());
    const r=col.getBoundingClientRect();
    return {kids, bottomGap:+(r.bottom-[...col.children].pop().getBoundingClientRect().bottom).toFixed(1)};
  });
  ck('the copy column closed up cleanly', layout && layout.bottomGap<1,
     layout?`children ${layout.kids.join(',')}  trailing gap ${layout.bottomGap}px`:'column not found');

  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
