const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const [w,label] of [[1440,'desktop'],[390,'mobile']]){
    const p=await b.newContext({viewport:{width:w,height:1200},deviceScaleFactor:2}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(80);}
    await p.waitForTimeout(1200);
    const r=await p.evaluate(()=>{
      const ps=[...document.querySelectorAll('p')].filter(e=>/jammy egg is soft-boiled/i.test(e.textContent));
      if(!ps.length) return null;
      const para=ps[0];
      const txt=para.textContent.replace(/\s+/g,' ').trim();
      const sp=[...para.querySelectorAll('span')].find(s=>/every time/i.test(s.textContent));
      const cs=sp&&getComputedStyle(sp);
      // is the rest of the paragraph underlined? (it must not be)
      const pcs=getComputedStyle(para);
      return {txt, spanText:sp&&sp.textContent.trim(),
              deco:cs&&cs.textDecorationLine, paraDeco:pcs.textDecorationLine,
              color:cs&&cs.color, paraColor:pcs.color,
              fs:cs&&cs.fontSize, paraFs:pcs.fontSize,
              fw:cs&&cs.fontWeight, paraFw:pcs.fontWeight,
              ff:cs&&cs.fontFamily.split(',')[0], paraFf:pcs.fontFamily.split(',')[0]};
    });
    console.log(`\n  --- ${label} (${w}px) ---`);
    if(!r){ck('paragraph found',false);continue}
    console.log(`    "...${r.txt.slice(-46)}"`);
    ck('span wraps exactly "every time."', r.spanText==='every time.', r.spanText);
    ck('span is underlined', /underline/.test(r.deco||''), r.deco);
    ck('rest of paragraph is not underlined', !/underline/.test(r.paraDeco||''), r.paraDeco);
    ck('no doubled space before it', !/ {2}every time\./.test(r.txt) && / every time\.$/.test(r.txt));
    ck('sentence still reads correctly', /jammy center, every time\.$/.test(r.txt));
    ck('inherits paragraph type', r.fs===r.paraFs&&r.fw===r.paraFw&&r.ff===r.paraFf,
       `${r.fs}/${r.fw}/${r.ff}`);
    ck('inherits paragraph colour', r.color===r.paraColor, r.color);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
