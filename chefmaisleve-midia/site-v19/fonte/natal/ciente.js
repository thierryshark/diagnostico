/* Aviso de prazos no fechamento (28/11): ate 24/12, ao tocar em "Iniciar compra" abre uma janela com os prazos
   por regiao e a pessoa precisa marcar "Estou ciente" para seguir ao pagamento. Vale uma vez por visita. */
(function(){
  if (window.__cmlPzOk) return; window.__cmlPzOk = 1;
  var D = document, ANO = 2026, hoje = new Date();
  if (hoje >= new Date(ANO, 11, 25)) return;
  var PZ = [["Estado de São Paulo", 17], ["Sul, Sudeste e DF", 13], ["Centro-Oeste e Nordeste", 10], ["Norte", 8]];
  var K = "cmlPzCiente", SEL = '[name="go_to_checkout"],[data-component="cart.checkout-button"]';
  function ok(){ try { return sessionStorage.getItem(K) === "1"; } catch (e) { return false; } }
  function dd(n){ return (n < 10 ? "0" : "") + n + "/12"; }
  var dlg = null, alvo = null;
  function monta(){
    dlg = D.createElement("dialog"); dlg.className = "cmlpz-dl"; dlg.setAttribute("aria-labelledby", "cmlpz-t");
    dlg.innerHTML = '<p class="k">Informação importante</p><h2 id="cmlpz-t">É um presente de Natal?</h2>'
      + '<p class="d">Se você quer que este pedido chegue até o Natal, confira o prazo da sua região:</p><ul>'
      + PZ.map(function(p){ var foi = hoje >= new Date(ANO, 11, p[1] + 1); return '<li' + (foi ? ' class="x"' : '') + '><span>' + p[0] + '</span><b>' + (foi ? 'chega depois do Natal' : 'pedidos até ' + dd(p[1])) + '</b></li>'; }).join("")
      + '</ul><p class="d">Se o pedido é para você ou não precisa chegar até o Natal, é só seguir: o envio acontece normalmente.</p>'
      + '<label class="ck"><input type="checkbox"> <span>Estou ciente dos prazos de entrega para o Natal.</span></label>'
      + '<div class="ac"><button type="button" class="vl">Voltar</button><button type="button" class="go" disabled>Seguir para o pagamento</button></div>';
    D.body.appendChild(dlg);
    var cb = dlg.querySelector("input"), go = dlg.querySelector(".go");
    cb.addEventListener("change", function(){ go.disabled = !cb.checked; });
    dlg.querySelector(".vl").addEventListener("click", function(){ dlg.close(); });
    go.addEventListener("click", function(){
      try { sessionStorage.setItem(K, "1"); } catch (e) {}
      dlg.close(); var a = alvo; alvo = null;
      if (a) { var f = a.form || a.closest("form"); if (f && f.requestSubmit && a.type === "submit") f.requestSubmit(a); else a.click(); }
    });
  }
  function abre(el){ if (!dlg) monta(); alvo = el; var cb = dlg.querySelector("input"); cb.checked = false; dlg.querySelector(".go").disabled = true; if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", ""); }
  D.addEventListener("click", function(e){
    if (ok()) return; var el = e.target && e.target.closest ? e.target.closest(SEL) : null; if (!el) return;
    e.preventDefault(); e.stopImmediatePropagation(); abre(el);
  }, true);
  D.addEventListener("submit", function(e){
    if (ok()) return; var s = e.submitter; if (!s || !s.matches || !s.matches(SEL)) return;
    e.preventDefault(); e.stopImmediatePropagation(); abre(s);
  }, true);
})();
