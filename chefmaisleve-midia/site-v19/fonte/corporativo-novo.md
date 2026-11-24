# Presentes corporativos: página nova no tema (24/11/2026)

- Pedido do Thierry: refazer a página quase toda, com banner e parte institucional com os diferenciais; orçamento direto no WhatsApp (resposta dele às 07h31). Referência enviada: https://talcha.com.br/pages/corporativo-novo (banner com 2 botões, diferenciais, modalidades, logos de clientes, caso prático, números, passo a passo e contato; sem preço e sem compra direta).
- Modelo: `templates/pages/category.CORPORATIVO.json` no rascunho 14955147. Ordem: `custom_co` (banner fino, 4 diferenciais, título dos kits) > `product_list` (grade nativa, em lista) > `custom_co2` (como funciona em 3 passos, pagamento, chamada final, janela do "Conheça" e o script).
- Categoria: Presentes corporativos = 42104596 (/presentes-corporativos/), 4 kits: Para Aquela Pessoa 382888542, Queridinho 382888501, Snack Tropical 382888467, Flowers Tropical 382888421.
- Na lista, cada kit tem "Conheça" (janela com foto, nome, preço "por kit", resumo fixo do mapa `T` e "Ver página") e "Orçar" (WhatsApp 554791571974 com o nome do kit na mensagem). O botão de comprar nativo fica escondido NESTA página; a compra de 1 unidade continua pela página do produto.
- Textos usam só fatos da skill chef-proposta: feito à mão pela família em SC, sem aditivos, nota 5,0 no Google, 5 anos de mercado, 6 países, amostra antes de fechar, proposta em PDF, Pix, boleto ou cartão em até 5x sem juros. NÃO promete marca do cliente na caixa (regra: kits só com a marca Chef), nem prazo em dias, nem frete grátis, nem número de pedidos.
- A CONFIRMAR com o Thierry: frase da amostra (é cortesia ou paga?), frase do pagamento, se entram logos de clientes atendidos e fotos de entregas reais (a referência tem; aqui só entra com autorização dos clientes).
- Prévia: /admin/brand-editor/themes/14955147?template=pages/category.CORPORATIVO&resource=42104596 (computador e botão "Celular"). Conferido: computador 1189 px (lista 2 x 2, página com 2.277 px de altura, antes 2.385 só com a grade), celular 440 px (nenhum texto abaixo de 14 px, sem sobra lateral).
- Na publicação: ligar o modelo CORPORATIVO à categoria 42104596 (painel > Produtos > Categorias > Modelo).

## Marca genérica no pacote (pack b15239f)
- Página montada no próprio tema leva o atributo `data-cml-nat` no bloco. O pacote, ao ver esse atributo, libera a página na hora (`c2-ready`) e não mexe nos botões e links dela (lista de exceções do "c6"). Substitui as exceções fixas por id (`#cml-ec`, `#cml-mp`). Página nova do tema não exige mais mexer no pacote.
- Os três modelos (ENCONTRE, PRESENTE, CORPORATIVO) repetem o mesmo estilo de lista e a mesma janela. Candidato a virar um componente único quando a lista for aprovada.
- Achado para a etapa de categorias: o pacote força 3 colunas a partir de 1100 px (`.js-product-table.grid-md-4:not(#u1)…:not(#u5)`), e o documento do Thierry pede 4 no computador. O "Espiar" está escondido no celular e em telas de toque; aparece só no computador.

## 24/11/2026 (manhã): cartões dos produtos novos, fotos quadradas e ajustes pedidos pelo Thierry

- Cartões: os 6 produtos novos entraram no mapa de sobretítulo e segunda linha (módulo cx6): Combo 4 Chás (382766180), Combo Trouxinhas (382766299) e os 4 kits corporativos recadastrados (382888421, 382888467, 382888501, 382888542). Os ids antigos dos kits saíram do mapa.
- Fotos quadradas 1200 x 1200 subidas como primeira foto: Flowers Tropical, Queridinho e Para Aquela Pessoa (recomposição da foto que já existia, feita no Canva); Cartão Presente (carta com selo de cera, Gemini); Combo 4 Chás (ensaio de 3 fotos no Gemini, com os rótulos certos: intenso, sereníssimo, quentão e sport).
- Falta: Snack Tropical. A foto quadrada está pronta no Canva (design DAHb1OSznbM, página 3), mas a subida foi barrada pelo controle de permissão. Só subir depois do ok do Thierry.
- Arquivos das fotos: repositório, pasta chefmaisleve-midia/produtos, e no computador dele em Claude/fotos-site-nov26.
- Black, bloco "Vale mais levar junto": cada opção de quantidade mostra o valor da unidade (pacote, kit ou caixa). Os combos de chá contam os pacotes de dentro (5 e 4). Nos combos de chá o valor por pacote é igual nas 3 opções porque não há desconto por quantidade cadastrado.
- Convite para avaliar (app de avaliações, na página de produto): botão ficava com letra branca em fundo claro por causa de duas regras de cor nossas que brigavam. Corrigido na origem; caixa com fundo da marca, linha fina, sem o desenho de estrela, botão de contorno laranja com canto de 10 px.
- Letra mínima: passo novo no build sobe para 14 px todos os textos de 12 a 13,5 px (330 no estilo, mais os do script). Ficam para revisão caso a caso 206 + 142 declarações abaixo de 12 px (etiquetas e sobretítulos).
- Aviso visto no Canva: assinatura Pro suspensa por erro de pagamento; cota de geração de imagem esgotada.
- Cartão no celular (24/11, depois): nome com até 3 linhas (altura livre), sobretítulo em até 2 linhas com altura reservada, contagem de avaliações curta "(26)" em tela estreita. Segunda linha dos kits no formato "Nome do kit: o que vem". Bateria em 6 páginas (390 e 1440 px): sem rolagem lateral e sem texto cortado.
- Bloco da Black: a foto do Combo 4 Chás ainda é a antiga (mãos com Equilibrado e Performance, que não são do combo). Falta apontar para a foto nova.
- Pacote atual no rascunho: 176019d.

## 24/11/2026 (10h às 10h40)

- Snack Tropical: foto quadrada subida (Thierry liberou subir todas as fotos).
- Black, bloco "Vale mais levar junto": a foto dos combos de chá agora vem gravada no próprio combo (campo `im` em COMBOS). Saiu o módulo cx14 (cml-paginas#33), que trocava a foto depois de o cartão aparecer, com observador na página inteira. Saiu também o cx10 (cml-paginas#29), que já estava desligado. Combo 4 Chás com a foto nova (rótulos certos).
- Rodapé no celular: de 1054 para 790 px de altura. Sem a segunda margem interna, sem o logo repetido, menus sem quebra desnecessária, bandeiras em uma linha (6 colunas), menos vão entre os blocos. No computador ficou igual (498 px).
- Sacola e demais gavetas laterais: linha de contorno de 1 px (#d9cbb9) na borda.
- Categorias: saiu a coluna lateral de filtros montada pelo nosso código (trecho de cml-extra#15) e o botão "Mostrar filtros". Padrão no computador: 4 produtos por linha. Ficam a fileira de subcategorias, o "Ordenar por" e o "Ver em".
  - ATENÇÃO: o tema tem filtro nativo em coluna ("Filtrar por": Categorias e Preço). Ele continua escondido por uma regra de estilo (era assim antes também). Passo final, com ok do Thierry: desligar os filtros no painel da loja (Configurações > Filtros) e apagar a regra `.cml-cgrid>.filters-controls-content`.
  - Sobra de código para limpar depois: os módulos que enfeitavam a coluna (árvore de categorias em cml-destaque#0, cml-extra#21, cx22, ext-categoria#0) ainda carregam, sem efeito.
- Sobra antiga vista no pacote: código das páginas antigas de Encontre seu chá e Monte seu presente (nx-side, cx-side) ainda está no pacote; sai quando os modelos novos forem ligados depois de publicar.
- Pacote atual no rascunho: efb7204.

## 24/11/2026 (10h50 às 11h30): alinhamento no computador e filtros

- Filtros nativos DESLIGADOS no painel da loja (Loja online > Filtros: Variações e Preço desmarcados), com ok do Thierry. Vale para o site publicado também. A coluna nativa não é mais montada; saiu a regra de estilo que a escondia.
- Moldura única (bloco de código `code_mf` no header.json do rascunho): entraram na lista `.cml-dst .dw` (destaque do produto), `.cml-ig` (Instagram da home), `.cml-bar>div` (barra fixa de compra) e `body.template-page:has(.cml-st2) .page-content-section` (páginas institucionais).
- Black: destaques dos combos na largura da moldura (foto 560 px no início ou no fim da coluna, texto até 640 px); "Dúvidas rápidas" na largura da moldura, em 2 colunas.
- Produto em destaque (Laranja etc.): foto encosta no início da coluna (max 620 px).
- Produto comum: texto de apresentação (`.cml-pd`, no product.json) sem recuo de 16 px e sem margem de 56 px; seção com 36/40 px (16/16 no celular): 72 px para a foto e 74 px para o "Veja também". Título `.cml-f-top` alinhado à esquerda.
- Caixa de avaliação: sem o recuo de 10 px do app, alinhada aos blocos da coluna.
- Conferência (1440 px): home, chás, ofertas, corporativos, 3 produtos, quem somos: todos os blocos começam e terminam na linha da moldura. Celular sem rolagem lateral.
- Vãos verticais medidos e ainda fora do padrão de 72 px (próxima tarefa): home (28, 96, 90, 132, 123), categoria (banner para lista 37; lista para rodapé 91), ofertas para rodapé 139, produto (veja também para dúvidas 92; dúvidas para rodapé 36).
- Pacote atual no rascunho: 82afda7.
