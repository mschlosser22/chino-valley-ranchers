// Mega menu: CVR team feedback round 1 (Nov 2026) against the updated Figma
// "CVR Mega Menu (1)". Expected boxes are the Figma's own placements as % of
// the 377x400 card: [left, top, width, height].
//
//  1. No "free-range" anywhere in the menu (headline, copy, link labels).
//  2. Veg-A-Fed shows white eggs (its carton is Large White). Every other
//     shell-egg product is brown, per its carton.
//  3. Liquid Eggs adds Cage-Free Liquid Egg Whites.
//  4. Organic Liquid: the polished three-egg shot with a soft shadow.
//  5. Cooked Products (Jammy): sliced soft-boiled egg, no shell eggs.
const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
const BASE=process.env.BASE||'http://localhost:7500';
const THREE=[53.85,28.25,61.8,32.75], BROWN=[63.66,29.75,39.52,30.25];
// tab, link text, accent image, accent box (null = no accent)
const CARDS=[
  ['Eggs','Pasture-Raised','eggs-brown',BROWN],
  ['Eggs','Organic Pasture-Raised','eggs-brown',BROWN],
  ['Eggs','Organic','eggs-brown',BROWN],          // Figma kept the old two-egg shot here; see data file
  ['Eggs','Organic Omega-3','eggs-three',THREE],
  ['Eggs','Organic Omega-3 Soy-Free Corn-Free','eggs-brown',BROWN],
  ['Eggs','Nutri-Fresh Fertile','eggs-three',THREE],
  ['Eggs','Regenerative Eggs','eggs-three',THREE],
  ['Eggs','Comet Eggs','eggs-brown',BROWN],
  ['Eggs','VEG-A-FED','eggs-white',[61.27,29.0,41.91,32.0]],
  ['Eggs','VEG-A-FED Omega-3','eggs-brown',BROWN],
  ['Eggs','Humane Harvest','eggs-brown',BROWN],
  ['Liquid Eggs','Organic Liquid Egg Whites','eggs-three',THREE],
  ['Liquid Eggs','Pasture Raised Liquid Whole Eggs',null,null],
  ['Liquid Eggs','Cage-Free Liquid Egg Whites','eggs-three',[46.68,25.75,61.8,32.75]],
  ['Cooked Products','Jammy Eggs','jammy-halves',[60.5,36.0,32.89,22.5]],  // round 2: moved in against the bag
];
(async()=>{
  const b=await chromium.launch();
  for(const w of [1440,1366,1280,1150,1024]){
    const p=await b.newContext({viewport:{width:w,height:900}}).then(c=>c.newPage());
    const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,100)));
    await p.goto(BASE+'/',{waitUntil:'networkidle',timeout:90000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    console.log(`\n  --- ${w} ---`);
    const t=p.locator('nav').getByRole('button',{name:/^our eggs$/i});
    await t.click(); await p.waitForTimeout(500);
    const panel=p.locator('#'+await t.getAttribute('aria-controls'));
    let tab=null;
    for(const [tb,name,img,box] of CARDS){
      if(tb!==tab){await p.getByRole('tab',{name:new RegExp('^'+tb+'$','i')}).click(); await p.waitForTimeout(150); tab=tb;}
      const a=panel.locator('[role=tabpanel]:not([hidden]) a').filter({hasText:new RegExp('^\\s*'+name.replace(/[-]/g,'\\-')+'\\s*$','i')});
      if(await a.count()!==1){ck(`"${name}" is listed under ${tb} at ${w}`,false,`${await a.count()} matches`);continue;}
      await a.hover(); await p.waitForTimeout(250);
      const m=await panel.evaluate(el=>{
        const card=[...el.querySelectorAll('[data-mm-card]')].find(c=>c.offsetParent!==null&&getComputedStyle(c).visibility!=='hidden')||el.querySelector('[data-mm-card]');
        const cr=card.getBoundingClientRect();
        const decos=[...card.querySelectorAll('img')].filter(i=>!/burst|egg-texture/.test(i.src)&&!i.classList.contains('mm-card__product'));
        return {title:card.querySelector('[data-mm-title]').textContent.trim(),
          prod:(()=>{const i=card.querySelector('.mm-card__product');return i?{src:i.src,ok:i.complete&&i.naturalWidth>0}:null})(),
          decos:decos.map(i=>{const r=i.getBoundingClientRect();return {src:i.src.split('/').pop(),ok:i.complete&&i.naturalWidth>0,
            box:[(r.left-cr.left)/cr.width*100,(r.top-cr.top)/cr.height*100,r.width/cr.width*100,r.height/cr.height*100]}})};
      });
      if(img===null){
        ck(`${name}: no shell-egg accent at ${w}`, m.decos.length===0, m.decos.map(d=>d.src).join(','));
      }else{
        const d=m.decos;
        // The Jammy slice overhangs the card; where the window is too tight it
        // slides left to stay on screen, so only its top/size are fixed there.
        const fixedX = !(box[0]+box[2]>100) || w>=1440;
        const ok=d.length===1&&d[0].src===img+'.webp'&&d[0].ok&&d[0].box.every((v,i)=>(i===0&&!fixedX)?v<=box[0]+0.6:Math.abs(v-box[i])<=0.6);
        ck(`${name}: ${img} at the Figma box at ${w}`, ok, d.map(x=>`${x.src}${x.ok?'':' (not loaded)'} [${x.box.map(v=>v.toFixed(1))}]`).join(' ')||'none');
      }
      if(name.startsWith('Cage-Free')) ck(`Cage-Free carton loads at ${w}`, !!m.prod&&m.prod.ok&&/cage-free-liquid-egg-whites/.test(m.prod.src), m.prod?m.prod.src.split('/').pop():'none');
    }
    // 1. free-range, in everything the menu renders (desktop panel incl. every card)
    const txt=await panel.evaluate(el=>el.textContent);
    ck(`no "free-range" in the desktop menu at ${w}`, !/free[\s\-‑]*range/i.test(txt), (txt.match(/.{0,30}free[\s-]*range.{0,30}/i)||[''])[0]);
    // Jammy halves overhang the card's right edge, as drawn; must stay on screen.
    // The homepage already scrolls sideways 80px at 1280 on main (an image),
    // so compare against the same page with the menu closed.
    const openSW=await p.evaluate(()=>document.documentElement.scrollWidth);
    await p.keyboard.press('Escape'); await p.waitForTimeout(400);
    const closedSW=await p.evaluate(()=>document.documentElement.scrollWidth);
    ck(`opening the menu adds no horizontal scroll at ${w}`, openSW<=closedSW, `${openSW} vs ${closedSW}`);
    await t.click(); await p.waitForTimeout(400);
    await p.getByRole('tab',{name:/^cooked products$/i}).click(); await p.waitForTimeout(300);
    const vis=await panel.evaluate(el=>{const i=[...el.querySelectorAll('img')].find(x=>/jammy-halves/.test(x.src));if(!i)return null;const r=i.getBoundingClientRect();return Math.round(innerWidth-r.right)});
    ck(`jammy halves sit fully on screen, 8px+ from the edge, at ${w}`, vis!==null&&vis>=8, `${vis}px to the edge`);
    ck(`old two-egg shot no longer used at ${w}`, await panel.evaluate(el=>![...el.querySelectorAll('img')].some(i=>/two-eggs/.test(i.getAttribute('src')))));
    ck(`no page errors at ${w}`, errs.length===0, errs.join(' | '));
    await p.close();
  }
  // Phone menu: text only, but the free-range wording and the new product must match.
  {
    const p=await b.newContext({viewport:{width:390,height:844}}).then(c=>c.newPage());
    await p.goto(BASE+'/',{waitUntil:'networkidle',timeout:90000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    console.log('\n  --- phone 390 ---');
    await p.getByRole('button',{name:/open main menu/i}).click(); await p.waitForTimeout(300);
    const m=p.locator('.cvr-mobile-menu');
    const eggsBtn=m.getByRole('button',{name:/our eggs/i});
    if(await eggsBtn.count()) {await eggsBtn.first().click(); await p.waitForTimeout(300);}
    const txt=await m.evaluate(el=>el.textContent);
    ck('no "free-range" in the phone menu', !/free[\s\-‑]*range/i.test(txt));
    ck('phone menu lists Cage-Free Liquid Egg Whites', /cage-free liquid egg whites/i.test(txt));
    ck('phone menu lists Organic Liquid Egg Whites', /organic liquid egg whites/i.test(txt));
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
