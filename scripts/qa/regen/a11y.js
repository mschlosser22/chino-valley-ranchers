const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:900}}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
  await p.waitForTimeout(1400);
  const m=await p.evaluate(()=>{
    const main=document.querySelector('main')||document.body;
    const heads=[...document.querySelectorAll('h1,h2,h3')].map(h=>({
      lvl:+h.tagName[1], text:h.textContent.replace(/\s+/g,' ').trim().slice(0,42)}));
    const imgs=[...document.querySelectorAll('img')];
    const regen=imgs.filter(i=>/\/images\/regen\//.test(i.getAttribute('src')||''));
    const noAlt=regen.filter(i=>i.getAttribute('alt')===null);
    const decorative=regen.filter(i=>i.getAttribute('alt')==='');
    const meaningful=regen.filter(i=>(i.getAttribute('alt')||'').length>0);
    const ariaHidden=decorative.filter(i=>i.getAttribute('aria-hidden')==='true');
    // heading order jumps
    let jumps=[];
    for(let i=1;i<heads.length;i++)
      if(heads[i].lvl-heads[i-1].lvl>1) jumps.push(`${heads[i-1].lvl}->${heads[i].lvl} at "${heads[i].text}"`);
    const links=[...document.querySelectorAll('a')].filter(a=>{
      const r=a.getBoundingClientRect(); return r.width>0;});
    const namelessLinks=links.filter(a=>!(a.textContent.trim()||a.getAttribute('aria-label')||
      (a.querySelector('img')&&a.querySelector('img').getAttribute('alt'))));
    return {h1:heads.filter(h=>h.lvl===1).length,
            heads:heads.length, jumps,
            regen:regen.length, noAlt:noAlt.length,
            decorative:decorative.length, meaningful:meaningful.length,
            ariaHiddenOK:ariaHidden.length===decorative.length,
            namelessLinks:namelessLinks.length,
            order:heads.slice(0,14)};
  });
  console.log('  heading outline:');
  m.order.forEach(h=>console.log(`    ${'  '.repeat(h.lvl-1)}h${h.lvl}  ${h.text}`));
  console.log('');
  ck('exactly one h1', m.h1===1, `${m.h1}`);
  ck('no skipped heading levels', m.jumps.length===0, m.jumps.join('; '));
  ck('every regen image declares alt', m.noAlt===0, `${m.noAlt} missing`);
  ck('decorative images are aria-hidden', m.ariaHiddenOK, `${m.decorative} decorative`);
  ck('meaningful images carry descriptions', m.meaningful>=8, `${m.meaningful} described`);
  ck('every visible link has an accessible name', m.namelessLinks===0, `${m.namelessLinks} nameless`);
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
