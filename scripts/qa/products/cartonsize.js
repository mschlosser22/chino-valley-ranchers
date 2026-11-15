// /products: cartons on phones and tablets ~3x bigger (business request, 15 Nov 2026).
// Measures the PAINTED carton (object-fit: contain), not the <img> box, which fills its slot.
const { chromium } = require('playwright');
const fs=require('fs');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
const BASE=process.env.BASE||'http://localhost:7500';
const OUT=process.env.OUT; // optional baseline file to write/compare desktop geometry
(async()=>{
  const b=await chromium.launch();
  const all={};
  for(const w of [360,390,430,768,1023,1280,1440]){
    const p=await b.newContext({viewport:{width:w,height:900}}).then(c=>c.newPage());
    const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,100)));
    await p.goto(BASE+'/products',{waitUntil:'networkidle',timeout:90000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    // scroll through so lazy images load
    for(let y=0;y<await p.evaluate(()=>document.body.scrollHeight);y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
    await p.waitForTimeout(800);
    const m=await p.evaluate(()=>[...document.querySelectorAll('h3')].filter(h=>h.closest('.max-w-7xl')&&h.closest('.grid')&&h.closest('.grid').querySelector('img[alt="Border"]')).map(h=>{
      const block=h.closest('.grid');
      const img=block.querySelector('img:not([alt="Border"])');
      const r=img.getBoundingClientRect();
      const s=img.complete&&img.naturalWidth?Math.min(r.width/img.naturalWidth,r.height/img.naturalHeight):0;
      const pw=img.naturalWidth*s, ph=img.naturalHeight*s;
      const btn=[...block.querySelectorAll('a')].find(a=>/learn more|buy|more/i.test(a.textContent))||block.querySelector('a');
      const br=btn&&btn.getBoundingClientRect();
      const paras=[...block.querySelectorAll('p')];
      const lastP=paras[paras.length-1].getBoundingClientRect();
      const paintTop=r.top+(r.height-ph)/2, paintBot=paintTop+ph;
      const contentW=block.getBoundingClientRect().width-parseFloat(getComputedStyle(block).paddingLeft)-parseFloat(getComputedStyle(block).paddingRight);
      return {name:h.textContent.trim(),slotW:Math.round(r.width),slotH:Math.round(r.height),ok:img.complete&&img.naturalWidth>0,pw:Math.round(pw),ph:Math.round(ph),
        contentW:Math.round(contentW),
        gapAboveCarton:Math.round(paintTop-lastP.bottom),
        btnBelow:br?Math.round(br.top-paintBot):null,
        btnOverlap:br?!(br.bottom<=paintTop||br.top>=paintBot||br.right<=r.left+(r.width-pw)/2||br.left>=r.left+(r.width+pw)/2):false,
        top:Math.round(r.top+scrollY), bh:Math.round(block.getBoundingClientRect().height)};
    }));
    const overflow=await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    all[w]=m;
    console.log(`\n  --- ${w} ---`);
    m.forEach(x=>console.log(`    ${x.name.padEnd(36)} painted ${x.pw}x${x.ph} (col ${x.contentW}) gapAbove ${x.gapAboveCarton} btnBelow ${x.btnBelow}`));
    if(w<1024){
      // as large as the slot allows: fills its width, or (tall packs) its height
      const small=m.filter(x=>!(x.pw>=x.slotW-2||x.ph>=x.slotH-2));
      ck(`every carton fills its slot at ${w}`, small.length===0, small.map(x=>`${x.name} ${x.pw}x${x.ph} in ${x.slotW}x${x.slotH}`).join(', '));
      const narrow=m.filter(x=>x.slotW<Math.min(x.contentW,560)-2);
      ck(`every slot is the full column width (560px cap) at ${w}`, narrow.length===0, narrow.map(x=>`${x.name} ${x.slotW}/${x.contentW}`).join(', '));
      const tiny=m.filter(x=>x.ph<x.slotW*0.4);
      ck(`every carton paints at least 40% of the column width tall at ${w}`, tiny.length===0, tiny.map(x=>`${x.name} ${x.ph}px`).join(', '));
      const regen=m.find(x=>x.name==='Organic Regenerative');
      ck(`Regenerative carton is ~3x its old 112px width at ${w}`, !!regen&&regen.pw>=Math.min(3*112,regen.contentW,560)-2, regen?`${regen.pw}px`:'missing');
      const ov=m.filter(x=>x.btnOverlap||x.btnBelow<0);
      ck(`no Learn More button overlaps its carton at ${w}`, ov.length===0, ov.map(x=>x.name).join(', '));
      const tight=m.filter(x=>x.gapAboveCarton<0);
      ck(`no carton overlaps its copy at ${w}`, tight.length===0, tight.map(x=>`${x.name} ${x.gapAboveCarton}`).join(', '));
    }
    ck(`every carton image loads at ${w}`, m.every(x=>x.ok), m.filter(x=>!x.ok).map(x=>x.name).join(', '));
    ck(`no horizontal overflow at ${w}`, overflow<=0, `${overflow}px`);
    ck(`no page errors at ${w}`, errs.length===0, errs.join(' | '));
    await p.close();
  }
  if(OUT&&!fs.existsSync(OUT)){fs.writeFileSync(OUT,JSON.stringify({1280:all[1280],1440:all[1440]}));console.log('\n  wrote desktop baseline',OUT);}
  else if(OUT){
    const base=JSON.parse(fs.readFileSync(OUT));
    for(const w of [1280,1440]){
      const diff=all[w].filter((x,i)=>{const o=base[w][i];return !o||o.name!==x.name||o.pw!==x.pw||o.ph!==x.ph||o.top!==x.top||o.bh!==x.bh});
      ck(`desktop layout unchanged at ${w}`, diff.length===0, diff.map(x=>x.name).join(', '));
    }
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
