# Site v19 (rascunho de performance, 23/11/2026)

## Como o site carrega
Tudo sai do bloco "Visual da loja (carrega antes do cabecalho)" no cabeçalho do tema, nesta ordem:

1. **`cedo.js`** (2 KB, `async`): o conversor de `:has()`. Assim que cada folha de estilo termina de carregar, troca as regras `:has()` por classes (`cmlh-N`) e mantém essas classes em dia. Com `:has()` vivo, cada alteração na página (trocar uma classe, um estilo) obrigava o navegador a recalcular o estilo da página inteira (15 a 18 ms por alteração; sem `:has()` vivo, menos de 0,2 ms). É o mesmo módulo que está no pacote (`cml-extra#0`); quem chegar primeiro roda, o outro não faz nada.
2. **Classes do tema na hora**: um script de 3 linhas marca a página (`cml-blk`, `cml-home2`, `cml-of3`...) antes da primeira pintura.
3. **`site.css`**: todo o visual, num `<link>`. Inclui as fontes (pasta `fontes/`, Poppins e Caveat hospedadas junto; os pesos 400 e 700 continuam vindo da chamada do próprio tema).
4. **`pack.js`**: o comportamento. Código normal (nada de texto avaliado), cada módulo isolado em `try/catch`. Carrega com `defer` (não trava a página) e prioridade alta.

Esperas com prazo: a lista da categoria fica invisível só até o código chegar ou 1,6 s (antes: até o código chegar, sem limite).

## A ordem de execução (o ponto mais delicado)
No site v18 o pacote era um script comum: o carregador usava `document.write`, então ele rodava no meio da leitura da página, antes dos quatro arquivos do tema (`seu-espaco`, `categoria`, `extras`, `rodape`). Isso dava duas etapas:

1. **Início** de cada parte, com a página "ainda sendo lida": `cml-black`, `cml-extra`, `cml-destaque`, `cml-paginas`, `cpv-own`, depois os quatro arquivos do tema. Quase todo módulo só se registra para o evento "página lida" (`DOMContentLoaded`).
2. **No evento**, os registros rodavam nesta ordem: os do pacote, as partes adiadas (`cml-icons`, `cml-home`, `cml-ui`), depois `cpv-own` e os arquivos do tema.

Vários módulos montam uma vez só e dependem dessa ordem (o FAQ do produto copia as perguntas que o "extras" já trocou; a lateral lê o menu já completo; o ajuste de cantos mede os elementos naquele momento). No v19 tudo roda num arquivo só, depois da leitura, e os módulos `fase-*` do `build2.mjs` reproduzem as duas etapas: `fase-ini` faz a página responder "ainda sendo lida" e guarda os registros; `fase-evento1` e `fase-evento2` executam os registros na ordem original.

**Ordem dos estilos.** No v18 a ordem dos estilos era a ordem de criação. Agora os estilos fixos moram no `site.css`. Um estilo criado pelo código quando menos da metade dos fixos já tinha sido criada fica antes do `site.css` (no `<head>`); os demais entram logo depois dele. Quem decide é o `fase-ini`.

## Como mudar
1. Edite as partes em `fonte/src/` (são as partes do pacote v2; `extx-NN.js` é o antigo pacote "extras" desembrulhado por `extras.mjs`).
2. `npm i && node build2.mjs` gera `dist/site.css`, `dist/pack.js` e `dist/cedo.js`. O que a montagem faz está comentado no `build2.mjs`:
   - tira do código o CSS estático (lista em `decisao.json`) e junta no `site.css`, na ordem em que aparecia;
   - aplica as trocas pontuais (`TROCAS` e `CSS_TROCAS`), cada uma com o motivo ao lado;
   - deixa de fora os módulos listados em `modulos.json` (com o motivo) e as regras de visual que dependiam deles;
   - inclui prontos os estilos que o código derivava de outro estilo na hora (`DERIVADOS`, hoje só o `c10-css` do "Encontre seu chá");
   - **recusa montar** se o `site.css` ficar com algum `:has()` que o conversor não alcança (por exemplo `:has()` dentro de `:is()`): escreva como lista simples de seletores.
3. Publique (`publica.sh "<o que mudou>"`) e troque o código da versão nos três endereços do bloco do cabeçalho do tema (`cedo.js`, `site.css`, `pack.js`).

## Medição e conferência
- `node build2.mjs --prof` gera um pacote que mede o tempo de cada módulo (no console: `__cmlP.rel()`). O tempo do navegador para montar a página entra na conta de quem lê o layout primeiro; para comparar versões, use os quadros longos do navegador (`performance.getEntriesByType('long-animation-frame')`).
- `node build2.mjs --cov` gera um pacote com contadores de uso por função (`cobertura.py` resume).
- `node tools/has-vivas.mjs dist/site.css` lista os `:has()` que ficariam vivos.
- Conferência visual: carregar a mesma página nos dois temas (`?theme_installation_id=`) em dois quadros lado a lado e comparar o estilo calculado só dos elementos visíveis. Elementos escondidos e a ordem de carrosséis dão falso alarme.
- Nunca publique no tema ao vivo um pacote `--prof` ou `--cov`.

## Regras (cada uma veio de uma medição)
- O que entra, sai o que foi substituído. Não volte a injetar CSS pelo JS nem a chamar fontes pelo código.
- **Ler e escrever em fases separadas.** Num laço que mede elementos (`getComputedStyle`, `offsetWidth`, `getBoundingClientRect`) e também altera estilo, primeiro leia tudo, depois escreva tudo. Intercalado, o ajuste de cantos custava de 100 ms a 1,5 s; em duas fases, 20 ms.
- **Trabalho que reage a alterações da página roda uma vez por quadro** (`__cmlF(função)`), nunca a cada alteração, e confere cada raiz uma vez só.
- **Nada de `:has()` preso ao `html` ou ao `body` varrendo a página inteira**: use filho direto (`html:has(>head>link...)`, `html:has(>body.x)`), e nunca `:has()` dentro de `:is()`.
- **Nenhum módulo lê as regras de outro estilo** (`sheet.cssRules`): os estilos fixos não estão mais em `<style>` na página.
- Texto que muda sozinho (contador) usa `__cmlT(elemento, texto)`: troca só o texto, sem recriar o elemento.
- Antes de gravar classe, atributo ou estilo num laço, confira se o valor mudou.
- Não ligue nem desligue a folha `site.css` pelo console (`link.disabled`): o navegador recria a folha e perde a conversão do `:has()`.

## Galeria do produto (computador)
`galeria.css` entra por último no `site.css`. Em telas de 1200 px ou mais, a galeria vira mosaico: foto principal maior e as outras ao lado, todas visíveis; clicar em qualquer uma abre o visor do tema. Com mais de 4 mídias aparecem a principal, duas fotos e o vídeo (ou a quarta foto) e o aviso "Ver todas as fotos". Abaixo de 1200 px e no celular continua o carrossel. Produtos com a página "destaque" (bloco `#cml-dst`) têm galeria própria e não mudam. O vídeo do produto só começa a carregar depois que a página terminou de carregar.

## Diferenças intencionais em relação à v18
- Página de produto no computador: galeria em mosaico (pedido do Thierry em 23/11) e coluna de informações um pouco mais estreita em telas médias.
- FAQ do produto: mostra sempre as respostas corrigidas (açúcar e redução do café); na v18 isso dependia do tempo de carregamento.
- Lateral de categorias (computador): mostra só categorias. Na v18 ela herdava a lista de produtos que o menu do topo ganhou depois e o item "Seu espaço".
- Home, banner principal: as duas telas (Black Friday e Chocoleve) ficam empilhadas; a que não está ativa fica por trás da ativa (`z-index`), com `inert`, em vez de invisível. Motivo: o Chrome conta como "maior elemento da página" a primeira pintura da foto Chocoleve; como ela só aparecia na troca dos 5 s, o indicador de carregamento da home dava 6,6 s (computador) e 7,0 s (celular). Agora dá cerca de 1 s. O código do banner mora no tema (`templates/pages/home.json`, bloco `code_wnkn`). A foto do banner vem daqui (`site-v19/img/banner-chocoleve-home.webp`, 86 KB no lugar de 143 KB).
- Home, bloco do Instagram: as 9 fotos do celular e os 3 cartões ao lado só carregam quando o bloco chega a 900 px da tela, e só depois que a página terminou de carregar. As 6 fotos antigas vêm em miniatura (300×400) pelo redimensionador do Supabase (`/storage/v1/render/image/...`); se a miniatura falhar, entra a original. Saíram o adiamento antigo (`lazyHome`, que media cedo demais e deixava um observador da página inteira ligado) e os cartões `pop`, que estavam sempre invisíveis e eram reposicionados a cada rolagem.
- Home, carrossel de categorias: a foto do cartão Chocoleve vem em 640 px pelo mesmo redimensionador (38 KB no lugar de 168 KB), com a original de reserva.
- Rodapé "Seja membro": o bloco nativo de novidades do tema fica desligado (`templates/layout/footer.json`, bloco `newsletter`, `disabled: true`). O formulário nativo, mesmo escondido, fazia a loja baixar o reCAPTCHA do Google (353 KB) em todas as páginas. A caixa agora nasce pronta dentro do rodapé montado pelo `c7` (`cml-extra`), e o `ext-rodape` só coloca o formulário de membro nela. Visual idêntico ao da v18. O cadastro continua indo para o sistema de gestão e para o Cashing; o envio para o formulário nativo saiu (ia para o endereço-armadilha `/winnie-pooh`, sem a chave do reCAPTCHA, então não cadastrava nada). **O bloco nativo e o pacote andam juntos**: se religar o bloco no tema, a caixa aparece em dobro; se voltar a um pacote antigo com o bloco desligado, o rodapé novo não monta.

## O que ficou para depois
- O bloco "respostas corrigidas no FAQ" (`cml-extra`) troca o texto de duas respostas a cada 400 ms; o certo é levar o texto corrigido para a lista do `extx-13` e apagar o bloco.
- **Depoimentos do Cashing (resolvido em 23/11, vale para o site ao vivo):** a seção "Depoimentos" antes do rodapé (`[data-slot=before_footer]`), que o nosso visual esconde, baixava em todas as páginas as fotos dos depoimentos no tamanho original. Com o ok do Thierry, as 20 avaliações de produto deixaram de aparecer também como depoimento e os 4 depoimentos puros com imagem foram escondidos da loja (os 6 só de texto ficaram). A seção agora não baixa foto nenhuma. Se uma avaliação com foto voltar a ser marcada como depoimento, as fotos voltam a baixar: conferir de tempos em tempos em Cashing > Conversão > Avaliações > filtro "Depoimento".
- Fotos que ainda vêm do Supabase pelo redimensionador (Instagram antigas e cartão Chocoleve): quando der, trocar por arquivos fixos aqui em `site-v19/img/`, como foi feito com o banner.
- A home ainda tem no topo do modelo um bloco de estilo de 21 KB (`code_omm7`, "CSS base") repetido nos modelos de página; conferir se ainda é necessário agora que o visual vem do `site.css`.
- Rodapé: a caixa "Seja membro" ainda usa o id e as classes do bloco nativo (`#ns-block-newsletter`, `.footer-newsletter-container`) porque dezenas de regras do visual apontam para eles; sobram também regras para o formulário nativo no CSS do próprio tema (campo "CSS personalizado" do rodapé) e as do pop-up nativo de novidades (`#promotional-modal`), que está desligado. Limpar junto com o enxugamento do `site.css`.
- `extx-13`, `extx-10`, `extx-00` e o modo Black (`cml-paginas#12`) ainda consultam a página por tempo (0,5 a 1,5 s); parado, isso soma cerca de 2,5% de um núcleo.
