const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(70);}
  await p.waitForTimeout(1300);
  const d=await p.evaluate(()=>{
    const a=[...document.querySelectorAll('a')].find(e=>e.textContent.trim()==='Our Story');
    const cs=getComputedStyle(a);
    const jam=[...document.querySelectorAll('a')].find(e=>/get jammin/i.test(e.textContent));
    // scope to the Jammy section: the site nav also has a Store Locator link
    const scope=document.querySelector('.jammy')||document;
    const sl=[...scope.querySelectorAll('a')].find(e=>/store locator/i.test(e.textContent));
    return {ff:cs.fontFamily.split(',')[0], fw:cs.fontWeight, fs:cs.fontSize,
            href:a.getAttribute('href'), text:a.textContent.trim(),
            tt:cs.textTransform, bg:cs.backgroundColor,
            jamFf:jam?getComputedStyle(jam).fontFamily.split(',')[0]:null,
            slFf:sl?getComputedStyle(sl).fontFamily.split(',')[0]:null};
  });
  // The Figma binds Cubano-Regular to both Our Story and Get Jammin', and
  // ProximaNova-Bold to Store Locator. QA's "Our Story should be Proxima
  // Nova" contradicts that; the design wins and NW has been asked to confirm.
  ck('Our Story matches the Figma (Cubano)', d.ff==='cubano', d.ff);
  ck('the two pill buttons match each other', d.ff===d.jamFf, `${d.ff} vs ${d.jamFf}`);
  ck('keeps the pill size', d.fs==='15px', d.fs);
  ck('keeps its uppercase treatment', d.tt==='uppercase', d.tt);
  ck('keeps the forest ground', d.bg==='rgb(46, 67, 34)', d.bg);
  ck('still links to /our-family', d.href==='/our-family', d.href);
  ck('Get Jammin stays Cubano (its QA row is about the link, not the font)',
     d.jamFf==='cubano', d.jamFf);
  ck('Store Locator unchanged', d.slFf==='proxima-nova', d.slFf);
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
