const { chromium } = require('playwright');
const TOK={'#20261A':'Log Cabin','#2E4322':'Mallard','#FFFFFF':'White','#A3D2EE':'Blizzard Blue',
           '#67A818':'Christi','#F2580E':'Pomegranate','#FFEF5C':'Gorse','#3A3F31':'Kelp',
           '#D9D9D9':'Alto','#151510':'color/yellow/7','#EA3213':'Playlists red'};
const hex=c=>{const m=c.match(/\d+/g); if(!m) return c;
  return '#'+m.slice(0,3).map(x=>(+x).toString(16).padStart(2,'0')).join('').toUpperCase();};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=600){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(70);}
  await p.waitForTimeout(1300);
  const secs=await p.evaluate(()=>{
    const scope=document.querySelector('.jammy')||document;
    return [...scope.querySelectorAll('section')].map((s,i)=>{
      const h=s.querySelector('h1,h2');
      return {i, label:(h?h.textContent:'(no heading)').replace(/\s+/g,' ').trim().slice(0,40),
              bg:getComputedStyle(s).backgroundColor};
    });
  });
  console.log('  SECTION BACKGROUNDS vs Figma tokens:');
  let unknown=0;
  secs.forEach(s=>{
    const h=hex(s.bg);
    const tok=TOK[h];
    if(!tok && !/rgba\(0, 0, 0, 0\)/.test(s.bg)) unknown++;
    console.log(`   ${String(s.i).padStart(2)}. ${s.label.padEnd(42)} ${h.padEnd(9)} ${tok||(/rgba\(0, 0, 0, 0\)/.test(s.bg)?'(transparent)':'<-- NOT A TOKEN')}`);
  });
  console.log(unknown? `\n  ${unknown} background(s) not matching a named token` : '\n  every opaque section background is a named Figma token');
  await b.close();
})();
