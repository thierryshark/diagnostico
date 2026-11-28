/* Quente ou gelado (28/11): nos chas cuja descricao diz que vai bem gelado, um selo pequeno ao lado de "vendidos",
   com icone de vapor e floco de gelo. Le a propria descricao do produto, entao um cha novo com "gelado" no texto ja ganha o selo. */
(function(){
  if (window.__cmlGel) return; window.__cmlGel = 1;
  var D = document;
  var IC = '<svg viewBox="0 0 32 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16c-1.6-1.8 1.6-3.4 0-5.2s1.6-3.4 0-5.2M9 16c-1.6-1.8 1.6-3.4 0-5.2s1.6-3.4 0-5.2"/><path d="M24 2.5v15M17.5 6.25l13 7.5M17.5 13.75l13-7.5M22 3.5l2 1.6 2-1.6M22 16.5l2-1.6 2 1.6"/></svg>';
  function poe(){
    var sp = D.getElementById("single-product"); if (!sp) return false;
    if (sp.querySelector(".cmlgl")) return true;
    var bc = D.querySelector('[class*="breadcrumb"]'); if (!bc || !/Chás/.test(bc.textContent)) return true;
    var ds = D.getElementById("ns-section-product_description"); if (!ds || !ds.textContent) return false;
    if (!/(quente ou gelad|gelad[oa]s?\b|cold brew)/i.test(ds.textContent)) return true;
    var alvo = sp.querySelector(".c3-prt") || sp.querySelector(".cx4-sub"); if (!alvo) return false;
    var s = D.createElement("span"); s.className = "cmlgl"; s.innerHTML = IC + "Quente ou gelado";
    if (alvo.classList.contains("c3-prt")) alvo.appendChild(s); else alvo.parentNode.insertBefore(s, alvo.nextSibling);
    return true;
  }
  function iniciar(){ if (poe()) return; var n = 0, iv = setInterval(function(){ if (poe() || ++n > 20) clearInterval(iv); }, 300); }
  if (D.readyState === "loading") D.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
