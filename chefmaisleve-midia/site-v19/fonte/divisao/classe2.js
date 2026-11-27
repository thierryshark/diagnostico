const fs=require('fs'),postcss=require('postcss');
const pages=JSON.parse(fs.readFileSync('cob.json'));const map=JSON.parse(fs.readFileSync('map.json'));
const grp=k=>{const [p,t]=k.split('|');if(p==='/ofertas/')return'of3';if(/encontre-seu-cha|presentes-de-natal/.test(p))return'px';if(t==='template-home')return'home';if(t==='template-product')return'prod';if(t==='template-category'||t==='template-search')return'cat';return'out'};
const N=3892;const css=fs.readFileSync('/tmp/live.css','utf8');const root=postcss.parse(css);const R=[];root.walkRules(r=>{if(r.parent.type==='atrule'&&/keyframes/.test(r.parent.name))return;R.push(r)});
const use={};for(const k in pages){const g=grp(k);use[g]=use[g]||new Array(N).fill(0);for(let b=0;b<3889;b++)if(pages[k][b]==='1')use[g][map[b]]=1}
const names=Object.keys(use);
// longhand-ish property families
const fam=p=>p.replace(/^-(webkit|moz|ms)-/,'').replace(/-(top|right|bottom|left|inline|block)(-|$).*/,'').replace(/^(border|margin|padding|inset|font|background|grid|flex|gap|overflow|transition|animation|outline|text-decoration|list-style|place|mask)(-.*)?$/,'$1');
const props=R.map(r=>{const s=new Set();r.walkDecls(d=>s.add(fam(d.prop)));return s});
const dest=new Array(N).fill('base');
for(let i=0;i<N;i++){const us=names.filter(g=>use[g][i]);if(us.length===1)dest[i]=us[0]}
// conflict check: moved rule i conflicts with any later base rule j used in same group sharing a property family
let changed=true,it=0;while(changed&&it<10){changed=false;it++;
for(let i=0;i<N;i++){const g=dest[i];if(g==='base')continue;for(let j=i+1;j<N;j++){if(dest[j]==='base'&&use[g][j]){let sh=false;for(const p of props[i])if(props[j].has(p)||p==='all'){sh=true;break}if(sh){dest[i]='base';changed=true;break}}}}}
const sz={};R.forEach((r,i)=>{sz[dest[i]]=(sz[dest[i]]||0)+r.toString().length});
console.log(Object.entries(sz).map(([k,v])=>k+' '+Math.round(v/1024)+'KB').join(' | '));
fs.writeFileSync('dest.json',JSON.stringify(dest));
