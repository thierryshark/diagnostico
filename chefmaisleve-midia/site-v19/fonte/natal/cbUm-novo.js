function cbUm() {
    /* 28/11 (Thierry): cashback em um toque. Sem a janela do app: a linha mostra o saldo em reais e o botao
       "Usar meu cashback" gera o cupom com todo o saldo (ate R$ 100) e ja aplica no carrinho.
       Fica na sacola e no carrinho (/comprar/). Regra da loja: compras a partir de R$ 199. */
    var TK = "@cashing:cashbacks:token", API = "https://api.cashing.com.br/api/", MIN = 199;
    var tok; try { tok = localStorage.getItem(TK); } catch (e) { tok = null; }
    if (!tok || tok === "null" || tok === "undefined") return;
    /* na janela do app some a parte "Gerar cupom" (o uso agora e pelo botao do carrinho) */
    [].forEach.call(D.querySelectorAll("p,h2,h3"), function (e) { if (e.children.length || !/^Gerar cupom com seus/.test(e.textContent.trim())) return; var c = e.parentElement && e.parentElement.parentElement; if (c && !c.hasAttribute("data-cml-cbg") && c.querySelector('input[type="number"]')) c.setAttribute("data-cml-cbg", ""); });
    var S = window.__cmlCbx || (window.__cmlCbx = { st: 0 });
    function api(ep, extra) {
      var b = { id_store: String((window.LS && LS.store && LS.store.id) || ""), platform: "nuvemshop" };
      for (var k in extra) b[k] = extra[k];
      return fetch(API + ep, { method: "POST", headers: { accept: "application/json", "Content-Type": "application/json", "X-Auth": tok }, body: JSON.stringify(b) })
        .then(function (r) { return r.json().then(function (j) { if (!r.ok) throw new Error((j && j.message) || "erro"); return j; }); });
    }
    function carrega() {
      S.st = 1;
      Promise.all([api("cashback/balance"), api("cashback/coupons")]).then(function (a) {
        var pts = +(((a[0] || {}).data || {}).cashback || {}).balance || 0;
        var cs = (((a[1] || {}).data || {}).coupons || []).filter(function (c) { return !c.is_used && (!c.expires_at || new Date(c.expires_at) > new Date()); });
        cs.sort(function (x, y) { return y.value - x.value; });
        S.pts = pts; S.cup = cs[0] || null; S.st = 2; cbUm();
      }).catch(function () { S.st = 3; });
    }
    if (!S.st) { carrega(); return; }
    if (S.st !== 2) return;
    var vPts = Math.min(S.pts, CB_MAX) * CB_VAL, vCup = S.cup ? +S.cup.value || 0 : 0;
    var usaCup = vCup > 0 && vCup >= vPts, valor = usaCup ? vCup : (S.pts >= 10 ? vPts : 0);
    function rs(v) { return "R$ " + v.toFixed(2).replace(".", ","); }
    function subtotal(raiz) { var e = (raiz || D).querySelector('[data-component="cart.subtotal"][data-priceraw],.js-ajax-cart-total[data-priceraw]'); return e ? (+e.getAttribute("data-priceraw") || 0) / 100 : 0; }
    function aplica(code) {
      var inp = D.querySelector(".js-coupon-input"), bt = D.querySelector(".js-apply-coupon");
      if (inp && bt) { try { Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(inp, code); inp.dispatchEvent(new Event("input", { bubbles: true })); } catch (e) { inp.value = code; } bt.click(); return true; }
      try { sessionStorage.setItem("cmlCbxCode", code); } catch (e) {}
      location.href = "/comprar/"; return true;
    }
    /* chegou no carrinho com um cupom de cashback pendente (veio da sacola): aplica uma vez */
    var pend; try { pend = sessionStorage.getItem("cmlCbxCode"); } catch (e) {}
    if (pend && D.querySelector(".js-coupon-input")) { try { sessionStorage.removeItem("cmlCbxCode"); } catch (e) {} aplica(pend); }
    var alvos = [];
    var mc = D.getElementById("modal-cart"), lst = mc && mc.querySelector(".js-ajax-cart-list");
    if (lst && mc.querySelector(".js-cart-item")) alvos.push([mc, lst, "depois"]);
    var cpn = D.querySelector('[data-component="cart-coupon.container"]');
    if (cpn && !(mc && mc.contains(cpn))) alvos.push([D, cpn, "antes"]);
    var aplicado = !!(D.querySelector(".js-coupon-applied-code-text") && /^CBW/i.test(D.querySelector(".js-coupon-applied-code-text").textContent.trim()));
    alvos.forEach(function (a) {
      var raiz = a[0], ref = a[1], row = raiz.querySelector(".cml-cb1-cart");
      if (!valor && !aplicado) { if (row) row.remove(); return; }
      if (!row) {
        row = D.createElement("div"); row.className = "cml-cb1-cart"; row.innerHTML = "<span></span><button type=\"button\">Usar meu cashback</button>";
        if (a[2] === "depois") ref.parentNode.insertBefore(row, ref.nextSibling); else ref.parentNode.insertBefore(row, ref);
        row.querySelector("button").addEventListener("click", function () {
          var b = this; if (b.disabled) return; b.disabled = true; b.textContent = "Aplicando...";
          var vai = usaCup ? Promise.resolve(S.cup.code) : api("cashback/redeem", { points_to_use: Math.min(S.pts, CB_MAX) }).then(function (j) { var c = ((j || {}).data || {}).coupon; return typeof c === "string" ? c : (c && c.code); });
          vai.then(function (code) { if (!code) throw new Error("sem cupom"); S.st = 0; aplica(code); })
            .catch(function () { b.disabled = false; b.textContent = "Usar meu cashback"; var sp = row.querySelector("span"); sp.innerHTML = "Não deu para usar agora. Tente de novo em instantes."; });
        });
      }
      var sp = row.querySelector("span"), bt = row.querySelector("button"), sub = subtotal(raiz === D ? D : raiz), tx, on;
      if (aplicado) { tx = "Cashback aplicado neste pedido."; on = false; bt.hidden = true; }
      else if (sub && sub < MIN) { tx = "Você tem <b>" + rs(valor) + "</b> de cashback. Use em compras a partir de R$ 199: faltam " + rs(MIN - sub) + "."; on = false; bt.hidden = false; }
      else { tx = "Você tem <b>" + rs(valor) + "</b> de cashback para usar agora."; on = true; bt.hidden = false; }
      if (bt.textContent !== "Aplicando...") bt.disabled = !on;
      if (sp.innerHTML !== tx && !/Não deu/.test(sp.innerHTML)) sp.innerHTML = tx;
    });
  }
