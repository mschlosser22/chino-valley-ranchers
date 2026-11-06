// A 1px line of photograph under the hero's tear (review item WI-17).
// The tear strip ends with margin-bottom:-1px, so the paper run-out starts one
// row inside the stage. The run-out was unpositioned and the stage positioned,
// so the photograph painted over that row: a dark hairline across the paper,
// 93-96% dark at 1440. Sampled from pixels at DPR 1 and 2, away from the
// carton and hens, which overhang the seam on purpose.
const { chromium } = require('playwright');
const sharp = require('sharp');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const [w,dpr] of [[1440,1],[1440,2],[1024,1],[390,2]]){
    const p=await b.newContext({viewport:{width:w,height:1000},deviceScaleFactor:dpr}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    await p.waitForTimeout(500);
    const m=await p.evaluate(()=>{
      const img=document.querySelector('img[src*="hero-cattle"]');
      const stage=img.parentElement.getBoundingClientRect();
      // Overhanging artwork, so their columns can be skipped.
      const skip=[...document.querySelectorAll('section img')].filter(e=>e!==img&&e.closest('section')===img.closest('section'))
        .map(e=>e.getBoundingClientRect()).filter(r=>r.top<stage.bottom+2&&r.bottom>stage.bottom-2).map(r=>[r.left,r.right]);
      return {y:stage.bottom, skip};
    });
    const y=Math.floor(m.y);
    const png=await p.screenshot({clip:{x:0,y,width:w,height:1}});
    const {data,info}=await sharp(png).raw().toBuffer({resolveWithObject:true});
    let n=0,dark=0;
    for(let row=0;row<info.height;row++) for(let x=0;x<info.width;x++){
      const cx=x/dpr; if(m.skip.some(([l,r])=>cx>=l-2&&cx<=r+2)) continue;
      const i=(row*info.width+x)*info.channels;
      const L=0.2126*data[i]+0.7152*data[i+1]+0.0722*data[i+2];
      n++; if(L<150) dark++;
    }
    const share=dark/n;
    ck(`no photo row at the paper seam at ${w} DPR${dpr}`, share<0.05, `${(share*100).toFixed(1)}% dark at y=${y}`);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
