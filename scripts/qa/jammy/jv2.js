const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000}}).then(c=>c.newPage());
  const kits=[];
  p.on('request',r=>{if(/typekit/.test(r.url())) kits.push(r.url());});
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  await p.waitForTimeout(2000);
  ck('new font kit gqk7pcv loads', kits.some(u=>u.includes('gqk7pcv')));
  ck('old kit yyq5ssh gone', !kits.some(u=>u.includes('yyq5ssh')));
  const f=await p.evaluate(async()=>{ await document.fonts.ready;
    const fam=s=>{const e=document.querySelector(s);return e?getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g,''):'—';};
    const h2=[...document.querySelectorAll('.jammy h2')][0];
    return {body:fam('.jammy'), display:h2?getComputedStyle(h2).fontFamily.split(',')[0].replace(/["']/g,''):'—'};});
  ck('body is proxima-nova', f.body==='proxima-nova', f.body);
  ck('display is cubano', f.display==='cubano', f.display);
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(90);}
  await p.waitForTimeout(1200);
  const r=await p.evaluate(()=>({
    tiles:[...document.querySelectorAll('.jammy-tiles [data-tile]')].map(d=>d.querySelector('img').getAttribute('src').split('/').pop()),
    ramenSvg:!!document.querySelector('img[src$="illo-upgrades.svg"]'),
    saxSvg:!!document.querySelector('img[src$="illo-texture.svg"]'),
    eggSvg:!!document.querySelector('img[src$="jammy-egg-illo.svg"]'),
    lockupArt:(()=>{const a=document.querySelector('[data-lockup-art]');
      return a?{anim:getComputedStyle(a).animationName, src:a.getAttribute('src')}:null;})(),
    strayLetters:document.querySelectorAll('[data-letter]').length,
    broken:[...document.querySelectorAll('.jammy img')].filter(i=>!i.complete||i.naturalWidth===0).length,
  }));
  // Revised QA supersedes Phase 1's "swap Ramen and Toast": the order is now
  // salad, toast, snack, ramen.
  ck('tile order: salad, toast, snack, ramen',
     r.tiles.join(',')==='grid-salad.jpg,grid-ramen.jpg,grid-snack.jpg,grid-hand.jpg',
     r.tiles.join(','));
  ck('3.1 illustrations are SVG', r.ramenSvg&&r.saxSvg);
  ck('3.4 egg is SVG', r.eggSvg);
  // QA revised this: the whole wordmark bounces as one piece, no per-letter
  // animation, using the supplied HL-MindTheDrip vector.
  ck('3.5 whole wordmark bounces (no per-letter)',
     r.strayLetters===0 && r.lockupArt && r.lockupArt.anim==='jammyDripBounce'
     && r.lockupArt.src.endsWith('mind-the-drip.svg'),
     r.lockupArt?`${r.lockupArt.anim}, ${r.strayLetters} stray letters`:'no artwork');
  ck('no broken images', r.broken===0, `${r.broken}`);
  await b.close();
  const bad=R.filter(x=>!x).length;
  console.log(`\n${R.length-bad}/${R.length} passed`);
})();
