// Chef Mais Leve, site v19: monta site.css (visual) e os arquivos de comportamento a partir das partes em src/.
// Diferenca para o build.mjs: o codigo sai como codigo de verdade (nada de texto avaliado), cada modulo isolado em try/catch,
// na ordem original de execucao, com nomes curtos (minificado) e, opcionalmente, com contadores de cobertura (--cov).
import fs from 'fs';
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';
import * as esbuild from 'esbuild';
import { minify as terser } from 'terser';

const COV = process.argv.includes('--cov');
const PROF = process.argv.includes('--prof');
const OUT = COV ? 'dist-cov' : PROF ? 'dist-prof' : 'dist';
fs.mkdirSync(OUT, { recursive: true });
const dec = JSON.parse(fs.readFileSync('decisao.json', 'utf8'));
const sites = JSON.parse(fs.readFileSync('sites.json', 'utf8'));
const est = JSON.parse(fs.readFileSync('est.json', 'utf8'));
const cfg = fs.existsSync('modulos.json') ? JSON.parse(fs.readFileSync('modulos.json', 'utf8')) : { remover: [], grupo: {} };
const T = est.texts, P = est.pages;
const ok = new Set(dec.ok);

// ordem original: partes imediatas, codigo proprio, scripts do rodape e, por ultimo, as que esperavam a pagina montar
const ORDEM = [['cml-black', ''], ['cml-extra', ''], ['cml-destaque', ''], ['cml-paginas', ''], ['cpv-own', ''], ['ext-seu-espaco', ''], ['ext-categoria', ''], ['ext-extras', ''], ['ext-rodape', ''], ['cml-icons', ''], ['cml-home', 'home'], ['cml-ui', '']];

const LIMPA = [
  ['cpv-own.js', '/* Chef Mais Leve: carrega o tema Black (funcao cml-black)', '.appendChild(s)})();'],
  ['cpv-own.js', '/* Chef Mais Leve: icones animados e WhatsApp no molde dos botoes flutuantes (funcao cml-icons) */', '.appendChild(s)})();'],
  ['cpv-own.js', '/* Chef Mais Leve: carrega os ajustes de visual (todas as paginas) e o buscador', 'document.addEventListener("DOMContentLoaded",go)})();'],
];
// trocas pontuais no codigo: [arquivo, texto antigo, texto novo]; cada uma precisa existir exatamente uma vez
const TROCAS = [
  // fontes: agora vem do site.css (hospedadas junto), sem chamadas ao Google Fonts pelo codigo
  ['cml-extra.js', 'if(!document.getElementById("cml-blog-fonts")){var l=document.createElement("link");l.id="cml-blog-fonts";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Poppins:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap";document.head.appendChild(l)}', ''],
  ['cml-extra.js', 'if(!D.getElementById("c1-fonts")){var l=D.createElement("link");l.id="c1-fonts";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,300&display=swap";(D.head||D.documentElement).appendChild(l)}', ''],
  ['cml-paginas.js', 'function font(){if(D.getElementById("cml-caveat"))return;var l=D.createElement("link");l.id="cml-caveat";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&display=swap";(D.head||H).appendChild(l)}', 'function font(){}'],
  // reescritor de :has: so reage a mudanca de verdade (ignora texto de contador e atributo regravado com o mesmo valor)
  ['cml-extra.js', 'var mo=new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var m=ms[i],t=m.target;', 'var mo=new MutationObserver(function(ms){var go=false;for(var i=0;i<ms.length;i++){var m=ms[i],t=m.target;'],
  ['cml-extra.js', 'if(n==="STYLE"||n==="LINK")needScan=true}}later()});', 'if(n==="STYLE"||n==="LINK")needScan=true}if(m.type==="childList"||(m.type==="attributes"&&m.oldValue!==t.getAttribute(m.attributeName)))go=true}if(go||needScan)later()});'],
  ['cml-extra.js', 'mo.observe(H,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:[', 'mo.observe(H,{childList:true,subtree:true,characterData:true,attributes:true,attributeOldValue:true,attributeFilter:['],
  // gravacoes repetidas com o mesmo valor (cada uma acordava os observadores da pagina)
  ['cml-destaque.js', /(\w+)\.classList\.add\("cml-wn"\)/g, (m, v) => '(' + v + '.classList.contains("cml-wn")||' + v + '.classList.add("cml-wn"))'],
  ['cml-paginas.js', 'i.title="Colocar na sacola"', 'if(i.title!=="Colocar na sacola")i.title="Colocar na sacola"'],
  // contadores de 1 segundo: trocam so o texto que mudou, sem recriar os elementos
  ['cml-paginas.js', 'q("b.d").textContent=z(t.d);q("b.h").textContent=z(t.h);q("b.m").textContent=z(t.m);q("b.s").textContent=z(t.s)', '__cmlT(q("b.d"),z(t.d));__cmlT(q("b.h"),z(t.h));__cmlT(q("b.m"),z(t.m));__cmlT(q("b.s"),z(t.s))', 3],
  ['cml-paginas.js', 'var h=\'<span class="l">\'+(t.pre?"Começa em":"Termina em")+\'</span><b>\'+(t.d?t.d+"d ":"")+z(t.h)+"h "+z(t.m)+"m "+z(t.s)+"s</b>";if(el.innerHTML!==h)el.innerHTML=h}', 'var lab=(t.pre?"Começa em":"Termina em"),val=(t.d?t.d+"d ":"")+z(t.h)+"h "+z(t.m)+"m "+z(t.s)+"s",sp=el.firstChild,bb=el.lastChild;if(sp&&bb&&sp!==bb&&sp.className==="l"&&bb.tagName==="B"){__cmlT(sp,lab);__cmlT(bb,val)}else el.innerHTML=\'<span class="l">\'+lab+\'</span><b>\'+val+\'</b>\'}'],
  ['extx-00.js', 'i.querySelector("b").textContent=a?a.textContent.trim():"",i.querySelector(".t span").textContent=c?c.textContent.trim():""', '__cmlT(i.querySelector("b"),a?a.textContent.trim():""),__cmlT(i.querySelector(".t span"),c?c.textContent.trim():"")'],
  ['extx-00.js', 'i.querySelector(".go").textContent=m?"Avise-me":"Comprar"', '__cmlT(i.querySelector(".go"),m?"Avise-me":"Comprar")'],
  ['extx-02.js', 't.querySelector("em").textContent=i?[n?"Caixa "+n:"",e?"Cartão":""].filter(Boolean).join(" + "):"",t.querySelector("u").textContent=i?"✓":"Adicionar"', '__cmlT(t.querySelector("em"),i?[n?"Caixa "+n:"",e?"Cartão":""].filter(Boolean).join(" + "):""),__cmlT(t.querySelector("u"),i?"✓":"Adicionar")'],
  // barra de compra do produto: a leitura de posicao na rolagem passa a acontecer uma vez por quadro
  ['extx-00.js', 'window.addEventListener("scroll",function(){var x=document.querySelector("#product_form .js-addtocart:not(.js-addtocart-placeholder)")||document.querySelector("#product_form");if(x){var on=x.getBoundingClientRect().bottom<0;i.classList.toggle("on",on),document.body.classList.toggle("cml-baron",on)}},{passive:!0})', 'window.addEventListener("scroll",function(){if(i.__rq)return;i.__rq=requestAnimationFrame(function(){i.__rq=0;var x=document.querySelector("#product_form .js-addtocart:not(.js-addtocart-placeholder)")||document.querySelector("#product_form");if(x){var on=x.getBoundingClientRect().bottom<0;i.classList.toggle("on",on),document.body.classList.toggle("cml-baron",on)}})},{passive:!0})'],
  // redimensionamento artificial (acorda todos os carrosseis): so na pagina de produto, onde a largura das fotos muda
  ['cml-paginas.js', 'setTimeout(rs,300);setTimeout(rs,1500);', 'if(D.body&&D.body.classList.contains("template-product")){setTimeout(rs,300);setTimeout(rs,1500)}'],
];
// trocas pontuais no visual capturado: [texto antigo, texto novo]
const CSS_TROCAS = [
  // categoria: a espera pelo codigo agora tem prazo (1,6 s); antes a lista ficava invisivel ate o codigo chegar
  ['html.cml-blk body.template-category:not(.c2-ready) :is(#ns-section-category_hero,#ns-section-product_list){opacity:0!important}', 'html.cml-blk body.template-category:not(.c2-ready) :is(#ns-section-category_hero,#ns-section-product_list){opacity:0;animation:cmlrv 0s 1.6s forwards}'],
];
const PARSE = { ecmaVersion: 'latest', sourceType: 'script', allowReturnOutsideFunction: true };

function prepara(f) {
  let code = fs.readFileSync('src/' + f, 'utf8');
  // 1) CSS estatico sai do codigo (vai para o site.css)
  const cortes = dec.plan.filter((p) => p[0] === f && p[3]).map((p) => sites[f][p[1]].expr).sort((a, b) => b[0] - a[0]);
  for (const [a, b] of cortes) code = code.slice(0, a) + '""' + code.slice(b);
  for (const [arq, a, b, n] of TROCAS) if (arq === f) {
    const re = a instanceof RegExp ? a : new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+'), 'g');
    const achou = (code.match(re) || []).length;
    if (achou !== (n || 1)) throw new Error('troca: esperava ' + (n || 1) + ', achou ' + achou + ' em ' + arq + ': ' + String(a).slice(0, 60));
    code = code.replace(re, typeof b === 'function' ? b : () => b);
  }
  // 2) carregadores antigos
  for (const [arq, ini, fim] of LIMPA) if (arq === f) { const i = code.indexOf(ini); if (i < 0) throw new Error('limpeza nao achou: ' + ini.slice(0, 60)); const j = code.indexOf(fim, i); code = code.slice(0, i) + code.slice(j + fim.length); }
  // 3) ajuste de cantos por JS (lia o estilo de cada elemento): os cantos ficam fixos em cantos.css
  if (f === 'cml-paginas.js') {
    const ast = acorn.parse(code, PARSE); const cs = [];
    walk.full(ast, (n) => { if (n.type === 'FunctionDeclaration' && n.id && n.id.name === 'soft') cs.push([n.body.start, n.body.end]); });
    if (cs.length !== 2) throw new Error('soft: esperava 2, achou ' + cs.length);
    cs.sort((a, b) => b[0] - a[0]); for (const [a, b] of cs) code = code.slice(0, a) + '{}' + code.slice(b);
  }
  return code;
}

// divide a parte em modulos (cada instrucao do topo), com o comentario que vem antes como nome
function modulos(f, code) {
  const coms = [];
  const ast = acorn.parse(code, { ...PARSE, onComment: (blk, text, s, e) => coms.push({ text, s, e }) });
  const out = []; let prevEnd = 0;
  for (const st of ast.body) {
    if (st.type === 'EmptyStatement') continue;
    const c = coms.filter((x) => x.s >= prevEnd && x.e <= st.start).map((x) => x.text.trim().replace(/\s+/g, ' ')).join(' | ');
    out.push({ parte: f.replace('.js', ''), nome: (c || code.slice(st.start, st.start + 70).replace(/\s+/g, ' ')).slice(0, 110), code: code.slice(st.start, st.end), tipo: st.type });
    prevEnd = st.end;
  }
  return out;
}

// o pacote "extras" era uma lista de textos avaliados com um ajuste temporario de addEventListener; aqui vira codigo normal entre dois modulos que ligam e desligam o mesmo ajuste
const XON = '(function(){var d=document,w=window;if(w.__cmlXA)return;var dA=d.addEventListener,wA=w.addEventListener,q=function(f,ty,tg){setTimeout(function(){try{typeof f=="function"?f.call(tg,new Event(ty)):f&&f.handleEvent&&f.handleEvent(new Event(ty))}catch(e){}},0)};w.__cmlXA=[dA,wA];d.addEventListener=function(ty,f,o){if(ty=="DOMContentLoaded"&&d.readyState!="loading")return q(f,ty,d);return dA.call(this,ty,f,o)};w.addEventListener=function(ty,f,o){if((ty=="load"&&d.readyState=="complete")||(ty=="DOMContentLoaded"&&d.readyState!="loading"))return q(f,ty,w);return wA.call(this,ty,f,o)}})();';
const XOFF = '(function(){var x=window.__cmlXA;if(x){document.addEventListener=x[0];window.addEventListener=x[1];window.__cmlXA=null}})();';
const mods = [];
for (const [p, cond] of ORDEM) {
  if (p === 'ext-extras') {
    mods.push({ parte: 'extx', nome: 'extras: liga o ajuste de eventos', code: XON, tipo: 'x', id: 'extx-on', cond: '' });
    for (const f of fs.readdirSync('src').filter((x) => /^extx-\d+\.js$/.test(x)).sort()) { const ms = modulos(f, prepara(f)); ms.forEach((m, i) => { m.id = f.replace('.js', '') + '#' + i; m.cond = ''; mods.push(m); }); }
    mods.push({ parte: 'extx', nome: 'extras: desliga o ajuste de eventos', code: XOFF, tipo: 'x', id: 'extx-off', cond: '' });
    continue;
  }
  const f = p + '.js'; const ms = modulos(f, prepara(f)); ms.forEach((m, i) => { m.id = p + '#' + i; m.cond = cond; mods.push(m); });
}

// minifica cada modulo (nomes locais curtos; nomes globais e de propriedades ficam como estao)
for (const m of mods) {
  const r = await terser(m.code, { ecma: 2019, compress: { passes: 2 }, mangle: { toplevel: false }, format: { comments: false } });
  m.min = r.code.replace(/;\s*$/, '');
  m.bruto = m.code.length;
}

// cobertura: contador no inicio de cada funcao
let nFn = 0; const fnInfo = [];
if (COV) {
  for (const m of mods) {
    const ast = acorn.parse(m.min, PARSE); const ins = [];
    walk.full(ast, (n) => { if ((n.type === 'FunctionDeclaration' || n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression') && n.body.type === 'BlockStatement') ins.push([n.body.start + 1, n.end - n.start]); });
    ins.sort((a, b) => a[0] - b[0]);
    m.fn0 = nFn; let s = '', last = 0;
    for (const [pos, tam] of ins) { s += m.min.slice(last, pos) + '__c[' + nFn + ']=1;'; fnInfo.push(tam); nFn++; last = pos; }
    m.cov = s + m.min.slice(last); m.fn1 = nFn;
  }
}


// variante de medicao (--prof): quanto tempo cada modulo gasta no inicio, em timers, observadores e eventos
const PROF_INI = `(function(){var W=window,P=W.__cmlP={cur:'',t:{},n:{},t0:0};
function acc(id,k,dt){var o=P.t[id]||(P.t[id]={});o[k]=(o[k]||0)+dt;var c=P.n[id]||(P.n[id]={});c[k]=(c[k]||0)+1}
function wrap(fn,k){if(typeof fn!=='function')return fn;var id=P.cur;if(!id)return fn;return function(){var prev=P.cur;P.cur=id;var t0=performance.now();try{return fn.apply(this,arguments)}finally{acc(id,k,performance.now()-t0);P.cur=prev}}}
var st=W.setTimeout,si=W.setInterval,raf=W.requestAnimationFrame;
W.setTimeout=function(f){var a=[].slice.call(arguments);a[0]=wrap(f,'timer');return st.apply(W,a)};
W.setInterval=function(f){var a=[].slice.call(arguments);a[0]=wrap(f,'intervalo');return si.apply(W,a)};
W.requestAnimationFrame=function(f){return raf.call(W,wrap(f,'raf'))};
['MutationObserver','IntersectionObserver','ResizeObserver'].forEach(function(n){var O=W[n];if(!O)return;var N=function(cb,opt){return new O(wrap(cb,n.slice(0,3)),opt)};N.prototype=O.prototype;W[n]=N});
var ael=EventTarget.prototype.addEventListener,rel=EventTarget.prototype.removeEventListener,map=new WeakMap();
EventTarget.prototype.addEventListener=function(ty,f,o){if(typeof f==='function'&&P.cur){var w=map.get(f);if(!w){w=wrap(f,'ev:'+ty);map.set(f,w)}return ael.call(this,ty,w,o)}return ael.call(this,ty,f,o)};
EventTarget.prototype.removeEventListener=function(ty,f,o){return rel.call(this,ty,(typeof f==='function'&&map.get(f))||f,o)};
P.b=function(id){P.cur=id;P.t0=performance.now()};P.e=function(){acc(P.cur,'ini',performance.now()-P.t0);P.cur=''};
P.rel=function(top){var r=[];for(var id in P.t){var o=P.t[id],tot=0,ks=[];for(var k in o){tot+=o[k];ks.push(k+' '+Math.round(o[k])+'ms/'+P.n[id][k])}r.push([tot,id,ks.sort(function(a,b){return parseFloat(b.split(' ')[1])-parseFloat(a.split(' ')[1])}).slice(0,4).join(', ')])}r.sort(function(a,b){return b[0]-a[0]});var s=0;r.forEach(function(x){s+=x[0]});return 'TOTAL '+Math.round(s)+'ms\\n'+r.slice(0,top||20).map(function(x){return Math.round(x[0])+'ms '+x[1]+' ('+x[2]+')'}).join('\\n')};
P.zera=function(){P.t={};P.n={}};
})();
`;

function monta(lista, titulo) {
  let s = '/* Chef Mais Leve: ' + titulo + ' (v19, 23/11/2026). Fonte e montagem: chefmaisleve-midia/site-v19/fonte. */\n';
  for (const m of lista) {
    const corpo = COV ? m.cov : m.min;
    const cond = m.cond === 'home' ? 'if(document.body&&document.body.classList.contains("template-home"))' : '';
    if (m.id === 'cpv-own#0') s += 'window.__cpvOwn2=1;window.__cpvOwn=1;\n';
    if (PROF) s += cond + '{__cmlP.b(' + JSON.stringify(m.id) + ');try{' + corpo + '}catch(e){__cmlW(' + JSON.stringify(m.id) + ',e)}__cmlP.e()}\n';
    else s += cond + 'try{' + corpo + '}catch(e){__cmlW(' + JSON.stringify(m.id) + ',e)}\n';
  }
  return s;
}
const remover = new Set(cfg.remover || []);
const vazio = (m) => !m.min || /^(void 0|!0|!1|0)?$/.test(m.min.trim());
const vivos = mods.filter((m) => !remover.has(m.id) && !vazio(m));
const ini = 'window.__cmlV2=1;window.__cmlV3=1;window.__cmlPack2=1;window.__cmlPack=1;window.__cefLoader=1;'
  // troca o texto de um elemento sem recriar o no (nao acorda os observadores de estrutura)
  + 'window.__cmlT=function(e,v){if(!e)return;v=String(v);var c=e.firstChild;if(c&&c.nodeType===3&&c===e.lastChild){if(c.nodeValue!==v)c.nodeValue=v}else if(e.textContent!==v)e.textContent=v};'
  + (COV ? 'window.__c=new Uint8Array(' + nFn + ');window.__cmlE=[];window.__cmlW=function(i,e){window.__cmlE.push(i+": "+(e&&e.message))};' : 'window.__cmlW=function(i,e){try{console.warn("cml",i,e)}catch(x){}};') + '\n';
const grupos = {}; // grupo -> lista de modulos ('' = nucleo, carregado em todas as paginas)
for (const m of vivos) { const g = (cfg.grupo && cfg.grupo[m.id]) || ''; (grupos[g] = grupos[g] || []).push(m); }
const tam = {};
for (const g of Object.keys(grupos)) {
  const nome = g ? 'pack-' + g + '.js' : 'pack.js';
  const txt = (g ? '' : ini + (PROF ? PROF_INI : '')) + monta(grupos[g], g ? 'comportamento (' + g + ')' : 'comportamento (nucleo)');
  new Function(txt); // confere a sintaxe do arquivo final
  fs.writeFileSync(OUT + '/' + nome, (g ? '' : '') + txt); tam[nome] = txt.length;
}
fs.writeFileSync(OUT + '/mapa.json', JSON.stringify({ nFn, fnTam: fnInfo, mods: mods.map((m) => ({ id: m.id, nome: m.nome, min: m.min.length, bruto: m.bruto, fn0: m.fn0, fn1: m.fn1, removido: remover.has(m.id), grupo: (cfg.grupo && cfg.grupo[m.id]) || '' })) }));

// visual: na ordem em que aparecia na pagina
const rkey = (s) => (s.id ? s.id : 'txt:' + s.t);
const vistos = new Set(); let css = '';
for (const p of ['/', ...Object.keys(P).filter((p) => p !== '/')]) for (const s of P[p].styles || []) {
  if (s.tag !== 'STYLE') continue; const k = rkey(s); if (vistos.has(k)) continue;
  if (k === 'custom-theme-css' || ok.has(k)) { vistos.add(k); css += '/*' + k + '*/\n' + T[s.t] + '\n'; }
}
for (const [a, b] of CSS_TROCAS) { if (css.split(a).length !== 2) throw new Error('troca css: esperava 1 ocorrencia: ' + a.slice(0, 60)); css = css.replace(a, () => b); }
css = fs.readFileSync('fontes.css', 'utf8') + '\n' + css + '\n' + fs.readFileSync('cantos.css', 'utf8') + '\n';
if (fs.existsSync('ajustes.css')) css += fs.readFileSync('ajustes.css', 'utf8') + '\n';
// regras comprovadamente mortas: dependiam de classes que nenhum codigo cria mais (lista em modulos.json)
if (cfg.tokensMortos && cfg.tokensMortos.length) {
  const { tokensFora } = await import('./purga.mjs');
  const morto = (t) => cfg.tokensMortos.some((m) => t === m || (m.endsWith('*') && t.startsWith(m.slice(0, -1))));
  const postcss = (await import('postcss')).default; const root = postcss.parse(css); let nr = 0;
  root.walkRules((r) => { if (r.parent && r.parent.type === 'atrule' && /keyframes/.test(r.parent.name)) return; const fica = r.selectors.filter((sel) => !tokensFora(sel).some(morto)); if (!fica.length) { r.remove(); nr++; } else if (fica.length < r.selectors.length) r.selectors = fica; });
  root.walkAtRules((a) => { if (/media|supports/.test(a.name) && a.nodes && a.nodes.length === 0) a.remove(); });
  css = root.toString(); console.log('regras mortas removidas:', nr);
}
fs.writeFileSync(OUT + '/site.bruto.css', css);
const cssMin = (await esbuild.transform(css, { loader: 'css', minify: true, legalComments: 'none' })).code;
fs.writeFileSync(OUT + '/site.css', '/* Chef Mais Leve: visual do site (v19, 23/11/2026). */\n' + cssMin);
console.log(COV ? '[cobertura] funcoes ' + nFn : '[producao]', '| modulos', mods.length, 'vivos', vivos.length, '| site.css', Math.round(cssMin.length / 1024) + 'KB |', Object.entries(tam).map(([k, v]) => k + ' ' + Math.round(v / 1024) + 'KB').join(', '));
