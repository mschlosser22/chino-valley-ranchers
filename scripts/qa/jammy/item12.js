const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1200},deviceScaleFactor:2}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(80);}
  await p.waitForTimeout(2000);
  const d=await p.evaluate(()=>{
    const g=document.querySelector('.jammy-tiles');
    const tiles=[...g.querySelectorAll('[data-tile]')];
    return tiles.map(t=>{
      const img=t.querySelector('img'); const lab=t.querySelector('[data-sticker]');
      const cs=lab&&getComputedStyle(lab);
      return {src:img.getAttribute('src').split('/').pop(),
              label:lab?lab.textContent.trim():null,
              tag:lab?lab.tagName:null,
              ff:cs?cs.fontFamily.split(',')[0]:null,
              color:cs?cs.color:null,
              op:cs?+cs.opacity:null,
              left:cs?cs.left:null, top:cs?cs.top:null,
              fs:cs?cs.fontSize:null};
    });
  });
  console.log('  tiles left to right:');
  d.forEach((t,i)=>console.log(`    ${i+1}. ${t.src.padEnd(16)} label=${String(t.label).padEnd(6)} ${t.ff||''} ${t.fs||''} op=${t.op??''}`));

  ck('order is salad, toast, snack, ramen',
     d.map(x=>x.src).join(',')==='grid-salad.jpg,grid-ramen.jpg,grid-snack.jpg,grid-hand.jpg',
     d.map(x=>x.src).join(','));
  ck('all four labels read Salad, Toast, Snack, Ramen',
     d.map(x=>x.label).join(',')==='Salad,Toast,Snack,Ramen', d.map(x=>x.label).join(','));
  ck('labels are live text, not an image', d.every(x=>x.tag==='SPAN'));
  ck('labels set in Cubano', d.every(x=>x.ff==='cubano'), d[0].ff);
  ck('labels are brand yellow', d.every(x=>x.color==='rgb(255, 239, 92)'), d[0].color);
  ck('labels anchored top-left', d.every(x=>x.left!=='auto'&&x.top!=='auto'), `${d[0].left}/${d[0].top}`);
  ck('all four labels animated in', d.every(x=>x.op===1), d.map(x=>x.op).join(','));
  ck('sticker svg no longer used', await p.evaluate(()=>!document.querySelector('img[src*="hard-part-sticker"]')));
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
