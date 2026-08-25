const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000}}).then(c=>c.newPage());
  const kits=[];
  p.on('request',r=>{const u=r.url(); if(/typekit/.test(u)) kits.push(u);});
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:'Cookie consent'}).getByRole('button',{name:'Reject all'}).click().catch(()=>{});
  await p.waitForTimeout(2500);

  ck('new kit gqk7pcv is requested', kits.some(u=>u.includes('gqk7pcv')), kits.filter(u=>/\.css/.test(u))[0]||'none');
  ck('old kit yyq5ssh is gone', !kits.some(u=>u.includes('yyq5ssh')));

  // document.fonts is the authority on what actually loaded
  const loaded = await p.evaluate(()=>{
    const out=[];
    document.fonts.forEach(f=>out.push(`${f.family}|${f.weight}|${f.status}`));
    return [...new Set(out)].sort();
  });
  const has=(fam,w)=>loaded.some(x=>x.startsWith(fam+'|'+w)&&x.endsWith('loaded'));
  ck('proxima-nova 400 loaded', has('proxima-nova','400'));
  ck('proxima-nova 700 loaded', has('proxima-nova','700'));
  ck('cubano 400 loaded', has('cubano','400'));

  // computed styles: is the page actually USING them?
  const used = await p.evaluate(()=>{
    const pick=(sel)=>{const e=document.querySelector(sel); return e?getComputedStyle(e).fontFamily:'—';};
    const h2=[...document.querySelectorAll('.jammy h2')][0];
    const para=[...document.querySelectorAll('.jammy p')].find(x=>x.textContent.trim().length>40);
    return { body:pick('.jammy'), display:h2?getComputedStyle(h2).fontFamily:'—',
             para:para?getComputedStyle(para).fontFamily:'—' };
  });
  ck('body text resolves to proxima-nova', /proxima-nova/.test(used.body), used.body.slice(0,50));
  ck('headings resolve to cubano', /cubano/.test(used.display), used.display.slice(0,44));

  // Actually rendered? Compare glyph widths against the fallback.
  const rendered = await p.evaluate(async ()=>{
    const measure=(fam)=>{const c=document.createElement('canvas').getContext('2d');
      c.font='40px '+fam; return c.measureText('Jammy Egg Handgloves').width;};
    await document.fonts.ready;
    return { proxima:measure('proxima-nova'), figtree:measure('Figtree'),
             cubano:measure('cubano'), anton:measure('Anton'), arial:measure('Arial') };
  });
  ck('proxima-nova renders (≠ Arial fallback)', Math.abs(rendered.proxima-rendered.arial)>1,
     `proxima ${rendered.proxima.toFixed(1)} vs arial ${rendered.arial.toFixed(1)}`);
  ck('cubano renders (≠ Arial fallback)', Math.abs(rendered.cubano-rendered.arial)>1,
     `cubano ${rendered.cubano.toFixed(1)} vs arial ${rendered.arial.toFixed(1)}`);

  await p.close(); await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
