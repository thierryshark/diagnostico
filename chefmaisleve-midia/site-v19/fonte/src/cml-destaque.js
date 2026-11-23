/* Chef Mais Leve: cml-destaque v1 (07/11/2026)
   1) Pop-up "Formas de pagamento" no padrao da loja
   2) "Prefere comprar pelo WhatsApp?" logo abaixo do botao Comprar
   3) Topo da pagina de busca alinhado com a grade, no padrao da loja
   4) Paginas de destaque: apresentacao antes da compra, CTAs espalhados e barra fixa reforcada
   Para desligar uma pagina de destaque: apagar a entrada dela em DATA. */
(function () {
  if (window.__cmlDst) return; window.__cmlDst = 1;
  var D = document;

  var CSS = [
  "html body #installments-modal{--g:#a65a14;--ink:#2b2916;--mut:rgba(43,41,22,.66);--ln:rgba(166,90,20,.22);--pn:rgba(43,41,22,.045);background:radial-gradient(120% 90% at 20% 0%,#fffaf5 0%,#f6efe9 60%,#f6efe9 100%)!important;color:var(--ink)!important;font-family:Poppins,sans-serif!important;border:1px solid var(--ln)!important;box-shadow:0 30px 80px -30px rgba(43,41,22,.2)!important}",
  "html:not(.cml-blk) body #installments-modal{--g:#a65a14;--ink:#2b2916;--mut:#6f6656;--ln:#e8ddd0;--pn:#fffaf5;background:radial-gradient(120% 90% at 30% 20%,#f6efe9 0%,#f6efe9 55%,#ede3d8 100%)!important}",
  "@media (min-width:768px){html body #installments-modal{border-radius:28px!important;overflow:hidden!important;max-width:640px!important;left:50%!important;right:auto!important;transform:translateX(-50%)!important;top:6vh!important;bottom:auto!important;max-height:88vh!important}}",
  "@media (max-width:767px){html body #installments-modal{border-radius:28px 28px 0 0!important;max-height:88vh!important}}",
  "html body #installments-modal .modal-header{background:transparent!important;border-bottom:1px solid var(--ln)!important;padding:22px 24px 16px!important;display:flex!important;align-items:center!important;justify-content:space-between!important}",
  "html body #installments-modal .modal-title{font:600 19px/1.25 Poppins,sans-serif!important;color:var(--ink)!important;letter-spacing:0!important;text-transform:none!important}",
  "html body #installments-modal .modal-title .ey{display:block;font:500 10.5px/1 Poppins,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--g);margin-bottom:7px}",
  "html body #installments-modal .modal-title em{font-style:italic;font-weight:300;color:#a65a14}",
  "html:not(.cml-blk) body #installments-modal .modal-title em{color:#a65a14}",
  "html body #installments-modal .modal-close{width:38px!important;height:38px!important;border-radius:999px!important;border:1px solid var(--ln)!important;display:flex!important;align-items:center!important;justify-content:center!important;background:transparent!important;flex:none}",
  "html body #installments-modal .modal-close svg{width:14px!important;height:14px!important;fill:var(--ink)!important;color:var(--ink)!important}",
  "html body #installments-modal .modal-body{background:transparent!important;padding:18px 24px 8px!important;overflow-y:auto!important}",
  "html body #installments-modal .tab-group{display:flex!important;gap:8px!important;flex-wrap:wrap!important;border:0!important;margin:0 0 18px!important;padding:0!important}",
  "html body #installments-modal .tab{border:0!important;margin:0!important}",
  "html body #installments-modal .tab-link{display:inline-flex!important;align-items:center!important;gap:8px!important;border:1px solid var(--g)!important;border-radius:999px!important;padding:8px 14px!important;font:500 13px/1 Poppins,sans-serif!important;color:var(--ink)!important;background:transparent!important}",
  "html body #installments-modal .payments-discount-badge,html body #installments-modal .payments-discount-badge *{background:var(--g)!important;color:#f6efe9!important;border-radius:999px!important;padding:3px 8px!important;font:600 11px/1.2 Poppins,sans-serif!important}",
  "html body #installments-modal .payments-discount-badge strong{padding:0!important}",
  "html body #installments-modal .payments-section-title{font:500 11px/1 Poppins,sans-serif!important;letter-spacing:.18em!important;text-transform:uppercase!important;color:var(--g)!important;margin:4px 0 10px!important}",
  "html body #installments-modal .payments-card,html body #installments-modal .card{background:var(--pn)!important;border:1px solid var(--ln)!important;border-radius:20px!important;padding:18px!important;margin:0 0 18px!important;box-shadow:none!important;color:var(--ink)!important}",
  "html body #installments-modal .payments-installment-highlight{font:300 15px/1.5 Poppins,sans-serif!important;color:var(--ink)!important}",
  "html body #installments-modal .payments-installment-highlight strong{font-weight:700!important;color:var(--g)!important;font-size:17px!important}",
  "html body #installments-modal .payments-additional-info,html body #installments-modal .payments-explanation,html body #installments-modal .payments-disclaimer{font:300 12.5px/1.5 Poppins,sans-serif!important;color:var(--mut)!important}",
  "html body #installments-modal .payments-installments-title{margin:14px 0 6px!important}",
  "html body #installments-modal .payments-installments-title strong{font:500 10.5px/1 Poppins,sans-serif!important;letter-spacing:.18em!important;text-transform:uppercase!important;color:var(--mut)!important}",
  "html body #installments-modal .payments-table{width:100%!important;border-collapse:collapse!important;background:transparent!important;margin:0!important}",
  "html body #installments-modal .payments-table tr,html body #installments-modal .payments-table td{background:transparent!important;border:0!important}",
  "html body #installments-modal .payments-table tr{border-bottom:1px solid var(--ln)!important}",
  "html body #installments-modal .payments-table tr:last-child{border-bottom:0!important}",
  "html body #installments-modal .payments-table td{padding:11px 4px!important;font:300 14px/1.4 Poppins,sans-serif!important;color:var(--ink)!important}",
  "html body #installments-modal .payments-table td strong{font-weight:600!important;color:var(--ink)!important}",
  "html body #installments-modal .payments-table-total,html body #installments-modal .payments-table td:last-child{text-align:right!important;color:var(--mut)!important}",
  "html body #installments-modal .payments-total-label{font-weight:500!important;color:var(--mut)!important}",
  "html body #installments-modal .payments-logos-group,html body #installments-modal .payments-logos{display:flex!important;flex-wrap:wrap!important;gap:6px!important;padding:8px 0!important;background:transparent!important}",
  "html body #installments-modal .card-img{border-radius:6px!important;background:#fff!important;padding:2px!important;margin:0!important}",
  "html body #installments-modal .modal-footer{background:transparent!important;border-top:1px solid var(--ln)!important;padding:14px 24px 20px!important}",
  "html body #installments-modal .modal-footer .btn-link{display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;height:50px!important;border-radius:999px!important;background:#a65a14!important;color:#f6efe9!important;font:600 15px/1 Poppins,sans-serif!important;text-decoration:none!important;border:0!important}",
  "@media (max-width:640px){html body #installments-modal .modal-header{padding:18px 16px 14px!important}html body #installments-modal .modal-body{padding:16px 16px 6px!important}html body #installments-modal .modal-footer{padding:12px 16px 16px!important}html body #installments-modal .payments-card{padding:14px!important}html body #installments-modal .payments-table td{font-size:13px!important}}",
  "html body #js-cross-selling-modal{--g:#a65a14;--ink:#2b2916;--mut:rgba(43,41,22,.66);--ln:rgba(166,90,20,.24);--pn:rgba(43,41,22,.045);background:radial-gradient(120% 90% at 20% 0%,#fffaf5 0%,#f6efe9 60%,#f6efe9 100%)!important;color:var(--ink)!important;font-family:Poppins,sans-serif!important;border:1px solid var(--ln)!important;box-shadow:0 30px 80px -30px rgba(43,41,22,.2)!important;height:auto!important}",
  "html:not(.cml-blk) body #js-cross-selling-modal{--g:#a65a14;--ink:#2b2916;--mut:#6f6656;--ln:#e8ddd0;--pn:#fffaf5;background:radial-gradient(120% 90% at 30% 20%,#f6efe9 0%,#f6efe9 55%,#ede3d8 100%)!important}",
  "@media (min-width:768px){html body #js-cross-selling-modal{border-radius:28px!important;overflow:hidden!important;max-width:420px!important;width:420px!important;left:50%!important;right:auto!important;transform:translateX(-50%)!important;top:auto!important;bottom:5vh!important;max-height:88vh!important}}",
  "@media (max-width:767px){html body #js-cross-selling-modal{border-radius:28px 28px 0 0!important;max-height:80vh!important}}",
  "html body #js-cross-selling-modal .modal-header{background:transparent!important;border-bottom:1px solid var(--ln)!important;padding:18px 20px 14px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;width:100%!important;box-sizing:border-box!important}",
  "html body #js-cross-selling-modal .modal-title{font:600 18px/1.25 Poppins,sans-serif!important;color:var(--ink)!important;text-transform:none!important;letter-spacing:0!important}",
  "html body #js-cross-selling-modal .modal-title .ey{display:block;font:500 10.5px/1 Poppins,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--g);margin-bottom:6px}",
  "html body #js-cross-selling-modal .modal-title em{font-style:italic;font-weight:300;color:#a65a14}",
  "html:not(.cml-blk) body #js-cross-selling-modal .modal-title em{color:#a65a14}",
  "html body #js-cross-selling-modal .modal-close{width:36px!important;height:36px!important;border-radius:999px!important;border:1px solid var(--ln)!important;display:flex!important;align-items:center!important;justify-content:center!important;background:transparent!important;flex:none;position:static!important}",
  "html body #js-cross-selling-modal .modal-close svg{width:13px!important;height:13px!important;fill:var(--ink)!important;color:var(--ink)!important}",
  "html body #js-cross-selling-modal .modal-body{background:transparent!important;padding:16px 20px 20px!important;overflow-y:auto!important}",
  "html body #js-cross-selling-modal .js-cross-selling-container{text-align:left!important;padding:0!important;margin:0!important;display:flex!important;flex-direction:column!important;gap:14px!important}",
  "html body #js-cross-selling-modal .cml-xs-row{display:flex!important;gap:14px!important;align-items:center!important;padding:12px!important;border:1px solid var(--ln)!important;border-radius:20px!important;background:var(--pn)!important;margin:0!important}",
  "html body #js-cross-selling-modal .cml-xs-img{flex:none!important;width:96px!important;height:96px!important;max-width:96px!important;border-radius:14px!important;overflow:hidden!important;background:#fff!important;position:relative!important;margin:0!important;padding:0!important}",
  "html body #js-cross-selling-modal .cml-xs-img img{width:100%!important;height:100%!important;max-height:none!important;object-fit:cover!important;position:static!important;padding:0!important;margin:0!important}",
  "html body #js-cross-selling-modal .cml-xs-img *:not(img):not(picture):not(source):not(a):not(div){font:600 10px/1 Poppins,sans-serif!important;padding:3px 6px!important;border-radius:999px!important;background:#a65a14!important;color:#f6efe9!important;top:6px!important;left:6px!important}",
  "html body #js-cross-selling-modal .cml-xs-info{min-width:0!important;flex:1 1 auto!important;display:flex!important;flex-direction:column!important;gap:4px!important}",
  "html body #js-cross-selling-modal .cml-xs-info .ey{font:500 10px/1.2 Poppins,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:var(--g);margin:0}",
  "html body #js-cross-selling-modal .js-cross-selling-product-name{font:600 15px/1.3 Poppins,sans-serif!important;color:var(--ink)!important;text-align:left!important;margin:0!important;overflow-wrap:anywhere}",
  "html body #js-cross-selling-modal .js-cross-selling-prices-container{display:flex!important;align-items:baseline!important;justify-content:flex-start!important;gap:8px!important;flex-wrap:wrap!important;margin:2px 0 0!important;text-align:left!important}",
  "html body #js-cross-selling-modal .js-cross-selling-original-price{font:300 12.5px/1 Poppins,sans-serif!important;color:var(--mut)!important;text-decoration:line-through!important;margin:0!important}",
  "html body #js-cross-selling-modal .js-cross-selling-promo-price{font:700 21px/1 Poppins,sans-serif!important;color:var(--g)!important;margin:0!important}",
  "html body #js-cross-selling-modal label,html body #js-cross-selling-modal .form-label{font:500 10.5px/1 Poppins,sans-serif!important;letter-spacing:.16em!important;text-transform:uppercase!important;color:var(--mut)!important;margin:0 0 6px!important;display:block!important}",
  "html body #js-cross-selling-modal select{height:44px!important;border-radius:14px!important;border:1px solid var(--ln)!important;background-color:var(--pn)!important;color:var(--ink)!important;font:400 14px/1 Poppins,sans-serif!important;padding:0 14px!important;margin:0!important}",
  "html body #js-cross-selling-modal div.form-select{border:0!important;background:none!important;padding:0!important;height:auto!important;box-shadow:none!important}",
  "html body #js-cross-selling-modal select{width:100%!important;box-sizing:border-box!important}",
  "html body #js-cross-selling-modal .form-group,html body #js-cross-selling-modal .form-select{margin-bottom:0!important}",
  "html body #js-cross-selling-modal .form-select svg,html body #js-cross-selling-modal .form-select-icon{fill:var(--g)!important;color:var(--g)!important}",
  "html body #js-cross-selling-modal .js-cross-selling-add-to-cart,html body #js-cross-selling-modal input[type=submit],html body #js-cross-selling-modal .btn-primary{height:48px!important;min-height:48px!important;border-radius:999px!important;background:#a65a14!important;border-color:#a65a14!important;color:#f6efe9!important;font:600 15px/1 Poppins,sans-serif!important;width:100%!important;margin:0!important}",
  "@media (max-width:640px){html body #js-cross-selling-modal .modal-header{padding:16px 16px 12px!important}html body #js-cross-selling-modal .modal-body{padding:14px 16px 18px!important}html body #js-cross-selling-modal .cml-xs-img{width:84px!important;height:84px!important;max-width:84px!important}}",
  "html body .notification-cart-container.js-notification-cart{--g:#a65a14;--ink:#2b2916;--mut:rgba(43,41,22,.7);--ln:rgba(166,90,20,.38);position:fixed!important;top:auto!important;right:auto!important;left:50%!important;bottom:32px!important;width:min(440px,calc(100vw - 24px))!important;max-width:none!important;z-index:10050!important;transform:translate(-50%,0)!important;transition:opacity .3s ease,transform .35s cubic-bezier(.2,.8,.2,1)!important;margin:0!important;padding:0!important;font-family:Poppins,sans-serif!important}",
  "html:not(.cml-blk) body .notification-cart-container.js-notification-cart{--g:#a65a14;--ink:#2b2916;--mut:#6f6656;--ln:#e8ddd0}",
  "html body .notification-cart-container.js-notification-cart.notification-hidden{opacity:0!important;transform:translate(-50%,24px)!important;pointer-events:none!important}",
  "html body .notification-cart-container.js-notification-cart.notification-visible{opacity:1!important;transform:translate(-50%,0)!important}",
  "html body .notification-cart-container.js-notification-cart>.notification{display:flex!important;flex-direction:column!important;gap:12px!important;position:relative!important;margin:0!important;padding:16px 16px 14px!important;border-radius:24px!important;border:1px solid var(--ln)!important;background:radial-gradient(120% 120% at 15% 0%,#fffaf5 0%,#f6efe9 55%,#f6efe9 100%)!important;box-shadow:0 26px 60px -18px rgba(43,41,22,.2),0 0 0 1px rgba(0,0,0,.4)!important;color:var(--ink)!important;opacity:1!important;filter:none!important;backdrop-filter:none!important;overflow:hidden!important}",
  "html:not(.cml-blk) body .notification-cart-container.js-notification-cart>.notification{background:radial-gradient(120% 120% at 15% 0%,#fffaf5 0%,#f6efe9 100%)!important;box-shadow:0 24px 50px -20px rgba(43,41,22,.45)!important}",
  "html body .notification-cart-container.js-notification-cart.notification-visible>.notification:after{content:'';position:absolute;left:0;bottom:0;height:2px;width:100%;background:var(--g);transform-origin:left;animation:cmlnt 5s linear forwards;opacity:.8}",
  "@keyframes cmlnt{from{transform:scaleX(1)}to{transform:scaleX(0)}}",
  "html body .notification-cart-container.js-notification-cart .notification-cart-success{order:-2!important;display:flex!important;align-items:center!important;gap:8px!important;font:500 11px/1.2 Poppins,sans-serif!important;letter-spacing:.16em!important;text-transform:uppercase!important;color:var(--g)!important;margin:0!important;padding:0 40px 0 0!important}",
  "html body .notification-cart-container.js-notification-cart .notification-cart-success:before{content:'✓';display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:var(--g);color:#f6efe9;font:700 11px/1 Poppins,sans-serif;letter-spacing:0;flex:none}",
  "html body .notification-cart-container.js-notification-cart .notification-close{position:absolute!important;top:10px!important;right:10px!important;width:32px!important;height:32px!important;border-radius:999px!important;border:1px solid var(--ln)!important;background:transparent!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;margin:0!important;z-index:2}",
  "html body .notification-cart-container.js-notification-cart .notification-close svg{width:12px!important;height:12px!important;fill:var(--ink)!important;color:var(--ink)!important}",
  "html body .notification-cart-container.js-notification-cart .notification-cart-item{display:flex!important;align-items:center!important;gap:12px!important;margin:0!important;padding:0!important}",
  "html body .notification-cart-container.js-notification-cart .notification-cart-image-container{flex:none!important;width:64px!important;height:64px!important;margin:0!important;border-radius:14px!important;overflow:hidden!important;background:#fff!important}",
  "html body .notification-cart-container.js-notification-cart .notification-cart-image-container img{width:100%!important;height:100%!important;object-fit:cover!important;filter:none!important;opacity:1!important}",
  "html body .notification-cart-container.js-notification-cart .notification-info-container{min-width:0!important;display:flex!important;flex-direction:column!important;gap:4px!important;margin:0!important}",
  "html body .notification-cart-container.js-notification-cart .notification-info-line{display:flex!important;align-items:center!important;flex-wrap:wrap!important;gap:6px 8px!important;margin:0!important;color:var(--mut)!important;font:300 13px/1.35 Poppins,sans-serif!important}",
  "html body .notification-cart-container.js-notification-cart .js-cart-notification-item-name-private{font:600 15px/1.3 Poppins,sans-serif!important;color:var(--ink)!important;overflow-wrap:anywhere}",
  "html body .notification-cart-container.js-notification-cart .js-cart-notification-item-price-private{font:700 15px/1 Poppins,sans-serif!important;color:var(--g)!important}",
  "html body .notification-cart-container.js-notification-cart .notification-cart-discount-badge{background:var(--g)!important;color:#f6efe9!important;border-radius:999px!important;padding:3px 8px!important;font:600 11px/1 Poppins,sans-serif!important;opacity:1!important}",
  "html body .notification-cart-container.js-notification-cart .cml-nt-act{display:flex;gap:14px;align-items:center;margin:2px 0 0}",
  "html body .notification-cart-container.js-notification-cart .cml-nt-act button{cursor:pointer;font-family:Poppins,sans-serif}",
  "html body .notification-cart-container.js-notification-cart .cml-nt-go{flex:1 1 auto;height:44px;border-radius:999px;border:0;background:#a65a14;color:#f6efe9;font-weight:600;font-size:14.5px;box-shadow:0 14px 30px -18px rgba(166,90,20,.9)}",
  "html body .notification-cart-container.js-notification-cart .cml-nt-keep{flex:none;background:none;border:0;border-bottom:1.5px solid var(--g);padding:4px 0;color:var(--ink);font-size:13.5px;font-weight:400}",
  "html body .notification-cart-container.js-notification-cart .cml-nt-go{white-space:nowrap;padding:0 18px}",
  "@media (max-width:767px){html body .notification-cart-container.js-notification-cart{bottom:calc(84px + env(safe-area-inset-bottom))!important}html body .notification-cart-container.js-notification-cart .cml-nt-act{flex-direction:column;gap:8px}html body .notification-cart-container.js-notification-cart .cml-nt-go{width:100%}html body .notification-cart-container.js-notification-cart .notification-cart-success{letter-spacing:.1em!important;font-size:10.5px!important}}",
  "@media (prefers-reduced-motion:reduce){html body .notification-cart-container.js-notification-cart>.notification:after{animation:none;display:none}}",
  "html body aside.c2-side{max-height:calc(100vh - 130px);overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(166,90,20,.35) transparent;padding-right:4px}",
  "html body aside.c2-side .cml-tree{list-style:none;margin:0 0 6px;padding:0}",
  "html body aside.c2-side .cml-tree ul{list-style:none;margin:0 0 4px 6px;padding:0 0 0 12px;border-left:1px solid rgba(166,90,20,.22);display:none}",
  "html body aside.c2-side .cml-tree li.open>ul{display:block}",
  "html body aside.c2-side .cml-tree .r{display:flex;align-items:center;gap:4px;min-width:0}",
  "html body aside.c2-side .cml-tree a{display:flex!important;align-items:center!important;gap:10px!important;flex:1 1 auto;min-width:0;padding:7px 0!important;font:300 13px/1.3 Poppins,sans-serif!important;color:#2b2916!important;text-decoration:none!important}",
  "html:not(.cml-blk) body aside.c2-side .cml-tree a{color:#2b2916!important}",
  "html body aside.c2-side .cml-tree a span{overflow-wrap:anywhere}",
  "html body aside.c2-side .cml-tree a i{flex:none;width:14px;height:14px;border-radius:4px;border:1px solid rgba(166,90,20,.5);background:transparent;box-sizing:border-box}",
  "html body aside.c2-side .cml-tree a.on i{background:#a65a14;border-color:#a65a14}",
  "html body aside.c2-side .cml-tree a.part i{border-color:#a65a14;background:radial-gradient(circle,#a65a14 0 3px,transparent 3.5px)}",
  "html body aside.c2-side .cml-tree a.on,html body aside.c2-side .cml-tree a.part{font-weight:500!important}",
  "html body aside.c2-side .cml-tree a.on span{color:#a65a14}",
  "html:not(.cml-blk) body aside.c2-side .cml-tree a.on span{color:#a65a14}",
  "html body aside.c2-side .cml-tree li.lv1>.r>a{font-weight:500!important;font-size:13.5px!important}",
  "html body aside.c2-side .cml-tree li.lv3 a{font-size:12.5px!important;opacity:.9}",
  "html body aside.c2-side .cml-tree a:hover span{color:#a65a14}",
  "html body aside.c2-side .cml-tree .tg{flex:none;width:28px;height:28px;border-radius:999px;border:0;background:transparent;color:#a65a14;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0}",
  "html body aside.c2-side .cml-tree .tg:hover{background:rgba(166,90,20,.12)}",
  "html body aside.c2-side .cml-tree .tg svg{width:12px;height:12px;transition:transform .2s}",
  "html body aside.c2-side .cml-tree li.open>.r>.tg svg{transform:rotate(180deg)}",
  "html body #cml-cbar .cml-pills.cml-sub{flex:1 1 100%!important;margin-top:-2px}",
  "html body #cml-cbar .cml-pills.cml-sub a{height:32px!important;font-size:12.5px!important;padding:0 13px!important}",
  "html body #cml-cbar.cml-cat2{flex-wrap:wrap!important;row-gap:10px!important}",
  "@media (max-width:991px){html body #cml-cbar.cml-cat2 .cml-pills{flex:1 1 100%!important;flex-wrap:nowrap!important;overflow-x:auto!important;scrollbar-width:none;justify-content:flex-start!important}html body #cml-cbar.cml-cat2 .cml-pills::-webkit-scrollbar{display:none}html body #cml-cbar.cml-cat2 .cml-pills a{flex:none!important;white-space:nowrap!important}}",
  ".cml-rev.cml-rv2-on [class*='mi-@container']>div:nth-child(2),.cml-rev.cml-rv2-on .cml-rv-more{position:absolute!important;left:-9999px!important;top:0!important;width:600px!important;height:1px!important;overflow:hidden!important;opacity:0!important;pointer-events:none!important}",
  ".cml-rv2{--g:#a65a14;--gi:#a65a14;--ink:#2b2916;--mut:rgba(43,41,22,.66);--ln:rgba(166,90,20,.24);--pn:rgba(43,41,22,.04);font-family:Poppins,sans-serif;color:var(--ink);margin-top:14px;position:relative}",
  "html:not(.cml-blk) .cml-rv2{--g:#a65a14;--gi:#a65a14;--ink:#2b2916;--mut:#6f6656;--ln:#e8ddd0;--pn:#fffaf5}",
  ".cml-rv2 *{box-sizing:border-box}",
  ".cml-rev.cml-rv2-on .c3-rb+div,.cml-rev.cml-rv2-on [class*='mi-@container']>div:first-child .mi-relative.mi-inline-block{display:none!important}",
  ".cml-rv2 .rv2-m.v:after{z-index:2}",
  ".cml-rv2 .rv2-m.v{background:#2a271f}",
  ".cml-rv2 .rv2-top{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px}",
  ".cml-rv2 .rv2-sum{display:flex;align-items:center;gap:10px;flex-wrap:wrap}",
  ".cml-rv2 .rv2-sum b{font:700 28px/1 Poppins,sans-serif;color:var(--g)}",
  ".cml-rv2 .rv2-n{font:300 13px/1 Poppins,sans-serif;color:var(--mut)}",
  ".cml-rv2 .rv2-st{display:inline-flex;gap:2px}",
  ".cml-rv2 .rv2-st i{position:relative;display:block;width:16px;height:16px;background:rgba(43,41,22,.18);-webkit-mask:var(--sm) center/contain no-repeat;mask:var(--sm) center/contain no-repeat}",
  "html:not(.cml-blk) .cml-rv2 .rv2-st i{background:#e8ddd0}",
  ".cml-rv2 .rv2-st i:after{content:'';position:absolute;left:0;top:0;bottom:0;width:var(--f,100%);background:#a65a14}",
  ".cml-rv2 .rv2-st.sm i{width:13px;height:13px}",
  ".cml-rv2{--sm:url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z'/%3E%3C/svg%3E\")}",
  ".cml-rv2 .rv2-nav{display:flex;align-items:center;gap:10px}",
  ".cml-rv2 .rv2-nav button{width:40px;height:40px;border-radius:999px;border:1px solid var(--g);background:transparent;color:var(--g);display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;transition:background .2s,opacity .2s}",
  ".cml-rv2 .rv2-nav button:hover{background:rgba(166,90,20,.14)}",
  ".cml-rv2 .rv2-nav button[disabled]{opacity:.3;cursor:default}",
  ".cml-rv2 .rv2-nav svg{width:16px;height:16px}",
  ".cml-rv2 .rv2-ct{font:500 12.5px/1 Poppins,sans-serif;color:var(--mut);min-width:44px;text-align:center;font-variant-numeric:tabular-nums}",
  ".cml-rv2 .rv2-tr{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;scrollbar-width:none;padding:2px 0 6px;-webkit-overflow-scrolling:touch}",
  ".cml-rv2 .rv2-tr::-webkit-scrollbar{display:none}",
  ".cml-rv2 .rv2-c{flex:0 0 calc((100% - 28px)/3);scroll-snap-align:start;margin:0;border:1px solid var(--ln);border-radius:22px;background:var(--pn);padding:20px 20px 16px;display:flex;flex-direction:column;gap:10px;min-width:0;position:relative}",
  ".cml-rv2 .rv2-q{font:700 46px/.6 Georgia,serif;color:var(--g);height:20px;display:block;margin-top:6px}",
  ".cml-rv2 blockquote{margin:0;font:300 15px/1.55 Poppins,sans-serif;font-style:italic;color:var(--ink);display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere}",
  ".cml-rv2 .rv2-c.open blockquote{-webkit-line-clamp:unset;display:block}",
  ".cml-rv2 .rv2-more{align-self:flex-start;background:none;border:0;border-bottom:1px solid var(--g);color:var(--g);font:500 12px/1.2 Poppins,sans-serif;padding:2px 0;cursor:pointer;display:none}",
  ".cml-rv2 .rv2-c.clip .rv2-more{display:inline-block}",
  ".cml-rv2 figcaption{margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:10px;padding-top:10px;border-top:1px solid var(--ln)}",
  ".cml-rv2 figcaption .ci{display:flex;flex-direction:column;gap:5px;min-width:0}",
  ".cml-rv2 figcaption small{font:400 11.5px/1.3 Poppins,sans-serif;color:var(--mut)}",
  ".cml-rv2 .rv2-m{flex:none;width:52px;height:52px;border-radius:12px;overflow:hidden;border:1px solid var(--ln);padding:0;background:#000;cursor:pointer;position:relative}",
  ".cml-rv2 .rv2-m img,.cml-rv2 .rv2-m video{width:100%;height:100%;object-fit:cover;display:block}",
  ".cml-rv2 .rv2-m.v:after{content:'';position:absolute;left:50%;top:50%;transform:translate(-40%,-50%);border-left:12px solid #fff;border-top:8px solid transparent;border-bottom:8px solid transparent;filter:drop-shadow(0 1px 3px rgba(0,0,0,.6))}",
  ".cml-rv2-lb{position:fixed;inset:0;z-index:10060;background:rgba(255,250,245,.86);display:flex;align-items:center;justify-content:center;padding:20px}",
  ".cml-rv2-lb img,.cml-rv2-lb video{max-width:100%;max-height:86vh;border-radius:16px}",
  ".cml-rv2-lb button{position:absolute;top:16px;right:16px;width:42px;height:42px;border-radius:999px;border:1px solid rgba(166,90,20,.6);background:rgba(255,250,245,.5);color:#2b2916;font:300 22px/1 Poppins,sans-serif;cursor:pointer}",
  "@media (max-width:900px){.cml-rv2 .rv2-c{flex-basis:calc((100% - 14px)/2)}}",
  "@media (max-width:640px){.cml-rv2 .rv2-c{flex-basis:86%;padding:18px 16px 14px}.cml-rv2 .rv2-sum b{font-size:24px}.cml-rv2 .rv2-nav button{width:36px;height:36px}.cml-rv2 blockquote{font-size:14.5px;-webkit-line-clamp:4}.cml-rv2 .rv2-top{gap:10px}.cml-rv2 .rv2-nav{margin-left:auto}}",
  "@media (min-width:1100px) and (max-width:1359px){html body .head-main{display:grid!important;grid-template-columns:auto 1fr auto auto auto;align-items:center;column-gap:12px;padding:12px 20px!important}html body .head-main .head-row.container,html body .head-main .utilities-group{display:contents!important}html body .head-main .logo-container{grid-area:1/1;width:auto!important;flex:0 0 auto!important}html body header #ns-block-logo #logo .logo-img{height:62px!important;margin:-8px 0!important}html body .head-main .nav-desktop-container{grid-area:1/2;min-width:0}html body .head-main .js-search-container{grid-area:1/3}html body .head-main .header-account{grid-area:1/4}html body .head-main .js-cart-container{grid-area:1/5}html body .head-row>.js-modal-open-private,html body .head-main .menu-container{display:none!important}html body .head-main .nav-desktop-grid.container{padding:0!important}html body .js-nav-desktop-list{gap:2px!important;flex-wrap:nowrap!important;justify-content:center!important}html body .js-nav-desktop-list>li>a{padding:0 8px!important;font-size:12.5px!important;white-space:nowrap!important}}",
  "@media (min-width:1100px) and (max-width:1219px){html body .js-nav-desktop-list>li>a{padding:0 6px!important;font-size:12px!important}html body header #ns-block-logo #logo .logo-img{height:52px!important;margin:-6px 0!important}html body .head-main{column-gap:8px;padding:10px 14px!important}}",
  "html body.cml-allp #ns-section-category_hero .c2-cbn{background:radial-gradient(110% 120% at 20% 10%,#565229 0%,#4a4622 45%,#2e2c14 100%)!important;position:relative;overflow:hidden;isolation:isolate}",
  "html body.cml-allp #ns-section-category_hero .c2-cbn>picture{display:none!important}",
  "html body.cml-allp #ns-section-category_hero .c2-cbn:after{content:'';position:absolute;inset:0;z-index:-1;opacity:.16;mix-blend-mode:multiply;background-image:url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\");background-size:220px}",
  "html body.cml-allp #ns-section-category_hero .c2-cbt p.sb{font:300 14.5px/1.5 Poppins,sans-serif;color:rgba(43,41,22,.85);margin:10px 0 0;max-width:46ch}",
  "html body.cml-allp #ns-section-category_hero .c2-cbt h2 em{color:#a65a14}",
  "html body.cml-allp #ns-section-category_hero .cml-qk{display:none}",
  "@media (min-width:900px){html body.cml-allp #ns-section-category_hero .cml-qk{display:flex;position:absolute;right:40px;top:50%;transform:translateY(-50%);flex-wrap:wrap;justify-content:flex-end;gap:10px;max-width:42%;z-index:2}html body.cml-allp #ns-section-category_hero .cml-qk a{display:inline-flex;align-items:center;gap:8px;height:42px;padding:0 18px;border-radius:999px;border:1px solid rgba(243,212,139,.55);color:#2b2916!important;font:500 13.5px/1 Poppins,sans-serif;text-decoration:none!important;background:rgba(255,250,245,.25);transition:background .2s}html body.cml-allp #ns-section-category_hero .cml-qk a:hover{background:#a65a14;color:#f6efe9!important}html body.cml-allp #ns-section-category_hero .cml-qk a.of{background:#a65a14;border-color:#a65a14;color:#f6efe9!important}}",
  ".cml-pf{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 16px;font-family:Poppins,sans-serif}",
  ".cml-pf .lb{font:500 10.5px/1 Poppins,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:rgba(43,41,22,.6);margin-right:4px}",
  "html:not(.cml-blk) .cml-pf .lb{color:#6f6656}",
  ".cml-pf a{display:inline-flex;align-items:center;gap:8px;height:32px;padding:0 12px 0 14px;border-radius:999px;border:1px solid #a65a14;color:#2b2916!important;font:400 12.5px/1 Poppins,sans-serif;text-decoration:none!important;background:rgba(166,90,20,.12)}",
  "html:not(.cml-blk) .cml-pf a{color:#2b2916!important}",
  ".cml-pf a b{font-weight:400;color:#a65a14;font-size:15px}",
  ".cml-pf a.clr{background:none;border:0;border-bottom:1px solid #a65a14;border-radius:0;height:auto;padding:2px 0;color:#a65a14!important}",
  "html body #cml-cbar .cml-pills.cml-price a{height:32px!important;font-size:12.5px!important;padding:0 13px!important}",
  "html body .c2-ey,html body .c3-ey,html body .c7-cl,html body .c3-rvh p,html body .cml-f-pill>b{font-size:10.5px!important;letter-spacing:.14em!important}",
  "html.cml-blk body .js-item-product .c2-ey.c2-ey,html body [data-slot] button.c7-cn .c7-cl.c7-cl,html body #ns-section-footer#ns-section-footer .c7-fe.c7-fe{font-size:10.5px!important}",
  "html body .c3-rb,html body .c3-rb *,html body [class*='mi-'] button{font-family:Poppins,sans-serif!important}",
  "html body .cml-ig-g a:nth-child(2n){top:0!important}",
  "html body a.c3-wal.cml-wn{display:flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;margin:10px 0 4px!important;padding:6px 0!important;font:300 13px/1.35 Poppins,sans-serif!important;text-align:center!important}",
  "html body a.c3-wal.cml-wn u{font-weight:500!important;color:#a65a14!important;text-decoration:none!important;border-bottom:1px solid currentColor}",
  "html:not(.cml-blk) body a.c3-wal.cml-wn u{color:#a65a14!important}",
  "body.template-search .section-page-header .page-header-title-row,body.template-search .products-grid-header{max-width:1240px!important;margin-left:auto!important;margin-right:auto!important;padding-left:16px!important;padding-right:16px!important;box-sizing:border-box!important}",
  "body.template-search .section-page-header .page-header{padding-bottom:0!important}",
  "body.template-search .section-page-header .breadcrumbs{font:300 12.5px/1.4 Poppins,sans-serif!important;opacity:.8;margin-bottom:14px!important}",
  "body.template-search .page-header-title{font:700 clamp(30px,4.2vw,48px)/1.1 Poppins,sans-serif!important;margin:0!important;overflow-wrap:anywhere}",
  "body.template-search .page-header-title em,body.template-search .page-header-title i{font-weight:300!important}",
  "body.template-search .section-main-products-grid{margin-top:0!important;padding-top:0!important}",
  "body.template-search .products-grid-header{margin-top:10px!important;margin-bottom:18px!important}",
  "body.template-search .products-grid-search-heading{font:300 15px/1.4 Poppins,sans-serif!important;color:rgba(43,41,22,.7)!important;margin:0!important;letter-spacing:0!important}",
  "html:not(.cml-blk) body.template-search .products-grid-search-heading{color:#6f6656!important}",
  "body.template-search .products-grid-search-heading b{font-weight:600;color:#a65a14}",
  "html:not(.cml-blk) body.template-search .products-grid-search-heading b{color:#a65a14}",
  "body.template-search #cml-cbar{display:flex!important;align-items:center!important;gap:12px!important;flex-wrap:nowrap!important;padding-bottom:16px!important;margin-bottom:22px!important;border-bottom:1px solid rgba(166,90,20,.35)!important}",
  "body.template-search #cml-cbar .cml-pills{display:flex!important;flex-wrap:nowrap!important;gap:8px!important;overflow-x:auto!important;scrollbar-width:none;justify-content:flex-start!important;flex:1 1 auto!important;min-width:0!important;padding:2px 0!important;-webkit-mask-image:linear-gradient(90deg,#000 92%,transparent);mask-image:linear-gradient(90deg,#000 92%,transparent)}",
  "body.template-search #cml-cbar .cml-pills::-webkit-scrollbar{display:none}",
  "body.template-search #cml-cbar .cml-pills>a{flex:none!important;white-space:nowrap!important;height:38px!important;display:inline-flex!important;align-items:center!important;padding:0 16px!important;border-radius:999px!important;font:500 13px/1 Poppins,sans-serif!important;margin:0!important}",
  "body.template-search #cml-cbar .cml-ctl{flex:none!important;display:flex!important;gap:8px!important;align-items:center!important;margin:0!important}",
  "body.template-search #cml-cbar .cml-ctl>*{height:38px!important;border-radius:999px!important;font:500 13px/1 Poppins,sans-serif!important;margin:0!important}",
  "@media (max-width:767px){body.template-search #cml-cbar{flex-wrap:wrap!important}body.template-search #cml-cbar .cml-pills{flex:1 1 100%!important}body.template-search #cml-cbar .cml-ctl{flex:1 1 100%!important}body.template-search #cml-cbar .cml-ctl>*{flex:1 1 0!important;min-width:0!important}body.template-search .section-page-header .page-header-title-row,body.template-search .products-grid-header{padding-left:16px!important;padding-right:16px!important}}",
  ".cml-dst{--g:#a65a14;--gi:#a65a14;--ink:#2b2916;--mut:rgba(43,41,22,.72);--ln:rgba(166,90,20,.24);--pn:rgba(255,250,245,.55);--pn2:rgba(43,41,22,.05);font-family:Poppins,sans-serif;color:var(--ink);position:relative;z-index:1}",
  "html:not(.cml-blk) .cml-dst{--g:#a65a14;--gi:#a65a14;--ink:#2b2916;--mut:#6f6656;--ln:#e8ddd0;--pn:#fffaf5;--pn2:#ffffff}",
  ".cml-dst *{box-sizing:border-box}",
  ".cml-dst .dw{max-width:1240px;margin:0 auto;padding:28px 32px 8px}",
  ".cml-dst .ey{font:500 11px/1.2 Poppins,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--g);margin:0 0 12px}",
  ".cml-dst h2.tt,.cml-dst h3.tt{font:700 clamp(30px,4.4vw,54px)/1.06 Poppins,sans-serif;margin:0 0 16px;color:var(--ink);overflow-wrap:anywhere;letter-spacing:-.01em}",
  ".cml-dst h3.tt{font-size:clamp(24px,3vw,38px);margin-bottom:12px}",
  ".cml-dst .tt em{font-style:italic;font-weight:300;color:var(--gi)}",
  ".cml-dst p{max-width:62ch}",
  ".cml-dst .ld{font:300 16.5px/1.6 Poppins,sans-serif;color:var(--mut);margin:0 0 20px}",
  ".cml-dst .bt{display:inline-flex;align-items:center;justify-content:center;gap:10px;height:54px;padding:0 30px;border-radius:999px;background:#a65a14;color:#f6efe9!important;font:600 15.5px/1 Poppins,sans-serif;border:0;cursor:pointer;text-decoration:none!important;box-shadow:0 18px 40px -22px rgba(166,90,20,.75);transition:transform .2s,box-shadow .2s}",
  ".cml-dst .bt:hover{transform:translateY(-1px);box-shadow:0 22px 44px -20px rgba(166,90,20,.9)}",
  ".cml-dst .bt svg{width:18px;height:18px}",
  ".cml-dst .lk{display:inline-flex;align-items:center;gap:6px;color:var(--ink)!important;font:400 14px/1 Poppins,sans-serif;text-decoration:none!important;border-bottom:1.5px solid var(--g);padding:4px 0;cursor:pointer;background:none;border-top:0;border-left:0;border-right:0}",
  ".cml-dst .ctas{display:flex;align-items:center;gap:22px;flex-wrap:wrap}",
  ".cml-dst .dh{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:56px;align-items:center}",
  ".cml-dst .dh-media{position:relative;width:100%;max-width:500px;justify-self:center}",
  ".cml-dst .fr{margin:0;border-radius:220px 220px 28px 28px;overflow:hidden;background:#fff;padding:12px;box-shadow:0 18px 40px -28px rgba(43,41,22,.2)}",
  ".cml-dst .fr img{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:210px 210px 20px 20px}",
  ".cml-dst video{display:block;width:100%;object-fit:cover;background:#fff}",
  ".cml-dst .fr video{aspect-ratio:1/1;border-radius:210px 210px 20px 20px}",
  ".cml-dst .gal video{height:100%;border-radius:20px}",
  "@media (min-width:641px){.cml-dst .gal:not(.one) figure video{position:absolute;left:10px;top:10px;width:calc(100% - 20px);height:calc(100% - 20px)}}",
  "@media (max-width:640px){.cml-dst .fr video{border-radius:152px 152px 16px 16px}.cml-dst .gal>figure video{aspect-ratio:4/3;height:auto}}",
  ".cml-dst .story figure video{aspect-ratio:4/5;border-radius:190px 190px 16px 16px}",
  ".cml-dst .thumbs{display:flex;gap:12px;margin-top:14px}",
  ".cml-dst .thumbs button{flex:1 1 0;min-width:0;padding:4px;border-radius:16px;border:1px solid var(--ln);background:var(--pn2);cursor:pointer}",
  ".cml-dst .thumbs button.on{border-color:var(--g)}",
  ".cml-dst .thumbs img{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:12px}",
  ".cml-dst .seal{position:absolute;top:22px;right:-6px;background:#a65a14;color:#f6efe9;border-radius:999px;padding:9px 14px;font:700 13px/1 Poppins,sans-serif;box-shadow:0 12px 30px -14px rgba(43,41,22,.2)}",
  ".cml-dst .chips{display:flex;flex-wrap:wrap;gap:8px;list-style:none;margin:0 0 24px;padding:0}",
  ".cml-dst .chips li{border:1px solid var(--ln);border-radius:999px;padding:7px 13px;font:400 12.5px/1.2 Poppins,sans-serif;color:var(--ink);background:var(--pn2)}",
  ".cml-dst .pr{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin:0 0 4px}",
  ".cml-dst .pr s{font:300 15px/1 Poppins,sans-serif;color:var(--mut)}",
  ".cml-dst .pr b{font:700 34px/1 Poppins,sans-serif;color:var(--g)}",
  ".cml-dst .pr .off{background:#a65a14;color:#f6efe9;border-radius:999px;padding:4px 9px;font:600 12px/1 Poppins,sans-serif}",
  ".cml-dst .pc{font:300 13.5px/1.5 Poppins,sans-serif;color:var(--mut);margin:6px 0 22px}",
  ".cml-dst .trust{display:flex;gap:16px;flex-wrap:wrap;margin:20px 0 0;font:300 12.5px/1.4 Poppins,sans-serif;color:var(--mut)}",
  ".cml-dst .trust span{display:inline-flex;align-items:center;gap:6px}",
  ".cml-dst .trust i{color:var(--g);font-style:normal}",
  ".cml-dst .strip{margin:56px 0 0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border:1px solid var(--ln);border-radius:28px;background:var(--pn);overflow:hidden}",
  ".cml-dst .strip div{padding:20px 22px;border-left:1px solid var(--ln);min-width:0}",
  ".cml-dst .strip div:first-child{border-left:0}",
  ".cml-dst .strip b{display:block;font:600 14px/1.3 Poppins,sans-serif;color:var(--ink);margin-bottom:4px}",
  ".cml-dst .strip span{font:300 12.5px/1.45 Poppins,sans-serif;color:var(--mut)}",
  ".cml-dst .blk{margin:88px 0 0}",
  ".cml-dst .why{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-top:28px}",
  ".cml-dst .why div{border:1px solid var(--ln);border-radius:20px;padding:24px 22px;background:var(--pn);min-width:0}",
  ".cml-dst .why .n{display:block;font:300 13px/1 Poppins,sans-serif;color:var(--g);margin-bottom:22px;letter-spacing:.1em}",
  ".cml-dst .why b{display:block;font:600 17px/1.3 Poppins,sans-serif;color:var(--ink);margin-bottom:8px}",
  ".cml-dst .why p{font:300 14px/1.55 Poppins,sans-serif;color:var(--mut);margin:0}",
  ".cml-dst .gal{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:16px;align-items:stretch;height:clamp(360px,42vw,540px)}",
  ".cml-dst .gal figure{height:100%;min-height:0}",
  "@media (min-width:641px){.cml-dst .gal .side{grid-template-rows:minmax(0,1fr) minmax(0,1fr)}.cml-dst .gal:not(.one) figure{position:relative}.cml-dst .gal:not(.one) figure img{position:absolute;left:10px;top:10px;width:calc(100% - 20px);height:calc(100% - 20px)}}",
  ".cml-dst .gal.one{height:auto}.cml-dst .gal.one img{aspect-ratio:16/9;height:auto}",
  "html.cml-dst-on body .cml-bar.dst-show{transform:none!important}",
  ".cml-dst .gal figure{margin:0;border-radius:28px;overflow:hidden;background:#fff;padding:10px}",
  ".cml-dst .gal img{display:block;width:100%;height:100%;object-fit:cover;border-radius:20px}",
  ".cml-dst .gal .side{display:grid;grid-template-rows:1fr 1fr;gap:16px;min-width:0}",
  ".cml-dst .gal .one{grid-template-columns:1fr}",
  ".cml-dst .cta-row{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-top:22px;padding:18px 22px;border:1px solid var(--ln);border-radius:999px;background:var(--pn)}",
  ".cml-dst .cta-row p{margin:0;font:300 15px/1.4 Poppins,sans-serif;color:var(--mut)}",
  ".cml-dst .cta-row p b{color:var(--ink);font-weight:600}",
  ".cml-dst .dst-pp{white-space:nowrap}",
  ".cml-dst .two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;align-items:start}",
  ".cml-dst .lst{list-style:none;margin:20px 0 0;padding:0;border-top:1px solid var(--ln)}",
  ".cml-dst .lst li{display:flex;gap:16px;align-items:baseline;padding:15px 0;border-bottom:1px solid var(--ln);font:400 15.5px/1.4 Poppins,sans-serif;color:var(--ink);min-width:0;overflow-wrap:anywhere}",
  ".cml-dst .lst li span{flex:none;font:300 12px/1 Poppins,sans-serif;color:var(--g);letter-spacing:.12em;width:30px}",
  ".cml-dst .ideal{border:1px solid var(--ln);border-radius:28px;padding:28px;background:var(--pn)}",
  ".cml-dst .ideal ul{list-style:none;margin:14px 0 22px;padding:0;display:grid;gap:10px}",
  ".cml-dst .ideal li{display:flex;gap:10px;font:300 15px/1.45 Poppins,sans-serif;color:var(--ink)}",
  ".cml-dst .ideal li:before{content:'';flex:none;width:8px;height:8px;border-radius:50%;background:var(--g);margin-top:8px}",
  ".cml-dst .note{font:300 12px/1.5 Poppins,sans-serif;color:var(--mut);margin:14px 0 0}",
  ".cml-dst .story{margin:88px 0 0;border-radius:40px;padding:56px 56px;background:radial-gradient(110% 90% at 35% 25%,#565229 0%,#565229 45%,#403d1e 100%);color:#f6efe9;position:relative;overflow:hidden;isolation:isolate;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);gap:40px;align-items:center}",
  ".cml-dst .story:after{content:'';position:absolute;inset:0;pointer-events:none;opacity:.16;mix-blend-mode:multiply;z-index:-1;background-image:url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\");background-size:220px}",
  ".cml-dst .story .ey{color:#f3d48b}",
  ".cml-dst .story .tt{color:#f6efe9}",
  ".cml-dst .story .tt em{color:#f3d48b}",
  ".cml-dst .story p.tx{font:300 16px/1.65 Poppins,sans-serif;color:rgba(246,239,233,.86);margin:0 0 26px}",
  ".cml-dst .story figure{margin:0;border-radius:200px 200px 24px 24px;overflow:hidden;background:#fff;padding:10px}",
  ".cml-dst .story figure img{display:block;width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:190px 190px 16px 16px}",
  ".cml-dst .go{margin:88px 0 0;text-align:center;padding-bottom:12px}",
  ".cml-dst .go p.ld{margin:0 auto 18px}",
  ".cml-dst .go .arw{display:inline-flex;width:44px;height:44px;border-radius:50%;border:1px solid var(--g);align-items:center;justify-content:center;color:var(--g);animation:cmlb 1.8s ease-in-out infinite}",
  "@keyframes cmlb{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}",
  ".cml-dst .rv{opacity:0;transform:translateY(16px);transition:opacity .7s ease,transform .7s ease}",
  ".cml-dst .rv.in{opacity:1;transform:none}",
  "@media (prefers-reduced-motion:reduce){.cml-dst .rv{opacity:1;transform:none;transition:none}.cml-dst .go .arw{animation:none}}",
  "html.cml-dst-on #ns-section-main_product{scroll-margin-top:90px}",
  ".cml-dst-flash{animation:cmlf 1.6s ease}",
  "@keyframes cmlf{0%{box-shadow:0 0 0 0 rgba(166,90,20,.0)}25%{box-shadow:0 0 0 6px rgba(166,90,20,.45)}100%{box-shadow:0 0 0 0 rgba(166,90,20,0)}}",
  "html.cml-dst-on body .cml-bar{border-top:1px solid rgba(166,90,20,.65)!important;box-shadow:0 -18px 40px -18px rgba(166,90,20,.38),0 -1px 0 rgba(166,90,20,.4)!important}",
  "html.cml-dst-on body .cml-bar .t .dp{display:inline-flex;align-items:center;gap:6px;margin-left:8px}",
  "html.cml-dst-on body .cml-bar .t .dp s{font:300 12px/1 Poppins,sans-serif;opacity:.6}",
  "html.cml-dst-on body .cml-bar .t .dp i{font-style:normal;background:#a65a14;color:#f6efe9;border-radius:999px;padding:3px 7px;font:600 11px/1 Poppins,sans-serif}",
  "html.cml-dst-on body .cml-bar .go{box-shadow:0 0 0 0 rgba(166,90,20,.6);animation:cmlp 2.6s ease-in-out infinite;font-weight:700!important;min-width:170px}",
  "@keyframes cmlp{0%,100%{box-shadow:0 0 0 0 rgba(166,90,20,.0)}50%{box-shadow:0 0 0 7px rgba(166,90,20,.22)}}",
  "@media (prefers-reduced-motion:reduce){html.cml-dst-on body .cml-bar .go{animation:none}}",
  "@media (max-width:900px){.cml-dst .dh{grid-template-columns:minmax(0,1fr);gap:28px}.cml-dst .why{grid-template-columns:repeat(2,minmax(0,1fr))}.cml-dst .strip{grid-template-columns:repeat(2,minmax(0,1fr))}.cml-dst .strip div:nth-child(3){border-left:0}.cml-dst .strip div:nth-child(n+3){border-top:1px solid var(--ln)}.cml-dst .two{grid-template-columns:minmax(0,1fr)}.cml-dst .story{grid-template-columns:minmax(0,1fr)}}",
  "@media (max-width:640px){.cml-dst .dw{padding:18px 16px 4px}.cml-dst .fr{border-radius:160px 160px 22px 22px;padding:8px}.cml-dst .fr img{border-radius:152px 152px 16px 16px}.cml-dst .seal{right:6px;top:14px;font-size:12px}.cml-dst .thumbs{gap:8px;margin-top:10px}.cml-dst .ld{font-size:15px}.cml-dst .pr b{font-size:30px}.cml-dst .bt{width:100%;height:54px}.cml-dst .ctas{gap:14px;justify-content:center}.cml-dst .strip{margin-top:36px;border-radius:22px}.cml-dst .strip div{padding:16px 14px}.cml-dst .blk,.cml-dst .story,.cml-dst .go{margin-top:56px}.cml-dst .why{gap:10px}.cml-dst .why div{padding:18px 14px}.cml-dst .why .n{margin-bottom:12px}.cml-dst .why b{font-size:15px}.cml-dst .why p{font-size:13px}.cml-dst .gal{grid-template-columns:minmax(0,1fr)}.cml-dst .gal .side{grid-template-rows:none;grid-template-columns:1fr 1fr;gap:10px}.cml-dst .gal{height:auto}.cml-dst .gal>figure img{aspect-ratio:4/3;height:auto}.cml-dst .gal .side figure img{aspect-ratio:1/1;height:auto}.cml-dst .gal img{min-height:0}.cml-dst .cta-row{border-radius:22px;padding:16px;text-align:center;justify-content:center}.cml-dst .ideal{padding:20px;border-radius:22px}.cml-dst .story{padding:30px 20px;border-radius:28px;gap:24px}.cml-dst .story figure{max-width:280px;margin:0 auto}html.cml-dst-on body .cml-bar .t .dp s{display:none}html.cml-dst-on body .cml-bar .go{min-width:0}}",
  "@media (max-width:380px){.cml-dst .why{grid-template-columns:minmax(0,1fr)}}"
  ].join("\n");

  function addCss() {
    if (D.getElementById("cml-dst-css")) return;
    var s = D.createElement("style"); s.id = "cml-dst-css"; s.textContent = CSS;
    (D.head || D.documentElement).appendChild(s);
  }
  addCss();

  var CART_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h13l-1.4 7.2a2 2 0 0 1-2 1.6H9.3a2 2 0 0 1-2-1.6L5.6 4H3"/><circle cx="10" cy="20" r="1.2"/><circle cx="16.5" cy="20" r="1.2"/></svg>';
  var DATA = {
    "laranja-choco-leve": {
      ey: "O mais vendido da casa", t1: "Laranja", t2: "Chocoleve",
      ld: "Fatias de laranja bahia desidratadas devagar, por cerca de 13 horas em baixa temperatura, com a borda banhada em chocolate 70%. Crocante, frutada e com o amargo na medida do cacau.",
      chips: ["10 fatias", "Chocolate 70%", "Sem açúcar adicionado", "Sem conservantes"],
      whyT: ["Por que", "todo mundo pede de novo"],
      why: [["Feita devagar", "Cerca de 13 horas de desidratação em baixa temperatura, fatia por fatia."], ["Contraste certo", "A acidez da laranja encontra o amargo do cacau 70%."], ["Sobremesa na medida", "Duas ou três fatias fecham a refeição com elegância."], ["Bonita de presentear", "Chega em pacote com lacre, pronta para servir ou para dar de presente."]],
      boxT: ["Como", "aproveitar"], box: ["Direto do pacote, como snack", "Depois do almoço, com um café", "À tarde, com um chá da casa", "Na mesa de visitas, para dividir"],
      ideal: ["Quem gosta de doce sem exagero", "Quem nunca provou fruta desidratada feita em casa", "Um presente pequeno que impressiona"],
      stE: "Da nossa cozinha", stT: ["A fatia que virou", "carro-chefe"],
      st: "A laranja chega in natura, é fatiada e desidratada aqui, e a borda de chocolate entra no final, à mão. É o produto que mais sai da nossa cozinha e o primeiro que quem conhece a Chef indica.",
      goT: ["Leve a sua", "Laranja Chocoleve"], vid: { hero: "laranja-takes", gal: "laranja-gira", st: "laranja-quebra" }
    },
    "kit-ternura1": {
      ey: "Kit presente · o mais escolhido", t1: "Kit", t2: "Ternura",
      ld: "Quatro sabores artesanais numa caixa pronta para entregar: a infusão que abre dentro da tangerina, a trouxinha de maçã, mendiants sem açúcar e a nossa Laranja Chocoleve.",
      chips: ["4 itens artesanais", "Caixa presente inclusa", "Rende 1 litro de chá", "Sem conservantes"],
      whyT: ["Um presente", "que se sente"],
      why: [["Ritual à mesa", "A tangerina abre no bule e rende 1 litro de infusão."], ["Doce na medida", "Mendiants sem açúcar e laranja com chocolate 70%."], ["Feito à mão", "Itens artesanais, preparados em família, sem conservantes."], ["Presente pronto", "Chega em caixa de 27 x 21 x 9 cm, pronta para entregar."]],
      boxT: ["O que vem", "na caixa"], box: ["Infusão na Tangerina Rosé", "Trouxinha de Maçã", "6 Mendiants sem açúcar", "Laranja Chocoleve 40 g"],
      ideal: ["Aniversários e datas especiais", "Agradecer alguém querido", "Uma pausa a dois"],
      stE: "Presente afetivo", stT: ["Pausa, aroma e presença", "numa caixa"],
      st: "Para quem você quer dizer que se importa, sem precisar de muitas palavras. A pessoa abre, prova, prepara o chá e lembra de você na xícara seguinte.",
      goT: ["Garanta o seu", "Ternura"]
    },
    "kit-desdobramento-l1xs1": {
      ey: "Kit edição especial", t1: "Kit", t2: "Desdobramento",
      ld: "Sete itens naturais para quem está começando uma fase nova: chá para a pausa, snacks para o dia e infusões para dividir à mesa. Uma curadoria feita com o Pastor Sandro Rocha.",
      chips: ["7 itens naturais", "Caixa presente inclusa", "2 litros de infusão", "Lata de Chá Durex 80 g"],
      whyT: ["Uma mesa inteira", "dentro de uma caixa"],
      why: [["Chá Durex", "Lata de 80 g, cerca de 40 xícaras de frutas vermelhas."], ["Snacks do dia", "Granola Doce e desidratados para levar na bolsa."], ["Ritual à mesa", "Duas Infusões na Tangerina Rosé, que rendem 1 litro cada."], ["Feito à mão", "Itens artesanais, sem conservantes."]],
      boxT: ["O que vem", "na caixa"], box: ["Chá Misto Durex, lata 80 g", "Granola Doce 80 g", "Tangerina desidratada 20 g", "Banana com coco 40 g", "Trouxinha de Maçã", "2 Infusões na Tangerina Rosé", "Laranja Chocoleve 40 g"],
      ideal: ["Recomeços e fases novas", "Um presente especial", "Uma rotina de autocuidado"],
      stE: "A origem do kit", stT: ["Nasceu na live", "Desdobramentos"],
      st: "Criado em parceria com o Pastor Sandro Rocha, o kit leva o nome da live que ele apresenta. Cada item foi pensado para atravessar uma fase nova com mais calma, para você ou para quem está recomeçando.",
      goT: ["Garanta o seu", "Desdobramento"]
    },
    "kit-flowers": {
      ey: "Kit presente", t1: "Kit", t2: "Flowers",
      ld: "Quatro Rosas de Maçã que abrem devagar na xícara e o Chá Misto Intenso, que tinge a água de rubi. Um presente bonito antes mesmo do primeiro gole.",
      chips: ["4 Rosas de Maçã", "Chá Misto Intenso 25 g", "Cerca de 12 xícaras", "Caixa presente inclusa"],
      whyT: ["Um presente que", "floresce na xícara"],
      why: [["Visual", "As rosas abrem devagar dentro da xícara."], ["Cor rubi", "Frutas vermelhas que pintam a infusão."], ["Artesanal", "Feito à mão, sem conservantes."], ["Fácil de entregar", "Compacto e elegante, em caixa de 27 x 21 x 9 cm."]],
      boxT: ["O que vem", "na caixa"], box: ["4 Rosas de Maçã", "Chá Misto Intenso 25 g", "Caixa presente pronta para entregar"],
      ideal: ["Aniversários e datas especiais", "Quem ama flores", "Uma pausa bonita"],
      stE: "Floral", stT: ["Flores que", "você bebe"],
      st: "Use uma xícara de vidro para ver a rosa abrindo e o chá ficando rubi. É o tipo de presente que a pessoa fotografa antes de provar.",
      goT: ["Garanta o seu", "Flowers"]
    },
    "kitl-natal-feliz": {
      ey: "Kit presente · Natal", t1: "Natal", t2: "Feliz",
      ld: "Um Natal com sabor de casa, numa caixa de madeira gravada para guardar. A laranja com chocolate, a infusão servida na própria tangerina, trouxinhas, o blend mais marcante da casa, a xícara e o infusor.",
      chips: ["7 itens", "Caixa de madeira gravada", "Xícara e infusor inclusos", "Pronto para presentear"],
      whyT: ["O melhor da casa", "num presente só"],
      why: [["Carro-chefe", "Laranja Chocoleve, 10 fatias com borda de chocolate 70%."], ["Para a mesa toda", "Duas Infusões na Tangerina, 1 litro cada."], ["Pronto para usar", "Xícara de vidro duplo e infusor inox na caixa."], ["Caixa para guardar", "Madeira gravada com a marca, a nossa embalagem mais especial."]],
      boxT: ["O que vem", "na caixa"], box: ["Laranja Chocoleve, 10 fatias", "Infusão na Tangerina, 2 unidades", "Trouxinha de Maçã, 6 unidades", "Chá Misto Intenso 40 g", "Infusor inox com cabo", "Xícara de vidro duplo 250 ml", "Caixa de madeira gravada"],
      ideal: ["A família reunida na ceia", "Amigo secreto especial", "Agradecer clientes e parceiros"],
      stE: "Natal na Chef", stT: ["Um presente que", "sai da caixa e vai para a mesa"],
      st: "Reunimos o que a nossa cozinha faz de mais especial. Junto vão a xícara e o infusor, para quem recebe preparar o primeiro chá no mesmo dia.",
      goT: ["Garanta o seu", "Natal Feliz"]
    },
    "infusao-trouxinha-de-abacaxi": {
      ey: "Chá artesanal · favorito da casa", t1: "Trouxinha de", t2: "Abacaxi",
      ld: "Abacaxi, cravo e canela fechados à mão numa trouxinha que aquece a xícara e perfuma a casa. A doçura vem da própria fruta, sem açúcar adicionado.",
      chips: ["6 trouxinhas", "6 xícaras e mais 1 reuso", "Sem açúcar adicionado", "Feita à mão"],
      whyT: ["Cheiro de", "fim de dia bem vivido"],
      why: [["Quentinho", "Cravo e canela para as noites frias."], ["Casa perfumada", "O aroma de especiaria se espalha enquanto infusiona."], ["Doçura da fruta", "Sem açúcar adicionado, o doce vem do abacaxi."], ["Fruta no final", "O abacaxi reidratado pode ser comido depois."]],
      boxT: ["Como", "preparar"], box: ["1 trouxinha por xícara", "Água a 80 a 90 °C, sem ferver", "Abafe de 5 a 8 minutos", "No final, coma o abacaxi reidratado"],
      ideal: ["Fim de tarde ou noite fria", "Depois do jantar", "Quem gosta de chá com sabor de fruta"],
      note: "Gestantes ou quem usa anticoagulantes: consulte seu médico.",
      stE: "Aconchego", stT: ["A casa inteira", "com cheiro de especiaria"],
      st: "Noite fria, fim de expediente, vontade de algo quentinho. Prepare, deixe o aroma tomar a casa e termine com a fruta.",
      goT: ["Leve a sua", "Trouxinha de Abacaxi"]
    },
    "infusao-rose-na-tangerina": {
      ey: "Infusão · a mais surpreendente", t1: "Infusão na", t2: "Tangerina Rosé",
      ld: "A casca da tangerina é o próprio infusor: as ervas vêm dentro dela. No bule com água quente, ela abre devagar e a infusão vai do dourado ao rosé enquanto você serve.",
      chips: ["1 tangerina = 1 litro", "4 a 5 xícaras", "Sem coar", "Feita à mão"],
      whyT: ["O que tem", "dentro da tangerina"],
      why: [["Hibisco", "Cor rosé e um toque levemente ácido."], ["Capim-limão e maçã", "Final suave e adocicado, ótimo depois das refeições."], ["Eucalipto", "Aroma fresco que abre o perfume da xícara."], ["Laranja e tangerina", "Notas cítricas do começo ao fim."]],
      boxT: ["Como", "preparar"], box: ["Coloque a tangerina inteira no bule", "Adicione 1 litro de água a 85 a 90 °C", "Tampe e espere de 8 a 12 minutos", "Sirva direto, sem coar"],
      ideal: ["Visitas e cafés da tarde", "Servir a mesa toda de uma vez", "Quem gosta de chá floral e cítrico"],
      stE: "Experiência", stT: ["Todo mundo na mesa", "pergunta o que é"],
      st: "A tangerina abre no bule e a cor muda enquanto você serve. Um chá que vira assunto em visitas, cafés da tarde e mesas de chá.",
      goT: ["Escolha a quantidade", "e leve a sua"], pick: 1
    }
  };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function handle() { var m = location.pathname.match(/\/produtos\/([^\/?#]+)/); return m ? decodeURIComponent(m[1]) : ""; }
  function txt(sel) { var e = D.querySelector(sel); return e ? (e.textContent || "").replace(/\s+/g, " ").trim() : ""; }
  function num(s) { var m = String(s).replace(/\./g, "").match(/(\d+),(\d{2})/); return m ? parseFloat(m[1] + "." + m[2]) : 0; }
  function brl(v) { return "R$ " + v.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
  function prices() {
    var p = num(txt("#price_display")), c = num(txt("#compare_price_display"));
    if (!(c > p)) c = 0;
    return { p: p, c: c, off: c ? Math.round((1 - p / c) * 100) : 0 };
  }
  function images() {
    var out = [];
    D.querySelectorAll("#ns-section-main_product .js-product-slide-img").forEach(function (i) {
      var s = i.getAttribute("data-srcset") || i.getAttribute("srcset") || "", best = "", w = 0;
      s.split(",").forEach(function (p) { var a = p.trim().split(/\s+/); var ww = parseInt(a[1]) || 0; if (a[0] && ww >= w) { w = ww; best = a[0]; } });
      if (!best) best = i.getAttribute("data-src") || i.currentSrc || i.src || "";
      if (best && !/data:image/.test(best) && out.indexOf(best) < 0) out.push(best);
    });
    return out;
  }
  function hasPick() { return !!D.querySelector("#ns-section-main_product .js-product-variants select, #ns-section-main_product .js-product-variants .js-insta-variant, #ns-section-main_product .js-product-variants a.js-insta-variant"); }

  function goToBuy() {
    var f = D.querySelector("#ns-section-main_product .js-product-form") || D.getElementById("ns-section-main_product");
    if (!f) return;
    f.scrollIntoView({ behavior: "smooth", block: "center" });
    var b = D.querySelector("#ns-section-main_product .js-addtocart");
    if (b) { b.classList.remove("cml-dst-flash"); void b.offsetWidth; b.classList.add("cml-dst-flash"); }
  }
  function buy(ev) {
    if (ev) ev.preventDefault();
    var d = DATA[handle()] || {};
    var b = D.querySelector("#ns-section-main_product .js-addtocart");
    if (d.pick || hasPick() || !b || b.disabled || /nostock|disabled/.test(b.className)) { goToBuy(); return; }
    b.click();
  }

  function buildDst() {
    var h = handle(), d = DATA[h];
    if (!d || D.getElementById("cml-dst")) return;
    var main = D.getElementById("ns-section-main_product");
    if (!main || !D.querySelector("#ns-section-main_product .js-product-slide-img")) return;
    var im = images(); if (!im.length) return;
    var pr = prices();
    var I = function (n) { return im[n % im.length]; };
    var ctaTxt = d.pick ? "Escolher quantidade" : "Comprar agora";
    var btn = function (t) { return '<button type="button" class="bt js-dst-buy">' + CART_ICON + esc(t || ctaTxt) + "</button>"; };
    var priceHtml = '<div class="pr"><span class="dst-pc">' + (pr.c ? "<s>de " + brl(pr.c) + "</s>" : "") + "</span><b class=\"dst-pp\">" + brl(pr.p) + '</b><span class="dst-po">' + (pr.off >= 5 ? '<span class="off">-' + pr.off + "%</span>" : "") + "</span></div>" +
      '<p class="pc dst-pi">ou 5x de ' + brl(pr.p / 5) + " sem juros · 5% OFF no Pix</p>";
    var thumbs = "";
    for (var t = 0; t < Math.min(3, im.length); t++) thumbs += '<button type="button" class="' + (t ? "" : "on") + '" data-i="' + t + '"><img loading="lazy" alt="" src="' + esc(im[t]) + '"></button>';
    var why = d.why.map(function (w, i) { return '<div class="rv"><span class="n">0' + (i + 1) + "</span><b>" + esc(w[0]) + "</b><p>" + esc(w[1]) + "</p></div>"; }).join("");
    var box = d.box.map(function (b, i) { return "<li><span>" + (i < 9 ? "0" : "") + (i + 1) + "</span>" + esc(b) + "</li>"; }).join("");
    var ideal = d.ideal.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("");
    var g1 = I(1), g2 = I(2), g3 = I(3);
    var gal = im.length >= 3
      ? '<div class="gal rv"><figure><img loading="lazy" alt="" src="' + esc(g1) + '"></figure><div class="side"><figure><img loading="lazy" alt="" src="' + esc(g2) + '"></figure><figure><img loading="lazy" alt="" src="' + esc(g3) + '"></figure></div></div>'
      : '<div class="gal one rv"><figure><img loading="lazy" alt="" src="' + esc(I(im.length > 1 ? 1 : 0)) + '"></figure></div>';

    var html =
      '<div class="dw">' +
        '<div class="dh">' +
          '<div class="dh-media"><figure class="fr"><img class="dst-main" alt="' + esc(d.t1 + " " + d.t2) + '" src="' + esc(im[0]) + '"></figure>' +
            (pr.off >= 5 ? '<span class="seal">-' + pr.off + "%</span>" : "") +
            (im.length > 1 ? '<div class="thumbs">' + thumbs + "</div>" : "") +
          "</div>" +
          '<div class="dh-txt">' +
            '<p class="ey">' + esc(d.ey) + "</p>" +
            '<h2 class="tt">' + esc(d.t1) + " <em>" + esc(d.t2) + "</em></h2>" +
            '<p class="ld">' + esc(d.ld) + "</p>" +
            '<ul class="chips">' + d.chips.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul>" +
            priceHtml +
            '<div class="ctas">' + btn() + "</div>" +
            '<div class="trust"><span><i>✓</i>Feito à mão, em família</span><span><i>★</i>Nota 5,0 no Google</span><span><i>✓</i>Envio para todo o Brasil</span></div>' +
          "</div>" +
        "</div>" +
        '<div class="strip rv"><div><b>Artesanal</b><span>Produzido na nossa cozinha, em pequenos lotes.</span></div><div><b>Sem conservantes</b><span>Ingredientes de verdade, nada de aditivos.</span></div><div><b>Pagamento fácil</b><span>Pix, boleto ou até 5x sem juros no cartão.</span></div><div><b>Cashback de 5%</b><span>Volta em crédito para a próxima compra.</span></div></div>' +
        '<div class="blk"><p class="ey rv">Por que é especial</p><h3 class="tt rv">' + esc(d.whyT[0]) + " <em>" + esc(d.whyT[1]) + '</em></h3><div class="why">' + why + "</div></div>" +
        "</div>";

    var sec = D.createElement("section");
    sec.id = "cml-dst"; sec.className = "cml-dst";
    sec.innerHTML = html;
    main.parentNode.insertBefore(sec, main);
    D.documentElement.classList.add("cml-dst-on");

    // videos curtos (sem som, em loop) no lugar das fotos; se o video nao carregar, a foto volta
    if (d.vid) {
      var VB = "https://dzmlyrkzcdqicwfmxnxd.supabase.co/storage/v1/object/public/cml-video/";
      var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
      var mkv = function (img, name, cls, eager) {
        if (!img) return null;
        var v = D.createElement("video");
        v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true;
        v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.setAttribute("disablepictureinpicture", "");
        v.preload = eager ? "auto" : "metadata"; v.poster = VB + name + "-poster.jpg"; v.className = cls;
        v.addEventListener("error", function () { if (v.parentNode) v.parentNode.removeChild(v); }, true);
        v.src = VB + name + ".mp4";
        // a foto fica por baixo; o video so aparece quando de fato esta rodando (iPhone em economia de energia nao toca video sozinho)
        var pr = img.parentNode; if (getComputedStyle(pr).position === "static") pr.style.position = "relative";
        v.style.cssText = "position:absolute;left:" + img.offsetLeft + "px;top:" + img.offsetTop + "px;width:" + img.offsetWidth + "px;height:" + img.offsetHeight + "px;object-fit:cover;opacity:0;transition:opacity .35s;border-radius:" + getComputedStyle(img).borderRadius;
        v.addEventListener("playing", function () { v.style.opacity = "1"; });
        var fit = function () { if (!img.offsetWidth) return; v.style.left = img.offsetLeft + "px"; v.style.top = img.offsetTop + "px"; v.style.width = img.offsetWidth + "px"; v.style.height = img.offsetHeight + "px"; };
        window.addEventListener("resize", fit); setTimeout(fit, 300); setTimeout(fit, 1500);
        pr.insertBefore(v, img.nextSibling);
        return v;
      };
      var vl = [mkv(sec.querySelector("img.dst-main"), d.vid.hero, "dst-hv", true), mkv(sec.querySelector(".gal > figure img"), d.vid.gal, "dst-gv"), mkv(sec.querySelector(".story figure img"), d.vid.st, "dst-sv")].filter(Boolean);
      if (!still && "IntersectionObserver" in window) {
        var vo = new IntersectionObserver(function (es) { es.forEach(function (x) { var v = x.target; if (x.isIntersecting && v.style.display !== "none") { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); }); }, { threshold: 0.25 });
        vl.forEach(function (v) { vo.observe(v); });
      }
    }

    sec.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest(".js-dst-buy,.js-dst-to,.js-dst-down,.thumbs button") : null;
      if (!t) return;
      if (t.classList.contains("js-dst-buy")) return buy(e);
      if (t.classList.contains("js-dst-down")) { e.preventDefault(); return goToBuy(); }
      if (t.classList.contains("js-dst-to")) { e.preventDefault(); var bx = D.getElementById("cml-dst-box"); if (bx) bx.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
      var i = +t.getAttribute("data-i"), m = sec.querySelector("img.dst-main"), hv = sec.querySelector("video.dst-hv");
      if (m && im[i]) { if (hv && i === 0) { hv.style.display = ""; m.style.display = ""; m.src = im[0]; try { var pp = hv.play(); if (pp && pp.catch) pp.catch(function () {}); } catch (x) {} } else { if (hv) { hv.pause(); hv.style.display = "none"; } m.style.display = ""; m.src = im[i]; } sec.querySelectorAll(".thumbs button").forEach(function (b) { b.classList.toggle("on", b === t); }); }
    });

    var rv = sec.querySelectorAll(".rv");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
      rv.forEach(function (e) { io.observe(e); });
    } else rv.forEach(function (e) { e.classList.add("in"); });

    var pd = D.getElementById("price_display");
    if (pd && "MutationObserver" in window) new MutationObserver(refreshPrice).observe(pd, { childList: true, characterData: true, subtree: true });
  }

  function refreshPrice() {
    var pr = prices(); if (!pr.p) return;
    D.querySelectorAll(".dst-pp").forEach(function (e) { e.textContent = brl(pr.p); });
    D.querySelectorAll(".dst-pc").forEach(function (e) { e.innerHTML = pr.c ? "<s>de " + brl(pr.c) + "</s>" : ""; });
    D.querySelectorAll(".dst-po").forEach(function (e) { e.innerHTML = pr.off >= 5 ? '<span class="off">-' + pr.off + "%</span>" : ""; });
    D.querySelectorAll(".dst-pi").forEach(function (e) { e.textContent = "ou 5x de " + brl(pr.p / 5) + " sem juros · 5% OFF no Pix"; });
    barExtra(true);
  }

  function barExtra(force) {
    if (!D.documentElement.classList.contains("cml-dst-on")) return;
    var bar = D.querySelector(".cml-bar"); if (!bar) return;
    var t = bar.querySelector(".t"), go = bar.querySelector(".go");
    if (go && !go.getAttribute("data-dst")) { go.setAttribute("data-dst", "1"); }
    if (!t) return;
    var dp = t.querySelector(".dp");
    if (dp && !force) return;
    var pr = prices();
    if (!dp) { dp = D.createElement("span"); dp.className = "dp"; var sp = t.querySelector("span"); (sp || t).appendChild(dp); }
    dp.innerHTML = (pr.c ? "<s>" + brl(pr.c) + "</s>" : "") + (pr.off >= 5 ? "<i>-" + pr.off + "%</i>" : "");
  }

  var barT = 0;
  function barShow() {
    if (!D.documentElement.classList.contains("cml-dst-on")) return;
    var bar = D.querySelector(".cml-bar"); if (!bar) return;
    var vis = function (e) { if (!e) return false; var r = e.getBoundingClientRect(); return r.bottom > 60 && r.top < innerHeight - 70 && r.width > 0; };
    var hero = D.querySelector("#cml-dst .dh .ctas"), main = D.querySelector("#ns-section-main_product .js-addtocart");
    bar.classList.toggle("dst-show", !vis(hero) && !vis(main) && scrollY > 120);
  }
  addEventListener("scroll", function () { if (barT) return; barT = requestAnimationFrame(function () { barT = 0; barShow(); }); }, { passive: true });

  function modalTitle() {
    var m = D.getElementById("installments-modal"); if (!m) return;
    var t = m.querySelector(".modal-title"); if (!t || t.getAttribute("data-dst")) return;
    if (/Formas de pagamento/i.test(t.textContent)) {
      t.setAttribute("data-dst", "1");
      t.innerHTML = '<span class="ey">Condições</span>Formas de <em>pagamento</em>';
    }
  }

  function moveWa() {
    var a = D.querySelector("#ns-section-main_product a.c3-wal");
    var pa = D.querySelector("#ns-section-main_product .js-product-form .product-actions");
    if (!a || !pa) return;
    if (pa.nextElementSibling !== a) pa.parentNode.insertBefore(a, pa.nextSibling);
    a.classList.add("cml-wn");
  }

  function searchHead() {
    if (!D.body || !D.body.classList.contains("template-search")) return;
    var h = D.querySelector(".products-grid-search-heading");
    if (h && !h.getAttribute("data-dst")) {
      var m = h.textContent.trim().match(/^(\d+)\s+(.*)$/);
      if (m) { h.setAttribute("data-dst", "1"); h.innerHTML = "<b>" + m[1] + "</b> " + esc(m[2]); }
    }
  }

  // oferta complementar da Nuvemshop ("Desconto exclusivo!"): foto pequena ao lado do nome e do preco
  function xsell() {
    var m = D.getElementById("js-cross-selling-modal"); if (!m) return;
    var t = m.querySelector(".modal-title");
    if (t && !t.getAttribute("data-dst") && /Desconto exclusivo/i.test(t.textContent)) { t.setAttribute("data-dst", "1"); t.innerHTML = '<span class="ey">Oferta para você</span>Desconto <em>exclusivo</em>'; }
    var c = m.querySelector(".js-cross-selling-container"); if (!c || c.getAttribute("data-dst")) return;
    var img = c.querySelector(".js-cross-selling-product-image"), nm = c.querySelector(".js-cross-selling-product-name");
    if (!img || !nm) return;
    c.setAttribute("data-dst", "1");
    var pr = c.querySelector(".js-cross-selling-prices-container") || c.querySelector(".js-cross-selling-promo-price");
    var top = function (e) { while (e && e.parentElement !== c) e = e.parentElement; return e; };
    var ib = top(img);
    if (!ib || ib.contains(nm) || (pr && ib.contains(pr))) { ib = img.closest("picture,a,figure,.js-cross-selling-product-image-container") || img; if (ib.contains(nm)) ib = img; }
    var row = D.createElement("div"); row.className = "cml-xs-row";
    var info = D.createElement("div"); info.className = "cml-xs-info";
    info.innerHTML = '<p class="ey">Leve junto</p>';
    c.insertBefore(row, top(ib) || c.firstChild);
    row.appendChild(ib); ib.classList.add("cml-xs-img");
    info.appendChild(nm);
    if (pr && !pr.contains(nm)) info.appendChild(pr);
    row.appendChild(info);
  }

  // aviso "Adicionado ao carrinho": botoes Ver sacola / Continuar comprando
  function cartNote() {
    var n = D.querySelector(".notification-cart-container.js-notification-cart > .notification");
    if (!n || n.querySelector(".cml-nt-act")) return;
    var s = n.querySelector(".notification-cart-success"); if (s && /Adicionado ao carrinho/i.test(s.textContent)) s.textContent = "Adicionado à sacola";
    var a = D.createElement("div"); a.className = "cml-nt-act";
    a.innerHTML = '<button type="button" class="cml-nt-go">Ver sacola e finalizar</button><button type="button" class="cml-nt-keep">Continuar comprando</button>';
    n.appendChild(a);
    var close = function () { var c = n.querySelector(".js-cart-notification-close-private"); if (c) c.click(); };
    a.querySelector(".cml-nt-keep").addEventListener("click", close);
    a.querySelector(".cml-nt-go").addEventListener("click", function () {
      close();
      var b = D.querySelector('.js-modal-open-private[data-target="#modal-cart"], .js-modal-open-private[data-toggle="#modal-cart"], button[aria-label="Carrinho de compras"]');
      setTimeout(function () { if (b) b.click(); else location.href = "/comprar/"; }, 150);
    });
  }

  // lateral de categorias em arvore: irmas sempre visiveis, atual aberta com as subcategorias
  function catTree() {
    var side = D.querySelector("aside.c2-side"); if (!side || side.getAttribute("data-dst")) return;
    var nav = D.querySelector(".js-nav-desktop-list"); if (!nav) return;
    var node = function (a, ulx) {
      var kids = [];
      if (ulx) [].forEach.call(ulx.children, function (li) { if (li.tagName !== "LI") return; var aa = li.querySelector("a"); if (aa && aa.pathname) kids.push(node(aa, li.querySelector("ul"))); });
      return { n: (a.textContent || "").replace(/\s+/g, " ").trim(), h: a.pathname, k: kids };
    };
    var T = [];
    [].forEach.call(nav.children, function (li) {
      if (li.tagName !== "LI") return;
      var a = li.querySelector("a"), dd = li.querySelector(".desktop-list-subitems");
      if (a && dd && dd.children.length) T.push(node(a, dd));
    });
    if (!T.length) return;
    side.setAttribute("data-dst", "1");
    var p = location.pathname; if (p.slice(-1) !== "/") p += "/";
    var sm = location.search.match(/[?&](sort_by=[^&#]*)/), qs = sm ? "?" + sm[1] : "";
    var chev = '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4.5l3 3 3-3"/></svg>';
    var li = function (nd, lv) {
      var on = p === nd.h, open = p.indexOf(nd.h) === 0, has = nd.k.length > 0;
      var s = '<li class="lv' + lv + (open ? " open" : "") + '"><div class="r"><a class="' + (on ? "on" : (open ? "part" : "")) + '" href="' + esc(nd.h + qs) + '"><i></i><span>' + esc(nd.n) + "</span></a>" + (has ? '<button type="button" class="tg" aria-label="Mostrar subcategorias de ' + esc(nd.n) + '">' + chev + "</button>" : "") + "</div>";
      if (has) s += "<ul>" + nd.k.map(function (c) { return li(c, lv + 1); }).join("") + "</ul>";
      return s + "</li>";
    };
    var html = '<p class="k">Categorias</p><ul class="cml-tree"><li class="lv0"><div class="r"><a class="' + (p === "/produtos/" ? "on" : "") + '" href="/produtos/' + qs + '"><i></i><span>Todos os produtos</span></a></div></li>' + T.map(function (n) { return li(n, 1); }).join("") + "</ul>";
    var grp = null;
    [].forEach.call(side.querySelectorAll(".grp"), function (g) { var k = g.querySelector(".k"); if (!grp && k && /categoria/i.test(k.textContent)) grp = g; });
    if (!grp) { grp = D.createElement("div"); grp.className = "grp"; side.insertBefore(grp, side.firstChild); }
    grp.classList.add("cml-tree-grp");
    grp.innerHTML = html;
    grp.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest(".tg") : null; if (!b) return;
      e.preventDefault(); var l = b.closest("li"); if (l) l.classList.toggle("open");
    });
    if (p === "/produtos/") {
      var h = D.querySelector("#MainContent h1");
      if (h && /Compre online produtos/i.test(h.textContent)) h.innerHTML = "Todos os <em>produtos</em>";
    }
  }

  // celular: fileira 1 = categoria atual + irmas; fileira 2 = subcategorias
  function catPills() {
    if (D.body && D.body.classList.contains("template-search")) return;
    var bar = D.getElementById("cml-cbar"); if (!bar || bar.getAttribute("data-dst")) return;
    var pills = bar.querySelector(".cml-pills"); if (!pills) return;
    var nav = D.querySelector(".js-nav-desktop-list"); if (!nav) return;
    var node = function (a, ulx, par) {
      var nd = { n: (a.textContent || "").replace(/\s+/g, " ").trim(), h: a.pathname, k: [], p: par };
      if (ulx) [].forEach.call(ulx.children, function (li) { if (li.tagName !== "LI") return; var aa = li.querySelector("a"); if (aa && aa.pathname) nd.k.push(node(aa, li.querySelector("ul"), nd)); });
      return nd;
    };
    var root = { n: "Todos os produtos", h: "/produtos/", k: [], p: null };
    [].forEach.call(nav.children, function (li) {
      if (li.tagName !== "LI") return;
      var a = li.querySelector("a"), dd = li.querySelector(".desktop-list-subitems");
      if (a && dd && dd.children.length) root.k.push(node(a, dd, root));
    });
    if (!root.k.length) return;
    var p = location.pathname; if (p.slice(-1) !== "/") p += "/";
    var cur = null;
    var find = function (nd) { if (nd.h === p) cur = nd; nd.k.forEach(find); };
    find(root);
    if (!cur) return;
    bar.setAttribute("data-dst", "1");
    var sm = location.search.match(/[?&](sort_by=[^&#]*)/), qs = sm ? "?" + sm[1] : "";
    var chip = function (nd, on, label) { return '<a class="' + (on ? "on" : "") + '" href="' + esc(nd.h + qs) + '">' + esc(label || nd.n) + "</a>"; };
    var rowA = "", rowB = "";
    if (cur === root) {
      rowA = chip(root, true, "Todos") + root.k.map(function (c) { return chip(c, false); }).join("");
    } else if (cur.k.length) {
      var par = cur.p || root;
      rowA = (par === root ? chip(root, false, "Todos") : chip(par, false, "Todos")) + par.k.map(function (c) { return chip(c, c === cur); }).join("");
      rowB = chip(cur, true, "Todos") + cur.k.map(function (c) { return chip(c, false); }).join("");
    } else {
      var pa = cur.p || root, gp = pa.p || root;
      if (pa === root) { rowA = chip(root, false, "Todos") + root.k.map(function (c) { return chip(c, c === cur); }).join(""); }
      else {
        rowA = chip(gp, false, "Todos") + gp.k.map(function (c) { return chip(c, c === pa); }).join("");
        rowB = chip(pa, false, "Todos") + pa.k.map(function (c) { return chip(c, c === cur); }).join("");
      }
    }
    pills.innerHTML = rowA;
    bar.classList.add("cml-cat2");
    if (rowB) { var sub = D.createElement("div"); sub.className = "cml-pills cml-sub"; sub.innerHTML = rowB; pills.parentNode.insertBefore(sub, pills.nextSibling); }
    var fit = function () {
      [].forEach.call(bar.querySelectorAll(".cml-pills"), function (row) {
        var o = row.querySelector("a.on"); row.scrollLeft = 0;
        if (!o) return;
        var rr = row.getBoundingClientRect(), orr = o.getBoundingClientRect();
        if (orr.right > rr.right - 24) row.scrollLeft = orr.left - rr.left - 24;
      });
    };
    fit(); setTimeout(fit, 300); setTimeout(fit, 1200);
  }

  // avaliacoes do Cashing: resumo em uma linha + citacoes em carrossel com setas e contador
  function rvRoot() {
    var r = null;
    [].forEach.call(D.querySelectorAll(".cml-rev [class*='mi-@container']"), function (e) { if (!r && e.children.length >= 2 && /Avalia/.test(e.textContent)) r = e; });
    return r;
  }
  function rvRead(root) {
    var body = root.children[1], out = { avg: "", cnt: "", items: [] };
    if (!body) return out;
    var sumEl = body.children[0], list = body.children[1];
    var st = sumEl && sumEl.querySelector("strong"); out.avg = st ? st.textContent.trim().replace(".", ",") : "";
    var cs = sumEl && [].filter.call(sumEl.querySelectorAll("span"), function (s) { return /\d+\s+avalia/i.test(s.textContent); })[0]; out.cnt = cs ? cs.textContent.trim() : "";
    if (!list) return out;
    var seen = {};
    [].forEach.call(list.querySelectorAll("clipPath[id^='mi-star']"), function (cp) {
      var svg = cp.closest("svg"), row = svg && svg.parentElement, card = row && row.parentElement;
      if (!card || card.getAttribute("data-rv-seen") === "x" || seen[card.__rvk]) return;
      var r = 0; [].forEach.call(row.querySelectorAll("clipPath rect"), function (re) { r += (parseFloat(re.getAttribute("width")) || 0) / 20; });
      var p = card.querySelector("p"), t = p ? p.textContent.trim() : "";
      var sp = card.querySelector("span"), d = sp ? sp.textContent.trim() : "";
      var w = card.parentElement, im = w && w.querySelector("img"), vd = w && w.querySelector("video");
      var m = vd ? { v: 1, s: vd.currentSrc || vd.src || (vd.querySelector("source") || {}).src || "" } : (im ? { v: 0, s: im.currentSrc || im.src } : null);
      if (m && !m.s) m = null;
      var key = t + "|" + d; if (seen[key]) return; seen[key] = 1;
      if (!t && !m) return;
      out.items.push({ t: t, d: d, r: Math.round(r * 2) / 2, m: m });
    });
    return out;
  }
  function rvStars(r, sm) {
    var s = '<span class="rv2-st' + (sm ? " sm" : "") + '" aria-label="' + r + ' de 5 estrelas">';
    for (var i = 1; i <= 5; i++) { var f = Math.max(0, Math.min(1, r - (i - 1))); s += '<i style="--f:' + Math.round(f * 100) + '%"></i>'; }
    return s + "</span>";
  }
  function rvRender(host, root) {
    var dt = rvRead(root); if (!dt.items.length) return;
    var old = host.querySelector(".cml-rv2");
    if (old && +old.getAttribute("data-n") === dt.items.length) return;
    var avgN = parseFloat((dt.avg || "5").replace(",", ".")) || 5;
    var arrow = function (dir) { return '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="' + (dir < 0 ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5") + '"/></svg>'; };
    var cards = dt.items.map(function (it, i) {
      var media = it.m ? '<button type="button" class="rv2-m' + (it.m.v ? " v" : "") + '" data-i="' + i + '" aria-label="Ver foto da avaliação">' + (it.m.v ? '<video muted playsinline preload="metadata" src="' + esc(it.m.s) + '#t=0.5"></video>' : '<img loading="lazy" alt="" src="' + esc(it.m.s) + '">') + "</button>" : "";
      return '<figure class="rv2-c"><span class="rv2-q" aria-hidden="true">“</span><blockquote>' + esc(it.t || "Avaliou com " + it.r + " estrelas.") + '</blockquote><button type="button" class="rv2-more">Ler tudo</button><figcaption><div class="ci">' + rvStars(it.r, 1) + "<small>Compra verificada" + (it.d ? " · " + esc(it.d) : "") + "</small></div>" + media + "</figcaption></figure>";
    }).join("");
    var c = D.createElement("div"); c.className = "cml-rv2"; c.setAttribute("data-n", dt.items.length);
    c.innerHTML = '<div class="rv2-top"><div class="rv2-sum"><b>' + esc(dt.avg || "5,0") + "</b>" + rvStars(avgN) + '<span class="rv2-n">' + esc(dt.cnt || dt.items.length + " avaliações") + '</span></div><div class="rv2-nav"><button type="button" class="rv2-pv" aria-label="Avaliação anterior">' + arrow(-1) + '</button><span class="rv2-ct">1 / ' + dt.items.length + '</span><button type="button" class="rv2-nx" aria-label="Próxima avaliação">' + arrow(1) + '</button></div></div><div class="rv2-tr">' + cards + "</div>";
    if (old) old.parentNode.replaceChild(c, old); else root.parentNode.insertBefore(c, root.nextSibling);
    host.classList.add("cml-rv2-on");
    var tr = c.querySelector(".rv2-tr"), pv = c.querySelector(".rv2-pv"), nx = c.querySelector(".rv2-nx"), ct = c.querySelector(".rv2-ct");
    var step = function () { var f = tr.querySelector(".rv2-c"); return f ? f.getBoundingClientRect().width + 14 : tr.clientWidth; };
    var upd = function () {
      var s = step(), i = Math.round(tr.scrollLeft / s), per = Math.max(1, Math.round(tr.clientWidth / s));
      var last = Math.min(dt.items.length, i + per);
      ct.textContent = (per > 1 ? (i + 1) + "–" + last : (i + 1)) + " / " + dt.items.length;
      pv.disabled = tr.scrollLeft < 4; nx.disabled = tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 4;
    };
    var go = function (d) { tr.scrollBy({ left: d * step(), behavior: "smooth" }); };
    var user = false, stop = function () { user = true; };
    pv.addEventListener("click", function () { stop(); go(-1); });
    nx.addEventListener("click", function () { stop(); go(1); });
    tr.addEventListener("scroll", function () { upd(); }, { passive: true });
    ["pointerdown", "touchstart", "wheel", "mouseenter"].forEach(function (ev) { tr.addEventListener(ev, stop, { passive: true }); });
    [].forEach.call(c.querySelectorAll(".rv2-c"), function (fc) {
      var bq = fc.querySelector("blockquote"); if (bq && bq.scrollHeight > bq.clientHeight + 2) fc.classList.add("clip");
    });
    c.addEventListener("click", function (e) {
      var mb = e.target.closest ? e.target.closest(".rv2-more") : null;
      if (mb) { stop(); var fc = mb.closest(".rv2-c"); fc.classList.toggle("open"); mb.textContent = fc.classList.contains("open") ? "Mostrar menos" : "Ler tudo"; return; }
      var md = e.target.closest ? e.target.closest(".rv2-m") : null;
      if (md) {
        stop(); var it = dt.items[+md.getAttribute("data-i")]; if (!it || !it.m) return;
        var lb = D.createElement("div"); lb.className = "cml-rv2-lb";
        lb.innerHTML = (it.m.v ? '<video controls autoplay playsinline src="' + esc(it.m.s) + '"></video>' : '<img alt="" src="' + esc(it.m.s) + '">') + '<button type="button" aria-label="Fechar">×</button>';
        lb.addEventListener("click", function (ev) { if (ev.target === lb || ev.target.tagName === "BUTTON") lb.remove(); });
        D.body.appendChild(lb);
      }
    });
    upd(); setTimeout(upd, 400);
    // avanca sozinho devagar enquanto ninguem mexe e o bloco esta na tela
    var vis = false;
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }, { threshold: 0.5 }).observe(tr);
    var rm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!rm && dt.items.length > 1) var iv = setInterval(function () {
      if (!c.isConnected) { clearInterval(iv); return; }
      if (user || !vis || D.hidden) return;
      if (tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 4) tr.scrollTo({ left: 0, behavior: "smooth" }); else go(1);
    }, 5500);
  }
  function reviews() {
    var root = rvRoot(); if (!root) return;
    var host = root.closest(".cml-rev"); if (!host) return;
    var st = host.getAttribute("data-rv2");
    if (!st) {
      if (!rvRead(root).items.length) return;
      host.setAttribute("data-rv2", "busy");
      rvRender(host, root);
      var n = 0;
      (function more() {
        var b = [].filter.call(root.querySelectorAll("button"), function (x) { return /^\s*Ver mais\s*$/i.test(x.textContent) && !x.classList.contains("cml-rv-more"); })[0];
        if (!b || n++ > 15) { host.setAttribute("data-rv2", "ok"); rvRender(host, root); return; }
        b.click(); setTimeout(more, 800);
      })();
      return;
    }
    if (st === "ok") rvRender(host, root);
  }

  // pagina de todos os produtos + filtro de preco (lateral, celular e etiquetas de filtro ativo)
  var PF = [["Até R$ 50", "", "50"], ["R$ 50 a R$ 100", "50", "100"], ["R$ 100 a R$ 200", "100", "200"], ["Acima de R$ 200", "200", ""]];
  function pfUrl(mn, mx) {
    var u = new URL(location.href); u.hash = "";
    u.searchParams.delete("min_price"); u.searchParams.delete("max_price"); u.searchParams.delete("page");
    if (mn !== null) { u.searchParams.set("min_price", mn || "0"); if (mx) u.searchParams.set("max_price", mx); }
    return u.pathname + u.search;
  }
  function pfCur() { var s = new URLSearchParams(location.search); return { mn: s.get("min_price"), mx: s.get("max_price") }; }
  function pfIsOn(r, c) { if (c.mn === null && c.mx === null) return false; return (+(c.mn || 0) === +(r[1] || 0)) && ((c.mx || "") === r[2]); }
  function priceFilter() {
    var p = location.pathname, c = pfCur();
    if (D.body && p === "/produtos/") {
      D.body.classList.add("cml-allp");
      var cbt = D.querySelector("#ns-section-category_hero .c2-cbt");
      if (cbt && !cbt.getAttribute("data-allp")) {
        cbt.setAttribute("data-allp", "1");
        var k = cbt.querySelector(".k"); if (k) k.textContent = "Loja completa";
        var h = cbt.querySelector("h2"); if (h) h.innerHTML = "Todos os <em>produtos</em>";
        var cbn = cbt.parentNode, nav = D.querySelector(".js-nav-desktop-list");
        if (cbn && nav && !cbn.querySelector(".cml-qk")) {
          var qk = D.createElement("div"); qk.className = "cml-qk"; var qh = "";
          [].forEach.call(nav.children, function (li) { var a = li.querySelector("a"), dd = li.querySelector(".desktop-list-subitems"); if (a && dd && dd.children.length) qh += '<a href="' + esc(a.pathname) + '">' + esc(a.textContent.replace(/\s+/g, " ").trim()) + "</a>"; });
          qk.innerHTML = qh + '<a class="of" href="/ofertas/">Ofertas</a>'; cbn.appendChild(qk);
        }
        if (!cbt.querySelector(".sb")) { var sb = D.createElement("p"); sb.className = "sb"; sb.textContent = "Chás artesanais, infusões, snacks e kits feitos à mão. Use os filtros para encontrar o seu."; cbt.appendChild(sb); }
      }
      if (D.title.indexOf("Todos os produtos") !== 0) { try { D.title = "Todos os produtos | Chef Mais Leve"; } catch (x) {} }
    }
    var side = D.querySelector("aside.c2-side");
    if (side && !side.getAttribute("data-pf") && side.querySelector(".cml-tree-grp")) {
      side.setAttribute("data-pf", "1");
      var g = D.createElement("div"); g.className = "grp cml-tree-grp";
      g.innerHTML = '<p class="k">Faixa de preço</p><ul class="cml-tree">' + PF.map(function (r) { var on = pfIsOn(r, c); return '<li><div class="r"><a class="' + (on ? "on" : "") + '" href="' + esc(on ? pfUrl(null) : pfUrl(r[1], r[2])) + '"><i></i><span>' + r[0] + "</span></a></div></li>"; }).join("") + '</ul><p class="k" style="margin-top:14px">Destaques</p><ul class="cml-tree"><li><div class="r"><a class="' + (p.indexOf("/ofertas/") === 0 ? "on" : "") + '" href="/ofertas/"><i></i><span>Em oferta</span></a></div></li></ul>';
      var tg = side.querySelector(".cml-tree-grp"); tg.parentNode.insertBefore(g, tg.nextSibling);
    }
    var bar = D.getElementById("cml-cbar");
    if (bar && !bar.getAttribute("data-pf") && bar.getAttribute("data-dst")) {
      bar.setAttribute("data-pf", "1");
      var row = D.createElement("div"); row.className = "cml-pills cml-sub cml-price";
      row.innerHTML = PF.map(function (r) { var on = pfIsOn(r, c); return '<a class="' + (on ? "on" : "") + '" href="' + esc(on ? pfUrl(null) : pfUrl(r[1], r[2])) + '">' + r[0] + "</a>"; }).join("");
      var subs = bar.querySelectorAll(".cml-pills"); var last = subs[subs.length - 1]; last.parentNode.insertBefore(row, last.nextSibling);
      bar.classList.add("cml-cat2");
    }
    var tbl = D.querySelector(".js-product-table");
    if (tbl && (c.mn !== null || c.mx !== null) && !D.querySelector(".cml-pf")) {
      var r0 = PF.filter(function (r) { return pfIsOn(r, c); })[0];
      var lbl = r0 ? r0[0] : ("R$ " + (c.mn || 0) + (c.mx ? " a R$ " + c.mx : " ou mais"));
      var pf = D.createElement("div"); pf.className = "cml-pf";
      pf.innerHTML = '<span class="lb">Filtros</span><a href="' + esc(pfUrl(null)) + '" aria-label="Remover filtro de preço">' + esc(lbl) + ' <b>×</b></a><a class="clr" href="' + esc(location.pathname) + '">Limpar filtros</a>';
      tbl.parentNode.insertBefore(pf, tbl);
    }
  }

  function tick() {
    // cada passo protegido sozinho: um erro nao derruba os seguintes
    var steps = [addCss, modalTitle, xsell, cartNote, catTree, catPills, reviews, priceFilter, moveWa, searchHead, buildDst, function () { barExtra(false); }];
    for (var i = 0; i < steps.length; i++) { try { steps[i](); } catch (e) { try { console.warn("cml-destaque", steps[i].name || i, e); } catch (x) {} } }
  }
  function start() {
    tick();
    var n = 0, iv = setInterval(function () { if (!D.hidden) tick(); if (++n > 24) clearInterval(iv); }, 250);
    if ("MutationObserver" in window && D.body) {
      var to = 0;
      new MutationObserver(function () { if (to) return; to = 1; (window.__cxQ||(window.__cxQ=function(f,d){var n=performance.now(),g=window.__cxg||(window.__cxg={t:0,c:0});if(n-g.t>50){g.t=n;g.c=0}g.c++;if(g.c<12)Promise.resolve().then(f);else setTimeout(f,d)}))(function () { to = 0; tick(); }, 120); }).observe(D.body, { childList: true, subtree: true });
    }
  }
    // 22/11/2026: monta a apresentacao assim que a secao do produto termina de chegar (sem esperar a pagina inteira),
  // e enquanto isso segura as secoes de baixo, para o "veja tambem" nao aparecer antes da compra.
  (function early() {
    try {
      if (!DATA[handle()] || D.readyState !== "loading" || !("MutationObserver" in window)) return;
      var st = D.createElement("style"); st.id = "cml-dst-wait";
      st.textContent = "@keyframes cmlDw{to{visibility:visible}}html body:not(:has(#cml-dst)) :is(#ns-section-product_description,#ns-section-alternative_products,[id^=ns-section-faq],#ns-section-footer){visibility:hidden;animation:cmlDw 0s 5s forwards}html body:not(:has(#cml-dst)) #MainContent{min-height:100vh}";
      (D.head || D.documentElement).appendChild(st);
      var tryB = function () {
        if (D.getElementById("cml-dst")) return true;
        var m = D.getElementById("ns-section-main_product");
        if (!m || !m.nextElementSibling) return false;
        try { addCss(); buildDst(); } catch (e) {}
        return !!D.getElementById("cml-dst");
      };
      if (tryB()) return;
      var mo = new MutationObserver(function () { if (tryB()) mo.disconnect(); });
      mo.observe(D.documentElement, { childList: true, subtree: true });
      D.addEventListener("DOMContentLoaded", function () { mo.disconnect(); });
    } catch (e) {}
  })();
  if (D.readyState === "loading") D.addEventListener("DOMContentLoaded", start); else start();
})();

/* 22/11/2026: a barrinha flutuante (Cashback, Presente, Compra rapida, WhatsApp) so aparece depois que a pessoa comeca a rolar, para a primeira tela ficar inteira. */
(function(){try{if(window.__cmlDockScr)return;window.__cmlDockScr=1;var D=document;var st=D.createElement("style");st.id="cml-dock-scr";st.textContent="html body nav.c1-dock{transition:transform .35s ease,opacity .3s ease!important}html body:not(.cml-scr) nav.c1-dock{transform:translateY(calc(100% + 32px))!important;opacity:0!important;pointer-events:none!important}html body:not(.cml-scr) [data-slot^=corner_bottom] [data-slot-item]{opacity:0!important;pointer-events:none!important}html body [data-slot^=corner_bottom] [data-slot-item]{transition:opacity .3s ease}";(D.head||D.documentElement).appendChild(st);var on=false;function chk(){var y=window.scrollY||D.documentElement.scrollTop||0;var v=y>120;if(v!==on&&D.body){on=v;D.body.classList.toggle("cml-scr",v)}}window.addEventListener("scroll",chk,{passive:true});D.addEventListener("DOMContentLoaded",chk);chk()}catch(e){}})();
