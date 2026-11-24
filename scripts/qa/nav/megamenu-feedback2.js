// CVR feedback round 2 (Nov 23 2026), checked against the staging preview.
//
//  1. Product pages: the hero headline "Free Range & Fantastic" becomes
//     "Room To Roam" (all ten pages that had it).
//  2. Jammy card: "pull those egg slices in closer to the bag so it's not way
//     out of place". The slice must sit inside the card and overlap the bag's
//     lower-right corner, the way the shell eggs sit on every carton card.
//
// The bag and slice images have transparent margins (and a soft shadow), so
// overlap is measured on their solid pixels. These fractions are each
// image's alpha>200 bounding box (left, top, right, bottom), from PIL.
const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
const BASE=process.env.BASE||'http://localhost:7500';
const SOLID={ 'jammy.webp':[0.187,0.046,0.813,0.829], 'jammy-halves.webp':[0.079,0.025,0.914,0.887] };
// CVR named three pages; the user then asked for every product page that
// carried the old headline.
const PAGES=['pasture-raised','pasture-raised-organic','nutri-fresh-fertile','organic','organic-omega-3',
  'organic-omega-3-soy-free','comet-eggs','veg-a-fed','veg-a-fed-omega-3','humane-harvest'].map(s=>'/products/'+s);
(async()=>{
  const b=await chromium.launch();
  // 1. Headlines
  {
    const p=await b.newContext({viewport:{width:1440,height:900}}).then(c=>c.newPage());
    for(const path of PAGES){
      await p.goto(BASE+path,{waitUntil:'domcontentloaded',timeout:90000});
      const h=(await p.locator('h1.hero').first().textContent()).trim();
      ck(`${path}: hero headline is "Room To Roam"`, h==='Room To Roam', `"${h}"`);
      const body=await p.evaluate(()=>document.body.textContent);
      ck(`${path}: "Free Range & Fantastic" is gone`, !/free range\s*&(amp;)?\s*fantastic/i.test(body));
    }
    await p.close();
  }
  // 2. Jammy slice placement, every desktop width the menu shows at
  for(const w of [1920,1440,1366,1280,1150,1024]){
    const p=await b.newContext({viewport:{width:w,height:900}}).then(c=>c.newPage());
    await p.goto(BASE+'/',{waitUntil:'networkidle',timeout:90000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const t=p.locator('nav').getByRole('button',{name:/^our eggs$/i});
    await t.click(); await p.waitForTimeout(500);
    await p.getByRole('tab',{name:/^cooked products$/i}).click(); await p.waitForTimeout(400);
    const m=await p.evaluate(S=>{
      const card=[...document.querySelectorAll('[data-mm-card]')].find(c=>c.offsetParent!==null&&/jammy/i.test(c.textContent));
      if(!card) return null;
      const cr=card.getBoundingClientRect();
      const solid=(img)=>{const r=img.getBoundingClientRect(),f=S[img.src.split('/').pop()];
        return {l:r.left+r.width*f[0],t:r.top+r.height*f[1],r:r.left+r.width*f[2],b:r.top+r.height*f[3],box:r}};
      const bag=card.querySelector('.mm-card__product'), sl=[...card.querySelectorAll('img')].find(i=>/jammy-halves/.test(i.src));
      if(!bag||!sl) return {missing:!bag?'bag':'slice'};
      const B=solid(bag), H=solid(sl);
      return {card:{l:cr.left,r:cr.right,t:cr.top,b:cr.bottom},
        ox:Math.min(B.r,H.r)-Math.max(B.l,H.l), oy:Math.min(B.b,H.b)-Math.max(B.t,H.t),
        sliceRight:H.box.right, sliceLeft:H.box.left, bagCentre:(B.l+B.r)/2};
    },SOLID);
    if(!m||m.missing){ck(`Jammy card renders bag and slice at ${w}`,false,m?m.missing+' missing':'no card');await p.close();continue;}
    ck(`slice sits inside the card at ${w}`, m.sliceRight<=m.card.r+0.5&&m.sliceLeft>=m.card.l, `slice right ${m.sliceRight.toFixed(0)} vs card right ${m.card.r.toFixed(0)}`);
    ck(`slice overlaps the bag's lower-right corner at ${w}`, m.ox>0&&m.oy>0&&m.sliceLeft>m.bagCentre, `overlap ${m.ox.toFixed(0)}×${m.oy.toFixed(0)}px`);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
