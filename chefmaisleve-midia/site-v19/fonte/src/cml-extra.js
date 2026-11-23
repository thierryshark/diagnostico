/* v2: tema escuro integral removido (21/11/2026). */
/* Chef Mais Leve: desempenho (01/11/2026). Cada regra CSS com :has() faz o navegador recalcular o estilo da pagina inteira a cada mudanca de estilo (medido: 37 a 120 ms por mudanca na home; sem :has, quase 0). Este bloco troca cada :has(...) por uma classe propria (cmlh-N), aplicada por JS nos elementos certos e atualizada no maximo 4 vezes por segundo quando o DOM muda. Regras com estado de interacao (:hover, :focus, :checked...) dentro do :has ficam como estao. Para desfazer: apague este bloco. */
(function(){if(window.__cmlHz)return;window.__cmlHz=1;
if(!window.MutationObserver||!document.querySelectorAll)return;
var D=document,H=D.documentElement,done=typeof WeakSet!=="undefined"?new WeakSet():null,T=[],byQ={},seq=0;
var LIVE=/:(hover|focus|focus-within|focus-visible|active|checked|indeterminate|invalid|valid|placeholder-shown|target|user-invalid|autofill)/;
function close(s,i){var d=0,q=null;for(var j=i;j<s.length;j++){var c=s[j];if(q){if(c==="\\"){j++;continue}if(c===q)q=null;continue}if(c==='"'||c==="'"){q=c;continue}if(c==="\\"){j++;continue}if(c==="(")d++;else if(c===")"){d--;if(d===0)return j}}return -1}
function split(s){var out=[],d=0,q=null,st=0;for(var j=0;j<s.length;j++){var c=s[j];if(q){if(c==="\\"){j++;continue}if(c===q)q=null;continue}if(c==='"'||c==="'"){q=c;continue}if(c==="\\"){j++;continue}if(c==="(")d++;else if(c===")")d--;else if(c===","&&d===0){out.push(s.slice(st,j));st=j+1}}out.push(s.slice(st));return out}
function token(p,q){if(!byQ[q]){try{D.querySelectorAll(q)}catch(e){return null}var c="cmlh-"+(++seq);byQ[q]={q:q,c:c,on:[]};T.push(byQ[q])}return byQ[q].c}
function part(p){var out="",i=0,j=0,d=0,q=null,changed=false;
 for(j=0;j<p.length;j++){var c=p[j];if(q){if(c==="\\"){j++;continue}if(c===q)q=null;continue}if(c==='"'||c==="'"){q=c;continue}if(c==="\\"){j++;continue}
  if(c==="("){d++;continue}if(c===")"){d--;continue}if(d!==0||c!==":")continue;
  var isNot=p.substr(j,10)===":not(:has(",isHas=p.substr(j,5)===":has(";if(!isNot&&!isHas)continue;
  var open=isNot?j+4:j+4,end=close(p,open);if(end<0)return null;
  if(isNot){var inner=p.slice(j+5,end);if(inner.indexOf(":has(")!==0||close(inner,4)!==inner.length-1)continue}
  var arg=p.slice(j,end+1);if(LIVE.test(arg))return null;
  var prefix=p.slice(0,end+1).replace(/::?(before|after|first-line|first-letter|marker|placeholder|selection)\b/g,"");var cl=token(p,prefix.trim());if(!cl)return null;
  out+=p.slice(i,j)+"."+cl;i=end+1;j=end;changed=true}
 return changed?out+p.slice(i):null}
function rewrite(sel){if(sel.indexOf(":has(")<0)return null;var ps=split(sel),any=false;for(var k=0;k<ps.length;k++){if(ps[k].indexOf(":has(")<0)continue;var r=part(ps[k]);if(r===null)continue;ps[k]=r;any=true}return any?ps.join(","):null}
function walk(list){for(var k=0;k<list.length;k++){var r=list[k];if(done){if(done.has(r))continue;done.add(r)}if(r.cssRules&&!r.selectorText){walk(r.cssRules);continue}var s=r.selectorText;if(!s||s.indexOf(":has(")<0)continue;var ns=rewrite(s);if(ns){try{r.selectorText=ns}catch(e){}}}}
function scan(){for(var i=0;i<D.styleSheets.length;i++){var L;try{L=D.styleSheets[i].cssRules}catch(e){continue}if(L)walk(L)}upd()}
function upd(){for(var i=0;i<T.length;i++){var t=T[i],now;try{now=D.querySelectorAll(t.q)}catch(e){continue}var keep=[];for(var a=0;a<now.length;a++){var el=now[a];if(!el.classList.contains(t.c))el.classList.add(t.c);keep.push(el)}for(var b=0;b<t.on.length;b++){var o=t.on[b];if(keep.indexOf(o)<0&&o.classList)o.classList.remove(t.c)}t.on=keep}}
var tm=0,last=0,needScan=false;
function run(){tm=0;last=Date.now();if(needScan){needScan=false;scan()}else upd();try{mo.takeRecords()}catch(e){}}
function later(){if(tm)return;var w=Math.max(0,120-(Date.now()-last));tm=setTimeout(run,w)}
var mo=new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var m=ms[i],t=m.target;if(t&&(t.nodeName==="STYLE"||(t.parentNode&&t.parentNode.nodeName==="STYLE")))needScan=true;var a=m.addedNodes;if(a)for(var j=0;j<a.length;j++){var n=a[j].nodeName;if(n==="STYLE"||n==="LINK")needScan=true}}later()});
mo.observe(H,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:["class","style","disabled","open","hidden","aria-expanded","aria-hidden","role"]});
scan();try{mo.takeRecords()}catch(e){}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){needScan=true;later()});
addEventListener("load",function(){needScan=true;later()});
window.__cmlHzInfo=function(){return{tokens:T.length,classes:T.map(function(t){return t.c+" "+t.on.length+" "+t.q.slice(0,80)})}};
})();

/* Chef Mais Leve: design system v1.1 (todas as paginas) */
(function(){if(document.getElementById("cml-ds-extra"))return;var s=document.createElement("style");s.id="cml-ds-extra";s.textContent="/*31 DESIGN SYSTEM v1.1 (out/2026): pagina de produto, categoria e menu*/\n/*31.1 botoes de comprar da pagina de produto no padrao principal*/\n:root body .cml-bar .go,:root body .cml-f-exp a{background-color:#a65a14!important;border-color:#a65a14!important;color:#fff!important;text-transform:none!important;letter-spacing:0!important;font-weight:600!important;border-radius:999px!important}\n:root body .cml-bar .go{font-size:15px!important;min-height:44px}\n:root body .cml-bar .go:hover,:root body .cml-f-exp a:hover{background-color:#8f4d10!important;border-color:#8f4d10!important}\n/*31.2 textos laranja claro e bege que nao passam na leitura*/\n.text-accent,.cml-f-top span,.cml-rend b,.cml-f-pill b,.nav-list-link-featured-color{color:#a65a14!important}\n.cml-f-row h4,.cml-f-exp span,.product-sold-count,.nav-list-link-heading{color:#6f6656!important}\n/*31.3 titulo Veja tambem e demais heading-block h2 na escala da marca*/\n.heading-block.h2{font-size:26px!important;line-height:1.15!important;font-weight:700!important;letter-spacing:-.01em!important;color:#565229!important;text-transform:none!important}\n@media (min-width:900px){.heading-block.h2{font-size:36px!important}}\n/*31.4 botao comprar do card: sem piscar laranja ao aparecer*/\n:root body .js-item-product .js-addtocart.btn{transition:color .15s,border-color .15s!important}\n/*FIM v1.1*/";(document.head||document.documentElement).appendChild(s)})();
/* Chef Mais Leve: textos de abertura das categorias (out/2026) */
(function(){if(window.__cmlCi)return;window.__cmlCi=1;
var T={"/chas/":["Chás e infusões artesanais","Ervas inteiras, flores e frutas que a gente mesmo desidrata. São 11 blends para cada momento do dia, além das trouxinhas de fruta, prontas para a xícara.",["Ervas inteiras","0 açúcar e 0 aromatizante","40g rendem 20 xícaras"]],
"/snacks-granolas/":["Snacks e granolas","Fruta comprada in natura, fatiada e desidratada aqui, e granolas crocantes feitas em pequenos lotes. Tem opção doce, salgada e low carb.",["Fruta desidratada por nós","Sem conservantes","Feito em pequenos lotes"]],
"/kits-presentes/":["Kits e presentes","Caixas montadas à mão com chás, snacks e acessórios, prontas para presentear quem você quer cuidar.",["Montados à mão","Embalagem de presente","Para empresas, sob consulta"]],
"/acessorios/":["Acessórios para o seu ritual","Infusores, xícaras e chaleiras de vidro para preparar o chá de folhas soltas do jeito certo, em casa ou no trabalho.",["Para chá de folhas soltas","Vidro e inox","Combina com qualquer blend"]]};
var CSS=".cml-ci{padding-top:20px;padding-bottom:4px;font-family:Poppins,system-ui,sans-serif}.cml-ci h2{margin:0 0 8px;font:700 26px/1.15 Poppins,sans-serif;letter-spacing:-.01em;color:#565229;text-wrap:balance}.cml-ci p{margin:0;max-width:640px;font-size:15px;line-height:1.55;color:#2b2916}.cml-ci ul{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 0;padding:0;list-style:none}.cml-ci li{display:inline-flex;align-items:center;min-height:30px;padding:4px 14px;border-radius:999px;background:#e8e9d6;color:#565229;font-size:13px;font-weight:500}@media(min-width:900px){.cml-ci h2{font-size:36px}.cml-ci p{font-size:16px}}";
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function go(){var p=location.pathname.replace(/\/page\/\d+\/?$/,"/");if(p.slice(-1)!=="/")p+="/";var d=T[p];if(!d)return true;var h=document.getElementById("ns-section-category_hero");if(!h)return false;if(document.querySelector(".cml-ci"))return true;
if(!document.getElementById("cml-ci-css")){var st=document.createElement("style");st.id="cml-ci-css";st.textContent=CSS;document.head.appendChild(st)}
var s=document.createElement("section");s.className="container cml-ci";s.innerHTML="<h2>"+esc(d[0])+"</h2><p>"+esc(d[1])+"</p><ul>"+d[2].map(function(t){return"<li>"+esc(t)+"</li>"}).join("")+"</ul>";h.parentNode.insertBefore(s,h.nextSibling);return true}
var n=0;(function l(){try{if(go())return}catch(e){return}if(++n<40)setTimeout(l,150)})()})();

/* Chef Mais Leve: pagina Presentes de Natal (o visual do item de menu fica no CSS do Cabecalho) */
(function(){if(window.__cmlXm)return;window.__cmlXm=1;
if(/^\/presentes-de-natal\/?$/.test(location.pathname)&&!document.getElementById("cml-natal-faq")){var fq=document.createElement("style");fq.id="cml-natal-faq";fq.textContent="[id^=ns-section-faq],[id^=ns-section-divider]{display:none!important}";(document.head||document.documentElement).appendChild(fq)}
if(/^\/presentes-de-natal\/?$/.test(location.pathname)&&!document.getElementById("cml-natal-js")){var sc=document.createElement("script");sc.id="cml-natal-js";sc.async=true;sc.src="https://dzmlyrkzcdqicwfmxnxd.supabase.co/functions/v1/cml-natal";(document.head||document.documentElement).appendChild(sc)}
})();

/* Chef Mais Leve: colocar na sacola pelo fluxo nativo da loja (usado pelos combos e pela vitrine Black) */
(function(){if(window.CMLAdd)return;
window.CMLAdd=function(o){
 var f=document.createElement("form");f.method="post";f.action="/comprar/";f.className="js-product-form";f.style.display="none";
 function h(n,v){var i=document.createElement("input");i.type="hidden";i.name=n;i.value=v;f.appendChild(i)}
 h("add_to_cart",o.pid);h("quantity",o.qty||1);(o.opts||[]).forEach(function(v,i){h("variation["+i+"]",v)});if(o.kit)h("kit_selections","");
 var sb=document.createElement("input");sb.type="submit";sb.className="js-addtocart";sb.value="Comprar";f.appendChild(sb);
 document.body.appendChild(f);function rm(){setTimeout(function(){f.remove()},15000)}
 if(window.LS&&LS.addToCartEnhanced&&window.jQueryNuvem){try{return Promise.resolve(LS.addToCartEnhanced(jQueryNuvem(f),"Comprar","Adicionando…",false,false,null,null)).then(function(){rm();return true})}catch(e){}}
 var p=new URLSearchParams(new FormData(f));p.set("add_to_cart_enhanced","1");
 return fetch("/comprar/",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/x-www-form-urlencoded","X-Requested-With":"XMLHttpRequest"},body:p.toString()}).then(function(r){return r.json()}).then(function(j){rm();if(!j||!j.success)throw new Error("add");location.href="/comprar/";return true})};
})();

/* Chef Mais Leve: botao Comprar nos cards de combo (kits nativos nao trazem o botao) */
(function(){if(window.__cmlKb)return;window.__cmlKb=1;
if(!document.getElementById("cml-kb-css")){var ks=document.createElement("style");ks.id="cml-kb-css";ks.textContent=":root body .js-item-product .cml-kbuy.btn{display:flex;width:100%!important;min-height:44px;justify-content:center;background-color:transparent!important;border:1.5px solid #565229!important;color:#565229!important;box-shadow:none!important;font-size:14px!important}:root body .js-item-product .cml-kbuy.btn:hover{background-color:#565229!important;color:#2b2916!important}@media(max-width:767px){:root body .js-item-product .cml-kbuy.btn{min-height:40px;font-size:13px!important}}";(document.head||document.documentElement).appendChild(ks)}
function fix(root){var list=[];[].forEach.call((root||document).querySelectorAll(".js-item-product"),function(e){
 if(e.__cmlKb||e.hasAttribute("data-variants")||e.querySelector("[data-variants],.js-item-submit-container,.js-quickshop-modal-open"))return;
 var info=e.querySelector(".product-item-information");var pid=e.getAttribute("data-product-id");if(!info||!pid)return;
 var ns=e.querySelector(".js-stock-label-private");if(ns&&ns.offsetParent!==null&&/esgot|sem estoque/i.test(ns.textContent))return;
 list.push([e,info,pid])});
 /* leve3: leituras acima, escritas abaixo (um recalculo de layout so) */
 list.forEach(function(x){var e=x[0],info=x[1],pid=x[2];e.__cmlKb=1;var d=document.createElement("div");d.className="js-item-submit-container product-item-quick-shop-container cml-kq";
 d.innerHTML='<button type="button" class="btn btn-primary btn-small cart cml-kbuy" data-kit="'+pid+'">Comprar</button>';info.appendChild(d)})}
document.addEventListener("click",function(ev){var b=ev.target.closest(".cml-kbuy");if(!b||b.disabled||!window.CMLAdd)return;ev.preventDefault();b.disabled=true;var tx=b.textContent;b.textContent="Adicionando…";
 window.CMLAdd({pid:b.getAttribute("data-kit"),kit:true}).then(function(){b.textContent="Na sacola ✓";setTimeout(function(){b.disabled=false;b.textContent=tx},2500)}).catch(function(){b.disabled=false;b.textContent=tx;location.href=(b.closest(".js-item-product").querySelector("a[href*='/produtos/']")||{}).href||"/comprar/"})});
var q=0;function later(){if(q)return;q=setTimeout(function(){q=0;fix()},250)}
function start(){fix();try{new MutationObserver(function(m){for(var i=0;i<m.length;i++)if(m[i].addedNodes.length){later();break}}).observe(document.body,{childList:true,subtree:true})}catch(e){}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();

/* Chef Mais Leve: fotos mais leves nos cards e no Comprar rapido (teto de 640px, mesma foto do card = sai do cache) */
(function(){if(window.__cmlImg)return;window.__cmlImg=1;
var SEL=".js-item-product img, .js-quickshop-img, #quickshop-modal img";
function cap(s){if(!s||!/\d+w/.test(s))return s;var ps=s.split(",").map(function(x){return x.trim()}).filter(Boolean);var k=ps.filter(function(p){var m=p.match(/\s(\d+)w$/);return !m||+m[1]<=640});return k.length&&k.length<ps.length?k.join(", "):s}
function fix(img){["data-srcset","srcset"].forEach(function(a){var v=img.getAttribute(a);if(v){var n=cap(v);if(n!==v)img.setAttribute(a,n)}})}
function all(){[].forEach.call(document.querySelectorAll(SEL),fix)}
function big(u){return u?u.split("?")[0].replace(/-\d+-\d+(\.\w+)$/,"-640-0$1"):""}
var pre={};function preload(card){var im=card&&card.querySelector("img.js-product-item-image-private");if(!im)return;var u=big(im.currentSrc||im.getAttribute("data-srcset")&&im.getAttribute("data-srcset").split(/[\s,]+/)[0]);if(!u||pre[u])return;pre[u]=1;var i=new Image();i.decoding="async";i.src=u.indexOf("//")===0?"https:"+u:u}
function warm(ev){var t=ev.target.closest&&ev.target.closest(".js-quickshop-modal-open,.js-addtocart");if(t)preload(t.closest(".js-item-product"))}
document.addEventListener("pointerover",warm,{passive:true});document.addEventListener("touchstart",warm,{passive:true});document.addEventListener("focusin",warm);
var q=0;function later(){if(q)return;q=setTimeout(function(){q=0;all()},200)}
function start(){all();try{new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var m=ms[i];if(m.type==="attributes"){if(m.target.tagName==="IMG"&&m.target.matches(SEL))fix(m.target)}else if(m.addedNodes.length)later()}}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["srcset","data-srcset"]})}catch(e){}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();

/* Chef Mais Leve: Esquenta Black (ate 22/11/2026). v7
   Faixa rolante no lugar da barra de anuncio (todas as paginas), faixa na home e vitrine /ofertas/. */
/* 21/11/2026: BLACKFRIDAY na Chef (23 a 30/11). window.__cmlBF liga o modo Black Friday: tema claro com a Black em destaque (cml-paginas, secao 28).
   Previa: ?previa-black=1 liga so no aparelho de quem abriu, ?previa-black=0 desliga. BF_AUTO=1 liga para todos de 23/11 00h ate 30/11 23h59. */
(function(){try{var BF_AUTO=1,BF_INI=new Date("2026-11-22T12:00:00-03:00").getTime(),BF_FIM=new Date("2026-11-30T23:59:59-03:00").getTime();var qb=location.search.match(/[?&]previa-black=(1|0)/);if(qb){try{if(qb[1]==="1")localStorage.setItem("cml-bf","1");else localStorage.removeItem("cml-bf")}catch(e){}}var pv=false;try{pv=localStorage.getItem("cml-bf")==="1"}catch(e){}var nw=Date.now();window.__cmlBF=nw<=BF_FIM&&(pv||(BF_AUTO&&nw>=BF_INI))}catch(e){window.__cmlBF=false}})();
(function(){if(window.__cmlBk)return;window.__cmlBk=1;
var END=new Date(window.__cmlBF?"2026-11-30T23:59:59-03:00":"2026-11-22T23:59:59-03:00").getTime();
if(Date.now()>END)return;
var IS_OF=/^\/ofertas\/?$/.test(location.pathname);
if(IS_OF){var hs=document.createElement("style");hs.id="cml-bk-hide";hs.textContent="#ns-section-category_hero,#ns-section-product_list,#ns-section-divider_1789950202654{display:none!important}";(document.head||document.documentElement).appendChild(hs)}
function css(id,t){if(document.getElementById(id))return;var s=document.createElement("style");s.id=id;s.textContent=t;(document.head||document.documentElement).appendChild(s)}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function brl(v){return "R$ "+v.toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".")}
function retry(fn,max,ms){var n=0;(function l(){var ok=false;try{ok=fn()}catch(e){ok=true}if(!ok&&++n<max)setTimeout(l,ms)})()}

/* ---------- vitrine: comeca a buscar os produtos ja, antes do DOM ---------- */
var SRC=[["/chas/","Chás"],["/snacks-granolas/","Snacks e granolas"],["/kits-presentes/","Kits"],["/acessorios/","Acessórios"],["/ofertas/",""]];
var CK="cml-bk-v7",TTL=10*60*1000;
function parse(html,cat,out,seen){
 var d=new DOMParser().parseFromString(html,"text/html");
 [].forEach.call(d.querySelectorAll(".js-item-product"),function(e){
  var pid=+e.getAttribute("data-product-id");if(!pid)return;
  var a=e.querySelector("a[href*='/produtos/']"),nm=((e.querySelector(".js-item-name")||{}).textContent||"").trim();
  var vEl=e.hasAttribute("data-variants")?e:e.querySelector("[data-variants]");
  if(!vEl){if(seen[pid])return;var pe=e.querySelector('[data-store^="product-item-price"]');if(!pe)return;
   var nums=(pe.textContent.match(/R\$\s*[\d.]+,\d{2}/g)||[]).map(function(t){return parseFloat(t.replace(/[^\d,]/g,"").replace(",","."))});if(nums.length<2||!(nums[1]>nums[0]))return;
   var im=e.querySelector("img"),ss=im?(im.getAttribute("data-srcset")||im.getAttribute("srcset")||im.getAttribute("src")||""):"",m4=ss.match(/(\S+-480-0\.\w+)/),src=m4?m4[1]:(ss.split(/[\s,]+/)[0]||"");if(src.indexOf("//")===0)src="https:"+src;
   var k0={pid:pid,name:nm,opt:"",opts:[],href:a?a.getAttribute("href"):"#",img:src,price:nums[0],cmp:nums[1],off:Math.round((nums[1]-nums[0])/nums[1]*100),save:nums[1]-nums[0],stock:null,cat:cat||"Kits",combo:true};seen[pid]=k0;out.push(k0);return}
  var vs;try{vs=JSON.parse(vEl.getAttribute("data-variants"))}catch(x){return}
  var av=vs.filter(function(v){return v.available&&v.is_visible!==false&&!v.contact});if(!av.length)return;
  /* variacao de MENOR preco entre as que estao com desconto */
  var best=null;av.forEach(function(v){var hp=v.has_promotional_price&&v.promotional_price_number!=null,p=hp?v.promotional_price_number:v.price_number,c=hp?v.price_number:v.compare_at_price_number;if(c&&c>p&&(!best||p<best.p))best={v:v,p:p,c:c}});
  if(!best)return;
  if(seen[pid]){if(cat&&!seen[pid].cat)seen[pid].cat=cat;return}
  var img=best.v.image_url||av[0].image_url||"";img=img?(img.indexOf("//")===0?"https:":"")+img.replace(/-1024-1024(\.\w+)$/,"-480-0$1"):"";
  var opts=vs.length>1?[best.v.option0,best.v.option1,best.v.option2].filter(function(o){return o}):[];
  var it={pid:pid,name:nm,opt:opts.join(" · "),opts:opts,href:a?a.getAttribute("href"):"#",img:img,price:best.p,cmp:best.c,off:Math.round((best.c-best.p)/best.c*100),save:best.c-best.p,stock:best.v.stock,cat:cat};
  seen[pid]=it;out.push(it);
 });
 var nx=d.querySelector('a[rel=next], .js-pagination-next');return nx?nx.getAttribute("href"):null;
}
var API="https://dzmlyrkzcdqicwfmxnxd.supabase.co/functions/v1/cml-ofertas";
function fetchAll(){return fetch(API).then(function(r){return r.json()}).then(function(j){if(!j||!j.p||!j.p.length)throw 0;try{localStorage.setItem(CK,JSON.stringify({t:Date.now(),p:j.p}))}catch(e){}return j.p}).catch(fetchClient)}
window.CMLOfertas=function(){var c=cached();if(c&&Date.now()-c.t<TTL)return Promise.resolve(c.p);return fetchAll()};
function fetchClient(){var res=SRC.map(function(){return null});
 return Promise.all(SRC.map(function(s,i){var items=[],sn={};function go(u,n){return fetch(u,{credentials:"same-origin"}).then(function(r){return r.text()}).then(function(h){var nx=parse(h,s[1],items,sn);if(nx&&n<5)return go(nx,n+1)}).catch(function(){})}return go(s[0],0).then(function(){res[i]=items})}))
 .then(function(){var out=[],seen={};res.forEach(function(items){(items||[]).forEach(function(it){var o=seen[it.pid];if(o){if(!o.cat&&it.cat)o.cat=it.cat;return}seen[it.pid]=it;out.push(it)})});
  out.forEach(function(p){if(!p.cat)p.cat="Outros"});
  out.sort(function(a,b){return (b.combo?1:0)-(a.combo?1:0)||b.off-a.off||b.save-a.save});
  try{localStorage.setItem(CK,JSON.stringify({t:Date.now(),p:out}))}catch(e){}
  return out});}
function cached(){try{var c=JSON.parse(localStorage.getItem(CK)||"null");if(c&&c.p&&c.p.length&&Date.now()-c.t<TTL*6)return c}catch(e){}return null}
var CACHE=IS_OF?cached():null;
var FRESH=IS_OF&&(!CACHE||Date.now()-CACHE.t>TTL)?fetchAll():null;

/* faixa rolante e item de menu: agora nativos (barra de anuncio e CSS do Cabecalho) */

/* ---------- 3) faixa na home ---------- */
var HCSS=".cbkh{background:#f6efe9;font-family:Poppins,system-ui,sans-serif;margin:24px 0}@media(min-width:992px){.cbkh{max-width:1180px;margin:32px auto;border-radius:24px;overflow:hidden}}"+".cbkh{}.cbkh *{box-sizing:border-box}"
+".cbkh a.cbkh-in{position:relative;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr) auto auto;align-items:center;gap:28px;max-width:1180px;margin:0 auto;padding:22px 24px;color:#2b2916;text-decoration:none}"
+".cbkh a.cbkh-in:before{content:'';position:absolute;inset:-60% 20% -60% -10%;background:radial-gradient(ellipse at center,rgba(166,90,20,.25),transparent 62%);pointer-events:none}"
+".cbkh-t{position:relative;min-width:0}.cbkh-eb{display:inline-flex;align-items:center;gap:8px;margin:0 0 6px;color:#a65a14;font:700 12px/1 Poppins,sans-serif;letter-spacing:.14em;text-transform:uppercase}"
+".cbkh-eb i{width:8px;height:8px;border-radius:50%;background:#e0453a;animation:cbkhDot 1.6s ease-out infinite}@keyframes cbkhDot{0%{box-shadow:0 0 0 0 rgba(224,69,58,.7)}100%{box-shadow:0 0 0 10px rgba(224,69,58,0)}}"
+".cbkh-h{margin:0;font:900 clamp(24px,3.4vw,40px)/1.05 Poppins,sans-serif;letter-spacing:-.02em;text-wrap:balance;text-transform:uppercase;background:linear-gradient(100deg,#c8933c 0%,#a65a14 30%,#fff6dc 45%,#a65a14 60%,#c8933c 100%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:cbkhShine 4.5s ease-in-out infinite}@keyframes cbkhShine{0%,100%{background-position:100% 0}50%{background-position:0 0}}"
+".cbkh-s{margin:6px 0 0;font-size:15px;color:#e9e1d6}"
+".cbkh-cd{position:relative;display:flex;gap:8px}.cbkh-cd span{min-width:58px;padding:8px 6px;border-radius:12px;background:#fffaf5;border:1px solid rgba(243,212,139,.25);text-align:center}.cbkh-cd b{display:block;font:800 24px/1 Poppins,sans-serif;font-variant-numeric:tabular-nums}.cbkh-cd small{display:block;margin-top:4px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#b9b0a3}"
+".cbkh-btn{position:relative;display:inline-flex;align-items:center;gap:10px;min-height:52px;padding:0 26px;border-radius:999px;background:#a65a14;color:#f6efe9;font:800 16px Poppins,sans-serif;white-space:nowrap}.cbkh-btn em{font-style:normal;display:inline-block;animation:cbkhNudge 1.8s ease-in-out infinite}@keyframes cbkhNudge{0%,100%{transform:translateX(0)}50%{transform:translateX(4px)}}"
+".cbkh a.cbkh-in:hover .cbkh-btn{background:#ffe3a3}"
+"@media(max-width:860px){.cbkh a.cbkh-in{grid-template-columns:minmax(0,1fr) auto;gap:12px;padding:12px 16px}.cbkh-cd,.cbkh-s{display:none}.cbkh-eb{margin:0 0 4px;font-size:10px;letter-spacing:.12em;gap:6px}.cbkh-eb i{width:6px;height:6px}.cbkh-h{font-size:clamp(15px,4.4vw,20px);line-height:1.1}.cbkh-btn{min-height:42px;padding:0 16px;font-size:14px;gap:6px}}"
+"@media(prefers-reduced-motion:reduce){.cbkh-h,.cbkh-eb i,.cbkh-btn em{animation:none}}";
function homeBanner(){if(location.pathname!=="/")return true;if(document.getElementById("cml-bkh"))return true;
 var ref=document.getElementById("ns-section-product-list_1786996664740")||document.getElementById("ns-section-banners_1783361454159")||document.querySelector(".cml-cp");if(!ref){return document.readyState==="complete"}
 css("cml-bkh-css",HCSS);var b=document.createElement("section");b.id="cml-bkh";b.className="cbkh";
 b.innerHTML='<a class="cbkh-in" href="/ofertas/"><div class="cbkh-t"><p class="cbkh-eb"><i></i>Black Friday · 23 a 30/11</p><h2 class="cbkh-h">Preço de Black, cuidado de sempre</h2><p class="cbkh-s">Combos com 15% off e 5% de desconto no Pix, enquanto durar o estoque.</p></div><div class="cbkh-cd" role="timer" aria-label="Tempo até o fim do Esquenta Black"><span><b data-h="d">00</b><small>dias</small></span><span><b data-h="h">00</b><small>horas</small></span><span><b data-h="m">00</b><small>min</small></span></div><span class="cbkh-btn">Ver ofertas <em>→</em></span></a>';
 ref.parentNode.insertBefore(b,ref);
 function t(){var s=Math.max(0,Math.floor((END-Date.now())/1000)),v={d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60)};for(var k in v){var e=b.querySelector('[data-h="'+k+'"]');if(e)e.textContent=(v[k]<10?"0":"")+v[k]}}
 t();setInterval(t,15000);return true}
retry(homeBanner,80,150);

if(!IS_OF||true)return; /* v2: vitrine antiga de /ofertas/ desligada; a pagina nova e a secao 33 (v2-ofertas) */

/* ---------- 4) vitrine /ofertas/ ---------- */
var CSS=".cbk{--k:#f6efe9;--k2:#fffaf5;--k3:#fffaf5;--g:#a65a14;--g2:#a65a14;--w:#f6efe9;--m:#b9b0a3;--r:#e0453a;font-family:Poppins,system-ui,sans-serif;color:var(--w);background:var(--k);padding:0 0 56px}"
+".cbk *,.cbk *:before,.cbk *:after{box-sizing:border-box}.cbk-in{max-width:1180px;margin:0 auto;padding:0 16px}"
+".cbk-hero{position:relative;overflow:hidden;padding:clamp(36px,6vw,72px) 0 clamp(24px,4vw,40px);text-align:center}"
+".cbk-hero:before{content:'';position:absolute;inset:-40% -10% auto;height:120%;background:radial-gradient(ellipse at center,rgba(223,174,88,.22),transparent 60%);pointer-events:none}"
+".cbk-eb{position:relative;display:inline-flex;align-items:center;gap:8px;margin:0 0 14px;padding:7px 16px;border-radius:999px;border:1px solid rgba(243,212,139,.45);color:var(--g);font:700 13px/1 Poppins,sans-serif;letter-spacing:.14em;text-transform:uppercase}"
+".cbk-eb i{width:8px;height:8px;border-radius:50%;background:var(--r);animation:cbkDot 1.6s ease-out infinite}@keyframes cbkDot{0%{box-shadow:0 0 0 0 rgba(224,69,58,.7)}100%{box-shadow:0 0 0 10px rgba(224,69,58,0)}}"
+".cbk-h1{position:relative;margin:0;font:900 clamp(44px,10vw,116px)/.9 Poppins,sans-serif;letter-spacing:-.03em;text-transform:uppercase;background:linear-gradient(100deg,#c8933c 0%,#f3d48b 30%,#fff6dc 45%,#f3d48b 60%,#c8933c 100%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:cbkShine 4.5s ease-in-out infinite}"
+".cbk-h1 b{display:block;font-weight:900}@keyframes cbkShine{0%,100%{background-position:100% 0}50%{background-position:0 0}}"
+".cbk-sub{position:relative;max-width:620px;margin:16px auto 0;font-size:clamp(16px,2.2vw,19px);line-height:1.5;color:var(--w)}.cbk-sub strong{color:var(--g)}"
+".cbk-cd{position:relative;display:flex;justify-content:center;gap:10px;margin:24px 0 0}.cbk-cd div{min-width:74px;padding:12px 8px;border-radius:16px;background:var(--k2);border:1px solid rgba(243,212,139,.25)}"
+".cbk-cd b{display:block;font:800 clamp(28px,5vw,40px)/1 Poppins,sans-serif;color:var(--w);font-variant-numeric:tabular-nums}.cbk-cd small{display:block;margin-top:6px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--m)}"
/* faixa de destaques: fluida, sem caixas */
+".cbk-hl{position:relative;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px 26px;max-width:940px;margin:28px auto 0;padding:16px 26px;border-radius:999px;background:linear-gradient(#141311,#141311) padding-box,linear-gradient(100deg,rgba(243,212,139,.15),#f3d48b,rgba(243,212,139,.15)) border-box;border:1.5px solid transparent;overflow:hidden}"
+".cbk-hl:after{content:'';position:absolute;top:0;left:-40%;width:30%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,227,163,.12),transparent);transform:skewX(-20deg);animation:cbkHl 5s ease-in-out infinite;pointer-events:none}@keyframes cbkHl{0%,60%{left:-40%}100%{left:130%}}"
+".cbk-hl-main{display:inline-flex;align-items:baseline;gap:10px;color:var(--w);font-size:15px;white-space:nowrap}.cbk-hl-main b{font:900 clamp(26px,3.4vw,34px)/1 Poppins,sans-serif;color:var(--g);letter-spacing:-.02em}"
+".cbk-hl-sub{display:inline-flex;flex-wrap:wrap;justify-content:center;gap:6px 22px}.cbk-hl-it{display:inline-flex;align-items:center;gap:8px;font-size:14.5px;color:var(--m);white-space:nowrap}.cbk-hl-it b{color:var(--w);font-weight:800}.cbk-hl-it:before{content:'';width:6px;height:6px;border-radius:50%;background:var(--r)}"
+".cbk-hl .sk{display:inline-block;width:110px;height:26px;border-radius:8px;background:linear-gradient(90deg,#24221f,#34312c,#24221f);background-size:200% 100%;animation:cbkSk 1.2s linear infinite}@keyframes cbkSk{from{background-position:200% 0}to{background-position:0 0}}"
+".cbk-sh{margin:34px 0 14px}.cbk-sh h2{margin:0;font:800 clamp(24px,3.6vw,34px)/1.1 Poppins,sans-serif;color:var(--w);letter-spacing:-.01em}.cbk-sh h2 b{color:var(--g)}.cbk-sh p{margin:6px 0 0;font-size:15px;color:var(--m)}"
+".cbk-grid{display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(230px,1fr))}"
+".cbk-card{position:relative;display:flex;flex-direction:column;border-radius:20px;background:var(--k2);overflow:hidden;border:1px solid rgba(43,41,22,.08);transition:transform .2s,border-color .2s}.cbk-card:hover{transform:translateY(-3px);border-color:rgba(243,212,139,.45)}"
+".cbk-img{position:relative;display:block;aspect-ratio:1/1;background:#f6efe9;overflow:hidden}.cbk-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}"
+".cbk-off{position:absolute;top:10px;right:10px;z-index:1;padding:7px 11px;border-radius:12px;background:var(--r);color:#2b2916;font:900 18px/1 Poppins,sans-serif;letter-spacing:-.02em;box-shadow:0 8px 20px -8px rgba(224,69,58,.8)}"
+".cbk-tag{position:absolute;top:10px;left:10px;z-index:1;padding:6px 10px;border-radius:10px;background:#f6efe9;color:var(--g);font:800 11px/1 Poppins,sans-serif;letter-spacing:.1em;text-transform:uppercase}"
+".cbk-low{position:absolute;bottom:10px;left:10px;right:10px;z-index:1;padding:6px 10px;border-radius:10px;background:rgba(255,250,245,.85);color:var(--g);font-size:12.5px;font-weight:700;text-align:center}"
+".cbk-body{display:flex;flex-direction:column;gap:3px;flex:1;padding:14px 14px 16px}"
+".cbk-nm{margin:0;font-size:15px;font-weight:600;line-height:1.3;color:var(--w);text-decoration:none;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.cbk-op{font-size:12.5px;color:var(--m)}"
+".cbk-pr{display:flex;align-items:baseline;flex-wrap:wrap;gap:2px 8px;margin-top:6px}.cbk-de{font-size:13.5px;color:var(--m);text-decoration:line-through}.cbk-por{font:800 24px/1.1 Poppins,sans-serif;color:var(--g)}"
+".cbk-pix{font-size:13px;color:var(--m)}.cbk-eco{display:inline-block;align-self:flex-start;margin-top:4px;padding:3px 9px;border-radius:999px;background:rgba(224,69,58,.16);color:#ff8f86;font-size:12.5px;font-weight:700}"
+".cbk-buy{margin-top:auto;padding-top:12px}.cbk-btn{display:flex;align-items:center;justify-content:center;width:100%;min-height:46px;border-radius:999px;border:0;background:var(--g);color:var(--k);font:800 15px Poppins,sans-serif;letter-spacing:.02em;cursor:pointer;text-decoration:none}.cbk-btn:hover{background:#ffe3a3}.cbk-btn[disabled]{opacity:.7;cursor:wait}"
+".cbk-empty{padding:40px 20px;border-radius:20px;background:var(--k2);text-align:center;font-size:16px;color:var(--m)}"
+".cbk-skc{border-radius:20px;background:var(--k2);aspect-ratio:3/4.4;background:linear-gradient(90deg,#fffaf5,#fffaf5,#fffaf5);background-size:200% 100%;animation:cbkSk 1.2s linear infinite}"
+".cbk-toast{position:fixed;left:50%;bottom:20px;z-index:99999;transform:translateX(-50%);display:flex;align-items:center;gap:14px;max-width:calc(100% - 32px);padding:14px 18px;border-radius:16px;background:#111;color:var(--w);font:600 15px Poppins,sans-serif;box-shadow:0 18px 40px -18px #000}.cbk-toast a{color:var(--g);white-space:nowrap}"
+".cbk-foot{margin:26px 0 0;font-size:13px;color:var(--m);text-align:center}"
+".cbk :focus-visible{outline:2px solid var(--g);outline-offset:3px}"
+"@media(max-width:760px){.cbk-hero{padding:22px 0 16px}.cbk-eb{margin:0 0 10px;padding:6px 12px;font-size:11px}.cbk-h1{font-size:40px;line-height:.92}.cbk-sub{margin:10px auto 0;font-size:14.5px;line-height:1.45}.cbk-cd{gap:6px;margin:14px 0 0}.cbk-cd div{min-width:0;flex:1;max-width:76px;padding:8px 4px;border-radius:12px}.cbk-cd b{font-size:24px}.cbk-cd small{font-size:10px;margin-top:4px}"
+".cbk-hl{flex-direction:column;gap:8px;margin:16px auto 0;padding:12px 14px;border-radius:20px}.cbk-hl-main{font-size:13px;gap:8px}.cbk-hl-main b{font-size:24px}.cbk-hl-sub{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 14px}.cbk-hl-it{font-size:12px;gap:6px}.cbk-hl-it:before{width:5px;height:5px}"
+".cbk-sh{margin:20px 0 10px}.cbk-sh h2{font-size:21px}.cbk-sh p{font-size:13px;margin-top:3px}"
+".cbk-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.cbk-card{border-radius:14px}.cbk-card:hover{transform:none}"
+".cbk-off{top:6px;right:6px;padding:5px 7px;font-size:13px;border-radius:8px}.cbk-tag{top:6px;left:6px;padding:4px 6px;font-size:9px;border-radius:7px}.cbk-low{left:6px;right:6px;bottom:6px;padding:4px 6px;font-size:10.5px}"
+".cbk-body{padding:10px 10px 12px;gap:1px}.cbk-nm{font-size:13.5px}.cbk-op{font-size:11.5px}.cbk-pr{margin-top:4px;gap:0 6px}.cbk-de{font-size:11.5px}.cbk-por{font-size:19px}.cbk-pix{font-size:11.5px}.cbk-eco{font-size:10.5px;padding:2px 7px;margin-top:3px}"
+".cbk-buy{padding-top:8px}.cbk-btn{min-height:40px;font-size:14px}.cbk-foot{margin-top:16px;font-size:12px}.cbk{padding-bottom:32px}}"
+".cbk-in{max-width:1360px}.cbk-sel{position:relative;flex:none}.cbk-vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}"
+".cbk-bar{display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;margin:6px 0 10px;padding:12px 0;border-top:1px solid rgba(43,41,22,.08);border-bottom:1px solid rgba(43,41,22,.08)}.cbk-sels{display:flex;flex-wrap:wrap;gap:8px}"
+".cbk-sel select{-webkit-appearance:none;appearance:none;height:38px;max-width:100%;padding:0 34px 0 14px;border-radius:999px;border:1px solid rgba(43,41,22,.22);background:#f6efe9 url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5l5 5 5-5' fill='none' stroke='%23dfae58' stroke-width='1.6'/%3E%3C/svg%3E\") no-repeat right 13px center/11px 8px;color:var(--w);font:500 13.5px Poppins,sans-serif;cursor:pointer}.cbk-sel select:hover{border-color:rgba(243,212,139,.6)}.cbk-sel select.on{border-color:var(--g);color:var(--g)}.cbk-sel select option{background:#f6efe9;color:#2b2916}"
+".cbk-cnt{margin:0 0 0 auto;font-size:13px;color:var(--m)}.cbk-act{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 14px}.cbk-act[hidden],.cbk-bar[hidden]{display:none}"
+".cbk-act button,.cbk-lnk{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 12px;border-radius:999px;border:1px solid rgba(243,212,139,.4);background:transparent;color:var(--g);font:500 12.5px Poppins,sans-serif;cursor:pointer}.cbk-act button span{font-size:16px;line-height:1}.cbk-act .clr,.cbk-lnk{border-color:transparent;color:var(--w);text-decoration:underline;text-underline-offset:3px}"
+".cbk-grid{grid-template-columns:repeat(auto-fill,minmax(208px,1fr));gap:14px}.cbk-card{border-radius:16px}.cbk-body{padding:12px 12px 14px;gap:2px}"
+".cbk-nm{font-size:14px;line-height:1.3;min-height:2.6em}.cbk-op{min-height:1.35em;font-size:12px;line-height:1.35}.cbk-pr{align-items:baseline;min-height:30px;margin-top:4px;gap:0 8px}.cbk-pre{font-size:12px;color:var(--m)}.cbk-por{font-size:21px}.cbk-de{font-size:12.5px}.cbk-pix{min-height:1.35em;font-size:12px;line-height:1.35}"
+".cbk-off{font-size:15px;padding:6px 9px;border-radius:10px;box-shadow:none}.cbk-buy{padding-top:10px}.cbk-btn{min-height:42px;font-size:14px}.cbk-btn.alt{background:transparent;border:1px solid var(--g);color:var(--g)}.cbk-btn.alt:hover{background:rgba(243,212,139,.1)}"
+".cbk-brk{grid-column:1/-1;display:flex;align-items:center;gap:16px;margin:8px 0;color:var(--g);font:600 11.5px/1.2 Poppins,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-align:center}.cbk-brk:before,.cbk-brk:after{content:'';flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(243,212,139,.4),transparent)}.cbk-brk.sep{gap:0;margin:4px 0}"
+"@media(max-width:760px){.cbk-bar{gap:8px;padding:10px 0}.cbk-sels{flex-wrap:nowrap;width:100%;overflow-x:auto;scrollbar-width:none;margin:0 -16px;padding:0 16px}.cbk-sels::-webkit-scrollbar{display:none}.cbk-sel select{height:36px;font-size:12.5px;padding:0 28px 0 12px;background-position:right 10px center}.cbk-cnt{margin:0}"
+".cbk-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.cbk-body{padding:10px 10px 12px}.cbk-nm{font-size:13px}.cbk-por{font-size:18px}.cbk-de,.cbk-pix,.cbk-op,.cbk-pre{font-size:11px}.cbk-off{font-size:12px;padding:4px 6px}.cbk-btn{min-height:38px;font-size:13px}.cbk-brk{font-size:10.5px;letter-spacing:.12em;gap:10px}}"
+"@media(prefers-reduced-motion:reduce){.cbk-h1,.cbk-eb i,.cbk-hl:after,.cbk-hl .sk,.cbk-skc{animation:none}}";
CSS+=".cbk-tier{margin:30px 0 0}.cbk-tier:first-child{margin-top:8px}.cbk-band{display:flex;align-items:baseline;gap:12px;margin:0 0 16px;padding:14px 24px;border-radius:999px;background:radial-gradient(120% 140% at 20% 0%,#1c1c1a,#0b0a08);color:#f6efe9}.cbk-band .cbk-bh{font-family:Caveat,cursive;font-weight:700;font-size:26px;line-height:1;color:#f3d48b;display:inline-block;transform:rotate(-4deg)}.cbk-band b{font:700 clamp(20px,2.4vw,28px)/1 Poppins,sans-serif;color:#f3d48b;letter-spacing:.02em}.cbk-band small{margin-left:auto;font:400 12px/1 Poppins,sans-serif;color:rgba(246,239,233,.72)}.cbk-bar{border:0!important;background:transparent!important}.cbk-sel select{height:34px!important;border-radius:999px!important;border:1px solid #e8ddd0!important;background-color:#fffaf5!important;color:#2b2916!important;font:500 12.5px/1 Poppins,sans-serif!important}.cbk-sel select.on{border-color:#a65a14!important;color:#a65a14!important}@media(max-width:760px){.cbk-band{padding:12px 16px}.cbk-band .cbk-bh{font-size:22px}}";
function add(p){
 if(window.CMLAdd)return window.CMLAdd({pid:p.pid,opts:p.opts,kit:p.combo});
 var q=new URLSearchParams();q.set("add_to_cart",p.pid);q.set("quantity","1");q.set("add_to_cart_enhanced","1");(p.opts||[]).forEach(function(o,i){q.set("variation["+i+"]",o)});if(p.combo)q.set("kit_selections","");
 return fetch("/comprar/",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/x-www-form-urlencoded","X-Requested-With":"XMLHttpRequest"},body:q.toString()}).then(function(r){return r.json()}).then(function(j){if(!j||!j.success)throw 0;toast('Produto na sacola. <a href="/comprar/">Ver sacola</a>');return true})}
function toast(html){var t=document.querySelector(".cbk-toast");if(t)t.remove();t=document.createElement("div");t.className="cbk-toast";t.setAttribute("role","status");t.innerHTML=html;document.body.appendChild(t);clearTimeout(window.__cbkT);window.__cbkT=setTimeout(function(){t.remove()},6000)}
function mount(){
 var hero=document.getElementById("ns-section-category_hero");var list=document.getElementById("ns-section-product_list");
 if(!list&&!hero)return false;
 css("cml-bk-css",CSS);
 var root=document.createElement("section");root.id="cml-bk";root.className="cbk";
 var anchor=hero||list;anchor.parentNode.insertBefore(root,anchor);
 [hero,list,document.getElementById("ns-section-divider_1789950202654")].forEach(function(x){if(x)x.style.display="none"});
 root.innerHTML='<div class="cbk-in"><header class="cbk-hero"><p class="cbk-eb"><i></i>Só até 22 de novembro</p><h1 class="cbk-h1">Esquenta<b>Black</b></h1><p class="cbk-sub">A Black da Chef começou antes. <strong>Kits e favoritos com preço de Black</strong>, enquanto durar o estoque.</p><div class="cbk-cd" role="timer" aria-live="off" aria-label="Tempo até o fim do Esquenta Black"><div><b data-cd="d">00</b><small>dias</small></div><div><b data-cd="h">00</b><small>horas</small></div><div><b data-cd="m">00</b><small>min</small></div><div><b data-cd="s">00</b><small>seg</small></div></div><div class="cbk-hl"><span class="cbk-hl-main">Produtos a partir de <span class="sk"></span></span></div></header><div class="cbk-bar" hidden></div><div class="cbk-act" hidden></div><div class="cbk-list"><div class="cbk-grid">'+[0,1,2,3].map(function(){return'<div class="cbk-skc"></div>'}).join("")+'</div></div><p class="cbk-foot">Preços válidos até 22/11/2026 ou enquanto durar o estoque. O desconto do Pix é aplicado no pagamento.</p></div>';
 function cd(){var s=Math.max(0,Math.floor((END-Date.now())/1000));var v={d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),s:s%60};for(var k in v){var b=root.querySelector('[data-cd="'+k+'"]');if(b)b.textContent=(v[k]<10?"0":"")+v[k]}}
 cd();setInterval(cd,1000);
 var all=[],byPid={};var box=root.querySelector(".cbk-list"),hl=root.querySelector(".cbk-hl");
 var S={o:"dest",c:"",p:"",d:""},first=true;
 try{var hs=new URLSearchParams(location.hash.slice(1));["o","c","p","d"].forEach(function(k){if(hs.get(k))S[k]=hs.get(k)})}catch(e){}
 var FEAT=[379081240,313665100,224675737,224679101,224679971];function fi(p){var i=FEAT.indexOf(+p.pid);return i<0?99:i}
 var SORTS=[["dest","Destaques da campanha"],["desc","Maior desconto"],["low","Menor preço"],["high","Maior preço"]];
 var PR=[["a","Até R$ 40",0,40],["b","R$ 40 a R$ 100",40.005,100],["c","Acima de R$ 100",100.005,1e9]];
 var DS=[["d","40% off ou mais",40,100],["c","25% a 39% off",25,39],["b","15% a 24% off",15,24],["a","Até 14% off",0,14]];
 var MSG=["Só até 22/11","Pix com 5% de desconto","Frete grátis a partir de R$ 249, varia por região"];
 function lo(p){return p.pmin!=null?p.pmin:p.price}function od(p){return p.omax!=null?p.omax:p.off}
 function multi(p){return p.vn>1&&p.pmin!==p.pmax}
 function inR(v,r){return v>=r[2]&&v<=r[3]}
 function find(L,k){for(var i=0;i<L.length;i++)if(L[i][0]===k)return L[i];return null}
 function card(p,i){var m=p.vn>1,pv=multi(p),o=od(p),offT=m&&p.omin!==p.omax?"até -"+o+"%":"-"+o+"%";
  var pr=pv?'<span class="cbk-pre">a partir de</span><span class="cbk-por">'+brl(p.pmin)+'</span>':'<span class="cbk-por">'+brl(p.price)+'</span>'+(p.cmp>p.price&&(!m||p.omin===p.omax)?'<span class="cbk-de">'+brl(p.cmp)+'</span>':'');
  var op=m?p.vn+" opções":(p.opt||"");
  return'<article class="cbk-card"><a class="cbk-img" href="'+esc(p.href)+'" aria-label="'+esc(p.name)+'">'+(p.img?'<img src="'+esc(p.img)+'" alt="" width="480" height="480" decoding="async"'+(i<5?' fetchpriority="high"':' loading="lazy"')+'>':'')+(fi(p)<99?'<span class="cbk-tag">Destaque</span>':p.combo?'<span class="cbk-tag">Combo</span>':'')+'<span class="cbk-off">'+offT+'</span>'+(!m&&p.stock!=null&&p.stock>0&&p.stock<=10?'<span class="cbk-low">Últimas '+p.stock+' unidades</span>':'')+'</a><div class="cbk-body"><a class="cbk-nm" href="'+esc(p.href)+'">'+esc(p.name)+'</a><span class="cbk-op">'+esc(op)+'</span><div class="cbk-pr">'+pr+'</div><span class="cbk-pix">'+(pv?"":brl(p.price*0.95)+" no Pix")+'</span><div class="cbk-buy">'+(m?'<a class="cbk-btn alt" href="'+esc(p.href)+'">Escolher opção</a>':'<button type="button" class="cbk-btn" data-add="'+p.pid+'">Comprar</button>')+'</div></div></article>'}
 function isKit(p){return p.combo||p.cat==="Kits"||/\b(kit|combo)\b/i.test(p.name)}
 function save(){var q=new URLSearchParams();if(S.o!=="dest")q.set("o",S.o);["c","p","d"].forEach(function(k){if(S[k])q.set(k,S[k])});var h=q.toString();try{history.replaceState(null,"",location.pathname+location.search+(h?"#"+h:""))}catch(e){}}
 function flt(){var L=all.filter(function(p){if(S.c&&p.cat!==S.c)return false;var r=find(PR,S.p);if(r&&!inR(lo(p),r))return false;var d=find(DS,S.d);if(d&&!inR(od(p),d))return false;return true});
  L.sort(S.o==="low"?function(a,b){return lo(a)-lo(b)||od(b)-od(a)}:S.o==="high"?function(a,b){return lo(b)-lo(a)||od(b)-od(a)}:S.o==="desc"?function(a,b){return od(b)-od(a)||b.save-a.save}:function(a,b){return fi(a)-fi(b)||od(b)-od(a)||b.save-a.save});return L}
 function opt(v,t,s){return'<option value="'+esc(v)+'"'+(s?" selected":"")+'>'+esc(t)+'</option>'}
 function cnt(f){return all.filter(f).length}
 function bar(){var cats={};all.forEach(function(p){cats[p.cat]=(cats[p.cat]||0)+1});var ck=Object.keys(cats);
  var prs=PR.filter(function(r){return cnt(function(p){return inR(lo(p),r)})}),dss=DS.filter(function(r){return cnt(function(p){return inR(od(p),r)})});
  var h='<div class="cbk-sels"><label class="cbk-sel"><span class="cbk-vh">Ordenar por</span><select data-k="o">'+SORTS.map(function(s){return opt(s[0],s[1],S.o===s[0])}).join("")+'</select></label>';
  if(ck.length>1)h+='<label class="cbk-sel"><span class="cbk-vh">Categoria</span><select data-k="c"'+(S.c?' class="on"':'')+'>'+opt("","Todas as categorias",!S.c)+ck.map(function(c){return opt(c,c+" ("+cats[c]+")",S.c===c)}).join("")+'</select></label>';
  if(prs.length>1)h+='<label class="cbk-sel"><span class="cbk-vh">Faixa de preço</span><select data-k="p"'+(S.p?' class="on"':'')+'>'+opt("","Qualquer preço",!S.p)+prs.map(function(r){return opt(r[0],r[1],S.p===r[0])}).join("")+'</select></label>';
  if(dss.length>1)h+='<label class="cbk-sel"><span class="cbk-vh">Faixa de desconto</span><select data-k="d"'+(S.d?' class="on"':'')+'>'+opt("","Qualquer desconto",!S.d)+dss.map(function(r){return opt(r[0],r[1],S.d===r[0])}).join("")+'</select></label>';
  return h+'</div><p class="cbk-cnt" aria-live="polite"></p>'}
 function chips(n){var a=[];if(S.c)a.push(["c",S.c]);var r=find(PR,S.p);if(r)a.push(["p",r[1]]);var d=find(DS,S.d);if(d)a.push(["d",d[1]]);
  var c=root.querySelector(".cbk-cnt");if(c)c.textContent=n+(n===1?" produto":" produtos");
  var w=root.querySelector(".cbk-act");w.innerHTML=a.length?a.map(function(x){return'<button type="button" data-rm="'+x[0]+'" aria-label="Remover filtro '+esc(x[1])+'">'+esc(x[1])+'<span aria-hidden="true">×</span></button>'}).join("")+'<button type="button" class="clr" data-rm="all">Limpar filtros</button>':"";w.hidden=!a.length}
 var cols=0;function brk(force){if(box.__tier)return;var g=box.querySelector(".cbk-grid");if(!g)return;var c=getComputedStyle(g).gridTemplateColumns.split(" ").filter(Boolean).length||1;if(c===cols&&!force)return;cols=c;
  [].forEach.call(g.querySelectorAll(".cbk-brk"),function(x){x.remove()});var cards=g.querySelectorAll(".cbk-card"),per=c*(c<=2?4:3),k=0;
  for(var i=per;i<cards.length;i+=per){var b=document.createElement("div");b.className="cbk-brk"+(k<MSG.length?"":" sep");b.setAttribute("role","presentation");b.innerHTML=k<MSG.length?"<span>"+esc(MSG[k])+"</span>":"";g.insertBefore(b,cards[i]);k++}}
 function render(){var L=flt();byPid={};all.forEach(function(p){byPid[p.pid]=p});chips(L.length);save();
  var g=box.querySelector(".cbk-grid");if(!L.length){box.innerHTML='<div class="cbk-empty">Nenhum produto com esses filtros. <button type="button" class="cbk-lnk" data-rm="all">Limpar filtros</button></div>';return}
  var n=0;if(S.o==="dest"&&!S.d){var T=[[40,100],[25,39],[15,24],[0,14]],h="";T.forEach(function(t){var G=L.filter(function(p){var d=od(p);return d>=t[0]&&d<=t[1]});if(!G.length)return;G.sort(function(a,b){return od(b)-od(a)||fi(a)-fi(b)||b.save-a.save});var mx=od(G[0]);h+='<div class="cbk-tier"><div class="cbk-band"><span class="cbk-bh">até</span><b>'+mx+'% OFF</b><small>'+G.length+(G.length===1?" produto":" produtos")+'</small></div><div class="cbk-grid">'+G.map(function(p){return card(p,n++)}).join("")+'</div></div>'});box.__tier=1;box.innerHTML=h;return}box.__tier=0;box.innerHTML='<div class="cbk-grid">'+L.map(function(p){return card(p,n++)}).join("")+'</div>';cols=0;brk(true)}
 function draw(){byPid={};all.forEach(function(p){byPid[p.pid]=p});
  if(!all.length){hl.style.display="none";root.querySelector(".cbk-bar").hidden=true;box.innerHTML='<div class="cbk-empty">As ofertas do Esquenta Black estão sendo preparadas. Volte daqui a pouco.</div>';return}
  var max=0,eco=0,min=Infinity;all.forEach(function(p){if(od(p)>max)max=od(p);if(p.save>eco)eco=p.save;if(lo(p)<min)min=lo(p)});
  hl.style.display="";hl.innerHTML='<span class="cbk-hl-main">Produtos a partir de <b>'+brl(min)+'</b></span><span class="cbk-hl-sub"><span class="cbk-hl-it">até <b>'+max+'% off</b></span><span class="cbk-hl-it">economize até <b>'+brl(eco)+'</b></span><span class="cbk-hl-it"><b>+5%</b> no Pix</span></span>';
  if(S.c&&!all.some(function(p){return p.cat===S.c}))S.c="";
  var b=root.querySelector(".cbk-bar");b.hidden=false;b.innerHTML=bar();render();
  if(first){first=false;var y=0;try{y=+sessionStorage.getItem("cbk-y")||0;sessionStorage.removeItem("cbk-y")}catch(e){}if(y)setTimeout(function(){scrollTo(0,y)},60)}}
 root.addEventListener("change",function(e){var s=e.target.closest("select[data-k]");if(!s)return;S[s.getAttribute("data-k")]=s.value;s.classList.toggle("on",!!s.value&&s.getAttribute("data-k")!=="o");render()});
 root.addEventListener("click",function(e){var r=e.target.closest("[data-rm]");if(r){var k=r.getAttribute("data-rm");if(k==="all"){S.c=S.p=S.d=""}else S[k]="";var bb=root.querySelector(".cbk-bar");bb.innerHTML=bar();render();return}
  if(e.target.closest(".cbk-card a")){try{sessionStorage.setItem("cbk-y",String(scrollY))}catch(x){}}});
 var rt=0;addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(function(){brk(false)},150)});
 root.addEventListener("click",function(e){var t=e.target.closest("[data-add]");if(!t||t.disabled)return;var p=byPid[t.getAttribute("data-add")];if(!p)return;t.disabled=true;var tx=t.textContent;t.textContent="Colocando…";
  Promise.resolve(add(p)).then(function(){t.textContent="Na sacola ✓";setTimeout(function(){t.disabled=false;t.textContent=tx},2500)}).catch(function(){t.disabled=false;t.textContent=tx;toast('Não conseguimos adicionar. Tente de novo ou abra o produto.')})});
 if(CACHE){all=CACHE.p;draw()}
 if(FRESH)FRESH.then(function(p){if(p.length||!CACHE){all=p;draw()}}).catch(function(){if(!CACHE){all=[];draw()}});
 return true;
}
retry(mount,60,100);
})();

/* Chef Mais Leve: seletor de variacao com uma unica opcao (ex.: 01 KIT): oculta campo e titulo; a opcao segue selecionada (SKU, estoque e preco intactos) */
(function(){if(window.__cmlOne)return;window.__cmlOne=1;
function go(){var f=document.getElementById("product_form");if(!f)return document.readyState==="complete";var gs=[].slice.call(f.querySelectorAll(".js-product-variants-group"));if(!gs.length)return document.readyState!=="loading";var hid=0;
 gs.forEach(function(g){var s=g.querySelector("select"),n=s?s.options.length:g.querySelectorAll("[data-option]").length;if(n===1){g.style.display="none";hid++}});
 if(hid===gs.length){var v=f.querySelector(".js-product-variants");if(v)v.style.display="none"}return true}
var n=0;(function l(){var ok=false;try{ok=go()}catch(e){ok=true}if(!ok&&++n<40)setTimeout(l,150)})()})();

/* Chef Mais Leve: pagina Encontre seu cha (o visual do item de menu fica no CSS do Cabecalho) */
(function(){if(window.__cmlNav2)return;window.__cmlNav2=1;
if(/^\/encontre-seu-cha\/?$/.test(location.pathname)&&!document.getElementById("cml-finder-js")){var h=document.createElement("style");h.textContent="#ns-section-category_hero,#ns-section-product_list{display:none!important}";(document.head||document.documentElement).appendChild(h);var sc=document.createElement("script");sc.id="cml-finder-js";sc.async=true;sc.src="https://dzmlyrkzcdqicwfmxnxd.supabase.co/functions/v1/cml-finder";(document.head||document.documentElement).appendChild(sc)}
})();

/* Chef Mais Leve: Esquenta Black estendido ate 22/11 (31/10/2026). Corrige os textos fixos do tema (barra de anuncio, abertura da home, informativos) sem mexer no layout. */
(function(){if(window.__cmlEsq22)return;window.__cmlEsq22=1;
if(!document.getElementById("cml-esq22")){var s=document.createElement("style");s.id="cml-esq22";s.textContent='body.template-home .adbar:after{content:"Esquenta Black · Só até 22/11"!important}';(document.head||document.documentElement).appendChild(s)}
var RE=/(at[eé]\s+)20\/11|20\/11\/2026|20 de novembro/gi;
function fix(t){return t.replace(/20\/11\/2026/g,"22/11/2026").replace(/(at[eé]\s+)20\/11/gi,"$122/11").replace(/20 de novembro/gi,"22 de novembro")}
function walk(root){if(!root)return;var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),n,L=[];while(n=w.nextNode()){if(RE.test(n.nodeValue))L.push(n);RE.lastIndex=0}L.forEach(function(x){var p=x.parentNode;if(p&&/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName))return;var v=fix(x.nodeValue);if(v!==x.nodeValue)x.nodeValue=v})}
function run(){try{walk(document.body)}catch(e){}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run();
addEventListener("load",function(){run();setTimeout(run,1500)});
var q=0;try{new MutationObserver(function(){if(q)return;q=1;(window.__cxQ||(window.__cxQ=function(f,d){var n=performance.now(),g=window.__cxg||(window.__cxg={t:0,c:0});if(n-g.t>50){g.t=n;g.c=0}g.c++;if(g.c<12)Promise.resolve().then(f);else setTimeout(f,d)}))(function(){q=0;run()},120)}).observe(document.documentElement,{childList:true,subtree:true,characterData:true})}catch(e){}
})();

/* Chef Mais Leve: padrao visual do conteudo dos posts do blog (v1, 31/10/2026).
   Vale para todos os posts, atuais e futuros. Escreva o post no editor da Nuvemshop so com:
   paragrafos, subtitulos (h2), listas, italico e links. O visual vem daqui.
   Dica: no subtitulo, o trecho em italico vira a "metade suave" da assinatura (ex.: "Por que <em>cha</em>"). */
(function(){if(window.__cmlBlog)return;window.__cmlBlog=1;
if(!/(^|\s)template-blog-post(\s|$)/.test(document.body?document.body.className:"")&&!/^\/blog\/posts\//.test(location.pathname))return;
if(!document.getElementById("cml-blog-fonts")){var l=document.createElement("link");l.id="cml-blog-fonts";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Poppins:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap";document.head.appendChild(l)}
var GRAIN="url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")";
var P="html body.template-blog-post ";
var CSS=""
/* cabecalho do post */
+P+".page-header-title-inner{display:flex!important;flex-direction:column!important;align-items:center!important;max-width:820px;margin:0 auto;text-align:center}"
+P+".cml-bl-eb{display:block;margin:6px 0 12px;font:600 12px/1.2 Poppins,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#a65a14}"
+P+"h1.page-header-title{max-width:820px;margin:0 auto!important;text-align:center!important;font:700 clamp(30px,4.4vw,48px)/1.12 Poppins,sans-serif!important;letter-spacing:-.015em!important;color:#565229!important;text-wrap:balance}"
+P+"h1.page-header-title .cml-bl-soft{display:block;font-weight:300;font-style:italic}"
+P+".cml-bl-hand{display:block;margin:12px 0 0;font:600 30px/1 Caveat,'Bradley Hand',cursive;color:#a65a14;transform:rotate(-2deg)}"
+P+".breadcrumbs,"+P+".breadcrumb{text-align:center}"
/* cartao do artigo (papel com grao) */
+P+".blog-post-page{position:relative;isolation:isolate;max-width:860px;margin:18px auto 48px!important;padding:28px clamp(18px,5vw,64px) 44px!important;border-radius:40px;background-color:#f6efe9!important;background-image:radial-gradient(120% 90% at 30% 10%,#f6efe9 0%,#f6efe9 55%,#ede3d8 100%)!important;color:#2b2916!important;box-shadow:0 18px 40px -28px rgba(43,41,22,.55)}"
+P+".blog-post-page:after{content:'';position:absolute;inset:0;z-index:-1;border-radius:inherit;pointer-events:none;opacity:.07;mix-blend-mode:multiply;background-image:"+GRAIN+";background-size:220px}"
+P+".blog-post-page .post-date{margin:0 0 18px!important;text-align:center;font:500 12px/1.4 Poppins,sans-serif!important;letter-spacing:.08em;text-transform:uppercase;color:#6f6656!important}"
+P+".blog-post-page .cml-bl-rt{color:#a65a14}"
/* capa em moldura passe-partout */
+P+".blog-post-page img.post-content-image{display:block;width:100%!important;max-width:100%!important;height:auto!important;aspect-ratio:16/10;object-fit:cover;object-position:center 45%;margin:0 0 34px!important;padding:12px;background:#fff;border-radius:28px!important;box-shadow:0 18px 40px -28px rgba(43,41,22,.55);box-sizing:border-box}"
/* texto */
+P+".post-content{max-width:660px;margin:0 auto;font:400 17px/1.8 Poppins,sans-serif;color:#2b2916!important}"
+P+".post-content *{color:inherit}"
+P+".post-content>p:first-of-type{font-size:19px!important;line-height:1.7!important;color:#2b2916!important}"
+P+".post-content p{margin:0 0 18px!important;font-size:17px!important;line-height:1.8!important;color:#2b2916!important}"
+P+".post-content p:empty{display:none}"
+P+".post-content h1,"+P+".post-content h2,"+P+".post-content h3{position:relative;margin:40px 0 14px!important;padding-top:16px;font:700 24px/1.3 Poppins,sans-serif!important;letter-spacing:-.01em;color:#565229!important;text-transform:none!important;text-align:left!important}"
+P+".post-content h1:before,"+P+".post-content h2:before,"+P+".post-content h3:before{content:'';position:absolute;top:0;left:0;width:36px;height:3px;border-radius:3px;background:#d27e29}"
+P+".post-content>h1:first-child,"+P+".post-content>h2:first-child{margin-top:0!important}"
+P+".post-content h3{font-size:20px!important}"
+P+".post-content h1 em,"+P+".post-content h2 em,"+P+".post-content h3 em{font-weight:300;font-style:italic}"
+P+".post-content em{font-style:italic;color:#565229!important}"
+P+".post-content strong,"+P+".post-content b{font-weight:600;color:#2b2916!important}"
+P+".post-content a{color:#a65a14!important;font-weight:600;text-decoration:underline;text-decoration-thickness:1.5px;text-underline-offset:3px}"
+P+".post-content a:hover{color:#565229!important}"
+P+".post-content ul,"+P+".post-content ol{margin:0 0 22px!important;padding:18px 22px 18px 44px!important;border-radius:20px;background:linear-gradient(#fffaf5,#fffaf5);border:1px solid #e8ddd0}"
+P+".post-content li{margin:0 0 8px;padding-left:4px;font-size:17px!important;line-height:1.7!important;color:#2b2916!important}"
+P+".post-content li:last-child{margin-bottom:0}"
+P+".post-content ul li::marker{color:#d27e29}"
+P+".post-content ol li::marker{color:#a65a14;font-weight:700}"
+P+".post-content blockquote{margin:28px 0!important;padding:18px 24px!important;border:0!important;border-left:3px solid #a65a14!important;border-radius:0 20px 20px 0;background:linear-gradient(#fffaf5,#fffaf5);font:300 italic 20px/1.6 Poppins,sans-serif;color:#565229!important}"
/* fotos dentro do texto */
+P+".post-content img{display:block;max-width:100%!important;height:auto!important;margin:26px auto!important;padding:12px;background:#fff;border-radius:24px;box-shadow:0 18px 40px -28px rgba(43,41,22,.55);box-sizing:border-box}"
+P+".post-content p:has(>img:only-child){margin:0!important}"
/* fontes e referencias */
+P+".cml-bl-ref{margin:30px 0 0;padding:16px 20px;border-radius:20px;background:linear-gradient(#ede3d8,#ede3d8)}"
+P+".cml-bl-ref p,"+P+".cml-bl-ref li{font-size:13.5px!important;line-height:1.6!important;color:#6f6656!important}"
+P+".cml-bl-ref a{color:#6f6656!important;font-weight:500}"
/* encerramento: Da nossa casa para a sua */
+P+".cml-bl-cta{position:relative;isolation:isolate;overflow:hidden;margin:40px 0 8px;padding:26px 24px 24px;border-radius:28px;background-color:#565229;background-image:radial-gradient(110% 90% at 35% 25%,#565229 0%,#565229 45%,#403d1e 100%);color:#2b2916!important}"
+P+".cml-bl-cta:after{content:'';position:absolute;inset:0;z-index:-1;opacity:.16;mix-blend-mode:multiply;background-image:"+GRAIN+";background-size:220px;pointer-events:none}"
+P+".cml-bl-cta h1,"+P+".cml-bl-cta h2,"+P+".cml-bl-cta h3{margin:0 0 10px!important;padding:0!important;color:#2b2916!important;font-size:22px!important}"
+P+".cml-bl-cta h1:before,"+P+".cml-bl-cta h2:before,"+P+".cml-bl-cta h3:before{display:none}"
+P+".cml-bl-cta p,"+P+".cml-bl-cta li{color:#2b2916!important;font-size:16px!important;line-height:1.7!important}"
+P+".cml-bl-cta p:last-of-type{margin-bottom:0!important}"
+P+".cml-bl-cta a{color:#a65a14!important}"
+P+".cml-bl-cta .cml-bl-btn{box-sizing:border-box;max-width:100%;display:inline-flex;align-items:center;gap:8px;margin:16px 0 0;min-height:46px;padding:0 22px;border-radius:999px;background:#a65a14;color:#fff!important;font:600 15px/1 Poppins,sans-serif;text-decoration:none!important}"
+P+".cml-bl-cta .cml-bl-btn:hover{background:#8f4d10}"
/* assinatura */
+P+".cml-bl-sign{display:flex;align-items:center;justify-content:center;gap:12px;margin:34px 0 0;text-align:center}"
+P+".cml-bl-sign span{font:600 26px/1 Caveat,'Bradley Hand',cursive;color:#a65a14;transform:rotate(-2deg)}"
+P+".cml-bl-sign small{display:block;margin-top:6px;font:500 11px/1.3 Poppins,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#6f6656}"
/* tema Black ligado: cabecalho claro sobre o fundo escuro, cartao continua papel */
+"html.cml-blk body.template-blog-post .cml-bl-eb{color:#a65a14!important}"
+"html.cml-blk body.template-blog-post h1.page-header-title{color:#2b2916!important}"
+"html.cml-blk body.template-blog-post .cml-bl-hand{color:#a65a14!important}"
+"html.cml-blk body.template-blog-post .blog-post-page{box-shadow:0 30px 60px -30px rgba(43,41,22,.2),0 0 0 1px rgba(166,90,20,.25)}"
/* celular */
+"@media(max-width:640px){"+P+"#ns-section-blog_post_content>div{padding:0 8px!important}"+P+".page-header-title-inner{padding:0 8px}"+P+".blog-post-page{max-width:100%!important;margin:12px 0 32px!important;padding:16px 16px 28px!important;border-radius:24px}"
+P+".blog-post-page img.post-content-image{padding:8px;border-radius:20px!important;margin-bottom:24px!important;aspect-ratio:4/3}"
+P+".post-content{font-size:16px;line-height:1.75}"+P+".post-content p,"+P+".post-content li{font-size:16px!important}"+P+".post-content>p:first-of-type{font-size:17.5px!important}"
+P+".post-content h1,"+P+".post-content h2,"+P+".post-content h3{font-size:21px!important;margin-top:32px!important}"
+P+".post-content ul,"+P+".post-content ol{padding:14px 16px 14px 34px!important;border-radius:16px}"
+P+".post-content img{padding:8px;border-radius:18px}"
+P+".cml-bl-cta{padding:22px 18px 20px;border-radius:22px}"+P+".cml-bl-cta .cml-bl-btn{width:100%;justify-content:center}"
+P+".cml-bl-hand{font-size:26px}"+P+".cml-bl-eb{font-size:11px}}";
if(!document.getElementById("cml-blog-css")){var s=document.createElement("style");s.id="cml-blog-css";s.textContent=CSS;(document.head||document.documentElement).appendChild(s)}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function sentence(t){if(t!==t.toUpperCase())return t;var l=t.toLowerCase();return l.charAt(0).toUpperCase()+l.slice(1)}
function head(){var h=document.querySelector("h1.page-header-title");if(!h)return false;if(h.__cml)return true;h.__cml=1;
 var raw=(h.textContent||"").trim(),eb="Blog da Chef",main=raw,soft="",hand="";
 var m=raw.match(/^Bastidores da Chef\s*#?\s*(\d+)\s*[:\-–]\s*(.+)$/i);
 if(m){eb="Bastidores da Chef · Episódio "+(m[1].length<2?"0"+m[1]:m[1]);main=sentence(m[2]);hand="feito em família"}
 else{main=sentence(raw)}
 var i=main.indexOf(":");if(i>0){soft=main.slice(i+1).trim();main=main.slice(0,i).trim()}
 else{var w=main.split(" ");if(w.length>=4){var cut=Math.ceil(w.length/2);soft=w.slice(cut).join(" ");main=w.slice(0,cut).join(" ")}}
 h.innerHTML=esc(main)+(soft?' <span class="cml-bl-soft">'+esc(soft)+"</span>":"");
 var e=document.createElement("span");e.className="cml-bl-eb";e.textContent=eb;h.parentNode.insertBefore(e,h);
 if(hand){var hd=document.createElement("span");hd.className="cml-bl-hand";hd.textContent=hand;h.parentNode.insertBefore(hd,h.nextSibling)}
 return true}
function body(){var c=document.querySelector(".blog-post-page .post-content");if(!c)return false;if(c.__cml)return true;c.__cml=1;[].forEach.call(c.querySelectorAll("p"),function(p){if(!(p.textContent||"").trim()&&!p.querySelector("img,iframe,video"))p.remove()});
 /* tempo de leitura */
 var d=document.querySelector(".blog-post-page .post-date");if(d&&!d.querySelector(".cml-bl-rt")){var n=(c.textContent||"").trim().split(/\s+/).length,min=Math.max(1,Math.round(n/200));d.insertAdjacentHTML("beforeend",' · <span class="cml-bl-rt">Leitura de '+min+" min</span>")}
 /* titulo duplicado no inicio do texto vira subtitulo comum */
 /* bloco final "Da nossa casa para a sua" vira cartao oliva com botao */
 var hs=[].slice.call(c.querySelectorAll("h1,h2,h3")),end=null;
 hs.forEach(function(x){if(/nossa casa para a sua|da nossa cozinha|experimente|conhe[cç]a/i.test(x.textContent))end=x});
 if(end&&end.parentNode===c){var box=document.createElement("div");box.className="cml-bl-cta";c.insertBefore(box,end);var k=end;while(k){var nx=k.nextSibling;if(k.nodeType===1&&/^H[1-3]$/.test(k.tagName)&&k!==end)break;box.appendChild(k);k=nx}
  var prod=[].slice.call(box.querySelectorAll("a")).filter(function(a){return /\/produtos\/|\/chas\/|\/kits|\/snacks|\/ofertas/.test(a.getAttribute("href")||"")})[0];
  if(prod){var b=document.createElement("a");b.className="cml-bl-btn";b.href=prod.getAttribute("href");b.innerHTML="Conhecer o produto <span aria-hidden=\"true\">→</span>";box.appendChild(b)}
  else{var b2=document.createElement("a");b2.className="cml-bl-btn";b2.href="/chas/";b2.innerHTML="Ver nossos chás <span aria-hidden=\"true\">→</span>";box.appendChild(b2)}}
 /* paragrafos so com links externos de estudo viram bloco de fontes */
 [].forEach.call(c.querySelectorAll("p,ul"),function(p){if(p.closest(".cml-bl-cta"))return;var as=p.querySelectorAll("a");if(!as.length)return;var ext=[].every.call(as,function(a){var h=a.getAttribute("href")||"";return /^https?:/.test(h)&&h.indexOf("chefmaisleve")<0});var t=(p.textContent||"").trim();if(ext&&(/fonte|refer|estudo|pesquisa|leia mais|saiba mais/i.test(t)||p.tagName==="UL")){p.classList.add("cml-bl-ref")}});
 /* assinatura */
 if(!c.querySelector(".cml-bl-sign")){var sg=document.createElement("div");sg.className="cml-bl-sign";sg.innerHTML="<div><span>com carinho, Chef Mais Leve</span><small>Feito em família, em Santa Catarina</small></div>";c.appendChild(sg)}
 return true}
function clean(){var k=document.querySelector(".blog-post-page");if(!k)return;[].forEach.call(k.querySelectorAll("[style]"),function(x){if(x.style.getPropertyPriority("color")==="important")x.style.removeProperty("color");if(x.style.getPropertyPriority("background-color")==="important")x.style.removeProperty("background-color");if(x.style.getPropertyPriority("border-color")==="important")x.style.removeProperty("border-color")});if(!k.__cmlObs){k.__cmlObs=1;var q=0;try{new MutationObserver(function(){if(q)return;q=setTimeout(function(){q=0;clean()},60)}).observe(k,{attributes:true,attributeFilter:["style"],subtree:true})}catch(e){}}}
setTimeout(clean,300);addEventListener("load",function(){clean();setTimeout(clean,1700);setTimeout(clean,4800)});
var n=0;(function l(){var a=false,b=false;try{a=head();b=body()}catch(e){a=b=true}if(!(a&&b)&&++n<60)setTimeout(l,120)})();
})();

/* Chef Mais Leve: no celular, o botao flutuante do WhatsApp some enquanto a barra do pedido do Montador de Presentes estiver na tela (evita cobrir o botao principal). 31/10/2026 */
(function(){if(window.__cmlWaNatal)return;window.__cmlWaNatal=1;if(document.getElementById("cml-wa-natal"))return;var s=document.createElement("style");s.id="cml-wa-natal";s.textContent="@media(max-width:767px){body:has(.cmn-meter) a.btn-whatsapp,body:has(.cmn-meter) .js-btn-fixed-bottom.btn-whatsapp,body:has(.cmn-meter) [class*=btn-whatsapp]{display:none!important}}";(document.head||document.documentElement).appendChild(s)})();


/* Chef Mais Leve: SITE PREMIUM ETAPA 1 (01/11/2026). Barrinha unica (Presente, Compra rapida, WhatsApp), topo fino, abertura da Black em tela cheia, faixa de beneficios, bloco do Natal com atalhos e menu. Para desfazer: apague este bloco inteiro (do comentario ate o fim). */
(function(){if(window.__cmlE1)return;window.__cmlE1=1;
var D=document,P=location.pathname,HOME=function(){return D.body&&D.body.classList.contains("template-home")},PROD=function(){return D.body&&D.body.classList.contains("template-product")},NATAL=/^\/presentes-de-natal/.test(P);
var WA="https://wa.me/554791571974";
var IC={
gift:'<svg class="c1-ico" viewBox="0 0 32 32" aria-hidden="true"><rect class="f" x="5.5" y="14" width="21" height="13" rx="1.5"/><rect x="4" y="10" width="24" height="4.2" rx="1.2"/><path d="M16 10v17M11.5 10c-3-.4-4.6-2-3.8-3.7.9-1.9 4.6-.6 8.3 3.7 3.7-4.3 7.4-5.6 8.3-3.7.8 1.7-.8 3.3-3.8 3.7"/></svg>',
bag:'<svg class="c1-ico" viewBox="0 0 32 32" aria-hidden="true"><path class="f" d="M6.5 11h19l-1.3 15.3a1.8 1.8 0 0 1-1.8 1.7H9.6a1.8 1.8 0 0 1-1.8-1.7z"/><path d="M11.5 11V9a4.5 4.5 0 0 1 9 0v2M17 15l-3 5h4l-3 5"/></svg>',
wa:'<svg class="c1-waic" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>',
truck:'<svg class="c1-ico" viewBox="0 0 32 32" aria-hidden="true"><path class="f" d="M3 9.5h15v13H3z"/><path d="M3 9.5h15v13H3zM18 13h5.2l4.3 5v4.5H18"/><path d="M19.5 14.5h3.2l2.6 3.2h-5.8z"/><circle class="f" cx="8" cy="23.5" r="2.6"/><circle cx="8" cy="23.5" r=".8"/><circle class="f" cx="22.5" cy="23.5" r="2.6"/><circle cx="22.5" cy="23.5" r=".8"/><path d="M5.5 13h7M5.5 15.8h4.5"/></svg>',
card:'<svg class="c1-ico" viewBox="0 0 32 32" aria-hidden="true"><rect class="f" x="3.5" y="7.5" width="25" height="17" rx="2.8"/><path d="M3.5 11.5h25"/><rect x="7" y="15" width="5" height="4" rx=".8"/><path d="M9.5 15v4M7 17h5M16 20.5h4M21.5 20.5h3"/></svg>',
coins:'<svg class="c1-ico" viewBox="0 0 32 32" aria-hidden="true"><ellipse class="f" cx="13" cy="21.5" rx="8" ry="3"/><path d="M5 21.5v3c0 1.7 3.6 3 8 3s8-1.3 8-3v-3"/><ellipse class="f" cx="19" cy="10" rx="8" ry="3"/><path d="M11 10v3.2c0 1.7 3.6 3 8 3s8-1.3 8-3V10M27 13.2v3.3c0 1.4-2.4 2.6-5.8 2.9"/><path d="M17.5 9.2h3"/></svg>',
tag:'<svg class="c1-ico" viewBox="0 0 32 32" aria-hidden="true"><path class="f" d="M4.5 16.2V6.8a2.3 2.3 0 0 1 2.3-2.3h9.4l11.3 11.3a2.3 2.3 0 0 1 0 3.2l-8.4 8.4a2.3 2.3 0 0 1-3.2 0z"/><circle cx="10.5" cy="10.5" r="2"/><path d="M14 17.5l4.5 4.5M16.5 15l4.5 4.5"/></svg>',
cup:'<svg class="c1-ico" viewBox="0 0 32 32" aria-hidden="true"><path class="f" d="M6 12.5h16v6.5a6.5 6.5 0 0 1-6.5 6.5h-3A6.5 6.5 0 0 1 6 19z"/><path d="M22 14.5h1.8a3 3 0 0 1 0 6H21.5M4 27.5h20M11 4.5c-.8 1.4.8 2.6 0 4M15 4.5c-.8 1.4.8 2.6 0 4"/></svg>',
user:'<svg class="c1-ico" viewBox="0 0 32 32" aria-hidden="true"><circle class="f" cx="16" cy="11.5" r="5"/><path class="f" d="M6 27c.6-5.2 4.9-8.5 10-8.5s9.4 3.3 10 8.5"/></svg>',
box:'<svg class="c1-ico" viewBox="0 0 32 32" aria-hidden="true"><path class="f" d="M16 4.5l10.5 5.5v12L16 27.5 5.5 22V10z"/><path d="M5.5 10L16 15.5 26.5 10M16 15.5v12M10.8 7.2l10.4 5.6v4.4"/></svg>'};
var TERNURA="https://acdn-us.mitiendanube.com/stores/005/060/752/products/kit_ambientada_fundo_desfocado_1250x1250-bd97ae38c83eef5af917939007214522-1024-1024.webp";
var G="#a65a14",GL="#a65a14",K="#f6efe9";
var CSS=[
'.c1-ico{fill:none;stroke:'+G+';stroke-width:1.25;stroke-linecap:round;stroke-linejoin:round}.c1-ico .f{fill:rgba(166,90,20,.1)}',
'html body .adbar{min-height:0!important;height:auto!important;padding-top:8px!important;padding-bottom:8px!important;}',
'html body .adbar,html body .adbar *,html body .adbar:after,html body.template-home .adbar:after{font-family:Poppins,system-ui,sans-serif!important;font-weight:300!important;font-size:10px!important;line-height:1.2!important;letter-spacing:.3em!important;text-transform:uppercase!important}',
'html body .adbar:after,html body.template-home .adbar:after{padding:0!important;height:auto!important;min-height:0!important;margin:0!important}',
'html.cml-blk body .js-head-main{}',
'@media(max-width:767px){html body .js-head-main .header-account,html body .js-head-main a.header-icon[href*="/account"]{display:none!important}}',
'html body #cml-bko{min-height:max(460px,calc(100svh - var(--c1top,120px)))!important;padding:28px 22px 30px!important;box-sizing:border-box}',
'html body #cml-bko .c1-in{display:flex;flex-direction:column;align-items:center;max-width:100%;text-align:center}',
'html body #cml-bko .c1-ed{margin:0 0 14px!important;font:500 9.5px/1 Poppins,sans-serif!important;letter-spacing:.34em!important;text-indent:.34em;text-transform:uppercase;color:rgba(246,239,233,.62)!important}',
'html body #cml-bko .c1-hand{display:block;margin:0 0 10px;font:200 22px/1 Poppins,sans-serif!important;letter-spacing:.62em!important;text-indent:.62em;text-transform:uppercase;color:#dfae58!important;white-space:nowrap}',
'html body #cml-bko h2.c1-blk{font-size:clamp(84px,24vw,190px)!important;line-height:.86!important}',
'html body #cml-bko .c1-lin{margin:18px auto 0!important;max-width:320px;font:300 16px/1.45 Poppins,sans-serif!important;color:#f6efe9!important}',
'html body #cml-bko .c1-lin em{font-style:italic;font-weight:300;color:#f3d48b!important}',
'html body #cml-bko .c1-dt{display:flex;align-items:center;justify-content:center;gap:10px;margin:16px 0 0;font:300 10.5px/1 Poppins,sans-serif!important;letter-spacing:.32em!important;text-transform:uppercase;color:#dfae58!important}',
'html body #cml-bko .c1-dt span{display:block;width:30px;height:1px;background:rgba(223,174,88,.6)}',
'html body #cml-bko .c1-cue{display:block;width:1px;height:26px;margin:18px auto 0;background:linear-gradient(rgba(223,174,88,.8),rgba(223,174,88,0))}',
'@media(min-width:768px){html body #cml-bko .c1-ed{font-size:11px!important;margin-bottom:18px!important}html body #cml-bko .c1-hand{font-size:30px!important;margin-bottom:14px}html body #cml-bko .c1-lin{max-width:none;margin-top:24px!important;font-size:21px!important}html body #cml-bko .c1-dt{margin-top:20px;font-size:11.5px!important;gap:12px}html body #cml-bko .c1-dt span{width:40px}}',
'html body.template-home #ns-section-icon_text>.section-full-width{display:none!important}',
'html body.template-home #ns-section-icon_text{padding:18px 0 8px!important;background:'+K+'!important}',
'.c1-home{box-sizing:border-box;max-width:1200px;margin:0 auto;padding:0 12px;font-family:Poppins,system-ui,sans-serif}',
'.c1-home *{box-sizing:border-box}',
'.c1-ben{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));padding:14px 0;border-top:1px solid rgba(166,90,20,.22);border-bottom:1px solid rgba(166,90,20,.22)}',
'.c1-ben>*{display:flex;flex-direction:column;align-items:center;gap:6px;padding:0 4px;text-align:center;text-decoration:none!important;color:#2b2916!important}',
'.c1-ben>*+*{border-left:1px solid rgba(166,90,20,.18)}',
'.c1-ben .c1-ico{width:30px;height:30px;flex:none}',
'.c1-ben b{display:block;font:500 12.5px/1.2 Poppins,sans-serif;color:#2b2916!important;white-space:nowrap}',
'.c1-ben small{display:block;margin-top:2px;font:300 11px/1.3 Poppins,sans-serif;color:rgba(43,41,22,.6)!important}',
'.c1-sc{display:grid;gap:12px;padding:22px 0 6px}',
'.c1-feat{position:relative;overflow:hidden;display:block;padding:20px 18px 18px;border-radius:24px;color:#fff!important;text-decoration:none!important;background:radial-gradient(110% 90% at 20% 15%,#7a2232 0%,#5c1823 50%,#3e0f17 100%);border:1px solid rgba(166,90,20,.4)}',
'.c1-feat:after{content:"";position:absolute;right:-30px;top:-30px;width:140px;height:140px;border-radius:50%;border:1px solid rgba(166,90,20,.35);pointer-events:none}',
'.c1-feat img{display:none}',
'.c1-feat .t{display:block;font:500 10.5px/1 Poppins,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#a65a14!important}',
'.c1-feat h3{margin:10px 0 0!important;font:700 22px/1.15 Poppins,sans-serif!important;letter-spacing:0!important;text-transform:none!important;color:#2b2916!important}',
'.c1-feat h3 em{font-weight:300;font-style:italic;color:#a65a14!important}',
'.c1-feat p{display:none}',
'.c1-feat .go{display:inline-flex;align-items:center;gap:8px;margin:14px 0 0;min-height:40px;padding:0 18px;border-radius:999px;background:#a65a14;color:'+K+'!important;font:600 13.5px/1 Poppins,sans-serif}',
'.c1-rows{border-radius:24px;background:#f6efe9;border:1px solid rgba(166,90,20,.18);overflow:hidden}',
'.c1-rows a{display:flex;align-items:center;gap:14px;padding:15px 16px 15px 18px;text-decoration:none!important}',
'.c1-rows a+a{border-top:1px solid rgba(166,90,20,.14)}',
'.c1-rows .tx{flex:1;min-width:0}',
'.c1-rows .tt{display:block;font:500 10px/1 Poppins,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#a65a14!important}',
'.c1-rows .ti{display:block;margin:6px 0 0;font:600 16.5px/1.25 Poppins,sans-serif;color:#2b2916!important}',
'.c1-rows .ti em{font-weight:300;font-style:italic;color:#a65a14!important}',
'.c1-rows .ar{flex:none;font-size:20px;line-height:1;color:#a65a14!important}',
'.c1-rows .c1-dk{display:none}',
'@media(min-width:768px){.c1-home{padding:0 32px}.c1-ben>*{flex-direction:row;justify-content:center;gap:12px;padding:18px;text-align:left}.c1-ben{padding:0}.c1-ben b{font-size:14px}.c1-ben small{font-size:12px}',
'.c1-sc{grid-template-columns:1.6fr 1fr;gap:20px;padding:36px 0 18px}',
'.c1-feat{display:grid;grid-template-columns:1fr 1.1fr;padding:0;border-radius:28px}.c1-feat:after{display:none}.c1-feat img{display:block;width:100%;height:100%;min-height:300px;object-fit:cover}',
'.c1-feat .bd{display:flex;flex-direction:column;justify-content:center;padding:32px 30px}.c1-feat h3{font-size:32px!important;line-height:1.1!important}.c1-feat h3 em{display:block}.c1-feat p{display:block;margin:12px 0 0;font:300 13.5px/1.5 Poppins,sans-serif;color:rgba(43,41,22,.85)!important}.c1-feat .go{align-self:flex-start;margin-top:20px;min-height:44px;padding:0 22px;font-size:14px}',
'.c1-rows{display:flex;flex-direction:column;justify-content:center;border-radius:0;background:transparent;border:0;border-top:1px solid rgba(166,90,20,.3)}.c1-rows a{padding:22px 6px;border-bottom:1px solid rgba(166,90,20,.3)}.c1-rows a+a{border-top:0}.c1-rows .ti{margin-top:8px;font-size:20px}.c1-rows .c1-dk{display:flex}}',
'html body #cml-gb,html body #cml-qb .t,html body a.btn-whatsapp,html body a.btn-whatsapp.cml-wa,html body .js-btn-fixed-bottom.btn-whatsapp{display:none!important}',
'.c1-dock{position:fixed;z-index:9990;right:12px;bottom:calc(14px + env(safe-area-inset-bottom,0px));display:flex;gap:2px;padding:5px;border-radius:999px;background:rgba(255,250,245,.94);border:1px solid rgba(166,90,20,.45);box-shadow:0 14px 28px -12px rgba(43,41,22,.2);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);font-family:Poppins,system-ui,sans-serif;transition:transform .35s ease,opacity .3s ease}',
'.c1-dock.off{opacity:0;transform:translateY(calc(100% + 24px));pointer-events:none}',
'.c1-dock>*{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;min-width:62px;height:52px;margin:0;padding:0 8px;border:0;border-radius:999px;background:transparent;color:#2b2916!important;text-decoration:none!important;cursor:pointer;-webkit-tap-highlight-color:transparent}',
'.c1-dock>[hidden]{display:none!important}',
'.c1-dock>.dn{background:transparent}',
'.c1-dock .c1-ico{width:24px;height:24px}',
'.c1-dock .c1-waic{width:21px;height:21px;fill:'+GL+'}',
'.c1-dock .lb{font:300 9px/1 Poppins,sans-serif;letter-spacing:.02em;color:rgba(43,41,22,.88)!important;white-space:nowrap}',
'.c1-dock>*:focus-visible{outline:2px solid '+G+';outline-offset:2px}',
'@media(hover:hover){.c1-dock>*:not(.dn):hover{background:rgba(166,90,20,.12)}}',
'@media(min-width:768px){.c1-dock{right:24px;bottom:24px;gap:4px}.c1-dock>*{flex-direction:row;width:auto;height:40px;gap:8px;padding:0 16px 0 12px}.c1-dock .c1-ico{width:22px;height:22px}.c1-dock .c1-waic{width:19px;height:19px}.c1-dock .lb{font-size:12px}}',
'@media(max-width:767px){body:has(.cmn-meter) .c1-dock{display:none!important}}',
'@media(prefers-reduced-motion:reduce){.c1-dock{transition:none}}',
'html body #nav-hamburger .modal-header .c1-mlogo{position:absolute;left:16px;top:50%;width:132px!important;height:auto!important;max-width:none!important;max-height:none!important;transform:translateY(-50%);filter:brightness(0) invert(1)}',
'html body #nav-hamburger>.modal-header{position:relative}',
'html body #nav-hamburger .nav-list>.nav-item>.nav-list-link,html body .nav-hamburger-body .nav-list-link,html body .nav-hamburger-body a.nav-list-link,html body .nav-hamburger-body button.nav-list-link{display:flex!important;justify-content:space-between!important;align-items:center!important;margin:0!important;padding:15px 4px!important;min-height:0!important;border:0!important;border-bottom:1px solid rgba(43,41,22,.08)!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;font:300 16px/1.1 Poppins,sans-serif!important;letter-spacing:.01em!important;text-transform:none!important;color:#2b2916!important}',
'html body #nav-hamburger .nav-list>.nav-item{margin:0!important;padding:0!important;border:0!important}',
'html body #nav-hamburger .nav-list>.nav-item>.nav-list-link .nav-list-arrow,html body #nav-hamburger .nav-list>.nav-item>.nav-list-link .nav-list-arrow *,html body .nav-hamburger-body .nav-list-arrow,html body .nav-hamburger-body .nav-list-arrow *{color:#a65a14!important;fill:'+G+'!important;stroke:'+G+'!important}',
'html body #nav-hamburger .nav-list>.nav-item.c1-camp{display:none!important}',
'html body #nav-hamburger .nav-list:before,html body #nav-hamburger .nav-list:after,html body #nav-hamburger .nav-list>.nav-item:before,html body #nav-hamburger .nav-list>.nav-item:after,html body #nav-hamburger .nav-list>.nav-item>.nav-list-link:before{display:none!important;content:none!important}',
'html body #nav-hamburger>.modal-footer{display:none!important}',
'html body .nav-hamburger-body .nav-list-link[href]{font-size:15px!important}html body .nav-hamburger-body .nav-item{margin:0!important;padding:0 16px!important;border:0!important}',
'html body [id^=nav-panel-id] .modal-title{font:600 16px/1.2 Poppins,sans-serif!important;letter-spacing:0!important;text-transform:none!important;color:#2b2916!important}',
'.c1-mn{padding:0 0 18px;font-family:Poppins,system-ui,sans-serif}',
'.c1-mn .k{margin:22px 4px 10px;font:500 10px/1 Poppins,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#a65a14}',
'.c1-mn .c{display:grid;gap:10px}',
'html body #nav-hamburger .c1-mn .c a{display:flex!important;align-items:center!important;gap:12px!important;margin:0!important;padding:12px 14px!important;border-radius:16px!important;border:1px solid rgba(166,90,20,.25)!important;color:#2b2916!important;font:400 14.5px/1.2 Poppins,sans-serif!important;letter-spacing:0!important;text-transform:none!important;text-decoration:none!important;background:transparent!important;box-shadow:none!important}html body #nav-hamburger .c1-mn a::before,html body #nav-hamburger .c1-mn a::after{display:none!important;content:none!important}',
'html body #nav-hamburger .c1-mn .c a small{display:block!important;margin-top:3px!important;font:300 11.5px/1.2 Poppins,sans-serif!important;letter-spacing:0!important;text-transform:none!important;color:rgba(43,41,22,.6)!important}',
'.c1-mn .c a .c1-ico{flex:none;width:28px;height:28px}',
'html body #nav-hamburger .c1-mn .c a.nat{background:radial-gradient(110% 90% at 20% 15%,#5b5730,#403d1e)!important;border-color:transparent!important;color:#f6efe9!important}',
'html body #nav-hamburger .c1-mn .acc a{display:flex!important;align-items:center!important;gap:12px!important;margin:0!important;padding:14px 4px!important;border:0!important;border-bottom:1px solid rgba(43,41,22,.08)!important;border-radius:0!important;background:transparent!important;font:300 16px/1.1 Poppins,sans-serif!important;letter-spacing:.01em!important;text-transform:none!important;color:#2b2916!important;text-decoration:none!important}',
'.c1-mn .acc a .c1-ico{flex:none;width:24px;height:24px}.c1-mn .acc a i{margin-left:auto;font-style:normal;color:#a65a14}',
'@media(min-width:768px){html body .js-nav-desktop-list>li>a,html body .js-nav-desktop-list>li>div>a{font:300 13px/36px Poppins,sans-serif!important;letter-spacing:.01em!important;text-transform:none!important;background:transparent!important;border:0!important;box-shadow:none!important;color:#2b2916!important}',
'html body .js-nav-desktop-list>li>a::before{display:none!important;content:none!important}',
'html body .js-nav-desktop-list>li:has(>a[href*="encontre-seu"]){position:relative;margin-left:14px!important;padding-left:14px!important}html body .js-nav-desktop-list>li:has(>a[href*="encontre-seu"]):before{content:"";position:absolute;left:0;top:50%;width:1px;height:16px;margin-top:-8px;}',
'html body .js-nav-desktop-list>li>a[href$="ofertas/"]{}',
'html body .js-nav-desktop-list>li>a[href*="presentes-de"]{display:inline-flex!important;align-items:center!important;height:32px!important;line-height:32px!important;padding:0 14px!important;border-radius:999px!important;;;font-weight:400!important;}',
'html body .desktop-dropdown a,html body .nav-dropdown-content a{font-family:Poppins,sans-serif!important;font-weight:300!important;font-size:14px!important;letter-spacing:.01em!important;text-transform:none!important}',
'html body .desktop-dropdown .nav-list-link-heading,html body .nav-dropdown-content .nav-list-link-heading{font-weight:500!important;font-size:11px!important;letter-spacing:.18em!important;text-transform:uppercase!important;color:#a65a14!important}}'
].join("\n");
function css(){if(D.getElementById("c1-css"))return;var s=D.createElement("style");s.id="c1-css";s.textContent=CSS;(D.head||D.documentElement).appendChild(s);
 if(!D.getElementById("c1-fonts")){var l=D.createElement("link");l.id="c1-fonts";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,300&display=swap";(D.head||D.documentElement).appendChild(l)}}
css();
function hero(){var b=D.getElementById("cml-bko");if(!b)return!!(D.body&&!HOME()&&D.readyState!=="loading");var i=b.querySelector(".in");if(!i)return false;
 if(!i.classList.contains("c1-in")){i.classList.add("c1-in");var h=i.querySelector("h2"),cls=h?h.className:"esq-gold esq-heat";i.innerHTML='<p class="c1-ed">edição 2026</p><span class="c1-hand">esquenta</span><h2 class="'+cls+' c1-blk">Black</h2><p class="c1-lin">Preço de Black, <em>cuidado de sempre.</em></p><div class="c1-dt"><span></span>só até 22/11<span></span></div><i class="c1-cue" aria-hidden="true"></i>';b.setAttribute("aria-label","Esquenta Black, edição 2026. Preço de Black, cuidado de sempre. Só até 22/11.")}
 top();return true}
function top(){var b=D.getElementById("cml-bko");if(!b)return;var t=Math.round(b.getBoundingClientRect().top+(window.scrollY||0));if(t>0&&t<400)b.style.setProperty("--c1top",t+"px")}
function home(){if(!HOME())return true;var s=D.getElementById("ns-section-icon_text");if(!s)return D.readyState!=="loading";if(s.querySelector(".c1-home"))return true;
 var w=D.createElement("div");w.className="c1-home";
 w.innerHTML='<div class="c1-ben"><a href="#frete" class="c7-fr" role="button">'+IC.truck+'<span><b>Frete grátis</b><small>consulte sua região</small></span></a><div>'+IC.card+'<span><b>Até 5x</b><small>ou 5% off no Pix</small></span></div><a href="/politica-de-cashback/">'+IC.coins+'<span><b>5% de volta</b><small>em cashback</small></span></a></div>'
 +'<div class="c1-sc"><a class="c1-feat" href="/presentes-de-natal/"><img src="'+TERNURA+'" alt="Caixa de presente Chef Mais Leve" loading="lazy" decoding="async"><span class="bd"><span class="t">Natal · feito à mão</span><h3>Monte o presente <em>de quem você ama</em></h3><p>Caixa, itens e cartão escrito à mão. Validade com folga para o Natal.</p><span class="go">Montar presente <span aria-hidden="true">→</span></span></span></a>'
 +'<div class="c1-rows"><a href="/ofertas/"><span class="tx"><span class="tt">Até 22/11</span><span class="ti">Esquenta Black, <em>preços de Black</em></span></span><span class="ar" aria-hidden="true">→</span></a><a href="/encontre-seu-cha/"><span class="tx"><span class="tt">Em 1 minuto</span><span class="ti">Encontre <em>o seu chá</em></span></span><span class="ar" aria-hidden="true">→</span></a><a class="c1-dk" href="/kits-presentes/"><span class="tx"><span class="tt">Pronto para presentear</span><span class="ti">Kits <em>com caixa inclusa</em></span></span><span class="ar" aria-hidden="true">→</span></a></div></div>';
 s.appendChild(w);return true}
var dock=null;
function waHref(){var a=D.querySelector("a.btn-whatsapp[href*='wa.me'],a.btn-whatsapp[href*='whatsapp']");return a?a.getAttribute("href"):WA}
function mkDock(){if(dock||!D.body)return!!dock;if(PROD())return true;
 dock=D.createElement("nav");dock.className="c1-dock off";dock.setAttribute("aria-label","Atalhos");
 var h="";if(!NATAL)h+='<a class="dn" href="/account/" aria-label="Rastrear pedido"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/></svg><span class="lb">Rastrear pedido</span></a>';
 if(!NATAL)h+='<button type="button" class="qb" aria-label="Compra rápida">'+IC.bag+'<span class="lb">Compra rápida</span></button>';
 h+='<a class="wa" href="'+waHref()+'" target="_blank" rel="noopener noreferrer" aria-label="Fale com a gente no WhatsApp">'+IC.wa+'<span class="lb">WhatsApp</span></a>';
 dock.innerHTML=h;D.body.appendChild(dock);
 var q=dock.querySelector(".qb");if(q)q.addEventListener("click",function(){var t=D.querySelector("#cml-qb .t");if(t)t.click();else location.href="/ofertas/"});
 setTimeout(function(){var w=dock.querySelector(".wa");if(w)w.setAttribute("href",waHref())},2500);
 sync();return true}
var tm=0,moving=false;
function sync(){if(!dock)return;var q=dock.querySelector(".qb");if(q)q.hidden=!D.getElementById("cml-qb");
 var hide=false;dock.classList.toggle("off",hide)}
addEventListener("scroll",function(){if(!dock)return;if(!moving){moving=true;sync()}clearTimeout(tm);tm=setTimeout(function(){moving=false;sync()},650)},{passive:true});
addEventListener("resize",function(){top();sync()});
function logged(){return/customer-logged-in/.test(D.body.className)}
function menu(){var h=D.getElementById("nav-hamburger");if(!h)return D.readyState!=="loading";var l=h.querySelector(".modal-body>.nav-list");if(!l)return false;
 var hd=h.querySelector(":scope>.modal-header");if(hd&&!hd.querySelector(".c1-mlogo")){var lg=D.querySelector(".js-head-main .logo-img");if(lg){var im=D.createElement("img");im.className="c1-mlogo";im.alt="Chef Mais Leve";im.src=lg.currentSrc||lg.src;hd.insertBefore(im,hd.firstChild)}}
 if(l.parentNode.querySelector(".c1-mn"))return true;
 [].forEach.call(l.querySelectorAll(":scope>.nav-item"),function(it){var a=it.querySelector(":scope>a.nav-list-link");if(a&&/encontre-seu|ofertas|presentes-de/.test(a.getAttribute("href")||""))it.classList.add("c1-camp")});
 var acc=logged()?"/account/info/":"/account/login/";
 var m=D.createElement("div");m.className="c1-mn";
 m.innerHTML='<p class="k">Para você agora</p><div class="c"><a class="nat" href="/presentes-de-natal/">'+IC.gift+'<span>Monte seu presente<small>Família e empresas</small></span></a><a href="/ofertas/">'+IC.tag+'<span>Esquenta Black<small>Preços de Black até 22/11</small></span></a><a href="/encontre-seu-cha/">'+IC.cup+'<span>Encontre seu chá<small>Em 1 minuto</small></span></a></div>'
 +'<p class="k">Sua conta</p><div class="acc"><a href="'+acc+'">'+IC.user+'Minha conta <i aria-hidden="true">›</i></a><a href="/rastrear/">'+IC.box+'Rastrear pedido <i aria-hidden="true">›</i></a></div>';
 l.parentNode.insertBefore(m,l.nextSibling);return true}
function all(){var a=true;[hero,home,mkDock,menu].forEach(function(f){try{if(!f())a=false}catch(e){}});return a}
var n=0;(function loop(){if(!all()&&++n<60)setTimeout(loop,150)})();
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",all);
addEventListener("load",function(){all();top();sync()});
})();


/* Chef Mais Leve: SITE PREMIUM ETAPA 2 (01/11/2026). Card padrao (sobretitulo, avaliacao na moldura propria, preco dourado, cashback em uma linha, Comprar dourado, selo dourado), ranking dos mais pedidos (funcao cml-rank), categorias (titulo em texto, pilulas, chips, lateral no computador) e pagina Ofertas. Para desfazer: apague este bloco inteiro. */
(function(){if(window.__cmlE2)return;window.__cmlE2=1;
var D=document,G="#a65a14",GL="#a65a14",K="#f6efe9",P=location.pathname.replace(/\/page\/\d+\/?$/,"/");if(P.slice(-1)!=="/")P+="/";
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function brl(v){return"R$ "+Number(v).toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".")}
var B='html.cml-blk body ';
var CSS=[
B+'.js-item-product.js-item-product.product-item{background:#fffaf5!important;border:1px solid rgba(166,90,20,.16)!important;border-radius:20px!important;box-shadow:none!important;overflow:hidden!important;padding:0!important}',
B+'.js-item-product.js-item-product.product-item:hover{border-color:rgba(166,90,20,.4)!important;box-shadow:none!important;transform:none!important}',
B+'.js-item-product .product-item-image-container{position:relative!important;margin:8px 8px 0!important;border-radius:14px!important;overflow:hidden!important;background:#f6efe9!important}',
B+'.js-item-product .product-item-image-container img{border-radius:0!important}',
B+'.js-item-product .product-item-slider-pagination-container,'+B+'.js-item-product .product-item-slider-pagination,'+B+'.js-item-product .cml-bs,'+B+'.js-item-product .product-item-discount,'+B+'.js-item-product .js-shipping-label-private,'+B+'.js-item-product .c2-hide{display:none!important}',
B+'.js-item-product .product-item-information{padding:6px 12px 12px!important;text-align:left!important}',
B+'.js-item-product .product-item-link{display:flex!important;flex-direction:column!important;text-decoration:none!important}',
B+'.js-item-product .c2-ey{order:-2;margin:4px 0 4px!important;font:500 9px/1.2 Poppins,sans-serif!important;letter-spacing:.18em!important;text-transform:uppercase!important;color:#a65a14!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
B+'.js-item-product .product-item-name{order:-1;margin:0!important;min-height:2.6em;font:400 13.5px/1.3 Poppins,sans-serif!important;letter-spacing:0!important;text-transform:none!important;color:#2b2916!important;display:-webkit-box!important;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
B+'.js-item-product .c2-rt{display:flex;align-items:center;gap:5px;height:16px;margin:6px 0 0;font:300 11px/16px Poppins,sans-serif;color:rgba(43,41,22,.8)!important}',
B+'.js-item-product .c2-rt i{font-style:normal;color:#a65a14!important;font-size:11px}',
B+'.js-item-product .c2-rt em{font-style:normal;color:rgba(43,41,22,.5)!important}',
B+'.js-item-product .c2-rt.z{color:rgba(43,41,22,.42)!important;font-size:10.5px}',
B+'.js-item-product .product-item-price-container{display:flex!important;flex-wrap:wrap!important;align-items:baseline!important;gap:2px 7px!important;margin:7px 0 0!important;min-height:0!important}',
B+'.js-item-product .product-item-price-container .js-price-display,'+B+'.js-item-product .product-item-price:not(.product-item-price-compare){order:0!important;margin:0!important;font:700 18px/1.1 Poppins,sans-serif!important;letter-spacing:-.01em!important;color:#a65a14!important}',
B+'.js-item-product .product-item-price-compare{order:1!important;margin:0!important;font:300 11.5px/1 Poppins,sans-serif!important;color:rgba(43,41,22,.45)!important;text-decoration:line-through!important}',
B+'.js-item-product .c2-cb{display:block;margin:5px 0 0;font:300 11px/1.3 Poppins,sans-serif;color:rgba(166,90,20,.85)!important}',
B+'.js-item-product .c2-cb b{font-weight:500;color:#a65a14!important}',
B+'.js-item-product input.js-addtocart.btn,'+B+'.js-item-product input.btn-primary,'+B+'.js-item-product .cml-kbuy.btn,'+B+'.js-item-product .item-actions a.btn,'+B+'.js-item-product a.btn.btn-primary,'+B+'.js-item-product .js-quickshop-modal-open.btn{display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;min-height:40px!important;height:40px!important;margin:10px 0 0!important;padding:0 12px!important;border-radius:999px!important;border:0!important;background:#a65a14!important;color:'+K+'!important;font:600 13.5px/1 Poppins,sans-serif!important;letter-spacing:0!important;text-transform:none!important;box-shadow:none!important}',
B+'.js-item-product .js-addtocart.btn:hover,'+B+'.js-item-product input.btn-primary:hover,'+B+'.js-item-product .cml-kbuy.btn:hover,'+B+'.js-item-product .js-quickshop-modal-open.btn:hover{background:'+GL+'!important;color:'+K+'!important}',
B+'.js-item-product .js-addtocart-placeholder{background:#a65a14!important;color:'+K+'!important;border:0!important;border-radius:999px!important;min-height:40px!important;margin-top:10px!important}',
'html body .adbar .adbar-marquee,html body .adbar .js-adbar-marquee{display:none!important}',
'html body:not(.template-home) .adbar:after{content:"Esquenta Black · Só até 22/11";display:block;padding:0;text-align:center;}',
B+'.js-item-product.c2-oos .js-addtocart.btn,'+B+'.js-item-product.c2-oos .btn{background:transparent!important;border:1px solid '+G+'!important;color:#a65a14!important}',
B+'.js-item-product .js-item-submit-container{margin:0!important;padding:0!important}',
B+'.js-item-product .c2-off{position:absolute;right:8px;top:8px;z-index:3;padding:5px 8px;border-radius:999px;background:#a65a14;color:'+K+'!important;font:700 11px/1 Poppins,sans-serif;letter-spacing:0;pointer-events:none}',
B+'.js-item-product.c2-oos .c2-off{display:none}',
B+'.js-item-product .labels{position:absolute!important;left:8px!important;top:8px!important;z-index:3!important;margin:0!important}',
B+'.js-item-product.c2-oos .js-stock-label-private.label{display:inline-flex!important}',B+'.js-item-product .product-item-no-stock,'+B+'.js-item-product .js-stock-label-private.label{align-items:center;padding:5px 9px!important;border-radius:999px!important;background:rgba(255,250,245,.85)!important;border:0!important;color:#a65a14!important;font:600 9.5px/1 Poppins,sans-serif!important;letter-spacing:.14em!important;text-transform:uppercase!important}',
'@media(min-width:768px){'+B+'.js-item-product .product-item-name{font-size:14.5px!important}'+B+'.js-item-product .product-item-price-container .js-price-display{font-size:19px!important}'+B+'.js-item-product .product-item-information{padding:8px 14px 14px!important}}',
B+'.cml-ma{display:none!important}',
'.c2-rk{padding:26px 0 8px;font-family:Poppins,system-ui,sans-serif;color:#2b2916}',
'.c2-rk *{box-sizing:border-box}',
'.c2-rk .in{max-width:1200px;margin:0 auto;padding:0 16px}',
'.c2-rk .hd{display:flex;align-items:flex-end;justify-content:space-between;gap:12px}',
'.c2-rk .k{margin:0;font:500 10px/1 Poppins,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#a65a14}',
'.c2-rk h2{margin:8px 0 0!important;font:700 26px/1.05 Poppins,sans-serif!important;letter-spacing:-.01em!important;text-transform:none!important;color:#2b2916!important}',
'.c2-rk h2 em{font-weight:300;font-style:italic;color:#a65a14!important}',
'.c2-rk .all{flex:none;display:inline-flex;align-items:center;min-height:34px;padding:0 16px;border:1px solid '+G+';border-radius:999px;color:#a65a14!important;font:500 12.5px/1 Poppins,sans-serif;text-decoration:none!important;white-space:nowrap}',
'.c2-rk .all:hover{background:#a65a14;color:'+K+'!important}',
'.c2-rk .live{display:inline-flex;align-items:center;gap:7px;margin:12px 0 0;padding:8px 12px;border-radius:999px;border:1px solid rgba(166,90,20,.22);font:300 11.5px/1.2 Poppins,sans-serif;color:rgba(43,41,22,.85)}',
'.c2-rk .mini{width:14px;height:14px;flex:none;fill:none;stroke:'+G+';stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}',
'.c2-rk .rcs{display:flex;gap:10px;overflow-x:auto;margin:14px -16px 0;padding:0 16px 6px;scrollbar-width:none;scroll-snap-type:x mandatory;scroll-padding:0 16px}',
'.c2-rk .rcs::-webkit-scrollbar{display:none}',
'.c2-rk .rc{flex:none;width:40%;display:block;scroll-snap-align:start;text-decoration:none!important;color:#2b2916!important}',
'.c2-rk .rc.first{width:48%}',
'.c2-rk .ri{position:relative;display:block;border-radius:18px;overflow:hidden;aspect-ratio:4/5;background:#f6efe9;border:1px solid rgba(166,90,20,.2)}',
'.c2-rk .rc.first .ri{border-color:rgba(166,90,20,.75)}',
'.c2-rk .ri img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}',
'.c2-rk .ri:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(255,250,245,.72),rgba(255,250,245,0) 45%)}',
'.c2-rk .rn{position:absolute;left:10px;bottom:2px;z-index:1;font:200 44px/1 Poppins,sans-serif;color:#a65a14}',
'.c2-rk .rc.first .rn{font-size:54px}','.c2-rk .rn:before{content:attr(data-n);color:#a65a14!important;-webkit-text-fill-color:#a65a14}',
'.c2-rk .nm{display:block;margin:9px 0 0;font:400 12.5px/1.25 Poppins,sans-serif;color:#2b2916;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
'.c2-rk .pr{display:block;margin:4px 0 0;font:600 15px/1 Poppins,sans-serif;color:#a65a14}',
'.c2-rk .pr small{font:300 10.5px/1 Poppins,sans-serif;color:rgba(43,41,22,.6);margin-right:3px}',
'.c2-rk .ct{display:flex;align-items:center;gap:4px;margin-top:5px;font:300 10.5px/1 Poppins,sans-serif;color:rgba(43,41,22,.6)}',
'@media(min-width:768px){.c2-rk{padding:44px 0 18px}.c2-rk .in{padding:0 32px}.c2-rk h2{font-size:34px!important}.c2-rk .all{min-height:36px;padding:0 18px;font-size:13px}.c2-rk .rcs{display:grid;grid-template-columns:1.25fr 1fr 1fr 1fr 1fr;gap:16px;align-items:end;overflow:visible;margin:18px 0 0;padding:0}.c2-rk .rc,.c2-rk .rc.first{width:auto}.c2-rk .nm{font-size:13.5px}.c2-rk .pr{font-size:16px}}',
B+'.cml-ci,'+B+'#ns-section-divider_1789950202654{display:none!important}',
B+'#ns-section-category_hero .category-banner.c2-cbn{position:relative!important;overflow:hidden!important;margin:12px 0 0!important;border-radius:22px!important;aspect-ratio:16/8;background:#fffaf5}',
B+'#ns-section-category_hero .c2-cbn>img,'+B+'#ns-section-category_hero .c2-cbn picture img{position:absolute!important;right:0!important;top:50%!important;left:auto!important;width:auto!important;height:100%!important;min-width:100%!important;max-width:none!important;object-fit:cover!important;object-position:100% 50%!important;transform:translateY(-50%)!important;border-radius:0!important}',
B+'#ns-section-category_hero .c2-cbn:after{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(255,250,245,.95) 0%,rgba(255,250,245,.7) 45%,rgba(255,250,245,0) 85%)}',
'.c2-cbt{position:absolute;left:18px;top:50%;z-index:2;transform:translateY(-50%);max-width:62%;font-family:Poppins,system-ui,sans-serif}',
'.c2-cbt .k{margin:0;font:500 9.5px/1 Poppins,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#a65a14}',
'.c2-cbt h2{margin:6px 0 0!important;font:700 30px/1.02 Poppins,sans-serif!important;letter-spacing:-.02em!important;text-transform:none!important;color:#2b2916!important}',
'.c2-cbt h2 em{font-weight:300;font-style:italic;color:#a65a14!important}',
'.c2-cbt .s{margin:6px 0 0;max-width:200px;font:300 11.5px/1.35 Poppins,sans-serif;color:rgba(43,41,22,.8)}',
'@media(min-width:768px){'+B+'#ns-section-category_hero .category-banner.c2-cbn{aspect-ratio:auto;height:220px;margin:24px 0 0!important;border-radius:28px!important}'+B+'#ns-section-category_hero .c2-cbn>img{width:150%!important;height:auto!important;min-height:100%!important}.c2-cbt{left:40px;max-width:55%}.c2-cbt h2{font-size:46px!important}.c2-cbt .s{max-width:none;margin-top:10px;font-size:14px}.c2-cbt .k{font-size:10.5px}}',
'@media(max-width:767px){'+B+'.js-category-controls.category-controls{display:flex!important;align-items:center!important;gap:8px!important;padding:10px 12px 0!important;background:#f6efe9!important;border:0!important;box-shadow:none!important}',
B+'.js-category-controls .category-filter-button,'+B+'.js-category-controls .category-sort-button{flex:none!important;width:auto!important;display:inline-flex!important;align-items:center!important;gap:6px!important;min-height:32px!important;height:32px!important;padding:0 14px!important;border:1px solid '+G+'!important;border-radius:999px!important;background:transparent!important;color:#a65a14!important;font:500 12px/1 Poppins,sans-serif!important}',
B+'.js-category-controls .category-filter-button *,'+B+'.js-category-controls .category-sort-button *{color:#a65a14!important;fill:'+G+'!important;font:500 12px/1 Poppins,sans-serif!important;margin:0!important}',
B+'.js-category-controls .category-sort-button .category-controls-label{display:none!important}',
B+'.js-category-controls .category-sort-button .category-sort-selected:after{content:" \\2304";font-size:11px}',
B+'.js-category-controls .category-sort-button-text{display:block!important}',
B+'.js-category-controls>*:not(button){display:none!important}',
B+'.js-category-controls .c2-cnt{display:block!important;margin-left:auto;font:300 11px/1 Poppins,sans-serif;color:rgba(43,41,22,.55)}}',
'.c2-chips{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding:12px 12px 14px;font-family:Poppins,system-ui,sans-serif}',
'.c2-chips::-webkit-scrollbar{display:none}',
'.c2-chips a{flex:none;padding:7px 13px;border-radius:999px;border:1px solid rgba(166,90,20,.35);font:400 12px/1 Poppins,sans-serif;color:rgba(43,41,22,.85)!important;text-decoration:none!important;white-space:nowrap}',
'.c2-chips a.on{background:#a65a14;border-color:'+G+';color:'+K+'!important;font-weight:500}',
'@media(min-width:768px){.c2-chips{display:none}}',
'.c2-side{display:none}',
'@media(min-width:992px){'+B+'.cml-cgrid.c2-has{display:grid!important;grid-template-columns:220px minmax(0,1fr)!important;gap:36px!important;max-width:var(--cmlw,1160px)!important;width:100%!important;margin:0 auto!important;padding:24px 16px 0!important;box-sizing:border-box}'+B+'.cml-cgrid.c2-has>div:not(.c2-side){width:auto!important;max-width:none!important;padding:0!important;margin:0!important;min-width:0}'+B+'.cml-cgrid.c2-has #cml-cbar{display:none!important}'+B+'.cml-cgrid.c2-has .js-product-table{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:16px!important}',
'.c2-side{display:block;align-self:start;position:sticky;top:110px;font-family:Poppins,system-ui,sans-serif}.c2-side .grp{padding:16px 0;border-bottom:1px solid rgba(166,90,20,.2)}.c2-side .grp:first-child{padding-top:0}.c2-side .k{margin:0 0 10px;font:500 9.5px/1.2 Poppins,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#a65a14}',
'.c2-side a,.c2-side button{display:flex;align-items:center;gap:10px;width:100%;margin:0;padding:8px 0;border:0;background:transparent;font:300 13px/1.2 Poppins,sans-serif;color:#2b2916!important;text-decoration:none!important;text-align:left;cursor:pointer}.c2-side a i{flex:none;width:14px;height:14px;border-radius:4px;border:1px solid rgba(166,90,20,.5)}.c2-side a.on i{background:#a65a14;border-color:'+G+'}.c2-side a:hover{color:#a65a14!important}',
'.c2-side .mf{justify-content:center;margin-top:4px;min-height:36px;border:1px solid '+G+';border-radius:999px;color:#a65a14!important;font-weight:500;font-size:12.5px}.c2-side .cnt{margin:14px 0 0;font:300 12px/1 Poppins,sans-serif;color:rgba(43,41,22,.55)}}',
B+'.cbk-eb,'+B+'.cbk-cd,'+B+'.cbk-hl,'+B+'.cbk-pix,'+B+'.cbk-eco{display:none!important}',
B+'.cbk-hero{padding:clamp(30px,6vw,64px) 0 clamp(22px,4vw,36px)!important}',
B+'.cbk-h1{display:none!important}',
'.c2-oh{position:relative;text-align:center;font-family:Poppins,system-ui,sans-serif}',
'.c2-oh .ed{margin:0 0 10px;font:500 9.5px/1 Poppins,sans-serif;letter-spacing:.34em;text-indent:.34em;text-transform:uppercase;color:rgba(43,41,22,.62)}',
'.c2-oh .hand{display:block;margin:0 0 8px;font:200 20px/1 Poppins,sans-serif;letter-spacing:.62em;text-indent:.62em;text-transform:uppercase;color:#a65a14}',
'.c2-oh .blk{margin:0;font:800 78px/.86 Poppins,sans-serif;letter-spacing:-.05em;text-transform:uppercase;background:linear-gradient(105deg,#b8955a 0%,#e9c77e 38%,#fff3d6 50%,#e9c77e 62%,#b8955a 100%);-webkit-background-clip:text;background-clip:text;color:transparent}',
B+'.cbk-sub{margin:16px auto 0!important;max-width:320px!important;font:300 16px/1.45 Poppins,sans-serif!important;color:#f6efe9!important}',
B+'.cbk-sub em{font-style:italic;color:#f3d48b!important}',
'.c2-ofs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));max-width:520px;margin:18px auto 0;border-top:1px solid rgba(166,90,20,.4);border-bottom:1px solid rgba(166,90,20,.4);font-family:Poppins,system-ui,sans-serif}',
'.c2-ofs div{padding:12px 4px}.c2-ofs div+div{border-left:1px solid rgba(166,90,20,.3)}',
'.c2-ofs b{display:block;font:300 22px/1 Poppins,sans-serif;color:#a65a14}',
'.c2-ofs small{display:block;margin-top:5px;font:300 9.5px/1.2 Poppins,sans-serif;letter-spacing:.06em;color:rgba(43,41,22,.65)}',
'@media(min-width:768px){.c2-oh .ed{font-size:11px;margin-bottom:16px}.c2-oh .hand{font-size:28px;margin-bottom:12px}.c2-oh .blk{font-size:150px}'+B+'.cbk-sub{max-width:none!important;margin-top:22px!important;font-size:21px!important}.c2-ofs{margin-top:26px}.c2-ofs b{font-size:28px}.c2-ofs small{font-size:11px}}',
B+'.cbk-bar{border:0!important;padding:4px 0 0!important;margin:0!important;gap:8px!important}',
B+'.cbk-sel select{height:32px!important;padding:0 30px 0 14px!important;border:1px solid '+G+'!important;background-color:transparent!important;color:#a65a14!important;font:500 12px/1 Poppins,sans-serif!important}',
B+'.cbk-sel select[data-k=c]{display:none!important}',
B+'.cbk-cnt{font:300 11.5px/1 Poppins,sans-serif!important;color:rgba(43,41,22,.55)!important}',
B+'.cbk-act button{border-color:rgba(166,90,20,.35)!important;color:#a65a14!important;font:400 12px/1 Poppins,sans-serif!important}',
'.c2-och{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding:12px 0 14px}.c2-och::-webkit-scrollbar{display:none}',
'.c2-och button{flex:none;padding:7px 13px;border-radius:999px;border:1px solid rgba(166,90,20,.35);background:transparent;font:400 12px/1 Poppins,sans-serif;color:rgba(43,41,22,.85);cursor:pointer;white-space:nowrap}',
'.c2-och button.on{background:#a65a14;border-color:'+G+';color:'+K+';font-weight:500}',
B+'.cbk-card{border-radius:20px!important;background:#fffaf5!important;border:1px solid rgba(166,90,20,.16)!important}',
B+'.cbk-card:hover{transform:none!important;border-color:rgba(166,90,20,.4)!important}',
B+'.cbk-img{margin:8px 8px 0;border-radius:14px}',
B+'.cbk-tag{display:none!important}',
B+'.cbk-off{top:8px!important;right:8px!important;padding:5px 8px!important;border-radius:999px!important;background:#a65a14!important;color:'+K+'!important;font:700 11px/1 Poppins,sans-serif!important;letter-spacing:0!important;box-shadow:none!important}',
B+'.cbk-low{left:8px!important;right:auto!important;bottom:8px!important;padding:5px 9px!important;border-radius:999px!important;background:rgba(255,250,245,.85)!important;color:#a65a14!important;font:500 10px/1 Poppins,sans-serif!important}',
B+'.cbk-body{padding:6px 12px 12px!important;gap:0!important}',
B+'.cbk-card .c2-ey{margin:4px 0 4px;font:500 9px/1.2 Poppins,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#a65a14}',
B+'.cbk-nm{font:400 13.5px/1.3 Poppins,sans-serif!important;color:#2b2916!important;min-height:2.6em}',
B+'.cbk-op{margin-top:4px;font:300 11px/1.3 Poppins,sans-serif!important;color:rgba(43,41,22,.55)!important;min-height:0!important}',
B+'.cbk-pr{margin-top:6px!important;min-height:0!important;gap:2px 7px!important}',
B+'.cbk-por{font:700 18px/1.1 Poppins,sans-serif!important;color:#a65a14!important}',
B+'.cbk-de{font:300 11.5px/1 Poppins,sans-serif!important;color:rgba(43,41,22,.45)!important}',
B+'.cbk-pre{font:300 10.5px/1 Poppins,sans-serif!important;color:rgba(43,41,22,.6)!important}',
B+'.cbk-card .c2-cb{display:block;margin:5px 0 0;font:300 11px/1.3 Poppins,sans-serif;color:rgba(166,90,20,.85)}',
B+'.cbk-card .c2-cb b{font-weight:500;color:#a65a14}',
B+'.cbk-btn{min-height:40px!important;border-radius:999px!important;background:#a65a14!important;color:'+K+'!important;font:600 13.5px/1 Poppins,sans-serif!important;letter-spacing:0!important}',
B+'.cbk-btn.alt{background:transparent!important;border:1px solid '+G+'!important;color:#a65a14!important}',
B+'.cbk-brk{font:500 10.5px/1.2 Poppins,sans-serif!important;letter-spacing:.2em!important;color:#a65a14!important}',
B+'.cbk-foot{font:300 12px/1.4 Poppins,sans-serif!important}',
'@media(min-width:768px){'+B+'.cbk-nm{font-size:14.5px!important}'+B+'.cbk-por{font-size:19px!important}'+B+'.cbk-body{padding:8px 14px 14px!important}}'
].join("\n");
function css(){if(D.getElementById("c2-css"))return;var s=D.createElement("style");s.id="c2-css";s.textContent=CSS;(D.head||D.documentElement).appendChild(s)}
css();
function kind(n){n=n.toLowerCase();if(/combo/.test(n))return"Combo";if(/\bkit\b|ternura|desdobramento/.test(n))return"Kit presente";if(/trouxinha/.test(n))return"Trouxinha";if(/c[aá]psula/.test(n))return"Cápsula de chá";if(/ch[aá] blend|blend/.test(n))return"Chá misto";if(/infus[aã]o|ch[aá]/.test(n))return"Infusão natural";if(/granola/.test(n))return"Granola";if(/chocolate|choco|stroopwafel|wafel|wafer/.test(n))return"Snack";if(/desidratad/.test(n))return"Fruta desidratada";if(/x[ií]cara|garrafa|infusor|chaleira|raspador/.test(n))return"Acessório";return/^\/kits-presentes\//.test(P)?"Kit presente":/^\/acessorios\//.test(P)?"Acessório":""}
function topChild(el,stop){var x=el;while(x&&x.parentElement&&x.parentElement!==stop)x=x.parentElement;return x&&x.parentElement===stop?x:null}
function vis(e){return!!(e&&e.getClientRects().length&&getComputedStyle(e).display!=="none")}
function sigOf(c){var nm=c.querySelector(".js-item-name");if(!nm)return null;var op=c.querySelector(".js-offer-percentage"),cp=c.querySelector(".js-compare-price-display"),ns=c.querySelector(".js-stock-label-private"),bs=c.querySelector(".cml-bs");var cnt=[].filter.call(c.querySelectorAll(".product-item-link span"),function(s){return/^\(\d+\)$/.test(s.textContent.trim())&&!s.closest(".c2-rt")})[0];var cbp=[].filter.call(c.querySelectorAll("p,span"),function(x){return/cashback/i.test(x.textContent)&&!x.closest(".c2-cb")&&x.children.length<6})[0];
 return{nm:nm,op:op,cp:cp,ns:ns,bs:bs,cnt:cnt,cbp:cbp,s:[nm.textContent,op?op.textContent:"",cp?(cp.getAttribute("style")||"")+cp.className:"",ns?(ns.getAttribute("style")||"")+ns.className:"",bs?bs.textContent:"",cnt?cnt.textContent:"",cbp?cbp.textContent:"",c.querySelector(".c2-ey")?1:0].join("|")}}
function read(c,o){var link=c.querySelector(".product-item-link")||c.querySelector(".product-item-information");var r={link:link,oos:false,pct:0,n:-1,avg:0,box:null,money:"",cbox:null};
 if(o.ns){var cs=getComputedStyle(o.ns);r.oos=cs.display!=="none"&&cs.visibility!=="hidden"}
 if(o.op&&o.cp&&getComputedStyle(o.cp).display!=="none")r.pct=parseInt(o.op.textContent,10)||0;
 if(o.cnt&&link){r.box=topChild(o.cnt,link);r.n=parseInt(o.cnt.textContent.replace(/\D/g,""),10)||0;var sum=0,ws=r.box?r.box.querySelectorAll("clipPath rect, clippath rect"):[];[].forEach.call(ws,function(x){sum+=(parseFloat(x.getAttribute("width"))||0)/20});r.avg=ws.length?sum:0}
 if(o.cbp){r.cbox=topChild(o.cbp,link)||topChild(o.cbp,c.querySelector(".product-item-information"));var pe=c.querySelector(".js-price-display"),pv=pe?parseFloat(pe.textContent.replace(/[^\d,]/g,"").replace(",",".")):0;if(pv>0)r.money=brl(Math.round(pv*5)/100);else{var m=o.cbp.textContent.match(/R\$\s?[\d.]+,\d{2}/);r.money=m?m[0].replace(/R\$\s?/,"R$ "):""}}
 return r}
function write(c,o,r){var nm=o.nm,link=r.link;
 var ey=c.querySelector(".c2-ey");if(!ey){ey=D.createElement("p");ey.className="c2-ey";nm.parentNode.insertBefore(ey,nm)}
 var t=(o.bs&&o.bs.textContent.trim())||kind(nm.textContent);if(ey.textContent!==t)ey.textContent=t;if(ey.hidden!==!t)ey.hidden=!t;
 if(c.classList.contains("c2-oos")!==r.oos)c.classList.toggle("c2-oos",r.oos);
 var im=c.querySelector(".product-item-image-container"),off=c.querySelector(".c2-off");
 if(im&&r.pct>0){if(!off){off=D.createElement("span");off.className="c2-off";im.appendChild(off)}if(off.textContent!=="-"+r.pct+"%")off.textContent="-"+r.pct+"%"}else if(off)off.remove();
 if(r.n>=0){if(r.box&&!r.box.classList.contains("c2-hide"))r.box.classList.add("c2-hide");var rt=c.querySelector(".c2-rt");var h=r.n>0?'<i aria-hidden="true">★</i> '+(r.avg?r.avg.toFixed(1).replace(".",","):"5,0")+' <em>('+r.n+')</em>':"ainda sem avaliações";
  if(!rt){rt=D.createElement("span");rt.className="c2-rt";var pc=c.querySelector(".product-item-price-container");if(pc&&pc.parentNode===nm.parentNode)nm.parentNode.insertBefore(rt,pc);else nm.parentNode.insertBefore(rt,nm.nextSibling)}
  if(rt.__h!==h){rt.__h=h;rt.innerHTML=h;rt.classList.toggle("z",r.n===0);rt.setAttribute("aria-label",r.n>0?"Nota "+(r.avg?r.avg.toFixed(1):"5")+" de 5, "+r.n+(r.n===1?" avaliação":" avaliações"):"Ainda sem avaliações")}}
 if(r.cbox&&r.cbox!==nm&&!r.cbox.classList.contains("c2-hide"))r.cbox.classList.add("c2-hide");
 if(r.money){var cb=c.querySelector(".c2-cb");if(!cb){cb=D.createElement("span");cb.className="c2-cb";var pc2=c.querySelector(".product-item-price-container");if(pc2)pc2.parentNode.insertBefore(cb,pc2.nextSibling);else if(link)link.appendChild(cb)}var hh='+ <b>'+r.money+'</b> de cashback';if(cb.__h!==hh){cb.__h=hh;cb.innerHTML=hh}}}
function cards(){var L=[].filter.call(D.querySelectorAll(".js-item-product"),function(c){return!c.closest(".cml-ma,.c2-rk")}),S=[],R=[],i;
 for(i=0;i<L.length;i++){var o=null;try{o=sigOf(L[i])}catch(e){}S.push(o&&o.s!==L[i].__c2s?o:null)}
 for(i=0;i<L.length;i++){R.push(S[i]?read(L[i],S[i]):null)}
 for(i=0;i<L.length;i++){if(!S[i])continue;try{write(L[i],S[i],R[i])}catch(e){}var o2=sigOf(L[i]);L[i].__c2s=o2?o2.s:""}}
var RK="https://dzmlyrkzcdqicwfmxnxd.supabase.co/functions/v1/cml-rank",rkData=null,rkReq=null;
function ago(iso){var t=Date.parse(String(iso).replace(/([+-]\d{2})(\d{2})$/,"$1:$2"));if(!t)return"";var m=Math.round((Date.now()-t)/60000);if(m<1)m=1;if(m<60)return"há "+m+" min";var h=Math.round(m/60);if(h<24)return"há "+h+(h===1?" hora":" horas");var d=Math.round(h/24);if(d>3)return"";return"há "+d+(d===1?" dia":" dias")}
var PIN='<svg class="mini" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>';
var PPL='<svg class="mini" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3.5 19c.4-3.3 2.7-5.5 5.5-5.5s5.1 2.2 5.5 5.5"/><circle cx="16.5" cy="9" r="2.4"/><path d="M15.5 13.6c2.6.1 4.6 2.2 5 5.4"/></svg>';
function rank(){if(!D.body||!D.body.classList.contains("template-home"))return true;if(D.querySelector(".c2-rk"))return true;
 /* 18/11/2026: ranking ja vem dentro do pacote (window.__cmlRk), sem esperar outra busca */if(!rkData&&window.__cmlRk&&window.__cmlRk.items)rkData=window.__cmlRk;
 if(!rkReq)rkReq=fetch(RK).then(function(r){return r.json()}).then(function(j){rkData=j}).catch(function(){rkData={mode:"off",items:[]}});
 if(!rkData)return false;
 var ref=D.querySelector(".cml-pair")||D.querySelector('[id^="ns-section-product-list"]');if(!ref){var ic0=D.getElementById("ns-section-icon_text");ref=ic0&&ic0.nextElementSibling}/* 18/11/2026: sem as vitrines escondidas da home, o ranking entra logo depois dos icones */if(!ref)return D.readyState==="complete";
 var it=(rkData.items||[]).filter(function(x){return x.url&&x.img});if(rkData.mode==="off"||it.length<3)return true;
 var fav=rkData.mode!=="rank";
 var s=D.createElement("section");s.className="c2-rk";s.setAttribute("aria-label",fav?"Os favoritos da casa":"Os mais pedidos do mês");
 var live="";if(!fav&&rkData.last&&rkData.last.city){var a=ago(rkData.last.at);if(a)live='<p class="live">'+PIN+'Último pedido em '+esc(rkData.last.city)+', '+a+'</p>'}
 s.innerHTML='<div class="in"><div class="hd"><div><p class="k">'+(fav?"Da nossa cozinha":"Ranking do mês")+'</p><h2>'+(fav?'Os favoritos <em>da casa</em>':'Os mais <em>pedidos</em>')+'</h2></div><a class="all" href="/produtos/?sort_by=best-selling">Ver todos</a></div>'+live+'<div class="rcs">'
 +it.slice(0,5).map(function(x,i){var u=x.url.replace(/^https?:\/\/[^\/]+/,"");return'<a class="rc'+(i?"":" first")+'" href="'+esc(u)+'"><span class="ri"><img src="'+esc(x.img)+'" alt="" loading="lazy" decoding="async" width="480" height="600"><span class="rn">'+(i<9?"0":"")+(i+1)+'</span></span><span class="nm">'+esc(String(x.name).replace(/ - /g," · "))+'</span><span class="pr">'+(x.from?"<small>a partir de</small>":"")+brl(x.price)+'</span>'+(!fav&&x.orders?'<span class="ct">'+PPL+x.orders+(x.orders===1?" pedido":" pedidos")+'</span>':"")+'</a>'}).join("")+'</div></div>';
 ref.parentNode.insertBefore(s,ref);return true}
var SUB={"/chas/":"Chás para o seu ritmo, feitos à mão.","/snacks-granolas/":"Snacks e granolas feitos em pequenos lotes.","/kits-presentes/":"Caixas montadas à mão para presentear.","/acessorios/":"Para preparar o chá do jeito certo."};
function title(t){t=t.trim();var h=t.indexOf("-");if(h>0&&h<t.length-1)return esc(t.slice(0,h+1))+"<em>"+esc(t.slice(h+1))+"</em>";var w=t.split(" ");if(w.length>1){var l=w.pop();return esc(w.join(" "))+" <em>"+esc(l)+"</em>"}return esc(t)}
function navTree(){var h=D.getElementById("nav-hamburger");if(!h)return null;var all=[].slice.call(h.querySelectorAll("a.nav-list-link[href]"));function pth(a){try{return new URL(a.getAttribute("href"),location.href).pathname}catch(e){return""}}
 function kids(panel){var body=panel.querySelector(":scope>.modal-body")||panel;var L=[],top=null;[].forEach.call(body.querySelectorAll(":scope>.nav-item"),function(it){var a=it.querySelector(":scope>a.nav-list-link[href]");if(a&&/^ver tudo/i.test(a.textContent.trim())){top={t:a.textContent.trim().replace(/^ver tudo em\s*/i,""),p:pth(a)};return}if(a){L.push({t:a.textContent.trim(),p:pth(a)});return}var b=it.querySelector(":scope>button.nav-list-link"),sub=it.querySelector(":scope>.modal"),va=sub&&sub.querySelector("a.nav-list-link[href]");if(b&&va&&/^ver tudo/i.test(va.textContent.trim()))L.push({t:b.textContent.trim(),p:pth(va)})});return{top:top,items:L}}
 var self=all.filter(function(a){return pth(a)===P&&/^ver tudo/i.test(a.textContent.trim())})[0];
 if(self){var pn=self.closest(".modal");var k=kids(pn);if(k.items.length)return{name:k.top?k.top.t:"",cur:P,top:k.top,items:k.items,parent:null}}
 var leaf=all.filter(function(a){return pth(a)===P})[0];if(leaf){var pn2=leaf.closest(".modal");var k2=kids(pn2);var nm=leaf.textContent.trim().replace(/^ver tudo em\s*/i,"");return{name:nm,cur:P,top:k2.top,items:k2.items}}
 return null}
function catPage(){var b=D.body;if(!b)return false;if(!b.classList.contains("template-category")||/^\/ofertas\//.test(P)){b.classList.add("c2-ready");return true}var hero=D.getElementById("ns-section-category_hero"),grid=D.querySelector(".js-product-table");if(!hero||!grid||!D.getElementById("nav-hamburger"))return D.readyState==="complete";
 if(b.__c2cat)return true;b.__c2cat=1;
 var tr=navTree()||{};var nm=tr.name||String((D.querySelector("h1")||{}).textContent||"").trim()||String(D.title||"").split(/\s[|–-]\s/)[0];nm=String(nm).trim();
 var root=P.match(/^\/[^\/]+\//);root=root?root[0]:P;var sub=SUB[root]||"";
 var bn=hero.querySelector(".category-banner");if(!bn){var ct=hero.querySelector(".container");if(!ct){var chw=D.createElement("div");chw.className="category-hero";ct=D.createElement("div");ct.className="container";chw.appendChild(ct);hero.appendChild(chw)}bn=D.createElement("div");bn.className="category-banner";ct.appendChild(bn)}
 bn.classList.add("c2-cbn");var tx=D.createElement("div");tx.className="c2-cbt";tx.innerHTML='<p class="k">Categoria</p><h2>'+title(nm)+'</h2>'+(sub?'<p class="s">'+esc(sub)+'</p>':"");bn.appendChild(tx);
 var items=(tr.items||[]).slice(),chips=[];if(tr.top)chips.push({t:"Todos",p:tr.top.p});items.forEach(function(x){chips.push(x)});
 var n=[].filter.call(D.querySelectorAll(".js-product-table .js-item-product"),function(x){return!x.classList.contains("swiper-slide-duplicate")}).length;
 var cnt=n+(n===1?" produto":" produtos");
 var ctl=D.querySelector(".js-category-controls");
 if(ctl&&!ctl.querySelector(".c2-cnt")){var c0=D.createElement("span");c0.className="c2-cnt";c0.textContent=cnt;ctl.appendChild(c0)}
 if(chips.length>1){var ch=D.createElement("nav");ch.className="c2-chips";ch.setAttribute("aria-label","Subcategorias");ch.innerHTML=chips.map(function(x){return'<a href="'+esc(x.p)+'"'+(x.p===P?' class="on" aria-current="page"':"")+'>'+esc(x.t)+'</a>'}).join("");var anc=ctl&&ctl.parentNode?ctl:null;if(anc)anc.parentNode.insertBefore(ch,anc.nextSibling);else grid.parentNode.insertBefore(ch,grid)}
 /* 21/11/2026: a lateral nao depende mais da marca cml-cgrid ja existir (as vezes ela chegava depois e a pagina ficava no formato antigo) */var cg=D.querySelector(".cml-cgrid");if(!cg){var tb0=D.querySelector(".js-product-table");cg=tb0&&(tb0.closest(".grid-md-auto-4")||(tb0.parentElement&&tb0.parentElement.parentElement));if(cg)cg.classList.add("cml-cgrid")}if(cg&&!cg.querySelector(".c2-side")){var sd=D.createElement("aside");sd.className="c2-side";sd.setAttribute("aria-label","Filtros");var sp=new URLSearchParams(location.search),sb=sp.get("sort_by")||"best-selling";
  var SO=[["best-selling","Mais vendidos"],["price-ascending","Menor preço"],["price-descending","Maior preço"],["created-descending","Novidades"],["alpha-ascending","A a Z"]];
  var h='';if(chips.length>1)h+='<div class="grp"><p class="k">Categoria</p>'+chips.map(function(x){return'<a href="'+esc(x.p)+'"'+(x.p===P?' class="on" aria-current="page"':"")+'><i></i>'+esc(x.t)+'</a>'}).join("")+'</div>';
  h+='<div class="grp"><p class="k">Ordenar</p>'+SO.map(function(o){var q=new URLSearchParams(location.search);q.set("sort_by",o[0]);return'<a href="'+esc(P+"?"+q.toString())+'"'+(sb===o[0]?' class="on"':"")+'><i></i>'+o[1]+'</a>'}).join("")+'</div>';
  var fb=D.querySelector("#cml-cbar .cml-fb")||D.querySelector(".category-filter-button");if(fb)h+='<div class="grp"><button type="button" class="mf">Mais filtros</button><p class="cnt">'+cnt+'</p></div>';else h+='<p class="cnt">'+cnt+'</p>';
  sd.innerHTML=h;cg.insertBefore(sd,cg.firstChild);cg.classList.add("c2-has");setTimeout(function(){try{dispatchEvent(new Event("resize"))}catch(e){}},60);setTimeout(function(){try{dispatchEvent(new Event("resize"))}catch(e){}},900);var mf=sd.querySelector(".mf");if(mf)mf.addEventListener("click",function(){var f=D.querySelector(".category-filter-button")||D.querySelector("#cml-cbar .cml-fb");if(f)f.click()})}
 b.classList.add("c2-ready");return true}
var oHero=false;
function ofertas(){if(!/^\/ofertas\//.test(P))return true;var r=D.getElementById("cml-bk");if(!r)return D.readyState==="complete";
 if(!oHero){var hh=r.querySelector(".cbk-hero"),h1=r.querySelector(".cbk-h1"),sb=r.querySelector(".cbk-sub");if(!hh||!h1)return false;oHero=true;
  var oh=D.createElement("div");oh.className="c2-oh";oh.innerHTML='<p class="ed">só até 22/11</p><span class="hand">esquenta</span><p class="blk" role="heading" aria-level="1">Black</p>';h1.parentNode.insertBefore(oh,h1);
  if(sb)sb.innerHTML='Preço de Black, <em>cuidado de sempre.</em>';
  var of=D.createElement("div");of.className="c2-ofs";of.hidden=true;(sb||oh).parentNode.insertBefore(of,(sb||oh).nextSibling);
  var hl=r.querySelector(".cbk-hl");function nums(){var t=hl?hl.textContent:"";var a=t.match(/R\$\s?([\d.]+),(\d{2})/),b=t.match(/(\d+)%\s*off/i);if(!a||!b)return;var v=a[2]==="00"?"R$ "+a[1]:"R$ "+a[1]+","+a[2];of.innerHTML='<div><b>'+v+'</b><small>a partir de</small></div><div><b>'+b[1]+'%</b><small>até de desconto</small></div><div><b>+5%</b><small>no Pix</small></div>';of.hidden=false}
  nums();if(hl)new MutationObserver(nums).observe(hl,{childList:true,subtree:true,characterData:true})}
 var bar=r.querySelector(".cbk-bar"),sel=bar&&bar.querySelector("select[data-k=c]");
 if(sel&&!bar.parentNode.querySelector(".c2-och")){var w=D.createElement("div");w.className="c2-och";w.setAttribute("role","group");w.setAttribute("aria-label","Categorias");bar.parentNode.insertBefore(w,bar.nextSibling)}
 var och=r.querySelector(".c2-och");if(och&&sel){var sig=[].map.call(sel.options,function(o){return o.value+"|"+o.selected}).join(",");if(och.__s!==sig){och.__s=sig;och.innerHTML=[].map.call(sel.options,function(o){var t=o.value?o.textContent.replace(/\s*\(\d+\)\s*$/,""):"Todos";return'<button type="button" data-v="'+esc(o.value)+'"'+(o.selected?' class="on" aria-pressed="true"':' aria-pressed="false"')+'>'+esc(t)+'</button>'}).join("")}}
 else if(och&&!sel){och.innerHTML="";och.__s=""}
 [].forEach.call(r.querySelectorAll(".cbk-card"),function(c){if(c.__c2)return;c.__c2=1;var tg=c.querySelector(".cbk-tag"),nm=c.querySelector(".cbk-nm"),body=c.querySelector(".cbk-body");var t=(tg&&tg.textContent.trim())||(nm?kind(nm.textContent):"");if(t&&body){var e=D.createElement("p");e.className="c2-ey";e.textContent=t;body.insertBefore(e,body.firstChild)}
  var pr=c.querySelector(".cbk-por");if(pr){var v=parseFloat(pr.textContent.replace(/[^\d,]/g,"").replace(",","."));if(v>0){var cb=D.createElement("span");cb.className="c2-cb";cb.innerHTML='+ <b>'+brl(v*0.05)+'</b> de cashback';var p=c.querySelector(".cbk-pr");p.parentNode.insertBefore(cb,p.nextSibling)}}});
 return false}
D.addEventListener("click",function(e){var b=e.target.closest(".c2-och button");if(!b)return;var sel=D.querySelector("#cml-bk select[data-k=c]");if(!sel)return;sel.value=b.getAttribute("data-v");sel.dispatchEvent(new Event("change",{bubbles:true}))});
function all(){var ok=true;cards();[rank,catPage,ofertas].forEach(function(f){try{if(!f())ok=false}catch(e){}});return ok}
var n=0;(function loop(){var ok=all();if(!ok&&++n<80)setTimeout(loop,200)})();
var q=0;try{new MutationObserver(function(ms){if(q)return;for(var i=0;i<ms.length;i++){var t=ms[i].target;if(t.closest&&t.closest(".c2-rt,.c2-cb,.c2-ey,.c2-off,.c2-och"))continue;q=setTimeout(function(){q=0;cards();try{ofertas()}catch(e){}},180);return}}).observe(D.documentElement,{childList:true,subtree:true})}catch(e){}
addEventListener("load",function(){all()});
})();

/* Chef Mais Leve: SITE PREMIUM ETAPA 3 (01/11/2026). Pagina de produto e kit (nome na assinatura, linha de prova, preco limpo, cashback em linha, latas no escuro, Comprar dourado, frete, WhatsApp discreto, sanfonas finas, icones de traco, regua do preco por xicara, avaliacoes, barra fixa com WhatsApp), sacola e Compra rapida. Para desfazer: apague este bloco inteiro. */
(function(){if(window.__cmlE3)return;window.__cmlE3=1;
var D=document,G="#a65a14",GL="#a65a14",K="#f6efe9",B="html.cml-blk body ",PB=B+".js-product-detail ";
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function brl(v){return"R$ "+Number(v).toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".")}
function num(t){var m=String(t||"").replace(/\s/g,"").match(/(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?/);return m?parseFloat(m[0].replace(/\./g,"").replace(",",".")):0}
function u(svg){return'url("data:image/svg+xml,'+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none' stroke='"+G+"' stroke-width='1.25' stroke-linecap='round' stroke-linejoin='round'>"+svg+"</svg>")+'")'}
var F="fill='rgba(166,90,20,.12)'";
var I={
drop:"<path "+F+" d='M16 4.5c4.6 6.2 8.2 10.6 8.2 15a8.2 8.2 0 0 1-16.4 0c0-4.4 3.6-8.8 8.2-15z'/><path d='M12 20.5c.2 2 1.5 3.4 3.4 3.8'/>",
heart:"<path "+F+" d='M16 26.5C9 21.8 5 17.9 5 13.1 5 9.6 7.6 7 10.8 7c2.2 0 4 1.2 5.2 3 1.2-1.8 3-3 5.2-3C24.4 7 27 9.6 27 13.1c0 4.8-4 8.7-11 13.4z'/>",
cup:"<path "+F+" d='M6 12.5h16v6.5a6.5 6.5 0 0 1-6.5 6.5h-3A6.5 6.5 0 0 1 6 19z'/><path d='M22 14.5h1.8a3 3 0 0 1 0 6H21.5M4 27.5h20M11 4.5c-.8 1.4.8 2.6 0 4M15 4.5c-.8 1.4.8 2.6 0 4'/>",
sun:"<circle "+F+" cx='16' cy='16' r='5.5'/><path d='M16 4v3M16 25v3M4 16h3M25 16h3M7.5 7.5l2.1 2.1M22.4 22.4l2.1 2.1M24.5 7.5l-2.1 2.1M9.6 22.4l-2.1 2.1'/>",
leaf:"<path "+F+" d='M6 26C5 14 12 6.5 26 5.5c1 13-7 20.6-20 20.5z'/><path d='M6 26C11 19.5 16 14 22 9.5M12 19l-.6-4M16 15l-.3-3.6M13.5 17.4l3.6.4M17.5 13.4l3.2.4'/>",
temp:"<path "+F+" d='M13 6.5a3 3 0 0 1 6 0v11a5.5 5.5 0 1 1-6 0z'/><path d='M16 11v9M21.5 8h2M21.5 11h1.5M21.5 14h2'/><circle cx='16' cy='21.5' r='1.6'/>",
time:"<path "+F+" d='M9 4.5h14M9 27.5h14M10.5 4.5c0 5 2.5 7.5 5.5 11.5 3-4 5.5-6.5 5.5-11.5M10.5 27.5c0-5 2.5-7.5 5.5-11.5 3 4 5.5 6.5 5.5 11.5'/><path d='M13 25h6'/>",
smile:"<circle "+F+" cx='16' cy='16' r='11'/><path d='M11 18.5c1.3 2.2 3 3.2 5 3.2s3.7-1 5-3.2M12 13h.01M20 13h.01'/>",
aroma:"<path "+F+" d='M8 18h16v2.5A6.5 6.5 0 0 1 17.5 27h-3A6.5 6.5 0 0 1 8 20.5z'/><path d='M12 14c-1.4-1.8 1.4-3 0-5M16 13c-1.4-1.8 1.4-3 0-5M20 14c-1.4-1.8 1.4-3 0-5'/>",
moon:"<path "+F+" d='M21 5.5A11 11 0 1 0 26.5 21 9 9 0 0 1 21 5.5z'/>",
wind:"<path d='M4 12h14a3.5 3.5 0 1 0-3.5-3.5M4 17h19a3.5 3.5 0 1 1-3.5 3.5M6 22h8'/>",
shield:"<path "+F+" d='M16 4l9 3.5v7c0 6-3.8 10.4-9 12.5-5.2-2.1-9-6.5-9-12.5v-7z'/><path d='M11.5 15.8l3 3 6-6.2'/>",
bolt:"<path "+F+" d='M17.5 3.5L7 18h7.5L13 28.5 24 13h-7.5z'/>",
gift:"<rect "+F+" x='5.5' y='14' width='21' height='13' rx='1.5'/><rect x='4' y='10' width='24' height='4.2' rx='1.2'/><path d='M16 10v17M11.5 10c-3-.4-4.6-2-3.8-3.7.9-1.9 4.6-.6 8.3 3.7 3.7-4.3 7.4-5.6 8.3-3.7.8 1.7-.8 3.3-3.8 3.7'/>",
truck:"<path "+F+" d='M3 9.5h15v13H3z'/><path d='M18 13h5.2l4.3 5v4.5H18'/><circle "+F+" cx='8' cy='23.5' r='2.6'/><circle "+F+" cx='22.5' cy='23.5' r='2.6'/>"};
var WAS='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>';
var CSS=[];
for(var k in I)CSS.push(B+".cml-i-"+k+"{--i3:"+u(I[k])+"!important}");
CSS=CSS.concat([
B+'#ns-section-product_description .cml-f-cards li::before{background:#f6efe9!important;box-shadow:inset 0 0 0 1px rgba(166,90,20,.35)!important}',
PB+'.product-sold-count,'+PB+'.c3-hide{display:none!important}',
PB+'.c3-ey{margin:4px 0 6px;font:500 10px/1.3 Poppins,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#a65a14}',
PB+'h1.js-product-name{margin:0!important;font:700 28px/1.08 Poppins,sans-serif!important;letter-spacing:-.02em!important;text-transform:none!important;color:#2b2916!important}',
PB+'h1.js-product-name em{font-weight:300;font-style:italic;color:#a65a14}',
PB+'h1.js-product-name .c3-vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}',
PB+'.c3-prt{display:flex;flex-wrap:wrap;align-items:center;gap:4px 0;margin:10px 0 0;font:300 12px/1.3 Poppins,sans-serif;color:rgba(43,41,22,.75)}',
PB+'.c3-prt span+span:before{content:"·";margin:0 8px;color:rgba(166,90,20,.6)}',
PB+'.c3-prt i{display:inline-flex;align-items:center;font-style:normal;margin-right:5px}',
PB+'.c3-prt i svg{width:12px;height:12px;fill:'+G+'}',
PB+'.c3-ey{order:1}',PB+'.c3-prt{order:1}',PB+'.c3-wal{order:9}',
PB+'.c3-prt b{font-weight:500;color:#2b2916}',
'@media(min-width:768px){'+PB+'h1.js-product-name{font-size:36px!important}}',
PB+'.js-price-container.product-price{margin:16px 0 0!important;padding:16px!important;border-radius:20px!important;background:#f6efe9!important;border:1px solid rgba(166,90,20,.2)!important}',
PB+'.product-price-main{display:flex!important;flex-wrap:wrap!important;align-items:baseline!important;gap:4px 10px!important}',
PB+'.product-price-row{display:flex!important;align-items:center!important;gap:10px!important;order:0}',
PB+'#price_display,'+PB+'.js-price-display.product-price-display{font:700 28px/1 Poppins,sans-serif!important;letter-spacing:-.01em!important;color:#a65a14!important}',
PB+'#compare_price_display{order:1;font:300 14px/1 Poppins,sans-serif!important;color:rgba(43,41,22,.45)!important;text-decoration:line-through!important;margin:0!important}',
PB+'.js-offer-label.product-offer-label{display:inline-flex!important;align-items:center;padding:5px 9px!important;border-radius:999px!important;background:#a65a14!important;color:'+K+'!important;font-size:0!important;line-height:1!important;border:0!important}',
PB+'.js-offer-label.product-offer-label:before{content:"-";font:700 12px/1 Poppins,sans-serif;color:'+K+'}',
PB+'.js-offer-label.product-offer-label .js-offer-percentage{font:700 12px/1 Poppins,sans-serif!important;color:'+K+'!important}',
PB+'.js-offer-label.product-offer-label:after{content:"%";font:700 12px/1 Poppins,sans-serif;color:'+K+'}',
PB+'.saved-amount-container{display:none!important}',
PB+'.js-price-container.product-price{background:#f6efe9!important;border-bottom:0!important;border-radius:20px 20px 0 0!important;padding-bottom:4px!important;margin-bottom:0!important}',
PB+'.product-payments-info{margin:0!important;padding:6px 16px 16px!important;border:1px solid rgba(166,90,20,.2)!important;border-top:0!important;border-radius:0 0 20px 20px!important;box-shadow:none!important;display:block!important;text-align:left!important}',
PB+'.product-payments-info .product-installment,'+PB+'.product-payments-info .product-installments,'+PB+'.product-payment-discount{display:inline!important;margin:0!important;padding:0!important;font:300 13px/1.5 Poppins,sans-serif!important;color:rgba(43,41,22,.8)!important}',
PB+'.product-installment *{font:inherit!important;color:inherit!important}',
PB+'.product-payment-discount[data-c3]{font-size:0!important}',PB+'.product-payment-discount[data-c3]>*{display:none!important}',
PB+'.product-payment-discount[data-c3]:after{content:attr(data-c3);font:300 13px/1.5 Poppins,sans-serif;color:rgba(43,41,22,.8)}',
PB+'.product-payment-discount[data-c3]:before{font-size:13px}',
PB+'.product-payment-discount:before{content:"·";margin:0 8px;color:rgba(166,90,20,.6)}',
PB+'#btn-installments{display:block!important;margin:6px 0 0!important;font:300 11.5px/1.3 Poppins,sans-serif!important;color:rgba(43,41,22,.5)!important;text-decoration:underline!important;text-underline-offset:3px}',
PB+'.c3-cb{display:block;margin:8px 0 0;font:300 13px/1.3 Poppins,sans-serif;color:rgba(166,90,20,.9)}',
PB+'.c3-cb b{font-weight:500;color:#a65a14}',
PB+'.cml-cb .cml-cbk2,'+PB+'.cml-cb>div>div:has(.cml-cbk2){display:none!important}',
PB+'.cml-cb{margin:0!important;padding:0!important;background:transparent!important;border:0!important}',
B+'#product_form .js-product-variants a.js-variant-button.btn-variant,'+B+'#product_form .js-product-variants .btn-variant{background:#fffaf5!important;border:1px solid rgba(166,90,20,.22)!important;box-shadow:none!important;color:#2b2916!important}',
B+'#product_form .js-product-variants .btn-variant.selected,'+B+'#product_form .js-product-variants .btn-variant.select{border-color:'+G+'!important;background:#fffaf5!important}',
B+'#product_form .js-product-variants .btn-variant *{color:#2b2916!important}',
B+'#product_form .js-product-variants .btn-variant::after{color:#a65a14!important}',
B+'#product_form .js-product-variants .js-product-variants-group::before{color:#a65a14!important;font-weight:300!important}',
B+'#product_form .js-product-variants .js-product-variants-group::after{height:2px!important;background:linear-gradient(90deg,rgba(166,90,20,.45) 0,'+G+' var(--cpvp),rgba(43,41,22,.12) var(--cpvp))!important}',
B+'#product_form .js-product-variants a.js-variant-button.selected{border-color:'+G+'!important;background:#fffaf5!important;box-shadow:0 0 0 1px '+G+'!important}',
B+'#product_form .js-product-variants a.js-variant-button::before{border:1.5px solid rgba(166,90,20,.5)!important;background:transparent!important}',
B+'#product_form .js-product-variants a.js-variant-button.selected::before{border-color:'+G+'!important;background:#a65a14!important;box-shadow:inset 0 0 0 4px #fffaf5!important}',
B+'#product_form .js-product-variants a.js-variant-button .btn-variant-content::before{background:#a65a14!important;color:'+K+'!important}',
B+'#product_form .js-product-variants a.js-variant-button .btn-variant-content::after{color:rgba(43,41,22,.55)!important}',
B+'#product_form .js-product-variants a.js-variant-button::after{color:#a65a14!important}',
B+'.cpv-pill{background:transparent!important;border:1px solid rgba(166,90,20,.3)!important;color:#2b2916!important}',
B+'.cpv-pill i{background:#a65a14!important}',
B+'.cml-acc{border-color:rgba(166,90,20,.2)!important}',
B+'.cml-acc ul:not(.cml-pills) li,'+B+'.cml-acc p,'+B+'.cml-acc td{color:rgba(43,41,22,.78)!important;font-weight:300!important}',
B+'.cml-acc ul:not(.cml-pills) li b,'+B+'.cml-acc ul:not(.cml-pills) li strong{color:#2b2916!important;font-weight:500!important}',
B+'.cml-acc ul:not(.cml-pills) li::marker{color:#a65a14!important}',
B+'.cml-acc ul:not(.cml-pills) li::before{background:#a65a14!important;color:#a65a14!important}',
B+'.cml-side .cml-s-intro{color:rgba(43,41,22,.8)!important;font-weight:300!important}',
B+'#product_form .js-product-variants .form-label{font:500 10px/1.2 Poppins,sans-serif!important;letter-spacing:.2em!important;text-transform:uppercase!important;color:#a65a14!important}',
PB+'.form-quantity{border:1px solid rgba(166,90,20,.45)!important;border-radius:999px!important;background:transparent!important}',
PB+'.form-quantity *{color:#2b2916!important;fill:#f6efe9!important;background:transparent!important;border:0!important}',
B+'#ns-section-main_product .buy-button-container .js-addtocart,'+PB+'input.js-addtocart.btn{background:#a65a14!important;border-color:'+G+'!important;color:'+K+'!important;font:600 15px/1 Poppins,sans-serif!important;letter-spacing:0!important;text-transform:none!important;border-radius:999px!important;box-shadow:none!important}',
B+'#ns-section-main_product .buy-button-container .js-addtocart:hover{background:'+GL+'!important;border-color:'+GL+'!important}',
PB+'button.cml-shb{background:transparent!important;border:1px solid rgba(166,90,20,.25)!important;border-radius:16px!important}',
PB+'button.cml-shb>svg,'+PB+'button.cml-shb .ic,'+PB+'button.cml-shb>span:first-child:empty{display:none!important}',
PB+'button.cml-shb:before{content:"";flex:none;width:28px;height:28px;margin-right:12px;background:'+u(I.truck)+' center/contain no-repeat}',
PB+'button.cml-shb b{font:500 13.5px/1.2 Poppins,sans-serif!important;color:#2b2916!important}',
PB+'button.cml-shb em{font:300 11.5px/1.3 Poppins,sans-serif!important;color:rgba(43,41,22,.6)!important}',
PB+'.c3-wal{display:flex!important;align-items:center;justify-content:center;gap:8px;width:100%;margin:12px 0 0!important;padding:6px 0!important;border:0!important;background:transparent!important;box-shadow:none!important;font:300 12.5px/1.3 Poppins,sans-serif!important;color:rgba(43,41,22,.75)!important;cursor:pointer;min-height:0!important}',
PB+'.c3-wal *{font:inherit!important;color:inherit!important}',
PB+'.c3-wal u{text-decoration:underline;text-underline-offset:3px;color:#a65a14!important}',
PB+'.c3-wal svg{width:16px!important;height:16px!important;fill:'+G+'!important;flex:none}',
B+'.cml-acc h4{font:500 14.5px/1.3 Poppins,sans-serif!important;letter-spacing:0!important;text-transform:none!important;color:#2b2916!important}',
B+'.cml-acc h4::after,'+B+'.cml-acc h4::before{background:transparent!important;box-shadow:none!important;border:0!important;color:#a65a14!important;font:200 22px/1 Poppins,sans-serif!important;width:auto!important;height:auto!important}',
B+'.cml-acc .cml-pills li{background:transparent!important;border:1px solid rgba(166,90,20,.3)!important;color:#2b2916!important;font:300 12px/1 Poppins,sans-serif!important}',
B+'.cml-f-cards li h4,'+B+'.cml-f-cards li b,'+B+'.cml-f-cards li strong{font-weight:500!important}',
B+'.cml-pd h2,'+B+'.cml-pd h3{font-weight:700!important;letter-spacing:-.01em!important;text-transform:none!important}',
B+'.cml-pd h2 em,'+B+'.cml-pd h3 em{font-weight:300;font-style:italic;color:#a65a14}',
B+'.cml-f-exp a{display:none!important}',
B+'.cmle-inc{display:none!important}',
B+'.cml-f-top h2.c3-dup{display:none!important}',
'.c3-rg{margin:0;padding:0;list-style:none;font-family:Poppins,system-ui,sans-serif}',
'.c3-rg li{display:grid;grid-template-columns:96px minmax(0,1fr) auto;align-items:center;gap:12px;margin:0;padding:12px 4px;border-bottom:1px solid rgba(166,90,20,.16);cursor:pointer;border-radius:0;background:transparent!important;border-left:0;border-right:0;border-top:0;box-shadow:none!important;text-align:left}',
'.c3-rg li:hover{background:rgba(166,90,20,.05)!important}',
'.c3-rg li.on{border-bottom-color:'+G+'}',
'.c3-rg .l b{display:block;font:500 14px/1.1 Poppins,sans-serif;color:#2b2916!important}',
'.c3-rg .l small{display:block;margin-top:4px;font:300 10.5px/1.2 Poppins,sans-serif;color:rgba(43,41,22,.55)!important}',
'.c3-rg .m{height:2px;border-radius:2px;background:rgba(43,41,22,.1);overflow:hidden}',
'.c3-rg .m i{display:block;height:100%;width:var(--w);background:linear-gradient(90deg,rgba(166,90,20,.4),'+G+')}',
'.c3-rg .v{text-align:right}.c3-rg .v b{display:block;font:600 15px/1 Poppins,sans-serif;color:#a65a14!important}.c3-rg .v small{display:block;margin-top:4px;font:300 10.5px/1.2 Poppins,sans-serif;color:rgba(43,41,22,.55)!important}',
'.c3-rg li.on .v small{color:#a65a14!important}',
'.c3-rgn{margin:12px 0 0;font:300 11.5px/1.4 Poppins,sans-serif;color:rgba(43,41,22,.55)}',
B+'.cpv-ladder.c3-done>ul:not(.c3-rg){display:none!important}',
B+'.cpv-ladder h3{font:700 22px/1.15 Poppins,sans-serif!important;color:#2b2916!important}',
B+'.cpv-ladder h3 em{font-weight:300;font-style:italic;color:#a65a14}',
B+'.cml-rev .c3-rvh{margin:0 0 14px}',
B+'.cml-rev .c3-rvh p{margin:0;font:500 10px/1 Poppins,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#a65a14}',
B+'.cml-rev .c3-rvh h2{margin:8px 0 0!important;font:700 26px/1.1 Poppins,sans-serif!important;color:#2b2916!important;letter-spacing:-.01em}',
B+'.cml-rev .c3-rvh h2 em{font-weight:300;font-style:italic;color:#a65a14}',
B+'.cml-rev .c3-rvt{display:none!important}',
B+'.cml-rev button.c3-rb{background:transparent!important;border:1px solid '+G+'!important;color:#a65a14!important;border-radius:999px!important;box-shadow:none!important}',
B+'.cml-rev button.c3-rb *{color:#a65a14!important;fill:'+G+'!important;stroke:'+G+'!important}',
B+'.cml-rev .c3-bar0{background:rgba(43,41,22,.1)!important}',
B+'.cml-rev .c3-bar1{background:#a65a14!important}',
B+'.cml-bar{background:#f6efe9!important;border-top:1px solid rgba(166,90,20,.3)!important;box-shadow:0 -14px 28px -18px rgba(43,41,22,.2)!important}',
B+'.cml-bar .t b{font:400 12px/1.25 Poppins,sans-serif!important;color:rgba(43,41,22,.75)!important}',
B+'.cml-bar .t span{font:600 16px/1.1 Poppins,sans-serif!important;color:#a65a14!important}',
B+'.cml-bar .go{background:#a65a14!important;border-color:'+G+'!important;color:'+K+'!important;font:600 14.5px/1 Poppins,sans-serif!important;border-radius:999px!important;box-shadow:none!important}',
B+'.cml-bar .c3-bwa{display:grid;place-items:center;flex:none;width:44px;height:44px;margin:0 8px 0 0;border-radius:50%;border:1px solid rgba(166,90,20,.45);background:transparent}',
B+'.cml-bar .c3-bwa svg{width:20px;height:20px;fill:'+GL+'}',
'@media(max-width:767px){'+B+'.cml-bar .q{display:none!important}'+B+'.cml-bar img{display:none!important}}',
B+'#modal-cart .modal-title.c3-st{font:700 22px/1.1 Poppins,sans-serif!important;letter-spacing:-.01em!important;text-transform:none!important;color:#2b2916!important}',
B+'#modal-cart .modal-title.c3-st em{font-weight:300;font-style:italic;color:#a65a14!important}',
B+'#modal-cart .cart-item-discount-badge{color:#a65a14!important;background:transparent!important}',
B+'#modal-cart a.cart-item-name{font:500 14px/1.3 Poppins,sans-serif!important}',
B+'#modal-cart .cml-cbk{background:transparent!important;border:0!important;padding:0!important;margin:0 0 6px!important;font:300 13px/1.3 Poppins,sans-serif!important;color:rgba(166,90,20,.9)!important}',
B+'#modal-cart .cml-cbk *{font:inherit!important;color:inherit!important}',
B+'#modal-cart .cml-cbk b,'+B+'#modal-cart .cml-cbk strong{font-weight:500!important;color:#a65a14!important}',
B+'#modal-cart .cml-cbk img,'+B+'#modal-cart .cml-cbk svg{display:none!important}',
B+'#modal-cart .cml-pay{font:300 12.5px/1.3 Poppins,sans-serif!important;color:rgba(43,41,22,.7)!important}',
B+'#modal-cart #ajax-cart-submit-div input.btn-primary{background:#a65a14!important;border-color:'+G+'!important;color:'+K+'!important;font:600 15px/1 Poppins,sans-serif!important;letter-spacing:0!important;box-shadow:none!important}',
B+'#modal-cart #ajax-cart-submit-div input.btn-primary:hover{background:'+GL+'!important;border-color:'+GL+'!important}',
B+'#modal-cart button.cg-trig{border:1px solid rgba(166,90,20,.3)!important;border-radius:14px!important;background:transparent!important}',
'#cml-qb .p{background:#f6efe9!important;color:#2b2916!important;border:1px solid rgba(166,90,20,.25)!important;font-family:Poppins,system-ui,sans-serif!important}',
'#cml-qb .h span{font:500 10px/1 Poppins,sans-serif!important;letter-spacing:.2em!important;text-transform:uppercase!important;color:#a65a14!important}',
'#cml-qb .h h3{font:700 24px/1.1 Poppins,sans-serif!important;letter-spacing:-.01em!important;text-transform:none!important;color:#2b2916!important}',
'#cml-qb .h h3 em{font-weight:300;font-style:italic;color:#a65a14}',
'#cml-qb .h .x{background:transparent!important;color:#2b2916!important;border:0!important;font:200 26px/1 Poppins,sans-serif!important}',
'#cml-qb .c{gap:6px!important}',
'#cml-qb .c button{padding:7px 13px!important;border-radius:999px!important;border:1px solid rgba(166,90,20,.35)!important;background:transparent!important;color:rgba(43,41,22,.85)!important;font:400 12px/1 Poppins,sans-serif!important;text-transform:none!important;box-shadow:none!important}',
'#cml-qb .c button.on{background:#a65a14!important;border-color:'+G+'!important;color:'+K+'!important;font-weight:500!important}',
'#cml-qb .c3-qn{margin:2px 0 10px;font:300 12px/1.3 Poppins,sans-serif;color:#a65a14}',
'#cml-qb .r{display:grid!important;grid-template-columns:56px minmax(0,1fr) auto!important;align-items:center!important;gap:12px!important;padding:10px!important;margin:0 0 8px!important;border-radius:16px!important;background:#f6efe9!important;border:1px solid rgba(166,90,20,.14)!important;box-shadow:none!important}',
'#cml-qb .r.c3-in{border-color:'+G+'!important}',
'#cml-qb .r .im{width:56px!important;height:56px!important;border-radius:12px!important;overflow:hidden;background:#f6efe9}',
'#cml-qb .r .im img{width:100%!important;height:100%!important;object-fit:cover}',
'#cml-qb .r .tg{display:none!important}',
'#cml-qb .r .tx b{display:block;font:400 13px/1.3 Poppins,sans-serif!important;color:#2b2916!important}',
'#cml-qb .r .pz{display:flex;align-items:baseline;gap:6px;margin-top:4px}',
'#cml-qb .r .pz s{font:300 11px/1 Poppins,sans-serif!important;color:rgba(43,41,22,.45)!important}',
'#cml-qb .r .pz i{font:600 14px/1 Poppins,sans-serif!important;font-style:normal!important;color:#a65a14!important}',
'#cml-qb .r .ac{display:flex;flex-direction:column;align-items:flex-end;gap:6px}',
'#cml-qb .r .ad{min-height:32px!important;padding:0 14px!important;border-radius:999px!important;border:1px solid '+G+'!important;background:transparent!important;color:#a65a14!important;font:500 12px/1 Poppins,sans-serif!important;text-transform:none!important;letter-spacing:0!important;box-shadow:none!important}',
'#cml-qb .r .ad:hover{background:#a65a14!important;color:'+K+'!important}',
'#cml-qb .r .st{display:inline-flex!important;align-items:center;border:1px solid rgba(166,90,20,.45)!important;border-radius:999px!important;background:transparent!important;overflow:hidden}',
'#cml-qb .r .st button{width:28px!important;height:28px!important;background:transparent!important;border:0!important;color:#a65a14!important;font:300 16px/1 Poppins,sans-serif!important}',
'#cml-qb .r .st input{width:24px!important;background:transparent!important;border:0!important;color:#2b2916!important;text-align:center;font:500 13px/1 Poppins,sans-serif!important}',
'#cml-qb .f{background:#f6efe9!important;border-top:1px solid rgba(166,90,20,.3)!important;color:#2b2916!important}',
'#cml-qb .f .sm small{font:300 11px/1 Poppins,sans-serif!important;color:rgba(43,41,22,.6)!important}',
'#cml-qb .f .sm b{font:600 18px/1.1 Poppins,sans-serif!important;color:#a65a14!important}',
'#cml-qb .f .sm em{font:300 11px/1 Poppins,sans-serif!important;font-style:normal!important;color:rgba(43,41,22,.6)!important}',
'#cml-qb .f .go{border-radius:999px!important;background:#a65a14!important;border:0!important;color:'+K+'!important;font:600 14px/1 Poppins,sans-serif!important;text-transform:none!important;letter-spacing:0!important;box-shadow:none!important}',
'#cml-qb.open~.c1-dock,html body:has(#cml-qb.open) .c1-dock{opacity:0!important;pointer-events:none!important}'
]);
function css(){if(D.getElementById("c3-css"))return;var s=D.createElement("style");s.id="c3-css";s.textContent=CSS.join("\n");(D.head||D.documentElement).appendChild(s)}
css();
var EMO=/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B50}\u{2B55}\u{1F000}-\u{1F2FF}]️?/gu;
function noEmoji(root){if(!root)return;var w=D.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),n,L=[];while((n=w.nextNode())){EMO.lastIndex=0;if(EMO.test(n.nodeValue))L.push(n)}L.forEach(function(x){var p=x.parentNode;if(!p||/^(SCRIPT|STYLE)$/.test(p.nodeName))return;x.nodeValue=x.nodeValue.replace(EMO,"").replace(/^\s+/," ").replace(/\s{2,}/g," ")})}
function kind(n){n=n.toLowerCase();if(/combo/.test(n))return"Combo";if(/\bkit\b|ternura|desdobramento|flowers|best sellers/.test(n))return"Kit presente";if(/trouxinha/.test(n))return"Trouxinha";if(/c[aá]psula/.test(n))return"Cápsula de chá";if(/ch[aá] blend|blend/.test(n))return"Chá misto";if(/infus[aã]o|ch[aá]/.test(n))return"Infusão natural";if(/granola/.test(n))return"Granola";if(/chocolate|choco|stroopwafel|wafel|wafer/.test(n))return"Snack";if(/desidratad/.test(n))return"Fruta desidratada";if(/x[ií]cara|garrafa|infusor|chaleira|raspador/.test(n))return"Acessório";return""}
var kit=false;
function head(pd){var h=pd.querySelector("h1.js-product-name");if(!h||h.__c3)return!!h;h.__c3=1;var full=h.textContent.trim();
 var m=full.match(/^(.*?)(\s+\d+[\.,]?\d*\s?(g|kg|ml|un|unid\.?|unidades)\b.*|\s+-\s+.*|\s*\(.*\)\s*)$/i),base=(m?m[1]:full).trim(),tail=m?m[2].replace(/^\s*-\s*/,"").replace(/[()]/g,"").trim():"";
 kit=/kit presente|combo/i.test(kind(full))||/kit/i.test(location.pathname);
 var w=base.split(" "),html;if(w.length>1){var l=w.pop();html=esc(w.join(" "))+" <em>"+esc(l)+"</em>"}else if(base.length>=6){var c=Math.floor(base.length/2);html=esc(base.slice(0,c))+"<em>"+esc(base.slice(c))+"</em>"}else html=esc(base);
 h.innerHTML=html+(tail?'<span class="c3-vh"> '+esc(tail)+'</span>':"");h.setAttribute("aria-label",full);
 var ey=D.createElement("p");ey.className="c3-ey";var kd=kind(full);ey.textContent=[kd,tail.toLowerCase().replace(/\s+/g," ")].filter(Boolean).join(" · ");if(ey.textContent)h.parentNode.insertBefore(ey,h);
 return true}
function proof(pd){var h=pd.querySelector("h1.js-product-name");if(!h)return false;var p=pd.querySelector(".c3-prt");
 var sold=pd.querySelector(".product-sold-count"),st=sold?sold.textContent.replace(/\s+/g," ").trim().toLowerCase():"";
 var cnt=[].filter.call(pd.querySelectorAll(".product-content span"),function(s){return/^\(\d+\)$/.test(s.textContent.trim())})[0];
 var n=-1,avg=0,box=null;if(cnt){box=cnt;while(box.parentElement&&box.parentElement!==h.parentElement)box=box.parentElement;n=parseInt(cnt.textContent.replace(/\D/g,""),10)||0;var s=0,ws=box.querySelectorAll("clipPath rect, clippath rect");[].forEach.call(ws,function(r){s+=(parseFloat(r.getAttribute("width"))||0)/20});avg=ws.length?s:0}
 var parts=[];if(n>0)parts.push('<span><i aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg></i><b>'+(avg?avg.toFixed(1).replace(".",","):"5,0")+'</b></span><span>'+n+(n===1?" avaliação":" avaliações")+'</span>');
 if(st)parts.push("<span>"+esc(st)+"</span>");if(kit&&/kit/i.test(location.pathname+(h.getAttribute("aria-label")||"")))parts.push("<span>caixa inclusa</span>");
 var html=parts.join("");if(!html)return!!sold||D.readyState==="complete";
 if(!p){p=D.createElement("div");p.className="c3-prt";h.parentNode.insertBefore(p,h.nextSibling)}if(p.__h!==html){p.__h=html;p.innerHTML=html}
 if(box&&box!==h&&!box.classList.contains("c3-hide"))box.classList.add("c3-hide");
 [].forEach.call(pd.querySelectorAll(".product-content *"),function(e){if(e.children.length<3&&/um dos mais vendidos/i.test(e.textContent)&&!e.classList.contains("c3-hide")){var t=e;while(t.parentElement&&t.parentElement.textContent.trim()===t.textContent.trim()&&t.parentElement!==h.parentElement)t=t.parentElement;t.classList.add("c3-hide")}});
 return n>=0}
function price(pd){var pc=pd.querySelector(".js-price-container");if(!pc)return false;var pr=pd.querySelector("#price_display")||pd.querySelector(".js-price-display");var v=pr?num(pr.textContent):0;
 var pix=pd.querySelector(".product-payment-discount");if(pix){var pct=(pix.textContent.match(/(\d+)\s*%/)||[])[1];if(pct&&pix.getAttribute("data-c3")!==pct+"% off no Pix")pix.setAttribute("data-c3",pct+"% off no Pix")}
 var cb=pc.querySelector(".c3-cb");if(!cb){cb=D.createElement("p");cb.className="c3-cb";pc.appendChild(cb)}var hh=v>0?'+ <b>'+brl(Math.round(v*5)/100)+'</b> de cashback':"";if(cb.__h!==hh){cb.__h=hh;cb.innerHTML=hh;cb.hidden=!hh}
 if(pr&&!pr.__c3o){pr.__c3o=1;try{new MutationObserver(function(){price(pd)}).observe(pr,{childList:true,characterData:true,subtree:true})}catch(e){}}
 return true}
function wa(pd){if(pd.querySelector(".c3-wal"))return true;var src=D.querySelector('a.btn-whatsapp[href*="wa.me"],a[href*="wa.me/55"]'),hr=src?src.getAttribute("href").split("?")[0]:"https://wa.me/554791571974",nm=(pd.querySelector("h1.js-product-name")||{}).getAttribute?pd.querySelector("h1.js-product-name").getAttribute("aria-label")||pd.querySelector("h1.js-product-name").textContent.trim():"";var b=D.createElement("a");b.className="c3-wal";b.target="_blank";b.rel="noopener noreferrer";b.href=hr+"?text="+encodeURIComponent("Olá! Quero comprar"+(nm?" o "+nm:"")+" pelo WhatsApp.");b.innerHTML=WAS+'<span>Prefere comprar pelo WhatsApp? <u>Fale com a gente</u></span>';[].forEach.call(pd.querySelectorAll("button.cml-wa2"),function(x){x.classList.add("c3-hide")});
 var anchor=pd.querySelector("button.cml-shb")||(D.readyState==="complete"?pd.querySelector(".product-actions"):null);if(!anchor||!anchor.parentNode)return false;anchor.parentNode.insertBefore(b,anchor.nextSibling);return true}
function ship(pd){var e=pd.querySelector("button.cml-shb em");if(e&&!e.__c3){e.__c3=1;e.textContent="O valor varia conforme a sua região"}return!!e}
function ladder(){var L=D.querySelector(".cpv-ladder");if(!L)return D.readyState==="complete";if(L.classList.contains("c3-done"))return true;var ul=L.querySelector("ul");if(!ul)return false;
 var rows=[].map.call(ul.querySelectorAll("li"),function(li){var b=li.querySelector("b"),e=li.querySelector("em"),s=li.querySelector("small");return{q:b?b.textContent.trim():"",pc:e?num(e.textContent):0,tot:s?num((s.textContent.match(/R\$\s?[\d.,]+/)||[""])[0]):0,raw:s?s.textContent:""}}).filter(function(r){return r.q&&r.pc});if(rows.length<2)return true;
 var base=rows[0].pc,minI=0;rows.forEach(function(r,i){if(r.pc<rows[minI].pc)minI=i});
 var h3=L.querySelector("h3");if(h3&&!h3.querySelector("em")){var t=h3.textContent.trim(),m=t.match(/^(.*?)(cai.*)$/i);if(m)h3.innerHTML=esc(m[1])+"<em>"+esc(m[2])+"</em>"}
 var p=L.querySelector(".cpv-ladder-head p");if(p)p.textContent="O desconto já vem aplicado. Toque numa opção para escolher a quantidade.";
 var ol=D.createElement("ul");ol.className="c3-rg";ol.setAttribute("role","list");
 ol.innerHTML=rows.map(function(r,i){var n=parseInt(r.q,10)||1,cups=Math.round(r.tot/r.pc),off=Math.round((1-r.pc/base)*100),w=Math.max(8,Math.round(r.pc/base*100));return'<li role="button" tabindex="0" data-q="'+esc(r.q)+'"'+(i===minI?' class="on"':"")+'><span class="l"><b>'+esc(r.q)+'</b><small>'+(cups?cups+" xícaras · ":"")+(r.tot?brl(r.tot).replace(",00",""):"")+'</small></span><span class="m"><i style="--w:'+w+'%"></i></span><span class="v"><b>'+brl(r.pc)+'</b><small>'+(i===0?"por xícara":off+"% a menos")+'</small></span></li>'}).join("");
 ul.parentNode.insertBefore(ol,ul.nextSibling);L.classList.add("c3-done");
 function pick(li){var q=li.getAttribute("data-q").toLowerCase();var bt=[].filter.call(D.querySelectorAll("#product_form .js-variant-button"),function(a){return a.textContent.trim().toLowerCase().indexOf(q)===0})[0];if(bt){bt.click();var f=D.querySelector("#product_form .product-actions")||bt;try{f.scrollIntoView({behavior:"smooth",block:"center"})}catch(e){f.scrollIntoView()}}}
 ol.addEventListener("click",function(e){var li=e.target.closest("li");if(li)pick(li)});ol.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){var li=e.target.closest("li");if(li){e.preventDefault();pick(li)}}});
 return true}
function kitFix(){var t=[].filter.call(D.querySelectorAll(".cml-f-top h2"),function(h){return/para presentear quem merece/i.test(h.textContent)});t.forEach(function(h){h.classList.add("c3-dup")});return true}
function reviews(){var r=D.querySelector(".cml-rev");if(!r)return D.readyState==="complete";if(r.__c3done)return true;
 var t=[].filter.call(r.querySelectorAll("h1,h2,h3,h4,p,span,div"),function(e){return e.children.length===0&&/^avalia\S{1,3}es do produto$/i.test(e.textContent.trim())})[0];
 if(t&&!r.querySelector(".c3-rvh")){var hd=D.createElement("div");hd.className="c3-rvh";hd.innerHTML='<p>Avaliações</p><h2>Quem provou, <em>conta</em></h2>';t.parentNode.insertBefore(hd,t);t.classList.add("c3-rvt")}
 [].forEach.call(r.querySelectorAll("button"),function(b){if(!b.classList.contains("c3-rb")&&/adicionar avalia|ordenar/i.test(b.textContent))b.classList.add("c3-rb")});
 var bars=[].filter.call(r.querySelectorAll("div"),function(e){if(e.__c3b)return false;var h=e.offsetHeight;return h>0&&h<=10&&e.offsetWidth>40&&e.children.length<=1});
 var cs=bars.map(function(e){return getComputedStyle(e).backgroundColor});bars.forEach(function(e,i){e.__c3b=1;var m=cs[i].match(/\d+/g);if(!m)return;var lum=(+m[0]+ +m[1]+ +m[2])/3;if(lum>180)e.classList.add("c3-bar0");else if(lum>40)e.classList.add("c3-bar1")});if(t&&bars.length>=5)r.__c3done=1;
 return!!t}
function bar(){var b=D.querySelector(".cml-bar");if(!b)return D.readyState==="complete";if(b.querySelector(".c3-bwa"))return true;var go=b.querySelector(".go");if(!go)return false;var a=D.createElement("a");a.className="c3-bwa";a.target="_blank";a.rel="noopener noreferrer";a.setAttribute("aria-label","Fale com a gente no WhatsApp");var src=D.querySelector("a.btn-whatsapp[href]");a.href=src?src.getAttribute("href"):"https://wa.me/554791571974";a.innerHTML=WAS;go.parentNode.insertBefore(a,go);return true}
function product(){var b=D.body;if(!b||!b.classList.contains("template-product"))return true;var pd=D.querySelector(".js-product-detail");if(!pd)return D.readyState==="complete";
 var ok=true;[head,proof,price,wa,ship].forEach(function(f){try{if(!f(pd))ok=false}catch(e){}});[ladder,kitFix,reviews,bar].forEach(function(f){try{if(!f())ok=false}catch(e){}});
 if(!pd.__c3e){pd.__c3e=1;setTimeout(function(){noEmoji(D.getElementById("ns-section-product_description"));noEmoji(D.querySelector(".js-product-info"))},1500)}
 return ok}
function cart(){var m=D.getElementById("modal-cart");if(!m)return D.readyState==="complete";var t=m.querySelector(".modal-title");if(t&&!t.classList.contains("c3-st")){t.classList.add("c3-st");t.innerHTML='Sua <em>sacola</em>'}
 var p=m.querySelector(".cml-pay");if(p&&/\b3\s?%/.test(p.textContent)){var w=D.createTreeWalker(p,NodeFilter.SHOW_TEXT,null),x;while((x=w.nextNode())){if(/\b3\s?%/.test(x.nodeValue))x.nodeValue=x.nodeValue.replace(/\b3(\s?%)/,"2$1")}}
 return!!t}
function qb(){var q=D.getElementById("cml-qb");if(!q)return D.readyState==="complete";var h3=q.querySelector(".h h3");if(h3&&!h3.querySelector("em"))h3.innerHTML='Monte <em>seu pedido</em>';
 var c=q.querySelector(".p>.c");if(c&&!q.querySelector(".c3-qn")){var n=D.createElement("p");n.className="c3-qn";n.textContent="Todos com preço de Black até 22/11.";c.parentNode.insertBefore(n,c.nextSibling)}
 [].forEach.call(q.querySelectorAll(".r"),function(r){var ad=r.querySelector(".ad"),on=!!(ad&&/adicionado/i.test(ad.textContent));if(r.classList.contains("c3-in")!==on)r.classList.toggle("c3-in",on)});
 return!!h3}
function all(){var ok=true;[product,cart,qb].forEach(function(f){try{if(!f())ok=false}catch(e){}});return ok}
var n=0;(function loop(){if(!all()&&++n<60)setTimeout(loop,250)})();
var tq=0;try{new MutationObserver(function(){if(tq)return;tq=setTimeout(function(){tq=0;try{cart();qb();if(D.body&&D.body.classList.contains("template-product")){reviews();bar()}}catch(e){}},300)}).observe(D.documentElement,{childList:true,subtree:true})}catch(e){}
addEventListener("load",function(){all()});
})();


/* Chef Mais Leve: SITE PREMIUM ETAPA 4 (01/11/2026). Rodape oliva unico, faixas da home (Esquenta, compromisso, perguntas, Instagram), titulos na assinatura, blog, Nossa trajetoria, Encontre seu cha e Monte seu presente. Para desfazer: apague este bloco inteiro. */
(function(){if(window.__cmlE4)return;window.__cmlE4=1;
var FT="html body #ns-section-footer#ns-section-footer ",D=document,G="#a65a14",GL="#a65a14",K="#f6efe9",BO="#6b1e2a",B="html.cml-blk body ",P=location.pathname.replace(/\/+$/,"/");
function svg(s,c){return'url("data:image/svg+xml,'+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none' stroke='"+(c||G)+"' stroke-width='1.25' stroke-linecap='round' stroke-linejoin='round'>"+s+"</svg>")+'")'}
var F="fill='rgba(166,90,20,.12)'";
var FLI={
floral:"<circle "+F+" cx='16' cy='16' r='3.2'/><path "+F+" d='M16 12.8c-1.8-3.6-1-7.3 0-8.3 1 1 1.8 4.7 0 8.3zM16 19.2c-1.8 3.6-1 7.3 0 8.3 1-1 1.8-4.7 0-8.3zM12.8 16c-3.6-1.8-7.3-1-8.3 0 1 1 4.7 1.8 8.3 0zM19.2 16c3.6-1.8 7.3-1 8.3 0-1 1-4.7 1.8-8.3 0z'/>",
frutado:"<path "+F+" d='M16 10.5c5.5-2.5 10.5.5 10.5 5.8 0 6.2-5.6 11.2-10.5 11.2S5.5 22.5 5.5 16.3c0-5.3 5-8.3 10.5-5.8z'/><path d='M16 10.5c0-3 1.2-5 3.8-6M12.5 7.5c1.5.3 2.8 1.3 3.5 3'/><path d='M11 17h.01M15 21h.01M20 17h.01M17.5 14h.01M13 13.5h.01'/>",
especiado:"<path "+F+" d='M9 25.5c-2.2-2.2-1.6-6.3 1.3-9.2l6-6c2.9-2.9 7-3.5 9.2-1.3s1.6 6.3-1.3 9.2l-6 6c-2.9 2.9-7 3.5-9.2 1.3z'/><path d='M12.5 19.5l7-7M15.5 22.5l7-7M9.5 16.5l7-7'/>",
herbal:"<path "+F+" d='M16 27c0-8 2-14 8-20-8 1.5-13 6.5-13 13 0 2.5 2 5 5 7z'/><path d='M16 27c-1-6 0-11 4-15'/>"};
var CSS=[
FT+'.footer-main-info{background:radial-gradient(110% 90% at 30% 15%,#565229,#403d1e 70%,#2f2d16)!important;border:1px solid rgba(223,174,88,.22)!important;border-radius:28px!important;box-shadow:none!important;color:#f6efe9!important}',
FT+'.cml-brand .sl{font:700 21px/1.15 Poppins,sans-serif!important;letter-spacing:-.01em!important;color:#fff!important;font-style:normal!important}',
FT+'.cml-brand .sl em{font-weight:300;font-style:italic;color:#f3d48b}',
FT+'.cml-brand .tx{font:300 13px/1.5 Poppins,sans-serif!important;color:rgba(246,239,233,.8)!important}',
FT+'.cml-brand .ln{background:#dfae58!important;height:1px!important}',
FT+'.cml-brand .tg>*{background:transparent!important;border:1px solid rgba(223,174,88,.35)!important;color:#f6efe9!important;font:300 11px/1 Poppins,sans-serif!important}',
FT+'.js-accordion-private-container{background:transparent!important;border-color:rgba(223,174,88,.2)!important}',
FT+'.footer-menu-title,'+FT+'.footer-menu-title u{font:500 10px/1.2 Poppins,sans-serif!important;letter-spacing:.2em!important;text-transform:uppercase!important;text-decoration:none!important;color:#dfae58!important;background:transparent!important}',
FT+'.footer-menu-list a,'+FT+'.footer-menu-list a *{font:300 13.5px/1.6 Poppins,sans-serif!important;letter-spacing:0!important;text-transform:none!important;text-decoration:none!important;color:#f6efe9!important;background:transparent!important}',
FT+'.footer-menu-list a:hover{color:#f3d48b!important}',
FT+'.footer-newsletter-container{background:rgba(255,250,245,.25)!important;border:1px solid rgba(223,174,88,.3)!important;border-radius:20px!important;box-shadow:none!important}',
FT+'.footer-newsletter-title,'+FT+'.footer-newsletter-description>p:not(.c4-ey),'+FT+'.cml-nl-tx,'+FT+'.cml-nl-b{display:none!important}',
FT+'.footer-content .footer-newsletter-form p,'+FT+'.footer-content .footer-menu-list li{color:rgba(246,239,233,.7)!important}',
FT+'.footer-menu-toggle-title{background:transparent!important}',
FT+'.footer-menu-title:after{color:rgba(246,239,233,.5)!important}',
FT+'.cml-brand .sl em{display:inline!important}',
FT+'.newsletter-form-wrapper{flex-wrap:wrap!important;gap:0!important}',
FT+'.newsletter-form-wrapper input.newsletter-form-input{flex:1 1 100%!important;width:100%!important;max-width:none!important}',
FT+'.c4-ey{display:block!important;margin:0!important;font:500 10px/1.2 Poppins,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#dfae58!important}',
FT+'.c4-nb{display:block;margin:6px 0 0;font:500 17px/1.25 Poppins,sans-serif;color:#fff!important}',
FT+'.c4-nb em{font-weight:300;font-style:italic;color:#f3d48b!important}',
FT+'.cml-nl{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:8px!important}',
FT+'.cml-nl input[name="cml_nasc"]{display:none!important}',
FT+'.cml-nl>*{width:100%!important;max-width:none!important;margin:0!important;grid-column:auto!important}',
FT+'.footer-newsletter-form input.form-control{min-height:44px!important;padding:0 16px!important;border-radius:999px!important;background:rgba(246,239,233,.08)!important;border:1px solid rgba(246,239,233,.22)!important;color:#f6efe9!important;font:300 13.5px/1 Poppins,sans-serif!important;box-shadow:none!important}',
FT+'.footer-newsletter-form input.form-control::placeholder{color:rgba(246,239,233,.6)!important}',
FT+'.footer-newsletter-form [type="submit"],'+FT+'.footer-newsletter-form button{width:100%!important;min-height:44px!important;margin:8px 0 0!important;border-radius:999px!important;background:#a65a14!important;border:0!important;color:#fff!important;font:600 14px/1 Poppins,sans-serif!important;letter-spacing:0!important;text-transform:none!important;box-shadow:none!important}',

FT+'.footer-newsletter-form small,'+FT+'.footer-newsletter-form p{color:rgba(246,239,233,.6)!important;font-weight:300!important}',
'@media(min-width:768px){html:not(.cml-blk) body .js-nav-desktop-list>li>a:not([href*="ofertas"]):not([href*="presentes-de-natal"]):not([href*="black"]),html:not(.cml-blk) body .js-nav-desktop-list>li>div>a:not([href*="ofertas"]):not([href*="presentes-de-natal"]):not([href*="black"]){color:#2b2916!important}}',
'.c4-sig em{font-weight:300!important;font-style:italic!important;color:#a65a14!important;letter-spacing:-.01em}',
B+'.cpvp-head .heading-block.c4-sig,'+B+'.cml-nc h2.c4-sig,'+B+'.cml-ig-t h2.c4-sig{font-weight:700!important;letter-spacing:-.015em!important}',
B+'#cml-bkh .cbkh-eb i,'+B+'#cml-bkh .cbkh-cd{display:none!important}',
B+'#cml-bkh .cbkh-eb{font:500 10px/1.2 Poppins,sans-serif!important;letter-spacing:.22em!important;text-transform:uppercase!important;color:#a65a14!important}',
B+'#cml-bkh .cbkh-h{font:700 34px/1.08 Poppins,sans-serif!important;letter-spacing:-.02em!important;text-transform:none!important}',
'@media(max-width:767px){'+B+'#cml-bkh .cbkh-h{font-size:26px!important}}',
B+'#cml-bkh .cbkh-s{font:300 14px/1.5 Poppins,sans-serif!important;color:rgba(43,41,22,.75)!important}',
B+'#cml-bkh .cbkh-btn{background:#a65a14!important;color:'+K+'!important;border:0!important;border-radius:999px!important;font:600 14px/1 Poppins,sans-serif!important;box-shadow:none!important}',
B+'#cml-bkh .cbkh-btn em{font-style:normal!important;color:'+K+'!important}',
B+'.cml-nc-l{display:flex!important;flex-wrap:wrap!important;gap:10px 24px!important}',
B+'.cml-nc-l a{font:400 13.5px/1.3 Poppins,sans-serif!important;text-decoration:none!important;border:0!important}',
B+'.cml-nc-l a:after{content:"→";margin-left:8px;font-weight:300}',
B+'.cml-nc-k{font:500 10px/1.2 Poppins,sans-serif!important;letter-spacing:.22em!important}',
B+'.cml-nc-p{font-weight:300!important}',
B+'.cml-faq .accordion-item-toggle-text{font:400 15px/1.4 Poppins,sans-serif!important}',
B+'.cml-faq .accordion-item{border-color:rgba(166,90,20,.16)!important}',
B+'.cml-faq .c4-fq{font-style:normal;color:#2b2916}',
B+'.cml-faq [aria-expanded="true"] .c4-fq{color:#a65a14}',
B+'.cml-faq .accordion-item-toggle-icon{background:transparent!important;box-shadow:none!important}',
B+'.cml-faq .accordion-item-toggle-icon,'+B+'.cml-faq .accordion-item-toggle-icon *{color:#a65a14!important;border-color:'+G+'!important}',
B+'.cml-faq .accordion-item-body,'+B+'.cml-faq .accordion-item-body *{font-weight:300!important}',
B+'.cml-faq .btn,'+B+'.cml-faq a.btn-primary{background:transparent!important;border:1px solid '+G+'!important;color:#a65a14!important;border-radius:999px!important;box-shadow:none!important}',
B+'.cml-ig-b,'+B+'[data-section-id^="instagram"] a.btn-primary{background:transparent!important;border:1px solid '+G+'!important;color:#a65a14!important;border-radius:999px!important;box-shadow:none!important;font:500 14px/1 Poppins,sans-serif!important;text-transform:none!important}',
B+'.cml-ig-b:hover,'+B+'[data-section-id^="instagram"] a.btn-primary:hover{background:#a65a14!important;color:'+K+'!important}',
B+'.cml-ig-t .k{font:500 10px/1.2 Poppins,sans-serif!important;letter-spacing:.22em!important}',
B+'.blog-page .post-item-title{font:500 17px/1.3 Poppins,sans-serif!important;color:#2b2916!important;text-transform:none!important}',
B+'.blog-page .post-item-summary{font:300 13.5px/1.55 Poppins,sans-serif!important;color:rgba(43,41,22,.7)!important}',
B+'.blog-page .post-item{background:#fffaf5!important;border:1px solid rgba(166,90,20,.18)!important;box-shadow:none!important}',
B+'.blog-page .post-item-information,'+B+'.blog-page .post-item-link{background:transparent!important}',
B+'.blog-page .post-item .post-item-read-more.btn-link{display:inline-flex!important;align-items:center;min-height:38px;margin-top:12px;padding:0 18px!important;border:1px solid '+G+'!important;border-radius:999px!important;background:transparent!important;color:#a65a14!important;font:500 13px/1 Poppins,sans-serif!important;text-decoration:none!important;text-transform:none!important}',
B+'.blog-page .post-item:hover .post-item-read-more.btn-link{background:#a65a14!important;color:'+K+'!important}',
B+'.page-header-title.c4-sig{font-weight:700!important;letter-spacing:-.02em!important}',
B+'.cml-story h2.c4-sig{font-weight:700!important;letter-spacing:-.015em!important}',
B+'.cml-story .st-k{font:500 10px/1.2 Poppins,sans-serif!important;letter-spacing:.22em!important;text-transform:uppercase!important}',
B+'.cml-story p{font-weight:300!important}',
B+'.cml-story p strong{font-weight:500!important;color:#2b2916!important}',
B+'.cml-story h2{color:#2b2916!important}',
B+'.cml-story p{color:rgba(43,41,22,.82)!important}',
B+'.cml-story .cml-st-cards>div>b{color:#2b2916!important}',
B+'.cml-story .cml-st-cards>div>span{color:rgba(43,41,22,.72)!important}',
B+'.cml-story .cml-st-cards>div{background:#fffaf5!important;border:1px solid rgba(166,90,20,.2)!important;text-align:left!important;display:grid!important;grid-template-columns:auto minmax(0,1fr)!important;column-gap:16px!important;align-items:start!important;padding:18px 20px!important;min-height:0!important}',
B+'.cml-story .cml-st-cards>div>i{grid-row:1/3;width:auto!important;height:auto!important;margin:0!important;background:transparent!important;border:0!important;box-shadow:none!important;font:200 44px/.9 Poppins,sans-serif!important;font-style:normal!important;min-width:30px;text-align:center;color:#a65a14!important}',
B+'.cml-story .cml-st-cards>div>b{font:500 15.5px/1.3 Poppins,sans-serif!important}',
B+'.cml-story .cml-st-cards>div>span{font:300 13.5px/1.5 Poppins,sans-serif!important}',
B+'.cml-story .cml-st-end a.cml-st-btn:not(.alt){background:#a65a14!important;border-color:'+G+'!important;color:'+K+'!important;border-radius:999px!important;font:600 14px/1 Poppins,sans-serif!important;box-shadow:none!important}',
B+'.cml-st-btn.alt{background:transparent!important;border:0!important;color:#a65a14!important;font-weight:400!important;text-decoration:underline!important;text-underline-offset:4px;padding-left:8px!important;padding-right:8px!important}',
B+'.cef-in{background:#f6efe9!important;border:1px solid rgba(166,90,20,.2)!important;color:#2b2916!important}',
B+'.cef-eb{font:500 10px/1.2 Poppins,sans-serif!important;letter-spacing:.22em!important;color:#a65a14!important}',
B+'.cef-h{font-weight:700!important;color:#2b2916!important}',
B+'.cef-h em{font-weight:300!important;font-style:italic!important;color:#a65a14!important}',
B+'.cef-sub{font-weight:300!important;color:rgba(43,41,22,.75)!important}',
B+'.cef-steps{color:rgba(43,41,22,.6)!important;gap:6px!important}',
B+'.cef-step i{width:22px!important;height:22px!important;border:1px solid rgba(166,90,20,.4)!important;background:transparent!important;color:rgba(43,41,22,.6)!important;font:400 10.5px/1 Poppins,sans-serif!important}',
B+'.cef-step.on{color:#a65a14!important;font-weight:500!important}',
B+'.cef-step.on i{background:#a65a14!important;border-color:'+G+'!important;color:'+K+'!important;font-weight:600!important}',
B+'.cef-step.done i{color:#a65a14!important}',
B+'.cef-sep{background:rgba(166,90,20,.35)!important;width:12px!important}',
B+'.cef-q{font:500 16px/1.35 Poppins,sans-serif!important;color:#2b2916!important}',
B+'.cef-way{background:#fffaf5!important;border:1px solid rgba(166,90,20,.22)!important;border-radius:18px!important;box-shadow:none!important;color:#2b2916!important}',
B+'.cef-way:hover{border-color:'+G+'!important;transform:none!important}',
B+'.cef-way svg{box-sizing:border-box;width:42px!important;height:42px!important;padding:10px;border-radius:50%;background:'+K+';border:1px solid rgba(166,90,20,.35);color:#a65a14!important;flex:none}',
B+'.cef-way svg *{stroke-width:1.25!important}',
B+'.cef .cef-way svg{display:block!important}',
B+'.cef .cef-way:before{content:none!important;display:none!important}',
B+'.cef .c4-w{font-style:normal;color:#2b2916}',
B+'.cef .cef-q .c4-w{color:#2b2916}',
B+'.cef-way b{font:500 16.5px/1.25 Poppins,sans-serif!important;color:#2b2916!important}',
B+'.cef-way span{font:300 13.5px/1.45 Poppins,sans-serif!important;color:rgba(43,41,22,.65)!important}',
B+'.cef-way em{font:400 13px/1 Poppins,sans-serif!important;color:#a65a14!important}',
B+'.cef-way:after{color:#a65a14!important;font-weight:200!important}',
B+'.cef-opt{min-height:40px!important;padding:8px 16px!important;border:1px solid rgba(166,90,20,.3)!important;background:transparent!important;color:#2b2916!important;font:300 14px/1.2 Poppins,sans-serif!important;box-shadow:none!important}',
B+'.cef-opt:hover{border-color:'+G+'!important}',
B+'.cef .cef-opts:not(.fl){gap:8px!important}',
B+'.cef .cef-opts:not(.fl) .cef-opt{flex:0 1 auto!important;justify-content:flex-start!important;text-align:left!important}',
B+'.cef-opt[aria-pressed="true"]{background:#a65a14!important;border-color:'+G+'!important;color:'+K+'!important;font-weight:500!important}',
B+'.cef-opt small{font-weight:300!important;color:rgba(43,41,22,.6)!important;opacity:1!important}',
B+'.cef-opts.fl .cef-opt{border-radius:16px!important;padding:12px 14px!important;align-items:center!important;background:#fffaf5!important}',
B+'.cef-opts.fl .cef-opt>span:last-child{font-weight:500}',
B+'.cef-dot{width:30px!important;height:30px!important;margin:0!important;border-radius:0!important;background-color:transparent!important;background-position:center!important;background-size:contain!important;background-repeat:no-repeat!important}',
B+'.cef-opt[data-pick="floral"] .cef-dot{background-image:'+svg(FLI.floral)+'!important}',
B+'.cef-opt[data-pick="frutado"] .cef-dot{background-image:'+svg(FLI.frutado)+'!important}',
B+'.cef-opt[data-pick="especiado"] .cef-dot{background-image:'+svg(FLI.especiado)+'!important}',
B+'.cef-opt[data-pick="herbal"] .cef-dot{background-image:'+svg(FLI.herbal)+'!important}',
B+'.cef-search{background:rgba(43,41,22,.06)!important;border:1px solid rgba(166,90,20,.3)!important}',
B+'.cef-search input{color:#2b2916!important;font-weight:300!important}',
B+'.cef-back{color:#a65a14!important;font:400 14px Poppins,sans-serif!important}',
B+'.cef-btn{background:#a65a14!important;color:'+K+'!important;box-shadow:none!important;font:600 14.5px/1 Poppins,sans-serif!important}',
B+'.cef-btn:hover{background:'+GL+'!important}',
B+'.cef-chosen.c4-rt{margin:0!important;font:700 24px/1.15 Poppins,sans-serif!important;letter-spacing:-.015em;color:#2b2916!important}',
B+'.cef-chosen.c4-rt em{font-weight:300;font-style:italic;color:#a65a14}',
B+'.cef-sw{color:rgba(43,41,22,.8)!important;font-weight:300!important}',
B+'.cef-sw input{background:rgba(43,41,22,.15)!important}',
B+'.cef-sw input:checked{background:#a65a14!important}',
B+'.cef-card{background:#fffaf5!important;border:1px solid rgba(166,90,20,.2)!important;border-radius:20px!important;color:#2b2916!important}',
B+'.cef-ct h3{font:700 20px/1.15 Poppins,sans-serif!important;color:#2b2916!important}',
B+'.cef-ct h3 em{font-weight:300;font-style:italic;color:#a65a14}',
B+'.cef-th{border-radius:12px!important}',
B+'.cef-tag{background:transparent!important;border:1px solid rgba(166,90,20,.3)!important;color:#a65a14!important;font:400 11px/1 Poppins,sans-serif!important}',
B+'.cef-tag.w{border-color:rgba(166,90,20,.6)!important}',
B+'.cef-lead{font-weight:300!important;color:rgba(43,41,22,.85)!important}',
B+'.cef-ings{color:rgba(43,41,22,.6)!important;font-weight:300!important}',
B+'.cef-ings b{color:#a65a14!important;font-weight:500!important}',
B+'.cef-ings.c4-hide{display:none!important}',
B+'.cef-warn{background:rgba(166,90,20,.08)!important;color:#a65a14!important;font-weight:300!important}',
B+'.cef-sheet{border-color:rgba(166,90,20,.2)!important}',
B+'.cef-sheet summary{color:#2b2916!important;font-weight:500!important}',
B+'.cef-sheet summary:after{color:#a65a14!important;font-weight:200!important}',
B+'.cef-tb th{color:rgba(43,41,22,.6)!important;font-weight:300!important}',
B+'.cef-tb td{color:#2b2916!important;font-weight:300!important}',
B+'.cef-tb th,'+B+'.cef-tb td{border-color:rgba(166,90,20,.14)!important}',
B+'.cef-note{color:rgba(43,41,22,.5)!important}',
B+'.cef-buy{border-color:rgba(166,90,20,.2)!important}',
B+'.cef-pr{color:rgba(43,41,22,.6)!important;font-weight:300!important}',
B+'.cef-pr b{color:#a65a14!important;font-weight:600!important}',
B+'.cef-empty{border-color:rgba(166,90,20,.3)!important;color:rgba(43,41,22,.7)!important}',
B+'.cef-foot{border-color:rgba(166,90,20,.2)!important;color:rgba(43,41,22,.6)!important;font-weight:300!important}',
B+'.cef-link{color:#a65a14!important;font-weight:400!important;text-decoration:none!important}',
'#cml-natal .cmn-hero{background:radial-gradient(110% 90% at 20% 15%,#7a2232,#5c1823 55%,#4a141d)!important;color:#f6efe9!important}',
'#cml-natal .cmn-lights b{background:#a65a14!important;box-shadow:0 0 10px 2px rgba(166,90,20,.45)!important}',
'#cml-natal .cmn-eb{font:500 10px/1.2 Poppins,sans-serif!important;letter-spacing:.22em!important;color:#a65a14!important}',
'#cml-natal .cmn-hero h1{font-weight:700!important;color:#fff!important}',
'#cml-natal .cmn-hero h1 em{font-weight:300!important;font-style:italic!important;color:#f3d48b!important}',
'#cml-natal .cmn-hero p.cmn-lead{font-weight:300!important}',
'#cml-natal .cmn-val{display:flex!important;flex-wrap:wrap!important;align-items:center!important;gap:4px 10px!important;padding:12px 16px!important;border:1px solid #e8ddd0!important;border-radius:16px!important;background:#fff!important}',
'#cml-natal .cmn-val>b{display:inline-flex!important;align-items:center;gap:8px;font:500 13px/1.3 Poppins,sans-serif!important;color:#5c1823!important}',
'#cml-natal .cmn-val>b svg{color:'+BO+'!important;stroke:'+BO+'}',
'#cml-natal .cmn-val ul{display:inline!important;margin:0!important;padding:0!important}',
'#cml-natal .cmn-val li{display:inline!important;margin:0!important;padding:0!important;background:transparent!important;border:0!important;font:300 12.5px/1.4 Poppins,sans-serif!important;color:#6f6656!important}',
'#cml-natal .cmn-val li+li:before{content:"·";margin:0 6px;color:#c9b8a6}',
'#cml-natal .cmn-val li strong{font-weight:500!important;color:#2b2916!important}',
'#cml-natal .cmn-val p{flex-basis:100%;margin:2px 0 0!important;font:300 11.5px/1.4 Poppins,sans-serif!important;color:#6f6656!important}',
'#cml-natal .cmn-st i{width:22px!important;height:22px!important;border:1px solid #e0d2c6!important;background:#fff!important;color:#a99886!important;font:400 10.5px/1 Poppins,sans-serif!important}',
'#cml-natal .cmn-st.on{color:'+BO+'!important;font-weight:500!important}',
'#cml-natal .cmn-st.on i{background:'+BO+'!important;border-color:'+BO+'!important;color:#2b2916!important}',
'#cml-natal .cmn-st.done i{background:transparent!important;color:'+BO+'!important}',
'#cml-natal .cmn-sep{background:#e0d2c6!important}',
'#cml-natal .cmn-h{font:700 24px/1.15 Poppins,sans-serif!important;letter-spacing:-.015em!important;color:#2b2916!important}',
'#cml-natal .cmn-h em,#cml-natal .cmn-h.c4-sig em{font-weight:300!important;font-style:italic!important;color:'+BO+'!important}',
'#cml-natal .cmn-sub,#cml-natal .cmn-q{font-weight:300!important}',
'#cml-natal .cmn-q{font:500 15px/1.35 Poppins,sans-serif!important;color:#2b2916!important}',
'#cml-natal .cmn-prev{border:0!important;background:transparent!important;padding:4px 0!important;font:400 12.5px/1 Poppins,sans-serif!important;color:#6f6656!important;box-shadow:none!important}',
'#cml-natal .cmn-prev:hover{color:'+BO+'!important}',
'#cml-natal .cmn-back.c4-hb{display:none!important}',
'#cml-natal .cmn-gift{background:#efe6dc!important;color:#565229!important;font:500 10.5px/1 Poppins,sans-serif!important}',
'#cml-natal .cmn-num{border:1px solid #e8ddd0!important;font-weight:400!important}',
'#cml-natal .cmn-num[aria-pressed="true"]{background:'+BO+'!important;border-color:'+BO+'!important;color:#2b2916!important;font-weight:500!important}',
'#cml-natal .cmn-opt{border:1px solid #e8ddd0!important;box-shadow:none!important}',
'#cml-natal .cmn-opt:hover{border-color:rgba(107,30,42,.5)!important}',
'#cml-natal .cmn-opt[aria-pressed="true"]{border-color:'+BO+'!important;background:#fdf6f5!important;box-shadow:none!important}',
'#cml-natal .cmn-opt b{font-weight:500!important;font-size:15.5px!important;color:#2b2916!important}',
'#cml-natal .cmn-opt span{font-size:13px!important}',
'#cml-natal .cmn-opt span{font-weight:300!important}',
'#cml-natal .cmn-sec h3{font:500 16px/1.3 Poppins,sans-serif!important;color:#2b2916!important}',
'#cml-natal .cmn-sec h3 small{font-weight:300!important}',
'#cml-natal .cmn-it{border:1px solid #e8ddd0!important;box-shadow:none!important}',
'#cml-natal .cmn-it.sel{border-color:rgba(107,30,42,.45)!important;background:#fdf8f6!important;box-shadow:none!important}',
'#cml-natal .cmn-it b{font:400 13px/1.3 Poppins,sans-serif!important;color:#2b2916!important}',
'#cml-natal .cmn-it span{font:500 12px/1.2 Poppins,sans-serif!important;color:#a65a14!important}',
'#cml-natal .cmn-qty button{width:32px!important;height:32px!important;border:1px solid '+BO+'!important;background:transparent!important;color:'+BO+'!important;font:300 17px/1 Poppins,sans-serif!important;box-shadow:none!important}',
'#cml-natal .cmn-it.sel .cmn-qty button.add{background:'+BO+'!important;color:#2b2916!important}',
'#cml-natal .cmn-qty output{font:500 13px/1 Poppins,sans-serif!important}',
'#cml-natal .cmn-btn{background:'+BO+'!important;box-shadow:none!important;font:500 14.5px/1 Poppins,sans-serif!important;min-height:46px!important}',
'#cml-natal .cmn-btn:hover{background:#5c1823!important}',
'#cml-natal .cmn-bar{padding:10px 14px!important;border-radius:18px 18px 0 0!important;background:#2b2916!important;gap:8px 12px!important}',
'#cml-natal .cmn-bar .cmn-btn{background:#a65a14!important;color:'+K+'!important;font-weight:600!important;min-height:42px!important;padding:0 20px!important}',
'#cml-natal .cmn-bar .cmn-btn:hover{background:'+GL+'!important}',
'#cml-natal .cmn-meter b{font:500 15px/1.2 Poppins,sans-serif!important}',
'#cml-natal .cmn-meter small{font:300 11px/1.35 Poppins,sans-serif!important;color:rgba(43,41,22,.72)!important}',
'#cml-natal .cmn-meter small b{font:500 11px/1 Poppins,sans-serif!important;color:#a65a14!important}',
'#cml-natal .cmn-track{height:3px!important;margin-top:6px!important;background:rgba(43,41,22,.15)!important}',
'#cml-natal .cmn-track i{background:#a65a14!important}',
'#cml-natal .cmn-nudge{padding:0 0 8px!important;margin:0!important;border:0!important;border-bottom:1px solid rgba(43,41,22,.12)!important;background:transparent!important;font:300 12px/1.35 Poppins,sans-serif!important;color:rgba(43,41,22,.85)!important}',
'#cml-natal .cmn-nf{background:#a65a14!important;color:'+K+'!important;border:0!important;font:500 12px/1 Poppins,sans-serif!important;min-height:30px!important}',
'#cml-natal .cmn-ns{background:transparent!important;color:#2b2916!important;border:1px solid rgba(255,250,245,.35)!important;font:400 12px/1 Poppins,sans-serif!important;min-height:30px!important}'
];
function css(){if(D.getElementById("c4-css"))return;var s=D.createElement("style");s.id="c4-css";s.textContent=CSS.join("\n");(D.head||D.documentElement).appendChild(s)}
css();
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function sig(el,cut){if(!el||el.__c4s||el.querySelector("em"))return;var t=el.textContent.replace(/\s+/g," ").trim();if(!t)return;var i=cut?t.indexOf(cut):-1,a,b;
 if(i>0){a=t.slice(0,i).trim();b=t.slice(i).trim()}else{var w=t.split(" ");if(w.length<2){if(t.length<6)return;var h=Math.floor(t.length/2);a=t.slice(0,h);b=t.slice(h);el.__c4s=1;el.innerHTML=esc(a)+"<em>"+esc(b)+"</em>";el.classList.add("c4-sig");return}var k=Math.max(1,Math.floor(w.length/2));a=w.slice(0,k).join(" ");b=w.slice(k).join(" ")}
 el.__c4s=1;el.innerHTML=esc(a)+" <em>"+esc(b)+"</em>";el.classList.add("c4-sig")}
var MAP={"Chás blends":"blends","Infusões naturais":"naturais","Kits e presentes":"e presentes","Snacks saudáveis":"saudáveis","Granolas naturais":"naturais","Perguntas frequentes":"frequentes","Nosso compromisso é com quem nos recebe":"com quem","Acompanhe a nossa rotina":"a nossa","Acessórios":"","Chás e infusões":"e infusões"};
function rodape(){var f=D.getElementById("ns-section-footer");if(!f)return D.readyState==="complete";
 var sl=f.querySelector(".cml-brand .sl");if(sl&&!sl.__c4){sl.__c4=1;sl.innerHTML='Nutrindo corpo <em>e alma</em>'}
 var L={"nossa trajetória":"Nossa trajetória","dúvidas":"Dúvidas","termos":"Termos de uso","seja um creator":"Seja um creator","meus pedidos":"Meus pedidos","rastrear pedido":"Rastrear pedido","comprar pelo whatsapp":"Comprar pelo WhatsApp","contatos":"Contato","blog":"Blog","politíca de devolução":"Devolução","política de devolução":"Devolução","politíca de privacidade":"Privacidade","política de privacidade":"Privacidade","politíca de reembolso":"Reembolso","política de reembolso":"Reembolso","politíca de cashback":"Cashback","política de cashback":"Cashback"};
 [].forEach.call(f.querySelectorAll(".footer-menu-list a"),function(a){if(a.__c4)return;var k=a.textContent.replace(/\s+/g," ").trim().toLowerCase();if(L[k]){a.__c4=1;var w=D.createTreeWalker(a,NodeFilter.SHOW_TEXT,null),n,done=0;while((n=w.nextNode())){if(!n.nodeValue.trim())continue;n.nodeValue=done?"":L[k];done=1}}});
 [].forEach.call(f.querySelectorAll(".footer-menu-title u"),function(u){if(!u.__c4&&/politícas/i.test(u.textContent)){u.__c4=1;u.textContent="Políticas"}});
 var nl=f.querySelector("#ns-block-newsletter");if(nl&&!nl.__c4){var ds=nl.querySelector(".footer-newsletter-description");if(ds){nl.__c4=1;var e=D.createElement("p");e.className="c4-ey";e.textContent="Seja membro";var b=D.createElement("b");b.className="c4-nb";b.innerHTML='Novidades <em>em primeira mão</em>';ds.appendChild(e);ds.appendChild(b);
  var sb=nl.querySelector('form [type="submit"]');if(sb){if(sb.tagName==="INPUT")sb.value="Quero receber";else sb.textContent="Quero receber"}
  }}
 return!!nl}
function home(){if(P!=="/")return true;var ok=true;
 var bk=D.getElementById("cml-bkh");if(bk){var eb=bk.querySelector(".cbkh-eb");if(eb&&!eb.__c4){eb.__c4=1;eb.lastChild.nodeValue="Até 22/11"}var h=bk.querySelector(".cbkh-h");if(h&&!h.__c4s){h.__c4s=1;h.innerHTML='Preços de Black, <em>antes da Black</em>';h.classList.add("c4-sig")}}else ok=false;
 var ig=D.querySelector(".cml-ig-t h2");if(ig)sig(ig,"a nossa");else ok=false;
 var nc=D.querySelector(".cml-nc h2");if(nc)sig(nc,"com quem");
 faq();return ok}
function heads(){[].forEach.call(D.querySelectorAll(".cpvp-head .heading-block"),function(h){if(h.__c4s||h.querySelector("em"))return;var t=h.textContent.replace(/\s+/g," ").trim();if(MAP.hasOwnProperty(t)){if(MAP[t])sig(h,MAP[t]);else h.__c4s=1}else sig(h)})}
function faq(){[].forEach.call(D.querySelectorAll(".cml-faq .accordion-item-toggle-text"),function(s){if(s.querySelector(".c4-fq"))return;var t=s.textContent;if(!t.trim())return;s.textContent="";var i=D.createElement("i");i.className="c4-fq";i.textContent=t;s.appendChild(i)})}
function blog(){if(P!=="/blog/")return true;var h=D.querySelector(".page-header-title");if(h&&!h.__c4s){h.__c4s=1;h.innerHTML='Blog <em>da Chef</em>';h.classList.add("c4-sig")}
 [].forEach.call(D.querySelectorAll(".blog-page .post-item-read-more"),function(r){if(!r.__c4){r.__c4=1;r.textContent="Ler o post"}});return!!h}
function story(){var s=D.querySelector(".cml-story");if(!s)return P!=="/quem-somos/"||D.readyState==="complete";
 var C=[["Nutrindo corpo e alma","com xícaras"],["Uma mãe e","a alimentação"],["Uma história que","que continua"],["É desse lugar","o cuidado"],["Essa história ganha","quando chega"]];
 [].forEach.call(s.querySelectorAll("h2"),function(h){var t=h.textContent.trim(),c=null;C.forEach(function(x){if(t.indexOf(x[0])===0)c=x[1]});if(c==="que continua"){if(!h.__c4s){h.__c4s=1;h.innerHTML='Uma história <em>que continua sendo escrita</em>';h.classList.add("c4-sig")}}else sig(h,c)});
 var ph=D.querySelector(".page-header-title");if(ph&&P==="/quem-somos/")sig(ph,"trajetória");
 return true}
var MO={"para a noite":"para a noite","manhã":"para a manhã","foco no trabalho":"para o foco no trabalho","pós-treino":"para o pós-treino","dias frios":"para os dias frios","gelado no calor":"para tomar gelado no calor","depois das refeições":"para depois das refeições","fase feminina":"para a fase feminina","fase materna":"para a fase materna"};
var FL={"floral":1,"frutado":1,"especiado":1,"herbal":1};
function quiz(){var r=D.querySelector(".cef");if(!r)return P!=="/encontre-seu-cha/"||D.readyState==="complete";
 var h=r.querySelector(".cef-h");if(h&&!h.__c4s){h.__c4s=1;h.innerHTML='Encontre <em>o seu chá</em>'}
 var ch=r.querySelector(".cef-chosen");if(ch&&!ch.classList.contains("c4-rt")){var b=ch.querySelector("b"),n=(ch.textContent.match(/^\s*(\d+)/)||[])[1];if(b&&n){var w=b.textContent.trim(),k=w.toLowerCase(),tail;
  if(MO[k])tail=MO[k];else if(FL[k])tail="de sabor "+k;else tail="com "+k;
  ch.classList.add("c4-rt");ch.innerHTML=n+(n==="1"?" chá ":" chás ")+"<em>"+esc(tail)+"</em>"}}
 var mode=/^(com )/.test((r.querySelector(".cef-chosen em")||{}).textContent||"")?"ing":"";
 [].forEach.call(r.querySelectorAll(".cef-ings"),function(p){var hide=mode!=="ing";if(p.classList.contains("c4-hide")!==hide)p.classList.toggle("c4-hide",hide)});
 [].forEach.call(r.querySelectorAll(".cef-ct h3"),function(x){if(!x.__c4s)sig(x)});
 [].forEach.call(r.querySelectorAll(".cef-q,.cef-way b"),function(x){if(x.querySelector(".c4-w"))return;var t=x.textContent;if(!t.trim())return;x.textContent="";var i=D.createElement("i");i.className="c4-w";i.textContent=t;x.appendChild(i)});
 if(!r.__c4o){r.__c4o=1;var q=0;try{new MutationObserver(function(){if(q)return;q=setTimeout(function(){q=0;quiz()},40)}).observe(r,{childList:true,subtree:true})}catch(e){}}
 return true}
function natal(){var r=D.getElementById("cml-natal");if(!r)return P!=="/presentes-de-natal/"||D.readyState==="complete";
 var h1=r.querySelector(".cmn-hero h1");if(h1&&!h1.__c4s){h1.__c4s=1;h1.innerHTML='O presente certo, <em>feito à mão</em>'}
 [].forEach.call(r.querySelectorAll(".cmn-h"),function(h){if(h.querySelector("em"))return;h.__c4s=0;var t=h.textContent.trim(),c=null;
  [["Para quantas pessoas","é o presente"],["Como você quer","o presente"],["Escolha a caixa","a caixa"],["Escolha o que vai dentro","o que vai"],["Quer mandar","um cartão"],["Seus presentes","de Natal"],["Escreva","a mensagem"],["Para onde","vai"]].forEach(function(x){if(t.indexOf(x[0])===0)c=x[1]});sig(h,c)});
 [].forEach.call(r.querySelectorAll(".cmn-prev"),function(b){if(b.textContent!=="← Voltar")b.textContent="← Voltar"});
 [].forEach.call(r.querySelectorAll(".cmn-back"),function(b){var hb=/^\s*←/.test(b.textContent)&&!!r.querySelector(".cmn-prev");if(b.classList.contains("c4-hb")!==hb)b.classList.toggle("c4-hb",hb)});
 [].forEach.call(r.querySelectorAll(".cmn-it span"),function(s){if(/·\s*em oferta/.test(s.textContent)){var w=D.createTreeWalker(s,NodeFilter.SHOW_TEXT,null),n;while((n=w.nextNode()))if(/em oferta/.test(n.nodeValue))n.nodeValue=n.nodeValue.replace(/\s*·\s*em oferta/,"")}});
 var sub=r.querySelector(".cmn-pane .cmn-sub");if(sub&&r.querySelector(".cmn-it")&&!/preço de Natal/.test(sub.textContent)){sub.appendChild(D.createTextNode(" Todos com preço de Natal."))}
 if(!r.__c4o){r.__c4o=1;var q=0;try{new MutationObserver(function(){if(q)return;q=setTimeout(function(){q=0;natal()},30)}).observe(r,{childList:true,subtree:true})}catch(e){}}
 return true}
function all(){var ok=true;[rodape,home,heads,blog,story,quiz,natal].forEach(function(f){try{if(!f())ok=false}catch(e){}});return ok}
var n=0;(function loop(){if(!all()&&++n<60)setTimeout(loop,250)})();
addEventListener("load",function(){setTimeout(all,300);setTimeout(all,2500)});
})();

/* Chef Mais Leve: SITE PREMIUM MOVIMENTO (02/11/2026). Brilho dourado unico no BLACK, brasas mais lentas, fio de "role para baixo", entrada suave das secoes e toque nos botoes. Tudo desliga com "reduzir movimento" do aparelho. Para desfazer: apague este bloco inteiro. */
(function(){if(window.__cmlE5)return;window.__cmlE5=1;
var D=document,RM=false;try{RM=matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}
var CSS=[
'#cml-bko .c1-blk{animation:c5sh 2.6s cubic-bezier(.3,.6,.2,1) .5s 1 both!important;background-size:250% 100%!important;filter:none!important}',
'@keyframes c5sh{0%{background-position:100% 0}100%{background-position:0 0}}',
'#cml-bko .esq-emb i{animation-duration:13s!important;opacity:.55}',
'#cml-bko .esq-emb i:nth-child(2n){animation-duration:15.5s!important}',
'#cml-bko .esq-emb i:nth-child(3n){animation-duration:17s!important}',
'#cml-bko .esq-emb i:nth-child(4n){animation-duration:11.5s!important}',
'#cml-bko .c1-cue{position:relative;overflow:hidden}',
'#cml-bko .c1-cue:after{content:"";position:absolute;left:0;top:-40%;width:100%;height:40%;background:linear-gradient(rgba(243,212,139,0),#f3d48b);animation:c5cue 2.6s ease-in-out 1.2s infinite}',
'@keyframes c5cue{0%{transform:translateY(0);opacity:0}25%{opacity:1}100%{transform:translateY(350%);opacity:0}}',
'.c5-rv{opacity:1;transform:none}',/* 18/11/2026: sem o efeito de aparecer ao rolar (as secoes ja nascem visiveis) */
'.c5-rv.c5-in{opacity:1;transform:none}',
'button,.btn,a.btn,input[type="submit"],input[type="button"],.c1-dock a,.c1-dock button,.cbkh-btn,.cef-btn,.cef-opt,.cef-way,.cmn-btn,.cmn-opt,.cmn-num,.c2-rk .rc,.c3-rg li{transition:transform .18s ease,background-color .2s,border-color .2s,color .2s,box-shadow .2s}',
'button:active,.btn:active,a.btn:active,input[type="submit"]:active,input[type="button"]:active,.c1-dock a:active,.c1-dock button:active,.cbkh-btn:active,.cef-btn:active,.cef-opt:active,.cmn-btn:active,.cmn-opt:active,.cmn-num:active{transform:scale(.97)}',
'@media(hover:hover){.cef-way:hover,.c2-rk .rc:hover{transform:translateY(-2px)}}',
'@media(prefers-reduced-motion:reduce){#cml-bko .c1-blk{animation:none!important;background-position:30% 0!important}#cml-bko .esq-emb{display:none!important}#cml-bko .c1-cue:after{display:none}.c5-rv{opacity:1!important;transform:none!important;transition:none!important}button:active,.btn:active{transform:none!important}}'
];
function css(){if(D.getElementById("c5-css"))return;var s=D.createElement("style");s.id="c5-css";s.textContent=CSS.join("\n");(D.head||D.documentElement).appendChild(s)}
css();
function heat(){var h=D.querySelector("#cml-bko .c1-blk");if(!h)return D.readyState==="complete";if(h.classList.contains("esq-heat"))h.classList.remove("esq-heat");return true}
var io=null,seen=[];
function targets(){var m=D.querySelector("main")||D.getElementById("MainContent");if(!m)return[];var L=[].slice.call(m.querySelectorAll(":scope>section,:scope>div>section,.c2-rk,.cml-pair,#cml-bkh,.cml-nc,.cml-st-cards>div,.st-row,.post-item"));var f=D.querySelector("#ns-section-footer .footer-main-info");if(f)L.push(f);return L}
function reveal(){if(RM||!("IntersectionObserver" in window))return true;if(!io)io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("c5-in");io.unobserve(e.target)}})},{rootMargin:"0px 0px -8% 0px",threshold:.06});
 var vh=innerHeight,list=targets(),add=[];
 for(var i=0;i<list.length;i++){var el=list[i];if(seen.indexOf(el)>=0)continue;seen.push(el);if(el.closest(".c5-rv")&&el.closest(".c5-rv")!==el)continue;var r=el.getBoundingClientRect();if(r.height<40||r.top<vh*.92)continue;add.push(el)}
 add.forEach(function(el){el.classList.add("c5-rv");io.observe(el)});
 return D.readyState==="complete"}
function safety(){[].forEach.call(D.querySelectorAll(".c5-rv:not(.c5-in)"),function(el){var r=el.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)el.classList.add("c5-in")})}
var n=0;(function loop(){var a=true;try{if(!heat())a=false}catch(e){}try{if(!reveal())a=false}catch(e){}if(!a&&++n<40)setTimeout(loop,250)})();
addEventListener("load",function(){setTimeout(reveal,600);setTimeout(safety,4000)});
addEventListener("scroll",function(){if(!window.__c5s){window.__c5s=1;setTimeout(function(){window.__c5s=0;safety()},700)}},{passive:true});
})();

/* Chef Mais Leve: SITE PREMIUM ACABAMENTO (02/11/2026). Fecha o que a auditoria achou fora do padrao: Compra rapida em todas as paginas (menos produto e Natal), botoes laranja/oliva/creme viram dourado, bolinhas de carrossel douradas, textos ilegiveis (Termos, politicas, busca, contato), titulos na assinatura nas paginas e na descricao do produto, botao de cashback do Cashing acima da barra no celular. Para desfazer: apague este bloco inteiro. */
(function(){if(window.__cmlE6)return;window.__cmlE6=1;
var D=document,G="#a65a14",GL="#a65a14",K="#f6efe9",B="html.cml-blk body ";
var CSS=[
B+'.c6-gold.c6-gold{background:#a65a14!important;background-image:none!important;border-color:'+G+'!important;color:'+K+'!important;border-radius:999px!important;font-weight:600!important;text-transform:none!important;letter-spacing:0!important;box-shadow:none!important}',
B+'.c6-gold.c6-gold *{color:'+K+'!important}',
B+'.c6-gold.c6-gold:hover{background:'+GL+'!important;border-color:'+GL+'!important}',
B+'.c6-out.c6-out{background:transparent!important;border-color:'+G+'!important;color:#a65a14!important;box-shadow:none!important}',
B+'.c6-out.c6-out *{color:#a65a14!important}',
B+'.c6-out.c6-out:hover{background:#a65a14!important;color:'+K+'!important}',
B+'.c6-out.c6-out:hover *{color:'+K+'!important}',
B+'.swiper-pagination-bullet-active,'+B+'.swiper-pagination-bullet.swiper-pagination-bullet-active{background:#a65a14!important;opacity:1!important}',
B+'.swiper-pagination-bullet{background:rgba(255,250,245,.35)}',
B+'.c6-uc,'+B+'.c6-uc p,'+B+'.c6-uc li,'+B+'.c6-uc span,'+B+'.c6-uc td,'+B+'.c6-uc div{color:rgba(43,41,22,.82)!important;font-weight:300}',
B+'.c6-uc strong,'+B+'.c6-uc b,'+B+'.c6-uc h2,'+B+'.c6-uc h3,'+B+'.c6-uc h4{color:#2b2916!important;font-weight:500!important}',
B+'.c6-uc a{color:#a65a14!important}',
B+'.products-grid-search-head,'+B+'.products-grid-search-head *{color:rgba(43,41,22,.8)!important;font-weight:300!important}',
B+'.products-grid-search-head strong{color:#2b2916!important;font-weight:500!important}',
B+'.contact-form-container{background:#fffaf5!important;border:1px solid rgba(166,90,20,.2)!important;box-shadow:none!important}',
B+'.contact-form-container,'+B+'.contact-form-container label,'+B+'.contact-form-container p{color:rgba(43,41,22,.85)!important}',
B+'.contact-form-container h2,'+B+'.contact-form-container h3{color:#2b2916!important}',
B+'.contact-form-container input,'+B+'.contact-form-container textarea{background:rgba(43,41,22,.06)!important;border:1px solid rgba(166,90,20,.25)!important;color:#2b2916!important}',
B+'.c6-sig em{font-weight:300!important;font-style:italic!important;color:#a65a14!important;letter-spacing:-.01em}',
'[data-slot="corner_bottom_left"]{z-index:900!important}',
'@media(max-width:767px){[data-slot="corner_bottom_left"]{transform:scale(.8);transform-origin:left bottom}body.template-product [data-slot="corner_bottom_left"]{bottom:72px!important}}'
];
function css(){if(D.getElementById("c6-css"))return;var s=D.createElement("style");s.id="c6-css";s.textContent=CSS.join("\n");(D.head||D.documentElement).appendChild(s)}
css();
function blk(){return D.documentElement.classList.contains("cml-blk")}
function rgb(s){var m=String(s||"").match(/[\d.]+/g);return m?m.map(Number):[0,0,0,0]}
function isOrange(c){return c[3]!==0&&c[0]>150&&c[1]>70&&c[1]<150&&c[2]<80&&!(Math.abs(c[0]-223)<8&&Math.abs(c[1]-174)<8)}
function isOlive(c){return c[3]!==0&&Math.abs(c[0]-86)<14&&Math.abs(c[1]-82)<14&&Math.abs(c[2]-41)<14}
function isCream(c){return c[3]!==0&&c[0]>235&&c[1]>225&&c[2]>215}
var SKIP=".c1-dock,.c1-mn,#cml-qb,.c2-rk,.cef,#cml-natal,.c3-rg,.cml-bar,.mi-w-\\[50px\\],[data-slot='corner_bottom_left'],.js-search-trigger,.js-modal-open-private.header-utility,.cmle-o,.js-variant-button,.js-quantity-down,.js-quantity-up,.c4-fq,.cml-rev";
function scan(){if(!blk())return true;var L=[].slice.call(D.querySelectorAll("button,.btn,a.btn,input[type=submit],input[type=button],.cml-rv-more"));var W=[];
 L.forEach(function(e){if(e.__c6||e.closest(SKIP))return;var r=e.getBoundingClientRect();if(!r.width)return;var s=getComputedStyle(e),bg=rgb(s.backgroundColor),bd=rgb(s.borderTopColor),bw=parseFloat(s.borderTopWidth)||0,tx=rgb(s.color);var k=null;
  if(isOrange(bg)||isOlive(bg))k="c6-gold";else if(bg[3]===0&&bw>0&&(isCream(bd)||isOlive(bd)||isOrange(bd)))k="c6-out";else if(bg[3]===0&&isOrange(tx))k="c6-out";
  W.push([e,k])});
 W.forEach(function(x){x[0].__c6=1;if(x[1])x[0].classList.add(x[1])});return D.readyState==="complete"}
function pages(){if(!blk())return true;[].forEach.call(D.querySelectorAll("body.template-page .page-content.user-content"),function(p){if(p.classList.contains("c6-uc")||p.querySelector(".cml-story,.cef,#cml-natal,.cml-ct,.contact-form-container"))return;if(p.textContent.trim().length>40)p.classList.add("c6-uc")});return D.readyState==="complete"}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function sig(h){if(h.__c6s||h.querySelector("em,a,img,svg,span,b,strong"))return;h.__c6s=1;var t=h.textContent.replace(/\s+/g," ").trim();if(!t||t.length>90)return;var w=t.split(" ");if(w.length<2)return;var a,b,i=t.indexOf(", ");
 if(i>2&&i<t.length-4){a=t.slice(0,i+1);b=t.slice(i+2)}else{var k=Math.ceil(w.length/2);if(w.length===2)k=1;a=w.slice(0,k).join(" ");b=w.slice(k).join(" ")}
 h.innerHTML=esc(a)+" <em>"+esc(b)+"</em>";h.classList.add("c6-sig")}
var HX=".contact-form-container h2,body.template-page main h2,.cml-f-top h2,.cml-pd h2,.cml-pd h3,main .heading-block,.contact-page h2,main h2.h3,main .section-title";
var NO=".c2-rk,.cef,#cml-natal,.cml-story,.js-product-detail h1,.cml-rev,.c1-home,#cml-bko,.modal,.c4-sig,.c2-cbn,.c2-cbt,.cml-nc,.cml-ig-t,#cml-bkh,[data-ishorts]";
function heads(){if(!blk())return true;var b=D.body;if(b&&b.classList.contains("template-home"))return true;[].forEach.call(D.querySelectorAll(HX),function(h){if(h.closest(NO)||h.classList.contains("c4-sig"))return;var s=getComputedStyle(h);if(parseInt(s.fontWeight,10)<600)return;sig(h)});return D.readyState==="complete"}
function qbAll(){var b=D.body;if(!b)return false;if(window.__c6qb||D.getElementById("cml-qb")||b.classList.contains("template-home")||b.classList.contains("template-product")||/^\/presentes-de-natal/.test(location.pathname)||/^\/checkout|^\/account\/(login|register)/.test(location.pathname))return true;
 var sc=[].filter.call(D.scripts,function(s){return!s.src&&s.textContent.indexOf("pacote extras (gzip)")>=0})[0];if(!sc)return D.readyState==="complete";window.__c6qb=1;var m=sc.textContent.match(/"(H4sI[^"]+)"/);if(!m||!window.DecompressionStream)return true;
 try{var u=Uint8Array.from(atob(m[1]),function(c){return c.charCodeAt(0)});new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream("gzip"))).text().then(function(t){var a=JSON.parse(t),e=a.filter(function(x){return x.indexOf('t.id="cml-qb"')>=0})[0];if(!e)return;var from='document.body.classList.contains("template-home")&&!document.getElementById("cml-qb")';if(e.indexOf(from)<0)return;e=e.split(from).join('!document.getElementById("cml-qb")');try{(0,eval)(e)}catch(x){}}).catch(function(){})}catch(e){}return true}
function all(){var ok=true;[scan,pages,heads,qbAll].forEach(function(f){try{if(!f())ok=false}catch(e){}});return ok}
var n=0;(function loop(){if(!all()&&++n<60)setTimeout(loop,300)})();
addEventListener("load",function(){setTimeout(all,500);setTimeout(scan,2500)});
var tq=0;try{new MutationObserver(function(){if(tq)return;tq=setTimeout(function(){tq=0;try{scan();heads()}catch(e){}},700)}).observe(D.documentElement,{childList:true,subtree:true})}catch(e){}
})();

/* SITE PREMIUM AJUSTES 7 (02/11/2026): logo, cashback 5%, pagina de cashback, popup do frete, Cashing no padrao, latas compactas, rodape da proposta */
(function(){
if(window.__cmlE7)return;window.__cmlE7=1;
var D=document;
var G="#a65a14",GL="#a65a14";
var FT="html body #ns-section-footer#ns-section-footer ";
function brl(v){return "R$ "+v.toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".")}
var SV={
 x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 coin:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="16" cy="9" rx="9" ry="3.6" fill="currentColor" fill-opacity=".14"/><path d="M7 9v5c0 2 4 3.6 9 3.6s9-1.6 9-3.6V9"/><path d="M7 14v5c0 2 4 3.6 9 3.6s9-1.6 9-3.6v-5"/><path d="M7 19v4c0 2 4 3.6 9 3.6s9-1.6 9-3.6v-4"/></svg>',
 user:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"><circle cx="16" cy="11" r="5" fill="currentColor" fill-opacity=".14"/><path d="M6.5 26c1.2-5 5-7.5 9.5-7.5s8.3 2.5 9.5 7.5"/></svg>',
 ig:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.25"><rect x="6" y="6" width="20" height="20" rx="6" fill="currentColor" fill-opacity=".14"/><circle cx="16" cy="16" r="4.6"/><circle cx="22" cy="10" r=".9" fill="currentColor"/></svg>',
 star:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"><path d="M16 5.5l3.2 6.6 7.2 1-5.2 5 1.3 7.2L16 21.9l-6.5 3.4 1.3-7.2-5.2-5 7.2-1z" fill="currentColor" fill-opacity=".14"/></svg>',
 bag:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"><path d="M7 11h18l-1.5 15h-15z" fill="currentColor" fill-opacity=".14"/><path d="M12 11V9.5a4 4 0 0 1 8 0V11"/></svg>',
 cup:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"><path d="M6 12h16v6a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z" fill="currentColor" fill-opacity=".14"/><path d="M22 14h2a3 3 0 0 1 0 6h-2.4M12 5c-1 1.5 1 2.5 0 4M16 5c-1 1.5 1 2.5 0 4"/></svg>'
};
var CSS=[
/* logo */
'html body header #ns-block-logo #logo .logo-img{height:74px!important;max-height:none!important;width:auto!important;max-width:none!important;margin:-10px 0!important}',
'@media(max-width:767px){html body header #ns-block-logo #logo .logo-img{height:58px!important;margin:-8px 0!important}}',
/* janela padrao */
'.c7-md{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(255,250,245,.72);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);opacity:0;transition:opacity .2s}',
'.c7-md.in{opacity:1}',
'.c7-mb{position:relative;width:100%;max-width:440px;max-height:calc(100vh - 40px);overflow:auto;padding:30px 26px 24px;border-radius:26px;background:radial-gradient(120% 80% at 20% 0%,#fffaf5,#fffaf5 60%);border:1px solid rgba(166,90,20,.28);box-shadow:0 30px 70px -20px #000;color:#2b2916;font-family:Poppins,sans-serif;transform:translateY(10px);transition:transform .25s}',
'.c7-md.in .c7-mb{transform:none}',
'.c7-x{position:absolute;top:14px;right:14px;display:grid;place-items:center;width:34px;height:34px;padding:0;border-radius:50%;border:1px solid rgba(166,90,20,.45)!important;background:rgba(255,250,245,.4)!important;color:#a65a14!important;cursor:pointer;z-index:5}',
'.c7-x svg{width:16px;height:16px}',
'.c7-x:focus{outline:0!important}.c7-x:focus-visible{outline:1px solid '+G+'!important;outline-offset:3px}',
'.c7-ey{margin:0 0 8px;font:500 10.5px/1.2 Poppins,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#a65a14}',
'.c7-mb h3,.c7-cb h1,.c7-cb h2{margin:0;font:700 24px/1.15 Poppins,sans-serif;color:#2b2916;letter-spacing:-.01em}',
'.c7-mb h3 em,.c7-cb h1 em,.c7-cb h2 em{font-weight:300;font-style:italic;color:#a65a14}',
'.c7-tx{margin:10px 0 0;font:300 13.5px/1.5 Poppins,sans-serif;color:rgba(43,41,22,.8)}',
'.c7-nt{margin:14px 0 0;font:300 12px/1.5 Poppins,sans-serif;color:rgba(43,41,22,.6)}',
'.c7-rg{list-style:none;margin:16px 0 0;padding:0;display:grid;gap:8px}',
'.c7-rg li{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 14px;border-radius:16px;border:1px solid rgba(166,90,20,.2);background:rgba(43,41,22,.03)}',
'.c7-rg li span{font:500 13.5px/1.25 Poppins,sans-serif;color:#2b2916}',
'.c7-rg li small{display:block;margin-top:2px;font:300 11px/1.3 Poppins,sans-serif;color:rgba(43,41,22,.6)}',
'.c7-rg li b{flex:none;font:600 15px/1 Poppins,sans-serif;color:#a65a14}',
'.c7-bt{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 26px;border-radius:999px;border:1px solid '+G+'!important;background:#a65a14!important;color:#f6efe9!important;font:600 14px/1 Poppins,sans-serif!important;text-decoration:none!important;cursor:pointer}',
'.c7-bt.o{background:transparent!important;color:#a65a14!important}',
'.c7-mb .c7-bt{width:100%;margin-top:18px}',
'@media(max-width:600px){.c7-md{align-items:flex-end;padding:0}.c7-mb{max-width:none;border-radius:26px 26px 0 0;padding:28px 20px 26px;max-height:88vh}}',
/* faixa de beneficios: frete clicavel */
'.c1-ben>a.c7-fr{cursor:pointer;text-decoration:none!important;color:inherit}',
'.c1-ben>a.c7-fr small:after{content:" ›";color:#a65a14}',
/* barrinha aparece direto */
'.c1-dock{transition-delay:0s!important}',
/* latas compactas (proposta) */
'.c7-qt{margin:6px 0 4px}',
'.c7-qt .c7-ey{margin:0 0 10px}',
'.c7-ql{display:grid;gap:8px}',
'.c7-ql button{display:flex;justify-content:space-between;align-items:center;gap:10px;width:100%;min-height:50px;padding:12px 16px;border-radius:16px;border:1px solid rgba(166,90,20,.22)!important;background:transparent!important;color:#2b2916!important;text-align:left;cursor:pointer;transition:border-color .2s,background .2s}',
'.c7-ql button:hover{border-color:rgba(166,90,20,.55)!important}',
'.c7-ql button.on{border-color:'+G+'!important;background:rgba(166,90,20,.08)!important}',
'.c7-ql b{font:500 15px/1.2 Poppins,sans-serif;color:#2b2916}',
'.c7-ql b i{display:block;margin-top:3px;font:400 11px/1.2 Poppins,sans-serif;font-style:normal;color:#a65a14;letter-spacing:.02em}',
'.c7-ql small{flex:none;font:300 12.5px/1.3 Poppins,sans-serif;color:rgba(43,41,22,.7);text-align:right}',
'.c7-hid,html body #product_form .js-product-variants .js-product-variants-group.c7-hid{display:none!important}',
/* Cashing no padrao */
'.c7-cs,.c7-cs *{font-family:Poppins,sans-serif!important}',
'.c7-cs [class*="mi-bg-white"],.c7-cs [class*="mi-rounded-[20px]"]{background:radial-gradient(120% 80% at 20% 0%,#fffaf5,#fffaf5 60%)!important;border:1px solid rgba(166,90,20,.28)!important;border-radius:24px!important;box-shadow:0 30px 70px -20px #000!important;color:#2b2916!important}',
'.c7-cs h2,.c7-cs h3,.c7-cs strong,.c7-cs b,.c7-cs [class*="text-[#f6efe9]"],.c7-cs [class*="text-[#323232]"],.c7-cs [class*="font-bold"]{color:#2b2916!important}',
'.c7-cs h2{font-weight:700!important;letter-spacing:-.01em!important}',
'.c7-cs h2 em,.c7-cs h4 em{font-weight:300!important;font-style:italic!important;color:#a65a14!important}',
'.c7-cs p,.c7-cs li,.c7-cs label,.c7-cs [class*="text-[#646464]"],.c7-cs [class*="text-[#969696]"],.c7-cs [class*="text-[#8"],.c7-cs [class*="text-[#9"]{color:rgba(43,41,22,.72)!important}',
'.c7-cs p span,.c7-cs .c7-gd{color:#a65a14!important}',
'html body .c7-cs.c7-cs input[type="text"],html body .c7-cs.c7-cs input[type="email"],html body .c7-cs.c7-cs input[type="tel"],html body .c7-cs.c7-cs input:not([type]),html body .c7-cs.c7-cs input[type="date"]{min-height:44px!important;padding:0 16px!important;border-radius:999px!important;border:1px solid rgba(43,41,22,.22)!important;background:rgba(43,41,22,.06)!important;color:#2b2916!important;box-shadow:none!important;font-size:14px!important}',
'html body .c7-cs.c7-cs input::placeholder{color:rgba(43,41,22,.5)!important}',
'html body .c7-cs.c7-cs input:focus{border-color:'+G+'!important;outline:0!important}',
'html body .c7-cs.c7-cs input[type="checkbox"]{accent-color:'+G+'!important;border-color:rgba(166,90,20,.6)!important}',
'.c7-cs .c7-b{min-height:44px!important;border-radius:999px!important;border:1px solid '+G+'!important;background:#a65a14!important;color:#f6efe9!important;font-weight:600!important;font-size:14px!important;box-shadow:none!important}',
'.c7-cs .c7-b *{color:#f6efe9!important}',
'.c7-cs .c7-b2{border-radius:14px!important;border:1px solid rgba(166,90,20,.35)!important;background:transparent!important;color:#2b2916!important}',
'.c7-cs .c7-b2 *{color:#2b2916!important}',
'.c7-cs .c7-bi{display:inline-grid;color:#a65a14!important}.c7-cs .c7-bi svg{width:20px;height:20px}',
'.c7-cs .c7-lk{background:transparent!important;border:0!important;box-shadow:none!important;color:#a65a14!important;text-decoration:underline!important;text-underline-offset:3px}',
'.c7-cs .c7-lk *{color:#a65a14!important}',
'.c7-cs .c7-out{border:1px solid rgba(43,41,22,.18)!important;background:transparent!important;color:rgba(43,41,22,.6)!important}',
'.c7-cs .c7-out *{color:rgba(43,41,22,.6)!important}',
'.c7-cs [class*="ph-"]{color:#a65a14!important}',
'.c7-cs button[class*="w-[25px]"]{width:32px!important;height:32px!important;background:rgba(255,250,245,.4)!important;border:1px solid rgba(166,90,20,.45)!important}',
'.c7-cs .c7-dot{background:#a65a14!important}',
'.c7-cs [class*="border-solid"]{border-color:rgba(166,90,20,.22)!important}',
'.c7-cs img[class*="border"]{border-color:transparent!important;border-radius:12px!important}',
'.c7-cs .c7-orx{display:none!important}',
'html body .c7-cs.c7-cs button.c7-mf{min-height:34px!important;padding:0 14px!important;border-radius:999px!important;border:1px solid '+G+'!important;background:transparent!important;color:#a65a14!important;font:600 12.5px/1 Poppins,sans-serif!important;box-shadow:none!important;white-space:nowrap!important;cursor:pointer}',
'html body .c7-cs.c7-cs button.c7-mf *{color:#a65a14!important}',
'html body .c7-cs.c7-cs button.c7-mf:hover{background:#a65a14!important;color:#f6efe9!important}html body .c7-cs.c7-cs button.c7-mf:hover *{color:#f6efe9!important}',
'html body .c7-cs.c7-cs button.c7-mz{min-height:30px!important;padding:0 8px!important;border:0!important;background:transparent!important;box-shadow:none!important;color:rgba(43,41,22,.55)!important;font:500 11.5px/1 Poppins,sans-serif!important;cursor:default!important}',
'html body .c7-cs.c7-cs button.c7-mz *{color:rgba(43,41,22,.55)!important}',
'html body .c7-cs.c7-cs .c7-pl{background:rgba(166,90,20,.08)!important;border:1px solid rgba(166,90,20,.45)!important;box-shadow:none!important}',
'html body .c7-cs.c7-cs .c7-pl span{color:#a65a14!important}html body .c7-cs.c7-cs .c7-pl span.mi-font-bold{color:#2b2916!important}',
'html body .c7-cs.c7-cs .c7-gd{color:#a65a14!important}',
'.c7-cs .c7-mc{display:inline-grid;place-items:center;flex:none;width:40px;height:40px;border-radius:50%;border:1px solid rgba(166,90,20,.45);background:rgba(166,90,20,.06);color:#a65a14}',
'.c7-cs .c7-mc svg{width:20px;height:20px}',
'html body .c7-cs.c7-cs .c7-mcw{display:grid!important;place-items:center!important;background:transparent!important;border:0!important;box-shadow:none!important}',
'.c7-cs .c7-mc.s{width:20px;height:20px;border:0;background:none}.c7-cs .c7-mc.s svg{width:18px;height:18px}',
'.c7-cs h4.c7-h{margin:0!important;font:700 17px/1.2 Poppins,sans-serif!important;text-transform:none!important;letter-spacing:0!important;color:#2b2916!important}',
'.c7-cs [class*="text-[#F"],.c7-cs [class*="text-red"]{color:rgba(43,41,22,.6)!important}',
/* moeda do Cashing */
'[data-slot="corner_bottom_left"] button.c7-cn{display:grid!important;place-items:center!important;width:48px!important;height:48px!important;border-radius:50%!important;background:radial-gradient(110% 90% at 30% 20%,#fffaf5,#f6efe9)!important;border:1px solid rgba(166,90,20,.55)!important;box-shadow:0 10px 24px -10px rgba(43,41,22,.2)!important;color:#a65a14!important}',
'[data-slot="corner_bottom_left"] button.c7-cn img{display:none!important}',
'[data-slot="corner_bottom_left"] button:not(.c7-cn){opacity:0!important}',
'@media(max-width:767px){body.template-product [data-slot="corner_bottom_left"]{display:none!important}}',
'[data-slot="corner_bottom_left"] button.c7-cn svg.c7-ci{width:24px;height:24px}',
/* popup de cadastro do Cashing */
'.c7-lc [class*="mi-rounded-[20px]"]{max-width:420px!important}',
'.c7-lc img[class*="mi-absolute"]{display:none!important}',
'.c7-lc h2{font-size:24px!important;line-height:1.15!important;padding-right:34px!important}',
/* pagina de cashback */
'body.c7-cbp .page-content-section{padding-left:0!important;padding-right:0!important;max-width:none!important}',
'body.c7-cbp .page-content,body.c7-cbp .page-header,body.c7-cbp h1.page-header-title,body.c7-cbp .breadcrumbs{display:none!important}',
'.c7-cb{max-width:1080px;margin:0 auto;padding:10px 16px 50px;color:#2b2916;font-family:Poppins,sans-serif}',
'.c7-cb section{margin-top:26px;padding:30px 22px;border-radius:28px;background:#fffaf5;border:1px solid rgba(166,90,20,.16)}',
'.c7-cb section.c7-cbh{position:relative;overflow:hidden;margin-top:6px;padding:46px 22px 34px;text-align:center;background:radial-gradient(90% 80% at 50% 0%,rgba(166,90,20,.2),transparent 60%),#f6efe9;border-color:rgba(166,90,20,.3)}',
'.c7-cb h1{font-size:clamp(30px,6vw,52px)}',
'.c7-cb h2{font-size:clamp(23px,3.4vw,32px)}',
'.c7-cb .c7-sub{max-width:560px;margin:14px auto 0;font:300 15px/1.55 Poppins,sans-serif;color:rgba(43,41,22,.8)}',
'.c7-cbc{display:grid;place-items:center;width:84px;height:84px;margin:0 auto 18px;border-radius:50%;border:1px solid rgba(166,90,20,.5);background:radial-gradient(circle at 35% 30%,#fffaf5,#f6efe9);color:#a65a14;animation:c7spin 6s ease-in-out infinite}',
'.c7-cbc svg{width:42px;height:42px}',
'@keyframes c7spin{0%,70%,100%{transform:rotateY(0)}85%{transform:rotateY(180deg)}}',
'.c7-st{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;max-width:620px;margin:24px auto 0}',
'.c7-st div{padding:14px 8px;border-radius:18px;border:1px solid rgba(166,90,20,.25);background:rgba(255,250,245,.35)}',
'.c7-st b{display:block;font:600 clamp(20px,3.6vw,28px)/1 Poppins,sans-serif;color:#a65a14}',
'.c7-st small{display:block;margin-top:6px;font:300 11.5px/1.3 Poppins,sans-serif;color:rgba(43,41,22,.7)}',
'.c7-ac{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:24px}',
'.c7-sc{display:grid;gap:18px;margin-top:20px}',
'.c7-sv small,.c7-res small{display:block;font:300 12.5px/1.2 Poppins,sans-serif;color:rgba(43,41,22,.65)}',
'.c7-sv b{display:block;margin-top:4px;font:600 30px/1 Poppins,sans-serif;color:#2b2916}',
'.c7-sc input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:4px;background:linear-gradient(90deg,'+G+' var(--p,30%),rgba(43,41,22,.15) var(--p,30%));outline:0}',
'.c7-sc input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:26px;height:26px;border-radius:50%;background:#a65a14;border:4px solid #fffaf5;box-shadow:0 0 0 1px '+G+';cursor:pointer}',
'.c7-sc input[type=range]::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:#a65a14;border:4px solid #fffaf5;cursor:pointer}',
'.c7-chips{display:flex;flex-wrap:wrap;gap:8px}',
'.c7-chips button{min-height:34px;padding:0 14px;border-radius:999px;border:1px solid rgba(166,90,20,.35)!important;background:transparent!important;color:#2b2916!important;font:400 12.5px/1 Poppins,sans-serif;cursor:pointer}',
'.c7-chips button.on{border-color:'+G+'!important;background:rgba(166,90,20,.12)!important;color:#a65a14!important}',
'.c7-res{display:flex;align-items:center;gap:16px;padding:18px;border-radius:20px;border:1px solid rgba(166,90,20,.35);background:linear-gradient(120deg,rgba(166,90,20,.12),rgba(166,90,20,.02))}',
'.c7-res .c7-cbc{width:56px;height:56px;margin:0;flex:none}.c7-res .c7-cbc svg{width:28px;height:28px}',
'.c7-res b{display:block;margin-top:4px;font:600 28px/1 Poppins,sans-serif;color:#a65a14}',
'.c7-res span{display:block;margin-top:6px;font:300 12px/1.3 Poppins,sans-serif;color:rgba(43,41,22,.7)}',
'.c7-res b.pop{animation:c7pop .35s ease}',
'@keyframes c7pop{0%{transform:scale(1)}40%{transform:scale(1.08)}100%{transform:scale(1)}}',
'.c7-tr{list-style:none;margin:22px 0 0;padding:0;display:grid;gap:0;counter-reset:s}',
'.c7-tr li{position:relative;display:grid;grid-template-columns:44px 1fr;column-gap:14px;padding:0 0 22px}',
'.c7-tr li:before{content:"";position:absolute;left:21px;top:44px;bottom:0;width:1px;background:linear-gradient(rgba(166,90,20,.6),rgba(166,90,20,.1))}',
'.c7-tr li:last-child{padding-bottom:0}.c7-tr li:last-child:before{display:none}',
'.c7-tr i{grid-row:span 2;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;border:1px solid rgba(166,90,20,.5);background:#f6efe9;color:#a65a14;font:300 18px/1 Poppins,sans-serif;font-style:normal}',
'.c7-tr b{align-self:end;font:600 15.5px/1.25 Poppins,sans-serif;color:#2b2916}',
'.c7-tr span{font:300 13px/1.5 Poppins,sans-serif;color:rgba(43,41,22,.72)}',
'.c7-mg{display:grid;gap:10px;margin-top:20px}',
'.c7-m{display:grid;grid-template-columns:48px 1fr auto;align-items:center;gap:14px;padding:14px 16px;border-radius:20px;border:1px solid rgba(166,90,20,.2);background:rgba(255,250,245,.3)}',
'.c7-m .c7-mi{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;border:1px solid rgba(166,90,20,.4);color:#a65a14}',
'.c7-m .c7-mi svg{width:26px;height:26px}',
'.c7-m b{display:block;font:500 14.5px/1.25 Poppins,sans-serif;color:#2b2916}',
'.c7-m small{display:block;margin-top:3px;font:400 12px/1.2 Poppins,sans-serif;color:#a65a14}',
'.c7-m button,.c7-m a.c7-go{min-height:36px;padding:0 16px;border-radius:999px;border:1px solid '+G+'!important;background:transparent!important;color:#a65a14!important;font:500 12.5px/1 Poppins,sans-serif;cursor:pointer;display:inline-flex;align-items:center;text-decoration:none!important}',
'.c7-cb details{border-top:1px solid rgba(166,90,20,.16)}',
'.c7-cb details:first-of-type{margin-top:16px}',
'.c7-cb summary{list-style:none;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:16px 2px;font:500 14.5px/1.3 Poppins,sans-serif;color:#2b2916;cursor:pointer}',
'.c7-cb summary::-webkit-details-marker{display:none}',
'.c7-cb summary:after{content:"+";font:300 22px/1 Poppins,sans-serif;color:#a65a14}',
'.c7-cb details[open] summary:after{content:"−"}',
'.c7-cb details p{margin:0 0 16px;font:300 13.5px/1.55 Poppins,sans-serif;color:rgba(43,41,22,.75)}',
'.c7-cb .c7-fim{text-align:center}',
'@media(min-width:900px){.c7-cb{padding-top:20px}.c7-cb section{padding:40px 44px}.c7-sc{grid-template-columns:1.2fr 1fr;align-items:center;column-gap:40px}.c7-sc>*{grid-column:1}.c7-sc .c7-res{grid-column:2;grid-row:1/span 3}.c7-mg{grid-template-columns:repeat(3,minmax(0,1fr))}.c7-m{grid-template-columns:1fr;justify-items:start;padding:22px}.c7-two{display:grid;grid-template-columns:1fr 1fr;gap:26px}.c7-two section{margin-top:26px}}',
/* rodape da proposta */
FT+'.footer-main-info.c7-on{display:grid!important;grid-template-columns:1fr!important;gap:0!important;padding:26px 20px!important;margin:10px!important;border-radius:26px!important}',
FT+'.footer-main-info.c7-on>*:not(.c7-ft){display:none!important}',
FT+'.c7-ft{display:grid;grid-template-columns:1fr;gap:0;color:#f6efe9;font-family:Poppins,sans-serif}',
FT+'.c7-fb img{display:block;height:54px;width:auto;margin:-12px 0 -10px -2px;filter:brightness(0) invert(1)}',
FT+'.c7-fb h4{margin:16px 0 0!important;font:700 22px/1.15 Poppins,sans-serif!important;color:#fff!important;letter-spacing:-.01em}',
FT+'.c7-fb h4 em{font-weight:300!important;font-style:italic!important;color:#f3d48b!important}',
FT+'.c7-fb p{margin:8px 0 0!important;font:300 13px/1.5 Poppins,sans-serif!important;color:rgba(246,239,233,.8)!important;max-width:320px}',
FT+'.c7-fe{margin:0 0 8px!important;font:500 10px/1.2 Poppins,sans-serif!important;letter-spacing:.22em!important;text-transform:uppercase!important;color:#dfae58!important}',
FT+'.c7-fc a{display:block!important;padding:6px 0!important;font:300 13.5px/1.3 Poppins,sans-serif!important;color:#f6efe9!important;text-decoration:none!important;text-transform:none!important;letter-spacing:0!important}',
FT+'.c7-fc a:hover{color:#dfae58!important}',
FT+'.c7-fg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:20px}',
FT+'.c7-fm{margin-top:18px;padding:16px;border-radius:20px;background:rgba(255,250,245,.25);border:1px solid rgba(223,174,88,.3)}',
FT+'.c7-fm #ns-block-newsletter{display:block!important;width:auto!important;max-width:none!important;margin:0!important;padding:0!important;background:none!important;border:0!important;box-shadow:none!important;grid-template-columns:none!important}',
FT+'.c7-fm #ns-block-newsletter>*{width:auto!important;max-width:none!important;margin:0!important;padding:0!important;background:none!important;border:0!important}',
FT+'.c7-fm #ns-block-newsletter :is(h2,h3,h4,.h4,.footer-menu-title,.c4-ey){display:none!important}',
FT+'.c7-fm .c4-nb{display:block!important;margin:0 0 4px!important;font:500 16px/1.2 Poppins,sans-serif!important;color:#fff!important}',
FT+'.c7-fm .c4-nb em{font-style:normal!important;font-weight:500!important;color:#fff!important}',
FT+'.c7-fm form{display:grid!important;gap:8px!important;margin-top:10px!important}',
FT+'.c7-fm form .form-group,.c7-fm form .input-append,.c7-fm form .newsletter-form-input-container{margin:0!important;padding:0!important;width:100%!important}',
FT+'.c7-fm input[type="text"],'+FT+'.c7-fm input[type="email"],'+FT+'.c7-fm input[type="tel"]{width:100%!important;min-height:42px!important;height:42px!important;padding:0 16px!important;border-radius:999px!important;background:rgba(246,239,233,.08)!important;border:1px solid rgba(246,239,233,.22)!important;color:#f6efe9!important;font:300 13.5px/1 Poppins,sans-serif!important}',
FT+'.c7-fm input::placeholder{color:rgba(246,239,233,.6)!important}',
FT+'.c7-fm [type="submit"],'+FT+'.c7-fm button.btn{width:100%!important;min-height:44px!important;margin:2px 0 0!important;border-radius:999px!important;background:#a65a14!important;border:0!important;color:#fff!important;font:600 14px/1 Poppins,sans-serif!important}',
FT+'.c7-fm p:not(.c7-fe),'+FT+'.c7-fm small,'+FT+'.c7-fm .c4-nt{margin:8px 0 0!important;font:300 10.5px/1.4 Poppins,sans-serif!important;color:rgba(246,239,233,.6)!important}',
FT+'.c7-fm .cml-nl{display:grid!important;grid-template-columns:1fr!important;gap:8px!important;margin:0!important}',
FT+'.c7-ft .c7-fm #ns-block-newsletter form .newsletter-form-wrapper{display:flex!important;flex-direction:column!important;flex-wrap:nowrap!important;align-items:stretch!important;gap:8px!important;margin:0!important;height:auto!important}',
FT+'.c7-ft .c7-fm #ns-block-newsletter form .newsletter-form-wrapper>input{position:static!important;width:100%!important;max-width:none!important;flex:none!important;transform:none!important}',
FT+'.c7-fp{display:flex;flex-wrap:wrap;gap:4px 14px;margin-top:20px;padding-top:14px;border-top:.5px solid rgba(223,174,88,.3)}',
FT+'.c7-fp a{font:300 12px/1.4 Poppins,sans-serif!important;color:rgba(246,239,233,.7)!important;text-decoration:none!important}',
FT+'.c7-fp a:hover{color:#dfae58!important}',
'@media(min-width:900px){'+FT+'.footer-main-info.c7-on{padding:38px 40px 26px!important;width:calc(100% - 72px)!important;max-width:1400px!important;margin:10px auto 20px!important;border-radius:30px!important}'+FT+'.c7-ft{grid-template-columns:1.3fr 1fr 1fr 1.45fr;column-gap:36px;align-items:start}'+FT+'.c7-fg{display:contents}'+FT+'.c7-fg>div{margin-top:0}'+FT+'.c7-fm{grid-column:4;grid-row:1;margin-top:0;padding:0;background:none;border:0}'+FT+'.c7-fb h4{font-size:26px!important;margin-top:20px!important}'+FT+'.c7-fp{grid-column:1/-1;margin-top:28px}}'
].join("\n");
function css(){if(D.getElementById("c7-css"))return;var s=D.createElement("style");s.id="c7-css";s.textContent=CSS;(D.head||D.documentElement).appendChild(s)}
css();

/* ---------- janela padrao ---------- */
function modal(html,cls){var m=D.createElement("div");m.className="c7-md "+(cls||"");m.setAttribute("role","dialog");m.setAttribute("aria-modal","true");m.innerHTML='<div class="c7-mb"><button type="button" class="c7-x" aria-label="Fechar">'+SV.x+'</button>'+html+'</div>';
 function close(){m.classList.remove("in");setTimeout(function(){m.remove()},200);D.removeEventListener("keydown",esc)}
 function esc(e){if(e.key==="Escape")close()}
 m.addEventListener("click",function(e){if(e.target===m||e.target.closest(".c7-x")||e.target.closest("[data-c7close]"))close()});
 D.addEventListener("keydown",esc);D.body.appendChild(m);requestAnimationFrame(function(){m.classList.add("in")});var x=m.querySelector(".c7-x");if(x)x.focus();return m}
var FRETE='<p class="c7-ey">Entrega</p><h3>Frete grátis <em>por região</em></h3><p class="c7-tx">O frete sai grátis quando os produtos do pedido passam do valor da sua região.</p><ul class="c7-rg">'
 +'<li><span>Estado de São Paulo</span><b>R$ 249</b></li>'
 +'<li><span>Sul, Sudeste e DF<small>PR, SC, RS, RJ, MG, ES e Distrito Federal</small></span><b>R$ 299</b></li>'
 +'<li><span>Centro-Oeste<small>GO, MT e MS</small></span><b>R$ 359</b></li>'
 +'<li><span>Nordeste</span><b>R$ 459</b></li>'
 +'<li><span>Norte</span><b>R$ 599</b></li></ul>'
 +'<p class="c7-nt">Na sacola e na página de cada produto você calcula o frete e o prazo exatos pelo seu CEP.</p><a class="c7-bt" href="/ofertas/" data-c7close>Ver as ofertas</a>';
D.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest('a[href="#frete"],.c7-fr');if(a){e.preventDefault();modal(FRETE)}
 var w=e.target.closest&&e.target.closest('[data-c7="wallet"]');if(w){e.preventDefault();wallet()}},true);
function wallet(){var b=D.querySelector('[data-slot="corner_bottom_left"] button');if(b)b.click();else location.href="/account/login/"}

/* ---------- textos de 10% para 5% ---------- */
var REP=[[/10% DE CASHBACK/g,"5% DE CASHBACK"],[/10% de cashback/g,"5% de cashback"],[/10% em cashback/g,"5% em cashback"]];
function txt(){D.querySelectorAll(".adbar,#cml-ld,#cml-natal,.c1-home").forEach(function(r){var w=D.createTreeWalker(r,NodeFilter.SHOW_TEXT),n;while(n=w.nextNode()){var t=n.nodeValue;if(t.indexOf("10%")<0)continue;var o=t;REP.forEach(function(p){t=t.replace(p[0],p[1])});if(t!==o)n.nodeValue=t}})}

/* ---------- Cashing no padrao ---------- */
function isGreen(c){var m=c&&c.match(/\d+/g);if(!m)return false;var r=+m[0],g=+m[1],b=+m[2];return g>140&&r<170&&b<150&&g-r>40}
function clean(el){/* tira as cores que o tema escuro aplicou com !important */
 [el].concat([].slice.call(el.querySelectorAll("*"))).forEach(function(e){var s=e.style;if(!s||!s.length)return;["color","background-color","background-image","background","border-color"].forEach(function(p){if(s.getPropertyPriority(p)==="important")s.removeProperty(p)})})}
function cashing(){
 var roots=[];
 [].forEach.call(D.querySelectorAll("body > div"),function(d){if(/(^|\s)mi-/.test(d.className)&&d.querySelector('[class*="mi-"]'))roots.push(d)});
 var mc=D.querySelectorAll('#modal-cart [class*="mi-"]');[].forEach.call(mc,function(e){var p=e.parentElement;if(p&&!/(^|\s)mi-/.test(p.className)&&roots.indexOf(p)<0)roots.push(p)});
 roots.forEach(function(r){
  if(!r.classList.contains("c7-cs")){r.classList.add("c7-cs","cml-cbk-skip")}
  clean(r);
  var lead=r.querySelector(".mi-leads-form-input,[class*=\"leads-form\"]");
  if(lead&&!r.classList.contains("c7-lc")){r.classList.add("c7-lc")}
  if(lead){var card=r.querySelector('[class*="mi-rounded-[20px]"]');
   if(card&&!card.querySelector(".c7-x")){var x=D.createElement("button");x.type="button";x.className="c7-x";x.setAttribute("aria-label","Fechar");x.innerHTML=SV.x;x.addEventListener("click",function(ev){ev.preventDefault();ev.stopPropagation();var o=[].filter.call(r.querySelectorAll('div[class*="cursor-pointer"]'),function(d){return d.querySelector("svg")&&/w-\[(28|31)px\]/.test(d.className)});if(o.length){o[o.length-1].click();o[0].click()}setTimeout(function(){if(D.body.contains(r)&&r.querySelector(".c7-x"))r.style.display="none"},250)});card.appendChild(x)}
   [].forEach.call(r.querySelectorAll('div[class*="cursor-pointer"]'),function(d){if(d.querySelector("svg")&&/w-\[(28|31)px\]/.test(d.className))d.classList.add("c7-orx")});
   var h=r.querySelector("h2");if(h&&!h.__c7){h.__c7=1;if(/Fique por dentro/.test(h.textContent))h.innerHTML='Fique por dentro <em>das novidades</em>'}
   if(!r.__c7bg){r.__c7bg=1;r.addEventListener("click",function(ev){if(ev.target===r||ev.target===r.firstElementChild){var x2=r.querySelector(".c7-x");if(x2)x2.click()}})}
  }
  [].forEach.call(r.querySelectorAll("button"),function(b){var t=(b.textContent||"").trim();if(b.classList.contains("c7-x"))return;
   /* missoes da carteira: Fazer agora em contorno dourado; Automatico/Concluido discreto */
   if(/^(fazer agora|fazer|autom[aá]tico|conclu|feito|resgat)/i.test(t)){b.classList.remove("c7-b");b.classList.add(/^(autom|conclu|feito|resgat)/i.test(t)?"c7-mz":"c7-mf");return}
   if(/sair da conta/i.test(t)){b.classList.add("c7-out");return}
   if(/w-\[25px\]/.test(b.className)||/ph-arrow/.test(b.className))return;
   if(!t)return;
   if(/c7-(b|b2|lk)(\s|$)/.test(b.className))return;
   if(/bg-\[#F4F4F4\]/.test(b.className)){b.classList.add("c7-b2");var im=b.querySelector("img");if(im&&!b.querySelector(".c7-bi")){im.style.display="none";var sp=D.createElement("span");sp.className="c7-bi";sp.innerHTML=/cupom/i.test(t)?SV.coin:SV.star;b.insertBefore(sp,b.firstChild)}return}
   var bg=getComputedStyle(b).backgroundColor;if(/rounded-full/.test(b.className)||!/rgba\(0, 0, 0, 0\)|transparent/.test(bg))b.classList.add("c7-b");else b.classList.add("c7-lk")});
  /* saldo em pilula (antes: texto claro sobre fundo claro, sumia) */
  [].forEach.call(r.querySelectorAll("div[class*=mi-rounded-full]"),function(p){if(!p.classList.contains("c7-pl")&&p.querySelector("span.mi-truncate")&&p.querySelector("img"))p.classList.add("c7-pl")});
  /* moedas 3D e ilustracao colorida da missao viram a moeda de traco dourado */
  [].forEach.call(r.querySelectorAll("img"),function(im){if(im.__c7m)return;var c=String(im.className),k="";
   if(/w-\[41px\]/.test(c))k="c7-mc";else if(/w-\[22px\]/.test(c)&&im.closest(".c7-pl"))k="c7-mc s";else if(/object-cover/.test(c)&&/w-full/.test(c)&&im.parentElement&&im.parentElement.offsetWidth&&im.parentElement.offsetWidth<=90)k="c7-mc";
   if(!k)return;im.__c7m=1;im.style.setProperty("display","none","important");var s=D.createElement("span");s.className=k;s.innerHTML=SV.coin;if(/object-cover/.test(c)&&im.parentElement)im.parentElement.classList.add("c7-mcw");im.parentNode.insertBefore(s,im)});
  /* textos laranja do Cashing (Missao ativa etc.) em dourado */
  [].forEach.call(r.querySelectorAll("span,p,div,strong,small"),function(e){if(e.__c7o||e.children.length>1)return;var m=getComputedStyle(e).color.match(/\d+/g);if(m&&+m[0]>185&&+m[1]>80&&+m[1]<160&&+m[2]<75){e.__c7o=1;e.classList.add("c7-gd")}});
  /* rotulo que cortava: Ganhe mais Cashback Chef -> Ganhe mais */
  [].forEach.call(r.querySelectorAll("button.c7-b2 span,button.c7-b2 p"),function(s){if(!s.children.length&&/^Ganhe mais Cash/i.test(s.textContent.trim()))s.textContent="Ganhe mais"});
  [].forEach.call(r.querySelectorAll("div,span,i"),function(e){if(e.children.length||e.offsetWidth>16)return;var bg=getComputedStyle(e).backgroundColor;if(isGreen(bg))e.classList.add("c7-dot")});
  [].forEach.call(r.querySelectorAll("h4"),function(h){if(h.__c7)return;var t=h.textContent.trim();if(/^COSTUMAM LEVAR$/i.test(t)){h.__c7=1;h.classList.add("c7-h");h.innerHTML='Costumam <em>levar</em>'}else if(t===t.toUpperCase()&&t.length>3){h.__c7=1;h.classList.add("c7-h");h.textContent=t.charAt(0)+t.slice(1).toLowerCase()}});
 });
 var b=D.querySelector('[data-slot="corner_bottom_left"] button');
 if(b&&b.querySelector("img")&&!b.classList.contains("c7-cn")){b.classList.add("c7-cn");b.setAttribute("aria-label","Meu cashback");var s=D.createElement("span");s.innerHTML=SV.coin.replace("<svg ",'<svg class="c7-ci" ');b.appendChild(s.firstChild)}
}

/* ---------- latas em linhas compactas ---------- */
function qty(){
 if(!/template-product/.test(D.body.className))return;
 var f=D.getElementById("product_form");if(!f)return;
 var vs=[];try{var dv=D.querySelector("[data-variants]");vs=JSON.parse(dv.getAttribute("data-variants"))}catch(e){}
 [].forEach.call(f.querySelectorAll(".js-product-variants-group"),function(g){
  var bs=[].slice.call(g.querySelectorAll("a.js-variant-button"));if(bs.length<2)return;
  var info=bs.map(function(a){var sp=a.querySelector(".btn-variant-content");var c="";try{c=getComputedStyle(sp,"::after").content||""}catch(e){}c=c.replace(/^["']|["']$/g,"");if(c==="none"||c==="normal")c="";return{a:a,opt:a.getAttribute("data-option")||a.textContent.trim(),sub:c}});
  if(!info.every(function(i){return/x[íi]cara/i.test(i.sub)}))return;
  var box=g.previousElementSibling&&g.previousElementSibling.classList.contains("c7-qt")?g.previousElementSibling:null;
  if(!box){box=D.createElement("div");box.className="c7-qt";box.innerHTML='<p class="c7-ey">Quantidade</p><div class="c7-ql"></div>';g.parentNode.insertBefore(box,g);g.classList.add("c7-hid");
   var r=D.querySelector(".c3-rg");if(r)r.classList.add("c7-hid")}
  var key=info.map(function(i){return i.opt+(i.a.classList.contains("selected")?"*":"")}).join("|");
  if(box.__k===key)return;box.__k=key;
  var l=box.querySelector(".c7-ql");l.innerHTML="";
  info.forEach(function(i,ix){var price=0;vs.forEach(function(v){if(v.option0===i.opt)price=v.price_number});if(!price){var m=(i.a.getAttribute("data-cpv-price")||"").match(/[\d.,]+/);if(m)price=parseFloat(m[0].replace(/\./g,"").replace(",","."))}
   var xm=i.sub.match(/(\d+)\s*x[íi]caras?/i),xc=xm?+xm[1]:0;
   var nm=i.opt,extra="";var pm=nm.match(/^(.*?)\s*\((.+)\)\s*$/);if(pm){nm=pm[1];extra=pm[2]}
   var right="";if(xc&&price){var px=brl(price/xc);right=ix===0?xc+" xícaras · "+px+" cada":px+" por xícara"}else right=i.sub;
   var b=D.createElement("button");b.type="button";if(i.a.classList.contains("selected"))b.className="on";b.setAttribute("aria-pressed",i.a.classList.contains("selected")?"true":"false");
   b.innerHTML='<b>'+nm+(extra?'<i>'+extra+'</i>':'')+'</b><small>'+right+'</small>';
   b.addEventListener("click",function(){i.a.click();setTimeout(qty,60);setTimeout(qty,400)});l.appendChild(b)});
 });
}

/* ---------- rodape da proposta ---------- */
function foot(){
 var mi=D.querySelector("#ns-section-footer .footer-main-info");if(!mi)return false;if(mi.querySelector(".c7-ft"))return true;
 var nl=D.getElementById("ns-block-newsletter");if(!nl)return false;
 var lg=D.querySelector("#ns-section-footer .cml-brand img.lg")||D.querySelector("header .logo-img");var src=lg?(lg.currentSrc||lg.src):"";
 var acc=/customer-logged-in/.test(D.body.className)?"/account/":"/account/login/";
 var ft=D.createElement("div");ft.className="c7-ft";
 ft.innerHTML='<div class="c7-fb">'+(src?'<a href="/" aria-label="Chef Mais Leve, início"><img src="'+src+'" alt="chefmaisleve"></a>':'')+'<h4>Nutrindo corpo <em>e alma</em></h4><p>Chás, infusões e snacks feitos à mão, em família, em Santa Catarina.</p></div>'
  +'<div class="c7-fm"><p class="c7-fe">Seja membro</p></div>'
  +'<div class="c7-fg"><div class="c7-fc"><p class="c7-fe">Sobre a Chef</p><a href="/quem-somos/">Nossa trajetória</a><a href="/blog/">Blog</a><a href="/faq/">Dúvidas</a><a href="/contato/">Contato</a></div>'
  +'<div class="c7-fc"><p class="c7-fe">Para você</p><a href="'+acc+'">Minha conta</a><a href="/rastrear/">Rastrear pedido</a><a href="https://app.ovni.com.br/loja/sejalevissimo" target="_blank" rel="noopener">Seja um creator</a><a href="https://wa.me/554791571974" target="_blank" rel="noopener">Comprar pelo WhatsApp</a></div></div>'
  +'<div class="c7-fp"><a href="/politica-de-troca/">Devolução</a><a href="/politica-de-privacidade/">Privacidade</a><a href="/politica-de-reembolso/">Reembolso</a><a href="/politica-de-cashback/">Cashback</a><a href="/termos-de-uso/">Termos de uso</a></div>';
 mi.insertBefore(ft,mi.firstChild);ft.querySelector(".c7-fm").appendChild(nl);mi.classList.add("c7-on");return true}

/* ---------- pagina de cashback ---------- */
function cbpage(){
 if(!/^\/politica-de-cashback\/?$/.test(location.pathname))return true;
 if(D.querySelector(".c7-cb"))return true;
 var pc=D.querySelector(".page-content")||D.querySelector(".user-content");if(!pc)return D.readyState!=="loading"&&false;
 var W=D.createElement("div");W.className="c7-cb";
 W.innerHTML='<section class="c7-cbh"><div class="c7-cbc">'+SV.coin+'</div><p class="c7-ey">Cashback Chef</p><h1>Cada compra <em>volta pra você</em></h1><p class="c7-sub">5% de tudo o que você compra vira pontos para usar no próximo pedido. Sem cartão de fidelidade e sem complicação: fica tudo na sua carteira, na moeda dourada do canto da tela.</p>'
 +'<div class="c7-st"><div><b>5%</b><small>de volta em cada compra</small></div><div><b>10 dias</b><small>para liberar</small></div><div><b>30 dias</b><small>para usar</small></div></div>'
 +'<div class="c7-ac"><button type="button" class="c7-bt" data-c7="wallet">Abrir minha carteira</button><a class="c7-bt o" href="/chas/">Começar a juntar</a></div></section>'
 +'<section class="c7-sim"><p class="c7-ey">Simulador</p><h2>Quanto <em>volta pra você?</em></h2><div class="c7-sc"><div class="c7-sv"><small>Se o seu pedido for de</small><b data-c7="v">R$ 199,00</b></div>'
 +'<input type="range" min="50" max="800" step="1" value="199" aria-label="Valor do pedido">'
 +'<div class="c7-chips"><button type="button" data-v="99">R$ 99</button><button type="button" data-v="199" class="on">R$ 199</button><button type="button" data-v="299">R$ 299</button><button type="button" data-v="499">R$ 499</button></div>'
 +'<div class="c7-res"><div class="c7-cbc">'+SV.coin+'</div><div><small>volta para você</small><b data-c7="r">+ R$ 9,95</b><span data-c7="p">199 pontos de Cashback Chef</span></div></div></div></section>'
 +'<section class="c7-jr"><p class="c7-ey">Como funciona</p><h2>Do pedido <em>ao desconto</em></h2><ol class="c7-tr">'
 +'<li><i>1</i><b>Você compra</b><span>Cada R$ 1 em produtos vira 1 ponto, e cada ponto vale R$ 0,05.</span></li>'
 +'<li><i>2</i><b>Os pontos amadurecem</b><span>Eles ficam pendentes por 10 dias, o prazo de segurança para trocas.</span></li>'
 +'<li><i>3</i><b>Você gera o cupom</b><span>Toque na moeda dourada do canto da tela, entre com o seu e-mail e gere um cupom de até R$ 100.</span></li>'
 +'<li><i>4</i><b>Usa no próximo pedido</b><span>Aplique o cupom na sacola em pedidos a partir de R$ 199. Os pontos valem por 30 dias.</span></li></ol></section>'
 +'<section class="c7-ms"><p class="c7-ey">Missões</p><h2>Ganhe pontos <em>sem comprar</em></h2><div class="c7-mg">'
 +'<div class="c7-m"><span class="c7-mi">'+SV.user+'</span><div><b>Complete seu perfil</b><small>+50 pontos · R$ 2,50</small></div><button type="button" data-c7m="perfil">Fazer</button></div>'
 +'<div class="c7-m"><span class="c7-mi">'+SV.ig+'</span><div><b>Siga a @chefmaisleve</b><small>+100 pontos · R$ 5,00</small></div><button type="button" data-c7m="insta">Fazer</button></div>'
 +'<div class="c7-m"><span class="c7-mi">'+SV.star+'</span><div><b>Avalie os produtos</b><small>+100 pontos · R$ 5,00</small></div><button type="button" data-c7m="aval">Fazer</button></div>'
 +'</div><p class="c7-nt">Toque em Fazer e conclua o passo na sua carteira: os pontos entram nela. A avaliação a loja reconhece sozinha, depois que o pedido chega.</p></section>'
 +'<section class="c7-rl"><p class="c7-ey">Regras</p><h2>Tudo às claras, <em>sem letra miúda</em></h2>'
 +'<details><summary>Quem participa</summary><p>Todo cliente com cadastro na loja. O saldo é pessoal e fica ligado ao seu e-mail.</p></details>'
 +'<details><summary>O que gera pontos</summary><p>O valor dos produtos do pedido. O frete e os brindes não entram na conta.</p></details>'
 +'<details><summary>Quando os pontos liberam</summary><p>10 dias depois da compra. Até lá eles aparecem como pendentes na sua carteira.</p></details>'
 +'<details><summary>Como usar e limites</summary><p>Você gera um cupom na carteira e aplica na sacola. É um cupom por pedido, de até R$ 100, em pedidos a partir de R$ 199.</p></details>'
 +'<details><summary>Validade</summary><p>Os pontos valem por 30 dias. Depois disso eles expiram.</p></details>'
 +'<details><summary>Trocas, cancelamentos e devoluções</summary><p>Se o pedido for cancelado ou devolvido, no todo ou em parte, os pontos daquela compra são ajustados.</p></details>'
 +'<details><summary>Mudanças no programa</summary><p>Qualquer mudança é avisada nesta página, respeitando o saldo de quem já tem pontos.</p></details></section>'
 +'<section class="c7-fim"><h2>Sua próxima xícara <em>pode sair mais leve</em></h2><div class="c7-ac"><a class="c7-bt" href="/chas/">Escolher meu chá</a><button type="button" class="c7-bt o" data-c7="wallet">Ver meu saldo</button></div></section>';
 pc.parentNode.insertBefore(W,pc);D.body.classList.add("c7-cbp");
 var rg=W.querySelector("input[type=range]"),vb=W.querySelector('[data-c7="v"]'),rb=W.querySelector('[data-c7="r"]'),pb=W.querySelector('[data-c7="p"]');
 function upd(v,fromChip){v=Math.max(50,Math.min(800,Math.round(v)));rg.value=v;rg.style.setProperty("--p",((v-50)/750*100)+"%");vb.textContent=brl(v);rb.textContent="+ "+brl(Math.floor(v)*0.05);pb.textContent=Math.floor(v)+" pontos de Cashback Chef";rb.classList.remove("pop");void rb.offsetWidth;rb.classList.add("pop");[].forEach.call(W.querySelectorAll(".c7-chips button"),function(c){c.classList.toggle("on",+c.getAttribute("data-v")===v)})}
 rg.addEventListener("input",function(){upd(+rg.value)});
 [].forEach.call(W.querySelectorAll(".c7-chips button"),function(c){c.addEventListener("click",function(){upd(+c.getAttribute("data-v"))})});
 upd(199);
 /* missoes: Fazer leva direto a acao certa na carteira do Cashing */
 W.addEventListener("click",function(ev){var b=ev.target.closest("[data-c7m]");if(!b)return;ev.preventDefault();ev.stopPropagation();var k=b.getAttribute("data-c7m");
  if(k==="aval"){location.href=/customer-logged-in/.test(D.body.className)?"/account/":"/account/login/";return}
  var re=k==="perfil"?/perfil/i:/instagram/i,tries=0;
  var open=[].some.call(D.querySelectorAll(".c7-cs"),function(r){return r.offsetWidth>0&&/Gerar cupom|Ganhe mais|Entrar com/i.test(r.textContent)});if(!open)wallet();
  (function go(){tries++;var done=false;
   [].forEach.call(D.querySelectorAll(".c7-cs"),function(r){if(done)return;
    var mf=[].filter.call(r.querySelectorAll("button"),function(x){if(!/fazer agora/i.test(x.textContent))return false;var p=x,row=null;while(p.parentElement&&p.parentElement!==r&&p.parentElement.querySelectorAll("button").length===1){p=p.parentElement;row=p}return row&&re.test(row.textContent)});
    if(mf.length){mf[0].click();done=true;return}
    if(!r.__c7gm){var gm=[].filter.call(r.querySelectorAll("button"),function(x){return x.offsetWidth>0&&/ganhe mais/i.test(x.textContent)});if(gm.length){r.__c7gm=1;gm[0].click()}}});
   if(!done&&tries<28)setTimeout(go,250)})()});
 return true}

/* ---------- barrinha: sincroniza a Compra rapida sem esperar rolagem ---------- */
function dock(){var d=D.querySelector(".c1-dock");if(!d)return;var q=d.querySelector(".qb");if(q)q.hidden=!D.getElementById("cml-qb");d.classList.remove("off")}

function all(){try{txt()}catch(e){}try{cashing()}catch(e){}try{qty()}catch(e){}try{foot()}catch(e){}try{cbpage()}catch(e){}try{dock()}catch(e){}}
var n=0;(function loop(){all();if(++n<30)setTimeout(loop,n<10?150:500)})();
var pend=0;try{new MutationObserver(function(){if(pend)return;pend=1;(window.__cxQ||(window.__cxQ=function(f,d){var n=performance.now(),g=window.__cxg||(window.__cxg={t:0,c:0});if(n-g.t>50){g.t=n;g.c=0}g.c++;if(g.c<12)Promise.resolve().then(f);else setTimeout(f,d)}))(function(){pend=0;try{txt()}catch(e){}try{cashing()}catch(e){}try{qty()}catch(e){}},250)}).observe(D.documentElement,{childList:true,subtree:true})}catch(e){}
D.addEventListener("DOMContentLoaded",all);addEventListener("load",all);
})();

/* SITE PREMIUM AJUSTES 8 (02/11/2026): botao do cashback no padrao da barrinha, WhatsApp em traco fino, numeros do ranking, chips duplicados */
(function(){
if(window.__cmlE8)return;window.__cmlE8=1;
var D=document,G="#a65a14";
var WA='<svg class="c1-ico c7-wa" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="f" d="M16 4.6c-6.3 0-11.4 5-11.4 11.3 0 2.1.6 4.1 1.6 5.8L4.6 27.4l5.9-1.5c1.6.9 3.5 1.4 5.5 1.4 6.3 0 11.4-5.1 11.4-11.4S22.3 4.6 16 4.6z"/><path d="M12.2 10.6c.3-.3.8-.3 1.1 0l1.5 2c.3.4.2.9-.1 1.2l-.9.8c.8 1.7 2.1 3 3.8 3.8l.8-.9c.3-.3.8-.4 1.2-.1l2 1.5c.4.3.4.8 0 1.1l-1 1c-.8.8-2 1-3.1.5-2.6-1.2-4.6-3.3-5.9-5.9-.5-1-.3-2.3.5-3.1z"/></svg>';
var CSS=[
/* WhatsApp fino, mesma familia dos outros icones */
'svg.c7-wa{width:24px;height:24px;color:#a65a14!important;stroke:'+G+'!important;fill:none!important}',
'svg.c7-wa .f{fill:'+G+'!important;fill-opacity:.14!important}',
'.c3-wal svg.c7-wa{width:20px;height:20px}',
/* numeros do ranking legiveis sobre a foto */
'html body .c2-rk .rn{-webkit-text-fill-color:#a65a14!important;color:#a65a14!important;opacity:1!important;font-weight:300!important;text-shadow:0 2px 14px rgba(255,250,245,.85),0 0 2px rgba(255,250,245,.6)!important;-webkit-text-stroke:0!important}',
/* botao do cashback no padrao da barrinha */
'html body [data-slot="corner_bottom_left"]{margin:0 0 14px 16px!important;transform:none!important;bottom:0!important}',
'html body [data-slot="corner_bottom_left"] [data-slot-item]{padding:5px!important;border-radius:999px!important;background:rgba(255,250,245,.94)!important;border:1px solid rgba(166,90,20,.45)!important;box-shadow:0 14px 28px -12px rgba(43,41,22,.2)!important;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}',
'html body [data-slot="corner_bottom_left"] button.c7-cn{position:relative!important;overflow:hidden!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important;width:78px!important;height:52px!important;padding:0 8px!important;margin:0!important;border:0!important;border-radius:999px!important;background:linear-gradient(160deg,#f0cd85,#a65a14 45%,#b8873c)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.35)!important;color:#f6efe9!important;cursor:pointer}',
'html body [data-slot="corner_bottom_left"] button.c7-cn svg.c7-ci{width:22px!important;height:22px!important;color:#f6efe9!important}',
'html body [data-slot="corner_bottom_left"] button.c7-cn .c7-cl{display:block;font:500 9px/1 Poppins,sans-serif!important;letter-spacing:.02em;color:#f6efe9!important;-webkit-text-fill-color:#f6efe9!important;white-space:nowrap}',
'html body [data-slot="corner_bottom_left"] button.c7-cn:after{content:"";position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-18deg);animation:c8sh 5s ease-in-out infinite;pointer-events:none}',
'@keyframes c8sh{0%,70%{left:-60%}100%{left:130%}}',
'@media(prefers-reduced-motion:reduce){html body [data-slot="corner_bottom_left"] button.c7-cn:after{animation:none;display:none}}',
'@media(min-width:768px){html body [data-slot="corner_bottom_left"]{margin:0 0 20px 24px!important}}',
'@media(min-width:768px){body.template-product [data-slot="corner_bottom_left"]{margin-bottom:84px!important}}'
].join("\n");
function css(){if(D.getElementById("c8-css"))return;var s=D.createElement("style");s.id="c8-css";s.textContent=CSS;(D.head||D.documentElement).appendChild(s)}
css();
function wa(){
 [].forEach.call(D.querySelectorAll("svg:not(.c7-wa)"),function(s){var p=s.querySelector("path");if(!p)return;var d=p.getAttribute("d")||"";if(d.indexOf("M17.472 14.382")!==0&&d.indexOf("M12 2.5A9.5")!==0)return;if(s.closest('[class*="mi-"]'))return;var t=D.createElement("span");t.innerHTML=WA;var n=t.firstChild;if(s.getAttribute("class"))n.setAttribute("class",s.getAttribute("class").replace("c1-waic","")+" c1-ico c7-wa");s.parentNode.replaceChild(n,s)})}
function coin(){var b0=D.querySelector('[data-slot="corner_bottom_left"] [data-slot-item^="cashbacks"] button');if(b0&&!b0.classList.contains("c7-cn")){b0.classList.add("c7-cn");b0.setAttribute("aria-label","Meu cashback");if(!b0.querySelector("svg.c7-ci")){var sp=D.createElement("span");sp.innerHTML='<svg class="c7-ci" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="16" cy="9" rx="9" ry="3.6" fill="currentColor" fill-opacity=".14"/><path d="M7 9v5c0 2 4 3.6 9 3.6s9-1.6 9-3.6V9"/><path d="M7 14v5c0 2 4 3.6 9 3.6s9-1.6 9-3.6v-5"/><path d="M7 19v4c0 2 4 3.6 9 3.6s9-1.6 9-3.6v-4"/></svg>';b0.insertBefore(sp.firstChild,b0.firstChild)}}var b=D.querySelector('[data-slot="corner_bottom_left"] button.c7-cn');if(b&&!b.querySelector(".c7-cl")){var l=D.createElement("span");l.className="c7-cl";l.textContent="Cashback";b.appendChild(l)}}
function chips(){
 if(!/template-category|template-search/.test(D.body.className))return;
 var c=D.querySelectorAll("nav.c2-chips");for(var i=1;i<c.length;i++)c[i].remove();
 if(!c.length)return;var set={};[].forEach.call(c[0].querySelectorAll("a"),function(a){set[a.textContent.trim().toLowerCase()]=1});
 [].forEach.call(D.querySelectorAll("main nav,main ul,main div"),function(e){if(e.classList.contains("c7-hid")||e.closest(".c2-chips,.c2-side,.modal,.js-modal,#nav-hamburger,header,.filters-desktop-content,.c2-cbn")||e.contains(c[0]))return;var as=e.querySelectorAll(":scope > a, :scope > li > a, :scope > div > a");if(as.length<3)return;var ok=0;[].forEach.call(as,function(a){if(set[a.textContent.trim().toLowerCase()])ok++});if(ok>=3&&ok>=as.length-1&&e.offsetParent)e.classList.add("c7-hid")})}
function all(){try{wa()}catch(e){}try{coin()}catch(e){}try{chips()}catch(e){}}
var n=0;(function loop(){all();if(++n<40)setTimeout(loop,n<10?200:500)})();
var pend=0;try{new MutationObserver(function(){if(pend)return;pend=1;setTimeout(function(){pend=0;try{wa()}catch(e){}try{coin()}catch(e){}},300)}).observe(D.documentElement,{childList:true,subtree:true})}catch(e){}
})();

/* SITE PREMIUM AJUSTES 9 (02/11/2026): pagina Esquenta Black (/ofertas/) com abertura em tela cheia, bloco de informacao e produtos por categoria comecando pelos destaques */
(function(){
if(window.__cmlE9)return;window.__cmlE9=1;
if(!/^\/ofertas\/?$/.test(location.pathname))return;
var D=document,G="#a65a14",GL="#a65a14";
var SEC=[
 {k:"dest",ey:"Campanha",t:'Os <em>destaques</em>',s:"Os cinco favoritos da casa para presentear neste Natal."},
 {k:"combos",ey:"Só no Esquenta Black",t:'Combos <em>especiais</em>',s:"Combinações montadas para a Black, com preço de conjunto."},
 {k:"Kits",ey:"Para presentear",t:'Kits <em>e presentes</em>',s:"Caixas montadas à mão, prontas para presentear."},
 {k:"Chás",ey:"Coleção autoral",t:'Chás <em>e infusões</em>',s:"Blends, trouxinhas e infusões para cada momento do dia."},
 {k:"Snacks e granolas",ey:"Para a tarde",t:'Snacks <em>e granolas</em>',s:"Crocantes, frutas desidratadas e granolas da casa."},
 {k:"Acessórios",ey:"Para o ritual",t:'Acessórios <em>do chá</em>',s:"Xícaras, infusores e chaleiras para completar a pausa."}
];
var CSS=[
'#cml-bk .cbk-hero.c9-full{display:flex!important;flex-direction:column;justify-content:center;align-items:center;min-height:calc(100svh - var(--c9top,118px))!important;padding-top:24px!important;padding-bottom:64px!important;box-sizing:border-box}',
'#cml-bk .c9-cue{position:absolute;left:50%;bottom:18px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;font:500 9.5px/1 Poppins,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:rgba(43,41,22,.6);text-decoration:none!important}',
'#cml-bk .c9-cue i{display:block;width:1px;height:34px;background:linear-gradient(rgba(166,90,20,0),'+G+');animation:c9cue 2.2s ease-in-out infinite}',
'@keyframes c9cue{0%{transform:scaleY(.2);transform-origin:top;opacity:.2}50%{transform:scaleY(1);opacity:1}100%{transform:scaleY(1);transform-origin:bottom;opacity:0}}',
'@media(prefers-reduced-motion:reduce){#cml-bk .c9-cue i{animation:none}}',
'@media(max-width:767px){#cml-bk .cbk-hero.c9-full{padding-bottom:120px!important}#cml-bk .c9-cue{bottom:92px}}',
'.c9-info{margin:22px 0 10px;padding:30px 22px;border-radius:28px;background:#fffaf5;border:1px solid rgba(166,90,20,.2);text-align:center;font-family:Poppins,sans-serif;color:#2b2916}',
'.c9-info .c9-ey,.c9-sh .c9-ey{margin:0 0 8px;font:500 10.5px/1.2 Poppins,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#a65a14}',
'.c9-info h2,.c9-sh h2{margin:0;font:700 clamp(24px,3.6vw,34px)/1.12 Poppins,sans-serif;color:#2b2916;letter-spacing:-.01em}',
'.c9-info h2 em,.c9-sh h2 em{font-weight:300;font-style:italic;color:#a65a14}',
'.c9-info>p.c9-tx{max-width:600px;margin:12px auto 0;font:300 14.5px/1.6 Poppins,sans-serif;color:rgba(43,41,22,.8)}',
'.c9-info .c2-ofs{margin:22px auto 0!important}',
'.c9-bn{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;max-width:720px;margin:18px auto 0}',
'.c9-bn a{display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 6px;border-radius:16px;border:1px solid rgba(166,90,20,.22);text-decoration:none!important;color:#2b2916!important}',
'.c9-bn b{font:500 13px/1.2 Poppins,sans-serif;color:#2b2916}',
'.c9-bn small{font:300 11px/1.3 Poppins,sans-serif;color:rgba(43,41,22,.65)}',
'.c9-bn small:after{content:" ›";color:#a65a14}',
'.c9-info .c9-nt{margin:16px 0 0;font:300 11.5px/1.4 Poppins,sans-serif;color:rgba(43,41,22,.55)}',
'.c9-sec{margin:34px 0 0;scroll-margin-top:120px}',
'.c9-sh{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;margin:0 0 14px}',
'.c9-sh p.c9-s{margin:6px 0 0;font:300 13.5px/1.45 Poppins,sans-serif;color:rgba(43,41,22,.72)}',
'.c9-sh .c9-n{flex:none;font:300 12px/1 Poppins,sans-serif;color:rgba(43,41,22,.55);white-space:nowrap}',
'#cml-bk .cbk-list.c9-on>.cbk-grid:not(.c9-g){display:none!important}',
'@media(max-width:600px){.c9-bn{grid-template-columns:1fr}.c9-bn a{flex-direction:row;justify-content:space-between;padding:12px 16px}.c9-sh{flex-direction:column;align-items:flex-start}}'
].join("\n");
function css(){if(D.getElementById("c9-css"))return;var s=D.createElement("style");s.id="c9-css";s.textContent=CSS;(D.head||D.documentElement).appendChild(s)}
css();
var DATA=null;
fetch("https://dzmlyrkzcdqicwfmxnxd.supabase.co/functions/v1/cml-ofertas").then(function(r){return r.json()}).then(function(j){DATA={};(j.p||[]).forEach(function(x){DATA[(x.href||"").replace(/\/$/,"")]=x});run()}).catch(function(){});
function top(){var k=D.getElementById("cml-bk");if(!k)return;var t=Math.round(k.getBoundingClientRect().top+(window.scrollY||0));if(t>0&&t<300)D.documentElement.style.setProperty("--c9top",t+"px")}
function hero(){
 var k=D.getElementById("cml-bk");if(!k)return false;var h=k.querySelector(".cbk-hero");if(!h)return false;
 if(!h.classList.contains("c9-full")){h.classList.add("c9-full");var cue=D.createElement("a");cue.className="c9-cue";cue.href="#c9-info";cue.innerHTML="Role<i></i>";cue.addEventListener("click",function(e){e.preventDefault();var t=D.getElementById("c9-info");if(t)t.scrollIntoView({behavior:"smooth",block:"start"})});h.appendChild(cue)}
 top();
 var inf=D.getElementById("c9-info");
 if(!inf){inf=D.createElement("section");inf.id="c9-info";inf.className="c9-info";
  inf.innerHTML='<p class="c9-ey">Black Friday · 23 a 30/11</p><h2>Preço de Black, <em>antes da Black</em></h2><p class="c9-tx">Até 22 de novembro, os chás, snacks e kits da casa estão com preço de Black. Tudo continua feito à mão, em família, em Santa Catarina. Os produtos estão separados por faixa de desconto, começando pelos maiores.</p>'
  +'<div class="c9-bn"><a href="#frete"><b>Frete grátis</b><small>veja o valor da sua região</small></a><a href="/politica-de-cashback/"><b>5% de volta</b><small>em cashback</small></a><a href="#c9-s0"><b>Até 5x sem juros</b><small>ou 5% off no Pix</small></a></div>'
  +'<p class="c9-nt">Preços válidos até 22/11/2026 ou enquanto durar o estoque.</p>';
  h.parentNode.insertBefore(inf,h.nextSibling)}
 var ofs=h.querySelector(".c2-ofs");if(ofs){if(inf.querySelector(".c2-ofs"))ofs.style.display="none";else inf.insertBefore(ofs,inf.querySelector(".c9-bn"))}
 return true}
function state(){var s=D.querySelectorAll("#cml-bk .cbk-bar select");if(s.length<4)return false;return s[0].value==="dest"&&!s[1].value&&!s[2].value&&!s[3].value}
var busy=0;
function group(){
 if(D.querySelector("#cml-bk .cbk-tier"))return;if(!DATA)return;var l=D.querySelector("#cml-bk .cbk-list");if(!l)return;var grid=l.querySelector(".cbk-grid:not(.c9-g)");if(!grid)return;
 var fresh=grid.querySelectorAll(".cbk-card");
 if(!state()){if(l.classList.contains("c9-on")){[].forEach.call(l.querySelectorAll(".c9-sec"),function(s){s.remove()});l.classList.remove("c9-on")}return}
 if(!fresh.length&&l.classList.contains("c9-on"))return;
 if(!fresh.length)return;
 busy=1;
 [].forEach.call(l.querySelectorAll(".c9-sec"),function(s){s.remove()});
 var buckets={};SEC.forEach(function(s){buckets[s.k]=[]});var rest=[];
 [].forEach.call(fresh,function(c){var a=c.querySelector("a[href]");var href=a?a.getAttribute("href").replace(/\/$/,""):"";var d=DATA[href];var tag=(c.querySelector(".cbk-tag")||{}).textContent||"";
  if(/Destaque/i.test(tag))buckets.dest.push(c);else if(/Combo/i.test(tag))buckets.combos.push(c);else if(d&&buckets[d.cat])buckets[d.cat].push(c);else rest.push(c)});
 if(rest.length)buckets.Kits=buckets.Kits.concat(rest);
 SEC.forEach(function(s,i){var arr=buckets[s.k];if(!arr.length)return;var sec=D.createElement("section");sec.className="c9-sec";sec.id="c9-s"+i;
  sec.innerHTML='<div class="c9-sh"><div><p class="c9-ey">'+s.ey+'</p><h2>'+s.t+'</h2><p class="c9-s">'+s.s+'</p></div><span class="c9-n">'+arr.length+(arr.length===1?" produto":" produtos")+'</span></div>';
  var g=D.createElement("div");g.className="cbk-grid c9-g";arr.forEach(function(c){g.appendChild(c)});sec.appendChild(g);l.appendChild(sec)});
 l.classList.add("c9-on");
 setTimeout(function(){busy=0},50)}
function run(){try{hero()}catch(e){}try{group()}catch(e){}}
var n=0;(function loop(){run();if(++n<30)setTimeout(loop,n<10?150:500)})();
addEventListener("resize",top);
D.addEventListener("change",function(e){if(e.target.closest&&e.target.closest("#cml-bk .cbk-bar"))setTimeout(run,60)},true);
var pend=0;try{new MutationObserver(function(){if(busy||pend)return;pend=1;(window.__cxQ||(window.__cxQ=function(f,d){var n=performance.now(),g=window.__cxg||(window.__cxg={t:0,c:0});if(n-g.t>50){g.t=n;g.c=0}g.c++;if(g.c<12)Promise.resolve().then(f);else setTimeout(f,d)}))(function(){pend=0;try{group()}catch(e){}},120)}).observe(D.documentElement,{childList:true,subtree:true})}catch(e){}
})();

/* SITE PREMIUM AJUSTES 10 (02/11/2026): Encontre seu cha no visual padrao da Chef (papel claro), fora do tema Black.
   O cml-black ja nao liga o tema nesta pagina (trava no pacote cpv-loja v25). Aqui: fundo creme e as regras do quiz da Etapa 4
   convertidas para a paleta clara (tinta, preto-oliva e oliva no lugar de branco e dourado). */
(function(){
if(window.__cmlE10)return;window.__cmlE10=1;
if(!/^\/encontre-seu-cha/.test(location.pathname))return;
var D=document;
function add(id,txt){var s=D.getElementById(id);if(!s){s=D.createElement("style");s.id=id;(D.head||D.documentElement).appendChild(s)}if(s.textContent!==txt)s.textContent=txt}
add("c10-base",[
'html:not(.cml-blk),html:not(.cml-blk) body{background:#F6EFE9!important}',
'html:not(.cml-blk) body .cef{padding-top:8px}',
'html:not(.cml-blk) body .cef-in{box-shadow:0 18px 40px -28px rgba(43,42,31,.35)!important}',
'html:not(.cml-blk) body .cef .c4-sig em,html:not(.cml-blk) body .cef h3 em{color:#6e683a!important;-webkit-text-fill-color:#6e683a!important}'
].join("\n"));
function col(r,g,b,a){
 var mx=Math.max(r,g,b),mn=Math.min(r,g,b),o;
 if(r===223&&g===174&&b===88)o=[86,82,41];
 else if(r===243&&g===212&&b===139)o=[110,104,58];
 else if(r>190&&g>140&&g<225&&b<170&&r-b>60)o=[86,82,41];
 else if(mx<70)o=(r===11&&g===10&&b===8)?[246,239,233]:[251,247,242];
 else if(mn>225)o=(r===255&&g===255&&b===255)?[43,42,31]:[26,25,18];
 else o=[r,g,b];
 return a==null?"rgb("+o.join(", ")+")":"rgba("+o.join(", ")+", "+a+")"}
function conv(t){
 t=t.replace(/html\.cml-blk body /g,"html:not(.cml-blk) body ").replace(/html\.cml-blk /g,"html:not(.cml-blk) ");
 t=t.replace(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/g,function(m,r,g,b,a){return col(+r,+g,+b,a==null?null:a)});
 t=t.replace(/%23dfae58|%23DFAE58/g,"%23565229").replace(/%23f3d48b|%23F3D48B/g,"%236e683a").replace(/%23f6efe9|%23F6EFE9/g,"%231a1912").replace(/#a65a14/gi,"#565229").replace(/#a65a14/gi,"#6e683a");
 return t}
var done=0;
function build(){
 var s=D.getElementById("c4-css");if(!s||!s.sheet)return false;var out=[];
 try{[].forEach.call(s.sheet.cssRules,function(x){var t=x.cssText;if(/\.cef/.test(t))out.push(conv(t))})}catch(e){return false}
 if(!out.length)return false;
 out.push('html:not(.cml-blk) body .cef .cef-way:hover{border-color:rgba(86,82,41,.55)!important}');
 add("c10-css",out.join("\n"));done=1;return true}
var n=0;(function loop(){if(build()&&n>6)return;if(++n<30)setTimeout(loop,n<10?120:500)})();
})();

/* SITE PREMIUM AJUSTES 11 (03/11/2026): Monte seu presente.
   1) Todos os kits e presentes (lista CML_KITS, definida no natal_patch junto do montador) em carrossel.
   2) Clique na foto escolhe o kit (antes abria a pagina do produto). "Ver detalhes" abre janela com fotos, descricao e "O que vem no kit", lidos da pagina do produto.
   3) CML_NFX: ajustes de texto aplicados no HTML que o montador gera (antes eram feitos na tela depois, e o texto piscava a cada clique).
   4) CML_BAR: barra do pedido com a caixa e os espacos preenchidos, valor por presente e frete por regiao (sem a linha de progresso).
   Precos da lista de kits: 03/11/2026 (Esquenta Black). Atualizar no natal_patch quando mudarem. */
(function(){
if(window.__cmlE11)return;window.__cmlE11=1;
if(!/^\/presentes-de-natal/.test(location.pathname))return;
var D=document;
var R="#6e1420";
function brl(v){return "R$ "+Number(v).toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".")}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var CSS=[
'#cml-natal .cmn-kits.cmn-kts{display:flex!important;grid-template-columns:none!important;gap:12px!important;overflow-x:auto;overscroll-behavior-x:contain;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding:4px 2px 12px;scrollbar-width:none}',
'#cml-natal .cmn-kits.cmn-kts::-webkit-scrollbar{display:none}',
'#cml-natal .cmn-kts .cmn-kit{flex:0 0 calc((100% - 36px)/4);min-width:0;scroll-snap-align:start}',
'@media(max-width:900px){#cml-natal .cmn-kts .cmn-kit{flex-basis:calc((100% - 12px)/2.4)}}',
'@media(max-width:560px){#cml-natal .cmn-kts .cmn-kit{flex-basis:64%}}',
'#cml-natal .cmn-kts .cmn-kim{cursor:pointer}',
'#cml-natal .c11-bar{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:14px 0 8px}',
'#cml-natal .c11-bar small{font:400 13px/1.3 Poppins,system-ui,sans-serif;color:var(--muted,#6f6656)}',
'#cml-natal .c11-arr{display:flex;gap:6px}',
'#cml-natal .c11-arr button{display:grid;place-items:center;width:38px;height:38px;padding:0;border-radius:50%;border:1px solid var(--line,#e8ddd0);background:#fff;color:'+R+';cursor:pointer}',
'#cml-natal .c11-arr .c11-nx svg{transform:scaleX(-1)}',
'#cml-natal .c11-arr svg{width:18px;height:18px}',
'#cml-natal .cmn-kb .c11-det{display:inline-block;margin:2px 0 8px;padding:0;border:0;background:none;font:500 13px/1.2 Poppins,system-ui,sans-serif;color:'+R+';text-decoration:underline;text-underline-offset:3px;cursor:pointer;text-align:left}',
'@media(max-width:560px){#cml-natal .c11-arr{display:none}}',
'#cml-natal .cmn-bar.c11-b{display:grid!important;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:10px 18px;padding:12px 16px calc(12px + env(safe-area-inset-bottom,0px))!important}',
'#cml-natal .c11-b .cmn-nudge{grid-column:1/-1}',
'#cml-natal .c11-vis{display:flex;align-items:center;gap:8px;min-width:0}',
'#cml-natal .c11-bx{flex:none;width:48px;height:48px;border-radius:12px;overflow:hidden;border:1.5px solid #a65a14;background:#f6efe9}',
'#cml-natal .c11-bx img{display:block;width:100%;height:100%;object-fit:cover}',
'#cml-natal .c11-pl{color:rgba(43,41,22,.5);font:300 16px/1 Poppins,sans-serif}',
'#cml-natal .c11-sl{display:flex;flex-wrap:wrap;gap:5px;max-width:260px}',
'#cml-natal .c11-sl i{display:block;width:30px;height:30px;border-radius:50%;border:1.5px dashed rgba(255,250,245,.35);overflow:hidden;box-sizing:border-box}',
'#cml-natal .c11-sl i.f{border:1.5px solid #a65a14;background:#f6efe9;animation:c11in .25s ease-out}',
'#cml-natal .c11-sl i.x{border-color:#ffb27a;opacity:.6}',
'#cml-natal .c11-sl img,#cml-natal .c11-sl span{display:block;width:100%;height:100%;object-fit:cover}',
'@keyframes c11in{from{transform:scale(.6);opacity:0}to{transform:none;opacity:1}}',
'#cml-natal .c11-inf{min-width:0!important}',
'#cml-natal .c11-pq{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 12px}',
'#cml-natal .c11-pq b{font:600 15px/1.3 Poppins,sans-serif;color:#2b2916}',
'#cml-natal .c11-tt{font:400 13px/1.3 Poppins,sans-serif;color:#a65a14}',
'#cml-natal .c11-inf small{display:block;margin-top:3px;font-size:12.5px;line-height:1.35;opacity:.85}',
'#cml-natal .c11-fr{display:flex!important;align-items:center;gap:6px}',
'#cml-natal .c11-fr svg{flex:none;width:16px;height:16px;color:#a65a14}',
'#cml-natal .c11-fr b{color:#a65a14;font-weight:600}',
'#cml-natal .c11-act{display:flex;align-items:center;justify-content:flex-end;gap:14px}',
'#cml-natal .c11-act .cmn-btn{white-space:nowrap}',
'@media(max-width:820px){#cml-natal .cmn-bar.c11-b{grid-template-columns:minmax(0,1fr);gap:8px;margin-left:-4px;margin-right:-4px;padding:10px 12px calc(10px + env(safe-area-inset-bottom,0px))!important}#cml-natal .c11-act{justify-content:space-between}#cml-natal .c11-act .cmn-btn{flex:1;justify-content:center}#cml-natal .c11-bn{display:none}#cml-natal .c11-inf small{font-size:12px;margin-top:2px}html.c11-hasbar [data-slot=corner_bottom_left]{display:none!important}#cml-natal .c11-sl{max-width:none}#cml-natal .c11-sl i{width:28px;height:28px}#cml-natal .c11-bx{width:42px;height:42px}}',
'.c11-md{position:fixed;inset:0;z-index:100001;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(43,41,22,.55);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);font-family:Poppins,system-ui,sans-serif;opacity:0;transition:opacity .2s}',
'.c11-md.in{opacity:1}',
'.c11-mb{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:24px;width:100%;max-width:860px;max-height:calc(100vh - 40px);overflow:auto;padding:24px;border-radius:24px;background:#fff;color:#2b2916;box-shadow:0 30px 70px -20px rgba(43,41,22,.45)}',
'.c11-x{position:absolute;top:12px;right:12px;z-index:2;display:grid;place-items:center;width:36px;height:36px;padding:0;border-radius:50%;border:1px solid #e8ddd0;background:#fff;color:#2b2916;cursor:pointer}',
'.c11-x svg{width:16px;height:16px}',
'.c11-ph{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:18px;background:#f6efe9}',
'.c11-th{display:flex;gap:8px;margin-top:10px;overflow-x:auto;scrollbar-width:none}',
'.c11-th img{flex:none;width:58px;height:58px;object-fit:cover;border-radius:10px;border:1px solid #e8ddd0;cursor:pointer;opacity:.7}',
'.c11-th img.on{opacity:1;border-color:'+R+'}',
'.c11-ey{margin:4px 0 6px;font:600 11px/1.2 Poppins,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:'+R+'}',
'.c11-h{margin:0;font:700 26px/1.15 Poppins,sans-serif;color:#2b2916}',
'.c11-pr{display:flex;align-items:baseline;gap:10px;margin:10px 0 0}',
'.c11-pr b{font:700 22px/1 Poppins,sans-serif;color:'+R+'}',
'.c11-pr s{font:400 14px/1 Poppins,sans-serif;color:#9a8f7e}',
'.c11-tx{margin:12px 0 0;font:400 14px/1.55 Poppins,sans-serif;color:#5e5646}',
'.c11-in{margin:18px 0 0;padding:16px 18px;border-radius:16px;background:#f6efe9}',
'.c11-in p{margin:0 0 8px;font:600 13px/1.2 Poppins,sans-serif;color:#2b2916}',
'.c11-in ul{margin:0;padding:0;list-style:none;display:grid;gap:7px}',
'.c11-in li{display:flex;gap:10px;align-items:flex-start;font:400 14px/1.4 Poppins,sans-serif;color:#2b2916}',
'.c11-in li:before{content:"";flex:none;width:7px;height:7px;margin-top:7px;border-radius:50%;background:'+R+'}',
'.c11-ac{display:flex;flex-wrap:wrap;gap:10px;margin:20px 0 0}',
'.c11-ok{flex:1 1 auto;min-height:48px;padding:0 22px;border:0;border-radius:999px;background:'+R+';color:#2b2916;font:600 15px/1 Poppins,sans-serif;cursor:pointer}',
'.c11-ok:disabled{opacity:.6;cursor:default}',
'.c11-lk{display:inline-flex;align-items:center;min-height:48px;padding:0 18px;border:1px solid #e8ddd0;border-radius:999px;color:#2b2916!important;font:500 14px/1 Poppins,sans-serif;text-decoration:none!important}',
'.c11-sk{height:14px;margin:8px 0;border-radius:6px;background:linear-gradient(90deg,#f2ebe3,#e9dfd3,#f2ebe3);background-size:200% 100%;animation:c11sk 1.2s linear infinite}',
'@keyframes c11sk{from{background-position:200% 0}to{background-position:0 0}}',
'@media(max-width:700px){.c11-md{align-items:flex-end;padding:0}.c11-mb{grid-template-columns:1fr;gap:14px;max-height:92vh;padding:18px 18px 22px;border-radius:24px 24px 0 0}.c11-h{font-size:22px}}'
].join("\n");
function css(){if(D.getElementById("c11-css"))return;var s=D.createElement("style");s.id="c11-css";s.textContent=CSS;(D.head||D.documentElement).appendChild(s)}
css();
function kit(pid){var a=window.CML_KITS||[];for(var i=0;i<a.length;i++)if(String(a[i].pid)===String(pid))return a[i];return null}
var MAPH=[["Para quantas pessoas","é o presente"],["Como você quer","o presente"],["Escolha a caixa","a caixa"],["Escolha o que vai dentro","o que vai"],["Quer mandar","um cartão"],["Seus presentes","de Natal"],["Escreva","a mensagem"],["Para onde","vai"]];
function sig(el,cut){if(!el||el.querySelector("em"))return;var t=el.textContent.replace(/\s+/g," ").trim();if(!t)return;var i=cut?t.indexOf(cut):-1,a,b;
 if(i>0){a=t.slice(0,i).trim();b=t.slice(i).trim()}else{var w=t.split(" ");if(w.length<2){if(t.length<6)return;var h=Math.floor(t.length/2);el.innerHTML=esc(t.slice(0,h))+"<em>"+esc(t.slice(h))+"</em>";el.classList.add("c4-sig");return}var k=Math.max(1,Math.floor(w.length/2));a=w.slice(0,k).join(" ");b=w.slice(k).join(" ")}
 el.innerHTML=esc(a)+" <em>"+esc(b)+"</em>";el.classList.add("c4-sig")}
var AR='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
var X='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
window.CML_NFX=function(html){try{var T=D.createElement("template");T.innerHTML=html;var r=T.content;
 [].forEach.call(r.querySelectorAll(".cmn-h"),function(h){var t=h.textContent.trim(),c=null;MAPH.forEach(function(x){if(t.indexOf(x[0])===0)c=x[1]});sig(h,c)});
 [].forEach.call(r.querySelectorAll(".cmn-prev"),function(b){b.textContent="← Voltar"});
 var hp=!!r.querySelector(".cmn-prev");[].forEach.call(r.querySelectorAll(".cmn-back"),function(b){if(hp&&/^\s*←/.test(b.textContent))b.classList.add("c4-hb")});
 [].forEach.call(r.querySelectorAll(".cmn-it span"),function(s){var w=D.createTreeWalker(s,NodeFilter.SHOW_TEXT,null),n;while((n=w.nextNode()))if(/em oferta/.test(n.nodeValue))n.nodeValue=n.nodeValue.replace(/\s*·\s*em oferta/,"")});
 var sub=r.querySelector(".cmn-pane .cmn-sub");if(sub&&r.querySelector(".cmn-it")&&!/preço de Natal/.test(sub.textContent))sub.appendChild(D.createTextNode(" Todos com preço de Natal."));
 var w2=D.createTreeWalker(r,NodeFilter.SHOW_TEXT,null),n2;while((n2=w2.nextNode()))if(n2.nodeValue.indexOf("10%")>-1)n2.nodeValue=n2.nodeValue.replace(/10% (de|em) cashback/g,"5% $1 cashback").replace(/10% DE CASHBACK/g,"5% DE CASHBACK");
 var kc=r.querySelector(".cmn-kits.cmn-kts");if(kc){var nk=kc.querySelectorAll(".cmn-kit").length;var bar=D.createElement("div");bar.className="c11-bar";bar.innerHTML='<small>'+nk+(nk===1?" kit pronto":" kits prontos")+', arraste para ver todos</small><span class="c11-arr"><button type="button" data-c11d="-1" aria-label="Kits anteriores">'+AR+'</button><button type="button" data-c11d="1" aria-label="Próximos kits" class="c11-nx">'+AR+'</button></span>';kc.parentNode.insertBefore(bar,kc);
  [].forEach.call(kc.querySelectorAll(".cmn-kit"),function(k){var bt=k.querySelector(".cmn-kadd"),kb=k.querySelector(".cmn-kb");if(!bt||!kb)return;var d=D.createElement("button");d.type="button";d.className="c11-det";d.setAttribute("data-c11",bt.getAttribute("data-kit"));d.textContent="Ver detalhes";bt.parentNode.insertBefore(d,bt);var a=k.querySelector("a.cmn-kim");if(a){a.removeAttribute("target");a.setAttribute("aria-label","Escolher "+((kb.querySelector("b")||{}).textContent||"este kit"))}})}
 var out=T.innerHTML;D.documentElement.classList.toggle("c11-hasbar",out.indexOf("cmn-bar")>-1);return out}catch(e){return html}};
var FG=[[249,"SP"],[299,"Sul, Sudeste e DF"],[359,"Centro-Oeste"],[459,"Nordeste"],[599,"Norte"]];
var TRK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/></svg>';
function th(u,w){return u?String(u).replace(/-\d+-\d+(\.\w+)$/,"-"+(w||100)+"-0$1"):""}
window.CML_BAR=function(o){var g=o.g,b=o.b,c=o.c,tot=o.tot,f=o.brl,list=[];
 for(var k in g.items){var p=o.byId[k];for(var q=0;q<g.items[k];q++)list.push(p)}
 var cap=b.cap,sl="";for(var i=0;i<Math.max(cap,list.length);i++){var p2=list[i];sl+=p2?'<i class="f'+(i>=cap?" x":"")+'" title="'+esc(p2.name)+'">'+(p2.img?'<img src="'+esc(th(p2.img))+'" alt="">':'<span style="background:'+(p2.color||"#d8c9b5")+'"></span>')+'</i>':'<i></i>'}
 var each=o.gt(g),multi=o.n>1,pl;
 if(!multi)pl='<b>Seu presente: '+f(tot)+'</b>';
 else if(o.mode==="iguais")pl='<b>Cada presente: '+f(each)+'</b><span class="c11-tt">'+o.n+' presentes: '+f(tot)+'</span>';
 else pl='<b>Presente '+(o.gi+1)+' de '+o.n+': '+f(each)+'</b><span class="c11-tt">Total até agora: '+f(tot)+'</span>';
 var got=FG.filter(function(x){return tot>=x[0]}),nx=FG.filter(function(x){return tot<x[0]})[0],fr;
 if(o.dest==="varios")fr='Frete calculado para cada endereço';
 else if(!got.length)fr='Frete pago · faltam <b>'+f(nx[0]-tot)+'</b> para frete grátis em SP';
 else if(!nx)fr='<b>Frete grátis</b> para todo o Brasil';
 else fr='<b>Frete grátis</b> para '+got.map(function(x){return x[1]}).join(", ")+' · faltam <b>'+f(nx[0]-tot)+'</b> para '+nx[1];
 var st=o.over?'<span class="cmn-warnb">Tire '+(c-cap)+(c-cap>1?" itens":" item")+' para caber na caixa</span>':c+' de '+cap+' espaços preenchidos';
 return'<div class="cmn-bar c11-b">'+(o.nud?'<div class="cmn-nudge" role="status"><span>Ainda cabem <b>'+(cap-c)+(cap-c>1?" itens":" item")+'</b> nesta caixa. Quer aproveitar?</span><span class="cmn-nb"><button type="button" class="cmn-nf" data-fill="1">Escolher mais</button><button type="button" class="cmn-ns" data-go="5">Seguir assim</button></span></div>':"")
 +'<div class="c11-vis"><span class="c11-bx" title="'+esc(b.name)+'">'+(b.img?'<img src="'+esc(th(b.img,240))+'" alt="'+esc(b.name)+'">':"")+'</span><span class="c11-pl" aria-hidden="true">+</span><span class="c11-sl">'+sl+'</span></div>'
 +'<div class="cmn-meter c11-inf"><div class="c11-pq">'+pl+'</div><small><span class="c11-bn">'+esc(b.name)+' · </span>'+st+'</small><small class="c11-fr">'+TRK+'<span>'+fr+'</span></small></div>'
 +'<div class="c11-act"><button type="button" class="cmn-back" data-go="3">← Caixa</button><button type="button" class="cmn-btn" '+o.go+(c&&!o.over?"":" disabled")+'>Cartão de presente →</button></div></div>'};
function choose(pid){var b=D.querySelector('#cml-natal .cmn-kadd[data-kit="'+pid+'"]');if(b&&!b.disabled&&!b.closest(".cmn-kit").classList.contains("sel"))b.click()}
D.addEventListener("click",function(e){if(!e.target.closest)return;
 var a=e.target.closest("#cml-natal .cmn-kts a.cmn-kim");
 if(a){e.preventDefault();e.stopPropagation();var b=a.closest(".cmn-kit").querySelector(".cmn-kadd");if(b)choose(b.getAttribute("data-kit"));return}
 var d=e.target.closest("#cml-natal .c11-det");
 if(d){e.preventDefault();e.stopPropagation();open(d.getAttribute("data-c11"));return}
 var ar=e.target.closest("#cml-natal .c11-arr button");
 if(ar){e.preventDefault();e.stopPropagation();var k=D.querySelector("#cml-natal .cmn-kits.cmn-kts");if(k)k.scrollBy({left:(+ar.getAttribute("data-c11d"))*k.clientWidth*.9,behavior:"smooth"})}},true);
var cache={};
function load(k){if(cache[k.pid])return Promise.resolve(cache[k.pid]);
 return fetch(k.url.replace(/^https?:\/\/[^/]+/,""),{credentials:"same-origin"}).then(function(r){return r.text()}).then(function(h){var d=new DOMParser().parseFromString(h,"text/html");
  var imgs=[];[].forEach.call(d.querySelectorAll(".js-product-slide img,.product-slider-image img,.js-product-slide-img"),function(i){var s=i.getAttribute("data-srcset")||i.getAttribute("srcset")||"";var u="";if(s){var p=s.split(",").map(function(x){return x.trim().split(" ")[0]}).filter(Boolean);u=p[p.length-1]}else u=i.getAttribute("data-src")||i.getAttribute("src")||"";if(u&&u.indexOf("data:")!==0){u=u.replace(/^\/\//,"https://");if(imgs.indexOf(u)<0)imgs.push(u)}});
  if(!imgs.length){var og=d.querySelector('meta[property="og:image"]');if(og)imgs.push(og.content)}
  var items=[];var h4=[].filter.call(d.querySelectorAll("h2,h3,h4,h5,p,strong,b"),function(x){return x.children.length<2&&/^\s*o que vem/i.test(x.textContent)&&x.textContent.length<50})[0];
  if(h4){var c=h4;for(var i=0;i<5&&c&&!items.length;i++){var s2=c.nextElementSibling;while(s2&&!items.length){var lis=s2.querySelectorAll("li");if(lis.length)[].forEach.call(lis,function(l){var t=l.textContent.trim();if(t)items.push(t)});s2=s2.nextElementSibling}c=c.parentElement}}
  var md=d.querySelector('meta[name="description"]');var tx=md?md.content:"";
  cache[k.pid]={imgs:imgs.slice(0,6),items:items.slice(0,12),tx:tx};return cache[k.pid]})}
function open(pid){var k=kit(pid);if(!k)return;
 var sel=!!D.querySelector('#cml-natal .cmn-kit.sel .cmn-kadd[data-kit="'+pid+'"]');
 var m=D.createElement("div");m.className="c11-md";m.setAttribute("role","dialog");m.setAttribute("aria-modal","true");m.setAttribute("aria-label",k.name);
 m.innerHTML='<div class="c11-mb"><button type="button" class="c11-x" aria-label="Fechar">'+X+'</button><div><img class="c11-ph" src="'+esc(k.img)+'" alt="'+esc(k.name)+'"><div class="c11-th"></div></div><div><p class="c11-ey">Kit pronto</p><h3 class="c11-h">'+esc(k.name)+'</h3><div class="c11-pr"><b>'+brl(k.price)+'</b>'+(k.cmp?'<s>'+brl(k.cmp)+'</s>':'')+'</div><p class="c11-tx"><span class="c11-sk" style="display:block;width:90%"></span><span class="c11-sk" style="display:block;width:70%"></span></p><div class="c11-in"><p>O que vem no kit</p><ul><li class="c11-sk" style="width:80%"></li><li class="c11-sk" style="width:60%"></li><li class="c11-sk" style="width:70%"></li></ul></div><div class="c11-ac"><button type="button" class="c11-ok"'+(sel||!k.ok?' disabled':'')+'>'+(sel?"✓ Kit escolhido":!k.ok?"Indisponível":"Escolher este kit")+'</button><a class="c11-lk" href="'+esc(k.url)+'" target="_blank" rel="noopener">Página do produto</a></div></div></div>';
 function close(){m.classList.remove("in");setTimeout(function(){m.remove()},180);D.removeEventListener("keydown",esc2)}
 function esc2(e){if(e.key==="Escape")close()}
 m.addEventListener("click",function(e){if(e.target===m||e.target.closest(".c11-x"))close();if(e.target.closest(".c11-ok")){choose(pid);close()}});
 D.addEventListener("keydown",esc2);D.body.appendChild(m);requestAnimationFrame(function(){m.classList.add("in")});m.querySelector(".c11-x").focus();
 load(k).then(function(r){var ph=m.querySelector(".c11-ph"),th=m.querySelector(".c11-th");
  if(r.imgs.length){ph.src=r.imgs[0];if(r.imgs.length>1)th.innerHTML=r.imgs.map(function(u,i){return'<img src="'+esc(u)+'" alt="" class="'+(i?"":"on")+'">'}).join("");
   th.addEventListener("click",function(e){var t=e.target.closest("img");if(!t)return;ph.src=t.src;[].forEach.call(th.children,function(x){x.classList.toggle("on",x===t)})})}
  m.querySelector(".c11-tx").textContent=r.tx||"";
  var ul=m.querySelector(".c11-in ul");if(r.items.length)ul.innerHTML=r.items.map(function(t){return"<li>"+esc(t)+"</li>"}).join("");else m.querySelector(".c11-in").style.display="none"})
 .catch(function(){m.querySelector(".c11-tx").textContent="";m.querySelector(".c11-in").style.display="none"})}
})();

/* SITE PREMIUM AJUSTES 12 (03/11/2026).
   1) /ofertas/ (Esquenta Black): vitrine com 4 por linha, 2 linhas por categoria e botao "Ver mais" que abre o resto na mesma pagina.
      Produto destaque de cada categoria em card grande (2 x 2), alternando esquerda e direita (mosaico).
      Destaque = cards com selo "Destaque" na secao Os destaques; nas outras categorias, o primeiro produto.
   2) Paginas de produto: legenda das fotos "Nos detalhes" (.cpv-tile) branca e legivel no tema escuro.
   3) Kit Desdobramento: 4a foto de "Nos detalhes" era outra Laranja Chocoleve (parecida com a 3a); troca por ens11 (granola, trouxinhas e cha). */
(function(){
if(window.__cmlE12)return;window.__cmlE12=1;
var D=document,P=location.pathname;
var CSS=[
'.cpv-tile figcaption{-webkit-text-fill-color:#2b2916!important;color:#2b2916!important;background:linear-gradient(180deg,transparent,rgba(255,250,245,.85))!important;text-shadow:0 1px 10px rgba(0,0,0,.45)}',
'#cml-bk .c9-g.c12-g{grid-template-columns:repeat(4,minmax(0,1fr))!important;grid-auto-flow:row dense!important}',
'#cml-bk .c12-g .c12-big{grid-column:span 2;grid-row:span 2}',
'#cml-bk .c12-g .c12-big.c12-r{grid-column:3/span 2}',
'#cml-bk .c12-g .c12-big .cbk-img{flex:1 1 auto;min-height:0;aspect-ratio:1/1!important;height:auto!important}',
'#cml-bk .c12-g .c12-big .cbk-img img{width:100%!important;height:100%!important;object-fit:cover}',
'#cml-bk .c12-g .c12-big .cbk-nm{font-size:20px!important;line-height:1.25!important}',
'#cml-bk .c12-g .c12-big .cbk-por{font-size:22px!important}',
'#cml-bk .c12-g .c12-h{display:none!important}',
'#cml-bk .c12-mw{display:flex;justify-content:center;margin:22px 0 0}',
'#cml-bk .c12-more{display:inline-flex;align-items:center;gap:10px;min-height:46px;padding:0 26px;border-radius:999px;border:1px solid rgba(166,90,20,.6);background:transparent;color:#a65a14;-webkit-text-fill-color:#a65a14;font:500 14px/1 Poppins,sans-serif;letter-spacing:.02em;cursor:pointer;transition:background .2s,color .2s}',
'#cml-bk .c12-more:hover{background:#a65a14;color:#f6efe9;-webkit-text-fill-color:#f6efe9}',
'#cml-bk .c12-more svg{width:16px;height:16px}',
'@media(max-width:900px){#cml-bk .c9-g.c12-g{grid-template-columns:repeat(2,minmax(0,1fr))!important}#cml-bk .c12-g .c12-big,#cml-bk .c12-g .c12-big.c12-r{grid-column:1/-1;grid-row:auto}#cml-bk .c12-g .c12-big .cbk-img{aspect-ratio:1/1!important}}'
].join("\n");
function css(){if(D.getElementById("c12-css"))return;var s=D.createElement("style");s.id="c12-css";s.textContent=CSS;(D.head||D.documentElement).appendChild(s)}
css();
var CH='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
function vitrine(){var gs=D.querySelectorAll("#cml-bk .c9-sec .c9-g");if(!gs.length)return false;
 var K=0;[].forEach.call(gs,function(g){var cards=[].slice.call(g.querySelectorAll(":scope>.cbk-card"));var dsec=/destaque/i.test((g.closest(".c9-sec").querySelector("h2")||{}).textContent||"");var si=K;if(dsec||cards.length>=5)K++;var sig=cards.length+"|"+(cards[0]&&cards[0].querySelector("a[href]")?cards[0].querySelector("a[href]").getAttribute("href"):"");if(g.__c12===sig)return;g.__c12=sig;
  g.classList.add("c12-g");var sec=g.closest(".c9-sec");var dest=/destaque/i.test((sec.querySelector("h2")||{}).textContent||"");
  var bigs=[];cards.forEach(function(c){c.classList.remove("c12-big","c12-r","c12-h")});
  if(dest){var fd=cards.filter(function(c){return/Destaque/i.test((c.querySelector(".cbk-tag")||{}).textContent||"")&&!/laranja/i.test(c.textContent)})[0];if(fd)bigs.push(fd)}
  if(!bigs.length&&cards.length>=5)bigs.push(cards[0]);
  bigs.forEach(function(c,i){c.classList.add("c12-big");if((si+i)%2===1)c.classList.add("c12-r")});
  var narrow=matchMedia("(max-width:900px)").matches,cols=narrow?2:4,lim=cols*(narrow?3:2),used=0,hid=0;
  cards.forEach(function(c){var cost=c.classList.contains("c12-big")?(narrow?2:4):1;if(used+cost<=lim&&!hid){used+=cost}else{c.classList.add("c12-h");hid++}});
  var w=sec.querySelector(".c12-mw");if(w)w.remove();
  if(hid){w=D.createElement("div");w.className="c12-mw";w.innerHTML='<button type="button" class="c12-more">Ver mais '+hid+(hid===1?" produto":" produtos")+CH+'</button>';g.parentNode.insertBefore(w,g.nextSibling);
   w.firstChild.addEventListener("click",function(){[].forEach.call(g.querySelectorAll(".c12-h"),function(c){c.classList.remove("c12-h")});w.remove()})}});
 return true}
function desdob(){if(!/^\/produtos\/kit-desdobramento/.test(P))return true;var done=false;
 [].forEach.call(D.querySelectorAll(".cpv-tile img"),function(i){var s=i.getAttribute("src")||"";if(!/\/ens5\.jpg/.test(s))return;var n=s.replace(/\/ens5\.jpg/,"/ens11.jpg");i.setAttribute("src",n);i.removeAttribute("srcset");i.setAttribute("alt","Granola Doce, Trouxinhas de Maçã e chá do Kit Desdobramento");var f=i.closest("figure").querySelector("figcaption");if(f)f.textContent="Granola Doce e trouxinhas para a pausa do chá";done=true});
 return done||!!D.querySelector(".cml-pd .cpv-tile")}
var pend=0;function run(){if(/^\/ofertas/.test(P))try{vitrine()}catch(e){}try{desdob()}catch(e){}}
var n=0;(function loop(){run();if(++n<40)setTimeout(loop,n<10?200:600)})();
try{new MutationObserver(function(){if(pend)return;pend=1;setTimeout(function(){pend=0;run()},150)}).observe(D.documentElement,{childList:true,subtree:true})}catch(e){}
var rw=0;addEventListener("resize",function(){clearTimeout(rw);rw=setTimeout(function(){[].forEach.call(D.querySelectorAll("#cml-bk .c12-g"),function(g){g.__c12=""});run()},250)});
})();

/* SITE PREMIUM AJUSTES 11b (03/11/2026): Monte seu presente. Atualiza preco, preco riscado e estoque dos kits (CML_KITS) com a lista ao vivo do cml-ofertas, para nao depender dos precos fixos do natal_patch. */
(function(){
if(window.__cmlE11b)return;window.__cmlE11b=1;
if(!/^\/presentes-de-natal/.test(location.pathname))return;
fetch("https://dzmlyrkzcdqicwfmxnxd.supabase.co/functions/v1/cml-ofertas").then(function(r){return r.json()}).then(function(j){var L=(j&&j.p)||[];var n=0;
 (function ap(){var K=window.CML_KITS;if(!K){if(++n<60)setTimeout(ap,250);return}
  K.forEach(function(k){var x=L.filter(function(p){return p.pid==k.pid})[0];if(!x)return;if(x.price)k.price=Number(x.price);k.cmp=x.cmp&&Number(x.cmp)>k.price?Number(x.cmp):0;if(x.stock===0)k.ok=false})})()}).catch(function(){});
})();

/* CML KIT NATAL FELIZ: clique nos itens do kit e videos por item (05/11/2026) */
(function(){
  var VIDEO_BASE = "https://cdn.jsdelivr.net/gh/thierryshark/diagnostico@8fdfb0ede204d43b8b115a0ab55100209a9b4005/chefmaisleve-midia/natal-feliz/";
  var VIDEOS = {"kit-item-1":"1-laranja","kit-item-2":"2-tangerina","kit-item-3":"3-trouxinha","kit-item-4":"4-intenso","kit-item-5":"5-infusor","kit-item-6":"6-xicara","kit-item-7":"7-caixa"};
  function visivel(el){ var r = el.getBoundingClientRect(); return el.offsetParent !== null && r.height > 0 && r.width > 0; }
  function alvo(id){ var els = document.querySelectorAll('[id="' + id + '"]'); for (var i = 0; i < els.length; i++) { if (visivel(els[i])) return els[i]; } return null; }
  document.addEventListener("click", function(e){
    var a = e.target && e.target.closest ? e.target.closest('a[href^="#kit-item-"]') : null;
    if (!a) return;
    var t = alvo(a.getAttribute("href").slice(1));
    if (!t) return;
    e.preventDefault(); e.stopPropagation();
    var head = document.querySelector(".js-head-main");
    var off = (head ? head.getBoundingClientRect().height : 80) + 24;
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - off, behavior: "smooth" });
    if (t.animate) t.animate([{ boxShadow: "0 0 0 3px #a65a14" }, { boxShadow: "0 0 0 0 rgba(166,90,20,0)" }], { duration: 1600, easing: "ease-out" });
  }, true);
  var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function(ents){
    ents.forEach(function(en){ var v = en.target; if (en.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function(){}); } else { v.pause(); } });
  }, { threshold: 0.35 }) : null;
  function trocar(){
    if (!VIDEO_BASE) return;
    Object.keys(VIDEOS).forEach(function(id){
      var bloco = alvo(id); if (!bloco || bloco.getAttribute("data-cml-v")) return;
      var img = bloco.querySelector("img"); if (!img) return;
      var v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true; v.preload = "metadata";
      v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.setAttribute("aria-label", img.alt || "");
      v.poster = VIDEO_BASE + VIDEOS[id] + "-poster.jpg";
      v.src = VIDEO_BASE + VIDEOS[id] + ".mp4";
      v.style.cssText = "width:100%;aspect-ratio:720/584;object-fit:cover;border-radius:20px;display:block;background:#fffaf5";
      img.replaceWith(v); bloco.setAttribute("data-cml-v", "1");
      if (io) io.observe(v);
    });
  }
  function iniciar(){ if (!document.querySelector('[id^="kit-item-"]')) return; trocar(); setTimeout(trocar, 800); setTimeout(trocar, 2500); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
  window.addEventListener("load", function(){ setTimeout(iniciar, 300); });
})();

/* CML KIT NATAL FELIZ 2 + BUSCA: composicao no lugar da lista padrao, embalagem sem upgrade, pagina de busca no padrao (05/11/2026) */
(function(){
  var KIT_IDS = {"379081240": "caixa de madeira gravada com a marca, a nossa embalagem mais especial"};
  function css(id, txt){ if (document.getElementById(id)) return; var s = document.createElement("style"); s.id = id; s.textContent = txt; document.head.appendChild(s); }
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
  function pid(){ var f = document.getElementById("product_form"); var i = f && f.querySelector("input[name=add_to_cart]"); return i ? String(i.value) : ""; }

  /* ---------- Kit: composicao propria no lugar da lista padrao ---------- */
  function kit(){
    var id = pid(); if (!KIT_IDS[id]) return false;
    css("cmlk-css",
      ".product-kit{display:none!important}" +
      ".cmlk{margin:18px 0 6px;font-family:Poppins,sans-serif}" +
      ".cmlk .o{margin:0 0 10px;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:#a65a14}" +
      ".cmlk .g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}" +
      ".cmlk a{display:block;text-decoration:none;color:inherit;min-width:0}" +
      ".cmlk img{width:100%;aspect-ratio:1/1;object-fit:cover;display:block;border-radius:14px;border:1px solid rgba(166,90,20,.28);transition:transform .2s,border-color .2s}" +
      ".cmlk a:hover img{transform:translateY(-2px);border-color:#a65a14}" +
      ".cmlk b{display:block;margin-top:6px;font-size:11.5px;font-weight:500;line-height:1.25;color:#2b2916;overflow-wrap:anywhere}" +
      ".cmlk small{display:block;font-size:10.5px;font-weight:300;color:rgba(43,41,22,.6)}" +
      ".cmlk .h{margin:10px 0 0;font-size:12px;font-weight:300;font-style:italic;color:rgba(43,41,22,.6)}" +
      "html:not(.cml-blk) .cmlk b{color:#2b2916}html:not(.cml-blk) .cmlk small,html:not(.cml-blk) .cmlk .h{color:#6f6656}html:not(.cml-blk) .cmlk .o{color:#a65a14}" +
      ".cmlk-src{display:none!important}" +
      ".cmlk-emb{display:flex;gap:12px;align-items:flex-start;margin-top:4px;font-family:Poppins,sans-serif;font-size:14px;font-weight:300;line-height:1.45;color:rgba(43,41,22,.85)}.cmlk-emb svg{flex:none;margin-top:2px;color:#a65a14}.cmlk-emb b{font-weight:600;color:#2b2916}html:not(.cml-blk) .cmlk-emb{color:#2b2916}html:not(.cml-blk) .cmlk-emb b{color:#565229}");
    var lista = document.querySelector(".product-kit");
    if (lista && !document.querySelector(".cmlk")) {
      var cards = [].filter.call(document.querySelectorAll('a[href^="#kit-item-"]'), function(a){ return a.querySelector("img"); });
      var vistos = {}, itens = [];
      cards.forEach(function(a){ var h = a.getAttribute("href"); if (vistos[h]) return; vistos[h] = 1; itens.push({ h: h, img: a.querySelector("img").getAttribute("src"), alt: a.querySelector("img").getAttribute("alt") || "", n: (a.querySelector("b") || {}).textContent || "", q: ((a.querySelectorAll("span span")[0]) || {}).textContent || "" }); });
      if (itens.length) {
        var w = document.createElement("div"); w.className = "cmlk";
        w.innerHTML = '<p class="o">O que vem no kit · ' + itens.length + ' itens</p><div class="g">' + itens.map(function(i){ return '<a href="' + esc(i.h) + '"><img src="' + esc(i.img) + '" alt="' + esc(i.alt) + '" loading="lazy" width="120" height="120"><b>' + esc(i.n) + '</b><small>' + esc(i.q) + '</small></a>'; }).join("") + '</div><p class="h">Toque em um item para ver em detalhe.</p>';
        lista.parentNode.insertBefore(w, lista);
        cards.forEach(function(a){ var sec = a.parentNode && a.parentNode.parentNode; if (sec && !sec.classList.contains("cmlk")) sec.classList.add("cmlk-src"); });
      }
    }
    /* Embalagem: o kit ja vem na melhor caixa, sem oferta de troca */
    var emb = document.querySelector("#product_form .cmle");
    if (emb && !emb.getAttribute("data-cmlk")) {
      emb.setAttribute("data-cmlk", "1");
      emb.innerHTML = '<h3>Embalagem</h3><div class="cmlk-emb"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8h17v4h-17zM5 12v9h14v-9M12 8v13"/><path d="M12 8C10.6 5 7.5 4.6 7.5 6.4 7.5 7.6 9 8 12 8zM12 8c1.4-3 4.5-3.4 4.5-1.6 0 1.2-1.5 1.6-4.5 1.6z"/></svg><span><b>Já acompanha</b> ' + esc(KIT_IDS[id]) + '.</span></div>';
    }
    return !!(document.querySelector(".cmlk") && emb);
  }

  /* ---------- Pagina de busca ---------- */
  function busca(){
    if (!document.body || !document.body.classList.contains("template-search")) return true;
    css("cmls-css",
      "body.template-search .page-header-title{font-family:Poppins,sans-serif;font-size:clamp(28px,4.4vw,44px)!important;line-height:1.12!important;font-weight:700!important;margin:0 0 6px!important;overflow-wrap:anywhere}" +
      "body.template-search .page-header-title .cmls-o{display:block;margin:0 0 12px;font-size:12px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:#a65a14}" +
      "body.template-search .page-header-title i{font-weight:300;font-style:italic;color:#a65a14}" +
      "html:not(.cml-blk) body.template-search .page-header-title i{color:#a65a14}" +
      "body.template-search .products-grid-search-heading{font-family:Poppins,sans-serif;font-size:14px!important;font-weight:300!important;line-height:1.5!important;text-align:left!important;color:rgba(43,41,22,.7)!important;margin:0 0 18px!important;padding:0!important}" +
      "html:not(.cml-blk) body.template-search .products-grid-search-heading{color:#6f6656!important}" +
      "body.template-search .products-grid-search-suggestion,body.template-search .cmls-p{font-family:Poppins,sans-serif;font-size:15px;font-weight:300;line-height:1.55;color:rgba(43,41,22,.78)}" +
      "body.template-search .cmls-sug{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 6px}" +
      "body.template-search .cmls-sug a{display:inline-block;padding:8px 16px;border-radius:999px;border:1px solid rgba(166,90,20,.45);color:#2b2916;text-decoration:none;font-family:Poppins,sans-serif;font-size:13px;font-weight:500}" +
      "body.template-search .cmls-sug a:hover{border-color:#a65a14;color:#a65a14}" +
      "body.template-search .cmls-t{margin:34px 0 14px;font-family:Poppins,sans-serif;font-size:12px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:#a65a14}" +
      "body.template-search .section-main-products-grid{padding-top:10px!important}body.template-search .page-header,body.template-search .section-page-header{padding-bottom:0!important;margin-bottom:0!important}" +
      "@media(max-width:640px){body.template-search .page-header-title{font-size:30px!important}body.template-search .page-header-title .cmls-o{font-size:11px}}");
    var h1 = document.querySelector(".page-header-title"); if (!h1 || h1.getAttribute("data-cmls")) return true;
    var q = ""; try { q = new URLSearchParams(location.search).get("q") || ""; } catch (e) {}
    q = q.trim(); var qq = q.length > 40 ? q.slice(0, 40) + "…" : q;
    var vazio = /n[aã]o encontramos/i.test(h1.textContent);
    h1.setAttribute("data-cmls", "1");
    if (!vazio) {
      h1.innerHTML = '<span class="cmls-o">Busca</span>' + (qq ? 'Resultados para <i>“' + esc(qq) + '”</i>' : 'Resultados da <i>busca</i>');
      var h2 = document.querySelector(".products-grid-search-heading");
      if (h2) { var m = h2.textContent.match(/(\d+)/); var n = m ? +m[1] : 0; h2.textContent = n ? (n + (n === 1 ? " produto encontrado" : " produtos encontrados")) : ""; }
    } else {
      h1.innerHTML = '<span class="cmls-o">Busca</span>Nada por aqui para <i>“' + esc(qq) + '”</i>';
      var s = document.querySelector(".products-grid-search-suggestion");
      if (s) {
        s.textContent = "Tente outra palavra ou comece por um destes caminhos:";
        var sug = document.createElement("div"); sug.className = "cmls-sug";
        sug.innerHTML = ['chá','laranja','trouxinha','granola','kit'].map(function(t){ return '<a href="/search/?q=' + encodeURIComponent(t) + '">' + t.charAt(0).toUpperCase() + t.slice(1) + '</a>'; }).join("");
        s.parentNode.insertBefore(sug, s.nextSibling);
        var nx = sug.nextElementSibling;
        if (nx && /seguintes produtos/i.test(nx.textContent)) { nx.className = "cmls-t"; nx.textContent = "Talvez você goste"; }
      }
    }
    return true;
  }

  function run(){ var n = 0; (function l(){ var ok1 = true, ok2 = true; try { ok1 = busca(); } catch (e) {} try { ok2 = !document.getElementById("product_form") || kit() || !KIT_IDS[pid()]; } catch (e) {} if ((!ok2) && ++n < 50) setTimeout(l, 150); })(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
  window.addEventListener("load", function(){ setTimeout(run, 400); setTimeout(run, 2500); });
})();

/* CML KIT NATAL FELIZ 3: bloco Feito a mao sem foto (tempos de desidratacao) e avaliacoes vazias ocultas (05/11/2026) */
(function(){
  var IDS = {"379081240": 1};
  function pid(){ var f = document.getElementById("product_form"); var i = f && f.querySelector("input[name=add_to_cart]"); return i ? String(i.value) : ""; }
  var ROWS = [["13", "Laranja Chocoleve", 100], ["12", "Infusão na Tangerina", 92], ["11", "Trouxinha de Maçã", 85]];
  function css(){
    if (document.getElementById("cmlt-css")) return;
    var s = document.createElement("style"); s.id = "cmlt-css";
    s.textContent =
      ".cml-f-exp figure.cmlt-fig{display:flex!important;align-items:stretch;background:none!important;padding:0!important;aspect-ratio:auto!important;min-height:0!important}" +
      ".cmlt{position:relative;isolation:isolate;overflow:hidden;width:100%;box-sizing:border-box;padding:clamp(24px,4vw,40px);border-radius:28px;border:1px solid rgba(166,90,20,.28);" +
      "background:radial-gradient(120% 100% at 20% 10%,#6b1e2a 0%,#5c1823 45%,#4a141d 100%);color:#2b2916;font-family:Poppins,sans-serif;display:flex;flex-direction:column;justify-content:center;gap:22px}" +
      ".cmlt:after{content:'';position:absolute;inset:0;pointer-events:none;opacity:.11;mix-blend-mode:multiply;background-image:url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\");background-size:220px}" +
      ".cmlt>*{position:relative;z-index:1}" +
      ".cmlt .o{margin:0;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:#a65a14}" +
      ".cmlt .r{display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:18px;align-items:end}" +
      ".cmlt .n{font-size:clamp(40px,5vw,58px);font-weight:700;line-height:.9;color:#2b2916;letter-spacing:-.02em}.cmlt .n i{font-style:italic;font-weight:300;font-size:.5em;color:#a65a14;margin-left:2px;letter-spacing:0}" +
      ".cmlt .t{font-size:14px;font-weight:300;color:rgba(43,41,22,.85);padding-bottom:6px;overflow-wrap:anywhere}" +
      ".cmlt .b{grid-column:1/-1;height:2px;margin-top:12px;border-radius:2px;background:rgba(43,41,22,.14);overflow:hidden}" +
      ".cmlt .b span{display:block;height:100%;width:0;border-radius:2px;background:linear-gradient(90deg,#a65a14,#a65a14);transition:width 1.6s cubic-bezier(.2,.7,.2,1)}" +
      ".cmlt.on .b span{width:var(--w)}" +
      ".cmlt .f{margin:0;font-size:12.5px;font-weight:300;font-style:italic;line-height:1.5;color:rgba(43,41,22,.7)}" +
      ".cmlk-rev-off{display:none!important}";
    document.head.appendChild(s);
  }
  function figura(){
    var ok = false;
    [].forEach.call(document.querySelectorAll(".cml-f-exp figure"), function(f){
      if (f.__b3go || f.querySelector(".b3")) { ok = true; return; }
      f.setAttribute("data-cmlt", "1"); f.className = (f.className.replace("cmlt-fig", "") + " cmlt-fig").trim();
      if (!f.__b3go) { f.__b3go = 1; var B3 = "https://cdn.jsdelivr.net/gh/thierryshark/diagnostico@40e883e3036fe3a9987dcbff4879cec8894f5718/chefmaisleve-midia/natal-feliz/3d/"; f.innerHTML = ""; import(B3 + "box3d.js").then(function(m){ m.mount(f, B3); }).catch(function(){ f.innerHTML = '<img alt="Caixa de madeira do kit Natal Feliz" src="' + B3 + 'caixa.jpg" style="width:100%;border-radius:24px">'; }); ok = true; return; }
      f.innerHTML = '<div class="cmlt" role="img" aria-label="Tempo de desidratação: cerca de 13 horas para a laranja, 12 para a tangerina e 11 para a trouxinha"><p class="o">Tempo na desidratação</p>' +
        ROWS.map(function(r, i){ return '<div class="r"><span class="n">' + r[0] + '<i>h</i></span><span class="t">' + r[1] + '</span><span class="b"><span style="--w:' + r[2] + '%;transition-delay:' + (i * 0.25) + 's"></span></span></div>'; }).join("") +
        '<p class="f">Tempos aproximados, em baixa temperatura, a partir da fruta in natura.</p></div>';
      var card = f.querySelector(".cmlt");
      if ("IntersectionObserver" in window) { var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { card.classList.add("on"); io.disconnect(); } }); }, { threshold: 0.4 }); io.observe(card); } else card.classList.add("on");
      ok = true;
    });
    return ok;
  }
  function avaliacoes(){
    var hit = false;
    [].forEach.call(document.querySelectorAll("strong,p,h2,h3,span"), function(t){
      if (t.children.length || !/Ganhe descontos avaliando/i.test(t.textContent)) return;
      var w = t.closest('[class*="mi-@container"]') || t.closest(".cml-rev"); if (!w) return;
      while (w.parentElement && !String(w.parentElement.className).trim() && w.parentElement.children.length === 1) w = w.parentElement;
      var rev = t.closest(".cml-rev"); if (rev) w = rev;
      w.classList.add("cmlk-rev-off"); hit = true;
    });
    return hit;
  }
  function run(){
    if (!IDS[pid()]) return;
    css(); var n = 0;
    (function l(){ var a = false, b = false; try { a = figura(); } catch (e) {} try { b = avaliacoes(); } catch (e) {} if ((!a || !b) && ++n < 60) setTimeout(l, 250); })();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
  window.addEventListener("load", function(){ setTimeout(run, 500); setTimeout(run, 3000); });
})();

/* CML MOTION KIT NATAL FELIZ (05/11/2026) */
/* CML MOTION KIT: caixa abrindo e itens saindo, guiado pela rolagem. Uso: CMLMotion(container, baseUrl) */
(function(){
  var ITEMS = [
    { k: "laranja",   n: "Laranja Chocoleve",    s: "10 fatias",   x: 18, y: 14, h: 14 },
    { k: "tangerina", n: "Infusão na Tangerina", s: "2 unidades",  x: 50, y: 14, h: 14 },
    { k: "trouxinha", n: "Trouxinha de Maçã",    s: "6 unidades",  x: 82, y: 14, h: 14 },
    { k: "intenso",   n: "Chá Misto Intenso",    s: "40 g",        x: 18, y: 37, h: 14 },
    { k: "infusor",   n: "Infusor inox",         s: "com cabo",    x: 50, y: 37, h: 13 },
    { k: "xicara",    n: "Xícara de vidro duplo", s: "250 ml",     x: 82, y: 38, h: 9 }
  ];
  var NF = 30, SRC = { x: 50, y: 70 }, BOX = { x: 26, y: 54.5, w: 48, h: 42 };
  var CSS =
    ".cmm{position:relative;width:100%;aspect-ratio:4/5;border-radius:28px;overflow:hidden;isolation:isolate;font-family:Poppins,sans-serif;color:#2b2916;" +
    "background:radial-gradient(120% 100% at 30% 15%,#6b1e2a 0%,#5c1823 45%,#4a141d 100%);border:1px solid rgba(166,90,20,.28)}" +
    ".cmm:after{content:'';position:absolute;inset:0;pointer-events:none;opacity:.1;mix-blend-mode:multiply;z-index:0;background-image:url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\");background-size:220px}" +
    ".cmm-box{position:absolute;z-index:1;overflow:hidden;background:#fff;padding:6px;box-sizing:border-box;box-shadow:0 24px 50px -24px rgba(43,41,22,.2);will-change:left,top,width,height}" +
    ".cmm-box canvas{width:100%;height:100%;display:block;object-fit:cover}.cmm-ph{position:absolute;left:6px;top:6px;width:calc(100% - 12px);height:calc(100% - 12px);object-fit:cover;opacity:0;border-radius:16px}" +
    ".cmm svg{position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none;overflow:visible}" +
    ".cmm svg line{stroke:#a65a14;stroke-width:1.2;vector-effect:non-scaling-stroke}.cmm svg circle{fill:#a65a14}" +
    ".cmm-it{position:absolute;z-index:3;left:0;top:0;transform-origin:50% 50%;will-change:transform,opacity;pointer-events:none}" +
    ".cmm .cmm-it img{display:block!important;height:100%!important;width:auto!important;max-width:none!important;object-fit:contain!important;border-radius:0!important;filter:drop-shadow(0 14px 16px rgba(0,0,0,.45))}" +
    ".cmm-lb{position:absolute;z-index:4;transform:translateX(-50%);text-align:center;white-space:nowrap;pointer-events:none;will-change:opacity}" +
    ".cmm-lb b{display:block;font-size:clamp(10px,1.25vw,13px);font-weight:600;line-height:1.2;color:#2b2916}.cmm-lb small{display:block;font-size:clamp(9px,1.05vw,11px);font-weight:300;font-style:italic;color:#a65a14}" +
    ".cmm-bx{position:absolute;z-index:4;left:50%;transform:translateX(-50%);bottom:2.2%;padding:5px 12px;border-radius:999px;background:rgba(255,250,245,.72);font-size:clamp(10px,1.2vw,12px);font-weight:600;white-space:nowrap;color:#2b2916}.cmm-bx i{font-style:italic;font-weight:300;color:#a65a14}" +
    ".cmm-hd{position:absolute;z-index:4;left:0;right:0;top:3%;text-align:center;pointer-events:none}.cmm-hd p{margin:0;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:#a65a14}" +
    ".cmm-ld{position:absolute;inset:0;z-index:5;display:flex;align-items:center;justify-content:center;font-size:12px;color:#a65a14;background:rgba(74,20,29,.6)}" +
    "@media (prefers-reduced-motion:reduce){.cmm-it,.cmm-box{transition:none}}";
  function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }
  function ease(t){ return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function back(t){ var c = 1.4; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }
  window.CMLMotion = function(root, base){
    if (!root || root.getAttribute("data-cmm")) return; root.setAttribute("data-cmm", "1");
    if (!document.getElementById("cmm-css")) { var st = document.createElement("style"); st.id = "cmm-css"; st.textContent = CSS; document.head.appendChild(st); }
    var el = document.createElement("div"); el.className = "cmm"; el.setAttribute("role", "img");
    el.setAttribute("aria-label", "Caixa de madeira do kit Natal Feliz abrindo, com os itens saindo: " + ITEMS.map(function(i){ return i.n; }).join(", ") + ".");
    el.innerHTML = '<div class="cmm-hd"><p>O que sai da caixa</p></div><div class="cmm-box"><canvas width="560" height="700"></canvas><img class="cmm-ph" alt="" src="'+base+'caixa.jpg"></div><svg viewBox="0 0 100 125" preserveAspectRatio="none"></svg><span class="cmm-bx">Caixa de madeira <i>gravada</i></span><div class="cmm-ld">abrindo a caixa…</div>';
    root.innerHTML = ""; root.appendChild(el);
    var box = el.querySelector(".cmm-box"), cv = el.querySelector("canvas"), ctx = cv.getContext("2d"), svg = el.querySelector("svg"), bxl = el.querySelector(".cmm-bx"), hd = el.querySelector(".cmm-hd"), ld = el.querySelector(".cmm-ld"), ph = el.querySelector(".cmm-ph");
    var frames = [], loaded = 0, last = -1;
    for (var i = 0; i < NF; i++) { (function(i){ var im = new Image(); im.decoding = "async"; im.onload = function(){ loaded++; if (loaded === NF && ld) { ld.remove(); ld = null; draw(true); } }; im.src = base + "f/" + (i < 10 ? "0" : "") + i + ".jpg"; frames.push(im); })(i); }
    ITEMS.forEach(function(it){
      var d = document.createElement("div"); d.className = "cmm-it"; d.innerHTML = '<img src="' + base + it.k + '.webp" alt="">'; el.appendChild(d); it.el = d;
      var lb = document.createElement("div"); lb.className = "cmm-lb"; lb.innerHTML = "<b>" + it.n + "</b><small>" + it.s + "</small>"; el.appendChild(lb); it.lb = lb;
      var ln = document.createElementNS("http://www.w3.org/2000/svg", "line"); svg.appendChild(ln); it.ln = ln;
      var c = document.createElementNS("http://www.w3.org/2000/svg", "circle"); c.setAttribute("r", ".7"); svg.appendChild(c); it.dot = c;
    });
    var cur = 0, tgt = 0, raf = 0, visible = false;
    function progress(){ var r = el.getBoundingClientRect(), vh = window.innerHeight || 800; return clamp((vh * 0.92 - r.top) / (vh * 0.92 - vh * 0.22), 0, 1); }
    function draw(force){
      var W = el.clientWidth, H = el.clientHeight; if (!W) return;
      /* 1) tampa abrindo: 0 a 0.32 */
      var fp = clamp(cur / 0.32, 0, 1), f = Math.round(ease(fp) * (NF - 1));
      if ((f !== last || force) && frames[f] && frames[f].complete) { ctx.drawImage(frames[f], 0, 0, 560, 700); last = f; }
      /* 2) caixa recua para baixo: 0.30 a 0.46 */
      var k = ease(clamp((cur - 0.30) / 0.16, 0, 1));
      var bx = 0 + (BOX.x - 0) * k, by = 0 + (BOX.y - 0) * k, bw = 100 + (BOX.w - 100) * k, bh = 100 + (BOX.h - 100) * k;
      box.style.left = bx + "%"; box.style.top = by + "%"; box.style.width = bw + "%"; box.style.height = bh + "%";
      box.style.borderRadius = (0 + 22 * k) + "px"; box.style.padding = (6 * k) + "px";
      cv.style.borderRadius = (16 * k) + "px"; ph.style.opacity = clamp((k - 0.1) / 0.6, 0, 1); ph.style.left = ph.style.top = (6 * k) + "px"; ph.style.width = ph.style.height = "calc(100% - " + (12 * k) + "px)";
      bxl.style.opacity = clamp((cur - 0.88) / 0.08, 0, 1); hd.style.opacity = clamp((cur - 0.42) / 0.1, 0, 1);
      /* 3) itens saindo: 0.44 a 0.92 */
      ITEMS.forEach(function(it, i){
        var st = 0.44 + i * 0.055, t = clamp((cur - st) / 0.2, 0, 1), e = back(t), e2 = ease(t);
        var x = SRC.x + (it.x - SRC.x) * e2, y = SRC.y + (it.y - SRC.y) * e - Math.sin(t * Math.PI) * 6;
        var hpx = it.h / 100 * H, sc = 0.25 + 0.75 * e2, rot = (1 - e2) * (i % 2 ? 10 : -10);
        var img = it.el.firstChild, wpx = img.naturalWidth ? hpx * img.naturalWidth / img.naturalHeight : hpx;
        it.el.style.height = hpx + "px";
        it.el.style.opacity = clamp(t * 3, 0, 1);
        it.el.style.transform = "translate(" + (x / 100 * W - wpx / 2) + "px," + (y / 100 * H - hpx / 2) + "px) scale(" + sc + ") rotate(" + rot + "deg)";
        it.el.style.zIndex = t < 0.35 ? 1 : 3;
        var lt = clamp((cur - st - 0.17) / 0.08, 0, 1);
        var yb = it.y + it.h / 2;
        it.lb.style.left = it.x + "%"; it.lb.style.top = (yb + 4) + "%"; it.lb.style.opacity = lt;
        var ly1 = (yb + 3.4) * 1.25, ly2 = (yb + 0.6) * 1.25;
        it.ln.setAttribute("x1", it.x); it.ln.setAttribute("y1", ly1);
        it.ln.setAttribute("x2", it.x); it.ln.setAttribute("y2", ly1 + (ly2 - ly1) * lt);
        it.ln.style.opacity = lt * 0.9; it.dot.setAttribute("cx", it.x); it.dot.setAttribute("cy", ly2); it.dot.style.opacity = lt;
      });
    }
    function loop(){ tgt = progress(); cur += (tgt - cur) * 0.14; if (Math.abs(tgt - cur) < 0.0005) cur = tgt; draw(); raf = visible ? requestAnimationFrame(loop) : 0; }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function(es){ es.forEach(function(e){ visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(loop); }); }, { rootMargin: "200px 0px" }).observe(el);
    } else { visible = true; raf = requestAnimationFrame(loop); }
    window.addEventListener("resize", function(){ draw(true); });
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { cur = tgt = 1; draw(true); }
  };
})();


/* CML DUO PRESENTES v2 (05/11/2026): Natal Feliz + Ternura lado a lado em /ofertas/ e /kits-presentes/ */
(function(){
 var P=location.pathname.replace(/\/+$/,"/");
 var MODE=P==="/ofertas/"?"bk":P==="/kits-presentes/"?"kt":"";
 if(!MODE||window.__cmlDuo)return;window.__cmlDuo=1;
 var K=[
  {h:"kitl-natal-feliz",n:"Natal Feliz",tag:"Novo · caixa de madeira",d:"Sete itens artesanais na caixa de madeira gravada com a marca, a nossa embalagem mais especial.",p:286.16,c:392,img:"https://acdn-us.mitiendanube.com/stores/005/060/752/products/cmw3ktxt2000000ilg3mw65a0-png-1024a1024-screenshot-e7d68eedc7195a3af917938956824193-640-0.webp"},
  {h:"kit-ternura1",n:"Ternura",tag:"Presente querido",d:"Trouxinhas aromáticas, infusão na tangerina e mendiants em uma caixa pronta para presentear.",p:99.5,c:199,img:"https://acdn-us.mitiendanube.com/stores/005/060/752/products/chatgpt-image-10_05_2026-20_10_11-fd3d350e39034ef24f17784546222859-640-0.webp"}
 ];
 function brl(v){return"R$ "+v.toFixed(2).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g,".")}
 var CSS='.cml-duo{position:relative;isolation:isolate;overflow:hidden;margin:22px 0 26px;padding:28px 28px 30px;border-radius:28px;border:1px solid rgba(166,90,20,.35);background:radial-gradient(70% 90% at 0% 0%,rgba(166,90,20,.16) 0%,rgba(166,90,20,0) 60%),radial-gradient(60% 80% at 100% 100%,rgba(107,30,42,.55) 0%,rgba(107,30,42,0) 70%),linear-gradient(160deg,#f6efe9 0%,#f6efe9 100%);font-family:Poppins,system-ui,sans-serif;color:#2b2916;box-sizing:border-box}'
 +'.cml-duo *{box-sizing:border-box}'
 +'.cml-duo::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:-1;opacity:.11;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'220\' height=\'220\'%3E%3Cfilter id=\'g\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23g)\'/%3E%3C/svg%3E");background-size:220px}'
 +'.cml-duo-hd{display:flex;align-items:flex-end;justify-content:space-between;gap:8px 24px;flex-wrap:wrap;margin:0 0 20px}'
 +'.cml-duo-eb{margin:0 0 6px;font-size:11.5px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:#a65a14}'
 +'.cml-duo-h{margin:0;font-size:clamp(22px,2.6vw,32px);line-height:1.15;font-weight:700;color:#2b2916}.cml-duo-h i{font-weight:300;font-style:italic;color:#a65a14}'
 +'.cml-duo-sub{margin:0;max-width:360px;font-size:13.5px;font-weight:300;line-height:1.5;color:rgba(43,41,22,.78)}'
 +'.cml-duo-g{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}'
 +'.cml-duo-c{display:grid;grid-template-columns:minmax(0,46%) minmax(0,1fr);gap:0;min-width:0;border-radius:22px;overflow:hidden;background:#fffaf5;border:1px solid rgba(166,90,20,.28);box-shadow:0 18px 40px -28px rgba(43,41,22,.2);transition:transform .25s,border-color .25s}'
 +'.cml-duo-c:hover{transform:translateY(-2px);border-color:rgba(166,90,20,.6)}'
 +'.cml-duo-im{position:relative;display:block;aspect-ratio:1/1;background:#f6efe9;overflow:hidden}.cml-duo-im img{position:absolute;inset:0;width:100%!important;height:100%!important;object-fit:cover;transition:transform .5s}.cml-duo-c:hover .cml-duo-im img{transform:scale(1.04)}'
 +'.cml-duo-off{position:absolute;top:10px;left:10px;padding:5px 10px;border-radius:999px;background:#a65a14;color:#f6efe9;font-size:12px;font-weight:700;line-height:1}'
 +'.cml-duo-b{display:flex;flex-direction:column;gap:6px;min-width:0;padding:20px 20px 18px}'
 +'.cml-duo-t{font-size:10.5px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#a65a14}'
 +'.cml-duo-n{margin:0;font-size:21px;font-weight:700;line-height:1.15;color:#2b2916;text-decoration:none;overflow-wrap:anywhere}.cml-duo-n span{font-weight:300;font-style:italic;color:#a65a14}'
 +'.cml-duo-d{margin:0;font-size:13px;font-weight:300;line-height:1.5;color:rgba(43,41,22,.75)}'
 +'.cml-duo-pr{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;margin-top:auto;padding-top:6px}.cml-duo-pr b{font-size:22px;font-weight:700;color:#2b2916}.cml-duo-pr s{font-size:13px;color:rgba(43,41,22,.5)}'
 +'.cml-duo-btn{display:flex;align-items:center;justify-content:center;min-height:42px;margin-top:8px;padding:0 18px;border-radius:999px;background:#a65a14;color:#f6efe9!important;font-size:14px;font-weight:600;text-decoration:none!important;transition:background .2s}.cml-duo-btn:hover{background:#a65a14}'
 +'.cml-duo-pr+.cml-duo-btn{}'
 +'@media(max-width:900px){.cml-duo-c{grid-template-columns:minmax(0,1fr)}.cml-duo-b{padding:14px 14px 14px}}'
 +'@media(max-width:640px){.cml-duo{margin:14px 0 18px;padding:18px 12px 14px;border-radius:22px}.cml-duo-hd{margin:0 0 14px}.cml-duo-sub{font-size:12.5px}.cml-duo-g{gap:10px}.cml-duo-c{border-radius:18px}.cml-duo-b{padding:12px 10px 12px;gap:4px}.cml-duo-t{font-size:9.5px;letter-spacing:.12em}.cml-duo-n{font-size:16px}.cml-duo-d{font-size:11.5px;line-height:1.4}.cml-duo-pr b{font-size:17px}.cml-duo-pr s{font-size:11.5px}.cml-duo-btn{min-height:38px;font-size:13px;padding:0 10px}.cml-duo-off{top:8px;left:8px;font-size:11px}}'
 +'.cml-duo-x{display:flex;align-items:center;justify-content:center;gap:14px 28px;flex-wrap:wrap;margin:18px auto 0;max-width:760px;padding:16px 22px;border-radius:999px;border:1px solid rgba(166,90,20,.45);background:rgba(255,250,245,.72);text-align:left}'
 +'.cml-duo-xt{display:flex;flex-direction:column;gap:2px;min-width:0}.cml-duo-xt p{margin:0}.cml-duo-xt b{font-size:22px;font-weight:700;color:#2b2916}.cml-duo-xt s{font-size:13px;color:rgba(43,41,22,.5);margin-left:4px}'
 +'.cml-duo-gift{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:300;color:rgba(43,41,22,.85)}.cml-duo-gift strong{font-weight:600;color:#a65a14}.cml-duo-gift svg{width:20px;height:20px;flex:none;fill:rgba(166,90,20,.15);stroke:#a65a14;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round}'
 +'.cml-duo-all{min-width:220px;min-height:48px;font-size:15px;margin:0;border:0;cursor:pointer;font-family:inherit}.cml-duo-all:disabled{opacity:.7;cursor:wait}'
 +'.cml-duo-err{flex:1 1 100%;margin:0;text-align:center;font-size:12.5px;color:#2b2916}.cml-duo-err a{color:#a65a14}'
 +'@media(max-width:640px){.cml-duo-x{border-radius:20px;padding:14px 12px;gap:12px;flex-direction:column;align-items:stretch;text-align:center}.cml-duo-xt{align-items:center}.cml-duo-xt b{font-size:19px}.cml-duo-gift{font-size:12px;justify-content:center;text-align:left}.cml-duo-all{min-width:0;width:100%;font-size:14px}}';
 function html(){return'<div class="cml-duo-hd"><div><p class="cml-duo-eb">Esquenta Black · Natal</p><h2 class="cml-duo-h">Preço de Black, <i>presente de Natal</i></h2></div><p class="cml-duo-sub">O Esquenta Black chegou na hora certa de garantir o seu Natal: os dois presentes mais especiais da casa, com preço de Black só até 22/11.</p></div><div class="cml-duo-g">'
  +K.map(function(k,i){var off=Math.round((1-k.p/k.c)*100),u="/produtos/"+k.h+"/";
   return'<article class="cml-duo-c" data-duo="'+i+'"><a class="cml-duo-im" href="'+u+'" aria-label="'+k.n+'"><img src="'+k.img+'" alt="Kit '+k.n+'" width="640" height="640" loading="eager" decoding="async"><span class="cml-duo-off">-'+off+'%</span></a><div class="cml-duo-b"><span class="cml-duo-t">'+k.tag+'</span><a class="cml-duo-n" href="'+u+'">Kit <span>'+k.n+'</span></a><p class="cml-duo-d">'+k.d+'</p><div class="cml-duo-pr"><b>'+brl(k.p)+'</b><s>'+brl(k.c)+'</s></div><a class="cml-duo-btn" href="'+u+'">Quero este presente</a></div></article>'}).join("")+'</div>'+bar()}
 function bar(){var p=K[0].p+K[1].p,c=K[0].c+K[1].c;return'<div class="cml-duo-x"><div class="cml-duo-xt"><span class="cml-duo-t">Leve os dois</span><p><b>'+brl(p)+'</b> <s>'+brl(c)+'</s></p><p class="cml-duo-gift"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="9" width="17" height="11.5" rx="2"/><path d="M2.5 9h19v-3h-19zM12 6v14.5M12 6c-1.5-3.5-6-3.5-6-1s4 1 6 1c2 0 6 1.5 6-1s-4.5-2.5-6 1"/></svg><span>e ganhe um <strong>Stroopwafel com 2 unidades</strong> de presente</span></p></div><button type="button" class="cml-duo-btn cml-duo-all">Garantir os dois</button><p class="cml-duo-err" hidden></p></div>'}
 function add(pid,kit){var q=new URLSearchParams();q.set("add_to_cart",pid);q.set("quantity","1");q.set("add_to_cart_enhanced","1");if(kit)q.set("kit_selections","");return fetch("/comprar/",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/x-www-form-urlencoded","X-Requested-With":"XMLHttpRequest"},body:q.toString()}).then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(t){var j;try{j=JSON.parse(t)}catch(e){j=null}if(j&&j.success===false)throw 0;return true})}
 function both(b,sec){if(b.disabled)return;b.disabled=true;var o=b.textContent;b.textContent="Colocando na sacola…";var e=sec.querySelector(".cml-duo-err");e.hidden=true;add(379081240,1).then(function(){return add(313665100,0)}).then(function(){location.href="/comprar/"}).catch(function(){b.disabled=false;b.textContent=o;e.hidden=false;e.innerHTML='Não conseguimos colocar os dois na sacola agora. Tente de novo ou abra o <a href="/produtos/kitl-natal-feliz/">Natal Feliz</a> e o <a href="/produtos/kit-ternura1/">Ternura</a>.'})}

 var n=0;(function put(){
  if(document.querySelector(".cml-duo"))return;
  var ref=MODE==="bk"?document.querySelector("#cml-bk #c9-info"):document.querySelector("#ns-section-category_hero .c2-cbn")||document.querySelector("#ns-section-category_hero .category-banner");
  if(!ref&&MODE==="bk"&&n>=40)ref=document.querySelector("#cml-bk .cbk-hero");
  if(!ref){if(++n<80)setTimeout(put,200);return}
  if(!document.getElementById("cml-duo-css")){var s=document.createElement("style");s.id="cml-duo-css";s.textContent=CSS;document.head.appendChild(s)}
  var sec=document.createElement("section");sec.className="cml-duo cml-duo-"+MODE;sec.setAttribute("aria-label","Os presentes do momento");sec.innerHTML=html();
  ref.parentNode.insertBefore(sec,ref.nextSibling);var bb=sec.querySelector(".cml-duo-all");bb.addEventListener("click",function(){both(bb,sec)});
 })();
})();

/* CML HOME SEM COMBOS (05/11/2026): combos aparecem so no Esquenta Black */
(function(){var n=0;(function go(){if(!/template-home/.test(document.body.className))return;var it=[].slice.call(document.querySelectorAll('.js-product-item-private')).filter(function(x){return x.querySelector('a[href*="/produtos/combo-sabores"],a[href*="/produtos/combo-granolas"],a[href*="/produtos/combo-performance"],a[href*="/produtos/combo-elas"],a[href*="/produtos/combo-bem-estar"]')});it.forEach(function(x){var sl=x.closest('.swiper-slide')||x;sl.remove()});if(it.length){try{document.querySelectorAll('.swiper-container,.swiper').forEach(function(c){if(c.swiper)c.swiper.update()})}catch(e){}window.dispatchEvent(new Event("resize"))}if(++n<15)setTimeout(go,700)})()})();


/* CML MINHA CONTA v2 (05/11/2026): painel do cliente, codigo no repositorio diagnostico/chefmaisleve-midia/conta/conta.js (trocar o commit para atualizar) */
(function(){if(!document.body||!/template-account-orders/.test(document.body.className)||window.__cmlContaL)return;window.__cmlContaL=1;var s=document.createElement("script");s.src="https://cdn.jsdelivr.net/gh/thierryshark/diagnostico@0f27af112667350a153e94368d09b2dbf9ae39c7/chefmaisleve-midia/conta/conta.js";s.async=true;document.head.appendChild(s)})();

/* CML SITE LARGO + CREATORS (05/11/2026): no computador o conteudo usa ate 1520px (94% da tela) e categorias mostram 5 produtos por linha; link Seja um creator do rodape vai para o programa Creaty do Cashing */
(function(){if(window.__cmlLargo)return;window.__cmlLargo=1;var D=document;
var s=D.createElement("style");s.id="cml-largo";s.textContent='@media(min-width:1300px){:root{--cmlw:min(1520px,94vw)}.container,.c1-home,section>.in,.cml-pair,.cbkh,.cbkh-in,.cml-ig,.cbk-in,.cmn,.cef,.footer-main-info,.cml-pd,.cml-cgrid{max-width:var(--cmlw)!important}.container,.cml-cgrid{width:100%!important}}@media(min-width:1500px){.cml-cgrid .js-product-table.grid-md-4{grid-template-columns:repeat(5,minmax(0,1fr))!important}}';(D.head||D.documentElement).appendChild(s);
var CR="https://creaty.com.br/chefmaisleve?utm_source=site&utm_medium=rodape&utm_campaign=seja-creator";
function fix(){[].forEach.call(D.querySelectorAll('a'),function(a){var t=(a.textContent||"").trim();if(/seja\s+(um|uma)?\s*creator/i.test(t)||/ovni\.com\.br/i.test(a.getAttribute("href")||"")){a.setAttribute("href",CR);a.setAttribute("target","_blank");a.setAttribute("rel","noopener")}})}
var n=0;(function go(){fix();if(++n<12)setTimeout(go,800)})();
})();



/* CML RASTREAR -> MINHA CONTA (06/11/2026): links "Rastrear pedido" (pagina /rastrear/ sem funcao) levam para Minha conta, onde o cliente ve status e rastreio de cada pedido. */
(function(){if(window.__cmlRas)return;window.__cmlRas=1;
function alvo(){var a=[].slice.call(document.querySelectorAll("a[href]")).filter(function(x){return /^\s*Minha conta/i.test(x.textContent)&&!/rastrear/.test(x.getAttribute("href"))})[0];return a?a.getAttribute("href"):"/account/info/"}
function fx(){var h=alvo();[].forEach.call(document.querySelectorAll("a[href*='/rastrear']"),function(a){a.setAttribute("href",h)})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",fx);else fx();
addEventListener("load",function(){fx();setTimeout(fx,1500);setTimeout(fx,4000)});
})();

/* 12/11/2026 conversao: sem relogio regressivo no Esquenta (regra da marca: urgencia pela data). Para voltar, apague esta linha. */
(function(){try{var s=document.createElement("style");s.textContent=".cbk-cd{display:none!important}";(document.head||document.documentElement).appendChild(s)}catch(e){}})();

/* 12/11/2026 conversao: respostas corrigidas no FAQ (acucar e reducao do cafe). O FAQ original fica no pacote do rodape do tema; aqui so troca o texto exibido. Para desfazer, apague este bloco. */
(function(){
 var FIX=[
  [/doces contêm açúcar/i,'<p>A Laranja Chocoleve, as frutas desidratadas, as trouxinhas e os mendiants não levam açúcar adicionado. A Granola Doce e a Choconuts são adoçadas com melado de cana (a Doce também com açúcar de coco), a Granola Low Carb com tâmaras e eritritol, e o Stroopwafel leva açúcar. A composição completa está na página de cada produto.</p>'],
  [/reduzir o café/i,'<p>Para reduzir o café sem sentir tanto a falta, costuma funcionar melhor uma troca gradual: comece por um chá que ainda tem um pouco de cafeína e, aos poucos, passe para um sem cafeína. Uma boa ordem é:</p><p>1. <a href="/produtos/cha-blend-sport-recovery/">Chá Misto Sport</a>, com mate tostado (contém cafeína)</p><p>2. <a href="/produtos/cha-business-performance/">Chá Misto Performance</a>, com chá verde (cafeína mais suave)</p><p>3. <a href="/produtos/cha-blend-intenso/">Chá Misto Intenso</a>, de frutas vermelhas (sem cafeína)</p>']
 ];
 function run(){
  var items=document.querySelectorAll('.accordion-item');
  for(var i=0;i<items.length;i++){var it=items[i];if(it.__cmlFaq)continue;var h=it.querySelector('.accordion-item-header');var c=it.querySelector('.js-accordion-private-content');if(!h||!c)continue;
   for(var j=0;j<FIX.length;j++){if(FIX[j][0].test(h.textContent)){var b=c.querySelector('.accordion-item-body')||c;b.innerHTML=FIX[j][1];it.__cmlFaq=1;}}}
 }
 var n=0;(function l(){try{run()}catch(e){}if(++n<30)setTimeout(l,400)})();
})();

/* 12/11/2026 conversao: textos de descricao corrigidos na exibicao (Ternura e Xicara Vidro Duplo). Corrigir tambem na descricao do produto no painel quando possivel; depois apagar este bloco. */
(function(){
 var P=location.pathname;if(!/^\/produtos\/(kit-ternura1|xicara-de-vidro-duplo)\/?/.test(P))return;
 var R=[[/Doce sem culpa/g,"Doce na medida"],[/100% natural/g,"Feito à mão"],[/100%\s*natural/g,"Feito à mão"],[/zero açúcar/g,"sem açúcar"],[/Infusão na Tangerina Rosé e Cápsulas Fada Azul/g,"Infusão na Tangerina Rosé e Chá Misto Intenso"],[/o azul da fada azul/g,"o rosé da infusão na tangerina"],[/o Intenso e a Fada Azul/g,"o Intenso e a Infusão na Tangerina Rosé"]];
 function run(){var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null),n;while((n=w.nextNode())){var v=n.nodeValue,o=v;for(var i=0;i<R.length;i++)v=v.replace(R[i][0],R[i][1]);if(v!==o)n.nodeValue=v}}
 var k=0;(function l(){try{run()}catch(e){}if(++k<25)setTimeout(l,400)})();
})();

/* ===== BLOG LISTA (14/11/2026) ===== */
(function(){
if(window.__cmlBl)return;window.__cmlBl=1;
var P=location.pathname.replace(/\/+$/,'');
if(!/^\/blog(\/page\/\d+)?$/.test(P))return;var PG=(P.match(/\/page\/(\d+)$/)||[])[1];
var css=[
'#cbl{max-width:1180px;margin:0 auto;padding:8px 16px 8px;box-sizing:border-box;font-family:Poppins,sans-serif}',
'#cbl *{box-sizing:border-box}',
'#cbl .cbl-hd{text-align:center;margin:6px 0 26px}',
'#cbl .cbl-k{font:500 11px/1.2 Poppins,sans-serif;letter-spacing:.24em;text-transform:uppercase;margin:0 0 10px}',
'#cbl .cbl-h{font:700 clamp(28px,4.2vw,44px)/1.1 Poppins,sans-serif;margin:0;letter-spacing:-.01em}',
'#cbl .cbl-h em{font-weight:300;font-style:italic}',
'#cbl .cbl-s{font:300 15px/1.6 Poppins,sans-serif;margin:12px auto 0;max-width:520px}',
'#cbl .cbl-ch{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:22px 0 0}',
'#cbl .cbl-c{appearance:none;cursor:pointer;border-radius:999px;padding:9px 18px;font:500 13px/1 Poppins,sans-serif;transition:background .2s,color .2s,border-color .2s}',
'#cbl .cbl-c span{opacity:.7;margin-left:6px;font-weight:400}',
'#cbl .cbl-f{display:grid;grid-template-columns:1.15fr 1fr;border-radius:28px;overflow:hidden;margin:0 0 28px;text-decoration:none;transition:transform .35s ease,box-shadow .35s ease}',
'#cbl .cbl-f:hover{transform:translateY(-3px)}',
'#cbl .cbl-fi{position:relative;min-height:360px;overflow:hidden;padding:14px}',
'#cbl .cbl-fi .cbl-im{position:absolute;inset:14px;border-radius:18px;overflow:hidden}',
'#cbl .cbl-im img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .8s ease}',
'#cbl a:hover .cbl-im img{transform:scale(1.04)}',
'#cbl .cbl-ft{padding:40px 44px;display:flex;flex-direction:column;justify-content:center}',
'#cbl .cbl-b{display:inline-flex;align-items:center;gap:8px;align-self:flex-start;border-radius:999px;padding:6px 12px;font:600 10.5px/1 Poppins,sans-serif;letter-spacing:.18em;text-transform:uppercase;margin:0 0 16px}',
'#cbl .cbl-b i{width:7px;height:7px;border-radius:50%;display:inline-block;animation:cblp 1.8s ease-in-out infinite}',
'@keyframes cblp{0%,100%{opacity:1}50%{opacity:.35}}',
'#cbl .cbl-l{font:500 10.5px/1.3 Poppins,sans-serif;letter-spacing:.2em;text-transform:uppercase;margin:0 0 10px}',
'#cbl .cbl-t{font:700 22px/1.2 Poppins,sans-serif;margin:0 0 10px}',
'#cbl .cbl-t em{font-weight:300;font-style:italic}',
'#cbl .cbl-f .cbl-t{font-size:clamp(26px,3vw,36px);line-height:1.12;margin-bottom:14px}',
'#cbl .cbl-e{font:300 14.5px/1.6 Poppins,sans-serif;margin:0 0 20px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}',
'#cbl .cbl-f .cbl-e{font-size:16px;-webkit-line-clamp:4}',
'#cbl .cbl-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;align-self:flex-start;height:46px;padding:0 24px;border-radius:999px;font:600 14px/1 Poppins,sans-serif;transition:gap .25s}',
'#cbl a:hover .cbl-btn{gap:12px}',
'#cbl .cbl-g{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}',
'#cbl .cbl-cd{display:flex;flex-direction:column;border-radius:22px;overflow:hidden;text-decoration:none;transition:transform .35s ease,box-shadow .35s ease,opacity .5s ease}',
'#cbl .cbl-cd:hover{transform:translateY(-4px)}',
'#cbl .cbl-cd .cbl-fi{min-height:0;padding:10px 10px 0}',
'#cbl .cbl-cd .cbl-im{position:relative;inset:auto;aspect-ratio:4/3;border-radius:14px;overflow:hidden}',
'#cbl .cbl-ct{padding:18px 22px 22px;display:flex;flex-direction:column;flex:1}',
'#cbl .cbl-ct .cbl-btn{margin-top:auto;height:40px;padding:0 18px;font-size:13px}',
'#cbl .cbl-hide{display:none!important}',
'#cbl .cbl-in{opacity:0;transform:translateY(14px)}',
'#cbl .cbl-in.cbl-on{opacity:1;transform:none;transition:opacity .6s ease,transform .6s ease}',
'@media (prefers-reduced-motion:reduce){#cbl *{animation:none!important;transition:none!important}#cbl .cbl-in{opacity:1;transform:none}}',
'@media (max-width:980px){#cbl .cbl-g{grid-template-columns:repeat(2,1fr)}}',
'@media (max-width:760px){#cbl .cbl-f{grid-template-columns:1fr}#cbl .cbl-fi{min-height:0;padding:10px 10px 0}#cbl .cbl-f .cbl-fi .cbl-im{position:relative;inset:auto;aspect-ratio:4/3;border-radius:16px}#cbl .cbl-ft{padding:22px 20px 24px}#cbl .cbl-btn{align-self:stretch}#cbl .cbl-ct .cbl-btn{align-self:stretch}}',
'@media (max-width:620px){#cbl .cbl-g{grid-template-columns:1fr;gap:18px}#cbl .cbl-hd{margin-bottom:20px}#cbl .cbl-ch{flex-wrap:nowrap;overflow-x:auto;justify-content:flex-start;padding-bottom:4px;-webkit-overflow-scrolling:touch}#cbl .cbl-c{flex:0 0 auto}}'
].join('\n');
var C={paper:'#f6efe9',ink:'#2b2916',amber:'#a65a14',olive:'#565229',gold:'#a65a14',dark:'#f6efe9',lite:'#a65a14',cream:'#f6efe9'};
function S(el,o){for(var k in o)el.style.setProperty(k,o[k],'important');return el}
function E(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function split(t){var w=t.trim().split(/\s+/);if(w.length<3)return esc(t);var n=Math.ceil(w.length/2);return esc(w.slice(0,n).join(' '))+' <em>'+esc(w.slice(n).join(' '))+'</em>'}
function parse(title){var m=title.match(/^Bastidores da Chef\s*#\s*(\d+)\s*:\s*(.+)$/i);
 if(m){var t=m[2].trim();return{bas:1,label:'Bastidores da Chef · Episódio '+('0'+m[1]).slice(-2),title:t.charAt(0).toUpperCase()+t.slice(1)}}
 return{bas:0,label:'Blog da Chef',title:title}}
function trimEx(s){s=(s||'').replace(/\s+/g,' ').trim();if(!s)return'';var cut=s.lastIndexOf(' ');if(s.length>140&&cut>60&&!/[.!?…]$/.test(s))s=s.slice(0,cut).replace(/[,;:]$/,'')+'…';return s}
function bestSrc(img){if(!img)return'';var ss=img.getAttribute('srcset')||img.getAttribute('data-srcset')||'';var best='',bw=0;ss.split(',').forEach(function(p){var a=p.trim().split(/\s+/);var w=parseInt(a[1])||0;if(a[0]&&w>=bw){bw=w;best=a[0]}});return best||img.currentSrc||img.src||img.getAttribute('data-src')||''}
function fallback(href,box){fetch(href,{credentials:'same-origin'}).then(function(r){return r.text()}).then(function(h){var d=new DOMParser().parseFromString(h,'text/html');var im=d.querySelector('.post-content img, .user-content img, article img[src*="cdn.cashing"], img[src*="cdn.cashing"]');if(!im){var all=[].slice.call(d.querySelectorAll('main img, .container img'));im=all.filter(function(i){return /\/blog|cdn\.cashing|mitiendanube|nuvemshop/.test(i.getAttribute('src')||i.getAttribute('data-src')||'')&&!/logo/i.test(i.className+i.alt)})[0]}
 var src=im?(im.getAttribute('src')||im.getAttribute('data-src')||bestSrc(im)):'';if(src){box.innerHTML='<img alt="" loading="lazy" src="'+esc(src)+'">'}}).catch(function(){})}
function run(){
 var grid=document.querySelector('.grid.grid-md-3');if(!grid||document.getElementById('cbl'))return!!document.getElementById('cbl');
 var items=[].slice.call(grid.querySelectorAll('.post-item'));if(!items.length)return false;
 if(!document.getElementById('cbl-css')){var st=E('style');st.id='cbl-css';st.textContent=css;document.head.appendChild(st)}
 var cnt=(document.querySelector('.pagination-counter')||{}).textContent||'';var first=(!PG||PG==='1')&&!/page=([2-9]|\d\d)/.test(location.search)&&!/^\s*[2-9]/.test(cnt);
 var data=items.map(function(it){var a=it.querySelector('a[href*="/blog/posts/"]');var tt=(it.querySelector('.post-item-title')||{}).textContent||'';var p=parse(tt.trim());p.href=a?a.getAttribute('href'):'#';p.ex=trimEx((it.querySelector('.post-item-summary')||{}).textContent);p.img=bestSrc(it.querySelector('img'));return p});
 var root=E('section');root.id='cbl';
 var hd=E('div','cbl-hd','<p class="cbl-s">Bastidores, rituais e o que acontece do lado de cá, feito em família em Florianópolis.</p>');
 S(hd.querySelector('.cbl-s'),{color:'rgba(255,250,245,.72)'});
 var nb=data.filter(function(d){return d.bas}).length;
 var cats=[['all','Todos',data.length],['bas','Bastidores da Chef',nb],['blog','Rituais e bem-estar',data.length-nb]].filter(function(c){return c[2]>0});
 var ch=E('div','cbl-ch');ch.setAttribute('role','tablist');
 function paint(){[].forEach.call(ch.children,function(b){var on=b.getAttribute('aria-selected')==='true';S(b,{background:on?C.gold:'transparent',color:on?C.dark:C.cream,border:'1px solid '+(on?C.gold:'rgba(166,90,20,.45)')})})}
 cats.forEach(function(c,i){var b=E('button','cbl-c',esc(c[1])+'<span>'+c[2]+'</span>');b.type='button';b.setAttribute('role','tab');b.setAttribute('aria-selected',i?'false':'true');b.dataset.k=c[0];b.onclick=function(){[].forEach.call(ch.children,function(x){x.setAttribute('aria-selected','false')});b.setAttribute('aria-selected','true');paint();filt(c[0])};ch.appendChild(b)});
 paint();if(cats.length>2)hd.appendChild(ch);root.appendChild(hd);
 function media(d,cls){var w=E('div','cbl-fi');var im=E('div','cbl-im');S(im,{background:'#e8ddd0'});if(d.img)im.innerHTML='<img alt="'+esc(d.title)+'" loading="lazy" src="'+esc(d.img)+'">';else fallback(d.href,im);w.appendChild(im);return w}
 function label(d){var l=E('p','cbl-l',esc(d.label));S(l,{color:C.amber});return l}
 function title(d,tag){var t=E(tag||'h2','cbl-t',split(d.title));S(t,{color:C.ink});var em=t.querySelector('em');if(em)S(em,{color:C.amber});return t}
 function ex(d){var e=E('p','cbl-e',esc(d.ex));S(e,{color:'rgba(43,41,22,.78)'});return e}
 var nodes=[];var start=0;
 if(first){var d0=data[0];var f=E('a','cbl-f cbl-in');f.href=d0.href;f.dataset.k=d0.bas?'bas':'blog';S(f,{background:C.paper,'box-shadow':'0 24px 60px rgba(0,0,0,.35)',border:'1px solid rgba(166,90,20,.25)'});
  f.appendChild(media(d0));var tx=E('div','cbl-ft');var b=E('span','cbl-b','<i></i>Mais recente');S(b,{background:C.ink,color:C.lite});S(b.querySelector('i'),{background:C.gold});tx.appendChild(b);tx.appendChild(label(d0));tx.appendChild(title(d0));if(d0.ex)tx.appendChild(ex(d0));
  var bt=E('span','cbl-btn','Ler a história <span aria-hidden="true">→</span>');S(bt,{background:C.gold,color:C.dark});tx.appendChild(bt);f.appendChild(tx);root.appendChild(f);nodes.push(f);start=1}
 var g=E('div','cbl-g');
 data.slice(start).forEach(function(d){var c=E('a','cbl-cd cbl-in');c.href=d.href;c.dataset.k=d.bas?'bas':'blog';S(c,{background:C.paper,'box-shadow':'0 14px 34px rgba(0,0,0,.28)',border:'1px solid rgba(166,90,20,.18)'});c.appendChild(media(d));var t=E('div','cbl-ct');t.appendChild(label(d));t.appendChild(title(d,'h3'));if(d.ex)t.appendChild(ex(d));var bt=E('span','cbl-btn','Ler o post <span aria-hidden="true">→</span>');S(bt,{background:'transparent',color:C.ink,border:'1px solid '+C.gold});t.appendChild(bt);c.appendChild(t);g.appendChild(c);nodes.push(c)});
 root.appendChild(g);
 function filt(k){nodes.forEach(function(n){n.classList.toggle('cbl-hide',k!=='all'&&n.dataset.k!==k)})}
 grid.parentNode.insertBefore(root,grid);S(grid,{display:'none'});
 var ph=document.querySelector('.page-header');var h1=ph&&ph.querySelector('h1.page-header-title');if(h1&&h1.textContent.trim()==='Blog'){h1.innerHTML='Blog <em>da Chef</em>';h1.classList.add('c4-sig')}if(ph){S(ph,{'text-align':'center'});[].forEach.call(ph.querySelectorAll('h1,.breadcrumbs,.page-header-title'),function(x){S(x,{'text-align':'center','justify-content':'center','margin-left':'auto','margin-right':'auto'})})}
 var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('cbl-on');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'}):null;
 nodes.forEach(function(n,i){if(io){n.style.transitionDelay=(Math.min(i,5)*60)+'ms';io.observe(n)}else n.classList.add('cbl-on')});
 return true}
var tries=0;(function loop(){if(run()||++tries>40)return;setTimeout(loop,250)})();
})();
