const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// Jammy page: the hero photograph carries the client's adjusted yolk.
//
// The replacement was the same frame at 3040x1682 against the live asset's
// 2400x1328 -- a straight swap, no re-cut. The edit is small and local: 0.2%
// of pixels differ, all inside the yolk running down the toast, and the mean
// yolk colour moves from rgb(197,131,74) to rgb(197,127,74). That is far too
// small a change to eyeball on a photo this dark, which is why it is measured.
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
  const bad=[];
  p.on('response',r=>{if(r.status()>=400&&/brand-hero/.test(r.url()))bad.push(r.url().split('/').pop());});
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  await p.waitForTimeout(600);

  const m=await p.evaluate(async()=>{
    const el=[...document.querySelectorAll('img')].find(i=>/brand-hero/.test(i.getAttribute('src')||''));
    if(!el) return null;
    const load = () => new Promise(res=>{
      const img=new Image();
      img.onload=()=>{
        const cv=document.createElement('canvas');
        cv.width=img.naturalWidth; cv.height=img.naturalHeight;
        cv.getContext('2d').drawImage(img,0,0);
        const d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data;
        let rs=0,gs=0,bs=0,n=0;
        for(let y=0;y<cv.height;y+=2) for(let x=0;x<cv.width;x+=2){
          const o=(y*cv.width+x)*4, r=d[o],g=d[o+1],bl=d[o+2];
          if(r>170 && g>60 && g<175 && bl<110 && (r-bl)>85){ rs+=r; gs+=g; bs+=bl; n++; }
        }
        res({w:img.naturalWidth,h:img.naturalHeight,
             yolk: n?[Math.round(rs/n),Math.round(gs/n),Math.round(bs/n)]:null, px:n});
      };
      img.onerror=()=>res(null);
      img.src=el.src;
    });
    return {decoded: await load(), rendered: el.complete && el.naturalWidth>0,
            fit:getComputedStyle(el).objectFit};
  });

  if(!m || !m.decoded){ ck('hero image found and decodes', false); }
  else {
    const a=m.decoded;
    ck('hero loads and renders', m.rendered);
    ck('hero dimensions unchanged', a.w===2400 && a.h===1328, `${a.w}x${a.h}`);
    ck('hero still covers its frame', m.fit==='cover', m.fit);
    if(a.yolk){
      // The adjustment is a deeper orange: the green channel drops from 131
      // to 127. Tight, because the edit itself is tight -- a wider bound would
      // pass the artwork it replaced.
      ck('yolk carries the adjusted colour', a.yolk[1]<=129,
         `mean rgb(${a.yolk.join(',')}) — green ${a.yolk[1]}, was 131`);
      ck('yolk still reads as yolk', a.yolk[0]>185 && a.yolk[1]>110,
         `rgb(${a.yolk.join(',')})`);
    } else ck('yolk found in the hero', false);
  }
  ck('no broken hero requests', bad.length===0, bad.join(','));

  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
