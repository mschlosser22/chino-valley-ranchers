const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const [w,label] of [[390,'mobile'],[1440,'desktop']]){
    const p=await b.newContext({viewport:{width:w,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(80);}
    await p.waitForTimeout(1300);
    const r=await p.evaluate(()=>{
      const wm=document.querySelector('.jammy-playlists-wordmark');
      const sec=wm.closest('section');
      const code=document.querySelector('.jammy-spotify-code');
      return {display:getComputedStyle(wm).display,
              secBg:getComputedStyle(sec).backgroundColor,
              codeDisplay:code?getComputedStyle(code).display:null,
              cta:!!sec.querySelector('a[href*="spotify"]')};
    });
    console.log(`\n  --- ${label} (${w}px) ---`);
    if(w===390){
      ck('wordmark hidden on phones', r.display==='none', r.display);
      ck('spotify code still hidden on phones', r.codeDisplay==='none', r.codeDisplay);
    } else {
      ck('wordmark still shown on desktop', r.display!=='none', r.display);
      ck('spotify code shown on desktop', r.codeDisplay!=='none', r.codeDisplay);
    }
    ck('panel keeps its red ground', r.secBg==='rgb(234, 50, 19)', r.secBg);
    ck('Get Jammin CTA intact', r.cta);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
