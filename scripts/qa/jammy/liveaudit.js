const { chromium } = require('playwright');
const fs=require('fs');
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(70);}
  await p.waitForTimeout(1500);
  const live=await p.evaluate(()=>{
    const scope=document.querySelector('.jammy')||document;
    const out=[];
    const walk=el=>{
      for(const c of el.children){
        const direct=[...c.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim();
        if(direct.length>3){
          const cs=getComputedStyle(c);
          out.push({text:direct.replace(/\s+/g,' ').slice(0,70),
                    tag:c.tagName,
                    ff:cs.fontFamily.split(',')[0].replace(/"/g,''),
                    fw:cs.fontWeight, fs:Math.round(parseFloat(cs.fontSize)),
                    color:cs.color, tt:cs.textTransform});
        }
        walk(c);
      }
    };
    walk(scope);
    return out;
  });
  fs.writeFileSync(__dirname+'/live-fonts.json', JSON.stringify(live,null,1));
  console.log(`${live.length} rendered text nodes captured`);
  await b.close();
})();
