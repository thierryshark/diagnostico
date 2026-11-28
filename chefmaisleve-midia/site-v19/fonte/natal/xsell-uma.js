/* Uma janela so ao comprar (28/11, Thierry): quando a oferta "Leve junto" abre, o aviso "Adicionado a sacola" nao aparece
   por baixo dela. A propria oferta passa a dizer o que entrou na sacola e traz os botoes "Ver sacola e finalizar" e "Continuar comprando". */
(function(){
  if (window.__cmlXs1) return; window.__cmlXs1 = 1;
  var D = document, H = D.documentElement;
  function nomeAdd(){ var n = D.querySelector(".js-cart-notification-item-name-private"); return n ? n.textContent.trim() : ""; }
  function abreSacola(){ var t = D.querySelector('.js-modal-open[data-toggle="#modal-cart"],[data-toggle="#modal-cart"]'); if (t) t.click(); else location.href = "/comprar/"; }
  function fecha(m){ var k = m.querySelector(".js-modal-close-private"); if (k) k.click(); }
  function olha(){
    var m = D.getElementById("js-cross-selling-modal"); if (!m) return;
    var aberto = m.offsetWidth > 0 && m.offsetHeight > 0 && getComputedStyle(m).visibility !== "hidden";
    H.classList.toggle("cml-xs-on", aberto);
    if (!aberto) return;
    var nt = D.querySelector(".js-alert-add-to-cart-private:not(.notification-hidden) .js-cart-notification-close-private"); if (nt) nt.click();
    var nm = nomeAdd(), topo = m.querySelector(".cml-xs-ok");
    if (!topo) {
      topo = D.createElement("p"); topo.className = "cml-xs-ok";
      var cab = m.querySelector(".modal-header") || m.firstElementChild; cab.parentNode.insertBefore(topo, cab);
    }
    var tx = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + (nm ? "<b></b> está na sua sacola" : "Produto adicionado à sacola") + "</span>";
    if (topo.getAttribute("data-n") !== nm) { topo.innerHTML = tx; if (nm) topo.querySelector("b").textContent = nm; topo.setAttribute("data-n", nm); }
    if (!m.querySelector(".cml-xs-ac")) {
      var ac = D.createElement("div"); ac.className = "cml-xs-ac";
      ac.innerHTML = '<button type="button" class="vs">Ver sacola e finalizar</button><button type="button" class="cc">Continuar comprando</button>';
      (m.querySelector(".modal-body") || m).appendChild(ac);
      ac.querySelector(".vs").addEventListener("click", function(){ fecha(m); setTimeout(abreSacola, 250); });
      ac.querySelector(".cc").addEventListener("click", function(){ fecha(m); });
    }
  }
  function ini(){ olha(); var m = D.getElementById("js-cross-selling-modal"); if (!m || m.__cmlXs) return; m.__cmlXs = 1;
    new MutationObserver(olha).observe(m, { attributes: true, attributeFilter: ["class", "style"] }); }
  if (D.readyState === "loading") D.addEventListener("DOMContentLoaded", ini); else ini();
  D.addEventListener("click", function(){ setTimeout(function(){ ini(); olha(); }, 60); }, true);
})();
