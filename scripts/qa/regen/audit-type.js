const { chromium } = require('playwright');
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:900}}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
  await p.waitForTimeout(1500);
  const r=await p.evaluate(async()=>{
    await document.fonts.ready;
    const scope=[...document.querySelectorAll('section')].filter(s=>
      s.querySelector('img[src*="/images/regen/"]')||/regenerative|standards|generation/i.test(s.textContent));
    const fams={}, cols={};
    scope.forEach(s=>{
      s.querySelectorAll('h1,h2,h3,p,span,a').forEach(e=>{
        const t=[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim();
        if(t.length<3) return;
        const cs=getComputedStyle(e);
        const f=cs.fontFamily.split(',')[0].replace(/["']/g,'');
        fams[f]=(fams[f]||0)+1;
        cols[cs.color]=(cols[cs.color]||0)+1;
      });
    });
    return {fams,cols,
      loaded:{ultra:document.fonts.check('400 16px "Ultra"'),
              nexa:document.fonts.check('400 16px "nexa-rust-script-shad-2"'),
              din:document.fonts.check('700 16px "din-condensed"'),
              lato:document.fonts.check('400 16px "Lato"'),
              rockwell:document.fonts.check('400 16px "rockwell"')}};
  });
  const hex=c=>{const m=c.match(/\d+/g); return m?'#'+m.slice(0,3).map(x=>(+x).toString(16).padStart(2,'0')).join('').toUpperCase():c;};
  console.log('  FONT FAMILIES IN USE');
  Object.entries(r.fams).sort((a,b)=>b[1]-a[1]).forEach(([f,n])=>console.log(`    ${f.padEnd(28)} ${n} element(s)`));
  console.log('\n  FONTS AVAILABLE');
  Object.entries(r.loaded).forEach(([k,v])=>console.log(`    ${k.padEnd(10)} ${v?'yes':'NO'}`));
  console.log('\n  TEXT COLOURS IN USE');
  // Sampled from the design render, not guessed: each is the dominant
  // colour over tens of thousands of pixels of that element.
  const TOK={'#006088':'teal','#B01014':'red','#7CA854':'green','#F8A014':'orange',
             '#FFFFFF':'white','#2B2B2B':'body ink'};
  Object.entries(r.cols).sort((a,b)=>b[1]-a[1]).forEach(([c,n])=>{
    const h=hex(c); console.log(`    ${h}  ${String(n).padStart(3)}x  ${TOK[h]||'<-- unrecognised'}`);
  });
  await b.close();
})();
