const postcss=require("postcss");const c=require("fs").readFileSync("/tmp/live.css","utf8");const root=postcss.parse(c);const S=[],SEL=[];root.walkRules(r=>{if(r.parent.type==="atrule"&&/keyframes/.test(r.parent.name))return;S.push(r.selector.replace(/[^a-z0-9]/gi,"").slice(0,10));SEL.push(r.selector)});
const B=process.argv[2].split(" ");const BS=25;
function H(s){let h=5381;for(let i=0;i<s.length;i++)h=(h*33+s.charCodeAt(i))%1679616;return h.toString(36)}
let cur=S.map((s,i)=>i);
const hb=(t,b)=>H(t.slice(b*BS,b*BS+BS).map(i=>S[i]).join("|"));
const okn=(t,b)=>hb(t,b)===B[b]&&(b+1>=B.length||hb(t,b+1)===B[b+1]||hb(t.filter((x,i)=>i!==(b+1)*BS),b+1)===B[b+1]);
for(let b=0;b<B.length;b++){if(hb(cur,b)===B[b])continue;let fixed=false;
 for(let j=b*BS;j<b*BS+BS&&!fixed;j++){const t=cur.slice();const r=t.splice(j,1);if(hb(t,b)===B[b]){cur=t;fixed=true;console.log("drop",r[0],SEL[r[0]].slice(0,80))}}
 if(!fixed)for(let j=b*BS;j<b*BS+BS&&!fixed;j++)for(let k=j;k<b*BS+BS&&!fixed;k++){const t=cur.slice();const r1=t.splice(j,1);const r2=t.splice(k,1);if(hb(t,b)===B[b]){cur=t;fixed=true;console.log("drop2",r1[0],SEL[r1[0]].slice(0,60),"|",r2[0],SEL[r2[0]].slice(0,60))}}
 if(!fixed){console.log("falhou",b);process.exit(1)}}
console.log(cur.length);require("fs").writeFileSync("split/map.json",JSON.stringify(cur));
