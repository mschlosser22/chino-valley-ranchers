// Section 2's video (review item WI-3b; URL supplied by the business 5 Nov 2026).
// The play control loads the YouTube player only when it is pressed, from the
// privacy-enhanced youtube-nocookie domain, so the page makes no request to
// YouTube before the visitor asks for the video -- the same rule as the rest of
// the site's embeds (components/video/ConsentGatedVideo.js). Visitors who have
// not allowed embedded media are told, under the video, that playing it loads
// it from YouTube.
const { chromium } = require('playwright');
const R=[];const ck=(n,p,d='')=>{R.push(p);console.log(`${p?'PASS':'FAIL'}  ${n}${d?' — '+d:''}`)};
// The video hosts only. With "Accept all", the tag manager (run by the
// client's agency, not this page) makes its own ad requests -- not the video's.
const YT=/youtube|ytimg|googlevideo|vimeo/;
(async()=>{
  const b=await chromium.launch();
  for(const [w,consent] of [[390,'reject'],[1440,'reject'],[1440,'accept']]){
    const p=await b.newContext({viewport:{width:w,height:900}}).then(c=>c.newPage());
    const reqs=[];p.on('request',r=>{if(YT.test(new URL(r.url()).hostname))reqs.push(r.url())});
    await p.goto('http://localhost:7500/regenerative',{waitUntil:'networkidle',timeout:60000});
    const region=p.getByRole('region',{name:/cookie consent/i});
    await region.getByRole('button',{name:consent==='accept'?/accept all/i:/reject all/i}).click().catch(()=>{});
    const wrap=p.locator('[data-regen-video-wrap]');
    await wrap.scrollIntoViewIfNeeded(); await p.waitForTimeout(1200);
    const tag=`${w} (${consent}ed)`;
    console.log(`\n  --- ${tag} ---`);
    const before=await p.evaluate(()=>{const w=document.querySelector('[data-regen-video-wrap]');
      const sec=w.closest('section');
      const note=[...sec.querySelectorAll('p')].find(e=>/youtube/i.test(e.textContent));
      return {iframes:w.querySelectorAll('iframe').length,
              note:note?{shown:getComputedStyle(note).display!=='none'&&note.getBoundingClientRect().height>0,text:note.textContent.trim(),
                         settings:!!note.querySelector('button')}:null};});
    ck(`no player before the click at ${tag}`, before.iframes===0, `${before.iframes} iframes`);
    ck(`no request to YouTube before the click at ${tag}`, reqs.length===0, reqs.slice(0,2).join(' '));
    if(consent==='reject'){
      ck(`says the video plays from YouTube at ${tag}`, !!before.note&&before.note.shown&&/cookie/i.test(before.note.text), before.note?before.note.text:'no note');
      ck(`offers cookie settings at ${tag}`, !!before.note&&before.note.settings);
    } else {
      ck(`no YouTube notice once embedded media is allowed at ${tag}`, !before.note||!before.note.shown);
    }
    await p.getByRole('button',{name:/play the video/i}).click();
    await p.waitForTimeout(1500);
    const after=await p.evaluate(()=>{const w=document.querySelector('[data-regen-video-wrap]');
      const f=[...w.querySelectorAll('iframe')];
      const still=w.querySelector('img[src*="video-still"]');
      const sr=(still||w).getBoundingClientRect();
      const fr=f[0]?f[0].getBoundingClientRect():null;
      const play=[...w.querySelectorAll('button')].find(e=>/play the video/i.test(e.getAttribute('aria-label')||''));
      const hear=[...w.querySelectorAll('[aria-hidden="true"]')].find(e=>/hear chris/i.test(e.textContent));
      const arrow=w.querySelector('img[src*="arrow-hear"]');
      const vis=e=>!!e&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().width>0;
      return {n:f.length, src:f[0]&&f[0].getAttribute('src'), title:f[0]&&f[0].getAttribute('title'),
        allow:f[0]&&f[0].getAttribute('allow'),
        inStill:fr&&Math.abs(fr.left-sr.left)<1.5&&Math.abs(fr.top-sr.top)<1.5&&Math.abs(fr.width-sr.width)<1.5&&Math.abs(fr.height-sr.height)<1.5,
        zf:f[0]&&getComputedStyle(f[0]).zIndex, playShown:vis(play), hearShown:vis(hear)||vis(arrow),
        focused:document.activeElement&&document.activeElement.tagName};});
    ck(`exactly one player after the click at ${tag}`, after.n===1, `${after.n}`);
    let u=null;try{u=new URL(after.src)}catch(e){}
    ck(`player is privacy-enhanced youtube-nocookie at ${tag}`, !!u&&u.hostname==='www.youtube-nocookie.com', after.src);
    ck(`player is the business's video (8HHTYPax3IU) at ${tag}`, !!u&&u.pathname==='/embed/8HHTYPax3IU');
    ck(`player starts on the click and drops the share-tracking param at ${tag}`, !!u&&u.searchParams.get('autoplay')==='1'&&!u.searchParams.has('si'));
    ck(`player has a title and may autoplay at ${tag}`, !!after.title&&/autoplay/.test(after.allow||''));
    ck(`player fills the photo inside the painted frame at ${tag}`, !!after.inStill);
    ck(`play ring and "Hear Chris" note step aside for the player at ${tag}`, !after.playShown&&!after.hearShown);
    await p.close();
  }
  await b.close();
  const f=R.filter(x=>!x).length;
  console.log(`\n${R.length-f}/${R.length} passed`);
})();
