const { chromium } = require('playwright');
const fs=require('fs'), path=require('path');
const ROOT='/Users/mikeschlosser/Sites/chino-valley-ranchers';
const OUT=path.join(ROOT,'docs/qa-evidence/shots');
const items=JSON.parse(fs.readFileSync(path.join(ROOT,'docs/qa-evidence/items.json'),'utf8'));

const settle=async(p)=>{
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(70);}
  await p.waitForTimeout(1400);
};
const pad=(r,m=26)=>({x:Math.max(0,r.x-m),y:Math.max(0,r.y-m),width:r.width+m*2,height:r.height+m*2});

// Where to frame each item. Returns a viewport-relative rect.
const FRAME={
 '01':()=>{const a=[...document.querySelectorAll('a,button')].find(e=>/explore jammy/i.test(e.textContent));
    const r=a.getBoundingClientRect(); return {x:r.left,y:r.top,width:r.width,height:r.height};},
 '02':()=>{const a=[...document.querySelectorAll('a')].find(e=>/explore jammy/i.test(e.textContent));
    let n=a; for(let i=0;i<8&&n.parentElement;i++){n=n.parentElement;
      const r=n.getBoundingClientRect(); if(r.height>300&&r.width>innerWidth*0.8) break;}
    const r=n.getBoundingClientRect();
    return {x:0,y:r.top,width:innerWidth,height:r.height};},
 '03':()=>{const a=document.querySelector('.jammy-cta__cta')||[...document.querySelectorAll('a')].find(e=>/get jammin/i.test(e.textContent));
    const r=a.getBoundingClientRect(); return {x:r.left,y:r.top,width:r.width,height:r.height};},
 '04':()=>{const l=document.querySelector('[data-lockup]'); const r=l.getBoundingClientRect();
    return {x:r.left,y:r.top,width:r.width,height:r.height};},
 '05':()=>{const p=[...document.querySelectorAll('p')].find(e=>/only egg with a golden/i.test(e.textContent));
    const r=p.getBoundingClientRect();
    return {x:Math.max(0,r.left-70),y:r.top-70,width:r.width+140,height:r.height+140};},
 '06':()=>{const imgs=[...document.querySelectorAll('img')].filter(i=>/hero|jammy-hero|brand-hero/i.test(i.getAttribute('src')||''));
    const i=imgs.sort((a,b)=>b.getBoundingClientRect().width-a.getBoundingClientRect().width)[0]
        || document.querySelector('[data-lockup]').closest('section').querySelector('img');
    const r=i.getBoundingClientRect(); return {x:r.left,y:r.top,width:r.width,height:r.height};},
 '07':()=>{const e=[...document.querySelectorAll('p,span,div')].find(x=>/available now at trader joe/i.test(x.textContent)&&x.children.length===0);
    const r=e.getBoundingClientRect();
    return {x:Math.max(0,r.left-20),y:r.top-14,width:r.width+40,height:r.height+28};},
 '08':()=>{const b=document.querySelector('[data-badge]'); const r=b.getBoundingClientRect();
    return {x:r.left,y:r.top,width:r.width,height:r.height};},
 '09':()=>{const h=document.querySelector('.jammy-curve'); const r=h.getBoundingClientRect();
    return {x:r.left,y:r.top,width:r.width,height:r.height};},
 '10':()=>{const p=[...document.querySelectorAll('p')].find(e=>/jammy egg is soft-boiled/i.test(e.textContent));
    const r=p.getBoundingClientRect(); return {x:r.left,y:r.top,width:r.width,height:r.height};},
 '11':()=>{const a=document.querySelector('img[alt*="running with a fork"]').closest('article');
    const r=a.getBoundingClientRect(); return {x:r.left,y:r.top,width:r.width,height:r.height*0.62};},
 '12':()=>{const a=document.querySelector('img[alt*="bowl of ramen"]').closest('article');
    const r=a.getBoundingClientRect(); return {x:r.left,y:r.top,width:r.width,height:r.height*0.62};},
 '13':()=>{const t=[...document.querySelectorAll('[data-tile]')];
    const a=t[1].getBoundingClientRect(), b=t[3].getBoundingClientRect();
    // the two tiles QA asked to swap, plus their Cubano labels
    return {x:a.left,y:a.top,width:(b.right-a.left),height:a.height*0.5};},
 '14':()=>{const g=document.querySelector('.jammy-tiles'); const r=g.getBoundingClientRect();
    return {x:0,y:r.top,width:innerWidth,height:r.height};},
 '15':()=>{const s=document.querySelector('.jammy-sax'); const r=s.getBoundingClientRect();
    return {x:r.left,y:r.top,width:r.width,height:r.height};},
 '16':()=>{const h=[...document.querySelectorAll('h2')].find(e=>/class of its own/i.test(e.textContent));
    const r=h.getBoundingClientRect(); return {x:0,y:r.top,width:innerWidth,height:r.height};},
 '17':()=>{const g=document.querySelector('.jammy-features'); const s=document.querySelector('.jammy-features-section');
    const r=s.getBoundingClientRect(); return {x:0,y:r.top,width:innerWidth,height:r.height};},
 '19':()=>{const a=[...document.querySelectorAll('a')].find(e=>e.textContent.trim()==='Our Story');
    const r=a.getBoundingClientRect(); return {x:r.left,y:r.top,width:r.width,height:r.height};},
 '18':()=>{const w=document.querySelector('.jammy-playlists-wordmark'); const s=w.closest('section');
    const r=s.getBoundingClientRect(); return {x:0,y:r.top,width:innerWidth,height:r.height};},
};

(async()=>{
  const b=await chromium.launch();
  const ctxD=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2});
  const ctxM=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3});
  const pages={};
  for(const [key,ctx,url] of [['d/','x','']]) {}
  const dJ=await ctxD.newPage(), dH=await ctxD.newPage();
  const mJ=await ctxM.newPage();
  const load=async(p,u)=>{
    await p.goto('http://localhost:7500'+u,{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    await settle(p);
  };
  await load(dJ,'/jammy'); await load(dH,'/'); await load(mJ,'/jammy');

  let ok=0, fail=[];
  for(const it of items){
    const mobile = it.viewport==='mobile';
    const p = mobile ? mJ : (it.page==='/' ? dH : dJ);
    try{
      // bring the target into view first, then measure
      await p.evaluate(fn=>{ const r=eval('('+fn+')')(); window.scrollBy(0, r.y-140); }, FRAME[it.id].toString());
      await p.waitForTimeout(650);
      let rect=await p.evaluate(fn=>eval('('+fn+')')(), FRAME[it.id].toString());
      const vp=p.viewportSize();
      let clip=pad(rect);
      clip.x=Math.max(0,Math.min(clip.x,vp.width-10));
      clip.y=Math.max(0,clip.y);
      clip.width=Math.min(clip.width, vp.width-clip.x);
      clip.height=Math.min(clip.height, vp.height-clip.y);
      if(clip.width<10||clip.height<10) throw new Error('degenerate clip');
      await p.screenshot({path:path.join(OUT,`item-${it.id}.png`),clip});
      ok++;
      console.log(`  item-${it.id}.png  ${mobile?'[mobile]':'       '} ${it.area}`);
    }catch(e){
      fail.push(`${it.id}: ${e.message.split('\n')[0]}`);
      console.log(`  item-${it.id}  FAILED  ${e.message.split('\n')[0]}`);
    }
  }
  await b.close();
  console.log(`\n${ok}/${items.length} captured`);
  if(fail.length) { console.log('failures:'); fail.forEach(f=>console.log('  '+f)); }
})();
