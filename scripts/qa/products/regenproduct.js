// Organic Regenerative at the top of /products (business request, 12 Nov 2026).
const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
const COPY=[
  "Our Organic Regenerative eggs go beyond organic. They come from pasture-raised hens on family farms that use regenerative practices like cover crops, compost, rotational grazing and keeping living roots in the ground year-round. These practices build healthier soil and support a balanced ecosystem, and our hens help by naturally fertilizing the land and keeping pests in check.",
  "As the original trailblazers of organic egg farming, we’re proud that these eggs are Regenerative Organic Certified, one of the highest standards for organic agriculture in the world. Better for the land, better for our hens, and better eggs for you.",
];
(async()=>{
  const b=await chromium.launch();
  for(const w of [1440,390]){
    const p=await b.newContext({viewport:{width:w,height:900}}).then(c=>c.newPage());
    const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,100)));
    await p.goto('http://localhost:7500/products',{waitUntil:'networkidle',timeout:90000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    console.log(`\n  --- ${w} ---`);
    const m=await p.evaluate(()=>{
      const heads=[...document.querySelectorAll('h3')].filter(h=>h.closest('.max-w-7xl'));
      const first=heads[0]; if(!first) return null;
      const block=first.closest('.grid');
      const img=block.querySelector('img:not([alt="Border"])');
      const a=[...block.querySelectorAll('a')].find(x=>/learn more/i.test(x.textContent));
      return {names:heads.slice(0,3).map(h=>h.textContent.trim()),
        paras:[...block.querySelectorAll('p')].map(x=>x.textContent.trim()),
        img:img?{src:img.currentSrc||img.src,alt:img.alt,ok:img.complete&&img.naturalWidth>0,w:img.getBoundingClientRect().width}:null,
        href:a&&a.getAttribute('href')};
    });
    ck(`Organic Regenerative is the first product at ${w}`, !!m&&m.names[0]==='Organic Regenerative', m?m.names.join(' | '):'no products');
    ck(`its copy is the business's, word for word, at ${w}`, !!m&&m.paras.length===2&&m.paras[0]===COPY[0]&&m.paras[1]===COPY[1],
       m?m.paras.map(x=>x.slice(0,40)).join(' / '):'');
    ck(`its carton image loads, with alt text, at ${w}`, !!m&&!!m.img&&m.img.ok&&/regenerative/i.test(m.img.alt)&&m.img.w>100, m&&m.img?`${m.img.alt} ${Math.round(m.img.w)}px`:'');
    ck(`Learn More goes to the Regenerative page at ${w}`, !!m&&m.href==='/regenerative', m?String(m.href):'');
    ck(`no page errors at ${w}`, errs.length===0, errs.join(' | '));
    ck(`the other products are still listed at ${w}`, await p.evaluate(()=>[...document.querySelectorAll('h3')].filter(h=>h.closest('.max-w-7xl')).length)>=13);
    await p.close();
  }
  const r=await (await b.newContext()).request.get('http://localhost:7500/regenerative');
  ck('/regenerative returns 200', r.status()===200, String(r.status()));
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
