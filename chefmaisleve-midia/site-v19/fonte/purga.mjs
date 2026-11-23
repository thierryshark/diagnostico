// Regras de visual comprovadamente mortas: dependem de uma classe/id nossa que nenhum codigo cria e nenhuma pagina traz.
import fs from 'fs'; import postcss from 'postcss';
const NOSSO = /^(cml|cx\d*|c\d{1,2}|cef|cmn|of3|lp|nx|cpv|cpvp|cbk|cbkh|cbl|cmm|cmlt|cmc|esq|mobf|cmlh)-/;
export function tokensFora(sel) {
  // tira textos entre aspas, atributos e o conteudo de pseudo-funcoes (:not, :is, :where, :has...)
  let s = sel.replace(/"[^"]*"|'[^']*'/g, '""').replace(/\[[^\]]*\]/g, '');
  let out = '', d = 0;
  for (let i = 0; i < s.length; i++) { const c = s[i]; if (c === '(') d++; else if (c === ')') d--; else if (d === 0) out += c; }
  return [...out.matchAll(/[.#](-?[_a-zA-Z][\w-]*)/g)].map((m) => m[1].replace(/\\/g, ''));
}
export function prepara(js) {
  const dyn = new Set([...js.matchAll(/([A-Za-z][\w-]{2,})["'`]\s*\+/g)].map((m) => m[1]));
  for (const m of js.matchAll(/\+\s*["'`]([\w-]{0,3})["'`]/g)) dyn.add(''); // marca: ha sufixos dinamicos (tratados pelo prefixo)
  dyn.delete('');
  return { js, dyn: [...dyn] };
}
export function vivo(tok, ctx, extra) {
  if (!NOSSO.test(tok)) return true;
  if (ctx.js.includes(tok)) return true;
  if (extra && extra.has(tok)) return true;
  for (const p of ctx.dyn) if (p.length >= 4 && tok.startsWith(p)) return true;
  return false;
}
export function purga(css, ctx, extra) {
  const root = postcss.parse(css); let regras = 0, seletores = 0; const mortos = new Set();
  root.walkRules((r) => {
    if (r.parent && r.parent.type === 'atrule' && /keyframes/.test(r.parent.name)) return;
    const fica = r.selectors.filter((sel) => { const dead = tokensFora(sel).filter((t) => !vivo(t, ctx, extra)); dead.forEach((t) => mortos.add(t)); return dead.length === 0; });
    if (fica.length === 0) { r.remove(); regras++; } else if (fica.length < r.selectors.length) { seletores += r.selectors.length - fica.length; r.selectors = fica; }
  });
  root.walkAtRules((a) => { if (/media|supports/.test(a.name) && a.nodes && a.nodes.length === 0) a.remove(); });
  return { css: root.toString(), regras, seletores, mortos: [...mortos] };
}
if ((process.argv[1] || '').endsWith('purga.mjs')) {
  const js = fs.readdirSync('dist').filter((f) => /^pack.*\.js$/.test(f)).map((f) => fs.readFileSync('dist/' + f, 'utf8')).join('\n');
  const ctx = prepara(js);
  const r = purga(fs.readFileSync('dist/site.bruto.css', 'utf8'), ctx, null);
  fs.writeFileSync('candidatos.json', JSON.stringify(r.mortos));
  console.log('sem conferir o HTML das paginas: regras', r.regras, 'seletores', r.seletores, 'tokens candidatos', r.mortos.length, '| prefixos dinamicos', ctx.dyn.length);
  console.log(r.mortos.slice(0, 60).join(' '));
}
