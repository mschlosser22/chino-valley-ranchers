// QA: "'Find Jammy in a store near you!' Section - Let's have the Store
// Locator button take a user to a new window versus taking them out of the
// landing page."
//
// Asserts the BEHAVIOUR (a second tab actually opens and this page survives),
// not just the attribute. target="_blank" in the markup proves nothing on its
// own: a click handler, an overlay, or a router intercept can still navigate
// the page in place, and the attribute would sit there looking correct.
//
// Note the selector. There are THREE "Store Locator" links on /jammy -- one in
// the nav, this one, and one in the footer -- so a `first()` or a text match
// grabs the nav link and tests the wrong element entirely. Only this button
// carries data-lift, which is what pins it.
const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const ctx=await b.newContext({viewport:{width:1440,height:1000}});
  const p=await ctx.newPage();
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});

  const link=p.locator('a[data-lift][href="/store-locator"]');
  ck('exactly one Store Locator button in the band', await link.count()===1,
     `${await link.count()} found`);

  // It has to be the one under the "Find Jammy..." headline, not some other
  // pill that happens to point at the locator.
  const section=await link.evaluate(e=>e.closest('div').textContent);
  ck('sits in the "Find Jammy in a store near you!" section',
     /Find Jammy in a store near you/.test(section));

  const attrs=await link.evaluate(e=>({t:e.getAttribute('target'),r:e.getAttribute('rel')}));
  ck('target="_blank"', attrs.t==='_blank', String(attrs.t));
  // Without noopener the opened tab gets a live window.opener handle back
  // into this document. Required, not cosmetic.
  ck('rel carries noopener', /noopener/.test(attrs.r||''), String(attrs.r));

  const [popup]=await Promise.all([
    ctx.waitForEvent('page',{timeout:10000}).catch(()=>null),
    link.click(),
  ]);
  await p.waitForTimeout(1500);

  ck('clicking opens a second tab', !!popup, popup?'opened':'no new tab');
  if(popup){
    await popup.waitForLoadState('domcontentloaded').catch(()=>{});
    ck('the new tab is the store locator', /\/store-locator/.test(popup.url()), popup.url());
    ck('no window.opener handle leaked',
       (await popup.evaluate(()=>window.opener!==null))===false);
  }
  // The whole point of the request: the launch page is still there behind it.
  ck('the landing page is not navigated away', /\/jammy$/.test(p.url()), p.url());

  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
