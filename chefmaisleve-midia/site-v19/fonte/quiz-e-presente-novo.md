# Encontre seu chá e Monte seu presente: versão enxuta e nativa (decidido com o Thierry em 24/11/2026)

## Decisões do Thierry
- As duas páginas no MESMO modelo: banner fino informativo + bloco interativo compacto, perto de uma tela, muito respiro, nada poluído.
- Encontre seu chá: manter os 3 jeitos de escolher (momento, sabor, ingrediente), só que compacto; os chás aparecem logo abaixo.
- Monte seu presente: "guiado e nativo": 3 passos na mesma tela (caixa, recheio, cartão), cada passo com produtos da loja e o botão de compra do próprio tema. Sai o botão único que põe tudo na sacola e a multiplicação por pessoas.
- Não mexer no site publicado; tudo no rascunho 14955147; depois validar e publicar.
- Regras gerais: documento "Design web Chef Mais Leve: regras e método" (nativo primeiro, sem máscara via script, cantos 10 px, banner das demais páginas 1080x540 celular / 1920x320 computador, até 120 KB).

## O que já sei (técnico)
- /encontre-seu-cha/ hoje é uma CATEGORIA (modelo category.json padrão) praticamente sem produtos; o pacote injeta herói 480 px + faixa + quiz 537 px + FAQ + CTA (página com 2972 px no computador). Quiz atual vem da função Supabase cml-finder (24 KB).
- /presentes-de-natal/ é uma PÁGINA de conteúdo (page.json) + função cml-natal (75 KB).
- O tema aceita modelo alternativo por categoria: ver templates/pages/category.CHOCOLEVE.json = ordem [custom (bloco code) , product_list (type main-products-grid, columns 4, columns_mobile 2, horizontal_padding 8, pagination classic, section_width full, vertical_padding 0), custom]. FALTA descobrir onde se liga o modelo à categoria (painel Nuvemshop > Produtos > Categorias > editar, ou editor do tema) e se a ligação vale por tema (ideal) ou para a loja toda (risco no publicado).
- Para os chás aparecerem como cartões nativos, os 11 chás mistos precisam estar na categoria da página (ferramenta assign_categories). No publicado a lista nativa dessa categoria fica escondida, então não muda nada à vista.

## Dados do quiz (slug | sabor | cafeína | momentos | ingredientes principais)
serenissimo (cha-blend-serenissimo) | floral | sem | noite, refeicao | Melissa, Camomila, Mulungu, Passiflora, Maçã
intenso (cha-blend-intenso) | frutado | sem | gelado | Hibisco, Amora branca, Maçã, Morango, Cranberry
quentao (cha-blend-quentao) | especiado | sem | frio, noite | Maçã, Hibisco, Canela, Uva passa, Abacaxi
sport-recovery | herbal | com | treino, gelado | Capim-limão, Eucalipto, Chá mate tostado, Hibisco, Pimenta rosa
imuny | especiado | sem | frio | Equinácea, Rosa mosqueta, Gengibre, Canela, Cravo
cha-estetica-equilibrio-digestivo | f? | com | manha, refeicao | Amora branca, Camomila, Nibs de cacau, Hibisco, Pimenta rosa
cha-maturidade-plena---menopausa | f? | sem | feminina, manha | Folha de amora, Camomila, Hibisco, Alfazema, Anis-estrelado
cha-business-performance | herbal | com | foco, manha | Chá verde, Alecrim, Gengibre, Capim-limão, Pimenta rosa
cha-maternidade-lactacao | herbal | sem | materna | Jasmim, Erva-doce, Feno-grego, Endro, Camomila
cha-ciclo-harmonia---fase-fertil | herbal | sem | feminina | Folha de amora, Hortelã, Erva-doce, Camomila, Artemísia
cha-maternidade-gestacao | f? | sem | materna, noite | Melissa, Erva-doce, Camomila, Maçã, Casca de laranja
(os "f?" e os slugs sem prefixo precisam ser conferidos de novo na função cml-finder: var B, campo 2 = slug, campo 4 = sabor, campo 6 = momentos, campo 7 = cafeína, campo 9 = ingredientes)
Momentos: noite "Para a noite", manha "Manhã", foco "Foco no trabalho", treino "Pós-treino", frio "Dias frios", gelado "Gelado no calor", refeicao "Depois das refeições", feminina "Fase feminina", materna "Fase materna".
Sabores: floral, frutado, especiado, herbal.

## Dados de uso (29/10 a 23/11)
- 22 pedidos pagos com caixa de presente ou cartão (R$ 9.948, ticket R$ 452; loja R$ 258). Caixa de madeira premium em 17.
- Quiz: nenhum registro de uso. Google Analytics pela conexão Windsor não devolveu dados (ids na página: G-SZQLRZ599B e G-N2J36840S3).

## Próximos passos
1. Descobrir como ligar um modelo alternativo a uma categoria sem afetar o publicado.
2. Criar category.ENCONTRE.json (banner fino + quiz compacto em bloco code + grade nativa) e colocar os 11 chás na categoria.
3. Tirar do pacote os módulos do quiz antigo (cef) e a chamada da função cml-finder.
4. Monte seu presente: categoria com 3 passos (caixas, recheio, cartão) no mesmo modelo; tirar natPre/natSkel/natHooks e a função cml-natal do pacote.
5. Validar celular e computador, medir velocidade, relatório com provas.

## Andamento em 24/11 (00h40)
- Thierry autorizou: (1) colocar os 11 chás na categoria "Encontre seu chá"; (2) transformar o Monte seu presente em categoria.
- FEITO: os 11 chás mistos estão na categoria Encontre seu chá (id 41821547). Ids dos produtos: 224678493 serenissimo, 224678609 sport-recovery, 228278848 intenso, 273215028 imuny, 343019488 gestacao, 343019491 lactacao, 343019493 ciclo-harmonia, 343019494 maturidade, 343019497 business, 343019505 estetica, 350838426 quentao. Para desfazer: painel Nuvemshop > produto > tirar a categoria (a ferramenta só adiciona). No publicado nada mudou à vista (lista nativa continua escondida; conferido no computador e no celular).
- FEITO: templates/pages/category.ENCONTRE.json no rascunho 14955147 (seção custom "Encontre seu cha: banner e quiz" com bloco code + main-products-grid). Lógica conferida na prévia do editor: "Para a noite" = 3 chás, "Camomila" = 6 chás.
- COMO VER: painel > Loja online > Layout > "Editar rascunho" do v19 > seletor de página no topo > Categoria > ENCONTRE > "Visualizar" > Encontre seu chá. Endereço direto: /admin/brand-editor/themes/14955147?template=pages/category.ENCONTRE&resource=41821547 . A prévia é um iframe srcdoc (dá para ler o DOM pelo contentDocument). O botão "Celular" do editor mostra a versão de celular.
- LIGAÇÃO do modelo à categoria: painel > Produtos > Categorias > editar > campo "Modelo" só lista os modelos do tema PUBLICADO (hoje: principal e CHOCOLEVE). O editor mostra "Atribuídas (0)" e tem "Adicionar categorias" (não testei; pode ligar pela loja toda). Decisão: ligar só depois de publicar o rascunho.
- FALTA no quiz: (a) tirar do pacote o quiz antigo: a regra de estilo `html:has(>head>link[rel=canonical][href$="/encontre-seu-cha/"]) :is(#ns-section-category_hero,#ns-section-product_list)` esconde a grade nativa (por isso os cartões não aparecem na prévia), o cml-paginas.js cita "cml-cef" 226 vezes e carrega a função cml-finder; cml-extra.js cita cml-finder 3 vezes. (b) o pacote põe a classe c6-gold (laranja) no botão de aba ativo: trocar a cor da aba ativa no bloco para laranja #a65a14, para ficar igual com ou sem pacote. (c) conferir filtros/ordenar nativos da grade (regra do Thierry: sem coluna lateral). (d) prévia de celular, velocidade e relatório.
- Categorias úteis para o Monte seu presente: Kits (38689671) > Sazonais (39687462) > "Para o Natal" (39687463); "Presentes corporativos" (42104596). Categoria "Chá misto" = 42234051. Produtos do montador: Caixa de madeira premium (377539173), Caixa de madeira compacta (377539289), Cartão Presente (371646209), Embalagem de Presente P (351015840), kits Ternura (313665100), Flowers (343280690), Materna.
- Supabase: ficou uma linha de cópia `v2-cml-paginas-bkp-20261123natal` em cml_assets (sem efeito; entra na limpeza quando o Thierry autorizar apagar).
