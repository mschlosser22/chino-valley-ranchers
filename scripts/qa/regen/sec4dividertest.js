// Section 4's divider on phones (review item WI-16).
// The design flanks the hen with two 2px rules. Below 768 the rules are
// absolutely-positioned spans that the stacked layout hides, so the phone
// card showed the hen alone. The rules are now painted as the divider's own
// background, either side of the hen, on the card's #F4F2EE ground.
// Read from pixels: a box that "has a background" proves nothing about ink.
const { chromium } = require('playwright');
const sharp = require('sharp');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const w of [360,390,430]){
    const p=await b.newContext({viewport:{width:w,height:900},deviceScaleFactor:1}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const el=p.locator('.regen-next-stage img[src*="hen-divider"]');
    await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(600);
    const bx=await el.boundingBox();
    const png=await el.screenshot();
    const {data,info}=await sharp(png).raw().toBuffer({resolveWithObject:true});
    const W=info.width,H=info.height,C=info.channels;
    // Dark runs on each row; the rules are the rows whose dark runs sit
    // outside the hen (44-56%) -- the hen itself is dark artwork in the middle.
    const dark=(x,y)=>{const i=(y*W+x)*C;return data[i]<80&&data[i+1]<80&&data[i+2]<80;};
    let best=null;
    for(let y=0;y<H;y++){
      const runs=[];let s=-1;
      for(let x=0;x<=W;x++){const d=x<W&&dark(x,y);
        if(d&&s<0)s=x; if(!d&&s>=0){runs.push([s/W,(x-1)/W]);s=-1;}}
      const L=runs.filter(r=>r[1]<0.44&&r[1]-r[0]>0.15), Rr=runs.filter(r=>r[0]>0.56&&r[1]-r[0]>0.15);
      if(L.length&&Rr.length){best={y,L:L[0],R:Rr[0]};break;}
    }
    let thick=0;
    if(best){for(let y=best.y;y<H;y++){const x=Math.round((best.L[0]+best.L[1])/2*W); if(dark(x,y))thick++; else break;}}
    const f=v=>Math.round(v*100);
    ck(`two rules flank the hen at ${w}`, !!best,
       best?`left ${f(best.L[0])}-${f(best.L[1])}%, right ${f(best.R[0])}-${f(best.R[1])}%`:'no rule rows found');
    if(best){
      ck(`left rule within 15-40% at ${w}`, best.L[0]>=0.14&&best.L[1]<=0.41);
      ck(`right rule within 60-85% at ${w}`, best.R[0]>=0.59&&best.R[1]<=0.86);
      ck(`rules are 2px at ${w}`, thick===2, `${thick}px`);
    }
    // The ground either side stays the card's #F4F2EE.
    const i=(1*W+2)*C;
    ck(`divider ground is the card's #F4F2EE at ${w}`,
       Math.abs(data[i]-0xF4)<3&&Math.abs(data[i+1]-0xF2)<3&&Math.abs(data[i+2]-0xEE)<3,
       `rgb(${data[i]},${data[i+1]},${data[i+2]})`);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
