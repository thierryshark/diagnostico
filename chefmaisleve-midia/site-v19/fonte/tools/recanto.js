const fs=require('fs');
const lista=JSON.parse(fs.readFileSync('cantos-origem.json','utf8'));const mapa=new Map(lista.map(x=>[x.s+'¦'+x.v+'¦'+x.n,x.t]));
const split=s=>{const o=[];let d=0,c='';for(const ch of s){if(ch==='('||ch==='[')d++;if(ch===')'||ch===']')d--;if(ch===','&&!d){o.push(c);c=''}else c+=ch}o.push(c);return o};
function enumera(c){const RE=/border(?:-(?:top|bottom)-(?:left|right))?-radius:([^;}]+)/g;let m;const ord=new Map(),out=[];while((m=RE.exec(c))){const ob=c.lastIndexOf('{',m.index);const st=Math.max(c.lastIndexOf('}',ob),c.lastIndexOf('{',ob-1))+1;const sel=c.slice(st,ob);const val=m[1];const ch=sel+'¦'+val;const n=ord.get(ch)||0;ord.set(ch,n+1);const ce=c.indexOf('}',m.index);const body=c.slice(ob+1,ce)+'#'+(m.index-ob);out.push({sel,val,n,body,sels:new Set(split(sel))})}return out}
const A=enumera(fs.readFileSync('/tmp/pre_old.css','utf8')),B=enumera(fs.readFileSync('/tmp/pre_new.css','utf8'));
A.forEach(a=>a.t=mapa.get(a.sel+'¦'+a.val+'¦'+a.n));
// align in order: walk both lists; B is A minus removed rules / selectors, same order
let j=0,ok=0,skip=0;const nova=[];
for(const b of B){let k=j;while(k<A.length&&!(A[k].body===b.body&&[...b.sels].every(s=>A[k].sels.has(s))))k++;if(k>=A.length){skip++;continue}j=k+1;if(A[k].t!=null){nova.push({s:b.sel,v:b.val,n:b.n,t:A[k].t});ok++}}
console.log('aplicadas antes',A.filter(a=>a.t!=null).length,'novas',ok,'sem par',skip);
fs.writeFileSync('cantos-origem.json',JSON.stringify(nova));
