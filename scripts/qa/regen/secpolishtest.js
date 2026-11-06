// Review item WI-21: the independent polish batch.
const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const [w,dpr] of [[390,3],[1440,2]]){
    const p=await b.newContext({viewport:{width:w,height:900},deviceScaleFactor:dpr}).then(c=>c.newPage());
    const reqs=[];p.on('request',r=>reqs.push(r.url()));
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
    await p.waitForTimeout(800);
    const m=await p.evaluate(()=>{
      const hero=document.querySelector('img[src*="hero-cattle"]');
      const carton=document.querySelector('.regen-hero-carton');
      // Photo-row stacked pair: which rows of the shared photograph does each
      // window show? The photo is painted by the window or by its column.
      const wins=[...document.querySelectorAll('[role="img"]')].filter(e=>/ranging among trees|plumage/i.test(e.getAttribute('aria-label')));
      const rows=wins.map(win=>{
        const painter=/row-hen-c/.test(getComputedStyle(win).backgroundImage)?win:win.parentElement;
        const cs=getComputedStyle(painter), E=painter.getBoundingClientRect(), W=win.getBoundingClientRect();
        const imgW=E.width*parseFloat(cs.backgroundSize)/100, scale=imgW/1306, imgH=734*scale;
        const off=(E.height-imgH)*parseFloat(cs.backgroundPositionY)/100;
        return [(W.top-E.top-off)/scale,(W.bottom-E.top-off)/scale];
      });
      const shared=rows.length===2?Math.max(0,Math.min(rows[0][1],rows[1][1])-Math.max(rows[0][0],rows[1][0])):-1;
      return {heroBg:getComputedStyle(hero.closest('section')).backgroundColor,
        heroW:hero.naturalWidth, heroSrc:(hero.currentSrc||'').split('/').pop(),
        prio:hero.getAttribute('fetchpriority'),
        cartonW:carton.naturalWidth,
        arrows:[...document.querySelectorAll('img[src*="arrow-hear"],img[src*="arrow-more"]')].map(a=>({src:a.getAttribute('src').split('/').pop(),shown:getComputedStyle(a).display!=='none',ok:a.complete&&a.naturalWidth>0,lazy:a.getAttribute('loading')})),
        shared:Math.round(shared), wins:wins.length};
    });
    console.log(`\n  --- ${w}px DPR${dpr} ---`);
    ck(`hero section paints its own blue at ${w}`, m.heroBg==='rgb(0, 96, 136)', m.heroBg);
    ck(`hero photo marked fetchpriority=high`, m.prio==='high', String(m.prio));
    // By the file chosen, not naturalWidth: with a srcset that reports the
    // density-corrected size (1440 at 1440), not the file's pixels.
    if(w===390) ck('phone downloads the 1200w hero photo', m.heroSrc==='hero-cattle-1200.jpg', m.heroSrc);
    else ck('desktop keeps the full-size hero photo', m.heroSrc==='hero-cattle.jpg', m.heroSrc);
    ck(`carton from the 1023px source at ${w}`, m.cartonW===1023, `${m.cartonW}w`);
    const arrowReqs=reqs.filter(u=>/arrow-(hear|more)\.png/.test(u));
    if(w===390) ck('hidden annotation arrows are not downloaded on a phone', arrowReqs.length===0, arrowReqs.map(u=>u.split('/').pop()).join(','));
    else ck('annotation arrows load where they are shown', m.arrows.length===2&&m.arrows.every(a=>a.shown&&a.ok), JSON.stringify(m.arrows.map(a=>a.ok)));
    ck(`stacked photo windows show different parts of the shot at ${w}`, m.wins===2&&m.shared===0, `${m.shared} source rows shared`);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
