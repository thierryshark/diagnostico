# Site v19 (rascunho de performance, 23/11/2026)

Como o site carrega agora:
- `site.css`: todo o visual. Fica num `<link>` no topo da página (bloco "Visual da loja" do cabeçalho do tema) e carrega antes de a página aparecer.
- `pack.js`: o comportamento (carrosséis, painéis, cards, Black etc.). Fica com `defer`, então roda depois que a página já apareceu.
- O tema não chama mais `cpv-loja`/`cpv-loja-v2` (Supabase) nem os 4 scripts de `tema/*.js` no rodapé: tudo foi para dentro do `pack.js`.

Como mudar:
1. Edite as partes em `fonte/src/` (são as mesmas partes do pacote v2).
2. `node build.mjs` (em `fonte/`, com `npm i` antes) gera `dist/site.css` e `dist/pack.js`:
   - tira o CSS de dentro do JS (os estilos listados em `decisao.json`) e junta no `site.css`, na ordem em que apareciam;
   - tira o ajuste de cantos por JS (`soft`), que lia o estilo de cada elemento; os cantos ficam fixos em `cantos.css`;
   - remove os carregadores antigos que buscavam partes separadas.
3. Publique no GitHub e troque o hash nos dois endereços do tema (cabeçalho: `code_mf` e `code_ld`).

Regra: o que entra, sai o que foi substituído. Não volte a injetar CSS pelo JS.
