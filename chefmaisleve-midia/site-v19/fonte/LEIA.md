# Site v19 (rascunho de performance, 23/11/2026)

## Como o site carrega
- **Classes do tema na hora**: um script de 3 linhas no topo do corpo (bloco "Visual da loja" do cabeçalho do tema) marca a página (`cml-blk`, `cml-home2`, `cml-of3`...) antes da primeira pintura. Sem isso o visual só "assentava" quando o código chegava.
- **`site.css`**: todo o visual, num `<link>` no topo. Inclui as fontes (pasta `fontes/`, Poppins e Caveat hospedadas junto; os pesos 400 e 700 continuam vindo da chamada do próprio tema).
- **`pack.js`**: o comportamento. É código normal (nada de texto avaliado), cada módulo isolado em `try/catch`, na ordem original. Carrega com `defer` (não trava a página) e prioridade alta.
- Esperas com prazo: a lista da categoria fica invisível só até o código chegar ou 1,6 s (antes: até o código chegar, sem limite).

## Como mudar
1. Edite as partes em `fonte/src/` (são as partes do pacote v2; `extx-NN.js` é o antigo pacote "extras" desembrulhado por `extras.mjs`).
2. `npm i && node build2.mjs` gera `dist/site.css` e `dist/pack.js`. O que a montagem faz está comentado no topo do `build2.mjs`:
   - tira do código o CSS estático (lista em `decisao.json`) e junta no `site.css`, na ordem em que aparecia;
   - aplica as trocas pontuais (`TROCAS` e `CSS_TROCAS`): fontes, contadores de 1 s que não recriam elementos, gravações repetidas com o mesmo valor, etc.;
   - tira o ajuste de cantos por JS (`soft`); os cantos ficam fixos em `cantos.css`;
   - deixa de fora os módulos listados em `modulos.json` (com o motivo) e as regras de visual que dependiam deles.
3. Publique (`publica.sh`) e troque o código da versão nos dois endereços do bloco do cabeçalho do tema.

## Medição e conferência
- `node build2.mjs --prof` gera um pacote que mede o tempo de cada módulo (no console: `__cmlP.rel()`).
- `node build2.mjs --cov` gera um pacote com contadores de uso por função (`cobertura.py` resume).
- Nunca publique no tema ao vivo um pacote `--prof` ou `--cov`.

## Regras
- O que entra, sai o que foi substituído. Não volte a injetar CSS pelo JS nem a chamar fontes pelo código.
- Texto que muda sozinho (contador) usa `__cmlT(elemento, texto)`: troca só o texto, sem recriar o elemento. Recriar acorda todos os observadores da página a cada segundo.
- Antes de gravar classe, atributo ou estilo num laço, confira se o valor mudou.
