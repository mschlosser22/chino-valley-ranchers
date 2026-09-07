const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
  await p.waitForTimeout(1500);
  // Every torn asset must be opaque right across its own width. A notch in
  // the source artwork shows up as a column of low coverage, which is what
  // produced the visible steps in the rendered page.
  // card-torn is torn on all four sides by design, so only the strips that
  // butt against the next band need a solid bottom.
  const assets=['torn-edge.png','edge-white-top.png'];
  for(const name of assets){
    const r=await p.evaluate(async(n)=>{
      const img=new Image(); img.src='/images/regen/'+n;
      await img.decode();
      const c=document.createElement('canvas'); c.width=img.naturalWidth; c.height=img.naturalHeight;
      const x=c.getContext('2d'); x.drawImage(img,0,0);
      const d=x.getImageData(0,0,c.width,c.height).data;
      let worst=1, worstX=0;
      for(let px=0; px<c.width; px+=4){
        let op=0;
        for(let py=0; py<c.height; py++) if(d[(py*c.width+px)*4+3]>200) op++;
        const cov=op/c.height;
        if(cov<worst){worst=cov; worstX=px;}
      }
      // the bottom row must be solid all the way across
      let bottomGaps=0;
      const y=c.height-1;
      for(let px=0; px<c.width; px++) if(d[(y*c.width+px)*4+3]<=200) bottomGaps++;
      return {w:c.width, h:c.height, worst:+(worst*100).toFixed(0), worstX, bottomGaps};
    }, name);
    ck(`${name} solid along its bottom edge`, r.bottomGaps===0, `${r.bottomGaps} gap px of ${r.w}`);
    ck(`${name} no notch in the artwork`, r.worst>=25, `min column ${r.worst}% at x${r.worstX}`);
  }
  // and on the page: no torn strip should stop short of the viewport
  // the card still must not carry a notch
  const card=await p.evaluate(async()=>{
    const img=new Image(); img.src='/images/regen/card-torn.png';
    await img.decode();
    const c=document.createElement('canvas'); c.width=img.naturalWidth; c.height=img.naturalHeight;
    const x=c.getContext('2d'); x.drawImage(img,0,0);
    const d=x.getImageData(0,0,c.width,c.height).data;
    let worst=1;
    for(let px=0;px<c.width;px+=4){let op=0;
      for(let py=0;py<c.height;py++) if(d[(py*c.width+px)*4+3]>200) op++;
      worst=Math.min(worst,op/c.height);}
    return +(worst*100).toFixed(0);
  });
  ck('card-torn.png no notch in the artwork', card>=60, `min column ${card}%`);

  const strips=await p.evaluate(()=>{
    const out=[];
    document.querySelectorAll('img[src*="torn-edge"]').forEach(i=>{
      const r=i.getBoundingClientRect(); out.push({kind:'hero edge', w:Math.round(r.width)});});
    [...document.querySelectorAll('div')].filter(d=>/edge-white-top/.test(getComputedStyle(d).maskImage||getComputedStyle(d).webkitMaskImage||''))
      .forEach(d=>{const r=d.getBoundingClientRect(); out.push({kind:'masked edge', w:Math.round(r.width)});});
    return {out, vw:innerWidth};
  });
  strips.out.forEach(s=>ck(`${s.kind} spans the viewport`, Math.abs(s.w-strips.vw)<=2, `${s.w} of ${strips.vw}`));
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
