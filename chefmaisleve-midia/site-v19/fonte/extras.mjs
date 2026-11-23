// Desembrulha o pacote "extras": era uma lista de textos de codigo avaliados um a um. Vira codigo normal, um arquivo por item.
import fs from 'fs'; import * as acorn from 'acorn';
const s = fs.readFileSync('src/ext-extras.js', 'utf8');
const ast = acorn.parse(s, { ecmaVersion: 'latest' });
const fn = ast.body[0].expression.callee; const body = (fn.type === 'ParenthesizedExpression' ? fn.expression : fn).body.body;
const arr = body[0].declarations[0].init;
if (arr.type !== 'ArrayExpression') throw new Error('estrutura inesperada');
const resto = s.slice(arr.end, (fn.type === 'ParenthesizedExpression' ? fn.expression : fn).body.end - 1);
console.log('itens', arr.elements.length, '| resto:', resto.slice(0, 700));
arr.elements.forEach((e, i) => { if (e.type !== 'Literal' || typeof e.value !== 'string') throw new Error('item ' + i + ' nao e texto'); fs.writeFileSync('src/extx-' + String(i).padStart(2, '0') + '.js', e.value); console.log(i, e.value.length, e.value.slice(0, 110).replace(/\s+/g, ' ')); });
