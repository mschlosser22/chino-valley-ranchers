const { chromium } = require('playwright');
const path=require('path'), fs=require('fs');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// QA item 2: the homepage band's photograph carries the client's adjusted
// yolk colour, and still carries its torn edges.
//
// The replacement arrived as a 7306x5837 full-frame PNG while the banner is a
// 2000x1017 crop, so the asset had to be re-cut -- and the originals are RGBA:
// 92,643 of their pixels are transparent, which is what makes the band's torn
// top and bottom. Re-encoding the new photo as RGB would have looked right in
// isolation and silently squared off both edges, so the alpha is asserted
// here rather than left to inspection.
(async()=>{
  const ROOT=path.join(__dirname,'../../..');
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
  const bad=[];
  p.on('response',r=>{if(r.status()>=400&&/cta-messy/.test(r.url()))bad.push(r.url().split('/').pop());});
  await p.goto('http://localhost:7500/',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  await p.waitForTimeout(900);

  // Decode both variants in the browser: dimensions, alpha, and yolk colour.
  const m=await p.evaluate(async()=>{
    const read = (src) => new Promise(res=>{
      const img=new Image();
      img.onload=()=>{
        const cv=document.createElement('canvas');
        cv.width=img.naturalWidth; cv.height=img.naturalHeight;
        cv.getContext('2d').drawImage(img,0,0);
        const d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data;
        let clear=0, topClear=0, botClear=0;
        const W=cv.width,H=cv.height;
        for(let y=0;y<H;y++) for(let x=0;x<W;x++){
          if(d[(y*W+x)*4+3]<250){ clear++; if(y<H*0.25) topClear++; else if(y>H*0.75) botClear++; }
        }
        // Mean colour of the yolk: saturated orange, sampled across the frame.
        let rs=0,gs=0,bs=0,n=0;
        for(let y=0;y<H;y+=2) for(let x=0;x<W;x+=2){
          const o=(y*W+x)*4, r=d[o],g=d[o+1],bl=d[o+2],a=d[o+3];
          if(a>250 && r>180 && g>60 && g<200 && bl<130 && (r-bl)>80){ rs+=r; gs+=g; bs+=bl; n++; }
        }
        res({w:W,h:H,clear,topClear,botClear,
             yolk: n? [Math.round(rs/n),Math.round(gs/n),Math.round(bs/n)] : null, yolkPx:n});
      };
      img.onerror=()=>res(null);
      img.src=src;
    });
    return {full: await read('/images/jammy/cta-messy.webp'),
            sm:   await read('/images/jammy/cta-messy-sm.webp')};
  });

  for (const [tag,exp] of [['full',{w:2000,h:1017}],['sm',{w:1200,h:610}]]) {
    const a=m[tag];
    console.log(`\n  --- cta-messy${tag==='sm'?'-sm':''}.webp ---`);
    if(!a){ ck(`${tag}: decodes`, false); continue; }
    ck(`${tag}: banner dimensions unchanged`, a.w===exp.w && a.h===exp.h, `${a.w}x${a.h}`);
    // The torn edges live in the alpha. A re-encode that drops it (saving as
    // RGB, or an encoder without -alpha_q) squares off the band silently.
    ck(`${tag}: keeps its transparency`, a.clear>0, `${a.clear} transparent px`);
    ck(`${tag}: torn along the top`, a.topClear>0, `${a.topClear} px`);
    ck(`${tag}: torn along the bottom`, a.botClear>0, `${a.botClear} px`);
    // The client's adjustment is a deeper orange: the previous artwork
    // averaged rgb(220,139,22) over the yolk, the replacement rgb(220,117,22).
    // Assert the direction, with room for encoder noise, rather than an exact
    // triple.
    if(a.yolk){
      ck(`${tag}: yolk is the adjusted deeper orange`,
         a.yolk[1] <= 128, `mean rgb(${a.yolk.join(',')}) — green channel ${a.yolk[1]}, was 139`);
      ck(`${tag}: still reads as orange, not red`, a.yolk[1] >= 100 && a.yolk[0] > 200,
         `rgb(${a.yolk.join(',')})`);
    } else ck(`${tag}: yolk found`, false);
  }

  console.log('');
  ck('no broken image requests', bad.length===0, bad.join(','));
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
