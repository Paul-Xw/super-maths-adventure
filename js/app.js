// v6.0.6 force clear stale generated/cached questions
if(!localStorage.getItem('sma_v606_force_clear_done')){
  localStorage.setItem('sma_v606_force_clear_done','1');
  Object.keys(localStorage).filter(k=>k.startsWith('cache_')).forEach(k=>localStorage.removeItem(k));
}
// v6.0.6 cache killer
if(!localStorage.getItem('sma_v606_cache_killer_done')){
  localStorage.setItem('sma_v606_cache_killer_done','1');
  if('caches' in window){caches.keys().then(keys=>keys.forEach(k=>caches.delete(k))).catch(()=>{});}
  if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(rs=>rs.forEach(r=>r.unregister())).catch(()=>{});}
}

const SUPABASE_URL="https://dofouumnszmdzkebybigs.supabase.co";
const SUPABASE_KEY="sb_publishable_Ip_WWAEo8NkHsxezIsN-_w_1LOnNc0D";
const CONFIG={storageKey:"sma_v6",localBankKey:"sma_v6_question_bank",cacheTTL:600000};
const WORLD_LIST=[
{world:1,slug:"world-1-integers",name:"Integer Kingdom",topic:"Integers",strand:"Number",icon:"🧙‍♂️",enemy:"👾",color:"from-cyan-400 to-blue-600"},
{world:2,slug:"world-2-algebra",name:"Algebra City",topic:"Expressions, Formulae & Equations",strand:"Algebra",icon:"🧮",enemy:"🤖",color:"from-purple-400 to-indigo-600"},
{world:3,slug:"world-3-place-value",name:"Number Mountain",topic:"Place Value & Rounding",strand:"Number",icon:"🔢",enemy:"💎",color:"from-emerald-400 to-teal-600"},
{world:4,slug:"world-4-decimals",name:"Decimal Ocean",topic:"Decimals",strand:"Number",icon:"🎯",enemy:"🎈",color:"from-sky-400 to-cyan-600"},
{world:5,slug:"world-5-angles",name:"Geometry Island",topic:"Angles & Constructions",strand:"Geometry",icon:"📐",enemy:"🐉",color:"from-orange-400 to-rose-600"},
{world:6,slug:"world-6-data",name:"Data Forest",topic:"Collecting Data",strand:"Statistics",icon:"📊",enemy:"🎈",color:"from-lime-400 to-green-600"},
{world:7,slug:"world-7-fractions",name:"Fraction Castle",topic:"Fractions",strand:"Number",icon:"🍕",enemy:"🍕",color:"from-yellow-400 to-amber-600"},
{world:8,slug:"world-8-shapes",name:"Shape Kingdom",topic:"Shapes & Symmetry",strand:"Geometry",icon:"🔷",enemy:"💎",color:"from-fuchsia-400 to-pink-600"},
{world:9,slug:"world-9-sequences",name:"Function Laboratory",topic:"Sequences & Functions",strand:"Algebra",icon:"📈",enemy:"🤖",color:"from-violet-400 to-purple-600"},
{world:10,slug:"world-10-percentages",name:"Percentage Town",topic:"Percentages",strand:"Number",icon:"💯",enemy:"🎯",color:"from-red-400 to-orange-600"},
{world:11,slug:"world-11-graphs",name:"Graph City",topic:"Graphs",strand:"Algebra; Statistics",icon:"📉",enemy:"📈",color:"from-blue-400 to-indigo-600"},
{world:12,slug:"world-12-ratio",name:"Ratio Valley",topic:"Ratio & Proportion",strand:"Number",icon:"⚖️",enemy:"⚖️",color:"from-teal-400 to-cyan-600"},
{world:13,slug:"world-13-probability",name:"Probability Lab",topic:"Probability",strand:"Statistics",icon:"🎲",enemy:"🎲",color:"from-pink-400 to-rose-600"},
{world:14,slug:"world-14-transformations",name:"Transformation Planet",topic:"Position & Transformation",strand:"Geometry",icon:"🔄",enemy:"🛸",color:"from-indigo-400 to-blue-600"},
{world:15,slug:"world-15-measurement",name:"Measurement Mountain",topic:"Distance, Area & Volume",strand:"Geometry",icon:"📦",enemy:"⛰️",color:"from-stone-400 to-slate-600"},
{world:16,slug:"world-16-statistics",name:"Statistics Universe",topic:"Interpreting & Discussing Results",strand:"Statistics",icon:"📊",enemy:"🌌",color:"from-amber-400 to-yellow-600"}];

const app=document.getElementById('app');
const sb=(window.supabase&&SUPABASE_URL.includes('.supabase.co'))?window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY):null;
const metrics={calls:0,hits:0,misses:0,last:0,mode:'boot'};
let ctx=null,bgm=null,audioOn=localStorage.getItem('sma_audio')!=='off';
function ac(){if(!ctx)ctx=new (window.AudioContext||window.webkitAudioContext)();return ctx}
function tone(f=440,d=.1,type='sine',v=.04){if(!audioOn)return;const c=ac(),o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=f;g.gain.value=v;o.connect(g);g.connect(c.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+d);o.stop(c.currentTime+d+.03)}
function sfx(n){if(n==='correct'){tone(660,.08);setTimeout(()=>tone(880,.1),80)}else if(n==='wrong')tone(220,.18,'sawtooth');else if(n==='coin'){tone(900,.07,'triangle');setTimeout(()=>tone(1200,.1,'triangle'),80)}else if(n==='victory'){[523,659,784,1046].forEach((f,i)=>setTimeout(()=>tone(f,.18,'triangle'),i*110))}else tone(880,.08,'sawtooth')}
function playBgm(w=1){if(!audioOn)return;clearInterval(bgm);let base=[196,220,246,261,293,329,349,392][(w-1)%8],step=0;bgm=setInterval(()=>{tone(base*(1+[0,.1,.2,.3,.5,.3,.2,.1][step%8]),.18,'sine',.015);step++},420)}
function cacheGet(k){try{let raw=localStorage.getItem('cache_'+k);if(!raw){metrics.misses++;return null}let o=JSON.parse(raw);if(Date.now()-o.t>CONFIG.cacheTTL){metrics.misses++;return null}metrics.hits++;return o.v}catch{metrics.misses++;return null}}
function cacheSet(k,v){try{localStorage.setItem('cache_'+k,JSON.stringify({t:Date.now(),v}))}catch{}return v}
function withTimeout(promise,ms=2500){return Promise.race([promise,new Promise(resolve=>setTimeout(()=>resolve(null),ms))])}
async function cached(k,fn){let c=cacheGet(k);if(c)return c;if(!sb)return null;metrics.calls++;let t=performance.now();let v=await fn();metrics.last=Math.round(performance.now()-t);return cacheSet(k,v)}
function norm(v){let s=String(v).replace(/,/g,'').trim(),n=/^[-+]?\d+(\.\d+)?$/.test(s)?Number(s):NaN;return !Number.isNaN(n)?'num:'+String(Number(n.toFixed(10))):'txt:'+String(v).trim().toLowerCase()}
function same(a,b){return norm(a)===norm(b)}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function sample(a,n){return shuffle(a).slice(0,n)}
function opts(options,answer){let out=[],seen=new Set();function add(v){let k=norm(v);if(!seen.has(k)){seen.add(k);out.push(String(v))}};Array.isArray(answer)?answer.forEach(add):add(answer);(options||[]).forEach(add);while(out.length<4)add('Choice '+out.length);return shuffle(out).slice(0,4)}
function calcStars(c,t){return c/t>=.9?3:c/t>=.75?2:c/t>=.6?1:0}
function localQs(){try{return JSON.parse(localStorage.getItem(CONFIG.localBankKey)||'[]')}catch{return[]}}
function setLocalQs(a){localStorage.setItem(CONFIG.localBankKey,JSON.stringify(a))}
function addLocalQ(q){let a=localQs();a.unshift({...q,id:'q_'+Date.now(),source:'local'});setLocalQs(a)}

function looksLikeIntegerOnly(q){return /^[-+]?\d+\s*[+\-×]\s*[-+]?\d+\s*=\s*\?$/.test(String(q.question_en||q.text||'').trim())}
function worldIsInteger(slug){return slug.includes('integer')}
async function fetchQuestions(slug){
  if(!sb)return null;
  const result=await withTimeout(cached('questions_'+slug,async()=>{
    let {data,error}=await sb.from('question_bank').select('*').eq('world_slug',slug).eq('published',true).order('created_at',{ascending:false}).limit(300);
    if(error)throw error;
    return data||[];
  }),2500);
  if(!result){metrics.mode='fallback-generator';return null}
  return result;
}
function generated(slug,topic,d='medium'){
  let rand=(a,b)=>Math.floor(Math.random()*(b-a+1))+a, out=[];
  function add(text,choices,answer,thai=''){out.push({text,options:opts(choices,answer),answer:String(answer),thai})}
  function dec(x){return Number(x).toFixed(1)}
  for(let i=0;i<60;i++){
    if(slug.includes('integer')){
      let x=rand(-20,20),y=rand(-20,20),op=['+','-','×'][rand(0,2)],ans=op==='+'?x+y:op==='-'?x-y:x*y;
      add(`${x} ${op} ${y} = ?`,[ans,ans+1,ans-1,-ans],ans,'คำนวณจำนวนเต็ม');
    }else if(slug.includes('algebra')||slug.includes('sequence')){
      if(i%2===0){let x=rand(1,12),a=rand(2,9),c=rand(1,20),ans=a*x+c;add(`If x=${x}, what is ${a}x + ${c}?`,[ans,ans+1,ans-1,a+c],ans,'แทนค่าในนิพจน์')}
      else{let first=rand(2,8),diff=rand(2,6),n=rand(4,9),ans=first+(n-1)*diff;add(`Sequence: ${first}, ${first+diff}, ${first+2*diff}, ... What is term ${n}?`,[ans,ans+diff,ans-diff,first*n],ans,'ลำดับเลขคณิต')}
    }else if(slug.includes('place-value')){
      let n=rand(1000,99999),round=[10,100,1000][rand(0,2)],ans=Math.round(n/round)*round;add(`Round ${n} to the nearest ${round}.`,[ans,ans+round,Math.max(0,ans-round),n],ans,'ปัดเศษตามหลัก');
    }else if(slug.includes('decimal')){
      if(i%2===0){let x=dec(rand(1,99)/10),y=dec(rand(1,99)/10),ans=dec(+x+ +y);add(`${x} + ${y} = ?`,[ans,dec(+ans+.1),dec(+ans-.1),dec(+ans+1)],ans,'บวกทศนิยม')}
      else{let arr=[dec(rand(1,99)/10),dec(rand(1,99)/10),dec(rand(1,99)/10),dec(rand(1,99)/10)],ans=dec(Math.max(...arr.map(Number)));add('Which decimal is the greatest?',arr,ans,'เลือกทศนิยมที่มากที่สุด')}
    }else if(slug.includes('angles')){
      let ang=rand(20,150),ans=180-ang;add(`Angles on a straight line: ${ang}° + x = 180°. What is x?`,[ans,ans+10,Math.max(0,ans-10),180],ans,'มุมบนเส้นตรงรวม 180°');
    }else if(slug.includes('data')||slug.includes('statistics')){
      let p=rand(2,20),q=rand(2,20),r=rand(2,20),ans=p+q+r;add(`A frequency table has ${p}, ${q}, and ${r}. What is the total frequency?`,[ans,ans+1,ans-1,p+q],ans,'หาความถี่รวม');
    }else if(slug.includes('fraction')){
      let den=[2,3,4,5,6,8,10][rand(0,6)],num=rand(1,den-1),whole=den*rand(2,12),ans=(whole/den)*num;add(`What is ${num}/${den} of ${whole}?`,[ans,ans+1,Math.max(0,ans-1),whole],ans,'หาเศษส่วนของจำนวน');
    }else if(slug.includes('shapes')){
      let sides=rand(3,10);add(`A polygon has ${sides} sides. How many vertices does it have?`,[sides,sides+1,sides-1,sides*2],sides,'จำนวนจุดยอดของรูปหลายเหลี่ยม');
    }else if(slug.includes('percentages')){
      let pc=[10,20,25,50][rand(0,3)],n=[40,60,80,100,200][rand(0,4)],ans=n*pc/100;add(`${pc}% of ${n} = ?`,[ans,ans+5,Math.max(0,ans-5),n],ans,'หาร้อยละของจำนวน');
    }else if(slug.includes('graphs')){
      let x=rand(1,8),m=rand(1,5),c=rand(0,6),ans=m*x+c;add(`For y = ${m}x + ${c}, find y when x = ${x}.`,[ans,ans+1,ans-1,m+c],ans,'แทนค่า x ในสมการเส้นตรง');
    }else if(slug.includes('ratio')){
      let a=rand(2,9),k=rand(2,8);add(`Simplify the ratio ${a*k}:${a*2*k}.`,['1:2','2:1',`${a}:${a*2}`,`${k}:2`],'1:2','ย่ออัตราส่วน');
    }else if(slug.includes('probability')){
      let red=rand(1,6),blue=rand(1,6),total=red+blue,ans=`${red}/${total}`;add(`A bag has ${red} red balls and ${blue} blue balls. What is P(red)?`,[ans,`${blue}/${total}`,`${total}/${red}`,`${red}/${blue}`],ans,'ความน่าจะเป็น');
    }else if(slug.includes('transformations')){
      let x=rand(-5,5),y=rand(-5,5),dx=rand(1,5),dy=rand(1,5),ans=`(${x+dx}, ${y+dy})`;add(`Translate (${x}, ${y}) by vector (${dx}, ${dy}).`,[ans,`(${x-dx}, ${y-dy})`,`(${x+dy}, ${y+dx})`,`(${dx}, ${dy})`],ans,'การเลื่อนจุด');
    }else if(slug.includes('measurement')){
      if(i%3===0){let l=rand(3,20),w=rand(3,20),ans=l*w;add(`A rectangle is ${l} cm by ${w} cm. What is its area?`,[ans,2*(l+w),ans+1,Math.abs(l-w)],ans,'พื้นที่ = ยาว × กว้าง')}
      else if(i%3===1){let l=rand(2,10),w=rand(2,10),h=rand(2,10),ans=l*w*h;add(`A cuboid is ${l} cm × ${w} cm × ${h} cm. What is its volume?`,[ans,l*w+h,l+w+h,2*(l*w+l*h+w*h)],ans,'ปริมาตร = ยาว × กว้าง × สูง')}
      else{let km=rand(2,20),ans=km*1000;add(`${km} km = ? metres`,[ans,km*100,km*10,km+1000],ans,'1 km = 1000 m')}
    }else{let x=rand(1,20),y=rand(1,20),ans=x+y;add(`${x} + ${y} = ?`,[ans,ans+1,ans-1,ans+2],ans,'คำนวณพื้นฐาน')}
  }
  return out;
}
async function getBank(slug,topic){
  let rows=null;
  try{rows=await fetchQuestions(slug)}catch(e){console.warn('fetchQuestions failed',e);rows=null}
  if(!rows||!rows.length)rows=localQs().filter(x=>x.world_slug===slug);
  if(rows&&rows.length){
    const mapped=rows.map(x=>({text:x.question_en,options:opts([x.choice_a,x.choice_b,x.choice_c,x.choice_d],x.answer),answer:String(x.answer),thai:x.question_th,source:'supabase/local'}));
    const bad = !worldIsInteger(slug) && mapped.slice(0,Math.min(8,mapped.length)).every(looksLikeIntegerOnly);
    if(!bad){metrics.source='supabase/local';return mapped}
    metrics.source='topic-engine-forced';
  }
  metrics.source='topic-engine';
  return generated(slug,topic);
}
let p=JSON.parse(localStorage.getItem(CONFIG.storageKey)||'{}'),state={player:p.player||'Player',classCode:p.classCode||'YEAR8A',role:p.role||'student',coins:p.coins||0,score:0,correct:0,q:0,qs:[],phase:'start',idx:0,bossHp:100,playerHp:100};
let currentWorld=WORLD_LIST[0],scenes=[];
function save(){localStorage.setItem(CONFIG.storageKey,JSON.stringify(state))}
function badge(t,c='bg-cyan-100 text-cyan-800'){return `<span class="pill ${c}">${t}</span>`}
function perf(){return state.role==='teacher'?`<div class="perf"><b>v6.0.6</b><br>Mode: ${metrics.mode}<br>Supabase calls: ${metrics.calls}<br>Cache hits: ${metrics.hits}<br>Cache misses: ${metrics.misses}<br>Last load: ${metrics.last}ms<br><button id="clearCache" class="mt-2 px-2 py-1 rounded bg-white text-slate-900 font-bold">Clear Cache</button></div>`:''}
function shell(c){app.innerHTML=`<button id="soundBtn" class="sound-toggle">${audioOn?'🔊 Sound ON':'🔇 Sound OFF'}</button>${perf()}<header class="text-center text-white mb-6"><div class="inline-flex px-4 py-2 rounded-full bg-white/10 mb-3 font-bold">⚡ SMA v6.0.6 Hard Topic</div><h1 class="text-5xl md:text-7xl font-black">Super Maths Adventure</h1><p class="text-cyan-100">Lazy Loading • Cache Killer • Offline First • PWA • CMS</p></header>${c}`;let cc=document.getElementById('clearCache');if(cc)cc.onclick=()=>{Object.keys(localStorage).filter(k=>k.startsWith('cache_')).forEach(k=>localStorage.removeItem(k));location.reload()};let sbt=document.getElementById('soundBtn');sbt.onclick=()=>{audioOn=!audioOn;localStorage.setItem('sma_audio',audioOn?'on':'off');sbt.textContent=audioOn?'🔊 Sound ON':'🔇 Sound OFF';if(audioOn){ac().resume();playBgm(currentWorld.world)}}}
function pop(txt){let e=document.createElement('div');e.className='fx-pop';e.textContent=txt;e.style.left=innerWidth/2+'px';e.style.top=innerHeight/2+'px';document.body.appendChild(e);setTimeout(()=>e.remove(),900)}
function toast(txt){let e=document.createElement('div');e.className='toast';e.textContent=txt;document.body.appendChild(e);setTimeout(()=>e.remove(),2800)}
function renderStart(){metrics.mode='home';shell(`<main class="glass rounded-[2rem] p-6 md:p-10 max-w-6xl mx-auto"><div class="grid md:grid-cols-2 gap-8 items-center"><section><div class="text-8xl mb-3">⚡🧑‍🏫</div><h2 class="text-4xl font-black">Super Maths Adventure v6.0.6.0.2</h2><div class="mt-3">${badge(sb?'Supabase Ready':'Local Mode','bg-green-100 text-green-800')} ${badge('PWA Ready','bg-purple-100 text-purple-800')}</div><p class="text-slate-600 mt-4 text-lg">เร็วขึ้นด้วย Lazy Loading + Cache + Offline-first</p><div class="grid md:grid-cols-3 gap-3 mt-5"><input id="playerName" class="px-4 py-3 rounded-2xl border font-bold" value="${state.player}"><input id="classCode" class="px-4 py-3 rounded-2xl border font-bold" value="${state.classCode}"><select id="role" class="px-4 py-3 rounded-2xl border font-bold"><option value="student" ${state.role==='student'?'selected':''}>Student</option><option value="teacher" ${state.role==='teacher'?'selected':''}>Teacher</option></select></div><div class="grid md:grid-cols-4 gap-3 mt-6"><button id="enter" class="btn px-7 py-4 rounded-2xl bg-cyan-500 text-white font-black">Enter</button><button id="cms" class="btn px-7 py-4 rounded-2xl bg-amber-400 font-black">Teacher CMS</button><button id="dash" class="btn px-7 py-4 rounded-2xl bg-slate-900 text-white font-black">Dashboard</button></div></section><section class="dark rounded-[2rem] p-6"><h3 class="text-2xl font-black">Architecture v6</h3><div class="grid gap-3 mt-4"><div class="p-4 rounded-xl bg-white/10">Lazy Load: โหลดเฉพาะ World ที่เล่น</div><div class="p-4 rounded-xl bg-white/10">Cache: ลด Supabase calls</div><div class="p-4 rounded-xl bg-white/10">PWA: ใช้ Service Worker</div><div class="p-4 rounded-xl bg-white/10">Local Questions: ${localQs().length}</div></div></section></div></main>`);document.getElementById('enter').onclick=()=>{state.player=document.getElementById('playerName').value;state.classCode=document.getElementById('classCode').value;state.role=document.getElementById('role').value;save();renderWorldMap()};document.getElementById('cms').onclick=renderCMS;document.getElementById('dash').onclick=renderDash}
function renderWorldMap(){metrics.mode='world-map';playBgm(currentWorld.world);shell(`<main class="glass rounded-[2rem] p-6"><div class="flex justify-between flex-wrap gap-3 mb-6"><div><h2 class="text-3xl font-black">🌍 World Map</h2><p>${state.player} • ${state.classCode}</p></div><div>${badge('🪙 '+state.coins,'bg-yellow-100 text-yellow-800')}</div></div><div class="grid md:grid-cols-4 gap-5">${WORLD_LIST.map((w,i)=>`<div class="world-card card bg-gradient-to-br ${w.color} text-white"><div class="world-badge">${badge(w.strand,'bg-white/80 text-slate-900')}</div><div class="text-6xl">${w.icon}</div><div class="mt-3 text-sm font-black opacity-80">WORLD ${w.world}</div><h3 class="text-2xl font-black">${w.name}</h3><p>${w.topic}</p><div class="mt-3 path-line"></div><button class="worldBtn btn mt-5 w-full py-3 rounded-2xl bg-white text-slate-900 font-black" data-i="${i}">Enter World</button></div>`).join('')}</div><button id="home" class="btn mt-6 px-5 py-3 rounded-2xl bg-slate-200 font-black">Home</button></main>`);document.querySelectorAll('.worldBtn').forEach(b=>b.onclick=()=>loadWorld(WORLD_LIST[+b.dataset.i]));document.getElementById('home').onclick=renderStart}
function buildScenes(w){return Array.from({length:8},(_,i)=>({id:i===7?'boss':'s'+(i+1),name:['Core Skill','Practice Zone','Mini Challenge','Mixed Problems','Review Gate','Speed Mission','Project Quest','Boss Battle'][i],icon:w.icon,enemy:w.enemy,topic:w.topic}))}
function loadWorld(w){metrics.mode='lazy-load-world-'+w.world;currentWorld=w;playBgm(w.world);scenes=buildScenes(w);renderWorldScenes()}
function renderWorldScenes(){shell(`<main class="glass rounded-[2rem] p-6"><h2 class="text-3xl font-black">${currentWorld.icon} ${currentWorld.name}</h2><p>${currentWorld.topic}</p><div class="mission rounded-3xl p-5 my-5"><b>Lazy Loading:</b> ระบบจะโหลด question_bank ของ World นี้เท่านั้น</div><div class="grid md:grid-cols-4 gap-4">${scenes.map((s,i)=>`<div class="rounded-[2rem] p-5 bg-white shadow"><div class="text-4xl">${s.icon}</div><h3 class="text-xl font-black min-h-[56px]">${s.name}</h3><button class="sceneBtn btn w-full py-3 mt-3 rounded-2xl bg-slate-900 text-white font-black" data-i="${i}">Start</button></div>`).join('')}</div><button id="back" class="btn mt-6 px-5 py-3 rounded-2xl bg-slate-200 font-black">World Map</button></main>`);document.querySelectorAll('.sceneBtn').forEach(b=>b.onclick=()=>openScene(+b.dataset.i));document.getElementById('back').onclick=renderWorldMap}
function openScene(i){
  state.idx=i;
  state.score=0;
  state.correct=0;
  state.q=0;
  state.isAnswering=false;
  state.completed=false;
  state.bossHp=100;
  state.playerHp=100;
  renderStory();
}
function renderStory(){
  let s=scenes[state.idx];
  shell(`<main class="glass rounded-[2rem] p-8 max-w-5xl mx-auto">
    <h2 class="text-5xl font-black">${s.name}</h2>
    <div class="grid md:grid-cols-4 gap-2 mt-5">
      ${['Learn','Example','Easy','Mini','Medium','Boss','Review'].map(x=>`<div class="p-3 rounded-xl bg-cyan-50 font-black">${x}</div>`).join('')}
    </div>
    <button id="go" class="btn mt-6 px-7 py-4 rounded-2xl bg-cyan-500 text-white font-black">Start</button>
  </main>`);
  const go=document.getElementById('go');
  if(go)go.onclick=()=>startMission('easy');
}
async function startMission(mode){
  console.log('SMA v6.0.6 startMission',mode,currentWorld.slug);
  metrics.mode='questions-'+currentWorld.world;
  state.phase=mode;
  state.q=0;
  state.isAnswering=false;
  state.completed=false;
  shell(`<main class="glass rounded-[2rem] p-8 max-w-3xl mx-auto text-center">
    <div class="text-7xl mb-4">⏳</div>
    <h2 class="text-4xl font-black">Loading Questions...</h2>
    <p class="mt-3 text-slate-600">กำลังโหลดโจทย์ของ ${currentWorld.topic}</p>
    <div class="mt-5 p-4 rounded-2xl bg-cyan-50 font-bold">ถ้า Supabase ช้า ระบบจะใช้ fallback questions อัตโนมัติ</div>
  </main>`);
  let n=mode==='easy'?3:mode==='mini'?4:mode==='medium'?6:10;
  try{
    let bank=await withTimeout(getBank(currentWorld.slug,currentWorld.topic),1500);
    if(!bank||!bank.length){
      metrics.mode='fallback-generator';
      bank=generated(currentWorld.slug,currentWorld.topic);
      toast('Using fast fallback questions');
    }
    state.qs=sample(bank,n);
  }catch(e){
    console.warn(e);
    metrics.mode='fallback-error';
    state.qs=sample(generated(currentWorld.slug,currentWorld.topic),n);
    toast('Using offline fallback questions');
  }
  if(!state.qs||!state.qs.length)state.qs=sample(generated(currentWorld.slug,currentWorld.topic),n);
  renderQuestion();
}
function renderQuestion(msg=''){let q=state.qs&&state.qs[state.q];if(!q)return complete();let s=scenes[state.idx];shell(`<main class="glass rounded-[2rem] p-6 max-w-5xl mx-auto"><div class="flex justify-between flex-wrap"><h2 class="text-3xl font-black">${state.phase.toUpperCase()} • ${currentWorld.topic}</h2><div>${badge('Q '+(state.q+1)+'/'+state.qs.length)} ${badge('Score '+state.score,'bg-yellow-100 text-yellow-800')}</div></div><section class="rounded-[2rem] bg-white border p-5 shadow mt-5"><h3 class="text-2xl md:text-3xl font-black">${q.text}</h3><div class="grid gap-3 mt-5">${q.options.map(op=>`<button class="ans target btn p-4 rounded-2xl text-xl md:text-2xl font-black" data-a="${String(op).replaceAll('"','&quot;')}"><span class="enemy">${s.enemy}</span>${op}</button>`).join('')}</div></section><div id="fb" class="mt-4">${msg}</div><button id="hint" class="btn mt-4 px-5 py-3 rounded-2xl bg-amber-100 text-amber-800 font-black">TH Hint</button></main>`);document.querySelectorAll('.ans').forEach(b=>b.onclick=()=>answer(b.dataset.a));document.getElementById('hint').onclick=()=>document.getElementById('fb').innerHTML=`<div class="p-4 rounded-2xl bg-amber-50 font-bold">🇹🇭 ${q.thai||'อ่านโจทย์อย่างระมัดระวัง'}<br><small>ไม่มีเฉลยคำตอบ</small></div>`}
function answer(a){
  if(state.isAnswering||state.completed)return;
  state.isAnswering=true;
  const q=state.qs&&state.qs[state.q];
  if(!q){state.isAnswering=false;return complete();}
  sfx('laser');
  same(a,q.answer)?correct():wrong();
}
function correct(){sfx('correct');state.correct++;state.score+=10;pop('✅ +10');next(`<div class="p-4 rounded-2xl bg-green-100 font-black">✅ Correct!</div>`,true)}
function wrong(){sfx('wrong');next(`<div class="p-4 rounded-2xl bg-rose-100 font-black">❌ Review later.</div>`,false)}
function next(m,ok){
  const fb=document.getElementById('fb');
  if(fb)fb.innerHTML=m;
  setTimeout(()=>{
    state.q++;
    state.isAnswering=false;
    if(!state.qs || state.q>=state.qs.length)return nextLoop();
    renderQuestion();
  },ok?350:650);
}
function nextLoop(){
  state.isAnswering=false;
  if(state.phase==='easy')return loopClear('Mini Game',()=>startMission('mini'));
  if(state.phase==='mini')return loopClear('Medium Mission',()=>startMission('medium'));
  if(state.phase==='medium')return loopClear('Boss Battle',()=>startMission('boss'));
  return complete();
}
function loopClear(label,next){shell(`<main class="glass rounded-[2rem] p-8 max-w-xl mx-auto text-center"><div class="text-7xl">🏅</div><h2 class="text-4xl font-black">Loop Clear!</h2><p>Next: ${label}</p><button id="next" class="btn mt-7 px-8 py-4 rounded-2xl bg-cyan-500 text-white font-black">Continue</button></main>`);document.getElementById('next').onclick=next}
async function complete(){if(state.completed)return;state.completed=true;sfx('victory');let star=calcStars(state.correct,state.qs.length),coins=star*25+10;state.coins+=coins;save();toast('🏆 Level Complete! Coins +'+coins);if(sb){metrics.calls++;await saveScore({gameSlug:currentWorld.slug,playerName:state.player,classCode:state.classCode,score:state.score,correct:state.correct,total:state.qs.length,stars:star,xp:state.score,coins})}shell(`<main class="glass rounded-[2rem] p-8 max-w-2xl mx-auto text-center"><div class="text-8xl">🏆</div><h2 class="text-5xl font-black">Level Complete!</h2><p>Earned 🪙 ${coins}</p><button id="back" class="btn mt-6 py-4 px-8 rounded-2xl bg-cyan-500 text-white font-black">World Scenes</button></main>`);document.getElementById('back').onclick=renderWorldScenes}
function qa(rows){let issues=[];rows.forEach((q,i)=>{let cs=[q.choice_a,q.choice_b,q.choice_c,q.choice_d];if(!q.question_en)issues.push('Q'+(i+1)+' missing question');if(!cs.includes(q.answer))issues.push('Q'+(i+1)+' answer not in choices');if(new Set(cs.map(norm)).size<4)issues.push('Q'+(i+1)+' duplicate choices')});return issues}
function renderCMS(){metrics.mode='cms-lazy';let rows=localQs();shell(`<main class="glass rounded-[2rem] p-6 max-w-7xl mx-auto"><h2 class="text-4xl font-black">📝 Teacher CMS v6</h2><p>Local Questions: ${rows.length}. Online questions load only when playing a World.</p><div class="grid md:grid-cols-2 gap-6 mt-6"><section class="card"><h3 class="text-2xl font-black mb-3">Add Question</h3><div class="grid gap-3"><select id="qWorld" class="px-4 py-3 rounded-2xl border">${WORLD_LIST.map(w=>`<option value="${w.slug}">${w.world}. ${w.topic}</option>`).join('')}</select><input id="qTopic" class="px-4 py-3 rounded-2xl border" placeholder="Topic"><textarea id="qEn" class="px-4 py-3 rounded-2xl border" placeholder="Question English"></textarea><textarea id="qTh" class="px-4 py-3 rounded-2xl border" placeholder="Thai hint"></textarea><div class="grid grid-cols-2 gap-2"><input id="cA" class="px-4 py-3 rounded-2xl border" placeholder="Choice A"><input id="cB" class="px-4 py-3 rounded-2xl border" placeholder="Choice B"><input id="cC" class="px-4 py-3 rounded-2xl border" placeholder="Choice C"><input id="cD" class="px-4 py-3 rounded-2xl border" placeholder="Choice D"></div><input id="ans" class="px-4 py-3 rounded-2xl border font-bold" placeholder="Answer"><button id="saveLocal" class="btn py-3 rounded-2xl bg-slate-900 text-white font-black">Save Local</button><button id="saveOnline" class="btn py-3 rounded-2xl bg-green-500 font-black">Save Online</button></div></section><section class="card"><h3 class="text-2xl font-black mb-3">Question List</h3><button id="runQA" class="btn px-4 py-2 rounded-2xl bg-amber-100 text-amber-800 font-black mb-3">Run QA</button><table class="cms-table"><tbody>${rows.slice(0,100).map(r=>`<tr><td>${r.world_slug}</td><td>${r.question_en}</td><td><b>${r.answer}</b></td></tr>`).join('')}</tbody></table></section></div><button id="home" class="btn mt-6 px-5 py-3 rounded-2xl bg-cyan-500 text-white">Home</button></main>`);document.getElementById('home').onclick=renderStart;document.getElementById('runQA').onclick=()=>{let x=qa(localQs());alert(x.length?x.join('\\n'):'All local questions passed QA')};document.getElementById('saveLocal').onclick=()=>saveQ(false);document.getElementById('saveOnline').onclick=()=>saveQ(true)}
async function saveQ(online){let q={world_slug:qWorld.value,topic:qTopic.value,question_en:qEn.value,question_th:qTh.value,choice_a:cA.value,choice_b:cB.value,choice_c:cC.value,choice_d:cD.value,answer:ans.value,published:true,difficulty:1};let issues=qa([q]);if(issues.length)return alert(issues.join('\\n'));if(online&&sb){metrics.calls++;let {error}=await sb.from('question_bank').insert(q);if(error){addLocalQ(q);toast('Online failed, saved Local')}else{localStorage.removeItem('cache_questions_'+q.world_slug);toast('Saved Online')}}else{addLocalQ(q);toast('Saved Local')}renderCMS()}
async function renderDash(){shell(`<main class="glass rounded-[2rem] p-6 max-w-5xl mx-auto"><h2 class="text-4xl font-black">Dashboard</h2><div class="grid md:grid-cols-4 gap-4 mt-6"><div class="card">Coins<br><b class="text-4xl">${state.coins}</b></div><div class="card">Cache hits<br><b class="text-4xl">${metrics.hits}</b></div><div class="card">Supabase calls<br><b class="text-4xl">${metrics.calls}</b></div><div class="card">Last load<br><b class="text-4xl">${metrics.last}ms</b></div></div><button id="home" class="btn mt-6 px-5 py-3 rounded-2xl bg-cyan-500 text-white">Home</button></main>`);document.getElementById('home').onclick=renderStart}
renderStart();