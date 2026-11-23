// Levanta onde cada parte injeta <style>, se o CSS e estatico (da para extrair) e o tamanho.
import fs from 'fs';
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';

export function analisa(code) {
  const ast = acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'script', allowReturnOutsideFunction: true, ranges: true });
  // mapa de variaveis com valor estatico (string), por nome (primeira declaracao)
  // declaracoes com o escopo (funcao) em que vivem, para resolver o nome certo em cada uso
  const fns = [{ start: 0, end: code.length }];
  walk.full(ast, (n) => { if (/Function/.test(n.type)) fns.push({ start: n.start, end: n.end }); });
  const decls = [];
  walk.full(ast, (n) => {
    if (n.type === 'VariableDeclarator' && n.id.type === 'Identifier' && n.init) {
      const sc = fns.filter((f) => f.start <= n.start && n.end <= f.end).sort((a, b) => (a.end - a.start) - (b.end - b.start))[0];
      decls.push({ name: n.id.name, init: n.init, sc, at: n.start });
    }
  });
  let useAt = 0;
  const decl = { has: (nm) => !!pick(nm), get: (nm) => pick(nm).init };
  function pick(nm) {
    const c = decls.filter((d) => d.name === nm && d.sc.start <= useAt && useAt <= d.sc.end);
    if (!c.length) return null;
    c.sort((a, b) => (a.sc.end - a.sc.start) - (b.sc.end - b.sc.start) || Math.abs(useAt - a.at) - Math.abs(useAt - b.at));
    return c[0];
  }
  const seen = new Set();
  function ev(e, depth = 0) {
    if (!e || depth > 20) return null;
    if (e.type === 'Literal' && typeof e.value === 'string') return e.value;
    if (e.type === 'TemplateLiteral' && e.expressions.length === 0) return e.quasis.map((q) => q.value.cooked).join('');
    if (e.type === 'TemplateLiteral') {
      let s = '';
      for (let i = 0; i < e.quasis.length; i++) { s += e.quasis[i].value.cooked; if (i < e.expressions.length) { const v = ev(e.expressions[i], depth + 1); if (v === null) return null; s += v; } }
      return s;
    }
    if (e.type === 'BinaryExpression' && e.operator === '+') { const a = ev(e.left, depth + 1), b = ev(e.right, depth + 1); return a === null || b === null ? null : a + b; }
    if (e.type === 'Identifier' && decl.has(e.name)) { if (seen.has(e.name)) return null; seen.add(e.name); const v = ev(decl.get(e.name), depth + 1); seen.delete(e.name); return v; }
    if (e.type === 'CallExpression' && e.callee.type === 'MemberExpression' && e.callee.property.name === 'join' && e.callee.object.type === 'ArrayExpression') {
      const sep = e.arguments.length ? ev(e.arguments[0], depth + 1) : ',';
      if (sep === null) return null;
      const parts = e.callee.object.elements.map((x) => ev(x, depth + 1));
      return parts.some((p) => p === null) ? null : parts.join(sep);
    }
    return null;
  }
  const isStyleCreate = (n) => n && n.type === 'CallExpression' && n.callee.type === 'MemberExpression' && n.callee.property.name === 'createElement' && n.arguments[0] && n.arguments[0].value === 'style';
  const vars = []; // {name, at}
  walk.full(ast, (n) => {
    if (n.type === 'VariableDeclarator' && isStyleCreate(n.init) && n.id.type === 'Identifier') vars.push({ name: n.id.name, at: n.start });
    if (n.type === 'AssignmentExpression' && isStyleCreate(n.right) && n.left.type === 'Identifier') vars.push({ name: n.left.name, at: n.start });
  });
  // para cada criacao, procura o id e o texto mais proximos depois dela (mesmo nome de variavel)
  const assigns = [];
  walk.full(ast, (n) => {
    if (n.type === 'AssignmentExpression' && n.left.type === 'MemberExpression' && n.left.object.type === 'Identifier') {
      const p = n.left.property.name || n.left.property.value;
      if (p === 'id' || p === 'textContent' || p === 'innerHTML' || p === 'innerText') assigns.push({ v: n.left.object.name, p, node: n });
    }
  });
  const out = [];
  const starts = vars.map((v) => v.at).sort((a, b) => a - b);
  for (const c of vars) {
    const nxt = starts.find((x) => x > c.at) ?? Infinity;
    const after = assigns.filter((a) => a.v === c.name && a.node.start > c.at && a.node.start < nxt).sort((a, b) => a.node.start - b.node.start);
    const idA = after.find((a) => a.p === 'id');
    const txA = after.find((a) => a.p !== 'id');
    if (!txA || (idA && idA.node.start - c.at > 4000) || txA.node.start - c.at > 4000) { out.push({ id: idA ? ev(idA.node.right) : null, estatico: false, motivo: 'sem texto perto', at: c.at }); continue; }
    useAt = txA.node.start; const css = ev(txA.node.right);
    out.push({ id: idA ? ev(idA.node.right) : null, estatico: css !== null, css, at: c.at, expr: [txA.node.right.start, txA.node.right.end] });
  }
  return out;
}

if ((process.argv[1]||'').endsWith('analisa.mjs')) {
  let tot = 0, est = 0;
  for (const f of fs.readdirSync('src').filter((x) => x.endsWith('.js'))) {
    const r = analisa(fs.readFileSync('src/' + f, 'utf8'));
    const e = r.filter((x) => x.estatico);
    const kb = e.reduce((a, x) => a + x.css.length, 0);
    tot += r.length; est += e.length;
    console.log(f.padEnd(22), 'styles', r.length, 'estaticos', e.length, Math.round(kb / 1024) + 'KB', '| dinamicos:', r.filter((x) => !x.estatico).map((x) => x.id || '?').join(','));
  }
  console.log('total', tot, 'estaticos', est);
}
