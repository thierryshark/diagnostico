import fs from 'fs'; import {analisa} from './analisa.mjs';
const out={};
for(const f of fs.readdirSync('src').filter(x=>x.endsWith('.js'))){out[f]=analisa(fs.readFileSync('src/'+f,'utf8')).map(x=>({id:x.id,estatico:x.estatico,at:x.at,expr:x.expr,len:x.css?x.css.length:null}))}
fs.writeFileSync('sites.json',JSON.stringify(out));
