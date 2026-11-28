/* Prazos do Natal (27/11): data limite de pedido por regiao para chegar ate o Natal.
   Aparece no produto (abaixo do botao Comprar), no carrinho (acima de Finalizar) e na pagina de Natal ([data-cml-pz]).
   Linha cujo prazo passou some; depois de 24/12 o bloco inteiro some. */
(function(){
  if (window.__cmlPz) return; window.__cmlPz = 1;
  var D = document, ANO = 2026;
  var PZ = [["Estado de São Paulo", 17], ["Sul, Sudeste e DF", 13], ["Centro-Oeste e Nordeste", 10], ["Norte", 8]];
  var hoje = new Date(), fim = new Date(ANO, 11, 25);
  if (hoje >= fim) return;
  var ativos = PZ.filter(function(p){ return hoje < new Date(ANO, 11, p[1] + 1); });
  if (!ativos.length) return;
  function dd(n){ return (n < 10 ? "0" : "") + n + "/12"; }
  var lista = '<ul>' + ativos.map(function(p){ return '<li><span>' + p[0] + '</span><b>até ' + dd(p[1]) + '</b></li>'; }).join("") + '</ul>';
  var resumo = 'Para chegar no Natal, peça até <b>' + dd(ativos[0][1]) + '</b> em ' + (ativos[0][0] === "Estado de São Paulo" ? "SP" : ativos[0][0]);
  function caixa(aberta){
    var e;
    if (aberta) { e = D.createElement("div"); e.innerHTML = '<p class="t">Para chegar até o Natal, peça até:</p>' + lista; }
    else { e = D.createElement("details"); e.innerHTML = '<summary><span>' + resumo + '</span><i>ver sua região</i></summary>' + lista; }
    e.className = "cmlpz" + (aberta ? " ab" : ""); return e;
  }
  function poe(){
    var ok = 0;
    var pa = D.querySelector("#single-product .product-actions");
    if (pa && !pa.parentNode.querySelector(":scope > .cmlpz")) pa.parentNode.insertBefore(caixa(false), pa.nextSibling);
    if (pa) ok++;
    var cs = D.querySelector("#modal-cart .js-ajax-cart-submit");
    if (cs && !cs.parentNode.querySelector(":scope > .cmlpz")) cs.parentNode.insertBefore(caixa(false), cs);
    if (cs) ok++;
    [].forEach.call(D.querySelectorAll("[data-cml-pz]:not(.cmlpz)"), function(h){ var c = caixa(true); c.id = h.id; h.replaceWith(c); ok++; });
    return ok;
  }
  function iniciar(){ poe(); var n = 0, iv = setInterval(function(){ poe(); if (++n > 16) clearInterval(iv); }, 400); }
  if (D.readyState === "loading") D.addEventListener("DOMContentLoaded", iniciar); else iniciar();
  /* o carrinho redesenha a lista ao mudar quantidade: recoloca ao abrir */
  D.addEventListener("click", function(e){ if (e.target.closest && e.target.closest(".js-modal-open,.js-toggle-cart,[data-toggle='#modal-cart']")) setTimeout(poe, 300); }, true);
})();
