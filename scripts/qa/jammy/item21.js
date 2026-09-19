const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};

// FAQs, checked against the client-approved copy doc rather than against a
// transcription of it. QA: "Questions are missing and not in the correct
// order. Please ensure you're following the copy doc exactly."
//
// The page had six questions; the doc has seven. "Is the egg fully cooked?"
// and "How are Jammy Eggs raised and produced?" were missing, "Why is the yolk
// so golden?" was on the page but not in the doc, and four answers had drifted
// into looser paraphrases -- including "How is The Jammy Egg packaged and
// stored?", which QA did not list but had also drifted.
//
// docs/qa-evidence/jammy-copy-section-ix.txt is Section IX extracted from the
// PDF. Comparing against the doc means a future copy revision surfaces here
// instead of silently passing.
const REF = path.join(__dirname,'../../../docs/qa-evidence/jammy-copy-section-ix.txt');

const norm = t => t
  .normalize('NFC')
  .replace(/[’‘]/g, "'")
  .replace(/[“”]/g, '"')
  .replace(/[​—–]/g, m => m === '​' ? '' : m)
  .replace(/\s+/g, ' ')
  .trim();

(async()=>{
  const docRaw = fs.readFileSync(REF,'utf8')
    .replace(/➡|➜|​/g,'')
    .replace(/\n\s*\d+\s*\n/g,'\n');
  const doc = norm(docRaw);

  const b=await chromium.launch();
  const p=await b.newContext({viewport:{width:1440,height:1000}}).then(c=>c.newPage());
  await p.goto('http://localhost:7500/jammy',{waitUntil:'networkidle',timeout:60000});
  await p.getByRole('region',{name:/cookie consent/i}).getByRole('button',{name:/reject all/i}).click().catch(()=>{});
  const hh=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<hh;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(60);}
  await p.waitForTimeout(800);

  // Open every row so the answers are rendered, then read them in DOM order.
  const live = await p.evaluate(async () => {
    const isQ = b => /\?\s*[+×−-]?$/.test(b.textContent.trim());
    const btns = [...document.querySelectorAll('button')].filter(isQ);
    for (const b of btns) { b.click(); await new Promise(r=>setTimeout(r,70)); }
    await new Promise(r=>setTimeout(r,350));
    return btns.map(b => {
      const q = b.textContent.trim().replace(/[+×−-]\s*$/,'').trim();
      let row=b.parentElement, a='';
      for (let i=0;i<5 && row;i++){
        const el=row.querySelector('p');
        if (el && el.textContent.trim()) { a = el.textContent.trim(); break; }
        row=row.parentElement;
      }
      return {q,a};
    });
  });

  // Pull the doc's questions in their own order, so ordering is checked
  // against the source rather than a list retyped here.
  const docQs = [];
  for (const m of docRaw.matchAll(/^\s*([A-Z][^\n?]{8,80}\?)\s*$/gm)) docQs.push(norm(m[1]));

  ck('the copy doc reference is present', doc.length > 400, `${doc.length} chars`);
  ck('every question in the doc is on the page',
     docQs.every(q => live.some(l => norm(l.q) === q)),
     docQs.filter(q => !live.some(l => norm(l.q) === q)).join(' | ') || 'none missing');
  ck('no question on the page is absent from the doc',
     live.every(l => docQs.includes(norm(l.q))),
     live.filter(l => !docQs.includes(norm(l.q))).map(l=>l.q).join(' | ') || 'none extra');
  ck('questions are in the doc\'s order',
     JSON.stringify(live.map(l=>norm(l.q))) === JSON.stringify(docQs),
     `page: ${live.length}, doc: ${docQs.length}`);

  // Every answer must appear verbatim in the doc.
  const drifted = live.filter(l => !doc.includes(norm(l.a)));
  ck('every answer matches the doc verbatim', drifted.length===0,
     drifted.map(l=>l.q).join(' | ') || `${live.length} answers checked`);

  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
  process.exit(f?1:0);
})();
