// Section 7's four callouts (review item WI-18).
// The design sets the callout titles in Ultra 32px on the 2075 artboard
// (nodes 5:273-5:276, 0.64px tracking), not din-condensed. Two narrow-desktop
// faults ride along: at 1024-1100 the "Healthy Soil" copy ran onto the hen in
// the diagram, and "Farming for Tomorrow" could start a line with the dash.
const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  for(const w of [390,768,1024,1100,1200,1330,1440,1920]){
    const p=await b.newContext({viewport:{width:w,height:1000}}).then(c=>c.newPage());
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
    const m=await p.evaluate(async()=>{
      await document.fonts.ready;
      const cs=[...document.querySelectorAll('.regen-callout')];
      const faces=cs.map(c=>getComputedStyle(c.querySelector('h3')).fontFamily.split(',')[0].replace(/["']/g,'').trim());
      const loaded=document.fonts.check('16px Ultra');
      // Per-glyph rects of a paragraph.
      const glyphs=el=>{const out=[];const tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;
        while(n=tw.nextNode()){for(let i=0;i<n.length;i++){if(/\s/.test(n.data[i]))continue;
          const r=document.createRange();r.setStart(n,i);r.setEnd(n,i+1);const q=r.getClientRects()[0];if(q)out.push({ch:n.data[i],r:q});}}return out;};
      // Lines of the Farming copy: a glyph whose top steps down starts a line.
      // All four, not just Farming: "grazing—improving" broke the same way.
      const starts=[];
      for(const c of cs){let lastTop=-1e9;
        for(const g of glyphs(c.querySelector('p'))){if(g.r.top>lastTop+g.r.height*0.5){starts.push(g.ch);lastTop=g.r.top;}}}
      // Healthy Soil copy against the diagram's own pixels.
      const art=document.querySelector('.regen-soil__art'); const ar=art.getBoundingClientRect();
      const cv=document.createElement('canvas');cv.width=art.naturalWidth;cv.height=art.naturalHeight;
      const cx=cv.getContext('2d');cx.drawImage(art,0,0);
      const px=cx.getImageData(0,0,cv.width,cv.height).data;
      const soil=cs.find(c=>/healthy soil/i.test(c.textContent)).querySelector('p');
      let n=0,on=0;
      for(const g of glyphs(soil)){
        for(const fx of [0.25,0.5,0.75]) for(const fy of [0.3,0.5,0.7]){
          const x=g.r.left+g.r.width*fx, y=g.r.top+g.r.height*fy; n++;
          if(x<ar.left||x>=ar.right||y<ar.top||y>=ar.bottom) continue;
          const ix=Math.floor((x-ar.left)/ar.width*cv.width), iy=Math.floor((y-ar.top)/ar.height*cv.height);
          const i=(iy*cv.width+ix)*4; const [r,gg,bb,a]=[px[i],px[i+1],px[i+2],px[i+3]];
          const lum=0.2126*r+0.7152*gg+0.0722*bb;
          const sky= bb>=r && lum>150;          // pale blue sky / its soft edge
          if(a>=200 && !sky) on++;
        }}
      return {faces,loaded,starts,soilOn:on/n,positioned:getComputedStyle(cs[0]).position==='absolute'};
    });
    console.log(`\n  --- ${w}px ---`);
    ck(`all four titles in Ultra at ${w}`, m.faces.every(f=>f==='Ultra')&&m.loaded, m.faces.join(', '));
    ck(`no callout line starts with a dash at ${w}`, !m.starts.includes('—'), `line starts: ${m.starts.join(' ')}`);
    if(m.positioned)
      ck(`Healthy Soil copy is off the diagram's opaque art at ${w}`, m.soilOn===0, `${(m.soilOn*100).toFixed(1)}% of glyph samples on art`);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
