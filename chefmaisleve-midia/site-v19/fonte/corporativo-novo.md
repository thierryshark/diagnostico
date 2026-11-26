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
- 24/11, 11h20: produto em destaque (Kit Ternura, Laranja etc.), coluna de compra enquadrada: selos em colunas iguais (4 no computador, 2x2 no celular), faixa "Lote limitado" e botão "Comprar agora" na largura da coluna; no celular a descrição fica em até 3 linhas (16 px). Pacote: 0f949c0.
- 24/11, 11h35: cronômetro da Black no produto em destaque, no celular: texto e contador ocupam a largura do bloco (4 caixas iguais). O estilo desse bloco mora no script (cml-paginas.js), não no site.css. Pacote: f50e1b5.
- 24/11, 12h: vãos entre blocos no padrão. Home: 72 px entre todos os blocos no computador e 48 no celular (antes 96, 90, 132, 112 e 34). A regra de vão da home agora zera o recuo de baixo das seções; o recuo vertical da seção de dúvidas foi a zero no home.json (ajuste nativo). Black: 75 px antes do rodapé (era 139). Produto: Veja também para Dúvidas 72 (era 92).
- Margens laterais no celular: conferidas com a tela real de 390 px (sem a barra de rolagem do teste), todos os blocos em 16 px. Os 9 e 13 px medidos antes eram efeito da barra de rolagem do quadro de teste.
- Falta em vãos: banner da categoria para a lista (28) e destaque do produto para o bloco seguinte (44).
- Pacote atual no rascunho: 9347611.


## 24/11, 13h: letra minima concluida (nada abaixo de 14 px)
- Etapa "letra minima" do build agora cobre 9 a 13,5 px (estilo e script). Pacote no rascunho: 411fb1f.
- Celular: faixa do topo passou para duas linhas (aviso em cima, "Termina em" + contagem embaixo), 34 px -> 55 px. Texto do aviso encurtado no rascunho: "BLACK FRIDAY ATE 30/11 - LIVE QUINTA AS 20H" (saiu "NA CHEF").
- Celular: barra flutuante com rotulos curtos (Rastrear, Compra); rotulo completo segue no computador.
- Modelos do rascunho: home.json (#cml-bf26 .k/.d e #cml-ch26 .k em 14 px) e product.json (.cml-f-top>span em 14 px).
- App de avaliacoes: textos de 10 a 13 px em 14 px (ajustes.css). Atencao: seletor com "font-size: 13px" e reescrito pela propria etapa; usar "-size: 13px".
- Ficam abaixo de 14 px so as ilustracoes de tela de celular (5,6 a 8,5 px), que sao desenho e nao texto de leitura.
- Sobra de codigo: os modelos do tema (home.json etc.) ainda tem CSS antigo (cpvp, draft) com letras pequenas que nao aparecem na tela; entra na limpeza de codigo morto.


## 24/11, 14h: faixa do topo em regra unica, troca de pagina e corporativos (AINDA SEM CONFERENCIA NA TELA: o computador com o Chrome ficou fora do ar)
- Pacote no rascunho: bd91c72. Etapa nova no build2 ("faixa do topo"): remove as 46 regras antigas de .adbar/.cx5-bar; a regra unica mora no ajustes.css. Espaco da contagem reservado antes do codigo (::after com a mesma medida da .cx5-bar): 250 px no computador, 106 px no celular. Altura fixa de 34 px. Antes: 34 -> 55 px quando o codigo chegava (era o "piscar").
- Celular: uma linha, letra de 12 px (.75rem), excecao aprovada pelo Thierry. Aviso no rascunho: "BLACK ATE 30/11 - LIVE QUINTA 20H".
- Troca de pagina: @view-transition (navegador), cabecalho com view-transition-name cml-topo.
- Corporativos (category.CORPORATIVO.json): um banner so; diferenciais em 4 moldes pequenos (no celular so o titulo); kits em quadros com foto em moldura (2 colunas no computador, 1 no celular); chamada final em molde claro.
- A CONFERIR quando o navegador voltar: faixa (antes/depois do codigo, 360/390/1440), cabecalho fixo ao rolar (altura -34px), troca de pagina, quadros dos kits (estrutura nativa da grade), e como ver o modelo CORPORATIVO no rascunho (categoria ainda nao esta ligada ao modelo; se ele ve a pagina padrao com 2 banners, e por isso).
- Para a limpeza: modulos que trocam texto por script (cml-extra#11 Esquenta 22/11, cml-paginas#22 textos da Black, cml-ui#7) e textos de estilo mortos dentro do pack (c1-css).


## 24/11, 16h: conferido na tela (Chrome voltou)
- Pacote no rascunho: ver ultimo hash do publica.sh (apos 3f9a233).
- Faixa do topo: 34 px fixos antes e depois do codigo em 360/390/1440. A reserva da contagem NAO pode usar :has (o conversor cedo.js so aplica a classe depois da primeira pintura); usa :not(.cx5-on):not(.cx5-fim). Largura fixa 262 px (computador) e 122 px (celular).
- Cabecalho no computador pulava de 79 para 89 px: o tema entrega o menu com visibility:hidden;height:0 na tag e so mostra depois do codigo dele. Agora nasce visivel. O item "Seu espaco" e criado por codigo: lugar reservado pelo item 4 (margin-right 110px). Os itens escondidos (5, 7, 8) e a ordem do Black Friday (6) passaram a valer pela posicao. DEPOIS DE PUBLICAR: cadastrar "Seu espaco" no menu, apagar os 3 itens escondidos, tirar modulo e reservas.
- Corporativos: a URL /kits-presentes/presentes-corporativos/ no rascunho usa o modelo padrao + modulo cml-paginas#43 (kits de Natal). O painel so oferece modelos do tema publicado, entao o modelo CORPORATIVO so pode ser ligado depois de publicar. Para ver o modelo: editor do rascunho, admin/brand-editor/themes/14955147?template=pages/category.CORPORATIVO (conferido, computador e celular). Na pagina atual, o bloco de Natal deixou de ser banner (CSS_TROCAS cx4-nat). Ao ligar o modelo, tirar a parte kits() do modulo #43 para nao duplicar.
- Chocoleve (category.CHOCOLEVE.json): letras de 9 a 13,5 px para 14 px.
- PageSpeed celular no rascunho (24/11 16h): home 59 (LCP 4,1 s, TBT 670 ms, CLS 0), produto 70 (LCP 4,5 s, TBT 290 ms, CLS 0), chas 43 (LCP 6,6 s, TBT 1640 ms, CLS 0). Proximo alvo: categoria (lista espera o codigo; TBT alto).
- Varredura 390 e 1440 em 15 paginas: sem vazamento lateral, sem letra abaixo de 14 px (fora a faixa do topo no celular), sem imagem quebrada, sem erro de script.
- home.json tem varias secoes desativadas (Carrossel, Banners, CHAS, KITS, INFUSOES, SNACKS, GRANOLAS, banners categorias): entram na limpeza.


## 24/11, 16h40: decisoes do Thierry
- Combos (Trouxinhas e 4 chas) sem opcao de 1, 2 ou 3: so a oferta do combo. Combo Trio fica como esta (nao criar opcoes).
- Laranja Chocoleve: anunciar os 2 formatos (5 ou 10 fatias), sem faixas de volume. Na Black o cartao virou "em dois tamanhos" e o botao abre a escolha de tamanho e quantidade. Saiu a pergunta "Vale a pena comprar mais pacotes?" da pagina do produto. A promocao progressiva nativa continua ativa no carrinho (decidir se desliga). As opcoes do produto se chamam "5 un." e "10 un." (cadastro): sugerir "5 fatias" e "10 fatias".
- Kits corporativos so a partir de 10 unidades: pagina de corporativos com minimo 10 nos 4 kits (campo e botao), Black "Lembrancinhas corporativas" comeca em 10, modelo CORPORATIVO com o texto "a partir de 10 unidades". PENDENTE: o minimo nao e travado no carrinho nem na pagina de cada kit (precisa de regra nativa de quantidade minima no produto ou conferencia no pedido).
- home.json: o bloco de icones tinha "Esquenta Black / Precos de Black ate 20/11" no cadastro e um modulo trocava o texto na tela; agora o texto certo esta no cadastro.
- NAO REMOVIDOS: cml-extra#11 e cml-paginas#22 (trocam textos do Esquenta por Black). Dez modulos ainda escrevem textos do Esquenta que esses dois corrigem em cadeia (20/11 -> 22/11 -> 30/11). Para tirar, corrigir o texto na origem de cada um: cml-black#2, cml-destaque#0, cml-extra#8/#14/#15/#16/#17/#22/#31, cml-paginas#8, cml-ui#7.


## 24/11, 17h: limpeza pedida pelo Thierry
- Home: removidas pelo editor as 8 secoes desativadas (Carrossel, Banners, CHAS, KITS E PRESENTES, INFUSOES, SNACKS, GRANOLAS, banners categorias). Ficam: CSS base, Abertura Black, Icones, Perguntas, Instagram.
- Textos da campanha na origem: etapa nova no build2 aplica, no codigo de cada modulo, as trocas que cml-extra#11 e cml-paginas#22 faziam na tela. Removidos: cml-extra#11, cml-paginas#22, cml-ui#7 (e o cml-paginas#55, morto).
- AINDA EXISTE: cml-paginas#12 (corrige textos das paginas de ajuda: valores de frete, erros de escrita; tem tambem uma copia da tabela da Black, hoje sem efeito). Para tirar: corrigir o conteudo das paginas no painel (Paginas) e remover o modulo. Outros modulos que varrem texto: cml-extra#16/#17/#20/#38, cml-paginas#31/#43/#86, cpv-own#3, extx-13#2 (ver um a um).
- Plano do Thierry: publicar o v19 e seguir ajustando numa copia. Depois de publicar: ligar modelos (ENCONTRE, PRESENTE, CORPORATIVO), menu (Seu espaco nativo, apagar 3 itens escondidos), tirar reservas do menu, kits() do #43.


## 24/11, 17h20: celular (Thierry)
- /chas/ sem o anuncio do Combo Trio no topo (funcao cha() do cml-paginas#43 desligada com return; o compactador descarta o resto).
- Cartao de produto no celular: sobretitulo e preco antigo em 12 px (rem), numa linha; preco antigo ao lado do preco. Home: sobretitulo dos quadros e avaliacao do ranking em 12 px numa linha.
- Excecoes a regra de 14 px no celular, todas em rem para a etapa de letra minima nao mexer: faixa do topo, sobretitulo do cartao, preco antigo do cartao, sobretitulo dos quadros da home, avaliacao do ranking.


## 24/11, 17h25: publicacao e rascunho novo
- Thierry vai publicar o v19 (id 14955147) ele mesmo. A PARTIR DAI NAO MEXER MAIS NO 14955147.
- Rascunho novo: "Chef Mais Leve v20 (rascunho de ajustes)", id 14968778, copia do v19 com o pacote 82bac86. Todo ajuste novo vai nele (trocar o hash so no header.json do 14968778).
- Combo Trouxinhas (382766299): capa trocada para a foto dos 5 pacotes na palha (a colagem ficou como segunda foto). Os 5 pacotes parecem do mesmo sabor: ideal uma foto com os 5 sabores.
- Depois de publicado: ligar modelos ENCONTRE/PRESENTE/CORPORATIVO as categorias, menu (Seu espaco nativo, apagar 3 escondidos), apagar tema v17 (com aprovacao), medir o site no ar.


## 24/11, 17h50: v19 NO AR (publicado pelo Thierry). Tema v17 ja nao existe; ficam Tulum, v18 (penultimo), v19 (no ar), v20 (rascunho 14968778).
- No ar com o pacote 82bac86. Conferencia 390: sem vazamento, sem erro, faixa 34 px.
- PageSpeed celular NO AR: home 73 (LCP 3,8 s, TBT 330 ms), produto 71 (LCP 4,2 s, TBT 370 ms), chas 49 (LCP 5,9 s, TBT 1100 ms, CLS 0,047). Antes (v18): 27 e 31.
- Categorias ligadas aos modelos (painel): Encontre seu cha (41821547) -> ENCONTRE; Monte seu presente (42265942) -> PRESENTE. Antes mostravam so a lista padrao. Conferido no ar no celular.
- CORPORATIVO ainda NAO ligado: o v19 no ar monta os kits por script nessa pagina; ligar agora mostraria modelo + script juntos. No v20 (pacote 0ee1ba7) a montagem por script saiu (kits() com return). Ao publicar o v20: ligar a categoria 42104596 ao modelo CORPORATIVO na mesma hora.
- v20: category.PRESENTE.json com .ec-pr em flex-wrap (preco antigo vazava por baixo do botao).
- MENU: "Seu espaco" e um menu grande montado por script (ext-seu-espaco#0, com imagem e atalhos) e os itens Encontre/Monte/Clube sao usados pelo menu do celular como cartoes. Nao da para so cadastrar/apagar no painel: refazer o menu de forma nativa e um trabalho a parte. As reservas de lugar ficam ate la.


## 24/11, 18h10: v20 NO AR (pacote 0ee1ba7). Rascunho novo: v21, id 14969131. NAO MEXER MAIS no 14968778.
- Categoria Presentes corporativos (42104596) ligada ao modelo CORPORATIVO no painel; conferido no ar (celular e computador).
- ATENCAO, numeracao dos modulos: o numero usado no modulos.json e o do build (dist/mapa.json), que NAO e a posicao crua no arquivo. Conferir sempre no mapa.json (campo nome) antes de remover. Correcoes: o corretor de textos da Black e o cml-paginas#12 (bfMode), removido so a partir do pacote do v21 (no v19/v20 ele ainda roda, sem efeito, porque os textos ja saem certos); o corretor das perguntas frequentes e o cml-paginas#7.
- v21: textos das perguntas frequentes corrigidos no cadastro (home.json, page.json, product.json); removidos cml-paginas#7 e #12.

## 24/11, 19h: v21 (14969131) com pacote a12a1dd. v20 segue no ar com 0ee1ba7.
- Perguntas frequentes NATIVAS: as 6 perguntas que um script (extx-13, funcao m) montava por cima das do tema foram cadastradas no tema (home.json, page.json, product.json, itens faq-item_cml1..6; a 1a abre sozinha). Script desligado (TROCA), assim como o que embrulhava o texto (cml-extra, funcao faq). O visual (.cml-faq / .cml-open) foi passado no build para [id^="ns-section-faq"] e para o estado aberto do proprio tema (:has no conteudo sem display none). Removidos cml-paginas#7 (corretor de textos das perguntas) e #12 (bfMode).
- Frete gratis conferido nas regras da loja: R$ 249 vale para o ESTADO de SP (nao so capital). Corrigido nas perguntas e na janela "Frete gratis" (extx-01).
- Testado no v21, 390 e 1440: home, chas, ofertas, corporativos, produto, quem-somos, encontre: sem erro, sem vazamento, sem texto antigo; abrir e fechar pergunta funciona.
- DIVIDA que continua: /faq/ e montada inteira por script (cml-paginas#8), com perguntas proprias; na pagina de produto outro codigo esconde a secao nativa e monta as perguntas em 2 colunas (usa o texto nativo). Categoria de chas: script refaz o topo e poe a lateral (cml-extra#15, catPage) e a lista fica invisivel ate ele terminar (limite 1,6 s): e a causa da nota 49; conserto certo = modelo de categoria nativo. Menu "Seu espaco" por script (ext-seu-espaco#0).
- A confirmar com Thierry: WhatsApp da pergunta de revenda e 47 99272-6557 (diferente do oficial 47 9157-1974).
- 18h30: Thierry: WhatsApp e SEMPRE o oficial final 1974. Trocado na pergunta de revenda (3 modelos) e na pagina de contato (extx-13). Pacote do v21: 31edaf1. Pendente: cartao Telefone do contato ainda 99272-6557 (perguntado). Foto do Combo Trouxinhas: autorizado gerar no Gemini.
- 23h45: telefone do contato tambem 1974 (extx-13). Pacote do v21: 85537a3. v21 ainda nao publicado (v20 no ar); v18 ja nao existe na lista de temas.
- 24/11 23h55: combos de opcao unica (lar, trx, blm) ganham a lista do que vem no combo (campo inc + ul.of3-in) no lugar das opcoes, para o cartao nao ficar vazio no celular. Pacote do v21: 31c173c. Vazio restante no celular: lar 92, blm 73, flw 91 px (antes ~330). Foto do combo Trouxinhas: IA falhou 2x (inventou embalagem/sabores); feita versao da foto real com nome dos sabores, aguardando ok do Thierry para subir.

## 26/11, 11h: v21 NO AR (14969131, pacote 31c173c). NAO MEXER. Penultimo: v20 (14968778). Rascunho novo: v22 "rascunho de velocidade" (id na lista de temas).
- PageSpeed da home rodado pelo Thierry 26/11 11h04. LABORATORIO celular: nota 85, LCP 3,6 s, TBT 30 ms, CLS 0,004. LABORATORIO computador: nota 63, LCP 1,1 s, TBT 660 ms, CLS 0,112.
- "Reprovado" vem dos dados de USUARIOS REAIS (28 dias, a maior parte ainda do site antigo): celular LCP 2,1 s (ok), INP 441 ms (ruim, meta 200), CLS 0,31 (ruim, meta 0,1); computador LCP 1,6, INP 99, CLS 0,16 (reprova pelo CLS).
- Plano v22: 1) CLS no computador (0,112: achar o que desloca); 2) TBT no computador (660 ms: pacote 673 KB roda tudo em toda pagina; separar por tipo de pagina); 3) INP no celular (toque lento: observadores na pagina inteira); 4) paginas montadas por script viram modelo nativo (chas, /faq/, produto); 5) LCP celular 3,6 s (CSS 578 KB bloqueando, imagem principal).

## 26/11, 12h: v22 (id 14983481, "rascunho de velocidade"), pacote b634e33. v21 no ar com 31c173c.
Pedido do Thierry 26/11 11h40 (paginas de destaque e de cha). FEITO no v22: faixas "1, 2, 3 pacotes" removidas das paginas de cha e faixas de volume da Laranja (TROCA em cx11, funcao tiers); so sobra faixa quando ha promocao real "Compre X pague Y" (ex.: Intenso ainda mostra, conferir se a promocao existe mesmo). Durex conferido: sem faixas, campo de quantidade e botao visiveis.
DIAGNOSTICO (causas na origem):
- Avaliacoes somem nas paginas de destaque porque a pagina e montada por script (cml-destaque buildDst = .cml-dst) e a secao nativa do produto (#ns-section-main_product), onde o app de avaliacoes mora (slot product_after_description, [class*="mi-@container"]), e jogada para fora da tela (cml-paginas#59 cx12: body.cx12-nomain e body:has(#cml-dst)). extx-00 cria o quadro .cml-rev dentro da secao nativa; cml-destaque tem reviews()/rvRender() esperando .cml-rev.
- Destaques (DATA em cml-destaque): laranja-choco-leve, kit-ternura1, kit-desdobramento-l1xs1, kit-flowers, kitl-natal-feliz, infusao-trouxinha-de-abacaxi, infusao-rose-na-tangerina. Camadas por cima: cx11 (#57), cx12 (#59), cx17 (#69, escolha "Quantidade 10 un./5 un." + "Comprar agora").
- Laranja (produto 224675737): a variacao se chama "Quantidade" com valores "10 un." e "5 un." NO CADASTRO do produto. Conserto na origem: renomear atributo para "Embalagem" e valores "Caixa com 10 fatias" / "Pacote com 5 fatias" (update_product attributes + variants.values). ANTES: conferir codigos que usam "10 un"/"5 un" (grep deu so o CSS do cx12) e o Bling.
- Cha Durex (produto 345698613, lata 80 g, ~40 xicaras, R$ 79): o bloco "Quanto mais latas, mais rende" esta NA DESCRICAO do produto (HTML antigo: <style> de 9 KB para variacoes que nao existem mais + .cml-side com "Leve mais latas e pague menos por xicara" + .cpv-ladder com precos velhos R$ 99/178/252/396). Conserto na origem: reescrever a descricao (tirar style, pill e escada; por o comparativo cafeteria x Chef). cml-extra#16 transforma .cpv-ladder em .c3-rg (vira codigo morto depois).
- Ordem "Veja tambem" x "Perguntas": secoes nativas em product.json: main_product, product_description, alternative_products, faq_1782866913206 (inverter as duas ultimas no "order"); a pergunta em 2 colunas (cx11 faq, .cx11-faq) e montada por script.
PLANO CERTO (sem mascara): pagina de destaque nativa = modelo de produto proprio por destaque (como fiz com as categorias), secao nativa do produto visivel (galeria, variacao, quantidade, avaliacoes do app), blocos de historia como secoes do tema, perguntas nativas, "Veja tambem" por ultimo; depois apagar a entrada do DATA e as camadas cx12/cx17 dessas paginas. Comecar pela Laranja (piloto), depois Desdobramento e os demais.
Comparativo pedido (enxuto): "Quanto custa uma xicara?" cafeteria: cafe especial R$ 14 a 17, cha R$ 7 a 14 (numeros do Thierry, conferir fonte); Chef: preco / xicaras (Durex 79/40 = R$ 1,98; cha misto 40 g rende ate 20 xicaras).

## 26/11, 12h15: v22 (14983481) pacote 9bf2a31.
- Comparativo "Quanto custa uma xicara?" em toda a linha de cha misto (cx11, funcao xic; so nomes com peso "NNg", fora combo/kit; xicaras = gramas/2; preco lido da pagina). Estilo .cx11-xic no ajustes.css. Testado no v22: Durex R$ 1,98 (40 xicaras), Intenso R$ 1,75 (20 xicaras); celular 390 e computador sem vazamento. Valores de cafeteria (cafe R$ 14 a 17, cha R$ 7 a 14) sao os do Thierry, SEM fonte conferida.
- DADOS NO AR alterados (valem ja no v21): descricao do Durex (345698613) reescrita sem o <style> de variacoes, sem "Leve mais latas" e sem a escada de precos antigos; ficou so o estilo do bloco da historia (cpv-story). Laranja (224675737): atributo "Quantidade" -> "Embalagem"; 1001604994 "10 un." -> "Caixa com 10 fatias"; 1644205966 "5 un." -> "Pacote com 5 fatias" (esta sem SKU).
- Os chas mistos de 40 g tem promocao real "Compre 10 e pague 6", por isso continuam com as faixas 1 / 3 / 10 pacotes.
- PROXIMO: Laranja como piloto de pagina de destaque nativa (avaliacoes, embalagem + quantidade, mais contexto, perguntas acima do Veja tambem); depois as outras 6; depois velocidade (CLS e TBT no computador). cml-extra#16 (escada c3-rg) virou codigo sem uso: remover no pacote.

## 26/11, 12h10: INCIDENTE. Ao renomear a variacao da Laranja (Quantidade -> Embalagem) o kit "Natal Feliz" (produto tipo KIT da Nuvemshop, id 379081240, /admin/kits/379081240, contem a Laranja com essa propriedade) ficou OCULTO sozinho (404 no site). Corrigido: visibilidade "Visivel" de novo e salvo no painel; pagina 200, preco R$ 289,08, aparece na lista de kits. LICAO: produtos tipo kit dependem das variacoes dos componentes; NAO mexer em cadastro de produto no ar sem checar kits que o usam e sem aprovacao separada do Thierry. Thierry pediu: tudo no rascunho, nada no ar. Produtos tipo kit nao aparecem nas ferramentas de listagem (so no painel).
- 12h20: v22 pacote 9654d05: campo de quantidade (.cx17-q) abaixo da Embalagem na pagina de destaque da Laranja, ligado ao campo do tema e a barra fixa. Testado 390 e computador (valor chega no campo do tema); NAO testado ate a sacola. Falta na Laranja: avaliacoes, mais contexto, perguntas acima do Veja tambem (pagina nativa).
- 12h30: v22 pacote 091819c: salto ao trocar a embalagem resolvido na causa (o tema chama scrollIntoView na foto da galeria ao trocar variacao, store.js changeVariant; o cx17 brigava com scrollTo). Agora a rolagem e anulada so durante o clique e a briga (fix) saiu. Medido: computador y parado em 229, celular parado; preco troca certo. Pendente de resposta do Thierry: apagar 6 kits corporativos antigos ocultos (381152450, 381152464, 381152487, 381152499, 381152515, 381152535), Clube Chef (5 ocultos, 2 duplicados) e Natal Feliz (pedido manual).
- 26/11 12h45: Thierry: NAO mexer no Clube Chef nem no Natal Feliz (pedido manual). Apagados da loja (com ok) os 6 kits corporativos antigos ocultos de 14/11; tirados da tabela de nomes no pacote.
- v22 pacote 23a6a21: avaliacoes nas paginas de destaque (cml-destaque rvRoot cria .blk.cml-rev no fim de #cml-dst .dw e move o quadro do aplicativo para la; reviews() monta o carrossel rv2); Laranja: 5,0 e 27 avaliacoes, celular e computador. Perguntas frequentes (cx11-faq) agora entram ANTES do "Veja tambem" em todas as paginas de produto. Botao "Adicionar avaliacao" com 10 px.
- Falta: "mais contexto" na Laranja; conferir as outras 6 paginas de destaque; pagina nativa (obra maior) e velocidade no computador (CLS 0,112, TBT 660 ms).
- 26/11 13h: v22 pacote f9b1066. Janela de compra rapida (#quickshop-modal, nativa do tema, abre no botao Comprar dos cartoes) padronizada no ajustes.css: compacta (cabe numa tela no celular: 622 de 680), cantos 10/12/16 px, nome 22 px, preco numa linha, foto 210 px no celular, fechar em quadro 40 px, espaco vazio do cashback escondido tirado. Conferido celular 390 e computador. CUIDADO: nao por gap em ".grid" generico dentro do modal (quebra o campo de quantidade).
- Conferencia das paginas de destaque no v22 (celular): avaliacoes aparecem em Ternura (28), Desdobramento (15), Trouxinha de Abacaxi (10), Laranja (27). Natal Feliz: sem avaliacoes cadastradas (quadro nao aparece). Erros de console vistos: so gtag bloqueado e aviso "ResizeObserver loop" (inofensivos).

## 26/11, 13h30: v22 PUBLICADO pelo Thierry (14983481, pacote f9b1066). NAO MEXER. Rascunho novo: v23 (id 14984225), pacote f183c1f.
- PageSpeed computador da home no v22 (rodado 12h40): nota 88, LCP 1,2 s, TBT 220 ms, CLS 0,003 (antes 63 / 660 ms / 0,112). Medicao propria a 1440 px: CLS 0,001.
- v23: abas da compra rapida (extx-01): Chas mistos (/chas/cha-misto/), Cha na fruta, Granolas, Frutas desidratadas (/snacks-granolas/snacks-saudaveis/, que inclui Stroopwafel), Chocoleve, Kits, Acessorios; limite fixo de 6 abas removido. Testado celular e computador (11, 7, 4, 5, 4, 9, 8 produtos). No celular as abas ocupam 3 linhas.
- CASHBACK (pergunta do Thierry): cupons CB... do Cashing estao sendo gerados, validos, combinam com outros descontos, MAS exigem compra minima de R$ 199 (min_price 199). Provavel motivo de "nao funciona". Cada ponto vale R$ 0,05 (683 pontos = R$ 34,15); ha um cupom de R$ 0,05 gerado (alguem digitou 1 ponto). A janela "Gerar cupom" e do aplicativo Cashing (nao e do tema). Thierry quer resgate direto do valor todo, sem digitar pontos: ver no painel do Cashing se ha configuracao; NAO feito ainda.
- 26/11 13h45: v23 pacote 058e903: sacola (bloco cml-fg) ganha linha do cashback: abaixo de R$ 199 em produtos mostra 'da para usar em pedidos acima de R$ 199. Faltam R$ X'; acima mostra 'Cashback liberado'. Pergunta nativa 'Como uso meu cashback?' (faq-item_cml7, 3a posicao) em home, pagina e produto do v23. Conferido no celular com sacola de R$ 280 (liberado); o caso abaixo de 199 nao foi visto na tela. A pagina /politica-de-cashback/ nao foi alterada.
- 26/11 15h50 (Thierry): a regra do cashback NAO fica na sacola (ele quer a sacola limpa). Saiu do cml-fg (troca e estilo removidos, pacote 25d88c7). Agora e uma secao do proprio tema na pagina do carrinho /comprar/ (templates/pages/cart.json do v23: custom_cashback, antes de cart_form), texto fixo: 'Tem cashback? Use em pedidos acima de R$ 199 em produtos: toque em Usar agora e gere o cupom.' Fica no topo da pagina do carrinho (o tema nao deixa por bloco dentro do quadro do cupom). Alinhado com o carrinho no celular e no computador. v23 ainda rascunho.
