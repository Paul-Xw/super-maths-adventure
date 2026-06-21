export function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min}
export function shuffle(input){const a=[...input];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
export function sample(input,n){return shuffle(input).slice(0,n)}
export function escapeHtml(s){return String(s).replace(/\\/g,"\\\\").replace(/'/g,"&#39;")}
export function unescapeHtml(s){return String(s).replace(/&#39;/g,"'")}
export function numberValue(v){const s=String(v).trim().replace(/,/g,"");if(/^[-+]?\d+(\.\d+)?$/.test(s))return Number(s);return Number.NaN}
export function normalizeAnswer(v){const num=numberValue(v);if(!Number.isNaN(num))return "num:"+String(Number(num.toFixed(10)));return "txt:"+String(v).trim().toLowerCase().replace(/\s+/g," ")}
export function sameAnswer(a,b){return normalizeAnswer(a)===normalizeAnswer(b)}
export function uniqueOptions(options,answer){const out=[],seen=new Set();function add(v){const key=normalizeAnswer(v);if(!seen.has(key)){seen.add(key);out.push(String(v))}}if(Array.isArray(answer))answer.forEach(add);else add(answer);(options||[]).forEach(add);const base=numberValue(Array.isArray(answer)?answer[0]:answer);const fb=["categorical data","numerical data","discrete data","continuous data","biased","fair","sample","population","closed question","open question","equal"];let step=1;while(out.length<4&&step<80){add(!Number.isNaN(base)?String(base+(step%2?step:-step)):fb[step%fb.length]);step++}return shuffle(out).slice(0,4)}
