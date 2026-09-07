const { chromium } = require('playwright');
const lum=c=>{const [r,g,b]=c.map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});
  return 0.2126*r+0.7152*g+0.0722*b;};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
  await p.waitForTimeout(1400);
  // sample the real painted pixels under each body paragraph
  const targets=await p.evaluate(()=>
    [...document.querySelectorAll('p')].filter(e=>{
      const t=e.textContent.trim(); const r=e.getBoundingClientRect();
      return t.length>60 && r.width>80 && r.height>20;
    }).map(e=>{const r=e.getBoundingClientRect();
      return {t:e.textContent.trim().slice(0,34), colour:getComputedStyle(e).color,
              x:Math.round(r.left+4), y:Math.round(r.top+window.scrollY+r.height/2)};}));
  for(const t of targets){
    await p.evaluate(y=>scrollTo(0,y-400), t.y);
    await p.waitForTimeout(180);
    const shot=await p.screenshot({clip:{x:t.x,y:400-8,width:180,height:16}});
    const sharp=require('fs');
    // decode the PNG by re-rendering it in the page
    const bg=await p.evaluate(async(d)=>{
      const img=new Image(); img.src='data:image/png;base64,'+d;
      await img.decode();
      const c=document.createElement('canvas'); c.width=img.width; c.height=img.height;
      const x=c.getContext('2d'); x.drawImage(img,0,0);
      const px=x.getImageData(0,0,img.width,img.height).data;
      // background = the most common colour in the strip
      const m={};
      for(let i=0;i<px.length;i+=4){const k=[px[i]>>3<<3,px[i+1]>>3<<3,px[i+2]>>3<<3].join(',');m[k]=(m[k]||0)+1;}
      return Object.entries(m).sort((a,b)=>b[1]-a[1])[0][0].split(',').map(Number);
    }, shot.toString('base64'));
    const fg=t.colour.match(/\d+/g).slice(0,3).map(Number);
    const L1=lum(fg), L2=lum(bg);
    const ratio=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
    const ok=ratio>=4.5;
    console.log(`  ${ok?'PASS':'FAIL'}  ${ratio.toFixed(2)}:1  "${t.t}..."`);
  }
  await b.close();
})();
