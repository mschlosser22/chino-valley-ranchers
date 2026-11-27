// CVR feedback round 3 (Nov 25 2026), "last 2 changes":
//
//  1. Organic card copy becomes CVR's own wording (which reinstates
//     "Free-Range", at their request). It is ~40% longer than the copy it
//     replaces, so it must still fit inside the card at every desktop width.
//  2. Liquid Eggs: the two egg-white products sit next to each other, with
//     Pasture-Raised Liquid Whole Eggs after them. Desktop and phone menus.
const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
const BASE=process.env.BASE||'http://localhost:7500';
const ORGANIC='Our Organic Free-Range eggs come from hens that live on free-range farms and fed only the finest organic (non-GMO) grains & seeds from certified pesticide-free fields.';
const LIQUID=['Organic Liquid Egg Whites','Cage-Free Liquid Egg Whites','Pasture Raised Liquid Whole Eggs'];
const norm=s=>s.replace(/\s+/g,' ').trim().toLowerCase();
(async()=>{
  const b=await chromium.launch();
  for(const w of [1920,1440,1366,1280,1150,1024]){
    const p=await b.newContext({viewport:{width:w,height:900}}).then(c=>c.newPage());
    const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,100)));
    await p.goto(BASE+'/',{waitUntil:'networkidle',timeout:90000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const t=p.locator('nav').getByRole('button',{name:/^our eggs$/i});
    await t.click(); await p.waitForTimeout(500);
    const panel=p.locator('#'+await t.getAttribute('aria-controls'));
    // 1. Organic copy, and that it fits
    await p.getByRole('tab',{name:/^eggs$/i}).click(); await p.waitForTimeout(150);
    await panel.locator('[role=tabpanel]:not([hidden]) a').filter({hasText:/^\s*Organic\s*$/i}).hover(); await p.waitForTimeout(300);
    const m=await panel.evaluate(el=>{
      const card=[...el.querySelectorAll('[data-mm-card]')].find(c=>c.offsetParent!==null&&getComputedStyle(c).visibility!=='hidden');
      const d=card.querySelector('[data-mm-desc]'), cr=card.getBoundingClientRect(), dr=d.getBoundingClientRect();
      const bw=parseFloat(getComputedStyle(card).borderBottomWidth)||0;
      return {title:card.querySelector('[data-mm-title]').textContent.trim(), desc:d.textContent,
        gap:cr.bottom-bw-dr.bottom, side:Math.min(dr.left-cr.left, cr.right-dr.right),
        clipped:d.scrollHeight>d.clientHeight+1, lines:Math.round(dr.height/parseFloat(getComputedStyle(d).lineHeight))};
    });
    ck(`Organic card shows CVR's copy at ${w}`, m.title==='Organic'&&norm(m.desc)===norm(ORGANIC), `"${m.desc.trim().slice(0,60)}…"`);
    ck(`Organic copy fits inside the card at ${w}`, m.gap>=8&&m.side>=8&&!m.clipped, `${m.lines} lines, ${m.gap.toFixed(0)}px to the card's bottom edge`);
    // 2. Liquid order
    await p.getByRole('tab',{name:/^liquid eggs$/i}).click(); await p.waitForTimeout(200);
    const order=await panel.locator('[role=tabpanel]:not([hidden]) a').allTextContents();
    const got=order.map(s=>s.trim()).filter(s=>LIQUID.map(norm).includes(norm(s)));
    ck(`Liquid Eggs order: egg whites together, whole eggs last at ${w}`, got.map(norm).join('|')===LIQUID.map(norm).join('|'), got.join(' / '));
    ck(`no page errors at ${w}`, errs.length===0, errs.join(' | '));
    await p.close();
  }
  {
    const p=await b.newContext({viewport:{width:390,height:844}}).then(c=>c.newPage());
    await p.goto(BASE+'/',{waitUntil:'networkidle',timeout:90000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    await p.getByRole('button',{name:/open main menu/i}).click(); await p.waitForTimeout(300);
    const m=p.locator('.cvr-mobile-menu');
    const eggsBtn=m.getByRole('button',{name:/our eggs/i});
    if(await eggsBtn.count()){await eggsBtn.first().click(); await p.waitForTimeout(300);}
    const links=(await m.locator('a').allTextContents()).map(s=>s.trim()).filter(s=>LIQUID.map(norm).includes(norm(s)));
    ck('phone menu Liquid Eggs order matches', links.map(norm).join('|')===LIQUID.map(norm).join('|'), links.join(' / '));
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
