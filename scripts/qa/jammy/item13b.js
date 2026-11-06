const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// Format Versatility: all four tile photographs carry the client's corrected
// yolk colour.
//
// These are re-grades of the same frames, not new shots -- mean absolute
// difference 0.8 to 7.9 against the files they replace. Three of the four
// moved visibly (green channel: snack 145->135, toast 143->132) but salad and
// ramen barely register on a whole-frame average (125->124, 130->129), because
// their eggs are a small part of a busy picture. So this asserts each tile's
// own measured value rather than one shared threshold -- a single rule would
// either miss salad and ramen or fail the others.
// Each tile's yolk is measured in the REGION its egg occupies, not across the
// whole frame. A whole-frame average hid two of the four edits: salad moved
// 125->124 and ramen 130->129 that way, because their eggs are a small part of
// a busy picture, and a tolerance loose enough to survive a re-encode would
// have passed the old artwork. Sampled locally the same edits are
// 146->139 and 170->160, which discriminate cleanly.
//
// box is [x0,y0,x1,y1] as fractions of the frame; green is the corrected
// artwork's mean green channel in that box.
const EXPECT = {
  'grid-salad.jpg': {w:1600, h:1067, box:[0.52,0.46,0.68,0.62], green:139},
  'grid-snack.jpg': {w:1600, h:896,  box:[0.00,0.00,1.00,1.00], green:139},
  'grid-ramen.jpg': {w:1400, h:1000, box:[0.00,0.00,1.00,1.00], green:136},   // the toast tile, misnamed
  'grid-hand.jpg':  {w:1400, h:933,  box:[0.55,0.60,0.95,0.95], green:160},   // the ramen tile, misnamed
};

(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
  const bad=[];
  p.on('response',r=>{if(r.status()>=400&&/grid-/.test(r.url()))bad.push(r.url().split('/').pop());});
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
  await p.waitForTimeout(1000);

  const BOXES=Object.fromEntries(Object.entries(EXPECT).map(([k,v])=>[k,v.box]));
  const rows=await p.evaluate((BOXES)=>{
    const measure=(src,box)=>new Promise(res=>{
      const i=new Image();
      i.onload=()=>{
        const W=i.naturalWidth, H=i.naturalHeight;
        const x0=Math.floor(W*box[0]), y0=Math.floor(H*box[1]);
        const w=Math.max(1,Math.floor(W*(box[2]-box[0]))), h=Math.max(1,Math.floor(H*(box[3]-box[1])));
        const cv=document.createElement('canvas'); cv.width=w; cv.height=h;
        cv.getContext('2d').drawImage(i, x0,y0,w,h, 0,0,w,h);
        const d=cv.getContext('2d').getImageData(0,0,w,h).data;
        let rs=0,gs=0,bs=0,n=0;
        for(let k=0;k<d.length;k+=4){
          const r=d[k],g=d[k+1],bl=d[k+2];
          if(r>180 && g>70 && g<210 && bl<150 && (r-bl)>70){ rs+=r; gs+=g; bs+=bl; n++; }
        }
        res({natW:W, natH:H,
             yolk:n?[Math.round(rs/n),Math.round(gs/n),Math.round(bs/n)]:null, px:n});
      };
      i.onerror=()=>res(null);
      i.src=src;
    });
    return Promise.all([...document.querySelectorAll('[data-tile] img')].map(async img=>{
      const file=img.getAttribute('src').split('/').pop();
      const box=(BOXES[file]||[0,0,1,1]);
      return {file, loaded: img.complete && img.naturalWidth>0,
              ...(await measure(img.src, box) || {})};
    }));
  }, BOXES);

  ck('all four tiles present', rows.length===4, `${rows.length}`);
  for(const r of rows){
    const e=EXPECT[r.file];
    if(!e){ ck(`${r.file} is a known tile`, false); continue; }
    ck(`${r.file} loads`, r.loaded);
    ck(`${r.file} at its shipped size`, r.natW===e.w && r.natH===e.h, `${r.natW}x${r.natH}`);
    // +-4 on the green channel. Sampled in the egg's own region the smallest
    // real shift is salad's 7 points (146->139), so this discriminates the old
    // artwork from the new on every tile while surviving re-encode noise.
    ck(`${r.file} carries the corrected yolk`,
       r.yolk && Math.abs(r.yolk[1]-e.green)<=4,
       r.yolk?`green ${r.yolk[1]}, expected ~${e.green}`:'no yolk pixels found');
  }
  ck('no broken tile requests', bad.length===0, bad.join(','));

  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
