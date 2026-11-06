/* Chef Mais Leve: novo tema (rascunho Padrão Laranja). Cards, página de produto, categoria, depoimentos, rodapé e atalhos. */
(function(){
if(window.__cmlNovo)return;window.__cmlNovo=1;
var D=document,P=location.pathname;
var CDN="https://acdn-us.mitiendanube.com/stores/005/060/752/products/";
var LOGO_B="https://cdn.jsdelivr.net/gh/thierryshark/diagnostico@bb3cf2a214e2484d9793043c0cc4888e3e4b88e7/chefmaisleve-midia/tema/logo-branco.png";
var WA="https://wa.me/5547992726557";
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function brl(v){return"R$ "+Number(v).toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".")}
function num(t){var m=String(t||"").replace(/\s/g,"").match(/(\d{1,3}(\.\d{3})*|\d+),(\d{2})/);return m?parseFloat(m[0].replace(/\./g,"").replace(",",".")):0}
function kind(n){n=n.toLowerCase();if(/combo/.test(n))return"Combo";if(/\bkit\b|ternura|desdobramento|natal|materna/.test(n))return"Kit presente";if(/trouxinha/.test(n))return"Trouxinha";if(/c[aá]psula/.test(n))return"Cápsula de chá";if(/ch[aá] blend|blend/.test(n))return"Chá blend";if(/infus[aã]o|ch[aá]/.test(n))return"Infusão natural";if(/granola/.test(n))return"Granola";if(/chocolate|choco|stroopwafel|wafel|wafer|laranja/.test(n))return"Snack";if(/desidratad/.test(n))return"Fruta desidratada";if(/x[ií]cara|garrafa|infusor|chaleira|raspador|caneca/.test(n))return"Acessório";return""}
/* nome com a segunda metade em itálico: "Chá Blend <em>Sereníssimo 40g</em>" */
function emName(t){t=t.trim();var w=t.split(/\s+/);if(w.length<2)return esc(t);var k=/^ch[aá]$/i.test(w[0])&&w.length>2?2:Math.ceil(w.length/2);if(w.length===2)k=1;return esc(w.slice(0,k).join(" "))+" <em>"+esc(w.slice(k).join(" "))+"</em>"}
var STAR='<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path fill="#dfae58" d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>';
var COIN='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M14.8 9.2c-.6-.8-1.6-1.2-2.8-1.2-1.6 0-2.8.8-2.8 2s1.2 1.6 2.8 2 2.8.8 2.8 2-1.2 2-2.8 2c-1.2 0-2.3-.5-2.9-1.3M12 6.5v11"/></svg>';
/* nota media e quantidade a partir das estrelas do app de avaliacoes */
function nota(box){if(!box)return null;var cnt=[].filter.call(box.querySelectorAll("span"),function(s){return/^\(\d+\)$/.test(s.textContent.trim())})[0];if(!cnt)return null;var n=parseInt(cnt.textContent.replace(/\D/g,""),10)||0,sum=0,ws=box.querySelectorAll("clipPath rect, clippath rect");[].forEach.call(ws,function(x){sum+=(parseFloat(x.getAttribute("width"))||0)/20});return{n:n,avg:ws.length?sum:5}}
function linhaNota(r){return r&&r.n>0?STAR+" <b>"+r.avg.toFixed(1).replace(".",",")+"</b> <span>("+r.n+(r.n===1?" avaliação":" avaliações")+")</span>":"<span>Ainda sem avaliações</span>"}

/* ---------- CARDS DE PRODUTO ---------- */
function card(c){var nm=c.querySelector(".js-item-name");if(!nm)return;var link=c.querySelector(".product-item-link")||nm.parentElement;
 var sig=(c.querySelector(".product-item-link")||c).textContent.replace(/\s+/g,"").length+"|"+nm.textContent+"|"+((c.querySelector(".js-price-display")||{}).textContent||"")+"|"+((c.querySelector(".js-compare-price-display")||{}).style||{}).display;if(c.__cml===sig)return;c.__cml=sig;
 var t=nm.getAttribute("data-cml-n")||nm.textContent.trim();nm.setAttribute("data-cml-n",t);
 var ey=c.querySelector(".cml-ey");if(!ey){ey=D.createElement("p");ey.className="cml-ey";nm.parentNode.insertBefore(ey,nm)}ey.textContent=kind(t)||"Chef Mais Leve";
 nm.innerHTML=emName(t);
 /* nota */
 var box=[].filter.call(link.children,function(x){return!x.className&&/\(\d+\)/.test(x.textContent)})[0],r=nota(box);
 var rt=c.querySelector(".cml-rt");if(!rt){rt=D.createElement("p");rt.className="cml-rt";nm.parentNode.insertBefore(rt,nm.nextSibling)}rt.innerHTML=linhaNota(r);
 /* desconto vira etiqueta no molde da foto */
 var op=c.querySelector(".js-offer-percentage"),cp=c.querySelector(".js-compare-price-display"),pct=op&&cp&&getComputedStyle(cp).display!=="none"?parseInt(op.textContent,10)||0:0;
 var im=c.querySelector(".product-item-image-container"),off=c.querySelector(".cml-off");
 if(im&&pct>0){if(!off){off=D.createElement("span");off.className="cml-off";im.appendChild(off)}off.textContent="-"+pct+"%"}else if(off)off.remove();
 /* cashback limpo */
 var pe=c.querySelector(".js-price-display"),pv=pe?num(pe.textContent):0,cb=c.querySelector(".cml-cbl");
 if(pv>0){if(!cb){cb=D.createElement("p");cb.className="cml-cbl";var pc=c.querySelector(".product-item-price-container");if(pc)pc.parentNode.insertBefore(cb,pc.nextSibling);else link.appendChild(cb)}cb.innerHTML="+ <b>"+brl(Math.round(pv*5)/100)+"</b> de cashback"}
 /* botao */
 var b=c.querySelector(".js-open-quickshop-wording");if(b&&b.textContent.trim()==="Comprar")b.textContent="Comprar";
}
function cards(){[].forEach.call(D.querySelectorAll(".js-item-product"),function(c){try{card(c)}catch(e){}})}

/* ---------- PAGINA DE PRODUTO ---------- */
function produto(){var h=D.querySelector("h1.js-product-name");if(!h)return;var box=h.parentElement;
 var t=h.getAttribute("data-cml-n")||h.textContent.trim();if(h.getAttribute("data-cml-n")!==t||!h.querySelector("em")){h.setAttribute("data-cml-n",t);h.innerHTML=emName(t)}
 if(!box.querySelector(".cml-pey")){var ey=D.createElement("p");ey.className="cml-eb cml-pey";ey.textContent=kind(t)||"Chef Mais Leve";box.insertBefore(ey,h)}
 var nb=[].filter.call(box.children,function(x){return!x.className&&/\(\d+\)/.test(x.textContent)})[0],r=nota(nb),rt=box.querySelector(".cml-prt");
 if(!rt){rt=D.createElement("p");rt.className="cml-prt";h.parentNode.insertBefore(rt,h.nextSibling)}var hh=linhaNota(r);if(rt.__h!==hh){rt.__h=hh;rt.innerHTML=hh}
 if(nb)nb.style.display="none";
 var cbx=[].filter.call(box.children,function(x){return!x.className&&/cashback/i.test(x.textContent)})[0];if(cbx)cbx.style.display="none";
 var pe=box.querySelector(".js-price-display"),pv=pe?num(pe.textContent):0,cb=box.querySelector(".cml-pcb");
 if(pv>0){if(!cb){cb=D.createElement("a");cb.className="cml-pcb";cb.href="/cashback/";var pc=box.querySelector(".js-price-container");if(pc)pc.parentNode.insertBefore(cb,pc.nextSibling)}var hc=COIN+"<span>+ <b>"+brl(Math.round(pv*5)/100)+"</b> de cashback nesta compra</span>";if(cb.__h!==hc){cb.__h=hc;cb.innerHTML=hc}}
 var op=box.querySelector(".js-offer-label"),cp=box.querySelector(".js-compare-price-display"),pct=op&&cp&&getComputedStyle(cp).display!=="none"?parseInt(op.textContent.replace(/\D/g,""),10)||0:0;
 var im=D.querySelector(".js-product-images"),off=D.querySelector(".cml-poff");
 if(im&&pct>0){if(!off){off=D.createElement("span");off.className="cml-off cml-poff";im.appendChild(off)}off.textContent="-"+pct+"%"}else if(off)off.remove();
}

/* ---------- BANNER DA CATEGORIA ---------- */
var CAT={
 "/chas/":["Chás artesanais","Chás","e infusões","Ervas, flores e frutas desidratadas em casa. Um Chá Blend de 40g rende até 20 xícaras.","80adf11cf36cb1711e18c5c38446244b-f1d60dc32a482481e817849861200355-1024-1024.webp",[["Energia","/chas/bem-estar1/energia1/"],["Antioxidante","/chas/bem-estar1/antioxidante/"],["Sem cafeína","/chas/bem-estar1/sem-cafeina/"],["Relaxar e dormir","/chas/bem-estar1/relaxar-sono/"],["Trouxinhas","/chas/chas-infusoes-naturais/trouxinhas/"]]],
 "/chas/chas-infusoes-naturais/trouxinhas/":["Infusão natural","Trouxinhas","aromáticas","Frutas e especiarias amarradas à mão. Cada pacote tem 6 trouxinhas, uma por xícara.","chatgpt-image-11_05_2026-13_44_46-012a958c8d9d0aa41c17785178915547-1024-1024.webp",[["Todos os chás","/chas/"]]],
 "/snacks-granolas/":["Snacks e granolas","Para comer","sem culpa","Frutas desidratadas em baixa temperatura e granolas feitas em casa, sem conservantes.","chatgpt-image-10_05_2026-01_17_27-9828d51df3d5722e8517783866624784-1024-1024.webp",[["Snacks","/snacks-granolas/snacks-saudaveis/"],["Granolas","/snacks-granolas/granolas/"]]],
 "/snacks-granolas/snacks-saudaveis/":["Snacks naturais","Snacks","feitos em casa","Frutas desidratadas em baixa temperatura, sem conservantes e sem açúcar adicionado. A Laranja Chocoleve leva cerca de 13 horas.","chatgpt-image-10_05_2026-01_17_27-9828d51df3d5722e8517783866624784-1024-1024.webp",[["Granolas","/snacks-granolas/granolas/"]]],
 "/snacks-granolas/granolas/":["Granolas artesanais","Granolas","crocantes","Pacotes de 250g feitos em casa: salgada, low carb e choconuts.","21-1c7aae1520f063e6c217883844451286-1024-1024.webp",[["Snacks","/snacks-granolas/snacks-saudaveis/"]]],
 "/kits-presentes/":["Presente pronto","Kits","para presentear","Kits montados à mão, em embalagem de presente, com cartão escrito à mão.","cmw3ktxt2000000ilg3mw65a0-png-1024a1024-screenshot-e7d68eedc7195a3af917938956824193-1024-1024.webp",[["Monte seu presente","/presentes-de-natal/"]]],
 "/acessorios/":["Para o seu ritual","Acessórios","do chá","Xícaras, infusores e chaleiras para preparar o seu chá com calma.","chatgpt-image-11_05_2026-14_20_03-bc0a1d3fac9aaab95117785200217570-1024-1024.webp",[["Chás","/chas/"]]]
};
function categoria(){var ph=D.querySelector(".page-header"),bn=D.querySelector(".category-banner");if(!ph||!D.querySelector(".js-category-controls")||D.querySelector(".cml-cat"))return;
 var h=ph.querySelector("h1"),t=h?h.textContent.trim():"",k=CAT[P]||null;if(!k){var w=t.split(/\s+/),c=Math.ceil(w.length/2)||1;var fi=D.querySelector(".js-item-product .product-item-image");k=["Chef Mais Leve",w.slice(0,c).join(" "),w.slice(c).join(" "),"",fi?"":"",[]];k.img=fi?(fi.getAttribute("data-srcset")||fi.currentSrc||fi.src||"").split(" ")[0]:""}
 var img=k.img||(k[4]?CDN+k[4]:"");var chips=(k[5]||[]).map(function(x){return'<a class="cml-chip" href="'+x[1]+'">'+esc(x[0])+"</a>"}).join("");
 var s=D.createElement("section");s.className="cml cml-cat";
 s.innerHTML='<div class="cml-w"><div class="cml-cat-tx"><p class="cml-eb">'+esc(k[0])+'</p><h1 class="cml-tt cml-cat-h">'+esc(k[1])+(k[2]?" <em>"+esc(k[2])+"</em>":"")+'</h1>'+(k[3]?'<p class="cml-tx">'+esc(k[3])+"</p>":"")+(chips?'<div class="cml-chips">'+chips+"</div>":"")+'</div>'+(img?'<div class="cml-cat-ft"><img src="'+img+'" alt=""></div>':"")+"</div>";
 var ref=bn||ph;ref.parentNode.insertBefore(s,ref);D.body.classList.add("cml-tem-cat")}

/* ---------- DEPOIMENTOS ---------- */
function depoimentos(){if(D.querySelector(".cml-dep"))return true;var h=[].filter.call(D.querySelectorAll("h4"),function(x){return x.textContent.trim().toUpperCase()==="DEPOIMENTOS"})[0];if(!h)return false;
 var r=h;while(r.parentElement&&r.parentElement!==D.body&&!(r.parentElement.id||"").match(/^ns-|cashing/)&&r.parentElement.children.length===1)r=r.parentElement;
 r.classList.add("cml-dep");var hd=D.createElement("div");hd.className="cml cml-w cml-dep-h";hd.innerHTML='<div class="cml-head"><div><p class="cml-eb">Avaliações de quem comprou</p><h2 class="cml-tt cml-h2">Quem provou, <em>recomenda</em></h2></div><a class="cml-lnk" href="https://www.google.com/search?q=Chef+Mais+Leve" target="_blank" rel="noopener">Nota 5,0 no Google</a></div>';r.insertBefore(hd,r.firstChild);
 var aut=D.querySelector(".cml-nums");if(aut){var sec=aut.closest("section");var blk=sec&&sec.closest(".cml")||sec;if(blk&&blk.parentNode&&!r.contains(blk))blk.parentNode.insertBefore(r,blk.nextSibling)}
 return true}

/* ---------- RODAPE ---------- */
function rodape(){var ft=D.querySelector("footer.section-footer, footer");if(!ft||ft.querySelector(".cml-ft"))return!!ft;
 var d=D.createElement("div");d.className="cml cml-ft";
 d.innerHTML='<div class="cml-w cml-fgrid">'
 +'<div class="cml-fcol"><img class="cml-flogo" src="'+LOGO_B+'" alt="chefmaisleve"><p class="cml-fslog">Nutrindo corpo <em>e alma</em></p><p class="cml-fsm">Chás artesanais e snacks naturais, feitos à mão pela nossa família em Santa Catarina.</p><div class="cml-fsoc"><a href="https://www.instagram.com/chefmaisleve/" target="_blank" rel="noopener">Instagram</a><a href="'+WA+'" target="_blank" rel="noopener">WhatsApp</a></div></div>'
 +'<div class="cml-fcol"><p class="cml-feb">A Chef</p><a href="/quem-somos/">Nossa trajetória</a><a href="/encontre-seu-cha/">Encontre seu chá</a><a href="/presentes-de-natal/">Monte seu presente</a><a href="/faq/">Dúvidas</a></div>'
 +'<div class="cml-fcol"><p class="cml-feb">Para você</p><a href="/account/">Minha conta</a><a href="/cashback/">Como usar o cashback</a><a href="/politica-de-troca/">Trocas e devoluções</a><a href="/politica-de-reembolso/">Reembolso</a><a href="/politica-de-privacidade/">Privacidade</a><a href="/termos-de-uso/">Termos de uso</a></div>'
 +'<div class="cml-fcol"><p class="cml-feb">Cadastre-se</p><p class="cml-fttl">Ganhe 10% de <em>boas-vindas</em></p><form class="cml-fform" novalidate><input name="nome" type="text" autocomplete="name" placeholder="Seu nome e sobrenome" aria-label="Nome e sobrenome"><input name="email" type="email" autocomplete="email" placeholder="Seu e-mail" aria-label="E-mail"><input name="whats" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="WhatsApp com DDD" aria-label="WhatsApp com DDD"><button type="submit">Quero meu cupom</button><p class="cml-fms" aria-live="polite">Cupom para a primeira compra. Ao se cadastrar, você aceita receber novidades por e-mail e WhatsApp.</p></form></div>'
 +"</div>";
 ft.insertBefore(d,ft.firstChild);ft.classList.add("cml-pronto");
 var f=d.querySelector("form"),ms=f.querySelector(".cml-fms");
 f.whats.addEventListener("input",function(){var v=this.value.replace(/\D/g,"").slice(0,11);this.value=v.length>10?"("+v.slice(0,2)+") "+v.slice(2,7)+"-"+v.slice(7):v.length>6?"("+v.slice(0,2)+") "+v.slice(2,6)+"-"+v.slice(6):v.length>2?"("+v.slice(0,2)+") "+v.slice(2):v});
 f.addEventListener("submit",function(e){e.preventDefault();[f.nome,f.email,f.whats].forEach(function(x){x.classList.remove("er")});ms.classList.remove("er");
  var nome=f.nome.value.trim().replace(/\s+/g," "),email=f.email.value.trim().toLowerCase(),w=f.whats.value.replace(/\D/g,""),er="";
  if(nome.length<5||nome.split(" ").length<2){f.nome.classList.add("er");er="Digite seu nome e sobrenome."}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){f.email.classList.add("er");er=er||"Confira o e-mail."}
  if(w.length<10||w.length>11){f.whats.classList.add("er");er=er||"Confira o WhatsApp com DDD."}
  if(er){ms.textContent=er;ms.classList.add("er");return}
  var b=f.querySelector("button");b.disabled=true;b.textContent="Enviando...";
  fetch("https://dzmlyrkzcdqicwfmxnxd.supabase.co/functions/v1/cml-lead",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({nome:nome,email:email,nascimento:"",whatsapp:w,consentimento:true,pagina:location.pathname,origem:"rodape"})}).then(function(r){return r.json()}).then(function(j){if(!j||!j.ok)throw 0;f.innerHTML='<p class="cml-fok">Prontinho, '+esc(nome.split(" ")[0])+'! Seu cupom de primeira compra:<br><b>'+esc(j.cupom||"BEMVINDO10")+"</b></p>"}).catch(function(){b.disabled=false;b.textContent="Quero meu cupom";ms.textContent="Não conseguimos enviar agora. Tente de novo em instantes.";ms.classList.add("er")})});
 return true}

/* ---------- ATALHOS FLUTUANTES ---------- */
var IC={wa:'<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.5-1.5-2-1-1 1c-1-.4-2-1.4-2.5-2.5l1-1-1-2z"/>',raio:'<path d="M13 3L5 13h6l-1 8 8-10h-6z"/>',pres:'<rect x="3.5" y="9" width="17" height="11" rx="1.5"/><path d="M2.5 9h19M12 9v11M12 9c-2-4-6-4-6-1.5S10 9 12 9zm0 0c2-4 6-4 6-1.5S14 9 12 9z"/>',moeda:'<circle cx="12" cy="12" r="8.5"/><path d="M14.8 9.2c-.6-.8-1.6-1.2-2.8-1.2-1.6 0-2.8.8-2.8 2s1.2 1.6 2.8 2 2.8.8 2.8 2-1.2 2-2.8 2c-1.2 0-2.3-.5-2.9-1.3M12 6.5v11"/>',topo:'<path d="M12 19V5M6 11l6-6 6 6"/>'};
function ic(k){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[k]+"</svg>"}
var QUICK=[["Chá Blend Sereníssimo","/produtos/cha-blend-serenissimo/","aa99458c07b0c03fc664783c439ea3f6-a139cfddb7d8f2170717849861066454-1024-1024.webp"],["Laranja Chocoleve","/produtos/laranja-choco-leve/","chatgpt-image-10_05_2026-01_17_27-9828d51df3d5722e8517783866624784-1024-1024.webp"],["Trouxinha de Maçã","/produtos/trouxinha-maca1/","chatgpt-image-11_05_2026-14_01_43-9740208ddf11644ef717785189091683-1024-1024.webp"],["Chá Blend Intenso","/produtos/cha-blend-intenso/","80adf11cf36cb1711e18c5c38446244b-f1d60dc32a482481e817849861200355-1024-1024.webp"]];
function selo(){return[].filter.call(D.body.children,function(d){if(d.tagName!=="DIV"||d.className||d.id)return false;var r=d.getBoundingClientRect(),c=getComputedStyle(d);return c.position==="fixed"&&r.width>30&&r.width<90&&r.left<60&&r.bottom>innerHeight-120})[0]}
function atalhos(){if(D.querySelector(".cml-flut")||/\/checkout\//.test(P))return;
 var n=D.createElement("nav");n.className="cml cml-flut";n.setAttribute("aria-label","Atalhos");
 n.innerHTML='<a class="cml-fl" href="'+WA+'" target="_blank" rel="noopener">'+ic("wa")+'<span>WhatsApp</span></a><button type="button" class="cml-fl cml-fq">'+ic("raio")+'<span>Compra rápida</span></button><a class="cml-fl cml-fpres" href="/presentes-de-natal/">'+ic("pres")+'<span>Monte o presente</span></a><a class="cml-fl cml-fcb" href="/cashback/">'+ic("moeda")+'<span>Cashback</span></a><a class="cml-fl cml-ftopo" href="#" aria-label="Voltar ao topo">'+ic("topo")+"<span>Topo</span></a>";
 var q=D.createElement("div");q.className="cml cml-quick";q.setAttribute("role","dialog");q.setAttribute("aria-label","Compra rápida");
 q.innerHTML='<div class="cml-qh"><p class="cml-eb">Compra rápida</p><button type="button" aria-label="Fechar">×</button></div><p class="cml-qs">Os mais pedidos, direto para a página.</p>'+QUICK.map(function(x){return'<a class="cml-qi" href="'+x[1]+'"><img src="'+CDN+x[2]+'" alt=""><span>'+esc(x[0])+"</span><b>Ver</b></a>"}).join("");
 D.body.appendChild(q);D.body.appendChild(n);D.body.classList.add("cml-com-flut");
 n.querySelector(".cml-fq").onclick=function(){q.classList.toggle("on")};q.querySelector("button").onclick=function(){q.classList.remove("on")};
 n.querySelector(".cml-ftopo").onclick=function(e){e.preventDefault();scrollTo({top:0,behavior:"smooth"})};
 n.querySelector(".cml-fcb").onclick=function(e){var s=window.__cmlSelo||selo();if(s){e.preventDefault();(s.querySelector("button")||s).click()}}}
function esconde(){var x=window.__cmlSelo;if(!x||!D.body.contains(x)){x=selo();if(!x)return;window.__cmlSelo=x}x.style.setProperty("opacity","0","important");x.style.setProperty("pointer-events","none","important")}


/* titulos das secoes nativas com a segunda metade em italico */
function titulos(){[].forEach.call(D.querySelectorAll(".heading-block"),function(h){if(h.querySelector("em"))return;var el=h.querySelector("h1,h2,h3,p")||h;if(el.children.length)return;var t=el.textContent.trim();if(!t)return;var w=t.split(/\s+/);if(w.length<2)return;var k=Math.ceil(w.length/2);el.innerHTML=esc(w.slice(0,k).join(" "))+" <em>"+esc(w.slice(k).join(" "))+"</em>"})}
/* ---------- RODAR ---------- */
function tudo(){try{titulos()}catch(e){}try{cards()}catch(e){}try{produto()}catch(e){}try{categoria()}catch(e){}try{depoimentos()}catch(e){}try{rodape()}catch(e){}try{atalhos()}catch(e){}try{esconde()}catch(e){}}
function ini(){tudo();var n=0;(function l(){tudo();if(++n<20)setTimeout(l,600)})();var t=0;new MutationObserver(function(){clearTimeout(t);t=setTimeout(tudo,250)}).observe(D.body,{childList:true,subtree:true})}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",ini);else ini();
})();
