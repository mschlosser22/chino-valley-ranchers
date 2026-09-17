const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// Product Feature band: the client's re-edited backdrop, and the labels that
// sit on it.
//
// The yolk is a deeper orange -- mean rgb(248,154,31) before, rgb(248,139,31)
// after. That is the change QA asked for, but it darkened the ground under
// three labels enough to drop them below WCAG AA: "Easy and ready to eat"
// 3.95:1, "Packed with nutrients" 3.97:1, "Enjoy any time of day" 4.12:1,
// where the previous artwork held 4.75-5.00:1. Nothing in the suite caught
// that, so the contrast is asserted here against the RENDERED ground rather
// than assumed.
const lum=(r,g,b)=>{const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};
  return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);};

(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
  const bad=[];
  p.on('response',r=>{if(r.status()>=400&&/features-bg/.test(r.url()))bad.push(r.url().split('/').pop());});
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
  await p.waitForTimeout(700);

  // The asset itself.
  const img=await p.evaluate(()=>new Promise(res=>{
    const el=document.querySelector('.jammy-features-bg img');
    if(!el) return res(null);
    const i=new Image();
    i.onload=()=>{
      const cv=document.createElement('canvas');
      cv.width=i.naturalWidth; cv.height=i.naturalHeight;
      cv.getContext('2d').drawImage(i,0,0);
      const d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data;
      let rs=0,gs=0,bs=0,n=0;
      for(let y=0;y<cv.height;y+=3) for(let x=0;x<cv.width;x+=3){
        const o=(y*cv.width+x)*4, r=d[o],g=d[o+1],bl=d[o+2];
        if(r>200 && g>90 && g<200 && bl<120 && (r-bl)>100){ rs+=r; gs+=g; bs+=bl; n++; }
      }
      res({w:i.naturalWidth,h:i.naturalHeight,
           yolk:n?[Math.round(rs/n),Math.round(gs/n),Math.round(bs/n)]:null});
    };
    i.onerror=()=>res(null);
    i.src=el.src;
  }));
  if(!img){ ck('features backdrop found', false); }
  else {
    ck('backdrop dimensions unchanged', img.w===2400 && img.h===1600, `${img.w}x${img.h}`);
    // Green channel: 154 on the old artwork, 139 on the new.
    ck('backdrop carries the adjusted yolk', img.yolk && img.yolk[1]<=146,
       img.yolk?`mean rgb(${img.yolk.join(',')}) — green ${img.yolk[1]}, was 154`:'no yolk found');
  }

  // Contrast of every label against the ground actually rendered beside it.
  const boxes=await p.evaluate(()=>[...document.querySelectorAll('.jammy-feature h3')].map(h=>{
    const r=h.getBoundingClientRect();
    return {label:h.textContent.trim(), colour:getComputedStyle(h).color,
            x:Math.round(r.right+6), y:Math.round(r.top+window.scrollY+r.height/2), w:14, h:8};
  }));
  let worst=99, worstLabel='';
  for(const bx of boxes){
    const buf=await p.screenshot({clip:{x:bx.x,y:bx.y,width:bx.w,height:bx.h},fullPage:true});
    const rgb=await p.evaluate(({b64})=>new Promise(res=>{
      const i=new Image();
      i.onload=()=>{const cv=document.createElement('canvas');cv.width=i.width;cv.height=i.height;
        cv.getContext('2d').drawImage(i,0,0);
        const d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data;
        let r=0,g=0,b2=0,n=0;
        for(let k=0;k<d.length;k+=4){r+=d[k];g+=d[k+1];b2+=d[k+2];n++;}
        res([Math.round(r/n),Math.round(g/n),Math.round(b2/n)]);};
      i.onerror=()=>res(null);
      i.src='data:image/png;base64,'+b64;}),{b64:buf.toString('base64')});
    if(!rgb) continue;
    const m=bx.colour.match(/\d+/g).map(Number);
    const L1=lum(...m), L2=lum(...rgb);
    const ratio=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
    if(ratio<worst){ worst=ratio; worstLabel=bx.label; }
  }
  ck('every feature label meets WCAG AA on the backdrop', worst>=4.5,
     `worst ${worst.toFixed(2)}:1 ("${worstLabel}")`);

  ck('no broken backdrop requests', bad.length===0, bad.join(','));
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
