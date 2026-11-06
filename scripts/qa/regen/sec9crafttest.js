// Pre-footer craft (review item WI-20).
//  - At 768 the photo's cross-fade into the dark ramp ran behind the first
//    line of the heading: its worst pixel gave the orange only 4.5:1.
//  - Under the tear, the ramp side of the asset carried a grey haze (row 40
//    at x1500 was rgb 92,96,104) that read as fog over the torn edge.
//  - At 1440 the type column sat right of the design's: heading ink centred
//    at 1051 against the design's 992.
const { chromium } = require('playwright');
const sharp = require('sharp');
const path = require('path');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
const lin=c=>{c/=255;return c<=0.03928?c/12.92:((c+0.055)/1.055)**2.4};
const L=(r,g,b)=>0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b);
const CR=(a,b)=>{const [x,y]=a>b?[a,b]:[b,a];return (x+0.05)/(y+0.05)};
(async()=>{
  // Asset rows under the tear, ramp side.
  const {data,info}=await sharp(path.join(__dirname,'../../../public/images/regen/prefooter-bg.webp')).raw().toBuffer({resolveWithObject:true});
  let worstRow=null;
  for(let y=40;y<=80;y++){const i=(y*info.width+1500)*info.channels;
    const lum=0.2126*data[i]+0.7152*data[i+1]+0.0722*data[i+2];
    if(!worstRow||lum>worstRow.lum) worstRow={y,lum,rgb:[data[i],data[i+1],data[i+2]]};}
  ck('no grey haze under the tear on the ramp (rows 40-80 at x1500, luminance < 30)',
     worstRow.lum<30, `row ${worstRow.y} rgb(${worstRow.rgb})`);
  ck('asset keeps its 2075x622 size', info.width===2075&&info.height===622, `${info.width}x${info.height}`);

  const b=await chromium.launch();
  const open=async w=>{const p=await b.newContext({viewport:{width:w,height:900}}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    await p.locator('.regen-prefooter-title').scrollIntoViewIfNeeded(); await p.waitForTimeout(600);
    await p.evaluate(()=>document.fonts.ready); return p;};

  // The ground behind heading line 1 -- only where the letters actually are.
  // Screenshot the line with the type, then without; pixels that changed are
  // the ink, and the worst ground under that ink is what the reader gets.
  // The line's BOX reaches up into the white tear at 900, above the caps, and
  // sampling the whole box reported 1.02:1 for paper no letter touches.
  for(const w of [768,820,860,880,881,900]){
    const p=await open(w);
    const r=await p.evaluate(()=>{const h=document.querySelector('.regen-prefooter-title');
      const rg=document.createRange();rg.selectNodeContents(h);const q=[...rg.getClientRects()];
      const top=Math.min(...q.map(x=>x.top));const l1=q.filter(x=>x.top<top+2);
      return {x:Math.floor(Math.min(...l1.map(x=>x.left))),y:Math.floor(top),
              r:Math.ceil(Math.max(...l1.map(x=>x.right))),b:Math.ceil(Math.max(...l1.map(x=>x.bottom)))};});
    const clip={x:r.x,y:r.y,width:r.r-r.x,height:r.b-r.y};
    const withInk=await sharp(await p.screenshot({clip})).raw().toBuffer({resolveWithObject:true});
    await p.evaluate(()=>{document.querySelector('.regen-prefooter-title').style.color='transparent'});
    const ground=await sharp(await p.screenshot({clip})).raw().toBuffer({resolveWithObject:true});
    let worst=99,n=0;const fg=L(0xF8,0xA0,0x14);const C=ground.info.channels;
    for(let i=0;i<ground.data.length;i+=C){
      const d=Math.abs(withInk.data[i]-ground.data[i])+Math.abs(withInk.data[i+1]-ground.data[i+1])+Math.abs(withInk.data[i+2]-ground.data[i+2]);
      if(d<60) continue; n++;
      const c=CR(fg,L(ground.data[i],ground.data[i+1],ground.data[i+2]));if(c<worst)worst=c;}
    ck(`heading line 1 ground gives the orange at least 6:1 at ${w}`, n>0&&worst>=6, `worst ${worst.toFixed(2)}:1 over ${n} ink px`);
    await p.close();
  }
  // The -6vw shift must not uncover the page at the right edge.
  for(const w of [768,840,880,881,900,933,960,1023]){
    const p=await open(w);
    const box=await p.evaluate(()=>{const r=document.querySelector('.regen-prefooter-section').getBoundingClientRect();return {y:r.top+r.height*0.4,h:r.height*0.5};});
    const im=await sharp(await p.screenshot({clip:{x:w-3,y:box.y,width:3,height:box.h}})).raw().toBuffer({resolveWithObject:true});
    let light=0,n=0;for(let i=0;i<im.data.length;i+=im.info.channels){n++;if(im.data[i]>200&&im.data[i+1]>200&&im.data[i+2]>200)light++;}
    ck(`photograph reaches the right edge at ${w}`, light===0, `${light}/${n} white px in the last 3 columns`);
    await p.close();
  }
  // 1440: heading ink centre.
  const p=await open(1440);
  const cx=await p.evaluate(()=>{const rg=document.createRange();rg.selectNodeContents(document.querySelector('.regen-prefooter-title'));const q=rg.getBoundingClientRect();return (q.left+q.right)/2;});
  ck('heading ink centred at the design\'s x992 at 1440', Math.abs(cx-992)<=15, `${Math.round(cx)}`);
  await p.close();
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
