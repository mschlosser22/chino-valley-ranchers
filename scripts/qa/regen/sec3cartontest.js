// Section 3's carton on phones.
// sign-purchase.jpg has the BOTTOM OF THE CARTON baked into its top-left
// corner (x0-15%, y0-8% of the sign), because at desktop the real carton sits
// up and to the left of the sign and continues straight into it. On phones the
// carton was centred above the sign and painted UNDER it (its inline z-index 2
// beat the stylesheet's 4), so the sign cut the carton off and the baked
// fragment showed as a stray white curl. The carton now sits in front of the
// sign over that corner, hiding the fragment, clear of the lettering.
const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const w of [360,390,430,600,767]){
    const p=await b.newContext({viewport:{width:w,height:900}}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.locator('.regen-agri-stage a[href="/products"]').scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
    const m=await p.evaluate(async()=>{
      const st=document.querySelector('.regen-agri-stage');
      const c=st.querySelector('img[src*="carton"]'), a=st.querySelector('a[href="/products"]'), s=a.querySelector('img');
      await Promise.all([c,s].map(i=>i.decode().catch(()=>{})));
      const cr=c.getBoundingClientRect(), sr=s.getBoundingClientRect();
      const alphaOf=(img)=>{const cv=document.createElement('canvas');cv.width=img.naturalWidth;cv.height=img.naturalHeight;
        const x=cv.getContext('2d');x.drawImage(img,0,0);return {d:x.getImageData(0,0,cv.width,cv.height).data,w:cv.width,h:cv.height};};
      const CA=alphaOf(c), SA=alphaOf(s);
      const cartonOpaqueAt=(X,Y)=>{if(X<cr.left||X>=cr.right||Y<cr.top||Y>=cr.bottom)return false;
        const ix=Math.floor((X-cr.left)/cr.width*CA.w), iy=Math.floor((Y-cr.top)/cr.height*CA.h);
        return CA.d[(iy*CA.w+ix)*4+3]>200;};
      // The baked fragment: non-red pixels in the sign's top-left corner.
      let frag=0,covered=0;
      for(let fy=0;fy<0.09;fy+=0.004) for(let fx=0;fx<0.16;fx+=0.004){
        const ix=Math.floor(fx*SA.w), iy=Math.floor(fy*SA.h), i=(iy*SA.w+ix)*4;
        if(SA.d[i]>SA.d[i+1]+40) continue;           // red wood
        frag++; if(cartonOpaqueAt(sr.left+fx*sr.width, sr.top+fy*sr.height)) covered++;}
      // The lettering starts 14.1% down the sign, across its middle.
      let onText=0;
      for(let fy=0.141;fy<0.9;fy+=0.01) for(let fx=0.15;fx<0.85;fx+=0.01)
        if(cartonOpaqueAt(sr.left+fx*sr.width, sr.top+fy*sr.height)) onText++;
      const z=e=>parseInt(getComputedStyle(e).zIndex)||0;
      return {frag, covered, onText, cz:z(c), az:z(a), left:cr.left, right:cr.right, iw:innerWidth};
    });
    console.log(`\n  --- ${w}px ---`);
    ck(`carton paints in front of the sign at ${w}`, m.cz>m.az, `z ${m.cz} vs sign ${m.az}`);
    ck(`baked carton fragment on the sign is covered at ${w}`, m.frag>0 && m.covered/m.frag>=0.98, `${m.covered}/${m.frag} fragment samples covered`);
    ck(`carton clear of the sign's lettering at ${w}`, m.onText===0, `${m.onText} samples on the lettering`);
    ck(`carton fully on screen at ${w}`, m.left>=0 && m.right<=m.iw, `${Math.round(m.left)}..${Math.round(m.right)} of ${m.iw}`);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
