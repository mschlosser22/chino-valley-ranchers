const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
  await p.waitForTimeout(2200);
  const m=await p.evaluate(async()=>{
    await document.fonts.ready;
    const h1=document.querySelector('h1');
    const spans=[...h1.querySelectorAll('span')];
    const ribbon=spans[0];
    const script=spans.find(s=>/nexa/.test(getComputedStyle(s).fontFamily));
    const sub=[...document.querySelectorAll('p span')].find(s=>/organic regenerative eggs/i.test(s.textContent));
    const cs=getComputedStyle(ribbon), sc=getComputedStyle(script), sb=getComputedStyle(sub);
    const ink=el=>{const r=document.createRange();r.selectNodeContents(el);return r.getBoundingClientRect().width;};
    const m=cs.transform.match(/matrix\(([^)]+)\)/);
    const deg=m?Math.atan2(parseFloat(m[1].split(',')[1]),parseFloat(m[1].split(',')[0]))*180/Math.PI:0;
    return {ribbonPct:+(ribbon.getBoundingClientRect().width/innerWidth*100).toFixed(1),
            tilt:+deg.toFixed(2), notch:cs.clipPath!=='none', ribbonBg:cs.backgroundColor,
            scriptPct:+(ink(script)/innerWidth*100).toFixed(1),
            scriptFace:sc.fontFamily.split(',')[0].replace(/["']/g,''),
            strokeW:parseFloat(sc.webkitTextStrokeWidth),
            strokeCol:sc.webkitTextStrokeColor, shadow:sc.filter!=='none',
            subBand:sb.backgroundColor, subFace:sb.fontFamily.split(',')[0].replace(/["']/g,'')};
  });
  ck('ribbon at design width', Math.abs(m.ribbonPct-28.5)<1.5, `${m.ribbonPct}% vs 28.5%`);
  ck('ribbon tilted as drawn', Math.abs(m.tilt-(-1.74))<0.4, `${m.tilt} deg vs -1.74`);
  ck('ribbon ends are notched', m.notch);
  ck('ribbon in design teal', m.ribbonBg==='rgb(0, 96, 136)', m.ribbonBg);
  ck('script at design width', Math.abs(m.scriptPct-68.0)<1.5, `${m.scriptPct}% vs 68.0%`);
  ck('script in the real face', m.scriptFace==='nexa-rust-script-shad-2', m.scriptFace);
  ck('script has a white outline', m.strokeW>2 && /255, 255, 255/.test(m.strokeCol), `${m.strokeW}px`);
  ck('script has a drop shadow', m.shadow);
  ck('sub-line sits on a dark band', /rgba\(24, 26, 20/.test(m.subBand), m.subBand);
  ck('sub-line in DIN Condensed', m.subFace==='din-condensed', m.subFace);
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
