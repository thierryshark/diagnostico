// Monta o rascunho v19: site.css (todo o visual, carregado no inicio) e pack.js (comportamento, carregado depois).
import fs from 'fs';
import * as acorn from 'acorn';
import * as esbuild from 'esbuild';
import { minify as terser } from 'terser';

const dec = JSON.parse(fs.readFileSync('decisao.json', 'utf8'));
const sites = JSON.parse(fs.readFileSync('sites.json', 'utf8'));
const est = JSON.parse(fs.readFileSync('est.json', 'utf8'));
const T = est.texts, P = est.pages;
const ok = new Set(dec.ok);
fs.mkdirSync('dist', { recursive: true });

// 1) codigo sem o CSS embutido (o texto do estilo vira "")
const LIMPA = [
  ['cpv-own.js', '/* Chef Mais Leve: carrega o tema Black (funcao cml-black)', '.appendChild(s)})();'],
  ['cpv-own.js', '/* Chef Mais Leve: icones animados e WhatsApp no molde dos botoes flutuantes (funcao cml-icons) */', '.appendChild(s)})();'],
  ['cpv-own.js', '/* Chef Mais Leve: carrega os ajustes de visual (todas as paginas) e o buscador', 'document.addEventListener("DOMContentLoaded",go)})();'],
];
// trechos que faziam o trabalho do CSS em tempo real (pesado no celular) saem; o resultado deles vai pronto no site.css
import * as walk2 from 'acorn-walk';
function cirurgia(f, code) {
  const ast = acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'script', allowReturnOutsideFunction: true });
  const cortes = [];
  if (f === 'cml-paginas.js') {
    // ajuste de cantos por JS (lia o estilo de cada elemento da pagina): vira regra fixa no CSS
    walk2.full(ast, (n) => { if (n.type === 'FunctionDeclaration' && n.id && n.id.name === 'soft') cortes.push([n.body.start, n.body.end, '{}']); });
  }
  // o reescritor de :has() (cml-extra) fica: sem ele o recalculo de estilo dobra (medido 23/11: 1,1 s para 2,4 s na categoria)
  cortes.sort((a, b) => b[0] - a[0]);
  for (const [a, b, r] of cortes) code = code.slice(0, a) + r + code.slice(b);
  if (f === 'cml-paginas.js' && cortes.length !== 2) throw new Error('soft: esperava 2, achou ' + cortes.length);
  return code;
}
const srcOut = {};
let tirado = 0;
for (const f of Object.keys(sites)) {
  let code = fs.readFileSync('src/' + f, 'utf8');
  const cortes = dec.plan.filter((p) => p[0] === f && p[3]).map((p) => sites[f][p[1]].expr).sort((a, b) => b[0] - a[0]);
  for (const [a, b] of cortes) { tirado += b - a; code = code.slice(0, a) + '""' + code.slice(b); }
  // carregadores antigos que buscavam partes separadas (o pacote ja traz tudo): saem
  for (const [arq, ini, fim] of LIMPA) if (arq === f) { const i = code.indexOf(ini); if (i < 0) throw new Error('limpeza nao achou: ' + ini.slice(0, 60)); const j = code.indexOf(fim, i); code = code.slice(0, i) + code.slice(j + fim.length); }
  code = cirurgia(f, code);
  acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'script', allowReturnOutsideFunction: true });
  // remove o CSS que ficou sem uso (variaveis que so serviam para o estilo); nomes globais ficam intactos
  const t = await terser(code, { ecma: 2019, toplevel: false, mangle: false, compress: { unused: true, dead_code: true, passes: 2, keep_fargs: true, keep_fnames: true }, format: { comments: false } });
  const min = t.code;
  srcOut[f] = min;
}

// 2) pacote: mesma ordem e mesma forma de execucao do pacote atual (cada parte isolada, erro de uma nao derruba as outras)
const PARTS = [['cml-black', 0, ''], ['cml-icons', 1, ''], ['cml-extra', 0, ''], ['cml-home', 1, 'home'], ['cml-ui', 1, ''], ['cml-destaque', 0, ''], ['cml-paginas', 0, '']];
const list = PARTS.map((p) => [p[0], p[1], p[2], srcOut[p[0] + '.js']]);
const EXT = ['ext-seu-espaco.js', 'ext-categoria.js', 'ext-extras.js', 'ext-rodape.js'];
const pack = '/* Chef Mais Leve: comportamento do site (v19, 23/11/2026). O visual fica em site.css, carregado antes; este arquivo roda depois que a pagina aparece. */\n'
  + 'window.__cmlV2=1;window.__cmlV3=1;\n'
  + '(function(){if(window.__cmlPack2)return;window.__cmlPack2=1;window.__cmlPack=1;window.__cefLoader=1;var D=document;\n'
  + 'function run(c,n){try{(0,eval)(c)}catch(e){try{console.warn("cml "+n,e)}catch(x){}}}\n'
  + 'var P=' + JSON.stringify(list) + ';\n'
  + 'var E=' + JSON.stringify(EXT.map((e) => [e, srcOut[e]])) + ';\n'
  + 'P.forEach(function(p){if(p[2]==="home"&&!(D.body&&D.body.classList.contains("template-home")))return;run(p[3],p[0])});\n'
  + 'if(!window.__cpvOwn2){window.__cpvOwn2=1;window.__cpvOwn=1;run(' + JSON.stringify(srcOut['cpv-own.js']) + ',"own")}\n'
  + 'E.forEach(function(e){run(e[1],e[0])});\n'
  + '})();\n';
fs.writeFileSync('dist/pack.js', pack);

// 3) visual: na ordem em que aparecia na pagina (inicio primeiro, depois o que so aparece em outras paginas)
const rkey = (s) => (s.id ? s.id : 'txt:' + s.t);
const vistos = new Set();
let css = '';
const ordem = ['/', ...Object.keys(P).filter((p) => p !== '/')];
for (const p of ordem) {
  for (const s of P[p].styles || []) {
    if (s.tag !== 'STYLE') continue;
    const k = rkey(s);
    if (vistos.has(k)) continue;
    if (k === 'custom-theme-css' || ok.has(k)) { vistos.add(k); css += '/*' + k + '*/\n' + T[s.t] + '\n'; }
  }
}
css += '\n' + fs.readFileSync('cantos.css', 'utf8') + '\n';
const cssMin = (await esbuild.transform(css, { loader: 'css', minify: true, legalComments: 'none' })).code;
fs.writeFileSync('dist/site.css', '/* Chef Mais Leve: visual do site (v19, 23/11/2026). */\n' + cssMin);
console.log('CSS tirado do JS', Math.round(tirado / 1024), 'KB | site.css', Math.round(cssMin.length / 1024), 'KB (antes', Math.round(css.length / 1024), ') | pack.js', Math.round(pack.length / 1024), 'KB | chaves', vistos.size, '/', ok.size + 1);
const faltou = [...ok].filter((k) => !vistos.has(k)); if (faltou.length) console.log('faltou', faltou);
