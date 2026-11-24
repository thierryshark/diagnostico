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
