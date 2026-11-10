// The OUR EGGS mega menu (Figma: "CVR Mega Menu", desktop only).
//
// Scale: the design's flattened site screenshot puts the live nav's bar,
// logo and items at 0.84 CSS px per design unit (bar 75 -> 63px, logo
// 264 -> 222px), so every expected value below is design x 0.84, measured
// from the left edge of the nav's content box (max-w-7xl, px-8). At 1280 and
// up that box is 1216px wide, the size the numbers below are for. Below
// 1216 the layout is the same proportions of the box.
//
// Colours deviate from the Figma in exactly two places, for WCAG AA:
//   mid blue  #3487B0 -> #307EA4 (white text 4.01 -> 4.52:1)
//   active tab text #00608B -> #004F76 (on #76C3EA 3.53 -> 4.52:1)
const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
const BASE='http://localhost:7500';
const EGGS=[
  ['Pasture-Raised','/products/pasture-raised'],['Organic Pasture-Raised','/products/pasture-raised-organic'],
  ['Organic Free Range','/products/organic'],['Organic Omega-3','/products/organic-omega-3'],
  ['Organic Omega-3 Soy-Free Corn-Free','/products/organic-omega-3-soy-free'],
  ['Nutri-Fresh Fertile','/products/nutri-fresh-fertile'],['Regenerative Eggs','/regenerative'],
  ['Comet Eggs','/products/comet-eggs'],['VEG-A-FED','/products/veg-a-fed'],['VEG-A-FED Omega-3','/products/veg-a-fed-omega-3'],
  ['Humane Harvest','/products/humane-harvest'],
];
const LIQUID=[['Liquid Egg Whites','/products/liquid-egg-whites'],['Pasture Raised Liquid Whole Eggs','/products/pasture-raised-liquid-whole-eggs']];
const COOKED=[['Jammy Eggs','/jammy']];
const lin=c=>{c/=255;return c<=0.03928?c/12.92:((c+0.055)/1.055)**2.4};
const rgb=s=>(s.match(/[\d.]+/g)||[]).map(Number);
const lum=s=>{const [r,g,b]=rgb(s);return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b)};
const cr=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const near=(a,b,t)=>Math.abs(a-b)<=t;

(async()=>{
  const b=await chromium.launch();
  const open=async(ctxOpts={})=>{
    const ctx=await b.newContext({viewport:{width:1440,height:900},...ctxOpts});
    const p=await ctx.newPage(); const imgs=[];
    p.on('request',r=>{if(/\/images\/(mega-menu|products)\//.test(r.url())||/jammy-bag|regen\/carton/.test(r.url()))imgs.push(r.url())});
    await p.goto(BASE+'/',{waitUntil:'networkidle',timeout:90000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    await p.evaluate(()=>document.fonts.ready);
    return {p,ctx,imgs};
  };
  const trigger=p=>p.locator('nav').getByRole('button',{name:/^our eggs$/i});

  // ── Closed state and lazy loading ─────────────────────────────────────
  {
    const {p,ctx,imgs}=await open();
    console.log('\n  --- closed (1440) ---');
    const t=trigger(p);
    ck('OUR EGGS is a button', await t.count()===1);
    if(await t.count()){
      ck('it reports collapsed', await t.getAttribute('aria-expanded')==='false');
      const ctl=await t.getAttribute('aria-controls');
      ck('it controls the panel', !!ctl && await p.locator('#'+ctl).count()===1, String(ctl));
      ck('it carries a down arrow', await t.locator('svg').count()>=1);
    }
    ck('no menu images downloaded before the menu opens', imgs.length===0, imgs.slice(0,2).join(' '));
    await ctx.close();
  }

  // ── Desktop geometry, hover, tabs, keyboard ───────────────────────────
  for(const w of [1280,1440,1920]){
    const {p,ctx,imgs}=await open({viewport:{width:w,height:1000}});
    console.log(`\n  --- open (${w}) ---`);
    const t=trigger(p);
    if(!await t.count()){ck(`menu exists at ${w}`,false);await ctx.close();continue;}
    // The homepage already overflows by 80px at 1280 (an image, outside the
    // nav, on main before this work), so overflow is measured against the
    // same page with the menu closed: the menu must add none.
    const swClosed=await p.evaluate(()=>document.documentElement.scrollWidth);
    await t.hover(); await p.waitForTimeout(700);
    ck(`hover opens the panel at ${w}`, await t.getAttribute('aria-expanded')==='true');
    const g=await p.evaluate(()=>{
      const nav=document.querySelector('nav'), box=nav.querySelector('.max-w-7xl').getBoundingClientRect();
      const cl=box.left+32, cw=box.width-64;
      const panel=document.getElementById([...document.querySelectorAll('nav button[aria-controls]')].find(b=>/^our eggs$/i.test(b.textContent.trim()))?.getAttribute('aria-controls')||'x');
      if(!panel) return null;
      const pr=panel.getBoundingClientRect();
      const tabs=[...panel.querySelectorAll('[role=tab]')];
      const q=s=>panel.querySelector(s);
      const r=e=>e?e.getBoundingClientRect():null;
      const col1=r(q('[data-mm-col="1"]')), col2=r(q('[data-mm-col="2"]')), card=r(q('[data-mm-card]'));
      const link=[...panel.querySelectorAll('a')].find(a=>/organic free range/i.test(a.textContent));
      const head=panel.querySelector('[data-mm-heading]');
      const bar=nav.getBoundingClientRect();
      return {cl,cw,bar:bar.bottom,pTop:pr.top,pL:pr.left,pR:pr.right,pH:pr.height,iw:innerWidth,
        tab0:r(tabs[0]),tabN:tabs.length,col1,col2,card,
        linkFs:link?parseFloat(getComputedStyle(link).fontSize):0, headBg:head?getComputedStyle(head).backgroundColor:'',
        tabFs:tabs[0]?parseFloat(getComputedStyle(tabs[0]).fontSize):0};
    });
    if(!g){ck(`panel present at ${w}`,false);await ctx.close();continue;}
    const k=g.cw/1216; // proportion of the design layout at this width (1 at >=1280)
    ck(`panel sits under the bar at ${w}`, near(g.pTop,g.bar,1.5), `top ${Math.round(g.pTop)} vs bar ${Math.round(g.bar)}`);
    ck(`panel spans the viewport at ${w}`, near(g.pL,0,1)&&near(g.pR,g.iw,1));
    ck(`panel is the design height at ${w}`, near(g.pH,460*k,12), `${Math.round(g.pH)} vs ${Math.round(460*k)}`);
    ck(`three category tabs at ${w}`, g.tabN===3);
    ck(`tabs line up with the logo at ${w}`, g.tab0&&near(g.tab0.left-g.cl,2.5*k,6), g.tab0?`${Math.round(g.tab0.left-g.cl)}`:'');
    ck(`tabs at the design size at ${w}`, g.tab0&&near(g.tab0.width,204*k,6)&&near(g.tab0.top-g.pTop,183*k,8), g.tab0?`${Math.round(g.tab0.width)}x${Math.round(g.tab0.height)} at +${Math.round(g.tab0.top-g.pTop)}`:'');
    ck(`first product column at the design x at ${w}`, g.col1&&near(g.col1.left-g.cl,294*k,8), g.col1?`${Math.round(g.col1.left-g.cl)} vs ${Math.round(294*k)}`:'');
    ck(`second product column at the design x at ${w}`, g.col2&&near(g.col2.left-g.cl,574*k,8), g.col2?`${Math.round(g.col2.left-g.cl)} vs ${Math.round(574*k)}`:'');
    ck(`product card at the design box at ${w}`, g.card&&near(g.card.left-g.cl,868*k,8)&&near(g.card.width,317*k,6)&&near(g.card.top-g.pTop,53*k,8),
       g.card?`x ${Math.round(g.card.left-g.cl)} w ${Math.round(g.card.width)} y +${Math.round(g.card.top-g.pTop)}`:'');
    ck(`product links at the design size at ${w}`, near(g.linkFs,Math.max(21.8*k,18.7),1), `${g.linkFs}px`);
    ck(`group headings on the design highlight at ${w}`, /131, 206, 244/.test(g.headBg), g.headBg);

    // Default card, hover swaps card and underlines.
    const card=p.locator('[data-mm-card]');
    ck(`card opens on Organic Free Range at ${w}`, /organic free range/i.test(await card.innerText()));
    if(w===1440){
      for(const [name] of EGGS){
        const a=p.locator('[role=tabpanel]:not([hidden]) a',{hasText:new RegExp('^\\s*'+name.replace(/[-]/g,'\\-')+'\\s*$','i')}).first();
        await a.hover(); await p.waitForTimeout(80);
        const s=await a.evaluate(e=>{const cs=getComputedStyle(e);return {c:cs.color,d:cs.textDecorationLine,th:cs.textDecorationThickness,dc:cs.textDecorationColor}});
        const title=(await card.locator('[data-mm-title]').innerText()).trim();
        ck(`hover "${name}": orange, underlined, card follows`,
           /249, 161, 21/.test(s.c)&&/underline/.test(s.d)&&title.toLowerCase()===name.toLowerCase(), `${s.c} ${s.d} card "${title}"`);
      }
      // Every product link resolves.
      const hrefs=await p.$$eval('#'+await t.getAttribute('aria-controls')+' a',as=>as.map(a=>[a.textContent.trim(),a.getAttribute('href')]));
      const want=[...EGGS,...LIQUID,...COOKED];
      for(const [name,href] of want){
        const got=hrefs.find(h=>h[0].toLowerCase()===name.toLowerCase());
        ck(`"${name}" links to ${href}`, !!got&&got[1]===href, got?got[1]:'missing');
      }
      ck('panel links to all eggs', hrefs.some(h=>h[1]==='/products'));
      for(const href of [...new Set(want.map(x=>x[1]).concat('/products'))]){
        const r=await p.request.get(BASE+href); ck(`${href} returns 200`, r.status()===200, String(r.status()));
      }
      // Tabs.
      await p.getByRole('tab',{name:/liquid eggs/i}).click();
      ck('Liquid Eggs tab shows its two products', await p.locator('[role=tabpanel]:not([hidden]) a',{hasText:/liquid/i}).count()===2);
      ck('selected tab reports itself', await p.getByRole('tab',{name:/liquid eggs/i}).getAttribute('aria-selected')==='true');
      await p.getByRole('tab',{name:/cooked products/i}).click();
      ck('Cooked Products tab shows Jammy Eggs', /jammy eggs/i.test(await p.locator('[role=tabpanel]:not([hidden])').innerText()));
      ck('card follows the tab', /jammy/i.test(await card.innerText()));
      // Contrast of every text pair in the panel.
      const pairs=await p.evaluate(()=>{
        const panel=document.getElementById([...document.querySelectorAll('nav button[aria-controls]')].find(b=>/^our eggs$/i.test(b.textContent.trim())).getAttribute('aria-controls'));
        const out=[];
        const bgOf=e=>{for(let n=e;n;n=n.parentElement){const c=getComputedStyle(n).backgroundColor;if(!/rgba\(0, 0, 0, 0\)|transparent/.test(c))return c;}return 'rgb(255,255,255)';};
        for(const e of panel.querySelectorAll('a,button,[data-mm-heading],[data-mm-title],[data-mm-desc]')){
          if(!e.offsetParent||!e.textContent.trim())continue;
          const cs=getComputedStyle(e);
          out.push({t:e.textContent.trim().slice(0,24),fg:cs.color,bg:bgOf(e),fs:parseFloat(cs.fontSize),bold:+cs.fontWeight>=700||/din/i.test(cs.fontFamily)});
        }
        return out;});
      const bad=pairs.filter(x=>{const big=x.fs>=24||(x.bold&&x.fs>=18.66);return cr(x.fg,x.bg.replace(/rgba?\(([^,]+),([^,]+),([^,)]+).*/,'rgb($1,$2,$3)'))<(big?3:4.5);});
      ck('every text in the panel meets WCAG AA', bad.length===0, bad.slice(0,3).map(x=>`"${x.t}" ${x.fs}px`).join(' | '));
    }
    // Images: small, menu-only copies.
    const big=[];for(const u of [...new Set(imgs)]){const r=await p.request.get(u);const n=(await r.body()).length;if(n>150*1024)big.push(u.split('/').pop()+' '+Math.round(n/1024)+'KB');}
    ck(`menu images are light at ${w}`, big.length===0, big.slice(0,3).join(', '));
    const swOpen=await p.evaluate(()=>document.documentElement.scrollWidth);
    ck(`the open menu adds no horizontal overflow at ${w}`, swOpen<=Math.max(swClosed,w), `${swOpen} open vs ${swClosed} closed`);
    // Mouse leaves -> closes.
    await p.mouse.move(w/2, 990); await p.waitForTimeout(900);
    ck(`leaving with the mouse closes it at ${w}`, await t.getAttribute('aria-expanded')==='false');
    await ctx.close();
  }

  // ── Every card's text inside its card; no product link wraps unless the
  //    design breaks it (only Organic Omega-3 / Soy-Free Corn-Free does) ────
  for(const w of [1024,1100,1280,1440,1920]){
    const {p,ctx}=await open({viewport:{width:w,height:1000}});
    const t=trigger(p);
    if(!await t.count()){ck(`menu exists at ${w}`,false);await ctx.close();continue;}
    await t.click(); await p.waitForTimeout(500);
    const over=[], wrapped=[];
    for(const tab of ['Eggs','Liquid Eggs','Cooked Products']){
      await p.getByRole('tab',{name:new RegExp('^'+tab+'$','i')}).click(); await p.waitForTimeout(120);
      const links=p.locator('[role=tabpanel]:not([hidden]) a.mm-link');
      for(let i=0;i<await links.count();i++){
        const a=links.nth(i); await a.hover(); await p.waitForTimeout(60);
        const m=await a.evaluate(e=>{const card=document.querySelector('[data-mm-card]').getBoundingClientRect();
          const txt=document.querySelector('.mm-card__text').getBoundingClientRect();
          const tops=[];const tw=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);let n;
          while(n=tw.nextNode()){if(!n.data.trim())continue;const r=document.createRange();r.selectNodeContents(n);for(const q of r.getClientRects())tops.push(q.top);}
          const uniq=[];for(const t of tops.sort((a,b)=>a-b)) if(!uniq.length||t-uniq[uniq.length-1]>6) uniq.push(t);
          return {name:e.textContent.trim(),lines:uniq.length,forced:!!e.querySelector('br'),spill:Math.round(txt.bottom-(card.bottom-6))};});
        if(m.spill>0) over.push(`${m.name} +${m.spill}px`);
        if(m.lines>(m.forced?2:1)) wrapped.push(`${m.name} (${m.lines} lines)`);
      }
    }
    ck(`every card's text stays inside the card at ${w}`, over.length===0, over.slice(0,3).join(', '));
    ck(`no product link wraps beyond the design at ${w}`, wrapped.length===0, wrapped.slice(0,3).join(', '));
    await ctx.close();
  }

  // ── Keyboard and outside click ────────────────────────────────────────
  {
    const {p,ctx}=await open();
    console.log('\n  --- keyboard (1440) ---');
    const t=trigger(p);
    if(await t.count()){
      await t.focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(200);
      ck('Enter opens it', await t.getAttribute('aria-expanded')==='true');
      await p.keyboard.press('Tab'); await p.waitForTimeout(80);
      ck('Tab moves into the panel', await p.evaluate(()=>{const id=[...document.querySelectorAll('nav button[aria-controls]')].find(b=>/^our eggs$/i.test(b.textContent.trim())).getAttribute('aria-controls');return document.getElementById(id).contains(document.activeElement);}));
      await p.keyboard.press('Escape'); await p.waitForTimeout(200);
      ck('Escape closes it', await t.getAttribute('aria-expanded')==='false');
      ck('focus returns to OUR EGGS', await t.evaluate(e=>e===document.activeElement));
      await t.click(); await p.waitForTimeout(200);
      await p.mouse.click(700,850); await p.waitForTimeout(400);
      ck('clicking outside closes it', await t.getAttribute('aria-expanded')==='false');
    } else ck('menu exists for keyboard checks', false);
    await ctx.close();
  }

  // ── One menu open at a time: OUR STORY's dropdown and the mega menu ──────
  {
    const {p,ctx}=await open();
    console.log('\n  --- one menu at a time (1440) ---');
    const t=trigger(p);
    const story=p.locator('nav').getByRole('button',{name:/^our story$/i});
    const storyOpen=async()=>p.locator('nav a',{hasText:/^why organic matters$/i}).first().isVisible();
    if(await t.count()&&await story.count()){
      await story.click(); await p.waitForTimeout(300);
      ck('OUR STORY opens its dropdown', await storyOpen());
      await t.hover(); await p.waitForTimeout(700);
      ck('opening OUR EGGS closes OUR STORY', await t.getAttribute('aria-expanded')==='true' && !await storyOpen());
      await story.click(); await p.waitForTimeout(500);
      ck('opening OUR STORY closes OUR EGGS', await storyOpen() && await t.getAttribute('aria-expanded')==='false');
      await p.keyboard.press('Escape'); await p.waitForTimeout(200);
      ck('Escape closes OUR STORY', !await storyOpen());
    } else ck('both menus exist', false);
    await ctx.close();
  }

  // ── Touch tablet (landscape iPad) ─────────────────────────────────────
  {
    const {p,ctx}=await open({viewport:{width:1180,height:820},hasTouch:true,isMobile:false});
    console.log('\n  --- touch (1180) ---');
    const t=trigger(p);
    if(await t.count()){
      await t.tap(); await p.waitForTimeout(400);
      ck('tap opens it', await t.getAttribute('aria-expanded')==='true');
      await t.tap(); await p.waitForTimeout(400);
      ck('second tap closes it', await t.getAttribute('aria-expanded')==='false');
    } else ck('menu exists for touch', false);
    await ctx.close();
  }

  // ── The bar fits on one line from 1024 up ─────────────────────────────
  {
    const {p,ctx}=await open({viewport:{width:1024,height:800}});
    console.log('\n  --- bar on one line (1024..1280) ---');
    let worst=null;
    for(let w=1024;w<=1280;w+=32){
      await p.setViewportSize({width:w,height:800}); await p.waitForTimeout(120);
      const m=await p.evaluate(()=>{const nav=document.querySelector('nav');
        const items=[...nav.querySelectorAll('a,button')].filter(e=>e.offsetParent&&/^(our story|our eggs|recipes|news|being humane|contact cvr|store locator)$/i.test(e.textContent.trim()));
        // Lines of TEXT: the down-arrow icons sit a few px off the text's
        // top and are not a second line.
        const lines=items.map(e=>{const tops=[];const tw=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);let n;
          while(n=tw.nextNode()){if(!n.data.trim())continue;const r=document.createRange();r.selectNodeContents(n);for(const q of r.getClientRects())tops.push(q.top);}
          const uniq=[];for(const t of tops.sort((a,b)=>a-b)) if(!uniq.length||t-uniq[uniq.length-1]>6) uniq.push(t);
          return uniq.length;});
        return {n:items.length,maxLines:Math.max(...lines),tops:new Set(items.map(e=>Math.round(e.getBoundingClientRect().top))).size};});
      if(m.maxLines>1||m.tops>1) worst=worst||{w,...m};
    }
    ck('every top-level item on one line, in one row, 1024-1280', !worst, worst?`${worst.w}px: ${worst.maxLines} lines, ${worst.tops} rows`:'');
    await ctx.close();
  }

  // ── Phones and small tablets ──────────────────────────────────────────
  for(const w of [390,768]){
    const {p,ctx}=await open({viewport:{width:w,height:844},isMobile:w<500,hasTouch:true});
    console.log(`\n  --- mobile menu (${w}) ---`);
    await p.getByRole('button',{name:/open main menu/i}).click(); await p.waitForTimeout(300);
    const eggs=p.locator('nav').getByRole('button',{name:/^our eggs$/i});
    ck(`OUR EGGS expands in the mobile menu at ${w}`, await eggs.count()===1);
    if(await eggs.count()){
      ck(`starts collapsed at ${w}`, await eggs.getAttribute('aria-expanded')==='false');
      await eggs.tap(); await p.waitForTimeout(300);
      ck(`tap expands it at ${w}`, await eggs.getAttribute('aria-expanded')==='true');
      const hrefs=await p.$$eval('#'+await eggs.getAttribute('aria-controls')+' a',as=>as.map(a=>a.getAttribute('href')));
      const want=[...EGGS,...LIQUID,...COOKED].map(x=>x[1]).concat('/products');
      const missing=want.filter(h=>!hrefs.includes(h));
      ck(`every product reachable at ${w}`, missing.length===0, missing.join(', '));
      const small=await p.$$eval('#'+await eggs.getAttribute('aria-controls')+' a',as=>as.filter(a=>a.getBoundingClientRect().height<32).length);
      ck(`product links are comfortable tap targets at ${w}`, small===0, `${small} under 32px`);
    }
    // The nav is fixed, so a menu taller than the screen must scroll inside
    // itself: the last item of all has to be reachable.
    if(await eggs.count()){
      const last=p.locator('nav a',{hasText:/^store locator$/i}).last();
      await last.scrollIntoViewIfNeeded().catch(()=>{}); await p.waitForTimeout(200);
      const r=await last.boundingBox();
      ck(`the whole menu scrolls into reach at ${w}`, !!r && r.y>=0 && r.y+r.height<=844, r?`STORE LOCATOR at y ${Math.round(r.y)}`:'not found');
      const jam=p.locator('nav a',{hasText:/^jammy eggs$/i}).last();
      await jam.scrollIntoViewIfNeeded().catch(()=>{}); await p.waitForTimeout(200);
      const j=await jam.boundingBox();
      ck(`the last product scrolls into reach at ${w}`, !!j && j.y>=0 && j.y+j.height<=844, j?`y ${Math.round(j.y)}`:'not found');
    }
    ck(`no horizontal overflow at ${w}`, await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    await ctx.close();
  }

  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
