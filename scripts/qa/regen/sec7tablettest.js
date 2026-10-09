const { chromium } = require('playwright');
const sharp = require('sharp');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// Section 7 below 1024 -- review item WI-11.
//
// Below 1024 the section is one stacked column at every width, so on a
// tablet it became a long ribbon: 2.33x the height at 1023 that it is at
// 1024, the intro running ~135 characters a line and the callouts ~82. On
// phones the last callout sat closer to the "BETTER FOR..." lines than the
// callouts sit to each other, so the payoff read as one more paragraph, and
// at 768 there was 68px of white between those lines and the pre-footer.
//
// Characters per line is estimated from the widest rendered line and the
// paragraph's average glyph width, so it tracks the real measure rather than
// a box width that says nothing about type size.
(async()=>{
  const b=await chromium.launch();
  const H={};
  for(const w of [390,600,768,1023,1024]){
    const p=await b.newContext({viewport:{width:w,height:900},deviceScaleFactor:1}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const hh=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(50);}
    await p.waitForTimeout(1000);
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const wrap=document.querySelector('.regen-diff-wrap'); const sec=wrap.closest('section');
      const cpl=el=>{const rg=document.createRange(); rg.selectNodeContents(el);
        const rows={}; for(const q of rg.getClientRects()){const k=Math.round(q.top); rows[k]=(rows[k]||0)+q.width;}
        const ws=Object.values(rows); const sum=ws.reduce((a,b)=>a+b,0);
        return Math.round(Math.max(...ws)*el.textContent.trim().length/sum);};
      const callouts=[...wrap.querySelectorAll('.regen-callout')];
      const cr=callouts.map(c=>c.getBoundingClientRect());
      const better=wrap.querySelector('.regen-diff-better').getBoundingClientRect();
      const gaps=cr.slice(1).map((r,i)=>r.top-cr[i].bottom);
      const lastBetter=[...wrap.querySelectorAll('.regen-diff-better p')].pop().getBoundingClientRect();
      return {secH:Math.round(sec.getBoundingClientRect().height),
              introCpl:cpl(wrap.querySelector(':scope > p')),
              calloutCpl:Math.max(...callouts.map(c=>cpl(c.querySelector('p')))),
              stacked:cr.every(r=>Math.abs(r.left-cr[0].left)<4),
              betweenCallouts:Math.round(Math.max(...gaps)),
              toBetter:Math.round(better.top-cr[cr.length-1].bottom),
              betterBottom:lastBetter.bottom+scrollY};
    });
    H[w]=m.secH;
    console.log(`  --- ${w}px (section ${m.secH}px) ---`);
    if(w<1024){
      ck(`${w}: intro measure 35-75 characters`, m.introCpl>=35&&m.introCpl<=75, `${m.introCpl}`);
      ck(`${w}: callout measure 35-75 characters`, m.calloutCpl>=35&&m.calloutCpl<=75, `${m.calloutCpl}`);
    }
    if(w<600) ck(`${w}: BETTER lines set apart from the callouts`, m.toBetter>m.betweenCallouts,
                 `${m.toBetter}px to BETTER vs ${m.betweenCallouts}px between callouts`);
    if(w===768){
      // White between the last BETTER line and the pre-footer photograph,
      // found by scanning down to the first peaks of its torn edge.
      await p.evaluate(y=>scrollTo(0,y-200),m.betterBottom); await p.waitForTimeout(400);
      const top=await p.evaluate(y=>y-scrollY,m.betterBottom);
      const shot=await p.screenshot({clip:{x:0,y:Math.ceil(top)+1,width:w,height:Math.min(260,900-Math.ceil(top)-1)}});
      const {data,info}=await sharp(shot).removeAlpha().raw().toBuffer({resolveWithObject:true});
      let gap=null;
      for(let y=0;y<info.height&&gap===null;y++){let dark=0;
        for(let x=0;x<info.width;x+=4){const i=(y*info.width+x)*3; if(data[i]+data[i+1]+data[i+2]<300) dark++;}
        // The tear's first peaks: 8% of the row dark. Waiting for half the
        // row landed partway down the rip and over-read the gap by ~50px.
        if(dark>info.width/4*0.08) gap=y;}
      ck(`768: BETTER lines sit close to the pre-footer`, gap!==null&&gap<=45, `${gap}px`);
    }
    await p.close();
  }
  await b.close();
  ck('no layout cliff at 1024', H[1023]<=1.7*H[1024], `${H[1023]}px at 1023 vs ${H[1024]}px at 1024 (${(H[1023]/H[1024]).toFixed(2)}x)`);
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
