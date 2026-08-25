const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  let p=await b.newContext({viewport:{width:1440,height:1000}}).then(c=>c.newPage());
  const hosts=new Set();
  p.on('request',r=>{try{const h=new URL(r.url()).hostname;
    if(!/localhost|127\.0\.0\.1|typekit|fonts\.googleapis|fonts\.gstatic/.test(h)) hosts.add(h);}catch{}});
  await p.goto('http://localhost:7500/jammy',{waitUntil:'load',timeout:60000});
  const cookiesPre=(await p.context().cookies()).length;
  ck('consent: no tracking hosts pre-consent', hosts.size===0, [...hosts].join(',')||'none');
  ck('consent: no cookies pre-consent', cookiesPre===0, `${cookiesPre}`);
  await p.getByRole('region',{name:'Cookie consent'}).getByRole('button',{name:'Reject all'}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=600){await p.evaluate(v=>window.scrollTo(0,v),y);await p.waitForTimeout(100);}
  await p.waitForTimeout(1500);

  const r=await p.evaluate(()=>{
    const tiles=[...document.querySelectorAll('.jammy-tiles [data-tile]')].map(d=>d.querySelector('img').getAttribute('src').split('/').pop());
    const a=[...document.querySelectorAll('.jammy a')].find(x=>/get jammin/i.test(x.textContent));
    const badge=document.querySelector('[data-badge]');
    const hist=[...document.querySelectorAll('.jammy h2')].find(x=>/our history/i.test(x.textContent));
    const secs=[...document.querySelectorAll('.jammy section')].map(s=>getComputedStyle(s).backgroundColor);
    return {tiles, spotify:a?a.getAttribute('href'):null,
      badgeT:badge?getComputedStyle(badge).transform:'—',
      shadow:hist?getComputedStyle(hist).textShadow:'—',
      ramenSvg:!!document.querySelector('img[src$="illo-upgrades.svg"]'),
      saxSvg:!!document.querySelector('img[src$="illo-texture.svg"]'),
      eggSvg:!!document.querySelector('img[src$="jammy-egg-illo.svg"]'),
      feet:document.querySelectorAll('img[src*="ramen-foot"]').length,
      shine:[...document.querySelectorAll('img[src*="sparkle"]')].filter(i=>getComputedStyle(i).animationName==='jammyShine').length,
      letters:[...document.querySelectorAll('[data-letter]')].map(e=>getComputedStyle(e).animationName),
      broken:[...document.querySelectorAll('.jammy img')].filter(i=>!i.complete||i.naturalWidth===0).length,
      secs};
  });
  ck('1.1 Spotify CTA', !!r.spotify&&r.spotify.includes('open.spotify.com'));
  ck('1.3 badge untilted', r.badgeT==='none'||/matrix\(1,\s*0,\s*0,\s*1/.test(r.badgeT), r.badgeT.slice(0,28));
  ck('1.4 no headline shadow', r.shadow==='none', r.shadow);
  ck('1.7 tile order', r.tiles[0]==='grid-hand.jpg'&&r.tiles[1]==='grid-ramen.jpg', r.tiles.join(','));
  ck('1.8 watermark replaced', r.tiles.includes('grid-snack.jpg'));
  ck('3.1 ramen SVG', r.ramenSvg); ck('3.1 sax SVG', r.saxSvg); ck('3.4 egg SVG', r.eggSvg);
  ck('3.2 no foot overlays', r.feet===0, `${r.feet}`);
  ck('3.2 four shines animate', r.shine===4, `${r.shine}`);
  ck('3.5 hero uses jammyDripBounce', r.letters.length===12&&r.letters.every(n=>n==='jammyDripBounce'), [...new Set(r.letters)].join('/'));
  ck('no broken images', r.broken===0, `${r.broken}`);
  const want=['rgb(21, 21, 16)','rgb(103, 168, 24)','rgb(163, 210, 238)','rgb(242, 88, 14)','rgb(234, 50, 19)'];
  ck('colours: key sections match Figma', want.every(w=>r.secs.includes(w)), want.filter(w=>!r.secs.includes(w)).join(',')||'all present');
  await p.close();

  p=await b.newContext({viewport:{width:390,height:844},isMobile:true}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/jammy',{waitUntil:'load',timeout:60000});
  await p.getByRole('region',{name:'Cookie consent'}).getByRole('button',{name:'Reject all'}).click().catch(()=>{});
  await p.waitForTimeout(1200);
  const m=await p.evaluate(()=>({
    over:document.documentElement.scrollWidth<=window.innerWidth+1,
    qr:(document.querySelector('.jammy-spotify-code')||{}).nodeType?getComputedStyle(document.querySelector('.jammy-spotify-code')).display:'missing'}));
  ck('mobile: no horizontal overflow', m.over);
  ck('1.6 QR hidden on mobile', m.qr==='none', m.qr);
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
