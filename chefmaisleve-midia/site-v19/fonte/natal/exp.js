/* Experiencia (28/11, Thierry): prova social perto do botao de compra e atalhos na busca. Leve: uma chamada so, depois que a pagina carrega. */
(function(){
  if (window.__cmlExp) return; window.__cmlExp = 1;
  var D = document, W = window;
  function idle(f){ (W.requestIdleCallback || function(c){ return setTimeout(c, 600); })(f, { timeout: 2500 }); }
  function esc(t){ return String(t == null ? "" : t).replace(/[&<>"]/g, function(c){ return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]; }); }

  /* 1) Quem comprou: nota, avaliacoes e fotos/depoimentos curtos logo abaixo do botao Comprar */
  function ugc(){
    var pid = W.LS && LS.product && LS.product.id, sid = W.LS && LS.store && LS.store.id;
    var acts = D.querySelector("#single-product .product-actions");
    if (!pid || !sid || !acts || D.querySelector(".cml-ugc")) return;
    fetch("https://api.cashing.com.br/api/evaluations/products/" + pid + "?include=rating_avg,ratings&limit=30&page=1", {
      method: "POST", headers: { accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ id_store: String(sid) })
    }).then(function(r){ return r.json(); }).then(function(j){
      var d = (j && j.data) || {}, ev = (d.evaluations || []).filter(function(e){ return e.rating_value >= 4; });
      if (ev.length < 3 || D.querySelector(".cml-ugc")) return;
      var avg = +d.rating_avg || 5, fotos = [], frases = [];
      ev.forEach(function(e){
        (e.medias || []).forEach(function(m){ if (m.type === "image" && m.url && fotos.length < 4) fotos.push(m.thumbnail_url || m.url); });
        var c = String(e.comment || "").replace(/\s+/g, " ").trim();
        if (c.length >= 25 && c.length <= 140 && frases.length < 3) frases.push([c, (e.customer && e.customer.name) || ""]);
      });
      if (!frases.length && !fotos.length) return;
      var n = (d.ratings && d.ratings.total) || ev.length;
      var b = D.createElement("section"); b.className = "cml-ugc"; b.setAttribute("aria-label", "Avaliações de quem comprou");
      var h = '<a class="hd" href="#cml-av"><span class="sr" aria-hidden="true"></span><b>' + avg.toFixed(1).replace(".", ",") + '</b><span>' + n + (n === 1 ? ' avaliação' : ' avaliações') + '</span><i>Ver todas</i></a>';
      var f = fotos.length ? '<div class="ft">' + fotos.map(function(u){ return '<img src="' + esc(u) + '" alt="Foto de cliente" width="64" height="64" loading="lazy" decoding="async">'; }).join("") + '</div>' : "";
      var q = frases.length ? '<div class="qs">' + frases.map(function(x, i){ return '<blockquote' + (i ? ' hidden' : '') + '><p>“' + esc(x[0]) + '”</p><cite>' + esc(x[1]) + '</cite></blockquote>'; }).join("") + '</div>' : "";
      b.innerHTML = h + f + q;
      var ref = acts.parentNode.querySelector(":scope > .cmlpz") || acts;
      ref.parentNode.insertBefore(b, ref.nextSibling); ordena();
      /* troca a frase a cada 6 s, so quando o bloco esta na tela */
      var qs = b.querySelectorAll("blockquote"), k = 0, vis = false;
      if (qs.length > 1) {
        if ("IntersectionObserver" in W) new IntersectionObserver(function(es){ vis = es[0].isIntersecting; }).observe(b);
        setInterval(function(){ if (!vis || D.hidden) return; qs[k].hidden = true; k = (k + 1) % qs.length; qs[k].hidden = false; }, 6000);
      }
      b.querySelector(".hd").addEventListener("click", function(ev){
        var alvo = [].filter.call(D.querySelectorAll("#single-product h2,#single-product h3,#single-product h4,#single-product p,#single-product div"), function(e){ return e.childElementCount === 0 && /^Avaliações do produto/.test(e.textContent.trim()); })[0];
        if (alvo) { ev.preventDefault(); alvo.scrollIntoView({ behavior: "smooth", block: "start" }); }
      });
    }).catch(function(){});
  }

  /* 2) Busca: atalhos quando o campo esta vazio (o resultado na hora ja e do proprio tema) */
  var ATALHOS = [["Laranja Chocoleve", "/produtos/laranja-choco-leve/"], ["Encontre seu chá", "/encontre-seu-cha/"], ["Kits de presente", "/kits/"], ["Trouxinhas", "/search/?q=trouxinha"], ["Monte seu presente", "/monte-seu-presente/"]];
  function busca(){
    [].forEach.call(D.querySelectorAll(".js-search-form"), function(f){
      if (f.__cmlAt) return; f.__cmlAt = 1;
      var inp = f.querySelector(".js-search-input"), sug = f.parentNode.querySelector(".js-search-form-suggestions") || f.querySelector(".js-search-form-suggestions");
      if (!inp) return;
      var at = D.createElement("div"); at.className = "cml-sat"; at.hidden = true;
      at.innerHTML = '<p>Mais procurados</p><div>' + ATALHOS.map(function(a){ return '<a href="' + a[1] + '">' + a[0] + '</a>'; }).join("") + '</div>';
      (sug || f).parentNode.insertBefore(at, (sug || f).nextSibling);
      function liga(){ at.hidden = !!inp.value.trim(); }
      inp.addEventListener("focus", liga); inp.addEventListener("input", liga);
      inp.addEventListener("blur", function(){ setTimeout(function(){ at.hidden = true; }, 200); });
    });
  }


  /* 3) Ordem da coluna de compra: Comprar, frete, prazo de Natal, quem comprou, vantagens */
  var ORDEM = [".cml-shb", ".cml-shw", ".cmlpz", ".cml-ugc", ".cx11-strip", ".cx11-xic"];
  function ordena(){
    /* Só move quando a ordem está errada; outros blocos no meio são aceitos. Nunca mexe enquanto a pessoa digita (ex.: CEP). */
    var a = D.querySelector("#single-product .product-actions"); if (!a) return;
    var els = []; ORDEM.forEach(function(sel){ var e = D.querySelector("#single-product " + sel); if (e) els.push(e); }); if (!els.length) return;
    var ae = D.activeElement; if (ae && ae !== D.body) for (var k = 0; k < els.length; k++) if (els[k].contains(ae)) return;
    var ok = els.every(function(e, i){ var prev = i ? els[i - 1] : a; return e.parentNode === a.parentNode && (prev.compareDocumentPosition(e) & 4); });
    if (ok) return;
    var ref = a; els.forEach(function(e){ if (ref.nextElementSibling !== e) ref.parentNode.insertBefore(e, ref.nextSibling); ref = e; });
  }


  /* 4) Frete: depois do calculo, diz a partir de quanto o frete e gratis na regiao do CEP */
  var FG = [["SP", 249, /^(0|1)/], ["Sul, Sudeste e DF", 299, /^(2|3|8|9|70|71|72[0-7]|73[0-6])/], ["Centro-Oeste", 359, /^(72[89]|73[7-9]|74|75|76[0-7]|78|79)/], ["Nordeste", 459, /^(4|5|6[0-5])/], ["Norte", 599, /^(6[6-9]|76[89]|77)/]];
  function freteGratis(){
    var w = D.querySelector("#single-product .cml-shw"); if (!w || w.__cmlFg) return; w.__cmlFg = 1;
    function poe(){
      var m = (w.textContent || "").match(/CEP:?\s*(\d{5})-?(\d{3})/); var old = w.querySelector(".cml-fg");
      if (!m) { if (old) old.remove(); return; }
      var cep = m[1] + m[2], r = null; for (var i = 0; i < FG.length; i++) if (FG[i][2].test(cep)) { r = FG[i]; break; }
      if (!r) return; var tx = "Frete grátis para " + (r[0] === "SP" ? "o estado de SP" : "a sua região") + " em compras a partir de R$ " + r[1] + ",00.";
      try { localStorage.setItem("cmlReg", r[0] + "|" + r[1]); } catch (e) {} sacolaFg();
      if (old && old.textContent === tx) return; if (!old) { old = D.createElement("p"); old.className = "cml-fg"; w.appendChild(old); } old.textContent = tx;
    }
    new MutationObserver(function(){ clearTimeout(w.__t); w.__t = setTimeout(poe, 150); }).observe(w, { childList: true, subtree: true });
  }
  /* Sacola: quanto falta para o frete grátis. Usa a região do último CEP calculado; sem CEP, mostra a regra de SP e do Sul/Sudeste. */
  function brl(v){ return "R$ " + v.toFixed(2).replace(".", ","); }
  function sacolaFg(){
    var mc = D.getElementById("modal-cart"); if (!mc) return; var bd = mc.querySelector(".modal-body"), st = mc.querySelector(".js-cart-subtotal"); if (!bd || !st) return;
    var it = mc.querySelector(".js-cart-item"), el = bd.querySelector(".cml-fgb");
    if (!it) { if (el) el.remove(); return; }
    var sub = parseFloat((st.textContent || "").replace(/[^\d,]/g, "").replace(",", ".")) || 0, reg = null;
    try { var g = (localStorage.getItem("cmlReg") || "").split("|"); if (g[1]) reg = [g[0], +g[1]]; } catch (e) {}
    var h;
    if (reg) { var falta = reg[1] - sub, nome = reg[0] === "SP" ? "SP" : reg[0] === "Sul, Sudeste e DF" ? "o Sul, Sudeste e DF" : "o " + reg[0];
      h = (falta > 0 ? "Faltam <b>" + brl(falta) + "</b> para o frete grátis para " + nome + "." : "Seu frete para " + nome + " é <b>grátis</b>.") + '<span class="br"><i style="width:' + Math.min(100, Math.round(sub / reg[1] * 100)) + '%"></i></span>';
    } else h = "Frete grátis a partir de <b>R$ 249</b> em SP e <b>R$ 299</b> no Sul, Sudeste e DF.";
    if (!el) { el = D.createElement("p"); el.className = "cml-fgb"; var cb = bd.querySelector(".cml-cb1-cart"); cb ? bd.insertBefore(el, cb) : bd.appendChild(el); }
    if (el.__h !== h) { el.innerHTML = h; el.__h = h; }
  }
  function sacola(){
    var mc = D.getElementById("modal-cart"); if (!mc || mc.__cmlFgb) return; mc.__cmlFgb = 1; sacolaFg();
    new MutationObserver(function(){ clearTimeout(mc.__t); mc.__t = setTimeout(sacolaFg, 200); }).observe(mc, { childList: true, subtree: true, characterData: true });
  }
  /* Avaliações: nota com vírgula (5,0) e "Adicionar avaliação" como botão de contorno, para ficar um só botão cheio na tela */
  function notas(){
    [].forEach.call(D.querySelectorAll('[class*="mi-"] strong, [class*="mi-"] span'), function(e){ var n = e.firstChild; if (e.children.length || !n || n.nodeType !== 3 || n !== e.lastChild) return; if (/^\s*\d\.\d\s*$/.test(n.nodeValue)) n.nodeValue = n.nodeValue.replace(".", ","); });
    [].forEach.call(D.querySelectorAll('[class*="mi-"] button:not(.cml-rv-add)'), function(b){ if (/Adicionar avalia/.test(b.textContent)) b.classList.add("cml-rv-add"); else if (/Adicionar ao carrinho/.test(b.textContent)) b.classList.add("cml-rv-add", "cml-mi-cart"); });
  }
  /* Cadastro: exemplo de nome brasileiro no campo (o tema traz "Maria Perez") */
  function cadastro(){ [].forEach.call(D.querySelectorAll('input[placeholder*="Maria Perez"]'), function(i){ i.setAttribute("placeholder", i.getAttribute("placeholder").replace("Maria Perez", "Maria Silva")); }); }
  /* Rodapé: CNPJ formatado na linha de direitos */
  function rodape(){ [].forEach.call(D.querySelectorAll(".footer-copyright"), function(e){ var n = e.firstChild; if (n && n.nodeType === 3 && n.nodeValue.indexOf("61728220000120") > -1) n.nodeValue = n.nodeValue.replace(/ - 61728220000120 - /, " · CNPJ 61.728.220/0001-20 · "); }); }
  function ini(){ cadastro(); idle(rodape); busca(); idle(ugc); idle(sacola); if (D.getElementById("single-product")) { ordena(); var n = 0, iv = setInterval(function(){ ordena(); freteGratis(); if (++n > 15) clearInterval(iv); }, 500); } idle(function(){ notas(); if (W.MutationObserver) { var tn = 0; new MutationObserver(function(){ if (tn) return; tn = setTimeout(function(){ tn = 0; notas(); }, 400); }).observe(D.body, { childList: true, subtree: true }); } }); }
  if (D.readyState === "loading") D.addEventListener("DOMContentLoaded", ini); else ini();
})();
