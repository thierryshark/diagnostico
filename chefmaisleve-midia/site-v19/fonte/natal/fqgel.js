/* Pergunta "Dá para tomar gelado?" nas dúvidas dos chás que vão bem gelados (28/11). */
(function(){
  if (window.__cmlFqG) return; window.__cmlFqG = 1;
  var D = document;
  var R = '<p>Sim. Dois jeitos simples:</p><p><b>Infusão a frio:</b> coloque o chá em água fria, numa jarra com tampa, e deixe na geladeira por algumas horas.</p><p><b>Do jeito rápido:</b> prepare com metade da água quente e, depois da infusão, complete com bastante gelo.</p><p>Uma rodela de laranja ou uma trouxinha no copo deixa tudo mais perfumado.</p>';
  function poe(){
    var sp = D.getElementById("single-product"); if (!sp) return true;
    var bc = D.querySelector('[class*="breadcrumb"]'); if (!bc || !/Chás/.test(bc.textContent)) return true;
    var ds = D.getElementById("ns-section-product_description"); if (!ds || !ds.textContent) return false;
    if (!/(quente ou gelad|gelad[oa]s?\b|cold brew)/i.test(ds.textContent)) return true;
    var g = D.querySelector(".cx11-faq .g"); if (!g) return false;
    if (g.querySelector(".cmlfg")) return true;
    var d = D.createElement("details"); d.className = "cmlfg";
    d.innerHTML = '<summary>Dá para tomar gelado?</summary><div class="a">' + R + '</div>';
    var p = g.children[1] || null; g.insertBefore(d, p);
    return true;
  }
  function iniciar(){ if (poe()) return; var n = 0, iv = setInterval(function(){ if (poe() || ++n > 30) clearInterval(iv); }, 300); }
  if (D.readyState === "loading") D.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
