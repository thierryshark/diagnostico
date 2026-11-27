/* 0) cabecalho unico: pilulas (a base fica no CSS do tema) */
;(function(){if(document.getElementById("cml-cab"))return;var s=document.createElement("style");s.id="cml-cab";s.textContent=".product-item-more-images-message{display:none!important}.js-head-main .js-nav-desktop-list>li:is(.cml-nv-cef,.cml-nv-gift,.cml-nv-club),.js-head-main .js-nav-desktop-list>li:has(>a[href*=encontre-seu-cha]),.js-head-main .js-nav-desktop-list>li:has(>a[href*=presentes-de-natal]),.js-head-main .js-nav-desktop-list>li:has(>a[href*=clube-chef]){display:none!important}.product-item-slider-controls-container{opacity:0!important;width:30px!important;height:30px!important;min-width:0!important;padding:0!important;background:rgba(255,250,245,.88)!important;border:0!important;box-shadow:none!important;transition:opacity .2s!important}.product-item-slider-controls-container svg{width:11px!important;height:11px!important}.js-item-product:hover .product-item-slider-controls-container{opacity:1!important}@media (hover:none),(max-width:767px){.product-item-slider-controls-container{display:none!important}}.js-head-main .js-nav-desktop-list>li:is(.cml-nv-cef,.cml-nv-blk,.cml-nv-gift,.cml-nv-club)>a{border-radius:10px!important;box-shadow:none!important;background-image:none!important;text-shadow:none!important;font-weight:500!important;transition:none!important}.js-head-main .js-nav-desktop-list>li:is(.cml-nv-cef,.cml-nv-club)>a{background:#fffaf5!important;border:1px solid #d9c9b5!important}.js-head-main .js-nav-desktop-list>li.cml-nv-gift>a{background:#565229!important;border:1px solid #565229!important}.js-head-main .js-nav-desktop-list>li.cml-nv-gift>a,.js-head-main .js-nav-desktop-list>li.cml-nv-gift>a *{color:#f6efe9!important}.js-head-main .js-nav-desktop-list>li.cml-nv-blk>a{background:#0b0a08!important;border:1px solid #0b0a08!important}.js-head-main .js-nav-desktop-list>li.cml-nv-blk>a,.js-head-main .js-nav-desktop-list>li.cml-nv-blk>a *{color:#f3d48b!important}.js-head-main .js-nav-desktop-list>li:is(.cml-nv-cef,.cml-nv-blk,.cml-nv-gift,.cml-nv-club)>a::before{display:none!important}.js-head-main .js-nav-desktop-list .cml-nv-new{display:none!important}";(document.head||document.documentElement).appendChild(s)})();
/* 21/11/2026: categorias sem "piscar" o formato antigo. O banner e a vitrine ficam invisiveis (mantendo o espaco) ate a montagem
   da lateral e do banner terminar (classe c2-ready, posta pelo cml-extra). Seguranca: aparecem sozinhos em 2,5 s se algo falhar. */
;(function(){try{var D=document;if(D.getElementById("cml-catwait"))return;var s=D.createElement("style");s.id="cml-catwait";s.textContent="html.cml-blk body.template-category:not(.c2-ready) :is(#ns-section-category_hero,#ns-section-product_list){opacity:0!important}html.cml-blk body .cml-cgrid.c2-has>.filters-controls-content{display:none!important}@media(min-width:1300px){html body #ns-section-footer .footer-main-info:not(#q1):not(#q2){max-width:calc(var(--cmlw) - 32px)!important}}";(D.head||D.documentElement).appendChild(s);function ok(){try{D.body&&D.body.classList.add("c2-ready")}catch(e){}}setTimeout(ok,2500);addEventListener("load",function(){setTimeout(ok,600)})}catch(e){}})();

/* 17/11/2026: setas e bolinhas dos carrosseis. Sairam do CSS personalizado do tema (limite de 15.000 caracteres) para abrir espaco ao CSS critico do cabecalho. Entram logo antes do CSS do tema, para as regras de celular dele continuarem valendo por cima. */
;(function(){try{var D=document;if(D.getElementById("cml-css-carrossel"))return;var s=D.createElement("style");s.id="cml-css-carrossel";s.textContent=".swiper-pagination-bullet{width:11px!important;height:11px!important;margin:0 5px!important;border-radius:999px!important;background:#d8cbbd!important;opacity:1!important;border:0!important;transition:width .35s ease,background .35s}.swiper-pagination-bullet-active{width:32px!important;background:#565229!important}.swiper-pagination{position:relative!important;margin-top:18px;bottom:auto!important}:is(.swiper-button-prev,.swiper-button-next){width:40px!important;height:40px!important;border-radius:50%!important;background:rgba(255,250,245,.86)!important;border:1px solid rgba(86,82,41,.22)!important;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);color:#2b2916!important;box-shadow:none!important;display:flex!important;align-items:center;justify-content:center;transition:background .2s,transform .2s}:is(.swiper-button-prev,.swiper-button-next):hover{background:#565229!important;border-color:#565229!important;color:#2b2916!important}:is(.swiper-button-prev,.swiper-button-next):hover svg{fill:#f6efe9}:is(.swiper-button-prev,.swiper-button-next)::after{display:none}:is(.swiper-button-prev,.swiper-button-next) svg{width:14px!important;height:14px!important;fill:currentColor!important}:is(.swiper-button-prev,.swiper-button-next).swiper-button-lock,:is(.swiper-button-prev,.swiper-button-next).d-none,.swiper-pagination-lock{display:none!important}";var c=D.getElementById("custom-theme-css");if(c&&c.parentNode)c.parentNode.insertBefore(s,c);else(D.head||D.documentElement).appendChild(s)}catch(e){}})();
/* Modo claro: guarda as sombras (shadow DOM) para o modo claro conseguir clarear tambem o que fica dentro delas. So age com o modo claro ligado. */
;(function(){try{if(window.__cmlSRp)return;window.__cmlSRp=1;if(/[?&]tema=claro/.test(location.search)||localStorage.getItem("cml-tema")==="claro"&&false){var a=Element.prototype.attachShadow;Element.prototype.attachShadow=function(o){var r=a.call(this,o);(window.__cmlSR=window.__cmlSR||[]).push(r);return r}}}catch(e){}})();
/* Chef Mais Leve: cml-paginas v1 (09/11/2026, rodada 4)
   1) Rodape: as bandeiras de pagamento saem do "segundo rodape" (bloco do tema) e entram no rodape da marca, numa linha com o copyright.
   2) Menu do computador: o painel das categorias vira um "mega menu" com colunas e um cartao de atalho a direita.
   3) FAQ (/faq/): perguntas em sanfona no padrao, agrupadas por assunto, com busca; o bloco duplicado do tema some.
   4) Contato (/contato/): atalhos de autoatendimento + chamada forte do WhatsApp; formulario em duas colunas no computador.
   5) Encontre seu cha (/encontre-seu-cha/): papel claro com textura, moldura com filete, cartoes brancos, pilula dourada.
   6) Minha conta (/account/): rastreio do pedido dentro da pagina (cartao e pop-up Ver status), via funcao cml-rastreio; links "Rastrear pedido" apontam para a conta.
   7) Sacola (carrinho lateral) enxuta: sem subtotal e custo de frete separados, sem "Ver mais produtos" e aviso de feriados, sem o "compre junto"; faixa do cashback legivel no tema escuro.
   Para desligar um item: apagar a funcao da lista em tick(). */
(function () {
  if (window.__cmlPag) return; window.__cmlPag = 1;
  var D = document, P = location.pathname;
  var G = "#a65a14", GL = "#a65a14", INK = "#f6efe9";
  var GRAIN = "url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")";

  var CSS = [
  /* ---------- rodape: bandeiras dentro do rodape da marca ---------- */
  "html body #ns-section-footer.cml-fx-on .footer-secondary-info{display:none!important}",
  "html body .c7-ft .cml-fx{grid-column:1/-1;display:flex;flex-wrap:wrap;align-items:center;gap:10px 18px;margin-top:6px;padding-top:16px;border-top:1px solid rgba(166,90,20,.16)}",
  "html body .c7-ft .cml-fx .lb{font:500 10px/1.2 Poppins,sans-serif!important;letter-spacing:.22em!important;text-transform:uppercase!important;color:#a65a14!important}",
  "html body .c7-ft .cml-fx .footer-logos-wrapper{display:flex!important;flex-wrap:wrap;gap:6px;margin:0!important}",
  "html body .c7-ft .cml-fx .footer-logos-wrapper img{height:22px!important;width:auto!important;max-width:36px;border-radius:5px;background:#fff;padding:2px 4px;box-sizing:border-box;opacity:.92}",
  "html body .c7-ft .cml-fx .footer-copyright{margin-left:auto;font:300 11px/1.5 Poppins,sans-serif!important;color:rgba(43,41,22,.6)!important;opacity:1!important}",
  "@media (max-width:640px){html body .c7-ft .cml-fx{gap:10px 12px}html body .c7-ft .cml-fx .footer-copyright{margin-left:0;flex-basis:100%}html body .c7-ft .cml-fx .footer-logos-wrapper img{height:20px!important}}",

  /* ---------- mega menu (computador) ---------- */
  "@media (min-width:1024px){",
  "html.cml-blk body .nav-desktop .desktop-dropdown{background:rgba(255,250,245,.96)!important;border-bottom:1px solid rgba(166,90,20,.22);box-shadow:0 40px 80px -40px rgba(43,41,22,.2);padding:0!important;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}",
  "html.cml-blk body .nav-desktop .desktop-dropdown>.container{display:grid!important;grid-template-columns:minmax(0,1fr) 300px;gap:36px 48px;align-items:stretch;max-width:1140px;padding:30px 24px 32px!important}",
  "html.cml-blk body .nav-desktop .desktop-dropdown .desktop-list-subitems{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(150px,max-content));gap:18px 52px!important;align-content:start;margin:0!important;padding:4px 0 0!important}",
  "html.cml-blk body .nav-desktop .desktop-dropdown .desktop-list-subitems>li{width:auto!important;min-width:0}",
  "html.cml-blk body .nav-desktop .desktop-dropdown>.container>.desktop-list-subitems{grid-column:1!important;grid-row:1!important}",
  "html.cml-blk body .nav-desktop .desktop-dropdown>.container>.cml-mm-side{grid-column:2!important;grid-row:1!important}",
  "html.cml-blk body .nav-desktop .desktop-dropdown .nav-list-link-heading{display:block;margin:0 0 8px!important;padding:0 0 8px!important;font:500 10.5px/1.2 Poppins,sans-serif!important;letter-spacing:.22em!important;text-transform:uppercase!important;color:#a65a14!important;border-bottom:1px solid rgba(166,90,20,.18)}",
  "html.cml-blk body .nav-desktop .desktop-dropdown .list-subitems a{display:inline-flex;align-items:center;gap:6px;padding:6px 0!important;font:300 14.5px/1.3 Poppins,sans-serif!important;color:rgba(43,41,22,.86)!important;transition:color .18s,transform .18s}",
  "html.cml-blk body .nav-desktop .desktop-dropdown .list-subitems a:hover{color:#a65a14!important;transform:translateX(3px)}",
  "html.cml-blk body .nav-desktop .desktop-dropdown .list-subitems a:after{content:'\\203A';color:#a65a14;opacity:0;transition:opacity .18s}",
  "html.cml-blk body .nav-desktop .desktop-dropdown .list-subitems a:hover:after{opacity:1}",
  /* cartao lateral */
  "html.cml-blk body .cml-mm-side{position:relative;isolation:isolate;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;gap:10px;min-height:210px;padding:22px 22px 20px;border-radius:20px;border:1px solid rgba(166,90,20,.26);background:radial-gradient(120% 100% at 20% 0%,#fffaf5 0%,#f6efe9 55%,#f6efe9 100%);color:" + INK + ";font-family:Poppins,sans-serif;box-shadow:inset 0 1px 0 rgba(43,41,22,.06)}",
  "html.cml-blk body .cml-mm-side:after{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.11;mix-blend-mode:screen;background-image:" + GRAIN + ";background-size:220px}",
  "html.cml-blk body .cml-mm-side .k{font:500 10px/1.2 Poppins,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#a65a14}",
  "html.cml-blk body .cml-mm-side h4{margin:0;font:700 20px/1.15 Poppins,sans-serif;color:#2b2916;letter-spacing:-.01em}",
  "html.cml-blk body .cml-mm-side h4 em{font-weight:300;font-style:italic;color:#a65a14}",
  "html.cml-blk body .cml-mm-side p{margin:0 0 4px;font:300 12.5px/1.5 Poppins,sans-serif;color:rgba(43,41,22,.72)}",
  "html.cml-blk body .nav-desktop .desktop-dropdown .cml-mm-side a.b:not(#cmlx){background:" + G + "!important;color:#f6efe9!important;display:inline-flex;align-items:center;justify-content:center;gap:8px;align-self:flex-start;min-height:40px;padding:0 18px;border-radius:999px;background:" + G + ";color:#f6efe9!important;font:600 13px/1 Poppins,sans-serif;text-decoration:none!important;box-shadow:0 10px 22px -14px rgba(166,90,20,.8);transition:transform .18s,filter .18s}",
  "html.cml-blk body .nav-desktop .desktop-dropdown .cml-mm-side a.b:not(#cmlx):hover{transform:translateY(-1px);filter:brightness(1.06)}",
  "html.cml-blk body .nav-desktop .desktop-dropdown .cml-mm-side a.l:not(#cmlx){background:transparent!important;display:inline-flex;align-items:center;gap:6px;font:400 12.5px/1 Poppins,sans-serif;color:#a65a14!important;text-decoration:none!important;border-bottom:1px solid rgba(166,90,20,.45);padding-bottom:2px;align-self:flex-start}",
  "}",

  /* ---------- FAQ ---------- */
  "html body.cml-fqp .section-page-header{display:none!important}",
  "html body.cml-fqp .section-faq,html body.cml-fqp .section-divider.c5-rv{display:none!important}",
  "html body.cml-fqp .page-content>div>div.cml-fq-hid{display:none!important}",
  "html body .cml-fq{max-width:860px;margin:10px auto 0;font-family:Poppins,sans-serif;color:" + INK + "}",
  "html body .cml-fq-top{display:flex;flex-direction:column;align-items:stretch;gap:12px;margin:0 0 22px}",
  "html body .cml-fq-tabs{display:flex;flex-wrap:nowrap;gap:8px;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:2px}",
  "html body .cml-fq-tabs::-webkit-scrollbar{display:none}",
  "html body .cml-fq-tabs button{flex:none;min-height:36px;padding:0 16px;border-radius:999px;border:1px solid rgba(166,90,20,.3);background:rgba(43,41,22,.04);color:" + INK + ";font:500 12.5px/1 Poppins,sans-serif;cursor:pointer;transition:background .18s,color .18s,border-color .18s;white-space:nowrap}",
  "html body .cml-fq-tabs button:hover{border-color:" + G + "}",
  "html body .cml-fq-tabs button[aria-pressed=true]{background:" + G + ";border-color:" + G + ";color:#f6efe9}",
  "html body .cml-fq-s{position:relative;order:-1;max-width:none}",
  "html body .cml-fq-s input{width:100%;min-height:40px;padding:0 14px 0 40px;border-radius:999px;border:1px solid rgba(166,90,20,.3);background:rgba(43,41,22,.05);color:" + INK + ";font:300 14px/1 Poppins,sans-serif;outline:0;box-sizing:border-box}",
  "html body .cml-fq-s input::placeholder{color:rgba(43,41,22,.5)}",
  "html body .cml-fq-s input:focus{border-color:" + G + ";box-shadow:0 0 0 3px rgba(166,90,20,.18)}",
  "html body .cml-fq-s svg{position:absolute;left:14px;top:50%;width:16px;height:16px;transform:translateY(-50%);color:#a65a14;pointer-events:none}",
  "html body .cml-fq-g{margin:0 0 26px}",
  "html body .cml-fq-g>h3:not(#cmlx):not(#cmly){margin:0 0 6px!important;font:500 10.5px/1.2 Poppins,sans-serif!important;letter-spacing:.22em!important;text-transform:uppercase!important;color:#a65a14!important}",
  "html body .cml-fq-it{border-bottom:1px solid rgba(166,90,20,.16)}",
  "html body .cml-fq-it summary{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 2px;cursor:pointer;font:500 15.5px/1.35 Poppins,sans-serif!important;color:" + INK + "!important;transition:color .18s}",
  "html body .cml-fq-it summary::-webkit-details-marker{display:none}",
  "html body .cml-fq-it summary:hover,html body .cml-fq-it[open] summary{color:#a65a14!important}",
  "html body .cml-fq-it summary i{flex:none;position:relative;width:26px;height:26px;border-radius:50%;border:1px solid rgba(166,90,20,.45);transition:transform .25s,background .2s}",
  "html body .cml-fq-it summary i:before,html body .cml-fq-it summary i:after{content:'';position:absolute;left:50%;top:50%;width:10px;height:1.5px;background:" + G + ";transform:translate(-50%,-50%)}",
  "html body .cml-fq-it summary i:after{transform:translate(-50%,-50%) rotate(90deg)}",
  "html body .cml-fq-it[open] summary i{transform:rotate(45deg);background:rgba(166,90,20,.14)}",
  "html body .cml-fq-a{padding:0 2px 18px;font:300 14.5px/1.65 Poppins,sans-serif;color:rgba(43,41,22,.8)}",
  "html body .cml-fq-a p{margin:0 0 10px;font:inherit!important;color:inherit!important}",
  "html body .cml-fq-a p:last-child{margin-bottom:0}",
  "html body .cml-fq-a a{color:#a65a14!important;text-decoration:underline;text-underline-offset:3px;text-decoration-color:rgba(166,90,20,.5)}",
  "html body .cml-fq-a table{width:auto!important;margin:6px 0 2px!important;border:0!important}",
  "html body .cml-fq-a table td{border:0!important;padding:4px 10px 4px 0!important;background:transparent!important;font:300 13.5px/1.5 Poppins,sans-serif!important;color:rgba(43,41,22,.8)!important;vertical-align:middle}",
  "html body .cml-fq-a table:has(img) tbody{display:flex;flex-wrap:wrap;gap:6px}html body .cml-fq-a table:has(img) tr{display:contents}",
  "html body .cml-fq-a table:has(img) td{padding:0!important}",
  "html body .cml-fq-a table:has(img) td:empty{display:none}",
  "html body .cml-fq-a img{display:block;height:26px!important;width:auto!important;max-width:48px;border-radius:6px;background:#fff;padding:2px 5px;box-sizing:border-box}",
  "html body .cml-fq-a table.cml-fq-tb{display:block}html body .cml-fq-a table.cml-fq-tb tbody{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:6px 18px}",
  "html body .cml-fq-a table.cml-fq-tb tr{display:flex;justify-content:space-between;gap:10px;padding:6px 0;border-bottom:1px dashed rgba(166,90,20,.18)}",
  "html body .cml-fq-a table.cml-fq-tb td:last-child{color:#a65a14!important;font-weight:500!important;white-space:nowrap}",
  "html body .cml-fq-it.cml-hid{display:none}",
  "html body .cml-fq-g.cml-hid{display:none}",
  "html body .cml-fq-none{display:none;padding:22px 0;text-align:center;font:300 14px/1.5 Poppins,sans-serif;color:rgba(43,41,22,.6)}",
  "html body .cml-fq.cml-empty .cml-fq-none{display:block}",
  "@media (max-width:640px){html body .cml-fq-top{flex-direction:column;align-items:stretch}html body .cml-fq-s{max-width:none}html body .cml-fq-it summary{padding:14px 0;font-size:14.5px}html body .cml-fq-a{font-size:14px}}",

  /* ---------- Contato ---------- */
  "html body .cml-ct2{max-width:1140px;margin:-6px auto 28px;padding:0 16px;font-family:Poppins,sans-serif;color:" + INK + "}",
  "html body .cml-ct2-wa{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px 24px;padding:22px 26px;border-radius:24px;border:1px solid rgba(166,90,20,.3);background:radial-gradient(120% 120% at 15% 0%,rgba(166,90,20,.16) 0%,rgba(166,90,20,.05) 45%,rgba(43,41,22,.03) 100%);position:relative;isolation:isolate;overflow:hidden}",
  "html body .cml-ct2-wa:after{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.1;mix-blend-mode:screen;background-image:" + GRAIN + ";background-size:220px}",
  "html body .cml-ct2-wa .t{display:flex;align-items:center;gap:16px;min-width:0}",
  "html body .cml-ct2-wa .ic{flex:none;display:grid;place-items:center;width:52px;height:52px;border-radius:50%;background:rgba(166,90,20,.14);border:1px solid rgba(166,90,20,.4);color:#a65a14}",
  "html body .cml-ct2-wa .ic svg{width:26px;height:26px}",
  "html body .cml-ct2-wa .k{display:block;margin:0 0 4px;font:500 10.5px/1.2 Poppins,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#a65a14}",
  "html body .cml-ct2-wa h3{margin:0;font:700 clamp(18px,2.4vw,24px)/1.15 Poppins,sans-serif;color:#2b2916;letter-spacing:-.01em}",
  "html body .cml-ct2-wa h3 em{font-weight:300;font-style:italic;color:#a65a14}",
  "html body .cml-ct2-wa p{margin:6px 0 0;font:300 13.5px/1.5 Poppins,sans-serif;color:rgba(43,41,22,.75)}",
  "html body .cml-ct2-wa .b{flex:none;display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:50px;padding:0 26px;border-radius:999px;background:" + G + ";color:#f6efe9!important;font:600 15px/1 Poppins,sans-serif;text-decoration:none!important;box-shadow:0 14px 30px -16px rgba(166,90,20,.85);transition:transform .18s,filter .18s}",
  "html body .cml-ct2-wa .b:hover{transform:translateY(-1px);filter:brightness(1.06)}",
  "html body .cml-ct2-wa .b svg{width:20px;height:20px}",
  "html body .cml-ct2-q{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:14px}",
  "html body .cml-ct2-q a{display:flex;align-items:center;gap:14px;padding:16px 18px;border-radius:20px;border:1px solid rgba(166,90,20,.2);background:rgba(43,41,22,.035);color:" + INK + "!important;text-decoration:none!important;transition:border-color .18s,background .18s,transform .18s}",
  "html body .cml-ct2-q a:hover{border-color:rgba(166,90,20,.55);background:rgba(43,41,22,.06);transform:translateY(-2px)}",
  "html body .cml-ct2-q .ic{flex:none;display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:rgba(166,90,20,.1);color:#a65a14}",
  "html body .cml-ct2-q .ic svg{width:21px;height:21px}",
  "html body .cml-ct2-q b{display:block;font:500 14.5px/1.25 Poppins,sans-serif;color:#2b2916}",
  "html body .cml-ct2-q small{display:block;margin-top:3px;font:300 12.5px/1.4 Poppins,sans-serif;color:rgba(43,41,22,.65)}",
  "html body .cml-ct2-q a:after{content:'\\203A';margin-left:auto;font-size:22px;line-height:1;color:#a65a14;opacity:.7}",
  "@media (max-width:900px){html body .cml-ct2-q{grid-template-columns:1fr}html body .cml-ct2-wa{padding:20px}html body .cml-ct2-wa .b{width:100%}}",
  /* formulario: duas colunas no computador, botao pilula dourada */
  "@media (min-width:900px){html body.template-contact .cml-ct-form form{display:grid;grid-template-columns:1fr 1fr;gap:0 18px}html body.template-contact .cml-ct-form form>*{grid-column:1/-1}html body.template-contact .cml-ct-form form>.form-group:has(input[type=email]),html body.template-contact .cml-ct-form form>.form-group:has(+ .form-group input[type=email]){grid-column:auto}}",
  "html body.template-contact .cml-ct-form .btn,html body.template-contact .cml-ct-form input[type=submit],html body.template-contact .cml-ct-form button[type=submit]{border-radius:999px!important;background:" + G + "!important;border-color:" + G + "!important;color:#f6efe9!important;font:600 15px/1 Poppins,sans-serif!important;min-height:50px;padding:0 28px!important;box-shadow:0 14px 30px -16px rgba(166,90,20,.85)}",
  /* ---------- Encontre seu cha (papel claro com textura) ---------- */
  "html:not(.cml-blk) body.cml-cef{background:radial-gradient(120% 90% at 30% 20%,#f6efe9 0%,#f6efe9 55%,#ede3d8 100%)!important;background-attachment:scroll!important}",
  "html:not(.cml-blk) body.cml-cef main.main-content{position:relative;isolation:isolate}",
  "html:not(.cml-blk) body.cml-cef main.main-content:before{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.05;mix-blend-mode:multiply;background-image:" + GRAIN + ";background-size:220px}",
  "html:not(.cml-blk) body.cml-cef .cef{padding-top:22px!important}",
  "html:not(.cml-blk) body.cml-cef .cef-in{position:relative;isolation:isolate;overflow:hidden;background:radial-gradient(120% 90% at 30% 20%,#fffaf5 0%,#fffaf5 50%,#f6efe9 100%)!important;border:1px solid #e8ddd0!important;border-radius:28px!important;box-shadow:0 18px 40px -28px rgba(43,41,22,.55)!important;outline:1.5px solid rgba(86,82,41,.28);outline-offset:-12px}",
  "html:not(.cml-blk) body.cml-cef .cef-in:after{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.07;mix-blend-mode:multiply;background-image:" + GRAIN + ";background-size:220px}",
  "html:not(.cml-blk) body.cml-cef .cef-in:before{content:'';position:absolute;right:-120px;top:-170px;width:340px;height:340px;border-radius:50%;z-index:-1;pointer-events:none;opacity:.22;background:radial-gradient(circle at 35% 35%,#c8d19f 0%,#a3ad7f 55%,#8f9a6c 100%)}",
  "html:not(.cml-blk) body.cml-cef .cef-eb{color:#a65a14!important;font:500 10.5px/1.2 Poppins,sans-serif!important;letter-spacing:.22em!important;text-transform:uppercase!important}",
  "html:not(.cml-blk) body.cml-cef .cef-h{color:#2b2916!important}html:not(.cml-blk) body.cml-cef .cef-h em{color:#565229!important;-webkit-text-fill-color:#565229!important}",
  "html:not(.cml-blk) body.cml-cef .cef-sub{color:#6f6656!important}",
  "html:not(.cml-blk) body.cml-cef .cef-step i{border-color:#e8ddd0!important;color:#6f6656!important;background:#fff!important}",
  "html:not(.cml-blk) body.cml-cef .cef-step.on i{background:#565229!important;border-color:#565229!important;color:#2b2916!important}",
  "html:not(.cml-blk) body.cml-cef .cef-step.done i{background:#e8e9d6!important;border-color:#e8e9d6!important;color:#403d1e!important}",
  "html:not(.cml-blk) body.cml-cef .cef-step.on .cef-sl{color:#565229!important;font-weight:600!important}",
  "html:not(.cml-blk) body.cml-cef .cef-sep{background:#e8ddd0!important}",
  /* cartoes de escolha */
  "html:not(.cml-blk) body.cml-cef .cef-way{background:#fff!important;border:1px solid #e8ddd0!important;border-radius:20px!important;box-shadow:0 10px 24px -22px rgba(43,41,22,.5)!important;transition:transform .2s,border-color .2s,box-shadow .2s!important}",
  "html:not(.cml-blk) body.cml-cef .cef-way:hover{border-color:rgba(86,82,41,.6)!important;transform:translateY(-3px);box-shadow:0 22px 40px -26px rgba(43,41,22,.55)!important}",
  "html:not(.cml-blk) body.cml-cef .cef-way .cef-ic,html:not(.cml-blk) body.cml-cef .cef-way>span:first-child,html:not(.cml-blk) body.cml-cef .cef-way i{background:#e8e9d6!important;border-color:#e8e9d6!important;color:#565229!important}",
  "html:not(.cml-blk) body.cml-cef .cef-way b,html:not(.cml-blk) body.cml-cef .cef-way strong,html:not(.cml-blk) body.cml-cef .cef-way h3{color:#2b2916!important}",
  "html:not(.cml-blk) body.cml-cef .cef-way small,html:not(.cml-blk) body.cml-cef .cef-way p{color:#6f6656!important}",
  "html:not(.cml-blk) body.cml-cef .cef-way .cef-go,html:not(.cml-blk) body.cml-cef .cef-way a,html:not(.cml-blk) body.cml-cef .cef-way span.cef-cta{color:#a65a14!important}",
  /* pilulas de opcao */
  "html:not(.cml-blk) body.cml-cef .cef-opt{background:#fff!important;border:1px solid #e8ddd0!important;color:#2b2916!important;border-radius:999px!important;box-shadow:none!important;transition:border-color .18s,background .18s,color .18s!important}",
  "html:not(.cml-blk) body.cml-cef .cef-opt:hover{border-color:#565229!important}",
  "html:not(.cml-blk) body.cml-cef .cef-opt.on,html:not(.cml-blk) body.cml-cef .cef-opt[aria-pressed=true]{background:#565229!important;border-color:#565229!important;color:#2b2916!important}",
  /* resultados */
  "html:not(.cml-blk) body.cml-cef .cef-card{background:#fff!important;border:1px solid #e8ddd0!important;border-radius:20px!important;box-shadow:0 14px 30px -26px rgba(43,41,22,.5)!important}",
  "html:not(.cml-blk) body.cml-cef .cef-th{border-radius:14px!important;background-color:#fff!important;box-shadow:0 0 0 5px #fff,0 0 0 6px #e8ddd0!important;margin:5px 5px 0 5px}",
  "html:not(.cml-blk) body.cml-cef .cef-card .c4-sig{color:#2b2916!important}html:not(.cml-blk) body.cml-cef .cef-card .c4-sig em{color:#565229!important;-webkit-text-fill-color:#565229!important}",
  "html:not(.cml-blk) body.cml-cef .cef-tag{background:#e8e9d6!important;color:#403d1e!important;border:0!important}",
  "html:not(.cml-blk) body.cml-cef .cef-lead{color:#2b2916!important}",
  "html:not(.cml-blk) body.cml-cef .cef-sheet summary{color:#2b2916!important;border-color:#e8ddd0!important}",
  "html:not(.cml-blk) body.cml-cef .cef-tb td{color:#6f6656!important;border-color:#e8ddd0!important}",
  "html:not(.cml-blk) body.cml-cef .cef-note{color:#6f6656!important}",
  "html:not(.cml-blk) body.cml-cef .cef-pr b{color:#a65a14!important}html:not(.cml-blk) body.cml-cef .cef-pr small,html:not(.cml-blk) body.cml-cef .cef-pr span{color:#6f6656!important}",
  "html:not(.cml-blk) body.cml-cef .cef-btn{background:#a65a14!important;background-image:linear-gradient(180deg,#e9c272,#d9a94f)!important;border:1px solid #a65a14!important;color:#f6efe9!important;font-weight:600!important;border-radius:999px!important;box-shadow:0 12px 24px -14px rgba(166,90,20,.55)!important}",
  "html:not(.cml-blk) body.cml-cef .cef-btn:hover{background-image:linear-gradient(180deg,#f0cb7f,#a65a14)!important;transform:translateY(-1px)}",
  "html:not(.cml-blk) body.cml-cef .cef-back,html:not(.cml-blk) body.cml-cef .cef-link{color:#565229!important;text-decoration:none!important;border-bottom:1px solid rgba(166,90,20,.9)!important;padding-bottom:2px}",
  "html:not(.cml-blk) body.cml-cef .cef-foot{border-top:1px solid #e8ddd0!important;color:#6f6656!important}html:not(.cml-blk) body.cml-cef .cef-foot span{color:#6f6656!important}",
  "html:not(.cml-blk) body.cml-cef .cef-sw{color:#2b2916!important}",
  "html:not(.cml-blk) body.cml-cef .cef-chosen,html:not(.cml-blk) body.cml-cef .cef-rhead p{color:#2b2916!important}html:not(.cml-blk) body.cml-cef .cef-rhead p em{color:#565229!important;-webkit-text-fill-color:#565229!important}",
  "@media (max-width:640px){html:not(.cml-blk) body.cml-cef .cef-in{outline-offset:-8px;border-radius:24px!important}html:not(.cml-blk) body.cml-cef .cef-in:before{width:220px;height:220px;right:-90px;top:-100px}}",
  /* ---------- Minha conta: rastreio dentro da pagina ---------- */
  "html body .cmc .cml-tr{display:flex;align-items:flex-start;gap:10px;margin:10px 0 2px;padding:10px 12px;border-radius:14px;background:rgba(166,90,20,.07);border:1px solid rgba(166,90,20,.2);font:300 12.5px/1.45 Poppins,sans-serif;color:rgba(43,41,22,.82)}",
  "html body .cmc .cml-tr i{flex:none;width:9px;height:9px;margin-top:5px;border-radius:50%;background:" + G + ";box-shadow:0 0 0 3px rgba(166,90,20,.22)}",
  "html body .cmc .cml-tr.ok i{background:#9fc27a;box-shadow:0 0 0 3px rgba(159,194,122,.25)}",
  "html body .cmc .cml-tr.al i{background:#e07a5f;box-shadow:0 0 0 3px rgba(224,122,95,.25)}",
  "html body .cmc .cml-tr b{display:block;font:600 13px/1.3 Poppins,sans-serif;color:#2b2916}",
  "html body .cmc .cml-tr small{display:block;font:300 12px/1.45 Poppins,sans-serif;color:rgba(43,41,22,.65)}",
  "html body .cmc .cml-tr .eta{color:#a65a14;font-weight:500}",
  "html body .cmc .cml-trp{margin:14px 0 6px;padding:16px 16px 12px;border-radius:18px;background:rgba(43,41,22,.04);border:1px solid rgba(166,90,20,.22);font-family:Poppins,sans-serif;color:" + INK + "}",
  "html body .cmc .cml-trp .k{display:block;margin:0 0 6px;font:500 10px/1.2 Poppins,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#a65a14}",
  "html body .cmc .cml-trp .h{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:6px 14px;margin:0 0 10px}",
  "html body .cmc .cml-trp .h b{font:600 16px/1.25 Poppins,sans-serif;color:#2b2916}",
  "html body .cmc .cml-trp .h span{font:500 12.5px/1.3 Poppins,sans-serif;color:#a65a14}",
  "html body .cmc .cml-trp ol{list-style:none;margin:0;padding:0 0 0 2px}",
  "html body .cmc .cml-trp li{position:relative;padding:0 0 12px 22px;font:300 13px/1.45 Poppins,sans-serif;color:rgba(43,41,22,.78)}",
  "html body .cmc .cml-trp li:before{content:'';position:absolute;left:3px;top:6px;width:7px;height:7px;border-radius:50%;background:rgba(166,90,20,.45)}",
  "html body .cmc .cml-trp li:first-child:before{background:" + G + ";box-shadow:0 0 0 3px rgba(166,90,20,.22)}",
  "html body .cmc .cml-trp li:after{content:'';position:absolute;left:6px;top:15px;bottom:-2px;width:1px;background:rgba(166,90,20,.18)}",
  "html body .cmc .cml-trp li:last-child:after{display:none}",
  "html body .cmc .cml-trp li b{display:block;font:500 13px/1.35 Poppins,sans-serif;color:#2b2916}",
  "html body .cmc .cml-trp li small{display:block;font:300 11.5px/1.4 Poppins,sans-serif;color:rgba(43,41,22,.55)}",
  "html body .cmc .cml-trp li.cml-more{display:none}html body .cmc .cml-trp.open li.cml-more{display:block}",
  "html body .cmc .cml-trp .mb{display:inline-block;margin:2px 0 0;padding:0;border:0;background:none;font:500 12.5px/1 Poppins,sans-serif;color:#a65a14;cursor:pointer;border-bottom:1px solid rgba(166,90,20,.5)}",
  "html body .cmc .cml-trp .src{margin:10px 0 0;font:300 11px/1.4 Poppins,sans-serif;color:rgba(43,41,22,.45)}",
  "html body .cmc .cml-trp.al .h b{color:#f0a58f}",
  /* ---------- Sacola enxuta: so o necessario ---------- */
  "html body #modal-cart .cart-totals-subtotal,html body #modal-cart #shipping-cost-container,html body #modal-cart .cart-continue-shopping,html body #modal-cart .shipping-calculator-response>div.font-small{display:none!important}",
  /* compre junto (Cashing) compacto: uma linha, fotos pequenas, sem o nome interno do combo */
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(.mi-embla)>div{padding:0!important;gap:0!important}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(.mi-embla)>div>div:first-child{display:none!important}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(.mi-embla) .mi-embla__slide>div{padding:8px 10px!important;border-radius:16px!important;border:1px solid rgba(166,90,20,.28)!important;background:rgba(43,41,22,.04)!important}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(.mi-embla) .mi-embla__slide>div>div{flex-direction:row!important;align-items:center!important;gap:10px!important}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(.mi-embla) .mi-embla__slide>div>div{width:100%!important}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(.mi-embla) .mi-embla__slide>div>div>div:first-child{flex:none!important;width:auto!important}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(.mi-embla) .mi-embla__slide>div>div>div:last-child{flex:1 1 0!important;width:auto!important;min-width:0!important;gap:8px!important}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(.mi-embla) .mi-embla__slide img{width:40px!important;height:40px!important;max-width:40px!important;max-height:40px!important;object-fit:cover!important;border-radius:8px!important;background:#fff}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(.mi-embla) .mi-ph-plus-circle-fill{width:16px!important;height:16px!important;font-size:11px!important;margin:0 -3px!important;color:#a65a14!important;background:transparent!important}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(.mi-embla) [class*='mi-flex-col'][class*='mi-gap-[2px]']>span:first-child{display:none!important}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(.mi-embla) [class*='mi-flex-col'][class*='mi-gap-[2px]']{gap:2px!important}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(.mi-embla) [class*='mi-flex-col'][class*='mi-gap-[2px]']:before{content:'Leve junto';font:500 9.5px/1.2 Poppins,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#a65a14}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(.mi-embla) [class*='mi-flex-col'][class*='mi-gap-[2px]'] strong{font-size:12px!important;color:" + INK + "!important}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(.mi-embla) [class*='mi-flex-col'][class*='mi-gap-[2px]'] .c7-cs strong{font-size:14px!important;color:#a65a14!important}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(.mi-embla) [class*='mi-flex-col'][class*='mi-gap-[2px]'] s{font-size:11px!important;color:rgba(43,41,22,.5)!important}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(.mi-embla) .mi-embla__slide button{flex:none!important;min-height:34px!important;padding:0 14px!important;border-radius:999px!important;background:transparent!important;border:1px solid " + G + "!important;color:#a65a14!important;font:500 12.5px/1 Poppins,sans-serif!important;white-space:nowrap}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(.mi-embla) .mi-embla__slide button:hover{background:" + G + "!important;color:#f6efe9!important}",
  "html body #modal-cart .cart-subtotals-container{margin-top:0!important;padding-top:0!important;border-top:0!important}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(button)>div{background:rgba(43,41,22,.05)!important;border:1px solid rgba(166,90,20,.32)!important;border-radius:999px!important;color:" + INK + "!important}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(button) p{color:" + INK + "!important;font:300 13.5px/1.35 Poppins,sans-serif!important}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(button) p strong{color:#a65a14!important;font-weight:600!important}",
  "html body #modal-cart .js-ajax-cart-list .c7-cs:has(button) button{background:" + G + "!important;color:#f6efe9!important;border-radius:999px!important;padding:8px 14px!important;font:600 12.5px/1 Poppins,sans-serif!important;border:0!important;white-space:nowrap}",
  "@media (min-width:1024px){html.cml-blk body .nav-desktop .desktop-dropdown{background:rgba(255,250,245,.975)!important}}",
  "html body #modal-cart .shipping-options-heading{display:none!important}html body #modal-cart .shipping-calculator-current-zipcode,html body #modal-cart .js-shipping-calculator-current-zipcode{font-size:13px;margin-bottom:6px}",
  "@media (max-width:767px){html body.template-page .page-content-section[style]{padding-left:18px!important;padding-right:18px!important}}",
  /* ---------- Encontre seu cha: pagina no padrao do Clube (abertura oliva, como funciona, quiz, duvidas, fechamento) ---------- */
  "html body.cml-cef .cml-cx{width:min(1318px,calc(100% - 32px));margin:0 auto 28px;font-family:Poppins,sans-serif}",
  "html body.cml-cef .cml-cx-hero .in{position:relative;isolation:isolate;overflow:hidden;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:40px;align-items:center;padding:clamp(28px,4vw,56px);border-radius:32px;background:radial-gradient(110% 90% at 35% 25%,#565229 0%,#565229 45%,#403d1e 100%);color:#2b2916;box-shadow:0 30px 60px -40px rgba(43,41,22,.7)}",
  "html body.cml-cef .cml-cx-hero .in:after{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.16;mix-blend-mode:multiply;background-image:" + GRAIN + ";background-size:220px}",
  "html body.cml-cef .cml-cx-hero .in:before{content:'';position:absolute;left:-140px;bottom:-200px;width:420px;height:420px;border-radius:50%;z-index:-1;pointer-events:none;opacity:.35;background:radial-gradient(circle at 35% 35%,#b7c28b 0%,#a3ad7f 55%,#8f9a6c 100%)}",
  "html:not(.cml-blk) body.cml-cef .cml-cx-hero .cef-eb{color:#a65a14!important;margin:0 0 10px!important}",
  "html:not(.cml-blk) body.cml-cef .cml-cx-hero .cef-h{margin:0 0 14px!important;font:700 clamp(32px,4.4vw,54px)/1.08 Poppins,sans-serif!important;color:#2b2916!important;letter-spacing:-.015em}html:not(.cml-blk) body.cml-cef .cml-cx-hero .cef-h em{color:#a65a14!important;-webkit-text-fill-color:#a65a14!important;font-weight:300!important;font-style:italic!important}",
  "html:not(.cml-blk) body.cml-cef .cml-cx-hero .cef-sub{margin:0 0 22px!important;font:300 clamp(15px,1.3vw,17px)/1.6 Poppins,sans-serif!important;color:rgba(43,41,22,.86)!important;max-width:46ch}",
  "html body.cml-cef .cml-cx-hero .cta{display:flex;flex-wrap:wrap;align-items:center;gap:12px 22px;margin:0 0 20px}",
  "html body.cml-cef .cml-cx-hero .cta .b:not(#cmlx){display:inline-flex;align-items:center;gap:10px;min-height:50px;padding:0 26px;border-radius:999px;background:" + G + ";color:#f6efe9!important;font:600 15px/1 Poppins,sans-serif;text-decoration:none!important;box-shadow:0 14px 30px -16px rgba(166,90,20,.8);transition:transform .2s}html body.cml-cef .cml-cx-hero .cta .b:hover{transform:translateY(-2px)}",
  "html body.cml-cef .cml-cx-hero .cta .l:not(#cmlx){color:#2b2916!important;font:500 14px/1 Poppins,sans-serif;text-decoration:none!important;border-bottom:1px solid " + G + ";padding-bottom:3px}",
  "html body.cml-cef .cml-cx-hero .chips{display:flex;flex-wrap:wrap;gap:8px;margin:0;padding:0;list-style:none}html body.cml-cef .cml-cx-hero .chips li{display:inline-flex;align-items:center;gap:6px;padding:7px 12px;border-radius:999px;border:1px solid rgba(255,250,245,.3);font:400 12.5px/1 Poppins,sans-serif;color:#2b2916}html body.cml-cef .cml-cx-hero .chips li:before{content:'';width:6px;height:6px;border-radius:50%;background:" + G + "}",
  "html body.cml-cef .cml-cx-hero .pic{margin:0;justify-self:end;width:min(100%,440px);padding:10px;border-radius:28px;background:#fff;box-shadow:0 30px 60px -36px rgba(43,41,22,.2)}html body.cml-cef .cml-cx-hero .pic img{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:20px}",
  "html body.cml-cef .cml-cx .k{display:flex;align-items:center;gap:12px;margin:0 0 8px;font:500 10.5px/1.2 Poppins,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#a65a14}html body.cml-cef .cml-cx .k:before{content:'';width:28px;height:1px;background:#a65a14}",
  "html body.cml-cef .cml-cx h2:not(#cmlx){margin:0 0 18px;font:700 clamp(24px,2.8vw,34px)/1.12 Poppins,sans-serif;color:#2b2916;letter-spacing:-.01em}html body.cml-cef .cml-cx h2 em{font-weight:300;font-style:italic;color:#565229}",
  "html body.cml-cef .cml-cx-steps{margin-top:36px}html body.cml-cef .st3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}html body.cml-cef .st3>div{position:relative;padding:22px 22px 22px 70px;border-radius:22px;background:#fff;border:1px solid #e8ddd0;box-shadow:0 14px 30px -26px rgba(43,41,22,.5)}html body.cml-cef .st3 b{position:absolute;left:22px;top:22px;width:34px;height:34px;border-radius:50%;background:" + G + ";color:#f6efe9;font:700 14px/34px Poppins,sans-serif;text-align:center}html body.cml-cef .st3 strong{display:block;font:600 15px/1.3 Poppins,sans-serif;color:#2b2916}html body.cml-cef .st3 span{display:block;margin-top:4px;font:300 13px/1.5 Poppins,sans-serif;color:#6f6656}",
  "html body.cml-cef .cml-cx-h{width:min(1318px,calc(100% - 32px));margin:60px auto 12px!important}html body.cml-cef .cml-cx-hero{margin-top:18px}",
  "html body.cml-cef .cml-cx-faq{margin-top:60px}html body.cml-cef .cml-cx-faq details{border:1px solid #e8ddd0;border-radius:18px;background:#fff;margin:0 0 10px;overflow:hidden}html body.cml-cef .cml-cx-faq summary{cursor:pointer;list-style:none;padding:16px 50px 16px 20px;position:relative;font:600 15px/1.3 Poppins,sans-serif;color:#2b2916}html body.cml-cef .cml-cx-faq summary::-webkit-details-marker{display:none}html body.cml-cef .cml-cx-faq summary:after{content:'+';position:absolute;right:18px;top:50%;transform:translateY(-50%);width:28px;height:28px;border-radius:50%;border:1px solid #565229;color:#565229;font:300 18px/26px Poppins,sans-serif;text-align:center}html body.cml-cef .cml-cx-faq details[open] summary:after{content:'\\2013'}html body.cml-cef .cml-cx-faq details p{margin:0;padding:0 20px 18px;font:300 14px/1.6 Poppins,sans-serif;color:#6f6656}",
  "html body.cml-cef .cml-cx-end{margin-top:44px;margin-bottom:48px}html body.cml-cef .cml-cx-end .in{position:relative;isolation:isolate;overflow:hidden;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:30px clamp(24px,3vw,44px);border-radius:28px;background:radial-gradient(110% 90% at 35% 25%,#565229 0%,#565229 45%,#403d1e 100%);color:#2b2916}html body.cml-cef .cml-cx-end .in:after{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.16;mix-blend-mode:multiply;background-image:" + GRAIN + ";background-size:220px}",
  "html body.cml-cef .cml-cx-end h2:not(#cmlx){margin:0;color:#2b2916;font-size:clamp(22px,2.4vw,30px)}html body.cml-cef .cml-cx-end h2 em{color:#a65a14}html body.cml-cef .cml-cx-end p{margin:6px 0 0;font:300 14px/1.5 Poppins,sans-serif;color:rgba(43,41,22,.82)}",
  "html body.cml-cef .cml-cx-end .b:not(#cmlx){flex:none;display:inline-flex;align-items:center;gap:10px;min-height:50px;padding:0 26px;border-radius:999px;background:" + G + ";color:#f6efe9!important;font:600 15px/1 Poppins,sans-serif;text-decoration:none!important}",
  "html body.cml-cef .cef-in.cx-2col{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:26px;align-items:start;overflow:clip!important}html body.cml-cef .cx-2col>.cef-body{grid-column:1}html body.cml-cef .cx-2col>.cef-foot{grid-column:1;margin-top:0}html body.cml-cef .cx-side{grid-column:2;grid-row:1/3;position:sticky;top:96px}",
  "html body.cml-cef .cef-body{display:flex;flex-direction:column;gap:10px}html body.cml-cef .cef-steps{display:contents}html body.cml-cef .cef-sep{display:none}html body.cml-cef .cef-step:not(#cmlx):not(#cmly){display:flex;align-items:center;gap:14px;padding:15px 18px;border:1px solid #e8ddd0;border-radius:20px;background:#fff;color:#2b2916;font-weight:400;opacity:1}html body.cml-cef .cef-step:nth-child(1){order:2}html body.cml-cef .cef-step:nth-child(3){order:4}html body.cml-cef .cef-step:nth-child(5){order:6}html body.cml-cef .cef-pane{order:3}html body.cml-cef .cef-body[data-cur=\"2\"] .cef-pane{order:5}html body.cml-cef .cef-body[data-cur=\"3\"] .cef-pane{order:7}",
  "html body.cml-cef .cef-step.on:not(#cmlx):not(#cmly){border-radius:20px 20px 0 0;border-bottom:0;padding-bottom:6px}html body.cml-cef .cef-pane:not(#cmlx){margin-top:-10px;padding:6px 18px 20px;border:1px solid #e8ddd0;border-top:0;border-radius:0 0 20px 20px;background:#fff;animation:none}html body.cml-cef .cef-step:not(.on):not(#cmlx){background:#f6efe9;opacity:.6}html body.cml-cef .cef-step.done:not(#cmlx),html body.cml-cef .cef-step.jump:not(#cmlx){opacity:1;cursor:pointer}html body.cml-cef .cef-step.jump:hover{border-color:#565229}",
  "html body.cml-cef .cef-step i:not(#cmlx){flex:none;width:34px;height:34px;border-radius:50%;border:1px solid #e8ddd0;background:#fff;color:#6f6656;font:700 13px/32px Poppins,sans-serif;text-align:center;display:block}html body.cml-cef .cef-step.on i:not(#cmlx){background:#565229;border-color:#565229;color:#2b2916}html body.cml-cef .cef-step.done i:not(#cmlx){background:#e8e9d6;border-color:#e8e9d6;color:#565229}html body.cml-cef .cef-step .nx-ht{display:flex;flex-direction:column;gap:2px;flex:1 1 auto;min-width:0}html body.cml-cef .cef-step .nx-k{font:500 10.5px/1.2 Poppins,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#a65a14;font-style:normal}html body.cml-cef .cef-step .cef-sl:not(#cmlx):not(#cmly){display:inline!important;font:600 16px/1.3 Poppins,sans-serif;color:#2b2916}html body.cml-cef .cef-step .nx-stv{flex:0 1 44%;text-align:right;font:300 13px/1.35 Poppins,sans-serif;color:#6f6656}",
  "html body.cml-cef .cx-side{padding:24px 22px;border-radius:24px;background:radial-gradient(110% 90% at 35% 25%,#565229 0%,#565229 45%,#403d1e 100%);color:#2b2916;font-family:Poppins,sans-serif;box-shadow:0 18px 40px -28px rgba(43,41,22,.55)}html body.cml-cef .cx-side .k{margin:0 0 4px;font:500 10.5px/1.2 Poppins,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#a65a14}html body.cml-cef .cx-side h3:not(#cmlx):not(#cmly){margin:0 0 14px;font:700 24px/1.15 Poppins,sans-serif;color:#2b2916}html body.cml-cef .cx-side h3 em:not(#cmlx):not(#cmly){font-weight:300;font-style:italic;color:#a65a14!important}html body.cml-cef .cx-side dl{margin:0;display:grid}html body.cml-cef .cx-side dl>div{display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:9px 0;border-bottom:1px solid rgba(43,41,22,.16)}html body.cml-cef .cx-side dt{flex:none;font:300 13.5px/1.4 Poppins,sans-serif;color:rgba(43,41,22,.78)}html body.cml-cef .cx-side dd{margin:0;text-align:right;font:500 13.5px/1.4 Poppins,sans-serif;color:#2b2916;min-width:0}html body.cml-cef .cx-side dd i{font-style:italic;font-weight:300;color:rgba(43,41,22,.6)}",
  "html body.cml-cef .cx-side .tt{display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin:14px 0 2px}html body.cml-cef .cx-side .tt span{font:300 14px/1.3 Poppins,sans-serif;color:rgba(43,41,22,.8)}html body.cml-cef .cx-side .tt b{font:700 28px/1.1 Poppins,sans-serif;color:#2b2916}html body.cml-cef .cx-side .pz{margin:0 0 14px;font:400 12.5px/1.45 Poppins,sans-serif;color:#a65a14}html body.cml-cef .cx-go:not(#cmlx):not(#cmly){display:flex;align-items:center;justify-content:center;width:100%;min-height:50px;padding:0 20px;border:0;border-radius:999px;background:#a65a14;color:#f6efe9!important;font:600 15px/1 Poppins,sans-serif;cursor:pointer;box-shadow:0 14px 30px -16px rgba(166,90,20,.8)}html body.cml-cef .cx-go[disabled]{opacity:.45;cursor:not-allowed;box-shadow:none}html body.cml-cef .cx-side .hn{margin:8px 0 0;text-align:center;font:400 12px/1.4 Poppins,sans-serif;color:#a65a14}html body.cml-cef .cx-side .nt{margin:12px 0 0;text-align:center;font:300 11.5px/1.5 Poppins,sans-serif;color:rgba(43,41,22,.6)}",
  "@media (max-width:900px){html body.cml-cef .cef-in.cx-2col{grid-template-columns:minmax(0,1fr);gap:18px}html body.cml-cef .cx-side{grid-column:1;grid-row:auto;position:static}}@media (max-width:640px){html body.cml-cef .cef-step:not(#cmlx):not(#cmly){padding:12px 14px;gap:10px;flex-wrap:wrap}html body.cml-cef .cef-step .nx-stv{flex:1 1 100%;text-align:left;padding-left:44px}html body.cml-cef .cef-pane:not(#cmlx){padding:0 12px 16px}html body.cml-cef .cx-side{padding:20px 16px}}",
  "html body.cml-cef .cef-res{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:14px!important;align-items:stretch}html body.cml-cef .cef-card:not(#cmlx):not(#cmly){display:flex!important;flex-direction:column;gap:0;padding:12px 12px 16px!important;border-radius:22px!important}html body.cml-cef .cef-ct:not(#cmlx){display:block;position:relative}html body.cml-cef .cef-th:not(#cmlx):not(#cmly){display:block;width:100%;height:auto;aspect-ratio:4/5;border-radius:999px 999px 18px 18px;background-color:#f6efe9;background-size:cover;background-position:center;margin:0 0 12px}",
  "html body.cml-cef .cef-ct>div{display:block;padding:0 4px}html body.cml-cef .cef-card .cef-eb2{display:block;margin:0 0 4px;font:500 10.5px/1.2 Poppins,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#a65a14}html body.cml-cef .cef-card h3:not(#cmlx):not(#cmly){margin:0 0 6px;font:600 17px/1.25 Poppins,sans-serif!important;color:#2b2916!important}html body.cml-cef .cef-card h3 em:not(#cmlx):not(#cmly){font:inherit!important;font-style:normal!important;color:inherit!important;-webkit-text-fill-color:#2b2916!important;background:none!important}html body.cml-cef .cef-tags:not(#cmlx){position:absolute;left:10px;top:10px;margin:0;gap:4px}html body.cml-cef .cef-tag:not(#cmlx){min-height:22px;padding:2px 9px;background:#fffaf5;color:#565229;font-size:11px;font-weight:500;box-shadow:0 4px 12px -6px rgba(43,41,22,.5)}html body.cml-cef .cef-tag.w:not(#cmlx){background:#fcf2e8;color:#a65a14}",
  "html body.cml-cef .cef-card .cef-lead:not(#cmlx){margin:0 4px 8px;font:300 13.5px/1.5 Poppins,sans-serif;color:#2b2916}html body.cml-cef .cef-card .cef-ings:not(#cmlx){margin:0 4px 8px;font:300 12.5px/1.45 Poppins,sans-serif;color:#6f6656}html body.cml-cef .cef-card .cef-warn:not(#cmlx){margin:0 4px 8px;font-size:12px}html body.cml-cef .cef-card .cef-sheet:not(#cmlx){margin:0 4px;border-top:1px solid #e8ddd0}html body.cml-cef .cef-sheet summary{font-size:13px;min-height:40px;padding:8px 0}",
  "html body.cml-cef .cef-buy:not(#cmlx):not(#cmly){margin-top:auto;padding:12px 4px 0;display:grid;gap:10px;border-top:1px solid #e8ddd0}html body.cml-cef .cef-pr:not(#cmlx){font:400 12px/1.35 Poppins,sans-serif;color:#6f6656}html body.cml-cef .cef-pr b:not(#cmlx){display:block;font:700 22px/1.1 Poppins,sans-serif;color:#a65a14}html body.cml-cef .cef-cb{display:block;margin-top:2px;font:400 12px/1.3 Poppins,sans-serif;color:#6f6656}html body.cml-cef .cef-cb b{font-weight:600;color:#a65a14}html body.cml-cef .cef-card .cef-btn:not(#cmlx):not(#cmly){width:100%;min-height:46px;background:#a65a14!important;color:#f6efe9!important;box-shadow:0 12px 26px -16px rgba(166,90,20,.9)}html body.cml-cef .cef-card .cef-btn:hover{background:#e9bf73!important}",
  "@media (max-width:900px){html body.cml-cef .cef-res{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}}@media (max-width:640px){html body.cml-cef .cef-card:not(#cmlx):not(#cmly){padding:8px 8px 12px!important;border-radius:18px!important}html body.cml-cef .cef-th:not(#cmlx):not(#cmly){border-radius:999px 999px 14px 14px;margin-bottom:8px}html body.cml-cef .cef-card h3:not(#cmlx):not(#cmly){font-size:14.5px!important}html body.cml-cef .cef-card .cef-lead:not(#cmlx){font-size:12.5px}html body.cml-cef .cef-card .cef-ings:not(#cmlx){display:none}html body.cml-cef .cef-pr b:not(#cmlx){font-size:19px}html body.cml-cef .cef-card .cef-btn:not(#cmlx):not(#cmly){min-height:42px;font-size:14px}html body.cml-cef .cef-tag:not(#cmlx){font-size:10px;padding:2px 7px}}",
  "@media (max-width:900px){html body.cml-cef .cml-cx-hero .in{grid-template-columns:minmax(0,1fr);gap:22px}html body.cml-cef .cml-cx-hero .pic{order:-1;justify-self:stretch;width:100%;padding:8px;border-radius:22px}html body.cml-cef .cml-cx-hero .pic img{aspect-ratio:16/9;max-height:220px;border-radius:16px}html body.cml-cef .st3{grid-template-columns:minmax(0,1fr)}}",
  "@media (max-width:640px){html body.cml-cef .cml-cx{width:calc(100% - 24px);margin-bottom:20px}html body.cml-cef .cml-cx-h{margin-top:40px!important}html body.cml-cef .cml-cx-faq{margin-top:40px}html body.cml-cef .cml-cx-hero .in{padding:18px 18px 22px;border-radius:26px}html body.cml-cef .cml-cx-hero .cta{gap:10px 16px}html body.cml-cef .cml-cx-hero .cta .b:not(#cmlx){width:100%;justify-content:center}html body.cml-cef .cml-cx-steps{margin-top:24px}html body.cml-cef .st3>div{padding:16px 16px 16px 62px}html body.cml-cef .st3 b{left:16px;top:16px}html body.cml-cef .cml-cx-end .in{flex-direction:column;align-items:stretch;padding:22px 18px}html body.cml-cef .cml-cx-end .b:not(#cmlx){justify-content:center}}",
  /* ---------- Monte seu presente (Natal): pagina no padrao do Clube, tema claro (papel) com os tons de Natal nos moldes: abertura bordo, resumo bordo, detalhes em bordo e dourado (11/11/2026) ---------- */
  "html body #cml-natal .cmn-hero:not(#cmlx):not(#cmly){display:grid!important;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:36px;align-items:center;padding:clamp(28px,4vw,52px)!important;background:radial-gradient(110% 90% at 20% 15%,#5b5730 0%,#565229 55%,#403d1e 100%)!important;border:1px solid rgba(223,174,88,.3);box-shadow:0 24px 50px -36px rgba(64,61,30,.7)}html body #cml-natal .cmn-hero:before{opacity:.35}",
  "html body #cml-natal .cmn-hero .cmn-lights{grid-column:1/-1;position:absolute;left:0;right:0;top:0}",
  "html body #cml-natal .cmn-hero .nx-tx{position:relative;z-index:1;min-width:0}html body #cml-natal .cmn-hero .nx-tx>h1:not(#cmlx):not(#cmly){margin:0 0 14px!important;font-size:clamp(32px,4.4vw,54px)!important;line-height:1.08!important;color:#fff!important}html body #cml-natal .cmn-hero .nx-tx>h1 em{color:#f3d48b!important;font-weight:300;font-style:italic}html body #cml-natal .cmn-hero .nx-tx>.cmn-lead{margin:0 0 22px!important;max-width:46ch;color:rgba(246,239,233,.9)!important}html body #cml-natal .cmn-hero .cmn-eb{color:#dfae58!important}",
  "html body #cml-natal .nx-cta{display:flex;flex-wrap:wrap;align-items:center;gap:12px 22px;margin:0 0 20px}",
  "html body #cml-natal .nx-cta .b:not(#cmlx):not(#cmly){display:inline-flex;align-items:center;gap:10px;min-height:50px;padding:0 26px;border-radius:999px;background:#dfae58;color:#0b0a08!important;font:600 15px/1 Poppins,sans-serif;text-decoration:none!important;box-shadow:0 14px 30px -16px rgba(223,174,88,.8);transition:transform .2s}html body #cml-natal .nx-cta .b:hover{transform:translateY(-2px)}",
  "html body #cml-natal .nx-cta .l:not(#cmlx):not(#cmly){color:#f6efe9!important;font:500 14px/1 Poppins,sans-serif;text-decoration:none!important;border-bottom:1px solid #dfae58;padding-bottom:3px}",
  "html body #cml-natal .nx-chips{display:flex;flex-wrap:wrap;gap:8px;margin:0;padding:0;list-style:none}html body #cml-natal .nx-chips li{display:inline-flex;align-items:center;gap:6px;padding:7px 12px;border-radius:999px;border:1px solid rgba(246,239,233,.3);font:400 12.5px/1 Poppins,sans-serif;color:#f6efe9}html body #cml-natal .nx-chips li:before{content:'';width:6px;height:6px;border-radius:50%;background:#dfae58}",
  "html body #cml-natal .cmn-hero .nx-pic{position:relative;z-index:1;margin:0;justify-self:end;width:min(100%,420px);padding:10px;border-radius:28px;background:#fff;box-shadow:0 30px 60px -36px rgba(43,41,22,.2)}html body #cml-natal .cmn-hero .nx-pic img{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:20px}",
  "html body #cml-natal .nx{margin:22px 0 0;font-family:Poppins,sans-serif}html body #cml-natal .nx-steps{margin-bottom:26px}html body #cml-natal .nx-h{margin:52px 0 16px}html body #cml-natal .nx-h h2:not(#cmlx):not(#cmly){margin-bottom:0}html body #cml-natal .nx .k{display:flex;align-items:center;gap:12px;margin:0 0 8px;font:500 10.5px/1.2 Poppins,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#a65a14}html body #cml-natal .nx .k:before{content:'';width:28px;height:1px;background:" + G + "}",
  "html body #cml-natal .nx h2:not(#cmlx):not(#cmly){margin:0 0 18px;font:700 clamp(24px,2.8vw,34px)/1.12 Poppins,sans-serif;color:#2b2916;letter-spacing:-.01em}html body #cml-natal .nx h2 em{font-weight:300;font-style:italic;color:#a65a14}",
  "html body #cml-natal .nx-st3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}html body #cml-natal .nx-st3>div{position:relative;padding:22px 22px 22px 70px;border-radius:22px;background:#fff;border:1px solid #e8ddd0}html body #cml-natal .nx-st3 b{position:absolute;left:22px;top:22px;width:34px;height:34px;border-radius:50%;background:" + G + ";color:#f6efe9;font:700 14px/34px Poppins,sans-serif;text-align:center}html body #cml-natal .nx-st3 strong{display:block;font:600 15px/1.3 Poppins,sans-serif;color:#2b2916}html body #cml-natal .nx-st3 span{display:block;margin-top:4px;font:300 13px/1.5 Poppins,sans-serif;color:#6f6656}",
  "html body #cml-natal .nx-faq{margin-top:60px}html body #cml-natal .nx-faq details{border:1px solid #e8ddd0;border-radius:18px;background:#fff;margin:0 0 10px;overflow:hidden}html body #cml-natal .nx-faq summary{cursor:pointer;list-style:none;padding:16px 50px 16px 20px;position:relative;font:600 15px/1.3 Poppins,sans-serif;color:#2b2916}html body #cml-natal .nx-faq summary::-webkit-details-marker{display:none}html body #cml-natal .nx-faq summary:after{content:'+';position:absolute;right:18px;top:50%;transform:translateY(-50%);width:28px;height:28px;border-radius:50%;border:1px solid #a65a14;color:#a65a14;font:300 18px/26px Poppins,sans-serif;text-align:center}html body #cml-natal .nx-faq details[open] summary:after{content:'\\2013'}html body #cml-natal .nx-faq details p{margin:0;padding:0 20px 18px;font:300 14px/1.6 Poppins,sans-serif;color:#6f6656}",
  "html body #cml-natal .nx-end{margin-top:40px}html body #cml-natal .nx-end .in{position:relative;isolation:isolate;overflow:hidden;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:30px clamp(24px,3vw,44px);border-radius:28px;background:radial-gradient(110% 90% at 20% 15%,#5b5730 0%,#565229 55%,#403d1e 100%);border:1px solid rgba(166,90,20,.3);color:#2b2916}html body #cml-natal .nx-end .in:after{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.1;mix-blend-mode:screen;background-image:" + GRAIN + ";background-size:220px}",
  "html body #cml-natal .nx-end h2:not(#cmlx):not(#cmly){margin:0;font-size:clamp(22px,2.4vw,30px);color:#2b2916}html body #cml-natal .nx-end h2 em{color:#a65a14}html body #cml-natal .nx-end p{margin:6px 0 0;font:300 14px/1.5 Poppins,sans-serif;color:rgba(43,41,22,.82)}html body #cml-natal .nx-end .b:not(#cmlx):not(#cmly){flex:none;display:inline-flex;align-items:center;gap:10px;min-height:50px;padding:0 26px;border-radius:999px;background:" + G + ";color:#f6efe9!important;font:600 15px/1 Poppins,sans-serif;text-decoration:none!important}",
  "html body #cml-natal .cmn-h:focus,html body #cml-natal .cmn-h:focus-visible{outline:none!important}html body #cml-natal .cmn-panel:not(#cmlx){background:#fffaf5;border:1px solid #e8ddd0}html body #cml-natal .cmn-val{border-color:#e8ddd0}html body #cml-natal .cmn-btn:not(#cmlx):not(#cmly){background:" + G + "!important;color:#f6efe9!important;box-shadow:0 12px 26px -16px rgba(166,90,20,.9)!important}html body #cml-natal .cmn-btn:not(#cmlx):not(#cmly):hover{background:#e9bf73!important}html body #cml-natal .cmn-bar .cmn-btn:not(#cmlx):not(#cmly){background:" + G + "!important;color:#f6efe9!important}",
  "html body #cml-natal .nx-acc{display:grid;gap:10px}html body #cml-natal .nx-stp{border:1px solid #e8ddd0;border-radius:20px;background:#fff;overflow:hidden}html body #cml-natal .nx-stp.on{border-color:#a65a14;box-shadow:0 0 0 1px #a65a14,0 18px 40px -30px rgba(64,61,30,.5)}html body #cml-natal .nx-stp.todo{background:#f6efe9;opacity:.6}html body #cml-natal .nx-stp .cmn-prev{display:none}",
  "html body #cml-natal .nx-stp>.cmn-st:not(#cmlx):not(#cmly){display:flex!important;align-items:center;gap:14px;width:100%;margin:0;padding:15px 18px;border:0;border-radius:0;background:none;text-align:left;font:inherit;color:#2b2916;opacity:1;cursor:default}html body #cml-natal .nx-stp>button.cmn-st:not(#cmlx):not(#cmly){cursor:pointer}html body #cml-natal .nx-stp>button.cmn-st:hover{background:#fff9f8}",
  "html body #cml-natal .nx-stp>.cmn-st i:not(#cmlx){flex:none;width:34px;height:34px;border-radius:50%;border:1px solid #e8ddd0;background:#fff;color:#6f6656;font:700 13px/32px Poppins,sans-serif;font-style:normal;text-align:center;display:block}html body #cml-natal .nx-stp.on>.cmn-st i:not(#cmlx){background:#a65a14;border-color:#a65a14;color:#fff}html body #cml-natal .nx-stp.done>.cmn-st i:not(#cmlx){background:#fbeeee;border-color:#fbeeee;color:#a65a14}",
  "html body #cml-natal .nx-ht{display:flex;flex-direction:column;gap:2px;flex:1 1 auto;min-width:0}html body #cml-natal .nx-k{font:500 10.5px/1.2 Poppins,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#a65a14;font-style:normal}html body #cml-natal .nx-stp .cmn-sl:not(#cmlx):not(#cmly){display:inline!important;font:600 16px/1.3 Poppins,sans-serif;color:#2b2916;text-decoration:none}html body #cml-natal .nx-stv{flex:0 1 44%;text-align:right;font:300 13px/1.35 Poppins,sans-serif;color:#6f6656}html body #cml-natal .nx-stp>.cmn-pane{padding:2px 18px 20px;animation:none}",
  "html body #cml-natal .cmn-panel.nx-2col{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:26px;align-items:start}html body #cml-natal .nx-side{position:sticky;top:96px;padding:24px 22px;border-radius:24px;border:1px solid rgba(166,90,20,.35);background:radial-gradient(110% 90% at 20% 15%,#5b5730 0%,#565229 55%,#403d1e 100%);color:#2b2916;font-family:Poppins,sans-serif;box-shadow:0 24px 50px -36px rgba(64,61,30,.7)}html body #cml-natal .nx-side .k{margin:0 0 4px;font:500 10.5px/1.2 Poppins,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#a65a14}html body #cml-natal .nx-side h3:not(#cmlx):not(#cmly){margin:0 0 14px;font:700 24px/1.15 Poppins,sans-serif;color:#2b2916}html body #cml-natal .nx-side h3 em:not(#cmlx):not(#cmly){font-weight:300;font-style:italic;color:#a65a14!important}",
  "html body #cml-natal .nx-side dl{margin:0;display:grid}html body #cml-natal .nx-side dl>div{display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:9px 0;border-bottom:1px solid rgba(43,41,22,.14)}html body #cml-natal .nx-side dt{flex:none;font:300 13.5px/1.4 Poppins,sans-serif;color:rgba(43,41,22,.75)}html body #cml-natal .nx-side dt small{font-size:11px;color:#a65a14}html body #cml-natal .nx-side dd{margin:0;text-align:right;font:500 13.5px/1.4 Poppins,sans-serif;color:#2b2916;min-width:0}html body #cml-natal .nx-side dd i{font-style:italic;font-weight:300;color:rgba(43,41,22,.6)}html body #cml-natal .nx-side dd ul{margin:0;padding:0;list-style:none}html body #cml-natal .nx-side dd li{font-weight:400;font-size:13px}",
  "html body #cml-natal .nx-side .tt{display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin:14px 0 2px}html body #cml-natal .nx-side .tt span{font:300 14px/1.3 Poppins,sans-serif;color:rgba(43,41,22,.8)}html body #cml-natal .nx-side .tt b{font:700 28px/1.1 Poppins,sans-serif;color:#2b2916}html body #cml-natal .nx-side .pz{margin:0 0 14px;font:400 12.5px/1.45 Poppins,sans-serif;color:#a65a14}html body #cml-natal .nx-go:not(#cmlx):not(#cmly){display:flex;align-items:center;justify-content:center;width:100%;min-height:50px;padding:0 20px;border:0;border-radius:999px;background:#a65a14;color:#f6efe9!important;font:600 15px/1 Poppins,sans-serif;cursor:pointer;box-shadow:0 14px 30px -16px rgba(166,90,20,.8)}html body #cml-natal .nx-go[disabled]{opacity:.45;cursor:not-allowed;box-shadow:none}html body #cml-natal .nx-side .hn{margin:8px 0 0;text-align:center;font:400 12px/1.4 Poppins,sans-serif;color:#a65a14}html body #cml-natal .nx-side .nt{margin:12px 0 0;text-align:center;font:300 11.5px/1.5 Poppins,sans-serif;color:rgba(43,41,22,.6)}",
  "@media (max-width:900px){html body #cml-natal .cmn-panel.nx-2col{grid-template-columns:minmax(0,1fr);gap:18px}html body #cml-natal .nx-side{position:static}}@media (max-width:640px){html body #cml-natal .nx-stp>.cmn-st:not(#cmlx):not(#cmly){padding:12px 14px;gap:10px;flex-wrap:wrap}html body #cml-natal .nx-stv{flex:1 1 100%;text-align:left;padding-left:44px}html body #cml-natal .nx-stp>.cmn-pane{padding:0 12px 16px}html body #cml-natal .nx-side{padding:20px 16px}}",
  "@media (max-width:900px){html body #cml-natal .cmn-hero:not(#cmlx):not(#cmly){grid-template-columns:minmax(0,1fr);gap:22px}html body #cml-natal .cmn-hero .nx-pic{order:-1;justify-self:stretch;width:100%;padding:8px;border-radius:22px;margin-top:22px}html body #cml-natal .cmn-hero .nx-pic img{aspect-ratio:16/9;max-height:220px;border-radius:16px}html body #cml-natal .nx-st3{grid-template-columns:minmax(0,1fr)}}",
  "@media (max-width:640px){html body #cml-natal .cmn-hero:not(#cmlx):not(#cmly){padding:18px 18px 22px!important}html body #cml-natal .nx-cta{gap:10px 16px}html body #cml-natal .nx-cta .b:not(#cmlx):not(#cmly){width:100%;justify-content:center}html body #cml-natal .nx-h{margin:36px 0 12px}html body #cml-natal .nx-faq{margin-top:40px}html body #cml-natal .nx-st3>div{padding:16px 16px 16px 62px}html body #cml-natal .nx-st3 b{left:16px;top:16px}html body #cml-natal .nx-end .in{flex-direction:column;align-items:stretch;padding:22px 18px}html body #cml-natal .nx-end .b:not(#cmlx):not(#cmly){justify-content:center}}",
  /* ---------- Home v2: destaques em cartoes, carrossel de categorias, autoridade enxuta ---------- */
  "html.cml-home2 body #cml-bkh,html.cml-home2 body #cml-clube-home,html.cml-home2 body main .cml-pair,html.cml-home2 body main .cml-ma,html.cml-home2 body #ns-section-product-list_1786996664740{display:none!important}",
  "html.cml-home2 body .c1-home .c1-sc{display:none!important}",
  "html.cml-home2 body main>#ns-section-icon_text,html.cml-home2 body main>.c2-rk,html.cml-home2 body main>.cml-nc,html.cml-home2 body main>[id^=ns-section-faq]{margin-bottom:72px!important}html.cml-home2 body main>.cml-nc{margin-top:72px!important}",
  "@media (max-width:640px){html.cml-home2 body main>#ns-section-icon_text,html.cml-home2 body main>.c2-rk,html.cml-home2 body main>.cml-nc,html.cml-home2 body main>[id^=ns-section-faq]{margin-bottom:44px!important}html.cml-home2 body main>.cml-nc{margin-top:44px!important}}",
  "html body .cml-hl{width:min(1318px,calc(100% - 32px));margin:0 auto 72px}",
  "html body .cml-hl-g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}",
  "html body .cml-hl-c{position:relative;isolation:isolate;overflow:hidden;display:flex;flex-direction:column;gap:8px;min-height:210px;padding:24px 22px 20px;border-radius:28px;border:1px solid rgba(223,174,88,.3);color:#f6efe9!important;text-decoration:none!important;transition:transform .22s ease,box-shadow .22s ease,border-color .22s}",
  "html body .cml-hl-c:after{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.11;mix-blend-mode:screen;background-image:" + GRAIN + ";background-size:220px}",
  "html body .cml-hl-c:hover{transform:translateY(-3px);border-color:rgba(223,174,88,.6);box-shadow:0 24px 44px -28px rgba(43,41,22,.2)}",
  "html body .cml-hl-c .k{display:block;font:500 10px/1.2 Poppins,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#dfae58}",
  "html body .cml-hl-c h3{margin:2px 0 0;font:700 clamp(19px,1.55vw,23px)/1.15 Poppins,sans-serif;color:#fff;letter-spacing:-.01em}html body .cml-hl-c h3 em{font-weight:300;font-style:italic;color:#f3d48b}",
  "html body .cml-hl-c p{margin:0;font:300 13.5px/1.5 Poppins,sans-serif;color:rgba(246,239,233,.8);max-width:30ch}",
  "html body .cml-hl-c .ar{margin-top:auto;align-self:flex-end;width:40px;height:40px;border-radius:50%;border:1px solid rgba(223,174,88,.6);display:grid;place-items:center;color:#f3d48b;font:300 18px/1 Poppins,sans-serif;transition:background .2s,color .2s}html body .cml-hl-c:hover .ar{background:#dfae58;color:#0b0a08}",
  "html body .cml-hl-c.t-blk{background:radial-gradient(120% 90% at 20% 0%,#24211a 0%,#121109 58%,#0c0b08 100%);border-color:rgba(223,174,88,.5)}",
  "html body .cml-hl-c.t-blk:before{content:'BLACK';position:absolute;right:-6px;bottom:-14px;z-index:-1;font:800 64px/1 Poppins,sans-serif;letter-spacing:.04em;color:rgba(223,174,88,.07);pointer-events:none}",
  "html body .cml-hl-c.t-nat{background:radial-gradient(110% 90% at 20% 15%,#5b5730 0%,#565229 55%,#403d1e 100%)}",
  "html body .cml-hl-c.t-cef{background:radial-gradient(120% 90% at 25% 15%,#b8651a 0%,#8f4d12 55%,#6b3a0c 100%);border-color:rgba(243,212,139,.4)}html body .cml-hl-c.t-cef .k{color:#f3d48b}",
  "html body .cml-hl-c.t-clb{background:radial-gradient(110% 90% at 35% 25%,#565229 0%,#565229 45%,#403d1e 100%)}",
  "html body .cml-hl-c .nv{position:absolute;top:16px;right:16px;padding:4px 9px;border-radius:999px;background:#dfae58;color:#0b0a08;font:600 9px/1 Poppins,sans-serif;letter-spacing:.12em;text-transform:uppercase}",
  "@media (max-width:1100px){html body .cml-hl-g{grid-template-columns:repeat(2,minmax(0,1fr))}}",
  "@media (max-width:640px){html body .cml-hl{width:calc(100% - 32px);margin:0 auto 44px}html body .cml-hl-g{grid-template-columns:minmax(0,1fr);gap:12px}html body .cml-hl-c{min-height:0;padding:18px 66px 18px 18px;gap:5px;border-radius:24px}html body .cml-hl-c h3{font-size:20px}html body .cml-hl-c p{font-size:13px}html body .cml-hl-c .ar{position:absolute;right:16px;top:50%;margin:0;transform:translateY(-50%);width:36px;height:36px}html body .cml-hl-c.t-blk:before{font-size:48px;bottom:-10px}html body .cml-hl-c .nv{top:12px;right:60px}}",
  /* autoridade enxuta */
  "html body .cml-nc.cml-nc2 .cml-nc-n:not(#cmlx):not(#cmly){display:flex;flex-wrap:nowrap;gap:0;background:none!important;border:0!important;border-radius:0!important;box-shadow:none!important;padding:0!important;margin:18px 0 20px}html body .cml-nc.cml-nc2 .cml-nc-n>div:not(#cmlx):not(#cmly){flex:1 1 0;min-width:0;background:none!important;border:0!important;border-left:1px solid rgba(166,90,20,.28)!important;border-radius:0!important;padding:2px 12px!important}html body .cml-nc.cml-nc2 .cml-nc-n>div:first-child:not(#cmlx):not(#cmly){border-left:0!important;padding-left:0!important}",
  "html body .cml-nc.cml-nc2 .cml-nc-n b:not(#cmlx){font:700 clamp(22px,1.9vw,28px)/1 Poppins,sans-serif;color:#a65a14}html body .cml-nc.cml-nc2 .cml-nc-n span:not(#cmlx){font:300 11.5px/1.3 Poppins,sans-serif;color:rgba(43,41,22,.72)}",
  "html body .cml-nc.cml-nc2 .cml-nc-r>*:not(.cml-nc-st){display:none!important}",
  "@media (max-width:640px){html body .cml-nc.cml-nc2 .cml-nc-n:not(#cmlx):not(#cmly){flex-wrap:wrap;gap:12px 0}html body .cml-nc.cml-nc2 .cml-nc-n>div:not(#cmlx):not(#cmly){flex:1 1 45%;padding:2px 12px!important}html body .cml-nc.cml-nc2 .cml-nc-n>div:nth-child(3):not(#cmlx):not(#cmly){border-left:0!important;padding-left:0!important}}",
  /* ---------- Home: cartao do Esquenta Black no celular (empilhado, texto completo, botao largo) ---------- */
  "@media (max-width:640px){html body #cml-bkh{margin:8px 16px 28px!important;padding:0!important}html body #cml-bkh .cbkh-in{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:14px!important;padding:26px 22px 22px!important}html body #cml-bkh .cbkh-t{width:100%!important;max-width:none!important}html body #cml-bkh .cbkh-h{font-size:30px!important;line-height:1.12!important;letter-spacing:-.01em}html body #cml-bkh .cbkh-s{display:block!important;margin:10px 0 0!important;font:300 14px/1.5 Poppins,sans-serif!important;color:rgba(43,41,22,.8)!important;max-width:30ch}html body #cml-bkh .cbkh-cd{display:none!important}html body #cml-bkh .cbkh-btn{width:100%!important;justify-content:center!important;height:48px!important;margin-top:4px}}",
  /* Menu: cores, ordem e selo NOVO ficam so no CSS do tema (22/11). Aqui so o menu do celular. */
  "html body #nav-hamburger .nav-list>.nav-item>a .cml-nv-ic{display:none}",
  "html body #nav-hamburger .nav-list>.nav-item.cml-nv-club{display:none!important}",
  "html body #nav-hamburger .c1-mn .c a.cml-club span .cml-nv-new{margin-left:6px;vertical-align:1px}",
  /* ---------- Dock unico: Cashback entra na mesma fileira (Cashback / Presente / Compra rapida / WhatsApp / Topo) ---------- */
  "html.cml-dockcb body [data-slot='corner_bottom_left'] button[aria-label='Meu cashback']{position:absolute!important;left:-9999px!important;opacity:0!important;pointer-events:none!important}",
  "html body .c1-dock>.cb{position:relative}html body .c1-dock>.cb .c1-ico{color:#a65a14}html body .c1-dock>.cb .bd{position:absolute;top:1px;right:6px;min-width:18px;height:16px;padding:0 5px;border-radius:999px;background:" + G + ";color:#f6efe9;font:600 9.5px/16px Poppins,sans-serif;text-align:center}",
  "@media (min-width:1024px){html body .c1-dock>.cb .bd{top:-4px;right:2px}}",
  "@media (max-width:640px){html.cml-dockcb body .c1-dock{left:12px;right:12px;justify-content:space-between;gap:0;padding:5px 6px}html.cml-dockcb body .c1-dock>*{min-width:0;flex:1 1 0;padding:0 2px;height:50px}html.cml-dockcb body .c1-dock>.tp{flex:0 0 40px}html.cml-dockcb body .c1-dock .lb{font-size:9px;letter-spacing:0}}",
  /* ---------- Voltar ao topo (dentro do dock Presente / Compra rapida / WhatsApp) ---------- */
  "html body .c1-dock>.tp{min-width:48px}",
  "@media (max-width:1023px){html body .c1-dock>.tp{min-width:40px;padding:0 4px}html body .c1-dock>.tp .lb{display:none}}",
  "html body .c1-dock>.tp .c1-ico{color:#a65a14}",
  "@media (min-width:1024px){html body .c1-dock>.tp{padding:0 14px 0 12px}}",
  /* ---------- Espiar: botao no card + pop-up com resumo do produto ---------- */
  "html body .js-item-product .cml-esp-row{display:flex;justify-content:flex-end;align-items:center;margin:2px 0 8px;min-width:0}",
  "html body .js-item-product .cml-esp{position:static;display:inline-flex;align-items:center;gap:5px;margin:0;padding:3px 0;border:0;background:none;color:#a65a14;font:500 11.5px/1 Poppins,sans-serif;letter-spacing:0;text-transform:none;cursor:pointer;white-space:nowrap;text-decoration:none}",
  "html body .js-item-product .cml-esp svg{width:14px;height:14px;color:#a65a14}",
  "html body .js-item-product .cml-esp:hover{color:#a65a14;text-decoration:underline;text-underline-offset:3px}html body .js-item-product .cml-esp:hover svg{color:#a65a14}",
  "html body .cml-espm{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:18px;font-family:Poppins,sans-serif}",
  "html body .cml-espm .bg{position:absolute;inset:0;background:rgba(255,250,245,.72);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}",
  "html body .cml-espm .pp{position:relative;isolation:isolate;overflow:hidden;width:min(860px,100%);max-height:88vh;display:grid;grid-template-columns:minmax(0,42%) minmax(0,1fr);border-radius:28px;border:1px solid rgba(166,90,20,.26);background:radial-gradient(120% 90% at 20% 0%,#fffaf5 0%,#f6efe9 60%,#f6efe9 100%);color:#2b2916;box-shadow:0 40px 90px -30px rgba(43,41,22,.2);animation:cmlEspIn .22s ease-out}",
  "@keyframes cmlEspIn{from{opacity:0;transform:translateY(12px) scale(.985)}to{opacity:1;transform:none}}",
  "html body .cml-espm .pp:after{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.1;mix-blend-mode:screen;background-image:" + GRAIN + ";background-size:220px}",
  "html body .cml-espm .x{position:absolute;right:14px;top:14px;z-index:3;width:38px;height:38px;border-radius:50%;border:1px solid rgba(166,90,20,.35);background:rgba(255,250,245,.7);color:#2b2916;font:300 24px/1 Poppins,sans-serif;cursor:pointer;display:grid;place-items:center}",
  "html body .cml-espm .ph{position:relative;min-height:320px;background:#fff}",
  "html body .cml-espm .ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}",
  "html body .cml-espm .pi{padding:28px 28px 24px;overflow:auto;max-height:88vh}",
  "html body .cml-espm .k{display:block;margin:0 0 6px;font:500 10px/1.2 Poppins,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#a65a14}",
  "html body .cml-espm h3{margin:0 0 10px;font:700 clamp(19px,2.2vw,24px)/1.15 Poppins,sans-serif;color:#2b2916;letter-spacing:-.01em}",
  "html body .cml-espm .pr{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 10px;margin:0 0 14px}",
  "html body .cml-espm .pr b{font:700 20px/1 Poppins,sans-serif;color:#a65a14}",
  "html body .cml-espm .pr s{font:300 13px/1 Poppins,sans-serif;color:rgba(43,41,22,.5)}",
  "html body .cml-espm .pr small{flex-basis:100%;font:300 12px/1.3 Poppins,sans-serif;color:rgba(43,41,22,.65)}html body .cml-espm .pr small b{font:600 12px/1.3 Poppins,sans-serif;color:#a65a14}",
  "html body .cml-espm .lead{margin:0 0 14px;font:300 14px/1.6 Poppins,sans-serif;color:rgba(43,41,22,.86)}",
  "html body .cml-espm dl{margin:0;display:grid;gap:10px}",
  "html body .cml-espm dt{font:500 10px/1.2 Poppins,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#a65a14;margin:0 0 3px}",
  "html body .cml-espm dd{margin:0;font:300 13.5px/1.55 Poppins,sans-serif;color:rgba(43,41,22,.82)}",
  "html body .cml-espm dd ul{margin:0;padding:0;list-style:none}html body .cml-espm dd li{position:relative;padding-left:14px}html body .cml-espm dd li:before{content:'';position:absolute;left:0;top:9px;width:5px;height:5px;border-radius:50%;background:" + G + "}",
  "html body .cml-espm dd.chips{display:flex;flex-wrap:wrap;gap:6px}html body .cml-espm dd.chips span{padding:5px 10px;border-radius:999px;border:1px solid rgba(166,90,20,.3);background:rgba(43,41,22,.05);font:400 12px/1.2 Poppins,sans-serif;color:" + INK + "}",
  "html body .cml-espm .sk{display:grid;gap:10px;margin:4px 0 16px}html body .cml-espm .sk i{display:block;height:12px;border-radius:6px;background:linear-gradient(90deg,rgba(43,41,22,.06),rgba(43,41,22,.14),rgba(43,41,22,.06));background-size:200% 100%;animation:cmlSk 1.2s linear infinite}html body .cml-espm .sk i:nth-child(2){width:80%}html body .cml-espm .sk i:nth-child(3){width:60%}",
  "@keyframes cmlSk{from{background-position:200% 0}to{background-position:-200% 0}}",
  "html body .cml-espm .ct{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px;padding-top:16px;border-top:1px solid rgba(166,90,20,.16)}",
  "html body .cml-espm .ct a.b,html body .cml-espm .ct button.b{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:46px;padding:0 22px;border-radius:999px;border:1px solid " + G + ";background:" + G + ";color:#f6efe9!important;font:600 14px/1 Poppins,sans-serif;text-decoration:none!important;cursor:pointer;box-shadow:0 12px 26px -16px rgba(166,90,20,.8)}",
  "html body .cml-espm .ct a.o{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 20px;border-radius:999px;border:1px solid rgba(166,90,20,.5);background:transparent;color:#a65a14!important;font:500 14px/1 Poppins,sans-serif;text-decoration:none!important}",
  "html body .cml-espm .ct a.o:hover{border-color:" + G + "}",
  "html body .cml-espm .nf{font:300 13px/1.5 Poppins,sans-serif;color:rgba(43,41,22,.6)}",
  "html body.cml-esp-open{overflow:hidden}",
  "@media (max-width:760px){html body .cml-espm{align-items:flex-end;padding:0}html body .cml-espm .pp{width:100%;max-height:92vh;grid-template-columns:1fr;grid-template-rows:200px minmax(0,1fr);border-radius:28px 28px 0 0;animation-name:cmlEspUp}html body .cml-espm .ph{min-height:0}html body .cml-espm .pi{padding:18px 18px 22px;max-height:none}html body .cml-espm .ct a.b,html body .cml-espm .ct button.b,html body .cml-espm .ct a.o{flex:1 1 auto}}",
  "@keyframes cmlEspUp{from{transform:translateY(30px);opacity:0}to{transform:none;opacity:1}}",
  ""
  ].join("\n");

  function addCss() { if (D.getElementById("cml-pag-css")) return; var s = D.createElement("style"); s.id = "cml-pag-css"; s.textContent = CSS; (D.head || D.documentElement).appendChild(s); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* 1) rodape: bandeiras + copyright dentro do rodape da marca */
  function footPay() {
    var ft = D.querySelector("#ns-section-footer .c7-ft"); var sec = D.querySelector("#ns-section-footer .footer-secondary-info");
    if (!ft || !sec || ft.querySelector(".cml-fx")) return;
    var logos = sec.querySelector(".footer-logos-wrapper"); var copy = sec.querySelector(".footer-copyright");
    var row = D.createElement("div"); row.className = "cml-fx";
    var lb = D.createElement("span"); lb.className = "lb"; lb.textContent = "Pagamento seguro"; row.appendChild(lb);
    if (logos) { [].forEach.call(logos.querySelectorAll("img"), function (i) { if (i.getAttribute("data-src") && !i.getAttribute("src")) i.setAttribute("src", i.getAttribute("data-src")); i.removeAttribute("loading"); }); row.appendChild(logos); }
    if (copy) row.appendChild(copy);
    ft.appendChild(row);
    sec.closest("#ns-section-footer").classList.add("cml-fx-on");
  }

  /* 2) mega menu */
  var MM = {
    "/chas/": { k: "Chás e infusões", t: "Para cada <em>momento do dia</em>", p: "Chás mistos, trouxinhas e infusões na fruta, feitos à mão em Florianópolis.", b: ["Ver todos os chás", "/chas/"], l: ["Encontre o seu chá em 1 minuto", "/encontre-seu-cha/"] },
    "/snacks-granolas/": { k: "Snacks e granolas", t: "A pausa <em>que faz bem</em>", p: "Crocantes, frutas desidratadas e granolas sem açúcar refinado.", b: ["Ver todos os snacks", "/snacks-granolas/"], l: ["Preços de Black até 30/11", "/ofertas/"] },
    "/kits-presentes/": { k: "Kits e presentes", t: "Presentear <em>com cuidado</em>", p: "Caixas montadas à mão, com cartão escrito e entrega para todo o Brasil.", b: ["Ver todos os kits", "/kits-presentes/"], l: ["Montar o meu presente", "/presentes-de-natal/"] },
    "/acessorios/": { k: "Acessórios", t: "O ritual <em>completo</em>", p: "Xícaras, infusores, garrafas e chaleiras para a hora do chá.", b: ["Ver todos os acessórios", "/acessorios/"], l: ["Dúvidas sobre preparo", "/faq/"] }
  };
  function megaMenu() {
    if (!matchMedia("(min-width:1024px)").matches) return;
    var lis = D.querySelectorAll(".nav-desktop-list > li.nav-dropdown");
    [].forEach.call(lis, function (li) {
      var dd = li.querySelector(".desktop-dropdown > .container"); if (!dd || dd.querySelector(".cml-mm-side")) return;
      var a = li.querySelector(":scope > a"); var href = a ? (a.getAttribute("href") || "").replace(/^https?:\/\/[^/]+/, "") : "";
      var ul = dd.querySelector(".desktop-list-subitems");
      var m = MM[href] || { k: a ? a.textContent.trim() : "", t: "Ver <em>tudo</em>", p: "", b: ["Ver todos", href || "/produtos/"], l: null };
      var side = D.createElement("aside"); side.className = "cml-mm-side";
      side.innerHTML = '<span class="k">' + esc(m.k) + '</span><h4>' + m.t + '</h4>' + (m.p ? '<p>' + esc(m.p) + '</p>' : '') + '<a class="b" href="' + esc(m.b[1]) + '">' + esc(m.b[0]) + ' →</a>' + (m.l ? '<a class="l" href="' + esc(m.l[1]) + '">' + esc(m.l[0]) + ' ›</a>' : '');
      dd.appendChild(side);
    });
  }

  /* 3) FAQ */
  var FQG = [["pag", "Pagamento", /pagamento|pix|cart[aã]o|boleto/i], ["env", "Envio e prazos", /envio|frete|receber|demorar|prazo|rastre/i], ["troca", "Trocas e devoluções", /desistir|trocar|troca|danificad|devolu|reembolso/i], ["prod", "Produtos e revenda", /a[cç][uú]car|caf[eé]|ingrediente|revenda|validade|conserva/i]];
  var fqT0 = 0;
  function fqGroup(q) { if (FQG[2][2].test(q)) return "troca"; for (var i = 0; i < FQG.length; i++) if (FQG[i][2].test(q)) return FQG[i][0]; return "prod"; }
  function faqPage() {
    if (!/^\/faq\/?$/.test(P) || !D.body) return;
    D.body.classList.add("cml-fqp");
    if (D.querySelector(".cml-fq")) return;
    /* o bloco do tema e reescrito por outro script (cml-extra) logo depois de carregar; espera por ele ate 2,5 s */
    if (!fqT0) fqT0 = Date.now();
    var tf = D.querySelector(".section-faq"); if (tf && !/revenda/i.test(tf.textContent) && Date.now() - fqT0 < 2500) return;
    var root = D.querySelector(".section-main-page .page-content > div"); if (!root) return;
    var blocks = [].slice.call(root.children); if (blocks.length < 4) return;
    var items = [];
    blocks.forEach(function (b) {
      var h = b.querySelector("h3"); if (!h) return;
      var q = h.textContent.trim(); var body = D.createElement("div"); body.className = "cml-fq-a";
      [].slice.call(b.children).forEach(function (c) { if (c !== h) body.appendChild(c); });
      var tb = body.querySelector("table"); if (tb && !tb.querySelector("img")) tb.classList.add("cml-fq-tb");
      items.push({ q: q, g: fqGroup(q), body: body }); b.classList.add("cml-fq-hid");
    });
    /* perguntas que so existiam no bloco do tema (sem repetir as que ja estao acima, mesmo com outras palavras) */
    var STOP = " qual quais para como onde quanto quando meu minha meus posso tenho voce voces pode podem sobre mais tem esta este isso sera devo fazer ";
    function words(s) { return norm(s).replace(/[^a-z ]/g, " ").split(/\s+/).filter(function (w) { return w.length > 3 && STOP.indexOf(" " + w + " ") < 0; }).map(function (w) { return w.slice(0, 5); }); }
    function similar(a, b) { var wa = words(a), wb = words(b); if (!wa.length || !wb.length) return false; var n = 0; wa.forEach(function (w) { if (wb.indexOf(w) > -1) n++; }); return n / Math.min(wa.length, wb.length) >= 0.6; }
    [].forEach.call(D.querySelectorAll(".section-faq .accordion-item"), function (it) {
      var t = it.querySelector(".accordion-item-toggle-text"), bd = it.querySelector(".accordion-item-body"); if (!t || !bd) return;
      var q = t.textContent.trim();
      var dup = /formas de pagamento|frete gr|meios de envio|doces|enviam para todos|custos? do envio/i.test(q);
      items.forEach(function (i) { if (similar(i.q, q)) dup = true; });
      if (dup) return;
      var body = D.createElement("div"); body.className = "cml-fq-a"; body.innerHTML = bd.innerHTML;
      items.push({ q: q, g: fqGroup(q), body: body });
    });
    if (!items.length) return;
    var wrap = D.createElement("div"); wrap.className = "cml-fq";
    var top = D.createElement("div"); top.className = "cml-fq-top";
    var tabs = D.createElement("div"); tabs.className = "cml-fq-tabs"; tabs.setAttribute("role", "group"); tabs.setAttribute("aria-label", "Assuntos");
    var all = [["all", "Todas"]].concat(FQG.map(function (g) { return [g[0], g[1]]; }));
    tabs.innerHTML = all.map(function (g, i) { return '<button type="button" data-g="' + g[0] + '" aria-pressed="' + (i === 0 ? "true" : "false") + '">' + esc(g[1]) + '</button>'; }).join("");
    var sb = D.createElement("label"); sb.className = "cml-fq-s";
    sb.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input type="search" placeholder="Buscar uma dúvida" aria-label="Buscar uma dúvida" autocomplete="off">';
    top.appendChild(tabs); top.appendChild(sb); wrap.appendChild(top);
    FQG.forEach(function (g) {
      var arr = items.filter(function (i) { return i.g === g[0]; }); if (!arr.length) return;
      var sec = D.createElement("section"); sec.className = "cml-fq-g"; sec.setAttribute("data-g", g[0]);
      sec.innerHTML = "<h3>" + esc(g[1]) + "</h3>";
      arr.forEach(function (i, n) {
        var d = D.createElement("details"); d.className = "cml-fq-it"; d.setAttribute("data-g", g[0]);
        var s = D.createElement("summary"); s.innerHTML = "<span>" + esc(i.q) + "</span><i aria-hidden=\"true\"></i>"; d.appendChild(s); d.appendChild(i.body);
        if (g[0] === "pag" && n === 0) d.open = true;
        sec.appendChild(d);
      });
      wrap.appendChild(sec);
    });
    var none = D.createElement("p"); none.className = "cml-fq-none"; none.textContent = "Nada encontrado com essas palavras. Fale com a gente pelo WhatsApp que a resposta vem rapidinho."; wrap.appendChild(none);
    /* entra depois do bloco de abertura (o primeiro, com os numeros) */
    var first = blocks[0]; first.parentNode.insertBefore(wrap, first.nextSibling);
    function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
    var cur = "all", term = "";
    function filt() {
      var vis = 0;
      [].forEach.call(wrap.querySelectorAll(".cml-fq-g"), function (sec) {
        var any = 0;
        [].forEach.call(sec.querySelectorAll(".cml-fq-it"), function (it) {
          var ok = (cur === "all" || it.getAttribute("data-g") === cur) && (!term || norm(it.textContent).indexOf(term) > -1);
          it.classList.toggle("cml-hid", !ok); if (ok) { any++; if (term) it.open = true; }
        });
        sec.classList.toggle("cml-hid", !any); vis += any;
      });
      wrap.classList.toggle("cml-empty", !vis);
    }
    tabs.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; cur = b.getAttribute("data-g"); [].forEach.call(tabs.children, function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); filt(); });
    sb.querySelector("input").addEventListener("input", function (e) { term = norm(e.target.value).trim(); filt(); });
  }

  /* 4) Contato */
  var IC = {
    wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 11.6a8.4 8.4 0 0 1-12.3 7.4L4 20l1.1-4a8.4 8.4 0 1 1 15.4-4.4z"/><path d="M9.2 8.6c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .6.4l.8 1.9c.1.2 0 .4-.1.6l-.5.6c-.1.2-.2.3 0 .6a6.6 6.6 0 0 0 3 2.7c.3.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.2.4.4a2.3 2.3 0 0 1-1.6 2.1c-.6.2-1.3.2-2.2-.1a9.6 9.6 0 0 1-5.5-5.4c-.4-1-.3-1.9.2-2.6z" fill="currentColor" fill-opacity=".14"/></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5 12 4l8.5 4.5v8L12 21l-8.5-4.5z"/><path d="M3.5 8.5 12 13l8.5-4.5M12 13v8"/><path d="M7.5 6.4l8.6 4.5" stroke-opacity=".5"/></svg>',
    swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h13l-3-3M20 15H7l3 3"/></svg>',
    q: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity=".1"/><path d="M9.6 9.5a2.5 2.5 0 1 1 3.6 2.3c-.8.4-1.2 1-1.2 1.8M12 17h.01"/></svg>'
  };
  function contactPage() {
    if (!/^\/contato\/?$/.test(P) || !D.body) return;
    var hero = D.querySelector("section.cml-ct"); var form = D.querySelector("#ns-section-contact_form");
    if (!hero || !form || D.querySelector(".cml-ct2")) return;
    var wa = hero.querySelector('a[href*="wa.me"]'); var waH = wa ? wa.getAttribute("href") : "https://wa.me/554791571974";
    var w = D.createElement("section"); w.className = "cml-ct2";
    w.innerHTML = '<div class="cml-ct2-wa"><div class="t"><span class="ic">' + IC.wa + '</span><div><span class="k">Atendimento direto</span><h3>Fale com a Cris e o Thierry <em>pelo WhatsApp</em></h3><p>É por lá que respondemos mais rápido: dúvidas sobre produtos, pedidos, presentes e revenda.</p></div></div><a class="b" href="' + esc(waH) + '" target="_blank" rel="noopener">' + IC.wa + 'Chamar no WhatsApp</a></div>'
      + '<div class="cml-ct2-q"><a href="/account/"><span class="ic">' + IC.box + '</span><span><b>Acompanhar meu pedido</b><small>Status, rastreio e previsão de entrega na sua conta</small></span></a>'
      + '<a href="/politica-de-troca/"><span class="ic">' + IC.swap + '</span><span><b>Trocas e devoluções</b><small>7 dias para desistir e 15 para trocar, com o produto lacrado</small></span></a>'
      + '<a href="/faq/"><span class="ic">' + IC.q + '</span><span><b>Dúvidas frequentes</b><small>Pagamento, frete, prazos e ingredientes</small></span></a></div>';
    form.parentNode.insertBefore(w, form);
  }

  /* 5) Encontre seu cha: marca a pagina (o visual vem do CSS acima) */
  function cefPage() { if (/^\/encontre-seu-cha/.test(P) && D.body) D.body.classList.add("cml-cef"); }


  /* 6) Minha conta: rastreio do pedido dentro da pagina (cartao + pop-up "Ver status") */
  var TRC = {}, TRQ = {};
  var ETL = { 1: "Etiqueta criada, aguardando coleta", 2: "Postado na transportadora", 3: "A caminho", 4: "Saiu para entrega", 5: "Entregue", 6: "Devolvido ao remetente" };
  var BDL = { 1: "Aguardando coleta", 2: "Postado", 3: "A caminho", 4: "Saiu para entrega", 5: "Entregue", 6: "Devolvido" };
  var IOK2 = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  function dedupe(ev) { var out = []; (ev || []).forEach(function (e) { var p = out[out.length - 1]; if (p && p.t === e.t && Math.abs(new Date(p.at) - new Date(e.at)) < 20 * 60000) return; out.push(e); }); return out; }
  function badge(el, j) { if (!el || /cancel|aguardando pagamento/i.test(el.textContent)) return; el.textContent = BDL[j.etapa] || el.textContent; el.classList.toggle("ok", j.etapa === 5); }
  if (/^\/account\/?$/.test(P)) {
    try {
      var _f = window.fetch;
      window.fetch = function (u) {
        var pr = _f.apply(this, arguments);
        try { if (typeof u === "string" && u.indexOf("cml-minha-conta") > -1) pr.then(function (r) { r.clone().json().then(function (j) { window.__cmlOrd = (j && j.orders) || []; setTimeout(contaTrack, 50); setTimeout(contaTrack, 800); }).catch(function () {}); }); } catch (e) {}
        return pr;
      };
    } catch (e) {}
  }
  function fmtD(s) { if (!s) return ""; var d = new Date(s); if (isNaN(d)) return ""; return ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2); }
  function fmtDH(s) { var d = new Date(s); if (isNaN(d)) return ""; return fmtD(s) + " · " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2); }
  function wk(s) { var d = new Date(s); if (isNaN(d)) return ""; return ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"][d.getDay()]; }
  function trGet(o) {
    var n = o.number, c = o.tracking_number; if (!n || !c) return null;
    if (TRC[n]) return TRC[n];
    if (!TRQ[n]) { TRQ[n] = 1; fetch("https://dzmlyrkzcdqicwfmxnxd.supabase.co/functions/v1/cml-rastreio", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ n: n, c: c }) }).then(function (r) { return r.json(); }).then(function (j) { if (j && j.ok) { TRC[n] = j; contaTrack(); } }).catch(function () {}); }
    return null;
  }
  function trSummary(j) {
    var e = j.eventos && j.eventos[0]; var last = e ? (e.t + (e.loc ? " · " + e.loc : "") + " · " + fmtDH(e.at)) : "";
    var eta = j.etapa >= 5 ? (j.entregue_em ? "Entregue em " + fmtD(j.entregue_em) : "") : (j.eta ? "Previsão de entrega: " + fmtD(j.eta) + " (" + wk(j.eta) + ")" : "");
    return { label: ETL[j.etapa] || "Em andamento", last: last, eta: eta };
  }
  function contaTrack() {
    if (!/^\/account\/?$/.test(P) || !D.body) return;
    var O = window.__cmlOrd || []; if (!O.length) return;
    var now = Date.now();
    O.forEach(function (o) {
      if (!o.tracking_number || o.status === "cancelled") return;
      var age = now - new Date(o.created_at).getTime(); if (age > 90 * 86400000) return;
      var j = trGet(o); if (!j) return;
      var s = trSummary(j);
      /* cartao */
      var rx = new RegExp("#" + o.number + "(\\D|$)"); var card = null; [].forEach.call(D.querySelectorAll(".cmc-o"), function (c) { var b = c.querySelector(".cmc-oh b"); if (b && rx.test(b.textContent)) card = c; });
      if (card && !card.querySelector(".cml-tr")) {
        var box = D.createElement("div"); box.className = "cml-tr" + (j.etapa === 5 ? " ok" : "") + (j.alerta ? " al" : "");
        box.innerHTML = "<i></i><div><b>" + esc(s.label) + "</b>" + (s.last ? "<small>" + esc(s.last) + "</small>" : "") + (s.eta ? '<small class="eta">' + esc(s.eta) + "</small>" : "") + "</div>";
        var st = card.querySelector(".cmc-st"); if (st) st.parentNode.insertBefore(box, st.nextSibling); else card.insertBefore(box, card.querySelector(".cmc-it"));
        var steps = card.querySelectorAll(".cmc-st > div"); if (steps.length === 5) { if (j.etapa >= 3) steps[3].classList.add("on"); if (j.etapa === 5) steps[4].classList.add("on"); }
        badge(card.querySelector(".cmc-bd"), j);
      }
      /* pop-up aberto */
      var pop = D.querySelector(".cmc-pp"); if (pop && !pop.querySelector(".cml-trp")) {
        var hb = pop.querySelector(".cmc-oh b"); if (hb && rx.test(hb.textContent)) {
          var ck = pop.querySelector(".cmc-ck"); if (ck) {
            var ev = dedupe(j.eventos); var w = D.createElement("div"); w.className = "cml-trp" + (j.alerta ? " al" : "");
            badge(pop.querySelector(".cmc-bd"), j);
            var lis = ck.querySelectorAll("li"); if (lis.length === 5) { [3, 4].forEach(function (ix) { var on = ix === 3 ? j.etapa >= 3 : j.etapa === 5; if (on) { lis[ix].classList.remove("cur"); lis[ix].classList.add("on"); var ii = lis[ix].querySelector("i"); if (ii && !ii.innerHTML) ii.innerHTML = IOK2; } }); if (j.etapa >= 3 && j.etapa < 5) { lis[4].classList.add("cur"); } }
            w.innerHTML = '<span class="k">Rastreio ' + esc(j.servico ? "· " + j.servico.replace(/\s*\(via Melhor Envio\)/i, "") : "") + '</span><div class="h"><b>' + esc(s.label) + "</b>" + (s.eta ? "<span>" + esc(s.eta) + "</span>" : "") + "</div>"
              + (ev.length ? "<ol>" + ev.map(function (e, i) { return '<li class="' + (i >= 4 ? "cml-more" : "") + '"><b>' + esc(e.t) + "</b>" + (e.d && e.d !== e.t ? "<small>" + esc(e.d) + "</small>" : "") + "<small>" + esc((e.loc ? e.loc + " · " : "") + fmtDH(e.at)) + "</small></li>"; }).join("") + "</ol>" + (ev.length > 4 ? '<button type="button" class="mb">Ver todas as atualizações (' + ev.length + ")</button>" : "") : '<p class="src">A transportadora ainda não registrou a coleta. Assim que o pacote for postado, as atualizações aparecem aqui.</p>')
              + '<p class="src">Código ' + esc(j.c) + " · atualizado pela transportadora via Melhor Envio</p>";
            ck.parentNode.insertBefore(w, ck.nextSibling);
            var mb = w.querySelector(".mb"); if (mb) mb.addEventListener("click", function () { w.classList.add("open"); mb.remove(); });
            var ex = pop.querySelector(".cmc-pt a.cmc-btn"); if (ex) { ex.classList.remove("cmc-btn"); ex.classList.add("cmc-lnk"); ex.innerHTML = "Abrir no site da transportadora ›"; }
          }
        }
      }
    });
  }
  function sacola() {
    [].forEach.call(D.querySelectorAll("#modal-cart .c7-cs .mi-embla__slide button"), function (b) { if (/adicionar ao carrinho/i.test(b.textContent) && !b.querySelector("*")) b.textContent = "Adicionar"; });
  }
  /* 8) Espiar: botao no card + pop-up com resumo objetivo do produto (funcao cml-espiar) */
  var ESPC = {}, ESPM = null;
  var IEYE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></svg>';
  function espBtns() {
    [].forEach.call(D.querySelectorAll(".js-item-product[data-product-id]"), function (c) {
      if (c.querySelector(".cml-esp")) return;
      var info = c.querySelector(".product-item-information"); if (!info) return;
      var b = D.createElement("button"); b.type = "button"; b.className = "cml-esp"; b.setAttribute("data-esp", c.getAttribute("data-product-id")); b.setAttribute("aria-label", "Espiar o produto"); b.innerHTML = IEYE + "<span>Espiar</span>";
      var row = D.createElement("div"); row.className = "cml-esp-row"; row.appendChild(b);
      var qs = info.querySelector(".product-item-quick-shop-container, .js-item-submit-container");
      if (qs && qs.parentNode === info) info.insertBefore(row, qs); else info.appendChild(row);
    });
  }
  function espClose() { if (ESPM) { ESPM.remove(); ESPM = null; D.body.classList.remove("cml-esp-open"); } }
  function espOpen(id, card) {
    espClose();
    var name = card ? (card.querySelector(".js-item-name") || {}).textContent || "" : ""; name = name.trim();
    var href = card ? ((card.querySelector("a.product-item-link") || card.querySelector("a[href*='/produtos/']") || {}).getAttribute ? (card.querySelector("a.product-item-link") || card.querySelector("a[href*='/produtos/']")).getAttribute("href") : "") : "";
    var pr = card ? ((card.querySelector(".js-price-display") || {}).textContent || "").trim() : "";
    var cmp = card ? ((card.querySelector(".js-compare-price-display") || {}).textContent || "").trim() : "";
    var cb = card ? ((card.querySelector(".c2-cb b") || {}).textContent || "").trim() : "";
    var im = card ? card.querySelector(".product-item-image-container img") : null; var src = im ? (im.currentSrc || im.getAttribute("src") || im.getAttribute("data-src") || "") : "";
    var addBtn = card ? card.querySelector(".js-addtocart") : null;
    ESPM = D.createElement("div"); ESPM.className = "cml-espm"; ESPM.setAttribute("role", "dialog"); ESPM.setAttribute("aria-modal", "true"); ESPM.setAttribute("aria-label", "Resumo do produto " + name);
    ESPM.innerHTML = '<div class="bg" data-close></div><div class="pp"><button type="button" class="x" data-close aria-label="Fechar">&times;</button><div class="ph">' + (src ? '<img src="' + esc(src) + '" alt="">' : "") + '</div><div class="pi"><span class="k">Espiar</span><h3>' + esc(name) + '</h3><div class="pr">' + (pr ? "<b>" + esc(pr) + "</b>" : "") + (cmp && cmp !== pr ? "<s>" + esc(cmp) + "</s>" : "") + (cb ? "<small>+ <b>" + esc(cb) + "</b> de cashback</small>" : "") + '</div><div class="sk"><i></i><i></i><i></i></div><div class="bd"></div><div class="ct">' + (href ? '<a class="b" href="' + esc(href) + '">Ver produto completo →</a>' : "") + (addBtn && !addBtn.disabled ? '<a class="o" href="#" data-add>Adicionar à sacola</a>' : "") + '</div></div></div>';
    D.body.appendChild(ESPM); D.body.classList.add("cml-esp-open");
    ESPM.addEventListener("click", function (e) {
      if (e.target.closest("[data-close]")) { espClose(); return; }
      var ad = e.target.closest("[data-add]"); if (ad) { e.preventDefault(); espClose(); try { addBtn.click(); } catch (x) { if (href) location.href = href; } }
    });
    var xb = ESPM.querySelector(".x"); if (xb) xb.focus();
    function fill(j) {
      if (!ESPM) return; var sk = ESPM.querySelector(".sk"); if (sk) sk.remove(); var bd = ESPM.querySelector(".bd"); if (!bd) return;
      if (!j || !j.ok) { bd.innerHTML = '<p class="nf">Não consegui carregar o resumo agora. Veja tudo na página do produto.</p>'; return; }
      var r = j.r || {}, h = "";
      if (r.intro) h += '<p class="lead">' + esc(r.intro) + "</p>";
      var dl = "";
      if (r.ingredientes) dl += "<div><dt>Ingredientes</dt><dd>" + esc(r.ingredientes) + "</dd></div>";
      if (r.sabor && r.sabor.length) dl += "<div><dt>Na xícara</dt><dd><ul>" + r.sabor.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></dd></div>";
      if (r.preparo && r.preparo.length) dl += '<div><dt>Preparo</dt><dd class="chips">' + r.preparo.map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("") + "</dd></div>";
      if (r.ficha && r.ficha.length) dl += "<div><dt>Ficha</dt><dd><ul>" + r.ficha.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></dd></div>";
      if (r.pontos && r.pontos.length) dl += "<div><dt>Em resumo</dt><dd><ul>" + r.pontos.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></dd></div>";
      if (dl) h += "<dl>" + dl + "</dl>";
      if (j.multi && j.opts && j.opts.length) h += '<p class="nf" style="margin:12px 0 0">Opções de ' + esc(j.opts.join(" e ").toLowerCase()) + " na página do produto.</p>";
      if (!h) h = '<p class="nf">Veja a descrição completa na página do produto.</p>';
      bd.innerHTML = h;
      var ph = ESPM.querySelector(".ph"); if (ph && !ph.querySelector("img") && j.img) ph.innerHTML = '<img src="' + esc(j.img) + '" alt="">';
    }
    if (ESPC[id]) { fill(ESPC[id]); return; }
    fetch("https://dzmlyrkzcdqicwfmxnxd.supabase.co/functions/v1/cml-espiar?id=" + encodeURIComponent(id)).then(function (r) { return r.json(); }).then(function (j) { ESPC[id] = j; fill(j); }).catch(function () { fill(null); });
  }
  D.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest(".cml-esp"); if (!b) return; e.preventDefault(); e.stopPropagation(); espOpen(b.getAttribute("data-esp"), b.closest(".js-item-product")); }, true);
  D.addEventListener("keydown", function (e) { if (e.key === "Escape") espClose(); });
  /* 13) Encontre seu cha no padrao do Clube: abertura oliva com a foto, "como funciona", o quiz (igual), duvidas e fechamento */
  function cefPlus() {
    if (!/^\/encontre-seu-cha/.test(P)) return;
    var cef = D.querySelector("main section.cef"); if (!cef || D.querySelector(".cml-cx-hero")) return;
    var inn = cef.querySelector(".cef-in"); var eb = inn && inn.querySelector(".cef-eb"), h = inn && inn.querySelector(".cef-h"), sub = inn && inn.querySelector(".cef-sub");
    if (!inn || !h) return;
    cef.id = cef.id || "cef-quiz";
    var hero = D.createElement("section"); hero.className = "cml-cx cml-cx-hero"; hero.setAttribute("aria-label", "Encontre o seu chá");
    hero.innerHTML = '<div class="in"><div class="tx"></div><figure class="pic"><img src="' + CIMG + 'serenissimo-5-46afd3ef18c44feaf517895714984344-1024-1024.webp" alt="Chá misto Sereníssimo da Chef Mais Leve, na mesa, pronto para preparar" loading="eager" decoding="async"></figure></div>';
    var tx = hero.querySelector(".tx");
    if (eb) { eb.textContent = "Em 1 minuto"; tx.appendChild(eb); }
    tx.appendChild(h);
    if (sub) { sub.textContent = "Você conta como prefere escolher e a gente mostra os chás que combinam com você. Dois toques, sem cadastro."; tx.appendChild(sub); }
    tx.insertAdjacentHTML("beforeend", '<div class="cta"><a class="b" href="#cef-quiz">Começar agora <span aria-hidden="true">→</span></a><a class="l" href="/chas/">Ver todos os chás</a></div><ul class="chips"><li>11 chás mistos artesanais</li><li>Feito à mão em SC</li><li>Sem aditivos</li></ul>');
    var steps = D.createElement("section"); steps.className = "cml-cx cml-cx-steps"; steps.setAttribute("aria-label", "Como funciona");
    steps.innerHTML = '<p class="k">Como funciona</p><h2>Simples assim, <em>em três toques.</em></h2><div class="st3"><div><b>1</b><strong>Diga como prefere escolher</strong><span>Pelo momento do dia, pelo sabor ou pelo ingrediente.</span></div><div><b>2</b><strong>Toque na sua opção</strong><span>Para a noite, dias frios, floral, frutado, cada escolha afina a lista.</span></div><div><b>3</b><strong>Veja os chás que combinam</strong><span>Os chás mistos certos para você, com o que tem na xícara e como preparar.</span></div></div>';
    var qh = D.createElement("div"); qh.className = "cml-cx cml-cx-h"; qh.innerHTML = '<p class="k">Vamos lá</p><h2>Conte como <em>você prefere.</em></h2>';
    cef.parentNode.insertBefore(hero, cef); /* 11/11: os passos estaticos (steps) sairam, confundiam com o quiz; para voltar: cef.parentNode.insertBefore(steps, cef) */ cef.parentNode.insertBefore(qh, cef);
    var faq = D.createElement("section"); faq.className = "cml-cx cml-cx-faq"; faq.setAttribute("aria-label", "Dúvidas");
    faq.innerHTML = '<p class="k">Dúvidas</p><h2>Antes de <em>escolher.</em></h2>'
      + '<details><summary>Posso refazer a escolha?</summary><p>Pode, quantas vezes quiser. Volte um passo ou comece de novo e veja outra combinação.</p></details>'
      + '<details><summary>Os chás têm cafeína?</summary><p>Temos chás mistos com e sem cafeína. Escolhendo "sem cafeína" ou "para a noite", a lista mostra só os livres de cafeína.</p></details>'
      + '<details><summary>Como preparo o chá em casa?</summary><p>Uma colher de sopa por xícara, água entre 80 e 90°C (sem ferver) e 5 a 8 minutos abafado. Cada pacote de 40g rende até 20 xícaras.</p></details>';
    var end = D.createElement("section"); end.className = "cml-cx cml-cx-end"; end.setAttribute("aria-label", "Ver todos os chás");
    end.innerHTML = '<div class="in"><div><h2>Prefere escolher <em>sozinho?</em></h2><p>Todos os chás mistos, trouxinhas e infusões na fruta, com foto e descrição.</p></div><a class="b" href="/chas/">Ver todos os chás <span aria-hidden="true">→</span></a></div>';
    cef.parentNode.insertBefore(faq, cef.nextSibling); faq.parentNode.insertBefore(end, faq.nextSibling);
    hero.addEventListener("click", function (e) { var a = e.target.closest && e.target.closest('a[href="#cef-quiz"]'); if (!a) return; e.preventDefault(); var top = cef.getBoundingClientRect().top + window.scrollY - 90; try { window.scrollTo({ top: top, behavior: "smooth" }); } catch (x) { window.scrollTo(0, top); } });
  }
  /* 14) Monte seu presente (Natal) no padrao do Clube: abertura com foto e chamada, "como funciona", o montador (igual), duvidas e fechamento */
  function natPlus() {
    if (!/^\/presentes-de-natal/.test(P)) return;
    var root = D.getElementById("cml-natal"); var cmn = root && root.querySelector(".cmn"); var hero = cmn && cmn.querySelector(".cmn-hero");
    if (!hero || hero.querySelector(".nx-tx")) return;
    var val = cmn.querySelector(".cmn-val"), panel = cmn.querySelector(".cmn-panel"); if (!panel) return;
    panel.id = panel.id || "nx-montar";
    var tx = D.createElement("div"); tx.className = "nx-tx";
    [].slice.call(hero.children).forEach(function (c) { if (!c.classList.contains("cmn-lights")) tx.appendChild(c); });
    tx.insertAdjacentHTML("beforeend", '<div class="nx-cta"><a class="b" href="#nx-montar">Montar agora <span aria-hidden="true">→</span></a><a class="l" href="/kits-presentes/">Ver kits prontos</a></div><ul class="nx-chips"><li>Cartão escrito à mão</li><li>Caixa de madeira ou papel</li><li>Validade com folga</li></ul>');
    hero.appendChild(tx);
    hero.insertAdjacentHTML("beforeend", '<figure class="nx-pic"><img src="' + CIMG + 'kit_ambientada_fundo_desfocado_1250x1250-bd97ae38c83eef5af917939007214522-1024-1024.webp" alt="Caixa de presente Chef Mais Leve com chás e snacks" loading="eager" decoding="async"></figure>');
    var steps = D.createElement("section"); steps.className = "nx nx-steps"; steps.setAttribute("aria-label", "Como funciona");
    steps.innerHTML = '<p class="k">Como funciona</p><h2>Simples assim, <em>em três passos.</em></h2><div class="nx-st3"><div><b>1</b><strong>Conte para quem é</strong><span>Quantos presentes e se você recebe ou enviamos direto para quem ganha.</span></div><div><b>2</b><strong>Escolha a caixa e os itens</strong><span>Caixa de madeira ou papel e os chás, snacks e granolas que vão dentro, já com preço de Natal.</span></div><div><b>3</b><strong>Cartão e entrega</strong><span>Você escreve a mensagem, a gente escreve à mão, embala e envia.</span></div></div>';
    /* 11/11: os passos estaticos (steps) sairam, confundiam com o montador; para voltar: cmn.insertBefore(steps, val || panel) */
    var nh = D.createElement("div"); nh.className = "nx nx-h"; nh.innerHTML = '<p class="k">Vamos montar</p><h2>Monte a sua caixa, <em>passo a passo.</em></h2>'; cmn.insertBefore(nh, panel);
    var faq = D.createElement("section"); faq.className = "nx nx-faq"; faq.setAttribute("aria-label", "Dúvidas");
    faq.innerHTML = '<p class="k">Dúvidas</p><h2>Antes de <em>montar.</em></h2>'
      + '<details><summary>Chega a tempo do Natal?</summary><p>Postamos em até 2 dias úteis e o prazo da transportadora aparece na sacola pelo seu CEP. Os produtos têm validade com folga para a noite de Natal.</p></details>'
      + '<details><summary>Posso enviar direto para quem vai ganhar?</summary><p>Pode. No primeiro passo escolha "Enviar direto" e informe o endereço de quem recebe. O cartão vai dentro da caixa, sem valores.</p></details>'
      + '<details><summary>O cartão é mesmo escrito à mão?</summary><p>Sim. Você escreve a mensagem no passo do cartão e a gente passa à mão para o cartão da Chef, sem custo.</p></details>';
    var end = D.createElement("section"); end.className = "nx nx-end"; end.setAttribute("aria-label", "Kits prontos");
    end.innerHTML = '<div class="in"><div><h2>Prefere uma caixa <em>pronta?</em></h2><p>Kits montados à mão, com caixa inclusa, para presentear sem pensar.</p></div><a class="b" href="/kits-presentes/">Ver kits prontos <span aria-hidden="true">→</span></a></div>';
    cmn.appendChild(faq); cmn.appendChild(end);
    hero.addEventListener("click", function (e) { var a = e.target.closest && e.target.closest('a[href="#nx-montar"]'); if (!a) return; e.preventDefault(); var top = nh.getBoundingClientRect().top + window.scrollY - 84; try { window.scrollTo({ top: top, behavior: "smooth" }); } catch (x) { window.scrollTo(0, top); } });
  }
  /* 11) Home v2: "mais pedidos" sobe; destaques (Esquenta, Natal, Encontre, Clube) em cartoes iguais; categorias em carrossel no lugar das vitrines por categoria; autoridade enxuta. Para voltar: tirar homeV2 da lista em tick(). */
  var CIMG = "https://acdn-us.mitiendanube.com/stores/005/060/752/products/";
  function cim(n) { return n.indexOf("http") === 0 ? n : CIMG + n + "-640-0.webp"; }
  var CATS = [
    ["/chas/", "Chás <em>e infusões</em>", "Chás mistos, trouxinhas e chá na fruta", "0001-1710764873754130848-c919011695c11f982c17953014296677", "Feito à mão"],
    ["/chas/chas-infusoes-naturais/", "Chá <em>na fruta</em>", "Trouxinhas e infusão na tangerina", "trouxinha-7368fc7e08c6db418117895731278503", "Sem aditivos"],
    ["/snacks-granolas/chocoleve/", "Linha <em>Chocoleve</em>", "Laranja, maçã, banana e abacaxi com chocolate 70%", "https://dzmlyrkzcdqicwfmxnxd.supabase.co/storage/v1/object/public/cml-fotos/chocoleve-cafe-da-manha.jpg", "Lançamento"],
    ["/snacks-granolas/granolas/", "Granolas <em>da casa</em>", "Doce, salgada e low carb, em pequenos lotes", "21-1c7aae1520f063e6c217883844451286", "Crocante"],
    ["/snacks-granolas/snacks-saudaveis/chips-saudaveis/", "Frutas <em>desidratadas</em>", "Fatiadas e secas em casa, sem açúcar", "chatgpt-image-10_05_2026-00_59_52-d74451ef4c37602ce017783855988898", "100% fruta"],
    ["/kits-presentes/", "Kits <em>e presentes</em>", "Caixas prontas, montadas à mão para presentear", "kit_ambientada_fundo_desfocado_1250x1250-bd97ae38c83eef5af917939007214522", "Com caixa"],
    ["/acessorios/", "Acessórios <em>para o ritual</em>", "Xícaras, infusores, garrafas e chaleiras", "05_macro_detalhes_1280-2ea556c793db03668117871038051874", "Para preparar"],
    ["/chas/todos-os-chas/", "Fases <em>da mulher</em>", "Gestação, lactação, TPM e menopausa", "chatgpt-image-11_05_2026-12_55_06-0663a3a923894791f617785149576049", "Com cuidado"]
  ];
  var CATS_CSS = [
    ".w{width:var(--cmlF,min(1318px,calc(100% - 32px)));margin:0 auto 72px;font-family:Poppins,system-ui,sans-serif;color:#2b2916}",
    ".h{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin:0 0 18px}",
    ".k{display:flex;align-items:center;gap:12px;margin:0 0 8px;font:500 10.5px/1.2 Poppins,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#a65a14}.k:before{content:'';width:28px;height:1px;background:#a65a14}",
    "h2{margin:0;font:700 clamp(26px,3vw,38px)/1.1 Poppins,sans-serif;color:#2b2916;letter-spacing:-.01em}h2 em{font-weight:300;font-style:italic;color:#a65a14}",
    ".all{flex:none;display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:0 18px;border-radius:10px;border:1px solid rgba(166,90,20,.55);color:#a65a14;font:500 13px/1 Poppins,sans-serif;text-decoration:none}.all:hover{background:rgba(166,90,20,.12)}",
    ".t{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;padding:4px 0 14px;scrollbar-width:none;-webkit-overflow-scrolling:touch}.t::-webkit-scrollbar{display:none}",
    ".c{position:relative;isolation:isolate;overflow:hidden;flex:0 0 calc((100% - 42px)/4);min-width:0;scroll-snap-align:start;display:flex;flex-direction:column;padding:10px 10px 14px;border-radius:24px;background:radial-gradient(120% 90% at 30% 20%,#fffaf5 0%,#f6efe9 55%,#ede3d8 100%);border:1px solid rgba(166,90,20,.35);text-decoration:none;color:#2b2916;transition:transform .22s ease,border-color .22s,box-shadow .22s}",
    ".c:after{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.07;mix-blend-mode:multiply;background-image:" + GRAIN + ";background-size:220px}",
    ".c:hover{transform:translateY(-3px);border-color:#a65a14;box-shadow:0 22px 40px -26px rgba(43,41,22,.2)}",
    ".ph{display:block;position:relative;overflow:hidden;aspect-ratio:4/5;border-radius:16px;background:#fff;box-shadow:inset 0 0 0 1px rgba(43,41,22,.06)}.ph img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease}.c:hover .ph img{transform:scale(1.04)}",
    ".ph:after{content:'';position:absolute;inset:auto 0 0 0;height:34%;background:linear-gradient(to top,rgba(255,250,245,.55),rgba(43,41,22,0));pointer-events:none}",
    ".n{display:block;margin:12px 4px 0;padding-right:40px;font:700 16px/1.2 Poppins,sans-serif;color:#2b2916}.n em{font-weight:300;font-style:italic;color:#565229}.s{display:block;margin:4px 4px 0;padding-right:40px;font:300 12.5px/1.4 Poppins,sans-serif;color:#6f6656}",
    ".tg{position:absolute;left:10px;top:10px;padding:5px 9px;border-radius:6px;background:#fffaf5;color:#a65a14;border:1px solid #e8ddd0;font:600 10px/1 Poppins,sans-serif;letter-spacing:.08em;text-transform:uppercase;font-style:normal;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}",
    ".hr{display:flex;align-items:center;gap:8px}.hr .all{margin-right:8px}",
    ".nv{flex:none;width:40px;height:40px;padding:0;border-radius:50%;border:1px solid rgba(86,82,41,.22);background:rgba(255,250,245,.86);color:#2b2916;display:grid;place-items:center;cursor:pointer;transition:background .2s,color .2s,opacity .2s}.nv svg{width:16px;height:16px;display:block}.hr .nv{margin:0!important;font:inherit;line-height:0}.nv:hover{background:#565229;color:#2b2916;border-color:#565229}.nv:disabled{opacity:.35;cursor:default;background:rgba(255,250,245,.86);color:#2b2916;border-color:rgba(86,82,41,.22)}",
    "@media (max-width:640px){.nv{display:none}}",
    ".ar{position:absolute;right:14px;bottom:16px;width:32px;height:32px;border-radius:50%;border:1px solid #565229;display:grid;place-items:center;color:#565229;font:300 15px/1 Poppins,sans-serif;transition:background .2s,color .2s}.c:hover .ar{background:#565229;color:#f6efe9}",
    "@media (max-width:1024px){.c{flex-basis:calc((100% - 28px)/3)}}",
    "@media (max-width:640px){.w{margin-bottom:44px}.h{flex-direction:column;align-items:flex-start;gap:10px}.c{flex-basis:calc((100% - 14px)/2);padding:8px 8px 12px}.n{font-size:14px;margin-top:10px}.ar{width:28px;height:28px;right:12px;bottom:12px}}"
  ].join("");
  function homeV2() {
    if (P !== "/") return;
    var H = D.documentElement; if (!H.classList.contains("cml-home2")) H.classList.add("cml-home2");
    var sc = D.querySelector("#ns-section-icon_text .c1-home .c1-sc"), rk = D.querySelector("main .c2-rk");
    if (!sc || !rk) return;
    if (!D.getElementById("cml-hl")) {
      var hl = D.createElement("section"); hl.id = "cml-hl"; hl.className = "cml-hl"; hl.setAttribute("aria-label", "Destaques");
      hl.innerHTML = '<div class="cml-hl-g">'
        + '<a class="cml-hl-c t-blk" href="/ofertas/"><span class="k">Até 22/11</span><h3>Esquenta Black, <em>preços de Black</em></h3><p>Combos com 15% off e 5% no Pix, enquanto durar o estoque.</p><span class="ar" aria-hidden="true">→</span></a>'
        + '<a class="cml-hl-c t-nat" href="/presentes-de-natal/"><span class="k">Presentes · feito à mão</span><h3>Monte o presente <em>de quem você ama</em></h3><p>Caixa, itens e cartão escrito à mão, para a família, a equipe e clientes.</p><span class="ar" aria-hidden="true">→</span></a>'
        + '<a class="cml-hl-c t-cef" href="/encontre-seu-cha/"><span class="k">Em 1 minuto</span><h3>Encontre <em>o seu chá</em></h3><p>Dois toques e os chás que combinam com você.</p><span class="ar" aria-hidden="true">→</span></a>'
        + '<a class="cml-hl-c t-clb" href="/clube-chef/"><span class="nv">Novo</span><span class="k">Assinatura</span><h3>Clube Chef, <em>um ritual por mês</em></h3><p>Uma caixa montada pela nossa curadoria para o seu paladar e o seu momento.</p><span class="ar" aria-hidden="true">→</span></a>'
        + '</div>';
      rk.parentNode.insertBefore(hl, rk.nextSibling);
    }
    if (!D.getElementById("cml-cats")) {
      /* carrossel de categorias em shadow DOM: o ajuste automatico de cores do tema escuro nao mexe nos cartoes claros */
      var cs = D.createElement("section"); cs.id = "cml-cats"; cs.setAttribute("aria-label", "Categorias");
      var sr = cs.attachShadow({ mode: "closed" });
      sr.innerHTML = "<style>" + CATS_CSS + "</style>"
        + '<div class="w"><div class="h"><div><p class="k">Explore</p><h2>Nossas <em>categorias</em></h2></div><div class="hr"><a class="all" href="/produtos/">Ver todos os produtos</a><button type="button" class="nv nprv" aria-label="Anterior"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg></button><button type="button" class="nv nnxt" aria-label="Próximo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button></div></div>'
        + '<div class="t">' + CATS.map(function (c) { return '<a class="c" href="' + c[0] + '"><span class="ph"><img src="' + cim(c[3]) + '" alt="' + esc(c[1].replace(/<[^>]+>/g, "")) + '" loading="lazy" decoding="async"><i class="tg">' + esc(c[4]) + '</i></span><span class="n">' + c[1] + '</span><span class="s">' + esc(c[2]) + '</span><span class="ar" aria-hidden="true">→</span></a>'; }).join("") + '</div></div>';
      var after = D.getElementById("cml-hl"); after.parentNode.insertBefore(cs, after.nextSibling);
      (function(){var tk=sr.querySelector(".t");if(!tk)return;function upd(){var p=sr.querySelector(".nv.nprv"),n=sr.querySelector(".nv.nnxt");if(p)p.disabled=tk.scrollLeft<4;if(n)n.disabled=tk.scrollLeft+tk.clientWidth>=tk.scrollWidth-4}[].forEach.call(sr.querySelectorAll(".nv"),function(b){b.addEventListener("click",function(){var w=tk.clientWidth+14;tk.scrollBy({left:(b.classList.contains("nprv")?-1:1)*w,behavior:"smooth"})})});tk.addEventListener("scroll",upd,{passive:true});setTimeout(upd,300);addEventListener("resize",upd)})();
    }
    var nc = D.querySelector("main .cml-nc");
    if (nc && !nc.classList.contains("cml-nc2")) {
      nc.classList.add("cml-nc2");
      var h2 = nc.querySelector("h2"); if (h2) h2.innerHTML = "Mãe e filho, <em>feito à mão em Santa Catarina</em>";
      var pp = nc.querySelector(".cml-nc-p"); if (pp) pp.textContent = "Cada chá, snack e caixa sai da nossa cozinha, com ingredientes escolhidos com atenção.";
    }
  }
  /* 10) Menu: icones nas paginas especiais e selo "Novo" no Clube Chef */
  var NVI = {
    cef: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2.2 5.3-5.3 2.2 2.2-5.3z"/></svg>',
    blk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c1 3 4 4.5 4 8.5a4 4 0 0 1-8 0c0-1.6.6-2.7 1.4-3.6.3 1 .9 1.6 1.6 1.9C11 7.5 11.3 5 12 3z"/><path d="M5 17.5c1.7 2.2 4.2 3.5 7 3.5s5.3-1.3 7-3.5"/></svg>',
    gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12M12 8c-1.5 0-4-.6-4-2.5S10.5 3 12 8zm0 0c1.5 0 4-.6 4-2.5S13.5 3 12 8z"/></svg>'
  };
  function navKind(a) {
    var h = (a.getAttribute("href") || "").toLowerCase(), tx = (a.textContent || "").toLowerCase();
    if (/encontre-seu/.test(h)) return "cef";
    if (/ofertas|black/.test(h)) return "blk";
    if (/presentes-de/.test(h)) return "gift";
    if (/clube/.test(h) || /clube/.test(tx)) return "club";
    return "";
  }
  function navSpecial() {
    [].forEach.call(D.querySelectorAll(".js-nav-desktop-list>li>a, #nav-hamburger .nav-list>.nav-item>a.nav-list-link"), function (a) {
      if (a.__cmlnv) return; var k = navKind(a); if (!k) return; a.__cmlnv = 1;
      var li = a.parentNode; if (li && li.classList) li.classList.add("cml-nv-" + k);
      if (k === "club") { if (!a.querySelector(".cml-nv-new")) { var n = D.createElement("i"); n.className = "cml-nv-new"; n.textContent = "Novo"; a.appendChild(n); } return; }
    });
    /* menu do celular: Clube Chef entra como cartao em "Para voce agora", com o selo Novo */
    var mc = D.querySelector("#nav-hamburger .c1-mn .c");
    if (mc && !mc.querySelector(".cml-club")) {
      var ca = D.createElement("a"); ca.className = "cml-club"; ca.href = "/clube-chef/";
      ca.innerHTML = '<svg class="c1-ico" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l11-5.5 11 5.5v10l-11 5.5-11-5.5z"/><path d="M5 12.5l11 5.5 11-5.5M16 18v10"/><path class="f" d="M12 7.5l8 4" opacity=".5"/></svg><span>Clube Chef <i class="cml-nv-new">Novo</i><small>Uma caixa por mês, com curadoria da Chef</small></span>';
      mc.appendChild(ca);
    }
  }
  /* 12) Cashback dentro do dock: o botao original do Cashing fica escondido e o item do dock dispara o clique dele */
  var ICB = '<svg class="c1-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="6.5" rx="7" ry="3"/><path d="M5 6.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/><path d="M5 11.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/></svg>';
  function dockCb() {
    var dock = D.querySelector("nav.c1-dock"); if (!dock || dock.querySelector(".cb")) return;
    var orig = D.querySelector("[data-slot='corner_bottom_left'] button[aria-label='Meu cashback']"); if (!orig) return;
    var b = D.createElement("button"); b.type = "button"; b.className = "cb"; b.setAttribute("aria-label", "Meu cashback");
    var num = ((orig.querySelector("svg") || {}).textContent || "").replace(/\D/g, "");
    b.innerHTML = ICB + '<span class="lb">Cashback</span>' + (num ? '<i class="bd">' + esc(num) + '</i>' : "");
    b.addEventListener("click", function () { try { orig.click(); } catch (e) {} });
    dock.insertBefore(b, dock.firstChild);
    D.documentElement.classList.add("cml-dockcb");
  }
  /* 9) Voltar ao topo: botao no dock de atalhos, aparece depois de rolar a pagina */
  var ITOP = '<svg class="c1-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V6"/><path d="M6 12l6-6 6 6"/></svg>';
  var TOPB = null;
  function topSync() { if (!TOPB) return; var on = (window.scrollY || D.documentElement.scrollTop || 0) > 480; if (TOPB.hidden === !on) return; TOPB.hidden = !on; }
  function topBtn() {
    var dock = D.querySelector("nav.c1-dock"); if (!dock) return;
    if (dock.querySelector(".tp")) return;
    TOPB = D.createElement("button"); TOPB.type = "button"; TOPB.className = "tp"; TOPB.hidden = true; TOPB.setAttribute("aria-label", "Voltar ao topo"); TOPB.innerHTML = ITOP + '<span class="lb">Topo</span>';
    TOPB.addEventListener("click", function () { try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) { window.scrollTo(0, 0); } });
    dock.appendChild(TOPB);
    var tk = false;
    addEventListener("scroll", function () { if (tk) return; tk = true; requestAnimationFrame(function () { tk = false; topSync(); }); }, { passive: true });
    topSync();
  }
  function footLinks() {
    [].forEach.call(D.querySelectorAll('#ns-section-footer a[href*="/account/info"], .c1-dock a[href*="/account/info"]'), function (a) { if (/rastrear/i.test(a.textContent)) a.setAttribute("href", "/account/"); });
  }

  /* 19) Encontre seu cha no padrao do Clube: os 3 passos viram cartoes em sanfona (o passo atual abre, os concluidos mostram a escolha e voltam ao toque) e um resumo oliva fixo a direita acompanha as escolhas. Nao mexe no quiz (cml-finder): le o que esta na tela a cada render. Para desligar: tirar cefUI da lista. */
  function cefUI() {
    if (!/^\/encontre-seu-cha/.test(P)) return;
    var cef = D.querySelector("section.cef"), body = cef && cef.querySelector(".cef-body"); if (!body || body.__nx) return; body.__nx = 1;
    var inn = cef.querySelector(".cef-in") || cef; inn.classList.add("cx-2col");
    var sd = D.createElement("aside"); sd.className = "cx-side"; sd.setAttribute("aria-label", "Resumo da sua escolha"); inn.appendChild(sd);
    var st = { mode: null };
    function E(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
    function deco() {
      var steps = [].slice.call(body.querySelectorAll(".cef-step")); if (steps.length !== 3) return;
      var cur = 1; steps.forEach(function (s, i) { if (s.classList.contains("on")) cur = i + 1; });
      var q = (body.querySelector(".cef-q") || {}).textContent || "";
      if (cur === 1) st.mode = null; else if (cur === 2) st.mode = /momento/i.test(q) ? "momento" : /sabor/i.test(q) ? "sabor" : "ingrediente";
      var ings = [].map.call(body.querySelectorAll('.cef-opt[data-ing][aria-pressed="true"]'), function (e) { return e.textContent.trim(); });
      var chosen = (body.querySelector(".cef-chosen b") || {}).textContent || "", cnt = body.querySelectorAll(".cef-card").length, cafEl = body.querySelector(".cef-caf"), caf = !!(cafEl && cafEl.checked);
      var modeTx = { momento: "Pelo momento", sabor: "Pelo sabor", ingrediente: "Pelo ingrediente" }[st.mode] || "";
      var vals = ["", cur > 1 ? modeTx : "", cur === 3 ? chosen : (cur === 2 && ings.length ? ings.join(", ") : ""), ""];
      steps.forEach(function (s, i) {
        var n = i + 1;
        if (!s.querySelector(".nx-ht")) { var lab = s.querySelector(".cef-sl"); var ht = D.createElement("span"); ht.className = "nx-ht"; ht.innerHTML = '<em class="nx-k">Passo ' + n + ' de 3</em>'; if (lab) ht.appendChild(lab); s.appendChild(ht); }
        var v = s.querySelector(".nx-stv"); if (!v) { v = D.createElement("span"); v.className = "nx-stv"; s.appendChild(v); } v.textContent = vals[n];
        var jump = n < cur; s.classList.toggle("jump", jump); if (jump) { s.setAttribute("role", "button"); s.setAttribute("tabindex", "0"); s.setAttribute("data-nxgo", n); } else { s.removeAttribute("role"); s.removeAttribute("tabindex"); s.removeAttribute("data-nxgo"); }
      });
      body.setAttribute("data-cur", cur);
      /* cartoes de resultado no padrao dos cards da loja: foto grande em arco, nome inteiro, preco, cashback e pilula dourada */
      [].forEach.call(body.querySelectorAll(".cef-card"), function (c) { if (c.__nx) return; c.__nx = 1; var h = c.querySelector("h3"), pr = c.querySelector(".cef-pr b"), th = c.querySelector(".cef-th"); if (th && th.style.backgroundImage) th.style.backgroundImage = th.style.backgroundImage.replace(/-(240|480)-0\./, "-640-0."); if (h && !c.querySelector(".cef-eb2")) h.insertAdjacentHTML("beforebegin", '<span class="cef-eb2">Chá misto · 40g</span>'); if (pr) { var v = parseFloat((pr.textContent || "").replace(/[^0-9,]/g, "").replace(",", ".")); if (v) pr.parentNode.insertAdjacentHTML("beforeend", '<span class="cef-cb">+ <b>R$ ' + (v * 0.05).toFixed(2).replace(".", ",") + '</b> de cashback</span>'); } });
      var pb = body.querySelector(".cef-pane .cef-btn[data-go]"), dis, ctaTx, href = "", hint = "";
      if (cur === 1) { dis = true; ctaTx = "Ver os chás que combinam"; hint = "Escolha ao lado como prefere"; }
      else if (cur === 2) { if (st.mode === "ingrediente") { dis = !pb || pb.disabled; ctaTx = ings.length ? "Ver chás com " + ings.length + (ings.length > 1 ? " ingredientes" : " ingrediente") : "Ver os chás que combinam"; hint = dis ? "Toque em pelo menos um ingrediente" : ""; } else { dis = true; ctaTx = "Ver os chás que combinam"; hint = "Toque na sua opção ao lado"; } }
      else { dis = false; ctaTx = "Ver todos os chás →"; href = "/chas/"; hint = cnt ? "Os " + (cnt === 1 ? "chá está" : cnt + " chás estão") + " ao lado, com preço e preparo" : "Desligue o filtro ou mude a escolha"; }
      sd.innerHTML = '<p class="k">Seu perfil de chá</p><h3>Resumo <em>da escolha</em></h3><dl>'
        + '<div><dt>Como escolher</dt><dd>' + (modeTx ? E(modeTx) : "<i>a definir</i>") + '</dd></div>'
        + '<div><dt>Sua escolha</dt><dd>' + (vals[2] ? E(vals[2]) : "<i>a definir</i>") + '</dd></div>'
        + '<div><dt>Só sem cafeína</dt><dd>' + (cur === 3 ? (caf ? "Sim" : "Não") : "<i>a definir</i>") + '</dd></div>'
        + '<div><dt>Chás que combinam</dt><dd>' + (cur === 3 ? (cnt ? cnt + (cnt > 1 ? " chás" : " chá") : "nenhum") : "<i>a definir</i>") + '</dd></div></dl>'
        + '<div class="tt"><span>Chás mistos artesanais</span><b>11</b></div><p class="pz">40g · 20 xícaras por pacote · feitos à mão em SC</p>'
        + '<button type="button" class="cx-go"' + (dis ? " disabled" : "") + (href ? ' data-href="' + href + '"' : "") + '>' + E(ctaTx) + '</button>' + (hint ? '<p class="hn">' + E(hint) + '</p>' : "")
        + '<p class="nt">Sem cadastro. Pode refazer quantas vezes quiser.</p>';
    }
    body.addEventListener("click", function (e) { var s = e.target.closest(".cef-step.jump"); if (!s) return; var b = body.querySelector('.cef-pane [data-go="' + s.getAttribute("data-nxgo") + '"]'); if (b) b.click(); });
    body.addEventListener("keydown", function (e) { if (e.key !== "Enter" && e.key !== " ") return; var s = e.target.closest && e.target.closest(".cef-step.jump"); if (!s) return; e.preventDefault(); s.click(); });
    sd.addEventListener("click", function (e) { var b = e.target.closest(".cx-go"); if (!b || b.disabled) return; var h = b.getAttribute("data-href"); if (h) { location.href = h; return; } var t = body.querySelector(".cef-pane .cef-btn[data-go]"); if (t && !t.disabled) t.click(); });
    new MutationObserver(function () { try { deco(); } catch (e) {} }).observe(body, { childList: true });
    deco();
  }
  /* 20) Encontre seu cha: montar a sacola ali mesmo (v2, 14/11). Cada chá do resultado tem um botão "Escolher" (vira "Escolhido ✓"); as escolhas aparecem no resumo, em "Sua seleção", com total. No resultado, o botão do resumo vira "Finalizar a escolha": põe os chás na sacola e pergunta se a pessoa quer finalizar a compra (vai direto ao checkout) ou ver mais produtos (vai para /produtos/). A seleção continua se a pessoa refizer o teste. Produto e variação vêm da página do produto na hora. Para abrir a todos: CC_TODOS = 1. Para desligar: tirar cefCart da lista. */
  var CC_TODOS = 1;
  function cefCart() {
    if (!/^\/encontre-seu-cha/.test(P)) return;
    try { if (/[?&]montar=1/.test(location.search)) localStorage.setItem("cml-cefcart", "1"); if (/[?&]montar=0/.test(location.search)) localStorage.removeItem("cml-cefcart"); } catch (e) {}
    var on = CC_TODOS; try { on = on || localStorage.getItem("cml-cefcart") === "1"; } catch (e) {}
    if (!on) return;
    var cef = D.querySelector("section.cef"), body = cef && cef.querySelector(".cef-body"); if (!body) return;
    var S = window.__cmlCC || (window.__cmlCC = { sel: {}, info: {}, busy: 0 });
    D.documentElement.classList.add("cml-cc");
    if (!D.getElementById("cml-cc-css")) {
      var Q = "html body section.cef ", K = "html.cml-cc body ";
      var st = D.createElement("style"); st.id = "cml-cc-css";
      st.textContent = [
        Q + ".cef-card .cef-th{aspect-ratio:1/1;height:auto;background-size:contain;background-repeat:no-repeat;background-position:center;background-color:#fff}",
        Q + ".cef-card .cef-lead{display:none}",
        Q + ".cef-card .cef-pr{font-size:0;line-height:0}" + Q + ".cef-card .cef-pr>b{display:block;font-size:24px;line-height:1.15}",
        Q + ".cef-card .cef-pr .cef-cb{display:block;margin-top:6px;font:400 13px/1.4 Poppins,sans-serif}" + Q + ".cef-card .cef-pr .cef-cb b{display:inline;font:600 13px/1.4 Poppins,sans-serif;color:inherit}",
        Q + ".cef-card .cef-buy{display:flex;flex-direction:column;align-items:stretch;gap:0;max-width:100%}" + Q + ".cef-card .cef-buy *{box-sizing:border-box}",
        Q + ".cef-card .cef-buy .cc-pk{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:48px;margin:14px 0 0;padding:0 10px;border-radius:999px;border:1.5px solid #a65a14;background:#a65a14;color:#f6efe9;font:600 15px/1 Poppins,sans-serif;white-space:nowrap;cursor:pointer;box-shadow:none;transition:background .2s,border-color .2s,color .2s}",
        Q + ".cef-card .cef-buy .cc-pk:hover{background:#ecc77a;border-color:#ecc77a}",
        Q + ".cef-card .cef-buy .cc-pk[aria-pressed=true]{background:#fff;border-color:#565229;color:#565229}",
        Q + ".cef-card .cef-buy .cc-pk i{display:none;width:20px;height:20px;border-radius:50%;background:#565229;color:#2b2916;font:700 12px/20px Poppins,sans-serif;font-style:normal;text-align:center}",
        Q + ".cef-card .cef-buy .cc-pk[aria-pressed=true] i{display:inline-block}",
        Q + ".cef-card .cef-buy a.cef-btn.cc-ver{display:block;align-self:center;width:auto;min-height:0;height:auto;margin:12px 0 0;padding:2px 0;background:transparent;border:0;border-radius:0;box-shadow:none;color:inherit;font:500 14px/1.4 Poppins,sans-serif;text-decoration:underline;text-decoration-color:#a65a14;text-underline-offset:5px}",
        Q + ".cef-card[data-ccon] {border-color:#565229;box-shadow:0 0 0 3px rgba(166,90,20,.35)}",
        K + ".cx-2col:has(.cef-body[data-cur='3']) .cx-side>.cx-go," + K + ".cx-2col:has(.cef-body[data-cur='3']) .cx-side>.hn{display:none}",
        ".cc-box{margin-top:18px;padding-top:16px;border-top:1px solid rgba(43,41,22,.18)}",
        ".cc-box .k{margin:0 0 8px;font:500 11px/1.2 Poppins,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#a65a14}",
        ".cc-li{list-style:none;margin:0 0 12px;padding:0;display:flex;flex-direction:column;gap:6px}",
        ".cc-li li{display:flex;align-items:center;gap:8px;font:400 14px/1.3 Poppins,sans-serif;color:#2b2916}.cc-li li span{flex:1;min-width:0}.cc-li li b{font-weight:600;color:#a65a14}",
        ".cc-x{width:28px;height:28px;flex:none;border-radius:50%;border:1px solid rgba(255,250,245,.3);background:transparent;color:#2b2916;font:400 16px/1 Poppins,sans-serif;cursor:pointer}",
        ".cc-tt{display:flex;justify-content:space-between;align-items:baseline;margin:4px 0 14px;font:400 14px/1 Poppins,sans-serif;color:#2b2916}.cc-tt b{font:700 22px/1 Poppins,sans-serif;color:#a65a14}",
        ".cc-all{display:flex;align-items:center;justify-content:center;width:100%;min-height:52px;border-radius:999px;border:0;background:#a65a14;color:#f6efe9;font:600 16px/1 Poppins,sans-serif;cursor:pointer}.cc-all:hover{background:#ecc77a}.cc-all[disabled]{opacity:.5;cursor:not-allowed}",
        ".cc-em{margin:0 0 12px;font:300 13.5px/1.5 Poppins,sans-serif;color:rgba(43,41,22,.8)}",
        ".cc-bar{display:none}",
        "#cml-cc-dlg{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;padding:16px;background:rgba(255,250,245,.55)}#cml-cc-dlg[hidden]{display:none}",
        "#cml-cc-dlg .bx{position:relative;width:min(440px,100%);box-sizing:border-box;padding:30px 26px 24px;border-radius:28px;background:#fff;color:#2b2916;text-align:center;font-family:Poppins,sans-serif;box-shadow:0 30px 60px -30px rgba(43,41,22,.2)}",
        "#cml-cc-dlg .ok{width:52px;height:52px;margin:0 auto 14px;border-radius:50%;background:#e8e9d6;color:#565229;display:grid;place-items:center;font:700 22px/1 Poppins,sans-serif}",
        "#cml-cc-dlg h3{margin:0 0 8px;font:700 21px/1.25 Poppins,sans-serif;color:#2b2916}#cml-cc-dlg p{margin:0 0 20px;font:300 15px/1.5 Poppins,sans-serif;color:#4a4636}",
        "#cml-cc-dlg .go{display:flex;align-items:center;justify-content:center;width:100%;min-height:52px;border:0;border-radius:999px;background:#a65a14;color:#f6efe9;font:600 16px/1 Poppins,sans-serif;cursor:pointer}",
        "#cml-cc-dlg .mo{display:flex;align-items:center;justify-content:center;width:100%;min-height:48px;margin-top:10px;border:1.5px solid #565229;border-radius:999px;background:transparent;color:#565229;font:600 15px/1 Poppins,sans-serif;cursor:pointer;text-decoration:none}",
        "#cml-cc-dlg .x{position:absolute;top:12px;right:12px;width:36px;height:36px;border-radius:50%;border:0;background:#f6efe9;color:#565229;font:400 20px/1 Poppins,sans-serif;cursor:pointer}",
        "@media(max-width:767px){.cc-bar{position:fixed;left:10px;right:10px;bottom:84px;z-index:60;display:flex;align-items:center;gap:10px;padding:10px 10px 10px 16px;border-radius:20px;background:#f6efe9;border:1px solid rgba(166,90,20,.6);box-shadow:0 18px 40px -16px rgba(43,41,22,.2);font:400 13.5px/1.3 Poppins,sans-serif;color:#2b2916}.cc-bar[hidden]{display:none}.cc-bar span{flex:1;min-width:0}.cc-bar b{color:#a65a14}.cc-bar .cc-all{width:auto;min-height:44px;padding:0 16px;font-size:14px}}"
      ].join("").replace(/([^{};]+:[^{};]+?)(?=[;}])/g, function (m) { return /!important/.test(m) ? m : m + "!important"; });
      (D.head || D.documentElement).appendChild(st);
    }
    function E(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
    function brl(v) { return "R$ " + v.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
    function num(t) { return parseFloat(String(t || "").replace(/[^0-9,]/g, "").replace(",", ".")) || 0; }
    function info(h) {
      if (S.info[h]) return S.info[h];
      return S.info[h] = fetch("/produtos/" + h + "/", { credentials: "same-origin" }).then(function (r) { return r.text(); }).then(function (t) {
        var d = new DOMParser().parseFromString(t, "text/html"), el = d.querySelector(".js-product-detail[data-variants]") || d.querySelector("[data-variants]");
        var vs = el ? JSON.parse(el.getAttribute("data-variants")) : []; var v = vs.filter(function (x) { return x.available; })[0] || null;
        if (!v) throw new Error("sem estoque"); return { pid: v.product_id, vid: v.id, price: v.price_number, opt: v.option0 };
      }).catch(function (e) { delete S.info[h]; throw e; });
    }
    function items() { return D.querySelectorAll("#modal-cart .js-ajax-cart-list .js-cart-item").length; }
    function quiet(t1) {
      var x = D.getElementById("js-cross-selling-modal"); if (x && /modal-show/.test(x.className)) { var k = x.querySelector(".js-modal-close-private"); if (k) k.click(); }
      var r = D.getElementById("related-products-notification"); if (r && /show|visible/.test(r.className)) { var k2 = r.querySelector(".js-modal-close-private,.js-notification-close,[data-dismiss]"); if (k2) k2.click(); }
      if (Date.now() - t1 < 2500) return setTimeout(function () { quiet(t1); }, 150);
      D.documentElement.classList.remove("cml-fg-add");
    }
    function addOne(it) {
      return new Promise(function (ok) {
        var c = D.createElement("div"); c.className = "js-product-container js-item-product"; c.style.display = "none";
        c.setAttribute("data-product-id", it.pid); c.setAttribute("data-product-type", "list"); c.setAttribute("data-component", "product-list-item"); c.setAttribute("data-component-value", it.pid);
        c.setAttribute("data-variants", JSON.stringify([{ id: it.vid, product_id: it.pid, available: true, stock: null, is_visible: true, contact: false, option0: it.opt || null, option1: null, option2: null, price_number: it.price, price_short: brl(it.price).replace(" ", ""), has_promotional_price: false }]));
        c.innerHTML = '<form class="js-product-form" method="post" action="/comprar/"><input type="hidden" name="add_to_cart" value="' + it.pid + '"><input type="submit" class="js-addtocart js-prod-submit-form btn" value="Comprar" data-component="product-list-item.add-to-cart" data-component-value="' + it.pid + '"></form>';
        D.body.appendChild(c); D.documentElement.classList.add("cml-fg-add");
        var n0 = items(), t0 = Date.now(); c.querySelector(".js-addtocart").click();
        (function w() { if (items() > n0 || Date.now() - t0 > 9000) { c.remove(); ok(items() > n0); return; } setTimeout(w, 200); })();
      });
    }
    function closeCart() { var m = D.getElementById("modal-cart"); if (m && /modal-show/.test(m.className)) { var k = m.querySelector(".js-modal-close-private"); if (k) k.click(); } }
    function dlg(n, fail) {
      var d = D.getElementById("cml-cc-dlg");
      if (!d) {
        d = D.createElement("div"); d.id = "cml-cc-dlg"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true"); d.setAttribute("aria-labelledby", "cml-cc-dt"); D.body.appendChild(d);
        d.addEventListener("click", function (e) {
          if (e.target === d || e.target.closest(".x")) { d.hidden = true; return; }
          if (e.target.closest(".go")) { var b = D.querySelector('#modal-cart input[name="go_to_checkout"]'); if (b) b.click(); else location.href = "/comprar/"; }
        });
      }
      d.innerHTML = '<div class="bx"><button type="button" class="x" aria-label="Fechar">×</button><div class="ok" aria-hidden="true">✓</div><h3 id="cml-cc-dt">' + (n > 1 ? "Seus " + n + " chás estão na sacola" : "Seu chá está na sacola") + '</h3><p>Quer finalizar a sua compra ou deseja navegar e escolher mais produtos?' + (fail ? ' <br><small>' + fail + (fail > 1 ? " chás estavam" : " chá estava") + ' sem estoque e ficou de fora.</small>' : "") + '</p><button type="button" class="go">Finalizar compra</button><a class="mo" href="/produtos/">Ver mais produtos</a></div>';
      d.hidden = false; var g = d.querySelector(".go"); if (g) g.focus();
    }
    function finish(btn) {
      var hs = Object.keys(S.sel); if (!hs.length || S.busy) return; S.busy = 1;
      [].forEach.call(D.querySelectorAll(".cc-all"), function (b) { b.disabled = true; b.textContent = "Colocando na sacola…"; });
      var i = 0, fail = [];
      (function nx() {
        if (i >= hs.length) { S.busy = 0; quiet(Date.now()); setTimeout(closeCart, 400); var okN = hs.length - fail.length; hs.forEach(function (h) { if (fail.indexOf(h) < 0) delete S.sel[h]; }); render(); if (okN) dlg(okN, fail.length); return; }
        var h = hs[i++]; info(h).then(addOne).then(function (ok) { if (!ok) fail.push(h); nx(); }).catch(function () { fail.push(h); nx(); });
      })();
    }
    function selList() { return Object.keys(S.sel).map(function (h) { return S.sel[h]; }); }
    function render() {
      var L = selList(), tot = L.reduce(function (a, x) { return a + x.price; }, 0), cur = body.getAttribute("data-cur");
      [].forEach.call(body.querySelectorAll(".cc-pk"), function (b) { var on = !!S.sel[b.getAttribute("data-h")]; b.setAttribute("aria-pressed", on ? "true" : "false"); b.lastChild.textContent = on ? "Escolhido" : "Escolher"; var cd = b.closest(".cef-card"); if (cd) { if (on) cd.setAttribute("data-ccon", ""); else cd.removeAttribute("data-ccon"); } });
      var sd = cef.querySelector(".cx-side");
      if (sd) {
        var bx = sd.querySelector(".cc-box"); if (!bx) { bx = D.createElement("div"); bx.className = "cc-box"; sd.appendChild(bx); }
        if (!L.length && cur !== "3") { bx.hidden = true; } else {
          bx.hidden = false;
          bx.innerHTML = '<p class="k">Sua seleção</p>' + (L.length
            ? '<ul class="cc-li">' + L.map(function (x) { return '<li><span>' + E(x.name) + '</span><b>' + brl(x.price) + '</b><button type="button" class="cc-x" data-x="' + E(x.h) + '" aria-label="Tirar ' + E(x.name) + ' da seleção">×</button></li>'; }).join("") + '</ul><div class="cc-tt"><span>' + L.length + (L.length > 1 ? " chás" : " chá") + '</span><b>' + brl(tot) + '</b></div>'
            : '<p class="cc-em">Toque em "Escolher" nos chás ao lado. Eles aparecem aqui.</p>')
            + '<button type="button" class="cc-all"' + (L.length ? "" : " disabled") + '>Finalizar a escolha</button>';
        }
      }
      var bar = D.getElementById("cml-cc-bar");
      if (!bar) { bar = D.createElement("div"); bar.id = "cml-cc-bar"; bar.className = "cc-bar"; D.body.appendChild(bar); }
      bar.hidden = !L.length;
      if (L.length) bar.innerHTML = '<span><b>' + L.length + (L.length > 1 ? " chás" : " chá") + '</b> · ' + brl(tot) + '</span><button type="button" class="cc-all">Finalizar a escolha</button>';
    }
    function card(c) {
      if (c.__cc) return; var a = c.querySelector(".cef-buy a.cef-btn[href*='/produtos/']"), buy = c.querySelector(".cef-buy"); if (!a || !buy) return; c.__cc = 1;
      var h = (a.getAttribute("href").match(/\/produtos\/([^\/?#]+)/) || [])[1]; if (!h) return;
      var h3 = c.querySelector("h3"), name = "Chá " + ((h3 && h3.textContent) || h).trim(), price = num((c.querySelector(".cef-pr b") || {}).textContent);
      c.setAttribute("data-cch", h);
      a.classList.add("cc-ver"); a.textContent = "Ver detalhes"; ["background", "background-color", "box-shadow", "border"].forEach(function (p) { a.style.setProperty(p, p === "box-shadow" || p === "border" ? "none" : "transparent", "important"); }); a.style.setProperty("color", "inherit", "important");
      var pk = D.createElement("button"); pk.type = "button"; pk.className = "cc-pk"; pk.setAttribute("data-h", h); pk.setAttribute("data-n", name); pk.setAttribute("data-p", price); pk.setAttribute("aria-pressed", "false"); pk.innerHTML = '<i aria-hidden="true">✓</i><span>Escolher</span>';
      buy.appendChild(pk); buy.appendChild(a);
      info(h).catch(function () {});
    }
    [].forEach.call(body.querySelectorAll(".cef-card"), card);
    if (!cef.__cc) {
      cef.__cc = 1;
      D.addEventListener("click", function (e) {
        var t = e.target;
        var pk = t.closest && t.closest(".cc-pk"); if (pk && cef.contains(pk)) { e.preventDefault(); var h = pk.getAttribute("data-h"); if (S.sel[h]) delete S.sel[h]; else S.sel[h] = { h: h, name: pk.getAttribute("data-n"), price: parseFloat(pk.getAttribute("data-p")) || 0 }; render(); return; }
        var x = t.closest && t.closest(".cc-x"); if (x) { delete S.sel[x.getAttribute("data-x")]; render(); return; }
        var al = t.closest && t.closest(".cc-all"); if (al) { e.preventDefault(); finish(al); return; }
      }, true);
      D.addEventListener("keydown", function (e) { var d = D.getElementById("cml-cc-dlg"); if (e.key === "Escape" && d && !d.hidden) d.hidden = true; });
      var sd0 = cef.querySelector(".cx-side"); if (sd0) new MutationObserver(function () { if (!sd0.querySelector(".cc-box")) render(); }).observe(sd0, { childList: true });
      new MutationObserver(function () { setTimeout(render, 0); }).observe(body, { attributes: true, attributeFilter: ["data-cur"] });
    }
    render();
  }
  /* 21) Passo a passo no padrao do Clube (13/11/2026): Encontre seu cha e Monte seu presente com os mesmos moldes, numeros, icones, espacamentos e escolhas do montador do Clube Chef. Cada pagina mantem a sua cor (oliva no Encontre, bordo no presente). Para abrir a todos: PX_TODOS = 1. Para desligar: tirar pxPadrao da lista. */
  var PX_TODOS = 1;
  function pxPadrao() {
    if (!/^\/(encontre-seu-cha|presentes-de-natal)/.test(P)) return;
    try { if (/[?&]passos=1/.test(location.search)) localStorage.setItem("cml-passos", "1"); if (/[?&]passos=0/.test(location.search)) localStorage.removeItem("cml-passos"); } catch (e) {}
    var on = PX_TODOS; try { on = on || localStorage.getItem("cml-passos") === "1"; } catch (e) {}
    if (!on) return;
    D.documentElement.classList.add("cml-px");
    if (D.getElementById("cml-px-css")) return;
    var X = ":not(#cmlx):not(#cmly):not(#cmlz)";
    var N = "html.cml-px body #cml-natal ", C = "html.cml-px body.cml-cef ";
    var css = [
      /* cores por pagina */
      N + "{--px-ac:#a65a14;--px-acf:#2b2916}", "html.cml-px body.cml-cef{--px-ac:#565229;--px-acf:#2b2916}",
      /* moldes dos passos (Clube: branco, linha #e8ddd0, raio 28, sombra suave) */
      N + ".nx-acc" + X + "{gap:12px}",
      N + ".nx-stp" + X + "{border:1px solid #e8ddd0;border-radius:28px;background:#fff;box-shadow:none;opacity:1;transition:border-color .2s}",
      N + ".nx-stp.on" + X + "{border-color:#e8ddd0;box-shadow:0 18px 40px -32px rgba(43,41,22,.45)}",
      N + ".nx-stp.todo" + X + "{background:#fffaf5;opacity:.62}",
      N + ".nx-stp.done:hover{border-color:#a65a14}",
      N + ".nx-stp>.cmn-st" + X + "{padding:14px 18px;gap:14px}",
      N + ".nx-stp.on>.cmn-st" + X + "{padding:26px 26px 4px}",
      N + ".nx-stp>.cmn-pane" + X + "{padding:0 26px 26px}",
      C + ".cef-step" + X + "{border-radius:28px;padding:14px 18px;gap:14px;margin:0}",
      C + ".cef-step:not(.on)" + X + "{background:#fffaf5;opacity:.62}",
      C + ".cef-step.done" + X + "," + C + ".cef-step.jump" + X + "{background:#fff;opacity:1}",
      C + ".cef-step.jump:hover" + X + "{border-color:#a65a14}",
      C + ".cef-step.on" + X + "{border-radius:28px 28px 0 0;padding:26px 26px 4px;background:#fff;opacity:1}",
      C + ".cef-pane" + X + "{border-radius:0 0 28px 28px;padding:0 26px 26px;box-shadow:0 18px 40px -32px rgba(43,41,22,.45)}",
      /* numero do passo: circulo 36px areia; concluido vira check na cor da pagina; no passo aberto some (como no Clube) */
      N + ".nx-stp>.cmn-st i" + X + "," + C + ".cef-step i" + X + "{width:36px;height:36px;border:0;border-radius:50%;background:#f1e6d6;color:#a65a14;font:700 14px/36px Poppins,sans-serif;font-style:normal;text-align:center}",
      N + ".nx-stp.done>.cmn-st i" + X + "," + C + ".cef-step.done i" + X + "," + C + ".cef-step.jump i" + X + "{background:var(--px-ac);color:var(--px-acf);font-size:0}",
      N + ".nx-stp.done>.cmn-st i:after," + C + ".cef-step.done i:after," + C + ".cef-step.jump i:after{content:'\\2713';font:700 15px/36px Poppins,sans-serif}",
      N + ".nx-stp.on>.cmn-st i" + X + "," + C + ".cef-step.on i" + X + "{display:none}",
      /* textos do cabecalho: "PASSO 1 DE 3" + nome */
      N + ".nx-k" + X + "," + C + ".cef-step .nx-k" + X + "{font:600 10.5px/1.2 Poppins,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#a65a14;font-style:normal}",
      N + ".nx-stp.on .nx-k" + X + "," + C + ".cef-step.on .nx-k" + X + "{font-size:12px}",
      N + ".nx-stp .cmn-sl" + X + "," + C + ".cef-step .cef-sl" + X + "{font:600 16px/1.25 Poppins,sans-serif;color:#2b2916}",
      N + ".nx-stp.on .cmn-sl" + X + "," + C + ".cef-step.on .cef-sl" + X + "{display:none!important}",
      N + ".nx-stv" + X + "," + C + ".cef-step .nx-stv" + X + "{font:400 14px/1.3 Poppins,sans-serif;color:#4a4636}",
      /* pergunta do passo: titulo simples 20px e apoio 14px (a assinatura em italico fica so no titulo da pagina) */
      N + ".cmn-pane>.cmn-h" + X + "," + C + ".cef-pane .cef-q" + X + "{margin:6px 0 4px;font:700 20px/1.3 Poppins,sans-serif;letter-spacing:0;color:#2b2916}",
      N + ".cmn-pane>.cmn-h em" + X + "," + C + ".cef-pane .cef-q i" + X + "," + C + ".cef-pane .cef-q em" + X + "{font:inherit;font-style:normal;color:inherit;background:none}",
      N + ".cmn-sub" + X + "{margin:0 0 18px;font:300 14px/1.5 Poppins,sans-serif;color:#6f6656}",
      N + ".cmn-q.cmn-l" + X + "{margin:22px 0 10px;font:600 16px/1.3 Poppins,sans-serif;color:#2b2916}",
      /* escolhas: cartao areia, borda 1,5, raio 20, check no canto */
      N + ":is(.cmn-num,.cmn-opt)" + X + "," + C + ":is(.cef-way,.cef-opt)" + X + "{position:relative;background:#fffaf5;border:1.5px solid #e8ddd0;border-radius:20px;box-shadow:none;color:#2b2916;transition:border-color .2s,box-shadow .2s,transform .2s}",
      N + ":is(.cmn-num,.cmn-opt):hover" + X + "," + C + ":is(.cef-way,.cef-opt):hover" + X + "{border-color:#a65a14;transform:translateY(-1px)}",
      N + ":is(.cmn-num,.cmn-opt)[aria-pressed=true]" + X + "," + C + ".cef-opt[aria-pressed=true]" + X + "," + C + ".cef-opt.on" + X + "{background:#fff;border-color:var(--px-ac);color:#2b2916;box-shadow:0 0 0 3px rgba(166,90,20,.35)}",
      N + ":is(.cmn-num,.cmn-opt)[aria-pressed=true]:after," + C + ".cef-opt[aria-pressed=true]:after{content:'\\2713';position:absolute;top:10px;right:10px;width:22px;height:22px;border-radius:50%;background:var(--px-ac);color:var(--px-acf);font:700 12px/22px Poppins,sans-serif;text-align:center}",
      N + ".cmn-opt" + X + "{padding:16px 40px 16px 16px;text-align:left}",
      N + ".cmn-opt b" + X + "{display:block;font:600 16px/1.25 Poppins,sans-serif;margin:0 0 2px;color:#2b2916}",
      N + ".cmn-opt span" + X + "{display:block;font:300 13px/1.5 Poppins,sans-serif;color:#6f6656}",
      N + ".cmn-num" + X + "{padding:14px 8px;font:700 22px/1.1 Poppins,sans-serif;color:#a65a14}",
      N + ".cmn-num small" + X + "{display:block;margin-top:4px;font:400 12.5px/1.2 Poppins,sans-serif;color:#6f6656}",
      /* Encontre: caminhos com icone em quadrado areia 44px, como no Clube */
      C + ".cef-way" + X + "{padding:16px}",
      C + ".cef-way>svg" + X + "{box-sizing:border-box;width:44px;height:44px;padding:11px;border:0;border-radius:14px;background:#f1e6d6;color:#a65a14;margin:0 0 12px}",
      C + ".cef-way b" + X + "{font:600 16px/1.25 Poppins,sans-serif!important;color:#2b2916!important}",
      C + ".cef-way b .c4-w" + X + "{font:inherit;font-style:normal;background:none!important;color:inherit!important;padding:0}",
      C + ".cef-way div>span" + X + "{font:300 13px/1.5 Poppins,sans-serif!important;color:#6f6656!important}",
      C + ".cef-way em" + X + "{font:500 13px/1.2 Poppins,sans-serif!important;font-style:normal!important;color:#a65a14!important}",
      C + ".cef-opts:not(.fl)" + X + "{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px!important}",
      C + ".cef-opts:not(.fl) .cef-opt" + X + "{min-height:56px;padding:14px 36px 14px 16px;justify-content:flex-start;text-align:left;font:600 15px/1.3 Poppins,sans-serif;border-radius:20px}",
      C + ".cef-opts.fl .cef-opt" + X + "{border-radius:20px;padding:14px 36px 14px 14px;gap:12px;font:600 15px/1.3 Poppins,sans-serif}",
      C + ".cef-dot" + X + "{flex:none;width:44px;height:44px;border-radius:14px;background-color:#f1e6d6;background-size:26px;background-position:center;background-repeat:no-repeat}",
      C + ".cx-side h3 em" + X + "{color:#a65a14;-webkit-text-fill-color:#a65a14}",
      "@media(max-width:767px){" + N + ".nx-stp>.cmn-st" + X + "," + C + ".cef-step" + X + "{padding:12px 14px}" + N + ".nx-stp.on>.cmn-st" + X + "," + C + ".cef-step.on" + X + "{padding:18px 14px 2px}" + N + ".nx-stp>.cmn-pane" + X + "," + C + ".cef-pane" + X + "{padding:0 14px 18px}" + N + ".nx-stp" + X + "," + C + ".cef-step" + X + "{border-radius:24px}" + C + ".cef-step.on" + X + "{border-radius:24px 24px 0 0}" + C + ".cef-pane" + X + "{border-radius:0 0 24px 24px}" + C + ".cef-opts:not(.fl)" + X + "{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px!important}" + C + ".cef-way>svg" + X + "{width:38px;height:38px;padding:9px;margin-bottom:10px}" + C + ".cef-dot" + X + "{width:38px;height:38px}" + N + ".cmn-opt" + X + "{padding:14px 36px 14px 12px}}"
    ].join("").replace(/([^{};]+:[^{};]+?)(?=[;}])/g, function (m) { return /!important/.test(m) ? m : m + "!important"; });
    var st = D.createElement("style"); st.id = "cml-px-css"; st.textContent = css; (D.head || D.documentElement).appendChild(st);
  }
  /* 22) Cashback em um toque (14/11/2026): no pop-up do Cashing (site), a tela "Gerar cupom" esconde o campo de quantidade e vira um botao unico "Usar todo o meu cashback", ja preenchido com todo o saldo dentro da regra (cupom de ate R$ 100 = 2.000 Cashback Chef; compra minima R$ 199). Na sacola, quem tem saldo ve "Voce tem R$ X de cashback" com o botao "Usar meu cashback", que abre direto essa tela. O checkout e do Cashing e nao passa por aqui. Para desligar: tirar cbUm da lista. */
  var CB_MAX = 2000, CB_VAL = 0.05;
  function cbUm() {
    if (!D.getElementById("cml-cb1-css")) {
      var st = D.createElement("style"); st.id = "cml-cb1-css";
      st.textContent = "[data-cml-cb1=campo]{display:none!important}"
        + "button[data-cml-cb1=go]{font-size:0!important}button[data-cml-cb1=go]>*{display:none!important}button[data-cml-cb1=go]:after{content:'Usar todo o meu cashback';font:600 15px/1 Poppins,sans-serif}"
        + ".cml-cb1-nt{margin:2px 0 0;font:400 12.5px/1.45 Poppins,sans-serif;opacity:.85}"
        + ".cml-cb1-cart{display:flex;align-items:center;gap:10px;margin:10px 0;padding:12px 14px;border:1px solid #e8ddd0;border-radius:16px;background:#fffaf5;font:400 13.5px/1.35 Poppins,sans-serif;color:#2b2916}"
        + ".cml-cb1-cart span{flex:1;min-width:0}.cml-cb1-cart b{color:#a65a14;font-weight:600}"
        + ".cml-cb1-cart button{flex:none;min-height:38px;padding:0 14px;border:0;border-radius:999px;background:#a65a14;color:#f6efe9;font:600 13px/1 Poppins,sans-serif;cursor:pointer}";
      (D.head || D.documentElement).appendChild(st);
    }
    function pts() {
      var pill = [].filter.call(D.querySelectorAll(".mi-fixed span,.mi-fixed strong"), function (e) { return e.children.length < 4 && /=\s*R\$\s*[\d.,]+/.test(e.textContent) && /Cashback Chef/.test(e.textContent) && e.textContent.length < 60; })[0];
      if (pill) { var m = pill.textContent.match(/([\d.]+)\s*=\s*R\$/); if (m) return parseInt(m[1].replace(/\./g, ""), 10) || 0; }
      var orig = D.querySelector("[data-slot='corner_bottom_left'] button[aria-label='Meu cashback']");
      var n = ((orig && orig.querySelector("svg")) || {}).textContent || ""; return parseInt(n.replace(/\D/g, ""), 10) || 0;
    }
    /* tela Gerar cupom do pop-up */
    var inp = D.querySelector('input[type="number"][placeholder^="Quantos Cashback"]');
    if (inp) {
      var campo = inp.parentElement, box = campo && campo.parentElement;
      if (campo && campo.getAttribute("data-cml-cb1") !== "campo") campo.setAttribute("data-cml-cb1", "campo");
      var go = box && [].filter.call(box.querySelectorAll("button"), function (b) { return /Gerar cupom/.test(b.textContent); })[0];
      if (go) { if (go.getAttribute("data-cml-cb1") !== "go") go.setAttribute("data-cml-cb1", "go"); if (go.style.getPropertyPriority("font-size") !== "important") go.style.setProperty("font-size", "0", "important"); }
      var p = pts(), want = Math.min(p, CB_MAX);
      if (want > 0 && String(inp.value) !== String(want)) { try { var set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set; set.call(inp, String(want)); inp.dispatchEvent(new Event("input", { bubbles: true })); inp.dispatchEvent(new Event("change", { bubbles: true })); } catch (e) {} }
      if (box && !box.querySelector(".cml-cb1-nt")) {
        var nt = D.createElement("p"); nt.className = "cml-cb1-nt";
        nt.textContent = (want > 0 ? "Vira um cupom de R$ " + (want * CB_VAL).toFixed(2).replace(".", ",") + ". " : "") + "Vale até R$ 100 por compra, em compras a partir de R$ 199.";
        box.insertBefore(nt, campo);
      }
    }
    /* linha na sacola */
    var mc = D.getElementById("modal-cart"), list = mc && mc.querySelector(".js-ajax-cart-list");
    if (list) {
      var p2 = pts(), row = mc.querySelector(".cml-cb1-cart");
      if (p2 > 0 && D.querySelectorAll("#modal-cart .js-cart-item").length) {
        var tx = "Você tem <b>R$ " + (Math.min(p2, CB_MAX) * CB_VAL).toFixed(2).replace(".", ",") + "</b> de cashback para usar agora";
        if (!row) { row = D.createElement("div"); row.className = "cml-cb1-cart"; row.innerHTML = "<span></span><button type=\"button\">Usar meu cashback</button>"; list.parentNode.insertBefore(row, list.nextSibling);
          row.querySelector("button").addEventListener("click", function () {
            var k = mc.querySelector(".js-modal-close-private"); if (k) k.click();
            var orig = D.querySelector("[data-slot='corner_bottom_left'] button[aria-label='Meu cashback']"); if (!orig) return; orig.click();
            var t0 = Date.now(); (function w() { var g = [].filter.call(D.querySelectorAll("button"), function (b) { return b.textContent.trim() === "Gerar cupom" && !b.closest("[data-cml-cb1]") && b.getAttribute("data-cml-cb1") !== "go"; })[0]; if (g) { g.click(); return; } if (Date.now() - t0 < 4000) setTimeout(w, 150); })();
          });
        }
        var sp = row.querySelector("span"); if (sp.innerHTML !== tx) sp.innerHTML = tx;
      } else if (row) row.remove();
    }
  }
  /* 23) Monte seu presente: fotos dos moldes sempre preenchendo a moldura (sem fundo sobrando) e foto tambem na opcao "Manter a caixa padrao" do kit (usa a foto do proprio kit). 14/11/2026. Para desligar: tirar natFotos da lista. */
  function natFotos() {
    if (!/^\/presentes-de-natal/.test(P)) return;
    if (!D.getElementById("cml-natf-css")) {
      var st = D.createElement("style"); st.id = "cml-natf-css";
      st.textContent = "html body #cml-natal .cmn-box:not(#cmlx):not(#cmly){display:block!important;padding:0!important;overflow:hidden!important;border-radius:14px!important;aspect-ratio:4/3!important;background:#f6efe9!important}"
        + "html body #cml-natal .cmn-box img:not(#cmlx):not(#cmly){display:block!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;object-fit:cover!important;border-radius:0!important}"
        + "html body #cml-natal .cmn-kitbox img:not(#cmlx):not(#cmly){width:72px!important;height:72px!important;object-fit:cover!important;border-radius:14px!important;flex:none}"
        + "html body #cml-natal .cmn-kim img:not(#cmlx):not(#cmly){width:100%!important;height:100%!important;object-fit:cover!important}";
      (D.head || D.documentElement).appendChild(st);
    }
    var std = D.querySelector('#cml-natal .cmn-opt[data-box="std"]'); if (!std || std.querySelector(".cmn-box")) return;
    var k = D.querySelector("#cml-natal .cmn-kitbox img"); if (!k || !k.getAttribute("src")) return;
    var src = k.getAttribute("src").replace(/-(\d+)-0\.(webp|jpg|jpeg|png)/, "-640-0.$2");
    var bx = D.createElement("span"); bx.className = "cmn-box"; bx.innerHTML = '<img alt="Caixa padrão do kit" width="480" height="360" loading="lazy" decoding="async">'; bx.firstChild.setAttribute("src", src);
    std.insertBefore(bx, std.firstChild);
  }
  /* 24) WhatsApp oficial = o numero do Cashing (14/11/2026). Todo link de WhatsApp do site (tema, rodape, botoes, apps e codigos antigos com o 47 99272-6557) passa a abrir o 47 9157-1974, que e o numero conectado ao Cashing. O 6557 fica so de reserva, fora do site. Para desligar: tirar waFix da lista. */
  var WA_NOVO = "554791571974";
  function waFix() {
    [].forEach.call(D.querySelectorAll('a[href*="92726557"]'), function (a) { var h = a.getAttribute("href"); var n = h.replace(/(wa\.me\/|phone=|whatsapp\.com\/send\?phone=)(55)?(47)?9?92726557/g, "$1" + WA_NOVO); if (n !== h) a.setAttribute("href", n); });
    if (!window.__cmlWaOpen && window.open) { window.__cmlWaOpen = 1; var o = window.open; window.open = function (u) { try { if (typeof u === "string" && /92726557/.test(u)) arguments[0] = u.replace(/(55)?(47)?9?92726557/g, WA_NOVO); } catch (e) {} return o.apply(window, arguments); }; }
  }
  function tick() {
    var steps = [waFix, addCss, footPay, megaMenu, faqPage, contactPage, cefPage, contaTrack, footLinks, sacola, espBtns, topBtn, navSpecial, homeV2, dockCb, cefPlus, natPlus, natSkel, cefUI, cefCart, pxPadrao, cbUm, natFotos];
    for (var i = 0; i < steps.length; i++) { try { steps[i](); } catch (e) { try { console.warn("cml-paginas", steps[i].name || i, e); } catch (x) {} } }
  }
  function start() {
    tick();
    var n = 0, iv = setInterval(function () { if (!D.hidden) tick(); if (++n > 24) clearInterval(iv); }, 250);
    if ("MutationObserver" in window && D.body) { var to = 0; new MutationObserver(function () { if (to) return; to = setTimeout(function () { to = 0; tick(); }, 150); }).observe(D.body, { childList: true, subtree: true }); }
  }
  /* 15) Home mais leve (11/11/2026): o que fica abaixo da dobra so baixa quando o visitante chega perto.
     a) Instagram do tema (3 fotos grandes, ~760 KB) fica escondido ate 900px antes de aparecer.
     Para desligar: apagar a chamada lazyHome() abaixo. */
  function lazyHome() {
    if (P !== "/" || window.__cmlLz) return; window.__cmlLz = 1;
    var st = D.createElement("style"); st.id = "cml-lz"; st.textContent = 'html.cml-lz [data-section-id^="instagram"]{display:none!important}'; (D.head || D.documentElement).appendChild(st); D.documentElement.classList.add("cml-lz");
    function near(el, cb, m) { if (!("IntersectionObserver" in window)) { cb(); return; } var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); cb(); } }, { rootMargin: (m || 900) + "px 0px" }); io.observe(el); }
    function igInit() { var ig = D.querySelector('[data-section-id^="instagram"]'); if (!ig || ig.__lz) return; ig.__lz = 1; var s = D.createElement("div"); s.style.cssText = "height:1px"; ig.parentNode.insertBefore(s, ig); near(s, function () { D.documentElement.classList.remove("cml-lz"); s.parentNode && s.parentNode.removeChild(s); }); }
    var mo = new MutationObserver(function () { try { igInit(); } catch (e) {} }); mo.observe(D.documentElement, { childList: true, subtree: true });
    D.addEventListener("DOMContentLoaded", function () { try { igInit(); } catch (e) {} });
  }
  try { lazyHome(); } catch (e) {}
  /* 16) Monte seu presente: enquanto a funcao cml-natal nao chega (1 a 3 s no celular), a pagina mostrava o texto cru do tema e o rodape. Agora o tema fica escondido e um cartao bordo "Montando a sua caixa" segura o lugar; natSkel tira o cartao quando o montador aparece. Se cml-natal nao vier em 12 s, o tema volta. Para desligar: apagar a chamada natPre() e tirar natSkel da lista. */
  function natPre() {
    if (!/^\/presentes-de-natal/.test(P) || D.getElementById("cml-natw")) return;
    var st = D.createElement("style"); st.id = "cml-natw"; st.textContent = "html.cml-natw #ns-section-heading,html.cml-natw #ns-section-page_content{display:none!important}html:not(.cml-blk) body.template-page{background-color:#f6efe9!important}#cml-nat-skel{width:min(1318px,calc(100% - 32px));margin:18px auto 40px;min-height:62vh;padding:clamp(28px,4vw,52px);border-radius:28px;background:radial-gradient(110% 90% at 20% 15%,#565229 0%,#565229 55%,#403d1e 100%);color:#2b2916;font-family:Poppins,sans-serif}#cml-nat-skel .k{margin:0 0 12px;font:500 10.5px/1.2 Poppins,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#a65a14}#cml-nat-skel h1{margin:0 0 14px;font:700 clamp(32px,4.4vw,54px)/1.08 Poppins,sans-serif;color:#2b2916}#cml-nat-skel h1 em{font-weight:300;font-style:italic;color:#a65a14}#cml-nat-skel p{margin:0 0 26px;max-width:46ch;font:300 16px/1.55 Poppins,sans-serif;color:rgba(43,41,22,.85)}#cml-nat-skel .ld{display:inline-flex;align-items:center;gap:10px;font:500 13px/1 Poppins,sans-serif;color:#a65a14}#cml-nat-skel .ld i{width:10px;height:10px;border-radius:50%;background:#a65a14;animation:cmlns 1s ease-in-out infinite}@keyframes cmlns{0%,100%{opacity:.25;transform:scale(.7)}50%{opacity:1;transform:scale(1)}}@media (max-width:640px){#cml-nat-skel{width:calc(100% - 24px);margin:12px auto 28px;min-height:52vh;padding:22px 18px}}";
    (D.head || D.documentElement).appendChild(st); D.documentElement.classList.add("cml-natw");
    setTimeout(function () { if (!D.querySelector("#cml-natal .cmn-panel")) natOff(); }, 12000);
  }
  function natOff() { D.documentElement.classList.remove("cml-natw"); var k = D.getElementById("cml-nat-skel"); if (k && k.parentNode) k.parentNode.removeChild(k); }
  function natSkel() {
    if (!/^\/presentes-de-natal/.test(P) || !D.documentElement.classList.contains("cml-natw")) return;
    if (D.querySelector("#cml-natal .cmn-panel")) { natOff(); return; }
    if (D.getElementById("cml-nat-skel")) return;
    var m = D.getElementById("MainContent") || D.querySelector("main"); if (!m) return;
    var k = D.createElement("div"); k.id = "cml-nat-skel"; k.setAttribute("aria-live", "polite");
    k.innerHTML = '<p class="k">Natal Chef Mais Leve</p><h1>O presente certo, <em>feito à mão</em></h1><p>Monte uma caixa com chás, snacks e granolas feitos à mão. A gente embala, escreve o cartão e entrega.</p><span class="ld"><i></i>Montando a sua caixa…</span>';
    m.insertBefore(k, m.firstChild);
  }
  try { natPre(); } catch (e) {}
  /* 18) Monte seu presente no padrao do Clube: passos em sanfona a esquerda (cada passo mostra o que foi escolhido) e resumo fixo a direita, em bordo, com o total e o botao. Usa os ganchos CML_NFX (html de cada render) e CML_NST (estado antes de cada render) do montador. Para desligar: apagar a chamada natHooks(). */
  function natHooks() {
    if (!/^\/presentes-de-natal/.test(P) || window.CML_NST) return;
    var FG = [[249, "São Paulo"], [299, "Sul, Sudeste e DF"], [359, "Centro-Oeste"], [459, "Nordeste"], [599, "Norte"]];
    function E(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
    function destTx(S) { return S.dest === "pessoa" ? "Direto para quem ganha" : S.dest === "varios" ? "Endereços diferentes" : "Eu recebo"; }
    function val(st, n) {
      var S = st.S, g = st.G(), kt = st.kitOf(g), b = st.boxOf(g), c = st.count(g);
      if (n === 1) { if (!S.pn) return ""; var t = S.n === 1 ? "1 pessoa" : S.n + (S.mode === "iguais" ? " presentes iguais" : " presentes diferentes"); return t + (S.pd ? " · " + destTx(S) : ""); }
      if (n === 2) return kt ? "Kit " + kt.name : (S.max > 2 || S.step > 2 ? "Montado por você" : "");
      if (n === 3) return b ? b.name : "";
      if (n === 4) return kt ? "" : (c ? c + (c > 1 ? " itens" : " item") : "");
      if (n === 5) return g.card.on ? (g.card.to ? "Para " + g.card.to : "Com cartão") : (S.step > 5 ? "Sem cartão" : "");
      return "";
    }
    window.CML_NST = function (st) {
      window.__nxS = st;
      setTimeout(function () { try { side(st); } catch (e) {} }, 0);
    };
    window.CML_NFX = function (html) {
      try {
        var st = window.__nxS, t = D.createElement("template"); t.innerHTML = html;
        var nav = t.content.querySelector("nav.cmn-steps"), pane = t.content.querySelector(".cmn-pane"); if (!nav || !pane) return html;
        var its = [].slice.call(nav.querySelectorAll(".cmn-st")); if (its.length !== 6) return html;
        var out = '<div class="nx-acc">';
        its.forEach(function (it, i) {
          var n = i + 1, cur = it.classList.contains("on"), done = it.classList.contains("done"), lab = (it.querySelector(".cmn-sl") || {}).textContent || "", ic = (it.querySelector("i") || {}).textContent || n;
          var v = st && !cur ? val(st, n) : "", attrs = [].map.call(it.attributes, function (a) { return a.name + '="' + E(a.value) + '"'; }).join(" "), tag = it.tagName.toLowerCase();
          out += '<section class="nx-stp' + (cur ? " on" : done ? " done" : " todo") + '"><' + tag + " " + attrs + '><i>' + E(ic) + '</i><span class="nx-ht"><em class="nx-k">Passo ' + n + ' de 6</em><span class="cmn-sl">' + E(lab) + '</span></span>' + (v ? '<span class="nx-stv">' + E(v) + '</span>' : '') + '</' + tag + '>' + (cur ? pane.outerHTML : "") + '</section>';
        });
        return out + "</div>";
      } catch (e) { return html; }
    };
    function side(st) {
      var S = st.S, el = st.el, panel = el.querySelector(".cmn-panel"); if (!panel) return;
      var sd = panel.querySelector(".nx-side");
      if (!sd) { panel.classList.add("nx-2col"); sd = D.createElement("aside"); sd.className = "nx-side"; sd.setAttribute("aria-label", "Resumo do presente"); panel.appendChild(sd);
        el.addEventListener("input", function () { clearTimeout(sd.__t); sd.__t = setTimeout(function () { try { side(window.__nxS); } catch (e) {} }, 300); });
        sd.addEventListener("click", function (e) { var b = e.target.closest(".nx-go"); if (!b || b.disabled) return; var tg = el.querySelector(".cmn-pane [data-buy]") || el.querySelector(".cmn-bar .cmn-btn") || el.querySelector(".cmn-pane .cmn-nav .cmn-btn") || el.querySelector("button.cmn-btn[data-go]") || el.querySelector(".cmn-pane .cmn-own.big"); if (tg) tg.click(); }); }
      var g = st.G(), kt = st.kitOf(g), b = st.boxOf(g), c = st.count(g), tot = st.subtotal(), nxt = null, la = null;
      FG.forEach(function (f) { if (tot >= f[0]) la = f; else if (!nxt) nxt = f; });
      var frete = !tot ? "calculado na sacola" : nxt ? (la ? "grátis para " + la[1] : "faltam " + st.brl(nxt[0] - tot) + " p/ grátis") : "grátis em todo o Brasil";
      var items = Object.keys(g.items).map(function (k) { return g.items[k] + "× " + (st.byId[k] ? st.byId[k].name : ""); });
      var pb = el.querySelector(".cmn-pane [data-buy]") || el.querySelector(".cmn-bar .cmn-btn") || el.querySelector(".cmn-pane .cmn-nav .cmn-btn") || el.querySelector("button.cmn-btn[data-go]") || el.querySelector(".cmn-pane .cmn-own.big");
      var ctaTx = S.step === 6 ? "Colocar na sacola →" : pb ? (pb.querySelector("b") ? pb.querySelector("b").textContent.trim() + " →" : (pb.textContent || "Continuar →").replace(/\s+/g, " ").trim()) : "Continuar →", dis = !pb || pb.disabled;
      var hint = dis ? (S.step === 1 ? "Responda as perguntas acima" : S.step === 3 ? "Escolha a caixa" : S.step === 4 ? (c > (b ? b.cap : 0) ? "Tire itens para caber na caixa" : "Adicione pelo menos um item") : S.step === 5 ? "Escreva a mensagem do cartão" : "Complete o passo atual") : "";
      var n = st.giftsCount();
      sd.innerHTML = '<p class="k">Seu presente de Natal</p><h3>Resumo <em>da caixa</em></h3><dl>'
        + '<div><dt>Pessoas</dt><dd>' + (S.pn ? E(S.n === 1 ? "1 pessoa" : S.n + (S.mode === "iguais" ? " iguais" : " diferentes")) : "<i>a definir</i>") + '</dd></div>'
        + '<div><dt>Entrega</dt><dd>' + (S.pd ? E(destTx(S)) : "<i>a definir</i>") + '</dd></div>'
        + (kt ? '<div><dt>Kit</dt><dd>' + E(kt.name) + '</dd></div>' : '')
        + '<div><dt>' + (kt ? "Embalagem" : "Caixa") + '</dt><dd>' + (b ? E(b.name) : "<i>a definir</i>") + '</dd></div>'
        + (kt ? '' : '<div class="it"><dt>Itens' + (b ? ' <small>' + c + "/" + b.cap + '</small>' : '') + '</dt><dd>' + (items.length ? '<ul><li>' + items.map(E).join("</li><li>") + '</li></ul>' : "<i>a definir</i>") + '</dd></div>')
        + '<div><dt>Cartão</dt><dd>' + (g.card.on ? E(g.card.to ? "Para " + g.card.to : "Escrito à mão") : S.step > 5 ? "Sem cartão" : "<i>a definir</i>") + '</dd></div>'
        + '<div><dt>Frete</dt><dd>' + E(frete) + '</dd></div></dl>'
        + '<div class="tt"><span>' + (n > 1 ? n + " presentes" : "Total") + '</span><b>' + E(st.brl(tot)) + '</b></div>'
        + (tot ? '<p class="pz">Até 5x de ' + E(st.brl(tot / 5)) + ' sem juros · 5% de cashback</p>' : '<p class="pz">Os itens já estão com preço de Natal.</p>')
        + '<button type="button" class="nx-go"' + (dis ? " disabled" : "") + '>' + E(ctaTx) + '</button>' + (hint ? '<p class="hn">' + E(hint) + '</p>' : '')
        + '<p class="nt">Cada presente vai montado e embalado à mão. Cartão escrito à mão, grátis.</p>';
    }
  }
  try { natHooks(); } catch (e) {}
  if (D.readyState === "loading") D.addEventListener("DOMContentLoaded", start); else start();
})();

/* Clube Chef (11/11/2026): carrega a funcao cml-clube so na home, em /clube-chef/ e nas paginas dos produtos do clube. Para desligar: apagar este bloco. */
;(function(){try{if(window.__cmlClubeL)return;window.__cmlClubeL=1;var p=location.pathname,D=document;var pg=/^\/clube-chef\/?$/.test(p);/* home v2: o modulo do Clube na home esta escondido, entao nao carrega na home (para voltar: p==="/"|| no teste) */if(!(/^\/account\/?$/.test(p)||pg||/^\/produtos\/clube-chef-/.test(p)))return;if(pg&&!D.getElementById("cml-clube-pre")){var c=D.createElement("style");c.id="cml-clube-pre";c.textContent="#ns-section-heading,#ns-section-page_content,[id^=ns-section-divider],[id^=ns-section-faq]{display:none!important}";(D.head||D.documentElement).appendChild(c)}var s=D.createElement("script");s.src="https://dzmlyrkzcdqicwfmxnxd.supabase.co/functions/v1/cml-clube";s.async=true;(D.head||D.documentElement).appendChild(s)}catch(e){}})();

/* CML LINKS GOOGLE (12/11/2026): o link curto antigo (maps.app.goo.gl/NRJ2aN536NKptmpZ6) abria uma avaliacao apagada ("Essa avaliacao nao esta mais disponivel").
   A origem esta no pacote extras do rodape do tema publicado; aqui o link e corrigido na hora em todas as paginas.
   Avaliacoes -> lista de avaliacoes da ficha oficial; "Onde estamos" -> ficha no Maps. Contagem fixa "98 avaliacoes" vira "nota no Google" (o numero muda).
   Para desfazer: apague este bloco. */
(function(){if(window.__cmlGLinks)return;window.__cmlGLinks=1;
var D=document,OLD="NRJ2aN536NKptmpZ6",PID="ChIJ5x1cbZDR2JQRx7Ggp9fGpIE",REV="https://search.google.com/local/reviews?placeid="+PID,MAP="https://www.google.com/maps/place/?q=place_id:"+PID;
function fix(){try{var a=D.querySelectorAll('a[href*="'+OLD+'"]');for(var i=0;i<a.length;i++){var t=a[i].textContent||"";a[i].href=/onde estamos|penha|santa l/i.test(t)?MAP:REV}
var s=D.querySelectorAll(".cml-nc-n span");for(var j=0;j<s.length;j++){if(/^\d+\s+avalia/i.test(s[j].textContent.trim()))s[j].textContent="nota no Google"}}catch(e){}}
fix();if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",fix);addEventListener("load",fix);
var q=0;try{var mo=new MutationObserver(function(){if(q)return;q=setTimeout(function(){q=0;fix()},250)});mo.observe(D.documentElement,{childList:true,subtree:true});setTimeout(function(){mo.disconnect();fix()},20000)}catch(e){}
})();


/* ---------- Varredura 12/11/2026: correcao de textos do FAQ do tema (frete gratis com os valores reais, ortografia, "organica").
   Remendo temporario: a correcao definitiva e nos modelos do tema (Pagina, Inicio e Produto). Para desfazer: apagar este bloco. ---------- */
(function(){if(window.__cmlFaqFix)return;window.__cmlFaqFix=1;
var R=[[/R\$ ?299,00 para São Paulo(?! \()/g,"R$ 249,00 para todo o estado de São Paulo"],[/São Paulo \([Cc]apital\)/g,"todo o estado de São Paulo"],[/R\$ ?349,00 para a região Centro Oeste/g,"R$ 359,00 para a região Centro-Oeste"],[/região Centro Oeste/g,"região Centro-Oeste"],[/R\$ ?399,00 para a região Nordeste/g,"R$ 459,00 para a região Nordeste"],[/R\$ ?499,00 para a região Norte/g,"R$ 599,00 para a região Norte"],[/tranferências/g,"transferências"],[/Os custos do envio será calculado com base no total da compra e endereço da entrega, no checkout ou na calculadora do seu carrinho, é informado pós preencher seus dados ou apenas o CEP\.?/g,"O frete é calculado pelo CEP e pelo valor da compra. Você vê o valor no carrinho, só com o CEP, ou no checkout."],[/após acreditação do pagamento/g,"após a confirmação do pagamento"],[/fazer um novo envio sobre analise/g,"fazer um novo envio após a análise"],[/Nossos doces saudáveis são todos feitos de forma organica\. Sem aditivos de açucar ou conservantes\./g,"Nossos doces são feitos à mão, sem conservantes. A maioria não leva açúcar adicionado: o doce vem da própria fruta. Quando a receita leva adoçante, ele aparece nos ingredientes do produto."],[/Nossos produtos não contém aditivos, conservantes e açucar\./g,"Nossos doces são feitos à mão, sem conservantes. A maioria não leva açúcar adicionado: o doce vem da própria fruta."],[/É tudo extraído da fruta e de forma orgânica\./g,""],[/Tipos de adocantes que usamos: Eritritol, Coco, Adoçante Zero\./g,"Quando a receita leva adoçante, usamos eritritol ou açúcar de coco, sempre indicados nos ingredientes do produto."],[/Contém açucar nos doces\?/g,"Os doces têm açúcar?"],[/OS DOCES CONTÉM AÇÚCAR\?/g,"OS DOCES TÊM AÇÚCAR?"]];
function fix(root){var els=(root||document).querySelectorAll('.accordion-item-body, .faq-list, [class*="faq"]');for(var i=0;i<els.length;i++){var w=document.createTreeWalker(els[i],NodeFilter.SHOW_TEXT),n;while(n=w.nextNode()){var t=n.nodeValue,o=t;for(var k=0;k<R.length;k++)t=t.replace(R[k][0],R[k][1]);if(t!==o)n.nodeValue=t}}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){fix()});else fix();
setTimeout(function(){fix()},2500);})();

/* Sacola com frete gratis (13/11/2026): barra de quanto falta para o frete gratis + sugestoes na ordem fixa (Laranja Chocoleve, uma trouxinha, Infusao na Tangerina, Infusor Inox, depois outros). Some quando o frete gratis e atingido. Regiao: pelo CEP digitado na sacola ou escolhida na lista; padrao SP. Para desligar: apagar este bloco. */
;(function(){try{if(window.__cmlFg)return;window.__cmlFg=1;var D=document;
var CDN="https://acdn-us.mitiendanube.com/stores/005/060/752/products/";
var RG=[["sp","São Paulo",249],["se","Sul, Sudeste e DF",299],["co","Centro-Oeste",359],["ne","Nordeste",459],["no","Norte",599]];
/* [handle, produto, variante, opcao, nome, preco, foto] */
var P=[
["laranja-choco-leve",224675737,1001604994,null,"Laranja Chocoleve",45,"chatgpt-image-10_05_2026-01_17_27-9828d51df3d5722e8517783866624784"],
["trouxinha-maca1",224679101,1001586967,null,"Trouxinha de Maçã",59,"chatgpt-image-11_05_2026-14_01_43-9740208ddf11644ef717785189091683",1],
["trouxinha-capim-limao",224679048,1001461715,null,"Trouxinha de Capim-Limão",59,"chatgpt-image-11_05_2026-13_29_58-1bdcdbc50476fe8e1117785170056355",1],
["trouxinha-frutas-vermelhas",224679381,1001587918,null,"Trouxinha de Frutas Vermelhas",59,"chatgpt-image-11_05_2026-13_44_46-012a958c8d9d0aa41c17785178915547",1],
["infusao-trouxinha-de-abacaxi",227899802,1004386241,null,"Trouxinha de Abacaxi",59,"trouxinha-7368fc7e08c6db418117895731278503",1],
["trouxinha-calendula",224679530,1001158319,null,"Trouxinha de Calêndula",59,"chatgpt-image-11_05_2026-14_23_35-904c0069cedf0549d617785203493705",1],
["infusao-rose-na-tangerina",224679971,1599860368,"01 un.","Infusão na Tangerina Rosé",39,"chatgpt-image-11_05_2026-13_07_51-78d83c8113d0146a0617785156790535"],
["infusor-inox",227622893,1003148337,null,"Infusor Inox",39,"4-014d5452f88466d4e417254775213969"],
["cha-blend-serenissimo",224678493,1568041929,null,"Chá Misto Sereníssimo",48,"aa99458c07b0c03fc664783c439ea3f6-a139cfddb7d8f2170717849861066454"],
["xicara-de-vidro-duplo",227621935,1003141024,null,"Xícara Vidro Duplo",53,"chatgpt-image-11_05_2026-14_20_03-bc0a1d3fac9aaab95117785200217570"],
["tangerina-desidratada",274973417,1521633520,null,"Tangerina Desidratada",29,"chatgpt-image-10_05_2026-00_59_00-2d0da915322283092817783855632287"],
["rosa-de-maca-para-cha-delicadeza-e-sabor",311682784,1521626496,"02 Un.","Rosa de Maçã para Chá",35,"chatgpt-image-11_05_2026-12_55_06-0663a3a923894791f617785149576049"]];
function brl(v){return"R$ "+v.toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".")}
function num(t){t=(t||"").replace(/[^\d,]/g,"").replace(",",".");return parseFloat(t)||0}
function rgCep(c){c=parseInt((c||"").replace(/\D/g,"").slice(0,5),10);if(!c||c<1000)return null;
 if(c<20000)return"sp";if(c<40000)return"se";if(c<66000)return"ne";if(c<70000)return"no";if(c<72800)return"se";if(c<73000)return"co";if(c<73700)return"se";if(c<76800)return"co";if(c<78000)return"no";if(c<80000)return"co";return"se"}
function getRg(){var i=D.querySelector('#modal-cart input[name="zipcode"],#modal-cart .js-shipping-input');var r=i&&rgCep(i.value);if(r)return r;try{r=localStorage.getItem("cml-fg-rg")}catch(e){}return r||"sp"}
var CSS=".cml-fg{margin:0 0 12px;padding:12px 14px 14px;border-radius:16px;background:#fffaf5;border:1px solid #efe4d8;font-family:Poppins,sans-serif;color:#2b2916}.cml-fg[hidden]{display:none}"
+".cml-fg .t{margin:0 0 8px;font-size:13.5px;line-height:1.35}.cml-fg .t b{color:#a65a14;font-weight:700}.cml-fg.ok .t b{color:#565229}"
+".cml-fg .br{height:7px;border-radius:999px;background:#ede3d8;overflow:hidden}.cml-fg .br i{display:block;height:100%;border-radius:999px;background:#d27e29;transition:width .35s ease}.cml-fg.ok .br i{background:#565229}"
+".cml-fg .rg{display:flex;align-items:center;gap:6px;margin-top:8px;font-size:11.5px;color:#6f6656}.cml-fg .rg{flex-wrap:wrap}.cml-fg .rg select{appearance:auto;border:0;background:transparent;font:inherit;font-weight:600;color:#2b2916;padding:0;cursor:pointer;max-width:170px}"
+".cml-fgs{margin:12px 0}.cml-fg .h{margin:0 0 8px;font-size:12.5px;font-weight:600;color:#565229}.cml-fg .rw{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}"
+".cml-fg .c{display:flex;flex-direction:column;gap:5px;padding:6px 6px 8px;border-radius:13px;background:#fff;border:1px solid #efe4d8;min-width:0}"
+".cml-fg .c img{width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:9px;display:block;background:#f6efe9}"
+".cml-fg .c b{font-size:11.5px;line-height:1.25;font-weight:600;min-height:29px;overflow-wrap:anywhere}.cml-fg .c em{font-style:normal;font-size:12.5px;font-weight:700;color:#a65a14}"
+".cml-fg .c button{height:32px;margin-top:auto;border-radius:999px;border:1.5px solid #565229;background:transparent;color:#565229;font:600 11.5px Poppins,sans-serif;cursor:pointer;padding:0 4px}.cml-fg .c button:hover{background:#565229;color:#2b2916}.cml-fg .c button:disabled{opacity:.55;cursor:default}"
+"html.cml-blk .cml-fg{background:#fffaf5;border-color:#fffaf5;color:#2b2916}html.cml-blk .cml-fg .t b{color:#a65a14}html.cml-blk .cml-fg .br{background:#fffaf5}html.cml-blk .cml-fg .br i{background:#a65a14}html.cml-blk .cml-fg.ok .t b{color:#a65a14}html.cml-blk .cml-fg.ok .br i{background:#a65a14}"
+"html.cml-blk .cml-fg .rg{color:#b9b2a3}html.cml-blk .cml-fg .rg select{color:#2b2916}html.cml-blk .cml-fg .rg select option{color:#2b2916}html.cml-blk .cml-fg .h{color:#a65a14}html.cml-blk .cml-fg .c{background:#f6efe9;border-color:#fffaf5}html.cml-blk .cml-fg .c em{color:#a65a14}"
+"html.cml-blk .cml-fg .c button{border-color:#a65a14;color:#a65a14}html.cml-blk .cml-fg .c button:hover{background:#a65a14;color:#f6efe9}"
+"html.cml-fg-add #js-cross-selling-modal,html.cml-fg-add [data-overlay-id=js-cross-selling-modal],html.cml-fg-add #related-products-notification,html.cml-fg-add [data-overlay-id=related-products-notification],html.cml-fg-add .js-alert-added-to-cart{visibility:hidden!important;opacity:0!important;pointer-events:none!important}"
+"@media (max-width:380px){.cml-fg{padding:10px 10px 12px}.cml-fg .rw{gap:6px}.cml-fg .c b{font-size:11px}}";
var busy=0,last="";
function items(){return[].slice.call(D.querySelectorAll("#modal-cart .js-ajax-cart-list .js-cart-item"))}
function state(){var sub=0,has={};items().forEach(function(it){var s=it.querySelector(".js-cart-item-subtotal");sub+=num(s&&s.textContent);[].forEach.call(it.querySelectorAll("a[href*='/produtos/']"),function(a){var m=a.getAttribute("href").match(/\/produtos\/([^\/?#]+)/);if(m)has[m[1]]=1})});return{sub:sub,has:has,n:items().length}}
function sugs(has){var out=[],tr=0;P.forEach(function(p){if(p[7]&&has[p[0]])tr=1});for(var i=0;i<P.length&&out.length<3;i++){var p=P[i];if(has[p[0]])continue;if(p[7]){if(tr)continue;tr=1}out.push(p)}return out}
function box(){var l=D.querySelector("#modal-cart .js-ajax-cart-list");if(!l)return null;var b=D.getElementById("cml-fg");if(!b){if(!D.getElementById("cml-fg-css")){var s=D.createElement("style");s.id="cml-fg-css";s.textContent=CSS;D.head.appendChild(s)}b=D.createElement("div");b.id="cml-fg";b.className="cml-fg";b.setAttribute("aria-live","polite");b.addEventListener("click",click);b.addEventListener("change",function(e){if(e.target.tagName==="SELECT"){try{localStorage.setItem("cml-fg-rg",e.target.value)}catch(x){}last="";sync()}})}
 var e=D.getElementById("cml-esv"),ref=e&&e.parentNode===l.parentNode?e:l;if(b.nextSibling!==ref||b.parentNode!==ref.parentNode)ref.parentNode.insertBefore(b,ref);return b}
function sync(){var b=box();if(!b||busy)return;var s=state();if(!s.n){b.hidden=true;sbox().hidden=true;last="";return}
 var k=getRg(),r=RG[0];RG.forEach(function(x){if(x[0]===k)r=x});var meta=r[2],falta=Math.max(0,meta-s.sub),ok=falta<=0,pct=Math.min(100,Math.round(s.sub/meta*100));
 var sg=ok?[]:sugs(s.has),key=[k,s.sub,sg.map(function(p){return p[0]}).join()].join("|");if(key===last&&!b.hidden)return;last=key;b.hidden=false;b.classList.toggle("ok",ok);
 var h='<p class="t">'+(ok?'<b>Frete grátis liberado</b> para '+r[1]:'Faltam <b>'+brl(falta)+'</b> em produtos para o frete grátis')+'</p><div class="br"><i style="width:'+pct+'%"></i></div>'
 +'<div class="rg"><span>Entrega:</span><select aria-label="Região de entrega">'+RG.map(function(x){return'<option value="'+x[0]+'"'+(x[0]===k?" selected":"")+'>'+x[1]+'</option>'}).join("")+'</select><span>· grátis a partir de '+brl(meta).replace(",00","")+'</span></div>';
 var g=sbox();g.hidden=!sg.length;g.innerHTML=!sg.length?"":'<p class="h">Complete e ganhe o frete</p><div class="rw">'+sg.map(function(p){return'<div class="c"><img src="'+CDN+p[6]+'-240-0.webp" alt="" loading="lazy" width="120" height="120"><b>'+p[4]+'</b><em>'+brl(p[5])+'</em><button type="button" data-h="'+p[0]+'">Adicionar</button></div>'}).join("")+'</div>';
 b.innerHTML=h}
function sbox(){var l=D.querySelector("#modal-cart .js-ajax-cart-list"),g=D.getElementById("cml-fgs");if(!g){g=D.createElement("div");g.id="cml-fgs";g.className="cml-fg cml-fgs";g.addEventListener("click",click)}if(l&&g.previousSibling!==l)l.parentNode.insertBefore(g,l.nextSibling);return g}
function add(p,btn){var c=D.createElement("div");c.className="js-product-container js-item-product";c.style.display="none";c.setAttribute("data-product-id",p[1]);c.setAttribute("data-product-type","list");c.setAttribute("data-component","product-list-item");c.setAttribute("data-component-value",p[1]);
 c.setAttribute("data-variants",JSON.stringify([{id:p[2],product_id:p[1],available:true,stock:null,is_visible:true,contact:false,option0:p[3],option1:null,option2:null,price_number:p[5],price_short:brl(p[5]).replace(" ",""),has_promotional_price:false}]));
 c.innerHTML='<form class="js-product-form" method="post" action="/comprar/"><input type="hidden" name="add_to_cart" value="'+p[1]+'"><input type="submit" class="js-addtocart js-prod-submit-form btn" value="Comprar" data-component="product-list-item.add-to-cart" data-component-value="'+p[1]+'"></form>';
 D.body.appendChild(c);busy=1;D.documentElement.classList.add("cml-fg-add");btn.disabled=true;btn.textContent="Adicionando…";
 var n0=items().length,t0=Date.now();c.querySelector(".js-addtocart").click();
 (function w(){if(items().length>n0||Date.now()-t0>9000){busy=0;last="";c.remove();sync();quiet(Date.now());return}setTimeout(w,200)})()}
function quiet(t1){["js-cross-selling-modal","related-products-notification"].forEach(function(id){var x=D.getElementById(id);if(x&&/modal-show/.test(x.className)){var k=x.querySelector(".js-modal-close-private");if(k)k.click();var mc=D.getElementById("modal-cart");if(mc&&/modal-show/.test(mc.className))setTimeout(function(){D.body.classList.add("modal-visible","modal-show")},350)}});if(Date.now()-t1<2500)return setTimeout(function(){quiet(t1)},150);D.documentElement.classList.remove("cml-fg-add")}
function click(e){var a=e.target.closest("button[data-h]");if(!a||busy)return;e.preventDefault();var h=a.getAttribute("data-h");P.forEach(function(p){if(p[0]===h)add(p,a)})}
function start(){var m=D.getElementById("modal-cart");if(!m)return false;sync();new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var t=ms[i].target;if(!(t.closest&&t.closest(".cml-fg")))return setTimeout(sync,60)}}).observe(m,{childList:true,subtree:true,characterData:true});D.addEventListener("input",function(e){if(e.target.closest&&e.target.closest("#modal-cart")&&/zip|shipping/.test(e.target.name+e.target.className)){last="";sync()}});return true}
var n=0;(function l(){if(!start()&&++n<40)setTimeout(l,250)})();
}catch(e){try{console.warn("cml-fg",e)}catch(x){}}})();

/* v2: conversor do modo claro removido (o site ja e claro na origem). */
/* 25) celFix (18/11/2026): enquadramento no celular (ate 640 px).
   Monte seu presente: contador de pessoas em 5 colunas iguais com o selo de escolhido no canto; caixas da embalagem com foto em cima e texto embaixo.
   Encontre seu cha: menos recuo lateral, e a tabela "O que tem em 1 xicara" vira lista (titulo em cima, valor embaixo), sem passar para o card vizinho.
   Para desligar: CEL_FIX = 0. */
;(function(){try{var CEL_FIX=1;if(!CEL_FIX||document.getElementById("cml-celfix"))return;var N="html body #cml-natal:not(#q1):not(#q2):not(#q3)",C="html body #cef-quiz:not(#q1):not(#q2):not(#q3)";
var css="@media (max-width:640px){"
+N+" .cmn-ppl{grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:6px!important}"
+N+" .cmn-ppl .cmn-num{min-width:0!important;width:auto!important;padding:12px 2px!important;overflow:visible!important}"
+N+" .cmn-ppl .cmn-num small{font-size:10.5px!important;letter-spacing:0!important}"
+N+" .cmn-ppl .cmn-num::after{top:-7px!important;right:-7px!important;width:20px!important;height:20px!important;line-height:20px!important;font-size:11px!important}"
+N+" .cmn-opt[data-box]{display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:4px!important;padding:10px 10px 12px!important;min-width:0!important}"
+N+" .cmn-opt[data-box] .cmn-box{width:100%!important;max-width:none!important;height:auto!important;aspect-ratio:4/3!important;margin:0 0 6px!important}"
+N+" .cmn-opt[data-box]>b{font-size:15px!important;line-height:1.25!important}"
+N+" .cmn-opt[data-box]>span:not(.cmn-box){font-size:12.5px!important;line-height:1.35!important}"
+N+" .cmn-opt[data-box]>strong{position:static!important;font-size:14px!important;margin-top:2px!important;text-align:left!important}"
+"html body #cef-quiz.cef:not(#q1):not(#q2):not(#q3){padding-left:10px!important;padding-right:10px!important}"
+C+" .cef-in{padding-left:10px!important;padding-right:10px!important}"
+C+" .cef-pane{padding-left:10px!important;padding-right:10px!important}"
+C+" .cef-res{gap:8px!important}"
+C+" .cef-card{min-width:0!important}"
+C+" .cef-tb,"+C+" .cef-tb tbody,"+C+" .cef-tb tr,"+C+" .cef-tb td,"+C+" .cef-tb th{display:block!important;width:auto!important;text-align:left!important}"
+C+" .cef-tb tr{padding:9px 0!important;border-bottom:1px solid #eadfd2!important}"
+C+" .cef-tb td:first-child,"+C+" .cef-tb th:first-child{font-size:11px!important;letter-spacing:.06em!important;text-transform:uppercase!important;color:#a65a14!important;padding:0 0 2px!important;border:0!important}"
+C+" .cef-tb td:last-child{padding:0!important;border:0!important;overflow-wrap:anywhere!important}"
+"}";var s=document.createElement("style");s.id="cml-celfix";s.textContent=css;(document.head||document.documentElement).appendChild(s)}catch(e){}})();

/* 26) avQtd (18/11/2026): quantidade de avaliacoes nos cards de produto (home, categorias, busca).
   A nota e as estrelas continuam vindo do Cashing; aqui so acrescentamos "· N avaliacoes" ao lado.
   Os numeros vem da mesma lista publica do Cashing (uma chamada por visita, guardada 30 min na sessao).
   Para desligar: AV_QTD = 0. */
;(function(){try{var AV_QTD=1;if(!AV_QTD||window.__cmlAvQtd)return;window.__cmlAvQtd=1;var D=document,K="cml-avqtd-v2",M=null;
function css(){if(D.getElementById("cml-avqtd-css"))return;var s=D.createElement("style");s.id="cml-avqtd-css";s.textContent=".cml-avq{font-size:12px!important;font-weight:400!important;opacity:.78;white-space:nowrap;margin-left:2px;letter-spacing:0!important}.rcs a.rc .cml-avr{display:block;font-size:11.5px;line-height:1.35;color:#a65a14;margin-top:3px;white-space:normal}.rcs a.rc .cml-avr i{white-space:nowrap}.rcs a.rc .cml-avr i{font-style:normal;opacity:.75;color:inherit}";(D.head||D.documentElement).appendChild(s)}
function load(cb){try{var c=JSON.parse(sessionStorage.getItem(K)||"null");if(c&&Date.now()-c.t<1800000){M=c.m;return cb()}}catch(e){}
fetch("https://api.cashing.com.br/api/evaluations/products",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({id_store:5060752})}).then(function(r){return r.json()}).then(function(j){M={};(j&&j.products||[]).forEach(function(p){if(p&&p.id_product)M[p.id_product]=[p.evaluations_count||0,p.rating_avg||0]});try{sessionStorage.setItem(K,JSON.stringify({t:Date.now(),m:M}))}catch(e){}cb()}).catch(function(){})}
function txt(n){return "· "+n+(n===1?" avaliação":" avaliações")}
function run(){if(!M)return;var cs=D.querySelectorAll(".js-item-product");for(var i=0;i<cs.length;i++){var c=cs[i],id=c.getAttribute("data-product-id"),n=M[id]&&M[id][0];if(!n)continue;var row=c.querySelector(".mi-w-full.mi-leading-normal .mi-gap-\\[4px\\]")||c.querySelector(".mi-w-full.mi-leading-normal > div");if(!row)continue;var sp=row.querySelector(".cml-avq");if(sp){if(sp.textContent!==txt(n))sp.textContent=txt(n);continue}sp=D.createElement("span");sp.className="cml-avq";sp.textContent=txt(n);var col=row.querySelector("span");if(col)sp.style.color=getComputedStyle(col).color;row.appendChild(sp)}
var mp={};try{(window.__cmlRk&&window.__cmlRk.items||[]).forEach(function(x){if(x&&x.id&&x.url)mp[new URL(x.url,location.href).pathname]=String(x.id)})}catch(e){}var hs=D.querySelectorAll(".js-item-product");for(var h=0;h<hs.length;h++){var la=hs[h].querySelector("a[href*=\"/produtos/\"]");if(la)try{mp[new URL(la.href).pathname]=hs[h].getAttribute("data-product-id")}catch(e){}}
var rs=D.querySelectorAll(".rcs a.rc");for(var j=0;j<rs.length;j++){var a=rs[j],pid;try{pid=mp[new URL(a.href).pathname]}catch(e){}var v=pid&&M[pid];if(!v||!v[0]||a.querySelector(".cml-avr"))continue;var e2=D.createElement("span");e2.className="cml-avr";e2.innerHTML="&#9733; "+(Math.round(v[1]*10)/10).toFixed(1)+" <i>· "+v[0]+(v[0]===1?" avaliação":" avaliações")+"</i>";var ct=a.querySelector(".ct");if(ct)a.insertBefore(e2,ct);else a.appendChild(e2)}}
var tm=0;function soon(){if(tm)return;tm=setTimeout(function(){tm=0;run()},250)}
css();load(function(){run();try{new MutationObserver(soon).observe(D.body||D.documentElement,{childList:true,subtree:true})}catch(e){}var k=0,iv=setInterval(function(){run();if(++k>20)clearInterval(iv)},1000)})}catch(e){}})();

/* 27) homeNav (21/11/2026): guia de etapas na lateral da home, so no computador (a partir de 1024 px).
   Mostra onde a pessoa esta (Inicio, Mais pedidos, Explorar, Quem provou, Nossa historia, Duvidas, Nossa rotina, Contato)
   e leva direto para a etapa clicada. Cada etapa encaixa no topo da tela ao rolar (encaixe suave, nao trava a rolagem).
   Para desligar: HOME_NAV = 0 (guia) e HOME_SNAP = 0 (encaixe). */
;(function(){try{var HOME_NAV=1,HOME_SNAP=0;if(!HOME_NAV||window.__cmlHomeNav)return;if(location.pathname!=="/")return;window.__cmlHomeNav=1;var D=document;
var css=".cml-hn{position:fixed;right:8px;top:50%;transform:translateY(-50%);z-index:40;display:none;flex-direction:column;gap:2px;padding:8px 4px;border-radius:999px;background:rgba(255,250,245,.42);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1px solid rgba(166,90,20,.14);font-family:Poppins,system-ui,sans-serif}"
+".cml-hn a{position:relative;display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;text-decoration:none!important;outline:0}"
+".cml-hn a i{display:block;width:7px;height:7px;border-radius:50%;background:rgba(255,250,245,.38);transition:width .25s,height .25s,background .25s,box-shadow .25s}"
+".cml-hn a:hover i{background:#a65a14}"
+".cml-hn a.on i{width:11px;height:11px;background:#a65a14;box-shadow:0 0 0 4px rgba(166,90,20,.18)}"
+".cml-hn a b{position:absolute;right:36px;top:50%;transform:translate(6px,-50%);white-space:nowrap;padding:6px 12px;border-radius:999px;background:rgba(255,250,245,.88);border:1px solid rgba(166,90,20,.22);color:#2b2916;font:500 12px/1 Poppins,sans-serif;letter-spacing:.02em;opacity:0;pointer-events:none;transition:opacity .2s,transform .2s}"
+".cml-hn a b em{font-style:normal;color:#a65a14;margin-right:6px;font-weight:600}"
+".cml-hn a:hover b,.cml-hn a:focus-visible b{opacity:1;transform:translate(0,-50%)}"
+".cml-hn:hover a.on b{opacity:0}.cml-hn a.on b{opacity:.0}.cml-hn a.on:hover b{opacity:1}"
+".cml-hn a:focus-visible i{box-shadow:0 0 0 3px #a65a14}.cml-hn a.fl b{opacity:1!important;transform:translate(0,-50%)!important}"
+"@media(min-width:1024px){.cml-hn{display:flex}"+(HOME_SNAP?"html.cml-hsnap{scroll-snap-type:y proximity}html.cml-hsnap .cml-hs{scroll-snap-align:start;scroll-margin-top:var(--cml-hh,90px)}":"")+"}"
+"@media(prefers-reduced-motion:reduce){html.cml-hsnap{scroll-snap-type:none}}";
var st=D.createElement("style");st.id="cml-hn-css";st.textContent=css;(D.head||D.documentElement).appendChild(st);
var STEPS=[["Início",function(m){return m.querySelector('[id^="ns-section-custom"]:not([id="ns-section-custom_1793296994543"])')||m.firstElementChild}],
["Mais pedidos",function(m){return D.getElementById("ns-section-icon_text")||m.querySelector(".c2-rk")}],
["Explorar",function(){return D.getElementById("cml-hl")||D.getElementById("cml-cats")}],
["Quem provou",function(m){var k=[].filter.call(m.children,function(x){return x.shadowRoot&&x.offsetHeight>100})[0];return k||null}],
["Nossa história",function(m){return m.querySelector(".cml-nc")}],
["Dúvidas",function(m){return m.querySelector('[id^="ns-section-faq"]')}],
["Nossa rotina",function(m){return m.querySelector('[id^="ns-section-instagram-feed"]')}],
["Contato",function(){return D.querySelector("footer")}]];
var nav=null,els=[],io=null;
function hh(){var h=D.querySelector(".js-head-main");var v=h?Math.round(h.getBoundingClientRect().height):90;D.documentElement.style.setProperty("--cml-hh",(v+8)+"px")}
function build(){var m=D.querySelector("main");if(!m||!D.body)return false;var found=STEPS.map(function(s){try{var e=s[1](m);return e&&(e.offsetHeight>0||/instagram/.test(e.id||""))?e:null}catch(x){return null}});var sig=found.map(function(e){return e?1:0}).join("");if(nav&&nav.__sig===sig)return found.filter(Boolean).length>=8;
if(!nav){nav=D.createElement("nav");nav.className="cml-hn";nav.setAttribute("aria-label","Etapas da página");D.body.appendChild(nav);nav.addEventListener("click",function(ev){var a=ev.target.closest("a[data-i]");if(!a)return;ev.preventDefault();var e=els[+a.getAttribute("data-i")];if(!e)return;hh();var top=e.getBoundingClientRect().top+scrollY-(parseInt(getComputedStyle(D.documentElement).getPropertyValue("--cml-hh"))||90);if(e.tagName==="FOOTER")top=Math.min(top,D.documentElement.scrollHeight-innerHeight);scrollTo({top:Math.max(0,top),behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})})}
nav.__sig=sig;els=[];var h="",n=0;found.forEach(function(e,i){if(!e)return;e.classList.add("cml-hs");var k=els.length;els.push(e);n++;h+='<a href="#" data-i="'+k+'" aria-label="'+STEPS[i][0]+'"><i></i><b><em>'+(n<10?"0":"")+n+'</em>'+STEPS[i][0]+'</b></a>'});nav.innerHTML=h;
if(HOME_SNAP)D.documentElement.classList.add("cml-hsnap");hh();watch();active();return found.filter(Boolean).length>=8}
function active(){if(!nav||!els.length)return;var line=innerHeight*0.38,cur=0;for(var i=0;i<els.length;i++){var r=els[i].getBoundingClientRect();if(r.height<10&&i<els.length-1)continue;if(r.top-line<=0)cur=i}if(innerHeight+scrollY>=D.documentElement.scrollHeight-4)cur=els.length-1;if(nav.__cur!==cur){nav.__cur=cur;var fa=nav.querySelectorAll("a")[cur];if(fa){[].forEach.call(nav.querySelectorAll("a.fl"),function(x){x.classList.remove("fl")});fa.classList.add("fl");clearTimeout(nav.__ft);nav.__ft=setTimeout(function(){fa.classList.remove("fl")},1800)}}[].forEach.call(nav.querySelectorAll("a"),function(a,i){var on=i===cur;a.classList.toggle("on",on);if(on)a.setAttribute("aria-current","step");else a.removeAttribute("aria-current")})}
var raf=0;function onScroll(){if(raf)return;raf=requestAnimationFrame(function(){raf=0;active()})}
var w=false;function watch(){if(w)return;w=true;addEventListener("scroll",onScroll,{passive:true});addEventListener("resize",function(){hh();onScroll()})}
var k=0;(function loop(){var done=false;try{done=build()}catch(e){}if(++k<90&&!done)setTimeout(loop,k<20?500:2000)})()}catch(e){}})();

/* 28) bfMode (21/11/2026): BLACKFRIDAY na Chef. So age com window.__cmlBF ligado (previa ?previa-black=1 ou automatico de 23 a 30/11, ver cml-extra).
   Site claro; a Black aparece em preto e dourado na faixa do topo, no banner principal, nos selos de desconto e na pagina /ofertas/ (que segue escura).
   Troca os textos do Esquenta pelos da Black Friday. */
;(function(){try{if(!window.__cmlBF||window.__cmlBFm)return;window.__cmlBFm=1;var D=document;
var AD="BLACKFRIDAY na Chef · 23 a 30/11 · Live quinta às 20h";
var css="html body .adbar:after,html body.template-home .adbar:after,html body:not(.template-home) .adbar:after{content:\""+AD+"\"!important}"
+"html body .js-item-product .c2-off,html body .js-item-product .label-accent,html body .js-item-product .js-offer-label,html body .cml-duo-off{background:#f6efe9!important;color:#a65a14!important;border:1px solid rgba(166,90,20,.55)!important}";
var st=D.createElement("style");st.id="cml-bf-css";st.textContent=css;(D.head||D.documentElement).appendChild(st);
var R=[[/PREÇOS DE BLACK ANTES DA BLACK/g,"OS MENORES PREÇOS DO ANO"],[/Preços de Black antes da Black/g,"Os menores preços do ano"],[/antes da Black/g,"até 30/11"],[/A Black da Chef começou antes\./g,"A Black da Chef começou."],
[/O Esquenta Black chegou/g,"A Black Friday chegou"],[/ESQUENTA BLACK/g,"BLACKFRIDAY NA CHEF"],[/Esquenta Black/g,"Black Friday"],
[/Só até 22 de novembro/g,"De 23 a 30 de novembro"],[/[Aa]té 22 de novembro/g,"Até 30 de novembro"],[/22\/11\/2026/g,"30/11/2026"],
[/SÓ ATÉ 22\/11/g,"SÓ ATÉ 30/11"],[/[Ss]ó até 22\/11/g,"só até 30/11"],[/ATÉ 22\/11/g,"23 A 30/11"],[/Até 22\/11/g,"23 a 30/11"],[/até 22\/11/g,"até 30/11"],
[/Combos com 15% off e 5% (de desconto )?no Pix, enquanto durar o estoque\./g,"Os menores preços do ano em chás, kits e snacks. Live quinta, 26/11, às 20h."]];
function fixText(root){var w=D.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),n,ch=[];while(n=w.nextNode()){var t=n.nodeValue;if(!t||t.length<4)continue;if(/22\/11|22 de novembro|Esquenta|ESQUENTA BLACK|Combos com 15%|antes da Black|ANTES DA BLACK|começou antes/.test(t))ch.push(n)}ch.forEach(function(n){var t=n.nodeValue;R.forEach(function(r){t=t.replace(r[0],r[1])});if(t!==n.nodeValue)n.nodeValue=t})}
function swap(hand,big){if(!hand||!big||hand.__bf)return;hand.__bf=1;hand.textContent="black";big.textContent="Friday"}
function heads(){var h=D.getElementById("cml-bko");if(h){var ed=h.querySelector(".c1-ed");if(ed&&!ed.__bf){ed.__bf=1;ed.textContent="23 a 30 de novembro"}swap(h.querySelector(".c1-hand"),h.querySelector(".c1-blk"))}
[].forEach.call(D.querySelectorAll(".c2-oh"),function(o){swap(o.querySelector(".hand"),o.querySelector(".blk"))});
[].forEach.call(D.querySelectorAll(".cbk-h1"),function(x){if(x.__bf)return;var b=x.querySelector("b");if(!b)return;x.__bf=1;x.firstChild&&x.firstChild.nodeType===3&&(x.firstChild.nodeValue="Black");b.textContent="Friday"})}
var tm=0;function run(){tm=0;try{fixText(D.body);heads()}catch(e){}}function soon(){if(!tm)tm=setTimeout(run,80)}
function go(){run();try{new MutationObserver(soon).observe(D.body,{childList:true,subtree:true,characterData:true})}catch(e){}}
if(D.body)go();else D.addEventListener("DOMContentLoaded",go)}catch(e){}})();



/* 31) Home e marca, site claro (21/11/2026): faixa de beneficios com Feito a mao (e Ate 55% OFF so na Black), ranking com painel "o que os clientes dizem" e grade 1 grande + 4 no computador, palavra a mao (Caveat) nos titulos de categoria, selos de producao propria na Nossa historia. */
;(function(){try{if(window.__cml31)return;window.__cml31=1;var D=document,H=D.documentElement;
function font(){if(D.getElementById("cml-caveat"))return;var l=D.createElement("link");l.id="cml-caveat";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&display=swap";(D.head||H).appendChild(l)}
var css=".c2-rk .ri:after,.c2-rk .ri:before{display:none!important}"
+".c2-rk .rn{background:#fffaf5;color:#a65a14!important;-webkit-text-fill-color:#a65a14!important;border:1px solid #e8ddd0;border-radius:14px;padding:2px 10px 4px;left:10px!important;bottom:10px!important;font-weight:300}"
+".c2-rk .rn:before{color:#a65a14!important;-webkit-text-fill-color:#a65a14!important}"
+"#ns-section-icon_text{padding-bottom:0!important;margin-bottom:0!important}.c2-rk{padding-top:0!important}"
+".cml-rkp{display:none}"
+"@media(min-width:1100px){.c2-rk .in{max-width:var(--cmlw,1200px)!important;display:grid!important;grid-template-columns:290px minmax(0,1fr);column-gap:28px}"
+".c2-rk .hd{grid-column:1/-1}.c2-rk .in>.live{display:none!important}"
+".c2-rk .cml-rkp{grid-column:1;display:flex;flex-direction:column;gap:12px;margin:18px 0 0;padding:20px;border-radius:22px;background:radial-gradient(120% 90% at 30% 15%,#fffaf5 0%,#fffaf5 55%,#f3e9dd 100%);border:1px solid #e8ddd0;color:#2b2916;font-family:Poppins,sans-serif;min-width:0}"
+".c2-rk .rcs{grid-column:2;display:grid!important;grid-template-columns:minmax(0,1.2fr) repeat(2,minmax(0,1fr))!important;grid-template-rows:auto auto;gap:14px!important;align-items:stretch!important;margin:18px 0 0!important}"
+".c2-rk .rc.first{grid-row:1/span 2;display:flex!important;flex-direction:column}.c2-rk .rc.first .ri{aspect-ratio:auto!important;flex:1 1 auto;min-height:0;height:auto}"
+".c2-rk .rc:not(.first) .ri{aspect-ratio:auto!important;height:clamp(110px,17vh,160px)}.c2-rk .rcs{height:clamp(420px,calc(100vh - 230px),520px)}.c2-rk .rc{min-height:0;overflow:hidden}.c2-rk .rc:not(.first) .rn{font-size:30px!important}.c2-rk .rc .ct{display:none}}"
+".cml-rkp .sc{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}.cml-rkp .sc b{font:700 40px/1 Poppins,sans-serif;color:#2b2916}.cml-rkp .sc i{font-style:normal;color:#d27e29;letter-spacing:2px;font-size:14px}.cml-rkp .sc small{flex-basis:100%;font:400 12px/1.4 Poppins,sans-serif;color:#6f6656}"
+".cml-rkp .k{margin:2px 0 0;font:500 10px/1 Poppins,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#a65a14}"
+".cml-rkp ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}.cml-rkp li{padding:0 0 10px;border-bottom:1px solid #e8ddd0}.cml-rkp li:last-child{border:0;padding:0}.cml-rkp li b{display:block;font:600 13px/1.3 Poppins,sans-serif;color:#2b2916}.cml-rkp li span{display:block;margin-top:3px;font:300 italic 12px/1.45 Poppins,sans-serif;color:#6f6656}"
+".cml-rkp .best{margin-top:auto;display:block;padding:12px 14px;border-radius:16px;background:#565229;color:#f6efe9!important;text-decoration:none!important;font:400 12px/1.4 Poppins,sans-serif}.cml-rkp .best b{display:block;font:600 14px/1.3 Poppins,sans-serif;color:#fff}.cml-rkp .best em{font-family:Caveat,cursive;font-style:normal;font-size:21px;color:#f3d48b}"
+"@media(max-width:767px){.c1-ben.cml-b4{grid-template-columns:repeat(2,minmax(0,1fr))!important}.c1-ben.cml-b5{grid-template-columns:none!important;grid-auto-flow:column!important;grid-auto-columns:40%!important;overflow-x:auto!important;scrollbar-width:none}.c1-ben.cml-b5::-webkit-scrollbar{display:none}}"
+"@media(min-width:768px){.c1-ben.cml-b4{grid-template-columns:repeat(4,minmax(0,1fr))!important}.c1-ben.cml-b5{grid-template-columns:repeat(5,minmax(0,1fr))!important}}"
+".c2-cbt .cml-hw{display:block;font-family:Caveat,cursive!important;font-style:normal!important;font-weight:700;font-size:clamp(28px,3vw,38px);line-height:.9;color:#a65a14;transform:rotate(-4deg);transform-origin:left;margin:0 0 6px;letter-spacing:0;text-transform:none}"
+".cml-ncx{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 0}.cml-ncx span{display:inline-flex;align-items:center;gap:6px;padding:7px 12px;border-radius:999px;border:1px solid #e8ddd0;background:#fffaf5;color:#2b2916;font:500 12.5px/1.2 Poppins,sans-serif}.cml-ncx span:before{content:'';width:6px;height:6px;border-radius:50%;background:#d27e29}@media(max-width:1023px){.cml-ncx{display:none}}";
var st=D.createElement("style");st.id="cml-31";st.textContent=css;(D.head||H).appendChild(st);
var HW={"chas":"blends da casa","cha":"blends da casa","kits":"para presentear","presentes":"para presentear","infusoes":"frutas de verdade","snacks":"feitos à mão","granolas":"crocante e leve","natal":"com carinho","acessorios":"para o seu ritual"};
function nrm(s){return(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z]/g,"")}
var IM='<svg class="c1-ico" viewBox="0 0 32 32" aria-hidden="true"><path class="f" d="M9 15c0-2 1.6-3 3-3s2 1 2 1V7.5a1.8 1.8 0 0 1 3.6 0V13l.4-4a1.8 1.8 0 0 1 3.6.3l-.4 4.7.6-2.6a1.7 1.7 0 0 1 3.3.8L23.5 20c-.9 4-3.8 6.5-7.8 6.5-3.6 0-6.7-2.6-6.7-6.5z"/><path d="M14 13V7.5a1.8 1.8 0 0 1 3.6 0V13M17.6 12.5l.4-3.2a1.8 1.8 0 0 1 3.6.3l-.4 4.4M21.2 14l.6-2.6a1.7 1.7 0 0 1 3.3.8L23.5 20c-.9 4-3.8 6.5-7.8 6.5-3.6 0-6.7-2.6-6.7-6.5v-5c0-1.6 1.2-2.6 2.5-2.6s2.5 1 2.5 2.6v1.5"/></svg>';
var IT='<svg class="c1-ico" viewBox="0 0 32 32" aria-hidden="true"><path class="f" d="M4.5 15.5V6.5a2 2 0 0 1 2-2h9l12 12-11 11z"/><path d="M4.5 15.5V6.5a2 2 0 0 1 2-2h9l12 12-11 11zM11 12.5l9 2M12 19l7-9"/><circle cx="10" cy="10" r="1.6"/></svg>';
function ben(){var b=D.querySelector(".c1-ben");if(!b||b.__31)return;b.__31=1;var a=D.createElement("div");a.innerHTML=IM+"<span><b>Feito à mão</b><small>em pequenos lotes, na cozinha da família</small></span>";b.appendChild(a);
if(window.__cmlBF){var o=D.createElement("a");o.href="/ofertas/";o.innerHTML=IT+"<span><b>Até 50% OFF</b><small>na Black Friday</small></span>";b.insertBefore(o,b.firstChild)}b.classList.add(b.children.length>=5?"cml-b5":"cml-b4")}
function cat(){[].forEach.call(D.querySelectorAll(".c2-cbn .c2-cbt h2"),function(h){if(h.__hw)return;h.__hw=1;var k=nrm(h.textContent),w=HW[k];if(!w){for(var x in HW){if(k.indexOf(x)===0){w=HW[x];break}}}w=w||"da nossa cozinha";var s=D.createElement("span");s.className="cml-hw";s.textContent=w;h.parentNode.insertBefore(s,h)})}
function nc(){var n=D.querySelector(".cml-nc");if(!n||n.__31)return;var t=[].filter.call(n.querySelectorAll("*"),function(e){return e.children.length>=3&&/pedidos enviados/i.test(e.textContent)&&/Google/.test(e.textContent)&&!/Veja nossas|Comprei|Avalia/i.test(e.textContent)});if(!t.length)return;var row=t[t.length-1];n.__31=1;var x=D.createElement("div");x.className="cml-ncx";x.innerHTML="<span>Produção própria em Penha/SC</span><span>Frutas desidratadas por nós</span><span>Pequenos lotes, feitos à mão</span>";row.parentNode.insertBefore(x,row.nextSibling)}
function fmt(n){return String(n).replace(".",",")}
function stats(cb){try{var c=JSON.parse(sessionStorage.getItem("cml-rkp1")||"null");if(c&&Date.now()-c.t<18e5)return cb(c)}catch(e){}fetch("https://api.cashing.com.br/api/evaluations/products",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({id_store:5060752})}).then(function(r){return r.json()}).then(function(j){var n=0,s=0;(j.products||[]).forEach(function(p){var c=+p.evaluations_count||0;n+=c;s+=c*(+p.rating_avg||0)});var o={t:Date.now(),n:n,a:n?Math.round(s/n*10)/10:5};try{sessionStorage.setItem("cml-rkp1",JSON.stringify(o))}catch(e){}cb(o)}).catch(function(){})}
function panel(){var rk=D.querySelector(".c2-rk"),rcs=rk&&rk.querySelector(".rcs");if(!rcs||rk.querySelector(".cml-rkp"))return;var best=null,bc=-1;[].forEach.call(rcs.querySelectorAll("a.rc"),function(a){var t=(a.querySelector(".cml-avr")||{}).textContent||"";var m=t.match(/(\d+)\s*avalia/);var c=m?+m[1]:0;if(c>bc){bc=c;best=a}});if(!best||bc<1)return;var lv=rk.querySelector(".live");var p=D.createElement("aside");p.className="cml-rkp";p.setAttribute("aria-label","O que os clientes dizem");var nm=(best.querySelector(".nm")||{}).textContent||"";
p.innerHTML='<div class="sc"><b>5,0</b><i>★★★★★</i><small>nota no Google</small></div><p class="k">O que os clientes dizem</p><ul><li><b>Sabor de fruta de verdade</b><span>“Combinação perfeita de laranja com chocolate.”</span></li><li><b>Aroma que acalma</b><span>“O aroma já acalma só de sentir.”</span></li><li><b>Delicadeza até na embalagem</b><span>“Estou encantada com a delicadeza dos produtos e suas embalagens.”</span></li></ul>'+'<a class="best" href="'+best.getAttribute("href")+'"><em>o mais elogiado</em><b>'+nm+'</b>'+bc+' avaliações de clientes</a>';
rk.querySelector(".in").insertBefore(p,rcs);stats(function(o){if(!o.n)return;p.querySelector(".sc").innerHTML="<b>"+fmt(o.a.toFixed(1))+"</b><i>★★★★★</i><small>média de "+o.n+" avaliações de quem comprou no site</small>"})}

var IGX=".cml-igx{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:72px;align-items:center;max-width:1160px;margin:0 auto;padding:0 20px;position:relative;text-align:left}.cml-igx .tx{justify-self:start;max-width:470px;text-align:left}.cml-igx .tx>*{text-align:left}"
+".cml-igx .ph{justify-self:center;position:relative;height:min(620px,calc(100vh - 150px));width:auto;aspect-ratio:9/19;border-radius:54px;background:linear-gradient(145deg,#2b2a26,#121211);padding:11px;box-shadow:0 40px 80px -42px rgba(43,41,22,.65),inset 0 0 0 1px #3a3935}"
+".cml-igx .scr{position:relative;height:100%;border-radius:44px;background:#fff;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111}"
+".cml-igx .ntc{position:absolute;top:9px;left:50%;transform:translateX(-50%);width:92px;height:25px;border-radius:20px;background:#121211;z-index:3}"
+".cml-igx .sbr{display:flex;justify-content:space-between;align-items:center;padding:14px 24px 2px;font-weight:600;font-size:12.5px}"
+".cml-igx .tbr{display:flex;align-items:center;gap:10px;padding:10px 14px 4px;font-weight:700;font-size:16px}.cml-igx .tbr .sp{flex:1}.cml-igx .tbr svg{width:20px;height:20px}"
+".cml-igx .prf{display:flex;align-items:center;gap:14px;padding:8px 14px}"
+".cml-igx .av{flex:none;width:70px;height:70px;border-radius:50%;padding:3px;background:conic-gradient(#f9ce34,#ee2a7b,#6228d7,#f9ce34)}.cml-igx .av span{display:grid;place-items:center;width:100%;height:100%;border-radius:50%;background:#f6efe9;border:3px solid #fff;overflow:hidden}.cml-igx .av img{width:82%;height:auto}"
+".cml-igx .sts{display:flex;flex:1;justify-content:space-around;text-align:center}.cml-igx .sts b{display:block;font-weight:700;font-size:15px;line-height:1.1}.cml-igx .sts small{font-size:11px;color:#333}"
+".cml-igx .bio{padding:4px 14px 0;font-size:11.5px;line-height:1.38}.cml-igx .bio b{display:block;font-weight:600;font-size:12px}"
+".cml-igx .bts{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;padding:10px 14px 8px}.cml-igx .bts span{display:block;text-align:center;padding:7px 0;border-radius:8px;background:#efefef;font-weight:600;font-size:12px}.cml-igx .bts span.f{background:#0095f6;color:#fff}"
+".cml-igx .tbs{display:flex;justify-content:space-around;border-top:1px solid #ececec;padding:7px 0}.cml-igx .tbs i{display:block;width:18px;height:18px;border-radius:4px;border:2px solid #262626}.cml-igx .tbs i.on{border-color:#262626;background:linear-gradient(#262626,#262626) center/6px 6px no-repeat}"
+".cml-igx .grd{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}"
+".cml-igx .grd a{position:relative;display:block;aspect-ratio:3/4;background:#eee center/cover no-repeat;transform-origin:center}"
+".cml-igx .pop{position:absolute;z-index:5;display:block;background:#eee center/cover no-repeat;will-change:transform;opacity:var(--o,0);transform:translate(calc(var(--dx,0px)*var(--k,0)),calc(var(--dy,0px)*var(--k,0))) scale(calc(1 + .4*var(--k,0)));box-shadow:0 calc(24px*var(--k,0)) calc(40px*var(--k,0)) -16px rgba(43,41,22,.5);border-radius:calc(12px*var(--k,0));border:calc(3px*var(--k,0)) solid #fff}"
+".cml-igx .tx .k{display:block;margin:0 0 10px;font:500 11px/1 Poppins,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#a65a14}"
+".cml-igx .tx h2{margin:0;font:700 clamp(28px,3.4vw,42px)/1.1 Poppins,sans-serif;color:#2b2916;letter-spacing:-.015em}.cml-igx .tx h2 em{font-weight:300;font-style:italic;color:#a65a14}"
+".cml-igx .tx p{margin:14px 0 0;max-width:42ch;font:300 15px/1.6 Poppins,sans-serif;color:#6f6656}"
+".cml-igx .ch{display:flex;flex-wrap:wrap;gap:10px;margin:22px 0 0}.cml-igx .ch span{padding:10px 16px;border-radius:16px;border:1px solid #e8ddd0;background:#fffaf5;font:400 12.5px/1.25 Poppins,sans-serif;color:#6f6656}.cml-igx .ch span b{display:block;font:700 20px/1.1 Poppins,sans-serif;color:#2b2916}"
+".cml-igx .tx .btn{margin-top:24px;display:inline-flex;align-items:center;min-height:46px;padding:0 26px;border-radius:999px;background:#a65a14;color:#fff!important;border:0;font:600 14.5px/1 Poppins,sans-serif;text-decoration:none!important;box-shadow:none}"
+"@media(max-width:899px){.cml-igx{grid-template-columns:minmax(0,44%) minmax(0,1fr);gap:16px;padding:0 14px;align-items:center}.cml-igx .ph{height:auto;width:100%;border-radius:30px;padding:6px}.cml-igx .scr{border-radius:25px}.cml-igx .ntc{width:44px;height:12px;top:5px}.cml-igx .sbr{padding:6px 12px 0;font-size:7px}.cml-igx .tbr{padding:3px 8px 1px;font-size:9px;gap:5px}.cml-igx .tbr svg{width:11px;height:11px}.cml-igx .prf{gap:6px;padding:3px 8px}.cml-igx .av{width:32px;height:32px;padding:2px}.cml-igx .av span{border-width:2px}.cml-igx .sts{gap:3px}.cml-igx .sts span{min-width:0}.cml-igx .sts b{font-size:8.5px}.cml-igx .sts small{display:block;font-size:5.6px;letter-spacing:-.01em}.cml-igx .bio{padding:2px 8px 0;font-size:6.3px;line-height:1.3}.cml-igx .bio b{font-size:7px}.cml-igx .bts{gap:3px;padding:5px 8px 4px}.cml-igx .bts span{padding:3px 0;border-radius:5px;font-size:6.8px}.cml-igx .tbs{padding:3px 0}.cml-igx .tbs i{width:9px;height:9px;border-width:1.5px}.cml-igx .pop{display:none}.cml-igx .tx .k{font-size:9.5px;margin-bottom:6px}.cml-igx .tx h2{font-size:21px}.cml-igx .tx p{font-size:12.5px;margin-top:8px;line-height:1.45}.cml-igx .ch{gap:6px;margin-top:12px}.cml-igx .ch span{padding:6px 9px;border-radius:12px;font-size:10.5px}.cml-igx .ch span b{font-size:15px}.cml-igx .tx .btn{margin-top:14px;min-height:38px;padding:0 16px;font-size:12.5px}}";
var OLD=["DfA8ngoRIJ0","DexfLJjFBKK","DevBWA9vMSy","DesgLzMhno8","DesSCPrxVqa","DehEYI2kRl3"];
function ig(){var g=D.querySelector(".cml-ig .cml-ig-g");if(!g||g.__x)return;var box=g.parentNode,t=box.querySelector(".cml-ig-t"),b=box.querySelector(".cml-ig-b");var live=[].slice.call(g.querySelectorAll("a"));if(live.length<3)return;g.__x=1;
if(!D.getElementById("cml-igx-css")){var s2=D.createElement("style");s2.id="cml-igx-css";s2.textContent=IGX;(D.head||H).appendChild(s2)}
var logo=(D.querySelector(".js-head-main .logo-img")||{}).src||"";
var cells=live.map(function(a){var i=a.querySelector("i");var bg=i?i.style.backgroundImage:"";return'<a class="p" href="'+a.getAttribute("href")+'" target="_blank" rel="noopener" aria-label="Ver post no Instagram" style="background-image:'+bg.replace(/"/g,"&quot;")+'"></a>'});
OLD.forEach(function(id){if(cells.length<9)cells.push('<a href="https://www.instagram.com/chefmaisleve/" target="_blank" rel="noopener" aria-label="Ver perfil no Instagram" style="background-image:url(https://dzmlyrkzcdqicwfmxnxd.supabase.co/storage/v1/object/public/recortes/insta/'+id+'.jpg)"></a>')});
var w=D.createElement("div");w.className="cml-igx";
w.innerHTML='<div class="ph" aria-hidden="false"><div class="scr"><i class="ntc"></i><div class="sbr"><span>9:41</span><span>●●● ▮</span></div><div class="tbr"><span>‹</span><span>chefmaisleve</span><span class="sp"></span><span>⋯</span></div><div class="prf"><span class="av"><span>'+(logo?'<img src="'+logo+'" alt="">':'')+'</span></span><div class="sts"><span><b>132</b><small>posts</small></span><span><b>13,7 mil</b><small>seguidores</small></span><span><b>346</b><small>seguindo</small></span></div></div><div class="bio"><b>Chef+Leve</b>Nutrindo corpo e alma com xícaras e sabores que fazem bem. Chás artesanais e snacks saudáveis, para todo o Brasil.</div><div class="bts"><span class="f">Seguir</span><span>Mensagem</span><span>Loja</span></div><div class="tbs"><i class="on"></i><i></i><i></i></div><div class="grd">'+cells.join("")+'</div></div></div>'
+'<div class="tx"><span class="k">@chefmaisleve</span><h2>Acompanhe <em>a nossa rotina</em></h2><p>Bastidores da produção, receitas e novidades da nossa cozinha. Os posts mais recentes aparecem aqui sozinhos.</p><div class="ch"><span><b>13,7 mil</b>seguidores</span><span><b>132</b>publicações</span></div><a class="btn" href="https://www.instagram.com/chefmaisleve/" target="_blank" rel="noopener">Seguir no Instagram</a></div>';
box.innerHTML="";box.appendChild(w);
var ph=w.querySelector(".ph"),src=[].slice.call(w.querySelectorAll(".grd a.p")).slice(0,3),dx=["-170px","-40px","96px"],dy=["-10px","-120px","30px"],P=src.map(function(a,i){var c=D.createElement("a");c.className="pop";c.href=a.href;c.target="_blank";c.rel="noopener";c.setAttribute("aria-hidden","true");c.tabIndex=-1;c.style.backgroundImage=a.style.backgroundImage;c.style.setProperty("--dx",dx[i]);c.style.setProperty("--dy",dy[i]);ph.appendChild(c);return c});
function place(){var pr=ph.getBoundingClientRect();src.forEach(function(a,i){var r=a.getBoundingClientRect();var c=P[i];c.style.left=(r.left-pr.left)+"px";c.style.top=(r.top-pr.top)+"px";c.style.width=r.width+"px";c.style.height=r.height+"px"})}
var raf=0;function upd(){raf=0;if(innerWidth<900)return;place();var r=w.getBoundingClientRect(),vh=innerHeight;var k=Math.max(0,Math.min(1,(vh*.95-r.top)/(vh*.6)));P.forEach(function(a,i){var kk=Math.max(0,Math.min(1,k*1.3-i*.15));a.style.setProperty("--k",kk.toFixed(3));a.style.setProperty("--o",kk>0.02?"1":"0")})}
addEventListener("scroll",function(){if(!raf)raf=requestAnimationFrame(upd)},{passive:true});addEventListener("resize",upd);upd()}
var k=0;function loop(){font();try{ig()}catch(e){}try{ben()}catch(e){}try{cat()}catch(e){}try{nc()}catch(e){}try{panel()}catch(e){}if(++k<30)setTimeout(loop,k<10?400:1500)}
if(D.body)loop();else D.addEventListener("DOMContentLoaded",loop)}catch(e){}})();


/* 32) Acabamentos e contraste do site claro (21/11/2026): faixas oliva e bordo com letra clara (Encontre seu cha, Monte seu presente), selo de desconto legivel, Espiar, carrinho com um so molde, FAQ fechado com seta visivel, icones de pagamento nitidos, Black Friday com as duas palavras equilibradas e fotos ambientadas no ranking. */
;(function(){try{if(window.__cml32)return;window.__cml32=1;var D=document,H=D.documentElement;
var X=":not(#q1):not(#q2):not(#q3):not(#q4)";
function light(scope){var t=["h1","h2","h3","h4","p","li","span","dt","dd","b","strong","i","small","em","a:not(.btn):not([class*=bt])"];return t.map(function(s){return scope+" "+s+X}).join(",")}
var css=""
+light("html body.cml-cef .cml-cx .in")+","+light("html body.cml-cef .cx-side")+"{color:#f6efe9!important;-webkit-text-fill-color:#f6efe9!important}"
+"html body.cml-cef .cml-cx .in :is(em,.cef-eb,.k,.pz,.hn)"+X+",html body.cml-cef .cx-side :is(em,.k,.pz,.hn)"+X+"{color:#f3d48b!important;-webkit-text-fill-color:#f3d48b!important}"
+"html body.cml-cef .cml-cx .in .chips li"+X+"{background:rgba(255,250,245,.08)!important;border:1px solid rgba(243,212,139,.35)!important}"
+"html body.cml-cef .cml-cx .in a.l"+X+",html body.cml-cef .cx-side a"+X+"{text-decoration:underline!important;text-decoration-color:#dfae58!important;text-underline-offset:4px}"
+"html body.cml-cef .cx-side :is(dt,i,.nt)"+X+"{opacity:.8}"
+"html body.cml-cef :is(.cx-side,.cml-cx .in) :is(dl,dd,li,.r)"+X+"{border-color:rgba(243,212,139,.22)!important}"
+light("html body #cml-natal .nx-side")+","+light("html body #cml-natal .nx-end .in")+"{color:#f6efe9!important;-webkit-text-fill-color:#f6efe9!important}"
+"html body #cml-natal .nx-side :is(em,.k,.pz,.hn)"+X+",html body #cml-natal .nx-end .in em"+X+"{color:#f3d48b!important;-webkit-text-fill-color:#f3d48b!important}"
+"html body #cml-natal .nx-side :is(dt,i,.nt)"+X+"{opacity:.8}"
+"html body #cml-natal .nx-side :is(dl,dd,li)"+X+"{border-color:rgba(243,212,139,.22)!important}"
+"html body :is(.cx-side,.cml-cx .in,.nx-side,.nx-end .in) :is(.btn,button,[class*=bt])"+X+",html body :is(.cx-side,.cml-cx .in,.nx-side,.nx-end .in) :is(.btn,button,[class*=bt]) *"+X+"{-webkit-text-fill-color:currentColor!important}"
+"html body.cml-cef .cef-body a:not(.btn):not([class*=bt])"+X+"{color:#a65a14!important;-webkit-text-fill-color:#a65a14!important}"
+"html body .js-item-product .c2-off"+X+"{color:#a65a14!important;-webkit-text-fill-color:#a65a14!important;background:#fffaf5!important;border:1px solid #e8ddd0!important;font-weight:600!important;opacity:1!important}"
+"html body .cml-espm dd.chips span"+X+"{color:#2b2916!important;-webkit-text-fill-color:#2b2916!important;background:#fffaf5!important;border-color:#e8ddd0!important}"
+"html body #modal-cart .c7-cs>[class*='mi-py-[10px]']"+X+"{border:0!important;background:transparent!important;border-radius:0!important;padding:0!important;box-shadow:none!important}"
+"html body #modal-cart .c7-cs [class*='mi-rounded-[10px]'][class*=mi-border]"+X+"{border:1px solid rgba(166,90,20,.3)!important;background:transparent!important;border-radius:14px!important;box-shadow:none!important}"
+"html body #modal-cart .c7-cs strong[class*='text-[12px]']"+X+"{color:#a65a14!important;-webkit-text-fill-color:#a65a14!important}"
+"html body #modal-cart .cg-trig:hover"+X+"{background:rgba(166,90,20,.06)!important;border-color:rgba(166,90,20,.45)!important}"
+"html body #modal-cart .cg-trig svg"+X+",html body #modal-cart .cg-trig:hover svg"+X+",html body #modal-cart .cg-trig:hover svg *"+X+"{color:#a65a14!important}"
+"html body .cml-faq .accordion-item-toggle-icon"+X+",html body .cml-faq .cml-open .accordion-item-toggle-icon"+X+"{background:transparent!important;box-shadow:none!important}"
+"html body .cml-faq .accordion-item-toggle-icon"+X+":before,html body .cml-faq .accordion-item-toggle-icon"+X+":after{background:#a65a14!important}"
+"html body .cml-faq .cml-open .accordion-item-toggle-icon"+X+":before,html body .cml-faq .cml-open .accordion-item-toggle-icon"+X+":after{background:transparent!important;border-color:#a65a14!important}"
+"html body .cml-faq .cml-open .accordion-item-toggle-icon"+X+"{background:rgba(166,90,20,.08)!important}"
+"html body .cml-faq .accordion-item-toggle-icon svg"+X+",html body .cml-faq .accordion-item-toggle-icon svg *"+X+"{fill:#a65a14!important;color:#a65a14!important}"
+"html body #ns-section-footer .footer-logos-wrapper"+X+"{display:flex!important;flex-wrap:wrap!important;gap:8px!important;align-items:center}"
+"html body #ns-section-footer .footer-logos-wrapper img"+X+"{width:56px!important;min-width:56px!important;max-width:none!important;flex:none!important;height:36px!important;object-fit:contain!important;padding:3px 5px!important;box-sizing:border-box!important;background:#fffaf5!important;border-radius:8px!important;image-rendering:auto!important;margin:0!important}"
+"html body #ns-section-custom_1793321998482 .c1-hand"+X+"{display:block!important;font:800 clamp(52px,7.4vw,112px)/.9 Poppins,sans-serif!important;letter-spacing:.04em!important;text-transform:uppercase!important;padding:0 .06em!important;margin:0 0 -.02em!important;transform:none!important;background-image:linear-gradient(100deg,#b8955a 0%,#e9c77f 30%,#fff3d6 44%,#ffb15c 50%,#fff3d6 56%,#e9c77f 70%,#b8955a 100%)!important;background-size:260% 100%!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;-webkit-text-fill-color:transparent!important;animation:esqSh 5s cubic-bezier(.45,0,.25,1) infinite!important}"
+"html body #ns-section-custom_1793321998482 h2.c1-blk"+X+"{font-size:clamp(86px,12.4vw,178px)!important;line-height:.92!important;padding:0 .1em .04em!important;margin:0!important;overflow:visible!important;animation-delay:.6s!important}"
+"html body #ns-section-footer .footer-copyright"+X+",html body #ns-section-footer .cml-fx .lb"+X+"{color:rgba(246,239,233,.82)!important;-webkit-text-fill-color:rgba(246,239,233,.82)!important}"
+"html body [data-slot=corner_bottom_left] button .c7-cl"+X+"{background:#a65a14!important;color:#fff!important;-webkit-text-fill-color:#fff!important}"
+"html body strong.mi-font-semibold:not([class*=\"text-[12px]\"])"+X+"{color:#2b2916!important;-webkit-text-fill-color:#2b2916!important}"
+"@media(max-width:640px){html body #cml-natal .cmn-ppl"+X+"{gap:6px!important}html body #cml-natal .cmn-num"+X+"{padding:12px 2px!important;min-width:0!important}html body #cml-natal .cmn-num small"+X+"{display:block;font-size:10px!important;letter-spacing:0!important;white-space:nowrap}}"
+".c2-rk .ri img.cml-amb{object-fit:cover!important;width:100%!important;height:100%!important}";
function addCss(){if(D.getElementById("cml-32"))return;var s=D.createElement("style");s.id="cml-32";s.textContent=css;(D.head||H).appendChild(s)}
var faqDone=false;function faq(){if(faqDone||location.pathname!=="/")return;var s=D.querySelector("[id^=ns-section-faq]");if(!s)return;var it=s.querySelectorAll(".js-accordion-private-container");if(!it.length)return;faqDone=true;[].forEach.call(it,function(c){var t=c.querySelector(".js-accordion-private-toggle");if(t&&t.getAttribute("aria-expanded")==="true")t.click();c.classList.remove("cml-open")})}
var AMB={"kit-ternura1":"asfasfa-edd8ba76ba999cfa1117784545221169","laranja-choco-leve":"laranjinha-3-d8ae31ca1b5197c48e17895709708295","trouxinha-maca1":"chatgpt-image-11_05_2026-13_57_58-06dcfa624478fd2d4617785186963554","kit-desdobramento-l1xs1":"213-505880de9b8ba534f017926935685714","infusao-rose-na-tangerina":"infusao-tangerina-16-5948d3391efaad5c7c17895717940131"};
var CDN="https://acdn-us.mitiendanube.com/stores/005/060/752/products/";
function setImg(img,base){if(img.__amb)return;img.__amb=1;var u=CDN+base+"-640-0.webp";var t=new Image();t.onload=function(){img.removeAttribute("srcset");img.src=u;img.classList.add("cml-amb")};t.onerror=function(){var u2=CDN+base+"-1024-1024.webp";var t2=new Image();t2.onload=function(){img.removeAttribute("srcset");img.src=u2;img.classList.add("cml-amb")};t2.src=u2};t.src=u}
function amb(){var r=D.querySelector(".c2-rk");if(!r)return;[].forEach.call(r.querySelectorAll(".ri"),function(ri){var a=ri.closest("a"),img=ri.querySelector("img");if(!a||!img||img.__amb)return;var m=(a.getAttribute("href")||"").match(/\/produtos\/([^\/?#]+)/);if(!m)return;var h=m[1];if(AMB[h])return setImg(img,AMB[h]);if(ri.__f)return;ri.__f=1;
 fetch("/produtos/"+h+"/",{credentials:"same-origin"}).then(function(x){return x.text()}).then(function(t){var d=new DOMParser().parseFromString(t,"text/html");var L=[].slice.call(d.querySelectorAll(".js-product-slide img")).map(function(i){return(i.getAttribute("data-srcset")||i.getAttribute("srcset")||i.getAttribute("src")||"").split(/[\s,]+/)[0]}).filter(Boolean).map(function(x){return x.replace(/-\d+-\d+\.\w+$/,"").split("/").pop()});var seen={},U=L.filter(function(x){if(seen[x])return false;seen[x]=1;return true});var b=U[2]||U[1];if(b)setImg(img,b)}).catch(function(){})})}
var k=0;function loop(){addCss();try{faq()}catch(e){}try{amb()}catch(e){}if(++k<24)setTimeout(loop,k<8?350:1500)}
if(D.body)loop();else D.addEventListener("DOMContentLoaded",loop)}catch(e){}})();


/* 33) Pagina Black Friday /ofertas/ (21/11/2026): pagina clara, banner central escuro com BLACK FRIDAY, combos para comprar em quantidade (adiciona tudo a sacola), depois os produtos por categoria com filtro discreto. Dados: window.CMLOfertas (funcao cml-ofertas). */
;(function(){try{if(window.__cmlOf3)return;window.__cmlOf3=1;
if(!/^\/ofertas\/?$/.test(location.pathname))return;
var D=document,H=D.documentElement;H.classList.add("cml-of3");
var API="https://dzmlyrkzcdqicwfmxnxd.supabase.co/functions/v1/cml-ofertas";
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function brl(v){return"R$ "+Number(v).toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".")}
var GR="linear-gradient(100deg,#b8955a 0%,#e9c77f 30%,#fff3d6 44%,#ffb15c 50%,#fff3d6 56%,#e9c77f 70%,#b8955a 100%)";
var css=""
+"html.cml-of3 #ns-section-category_hero,html.cml-of3 #ns-section-product_list,html.cml-of3 #ns-section-divider_1789950202654,html.cml-of3 #cml-bk{display:none!important}"
+".of3{--ink:#2b2916;--mu:#6f6656;--or:#a65a14;--ln:#e8ddd0;--pp:#fffaf5;font-family:Poppins,system-ui,sans-serif;color:var(--ink);padding:8px 0 64px}"
+".of3 *,.of3 *:before,.of3 *:after{box-sizing:border-box}.of3-in{max-width:1240px;margin:0 auto;padding:0 20px}"
+".of3-hero{position:relative;isolation:isolate;overflow:hidden;margin:12px 0 0;padding:clamp(40px,6vw,76px) 24px clamp(34px,5vw,56px);border-radius:36px;text-align:center;color:#f6efe9;background:radial-gradient(90% 120% at 50% 0%,#24221c 0%,#121211 55%,#0b0b0a 100%)}"
+".of3-hero:before{content:'';position:absolute;inset:-30% 10% auto;height:90%;background:radial-gradient(ellipse at center,rgba(223,174,88,.2),transparent 62%);pointer-events:none;z-index:-1}"
+".of3-hero:after{content:'';position:absolute;inset:0;z-index:-1;opacity:.08;pointer-events:none;background-image:url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\");background-size:220px}"
+".of3-eb{margin:0 0 14px;font:500 11.5px/1 Poppins,sans-serif;letter-spacing:.32em;text-transform:uppercase;color:#f3d48b}"
+".of3-lk{display:flex;flex-direction:column;align-items:center;margin:0}"
+".of3-lk span{display:block;text-transform:uppercase;padding:0 .08em;background-image:"+GR+";background-size:260% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;animation:of3Sh 4.6s cubic-bezier(.45,0,.25,1) infinite}"
+".of3-lk .b{font:800 clamp(46px,7vw,104px)/.95 Poppins,sans-serif;letter-spacing:.12em;margin-right:-.12em}"
+".of3-lk .f{font:900 clamp(74px,11.5vw,168px)/.9 Poppins,sans-serif;letter-spacing:-.035em;animation-delay:.55s}"
+"@keyframes of3Sh{0%{background-position:160% 50%}100%{background-position:-60% 50%}}"
+".of3-sub{margin:16px auto 0;max-width:560px;font:300 clamp(16px,2vw,20px)/1.5 Poppins,sans-serif;color:#f6efe9}.of3-sub em{font-style:italic;color:#f3d48b}"
+".of3-hl{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:24px 0 0;padding:0;list-style:none}"
+".of3-hl li{padding:10px 16px;border-radius:999px;border:1px solid rgba(243,212,139,.35);font:400 13px/1.2 Poppins,sans-serif;color:#f6efe9}.of3-hl li b{color:#f3d48b;font-weight:700}"
+".of3-go{display:inline-flex;align-items:center;gap:8px;margin:26px 0 0;min-height:48px;padding:0 26px;border-radius:999px;background:#a65a14;color:#fff!important;font:600 15px/1 Poppins,sans-serif;text-decoration:none!important}"
+".of3-sh{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin:clamp(40px,6vw,64px) 0 18px}"
+".of3-sh .k{display:block;margin:0 0 6px;font:500 11px/1 Poppins,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:var(--or)}"
+".of3-sh h2{margin:0;font:700 clamp(24px,3vw,36px)/1.1 Poppins,sans-serif;color:var(--ink);letter-spacing:-.01em}.of3-sh h2 em{font-weight:300;font-style:italic;color:var(--or)}"
+".of3-sh p{margin:6px 0 0;max-width:56ch;font:300 14.5px/1.55 Poppins,sans-serif;color:var(--mu)}"
+".of3-hw{font:700 26px/1 Caveat,cursive;color:var(--or);display:inline-block;transform:rotate(-3deg);margin-left:6px}"
+".of3-cb{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}"
+".of3-c{display:flex;flex-direction:column;border-radius:24px;background:var(--pp);border:1px solid var(--ln);overflow:hidden;box-shadow:0 18px 40px -32px rgba(43,41,22,.45)}"
+".of3-ci{position:relative;display:grid;gap:2px;aspect-ratio:16/10;background:#f6efe9;overflow:hidden}"
+".of3-ci.n1{grid-template-columns:1fr}.of3-ci.n2{grid-template-columns:1fr 1fr}.of3-ci.n3{grid-template-columns:1.4fr 1fr;grid-template-rows:1fr 1fr}.of3-ci.n3 img:first-child{grid-row:1/3}.of3-ci.n4{grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr}.of3-ci.n5{grid-template-columns:repeat(3,1fr);grid-template-rows:1fr 1fr}.of3-ci.n5 img:first-child{grid-row:1/3}"
+".of3-ci img{width:100%;height:100%;object-fit:cover;display:block;min-height:0}"
+".of3-ci .tg{position:absolute;left:12px;top:12px;padding:6px 11px;border-radius:999px;background:#0b0b0a;color:#f3d48b;font:600 11px/1 Poppins,sans-serif;letter-spacing:.12em;text-transform:uppercase}"
+".of3-cbd{display:flex;flex-direction:column;gap:6px;flex:1;padding:18px 18px 18px}"
+".of3-c h3{margin:0;font:700 18px/1.25 Poppins,sans-serif;color:var(--ink)}.of3-c h3 em{font-weight:300;font-style:italic;color:var(--or)}"
+".of3-c .ds{margin:0;font:300 13.5px/1.5 Poppins,sans-serif;color:var(--mu)}"
+".of3-q{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 2px}.of3-q button{min-height:34px;padding:0 13px;border-radius:999px;border:1px solid var(--ln);background:#fff;color:var(--ink);font:500 12.5px/1 Poppins,sans-serif;cursor:pointer}.of3-q button.on{border-color:var(--or);background:var(--or);color:#fff}"
+".of3-pr{display:flex;align-items:baseline;flex-wrap:wrap;gap:2px 10px;margin-top:6px}.of3-pr .de{font-size:13px;color:var(--mu);text-decoration:line-through}.of3-pr .por{font:700 26px/1.1 Poppins,sans-serif;color:var(--or)}"
+".of3-ec{display:flex;flex-wrap:wrap;gap:4px 12px;font:400 12.5px/1.4 Poppins,sans-serif;color:var(--mu)}.of3-ec b{color:var(--ink);font-weight:600}"
+".of3-add{display:flex;align-items:center;justify-content:center;width:100%;min-height:46px;margin-top:auto;border:0;border-radius:999px;background:var(--or);color:#fff;font:600 14.5px/1 Poppins,sans-serif;cursor:pointer}.of3-add:hover{background:#8f4d10}.of3-add[disabled]{opacity:.75;cursor:wait}"
+".of3-cbd .sp{flex:1;min-height:8px}"
+".of3-f{position:sticky;top:var(--cml-hdr,146px);z-index:5;display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;margin:0 0 6px;padding:10px 0;background:#f6efe9;box-shadow:0 0 0 100vmax #f6efe9,0 1px 0 100vmax rgba(86,82,41,.12);clip-path:inset(0 -100vmax -1px);transition:top .32s ease}html.cml-hh .of3-f{top:var(--cml-bars,57px)}"
+".of3-f .ch{display:flex;flex-wrap:wrap;gap:6px}.of3-f .ch button{min-height:34px;padding:0 14px;border-radius:999px;border:1px solid var(--ln);background:transparent;color:var(--ink);font:500 12.5px/1 Poppins,sans-serif;cursor:pointer}.of3-f .ch button.on{border-color:var(--ink);background:var(--ink);color:#f6efe9}"
+".of3-f select{width:auto!important;min-width:0!important;-webkit-appearance:none;appearance:none;height:34px!important;padding:0 30px 0 14px!important;border-radius:999px!important;border:1px solid var(--ln)!important;background:#fffaf5 url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5l5 5 5-5' fill='none' stroke='%23a65a14' stroke-width='1.6'/%3E%3C/svg%3E\") no-repeat right 12px center/10px 7px!important;color:var(--ink)!important;font:500 12.5px/1 Poppins,sans-serif!important;cursor:pointer}.of3-f select.on{border-color:var(--or);color:var(--or)}"
+".of3-f .n{margin-left:auto;font:400 12.5px/1 Poppins,sans-serif;color:var(--mu)}"
+".of3-g{margin:26px 0 0}.of3-gh{display:flex;align-items:baseline;gap:12px;margin:0 0 14px;padding:0 0 10px;border-bottom:1px solid var(--ln)}.of3-gh h3{margin:0;font:700 22px/1.1 Poppins,sans-serif;color:var(--ink)}.of3-gh .up{font:700 24px/1 Caveat,cursive;color:var(--or);transform:rotate(-3deg)}.of3-gh small{margin-left:auto;font:400 12.5px/1 Poppins,sans-serif;color:var(--mu)}"
+".of3-gr{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:16px}"
+".of3-p{position:relative;display:flex;flex-direction:column;border-radius:20px;background:var(--pp);border:1px solid var(--ln);overflow:hidden}"
+".of3-p .im{position:relative;display:block;aspect-ratio:1/1;background:#fff}.of3-p .im img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}"
+".of3-p .off{position:absolute;top:10px;right:10px;padding:5px 9px;border-radius:999px;background:#0b0b0a;color:#f3d48b;font:700 12.5px/1 Poppins,sans-serif}"
+".of3-p .bd{display:flex;flex-direction:column;gap:3px;flex:1;padding:12px 14px 14px}.of3-p .nm{font:600 14px/1.3 Poppins,sans-serif;color:var(--ink);text-decoration:none;min-height:2.6em;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}"
+".of3-p .op{font:400 12px/1.35 Poppins,sans-serif;color:var(--mu);min-height:1.35em}.of3-p .pr{display:flex;align-items:baseline;gap:0 8px;flex-wrap:wrap;margin-top:4px}.of3-p .por{font:700 20px/1.1 Poppins,sans-serif;color:var(--or)}.of3-p .de{font-size:12.5px;color:var(--mu);text-decoration:line-through}.of3-p .pix{font:400 12px/1.35 Poppins,sans-serif;color:var(--mu)}"
+".of3-p .bt{display:flex;align-items:center;justify-content:center;width:100%;min-height:42px;margin-top:10px;border:0;border-radius:999px;background:var(--or);color:#fff!important;font:600 14px/1 Poppins,sans-serif;text-decoration:none!important;cursor:pointer}.of3-p .bt.alt{background:transparent;border:1px solid var(--or);color:var(--or)!important}"
+".of3-sk{border-radius:20px;background:linear-gradient(90deg,#fffaf5,#f3e9df,#fffaf5);background-size:200% 100%;animation:of3Sk 1.2s linear infinite;min-height:320px}@keyframes of3Sk{from{background-position:200% 0}to{background-position:0 0}}"
+".of3-foot{margin:30px 0 0;font:300 12.5px/1.5 Poppins,sans-serif;color:var(--mu);text-align:center}"
+".of3-toast{position:fixed;left:50%;bottom:22px;z-index:99999;transform:translateX(-50%);display:flex;align-items:center;gap:14px;max-width:calc(100% - 32px);padding:14px 18px;border-radius:16px;background:#2b2916;color:#f6efe9;font:500 14px/1.4 Poppins,sans-serif;box-shadow:0 18px 40px -18px rgba(43,41,22,.6)}.of3-toast a{color:#f3d48b;white-space:nowrap}"
+"@media(max-width:980px){.of3-cb{grid-template-columns:repeat(2,minmax(0,1fr))}}"
+"@media(max-width:640px){.of3-in{padding:0 12px}.of3-hero{border-radius:26px;padding:34px 14px 30px}.of3-hl{gap:6px}.of3-hl li{padding:8px 12px;font-size:12px}"
+".of3-cb{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:12px;margin:0 -12px;padding:0 12px 6px;scrollbar-width:none}.of3-cb::-webkit-scrollbar{display:none}.of3-cb{scroll-padding-left:12px}.of3-c{flex:0 0 84%;scroll-snap-align:start}.of3-q button{padding:0 11px}"
+".of3-f{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;margin:0 -12px;padding:8px 12px}.of3-f::-webkit-scrollbar{display:none}.of3-f .ch{flex-wrap:nowrap}.of3-f .ch button,.of3-f select{flex:none;white-space:nowrap}.of3-f .n{display:none}"
+".of3-gr{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.of3-p{border-radius:16px}.of3-p .bd{padding:10px 10px 12px}.of3-p .nm{font-size:13px}.of3-p .por{font-size:17px}.of3-p .bt{min-height:38px;font-size:13px}.of3-gh h3{font-size:19px}}"
+"@media(prefers-reduced-motion:reduce){.of3-lk span,.of3-sk{animation:none}}";
var COMBOS=[
 {id:"lar",tag:"Mais pedido",t:"Laranja Chocoleve <em>em quantidade</em>",d:"Pacotes de 5 fatias de laranja com chocolate 70%, para a casa, para dividir e para presentear.",it:[[224675737,1]],q:[1,5,10,20],dq:5,pd:[[5,4],[10,6],[20,10]],ql:function(n){return n===1?"1 pacote":n+" pacotes"}},
 {id:"trx",tag:"Coleção",t:"Combo <em>Trouxinhas</em>",d:"Os cinco sabores de trouxinha juntos, um para cada momento do dia.",it:[[382766299,1]],q:[1,2,3],ql:function(n){return n===1?"1 combo":n+" combos"}},
 {id:"blm",tag:"Os favoritos",t:"Combo 4 chás mistos <em>mais pedidos</em>",d:"Sereníssimo, Intenso, Quentão e Sport: os chás que mais saem da nossa cozinha.",it:[[382766180,1]],q:[1,2,3],ql:function(n){return n===1?"1 combo":n+" combos"}},
 {id:"ter",tag:"Para a família",t:"Kit Ternura <em>para toda a família</em>",d:"Um presente igual para cada pessoa querida, sem pensar duas vezes.",it:[[313665100,1]],q:[1,3,5,10],dq:3,pd:[[3,4],[5,6],[10,10]],ql:function(n){return n===1?"1 kit":n+" kits"}},
 {id:"flw",tag:"Empresas",t:"Lembrancinhas <em>corporativas</em>",d:"O kit Flowers para equipe, clientes e parceiros, com preço de Black.",it:[[343280690,1]],q:[1,10,20,50],dq:10,pd:[[10,4],[20,6],[50,10]],ql:function(n){return n===1?"1 kit":n+" kits"}},
 {id:"nat",tag:"Executivos",t:"Presentes <em>executivos</em>",d:"O Natal Feliz para diretores e pessoas especiais, pronto para entregar.",it:[[379081240,1]],q:[1,5,10,20],dq:5,pd:[[5,4],[10,6],[20,10]],ql:function(n){return n===1?"1 caixa":n+" caixas"}}
];
var CATS=["Kits","Chás","Snacks e granolas","Acessórios"];
var PR=[["","Qualquer preço",0,1e9],["a","A partir de R$ 0 até R$ 50",0,50],["b","De R$ 50 a R$ 150",50.005,150],["c","Acima de R$ 150",150.005,1e9]];
var DS=[["","Qualquer desconto",0,100],["40","40% off ou mais",40,100],["25","25% off ou mais",25,100],["15","15% off ou mais",15,100]];
var S={c:"",p:"",d:""},all=[],by={},root,cq={};
function lo(p){return p.pmin!=null?p.pmin:p.price}function od(p){return p.omax!=null?p.omax:p.off}
function img(p){return p&&p.img?p.img:""}
function toast(h){var t=D.querySelector(".of3-toast");if(t)t.remove();t=D.createElement("div");t.className="of3-toast";t.setAttribute("role","status");t.innerHTML=h;D.body.appendChild(t);clearTimeout(window.__of3T);window.__of3T=setTimeout(function(){t.remove()},7000)}
function post(p,qty){var q=new URLSearchParams();q.set("add_to_cart",p.pid);q.set("quantity",String(qty));q.set("add_to_cart_enhanced","1");(p.opts||[]).forEach(function(o,i){q.set("variation["+i+"]",o)});if(p.combo)q.set("kit_selections","");
 return fetch("/comprar/",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/x-www-form-urlencoded","X-Requested-With":"XMLHttpRequest"},body:q.toString()}).then(function(r){return r.json()}).then(function(j){if(!j||!j.success)throw 0;sync(j);return j})}
function sync(j){try{var c=j.cart||{},n=0;(c.products||[]).forEach(function(p){n+=+p.quantity||0});if(n)[].forEach.call(D.querySelectorAll(".js-cart-widget-amount"),function(e){e.textContent=n});var L=D.querySelector(".js-ajax-cart-list");if(L&&j.html_cart_items)L.innerHTML=j.html_cart_items;var st=D.querySelector("#modal-cart .js-ajax-cart-total.js-cart-subtotal"),tt=D.querySelector("#modal-cart .js-cart-total");if(st&&c.subtotal!=null){var old=(+st.getAttribute("data-priceraw")||0)/100,nw=+c.subtotal;st.textContent=brl(nw).replace("R$ ","R$");st.setAttribute("data-priceraw",Math.round(nw*100));if(tt){var ot=(parseFloat(tt.getAttribute("data-priceraw"))||0)/100,t2=ot-old+nw;tt.textContent=brl(t2);tt.setAttribute("data-priceraw",(t2*100).toFixed(2))}}}catch(e){}}
function addMany(list){var i=0;function nx(){if(i>=list.length)return Promise.resolve();var x=list[i++];return post(x[0],x[1]).then(nx)}return nx()}
function done(n){toast((n>1?"Itens na sacola.":"Produto na sacola.")+' <a href="/comprar/">Ver sacola</a>')}
function comboCalc(c){var n=cq[c.id]||c.dq||c.q[0],por=0,de=0,ok=true,un=0;c.it.forEach(function(x){var p=by[x[0]];if(!p){ok=false;return}var q=x[1]*n;un+=q;por+=lo(p)*q;de+=(p.cmp&&p.cmp>p.price?p.cmp:p.price)*q});var pd=0;(c.pd||[]).forEach(function(t){if(n>=t[0])pd=t[1]});por=Math.round(por*(100-pd))/100;return{ok:ok,n:n,por:por,de:de,un:un,pd:pd}}
function comboHtml(c){var ps=c.it.map(function(x){return by[x[0]]}).filter(Boolean);if(ps.length!==c.it.length)return"";var k=comboCalc(c);var ims=ps.slice(0,5).map(function(p){return'<img src="'+esc(img(p))+'" alt="" loading="lazy" decoding="async">'}).join("");
 return'<article class="of3-c" data-c="'+c.id+'"><div class="of3-ci n'+Math.min(5,ps.length)+'">'+ims+'<span class="tg">'+esc(c.tag)+'</span></div><div class="of3-cbd"><h3>'+c.t+'</h3><p class="ds">'+esc(c.d)+'</p><div class="of3-q"'+(c.q.length>3?' style="grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important"':'')+' role="group" aria-label="Quantidade">'+c.q.map(function(n){return'<button type="button" data-q="'+n+'"'+(n===k.n?' class="on" aria-pressed="true"':' aria-pressed="false"')+'>'+esc(c.ql(n))+'</button>'}).join("")+'</div><div class="of3-pr">'+(k.de>k.por?'<span class="de">'+brl(k.de)+'</span>':'')+'<span class="por">'+brl(k.por)+'</span>'+(k.de>k.por?'<span class="pc">-'+Math.round((1-k.por/k.de)*100)+'%</span>':'')+'</div><div class="of3-ec">'+(k.de>k.por?'<span>Economia de <b>'+brl(k.de-k.por)+'</b></span>':'')+(k.pd?'<span>+'+k.pd+'% pela quantidade</span>':'')+'<span>'+k.un+(k.un===1?" item":" itens")+'</span><span>'+brl(k.por*0.95)+' no Pix</span></div><span class="sp"></span><button type="button" class="of3-add" data-addc="'+c.id+'">Adicionar tudo à sacola</button></div></article>'}
var LIM={},VC={};
var XCSS="html body #cml-of3 article.of3-c .of3-q:has(button:nth-child(4)){display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}html body #cml-of3 article.of3-c .of3-q:has(button:nth-child(4)) button{width:100%!important;margin:0!important}#cml-of3 .of3-gr{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:14px!important}@media(min-width:1000px){#cml-of3 .of3-gr{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:20px!important}}"
+"#cml-of3 .of3-more{display:flex!important;align-items:center;gap:10px;margin:20px auto 0!important;padding:12px 22px!important;border-radius:999px!important;border:1px solid #a65a14!important;background:transparent!important;color:#a65a14!important;font:600 14px/1 Poppins,sans-serif!important;cursor:pointer;text-transform:none!important}"
+"#cml-of3 .of3-more small{font:400 12.5px/1 Poppins,sans-serif;color:#6f6656}#cml-of3 .of3-more:hover{background:#a65a14!important;color:#fff!important}#cml-of3 .of3-more:hover small{color:#f6efe9}"
+"#cml-of3 .of3-pk{position:absolute;left:8px;right:8px;bottom:8px;z-index:4;background:#fffaf5;border:1px solid #e8ddd0;border-radius:16px;padding:12px;box-shadow:0 18px 40px -18px rgba(43,41,22,.45);display:flex;flex-direction:column;gap:10px;max-height:calc(100% - 16px);overflow:auto}"
+"#cml-of3 .of3-pk .h{display:flex;justify-content:space-between;align-items:center;font:600 13.5px/1.2 Poppins,sans-serif;color:#2b2916}"
+"#cml-of3 .of3-pk .x{width:30px!important;height:30px!important;padding:0!important;border-radius:50%!important;border:0!important;background:#f1e8de!important;color:#2b2916!important;font:400 18px/1 Poppins,sans-serif!important;cursor:pointer}"
+"#cml-of3 .of3-pk .ops{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}"
+"#cml-of3 .of3-pk .ops button{display:flex!important;flex-direction:column;align-items:flex-start;gap:3px;padding:8px 10px!important;border-radius:12px!important;border:1px solid #e8ddd0!important;background:#fff!important;font:500 13px/1.2 Poppins,sans-serif!important;color:#2b2916!important;cursor:pointer;text-align:left;text-transform:none!important;min-width:0;overflow-wrap:anywhere}"
+"#cml-of3 .of3-pk .ops button small{font:600 12px/1 Poppins,sans-serif;color:#a65a14}"
+"#cml-of3 .of3-pk .ops button.on{border-color:#a65a14!important;box-shadow:inset 0 0 0 1px #a65a14}"
+"#cml-of3 .of3-pk .st{display:flex;align-items:center;justify-content:space-between;border:1px solid #e8ddd0;border-radius:999px;padding:3px;background:#fff}"
+"#cml-of3 .of3-pk .st button{width:36px!important;height:36px!important;padding:0!important;border-radius:50%!important;border:0!important;background:#f6efe9!important;font:600 18px/1 Poppins,sans-serif!important;color:#2b2916!important;cursor:pointer}"
+"#cml-of3 .of3-pk .st span{font:600 15px/1 Poppins,sans-serif;color:#2b2916}"
+"#cml-of3 .of3-pk .ok{min-height:44px;border-radius:999px!important;border:0!important;background:#a65a14!important;color:#fff!important;font:600 14px/1.1 Poppins,sans-serif!important;cursor:pointer;text-transform:none!important;padding:0 14px!important}"
+"#cml-of3 .of3-pk .ft{display:flex;flex-direction:column;gap:8px}"
+"#cml-of3 .of3-ate{display:flex;align-items:center;justify-content:center;gap:14px;margin:16px 0 0;font:500 12px/1 Poppins,sans-serif;letter-spacing:.28em;text-transform:uppercase;color:#dfae58}#cml-of3 .of3-ate:before,#cml-of3 .of3-ate:after{content:'';width:40px;height:1px;background:#dfae58;opacity:.6}"
+"#cml-of3 .of3-faq{max-width:760px;margin:64px auto 0;padding:0 4px}#cml-of3 .of3-faq h2{margin:0 0 12px;text-align:center;font:700 26px/1.2 Poppins,sans-serif;color:#2b2916}"
+"#cml-of3 .of3-faq details{border-bottom:1px solid #e8ddd0}#cml-of3 .of3-faq summary{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:18px 2px;cursor:pointer;list-style:none;font:500 16px/1.35 Poppins,sans-serif;color:#2b2916}#cml-of3 .of3-faq summary::-webkit-details-marker{display:none}"
+"#cml-of3 .of3-faq summary:after{content:'+';flex:none;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:#f1e8de;color:#a65a14;font:500 18px/1 Poppins,sans-serif}#cml-of3 .of3-faq details[open] summary:after{content:'−'}"
+"#cml-of3 .of3-faq details p{margin:0 0 18px;font:400 14.5px/1.6 Poppins,sans-serif;color:#6f6656}#cml-of3 .of3-faq details a{color:#a65a14;text-decoration:underline}"
+"#cml-of3 .of3-f label{display:none!important}"
+"#cml-of3 .of3-p .bd{flex:1 1 auto!important;display:flex!important;flex-direction:column!important}#cml-of3 .of3-p .bd .bt{margin-top:auto!important;width:100%!important}#cml-of3 .of3-p .bd .pix{margin-bottom:12px!important;min-height:1.2em}"
+"@media(max-width:640px){#cml-of3 .of3-pk{left:4px;right:4px;bottom:4px;padding:10px;gap:8px;max-height:calc(100% - 8px)}#cml-of3 .of3-pk .ops{grid-template-columns:1fr}#cml-of3 .of3-pk .ops button{flex-direction:row!important;justify-content:space-between;align-items:center}#cml-of3 .of3-pk .ok{font-size:13px!important}#cml-of3 .of3-pk .ops button{gap:8px}#cml-of3 .of3-pk .ops button small{white-space:nowrap;flex:none}}";
function pick(b){var p=by[b.getAttribute("data-pick")];if(!p)return;var ar=b.closest(".of3-p");var ex=ar.querySelector(".of3-pk");if(ex){ex.remove();return}
 b.disabled=true;var t=b.textContent;b.textContent="Carregando…";
 (VC[p.pid]?Promise.resolve(VC[p.pid]):fetch(p.href,{credentials:"same-origin"}).then(function(r){return r.text()}).then(function(h){var d=new DOMParser().parseFromString(h,"text/html"),e=d.querySelector("[data-variants]");var v=e?JSON.parse(e.getAttribute("data-variants")):[];VC[p.pid]=v;return v})).then(function(v){b.disabled=false;b.textContent=t;
  v=v.filter(function(x){return x.available!==false&&x.stock!==0});if(!v.length){location.href=p.href;return}
  var st={i:0,q:1},w=D.createElement("div");w.className="of3-pk";w.setAttribute("role","dialog");w.setAttribute("aria-label","Escolha a opção de "+p.name);
  function lab(x){return [x.option0,x.option1,x.option2].filter(function(o){return o}).join(" · ")}
  function rd(){var x=v[st.i];w.innerHTML='<div class="h"><b>Escolha a opção</b><button type="button" class="x" aria-label="Fechar">×</button></div><div class="ops">'+v.map(function(x,i){return'<button type="button" data-v="'+i+'"'+(i===st.i?' class="on" aria-pressed="true"':' aria-pressed="false"')+'>'+esc(lab(x))+'<small>'+brl(x.price_number)+'</small></button>'}).join("")+'</div><div class="ft"><div class="st"><button type="button" data-st="-1" aria-label="Diminuir quantidade">−</button><span aria-live="polite">'+st.q+'</span><button type="button" data-st="1" aria-label="Aumentar quantidade">+</button></div><button type="button" class="ok">Colocar na sacola · '+brl(x.price_number*st.q)+'</button></div>'}
  rd();
  w.addEventListener("click",function(e){e.stopPropagation();var o=e.target.closest("[data-v]");if(o){st.i=+o.getAttribute("data-v");rd();return}
   var s=e.target.closest("[data-st]");if(s){st.q=Math.max(1,Math.min(50,st.q+(+s.getAttribute("data-st"))));rd();return}
   if(e.target.closest(".x")){w.remove();b.focus();return}
   var k=e.target.closest(".ok");if(k&&!k.disabled){var x=v[st.i];k.disabled=true;k.textContent="Colocando…";var pp=Object.assign({},p,{opts:[x.option0,x.option1,x.option2].filter(function(o){return o!=null&&o!==""})});
    post(pp,st.q).then(function(){k.textContent="Na sacola ✓";done(1);setTimeout(function(){w.remove()},1400)}).catch(function(){rd();toast('Não conseguimos adicionar. <a href="'+esc(p.href)+'">Abrir o produto</a>')})}});
  ar.appendChild(w);var f=w.querySelector(".on");if(f)f.focus()}).catch(function(){b.disabled=false;b.textContent=t;location.href=p.href})}
function card(p,i){var m=p.vn>1,pv=m&&p.pmin!==p.pmax,o=od(p);
 return'<article class="of3-p"><a class="im" href="'+esc(p.href)+'" aria-label="'+esc(p.name)+'">'+(p.img?'<img src="'+esc(p.img)+'" alt="" width="480" height="480" decoding="async"'+(i<8?'':' loading="lazy"')+'>':'')+'<span class="off">-'+o+'%</span></a><div class="bd"><a class="nm" href="'+esc(p.href)+'">'+esc(p.name)+'</a><span class="op">'+esc(m?p.vn+" opções":(p.opt||""))+'</span><div class="pr">'+(pv?'<span class="op">a partir de</span><span class="por">'+brl(p.pmin)+'</span>':'<span class="por">'+brl(p.price)+'</span>'+(p.cmp>p.price?'<span class="de">'+brl(p.cmp)+'</span>':''))+'</div><span class="pix">'+(pv?"a partir de "+brl(p.pmin*0.95)+" no Pix":brl(p.price*0.95)+" no Pix")+'</span>'+'<button type="button" class="bt" '+(m?'data-pick':'data-add')+'="'+p.pid+'">Comprar</button>'+'</div></article>'}
var KH=[382700088,382699778],KO=[343280690,313665100,379081240,344326858,345619388,311670419,377558081,377597290,377557596,377557742,377555573,382766044,382766180,382766299];
function list(){var L=all.filter(function(p){if(p.cat==="Kits"&&(KH.indexOf(p.pid)>=0||/^Kit (Corporativo|Executivo)/i.test(p.name)))return false;if(S.c&&p.cat!==S.c)return false;var r=PR.filter(function(x){return x[0]===S.p})[0];if(r&&!(lo(p)>=r[2]&&lo(p)<=r[3]))return false;var d=DS.filter(function(x){return x[0]===S.d})[0];if(d&&!(od(p)>=d[2]))return false;return true});
 var cats=CATS.concat(Object.keys(all.reduce(function(a,p){if(CATS.indexOf(p.cat)<0)a[p.cat]=1;return a},{})));var h="",n=0;
 cats.forEach(function(c){var G=L.filter(function(p){return p.cat===c});if(!G.length)return;G.sort(function(a,b){if(c==="Kits"){var ia=KO.indexOf(a.pid),ib=KO.indexOf(b.pid);ia=ia<0?99:ia;ib=ib<0?99:ib;if(ia!==ib)return ia-ib}return od(b)-od(a)||b.save-a.save});var mx=Math.max.apply(null,G.map(od));
  h+='<section class="of3-g" id="'+sid(c)+'"><div class="of3-gh"><h3>'+esc(c)+'</h3><span class="up">até '+mx+'% off</span><small>'+G.length+(G.length===1?" produto":" produtos")+'</small></div><div class="of3-gr">'+G.slice(0,LIM[c]||4).map(function(p){return card(p,n++)}).join("")+'</div>'+(G.length>(LIM[c]||4)?'<button type="button" class="of3-more" data-more="'+esc(c)+'">Ver mais produtos <small>mostrando '+(LIM[c]||4)+' de '+G.length+'</small><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>':'')+'</section>'});
 var box=root.querySelector(".of3-list");cxMorph(box,h||'<p class="of3-foot">Nenhum produto com esses filtros. <button type="button" class="of3-clr" style="border:0;background:none;color:#a65a14;text-decoration:underline;cursor:pointer;font:inherit">Limpar filtros</button></p>');
 var c=root.querySelector(".of3-f .n");if(c)c.textContent=L.length+(L.length===1?" produto":" produtos")}
function cxMorph(box,h){var pool={};[].forEach.call(box.querySelectorAll("img"),function(i){var k=i.getAttribute("src");(pool[k]=pool[k]||[]).push(i)});var t=D.createElement("div");t.innerHTML=h;[].forEach.call(t.querySelectorAll("img"),function(i){var k=i.getAttribute("src"),o=pool[k]&&pool[k].shift();if(o){o.removeAttribute("loading");i.parentNode.replaceChild(o,i)}});var y=window.pageYOffset;box.replaceChildren.apply(box,[].slice.call(t.childNodes));if(Math.abs(window.pageYOffset-y)>2)window.scrollTo(0,y)}
function sid(c){return"of3-s-"+String(c).normalize("NFD").replace(/[^a-z]/gi,"").toLowerCase()}
function bar(){var cats=CATS.filter(function(c){return all.some(function(p){return p.cat===c})});
 return'<div class="ch" role="navigation" aria-label="Ir para"><button type="button" data-go="of3-combos">Combos</button>'+cats.map(function(c){return'<button type="button" data-go="'+sid(c)+'">'+esc(c==="Snacks e granolas"?"Snacks":c)+'</button>'}).join("")+'<button type="button" data-go="of3-faq">Dúvidas</button></div>'}
function draw(){if(!all.__dup){all.__dup=1;all.slice().forEach(function(p){if(KO.indexOf(p.pid)>=0&&p.cat!=="Kits")all.push(Object.assign({},p,{cat:"Kits"}))})}by={};all.forEach(function(p){if(!by[p.pid]||by[p.pid].cat!=="Kits")by[p.pid]=by[p.pid]||p});
 var max=0,min=Infinity;all.forEach(function(p){if(od(p)>max)max=od(p);if(lo(p)<min)min=lo(p)});
 var hl=root.querySelector(".of3-hl");if(hl)hl.innerHTML=all.length?'<li>Produtos a partir de <b>'+brl(min)+'</b></li><li>Até <b>'+max+'% off</b></li><li><b>+5%</b> de desconto no Pix</li>':"";
 root.querySelector(".of3-cb").innerHTML=COMBOS.map(comboHtml).join("");
 root.querySelector(".of3-f").innerHTML=bar();list()}
function mount(){var hero=D.getElementById("ns-section-category_hero"),pl=D.getElementById("ns-section-product_list");var anchor=hero||pl;if(!anchor)return false;
 if(!D.getElementById("cml-of3-css")){var s=D.createElement("style");s.id="cml-of3-css";s.textContent=css+XCSS;(D.head||H).appendChild(s)}
 root=D.createElement("section");root.id="cml-of3";root.className="of3";
 root.innerHTML='<div class="of3-in"><header class="of3-hero"><h1 class="of3-lk" aria-label="Black Friday"><span class="b">Black</span><span class="f">Friday</span></h1><p class="of3-sub">Preço de Black, <em>cuidado de sempre.</em></p><p class="of3-ate">Só até 30/11</p><a class="of3-go" href="#of3-combos">Ver os combos</a></header>'
 +'<div class="of3-sh" id="of3-combos"><div><span class="k">Combos da Black</span><h2>Vale mais <em>levar junto</em><span class="of3-hw">em quantidade</span></h2><p>Escolha a quantidade e coloque tudo na sacola com um toque. Cada item entra com o preço de Black.</p></div></div><div class="of3-cb">'+[0,1,2].map(function(){return'<div class="of3-sk"></div>'}).join("")+'</div>'
 +'<div class="of3-sh"><div><span class="k">Por categoria</span><h2>Todos os produtos <em>em oferta</em></h2></div></div><div class="of3-f"></div><div class="of3-list"><div class="of3-gr">'+[0,1,2,3].map(function(){return'<div class="of3-sk"></div>'}).join("")+'</div></div>'
 +'<section class="of3-faq" id="of3-faq"><h2>Dúvidas rápidas</h2><details><summary>Até quando vale?</summary><p>De 23 a 30/11/2026 ou enquanto durar o estoque.</p></details><details><summary>Preciso de cupom?</summary><p>Não. O desconto já aparece no preço de cada produto e de cada combo.</p></details><details><summary>Tem desconto no Pix?</summary><p>Sim, 5% a mais, aplicado na hora do pagamento.</p></details><details><summary>Quero presentear. Como faço?</summary><p>Monte uma caixa do seu jeito em <a href="/presentes-de-natal/">Monte seu presente</a>.</p></details></section><p class="of3-foot">Preços válidos de 23 a 30/11/2026 ou enquanto durar o estoque. O desconto do Pix é aplicado no pagamento.</p></div>';
 anchor.parentNode.insertBefore(root,anchor);
 root.addEventListener("click",function(e){var gt=e.target.closest("[data-go]");if(gt){var tg=D.getElementById(gt.getAttribute("data-go"));if(tg){window.scrollTo({top:tg.getBoundingClientRect().top+window.pageYOffset-(innerWidth<768?150:200),behavior:"smooth"})}return}
  var mo=e.target.closest("[data-more]");if(mo){var cc=mo.getAttribute("data-more");LIM[cc]=(LIM[cc]||4)+4;list();return}
  var pk=e.target.closest("[data-pick]");if(pk){pick(pk);return}
  var q=e.target.closest("[data-q]");if(q){var c=q.closest("[data-c]").getAttribute("data-c");cq[c]=+q.getAttribute("data-q");var cb=COMBOS.filter(function(x){return x.id===c})[0];var el=root.querySelector('[data-c="'+c+'"]');var w=D.createElement("div");w.innerHTML=comboHtml(cb);var nf=w.firstChild;if(nf){["of3-q","of3-pr","of3-ec"].forEach(function(k){var a1=el.querySelector("."+k),b1=nf.querySelector("."+k);if(a1&&b1&&a1.innerHTML!==b1.innerHTML)a1.innerHTML=b1.innerHTML})}return}
  var a=e.target.closest("[data-addc]");if(a&&!a.disabled){var cb2=COMBOS.filter(function(x){return x.id===a.getAttribute("data-addc")})[0],k=comboCalc(cb2);a.disabled=true;var tx=a.textContent;a.textContent="Colocando na sacola…";
   addMany(cb2.it.map(function(x){return[by[x[0]],x[1]*k.n]})).then(function(){a.textContent="Tudo na sacola ✓";done(2);setTimeout(function(){a.disabled=false;a.textContent=tx},2600)}).catch(function(){a.disabled=false;a.textContent=tx;toast("Não conseguimos adicionar tudo. Confira a sacola ou tente de novo.")});return}
  var b=e.target.closest("[data-add]");if(b&&!b.disabled){var p=by[b.getAttribute("data-add")];if(!p)return;b.disabled=true;var t2=b.textContent;b.textContent="Colocando…";post(p,1).then(function(){b.textContent="Na sacola ✓";done(1);setTimeout(function(){b.disabled=false;b.textContent=t2},2400)}).catch(function(){b.disabled=false;b.textContent=t2;toast('Não conseguimos adicionar. <a href="'+esc(p.href)+'">Abrir o produto</a>')});return}
  var ct=e.target.closest("[data-cat]");if(ct){S.c=ct.getAttribute("data-cat");root.querySelector(".of3-f").innerHTML=bar();list();return}
  if(e.target.closest(".of3-clr")){S.c=S.p=S.d="";root.querySelector(".of3-f").innerHTML=bar();list()}});
 root.addEventListener("change",function(e){var s=e.target.closest("select[data-k]");if(!s)return;S[s.getAttribute("data-k")]=s.value;s.classList.toggle("on",!!s.value);list()});
 var src=window.CMLOfertas?window.CMLOfertas():fetch(API).then(function(r){return r.json()}).then(function(j){return j.p||[]});
 Promise.resolve(src).then(function(p){all=(p||[]).slice();if(!all.length){root.querySelector(".of3-list").innerHTML='<p class="of3-foot">As ofertas estão sendo preparadas. Volte daqui a pouco.</p>';return}draw()}).catch(function(){root.querySelector(".of3-list").innerHTML='<p class="of3-foot">Não conseguimos carregar as ofertas agora. Atualize a página.</p>'});
 return true}
var n=0;(function l(){var ok=false;try{ok=mount()}catch(e){ok=true}if(!ok&&++n<80)setTimeout(l,100)})();
}catch(e){}})();

/* 33b) barra de filtros das ofertas acompanha o cabecalho (22/11/2026): mede a altura real do cabecalho e das barras */
(function(){try{var D=document;function u(){var w=D.querySelector('.sticky-header-wrapper'),h=D.querySelector('.js-head-main');if(!w||!h)return false;var r=D.documentElement.style;r.setProperty('--cml-hdr',w.offsetHeight+'px');r.setProperty('--cml-bars',Math.max(0,w.offsetHeight-h.offsetHeight)+'px');return true}
var n=0;(function l(){if(u()){try{new ResizeObserver(u).observe(D.querySelector('.sticky-header-wrapper'))}catch(e){}addEventListener('resize',u)}else if(++n<60)setTimeout(l,100)})()}catch(e){}})();


/* 34) Encontre seu cha e Monte seu presente no esqueleto do Clube Chef (21/11/2026): abertura em oliva de ponta a ponta com foto em moldura e legenda, titulos de secao centralizados, faixa "Como funciona", montador sem caixa extra, duvidas e fechamento no padrao do Clube. Monte seu presente sem tema de Natal (presentes corporativos, familia, Natal do jeito certo). Minha conta no tema claro. */
;(function(){try{if(window.__cml34)return;window.__cml34=1;var D=document,H=D.documentElement,P=location.pathname;
var X=":not(#r1):not(#r2):not(#r3):not(#r4):not(#r5)";
var OL="radial-gradient(120% 120% at 18% 0%,#5b5730 0%,#565229 42%,#403d1e 100%)";
var GRAIN="url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")";
var IC={gift:'<rect x="3.5" y="8.5" width="17" height="12" rx="2"/><path d="M3.5 12.5h17M12 8.5v12M12 8.5c-1.5-3-5-4-5.5-2S9 8.5 12 8.5zM12 8.5c1.5-3 5-4 5.5-2S15 8.5 12 8.5z"/>',brief:'<rect x="3" y="7.5" width="18" height="12.5" rx="2"/><path d="M8.5 7.5V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5v2M3 12.5h18M10.5 12.5v2h3v-2"/>',heart:'<path d="M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10z"/>',leaf:'<path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15"/><path d="M5 19c3-4 6-6.5 10-8.5"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>'};
function ico(n){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[n]+'</svg>'}
function hero(S,box,tx,pic){return""
+S+" "+box+X+"{margin-left:calc(50% - 50vw)!important;margin-right:calc(50% - 50vw)!important;margin-top:0!important;width:auto!important;max-width:none!important;border:0!important;border-radius:0 0 40px 40px!important;box-shadow:none!important;padding:72px max(24px,calc(50vw - 600px)) 84px!important;display:grid!important;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)!important;gap:56px!important;align-items:center!important;position:relative;isolation:isolate;overflow:hidden;background:"+OL+"!important}"
+S+" "+box+X+":after{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.16;mix-blend-mode:multiply;background-image:"+GRAIN+";background-size:220px}"
+S+" "+box+X+":before{display:none!important}"
+S+" "+box+" "+tx+X+"{text-align:left!important;min-width:0}"
+S+" "+box+" :is(.cef-eb,.cmn-eb)"+X+"{margin:0 0 14px!important;font:500 11.5px/1.3 Poppins,sans-serif!important;letter-spacing:.18em!important;text-transform:uppercase!important;color:#dfae58!important;-webkit-text-fill-color:#dfae58!important}"
+S+" "+box+" h1"+X+"{margin:0 0 16px!important;font:700 clamp(34px,4.4vw,56px)/1.08 Poppins,sans-serif!important;letter-spacing:-.015em!important;color:#f6efe9!important;-webkit-text-fill-color:#f6efe9!important}"
+S+" "+box+" h1 em"+X+"{font-weight:300!important;font-style:italic!important;color:#f3d48b!important;-webkit-text-fill-color:#f3d48b!important}"
+S+" "+box+" :is(.cef-sub,.cmn-lead)"+X+"{margin:0!important;max-width:50ch;font:300 17px/1.6 Poppins,sans-serif!important;color:rgba(246,239,233,.86)!important;-webkit-text-fill-color:rgba(246,239,233,.86)!important}"
+S+" "+box+" :is(.cta,.nx-cta)"+X+"{display:flex!important;flex-wrap:wrap;align-items:center;gap:14px 26px!important;margin:30px 0 26px!important}"
+S+" "+box+" :is(.cta,.nx-cta) a.b"+X+"{display:inline-flex!important;align-items:center;gap:10px;min-height:52px;padding:0 28px!important;border-radius:999px!important;border:0!important;background:#dfae58!important;color:#0b0a08!important;-webkit-text-fill-color:#0b0a08!important;font:600 15.5px/1.2 Poppins,sans-serif!important;text-decoration:none!important;box-shadow:0 14px 30px -16px rgba(43,41,22,.6),inset 0 1px 0 rgba(255,255,255,.35)!important;width:auto!important}"
+S+" "+box+" :is(.cta,.nx-cta) a.b *"+X+"{color:#0b0a08!important;-webkit-text-fill-color:#0b0a08!important}"
+S+" "+box+" :is(.cta,.nx-cta) a.l"+X+"{color:#f6efe9!important;-webkit-text-fill-color:#f6efe9!important;font:500 15px/1.3 Poppins,sans-serif!important;text-decoration:none!important;padding:6px 0!important;border-bottom:1.5px solid #dfae58!important}"
+S+" "+box+" :is(.chips,.nx-chips)"+X+"{display:flex;flex-wrap:wrap;gap:8px;margin:0!important;padding:0!important;list-style:none}"
+S+" "+box+" :is(.chips,.nx-chips) li"+X+"{display:flex;align-items:center;gap:7px;padding:8px 14px!important;border-radius:999px!important;background:rgba(246,239,233,.1)!important;border:1px solid rgba(223,174,88,.35)!important;font:400 13px/1.2 Poppins,sans-serif!important;color:#f6efe9!important;-webkit-text-fill-color:#f6efe9!important}"
+S+" "+box+" :is(.chips,.nx-chips) li"+X+":before{content:'';width:6px;height:6px;border-radius:50%;background:#dfae58!important}"
+S+" "+box+" "+pic+X+"{position:relative;margin:0!important;justify-self:center!important;width:100%!important;max-width:520px!important;padding:12px!important;border-radius:36px!important;background:#fff!important;box-shadow:0 40px 80px -40px rgba(20,18,8,.55)!important;border:0!important}"
+S+" "+box+" "+pic+" img"+X+"{display:block;width:100%!important;aspect-ratio:1/1;object-fit:cover;border-radius:26px!important}"
+S+" "+box+" "+pic+" figcaption"+X+"{position:absolute;left:24px;right:24px;bottom:24px;display:grid;gap:2px;padding:14px 18px;border-radius:20px;background:rgba(43,41,22,.78);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}"
+S+" "+box+" "+pic+" figcaption b"+X+"{font:600 15px/1.2 Poppins,sans-serif!important;color:#f3d48b!important;-webkit-text-fill-color:#f3d48b!important}"
+S+" "+box+" "+pic+" figcaption span"+X+"{font:300 13px/1.4 Poppins,sans-serif!important;color:#f6efe9!important;-webkit-text-fill-color:#f6efe9!important}"
+"@media(max-width:900px){"+S+" "+box+X+"{grid-template-columns:minmax(0,1fr)!important;gap:28px!important;padding:40px 18px 48px!important;border-radius:0 0 32px 32px!important}"+S+" "+box+" "+pic+X+"{max-width:380px!important}"+S+" "+box+" :is(.cta,.nx-cta) a.b"+X+"{width:100%!important;justify-content:center}}"}
var COM=""
+".lp-sh"+X+"{text-align:center!important;max-width:720px;margin:84px auto 40px!important}"
+".lp-sh :is(.k,.eb,p.k)"+X+"{display:block!important;margin:0 0 12px!important;font:500 11.5px/1.3 Poppins,sans-serif!important;letter-spacing:.18em!important;text-transform:uppercase!important;color:#a65a14!important;-webkit-text-fill-color:#a65a14!important;justify-content:center!important}"
+".lp-sh :is(.k,.eb)"+X+":before{display:none!important}"
+".lp-sh h2"+X+"{display:block!important;margin:0!important;font:700 clamp(28px,4vw,46px)/1.12 Poppins,sans-serif!important;letter-spacing:-.01em!important;color:#2b2916!important;-webkit-text-fill-color:#2b2916!important}"
+".lp-sh h2 em"+X+"{font-weight:300!important;font-style:italic!important;color:#2b2916!important;-webkit-text-fill-color:#2b2916!important}"
+".lp-sh p.lead"+X+"{margin:14px auto 0!important;max-width:60ch;font:300 17px/1.6 Poppins,sans-serif!important;color:#4a4636!important;-webkit-text-fill-color:#4a4636!important}"
+".lp-band"+X+"{position:relative;isolation:isolate;overflow:hidden;margin:84px calc(50% - 50vw) 0!important;padding:84px max(24px,calc(50vw - 590px))!important;background:"+OL+";color:#f6efe9;font-family:Poppins,sans-serif}"
+".lp-band"+X+":after{content:'';position:absolute;inset:0;z-index:-1;opacity:.16;mix-blend-mode:multiply;pointer-events:none;background-image:"+GRAIN+";background-size:220px}"
+".lp-band .lp-sh"+X+"{margin:0 auto 40px!important}.lp-band .lp-sh .k"+X+"{color:#dfae58!important;-webkit-text-fill-color:#dfae58!important}.lp-band .lp-sh h2"+X+"{color:#f6efe9!important;-webkit-text-fill-color:#f6efe9!important}.lp-band .lp-sh h2 em"+X+"{color:#f3d48b!important;-webkit-text-fill-color:#f3d48b!important}"
+".lp-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;max-width:1180px;margin:0 auto}"
+".lp-st{padding:28px 26px;border-radius:28px;background:rgba(246,239,233,.07);border:1px solid rgba(223,174,88,.28);text-align:left}"
+".lp-st .n{display:inline-grid;place-items:center;width:40px;height:40px;border-radius:50%;background:#dfae58;color:#0b0a08;font:700 16px/1 Poppins,sans-serif;margin-bottom:16px}"
+".lp-st b{display:block;font:600 18px/1.3 Poppins,sans-serif;margin:0 0 8px;color:#f6efe9}.lp-st span{display:block;font:300 14.5px/1.55 Poppins,sans-serif;color:rgba(246,239,233,.82)}"
+".lp-oc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;max-width:1180px;margin:0 auto}"
+".lp-oc a{display:flex;flex-direction:column;background:#fff;border:1px solid #e8ddd0;border-radius:24px;padding:12px 12px 22px;text-align:center;text-decoration:none!important;color:#2b2916;box-shadow:0 18px 40px -30px rgba(43,41,22,.45);transition:transform .2s,border-color .2s}"
+".lp-oc a:hover{transform:translateY(-2px);border-color:#dfae58}"
+".lp-oc .ph{aspect-ratio:16/10;border-radius:16px;display:grid;place-items:center;margin-bottom:16px}.lp-oc .ph svg{width:54px;height:54px;color:#a65a14}"
+".lp-oc .sg{background:radial-gradient(100% 100% at 30% 20%,#eef0df,#e8e9d6)}.lp-oc .gd{background:radial-gradient(100% 100% at 30% 20%,#f9ecd2,#f1dcb1)}.lp-oc .pc{background:radial-gradient(100% 100% at 30% 20%,#fbe9da,#f3d6bd)}"
+".lp-oc b{display:block;font:600 17px/1.3 Poppins,sans-serif;margin:0 0 6px;padding:0 10px}.lp-oc span{display:block;font:300 14px/1.55 Poppins,sans-serif;color:#6f6656;padding:0 12px}"
+".lp-oc i{display:inline-flex;align-self:center;align-items:center;gap:6px;margin-top:14px;font:500 14px/1.3 Poppins,sans-serif;font-style:normal;color:#2b2916;border-bottom:1.5px solid #dfae58;padding-bottom:3px}.lp-oc i svg{width:16px;height:16px}"
+"html body :is(.cef-in.cx-2col,#cml-natal .cmn-panel)"+X+"{background:transparent!important;border:0!important;box-shadow:none!important;padding:0!important;max-width:1260px;margin-left:auto!important;margin-right:auto!important}"
+"html body :is(.cef-in.cx-2col,#cml-natal .cmn-panel)"+X+":before,html body :is(.cef-in.cx-2col,#cml-natal .cmn-panel)"+X+":after{display:none!important}"
+"html body :is(.cx-side,#cml-natal .nx-side)"+X+"{border-radius:32px!important;background:"+OL+"!important;border:0!important;box-shadow:0 30px 60px -40px rgba(43,41,22,.6)!important}"
+"html body :is(.cml-cx-faq,#cml-natal .nx-faq)"+X+"{max-width:820px!important;margin:84px auto 0!important;text-align:left}"
+"html body :is(.cml-cx-faq,#cml-natal .nx-faq) details"+X+"{background:#fff!important;border:1px solid #e8ddd0!important;border-radius:22px!important;overflow:hidden;margin:0 0 12px!important;box-shadow:none!important}"
+"html body :is(.cml-cx-faq,#cml-natal .nx-faq) summary"+X+"{padding:20px 22px!important;font:600 15.5px/1.4 Poppins,sans-serif!important;color:#2b2916!important}"
+"html body :is(.cml-cx-faq,#cml-natal .nx-faq) details>p"+X+"{padding:0 22px 20px!important;margin:0!important;font:300 14.5px/1.6 Poppins,sans-serif!important;color:#4a4636!important}"
+"html body :is(.cml-cx-end,#cml-natal .nx-end)"+X+"{max-width:none!important;width:auto!important;margin:84px calc(50% - 50vw) -40px!important;padding:0!important;background:transparent!important}"
+"html body :is(.cml-cx-end,#cml-natal .nx-end) .in"+X+"{position:relative;isolation:isolate;overflow:hidden;display:flex!important;flex-direction:column!important;align-items:center!important;text-align:center!important;gap:20px!important;max-width:none!important;margin:0!important;padding:72px 24px!important;border:0!important;border-radius:40px 40px 0 0!important;background:"+OL+"!important;box-shadow:none!important}"
+"html body :is(.cml-cx-end,#cml-natal .nx-end) h2"+X+"{font:700 clamp(28px,4vw,46px)/1.12 Poppins,sans-serif!important;color:#f6efe9!important;-webkit-text-fill-color:#f6efe9!important;margin:0 0 10px!important}"
+"html body :is(.cml-cx-end,#cml-natal .nx-end) h2 em"+X+"{font-weight:300!important;font-style:italic!important;color:#f3d48b!important;-webkit-text-fill-color:#f3d48b!important}"
+"html body :is(.cml-cx-end,#cml-natal .nx-end) p"+X+"{color:rgba(246,239,233,.86)!important;-webkit-text-fill-color:rgba(246,239,233,.86)!important;font:300 16px/1.6 Poppins,sans-serif!important;margin:0 auto!important;max-width:56ch}"
+"html body :is(.cml-cx-end,#cml-natal .nx-end) a.b"+X+"{display:inline-flex!important;align-items:center;gap:10px;min-height:52px;padding:0 28px!important;border-radius:999px!important;background:#dfae58!important;color:#0b0a08!important;-webkit-text-fill-color:#0b0a08!important;font:600 15.5px/1.2 Poppins,sans-serif!important;text-decoration:none!important;border:0!important}"
+"html body :is(.cml-cx-end,#cml-natal .nx-end) a.b *"+X+"{color:#0b0a08!important;-webkit-text-fill-color:#0b0a08!important}"
+"html body #cml-natal .cmn-lights"+X+"{display:none!important}"
+"html body #cml-natal .cmn-val"+X+"{max-width:1180px;margin:22px auto 0!important;background:#fffaf5!important;border:1px solid #e8ddd0!important;border-radius:20px!important;box-shadow:none!important}"
+"@media(max-width:900px){.lp-steps,.lp-oc{grid-template-columns:minmax(0,1fr)}.lp-band"+X+"{padding:56px 16px!important;margin-top:56px!important}.lp-sh"+X+"{margin:56px auto 28px!important;padding:0 4px}.lp-oc .ph{aspect-ratio:21/9}html body :is(.cml-cx-end,#cml-natal .nx-end) .in"+X+"{padding:52px 18px!important;border-radius:32px 32px 0 0!important}}"
+"html.cml-blk body .cmc"+X+"{--c-bg:#fffaf5;--c-card:#ffffff;--c-line:#e8ddd0;--c-ink:#2b2916;--c-mut:#6f6656;--c-soft:#f6efe9;--c-acc:#a65a14;--c-gold:#dfae58;--c-hero1:#565229;--c-hero2:#403d1e;--c-hink:#f6efe9}"
+"html.cml-blk body .cmc-bd.ok"+X+",html.cml-blk body .cmc-gd"+X+"{color:#565229!important}"
+"html body.template-account-orders main h1 i"+X+",html body.template-account-orders main h1 em"+X+"{color:#a65a14!important;-webkit-text-fill-color:#a65a14!important}";
var css="";
var isCef=/^\/encontre-seu-cha\/?$/.test(P),isNat=/^\/presentes-de-natal\/?$/.test(P),isAcc=/^\/account\/?$/.test(P);
if(!isCef&&!isNat&&!isAcc)return;
css=COM;if(isCef)css+=hero("html body.cml-cef",".cml-cx-hero .in",".tx","figure.pic");if(isNat)css+=hero("html body #cml-natal",".cmn-hero",".nx-tx","figure.nx-pic");
function addCss(){if(D.getElementById("cml-34"))return;var s=D.createElement("style");s.id="cml-34";s.textContent=css;(D.head||H).appendChild(s)}
function band(k,h,steps){var s=D.createElement("section");s.className="lp-band";s.setAttribute("aria-label",k);s.innerHTML='<div class="lp-sh"><p class="k">'+k+'</p><h2>'+h+'</h2></div><div class="lp-steps">'+steps.map(function(x,i){return'<div class="lp-st"><span class="n">'+(i+1)+'</span><b>'+x[0]+'</b><span>'+x[1]+'</span></div>'}).join("")+'</div>';return s}
function cap(fig,b,t){if(!fig||fig.querySelector("figcaption"))return;var c=D.createElement("figcaption");c.innerHTML="<b>"+b+"</b><span>"+t+"</span>";fig.appendChild(c)}
function shHead(h2){if(!h2)return;var w=h2.parentElement;if(!w||w.classList.contains("lp-sh"))return;w.classList.add("lp-sh")}
function cef(){var h=D.querySelector(".cml-cx-hero");if(!h)return false;cap(h.querySelector("figure.pic"),"Chá Misto Sereníssimo","40 g, rende até 20 xícaras");
 var h1c=h.querySelector("h1");if(h1c&&!h1c.querySelector("em"))h1c.innerHTML="Encontre <em>o seu chá.</em>";var q=D.getElementById("cef-quiz"),qh=D.querySelector(".cml-cx.cml-cx-h");if(qh)qh.classList.add("lp-sh");var qa=qh||q;if(q&&!D.querySelector(".lp-band")){qa.parentNode.insertBefore(band("Como funciona",'Simples assim, <em>em três toques.</em>',[["Conte como prefere","Escolha pelo momento do dia, pelo sabor ou por um ingrediente que você gosta."],["A gente indica","Mostramos os blends que combinam com você, com preparo e rendimento de cada um."],["Prepare o seu ritual","Cada pacote de 40 g rende até 20 xícaras, feito à mão na nossa cozinha em SC."]]),qa)}
 wrapHead(D.querySelector(".cml-cx-faq"));return!!q}
function wrapHead(fq){if(!fq||fq.querySelector(".lp-sh"))return;var h2=[].slice.call(fq.querySelectorAll("h2")).filter(function(x){return!x.closest("details")})[0];if(!h2)return;var k=h2.previousElementSibling;var w=D.createElement("div");w.className="lp-sh";h2.parentNode.insertBefore(w,k&&k.tagName!=="DETAILS"?k:h2);if(k&&k.tagName!=="DETAILS")w.appendChild(k);w.appendChild(h2);w.style.marginTop="0"}
function natTxt(){var r=D.querySelector("#cml-natal .cmn-panel");if(!r)return;var tw=D.createTreeWalker(r,NodeFilter.SHOW_TEXT,null),x,L=[];while(x=tw.nextNode())if(/de Natal/.test(x.nodeValue))L.push(x);L.forEach(function(t){t.nodeValue=t.nodeValue.replace(/Seu presente de Natal/g,"Seu presente").replace(/com o pre[cç]o de Natal/g,"com preço especial").replace(/ de Natal/g,"")})}
var natObs=0;function natWatch(){var r=D.querySelector("#cml-natal .cmn-panel");if(!r||natObs)return;natObs=1;natTxt();var t=0;new MutationObserver(function(){if(t)return;t=setTimeout(function(){t=0;natTxt()},60)}).observe(r,{childList:true,subtree:true,characterData:true})}
function nat(){var h=D.querySelector("#cml-natal .cmn-hero");if(!h)return false;
 var eb=h.querySelector(".cmn-eb"),h1=h.querySelector("h1"),ld=h.querySelector(".cmn-lead"),b=h.querySelector(".nx-cta a.b"),ch=h.querySelector(".nx-chips");
 if(eb&&h1&&!/jeito certo/.test(h1.textContent)){eb.textContent="Presentes Chef Mais Leve";if(h1)h1.innerHTML="Presente do jeito certo, <em>feito à mão.</em>";if(ld)ld.textContent="Para a família, para a equipe ou para clientes especiais: montamos a caixa com chás, snacks e granolas da nossa cozinha, escrevemos o cartão à mão e entregamos.";if(b)b.innerHTML='Montar meu presente <span aria-hidden="true">→</span>';if(ch)ch.innerHTML="<li>Presentes corporativos</li><li>Para toda a família</li><li>Cartão escrito à mão</li>";
  var lt=h.querySelector(".cmn-lights");if(lt)lt.remove()}
 cap(h.querySelector("figure.nx-pic"),"Caixa Chef Mais Leve","chás, snacks e cartão escrito à mão");
 var v=D.querySelector("#cml-natal .cmn-val b");if(v&&/Natal/.test(v.lastChild&&v.lastChild.nodeValue||""))v.lastChild.nodeValue="Validade com folga para presentear";
 var cmn=D.querySelector("#cml-natal .cmn"),nh=D.querySelector("#cml-natal .nx-h"),pn=D.getElementById("nx-montar");
 if(cmn&&pn&&!D.querySelector(".lp-oc")){var oc=D.createElement("section");oc.setAttribute("aria-label","Para cada ocasião");
  oc.innerHTML='<div class="lp-sh"><p class="k">Para cada ocasião</p><h2>Um presente que diz <em>muito sobre quem dá.</em></h2><p class="lead">Chás, snacks e granolas feitos à mão, numa caixa pronta para entregar. Do brinde da equipe ao presente da família inteira.</p></div><div class="lp-oc">'
  +'<a href="https://wa.me/554791571974?text=Ol%C3%A1!%20Quero%20presentes%20corporativos%20da%20Chef%20Mais%20Leve." target="_blank" rel="noopener"><span class="ph sg">'+ico("brief")+'</span><b>Presentes corporativos</b><span>Lembrancinhas para equipe, clientes e parceiros, com cartão e quantidade do seu jeito.</span><i>Falar com a gente '+ico("arrow")+'</i></a>'
  +'<a href="#nx-montar" data-lp-go="1"><span class="ph gd">'+ico("heart")+'</span><b>Para toda a família</b><span>Uma caixa para cada pessoa querida, montada do jeito de quem vai ganhar.</span><i>Montar agora '+ico("arrow")+'</i></a>'
  +'<a href="/kits-presentes/"><span class="ph pc">'+ico("gift")+'</span><b>Natal do jeito certo</b><span>Kits prontos com validade com folga e cartão escrito à mão, para entregar sem correria.</span><i>Ver kits prontos '+ico("arrow")+'</i></a></div>';
  var after=D.querySelector("#cml-natal .cmn-val")||h;var fq=D.querySelector("#cml-natal .nx-faq");if(fq)fq.parentNode.insertBefore(oc,fq);else after.parentNode.appendChild(oc);
  after.parentNode.insertBefore(band("Como funciona",'Simples assim, <em>do começo ao laço.</em>',[["Conte para quem é","Quantas pessoas vão ganhar e se a entrega vai para você ou direto para elas."],["Monte a caixa","Escolha a caixa, os itens da nossa cozinha e escreva a mensagem do cartão."],["A gente embala e entrega","Montamos tudo à mão, passamos o cartão à mão e enviamos com cuidado."]]),after.nextSibling);
  oc.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("[data-lp-go]");if(!a)return;e.preventDefault();var t=(nh||pn).getBoundingClientRect().top+scrollY-84;try{scrollTo({top:t,behavior:"smooth"})}catch(x){scrollTo(0,t)}})}
 if(nh&&!nh.__t){nh.__t=1;var k=nh.querySelector(".k"),h2=nh.querySelector("h2");if(k)k.textContent="Monte o seu presente";if(h2)h2.innerHTML="Você escolhe, <em>a gente cuida do resto.</em>";nh.classList.add("lp-sh")}
 wrapHead(D.querySelector("#cml-natal .nx-faq"));natWatch();
 return!!(pn&&D.querySelector(".lp-oc"))}
var n=0;function loop(){addCss();var ok=true;try{if(isCef)ok=cef();if(isNat)ok=nat()}catch(e){}if((!ok||n<14)&&++n<60)setTimeout(loop,n<20?250:800)}
if(D.body)loop();else D.addEventListener("DOMContentLoaded",loop)}catch(e){}})();


/* 35) Quem somos no padrao do Clube (21/11/2026): abertura em oliva com foto em moldura (foto da equipe), textos com contraste, fachada da loja no bloco "Da nossa casa para a sua", fechamento com letra clara. Fotos novas em IMG (vazio = mantem a foto atual). */
;(function(){try{if(window.__cml35)return;window.__cml35=1;if(!/^\/quem-somos\/?$/.test(location.pathname))return;var D=document,H=D.documentElement;
var IMG={equipe:"",fachada:""};
var X=":not(#s1):not(#s2):not(#s3):not(#s4):not(#s5)",S="html body .cml-story";
var OL="radial-gradient(120% 120% at 18% 0%,#5b5730 0%,#565229 42%,#403d1e 100%)";
var css=""
+S+" .st-hero"+X+"{display:grid!important;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)!important;gap:56px!important;align-items:center!important;height:auto!important;min-height:0!important;margin:0 calc(50% - 50vw) 0!important;padding:72px max(24px,calc(50vw - 600px)) 84px!important;border-radius:0 0 40px 40px!important;overflow:hidden!important;background:"+OL+"!important;box-shadow:none!important}"
+S+" .st-hero"+X+":before,"+S+" .st-hero"+X+":after{display:none!important}"
+S+" .st-hero .st-hero-t"+X+"{position:static!important;order:1;inset:auto!important;padding:0!important;background:none!important;text-align:left!important;max-width:560px}"
+S+" .st-hero .st-hero-t span"+X+"{display:block;margin:0 0 14px!important;font:500 11.5px/1.3 Poppins,sans-serif!important;letter-spacing:.18em!important;text-transform:uppercase!important;color:#dfae58!important;-webkit-text-fill-color:#dfae58!important}"
+S+" .st-hero .st-hero-t h2"+X+"{margin:0 0 16px!important;font:700 clamp(30px,3.4vw,44px)/1.12 Poppins,sans-serif!important;color:#f6efe9!important;-webkit-text-fill-color:#f6efe9!important;text-align:left!important}"
+S+" .st-hero .st-hero-t h2 em"+X+"{font-weight:300!important;font-style:italic!important;color:#f3d48b!important;-webkit-text-fill-color:#f3d48b!important}"
+S+" .st-hero .st-hero-t p.lead"+X+"{margin:0!important;max-width:48ch;font:300 17px/1.6 Poppins,sans-serif!important;color:rgba(246,239,233,.86)!important}"
+S+" .st-hero figure.st-pic"+X+"{order:2;position:relative;margin:0!important;justify-self:center;width:100%;max-width:500px;padding:12px;border-radius:36px;background:#fff;box-shadow:0 40px 80px -40px rgba(20,18,8,.55)}"
+S+" .st-hero figure.st-pic img"+X+"{position:static!important;display:block;width:100%!important;height:auto!important;aspect-ratio:4/5;object-fit:cover;object-position:center 30%;border-radius:26px!important;filter:none!important;opacity:1!important}"
+S+" .st-hero figure.st-pic figcaption"+X+"{position:absolute;left:24px;right:24px;bottom:24px;display:grid;gap:2px;padding:14px 18px;border-radius:20px;background:rgba(43,41,22,.78);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}"
+S+" .st-hero figure.st-pic figcaption b"+X+"{font:600 15px/1.2 Poppins,sans-serif;color:#f3d48b}"+S+" .st-hero figure.st-pic figcaption span"+X+"{font:300 13px/1.4 Poppins,sans-serif;color:#f6efe9}"
+S+" .st-k"+X+"{color:#a65a14!important;-webkit-text-fill-color:#a65a14!important}"
+S+" .st-img img.cml-fach"+X+"{object-position:center 40%}"
+S+" .cml-st-end"+X+" :is(p,span,small,b,em,i)"+X+"{color:#f6efe9!important;-webkit-text-fill-color:#f6efe9!important}"
+"html body #ns-section-heading"+X+"{display:none!important}"+S+" .cml-st-end .cml-st-sign b"+X+X+",html body .cml-story .cml-st-end em"+X+X+"{color:#f3d48b!important;-webkit-text-fill-color:#f3d48b!important}"
+S+" .cml-st-end .cml-st-sign"+X+"{color:rgba(246,239,233,.8)!important;-webkit-text-fill-color:rgba(246,239,233,.8)!important}"
+S+" .cml-st-end a.cml-st-btn.alt"+X+"{color:#f6efe9!important;-webkit-text-fill-color:#f6efe9!important;border-color:#dfae58!important}"
+"@media(max-width:900px){"+S+" .st-hero"+X+"{grid-template-columns:minmax(0,1fr)!important;gap:28px!important;padding:40px 18px 48px!important;border-radius:0 0 32px 32px!important}"+S+" .st-hero figure.st-pic"+X+"{max-width:380px}}";
function run(){var h=D.querySelector(".cml-story .st-hero");if(!h)return false;
 if(!D.getElementById("cml-35")){var s=D.createElement("style");s.id="cml-35";s.textContent=css;(D.head||H).appendChild(s)}
 if(!h.__x){h.__x=1;var img=h.querySelector(":scope>img"),t=h.querySelector(".st-hero-t");
  if(t&&!t.querySelector("p.lead")){var p=D.createElement("p");p.className="lead";p.textContent="Uma cozinha de família em Santa Catarina: a Cris cria as receitas, o Thierry cuida de levar até você, e cada pacote sai das nossas mãos.";t.appendChild(p)}
  if(img){var f=D.createElement("figure");f.className="st-pic";if(IMG.equipe){img.src=IMG.equipe;img.removeAttribute("srcset");img.alt="A família Chef Mais Leve em frente à nossa loja"}f.appendChild(img);var c=D.createElement("figcaption");c.innerHTML=IMG.equipe?"<b>Quem faz a Chef Mais Leve</b><span>a nossa família, na porta da nossa casa</span>":"<b>Feito à mão</b><span>chás e snacks da nossa cozinha</span>";f.appendChild(c);h.appendChild(f)}}
 if(IMG.fachada){var rows=[].slice.call(D.querySelectorAll(".cml-story .st-row"));rows.forEach(function(r){var k=r.querySelector(".st-k");if(k&&/nossa casa/i.test(k.textContent)){var im=r.querySelector(".st-img img");if(im&&!im.classList.contains("cml-fach")){im.src=IMG.fachada;im.removeAttribute("srcset");im.alt="Fachada da loja Chef Mais Leve";im.classList.add("cml-fach")}}})}
 return true}
var n=0;(function l(){var ok=false;try{ok=run()}catch(e){ok=true}if(!ok&&++n<60)setTimeout(l,150)})();
}catch(e){}})();


/* 36) Cards mais limpos com o botao Comprar (21/11/2026): sem o selo repetido "Mais vendido" e sem a linha de cashback no card (fica na pagina do produto), Espiar aparece sobre a foto ao passar o mouse, 3 por linha na categoria; "Adicione a sua compra" do carrinho em grade de 3. Faixa de beneficios da home em uma linha so no celular. Menu do celular compacto, sem rolagem, com a logo visivel. */
;(function(){try{if(window.__cml36)return;window.__cml36=1;var D=document,H=D.documentElement;
var X=":not(#u1):not(#u2):not(#u3):not(#u4):not(#u5)";
var BAG="url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3z'/%3E%3Cpath d='M9 8.5V7a3 3 0 0 1 6 0v1.5'/%3E%3Cpath d='M12 12.5v4M10 14.5h4'/%3E%3C/svg%3E\")";
var CIRC="width:44px!important;height:44px!important;min-width:0!important;min-height:0!important;padding:0!important;margin:0!important;border:0!important;border-radius:50%!important;font-size:0!important;line-height:0!important;color:transparent!important;-webkit-text-fill-color:transparent!important;text-indent:-999px;overflow:hidden!important;background:#a65a14 "+BAG+" center/20px no-repeat!important;box-shadow:0 10px 22px -10px rgba(43,41,22,.55)!important;cursor:pointer";
var css=""
+"html body .js-item-product .c2-ey"+X+",html body .js-item-product .c2-cb"+X+"{display:none!important}"
+"html body .js-item-product"+X+"{position:relative!important;container-type:inline-size}"
+"html body .js-item-product .cml-esp-row"+X+"{position:absolute!important;top:calc(100cqw - 52px)!important;left:18px!important;right:auto!important;z-index:3;margin:0!important;opacity:0;transition:opacity .2s}"
+"html body .js-item-product:hover .cml-esp-row"+X+",html body .js-item-product:focus-within .cml-esp-row"+X+"{opacity:1}"
+"html body .js-item-product .cml-esp-row .cml-esp"+X+"{padding:7px 12px!important;border-radius:999px!important;background:rgba(255,250,245,.94)!important;border:1px solid #e8ddd0!important;font:500 12px/1 Poppins,sans-serif!important}"
+"@media (hover:none),(max-width:767px){html body .js-item-product .cml-esp-row"+X+"{display:none!important}}"
+"@media(min-width:1100px){html body .js-product-table.grid-md-4"+X+"{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:28px!important}}"
+"html body .js-item-product .js-item-submit-container input.js-addtocart"+X+"{min-height:44px!important;border-radius:999px!important;font:600 14.5px/1 Poppins,sans-serif!important;text-transform:none!important;letter-spacing:0!important}"
+"html body #related-products-notification .products-section-container"+X+"{padding:0!important}"
+"html body #related-products-notification .swiper-wrapper"+X+"{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:12px!important;transform:none!important;width:100%!important;height:auto!important}"
+"html body #related-products-notification .swiper-wrapper>*"+X+"{width:auto!important;margin:0!important;min-width:0!important}"
+"html body #related-products-notification .swiper-wrapper>*:nth-child(n+4)"+X+"{display:none!important}"
+"html body #related-products-notification :is([class*=swiper-button],[class*=swiper-pagination],[class*=-control])"+X+"{display:none!important}"
+"html body #related-products-notification .product-item-information"+X+"{padding:10px 10px 12px!important}"
+"html body #related-products-notification .product-item-name"+X+"{font-size:13px!important;line-height:1.3!important;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.6em}"
+"html body #related-products-notification :is(.c2-ey,.c2-cb,.cml-esp-row,.cml-avq)"+X+"{display:none!important}"
+"html body #related-products-notification .modal-body"+X+"{padding:0 22px 22px!important}"
+"html body #related-products-notification .js-alert-add-to-cart-private"+X+"{gap:12px!important;align-items:center!important;margin-bottom:6px}"
+"html body #related-products-notification .js-alert-add-to-cart-private :is(.btn,a.btn)"+X+"{display:flex!important;align-items:center;justify-content:center;min-height:46px!important;background:#a65a14!important;border-color:#a65a14!important;color:#fff!important;text-transform:none!important;letter-spacing:0!important;border-radius:999px!important;font:600 14.5px/1 Poppins,sans-serif!important}"
+"html body #related-products-notification .related-cart-notification"+X+"{padding:18px 16px 16px!important;border-radius:22px!important;background:#fffaf5!important;border:1px solid #e8ddd0!important}"
+"@media(max-width:640px){html body #related-products-notification .swiper-wrapper"+X+"{grid-template-columns:repeat(2,minmax(0,1fr))!important}html body #related-products-notification .swiper-wrapper>*:nth-child(n+3)"+X+"{display:none!important}}"
+"html body #related-products-notification .js-related-products-notification"+X+"{background:transparent!important;border:0!important;box-shadow:none!important}"
+"html body #related-products-notification .related-cart-notification"+X+"{margin:8px 0 0!important}"
+"html body #related-products-notification .products-section-title-container"+X+"{margin-bottom:14px!important}"
+"html body .js-desktop-dropdown.desktop-dropdown"+X+"{background:#fffaf5!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}"
+"html body section.cef .cef-in"+X+"{outline:0!important}"
/* varredura de contraste 21/11 */
+"html body #cml-hl .cml-hl-c.t-nat .k"+X+",html body #cml-hl .cml-hl-c.t-clb .k"+X+",html body .c7-ft .c7-fe"+X+"{color:#f3d48b!important}"
+"html body #cml-hl .cml-hl-c.t-cef"+X+"{background:radial-gradient(120% 90% at 25% 15%,#a65a14 0%,#8a4a10 55%,#6b3a0c 100%)!important}"
+"html body #cml-hl .cml-hl-c.t-cef em"+X+",html body #cml-hl .cml-hl-c.t-cef small"+X+",html body #cml-hl .cml-hl-c.t-cef .k"+X+"{color:#fbe6b4!important}"
+"html body #cml-hl .cml-hl-c.t-cef p"+X+"{color:#fffaf5!important;opacity:1!important}"
+"html body a.c1-feat h3 em"+X+"{color:#fbe6b4!important}"
+"html body aside.cml-rkp .sc i"+X+"{color:#b5741c!important}"
+"html body .ph .bts .f"+X+"{background:#0a6fd1!important}"
+"html body :is(.lp-band,.cx-side,.cml-cx-hero,.cmn-hero,.nx-side,.nx-end,.st-hero,.cml-st-end) :is(.k,.eb,small,.cmn-eb,.crumb,.nx-k)"+X+X+"{color:#f3d48b!important}"
+"html body .c2-cbn h2"+X+X+",html body .c2-cbn h1"+X+X+"{color:#f6efe9!important}"
+"html body .c2-cbn :is(h1,h2) em"+X+X+",html body .c2-cbn :is(.k,.cml-hw)"+X+X+"{color:#f3d48b!important}"
+"html body .c2-cbn p:not(.k)"+X+X+"{color:#f6efe9!important;opacity:.92!important}"
+"html body .c2-cbn .cml-hw"+X+X+"{display:block!important;margin:6px 0 4px!important;line-height:1.1!important;transform:rotate(-2deg)}"
+"html body .js-head-main [class*=novo],html body .c1-nb"+X+"{color:#fff!important}"
+"html body #cml-bko p.c1-ed"+X+"{display:none!important}"
+"html body .cml-igx .tx .cml-crt"+X+"{display:grid;gap:6px;margin-top:28px;padding:18px 20px;border:1px solid #e8ddd0;border-radius:20px;background:#fffaf5;text-align:left}"
+"html body .cml-igx .tx .cml-crt .k"+X+"{font:500 11px/1.3 Poppins,sans-serif!important;letter-spacing:.16em!important;text-transform:uppercase;color:#a65a14!important;margin:0!important}"
+"html body .cml-igx .tx .cml-crt b"+X+"{font:700 18px/1.25 Poppins,sans-serif;color:#2b2916}"
+"html body .cml-igx .tx .cml-crt b em"+X+"{font-weight:300;font-style:italic;color:#a65a14}"
+"html body .cml-igx .tx .cml-crt p"+X+"{margin:0!important;font:400 14px/1.5 Poppins,sans-serif!important;color:#6f6656!important}"
+"html body .cml-igx .tx .cml-crt a"+X+"{justify-self:start;margin-top:4px;font:600 14.5px/1.3 Poppins,sans-serif;color:#a65a14!important;text-decoration:none;border-bottom:1.5px solid #dfae58;padding-bottom:2px}"
+"html body .cml-igx .tx .cml-crt a:hover"+X+"{border-color:#a65a14}"
+"@media(max-width:767px){html body .st-hero"+X+"{margin-bottom:28px!important}}"
/* banners de categoria em cor da linha (21/11): sem foto, texto com contraste medido */
+"html body .c2-cbn>img"+X+"{display:none!important}"
+"html body .c2-cbn"+X+X+"{--b1:#FFFAF5;--b2:#F1E8DE;--ct:#2B2916;--ca:#8F4D11;--cs:#6F6656;background:radial-gradient(120% 140% at 0% 0%,var(--b1) 0%,var(--b1) 45%,var(--b2) 100%)!important;border:1px solid rgba(43,41,22,.07)!important;border-radius:28px!important;min-height:0!important;height:auto!important;overflow:hidden}"
+"html.cbn-cha body .c2-cbn"+X+X+"{--b1:#E4E9CF;--b2:#D3DBB2;--ca:#4E5A1E;--cs:#4A4F2E}"
+"html.cbn-snk body .c2-cbn"+X+X+"{--b1:#F7E1C9;--b2:#EFCFAA;--ca:#8A4A10;--cs:#5C4A36}"
+"html.cbn-kit body .c2-cbn"+X+X+"{--b1:#565229;--b2:#403D1E;--ct:#F6EFE9;--ca:#F3D48B;--cs:#E9E2D6}"
+"html.cbn-ace body .c2-cbn"+X+X+"{--b1:#EEE6DC;--b2:#E1D4C3;--ca:#6B4E2E;--cs:#5C5246}"
+"html body .c2-cbn .c2-cbt"+X+X+"{position:relative!important;inset:auto!important;max-width:640px!important;padding:clamp(28px,4vw,52px) clamp(24px,4.5vw,60px)!important;background:none!important}"
+"html body .c2-cbn :is(h1,h2)"+X+X+X+"{color:var(--ct)!important;margin:4px 0 0!important;font:700 clamp(30px,4vw,48px)/1.08 Poppins,sans-serif!important;text-shadow:none!important}"
+"html body .c2-cbn :is(.k,.cml-hw,h1 em,h2 em)"+X+X+X+"{color:var(--ca)!important;text-shadow:none!important}"
+"html body .c2-cbn p.s"+X+X+X+",html body .c2-cbn p:not(.k)"+X+X+X+"{color:var(--cs)!important;opacity:1!important;text-shadow:none!important;margin-top:10px!important}"
+"html body .c2-cbn:before"+X+",html body .c2-cbn:after"+X+"{display:none!important}"
+"html body .c2-cbn .c2-cbt"+X+X+X+"{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:10px!important;padding:44px 52px!important;transform:none!important;top:auto!important;left:auto!important}"
+"html body .c2-cbn .c2-cbt>*"+X+X+X+"{margin:0!important;transform:none!important}"
+"html body .c2-cbn .c2-cbt .cml-hw"+X+X+X+"{display:none!important}"
+"html body .c2-cbn .c2-cbt .k"+X+X+X+"{font:600 11px/1.2 Poppins,sans-serif!important;letter-spacing:.18em!important;text-transform:uppercase!important}"
+"html body .c2-cbn .c2-cbt :is(h1,h2)"+X+X+X+"{font:700 clamp(32px,4vw,46px)/1.05 Poppins,sans-serif!important;letter-spacing:-.01em!important}"
+"html body .c2-cbn .c2-cbt p:not(.k)"+X+X+X+"{font:400 15px/1.55 Poppins,sans-serif!important;max-width:46ch!important}"
+"html body .c2-cbn"+X+X+X+"{margin-bottom:28px!important}"
+"@media(max-width:767px){html body .c2-cbn .c2-cbt"+X+X+X+"{padding:28px 22px!important;gap:8px!important}html body .c2-cbn .c2-cbt :is(h1,h2)"+X+X+X+"{font-size:30px!important}html body .c2-cbn .c2-cbt p:not(.k)"+X+X+X+"{font-size:14px!important}}"
/* como funciona compacto e padrao unico (21/11): cabe em uma tela */
+"html body .lp-band"+X+X+"{margin:40px calc(50% - 50vw) 0!important;padding:40px max(20px,calc(50vw - 590px))!important}"
+"html body .lp-band .lp-sh"+X+X+"{margin:0 auto 22px!important}"
+"html body .lp-band .lp-sh h2"+X+X+"{font-size:clamp(22px,2.6vw,30px)!important;line-height:1.2!important}"
+"html body .lp-steps"+X+X+"{gap:12px!important}"
+"html body .lp-st"+X+X+"{display:grid!important;grid-template-columns:38px minmax(0,1fr);column-gap:14px;row-gap:3px;align-items:start;align-content:start;padding:18px 20px!important;border-radius:20px!important}"
+"html body .lp-st .n"+X+X+"{grid-row:span 2;width:38px!important;height:38px!important;margin:0!important;font-size:15px!important}"
+"html body .lp-st b"+X+X+"{margin:2px 0 0!important;font-size:16px!important}"
+"html body .lp-st span:not(.n)"+X+X+"{font-size:13.5px!important;line-height:1.5!important}"
+"@media(max-width:900px){html body .lp-band"+X+X+"{margin-top:28px!important;padding:28px 16px!important}html body .lp-band .lp-sh"+X+X+"{margin-bottom:16px!important}html body .lp-steps"+X+X+"{grid-template-columns:minmax(0,1fr)!important;gap:8px!important}html body .lp-st"+X+X+"{padding:12px 14px!important;grid-template-columns:32px minmax(0,1fr);column-gap:12px}html body .lp-st .n"+X+X+"{width:32px!important;height:32px!important;font-size:14px!important}html body .lp-st b"+X+X+"{font-size:15px!important}html body .lp-st span:not(.n)"+X+X+"{font-size:13px!important}}"
/* monte seu presente: banner mais curto, sem desvios; validade logo abaixo */
+"html body #cml-natal .cmn-hero .nx-chips"+X+X+",html body #cml-natal .cmn-hero .nx-cta a.l"+X+X+"{display:none!important}"
+"html body #cml-natal .cmn-val"+X+X+"{display:grid!important;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:6px 28px;padding:18px 26px!important;margin:20px auto 0!important}"
+"html body #cml-natal .cmn-val>b"+X+X+"{display:flex;align-items:center;gap:10px;margin:0!important;font:600 15px/1.3 Poppins,sans-serif!important;color:#2b2916!important}"
+"html body #cml-natal .cmn-val ul"+X+X+"{display:flex!important;flex-wrap:wrap;gap:8px;margin:0!important;padding:0!important;list-style:none!important}"
+"html body #cml-natal .cmn-val li"+X+X+"{margin:0!important;padding:7px 12px!important;border-radius:999px;background:#f6efe9;border:1px solid #e8ddd0;font:400 13px/1.2 Poppins,sans-serif!important;color:#4a4636!important}"
+"html body #cml-natal .cmn-val li strong"+X+X+"{font-weight:600;color:#2b2916}"
+"html body #cml-natal .cmn-val p"+X+X+"{grid-column:1/-1;margin:2px 0 0!important;font:400 13px/1.5 Poppins,sans-serif!important;color:#6f6656!important}"
+"@media(max-width:900px){html body #cml-natal .cmn-val"+X+X+"{grid-template-columns:minmax(0,1fr);padding:16px!important;margin:14px 12px 0!important}html body #cml-natal .cmn-val ul"+X+X+"{display:grid!important;grid-template-columns:1fr 1fr}html body #cml-natal .cmn-val li"+X+X+"{border-radius:12px;font-size:12px!important}}"
+"@media(min-width:901px){html body #cml-natal .cmn-hero"+X+X+",html body .cml-cx-hero .in"+X+X+"{padding-top:40px!important;padding-bottom:40px!important}html body #cml-natal .cmn-hero figure.nx-pic"+X+X+",html body .cml-cx-hero figure.pic"+X+X+"{width:min(400px,100%)!important;height:auto!important;justify-self:end!important}html body #cml-natal .cmn-hero figure.nx-pic img"+X+X+",html body .cml-cx-hero figure.pic img"+X+X+"{width:100%!important;height:auto!important;aspect-ratio:1/1;object-fit:cover}}"
+"html body :is(#cml-natal .nx-h,.cml-cx.cml-cx-h).lp-sh"+X+X+"{margin:40px auto 24px!important}"
+"html body :is(#cml-natal .nx-h,.cml-cx.cml-cx-h).lp-sh h2"+X+X+"{font-size:clamp(24px,3vw,34px)!important;line-height:1.18!important}"
+"@media(max-width:900px){html body :is(#cml-natal .nx-h,.cml-cx.cml-cx-h).lp-sh"+X+X+"{margin:28px auto 16px!important}}"
/* Validade do Monte: lista em 2 colunas limpas (21/11) */
+"html body .cmn-val ul"+X+X+X+"{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px 16px!important;list-style:none!important;padding:0!important;margin:12px 0!important;text-align:left!important}"
+"html body .cmn-val li"+X+X+X+"{display:block!important;margin:0!important;padding:0!important;font-size:14px!important;line-height:1.4!important;text-align:left!important}"
+"html body .cmn-val li"+X+X+X+"::before{content:none!important;display:none!important}"
+"@media(max-width:640px){html body .cmn-val li"+X+X+X+"{font-size:13.5px!important}html body .cmn-val b"+X+X+X+"{font-size:15px!important}}"
/* Instagram no computador (21/11): celular inclinado no centro, posts enfileirados saindo para a esquerda, texto a direita, tudo em uma tela */
+"@media(min-width:900px){html body .cml-igx"+X+X+"{grid-template-columns:150px 290px minmax(0,1fr)!important;gap:44px!important;max-width:none!important;margin-left:0!important;margin-right:0!important;align-items:center!important}"
+"html body .cml-igx .cml-igm"+X+X+"{grid-column:1;grid-row:1;display:grid;gap:16px;justify-items:end;position:relative;z-index:2}"
+"html body .cml-igx .cml-igm a"+X+X+"{display:block;width:150px;aspect-ratio:1/1;border-radius:18px;border:4px solid #fff;background:#eee center/cover no-repeat;box-shadow:0 22px 40px -22px rgba(43,41,22,.6);opacity:0;transform:translateX(70%) rotate(-4deg) scale(.92);transition:transform .9s cubic-bezier(.2,.8,.2,1) calc(var(--i)*.14s),opacity .6s calc(var(--i)*.14s)}"
+"html body .cml-igx .cml-igm.on a"+X+X+"{opacity:1;transform:translateX(0) rotate(-4deg) scale(1)}"
+"html body .cml-igx .ph"+X+X+"{grid-column:2;grid-row:1;height:min(560px,calc(100vh - 170px))!important;width:auto!important;transform:rotate(-4deg)}"
+"html body .cml-igx .tx"+X+X+"{grid-column:3;grid-row:1}"
+"html body .cml-igx .pop"+X+X+"{display:none!important}"
+"html body .cml-igx .tx .cml-crt"+X+X+"{margin-top:22px!important}"
+"html body .cml-igx .sts"+X+X+"{gap:8px!important}html body .cml-igx .sts b"+X+X+"{font-size:13.5px!important}html body .cml-igx .sts small"+X+X+"{display:block!important;font-size:10px!important}}"
+"@media(min-width:1100px){html body .cml-igx"+X+X+"{grid-template-columns:150px 290px minmax(0,1fr) minmax(280px,360px)!important;gap:40px!important}html body .cml-igx .tx .cml-crt"+X+X+"{display:none!important}html body .cml-igx .cml-igp"+X+X+"{display:flex}}"
+".cml-igp{display:none;grid-column:4;grid-row:1;flex-direction:column;gap:12px;font-family:Poppins,sans-serif;color:#2b2916}.cml-igp .kk{margin:0;font:500 10.5px/1.2 Poppins,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#a65a14}.cml-igp .au{display:grid;grid-template-columns:1fr 1fr;gap:8px}.cml-igp .au div{padding:12px;border-radius:12px;border:1px solid #e8ddd0;background:#fffaf5}.cml-igp .au b{display:block;font:700 20px/1.1 Poppins,sans-serif;color:#2b2916}.cml-igp .au span{display:block;margin-top:3px;font:400 11.5px/1.35 Poppins,sans-serif;color:#6f6656}.cml-igp .cc{display:block;padding:14px 16px;border-radius:14px;border:1px solid #e8ddd0;background:#fffaf5;text-decoration:none!important;color:#2b2916!important}.cml-igp .cc:hover{border-color:#dfae58}.cml-igp .cc b{display:block;font:600 14.5px/1.3 Poppins,sans-serif}.cml-igp .cc span{display:block;margin-top:3px;font:300 12.5px/1.45 Poppins,sans-serif;color:#6f6656}.cml-igp .cc i{display:inline-block;margin-top:8px;padding-bottom:3px;border-bottom:1px solid #dfae58;font:600 13px/1 Poppins,sans-serif;font-style:normal;color:#a65a14}"
/* Instagram no celular (21/11): celular maior e inclinado, posts saem para o mesmo lado em fila, tudo em uma tela */
+"@media(max-width:899px){html body .cml-igx"+X+"{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr)!important;gap:16px 8px!important;padding:0 16px!important;align-items:center!important;overflow:hidden}"
+"html body .cml-igx .tx"+X+"{grid-column:1/-1!important;grid-row:1!important;max-width:none!important;justify-self:stretch!important;text-align:center!important}"
+"html body .cml-igx .tx>*"+X+"{text-align:center!important;margin-left:auto!important;margin-right:auto!important}"
+"html body .cml-igx .tx .ch"+X+"{display:none!important}"
+"html body .cml-igx .tx h2"+X+"{font-size:26px!important}"
+"html body .cml-igx .tx p"+X+"{font-size:13.5px!important;max-width:34ch!important;margin-top:8px!important}"
+"html body .cml-igx .ph"+X+"{grid-column:2!important;grid-row:2!important;width:100%!important;max-width:220px!important;height:auto!important;justify-self:end!important;transform:rotate(-6deg);margin:10px -4px 18px 0!important;border-radius:34px!important;padding:7px!important}"
+"html body .cml-igx .scr"+X+"{border-radius:28px!important}"
+"html body .cml-igx .cml-igm"+X+"{grid-column:1!important;grid-row:2!important;display:grid;gap:12px;justify-items:start;align-content:center;position:relative;z-index:2}"
+"html body .cml-igx .cml-igm a"+X+"{display:block;width:100%;max-width:118px;aspect-ratio:1/1;border-radius:16px;border:3px solid #fff;background:#eee center/cover no-repeat;box-shadow:0 18px 30px -18px rgba(43,41,22,.6);opacity:0;transform:translateX(85%) rotate(-6deg) scale(.9);transition:transform .8s cubic-bezier(.2,.8,.2,1) calc(var(--i)*.14s),opacity .5s calc(var(--i)*.14s)}"
+"html body .cml-igx .cml-igm.on a"+X+"{opacity:1;transform:translateX(0) rotate(-6deg) scale(1)}"
+"html body .cml-igx .cml-igb"+X+"{grid-column:1/-1!important;grid-row:3!important;display:grid;gap:12px;justify-items:center}"
+"html body .cml-igx .cml-igb .btn"+X+"{margin:0!important}"
+"html body .cml-igx .cml-igb .cml-crt"+X+"{margin:0!important;padding:14px 16px!important;width:100%;text-align:center!important;justify-items:center}"
+"html body .cml-igx .cml-igb .cml-crt p"+X+"{display:none!important}"
+"html body .cml-igx .cml-igb .cml-crt b"+X+"{font-size:16px!important}"
+"html body .cml-igx .tx p"+X+X+"{display:none!important}"
+"html body .cml-igx .tx h2"+X+X+"{font-size:24px!important;line-height:1.15!important}"
+"html body .cml-igx .ph"+X+X+"{max-width:200px!important;margin:6px -4px 10px 0!important}"
+"html body .cml-igx .cml-igm a"+X+X+"{max-width:104px!important}"
+"html body .cml-igx .cml-igb"+X+X+"{display:flex!important;flex-direction:column;align-items:stretch;gap:10px}"
+"html body .cml-igx .cml-igb .btn"+X+X+"{display:inline-flex!important;align-self:center;align-items:center;justify-content:center;min-height:44px;padding:0 26px!important;border-radius:999px!important;background:#a65a14!important;color:#fff!important;font:600 14px/1 Poppins,sans-serif!important;text-decoration:none!important;border:0!important}"
+"html body .cml-igx .cml-igb .cml-crt"+X+X+"{display:flex!important;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px!important;border:1px solid #e8ddd0;border-radius:16px;background:#fffaf5;text-align:left!important}"
+"html body .cml-igx .cml-igb .cml-crt .k"+X+X+"{display:none!important}"
+"html body .cml-igx .cml-igb .cml-crt b"+X+X+"{font:600 14px/1.3 Poppins,sans-serif!important;color:#2b2916}"
+"html body .cml-igx .cml-igb .cml-crt b em"+X+X+"{font-weight:300;font-style:italic;color:#a65a14}"
+"html body .cml-igx .cml-igb .cml-crt a"+X+X+"{flex:none;white-space:nowrap;font:600 13.5px/1.2 Poppins,sans-serif!important;color:#a65a14!important;text-decoration:none;border-bottom:1.5px solid #dfae58;padding-bottom:2px}"
+"@media(prefers-reduced-motion:reduce){html body .cml-igx .cml-igm a"+X+"{transition:none;opacity:1;transform:rotate(-6deg)}}}"
/* pagina da Black: cards com o botao Comprar visivel */
+".of3-p .bt.alt"+X+"{border-color:#a65a14!important}"
+"@media(max-width:767px){html body .c1-ben"+X+"{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;grid-auto-flow:row!important;grid-auto-columns:auto!important;gap:8px!important;overflow:visible!important;padding:12px 0!important;scroll-snap-type:none!important;border:0!important}"
+"html body .c1-ben>*"+X+"{min-width:0!important;width:auto!important;flex:none!important;display:flex!important;flex-direction:row!important;align-items:center!important;text-align:left!important;gap:10px!important;padding:12px!important;border:1px solid #e8ddd0!important;border-radius:16px!important;background:#fffaf5!important}"
+"html body .c1-ben>*:nth-child(3)"+X+"{order:4}html body .c1-ben>*:nth-child(4)"+X+"{order:5}"
+"html body .c1-ben>*:nth-child(5)"+X+"{order:3;grid-column:1/-1;padding:14px 16px!important;background:radial-gradient(120% 120% at 18% 0%,#5b5730 0%,#565229 42%,#403d1e 100%)!important;border-color:transparent!important}"
+"html body .c1-ben>*:nth-child(5) svg"+X+",html body .c1-ben>*:nth-child(5) svg *"+X+"{color:#f3d48b!important;stroke:#f3d48b!important}html body .c1-ben>*:nth-child(5) b"+X+"{color:#f6efe9!important;-webkit-text-fill-color:#f6efe9!important;font-size:14px!important}html body .c1-ben>*:nth-child(5) small"+X+"{color:rgba(246,239,233,.85)!important;-webkit-text-fill-color:rgba(246,239,233,.85)!important;font-size:12px!important}"
+"html body .c1-ben svg"+X+"{width:24px!important;height:24px!important;flex:none}"
+"html body .c1-ben span"+X+"{display:flex!important;flex-direction:column!important;gap:2px;min-width:0}"
+"html body .c1-ben b"+X+"{font:600 13px/1.2 Poppins,sans-serif!important;white-space:normal!important}"
+"html body .c1-ben small"+X+"{font:300 11px/1.3 Poppins,sans-serif!important;white-space:normal!important}}"
+"html body #nav-hamburger .c1-mlogo"+X+"{filter:none!important}"
+"html body #nav-hamburger .modal-body"+X+"{padding:4px 16px 16px!important;align-content:start!important;grid-auto-rows:auto!important}"+"html body #nav-hamburger .modal-body>.nav-list"+X+"{height:auto!important;min-height:0!important;flex:none!important}"
+"html body #nav-hamburger .nav-list .nav-list-link"+X+"{padding:11px 4px!important}"
+"html body #nav-hamburger .c1-mn .k"+X+"{margin:14px 0 8px!important}"
+"html body #nav-hamburger .c1-mn .c"+X+"{display:grid!important;grid-template-columns:1fr 1fr!important;gap:8px!important}"
+"html body #nav-hamburger .c1-mn .c a"+X+"{flex-direction:column!important;align-items:flex-start!important;gap:6px!important;padding:11px 12px!important;border-radius:16px!important;min-height:0!important}"
+"html body #nav-hamburger .c1-mn .c a svg"+X+"{width:20px!important;height:20px!important}"
+"html body #nav-hamburger .c1-mn .c a span"+X+"{font:600 13.5px/1.2 Poppins,sans-serif!important}"
+"html body #nav-hamburger .c1-mn .c a small"+X+"{display:block;margin-top:2px;font:300 11px/1.3 Poppins,sans-serif!important}"
+"html body #nav-hamburger .c1-mn .c a.nat small"+X+",html body #nav-hamburger .c1-mn .c a.nat span"+X+"{color:#f6efe9!important;-webkit-text-fill-color:#f6efe9!important}"
+"html body #nav-hamburger .c1-mn .c a.nat svg"+X+"{color:#f3d48b!important}"
+"html body #nav-hamburger .c1-mn .acc"+X+"{display:grid!important;grid-template-columns:1fr 1fr!important;gap:0 12px}"
+"html body #nav-hamburger .c1-mn .acc a"+X+"{padding:11px 4px!important;font-size:14px!important}";
function add(){if(D.getElementById("cml-36"))return;var s=D.createElement("style");s.id="cml-36";s.textContent=css;(D.head||H).appendChild(s)}
function ben(){[].forEach.call(D.querySelectorAll(".c1-ben"),function(b){var n=b.children.length;if(n&&b.style.getPropertyValue("--n")!=String(n))b.style.setProperty("--n",n)})}
function mv(){[].forEach.call(D.querySelectorAll(".js-item-product"),function(it){var s=it.querySelector(":scope .js-item-submit-container"),im=it.querySelector(".product-item-image-container");if(s&&im&&s.parentNode!==im)im.appendChild(s)})}
function crt(){var tx=D.querySelector(".cml-igx .tx");if(!tx||D.querySelector(".cml-crt"))return;var d=D.createElement("div");d.className="cml-crt";d.innerHTML='<span class="k">Creators Chef Mais Leve</span><b>Divulgue e seja um criador <em>mais leve</em></b><p>Faz conteúdo sobre chá, alimentação ou rotina leve? Cadastre-se e crie com a gente.</p><a href="https://creaty.com.br/chefmaisleve?utm_source=site&amp;utm_medium=home-instagram&amp;utm_campaign=seja-creator" target="_blank" rel="noopener">Quero ser creator<span aria-hidden="true"> ›</span></a>';tx.appendChild(d);var x=tx.parentNode;if(x&&!x.querySelector(".cml-igp")){var p=D.createElement("aside");p.className="cml-igp";p.setAttribute("aria-label","A Chef em números e parcerias");p.innerHTML='<p class="kk">A Chef em números</p><div class="au"><div><b>5,0</b><span>nota no Google</span></div><div><b>5 anos</b><span>de cozinha da família</span></div><div><b>2.700</b><span>pedidos pelo WhatsApp e feiras</span></div><div><b>6 países</b><span>já receberam a Chef</span></div></div><p class="kk">Parcerias</p><a class="cc" href="https://creaty.com.br/chefmaisleve?utm_source=site&amp;utm_medium=home-instagram&amp;utm_campaign=seja-creator" target="_blank" rel="noopener"><b>Creators</b><span>Faz conteúdo sobre chá, alimentação ou rotina leve? Crie com a gente.</span><i>Quero ser creator ›</i></a><a class="cc" href="https://wa.me/5547991571974?text=Ol%C3%A1!%20Quero%20falar%20sobre%20revenda%20ou%20parceria%20com%20a%20Chef%20Mais%20Leve." target="_blank" rel="noopener"><b>Revenda e empresas</b><span>Quer revender ou presentear em quantidade? Fale direto com o time responsável.</span><i>Falar no WhatsApp ›</i></a>';x.appendChild(p)}}
function cat(){var h=D.documentElement;if(h.__cat)return;h.__cat=1;var p=location.pathname;h.classList.add("cbn-"+(/^\/chas/.test(p)?"cha":/^\/snacks/.test(p)?"snk":/^\/kits/.test(p)?"kit":/^\/acessorios/.test(p)?"ace":"gen"))}
function igm(){var mob=window.innerWidth<=899;var x=D.querySelector(".cml-igx");if(!x||x.querySelector(".cml-igm"))return;var ph=x.querySelector(".ph"),tx=x.querySelector(".tx");var ps=[].slice.call(x.querySelectorAll(".grd a")).slice(0,3);if(!ph||!tx||ps.length<3)return;var m=D.createElement("div");m.className="cml-igm";m.innerHTML=ps.map(function(a,i){return'<a href="'+a.href+'" target="_blank" rel="noopener" aria-label="Ver post no Instagram" style="background-image:'+String(a.style.backgroundImage).replace(/"/g,"&quot;")+';--i:'+i+'"></a>'}).join("");x.insertBefore(m,ph);if(mob){var b=D.createElement("div");b.className="cml-igb";var bt=tx.querySelector(".btn"),cr=D.querySelector(".cml-crt");if(bt)b.appendChild(bt);if(cr)b.appendChild(cr);x.appendChild(b)}try{new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting)m.classList.add("on")})},{threshold:.25}).observe(m)}catch(e){m.classList.add("on")}}
function lbl(){try{cat()}catch(e){}try{crt()}catch(e){}try{igm()}catch(e){}[].forEach.call(D.querySelectorAll(".js-item-product input.js-addtocart"),function(i){if(!i.getAttribute("aria-label"))i.setAttribute("aria-label","Colocar na sacola");i.title="Colocar na sacola"})}
var k=0;function loop(){add();try{ben()}catch(e){}try{lbl()}catch(e){}if(++k<30)setTimeout(loop,k<10?300:1500)}
if(D.body)loop();else D.addEventListener("DOMContentLoaded",loop);
try{var mt=0;new MutationObserver(function(){if(mt)return;mt=1;var _n=performance.now(),_g=window.__cxg||(window.__cxg={t:0,c:0});if(_n-_g.t>50){_g.t=_n;_g.c=0}_g.c++;var _f=function(){mt=0;try{lbl()}catch(e){}};if(_g.c<12)Promise.resolve().then(_f);else setTimeout(_f,250)}).observe(D.documentElement,{childList:true,subtree:true})}catch(e){}}catch(e){}})();

/* 21/11/2026: aba do carrinho enxuta + carrinho completo como pre-checkout (order bump, mais pedidos, empresas) */
;(function(){try{var D=document;if(window.__cmlCx2)return;window.__cmlCx2=1;
var WA="https://wa.me/554791571974?text="+encodeURIComponent("Olá! Tenho uma empresa e quero comprar para os meus colaboradores. Podem me enviar o catálogo especial para empresas?");
var CSS=""
+"#modal-cart .cml-fg,#modal-cart .cml-esv,#modal-cart .cg-trig,#modal-cart .js-ajax-cart-list>div:not(.js-cart-item),#modal-cart .cml-cbk,#modal-cart .cml-cf>div:not([class]),#modal-cart .js-cart-total-container,#modal-cart .cml-pay,#modal-cart [id^=wallet-express],#modal-cart .cart-row,#modal-cart .cx2-hide,#modal-cart .cml-cf,#modal-cart .cx2-cp,#modal-cart .cx2-sub,#modal-cart .cx2-pay,#modal-cart .cx2-more{display:none!important}"
+"#modal-cart .modal-form{display:flex!important;flex-direction:column!important;height:100%!important;max-height:100%!important}#modal-cart .modal-header{flex:0 0 auto}#modal-cart .modal-body{flex:1 1 auto!important;min-height:0!important;overflow-y:auto!important;padding-bottom:16px!important}"
+"#modal-cart .cx2-ft{flex:0 0 auto;display:flex;align-items:center;gap:14px;padding:12px 20px calc(12px + env(safe-area-inset-bottom));background:#fffaf5;border-top:1px solid #ece2d6;font-family:Poppins,sans-serif;color:#2b2916}"
+"#modal-cart .cx2-ft .t{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:1px}#modal-cart .cx2-ft .l{font:400 12px/1.2 Poppins,sans-serif;color:#6f6656}#modal-cart .cx2-ft .v{font:700 19px/1.15 Poppins,sans-serif;color:#2b2916}#modal-cart .cx2-ft small{font:400 11.5px/1.3 Poppins,sans-serif;color:#6f6656}"
+"#modal-cart .cx2-ft .go{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;height:48px;padding:0 22px;border-radius:10px;background:#a65a14!important;color:#fff!important;font:600 14.5px/1 Poppins,sans-serif;text-decoration:none;white-space:nowrap}#modal-cart .cx2-ft .go:hover{background:#8f4c10!important;color:#fff!important}"
+".cx2-pg{max-width:1240px;margin:8px auto 48px;padding:0 20px;font-family:Poppins,sans-serif;color:#2b2916}"
+".cx2-steps{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin:0 0 18px;font:500 13px/1 Poppins,sans-serif;color:#6f6656}"
+".cx2-steps span{padding:8px 14px;border-radius:10px;background:#fffaf5;border:1px solid #ece2d6}.cx2-steps span.on{background:#565229;color:#f6efe9;border-color:#565229}"
+".cx2-k{font:600 12px/1 Poppins,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#a65a14;margin:0 0 8px}"
+".cx2-h{font:700 clamp(22px,2.2vw,28px)/1.2 Poppins,sans-serif;margin:0 0 16px}.cx2-h em{font-style:italic;font-weight:300;color:#a65a14}"
+".cx2-bump{display:flex;align-items:center;gap:16px;background:#fffaf5;border:1.5px dashed #dfae58;border-radius:16px;padding:16px;margin:0 0 36px}"
+".cx2-bump img{width:84px;height:84px;object-fit:cover;border-radius:12px;background:#fff;flex:0 0 84px}"
+".cx2-bump .t{flex:1;min-width:0}.cx2-bump b{display:block;font:600 15.5px/1.3 Poppins,sans-serif}.cx2-bump small{display:block;color:#6f6656;font-size:13px;margin-top:4px}"
+".cx2-bump .p{font:700 17px/1 Poppins,sans-serif;color:#a65a14;margin-top:6px}"
+".cx2-btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 18px;border-radius:10px;border:0;background:#dfae58;color:#0b0a08;font:600 14px/1 Poppins,sans-serif;cursor:pointer;white-space:nowrap;text-decoration:none}"
+".cx2-btn:hover{background:#d09d45}.cx2-btn.ol{background:transparent;border:1px solid #f6efe9;color:#f6efe9}"
+".cx2-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin:0 0 40px}"
+".cx2-c{background:#fffaf5;border:1px solid #ece2d6;border-radius:16px;padding:10px 10px 14px;display:flex;flex-direction:column;gap:6px}"
+".cx2-c a.i{display:block;border-radius:12px;overflow:hidden;background:#fff;aspect-ratio:1/1}.cx2-c img{width:100%;height:100%;object-fit:cover}"
+".cx2-c .n{font:500 14.5px/1.3 Poppins,sans-serif;color:#2b2916;text-decoration:none;min-height:38px}"
+".cx2-c .p{font:700 16px/1 Poppins,sans-serif;color:#a65a14}.cx2-c .p s{font-weight:400;font-size:12.5px;color:#8a8170;margin-left:6px}.cx2-c .cx2-btn{margin-top:auto;width:100%}"
+".cx2-b2b{display:grid;grid-template-columns:1.4fr 1fr;gap:20px;align-items:center;background:radial-gradient(110% 90% at 30% 20%,#565229 0%,#565229 45%,#403d1e 100%);color:#f6efe9;border-radius:18px;padding:clamp(24px,4vw,44px)}"
+".cx2-b2b .cx2-k{color:#f3d48b}.cx2-b2b .cx2-h{color:#f6efe9}.cx2-b2b .cx2-h em{color:#f3d48b}.cx2-b2b p{color:#e9e2d6;font-size:15px;line-height:1.6;margin:0}"
+".cx2-b2b .a{display:flex;flex-direction:column;gap:10px;align-items:flex-start}"
+"#modal-cart input[name=go_to_checkout],#modal-cart .cx2-cp .btn,#modal-cart .cx2-cp input,.cart-form input[name=go_to_checkout],.cart-form .coupon-input input,.cart-form .coupon-input .btn{border-radius:10px!important}"
+"@media(max-width:767px){.cx2-grid{grid-template-columns:1fr 1fr;gap:10px}.cx2-b2b{grid-template-columns:1fr}.cx2-bump{flex-wrap:wrap}.cx2-bump .cx2-btn{width:100%}}";
function css(){if(D.getElementById("cml-cx2"))return;var s=D.createElement("style");s.id="cml-cx2";s.textContent=CSS;(D.head||D.documentElement).appendChild(s)}
function num(t){return parseFloat(String(t||"").replace(/[^\d,]/g,"").replace(",","."))||0}
function brl(v){return "R$ "+v.toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".")}
function drawer(){var m=D.getElementById("modal-cart");if(!m)return;var fm=m.querySelector(".modal-form");if(!fm)return;
 var ft=m.querySelector(".cx2-ft");if(!ft){ft=D.createElement("div");ft.className="cx2-ft";ft.innerHTML='<div class="t"><span class="l">Subtotal</span><b class="v"></b><small>5x sem juros · 5% off no Pix</small></div><a class="go" href="/comprar/">Finalizar compra</a>';fm.appendChild(ft)}
 var sum=0,n=0;[].forEach.call(m.querySelectorAll(".js-cart-item .js-cart-item-subtotal"),function(e){sum+=num(e.textContent);n++});
 var v=ft.querySelector(".v"),s=brl(sum);if(v.textContent!==s)v.textContent=s;ft.style.display=n?"":"none"}
function inCart(){var n={};[].forEach.call(D.querySelectorAll(".cart-page-item .cart-item-name, #modal-cart .js-cart-item .cart-item-name"),function(e){n[e.textContent.trim()]=1});return n}
function add(id,btn){if(btn){btn.disabled=true;btn.textContent="Adicionando..."}fetch("/comprar/",{method:"POST",headers:{"X-Requested-With":"XMLHttpRequest"},body:new URLSearchParams({add_to_cart:String(id),quantity:"1"})}).then(function(){location.reload()}).catch(function(){location.reload()})}
function rank(cb){if(window.__cmlRk&&window.__cmlRk.items)return cb(window.__cmlRk.items);fetch("https://dzmlyrkzcdqicwfmxnxd.supabase.co/functions/v1/cml-rank").then(function(r){return r.json()}).then(function(j){cb(j.items||[])}).catch(function(){cb([])})}
function page(){if(location.pathname!=="/comprar/"||D.querySelector(".cx2-pg"))return;var f=D.querySelector("form.cart-form");if(!f||!D.querySelector(".cart-page-item"))return;
 [].forEach.call(D.querySelectorAll(".cart-form input[name=go_to_checkout]"),function(i){i.value="Ir para o pagamento"});
 var top=D.createElement("div");top.className="cx2-steps";top.innerHTML='<span class="on">1 · Carrinho</span><span>2 · Dados e entrega</span><span>3 · Pagamento</span>';f.parentNode.insertBefore(top,f);
 var pg=D.createElement("div");pg.className="cx2-pg";f.parentNode.insertBefore(pg,f.nextSibling);
 rank(function(items){var have=inCart();var free=items.filter(function(i){return !have[i.name]});
  var cheap=free.filter(function(i){return i.price<=60}).sort(function(a,b){return a.price-b.price})[0]||free[0];var h="";
  if(cheap){h+='<div class="cx2-bump"><img src="'+cheap.img+'" alt="" loading="lazy"><div class="t"><p class="cx2-k">Aproveite e leve junto</p><b>'+cheap.name+'</b><small>Um dos mais pedidos da casa, por um valor pequeno a mais no seu pedido.</small><div class="p">+ '+brl(cheap.price)+'</div></div><button type="button" class="cx2-btn" data-add="'+cheap.id+'">Adicionar ao pedido</button></div>'}
  var ACC=[{id:361796019,name:"Chaleira de Vidro com Filtro",price:109,de:199,url:"/produtos/chaleira-de-vidro-com-filtro/",img:"https://acdn-us.mitiendanube.com/stores/005/060/752/products/05_detalhe_filtro_madeira_1280-ccf3c0e622c8bd4ad217871039114077-640-0.webp"},{id:343267114,name:"Xícara Bird",price:45,de:49,url:"/produtos/xicara-bird/",img:"https://acdn-us.mitiendanube.com/stores/005/060/752/products/chatgpt-image-11_05_2026-15_16_03-e1836f45fb5027fdb917785233722285-640-0.webp"},{id:343268662,name:"Garrafa de Vidro Infusor",price:129,url:"/produtos/garrafa-de-vidro-infusor/",img:"https://acdn-us.mitiendanube.com/stores/005/060/752/products/chatgpt-image-11_05_2026-15_23_26-f6a30fbf45f0c0bcf717785238142226-640-0.webp"},{id:361795954,name:"Chaleira de Vidro com Infusor",price:219,de:299,url:"/produtos/chaleira-de-vidro-com-infusor/",img:"https://acdn-us.mitiendanube.com/stores/005/060/752/products/05_macro_detalhes_1280-2ea556c793db03668117871038051874-640-0.webp"}].filter(function(i){return !have[i.name]});var more=free.filter(function(i){return !cheap||i.id!==cheap.id}).concat(ACC).slice(0,4);
  if(more.length){h+='<p class="cx2-k">Os mais pedidos</p><h2 class="cx2-h">Complete <em>o seu pedido</em></h2><div class="cx2-grid">'+more.map(function(i){return '<div class="cx2-c"><a class="i" href="'+i.url+'"><img src="'+i.img+'" alt="" loading="lazy"></a><a class="n" href="'+i.url+'">'+i.name+'</a><div class="p">'+brl(i.price)+(i.de&&i.de>i.price?'<s>'+brl(i.de)+'</s>':'')+'</div><button type="button" class="cx2-btn" data-add="'+i.id+'">Adicionar</button></div>'}).join("")+'</div>'}
  h+='<div class="cx2-b2b"><div><p class="cx2-k">Para empresas</p><h2 class="cx2-h">Você tem empresa? <em>Presenteie a sua equipe.</em></h2><p>Empresas têm acesso a um catálogo especial, com condições para pedidos em quantidade, cartão personalizado e entrega para cada colaborador. O atendimento é feito pelo nosso WhatsApp.</p></div><div class="a"><a class="cx2-btn" href="'+WA+'" target="_blank" rel="noopener">Comprar para os colaboradores</a></div></div>';
  pg.innerHTML=h;[].forEach.call(pg.querySelectorAll("[data-add]"),function(b){b.addEventListener("click",function(){add(b.getAttribute("data-add"),b)})})})}
function run(){css();try{drawer()}catch(e){}try{page()}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",run);else run();
var t=0;new MutationObserver(function(){if(t)return;t=1;var _n=performance.now(),_g=window.__cxg||(window.__cxg={t:0,c:0});if(_n-_g.t>50){_g.t=_n;_g.c=0}_g.c++;var _f=function(){t=0;run()};if(_g.c<12)Promise.resolve().then(_f);else setTimeout(_f,200)}).observe(D.documentElement,{childList:true,subtree:true});
}catch(e){}})();

/* 21/11/2026: barra fixa "Acompanhe seu pedido", cantos mais sobrios, filtros recolhidos e escolha de grade nas categorias */
;(function(){try{var D=document;if(window.__cmlCx3)return;window.__cmlCx3=1;
var CSS=""
+".cx3-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 18px;padding:0 0 14px;border-bottom:1px solid #e8ddd0;font-family:Poppins,sans-serif;color:#2b2916}"
+".cx3-fbtn{display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 16px;border:1px solid #d8c8b4;border-radius:10px;background:#fffaf5;font:500 14px/1 Poppins,sans-serif;color:#2b2916;cursor:pointer}"
+".cx3-fbtn svg{width:18px;height:18px}.cx3-fbtn.on{background:#565229;border-color:#565229;color:#f6efe9}"
+".cx3-view{display:flex;align-items:center;gap:6px;font:400 13px/1 Poppins,sans-serif;color:#6f6656}.cx3-view span{margin-right:4px}"
+".cx3-view button{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border:1px solid #e0d3c3;border-radius:8px;background:#fffaf5;color:#6f6656;cursor:pointer;padding:0}"
+".cx3-view button svg{width:20px;height:20px}.cx3-view button.on{background:#565229;border-color:#565229;color:#f6efe9}"
+".cx3-view .m{display:none}"
+"@media(min-width:768px){html body .grid.cml-cgrid.c2-has.cx3-closed,html body .grid.cml-cgrid.cx3-closed{grid-template-columns:minmax(0,1fr)!important}html body .cml-cgrid.cx3-closed>div{grid-column:1/-1!important}.cml-cgrid.cx3-closed>aside.c2-side{display:none!important}"
+".cml-cgrid>div{min-width:0}html body .cml-cgrid.cx3-g2 .js-product-table.grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}html body .cml-cgrid.cx3-g3 .js-product-table.grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}html body .cml-cgrid.cx3-g4 .js-product-table.grid{grid-template-columns:repeat(4,minmax(0,1fr))!important}"
+".js-product-table>.product-item{min-width:0}}"
+"@media(max-width:767px){.cx3-fbtn{display:none}.cx3-bar{justify-content:flex-end;margin:0 0 12px;padding:0 0 10px}.cx3-view .d{display:none}.cx3-view .m{display:inline-flex}"
+"html body .cml-cgrid.cx3-m1 .js-product-table.grid{grid-template-columns:minmax(0,1fr)!important}html body .cml-cgrid.cx3-m2 .js-product-table.grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}"
+"}";
function css(){if(D.getElementById("cml-cx3"))return;var s=D.createElement("style");s.id="cml-cx3";s.textContent=CSS;(D.head||D.documentElement).appendChild(s)}
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
var IC='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></svg>';
function trk(){}
function sq(n){var r='';for(var i=0;i<n;i++)r+='<rect x="'+(3+i*(18/n))+'" y="5" width="'+(18/n-2)+'" height="14" rx="1.5"/>';return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">'+r+'</svg>'}
function cat(){var g=D.querySelector(".cml-cgrid");if(!g||g.__cx3||D.getElementById("cml-ch"))return;var col=g.querySelector(":scope>div");var t=g.querySelector(".js-product-table");if(!col||!t)return;g.__cx3=1;
 var side=g.querySelector(":scope>aside.c2-side");var open=ls("cx3-f")==="1";var dc=+(ls("cx3-dc")||0);var mc=+(ls("cx3-mc")||2);
 var bar=D.createElement("div");bar.className="cx3-bar";
 bar.innerHTML=(side?'<button type="button" class="cx3-fbtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg><span>Mostrar filtros</span></button>':'<span></span>')
 +'<div class="cx3-view"><span>Ver em</span><button type="button" class="d cx3-v" data-d="2" aria-label="2 por linha">'+sq(2)+'</button><button type="button" class="d cx3-v" data-d="3" aria-label="3 por linha">'+sq(3)+'</button><button type="button" class="d cx3-v" data-d="4" aria-label="4 por linha">'+sq(4)+'</button><button type="button" class="m cx3-v" data-m="1" aria-label="1 por linha">'+sq(1)+'</button><button type="button" class="m cx3-v" data-m="2" aria-label="2 por linha">'+sq(2)+'</button></div>';
 t.parentNode.insertBefore(bar,t);
 function apply(){if(side){g.classList.toggle("cx3-closed",!open);var fb=bar.querySelector(".cx3-fbtn");fb.classList.toggle("on",open);fb.style.setProperty("border-radius","10px","important");fb.querySelector("span").textContent=open?"Ocultar filtros":"Mostrar filtros"}
  var d=dc||(open||!side?3:4);g.classList.remove("cx3-g2","cx3-g3","cx3-g4","cx3-m1","cx3-m2");g.classList.add("cx3-g"+d,"cx3-m"+mc);var n=innerWidth<768?mc:d;[].forEach.call(g.querySelectorAll(".js-product-table"),function(x){var v="repeat("+n+",minmax(0,1fr))";if(x.style.getPropertyValue("grid-template-columns")!==v)x.style.setProperty("grid-template-columns",v,"important")});var key=n+"/"+open;if(window.__cx3n!==key){var first=window.__cx3n===undefined;window.__cx3n=key;setTimeout(function(){try{dispatchEvent(new Event("resize"))}catch(e){}},first?900:80)}[].forEach.call(bar.querySelectorAll(".cx3-v"),function(b){b.style.setProperty("border-radius","8px","important")});
  [].forEach.call(bar.querySelectorAll("[data-d]"),function(b){b.classList.toggle("on",+b.getAttribute("data-d")===d)});
  [].forEach.call(bar.querySelectorAll("[data-m]"),function(b){b.classList.toggle("on",+b.getAttribute("data-m")===mc)})}
 if(side)bar.querySelector(".cx3-fbtn").addEventListener("click",function(){open=!open;ls("cx3-f",open?"1":"0");apply()});
 [].forEach.call(bar.querySelectorAll("[data-d]"),function(b){b.addEventListener("click",function(){dc=+b.getAttribute("data-d");ls("cx3-dc",String(dc));apply()})});
 [].forEach.call(bar.querySelectorAll("[data-m]"),function(b){b.addEventListener("click",function(){mc=+b.getAttribute("data-m");ls("cx3-mc",String(mc));apply()})});
 window.__cx3apply=apply;var rt=0;addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(apply,150)});apply()}
/* cantos sobrios: botao e campo 10px, etiqueta 6px, card e foto ate 16px; circulos ficam como estao */
var SK="cx3r";window.__cx3soft=function(r){soft(r)};
function soft(root){var els=root.querySelectorAll?root.querySelectorAll("*"):[];for(var i=0;i<els.length;i++){var e=els[i];if(e[SK])continue;
 if(e.closest&&e.closest(".cx3-keep,svg"))continue;var s=getComputedStyle(e);var r=parseFloat(s.borderTopLeftRadius)||0;if(s.borderTopLeftRadius.indexOf("%")>0)r=999;if(r<=10){e[SK]=1;continue}
 var w=e.offsetWidth,h=e.offsetHeight;if(!w||!h)continue;e[SK]=1;if(Math.abs(w-h)<=4&&w<=64)continue;
 var v;if(h<=30)v=6;else if(h<=64)v=10;else v=r>16?16:r;if(v<r)e.style.setProperty("border-radius",v+"px","important")}}
function run(){css();try{cat()}catch(e){}try{if(window.__cx3apply)window.__cx3apply()}catch(e){}}
function boot(){run();try{soft(D.body)}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
var ct=0;D.addEventListener("click",function(){if(ct)return;ct=setTimeout(function(){ct=0;try{soft(D.body)}catch(e){}},450)},true);
window.addEventListener("load",function(){try{soft(D.body)}catch(e){}});
var t=0,q=[];new MutationObserver(function(ms){for(var i=0;i<ms.length;i++)for(var j=0;j<ms[i].addedNodes.length;j++){var n=ms[i].addedNodes[j];if(n.nodeType===1)q.push(n)}if(t)return;t=setTimeout(function(){t=0;run();var a=q;q=[];for(var k=0;k<a.length;k++){try{if(a[k].isConnected){soft(a[k].parentNode||a[k])}}catch(e){}}},250)}).observe(D.documentElement,{childList:true,subtree:true});
}catch(e){}})();

;(function(){var s=document.createElement("style");s.textContent="html body .cx3-view button.cx3-v{border-radius:8px!important}html body .cx3-fbtn{border-radius:10px!important}";(document.head||document.documentElement).appendChild(s)})();

/* 21/11/2026 (troca de blend na tela retirada em 27/11/2026): cha na fruta, subtitulos, ofertas de Kits e trio de Chas, faixa da categoria Kits */
;(function(){try{var D=document;if(window.__cmlCx4)return;window.__cmlCx4=1;
var WA="https://wa.me/554791571974?text="+encodeURIComponent("Olá! Quero comprar kits para a minha empresa. Podem me enviar as condições?");
var NOT=":not(#x1):not(#x2):not(#x3):not(#x4):not(#x5):not(#x6):not(#x7):not(#x8)";
var CSS=""
+"html body #ns-section-category_hero .category-banner.c2-cbn"+NOT+NOT+"::after{display:none!important;content:none!important}"
+".cx4-sub{display:block;margin:2px 0 0;font:400 12.5px/1.4 Poppins,sans-serif;color:#6f6656;letter-spacing:0}"
+".cx4-ov{display:block;margin:0 0 2px;font:600 10.5px/1.2 Poppins,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#a65a14}"
+".product-name+.cx4-sub,.js-product-name+.cx4-sub{font-size:15px;margin:4px 0 10px}.product-content>.cx4-sub{order:1;margin:2px 0 8px}.product-content>.c3-prt{order:2}.product-item-link>.cx4-ov{order:-3}.product-item-link>.cx4-sub{order:-1;margin:0 0 4px}"
+".cx4-sec{max-width:1255px;margin:8px auto 40px;padding:0 20px;font-family:Poppins,sans-serif;color:#2b2916;box-sizing:border-box}.cx4-sec *{box-sizing:border-box}"
+".cx4-k{margin:0 0 6px;font:600 11.5px/1.2 Poppins,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#a65a14}"
+".cx4-h{margin:0 0 6px;font:700 clamp(22px,2.4vw,30px)/1.15 Poppins,sans-serif;color:#2b2916}.cx4-h em{font-style:italic;font-weight:300;color:#a65a14}"
+".cx4-lead{margin:0 0 18px;max-width:640px;font:300 14.5px/1.55 Poppins,sans-serif;color:#4a4636}"
+".cx4-g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}"
+".cx4-c{display:flex;flex-direction:column;min-width:0;background:#fffaf5;border:1px solid #e8ddd0;border-radius:16px;overflow:hidden}"
+".cx4-c.dark{background:radial-gradient(110% 90% at 30% 20%,#565229 0%,#565229 45%,#403d1e 100%);border-color:#565229;color:#f6efe9}"
+".cx4-im{position:relative;display:block;aspect-ratio:4/3;background:#f1e9df;overflow:hidden}.cx4-im img{width:100%;height:100%;object-fit:cover;display:block}"
+".cx4-tag{position:absolute;top:10px;left:10px;padding:5px 9px;border-radius:6px;background:#2b2916;color:#f6efe9;font:600 11px/1 Poppins,sans-serif;letter-spacing:.06em;text-transform:uppercase}"
+".cx4-b{display:flex;flex-direction:column;gap:8px;padding:16px 16px 18px;flex:1}"
+".cx4-n{margin:0;font:700 19px/1.2 Poppins,sans-serif}.cx4-n em{font-style:italic;font-weight:300}.cx4-c .cx4-n em{color:#a65a14}.cx4-c.dark .cx4-n em{color:#f3d48b}"
+".cx4-d{margin:0;font:300 13.5px/1.5 Poppins,sans-serif;color:#4a4636}.cx4-c.dark .cx4-d{color:#e9e2d6}"
+".cx4-t{display:flex;flex-direction:column;gap:8px;margin-top:auto}"
+".cx4-pr{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}.cx4-pr b{font:700 24px/1 Poppins,sans-serif;color:#a65a14}.cx4-pr s{font-size:13px;color:#8a8170}"
+".cx4-save{display:inline-block;padding:5px 9px;border-radius:6px;background:#e8e9d6;color:#3f4520;font:600 12px/1.2 Poppins,sans-serif}"
+".cx4-btn{display:inline-flex;align-items:center;justify-content:center;width:100%;min-height:46px;padding:0 16px;border:0;border-radius:10px;background:#dfae58;color:#0b0a08!important;font:600 14.5px/1 Poppins,sans-serif;text-decoration:none!important;cursor:pointer}.cx4-btn:hover{background:#d09d45}.cx4-btn.ol{background:transparent;border:1px solid #a65a14;color:#a65a14!important}"
+".cx4-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:16px 0 0;padding:14px 16px;border:1px solid #e8ddd0;border-radius:12px;background:#fffaf5;font:400 13.5px/1.45 Poppins,sans-serif}.cx4-foot a{color:#a65a14;font-weight:600}"
+".cx4-trio{display:grid;grid-template-columns:1.1fr 1fr;gap:0;background:#fffaf5;border:1px solid #e8ddd0;border-radius:16px;overflow:hidden}"
+".cx4-trio .ims{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:2px;background:#e8ddd0}.cx4-trio .ims a{display:flex;flex-direction:column;background:#fff;text-decoration:none}.cx4-trio .ims img{width:100%;aspect-ratio:3/4;object-fit:cover;display:block}"
+".cx4-trio .ims span{display:block;padding:8px 8px 10px;font:600 13px/1.25 Poppins,sans-serif;color:#2b2916}.cx4-trio .ims small{display:block;font-weight:400;font-size:11.5px;color:#6f6656;margin-top:2px}"
+".cx4-trio .tx{display:flex;flex-direction:column;gap:12px;padding:clamp(18px,2.6vw,32px)}"
+".cx4-math{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.cx4-math div{padding:10px;border-radius:10px;background:#f6efe9;text-align:center}.cx4-math b{display:block;font:700 18px/1.1 Poppins,sans-serif;color:#2b2916}.cx4-math span{display:block;margin-top:4px;font:400 11.5px/1.3 Poppins,sans-serif;color:#6f6656}.cx4-math .hl{background:#565229}.cx4-math .hl b{color:#f3d48b}.cx4-math .hl span{color:#e9e2d6}"
+".cx4-err{margin:0;font-size:12.5px;color:#a65a14}"
+".cx4-nat{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:20px;align-items:center;margin:0 0 18px;padding:clamp(18px,2.6vw,30px);border-radius:16px;background:radial-gradient(110% 120% at 20% 10%,rgb(107,30,42) 0%,rgb(92,24,35) 45%,rgb(74,20,29) 100%);color:#f6efe9}"
+".cx4-nat .cx4-k{color:#dfae58}.cx4-nat .cx4-h{color:#f6efe9}.cx4-nat .cx4-h em{color:#f3d48b}.cx4-nat .cx4-lead{margin:0;color:#efe4da}"
+".cx4-dt{display:grid;gap:8px;margin:0;padding:0;list-style:none}.cx4-dt li{display:flex;align-items:center;gap:12px;padding:10px 12px;border:1px solid rgba(223,174,88,.35);border-radius:10px;background:rgba(246,239,233,.06)}.cx4-dt b{min-width:74px;font:700 17px/1 Poppins,sans-serif;color:#f3d48b}.cx4-dt span{font:400 13px/1.35 Poppins,sans-serif;color:#efe4da}"
+".cx4-g.cx4-g4{grid-template-columns:repeat(4,minmax(0,1fr))}.cx4-nc{border-color:#ead7c4}.cx4-nc .cx4-tag{background:rgb(92,24,35)}"
+".cx4-pr small{font:400 12px/1 Poppins,sans-serif;color:#6f6656}"
+".cx4-qty{display:grid;grid-template-columns:88px minmax(0,1fr);gap:8px}.cx4-qty label{display:flex;flex-direction:column;justify-content:center;padding:4px 10px;border:1px solid #e0d3c3;border-radius:10px;background:#fff;font:500 10.5px/1.1 Poppins,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#6f6656}.cx4-qty input{width:100%;margin-top:2px;padding:0;border:0;background:transparent;font:700 16px/1.2 Poppins,sans-serif;color:#2b2916;outline:0}"
+".cx4-more{font:500 12.5px/1.3 Poppins,sans-serif;color:#a65a14!important;text-decoration:underline;text-underline-offset:3px}"
+"@media(max-width:1100px){.cx4-g.cx4-g4{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:900px){.cx4-nat{grid-template-columns:minmax(0,1fr)}}@media(max-width:560px){.cx4-g.cx4-g4{grid-template-columns:minmax(0,1fr)}}"
+":root.cx4-natpg #ns-section-category_hero .c2-cbn{--b1:rgb(92,24,35)!important;--b2:rgb(74,20,29)!important}"
+"@media(max-width:900px){.cx4-g{grid-template-columns:minmax(0,1fr)}.cx4-trio{grid-template-columns:minmax(0,1fr)}}"
+"@media(max-width:640px){.cx4-sec{padding:0 12px;margin-bottom:28px}.cx4-math b{font-size:16px}}";
function css(){if(D.getElementById("cml-cx4"))return;var s=D.createElement("style");s.id="cml-cx4";s.textContent=CSS;(D.head||D.documentElement).appendChild(s)}
function brl(v){return "R$ "+v.toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".")}
/* 2. subtitulos */
var TA="Trouxinhas aromáticas · ",TI="Infusão na tangerina · ";
var SUB={224678493:["","Melissa, camomila, passiflora e alfazema"],224678609:["","Capim-limão, eucalipto, mate tostado e hibisco"],228278848:["","Hibisco, amora, maçã, morango e cranberry"],343019488:["","Melissa, camomila, erva-doce e maçã"],343019491:["","Jasmim, erva-doce, funcho e camomila"],343019493:["","Folha de amora, hortelã, erva-doce e camomila"],343019494:["","Folha de amora, camomila, hibisco e alfazema"],343019497:["","Chá verde, alecrim, gengibre e capim-limão"],343019505:["","Amora, hibisco, cranberry, morango e cacau"],350838426:["","Maçã, hibisco, canela, gengibre e cravo"],345698613:["","Hibisco, amora, maçã, morango e cranberry"],273215028:["","Equinácea, rosa mosqueta, gengibre, canela e cravo"],
 227899802:["Chá na fruta",TA+"abacaxi, cravo e canela"],224679101:["Chá na fruta",TA+"abacaxi, maçã, cravo e canela"],224679048:["Chá na fruta",TA+"abacaxi, capim-limão, gengibre e limão"],224679381:["Chá na fruta",TA+"abacaxi, cranberry, hibisco, morango e maçã"],224679530:["Chá na fruta",TA+"abacaxi, calêndula, anis e goji berry"],224679971:["Chá na fruta",TI+"capim-limão, eucalipto, hibisco, maçã e laranja"],
 382699798:["","Intenso, Sereníssimo e Performance"]};
function deco(nameEl,info){if(!nameEl||nameEl.__cx4)return;nameEl.__cx4=1;if(info[0]){var o=D.createElement("span");o.className="cx4-ov";o.textContent=info[0];nameEl.parentNode.insertBefore(o,nameEl)}var s=D.createElement("span");s.className="cx4-sub";s.textContent=info[1];if(nameEl.nextSibling)nameEl.parentNode.insertBefore(s,nameEl.nextSibling);else nameEl.parentNode.appendChild(s)}
function subs(){[].forEach.call(D.querySelectorAll(".js-item-product[data-product-id]"),function(it){var info=SUB[it.getAttribute("data-product-id")];if(!info)return;deco(it.querySelector(".js-item-name"),info)});
 var pc=D.querySelector("#single-product[data-product-id], .js-product-detail[data-product-id], [data-store^=product-info-]");var pid=null;if(pc)pid=pc.getAttribute("data-product-id")||(pc.getAttribute("data-store")||"").replace(/\D/g,"");
 if(!pid){var ai=D.querySelector("form.js-product-form input[name=add_to_cart]");if(ai)pid=ai.value}
 if(pid&&SUB[pid]){var h=D.querySelector("h1.js-product-name");if(h){var inf=SUB[pid],ey=h.parentNode.querySelector(".c3-ey");if(ey&&pid!=="382699798"){var lab=inf[0]||"Chá misto",suf=(ey.textContent.split("·")[1]||"").trim();var nt=lab+(suf?" · "+suf:"");if(ey.textContent.trim()!==nt)ey.textContent=nt}deco(h,["",inf[1]])}}}
/* 3. ordem: Cha misto antes de Bem-estar nas listas de categorias */
function order(){[].forEach.call(D.querySelectorAll("a"),function(a){if(a.__cx4o)return;var t=(a.textContent||"").trim();if(t!=="Chá misto")return;a.__cx4o=1;var li=a.closest("li");if(!li||!li.parentNode)return;var sib=[].filter.call(li.parentNode.children,function(x){var l=x.querySelector("a");return l&&/^Bem-estar/.test((l.textContent||"").trim())})[0];if(sib&&sib!==li)li.parentNode.insertBefore(li,sib)})}
/* 4. carrinho */
function add(pid,qty,variation,btn,go){if(btn){btn.disabled=true;btn.__t=btn.innerHTML;btn.innerHTML="Adicionando..."}var q=new URLSearchParams();q.set("add_to_cart",String(pid));q.set("quantity",String(qty||1));if(variation)q.set("variation[0]",variation);
 return fetch("/comprar/",{method:"POST",headers:{"X-Requested-With":"XMLHttpRequest"},body:q}).then(function(r){if(!r.ok)throw 0;return r.json().catch(function(){return{}})}).then(function(j){if(window.__cx4ok)window.__cx4ok(btn,j);else location.href="/comprar/"}).catch(function(){if(btn){btn.disabled=false;btn.innerHTML=btn.__t}var e=btn&&btn.closest(".cx4-c,.cx4-trio");if(e&&!e.querySelector(".cx4-err")){var p=D.createElement("p");p.className="cx4-err";p.innerHTML='Não foi possível adicionar agora. <a href="'+WA+'" target="_blank" rel="noopener">Fale com a gente no WhatsApp</a>.';(e.querySelector(".cx4-t")||e).appendChild(p)}})}
function bind(root){[].forEach.call(root.querySelectorAll("[data-add]"),function(b){b.addEventListener("click",function(){add(b.getAttribute("data-add"),b.getAttribute("data-q"),b.getAttribute("data-v"),b)})})}
var IMG={in:"https://acdn-us.mitiendanube.com/stores/005/060/752/products/0001-1710764873754130848-c919011695c11f982c17953014296677-1024-1024.jpg",se:"https://acdn-us.mitiendanube.com/stores/005/060/752/products/aa99458c07b0c03fc664783c439ea3f6-a139cfddb7d8f2170717849861066454-640-0.webp",pe:"https://acdn-us.mitiendanube.com/stores/005/060/752/products/5944929aa61d93d444656b7f62adeda3-2435d3a2f76324c7e117849861504359-640-0.webp"};
function kits(){if(D.querySelector(".cx4-kits"))return;var p=location.pathname.replace(/\/+$/,"/");if(p!=="/kits-presentes/presentes-corporativos/")return;var anchor=D.querySelector(".cml-duo-kt")||D.querySelector("#ns-section-category_hero");var grid=D.querySelector(".cml-cgrid");if(!anchor&&!grid)return;D.documentElement.classList.add("cx4-natpg");if(grid){grid.style.setProperty("display","none","important");var gb=D.querySelector(".cx3-bar");if(gb)gb.style.setProperty("display","none","important")}
 var U="https://acdn-us.mitiendanube.com/stores/005/060/752/products/";
 var K=[[382888421,"kit-flowers-tropical-1prqk",U+"flowers-tropical-0483b6822553dff4ea17954395655060-1024-1024.jpg","Para a equipe toda","Flowers <em>Tropical</em>","Rosa de Maçã e três trouxinhas de chá na fruta, em caixinha com visor. Sem chocolate: viaja bem e aguenta o calor.",35,54,10],
 [382888467,"kit-snack-tropical-1tymf",U+"snack-tropical-e19faa7a1bde8257ee17954395780758-1024-1024.jpg","Com a laranjinha","Snack <em>Tropical</em>","Cinco fatias de Laranja Chocoleve e três trouxinhas de chá na fruta, em caixinha com visor.",42,59,10],
 [382888501,"kit-queridinho-mh3t6",U+"queridinho-gemini-a2c2da3d813c4b31f017954425916610-1024-1024.jpg","Queridinho da casa","<em>Queridinho</em>","Duas Rosas de Maçã, Laranja Chocoleve e Chá Misto Intenso em caixa presente. Cerca de 12 xícaras por kit.",99,0,10],
 [382888542,"kit-para-aquela-pessoa-q602v",U+"para-aquela-pessoa-gemini-da7d993487f85056c717954438450845-1024-1024.jpg","Presente completo","Para Aquela <em>Pessoa</em>","O ritual do chá completo numa caixa de madeira gravada, com xícara de vidro duplo e infusor. Para o cliente especial ou a liderança.",289,399,1]];
 function card(k){return '<article class="cx4-c cx4-nc"><a class="cx4-im" href="/produtos/'+k[1]+'/"><img src="'+k[2]+'" alt="Kit '+k[4].replace(/<[^>]+>/g,"")+'" loading="lazy"><span class="cx4-tag">'+k[3]+'</span></a><div class="cx4-b"><h3 class="cx4-n">'+k[4]+'</h3><p class="cx4-d">'+k[5]+'</p><div class="cx4-t"><div class="cx4-pr"><b>'+brl(k[6])+'</b>'+(k[7]?'<s>'+brl(k[7])+'</s>':'')+'<small>por kit</small></div><div class="cx4-qty"><label>Kits<input type="number" min="1" step="1" inputmode="numeric" value="'+k[8]+'" aria-label="Quantidade de kits"></label><button type="button" class="cx4-btn" data-add="'+k[0]+'" data-q="'+k[8]+'">Adicionar</button></div><a class="cx4-more" href="/produtos/'+k[1]+'/">Ver o que vem no kit</a></div></div></article>'}
 var s=D.createElement("section");s.className="cx4-sec cx4-kits";
 s.innerHTML='<div class="cx4-nat"><div class="cx4-nat-tx"><p class="cx4-k">Natal 2026 · para empresas</p><h2 class="cx4-h">Quatro kits para fechar o ano, <em>feitos em casa</em></h2><p class="cx4-lead">Para equipe, clientes e parceiros. Preço fixo por kit, do primeiro ao último, com a marca Chef Mais Leve e o modo de preparo na caixa.</p></div>'
 +'<ul class="cx4-dt"><li><b>05/12</b><span>último dia para confirmar e receber até 19/12</span></li><li><b>28/11</b><span>prazo para pedidos acima de 100 kits</span></li><li><b>50+ kits</b><span>enviamos uma amostra antes de fechar</span></li></ul></div>'
 +'<div class="cx4-g cx4-g4">'+K.map(card).join("")+'</div>'
 +'<div class="cx4-foot"><span>Pedido grande, cartão personalizado ou entrega em vários endereços? Acima de R$ 1.000,00 no Sul e Sudeste, o frete é por nossa conta.</span><a href="'+WA+'" target="_blank" rel="noopener">Falar com a gente no WhatsApp</a></div>';
 [].forEach.call(s.querySelectorAll(".cx4-qty"),function(q){var i=q.querySelector("input"),b=q.querySelector("button");i.addEventListener("input",function(){var n=Math.max(1,parseInt(i.value,10)||1);b.setAttribute("data-q",String(n))})});
 var duo=D.querySelector(".cml-duo-kt");if(duo){duo.parentNode.insertBefore(s,duo);duo.style.display="none"}else{grid.parentNode.insertBefore(s,grid)}bind(s)}
function cha(){if(D.querySelector(".cx4-cha"))return;var p=location.pathname.replace(/\/+$/,"/");if(!/^\/chas\/(cha-misto\/)?$/.test(p))return;var grid=D.querySelector(".cml-cgrid");if(!grid)return;
 var sep=(Date.now()<Date.UTC(2026,11,1,3)?105:117),tri=Math.round(sep*85)/100,cups=60;var s=D.createElement("section");s.className="cx4-sec cx4-cha";
 s.innerHTML='<p class="cx4-k">Os três chás mistos mais pedidos</p><h2 class="cx4-h">Combo Trio, <em>15% a menos</em></h2><p class="cx4-lead">Intenso, Sereníssimo e Performance juntos: frutado para o dia, calmo para a noite e com foco para o trabalho. Sai mais barato do que levar os três separados.</p>'
 +'<div class="cx4-trio"><div class="ims"><a href="/produtos/cha-blend-intenso/"><img src="'+IMG.in+'" alt="Chá Misto Intenso" loading="lazy"><span>Intenso<small>Hibisco, amora, maçã, morango e cranberry</small></span></a><a href="/produtos/cha-blend-serenissimo/"><img src="'+IMG.se+'" alt="Chá Misto Sereníssimo" loading="lazy"><span>Sereníssimo<small>Melissa, camomila, passiflora e alfazema</small></span></a><a href="/produtos/cha-business-performance/"><img src="'+IMG.pe+'" alt="Chá Misto Performance" loading="lazy"><span>Performance<small>Chá verde, alecrim, gengibre e capim-limão</small></span></a></div>'
 +'<div class="tx"><div class="cx4-pr"><b>'+brl(tri)+'</b><s>'+brl(sep)+' separados</s><span class="cx4-save">Economia de '+brl(sep-tri)+'</span></div>'
 +'<div class="cx4-math"><div><b>3 × 40 g</b><span>pacotes no trio</span></div><div><b>até '+cups+'</b><span>xícaras de 200 ml</span></div><div class="hl"><b>'+brl(tri/cups)+'</b><span>por xícara</span></div></div>'
 +'<p class="cx4-d">Cada pacote de 40 g rende até 20 xícaras. Compare com o preço de uma xícara de chá na sua cafeteria preferida: aqui você toma chá artesanal, feito à mão, todos os dias.</p>'
 +'<a class="cx4-btn" href="/produtos/combo-trio-chas-mistos/">Quero o combo por '+brl(tri)+'</a></div></div>';
 grid.parentNode.insertBefore(s,grid);bind(s)}
function fitw(){var g=D.querySelector(".cml-cgrid .js-product-table")||D.querySelector(".cml-cgrid");if(!g)return;var w=g.getBoundingClientRect().width;[].forEach.call(D.querySelectorAll(".cx4-sec"),function(s){if(w>300){s.style.maxWidth=Math.round(w)+"px";s.style.paddingLeft="0";s.style.paddingRight="0"}})}addEventListener("resize",function(){try{fitw()}catch(e){}});
function run(){css();try{subs()}catch(e){}try{fitw()}catch(e){}try{order()}catch(e){}try{kits()}catch(e){}try{cha()}catch(e){}}
function boot(){run()}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
var t=0;new MutationObserver(function(){if(t)return;t=setTimeout(function(){t=0;run()},150)}).observe(D.documentElement,{childList:true,subtree:true,characterData:true});
}catch(e){}})();

/* 21/11/2026: barra de rastreio mais sobria + temporizador da Black (barra de anuncio e pagina /ofertas/) */
;(function(){try{var D=document;if(window.__cmlCx5)return;window.__cmlCx5=1;
var START=Date.UTC(2026,10,22,15,0,0),END=Date.UTC(2026,11,1,2,59,59);
var CSS=""
+"html body .adbar.cx5-on{display:flex!important;align-items:center;justify-content:center;gap:0}html body .adbar.cx5-on>.cx5-bar{order:2}html body .adbar.cx5-on>.adbar-marquee{order:1;flex:0 1 auto;min-width:0;overflow:hidden}"
+"html body .adbar.cx5-on .adbar-marquee-track"+":not(#a1):not(#a2)"+"{animation:none!important;transform:none!important;width:auto!important;display:flex!important;justify-content:center}"
+"html body .adbar.cx5-on .js-adbar-marquee-content+.js-adbar-marquee-content,html body .adbar.cx5-on .adbar-item~.adbar-item{display:none!important}"
+"html body .adbar.cx5-on .adbar-item{padding:0 14px!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}"
+".cx4-im img,.cx4-trio .ims img{object-fit:contain!important;background:#fff}.cx4-trio .ims img{aspect-ratio:1/1!important}.cx4-im{background:#fff!important}"
+"html body #cml-of3 .of3-ci img"+":not(#a1):not(#a2)"+"{object-fit:contain!important;background:#fff}html body #cml-of3 .of3-ci"+":not(#a1)"+"{background:#fff}"
+".cx5-bar{flex:0 0 auto;display:flex;align-items:center;gap:8px;padding:0 14px;border-left:1px solid rgba(223,174,88,.35);font:500 10.5px/1 Poppins,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#e9e2d6;white-space:nowrap;font-variant-numeric:tabular-nums}"
+".cx5-bar b{font-weight:600;color:#f3d48b;letter-spacing:.06em}"
+"html body #modal-cart .modal-close"+":not(#a1):not(#a2):not(#a3)"+"{display:inline-flex!important;align-items:center;justify-content:center;width:40px!important;height:40px!important;padding:0!important;border:1px solid #e0d3c3!important;border-radius:10px!important;background:#fffaf5!important;opacity:1!important;cursor:pointer}html body #modal-cart .modal-close svg"+":not(#a1):not(#a2):not(#a3)"+"{width:16px!important;height:16px!important;fill:#2b2916!important;color:#2b2916!important;opacity:1!important}html body #modal-cart .modal-close:hover"+":not(#a1)"+"{border-color:#a65a14!important}"
+".cx5-pg{max-width:1255px;margin:14px auto 6px;padding:0 20px;box-sizing:border-box}"
+".cx5-in{display:flex;align-items:center;justify-content:center;gap:clamp(14px,3vw,40px);flex-wrap:wrap;padding:16px 20px;border-radius:14px;background:radial-gradient(120% 140% at 50% 0%,#1c1c1a 0%,#0b0b0a 70%);border:1px solid rgba(223,174,88,.28);font-family:Poppins,sans-serif;color:#f6efe9}"
+".cx5-t{display:flex;flex-direction:column;gap:4px}.cx5-t span{font:500 11px/1.2 Poppins,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#dfae58}.cx5-t b{font:600 16px/1.2 Poppins,sans-serif;color:#f6efe9}"
+".cx5-u{display:flex;align-items:flex-start;gap:6px}.cx5-u div{min-width:62px;padding:8px 6px;border-radius:10px;background:rgba(246,239,233,.06);border:1px solid rgba(223,174,88,.22);text-align:center}"
+".cx5-u b{display:block;font:600 26px/1 Poppins,sans-serif;color:#f3d48b;font-variant-numeric:tabular-nums}.cx5-u small{display:block;margin-top:4px;font:500 10px/1 Poppins,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#cfc6b8}"
+".cx5-u i{align-self:center;font-style:normal;color:#dfae58;font-size:20px;opacity:.6}"
+"@media(max-width:767px){"
+".cx5-bar{padding:0 10px;font-size:9.5px;letter-spacing:.08em}.cx5-bar .l{display:none}"
+".cx5-pg{padding:0 12px;margin-top:10px}.cx5-in{padding:12px;gap:10px}.cx5-t{align-items:center;text-align:center;width:100%}.cx5-u div{min-width:56px}.cx5-u b{font-size:22px}.cx5-u i{display:none}}";
function css(){if(D.getElementById("cml-cx5"))return;var s=D.createElement("style");s.id="cml-cx5";s.textContent=CSS;(D.head||D.documentElement).appendChild(s)}
function z(n){return (n<10?"0":"")+n}
function left(){var now=Date.now();if(now>END)return null;var pre=now<START;var ms=(pre?START:END)-now;var s=Math.floor(ms/1000);return{pre:pre,d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),s:s%60}}
var TX='<span>Acompanhe o seu pedido</span><span class="s x"></span><span class="x">Cashback</span><span class="s x"></span><span class="x">Pontos</span>';
function trk(){}
function bar(){var ab=D.querySelector(".adbar");if(!ab)return;var t=left();var el=ab.querySelector(".cx5-bar");if(!t){if(el)el.remove();ab.classList.remove("cx5-on");return}
 if(!el){el=D.createElement("div");el.className="cx5-bar";ab.appendChild(el);ab.classList.add("cx5-on")}
 var h='<span class="l">'+(t.pre?"Começa em":"Termina em")+'</span><b>'+(t.d?t.d+"d ":"")+z(t.h)+"h "+z(t.m)+"m "+z(t.s)+"s</b>";if(el.innerHTML!==h)el.innerHTML=h}
function page(){if(location.pathname.replace(/\/+$/,"/")!=="/ofertas/")return;var t=left();var el=D.querySelector(".cx5-pg");if(!t){if(el)el.remove();return}
 var hero=D.querySelector("#cml-of3 .of3-hero")||D.getElementById("ns-section-category_hero");if(!hero)return;
 if(!el){el=D.createElement("div");el.className="cx5-pg";el.innerHTML='<div class="cx5-in"><div class="cx5-t"><span>Black Friday na Chef</span><b></b></div><div class="cx5-u"><div><b class="d">00</b><small>dias</small></div><i>:</i><div><b class="h">00</b><small>horas</small></div><i>:</i><div><b class="m">00</b><small>min</small></div><i>:</i><div><b class="s">00</b><small>seg</small></div></div></div>';hero.parentNode.insertBefore(el,hero.nextSibling)}
 if(el.previousElementSibling!==hero)hero.parentNode.insertBefore(el,hero.nextSibling);var tt=t.pre?"A Black começa em":"Os preços de Black terminam em 30/11 às 23h59";var q=function(c){return el.querySelector(c)};if(q(".cx5-t b").textContent!==tt)q(".cx5-t b").textContent=tt;
 q("b.d").textContent=z(t.d);q("b.h").textContent=z(t.h);q("b.m").textContent=z(t.m);q("b.s").textContent=z(t.s)}
function fit(){var g=D.querySelector("#cml-of3 .of3-hero")||D.querySelector("#ns-section-category_hero .category-banner");var el=D.querySelector(".cx5-pg");if(!g||!el)return;var w=g.getBoundingClientRect().width;if(w>300){el.style.maxWidth=Math.round(w)+"px";el.style.paddingLeft="0";el.style.paddingRight="0"}}
function xbtn(){var b=D.querySelector("#modal-cart .modal-close");if(!b||b.__cx5)return;b.__cx5=1;b.setAttribute("aria-label","Fechar sacola");b.innerHTML='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2b2916" stroke-width="2" stroke-linecap="round" style="fill:none!important"><path d="M6 6l12 12M18 6L6 18"/></svg>'}
function tick(){try{xbtn()}catch(e){}try{css()}catch(e){}try{bar()}catch(e){}try{page();fit()}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",tick);else tick();
setInterval(tick,1000);
}catch(e){}})();

/* 21/11/2026: cards com sobretitulo (categoria) + nome do produto, sem descritivo */
;(function(){try{var D=document;if(window.__cmlCx6)return;window.__cmlCx6=1;
var CM="Chá misto",CF="Chá na fruta",FD="Fruta desidratada",GR="Granola",XI="Xícara",PC="Presente corporativo";
var C={224678493:[CM,"Sereníssimo 40g"],224678609:[CM,"Sport 40g"],228278848:[CM,"Intenso 40g"],343019488:[CM,"Gestação 40g"],343019491:[CM,"Lactação 40g"],343019493:[CM,"Ciclo 40g"],343019494:[CM,"Maturidade 40g"],343019497:[CM,"Performance 40g"],343019505:[CM,"Estética 40g"],350838426:[CM,"Quentão 40g"],345698613:[CM,"Durex 80g (lata)"],273215028:[CM,"Imuny 40g"],382699798:["Combo de chás mistos","Intenso, Sereníssimo e Performance"],382766044:["Combo de chás mistos","Intenso, Sereníssimo e Performance"],
 224679048:[CF],224679101:[CF],224679381:[CF],224679530:[CF],227899802:[CF],224679971:[CF],311682784:[CF],
 224675737:["Chocoleve","Laranja"],382762068:["Chocoleve","Maçã"],382762073:["Chocoleve","Banana"],382762078:["Chocoleve","Abacaxi"],224676858:[GR,"Salgada 250g"],224676951:[GR,"Doce 250g"],355684676:[GR,"Low Carb 250g"],355685956:[GR,"Choconuts 250g"],
 274973417:[FD,"Tangerina 50g"],274973736:[FD,"Banana 50g"],274973940:[FD,"Abacaxi 50g"],274987046:[FD,"Banacô 50g"],348235485:["Snack","Stroopwafel · 2 un"],
 227621935:[XI,"Vidro Duplo"],343266132:[XI,"Good Morning"],343267114:[XI,"Bird"],343267777:[XI,"Flowers com Infusor"],227622893:["Infusor","Inox"],343268662:["Garrafa","Vidro com Infusor"],361795954:["Chaleira","Vidro com Infusor"],361796019:["Chaleira","Vidro com Filtro"],352096199:["Cuidado diário","Raspador de Cobre para Língua"],351015840:["Presente","Embalagem de Presente"],371646209:["Vale-presente","Cartão Presente"],
 313665100:["Presente mais famoso","Ternura"],343280690:["Presente querido","Flowers"],311670419:["Presente para mães","Materna"],344326858:["Presente exclusivo","Desdobramento"],345619388:["Kit degustação","Best Sellers"],379081240:["Presente de Natal","Natal Feliz"],382699778:["Presente executivo","Natal Feliz em quantidade"],382700088:[PC,"Flowers em quantidade"],
 381152450:[PC,"Pausa"],381152464:[PC,"Flowers Tropical"],381152487:[PC,"Snack Tropical"],381152499:[PC,"Café da Manhã"],381152515:[PC,"Queridinho"],381152535:[PC,"Para Aquela Pessoa"]};
var CSS=".cx6-ov{display:block;margin:0 0 3px;font:600 10.5px/1.2 Poppins,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#a65a14;order:-3}"
+".js-item-product .cx4-sub,.js-item-product .cx4-ov{display:none!important}"
+"html body .js-product-table>.js-item-product"+":not(#a1):not(#a2)"+"{display:flex!important;flex-direction:column!important;height:auto;align-self:stretch}"
+"html body .js-item-product .product-item-information"+":not(#a1):not(#a2)"+"{flex:1 1 auto!important;display:flex!important;flex-direction:column!important}"
+"html body .js-item-product a.product-item-link"+":not(#a1):not(#a2)"+"{display:flex!important;flex-direction:column!important;min-height:128px;flex:0 0 auto}"
+"html body .js-item-product .cx6-ov"+":not(#a1)"+"{min-height:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
+"html body .js-item-product .js-item-name"+":not(#a1):not(#a2)"+"{line-height:1.3!important;min-height:2.6em!important;max-height:2.6em;overflow:hidden;display:-webkit-box!important;-webkit-line-clamp:2;-webkit-box-orient:vertical}"
+"html body .js-item-product .product-item-price-container"+":not(#a1):not(#a2)"+"{margin-top:auto!important}"
+"html body .js-item-product .js-item-submit-container.product-item-quick-shop-container"+":not(#a1)"+"{margin-top:auto!important}";
function css(){if(D.getElementById("cml-cx6"))return;var s=D.createElement("style");s.id="cml-cx6";s.textContent=CSS;(D.head||D.documentElement).appendChild(s)}
function cards(){[].forEach.call(D.querySelectorAll(".js-item-product[data-product-id]"),function(it){var c=C[it.getAttribute("data-product-id")];if(!c)return;var n=it.querySelector(".js-item-name");if(!n)return;
 if(c[1]&&n.textContent.trim()!==c[1]){n.textContent=c[1];n.setAttribute("title",c[1])}
 var ov=n.parentNode.querySelector(":scope>.cx6-ov");if(!ov){ov=D.createElement("span");ov.className="cx6-ov";n.parentNode.insertBefore(ov,n)}if(ov.textContent!==c[0])ov.textContent=c[0]})}
function run(){try{css()}catch(e){}try{cards()}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",run);else run();
var t=0;new MutationObserver(function(){if(t)return;t=1;var _n=performance.now(),_g=window.__cxg||(window.__cxg={t:0,c:0});if(_n-_g.t>50){_g.t=_n;_g.c=0}_g.c++;var _f=function(){t=0;run()};if(_g.c<12)Promise.resolve().then(_f);else setTimeout(_f,180)}).observe(D.documentElement,{childList:true,subtree:true});
}catch(e){}})();

/* 21/11/2026: pagina Black mais larga e com respiro, temporizador repetido, cantos sem piscar, carrinho sem bloco de empresas */
;(function(){try{var D=document;if(window.__cmlCx7)return;window.__cmlCx7=1;
var START=Date.UTC(2026,10,22,15,0,0),END=Date.UTC(2026,11,1,2,59,59);
var CSS=""
+"html body #cml-of3 .of3-in"+":not(#a1):not(#a2)"+"{max-width:1440px!important;padding-left:32px!important;padding-right:32px!important;box-sizing:border-box}"
+"html body #cml-of3 .of3-hero"+":not(#a1)"+"{width:100%!important;max-width:none!important}"
+"html body #cml-of3 .of3-sh"+":not(#a1):not(#a2)"+"{margin-top:120px!important;margin-bottom:28px!important}"
+"html body #cml-of3 .of3-gr"+":not(#a1):not(#a2)"+"{gap:28px!important}"
+"html body #cml-of3 .of3-list"+":not(#a1)"+"{margin-top:8px}"
+"html body #cml-of3 .of3-faq"+":not(#a1):not(#a2)"+"{margin-top:120px!important;max-width:960px!important}"
+"html body #cml-of3 .of3-faq h2"+":not(#a1):not(#a2)"+"{font:700 clamp(24px,2.4vw,32px)/1.15 Poppins,sans-serif!important;color:#2b2916!important;letter-spacing:0!important;text-transform:none!important}"
+"html body #cml-of3 .of3-faq h2 em,html body #cml-of3 .of3-faq h2 i"+":not(#a1)"+"{font-weight:300!important;font-style:italic!important;color:#a65a14!important}"
+"html body #cml-of3 .of3-faq :is(summary,button,h3)"+":not(#a1)"+"{font-family:Poppins,sans-serif!important}"
+"html body #cml-of3 .of3-foot"+":not(#a1)"+"{margin-top:48px!important}"
+"html body #cml-of3 :is(.of3-q button,.of3-add,.of3-more,.of3-f button,.of3-go)"+":not(#a1):not(#a2)"+"{border-radius:10px!important}"
+"html body #cml-of3 :is(.of3-c,.of3-hero)"+":not(#a1):not(#a2)"+"{border-radius:16px!important}"
+"html body #cml-of3 .tg"+":not(#a1):not(#a2)"+"{border-radius:6px!important}"
+"html body #cml-of3 .of3-pr .pc{display:inline-block;margin-left:8px;padding:4px 8px;border-radius:6px;background:#a65a14;color:#fff;font:700 13px/1 Poppins,sans-serif;vertical-align:middle}"
+".cx7-cd{margin:96px 0 0}.cx7-cd .cx5-in{padding:22px 24px}"
+".cx2-b2b{display:none!important}"
+"@media(max-width:767px){html body #cml-of3 .of3-in"+":not(#a1):not(#a2)"+"{padding-left:14px!important;padding-right:14px!important}html body #cml-of3 .of3-sh"+":not(#a1):not(#a2)"+"{margin-top:28px!important}html body #cml-of3 .of3-gr"+":not(#a1):not(#a2)"+"{gap:12px!important}.cx7-cd{margin-top:64px}}";
function css(){if(D.getElementById("cml-cx7"))return;var s=D.createElement("style");s.id="cml-cx7";s.textContent=CSS;(D.head||D.documentElement).appendChild(s)}
function z(n){return (n<10?"0":"")+n}
function left(){var now=Date.now();if(now>END)return null;var pre=now<START;var s=Math.floor(((pre?START:END)-now)/1000);return{pre:pre,d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),s:s%60}}
var HTML='<div class="cx5-in"><div class="cx5-t"><span>Black Friday na Chef</span><b></b></div><div class="cx5-u"><div><b class="d">00</b><small>dias</small></div><i>:</i><div><b class="h">00</b><small>horas</small></div><i>:</i><div><b class="m">00</b><small>min</small></div><i>:</i><div><b class="s">00</b><small>seg</small></div></div></div>';
function cds(){if(location.pathname.replace(/\/+$/,"/")!=="/ofertas/")return;var inn=D.querySelector("#cml-of3 .of3-in");if(!inn)return;var t=left();
 var shs=inn.querySelectorAll(":scope>.of3-sh");var spots=[shs[1],inn.querySelector(":scope>.of3-faq")].filter(Boolean);
 spots.forEach(function(sp,i){var id="cx7-cd"+i;var el=D.getElementById(id);if(!t){if(el)el.remove();return}if(!el){el=D.createElement("div");el.id=id;el.className="cx7-cd";el.innerHTML=HTML;sp.parentNode.insertBefore(el,sp)}
  var tt=t.pre?"A Black começa em":"Os preços de Black terminam em 30/11 às 23h59";var q=function(c){return el.querySelector(c)};if(q(".cx5-t b").textContent!==tt)q(".cx5-t b").textContent=tt;q("b.d").textContent=z(t.d);q("b.h").textContent=z(t.h);q("b.m").textContent=z(t.m);q("b.s").textContent=z(t.s)})}
function tick(){try{css()}catch(e){}try{cds()}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",tick);else tick();setInterval(tick,1000);
try{new MutationObserver(function(ms){if(!window.__cx3soft)return;for(var i=0;i<ms.length;i++)for(var j=0;j<ms[i].addedNodes.length;j++){var n=ms[i].addedNodes[j];if(n.nodeType===1){try{window.__cx3soft(n.parentNode||n)}catch(e){}}}}).observe(D.documentElement,{childList:true,subtree:true})}catch(e){}
}catch(e){}})();

/* 21/11/2026: pagina de produto enxuta (fotos em carrossel, sem frete, acordeoes) + kits so adicionam a sacola + kits compactos no celular */
;(function(){try{var D=document;if(window.__cmlCx8)return;window.__cmlCx8=1;
var N=":not(#a1):not(#a2)";
var CSS=""
+"html body .js-product-slider .swiper-wrapper"+N+"{display:flex!important;grid-template-columns:none!important;flex-wrap:nowrap!important;overflow-x:auto!important;scroll-snap-type:x mandatory;scrollbar-width:none;gap:0!important;transform:none!important}"
+"html body .js-product-slider .swiper-wrapper::-webkit-scrollbar{display:none}"
+"html body .js-product-slider .swiper-slide"+N+"{flex:0 0 100%!important;width:100%!important;max-width:100%!important;grid-column:auto!important;grid-row:auto!important;scroll-snap-align:start;margin:0!important;aspect-ratio:1/1;height:auto!important}"
+"html body .js-product-slider .swiper-slide img"+N+"{width:100%!important;height:100%!important;object-fit:cover!important;border-radius:16px!important}"
+"html body .js-product-images"+N+"{position:relative;align-self:start}"
+".cx8-nav{position:absolute;top:50%;transform:translateY(-50%);z-index:5;display:flex;align-items:center;justify-content:center;width:42px;height:42px;border:0;border-radius:10px;background:rgba(255,250,245,.92);color:#2b2916;cursor:pointer;box-shadow:0 6px 18px -8px rgba(43,41,22,.4)}"
+".cx8-nav.p{left:14px}.cx8-nav.n{right:14px}.cx8-nav svg{width:18px;height:18px}.cx8-nav:disabled{opacity:.35;cursor:default}"
+"@media(min-width:992px){html body .js-product-info"+N+"{position:sticky;top:120px;align-self:start}}"
+"html body .cml-shb"+N+",html body .cx8-hide{display:none!important}"
+"html body #ns-section-product_description :is(.cml-f-cards,.cml-f-row,.cml-f-exp,.cml-side)"+N+"{display:none!important}"
+"html body #ns-section-product_description"+N+"{padding-top:48px!important;padding-bottom:24px!important}"
+".cml-acc.cx8-prep .cml-prep{display:flex;gap:10px;flex-wrap:wrap;margin:4px 0 0;padding:0;list-style:none}.cml-acc.cx8-prep .cml-prep li{flex:1 1 30%;padding:10px;border-radius:10px;background:#f6efe9;text-align:center}.cml-acc.cx8-prep .cml-prep b{display:block;font:700 16px/1.2 Poppins,sans-serif;color:#2b2916}.cml-acc.cx8-prep .cml-prep span{display:block;font:400 12px/1.3 Poppins,sans-serif;color:#6f6656}"
+".cml-duo-kt{display:none!important}"+"html body .cx4-trio .ims"+N+"{grid-template-columns:minmax(0,1fr)!important;background:none!important}html body .cx4-trio .ims a:not(:first-child),html body .cx4-trio .ims a span{display:none!important}html body .cx4-trio .ims img"+N+"{aspect-ratio:1/1!important;object-fit:cover!important;height:100%}"
+"html body .cx4-kits .cx4-im img"+N+"{object-fit:cover!important}"
+".cx4-btn.ok{background:#565229!important;border-color:#565229!important;color:#f6efe9!important}"
+"@media(max-width:767px){.cx4-kits .cx4-g{gap:12px}.cx4-kits .cx4-c{display:grid;grid-template-columns:112px minmax(0,1fr)}.cx4-kits .cx4-im{aspect-ratio:auto;height:100%;min-height:112px}.cx4-kits .cx4-tag{font-size:9px;padding:4px 6px;top:6px;left:6px}"
+".cx4-kits .cx4-b{padding:12px;gap:6px}.cx4-kits .cx4-n{font-size:16px}.cx4-kits .cx4-d{font-size:12.5px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}"
+".cx4-kits .cx4-pr b{font-size:18px}.cx4-kits .cx4-qty{grid-template-columns:72px minmax(0,1fr)}.cx4-kits .cx4-qty .cx4-btn{min-height:40px;font-size:13px}.cx4-kits .cx4-foot{font-size:12.5px;padding:10px 12px}.cx4-dt li{padding:8px 10px}.cx4-dt b{min-width:64px;font-size:15px}}";
function css(){if(D.getElementById("cml-cx8"))return;var s=D.createElement("style");s.id="cml-cx8";s.textContent=CSS;(D.head||D.documentElement).appendChild(s)}
var AR='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',AN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';
function gallery(){var box=D.querySelector(".js-product-images");if(!box||box.__cx8)return;var w=box.querySelector(".js-product-slider .swiper-wrapper");if(!w||w.children.length<1)return;box.__cx8=1;
 var fr=box.querySelector(".js-product-slider-pagination");var n=w.children.length;
 function idx(){return Math.round(w.scrollLeft/Math.max(1,w.clientWidth))}
 function upd(){var i=idx();if(fr)fr.textContent=(i+1)+" / "+n;p.disabled=i<=0;x.disabled=i>=n-1}
 var p=D.createElement("button");p.type="button";p.className="cx8-nav p";p.setAttribute("aria-label","Foto anterior");p.innerHTML=AR;
 var x=D.createElement("button");x.type="button";x.className="cx8-nav n";x.setAttribute("aria-label","Próxima foto");x.innerHTML=AN;
 p.addEventListener("click",function(){w.scrollBy({left:-w.clientWidth,behavior:"smooth"})});x.addEventListener("click",function(){w.scrollBy({left:w.clientWidth,behavior:"smooth"})});
 if(n>1){box.appendChild(p);box.appendChild(x)}var t;w.addEventListener("scroll",function(){clearTimeout(t);t=setTimeout(upd,60)});upd()}
function side(){var s=D.querySelector(".cml-side");if(!s||s.querySelector(".cx8-prep"))return;var accs=s.querySelectorAll(":scope>.cml-acc");if(!accs.length)return;
 var rows=D.querySelectorAll(".cml-f-row > div");var prep=null;[].forEach.call(rows,function(r){var h=r.querySelector("h4");if(h&&/preparar/i.test(h.textContent))prep=r});if(!prep)return;
 var a=D.createElement("div");a.className="cml-acc cx8-prep";var h=D.createElement("h4");h.setAttribute("data-b","1");h.textContent="Como preparar";var b=D.createElement("div");var ul=prep.querySelector("ul");if(ul)b.appendChild(ul.cloneNode(true));
 a.appendChild(h);a.appendChild(b);h.addEventListener("click",function(){a.classList.toggle("on")});accs[accs.length-1].parentNode.insertBefore(a,accs[accs.length-1].nextSibling)}
function clean(){[].forEach.call(D.querySelectorAll(".js-product-info p,.js-product-info div,.js-product-info small"),function(e){if(e.children.length<=3&&/^\s*Prefere comprar pelo WhatsApp/i.test(e.textContent||"")&&(e.textContent||"").length<90)e.classList.add("cx8-hide")});[].forEach.call(D.querySelectorAll("form.js-product-form *"),function(e){if(e.children.length<=2&&/Prefere comprar pelo WhatsApp/i.test(e.textContent||"")){var p=e.closest("form.js-product-form>*")||e;if(!p.classList.contains("cx8-hide"))p.classList.add("cx8-hide")}})}
window.__cx4ok=function(btn,j){try{var c=(j&&j.cart)||{},n=0;(c.products||[]).forEach(function(p){n+=+p.quantity||0});if(n)[].forEach.call(D.querySelectorAll(".js-cart-widget-amount"),function(e){e.textContent=n});var L=D.querySelector(".js-ajax-cart-list");if(L&&j&&j.html_cart_items)L.innerHTML=j.html_cart_items}catch(e){}
 if(!btn)return;btn.disabled=false;btn.classList.add("ok");var lab=btn.querySelector("span");var old=btn.__t;btn.innerHTML='<span>Adicionado à sacola</span><b>✓</b>';setTimeout(function(){btn.classList.remove("ok");btn.innerHTML=old},2600)};
function run(){try{css()}catch(e){}if(/^\/produtos\//.test(location.pathname)){try{gallery()}catch(e){}try{side()}catch(e){}try{clean()}catch(e){}}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",run);else run();
var t=0;new MutationObserver(function(){if(t)return;t=1;var _n=performance.now(),_g=window.__cxg||(window.__cxg={t:0,c:0});if(_n-_g.t>50){_g.t=_n;_g.c=0}_g.c++;var _f=function(){t=0;run()};if(_g.c<12)Promise.resolve().then(_f);else setTimeout(_f,200)}).observe(D.documentElement,{childList:true,subtree:true});
}catch(e){}})();

;(function(){if(window.__cmlCx9)return;window.__cmlCx9=1;var D=document;
var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6)";
var css="@media(min-width:900px){html body #ns-section-main_product .product-columns"+N+"{display:flex!important;justify-content:center!important;gap:64px!important;max-width:1280px!important;margin:0 auto!important;padding:24px 32px 0!important}"
+"html body #ns-section-main_product .js-product-images"+N+"{flex:0 0 min(52vw,600px)!important;width:min(52vw,600px)!important;max-width:600px!important}"
+"html body #ns-section-main_product .product-columns>*:not(.js-product-images)"+N+"{flex:1 1 auto!important;max-width:520px!important;width:auto!important}"
+"html body #ns-section-main_product .js-product-images img"+N+"{border-radius:16px!important}}html body .cx8-hide"+N+"{display:none!important}";
var st=D.createElement("style");st.id="cx9-css";st.textContent=css;(D.head||D.documentElement).appendChild(st);
function rs(){try{window.dispatchEvent(new Event("resize"))}catch(e){}}
setTimeout(rs,300);setTimeout(rs,1500);
})();

;(function(){return;/* cx10 desligado 22/11: faixas da Laranja agora pela promocao progressiva nativa */var D=document;
var LP=224675737,T={5:[175,245,"5 pacotes (R$ 35,00 cada)"],10:[335,490,"10 pacotes (R$ 33,50 cada)"],20:[640,980,"20 pacotes (R$ 32,00 cada)"]};
function brl(v){return "R$ "+v.toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".")}
function card(){return D.querySelector('#cml-of3 article[data-c="lar"]')}
function q(c){var b=c.querySelector(".of3-q button.on");return b?+b.getAttribute("data-q"):5}
function fix(){var c=card();if(!c)return;var n=q(c),t=T[n];if(!t)return;var key=n+"";if(c.getAttribute("data-cx10")===key)return;c.setAttribute("data-cx10",key);
var pr=c.querySelector(".of3-pr");if(pr)pr.innerHTML='<span class="de">'+brl(t[1])+'</span><span class="por">'+brl(t[0])+'</span><span class="pc">-'+Math.round((1-t[0]/t[1])*100)+'%</span>';
var ec=c.querySelector(".of3-ec");if(ec)ec.innerHTML='<span>Economia de <b>'+brl(t[1]-t[0])+'</b></span><span>'+brl(t[0]/n)+' por pacote</span><span>'+brl(t[0]*0.95)+' no Pix</span>'}
D.addEventListener("click",function(e){var c=card();if(!c||!c.contains(e.target))return;
var qb=e.target.closest(".of3-q button");if(qb){c.removeAttribute("data-cx10");setTimeout(fix,0);setTimeout(fix,120);return}
var ab=e.target.closest(".of3-add");if(!ab)return;e.preventDefault();e.stopImmediatePropagation();
var n=q(c),t=T[n];if(!t)return;var old=ab.textContent;ab.disabled=true;ab.textContent="Adicionando…";
var b=new URLSearchParams();b.set("add_to_cart",LP);b.set("quantity","1");b.set("variation[0]",t[2]);
fetch("/comprar/",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/x-www-form-urlencoded","X-Requested-With":"XMLHttpRequest"},body:b.toString()}).then(function(r){return r.json()}).then(function(j){ab.disabled=false;if(window.__cx4ok)window.__cx4ok(ab,j);else ab.textContent="Adicionado à sacola ✓";setTimeout(function(){ab.textContent=old},2600)}).catch(function(){ab.disabled=false;ab.textContent=old})},true);
var mo=new MutationObserver(function(){var c=card();if(c&&c.getAttribute("data-cx10")!==q(c)+"")fix()});
function go(){if(!/^\/ofertas/.test(location.pathname))return;mo.observe(D.body,{childList:true,subtree:true});fix()}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",go);else go();
})();

;(function(){if(window.__cmlCx11)return;window.__cmlCx11=1;var D=document,W=window;
var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6)";
var LP=224675737,LT=[[10,335,"10 pacotes (R$ 33,50 cada)"],[20,640,"20 pacotes (R$ 32,00 cada)"]];
function brl(v){return "R$ "+v.toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".")}
function num(t){var m=(t||"").replace(/\./g,"").match(/(\d+),(\d{2})/);return m?+(m[1]+"."+m[2]):0}
var css=""
+"html body .cx11-tiers"+N+"{display:flex;flex-direction:column;gap:8px;margin:14px 0 4px}"
+"html body .cx11-tiers .h"+N+"{font:500 11.5px/1.2 Poppins,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#a65a14}"
+"html body .cx11-tiers .r"+N+"{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}"
+"html body .cx11-tiers button"+N+"{display:flex;flex-direction:column;align-items:flex-start;gap:3px;padding:10px 12px;border:1px solid #e8ddd0;border-radius:10px;background:#fffaf5;color:#2b2916;font:600 13.5px/1.2 Poppins,sans-serif;cursor:pointer;text-align:left;text-transform:none;min-height:56px;transition:border-color .15s,background .15s}"
+"html body .cx11-tiers button small"+N+"{font:400 12px/1.25 Poppins,sans-serif;color:#6f6656}"
+"html body .cx11-tiers button.on"+N+"{border-color:#a65a14;background:#fff;box-shadow:inset 0 0 0 1px #a65a14}"
+"html body .cx11-tiers button.on small"+N+"{color:#a65a14}"
+"html body .cx11-strip"+N+"{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 16px;margin:16px 0 6px;padding:14px 16px;border:1px solid #e8ddd0;border-radius:12px;background:#fffaf5}"
+"html body .cx11-strip div"+N+"{display:flex;align-items:center;gap:10px;font:400 13px/1.3 Poppins,sans-serif;color:#2b2916}"
+"html body .cx11-strip b"+N+"{font-weight:600;display:block}html body .cx11-strip span"+N+"{color:#6f6656;font-size:12px}"
+"html body .cx11-strip svg"+N+"{flex:0 0 22px;width:22px;height:22px;stroke:#a65a14;fill:none;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}"
+"html body .cx11-quiz"+N+"{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:10px 0 0;padding:12px 16px;border-radius:12px;background:#565229;color:#f6efe9!important;font:400 13.5px/1.35 Poppins,sans-serif;text-decoration:none!important}"
+"html body .cx11-quiz b"+N+"{font-weight:600;color:#f3d48b}html body .cx11-quiz i"+N+"{font-style:normal;white-space:nowrap;font-weight:600}"
+"html body .js-product-info .cml-s-intro"+N+",html body .js-product-info .js-product-promo-container"+N+"{display:none!important}"
+"html body .cx11-faq"+N+"{max-width:1120px;margin:72px auto 40px;padding:0 24px}"
+"html body .cx11-faq .ey"+N+"{font:500 12px/1 Poppins,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#a65a14;margin:0 0 10px}"
+"html body .cx11-faq h2"+N+"{font:700 30px/1.15 Poppins,sans-serif;color:#2b2916;margin:0 0 24px}html body .cx11-faq h2 em"+N+"{font-weight:300;font-style:italic;color:#a65a14}"
+"html body .cx11-faq .g"+N+"{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 24px;align-items:start}"
+"html body .cx11-faq details"+N+"{border:1px solid #e8ddd0;border-radius:12px;background:#fffaf5;padding:0}"
+"html body .cx11-faq summary"+N+"{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:16px 18px;font:600 14.5px/1.35 Poppins,sans-serif;color:#2b2916}"
+"html body .cx11-faq summary::-webkit-details-marker{display:none}"
+"html body .cx11-faq summary:after"+N+"{content:'+';font:400 20px/1 Poppins,sans-serif;color:#a65a14;transition:transform .2s}html body .cx11-faq details[open] summary:after"+N+"{transform:rotate(45deg)}"
+"html body .cx11-faq .a"+N+"{padding:0 18px 16px;font:400 13.5px/1.6 Poppins,sans-serif;color:#4a4636}html body .cx11-faq .a p"+N+"{margin:0 0 6px}"
+"html body.cx11-pp [id^='ns-section-faq']"+N+"{display:none!important}"
+"html body .js-product-info .js-price-container.product-price"+N+"{border-radius:14px 14px 0 0!important;border-bottom:0!important;margin-bottom:0!important;padding-bottom:10px!important}html body .js-product-info .js-product-payments-container"+N+"{border-radius:0 0 14px 14px!important;margin-top:0!important}"+"html body .cml-bar.on"+N+"{min-height:84px!important;padding-top:12px!important;padding-bottom:12px!important}"
+"html body .cml-bar .t b"+N+"{font-size:15px!important}html body .cml-bar .t span"+N+"{font-size:17px!important;font-weight:700!important;color:#a65a14!important}"
+"html body .cml-bar img"+N+"{width:56px!important;height:56px!important;border-radius:10px!important;object-fit:cover!important}"
+"html body .cml-bar .go"+N+"{min-height:50px!important;padding:0 34px!important;font-size:15px!important;border-radius:10px!important}"
+"html body .cml-bar .cx11-bc"+N+"{display:flex;gap:6px}html body .cml-bar .cx11-bc button"+N+"{padding:8px 12px;border:1px solid #e8ddd0;border-radius:8px;background:#fffaf5;font:500 12.5px/1.2 Poppins,sans-serif;color:#2b2916;cursor:pointer;white-space:nowrap}"
+"html body .cml-bar .cx11-bc button.on"+N+"{border-color:#a65a14;color:#a65a14;background:#fff}"
+"@media(max-width:760px){html body .cx11-faq .g"+N+"{grid-template-columns:minmax(0,1fr)}html body .cx11-faq"+N+"{margin:48px auto 24px;padding:0 16px}html body .cx11-faq h2"+N+"{font-size:24px}html body .cml-bar .cx11-bc"+N+"{display:none}html body .cx11-tiers button"+N+"{padding:9px 10px;font-size:13px}html body .cx11-strip"+N+"{padding:12px}}";
var st=D.createElement("style");st.id="cx11-css";st.textContent=css;(D.head||D.documentElement).appendChild(st);
var IC={m:'<svg viewBox="0 0 24 24"><path d="M7 11V6a1.5 1.5 0 013 0v4M10 10V4.5a1.5 1.5 0 013 0V10M13 10V5.5a1.5 1.5 0 013 0V12M16 11.5V8.5a1.5 1.5 0 013 0v5.5a7 7 0 01-7 7h-.5a7 7 0 01-5.6-2.8L4 15.6a1.6 1.6 0 012.5-2L7 14"/></svg>',
t:'<svg viewBox="0 0 24 24"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
c:'<svg viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 10h18M7 15h4"/></svg>',
p:'<svg viewBox="0 0 24 24"><path d="M12 3l4.2 4.2a2 2 0 010 2.8L12 14.2 7.8 10a2 2 0 010-2.8zM12 9.8l4.2 4.2a2 2 0 010 2.8L12 21l-4.2-4.2a2 2 0 010-2.8z"/></svg>'};
function isPP(){return /^\/produtos\//.test(location.pathname)&&D.querySelector("form.js-product-form")}
function info(){return D.querySelector("#ns-section-main_product .js-product-info")}
function kind(){var e=D.querySelector(".js-product-info .c3-ey"),n=(D.querySelector(".js-product-name")||{}).textContent||"",t=((e&&e.textContent)||"")+" "+n;
if(/Laranja Chocoleve/i.test(n)&&!/quantidade/i.test(n))return "lar";if(/Kit|Presente/i.test(n))return "kit";if(/ch[aá] misto/i.test(t))return "misto";if(/ch[aá] na fruta|trouxinha|infus/i.test(t))return "fruta";if(/ch[aá]/i.test(t))return "cha";return "out"}
function price(){var p=D.querySelector(".js-product-info .js-price-display");return num(p&&p.textContent)}
function promo(){var e=D.querySelector(".js-product-info .js-product-promo-container");var m=e&&(e.textContent||"").match(/(?:Compre|Leve)\s+(\d+)\s*,?\s*e?\s*pague\s+(\d+)/i);if(m)return [+m[1],+m[2]];if(kind()==="misto"&&!/Durex|lata/i.test((D.querySelector(".js-product-name")||{}).textContent||""))return null}
function qIn(){return D.querySelector("form.js-product-form input.js-quantity-input, form.js-product-form input[name=quantity]")}
function setQ(n){var i=qIn();if(i){i.value=n;i.dispatchEvent(new Event("input",{bubbles:true}));i.dispatchEvent(new Event("change",{bubbles:true}))}var bi=D.querySelector(".cml-bar .q input");if(bi){bi.value=n;bi.dispatchEvent(new Event("input",{bubbles:true}))}mark(n)}
function mark(n){[].forEach.call(D.querySelectorAll(".cx11-tiers button[data-n],.cml-bar .cx11-bc button"),function(b){b.classList.toggle("on",+b.getAttribute("data-n")===n)})}
function tiers(){var k=kind(),pr=price(),pm=promo(),box=D.querySelector(".cx11-tiers");if(box||!pr)return;var vv=D.querySelector(".js-product-info .js-product-variants");if(vv&&vv.offsetHeight>20&&vv.querySelector("select,input,button,a"))return;var opts=[];
if(pm&&(k==="misto"||k==="fruta"||k==="cha")){var u=pr*pm[1]/pm[0];opts=[[1,"1 pacote",brl(pr)],[3,"3 pacotes",brl(pr*3)],[pm[0],pm[0]+" pacotes",brl(u)+" cada"]]}
else if(k==="lar"){opts=[[1,"1 pacote",brl(pr)],["L10","10 pacotes",brl(33.5)+" cada"],["L20","20 pacotes",brl(32)+" cada"]]}
else if(k==="misto"||k==="fruta"){opts=[[1,"1 pacote",brl(pr)],[2,"2 pacotes",brl(pr*2)],[3,"3 pacotes",brl(pr*3)]]}
if(!opts.length)return;var a=D.querySelector(".js-product-info .product-actions");if(!a)return;
box=D.createElement("div");box.className="cx11-tiers";box.innerHTML='<div class="h">'+(k==="lar"||pm?"Mais pacotes, menos por pacote":"Quantidade")+'</div><div class="r">'+opts.map(function(o,i){return '<button type="button" data-n="'+o[0]+'"'+(i===0?' class="on"':'')+'>'+o[1]+'<small>'+o[2]+'</small></button>'}).join("")+'</div>';
a.parentNode.insertBefore(box,a);
box.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;var v=b.getAttribute("data-n");
if(v.charAt(0)==="L"){var t=LT[v==="L10"?0:1];mark(-1);b.classList.add("on");var old=b.innerHTML;b.innerHTML="Adicionando…";var q=new URLSearchParams();q.set("add_to_cart",LP);q.set("quantity","1");q.set("variation[0]",t[2]);
fetch("/comprar/",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/x-www-form-urlencoded","X-Requested-With":"XMLHttpRequest"},body:q.toString()}).then(function(r){return r.json()}).then(function(j){b.innerHTML="Adicionado ✓<small>"+t[2].replace(/^\d+ pacotes \(|\)$/g,"")+"</small>";if(W.__cx4ok)try{W.__cx4ok(D.createElement("button"),j)}catch(x){}setTimeout(function(){b.innerHTML=old},2600)}).catch(function(){b.innerHTML=old});return}
setQ(+v)})}
function strip(){if(D.querySelector(".cx11-strip"))return;var a=D.querySelector(".js-product-info .product-actions");if(!a)return;var s=D.createElement("div");s.className="cx11-strip";
s.innerHTML='<div>'+IC.m+'<p style="margin:0"><b>Feito à mão</b><span>em pequenos lotes</span></p></div><div>'+IC.t+'<p style="margin:0"><b>Frete grátis</b><span>consulte seu estado</span></p></div><div>'+IC.c+'<p style="margin:0"><b>5x sem juros</b><span>no cartão</span></p></div><div>'+IC.p+'<p style="margin:0"><b>Desconto no Pix</b><span>direto no pagamento</span></p></div>';
var after=a.nextElementSibling;a.parentNode.insertBefore(s,after);
var k=kind();if(k==="misto"||k==="cha"||k==="fruta"){var q=D.createElement("a");q.className="cx11-quiz";q.href="/encontre-seu-cha/";q.innerHTML='<span>Em dúvida do chá ideal? <b>Encontre o seu em menos de 1 minuto</b></span><i>Fazer teste →</i>';var last=D.querySelector(".js-product-info .cml-acc:last-of-type");(last&&last.parentNode?last.parentNode:a.parentNode).insertBefore(q,last?last.nextSibling:s.nextSibling)}}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function faq(){if(D.querySelector(".cx11-faq"))return;var sec=D.querySelector("[id^='ns-section-faq']");var k=kind(),Q=[];
var prep=[].map.call(D.querySelectorAll(".cx8-prep *"),function(e){return e.children.length?"":e.textContent.trim()}).filter(Boolean).slice(1);
if(prep.length>=6&&(k==="misto"||k==="cha"||k==="fruta"))Q.push(["Como preparar?","<p>Use "+esc(prep[0])+" ("+esc(prep[1])+") para cada xícara, com água a "+esc(prep[2])+" ("+esc(prep[3])+"). Deixe em infusão por "+esc(prep[4])+", "+esc(prep[5])+".</p>"]);
if(k==="misto")Q.push(["Quanto rende um pacote de 40 g?","<p>Rende até 20 xícaras.</p>"]);
if(k==="lar")Q.push(["Tem açúcar ou conservantes?","<p>Não tem açúcar adicionado nem conservantes. É laranja bahia fatiada, desidratada em baixa temperatura por cerca de 13 horas, com borda de chocolate 70%.</p>"]);
else if(k!=="kit")Q.push(["Tem conservantes ou aditivos?","<p>Não. Tudo é feito à mão na nossa cozinha, com ingredientes naturais e sem aditivos.</p>"]);
if(k==="lar")Q.push(["Vale a pena comprar mais pacotes?","<p>Sim. Em 10 pacotes cada um sai a R$ 33,50 e em 20 pacotes a R$ 32,00. Escolha a quantidade logo abaixo do preço.</p>"]);
if(k==="kit")Q.push(["Dá para mandar para vários endereços ou personalizar?","<p>Sim. Fale com a gente no <a href=\"https://wa.me/554791571974\" target=\"_blank\" rel=\"noopener\">WhatsApp</a> e montamos o pedido com você.</p>"]);
if(sec){[].forEach.call(sec.querySelectorAll(".accordion-item"),function(it){var b=it.querySelector(".accordion-item-toggle-text"),c=it.querySelector(".accordion-item-body, .accordion-item-content")||it.children[1];if(b&&c)Q.push([b.textContent.trim(),c.innerHTML])})}
if(Q.length<2)return;var box=D.createElement("section");box.className="cx11-faq";box.innerHTML='<p class="ey">Dúvidas</p><h2>Perguntas <em>frequentes</em></h2><div class="g">'+Q.slice(0,10).map(function(q){return '<details><summary>'+esc(q[0])+'</summary><div class="a">'+q[1]+'</div></details>'}).join("")+'</div>';
var ap=D.querySelector("#ns-section-alternative_products")||sec;if(!ap)return;ap.parentNode.insertBefore(box,ap.nextSibling);D.body.classList.add("cx11-pp")}
function bar(){var b=D.querySelector(".cml-bar");if(!b||b.querySelector(".cx11-bc"))return;var pm=promo(),k=kind(),pr=price();if(!pm||!pr||(k!=="misto"&&k!=="fruta"&&k!=="cha"))return;var q=b.querySelector(".q");if(!q)return;
var c=D.createElement("div");c.className="cx11-bc";c.innerHTML='<button type="button" data-n="1" class="on">1 un</button><button type="button" data-n="3">3 un</button><button type="button" data-n="'+pm[0]+'">'+pm[0]+' un · '+brl(pr*pm[1]/pm[0])+' cada</button>';q.parentNode.insertBefore(c,q);
c.addEventListener("click",function(e){var x=e.target.closest("button");if(x)setQ(+x.getAttribute("data-n"))})}
function labels(){[].forEach.call(D.querySelectorAll(".label span, .label, .js-product-promo-container .promotion-detail-title"),function(e){if(e.children.length)return;var pl=e.closest(".label");if(pl)pl.style.setProperty("text-transform","none","important");var m=(e.textContent||"").match(/^\s*Compre\s+(\d+)\s+e\s+pague\s+(\d+)!?\s*$/i);if(m){e.textContent="Leve "+m[1]+", pague "+m[2];e.style.setProperty("text-transform","none","important")}})}
var busy=0;function run(){if(busy)return;busy=1;try{labels();if(isPP()){tiers();strip();faq();bar()}}catch(e){}busy=0}
function go(){run();new MutationObserver(run).observe(D.body,{childList:true,subtree:true})}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",go);else go();
})();

;(function(){if(window.__cmlCx12)return;window.__cmlCx12=1;var D=document;
var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6)";
var DP=["/produtos/laranja-choco-leve/","/produtos/kit-ternura1/","/produtos/kit-desdobramento-l1xs1/","/produtos/kit-flowers/","/produtos/kitl-natal-feliz/","/produtos/infusao-trouxinha-de-abacaxi/","/produtos/infusao-rose-na-tangerina/"];if(DP.indexOf(location.pathname)>-1)D.documentElement.classList.add("cx12-dp");
var css="html.cx12-dp body #ns-section-main_product"+N+",html body:has(#cml-dst) #ns-section-main_product"+N+"{position:absolute!important;left:-9999px!important;width:1px!important;height:1px!important;overflow:hidden!important}html body .cml-dst .dw>.blk:not(.two):not(:first-of-type):has(.js-dst-buy)"+N+"{display:none!important}html body .cml-dst .dw>.blk.cx12-h"+N+",html body .cml-dst .dw>.blk.two"+N+",html body .cml-dst .dw>.go"+N+"{display:none!important}"
+"html body.cx12-nomain #ns-section-main_product"+N+"{position:absolute!important;left:-9999px!important;width:1px!important;height:1px!important;overflow:hidden!important}"
+"html body.cx12-on #ns-section-product_description .cpv-story.cpv-gift"+N+",html body .cml-dst .dw>.story"+N+"{display:none!important}"
+"html body .cml-dst .dh .cx11-tiers"+N+"{max-width:520px;margin:16px 0 8px}"
+"html body .cml-dst .cx12-lote"+N+"{display:inline-flex;align-items:center;gap:8px;margin:0 0 12px;padding:6px 10px;border-radius:6px;background:#fffaf5;border:1px solid #e8ddd0;font:500 12.5px/1.2 Poppins,sans-serif;color:#2b2916}"
+"html body .cml-dst .cx12-lote i"+N+"{width:7px;height:7px;border-radius:50%;background:#a65a14;display:inline-block}"
+"html body .cml-dst .story"+N+"{max-height:none}"
+"html body #ns-section-product_description .cml-pd:has(> div > video)"+N+"{flex-direction:row!important;flex-wrap:wrap!important;gap:16px!important;align-items:stretch!important}"
+"html body #ns-section-product_description .cml-pd:has(> div > video)>*:not(:has(> video))"+N+"{flex:1 1 100%!important}"
+"html body #ns-section-product_description .cml-pd>div:has(> video)"+N+"{display:flex!important;flex-direction:column!important;flex:1 1 calc(25% - 12px)!important;min-width:220px!important;max-width:calc(25% - 12px)!important;gap:0!important;background:#fffaf5;border:1px solid #e8ddd0;border-radius:14px!important;overflow:hidden!important;padding:0!important;margin:0!important}"
+"html body #ns-section-product_description .cml-pd>div>video"+N+"{width:100%!important;height:190px!important;object-fit:cover!important;border-radius:0!important;aspect-ratio:auto!important}"
+"html body #ns-section-product_description .cml-pd>div:has(> video)>div"+N+"{width:auto!important;padding:14px 16px 16px!important}"
+"html body #ns-section-product_description .cml-pd>div:has(> video) h4"+N+"{font-size:16px!important;line-height:1.3!important;margin:6px 0!important}"
+"html body #ns-section-product_description .cml-pd>div:has(> video) p"+N+"{font-size:13px!important;line-height:1.5!important;margin:0!important;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}"
+"html body #ns-section-product_description .cml-pd>div:has(> video) p:nth-of-type(n+2)"+N+"{display:none!important}"
+"@media(max-width:760px){html body #ns-section-product_description .cml-pd>div:has(> video)"+N+"{flex:0 0 78%!important;max-width:78%!important;min-width:0!important}html body #ns-section-product_description .cml-pd:has(> div > video)"+N+"{flex-wrap:nowrap!important;overflow-x:auto!important;scroll-snap-type:x mandatory}html body #ns-section-product_description .cml-pd>div:has(> video)"+N+"{scroll-snap-align:start}}";
var st=D.createElement("style");st.textContent=css;(D.head||D.documentElement).appendChild(st);
function run(){var d=D.getElementById("cml-dst")||D.querySelector(".cml-dst");if(!d)return false;var dw=d.querySelector(".dw");if(!dw)return false;D.body.classList.add("cx12-on");
[].forEach.call(dw.children,function(c){if(c.classList.contains("blk")&&!c.classList.contains("two")&&c.querySelector(".js-dst-buy"))c.classList.add("cx12-h")});
[].forEach.call(d.querySelectorAll(".dh a"),function(a){var h=a.getAttribute("href")||"";var tg=h.charAt(0)==="#"&&h.length>1?D.getElementById(h.slice(1)):null;if(/^\s*Como aproveitar\s*$/i.test(a.textContent||"")||(tg&&tg.offsetParent===null&&tg.closest(".cml-dst")))a.style.setProperty("display","none","important")});var hb=d.querySelector(".dh .js-dst-buy");var pick=hb&&/Escolher/i.test(hb.textContent||"");if(hb&&!pick)D.body.classList.add("cx12-nomain");
var dh=d.querySelector(".dh");if(dh&&!dh.querySelector(".cx12-lote")){var pr=dh.querySelector(".pr");if(pr){var l=D.createElement("div");l.className="cx12-lote";l.innerHTML="<i></i>Lote limitado, feito à mão em pequenas quantidades";pr.parentNode.insertBefore(l,pr)}}
if(/laranja-choco-leve/.test(location.pathname)&&dh&&!dh.querySelector(".cx11-tiers")){var t=D.querySelector("#ns-section-main_product .cx11-tiers");var pr2=dh.querySelector(".pr");if(t&&pr2){pr2.parentNode.insertBefore(t,pr2.nextSibling);t.addEventListener("click",function(e){var b=e.target.closest("button[data-n='1']");if(b&&hb){setTimeout(function(){},0)}})}}
return !!(dh&&dh.querySelector(".cx11-tiers"))||!/laranja-choco-leve/.test(location.pathname)}
var n=0,iv=setInterval(function(){if(run()||++n>40)clearInterval(iv)},250);
})();

;(function(){if(window.__cmlCx13)return;window.__cmlCx13=1;var D=document,W=window;
if(!/^\/comprar\/?$/.test(location.pathname))return;
var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6)";
function brl(v){return "R$ "+v.toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".")}
function num(t){var m=(t||"").replace(/\s/g,"").replace(/\./g,"").match(/(\d+),(\d{2})/);return m?+(m[1]+"."+m[2]):0}
var css=""
+"html body .cx13"+N+"{display:flex;flex-direction:column;gap:14px;width:100%}"
+"html body .cx13-s"+N+"{border:1px solid #e8ddd0;border-radius:16px;background:#fffaf5;overflow:hidden}"
+"html body .cx13-hd"+N+"{display:flex;align-items:center;gap:14px;width:100%;padding:18px 22px;border:0;background:transparent;cursor:pointer;text-align:left;font:600 16px/1.2 Poppins,sans-serif;color:#2b2916;text-transform:none}"
+"html body .cx13-hd .n"+N+"{flex:0 0 30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:600 13px/1 Poppins,sans-serif;background:#ede3d8;color:#565229}"
+"html body .cx13-s.on .cx13-hd .n"+N+"{background:#565229;color:#f6efe9}html body .cx13-s.ok .cx13-hd .n"+N+"{background:#a3ad7f;color:#fff}"
+"html body .cx13-hd .tt"+N+"{flex:1 1 auto}html body .cx13-hd .sm"+N+"{font:400 13px/1.3 Poppins,sans-serif;color:#6f6656;text-align:right}"
+"html body .cx13-hd .ch"+N+"{width:10px;height:10px;border-right:1.6px solid #a65a14;border-bottom:1.6px solid #a65a14;transform:rotate(45deg);margin:0 4px 4px 6px;transition:transform .2s}"
+"html body .cx13-s.on .cx13-hd .ch"+N+"{transform:rotate(-135deg);margin-bottom:-4px}"
+"html body .cx13-bd"+N+"{display:none;padding:0 22px 20px}html body .cx13-s.on .cx13-bd"+N+"{display:block}"
+"html body .cx13-nx"+N+"{display:flex;justify-content:flex-end;gap:10px;margin-top:16px}"
+"html body .cx13-nx button"+N+"{min-height:46px;padding:0 26px;border-radius:10px;border:1px solid #a65a14;background:#a65a14;color:#fff;font:600 14px/1 Poppins,sans-serif;cursor:pointer;text-transform:none}"
+"html body .cx13-nx button.sec"+N+"{background:transparent;color:#a65a14}"
+"html body .cx13 .cart-page-items-list"+N+",html body .cx13 .cart-page-table-header"+N+"{width:100%!important}"
+"html body .cx13 .cx2-bump"+N+"{margin:0!important;width:100%!important;border-radius:12px!important}"
+"html body .cx13 .cart-page-fulfillment"+N+"{width:100%!important;max-width:none!important;margin:0!important;grid-column:auto!important}"
+"html body .cx13 .cx13-tip"+N+"{font:400 13.5px/1.5 Poppins,sans-serif;color:#4a4636;margin:0 0 12px}"
+"html body .cx13 .cx13-grid>*"+N+"{margin-top:0!important}html body .cx13 .cx13-grid>.cx2-k"+N+",html body .cx13 .cx13-grid>.cx2-h"+N+"{display:none!important}"
+"html body .cart-page-content"+N+"{align-items:start!important}"
+"html body .cx13-side"+N+"{display:flex;flex-direction:column;gap:10px;margin:12px 0}"
+"html body .cx13-side .bx"+N+"{border:1px solid #e8ddd0;border-radius:12px;background:#fffaf5;padding:12px 14px;font:400 13px/1.45 Poppins,sans-serif;color:#2b2916}"
+"html body .cx13-side .bx b"+N+"{font-weight:600}html body .cx13-side .pix b.v"+N+"{color:#a65a14;font-size:15px}"
+"html body .cx13-side .bar"+N+"{height:6px;border-radius:6px;background:#ede3d8;margin-top:8px;overflow:hidden}html body .cx13-side .bar i"+N+"{display:block;height:100%;background:#a65a14;border-radius:6px;transition:width .3s}"
+"html body .cx13-side .cb"+N+"{display:flex;gap:10px;align-items:center}html body .cx13-side .cb svg"+N+"{flex:0 0 20px;width:20px;height:20px;stroke:#a65a14;fill:none;stroke-width:1.5}"
+"html body.cx13-on .cart-page-totals [class*='mi-bg-']"+N+"{display:none!important}"
+"html body.cx13-on .cx2-pg"+N+"{display:none!important}"
+"@media(max-width:767px){html body .cx13-hd"+N+"{padding:16px}html body .cx13-bd"+N+"{padding:0 16px 16px}html body .cx13-hd .sm"+N+"{display:none}html body .cx13-nx button"+N+"{flex:1 1 auto}}";
var st=D.createElement("style");st.textContent=css;(D.head||D.documentElement).appendChild(st);
var S=[];
function mk(i,t){var s=D.createElement("section");s.className="cx13-s";s.innerHTML='<button type="button" class="cx13-hd"><span class="n">'+i+'</span><span class="tt">'+t+'</span><span class="sm"></span><span class="ch"></span></button><div class="cx13-bd"></div>';s.querySelector(".cx13-hd").addEventListener("click",function(){open(S.indexOf(s),true)});S.push(s);return s}
function open(i,toggle){S.forEach(function(s,j){if(j===i){if(toggle&&s.classList.contains("on")){s.classList.remove("on");return}s.classList.add("on")}else s.classList.remove("on");if(j<i)s.classList.add("ok")});var t=S[i];if(t&&!toggle){var y=t.getBoundingClientRect().top+W.scrollY-140;if(Math.abs(W.scrollY-y)>40)W.scrollTo({top:y,behavior:"smooth"})}}
function nx(s,i,lbl,sec){var d=D.createElement("div");d.className="cx13-nx";if(sec){var b2=D.createElement("button");b2.type="button";b2.className="sec";b2.textContent=sec;b2.addEventListener("click",function(){open(i+1)});d.appendChild(b2)}var b=D.createElement("button");b.type="button";b.textContent=lbl;b.style.setProperty("border-radius","10px","important");if(b2)b2.style.setProperty("border-radius","10px","important");b.addEventListener("click",function(){if(i+1<S.length)open(i+1);else{var g=D.querySelector(".cart-page-totals .js-go-to-checkout, .cart-page-totals [name=go_to_checkout], .cart-page-totals input[type=submit], .cart-page-totals button[type=submit]");if(g)g.click()}});d.appendChild(b);s.querySelector(".cx13-bd").appendChild(d)}
function tags(){var rows=[].map.call(D.querySelectorAll(".cx13 input[type=radio]"),function(r){return r.closest("label")||r.parentElement}).filter(function(l){return l&&l.offsetHeight>0});if(rows.length<2)return;var best=null,fast=null;rows.forEach(function(l){var t=l.textContent||"";var p=num((t.match(/R\$\s?[\d.,]+/)||[""])[0]);var d=(t.match(/(\d{2})\/(\d{2})/)||null);var dv=d?(+d[2])*40+(+d[1])+((+d[2])<6?1000:0):9999;l.__p=p;l.__d=dv;if(!best||p<best.__p)best=l;if(!fast||dv<fast.__d)fast=l});rows.forEach(function(l){var o=l.querySelector(".cx13-tag");var want=l===best?"Mais em conta":(l===fast?"Mais rápido":"");if(o&&o.textContent===want)return;if(o)o.remove();if(want){var s=D.createElement("span");s.className="cx13-tag";s.textContent=want;s.style.cssText="display:inline-block;margin-left:8px;padding:3px 7px;border-radius:6px;background:#565229;color:#f6efe9;font:500 11px/1.2 Poppins,sans-serif;vertical-align:middle";var tt=l.querySelector("span, b, strong, div")||l;tt.appendChild(s)}})}
function polish(){tags();[].forEach.call(D.querySelectorAll(".cx13 h4"),function(h){if(/^\s*COSTUMAM LEVAR\s*$/i.test(h.textContent||"")){h.textContent="Costumam levar junto";h.style.cssText="font:600 17px/1.2 Poppins,sans-serif!important;text-transform:none!important;color:#2b2916"}});[].forEach.call(D.querySelectorAll(".cx13 [class*=mi-] button, .cx13 [class*=mi-rounded-full]"),function(b){if(b.tagName==="BUTTON"||b.offsetHeight>24)b.style.setProperty("border-radius","10px","important")})}
function sums(){polish();var list=D.querySelector(".cx13 .js-ajax-cart-list");var n=list?list.querySelectorAll(".js-cart-item").length:0;var sub=(D.querySelector(".js-cart-subtotal")||{}).textContent||"";if(S[0])S[0].querySelector(".sm").textContent=n+(n===1?" item":" itens")+" · "+sub.trim();
var sh=(D.querySelector("#shipping-cost")||{}).textContent||"";if(S[2])S[2].querySelector(".sm").textContent=/Calcule/i.test(sh)?"Calcule com seu CEP":sh.trim();side()}
var CB='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M9.5 9.8c0-1.2 1.1-1.8 2.5-1.8s2.5.7 2.5 1.8-1 1.6-2.5 2-2.5.8-2.5 2 1.1 1.9 2.5 1.9 2.5-.7 2.5-1.9"/></svg>';
function side(){var tot=num((D.querySelector(".js-cart-total")||{}).textContent);var host=D.querySelector(".cart-page-totals .js-cart-total-container");if(!host||!tot)return;var box=D.querySelector(".cx13-side");if(!box){box=D.createElement("div");box.className="cx13-side";host.parentNode.insertBefore(box,host.nextSibling)}
var pts=D.querySelector(".cart-page-totals [class*='mi-bg-']");var cbv=pts?num(((pts.textContent||"").match(/\(R\$\s?[\d.,]+\)/)||[""])[0]):0;
var gift=150,falta=Math.max(0,gift-tot);
var sub=num((D.querySelector(".js-cart-subtotal")||{}).textContent)||tot;var h='<div class="bx pix">No Pix: <b class="v">'+brl(tot-sub*0.05)+'</b> <span style="color:#6f6656">(5% off nos produtos, aplicado no pagamento)</span><div style="margin-top:6px">'+(falta>0?'Faltam <b>'+brl(falta)+'</b> para ganhar um <b>Stroopwafel</b> de brinde pagando no Pix.':'Pagando no Pix, seu pedido ganha um <b>Stroopwafel</b> de brinde.')+'</div><div class="bar"><i style="width:'+Math.min(100,tot/gift*100).toFixed(0)+'%"></i></div></div>';
if(cbv)h+='<div class="bx cb">'+CB+'<span>Você ganha <b>'+brl(cbv)+'</b> de cashback para usar na próxima compra.</span></div>';
if(box.getAttribute("data-h")!==h){box.innerHTML=h;box.setAttribute("data-h",h)}}
function build(){if(D.querySelector(".cx13"))return true;var col=D.querySelector(".cart-page-products"),list=D.querySelector(".js-ajax-cart-list");if(!col||!list||!list.querySelector(".js-cart-item"))return false;
var wrap=D.createElement("div");wrap.className="cx13";
var s1=mk(1,"Seus produtos"),b1=s1.querySelector(".cx13-bd");var hdr=col.querySelector(".cart-page-table-header");if(hdr)b1.appendChild(hdr);b1.appendChild(list);nx(s1,0,"Continuar");wrap.appendChild(s1);
var bump=D.querySelector(".cx2-bump");if(bump){var s2=mk(2,"Uma oferta para você");s2.querySelector(".cx13-bd").appendChild(bump);nx(s2,1,"Quero, continuar","Não, obrigado");var bb=bump.querySelector(".cx2-btn");if(bb)bb.style.display="none";var q=s2.querySelector(".cx13-nx button:not(.sec)");q.onclick=function(e){e.stopImmediatePropagation();if(bb)bb.click();open(S.indexOf(s2)+1)};wrap.appendChild(s2)}
var ful=D.querySelector(".cart-page-fulfillment");var s3=mk(S.length+1,"Entrega");var b3=s3.querySelector(".cx13-bd");var tip=D.createElement("p");tip.className="cx13-tip";tip.textContent="Digite seu CEP e escolha como quer receber. O prazo aparece em cada opção.";b3.appendChild(tip);if(ful)b3.appendChild(ful);nx(s3,S.length-1,"Continuar");wrap.appendChild(s3);
var pg=D.querySelector(".cx2-pg");if(pg){var s4=mk(S.length+1,"Complete o seu pedido");var b4=s4.querySelector(".cx13-bd");var g=D.createElement("div");g.className="cx13-grid";[].slice.call(pg.children).forEach(function(c){if(!c.classList.contains("cx2-bump")&&!c.classList.contains("cx2-b2b"))g.appendChild(c)});b4.appendChild(g);nx(s4,S.length-1,"Ir para o pagamento");wrap.appendChild(s4)}
col.appendChild(wrap);D.body.classList.add("cx13-on");
var stp=D.querySelectorAll(".cx2-steps span");if(stp.length===3){stp[0].textContent="1 · Sacola";stp[1].textContent="2 · Entrega";stp[2].textContent="3 · Pagamento"}
S.forEach(function(s,i){s.querySelector(".n").textContent=i+1});S[0].classList.add("on");sums();
new MutationObserver(function(){clearTimeout(W.__cx13t);W.__cx13t=setTimeout(sums,80)}).observe(D.querySelector(".cart-page-content")||D.body,{childList:true,subtree:true,characterData:true});return true}
var n=0,iv=setInterval(function(){if(build()||++n>60)clearInterval(iv)},200);
})();

;(function(){if(window.__cmlCx14)return;window.__cmlCx14=1;var D=document;if(!/^\/ofertas/.test(location.pathname))return;
var B="https://acdn-us.mitiendanube.com/stores/005/060/752/products/",IM={trx:B+"0001-8666574502263601674-c2069e09b81939a2d817953028382498-640-0.jpg",blm:B+"0001-6013954320081401492-9c94a88665a35f6ac017953028374630-640-0.jpg"};
var st=D.createElement("style");st.textContent='#cml-of3 article[data-c="trx"] .of3-ci:not([data-cx14]) img,#cml-of3 article[data-c="blm"] .of3-ci:not([data-cx14]) img{visibility:hidden}#cml-of3 .of3-ci[data-cx14] img{object-fit:cover!important;width:100%!important;height:100%!important}html body #cml-of3 .of3-ci.n1:not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6){aspect-ratio:1/1!important;height:auto!important;min-height:0!important;max-height:none!important}html body #cml-of3 .of3-ci.n1:not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6) img{width:100%!important;height:100%!important;object-fit:cover!important;max-width:none!important;max-height:none!important}';(D.head||D.documentElement).appendChild(st);
function fix(){Object.keys(IM).forEach(function(k){var c=D.querySelector('#cml-of3 article[data-c="'+k+'"] .of3-ci');if(!c||c.getAttribute("data-cx14"))return;var tg=c.querySelector(".tg");[].slice.call(c.querySelectorAll("img")).forEach(function(i){i.remove()});var im=D.createElement("img");im.src=IM[k];im.alt="";im.loading="lazy";im.decoding="async";["width:100%","height:100%","max-width:none","max-height:none","object-fit:cover","position:absolute","inset:0","border-radius:0"].forEach(function(p){var a=p.split(":");im.style.setProperty(a[0],a[1],"important")});if(getComputedStyle(c).position==="static")c.style.position="relative";c.insertBefore(im,c.firstChild);c.className=c.className.replace(/\bn\d\b/,"n1");c.setAttribute("data-cx14","1")})}
var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(fix,30)}).observe(D.documentElement,{childList:true,subtree:true});fix();
})();

;(function(){if(window.__cmlCx15)return;window.__cmlCx15=1;var D=document;
var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6)";
var css="html body .cx3-bar .cx3-v.c6-gold"+N+"{background:#fffaf5!important;color:#2b2916!important;border-color:#e8ddd0!important}html body .cx3-bar .cx3-v.c6-gold.on"+N+"{background:#565229!important;color:#f6efe9!important;border-color:#565229!important}"+"@media(max-width:760px){html body .adbar.cx5-on"+N+"::after{content:'Black Friday · 23 a 30/11'!important;letter-spacing:.08em!important;white-space:nowrap!important}html body .adbar.cx5-on"+N+"{gap:8px!important;overflow:hidden!important;justify-content:center!important}html body .cx5-bar .l"+N+"{display:none!important}"
+"html body .cx4-cha .cx4-lead"+N+",html body .cx4-cha .cx4-d"+N+"{display:none!important}html body .cx4-cha .cx4-trio .ims"+N+",html body .cx4-cha .cx4-trio .ims a"+N+"{height:240px!important}html body .cx4-cha .cx4-trio .ims img"+N+"{height:240px!important;object-fit:cover!important}html body .cx4-cha .cx4-h"+N+"{font-size:24px!important}}";
var st=D.createElement("style");st.textContent=css;(D.head||D.documentElement).appendChild(st);
function ph(){if(!D.body||D.querySelector(".js-payment-discount-price-cart-container"))return;var wr=D.createElement("div");wr.id="cx15-ph";wr.setAttribute("hidden","");wr.style.cssText="display:none!important";var d=D.createElement("div");d.className="js-payment-discount-price-cart-container";d.setAttribute("aria-hidden","true");d.innerHTML="<span class=\"js-payment-discount-price-cart\"></span><span class=\"js-payment-discount-name-cart\"></span><span class=\"js-payment-discount-installments\" data-text-singular=\"\" data-text-plural=\"\"></span>";wr.appendChild(d);D.body.appendChild(wr)}
if(D.body)ph();else D.addEventListener("DOMContentLoaded",ph);
})();

;(function(){if(window.__cmlCx16)return;window.__cmlCx16=1;var D=document,W=window;
var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6)";
var css="html body .js-item-product .product-item-promo-label"+N+"{display:none!important}"
+"html body .cx16-pl"+N+"{display:block;margin:4px 0 0;font:500 12px/1.3 Poppins,sans-serif;color:#565229;text-transform:none;letter-spacing:0}"
+"html body .newsletter-form-input"+N+",html body input.w.newsletter-form-input"+N+"{border-radius:10px!important}"
+"html body .swiper-pagination"+N+",html body .js-product-slider-pagination"+N+"{border-radius:6px!important}"+"@media(max-width:760px){html body .cml-hl-c"+N+"{padding:18px 20px!important;min-height:0!important}html body .cml-hl-c p"+N+"{display:none!important}html body .cml-hl-c.t-blk"+N+"::before{display:none!important}html body .cml-hl-c h3"+N+"{font-size:19px!important;margin:4px 0 0!important}html body .cml-hl .cml-hl-g"+N+"{gap:12px!important}html body .c2-rk .live"+N+"{display:none!important}}"+"html body #cml-of3 .of3-q"+N+"{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:6px!important}html body #cml-of3 .of3-q button"+N+"{white-space:nowrap!important;padding:8px 4px!important;font-size:12.5px!important;text-align:center!important;justify-content:center!important;min-width:0!important}html body #cml-of3 .of3-pr"+N+"{flex-wrap:nowrap!important;align-items:center!important;gap:8px!important}@media(max-width:760px){html body #cml-of3 .of3-pr .por"+N+"{font-size:22px!important}html body #cml-of3 .of3-pr .de"+N+"{font-size:12px!important}}"+"html body .js-product-info .js-product-variants-group"+N+"{display:flex!important;flex-wrap:wrap!important;gap:8px!important}html body .js-product-info .js-product-variants-group>*:not(.btn-variant)"+N+"{flex:1 1 100%!important}html body .js-product-info .js-product-variants-group .btn-variant"+N+"{flex:0 0 calc(25% - 6px)!important;margin:0!important;min-width:0!important;border-radius:10px!important;text-align:center!important}@media(max-width:760px){html body .js-product-info .js-product-variants-group .btn-variant"+N+"{flex:0 0 calc(50% - 4px)!important}}"+"html body #modal-cart .js-cart-quantity-btn svg"+N+"{display:none!important}html body #modal-cart .js-cart-quantity-btn"+N+"{display:flex!important;align-items:center;justify-content:center;cursor:pointer;color:#2b2916!important;font:400 18px/1 Poppins,sans-serif!important}html body #modal-cart .js-cart-quantity-minus"+N+"::before{content:\"\\2212\"}html body #modal-cart .js-cart-quantity-plus"+N+"::before{content:\"+\"}"+"html body #modal-cart .cml-cf"+N+"{display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:8px!important}html body #modal-cart .cml-cf>*"+N+"{width:100%!important;max-width:none!important;flex:0 0 auto!important;margin-left:0!important;margin-right:0!important}html body #modal-cart .cml-cf>.cx2-cp"+N+"{order:1!important}html body #modal-cart .cml-cf>.cx2-sub"+N+"{order:2!important}html body #modal-cart .cml-cf>.cx2-pay"+N+"{order:3!important}html body #modal-cart .cml-cf>.js-ajax-cart-submit"+N+"{order:4!important}html body #modal-cart .cml-cf>.cx2-more"+N+"{order:5!important}html body #modal-cart .cml-cf .js-ajax-cart-submit .btn"+N+"{width:100%!important}"+"html body.modal-show"+N+",html body.modal-visible"+N+"{overflow:hidden!important}html:has(body.modal-show)"+N+"{overflow:hidden!important}html body.modal-show .modal"+N+"{overscroll-behavior:contain}";
var st=D.createElement("style");st.textContent=css;(D.head||D.documentElement).appendChild(st);
function promo(root){[].forEach.call((root||D).querySelectorAll(".js-item-product"),function(it){var l=it.querySelector(".product-item-promo-label");if(!l||it.querySelector(".cx16-pl"))return;var t=(l.textContent||"").trim();if(!t)return;var m=t.match(/(?:Compre|Leve)\s+(\d+).*?pague\s+(\d+)/i);var txt=m?"Leve "+m[1]+", pague "+m[2]:t;var pr=it.querySelector(".item-price-container, .js-price-display, [class*=item-price]");var host=pr?(pr.closest(".item-price-container")||pr.parentElement):null;if(!host)return;var s=D.createElement("span");s.className="cx16-pl";s.textContent=txt;host.parentNode.insertBefore(s,host.nextSibling)})}
function lim(h){return h<=30?6:(h<=64?10:16)}
function soft(root){if(!root||root.nodeType!==1)return;var list=[root].concat([].slice.call(root.querySelectorAll("*")));list.forEach(function(e){if(e.closest&&e.closest("#mobf"))return;var r=e.getBoundingClientRect();if(r.width<20||r.height<12)return;if(Math.abs(r.width-r.height)<6&&r.height<80)return;var s=getComputedStyle(e);var br=parseFloat(s.borderTopLeftRadius)||0;var L=lim(r.height);if(br<=L+1)return;var vis=s.backgroundColor!=="rgba(0, 0, 0, 0)"||parseFloat(s.borderTopWidth)>0||s.backgroundImage!=="none"||/^(IMG|VIDEO|BUTTON|INPUT|A|SELECT)$/.test(e.tagName);if(!vis)return;e.style.setProperty("border-radius",L+"px","important")})}
var q=[],t;function flush(){var a=q;q=[];a.forEach(function(n){if(n.isConnected){soft(n);promo(n.parentNode||D)}})}
function full(){soft(D.body);promo(D)}
function go(){full();setTimeout(full,1500);setTimeout(full,4000);new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,function(n){if(n.nodeType===1)q.push(n)})});flush()}).observe(D.body,{childList:true,subtree:true})}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",go);else go();
})();

;(function(){if(window.__cmlCx17)return;window.__cmlCx17=1;var D=document;
var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6)";
var css="html body .cx17-v"+N+"{margin:14px 0 6px;max-width:520px}html body .cx17-v .h"+N+"{font:500 11.5px/1.2 Poppins,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#a65a14;margin:0 0 8px}"
+"html body .cx17-v .r"+N+"{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}@media(min-width:761px){html body .cx17-v .r"+N+"{grid-template-columns:repeat(4,minmax(0,1fr))}}"
+"html body .cx17-v button"+N+"{display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:10px 12px;min-height:52px;border:1px solid #e8ddd0;border-radius:10px;background:#fffaf5;color:#2b2916;font:600 13.5px/1.25 Poppins,sans-serif;text-align:left;cursor:pointer;text-transform:none}"
+"html body .cx17-v button small"+N+"{font:400 12px/1.25 Poppins,sans-serif;color:#6f6656}html body .cx17-v button.on"+N+"{border-color:#a65a14;background:#fff;box-shadow:inset 0 0 0 1px #a65a14}html body .cx17-v button.on small"+N+"{color:#a65a14}"
+"html body .cml-dst .dh .cx11-tiers"+N+"{display:none!important}";
var st=D.createElement("style");st.textContent=css;(D.head||D.documentElement).appendChild(st);
function brl(t){return t}
function txt(e){return (e&&e.textContent||"").replace(/\s+/g," ").trim()}
function split(l){var m=l.match(/^(.*?)\s*\((.*)\)\s*$/);return m?[m[1],m[2]]:[l.replace(/R\$\s?[\d.,]+/,"").trim()||l,(l.match(/R\$\s?[\d.,]+/)||[""])[0]]}
function sync(box,hero){var p=D.querySelector("#ns-section-main_product .js-price-display"),c=D.querySelector("#ns-section-main_product .js-compare-price-display");var pp=hero.querySelector(".dst-pp"),pc=hero.querySelector(".dst-pc");if(p&&pp)pp.textContent=txt(p).replace(/^R\$\s?/,"R$ ");if(pc){var ct=txt(c);pc.innerHTML=ct?"<s>de "+ct.replace(/^R\$\s?/,"R$ ")+"</s>":""}}
function build(){var d=D.querySelector(".cml-dst .dh");if(!d||d.querySelector(".cx17-v"))return !!d;var vb=[].slice.call(D.querySelectorAll("#ns-section-main_product .js-variant-button"));if(vb.length<2)return true;
var pr=d.querySelector(".pr");if(!pr)return false;var box=D.createElement("div");box.className="cx17-v";
var lab=D.querySelector("#ns-section-main_product .js-product-variants-group label, #ns-section-main_product .js-product-variants-group .form-label");
box.innerHTML='<div class="h">'+(lab?txt(lab).replace(/:.*$/,""):"Quantidade")+'</div><div class="r">'+vb.map(function(b,i){var s=split(txt(b));return '<button type="button" data-i="'+i+'"'+(b.classList.contains("selected")||(i===0&&!vb.some(function(x){return x.classList.contains("selected")}))?' class="on"':'')+'>'+s[0]+(s[1]?'<small>'+s[1]+'</small>':'')+'</button>'}).join("")+'</div>';
pr.parentNode.insertBefore(box,pr.nextSibling);
box.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;var i=+b.getAttribute("data-i");var y=window.scrollY;var fix=function(){if(Math.abs(window.scrollY-y)>2)window.scrollTo(0,y)};vb[i].click();fix();requestAnimationFrame(fix);setTimeout(fix,60);setTimeout(fix,250);setTimeout(fix,600);[].forEach.call(box.querySelectorAll("button"),function(x){x.classList.toggle("on",x===b)});setTimeout(function(){sync(box,d)},150);setTimeout(function(){sync(box,d)},500)});
var hb=d.querySelector(".js-dst-buy");if(hb){hb.innerHTML=hb.innerHTML.replace(/Escolher quantidade/,"Comprar agora");D.addEventListener("click",function(e){if(!e.target.closest||!e.target.closest(".cml-dst .dh .js-dst-buy"))return;var a=D.querySelector("#ns-section-main_product .js-addtocart");if(a&&!a.disabled){e.preventDefault();e.stopImmediatePropagation();a.click()}},true)}
D.body.classList.add("cx12-nomain");sync(box,d);return true}
var n=0,iv=setInterval(function(){if(build()||++n>40)clearInterval(iv)},250);
})();

/* cx18 mega menu: card lateral compacto, sem sombra, acima da barra de rastreio */
(function(){if(window.__cx18)return;window.__cx18=1;var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6)";var c="@media (min-width:1024px){html body .nav-desktop .desktop-dropdown"+N+"{z-index:5!important}html body .cml-mm-side"+N+"{justify-content:flex-start!important;align-self:start!important;min-height:0!important;padding:22px!important}html body .cml-mm-side"+N+" h4{text-wrap:balance}html body .cml-mm-side"+N+" .b{box-shadow:none!important}html body .cml-mm-side"+N+" .l{border-bottom-width:1px!important;border-bottom-color:rgba(166,90,20,.3)!important}}";var s=document.createElement("style");s.id="cx18";s.textContent=c;(document.head||document.documentElement).appendChild(s)})();
/* cx19 (22/11, revisto 23/11): no menu do computador, toda coluna sem subcategoria lista os seus produtos (sem "Ver produtos"); banner de categoria sem foto de fundo errada */
;(function(){try{if(window.__cx19)return;window.__cx19=1;var D=document;var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6)";
var CF=["Chaleira com Infusor","chaleira-de-vidro-com-infusor"],CI=["Chaleira com Filtro","chaleira-de-vidro-com-filtro"],XF=["Xícara Flowers Infusor","xicara-flowers-infusor"],KT=["Ternura","kit-ternura1"],KF=["Flowers","kit-flowers"],KB=["Best Sellers","combo-bestsellers"],KM=["Materna","ciclo-materna-gestacao-e-amamentacao"];
var M={"/cha-misto/":[["Sereníssimo","cha-blend-serenissimo"],["Intenso","cha-blend-intenso"],["Performance","cha-business-performance"],["Quentão","cha-blend-quentao"],["Sport","cha-blend-sport-recovery"],["Estética","cha-estetica-equilibrio-digestivo"],["Ciclo","cha-ciclo-harmonia---fase-fertil"],["Gestação","cha-maternidade-gestacao"],["Lactação","cha-maternidade-lactacao"],["Maturidade","cha-maturidade-plena---menopausa"],["Durex (lata 80 g)","cha-blend-durex-11bm4"]],
"/para-fas-de-chas/":[KT,KF,KB,KM],
"/kitexclusivos/":[KT,KF,["Desdobramento","kit-desdobramento-l1xs1"],KB,KM],
"/presentes-corporativos/":[["Flowers Tropical","kit-flowers-tropical-1prqk"],["Snack Tropical","kit-snack-tropical-1tymf"],["Queridinho","kit-queridinho-mh3t6"],["Para Aquela Pessoa","kit-para-aquela-pessoa-q602v"]],
"/xicaras/":[["Xícara Vidro Duplo","xicara-de-vidro-duplo"],["Xícara Good Morning","xicara-good-morning"],["Xícara Bird","xicara-bird"],XF],
"/garrafas/":[CF,CI],
"/raspadores/":[["Raspador de Cobre","raspador-de-lingua-100-cobre-natural-bldny"]],
"/infusores/":[["Infusor Inox","infusor-inox"],XF],
"/chaleiras/":[CF,CI]};
var c="html body .category-banner.c2-cbn picture"+N+",html body .category-banner.c2-cbn img"+N+"{display:none!important}"
+"html body .desktop-list-subitems>li.cx19-li>.list-subitems"+N+"{display:grid!important;grid-template-columns:repeat(2,minmax(0,max-content));column-gap:28px}";
var s=D.createElement("style");s.id="cx19";s.textContent=c;(D.head||D.documentElement).appendChild(s);
function fill(){var hs=D.querySelectorAll(".desktop-list-subitems>li.nav-item>a.nav-list-link-heading");if(!hs.length)return false;
[].forEach.call(hs,function(a){var li=a.parentNode;if(li.querySelector("ul"))return;var p=a.pathname||"";var k=Object.keys(M).filter(function(x){return p.slice(-x.length)===x})[0];if(!k)return;var P=M[k];
var ul=D.createElement("ul");ul.className="list-subitems list-unstyled";ul.innerHTML=P.map(function(q){return '<li class="nav-item"><a href="/produtos/'+q[1]+'/" class="nav-list-link">'+q[0]+'</a></li>'}).join("");li.appendChild(ul);if(P.length>6)li.classList.add("cx19-li")});return true}
if(!fill()){var n=0;var iv=setInterval(function(){if(fill()||++n>40)clearInterval(iv)},150);D.addEventListener("DOMContentLoaded",fill)}
}catch(e){}})();

/* cx20 (22/11): bloco do trio nas categorias de cha cabe em uma tela */
;(function(){try{if(window.__cx20)return;window.__cx20=1;var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6):not(#a7)";
var c="html body .cx4-trio .ims img"+N+"{aspect-ratio:4/3!important;object-fit:cover!important;width:100%!important;height:100%!important}"
+"html body .cx4-trio .ims"+N+",html body .cx4-trio .ims>a"+N+"{aspect-ratio:4/3;height:auto!important;max-height:330px;overflow:hidden}"
+"@media(min-width:900px){html body .cx4-trio"+N+"{grid-template-columns:minmax(0,5fr) minmax(0,7fr)!important;align-items:center}html body .cx4-trio .tx"+N+"{padding:24px 28px!important;gap:14px}html body .cx4-trio .cx4-d"+N+"{font-size:14px!important;line-height:1.5!important;margin:0!important}}"
+"@media(max-width:899px){html body .cx4-trio .ims"+N+"{max-height:260px}}";
var s=document.createElement("style");s.id="cx20";s.textContent=c;(document.head||document.documentElement).appendChild(s)}catch(e){}})();

/* cx21 (22/11): barras nativas do tema (quando existem) nao recebem texto por cima */
;(function(){try{if(window.__cx21)return;window.__cx21=1;var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6):not(#a7)";var B=".adbar:is(:has(a[href*='#black']),:has(a[href*='/account']))";var T=".adbar:has(a[href*='/account'])";
var c="html body "+B+N+":after,html body.template-home "+B+N+":after{content:none!important;display:none!important}"
+"html body "+T+N+"{background:#403d1e!important;min-height:30px}"
+"html body "+T+N+" a,html body "+T+N+" .adbar-item"+N+"{font:500 11px/1.2 Poppins,sans-serif!important;letter-spacing:.14em!important;text-transform:uppercase!important;color:#e9e2d6!important;text-decoration:none!important}";
var s=document.createElement("style");s.id="cx21";s.textContent=c;(document.head||document.documentElement).appendChild(s)}catch(e){}})();

/* cx22 (22/11): categorias no celular mais limpas: sem filtros, abas de texto discretas, banner compacto */
;(function(){try{if(window.__cx22)return;window.__cx22=1;var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6):not(#a7)";
var c="@media(max-width:899px){"
+"html body .js-category-controls"+N+",html body .category-controls-sticky-detector"+N+",html body aside.c2-side"+N+",html body .cx3-fbtn"+N+"{display:none!important}html body .cx3-bar"+N+"{justify-content:flex-end!important;margin:0 0 12px!important;padding:0 0 10px!important}html body .cx3-view button"+N+"{width:34px!important;height:34px!important}"
+"html body nav.c2-chips"+N+"{display:flex!important;gap:22px!important;padding:2px 2px 0!important;margin:4px 0 18px!important;border-bottom:1px solid #e8ddd0!important;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;scroll-snap-type:x proximity}"
+"html body nav.c2-chips::-webkit-scrollbar{display:none}"
+"html body nav.c2-chips a"+N+"{flex:0 0 auto;display:block!important;height:auto!important;padding:10px 0 11px!important;margin:0 0 -1px!important;border:0!important;border-bottom:1.5px solid transparent!important;border-radius:0!important;background:none!important;box-shadow:none!important;font:400 14px/1.2 Poppins,sans-serif!important;letter-spacing:0!important;color:#6f6656!important;white-space:nowrap;scroll-snap-align:start}"
+"html body nav.c2-chips a.on"+N+"{color:#2b2916!important;font-weight:500!important;border-bottom-color:#565229!important}"
+"html body .category-banner.c2-cbn"+N+"{min-height:0!important;height:auto!important;aspect-ratio:auto!important;padding:0!important}"
+"html body .category-banner.c2-cbn .c2-cbt"+N+N+"{padding:18px 20px!important;min-height:0!important}"
+"html body .category-banner.c2-cbn h2"+N+"{font-size:28px!important;line-height:1.1!important;margin:4px 0 6px!important}"
+"html body .category-banner.c2-cbn h1"+N+",html body .category-banner.c2-cbn .c2-cbt h1"+N+"{font-size:28px!important;line-height:1.1!important;margin:4px 0 6px!important}"
+"html body .category-banner.c2-cbn p"+N+"{font-size:13.5px!important;margin:0!important}"
+"html body .category-banner.c2-cbn .k"+N+"{font-size:10px!important;margin:0!important}"
+"}";
var s=document.createElement("style");s.id="cx22";s.textContent=c;(document.head||document.documentElement).appendChild(s);
var n=0,iv=setInterval(function(){var a=document.querySelector("nav.c2-chips a.on");if(a){var nv=a.parentNode;if(nv.scrollWidth>nv.clientWidth)nv.scrollLeft=Math.max(0,a.offsetLeft-nv.offsetLeft-16);clearInterval(iv)}else if(++n>30)clearInterval(iv)},200)}catch(e){}})();

/* cx23 (22/11): bloco Embalagem claro, leve e enxuto */
;(function(){try{if(window.__cx23)return;window.__cx23=1;var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6):not(#a7):not(#a8)";var R="html body .cmle"+N;
var c=R+"{background:#fffaf5!important;background-image:none!important;border:1px solid #e8ddd0!important;border-radius:16px!important;padding:18px 20px!important;box-shadow:none!important;color:#2b2916!important}"
+R+" h3{margin:0 0 4px!important;font:500 11px/1.2 Poppins,sans-serif!important;letter-spacing:.16em!important;text-transform:uppercase!important;color:#a65a14!important}"
+R+" .cmle-q{margin:0 0 12px!important;font:600 15px/1.3 Poppins,sans-serif!important;color:#2b2916!important}"
+R+" .cmle-inc{display:none!important}"
+R+" .cmle-l{display:grid!important;gap:8px!important}"
+R+" .cmle-o{display:grid!important;grid-template-columns:16px 44px minmax(0,1fr) auto!important;align-items:center!important;gap:12px!important;width:100%!important;padding:10px 14px!important;margin:0!important;background:#fff!important;border:1px solid #e8ddd0!important;border-radius:10px!important;box-shadow:none!important;text-align:left!important;color:#2b2916!important;cursor:pointer;transition:border-color .15s}"
+R+" .cmle-o:hover{border-color:#a99886!important}"
+R+" .cmle-o[aria-checked=true]{border-color:#565229!important;box-shadow:inset 0 0 0 1px #565229!important;background:#fffdf9!important}"
+R+" .cmle-r{width:16px!important;height:16px!important;border-radius:50%!important;border:1.5px solid #a99886!important;background:#fff!important;box-shadow:none!important;display:block!important}"
+R+" .cmle-o[aria-checked=true] .cmle-r{border-color:#565229!important;background:#565229!important;box-shadow:inset 0 0 0 3px #fff!important}"
+R+" .cmle-r:after,"+R+" .cmle-r:before{display:none!important}"
+R+" .cmle-i{width:44px!important;height:44px!important;border-radius:8px!important;background:#f6efe9!important;border:0!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important;color:#565229!important}"
+R+" .cmle-i img{width:100%!important;height:100%!important;object-fit:cover!important;border-radius:0!important}"
+R+" .cmle-i svg{width:20px!important;height:20px!important;color:#565229!important;stroke:currentColor}"
+R+" .cmle-t b{display:block!important;font:600 14px/1.3 Poppins,sans-serif!important;color:#2b2916!important}"
+R+" .cmle-t small{display:block!important;margin-top:2px!important;font:400 12.5px/1.35 Poppins,sans-serif!important;color:#6f6656!important}"
+R+" .cmle-p{font:600 13.5px/1.2 Poppins,sans-serif!important;color:#565229!important;white-space:nowrap}"
+R+" .cmle-p.z{font-weight:400!important;color:#6f6656!important}"
+R+" .cmle-r{grid-column:1!important;grid-row:1!important}"+R+" .cmle-i{grid-column:2!important;grid-row:1!important}"+R+" .cmle-t{grid-column:3!important;grid-row:1!important;min-width:0}"+R+" .cmle-p{grid-column:4!important;grid-row:1!important;text-align:right;margin:0!important}"
+R+" .cmle-tot{margin-top:10px!important;font:400 13px/1.4 Poppins,sans-serif!important;color:#6f6656!important;background:none!important;border:0!important;padding:0!important}"
+R+" .cmle-tot b{color:#2b2916!important}"
+"@media(max-width:600px){"+R+"{padding:14px!important;border-radius:14px!important}"+R+" .cmle-q{font-size:14px!important;margin-bottom:10px!important}"+R+" .cmle-o{grid-template-columns:16px 38px minmax(0,1fr) auto!important;gap:10px!important;padding:8px 10px!important}"+R+" .cmle-i{width:38px!important;height:38px!important}"+R+" .cmle-t b{font-size:13.5px!important}"+R+" .cmle-t small{font-size:12px!important}"+R+" .cmle-p{font-size:13px!important}}";
var s=document.createElement("style");s.id="cx23";s.textContent=c;(document.head||document.documentElement).appendChild(s)}catch(e){}})();

/* cx24 (22/11): cabecalho translucido igual ao do tema (nao muda depois de carregar) */
;(function(){try{if(window.__cx24)return;window.__cx24=1;var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6):not(#a7)";
var c="html body .js-head-main.head-main"+N+",html body .is-fixed .js-head-main.head-main"+N+"{position:relative;isolation:isolate;background:transparent!important;background-color:transparent!important;box-shadow:0 1px 0 rgba(86,82,41,.10)!important}"
+"html body .js-head-main.head-main"+N+"::before{content:'';position:absolute;inset:0;z-index:-1;background:rgba(246,239,233,.82);-webkit-backdrop-filter:blur(14px) saturate(1.15);backdrop-filter:blur(14px) saturate(1.15);pointer-events:none}"
+"html body .adbar:has(a[href*='#black'])"+N+" .cx5-bar{display:flex!important}";
var s=document.createElement("style");s.id="cx24";s.textContent=c;(document.head||document.documentElement).appendChild(s)}catch(e){}})();

/* cx25 (22/11): setas no mesmo padrao em todo o site; videos de clientes de ponta a ponta */
;(function(){try{if(window.__cx25)return;window.__cx25=1;var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6):not(#a7)";
var A="width:40px!important;height:40px!important;padding:0!important;border-radius:50%!important;border:1px solid rgba(86,82,41,.22)!important;background:rgba(255,250,245,.86)!important;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);color:#2b2916!important;box-shadow:none!important;display:grid!important;place-items:center!important;transition:background .2s,color .2s,border-color .2s!important";
var H="background:#565229!important;border-color:#565229!important;color:#f6efe9!important";
var c="html body .cx8-nav"+N+",html body .swiper-button-prev:not(.swiper-product-arrow)"+N+",html body .swiper-button-next:not(.swiper-product-arrow)"+N+"{"+A+"}"
+"html body .cx8-nav"+N+":hover,html body .swiper-button-prev"+N+":hover,html body .swiper-button-next"+N+":hover{"+H+"}"
+"html body .cx8-nav"+N+" svg{width:16px!important;height:16px!important}"
+"html body div.cml-hs"+N+"{margin-left:0!important;margin-right:0!important;border-radius:0!important;border-left:0!important;border-right:0!important;padding-left:0!important;padding-right:0!important;width:auto!important;max-width:none!important}";
var s=document.createElement("style");s.id="cx25";s.textContent=c;(document.head||document.documentElement).appendChild(s)}catch(e){}})();

/* cx26 (22/11): contrastes (encontre seu cha, blog, faq, contato), Pix 5% nos textos fixos e sinal de pagina pronta (cml-rdy) */
;(function(){try{if(window.__cx26)return;window.__cx26=1;var D=document,H=D.documentElement,P=location.pathname;var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6):not(#a7)";
var c="html body #cef-quiz .cef-tb td:first-child"+N+",html body #cef-quiz .cef-tb th:first-child"+N+"{color:#6f6656!important;opacity:1!important}"
+"html body #cef-quiz .cef-tb td:last-child"+N+"{color:#2b2916!important;opacity:1!important}"
+"html body .cml-fq-tabs button"+N+"{color:#2b2916!important;background:#fffaf5!important;border:1px solid #e0d3c3!important}"
+"html body .cml-fq-tabs button"+N+":hover{border-color:#565229!important}"
+"html body .cml-fq-tabs button.on"+N+",html body .cml-fq-tabs button[aria-selected=true]"+N+",html body .cml-fq-tabs button.is-on"+N+"{color:#fff!important;background:#a65a14!important;border-color:#a65a14!important}"
+"html body .cml-ct-k"+N+"{color:#a65a14!important}"
+"html body .cml-bl-cta"+N+" :is(h2,h3,h4,p,li,span,strong,em,b){color:#f6efe9!important}"
+"html body .cml-bl-cta"+N+" p a{color:#f3d48b!important;text-decoration-color:rgba(243,212,139,.5)!important}";
var s=D.createElement("style");s.id="cx26";s.textContent=c;(D.head||H).appendChild(s);
function txt(){var w=D.createTreeWalker(D.body,NodeFilter.SHOW_TEXT),n,L=[];while(n=w.nextNode()){if(/2%/.test(n.nodeValue))L.push(n)}L.forEach(function(n){var v=n.nodeValue,p=n.parentNode;if(!p||/^(SCRIPT|STYLE)$/.test(p.nodeName))return;var nv=v.replace(/\b2% de desconto/g,"5% de desconto").replace(/PIX COM 2% OFF/g,"PIX COM 5% OFF").replace(/2% (OFF|off) no Pix/g,"5% $1 no Pix");if(/^\s*2%\s*$/.test(v)){var box=p.parentNode;if(box&&/pix/i.test(box.textContent))nv=v.replace("2%","5%")}if(nv!==v)n.nodeValue=nv})}
function ready(){if(/^\/encontre-seu-cha\/?$/.test(P))return !!D.querySelector("#cef-quiz .cef");if(/^\/faq\/?$/.test(P))return !!D.querySelector(".cml-fq");if(/^\/ofertas\/?$/.test(P))return !!D.querySelector("#cml-of3 .of3-hero");if(/^\/presentes-de-natal\/?$/.test(P))return !!D.querySelector("#cml-natal .cmn-hero");if(/^\/contato\/?$/.test(P))return !!D.querySelector(".cml-ct");if(/^\/quem-somos\/?$/.test(P))return !!D.querySelector(".cml-story");if(/^\/politica-de-cashback\/?$/.test(P))return !!D.querySelector(".c7-cb");return D.readyState!=="loading"}
function cbk(){var r=D.querySelector(".c7-fc a[href$='/account/']");if(!r||D.querySelector(".c7-fc a.cx26-cb"))return;var a=r.cloneNode(true);a.className=(a.className?a.className+" ":"")+"cx26-cb";a.href="/politica-de-cashback/";a.textContent="Como funciona o cashback";r.parentNode.insertBefore(a,r.nextSibling)}
var m=0;(function f(){try{cbk()}catch(e){}if(!D.querySelector(".c7-fc a.cx26-cb")&&++m<40)setTimeout(f,250)})();
var n=0;(function t(){var ok=false;try{ok=ready()}catch(e){}if(ok||++n>70){try{txt()}catch(e){}requestAnimationFrame(function(){requestAnimationFrame(function(){H.classList.add("cml-rdy")})});return}setTimeout(t,35)})();
addEventListener("load",function(){try{txt()}catch(e){}});
}catch(e){document.documentElement.classList.add("cml-rdy")}})();

/* cx27 (22/11): Quem somos e Contato mais enxutos; prova social no Quem somos */
;(function(){try{if(window.__cx27)return;window.__cx27=1;var D=document,P=location.pathname;var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6):not(#a7)";var S="html body .cml-story";
var c=""
+S+" .st-hero"+N+N+"{min-height:0!important;height:auto!important;max-height:none!important;grid-template-rows:auto!important;grid-auto-rows:auto!important;padding-top:48px!important;padding-bottom:48px!important}"
+S+" .st-hero img"+N+"{max-height:460px!important;object-fit:cover!important}"
+S+" .cx27-pr"+N+"{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;max-width:960px;margin:28px auto 8px;padding:0 16px}"
+S+" .cx27-pr div"+N+"{background:#fffaf5;border:1px solid #e8ddd0;border-radius:14px;padding:16px 18px;text-align:center;font-family:Poppins,sans-serif}"
+S+" .cx27-pr b"+N+"{display:block;font:700 26px/1.1 Poppins,sans-serif;color:#a65a14;letter-spacing:-.01em}"
+S+" .cx27-pr span"+N+"{display:block;margin-top:4px;font:400 13px/1.35 Poppins,sans-serif;color:#6f6656}"
+S+" .cml-st-quote"+N+"{padding-top:28px!important;padding-bottom:28px!important;margin-top:24px!important;margin-bottom:24px!important}"
+S+" .cml-st-quote p"+N+",html body .cml-story .cml-q-t"+N+"{font-size:clamp(18px,1.6vw,22px)!important;line-height:1.45!important}"
+S+" .cml-st-quote img"+N+"{max-height:220px!important;width:auto!important}"
+S+" .st-row img"+N+"{max-height:420px!important;object-fit:cover!important}"
+S+" .st-row"+N+"{padding-top:28px!important;padding-bottom:28px!important}"
+"@media(max-width:640px){"+S+" .cx27-pr"+N+"{grid-template-columns:1fr 1fr 1fr;gap:8px}"+S+" .cx27-pr div"+N+"{padding:12px 8px}"+S+" .cx27-pr b"+N+"{font-size:20px}"+S+" .cx27-pr span"+N+"{font-size:11.5px}"+S+" .st-hero img"+N+"{max-height:300px!important}"+S+" .st-row img"+N+"{max-height:300px!important}}"
+"@media(min-width:900px){html body .cml-ct-form form"+N+"{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;column-gap:16px!important;align-items:start}"
+"html body .cml-ct-form form>.form-group:has(textarea)"+N+",html body .cml-ct-form form>button"+N+",html body .cml-ct-form form>.winnie-pooh"+N+",html body .cml-ct-form form>input"+N+",html body .cml-ct-form form>.alert"+N+"{grid-column:1/-1}"
+"html body .cml-ct-form form>.form-group"+N+"{width:auto!important;max-width:none!important}"
+"html body .cml-ct-form"+N+",html body .contact-form-container.cml-ct-form"+N+"{max-width:960px!important}}"
+"html body .cml-ct-form textarea"+N+"{min-height:120px!important;height:120px!important}";
var s=D.createElement("style");s.id="cx27";s.textContent=c;(D.head||D.documentElement).appendChild(s);
if(/^\/quem-somos\/?$/.test(P)){var n=0;(function t(){var h=D.querySelector(".cml-story .st-hero");if(h&&!D.querySelector(".cx27-pr")){var d=D.createElement("div");d.className="cx27-pr";d.innerHTML="<div><b>5,0</b><span>nota no Google</span></div><div><b>+2.700</b><span>pedidos entregues</span></div><div><b>6 países</b><span>onde nossos produtos já chegaram</span></div>";h.parentNode.insertBefore(d,h.nextSibling);return}if(++n<60)setTimeout(t,50)})()}
}catch(e){}})();

/* cx28 (22/11): Minha conta mais enxuta: sem cashback repetido, missoes numa linha, sem bloco vazio de favoritos */
;(function(){try{if(window.__cx28)return;window.__cx28=1;if(!/^\/account\/?/.test(location.pathname))return;var D=document;var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6):not(#a7)";
var c="html body .cmc .cmc-kpi>*:nth-child(2)"+N+"{display:none!important}"
+"html body .cmc .cmc-gg"+N+"{grid-template-columns:repeat(auto-fit,minmax(180px,1fr))!important;gap:12px!important}"
+"html body .cmc .cmc-sec.cx28-off"+N+"{display:none!important}";
var s=D.createElement("style");s.id="cx28";s.textContent=c;(D.head||D.documentElement).appendChild(s);
var n=0;(function t(){[].forEach.call(D.querySelectorAll(".cmc .cmc-sec"),function(x){var e=x.querySelector(".cmc-emp");if(e&&/favoritos aparecem/i.test(e.textContent))x.classList.add("cx28-off")});if(++n<40)setTimeout(t,250)})();
}catch(e){}})();

/* cx30 blog: contraste do topo (subtitulo e filtros) e respiro menor entre titulo e subtitulo */
;(function(){try{if(window.__cx30)return;window.__cx30=1;var D=document;var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6):not(#a7)";
var c="html body .cbl-hd .cbl-s"+N+"{color:#6f6656!important;margin:0 auto!important;max-width:620px}"
+"html body .cbl-hd .cbl-c[aria-selected=false]"+N+"{background:#fffaf5!important;color:#2b2916!important;border:1px solid #d9c9b5!important}"
+"html body .cbl-hd .cbl-c[aria-selected=false]"+N+" span{color:#a65a14!important}"
+"html body .cbl-hd .cbl-c.c6-out"+N+":hover{border-color:#565229!important}"
+"html body .cbl-hd .cbl-c.c6-gold"+N+" span{color:#f6efe9!important;opacity:.8}"
+"html body .cbl-hd .cbl-ch"+N+"{margin-top:18px!important}"
+"html body .cbl-hd"+N+"{margin-top:0!important;padding-top:0!important}"
+"html body.template-blog .section-page-header .page-header"+N+"{padding-bottom:8px!important}"
+"html body.template-blog .section-page-header"+N+"{padding-bottom:0!important;margin-bottom:0!important}"
+"html body.template-blog section.blog-page"+N+"{padding-top:0!important;margin-top:0!important}";
var s=D.createElement("style");s.id="cx30";s.textContent=c;(D.head||D.documentElement).appendChild(s);
}catch(e){}})();

/* cx30b blog: um script antigo grava cor clara direto no elemento; aqui a cor certa e regravada e mantida */
;(function(){try{if(window.__cx30b)return;window.__cx30b=1;var D=document;
function fx(){var hd=D.querySelector(".cbl-hd");if(!hd)return;var m=[[".cbl-s","color","#6f6656"],[".cbl-c[aria-selected=false]","color","#2b2916"],[".cbl-c[aria-selected=false]","background","#fffaf5"],[".cbl-c[aria-selected=false]","border","1px solid #d9c9b5"],[".cbl-c[aria-selected=false] span","color","#a65a14"],[".cbl-c[aria-selected=true]","background","#a65a14"],[".cbl-c[aria-selected=true]","border","1px solid #a65a14"],[".cbl-c[aria-selected=true]","color","#f6efe9"],[".cbl-c[aria-selected=true] span","color","#f6efe9"]];
var z=D.createElement("i");m.forEach(function(r){z.style.setProperty(r[1],r[2]);var v=z.style.getPropertyValue(r[1]);[].forEach.call(hd.querySelectorAll(r[0]),function(e){if(e.style.getPropertyValue(r[1])!==v||e.style.getPropertyPriority(r[1])!=="important"){e.style.setProperty(r[1],r[2],"important");e.dataset.cx30=1}})})}
var n=0;(function t(){fx();if(++n<40)setTimeout(t,250)})();
var mo=new MutationObserver(function(){fx()});var w=0;(function o(){var hd=D.querySelector(".cbl-hd");if(hd){mo.observe(hd,{attributes:true,subtree:true,attributeFilter:["style","class","aria-selected"]});return}if(++w<40)setTimeout(o,250)})();
}catch(e){}})();


/* 22/11/2026: temporizador da Black nas paginas de produto de kits e combos (23/11: tirado das categorias). */
;(function(){try{if(window.__cmlTk)return;window.__cmlTk=1;var D=document;
var START=Date.UTC(2026,10,22,15,0,0),END=Date.UTC(2026,11,1,2,59,59);
var RX=/^\/(produtos\/(kit|combo|kitl|ciclo-materna|trio-de-chas)[^\/]*\/?)$/;
if(!RX.test(location.pathname))return;
function z(n){return(n<10?"0":"")+n}
function left(){var now=Date.now();if(now>END)return null;var pre=now<START;var s=Math.floor(((pre?START:END)-now)/1000);return{pre:pre,d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),s:s%60}}
var CSS=".cx5-kt{margin:14px 0 4px}.cx5-kt .cx5-in{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:12px 14px;border-radius:14px;background:radial-gradient(120% 140% at 50% 0%,#1c1c1a 0%,#0b0b0a 70%);border:1px solid rgba(223,174,88,.28);font-family:Poppins,sans-serif;color:#f6efe9}.cx5-kt .t{display:flex;flex-direction:column;gap:3px}.cx5-kt .t span{font:500 10.5px/1.2 Poppins,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#dfae58}.cx5-kt .t b{font:600 14px/1.25 Poppins,sans-serif;color:#f6efe9}.cx5-kt .u{display:flex;gap:6px}.cx5-kt .u div{min-width:48px;padding:6px 4px;border-radius:10px;background:rgba(246,239,233,.06);border:1px solid rgba(223,174,88,.22);text-align:center}.cx5-kt .u b{display:block;font:600 19px/1 Poppins,sans-serif;color:#f3d48b;font-variant-numeric:tabular-nums}.cx5-kt .u small{display:block;margin-top:3px;font:500 9px/1 Poppins,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#cfc6b8}@media(max-width:767px){.cx5-kt .u div{min-width:44px}}";
function css(){if(D.getElementById("cml-cx5k"))return;var s=D.createElement("style");s.id="cml-cx5k";s.textContent=CSS;(D.head||D.documentElement).appendChild(s)}
function html(){return'<div class="cx5-in"><div class="t"><span>Black Friday na Chef</span><b></b></div><div class="u"><div><b class="d">00</b><small>dias</small></div><div><b class="h">00</b><small>horas</small></div><div><b class="m">00</b><small>min</small></div><div><b class="s">00</b><small>seg</small></div></div></div>'}
function anchor(){if(/^\/produtos\//.test(location.pathname)){var c=D.querySelector(".dh .dh-txt .ctas");if(c)return{el:c,how:"before",cls:"cx5-kt"};return null}return null}
function tick(){var t=left();var el=D.querySelector(".cx5-kt");if(!t){if(el)el.remove();return}var a=anchor();if(!a)return;css();
 if(!el){el=D.createElement("div");el.className=a.cls;el.innerHTML=html()}if(a.how==="before"){if(el.nextElementSibling!==a.el)a.el.parentNode.insertBefore(el,a.el)}else if(a.el.nextElementSibling!==el)a.el.parentNode.insertBefore(el,a.el.nextSibling)
 var tt=t.pre?"A Black começa em":"Preço de Black até 30/11 às 23h59";var q=function(c){return el.querySelector(c)};if(q(".t b").textContent!==tt)q(".t b").textContent=tt;q("b.d").textContent=z(t.d);q("b.h").textContent=z(t.h);q("b.m").textContent=z(t.m);q("b.s").textContent=z(t.s)}
tick();setInterval(tick,1000);
}catch(e){}})();


/* 38) Cabecalho some ao descer e volta ao subir; as duas barras de anuncio ficam sempre fixas (22/11/2026) */
;(function(){if(window.__cmlHH)return;window.__cmlHH=1;var D=document,H=D.documentElement;
var N=":not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6):not(#a7):not(#a8):not(#a9)";
var css="html body .sticky-header-wrapper.hide-announcements"+N+"{transform:none!important;--announcements-height-negative:0px!important}"
+"html body .sticky-header-wrapper"+N+" .adbar,html body .sticky-header-wrapper"+N+" .section-announcement-bar{position:relative;z-index:3}"
+"html body .sticky-header-wrapper"+N+" .js-head-main{position:relative;z-index:1;transition:transform .32s ease!important;will-change:transform}"
+"html.cml-hh body .sticky-header-wrapper.is-fixed"+N+" .js-head-main{transform:translateY(-100%)!important;pointer-events:none}";
var st=D.createElement("style");st.id="cml-hh-css";st.textContent=css;(D.head||H).appendChild(st);
var y=window.scrollY||0,tk=false;
function on(){tk=false;var n=window.scrollY||0;if(n<140){H.classList.remove("cml-hh")}else if(n>y+8){H.classList.add("cml-hh")}else if(n<y-8){H.classList.remove("cml-hh")}y=n}
window.addEventListener("scroll",function(){if(!tk){tk=true;requestAnimationFrame(on)}},{passive:true});
D.addEventListener("focusin",function(e){if(e.target&&e.target.closest&&e.target.closest(".js-head-main"))H.classList.remove("cml-hh")});
})();


/* 37) Ajustes do celular (21/11/2026): faixa de anuncio em uma linha, BLACK centralizado no banner, Encontre seu cha e Monte seu presente sem a foto da abertura no celular, montador do Encontre seu cha com respiro e um so molde. */
;(function(){try{if(window.__cml37)return;window.__cml37=1;var D=document,H=D.documentElement;
var X=":not(#v1):not(#v2):not(#v3):not(#v4):not(#v5)";
var css=""
+"@media(max-width:640px){html body .adbar"+X+"{padding:8px 10px!important;overflow:hidden!important}html body .adbar"+X+",html body .adbar *"+X+"{font-size:9px!important;line-height:1.3!important;letter-spacing:.05em!important;white-space:nowrap!important;text-overflow:ellipsis}}"
/* BLACK centralizado: o espacamento entre letras deixa um respiro so no fim; compensa no inicio */
+"html body #ns-section-custom_1793321998482 .c1-hand"+X+X+"{text-indent:.04em!important;padding:0 .04em!important}"
+".of3-lk .b"+X+"{margin-right:0!important;padding-left:.2em!important;padding-right:.08em!important}"
/* Encontre seu cha e Monte seu presente: no celular a abertura fica so com o texto */
+"@media(max-width:900px){html body.cml-cef .cml-cx-hero figure.pic"+X+X+",html body #cml-natal .cmn-hero figure.nx-pic"+X+X+"{display:none!important}html body.cml-cef .cml-cx-hero .in"+X+X+",html body #cml-natal .cmn-hero"+X+X+"{padding:36px 20px 40px!important}}"
/* montador do Encontre seu cha no celular */
+"@media(max-width:640px){html body.cml-cef section.cef"+X+"{padding:18px 16px 0!important}html body.cml-cef .cef-pane"+X+"{padding:18px 16px 20px!important;border-radius:24px!important;border:1px solid #e8ddd0!important;box-shadow:0 18px 40px -32px rgba(43,41,22,.45)!important;outline:0!important}html body.cml-cef .cef-pane"+X+":before,html body.cml-cef .cef-pane"+X+":after{display:none!important}html body.cml-cef .cef-q"+X+"{font-size:20px!important;line-height:1.25!important}html body.cml-cef .cef-step.on"+X+"{border:0!important;background:transparent!important;box-shadow:none!important;padding:4px 6px 8px!important;margin:0!important;min-height:0!important}html body.cml-cef .cef-step.on *"+X+"{border:0!important;box-shadow:none!important;background:transparent!important}html body.cml-cef :is(.cef-in,.cef-body,.cef-steps)"+X+":before,html body.cml-cef :is(.cef-in,.cef-body,.cef-steps)"+X+":after{display:none!important}html body.cml-cef :is(.cef-in,.cef-body)"+X+"{border:0!important;box-shadow:none!important;background:transparent!important}}";
function add(){if(D.getElementById("cml-37"))return;var s=D.createElement("style");s.id="cml-37";s.textContent=css;(D.head||H).appendChild(s)}
if(D.head)add();else D.addEventListener("DOMContentLoaded",add);setTimeout(add,1500)}catch(e){}})();

/* Menu: produtos da linha Chocoleve na coluna Chocoleve do menu (22/11) */
;(function(){try{var D=document;function go(){var a=D.querySelector('.js-desktop-dropdown a.nav-list-link-heading[href*="/chocoleve/"]');if(!a||a.parentNode.querySelector(".cml-chm"))return;var P=[["Laranja Chocoleve","laranja-choco-leve"],["Maçã Chocoleve","maca-chocoleve"],["Banana Chocoleve","banana-chocoleve"],["Abacaxi Chocoleve","abacaxi-chocoleve"]];var ul=D.createElement("ul");ul.className="list-subitems list-unstyled cml-chm";ul.innerHTML=P.map(function(p){return '<li class="nav-item"><a class="nav-list-link" href="/produtos/'+p[1]+'/">'+p[0]+'</a></li>'}).join("");a.parentNode.appendChild(ul)}if(D.readyState!=="loading")go();else D.addEventListener("DOMContentLoaded",go)}catch(e){}})();
