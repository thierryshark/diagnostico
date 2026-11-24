// Chef Mais Leve, site v19: monta site.css (visual) e os arquivos de comportamento a partir das partes em src/.
// Diferenca para o build.mjs: o codigo sai como codigo de verdade (nada de texto avaliado), cada modulo isolado em try/catch,
// na ordem original de execucao, com nomes curtos (minificado) e, opcionalmente, com contadores de cobertura (--cov).
import fs from 'fs';
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';
import * as esbuild from 'esbuild';
import { minify as terser } from 'terser';
import { vivas as hasVivas } from './tools/has-vivas.mjs';

const COV = process.argv.includes('--cov');
const PROF = process.argv.includes('--prof');
const OUT = COV ? 'dist-cov' : PROF ? 'dist-prof' : 'dist';
fs.mkdirSync(OUT, { recursive: true });
const dec = JSON.parse(fs.readFileSync('decisao.json', 'utf8'));
const sites = JSON.parse(fs.readFileSync('sites.json', 'utf8'));
const est = JSON.parse(fs.readFileSync('est.json', 'utf8'));
const cfg = fs.existsSync('modulos.json') ? JSON.parse(fs.readFileSync('modulos.json', 'utf8')) : { remover: [], grupo: {} };
const T = est.texts, P = est.pages;
const ok = new Set(dec.ok);
// Estilos constantes (o mesmo texto em todas as paginas capturadas) que a analise automatica nao reconheceu como fixos, porque o texto vem de uma variavel:
// saem do codigo e entram no site.css na posicao em que eram criados. Sem isso eles ficavam fora de ordem em relacao aos estilos fixos
// (ex.: no celular, a contagem "1 / 4" da galeria do produto sumia, porque a regra que a esconde passava a valer por ultimo).
const FORCA_FIXO = [['cml-paginas.js', 33, 'txt:37'], ['cml-paginas.js', 36, 'txt:38'], ['cml-paginas.js', 37, 'txt:39'], ['cml-paginas.js', 38, 'txt:40'], ['extx-00.js', 0, 'txt:64']];
for (const [f, i, k] of FORCA_FIXO) { const p = dec.plan.find((x) => x[0] === f && x[1] === i); if (!p || p[3]) throw new Error('forca fixo: plano inesperado para ' + f + ' ' + i); p[2] = k; p[3] = true; ok.add(k); }
// O mesmo para um estilo escrito como texto direto no "extras": [arquivo, comeco do texto, chave do texto capturado]
const LITERAL_FIXO = [['extx-01.js', '.cml-fr{cursor:pointer}', 'txt:65']];
for (const x of LITERAL_FIXO) ok.add(x[2]);

// ordem original: partes imediatas, codigo proprio, scripts do rodape e, por ultimo, as que esperavam a pagina montar
// Ordem de execucao, igual a do site v18. La o pacote era um script comum (o carregador usava document.write), executado no meio da leitura da pagina:
//   1) INICIO de cada parte, com a pagina "ainda sendo lida": cml-black, cml-extra, cml-destaque, cml-paginas, cpv-own e, em seguida, os quatro arquivos do tema;
//      quase todo modulo so se registra para o evento "pagina lida" (DOMContentLoaded);
//   2) no evento, os registros rodavam na ordem: os do pacote, depois as partes adiadas (cml-icons, cml-home, cml-ui), depois cpv-own e os arquivos do tema.
// Varios modulos montam uma vez so e dependem dessa ordem (o FAQ do produto copia as perguntas que o "extras" ja trocou; a lateral le o menu ja completo).
// Aqui tudo roda num arquivo so, depois da leitura; os modulos "fase-*" reproduzem as duas etapas.
const ORDEM = [['fase-ini', ''], ['cml-black', ''], ['cml-extra', ''], ['cml-destaque', ''], ['cml-paginas', ''], ['fase-marca', ''], ['cpv-own', ''], ['ext-seu-espaco', ''], ['ext-categoria', ''], ['ext-extras', ''], ['ext-rodape', ''], ['fase-evento1', ''], ['cml-icons', ''], ['cml-home', 'home'], ['cml-ui', ''], ['fase-evento2', '']];

const LIMPA = [
  ['cpv-own.js', '/* Chef Mais Leve: carrega o tema Black (funcao cml-black)', '.appendChild(s)})();'],
  ['cpv-own.js', '/* Chef Mais Leve: icones animados e WhatsApp no molde dos botoes flutuantes (funcao cml-icons) */', '.appendChild(s)})();'],
  ['cpv-own.js', '/* Chef Mais Leve: carrega os ajustes de visual (todas as paginas) e o buscador', 'document.addEventListener("DOMContentLoaded",go)})();'],
];
// trocas pontuais no codigo: [arquivo, texto antigo, texto novo]; cada uma precisa existir exatamente uma vez
const TROCAS = [
  // fontes: agora vem do site.css (hospedadas junto), sem chamadas ao Google Fonts pelo codigo
  ['cml-extra.js', 'if(!document.getElementById("cml-blog-fonts")){var l=document.createElement("link");l.id="cml-blog-fonts";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Poppins:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap";document.head.appendChild(l)}', ''],
  ['cml-extra.js', 'if(!D.getElementById("c1-fonts")){var l=D.createElement("link");l.id="c1-fonts";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,300&display=swap";(D.head||D.documentElement).appendChild(l)}', ''],
  ['cml-paginas.js', 'function font(){if(D.getElementById("cml-caveat"))return;var l=D.createElement("link");l.id="cml-caveat";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&display=swap";(D.head||H).appendChild(l)}', 'function font(){}'],
  // reescritor de :has: so reage a mudanca de verdade (ignora texto de contador e atributo regravado com o mesmo valor)
  ['cml-extra.js', 'var mo=new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var m=ms[i],t=m.target;', 'var mo=new MutationObserver(function(ms){var go=false;for(var i=0;i<ms.length;i++){var m=ms[i],t=m.target;'],
  ['cml-extra.js', 'if(n==="STYLE"||n==="LINK")needScan=true}}later()});', 'if(n==="STYLE"||n==="LINK")needScan=true}if(m.type==="childList"||(m.type==="attributes"&&m.oldValue!==t.getAttribute(m.attributeName)))go=true}if(go||needScan)later()});'],
  ['cml-extra.js', 'mo.observe(H,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:[', 'mo.observe(H,{childList:true,subtree:true,characterData:true,attributes:true,attributeOldValue:true,attributeFilter:['],
  // gravacoes repetidas com o mesmo valor (cada uma acordava os observadores da pagina)
  ['cml-destaque.js', /(\w+)\.classList\.add\("cml-wn"\)/g, (m, v) => '(' + v + '.classList.contains("cml-wn")||' + v + '.classList.add("cml-wn"))'],
  ['cml-paginas.js', 'i.title="Colocar na sacola"', 'if(i.title!=="Colocar na sacola")i.title="Colocar na sacola"'],
  // contadores de 1 segundo: trocam so o texto que mudou, sem recriar os elementos
  ['cml-paginas.js', 'q("b.d").textContent=z(t.d);q("b.h").textContent=z(t.h);q("b.m").textContent=z(t.m);q("b.s").textContent=z(t.s)', '__cmlT(q("b.d"),z(t.d));__cmlT(q("b.h"),z(t.h));__cmlT(q("b.m"),z(t.m));__cmlT(q("b.s"),z(t.s))', 3],
  ['cml-paginas.js', 'var h=\'<span class="l">\'+(t.pre?"Começa em":"Termina em")+\'</span><b>\'+(t.d?t.d+"d ":"")+z(t.h)+"h "+z(t.m)+"m "+z(t.s)+"s</b>";if(el.innerHTML!==h)el.innerHTML=h}', 'var lab=(t.pre?"Começa em":"Termina em"),val=(t.d?t.d+"d ":"")+z(t.h)+"h "+z(t.m)+"m "+z(t.s)+"s",sp=el.firstChild,bb=el.lastChild;if(sp&&bb&&sp!==bb&&sp.className==="l"&&bb.tagName==="B"){__cmlT(sp,lab);__cmlT(bb,val)}else el.innerHTML=\'<span class="l">\'+lab+\'</span><b>\'+val+\'</b>\'}'],
  ['extx-00.js', 'i.querySelector("b").textContent=a?a.textContent.trim():"",i.querySelector(".t span").textContent=c?c.textContent.trim():""', '__cmlT(i.querySelector("b"),a?a.textContent.trim():""),__cmlT(i.querySelector(".t span"),c?c.textContent.trim():"")'],
  ['extx-00.js', 'i.querySelector(".go").textContent=m?"Avise-me":"Comprar"', '__cmlT(i.querySelector(".go"),m?"Avise-me":"Comprar")'],
  ['extx-02.js', 't.querySelector("em").textContent=i?[n?"Caixa "+n:"",e?"Cartão":""].filter(Boolean).join(" + "):"",t.querySelector("u").textContent=i?"✓":"Adicionar"', '__cmlT(t.querySelector("em"),i?[n?"Caixa "+n:"",e?"Cartão":""].filter(Boolean).join(" + "):""),__cmlT(t.querySelector("u"),i?"✓":"Adicionar")'],
  // cantos: os ajustes passam a rodar uma vez por quadro (antes da pintura), em vez de a cada alteracao da pagina; raizes repetidas sao conferidas uma vez so
  ['cml-paginas.js', 'var a=q;q=[];for(var k=0;k<a.length;k++){try{if(a[k].isConnected){soft(a[k].parentNode||a[k])}}catch(e){}}},250)', 'var a=q;q=[];var vs=new Set();for(var k=0;k<a.length;k++){try{if(a[k].isConnected){var rr=a[k].parentNode||a[k];if(!vs.has(rr)){vs.add(rr);soft(rr)}}}catch(e){}}},250)'],
  ['cml-paginas.js', 'try{new MutationObserver(function(ms){if(!window.__cx3soft)return;for(var i=0;i<ms.length;i++)for(var j=0;j<ms[i].addedNodes.length;j++){var n=ms[i].addedNodes[j];if(n.nodeType===1){try{window.__cx3soft(n.parentNode||n)}catch(e){}}}}).observe(D.documentElement,{childList:true,subtree:true})}catch(e){}',
    'try{var cq=new Set(),cf=0,cgo=function(){cf=0;var a=cq;cq=new Set();a.forEach(function(r){try{if(r.isConnected)window.__cx3soft(r)}catch(e){}})};new MutationObserver(function(ms){if(!window.__cx3soft)return;for(var i=0;i<ms.length;i++)for(var j=0;j<ms[i].addedNodes.length;j++){var n=ms[i].addedNodes[j];if(n.nodeType===1)cq.add(n.parentNode||n)}if(cq.size&&!cf){cf=1;__cmlF(cgo)}}).observe(D.documentElement,{childList:true,subtree:true})}catch(e){}'],
  ['cml-paginas.js', 'var q=[],t;function flush(){var a=q;q=[];a.forEach(function(n){if(n.isConnected){soft(n);promo(n.parentNode||D)}})}', 'var q=[],t,ft=0;function flush(){ft=0;var a=q;q=[];var vp=new Set();a.forEach(function(n){if(n.isConnected){soft(n);var pp=n.parentNode||D;if(!vp.has(pp)){vp.add(pp);promo(pp)}}})}'],
  ['cml-paginas.js', 'function go(){full();setTimeout(full,1500);setTimeout(full,4000);new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,function(n){if(n.nodeType===1)q.push(n)})});flush()})', 'function go(){full();setTimeout(full,1500);setTimeout(full,4000);new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,function(n){if(n.nodeType===1)q.push(n)})});if(q.length&&!ft){ft=1;__cmlF(flush)}})'],
  // cantos em duas fases: primeiro le tudo, depois escreve tudo (mesmo resultado; antes cada escrita no meio da leitura forcava um recalculo de estilo)
  ['cml-paginas.js', 'function soft(root){var els=root.querySelectorAll?root.querySelectorAll("*"):[];for(var i=0;', 'function soft(root){var wr=[],els=root.querySelectorAll?root.querySelectorAll("*"):[];for(var i=0;'],
  ['cml-paginas.js', 'if(v<r)e.style.setProperty("border-radius",v+"px","important")}}', 'if(v<r)wr.push(e,v)}for(var k2=0;k2<wr.length;k2+=2)wr[k2].style.setProperty("border-radius",wr[k2+1]+"px","important")}'],
  ['cml-paginas.js', 'function soft(root){if(!root||root.nodeType!==1)return;var list=[root].concat(', 'function soft(root){if(!root||root.nodeType!==1)return;var wr=[],list=[root].concat('],
  ['cml-paginas.js', 'if(!vis)return;e.style.setProperty("border-radius",L+"px","important")})}', 'if(!vis)return;wr.push(e,L)});for(var k2=0;k2<wr.length;k2+=2)wr[k2].style.setProperty("border-radius",wr[k2+1]+"px","important")}'],
  ['cml-paginas.js', 'html:has(body.modal-show)', 'html:has(>body.modal-show)'],
  // "Encontre seu cha": o estilo c10-css era montado na hora a partir das regras do c4-css (que agora mora no site.css); ele entra pronto no site.css e o laco sai
  ['cml-extra.js', 'var n=0;(function loop(){if(build()&&n>6)return;if(++n<30)setTimeout(loop,n<10?120:500)})();', ''],
  // home: no v18 os dados do ranking vinham dentro do pacote (window.__cmlRk); aqui o ranking busca os dados e precisa deixa-los no mesmo lugar,
  // porque a contagem de avaliacoes dos cartoes e o painel "O que os clientes dizem" leem dali
  ['cml-extra.js', '.then(function(j){rkData=j})', '.then(function(j){rkData=j;if(j&&j.items&&!window.__cmlRk)window.__cmlRk=j})'],
  // efeito de aparecer ao rolar: cada bloco era avaliado uma vez so; como a pagina agora monta mais rapido, a primeira avaliacao pegava blocos ainda "na tela"
  // (o conteudo acima deles nao tinha crescido) e eles ficavam sem o efeito. Bloco pulado pela posicao volta a ser avaliado ate a pagina terminar de carregar.
  ['cml-extra.js', 'if(seen.indexOf(el)>=0)continue;seen.push(el);if(el.closest(".c5-rv")&&el.closest(".c5-rv")!==el)continue;var r=el.getBoundingClientRect();if(r.height<40||r.top<vh*.92)continue;add.push(el)', 'if(seen.indexOf(el)>=0)continue;if(el.closest(".c5-rv")&&el.closest(".c5-rv")!==el){seen.push(el);continue}var r=el.getBoundingClientRect();if(r.height<40||r.top<vh*.92){if(D.readyState==="complete")seen.push(el);continue}seen.push(el);add.push(el)'],
  // video do produto: o tocador (sem som, em laco) so comeca a carregar depois que a pagina terminou de carregar, para nao disputar a rede com fotos e codigo
  ['extx-00.js', 'e.src=n+"?autoplay=true&muted=true&loop=true&controls=false&preload=auto&letterboxColor=transparent"', '(function(u){var g=function(){setTimeout(function(){e.src=u},500)};"complete"===document.readyState?g():window.addEventListener("load",g)})(n+"?autoplay=true&muted=true&loop=true&controls=false&preload=auto&letterboxColor=transparent")'],
  // reescritor de :has: enquanto a pagina ainda esta chegando, atualiza uma vez por quadro (antes da pintura); e converte cada folha de estilo assim que ela termina de carregar
  ['cml-extra.js', 'function later(){if(tm)return;var w=Math.max(0,120-(Date.now()-last));tm=setTimeout(run,w)}', 'function later(){if(tm)return;if(D.readyState==="loading"){tm=1;var d=0,g=function(){if(d)return;d=1;run()};requestAnimationFrame(g);setTimeout(g,120);return}var w=Math.max(0,120-(Date.now()-last));tm=setTimeout(run,w)}'],
  ['cml-extra.js', 'addEventListener("load",function(){needScan=true;later()});', 'addEventListener("load",function(){needScan=true;later()});D.addEventListener("load",function(e){var t=e.target;if(t&&t.nodeName==="LINK"&&/stylesheet/i.test(t.rel||"")){needScan=true;run()}},true);'],
  // reescritor de :has: pode ser chamado na hora (no fim do pacote), sem esperar o proximo ciclo
  ['cml-extra.js', 'window.__cmlHzInfo=function(){', 'window.__cmlHzNow=function(){needScan=false;scan();try{mo.takeRecords()}catch(e){}};window.__cmlHzInfo=function(){'],
  // arvore de categorias da lateral: so categorias (nao entram os produtos listados no menu nem o item Seu espaco)
  ['cml-destaque.js', 'if (aa && aa.pathname) kids.push(node(aa, li.querySelector("ul")));', 'if (aa && aa.pathname && aa.pathname.indexOf("/produtos/") !== 0) kids.push(node(aa, li.querySelector("ul")));'],
  ['cml-destaque.js', 'if (a && dd && dd.children.length) T.push(node(a, dd));', 'if (a && dd && dd.children.length && li.id !== "cml-se") T.push(node(a, dd));'],
  // barra de compra do produto: a leitura de posicao na rolagem passa a acontecer uma vez por quadro
  ['extx-00.js', 'window.addEventListener("scroll",function(){var x=document.querySelector("#product_form .js-addtocart:not(.js-addtocart-placeholder)")||document.querySelector("#product_form");if(x){var on=x.getBoundingClientRect().bottom<0;i.classList.toggle("on",on),document.body.classList.toggle("cml-baron",on)}},{passive:!0})', 'window.addEventListener("scroll",function(){if(i.__rq)return;i.__rq=requestAnimationFrame(function(){i.__rq=0;var x=document.querySelector("#product_form .js-addtocart:not(.js-addtocart-placeholder)")||document.querySelector("#product_form");if(x){var on=x.getBoundingClientRect().bottom<0;i.classList.toggle("on",on),document.body.classList.toggle("cml-baron",on)}})},{passive:!0})'],
  // redimensionamento artificial (acorda todos os carrosseis): so na pagina de produto, onde a largura das fotos muda
  ['cml-paginas.js', 'setTimeout(rs,300);setTimeout(rs,1500);', 'if(D.body&&D.body.classList.contains("template-product")){setTimeout(rs,300);setTimeout(rs,1500)}'],
  // rodape "Seja membro": o bloco nativo de novidades saiu do tema (o formulario nativo, mesmo escondido, fazia a loja baixar o reCAPTCHA em todas as paginas).
  // A caixa agora nasce pronta dentro do rodape montado pelo c7; saem os tres trechos que enfeitavam o bloco nativo e o envio para o formulario nativo.
  ['cml-extra.js', 'var nl=f.querySelector("#ns-block-newsletter");if(nl&&!nl.__c4){var ds=nl.querySelector(".footer-newsletter-description");if(ds){nl.__c4=1;var e=D.createElement("p");e.className="c4-ey";e.textContent="Seja membro";var b=D.createElement("b");b.className="c4-nb";b.innerHTML=\'Novidades <em>em primeira mão</em>\';ds.appendChild(e);ds.appendChild(b); var sb=nl.querySelector(\'form [type="submit"]\');if(sb){if(sb.tagName==="INPUT")sb.value="Quero receber";else sb.textContent="Quero receber"} }} return!!nl}', 'return true}'],
  ['cml-extra.js', 'var nl=D.getElementById("ns-block-newsletter");if(!nl)return false; var lg=D.querySelector("#ns-section-footer .cml-brand img.lg")', 'var lg=D.querySelector("#ns-section-footer .cml-brand img.lg")'],
  ['cml-extra.js', '+\'<div class="c7-fm"><p class="c7-fe">Seja membro</p></div>\'', '+\'<div class="c7-fm"><p class="c7-fe">Seja membro</p><div class="footer-newsletter-container" id="ns-block-newsletter"><div class="footer-newsletter-description user-content"><b class="c4-nb">Novidades <em>em primeira mão</em></b></div></div></div>\''],
  ['cml-extra.js', 'mi.insertBefore(ft,mi.firstChild);ft.querySelector(".c7-fm").appendChild(nl);mi.classList.add("c7-on");return true}', 'mi.insertBefore(ft,mi.firstChild);mi.classList.add("c7-on");return true}'],
  // home, bloco do Instagram (celular com 9 fotos no fim da pagina): as fotos eram baixadas no carregamento, inteiras (1,3 MB so nas 6 antigas, mostradas a 90x116).
  // Agora so carregam quando o bloco se aproxima da tela, e as 6 antigas vem em miniatura (se a miniatura falhar, entra a foto original).
  ['extx-13.js', `<i style="background-image:url(&quot;'+a[i].s.replace(/"/g,"")+'&quot;)"></i>`, `<i data-bg="url(&quot;'+a[i].s.replace(/"/g,"")+'&quot;)"></i>`],
  ['extx-13.js', `if("IntersectionObserver"in window){var o=new IntersectionObserver(function(z){z.forEach(function(y){y.isIntersecting&&(c.classList.add("in"),o.disconnect())})},{threshold:.2});o.observe(c)}else c.classList.add("in")}`, `function cmlBg(){[].forEach.call(c.querySelectorAll("i[data-bg]"),function(k){k.style.backgroundImage=k.getAttribute("data-bg");k.removeAttribute("data-bg")})}if("IntersectionObserver"in window){var o=new IntersectionObserver(function(z){z.forEach(function(y){y.isIntersecting&&(c.classList.add("in"),cmlBg(),o.disconnect())})},{threshold:.2});o.observe(c)}else{c.classList.add("in");cmlBg()}}`],
  ['cml-paginas.js', `var bg=i?i.style.backgroundImage:"";`, `var bg=i?(i.getAttribute("data-bg")||i.style.backgroundImage):"";`],
  ['cml-paginas.js', `aria-label="Ver post no Instagram" style="background-image:'+bg.replace(/"/g,"&quot;")+'"></a>'`, `aria-label="Ver post no Instagram" data-bg="'+bg.replace(/"/g,"&quot;")+'"></a>'`],
  ['cml-paginas.js', `aria-label="Ver perfil no Instagram" style="background-image:url(https://dzmlyrkzcdqicwfmxnxd.supabase.co/storage/v1/object/public/recortes/insta/'+id+'.jpg)"></a>'`, `aria-label="Ver perfil no Instagram" data-bg="url(https://dzmlyrkzcdqicwfmxnxd.supabase.co/storage/v1/render/image/public/recortes/insta/'+id+'.jpg?width=300&amp;height=400&amp;resize=cover&amp;quality=70)" data-bo="url(https://dzmlyrkzcdqicwfmxnxd.supabase.co/storage/v1/object/public/recortes/insta/'+id+'.jpg)"></a>'`],
  // os tres "cartoes que saltam" do celular (pop) ficavam sempre invisiveis (escondidos por uma camada posterior) e ainda eram reposicionados a cada rolagem: saem, com o ouvinte de rolagem.
  // No lugar entra so o carregamento adiado das fotos (celulas do celular e os tres cartoes ao lado dele).
  ['cml-paginas.js', /var ph=w\.querySelector\("\.ph"\),src=\[\]\.slice\.call\(w\.querySelectorAll\("\.grd a\.p"\)\)[\s\S]*?addEventListener\("resize",upd\);upd\(\)\}/, `(function(){var go=function(){[].forEach.call(w.querySelectorAll("[data-bg]"),function(a){var b=a.getAttribute("data-bg"),o=a.getAttribute("data-bo");a.removeAttribute("data-bg");if(!b)return;if(!o){a.style.backgroundImage=b;return}var m=new Image();m.onload=function(){a.style.backgroundImage=b};m.onerror=function(){a.style.backgroundImage=o};m.src=b.slice(4,-1)})};if(!("IntersectionObserver"in window)){go();return}var io=new IntersectionObserver(function(es){for(var q=0;q<es.length;q++)if(es[q].isIntersecting){io.disconnect();go();break}},{rootMargin:"900px 0px"});var arm=function(){setTimeout(function(){io.observe(w)},400)};if(D.readyState==="complete")arm();else addEventListener("load",arm)})()}`],
  // o adiamento antigo escondia a secao inteira do Instagram e a soltava a 900 px da tela, mas media a distancia cedo demais (pagina ainda curta) e soltava tudo no carregamento;
  // alem disso mantinha um observador da pagina inteira ligado para sempre. Sai: o adiamento agora e por foto (acima) e so comeca a contar depois que a pagina terminou de carregar.
  ['cml-paginas.js', /function lazyHome\(\) \{[\s\S]*?try \{ lazyHome\(\); \} catch \(e\) \{\}/, ''],
  ['cml-paginas.js', `style="background-image:'+String(a.style.backgroundImage).replace(/"/g,"&quot;")+';--i:'+i+'"></a>'`, `'+(a.getAttribute("data-bg")?'data-bg="'+a.getAttribute("data-bg").replace(/"/g,"&quot;")+'" style="--i:'+i+'"':'style="background-image:'+String(a.style.backgroundImage).replace(/"/g,"&quot;")+';--i:'+i+'"')+'></a>'`],
  // home, carrossel de categorias: a foto do cartao Chocoleve vinha inteira (168 KB, sem guardar no navegador); agora vem em 640 px (se falhar, entra a original)
  ['cml-paginas.js', `"https://dzmlyrkzcdqicwfmxnxd.supabase.co/storage/v1/object/public/cml-fotos/chocoleve-cafe-da-manha.jpg", "Lançamento"]`, `"https://dzmlyrkzcdqicwfmxnxd.supabase.co/storage/v1/render/image/public/cml-fotos/chocoleve-cafe-da-manha.jpg?width=640", "Lançamento", "https://dzmlyrkzcdqicwfmxnxd.supabase.co/storage/v1/object/public/cml-fotos/chocoleve-cafe-da-manha.jpg"]`],
  ['cml-paginas.js', `<img src="' + cim(c[3]) + '" alt="'`, `<img src="' + cim(c[3]) + '"' + (c[5] ? ' onerror="this.onerror=null;this.src=\\'' + c[5] + '\\'"' : '') + ' alt="'`],
  // home, ranking "Os mais pedidos": cada cartao baixava a foto de fundo branco em PNG (1,8 MB nos 5) e logo trocava pela foto ambientada.
  // Agora o cartao ja nasce com a foto ambientada quando ela e conhecida; a foto de fundo branco, quando precisa, vem em WebP.
  // Produto fora da lista de fotos ambientadas: a pagina dele era baixada (115 KB) a cada visita a home so para achar a foto; o achado agora fica guardado no navegador por 7 dias.
  ['cml-extra.js', `var u=x.url.replace(/^https?:\\/\\/[^\\/]+/,"");return'<a class="rc'+(i?"":" first")+'" href="'+esc(u)+'"><span class="ri"><img src="'+esc(x.img)+'" alt=""`, `var u=x.url.replace(/^https?:\\/\\/[^\\/]+/,""),sm=u.match(/\\/produtos\\/([^\\/?#]+)/),ab=sm&&window.__cmlAmb?window.__cmlAmb(sm[1]):"",im=ab?"https://acdn-us.mitiendanube.com/stores/005/060/752/products/"+ab+"-640-0.webp":__cmlWp(x.img);return'<a class="rc'+(i?"":" first")+'" href="'+esc(u)+'"><span class="ri"><img'+(ab?' class="cml-amb"':'')+' src="'+esc(im)+'" alt=""`],
  ['cml-paginas.js', `function setImg(img,base){if(img.__amb)return;img.__amb=1;`, `var AC={};try{var ac0=JSON.parse(localStorage.getItem("cml-amb1")||"{}");if(ac0&&ac0.t&&Date.now()-ac0.t<6048e5&&ac0.m)AC=ac0.m}catch(e){}window.__cmlAmb=function(h){return AMB[h]||AC[h]||""}; function setImg(img,base){if(img.__amb)return;img.__amb=1;`],
  ['cml-paginas.js', `if(AMB[h])return setImg(img,AMB[h]);if(ri.__f)return;ri.__f=1;`, `var kn=AMB[h]||AC[h];if(kn)return setImg(img,kn);if(ri.__f)return;ri.__f=1;`],
  ['cml-paginas.js', `var b=U[2]||U[1];if(b)setImg(img,b)}).catch(function(){})`, `var b=U[2]||U[1];if(b){setImg(img,b);AC[h]=b;try{localStorage.setItem("cml-amb1",JSON.stringify({t:Date.now(),m:AC}))}catch(e){}}}).catch(function(){})`],
  ['cml-paginas.js', `<div class="cx2-bump"><img src="'+cheap.img+'" alt="" loading="lazy">`, `<div class="cx2-bump"><img src="'+__cmlWp(cheap.img)+'" alt="" loading="lazy">`],
  // home: avisa o visual quando o ranking entrou (ou nao vai entrar), para soltar as secoes de baixo sem salto de layout (ver ajustes.css)
  ['cml-extra.js', `if(rkData.mode==="off"||it.length<3)return true;`, `if(rkData.mode==="off"||it.length<3){D.documentElement.classList.add("cml-hok");return true}`],
  ['cml-extra.js', `ref.parentNode.insertBefore(s,ref);return true}`, `ref.parentNode.insertBefore(s,ref);D.documentElement.classList.add("cml-hok");return true}`],
  ['ext-rodape.js', "var nat=nl.querySelector('form.footer-newsletter-form');", ''],
  ['ext-rodape.js', 'if(nat)nat.parentNode.insertBefore(f,nat.nextSibling);else nl.appendChild(f);', 'nl.appendChild(f);'],
  ['ext-rodape.js', "try{if(nat){var ni=nat.querySelector('input[type=email],input[name*=mail]');if(ni){ni.value=email;var fd=new FormData(nat);fetch(nat.action||location.href,{method:'POST',body:fd,credentials:'same-origin'}).catch(function(){})}}}catch(x){}", ''],
  // produto (celular): as bolinhas da galeria nascem junto com o resto do bloco; antes esperavam o carrossel do tema ligar (quase 2 s) e empurravam o bloco de compra 31 px para baixo. Os cliques e a bolinha ativa passam a valer quando o carrossel liga
  ['extx-00.js', "if(t&&t.swiper&&!t.getAttribute(\"data-cmld\")){var e=t.swiper,r=t.querySelectorAll(\".js-product-slide\").length;if(!(r<2)){t.setAttribute(\"data-cmld\",\"1\");var o=document.createElement(\"div\");o.className=\"cml-dots\";for(var n=0;n<r;n++){var i=document.createElement(\"i\");i.setAttribute(\"data-i\",n),i.onclick=function(){e.slideTo(+this.getAttribute(\"data-i\"))},o.appendChild(i)}t.parentNode.insertBefore(o,t.nextSibling);var a=function(){var t=null!=e.realIndex?e.realIndex:e.activeIndex;[].forEach.call(o.children,function(e,r){e.className=r===t?\"on\":\"\"})};e.on(\"slideChange\",a),a()}}", "if(t&&!t.getAttribute(\"data-cmld\")){var r=t.querySelectorAll(\".js-product-slide\").length;if(!(r<2)){var o=t.parentNode.querySelector(\".cml-dots\");o||((o=document.createElement(\"div\")).className=\"cml-dots\",t.parentNode.insertBefore(o,t.nextSibling));if(o.children.length!==r){o.innerHTML=\"\";for(var n=0;n<r;n++){var i=document.createElement(\"i\");i.setAttribute(\"data-i\",n),i.onclick=function(){t.swiper&&t.swiper.slideTo(+this.getAttribute(\"data-i\"))},o.appendChild(i)}o.firstChild.className=\"on\"}var e=t.swiper;if(e){t.setAttribute(\"data-cmld\",\"1\");var a=function(){var t=null!=e.realIndex?e.realIndex:e.activeIndex;[].forEach.call(o.children,function(e,r){e.className=r===t?\"on\":\"\"})};e.on(\"slideChange\",a),a()}}}"],
  // Monte seu presente: o montador (funcao cml-natal) procura um titulo "Presentes de Natal" para se encaixar; o tema atual nao tem esse titulo e, na falta dele, o montador caia no comeco da pagina, ACIMA do topo do site (logo, menu e sacola iam parar no fim da pagina). Agora o codigo deixa um ponto de encaixe escondido dentro do miolo e o tira quando o montador aparece
  ['cml-paginas.js', "(D.head || D.documentElement).appendChild(st); D.documentElement.classList.add(\"cml-natw\");", "(D.head || D.documentElement).appendChild(st); D.documentElement.classList.add(\"cml-natw\"); var mm = D.getElementById(\"MainContent\") || D.querySelector(\"main\"); if (mm && !D.getElementById(\"cml-nat-anc\")) { var an = D.createElement(\"section\"); an.id = \"cml-nat-anc\"; an.hidden = true; an.innerHTML = \"<h1>Presentes de Natal</h1>\"; mm.insertBefore(an, mm.firstChild); }"],
  ['cml-paginas.js', "function natOff() { D.documentElement.classList.remove(\"cml-natw\"); var k = D.getElementById(\"cml-nat-skel\"); if (k && k.parentNode) k.parentNode.removeChild(k); }", "function natOff() { D.documentElement.classList.remove(\"cml-natw\"); [D.getElementById(\"cml-nat-skel\"), D.getElementById(\"cml-nat-anc\")].forEach(function (k) { if (k && k.parentNode) k.parentNode.removeChild(k); }); }"],
  ['cml-paginas.js', "html.cml-dockcb body [data-slot='corner_bottom_left'] button[aria-label='Meu cashback']{position:absolute!important;left:-9999px!important;opacity:0!important;pointer-events:none!important}", "html body [data-slot='corner_bottom_left'] button[aria-label='Meu cashback']{position:absolute!important;left:-9999px!important;opacity:0!important;pointer-events:none!important}"],
];
// trocas pontuais no visual capturado: [texto antigo, texto novo]
const CSS_TROCAS = [
  // produto: os botoes de mais e menos da quantidade estavam com o icone na cor do fundo (sobra do tema escuro da Black) e sumiam; o icone passa a ser escuro
  ["html.cml-blk body .js-product-detail .form-quantity *{color:#2b2916!important;fill:#f6efe9!important;background:transparent!important;border:0!important}", "html.cml-blk body .js-product-detail .form-quantity *{color:#2b2916!important;fill:#2b2916!important;background:transparent!important;border:0!important}"],
  // botao flutuante de cashback do Cashing: fica fora da tela em todas as paginas (pedido do Thierry em 23/11: so o menu flutuante, sem botao de moeda). Antes so saia de cena nas paginas com menu flutuante; na pagina de produto aparecia um botao laranja no canto. O menu flutuante continua acionando esse botao por baixo
  ["html.cml-dockcb body [data-slot='corner_bottom_left'] button[aria-label='Meu cashback']{position:absolute!important;left:-9999px!important;opacity:0!important;pointer-events:none!important}", "html body [data-slot='corner_bottom_left'] button[aria-label='Meu cashback']{position:absolute!important;left:-9999px!important;opacity:0!important;pointer-events:none!important}"],
  // produto: o selo de cashback do Cashing (a pagina ja mostra a linha propria "+ R$ X de cashback") fica escondido pelo endereco do proprio selo, desde o inicio. Antes ele aparecia por cerca de meio segundo (35 px) ate o codigo marcar e esconder, e a pagina pulava duas vezes
  ["html.cml-blk body .js-product-detail .cml-cb .cml-cbk2,html.cml-blk body .js-product-detail .cml-cb>div>div:has(.cml-cbk2){display:none!important}", "html.cml-blk body .js-product-detail [data-slot=product_after_price_pdp] [data-slot-item=cashbacks-cmp]{display:none!important}"],
  // paginas montadas pelo codigo (ofertas, presentes, FAQ, contato, quem somos, cashback, quiz, blog, conta): enquanto a pagina nao esta pronta, o miolo e o rodape ficam fora da tela de verdade (visibility), e nao so transparentes. Antes o rodape aparecia colado no topo e pulava quando o conteudo entrava (salto de layout de 0,8 a 1,5 nessas paginas)
  ["@keyframes cmlrv{to{opacity:1}}html:not(.cml-rdy):is(:has(link[rel=canonical]:is([href$=\"/contato/\"],[href$=\"/quem-somos/\"],[href$=\"/faq/\"],[href$=\"/presentes-de-natal/\"],[href$=\"/encontre-seu-cha/\"],[href$=\"/politica-de-cashback/\"],[href$=\"/ofertas/\"])),:has(body:is(.template-blog,.template-blog-post,[class*=template-account]))) main{opacity:0;animation:cmlrv 0s 2.4s forwards}", "@keyframes cmlrv{to{opacity:1;visibility:visible}}html:not(.cml-rdy):is(:has(link[rel=canonical]:is([href$=\"/contato/\"],[href$=\"/quem-somos/\"],[href$=\"/faq/\"],[href$=\"/presentes-de-natal/\"],[href$=\"/encontre-seu-cha/\"],[href$=\"/politica-de-cashback/\"],[href$=\"/ofertas/\"])),:has(body:is(.template-blog,.template-blog-post,[class*=template-account]))) main{opacity:0;visibility:hidden;animation:cmlrv 0s 2.4s forwards}html:not(.cml-rdy):has(link[rel=canonical]:is([href$=\"/contato/\"],[href$=\"/quem-somos/\"],[href$=\"/faq/\"],[href$=\"/presentes-de-natal/\"],[href$=\"/encontre-seu-cha/\"],[href$=\"/politica-de-cashback/\"],[href$=\"/ofertas/\"])) main~footer,html:not(.cml-rdy):not(.cml-0):has(body:is(.template-blog,.template-blog-post,[class*=template-account])) main~footer{visibility:hidden;animation:cmlrv 0s 2.4s forwards}"],
  // categoria: a espera pelo codigo agora tem prazo (1,6 s); antes a lista ficava invisivel ate o codigo chegar
  ['html.cml-blk body.template-category:not(.c2-ready) :is(#ns-section-category_hero,#ns-section-product_list){opacity:0!important}', 'html.cml-blk body.template-category:not(.c2-ready) :is(#ns-section-category_hero,#ns-section-product_list){opacity:0;animation:cmlrv 0s 1.6s forwards}'],
];
const PARSE = { ecmaVersion: 'latest', sourceType: 'script', allowReturnOutsideFunction: true };

// FAQ: a lista de perguntas (extx-13) tinha duas respostas antigas; um bloco do cml-extra ("respostas corrigidas no FAQ") trocava o texto na tela de 400 em 400 ms.
// O FAQ do produto copia a lista uma vez so e podia copiar antes da troca. Aqui a resposta corrigida entra direto na lista; o bloco de troca sai (modulos.json).
function faqCorrigido(code) {
  const ext = fs.readFileSync('src/cml-extra.js', 'utf8'); const i = ext.indexOf('var FIX=['); const j = ext.indexOf('];', i);
  if (i < 0 || j < 0) throw new Error('faq: bloco FIX nao encontrado');
  const arr = Function('return ' + ext.slice(i + 8, j + 1))();
  for (const [re, html] of arr) {
    const ms = [...code.matchAll(/\[("(?:[^"\\]|\\.)*")\s*,\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g)].filter((x) => re.test(JSON.parse(x[1])));
    if (ms.length !== 1) throw new Error('faq: esperava 1 pergunta para ' + re + ', achou ' + ms.length);
    const x = ms[0]; code = code.slice(0, x.index) + '[' + x[1] + ',' + JSON.stringify(html) + code.slice(x.index + x[0].length);
  }
  return code;
}

function prepara(f) {
  let code = fs.readFileSync('src/' + f, 'utf8');
  // 1) CSS estatico sai do codigo (vai para o site.css)
  const cortes = dec.plan.filter((p) => p[0] === f && p[3]).map((p) => sites[f][p[1]].expr).sort((a, b) => b[0] - a[0]);
  for (const [a, b] of cortes) code = code.slice(0, a) + '""' + code.slice(b);
  for (const [arq, a, b, n] of TROCAS) if (arq === f) {
    const re = a instanceof RegExp ? a : new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+'), 'g');
    const achou = (code.match(re) || []).length;
    if (achou !== (n || 1)) throw new Error('troca: esperava ' + (n || 1) + ', achou ' + achou + ' em ' + arq + ': ' + String(a).slice(0, 60));
    code = code.replace(re, typeof b === 'function' ? b : () => b);
  }
  // 2) carregadores antigos
  for (const [arq, ini, fim] of LIMPA) if (arq === f) { const i = code.indexOf(ini); if (i < 0) throw new Error('limpeza nao achou: ' + ini.slice(0, 60)); const j = code.indexOf(fim, i); code = code.slice(0, i) + code.slice(j + fim.length); }
  if (f === 'extx-13.js') code = faqCorrigido(code);
  for (const [arq, ini, k] of LITERAL_FIXO) if (arq === f) {
    const alvo = est.texts[+k.slice(4)]; let achou = null;
    walk.full(acorn.parse(code, PARSE), (n) => { if (n.type === 'Literal' && typeof n.value === 'string' && n.value.length > 3000 && n.value.indexOf(ini) === 0) achou = n; });
    if (!achou) throw new Error('literal fixo nao encontrado em ' + arq);
    if (achou.value !== alvo) throw new Error('literal fixo de ' + arq + ' difere do texto capturado (' + achou.value.length + ' x ' + alvo.length + ')');
    code = code.slice(0, achou.start) + '""' + code.slice(achou.end);
  }
  return code;
}

// divide a parte em modulos (cada instrucao do topo), com o comentario que vem antes como nome
function modulos(f, code) {
  const coms = [];
  const ast = acorn.parse(code, { ...PARSE, onComment: (blk, text, s, e) => coms.push({ text, s, e }) });
  const out = []; let prevEnd = 0;
  for (const st of ast.body) {
    if (st.type === 'EmptyStatement') continue;
    const c = coms.filter((x) => x.s >= prevEnd && x.e <= st.start).map((x) => x.text.trim().replace(/\s+/g, ' ')).join(' | ');
    out.push({ parte: f.replace('.js', ''), nome: (c || code.slice(st.start, st.start + 70).replace(/\s+/g, ' ')).slice(0, 110), code: code.slice(st.start, st.end), tipo: st.type });
    prevEnd = st.end;
  }
  return out;
}

// Modulos de fase (ver ORDEM).
// fase-ini: enquanto as partes iniciam, a pagina responde "ainda sendo lida" e os pedidos de "pagina lida" ficam guardados, na ordem.
//   Tambem decide onde entra cada estilo criado pelo codigo: no v18 a ordem dos estilos era a ordem de criacao; agora os estilos fixos estao todos no site.css.
//   Medido no v18: os estilos que o codigo cria durante o inicio das partes ficavam no comeco da fila (antes da maioria dos fixos) e os criados depois
//   (pagina lida, respostas de rede, servicos de terceiros) ficavam no fim. Entao: durante o inicio -> <head> (antes do site.css); depois -> logo apos o site.css.
const FASE = {
  'fase-ini': '(function(){var d=document,w=window;if(w.__cmlQ)return;var Q=w.__cmlQ={d:[],w:[],m:0,dA:d.addEventListener,wA:w.addEventListener};try{Object.defineProperty(d,"readyState",{configurable:true,get:function(){return"loading"}})}catch(e){}d.addEventListener=function(t,f,o){if(t==="DOMContentLoaded"){Q.d.push(f);return}return Q.dA.call(this,t,f,o)};w.addEventListener=function(t,f,o){if(t==="DOMContentLoaded"){Q.w.push(f);return}return Q.wA.call(this,t,f,o)};var h=d.head,l=d.getElementById("cml-site-css");if(h&&l&&l.parentNode&&!h.__cmlAp){var ap=h.appendChild,a=d.createComment("cml-estilos");l.parentNode.insertBefore(a,l.nextSibling);h.__cmlAp=1;h.appendChild=function(n){if(Q.f&&n&&n.nodeName==="STYLE"&&a.parentNode)return a.parentNode.insertBefore(n,a);return ap.call(this,n)}}})();',
  'fase-marca': '(function(){var Q=window.__cmlQ;if(Q)Q.m=Q.d.length})();',
  'fase-evento1': '(function(){var d=document,w=window,Q=w.__cmlQ;if(!Q||Q.f)return;Q.f=1;try{delete d.readyState}catch(e){}try{delete d.addEventListener}catch(e){}try{delete w.addEventListener}catch(e){}Q.run=function(f,t){try{typeof f==="function"?f.call(t,new Event("DOMContentLoaded")):f&&f.handleEvent&&f.handleEvent(new Event("DOMContentLoaded"))}catch(e){try{console.warn("cml evento",e)}catch(x){}}};for(var i=0;i<Q.m;i++)Q.run(Q.d[i],d)})();',
  'fase-evento2': '(function(){var d=document,w=window,Q=w.__cmlQ;if(!Q||!Q.run||Q.g)return;Q.g=1;for(var i=Q.m;i<Q.d.length;i++)Q.run(Q.d[i],d);for(var j=0;j<Q.w.length;j++)Q.run(Q.w[j],w)})();',
};
const mods = [];
for (const [p, cond] of ORDEM) {
  if (FASE[p]) { mods.push({ parte: 'fase', nome: p, code: FASE[p], tipo: 'x', id: p, cond: '' }); continue; }
  if (p === 'ext-extras') {
    for (const f of fs.readdirSync('src').filter((x) => /^extx-\d+\.js$/.test(x)).sort()) { const ms = modulos(f, prepara(f)); ms.forEach((m, i) => { m.id = f.replace('.js', '') + '#' + i; m.cond = ''; mods.push(m); }); }
  } else { const f = p + '.js'; const ms = modulos(f, prepara(f)); ms.forEach((m, i) => { m.id = p + '#' + i; m.cond = cond; mods.push(m); }); }
}

// minifica cada modulo (nomes locais curtos; nomes globais e de propriedades ficam como estao)
for (const m of mods) {
  const r = await terser(m.code, { ecma: 2019, compress: { passes: 2 }, mangle: { toplevel: false }, format: { comments: false } });
  m.min = r.code.replace(/;\s*$/, '');
  m.bruto = m.code.length;
}

// o reescritor de :has tambem vai sozinho num arquivo pequeno (cedo.js): o tema carrega esse arquivo antes do pacote, para a conversao nao depender da chegada do pacote
{ const hz = mods.find((m) => m.id === 'cml-extra#0'); if (!hz || hz.min.indexOf('__cmlHz') < 0) throw new Error('reescritor nao encontrado'); fs.mkdirSync(OUT, { recursive: true }); fs.writeFileSync(OUT + '/cedo.js', '/* Chef Mais Leve: conversor de :has (v19). Mesmo modulo do pacote; roda uma vez so. */\ntry{' + hz.min + '}catch(e){}\n'); }

// cobertura: contador no inicio de cada funcao
let nFn = 0; const fnInfo = [];
if (COV) {
  for (const m of mods) {
    const ast = acorn.parse(m.min, PARSE); const ins = [];
    walk.full(ast, (n) => { if ((n.type === 'FunctionDeclaration' || n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression') && n.body.type === 'BlockStatement') ins.push([n.body.start + 1, n.end - n.start]); });
    ins.sort((a, b) => a[0] - b[0]);
    m.fn0 = nFn; let s = '', last = 0;
    for (const [pos, tam] of ins) { s += m.min.slice(last, pos) + '__c[' + nFn + ']=1;'; fnInfo.push(tam); nFn++; last = pos; }
    m.cov = s + m.min.slice(last); m.fn1 = nFn;
  }
}


// variante de medicao (--prof): quanto tempo cada modulo gasta no inicio, em timers, observadores e eventos
const PROF_INI = `(function(){var W=window,P=W.__cmlP={cur:'',t:{},n:{},t0:0};
function acc(id,k,dt){var o=P.t[id]||(P.t[id]={});o[k]=(o[k]||0)+dt;var c=P.n[id]||(P.n[id]={});c[k]=(c[k]||0)+1}
function wrap(fn,k){if(typeof fn!=='function')return fn;var id=P.cur;if(!id)return fn;return function(){var prev=P.cur;P.cur=id;var t0=performance.now();try{return fn.apply(this,arguments)}finally{acc(id,k,performance.now()-t0);P.cur=prev}}}
var st=W.setTimeout,si=W.setInterval,raf=W.requestAnimationFrame;
W.setTimeout=function(f){var a=[].slice.call(arguments);a[0]=wrap(f,'timer');return st.apply(W,a)};
W.setInterval=function(f){var a=[].slice.call(arguments);a[0]=wrap(f,'intervalo');return si.apply(W,a)};
W.requestAnimationFrame=function(f){return raf.call(W,wrap(f,'raf'))};
['MutationObserver','IntersectionObserver','ResizeObserver'].forEach(function(n){var O=W[n];if(!O)return;var N=function(cb,opt){return new O(wrap(cb,n.slice(0,3)),opt)};N.prototype=O.prototype;W[n]=N});
var ael=EventTarget.prototype.addEventListener,rel=EventTarget.prototype.removeEventListener,map=new WeakMap();
EventTarget.prototype.addEventListener=function(ty,f,o){if(typeof f==='function'&&P.cur){var w=map.get(f);if(!w){w=wrap(f,'ev:'+ty);map.set(f,w)}return ael.call(this,ty,w,o)}return ael.call(this,ty,f,o)};
EventTarget.prototype.removeEventListener=function(ty,f,o){return rel.call(this,ty,(typeof f==='function'&&map.get(f))||f,o)};
P.b=function(id){P.cur=id;P.t0=performance.now()};P.e=function(){acc(P.cur,'ini',performance.now()-P.t0);P.cur=''};
P.rel=function(top){var r=[];for(var id in P.t){var o=P.t[id],tot=0,ks=[];for(var k in o){tot+=o[k];ks.push(k+' '+Math.round(o[k])+'ms/'+P.n[id][k])}r.push([tot,id,ks.sort(function(a,b){return parseFloat(b.split(' ')[1])-parseFloat(a.split(' ')[1])}).slice(0,4).join(', ')])}r.sort(function(a,b){return b[0]-a[0]});var s=0;r.forEach(function(x){s+=x[0]});return 'TOTAL '+Math.round(s)+'ms\\n'+r.slice(0,top||20).map(function(x){return Math.round(x[0])+'ms '+x[1]+' ('+x[2]+')'}).join('\\n')};
P.zera=function(){P.t={};P.n={}};
})();
`;

function monta(lista, titulo) {
  let s = '/* Chef Mais Leve: ' + titulo + ' (v19, 23/11/2026). Fonte e montagem: chefmaisleve-midia/site-v19/fonte. */\n';
  for (const m of lista) {
    const corpo = COV ? m.cov : m.min;
    const cond = m.cond === 'home' ? 'if(document.body&&document.body.classList.contains("template-home"))' : '';
    if (m.id === 'cpv-own#0') s += 'window.__cpvOwn2=1;window.__cpvOwn=1;\n';
    if (PROF) s += cond + '{__cmlP.b(' + JSON.stringify(m.id) + ');try{' + corpo + '}catch(e){__cmlW(' + JSON.stringify(m.id) + ',e)}__cmlP.e()}\n';
    else s += cond + 'try{' + corpo + '}catch(e){__cmlW(' + JSON.stringify(m.id) + ',e)}\n';
  }
  s += 'try{window.__cmlHzNow&&window.__cmlHzNow()}catch(e){}\n';
  // avisa o visual que o codigo terminou de montar a pagina (classe cml-pk): solta o bloco de compra da pagina de produto sem salto de layout (ver ajustes.css)
  if (/nucleo/.test(titulo)) s += '(function(){var f=function(){document.documentElement.classList.add("cml-pk")};if(document.readyState==="complete")f();else{document.addEventListener("DOMContentLoaded",f);addEventListener("load",f)}})();\n';
  return s;
}
const remover = new Set(cfg.remover || []);
const vazio = (m) => !m.min || /^(void 0|!0|!1|0)?$/.test(m.min.trim());
const vivos = mods.filter((m) => !remover.has(m.id) && !vazio(m));
const ini = 'window.__cmlV2=1;window.__cmlV3=1;window.__cmlPack2=1;window.__cmlPack=1;window.__cefLoader=1;'
  // troca o texto de um elemento sem recriar o no (nao acorda os observadores de estrutura)
  + 'window.__cmlF=function(f){var d=0,g=function(){if(d)return;d=1;f()};requestAnimationFrame(g);setTimeout(g,120)};'
  // fotos de produto pedidas em PNG/JPG de 480 px passam a vir em WebP (mesma foto, de 4 a 8 vezes mais leve)
  + 'window.__cmlWp=function(u){return String(u||"").replace(/-480-0\\.(png|jpe?g)$/i,"-480-0.webp")};'
  + 'window.__cmlT=function(e,v){if(!e)return;v=String(v);var c=e.firstChild;if(c&&c.nodeType===3&&c===e.lastChild){if(c.nodeValue!==v)c.nodeValue=v}else if(e.textContent!==v)e.textContent=v};'
  + (COV ? 'window.__c=new Uint8Array(' + nFn + ');window.__cmlE=[];window.__cmlW=function(i,e){window.__cmlE.push(i+": "+(e&&e.message))};' : 'window.__cmlW=function(i,e){try{console.warn("cml",i,e)}catch(x){}};') + '\n';
const grupos = {}; // grupo -> lista de modulos ('' = nucleo, carregado em todas as paginas)
for (const m of vivos) { const g = (cfg.grupo && cfg.grupo[m.id]) || ''; (grupos[g] = grupos[g] || []).push(m); }
const tam = {};
for (const g of Object.keys(grupos)) {
  const nome = g ? 'pack-' + g + '.js' : 'pack.js';
  const txt = (g ? '' : ini + (PROF ? PROF_INI : '')) + monta(grupos[g], g ? 'comportamento (' + g + ')' : 'comportamento (nucleo)');
  new Function(txt); // confere a sintaxe do arquivo final
  fs.writeFileSync(OUT + '/' + nome, (g ? '' : '') + txt); tam[nome] = txt.length;
}
fs.writeFileSync(OUT + '/mapa.json', JSON.stringify({ nFn, fnTam: fnInfo, mods: mods.map((m) => ({ id: m.id, nome: m.nome, min: m.min.length, bruto: m.bruto, fn0: m.fn0, fn1: m.fn1, removido: remover.has(m.id), grupo: (cfg.grupo && cfg.grupo[m.id]) || '' })) }));

// visual: na ordem em que aparecia na pagina
const rkey = (s) => (s.id ? s.id : 'txt:' + s.t);
// DERIVADOS: estilos que o codigo montava na hora a partir de outro estilo; entram prontos, logo depois do estilo que vinha antes deles na pagina de origem
const DERIVADOS = new Set(['c10-css']);
const vistos = new Set(); const partes = [];
for (const p of ['/', ...Object.keys(P).filter((p) => p !== '/')]) { const st = (P[p].styles || []).filter((s) => s.tag === 'STYLE'); st.forEach((s, idx) => {
  const k = rkey(s); if (vistos.has(k)) return;
  if (DERIVADOS.has(k)) { vistos.add(k); let pos = partes.length; for (let q = idx - 1; q >= 0; q--) { const at = partes.findIndex((x) => x[0] === rkey(st[q])); if (at >= 0) { pos = at + 1; break; } } partes.splice(pos, 0, [k, T[s.t]]); return; }
  if (k === 'custom-theme-css' || ok.has(k)) { vistos.add(k); partes.push([k, T[s.t]]); }
}); }
for (const k of DERIVADOS) if (!vistos.has(k)) throw new Error('estilo derivado nao capturado: ' + k);
let css = partes.map(([k, t]) => '/*' + k + '*/\n' + t + '\n').join('');
for (const [a, b] of CSS_TROCAS) { if (css.split(a).length !== 2) throw new Error('troca css: esperava 1 ocorrencia: ' + a.slice(0, 60)); css = css.replace(a, () => b); }
// galeria.css: mosaico de fotos da pagina de produto no computador; entra por ultimo para valer sobre o carrossel
const REFORCO = Array.from({ length: 9 }, (_, i) => ':not(#g' + (i + 1) + ')').join('');
css = fs.readFileSync('fontes.css', 'utf8') + '\n' + css + '\n' + fs.readFileSync('galeria.css', 'utf8').split('%N%').join(REFORCO) + '\n';
if (fs.existsSync('ajustes.css')) css += fs.readFileSync('ajustes.css', 'utf8') + '\n';
// regras comprovadamente mortas: dependiam de classes que nenhum codigo cria mais (lista em modulos.json)
if (cfg.tokensMortos && cfg.tokensMortos.length) {
  const { tokensFora } = await import('./purga.mjs');
  const morto = (t) => cfg.tokensMortos.some((m) => t === m || (m.endsWith('*') && t.startsWith(m.slice(0, -1))));
  const postcss = (await import('postcss')).default; const root = postcss.parse(css); let nr = 0;
  root.walkRules((r) => { if (r.parent && r.parent.type === 'atrule' && /keyframes/.test(r.parent.name)) return; const fica = r.selectors.filter((sel) => !tokensFora(sel).some(morto)); if (!fica.length) { r.remove(); nr++; } else if (fica.length < r.selectors.length) r.selectors = fica; });
  root.walkAtRules((a) => { if (/media|supports/.test(a.name) && a.nodes && a.nodes.length === 0) a.remove(); });
  css = root.toString(); console.log('regras mortas removidas:', nr);
}
fs.writeFileSync(OUT + '/site.bruto.css', css);
const cssMin = (await esbuild.transform(css, { loader: 'css', minify: true, legalComments: 'none' })).code;
// :has() dentro de :is() ficava fora do alcance do reescritor: cada seletor vira lista simples, com a mesma especificidade (":not(.cml-0)", "html", "body" so igualam o peso)
const P3 = '[data-product-id="382762068"],[data-product-id="382762073"],[data-product-id="382762078"]', V3 = '[data-variants*="382762068,"],[data-variants*="382762073,"],[data-variants*="382762078,"]';
const PG = 'link[rel=canonical]:is([href$="/contato/"],[href$="/quem-somos/"],[href$="/faq/"],[href$="/presentes-de-natal/"],[href$="/encontre-seu-cha/"],[href$="/politica-de-cashback/"],[href$="/ofertas/"])', BD = 'body:is(.template-blog,.template-blog-post,[class*=template-account])';
const DESANINHA = [
  ['html:not(.cml-rdy):is(:has(' + PG + '),:has(' + BD + ')) main', 'html:not(.cml-rdy):has(' + PG + ') main,html:not(.cml-rdy):not(.cml-0):has(' + BD + ') main'],
  [':is(' + P3 + ',.js-item-product:has(a[href*="/combo-"])) .js-product-item-image-container-private:after', 'body :is(' + P3 + '):not(.cml-0) .js-product-item-image-container-private:after,.js-item-product:has(a[href*="/combo-"]) .js-product-item-image-container-private:after'],
  [':is(#single-product:is(' + V3 + '),html:has(link[rel=canonical][href*="/combo-"]) #single-product) .js-product-name:before', 'html body #single-product:is(' + V3 + '):not(.cml-0) .js-product-name:before,html:has(link[rel=canonical][href*="/combo-"]) #single-product .js-product-name:before'],
];
let cssFim = cssMin;
for (const [de, para] of DESANINHA) { if (!cssFim.includes(de)) throw new Error('desaninha: nao achou ' + de.slice(0, 70)); cssFim = cssFim.split(de).join(para); }
{ const re = /(html body(?:\.template-home)? \.adbar):is\(:has\(a\[href\*="#black"\]\),:has\(a\[href\*="\/account"\]\)\)((?::not\(#a\d+\))+:after)/g; if (!re.test(cssFim)) throw new Error('desaninha: nao achou a regra da barra'); cssFim = cssFim.replace(re, '$1:has(a[href*="#black"])$2,$1:has(a[href*="/account"])$2'); }
// consultas presas ao html passam a olhar so os filhos diretos (o link canonico fica sempre no head; o body e filho do html): mesmo resultado, sem varrer a pagina inteira
for (const [de, para, min] of [[':has(link[rel=canonical]', ':has(>head>link[rel=canonical]', 5], [':has(body:is(.template-blog', ':has(>body:is(.template-blog', 1]]) { const n = cssFim.split(de).length - 1; if (n < min) throw new Error('consulta direta: esperava ao menos ' + min + ' de ' + de + ', achou ' + n); cssFim = cssFim.split(de).join(para); }
const hasVivo = hasVivas(cssFim);
if (hasVivo.length) throw new Error("site.css ficaria com :has() vivo (fora do alcance do reescritor):\n  " + [...new Set(hasVivo)].join("\n  "));
fs.writeFileSync(OUT + '/site.css', '/* Chef Mais Leve: visual do site (v19, 23/11/2026). */\n' + cssFim);
console.log(COV ? '[cobertura] funcoes ' + nFn : '[producao]', '| modulos', mods.length, 'vivos', vivos.length, '| site.css', Math.round(cssMin.length / 1024) + 'KB |', Object.entries(tam).map(([k, v]) => k + ' ' + Math.round(v / 1024) + 'KB').join(', '));
