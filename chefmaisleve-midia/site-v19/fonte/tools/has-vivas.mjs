// lista os seletores do site.css que continuariam com :has() vivo depois do reescritor (mesma logica do reescritor do pacote)
import fs from 'fs';
const LIVE = /:(hover|focus|focus-within|focus-visible|active|checked|indeterminate|invalid|valid|placeholder-shown|target|user-invalid|autofill)/;
function close(s, i) { let d = 0, q = null; for (let j = i; j < s.length; j++) { const c = s[j]; if (q) { if (c === '\\') { j++; continue } if (c === q) q = null; continue } if (c === '"' || c === "'") { q = c; continue } if (c === '\\') { j++; continue } if (c === '(') d++; else if (c === ')') { d--; if (d === 0) return j } } return -1 }
export function split(s) { const out = []; let d = 0, q = null, st = 0; for (let j = 0; j < s.length; j++) { const c = s[j]; if (q) { if (c === '\\') { j++; continue } if (c === q) q = null; continue } if (c === '"' || c === "'") { q = c; continue } if (c === '\\') { j++; continue } if (c === '(') d++; else if (c === ')') d--; else if (c === ',' && d === 0) { out.push(s.slice(st, j)); st = j + 1 } } out.push(s.slice(st)); return out }
function part(p) { let out = '', i = 0, d = 0, q = null, changed = false;
  for (let j = 0; j < p.length; j++) { const c = p[j]; if (q) { if (c === '\\') { j++; continue } if (c === q) q = null; continue } if (c === '"' || c === "'") { q = c; continue } if (c === '\\') { j++; continue }
    if (c === '(') { d++; continue } if (c === ')') { d--; continue } if (d !== 0 || c !== ':') continue;
    const isNot = p.substr(j, 10) === ':not(:has(', isHas = p.substr(j, 5) === ':has('; if (!isNot && !isHas) continue;
    const open = j + 4, end = close(p, open); if (end < 0) return null;
    if (isNot) { const inner = p.slice(j + 5, end); if (inner.indexOf(':has(') !== 0 || close(inner, 4) !== inner.length - 1) continue }
    const arg = p.slice(j, end + 1); if (LIVE.test(arg)) return null;
    out += p.slice(i, j) + '.cmlh-X'; i = end + 1; j = end; changed = true }
  return changed ? out + p.slice(i) : null }
export function vivas(css) {
  const res = []; const re = /([^{}]+)\{/g; let m;
  while ((m = re.exec(css))) { const sel = m[1].trim(); if (sel[0] === '@' || sel.indexOf(':has(') < 0) continue;
    for (const p of split(sel)) { if (p.indexOf(':has(') < 0) continue; const r = part(p); if (r === null || r.indexOf(':has(') >= 0) res.push(p.trim()) } }
  return res }
if (process.argv[1].endsWith('has-vivas.mjs')) { const v = vivas(fs.readFileSync(process.argv[2] || 'dist/site.css', 'utf8')); console.log('seletores com :has vivo: ' + v.length); [...new Set(v)].forEach((s) => console.log('  ' + s.slice(0, 400))) }
