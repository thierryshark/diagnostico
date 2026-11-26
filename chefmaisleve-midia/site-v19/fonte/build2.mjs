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
  // cantos: o corretor por script saiu (3 trechos que conferiam elemento por elemento a cada mudanca da pagina); os cantos agora vem certos do proprio estilo (cantos-origem.json, aplicado no fim da montagem)
  ['cml-paginas.js', /\/\* cantos sobrios[^\n]*\*\/\nvar SK="cx3r";[\s\S]*?\n(?=function run\(\)\{css\(\);)/, ''],
  ['cml-paginas.js', 'function boot(){run();try{soft(D.body)}catch(e){}}', 'function boot(){run()}'],
  ['cml-paginas.js', /var ct=0;D\.addEventListener\("click",function\(\)\{if\(ct\)return;ct=setTimeout\(function\(\)\{ct=0;try\{soft\(D\.body\)\}catch\(e\)\{\}\},450\)\},true\);\s*window\.addEventListener\("load",function\(\)\{try\{soft\(D\.body\)\}catch\(e\)\{\}\}\);/, ''],
  ['cml-paginas.js', 'var t=0,q=[];new MutationObserver(function(ms){for(var i=0;i<ms.length;i++)for(var j=0;j<ms[i].addedNodes.length;j++){var n=ms[i].addedNodes[j];if(n.nodeType===1)q.push(n)}if(t)return;t=setTimeout(function(){t=0;run();var a=q;q=[];for(var k=0;k<a.length;k++){try{if(a[k].isConnected){soft(a[k].parentNode||a[k])}}catch(e){}}},250)})', 'var t=0;new MutationObserver(function(){if(t)return;t=setTimeout(function(){t=0;run()},250)})'],
  ['cml-paginas.js', 'try{new MutationObserver(function(ms){if(!window.__cx3soft)return;for(var i=0;i<ms.length;i++)for(var j=0;j<ms[i].addedNodes.length;j++){var n=ms[i].addedNodes[j];if(n.nodeType===1){try{window.__cx3soft(n.parentNode||n)}catch(e){}}}}).observe(D.documentElement,{childList:true,subtree:true})}catch(e){}', ''],
  ['cml-paginas.js', /function lim\(h\)\{return h<=30\?6:\(h<=64\?10:16\)\}\nfunction soft\(root\)\{if\(!root\|\|root\.nodeType!==1\)return;[^\n]*\n/, ''],
  ['cml-paginas.js', 'var q=[],t;function flush(){var a=q;q=[];a.forEach(function(n){if(n.isConnected){soft(n);promo(n.parentNode||D)}})}', 'var q=[],t,ft=0;function flush(){ft=0;var a=q;q=[];var vp=new Set();a.forEach(function(n){if(n.isConnected){var pp=n.parentNode||D;if(!vp.has(pp)){vp.add(pp);promo(pp)}}})}'],
  ['cml-paginas.js', 'function full(){soft(D.body);promo(D)}', 'function full(){promo(D)}'],
  ['cml-paginas.js', 'function go(){full();setTimeout(full,1500);setTimeout(full,4000);new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,function(n){if(n.nodeType===1)q.push(n)})});flush()})', 'function go(){full();setTimeout(full,1500);setTimeout(full,4000);new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,function(n){if(n.nodeType===1)q.push(n)})});if(q.length&&!ft){ft=1;__cmlF(flush)}})'],
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
  ['cml-paginas.js', "html.cml-dockcb body [data-slot='corner_bottom_left'] button[aria-label='Meu cashback']{position:absolute!important;left:-9999px!important;opacity:0!important;pointer-events:none!important}", "html body [data-slot='corner_bottom_left'] button[aria-label='Meu cashback']{position:absolute!important;left:-9999px!important;opacity:0!important;pointer-events:none!important}"],
  // Encontre seu cha e Monte seu presente viraram paginas do proprio tema (modelos category.ENCONTRE e category.PRESENTE, 24/11): o quiz e o montador antigos saem do pacote. Aqui saem a espera pela montagem dessas paginas e a chamada que escondia o conteudo do tema na pagina de presentes
  ['cml-paginas.js', "if(/^\\/encontre-seu-cha\\/?$/.test(P))return !!D.querySelector(\"#cef-quiz .cef\");", ''],
  ['cml-paginas.js', "if(/^\\/presentes-de-natal\\/?$/.test(P))return !!D.querySelector(\"#cml-natal .cmn-hero\");", ''],
  ['cml-paginas.js', "try { natPre(); } catch (e) {}", ''],
  // paginas novas do proprio tema (Encontre seu cha e Monte seu presente): o pacote nao repinta os botoes delas nem espera para mostrar a lista de produtos
  // Espiar: o resumo comeca a ser buscado quando o mouse para no cartao (o Espiar so existe no computador), entao o clique abre com o texto pronto
  ['cml-paginas.js', 'fetch("https://dzmlyrkzcdqicwfmxnxd.supabase.co/functions/v1/cml-espiar?id=" + encodeURIComponent(id)).then(function (r) { return r.json(); }).then(function (j) { ESPC[id] = j; fill(j); }).catch(function () { fill(null); });', 'espGet(id).then(fill);'],
  ['cml-paginas.js', 'function espClose() {', 'var ESPP = {}, ESPL = null, ESPT = 0; function espGet(id) { if (ESPC[id]) return Promise.resolve(ESPC[id]); if (!ESPP[id]) ESPP[id] = fetch("https://dzmlyrkzcdqicwfmxnxd.supabase.co/functions/v1/cml-espiar?id=" + encodeURIComponent(id)).then(function (r) { return r.json(); }).then(function (j) { ESPC[id] = j; return j; }).catch(function () { delete ESPP[id]; return null; }); return ESPP[id]; } D.addEventListener("mouseover", function (e) { var c = e.target.closest && e.target.closest(".js-item-product[data-product-id]"); if (c === ESPL) return; ESPL = c; clearTimeout(ESPT); if (c && c.querySelector(".cml-esp")) { var pid = c.getAttribute("data-product-id"); ESPT = setTimeout(function () { espGet(pid); }, 120); } }, { passive: true }); function espClose() {'],
  // Black: botoes de quantidade das ofertas com letra de 14 px (era 12,5)
  ['cml-paginas.js', 'font-size:12.5px!important;text-align:center!important;justify-content:center!important;min-width:0!important}', 'font-size:14px!important;text-align:center!important;justify-content:center!important;min-width:0!important}'],
  // Black: a linha de conta das ofertas passa a mostrar tambem o valor por item (custo-beneficio pedido pelo Thierry)
  ['cml-paginas.js', "'<span>'+k.un+(k.un===1?\" item\":\" itens\")+'</span><span>'+brl(k.por*0.95)", "'<span>'+k.un*(c.pk||1)+' '+uni(c)+(k.un*(c.pk||1)===1?'':'s')+'</span>'+(k.un*(c.pk||1)>1?'<span>'+brl(k.por/(k.un*(c.pk||1)))+' por '+uni(c)+'</span>':'')+'<span>'+brl(k.por*0.95)"],
  // Black: cada opcao de quantidade mostra quanto sai a unidade (pacote, kit ou caixa) naquela opcao; os combos de cha contam os pacotes de dentro (5 e 4)
  ['cml-paginas.js', "function comboCalc(c){var n=cq[c.id]||c.dq||c.q[0]", "function uni(c){return c.id===\"ter\"||c.id===\"flw\"?\"kit\":c.id===\"nat\"?\"caixa\":\"pacote\"}function comboCalc(c,nn){var n=nn||cq[c.id]||c.dq||c.q[0]"],
  ['cml-paginas.js', "it:[[382766299,1]],q:[1,2,3],", "it:[[382766299,1]],pk:5,q:[1,2,3],"],
  ['cml-paginas.js', "it:[[382766180,1]],q:[1,2,3],", "it:[[382766180,1]],pk:4,q:[1,2,3],"],
  ['cml-paginas.js', "'>'+esc(c.ql(n))+'</button>'", "'><b>'+esc(c.ql(n))+'</b><i>'+(function(x){return brl(x.por/(x.un*(c.pk||1)))})(comboCalc(c,n))+'</i></button>'"],
  ['cml-paginas.js', "'</p><div class=\"of3-q\"'", "'</p><p class=\"of3-ql\">Quantidade e valor de cada '+uni(c)+'</p><div class=\"of3-q\"'"],
  // cartao no celular: a contagem de avaliacoes passava 5 px da borda ("26 avaliacoe"); em tela estreita vira "(26)"
  ['cml-paginas.js', 'function txt(n){return "· "+n+(n===1?" avaliação":" avaliações")}', 'function txt(n){return window.innerWidth<=640?"("+n+")":"· "+n+(n===1?" avaliação":" avaliações")}'],
  // Black: foto propria dos combos de cha gravada no proprio combo (antes um modulo a parte, cx14, trocava a foto depois de o cartao aparecer). Combo 4 chas com a foto nova (rotulos certos)
  ['cml-paginas.js', 'it:[[382766299,1]],pk:5,q:[1,2,3],', 'it:[[382766299,1]],im:"https://acdn-us.mitiendanube.com/stores/005/060/752/products/0001-8666574502263601674-c2069e09b81939a2d817953028382498-640-0.jpg",pk:5,q:[1,2,3],'],
  ['cml-paginas.js', 'it:[[382766180,1]],pk:4,q:[1,2,3],', 'it:[[382766180,1]],im:"https://acdn-us.mitiendanube.com/stores/005/060/752/products/combo-4-chas-maos-1200-d898fb72eed2d7cf2b17955248724904-640-0.jpg",pk:4,q:[1,2,3],'],
  ['cml-paginas.js', "return'<img src=\"'+esc(img(p))+'\" alt=\"\" loading=\"lazy\" decoding=\"async\">'}).join(\"\");\n return'<article class=\"of3-c\"", "return'<img src=\"'+esc(c.im||img(p))+'\" alt=\"\" loading=\"lazy\" decoding=\"async\">'}).join(\"\");\n return'<article class=\"of3-c\""],
  // categorias: sai a coluna lateral de filtros (regra do Thierry: sem coluna lateral no computador; o tema nao tem filtro nativo, entao o filtro sai). Ficam a fileira de subcategorias, o Ordenar por e o Ver em
  ['cml-extra.js', "if(cg&&!cg.querySelector(\".c2-side\")){var sd=D.createElement(\"aside\");sd.className=\"c2-side\";sd.setAttribute(\"aria-label\",\"Filtros\");var sp=new URLSearchParams(location.search),sb=sp.get(\"sort_by\")||\"best-selling\";\n  var SO=[[\"best-selling\",\"Mais vendidos\"],[\"price-ascending\",\"Menor preço\"],[\"price-descending\",\"Maior preço\"],[\"created-descending\",\"Novidades\"],[\"alpha-ascending\",\"A a Z\"]];\n  var h='';if(chips.length>1)h+='<div class=\"grp\"><p class=\"k\">Categoria</p>'+chips.map(function(x){return'<a href=\"'+esc(x.p)+'\"'+(x.p===P?' class=\"on\" aria-current=\"page\"':\"\")+'><i></i>'+esc(x.t)+'</a>'}).join(\"\")+'</div>';\n  h+='<div class=\"grp\"><p class=\"k\">Ordenar</p>'+SO.map(function(o){var q=new URLSearchParams(location.search);q.set(\"sort_by\",o[0]);return'<a href=\"'+esc(P+\"?\"+q.toString())+'\"'+(sb===o[0]?' class=\"on\"':\"\")+'><i></i>'+o[1]+'</a>'}).join(\"\")+'</div>';\n  var fb=D.querySelector(\"#cml-cbar .cml-fb\")||D.querySelector(\".category-filter-button\");if(fb)h+='<div class=\"grp\"><button type=\"button\" class=\"mf\">Mais filtros</button><p class=\"cnt\">'+cnt+'</p></div>';else h+='<p class=\"cnt\">'+cnt+'</p>';\n  sd.innerHTML=h;cg.insertBefore(sd,cg.firstChild);cg.classList.add(\"c2-has\");setTimeout(function(){try{dispatchEvent(new Event(\"resize\"))}catch(e){}},60);setTimeout(function(){try{dispatchEvent(new Event(\"resize\"))}catch(e){}},900);var mf=sd.querySelector(\".mf\");if(mf)mf.addEventListener(\"click\",function(){var f=D.querySelector(\".category-filter-button\")||D.querySelector(\"#cml-cbar .cml-fb\");if(f)f.click()})}", ''],
  // categorias: sem a coluna lateral, o padrao no computador volta a ser 4 produtos por linha (o codigo assumia 3 quando nao havia coluna)
  ['cml-paginas.js', 'var d=dc||(open||!side?3:4)', 'var d=dc||(open&&side?3:4)'],
  // cronometro da Black no produto em destaque, no celular: texto e contador ocupam a largura do bloco (o contador ficava solto a esquerda, com metade do bloco vazia)
  ['cml-paginas.js', '.cx5-kt .u{display:flex;gap:6px}', '.cx5-kt .u{display:flex;gap:6px}@media(max-width:640px){.cx5-kt .t{flex:1 1 100%}.cx5-kt .u{flex:1 1 100%}.cx5-kt .u>div{flex:1 1 0;min-width:0}}'],
  // cartoes: sobretitulo e segunda linha dos combos novos e dos 4 kits corporativos (os kits foram recadastrados e ganharam ids novos; os ids antigos saem)
  ['cml-paginas.js', '381152464:[PC,"Flowers Tropical"],381152487:[PC,"Snack Tropical"],381152499:[PC,"Café da Manhã"],381152515:[PC,"Queridinho"],381152535:[PC,"Para Aquela Pessoa"]};', '381152499:[PC,"Café da Manhã"],382766180:["Combo de chás mistos","Intenso, Sereníssimo, Quentão e Sport"],382766299:["Combo de chá na fruta","Os 5 sabores, 6 trouxinhas de cada"],382888421:["Kit corporativo","Flowers Tropical: rosa de maçã e 3 trouxinhas"],382888467:["Kit corporativo","Snack Tropical: Laranja Chocoleve e 3 trouxinhas"],382888501:["Kit corporativo","Queridinho: rosas de maçã, laranja e chá"],382888542:["Kit corporativo","Para Aquela Pessoa: ritual do chá completo"]};'],
  ['cml-extra.js', ".js-quantity-down,.js-quantity-up,.c4-fq,.cml-rev\";", ".js-quantity-down,.js-quantity-up,.c4-fq,.cml-rev,[data-cml-nat],[data-cml-nat] button,[data-cml-nat] a\";"],
  ['cml-extra.js', "if(!b.classList.contains(\"template-category\")||/^\\/ofertas\\//.test(P)){b.classList.add(\"c2-ready\");return true}", "if(!b.classList.contains(\"template-category\")||/^\\/ofertas\\//.test(P)||D.querySelector(\"[data-cml-nat]\")){b.classList.add(\"c2-ready\");return true}"],
  // barra flutuante no celular: com a letra em 14 px os rotulos longos se sobrepunham; a segunda palavra some no celular (o rotulo completo segue no computador e na leitura de tela)
  ['cml-extra.js', '<span class="lb">Compra rápida</span>', '<span class="lb">Compra<i> rápida</i></span>'],
  ['cml-extra.js', '<span class="lb">Rastrear pedido</span>', '<span class="lb">Rastrear<i> pedido</i></span>'],
  // faixa do topo: quando a contagem acaba, marca a faixa (cx5-fim) para o espaco reservado sumir
  ['cml-paginas.js', 'if(!t){if(el)el.remove();ab.classList.remove("cx5-on");return}', 'if(!t){if(el)el.remove();ab.classList.remove("cx5-on");ab.classList.add("cx5-fim");return}'],
  // 24/11 (Thierry): combos sem opcao de 1, 2 ou 3 (so a oferta do combo); Laranja Chocoleve anunciada pelos dois formatos (5 ou 10 fatias), sem faixas de volume: o botao abre a escolha de tamanho e quantidade que ja existe na pagina; kits corporativos so a partir de 10 unidades
  ['cml-paginas.js', 'pk:5,q:[1,2,3],', 'pk:5,q:[1],inc:["Os 5 sabores, 6 trouxinhas de cada","Maçã","Capim-limão","Frutas vermelhas","Abacaxi","Calêndula"],'],
  ['cml-paginas.js', 'pk:4,q:[1,2,3],', 'pk:4,q:[1],inc:["Os 4 chás, um pacote de cada","Sereníssimo","Intenso","Quentão","Sport"],'],
  ['cml-paginas.js', 't:"Laranja Chocoleve <em>em quantidade</em>",d:"Pacotes de 5 fatias de laranja com chocolate 70%, para a casa, para dividir e para presentear.",it:[[224675737,1]],q:[1,5,10,20],dq:5,pd:[[5,4],[10,6],[20,10]],', 't:"Laranja Chocoleve <em>em dois tamanhos</em>",d:"Pacote com 5 ou com 10 fatias de laranja com chocolate 70%. Você escolhe o tamanho e a quantidade.",it:[[224675737,1]],pick:1,q:[1],inc:["Dois tamanhos para escolher","Pacote com 5 fatias","Pacote com 10 fatias"],'],
  ['cml-paginas.js', 'it:[[343280690,1]],q:[1,10,20,50],dq:10,', 'it:[[343280690,1]],q:[10,20,50],dq:10,'],
  ['cml-paginas.js', "'</p><p class=\"of3-ql\">Quantidade e valor de cada '+uni(c)+'</p><div class=\"of3-q\"'", "'</p>'+(c.q.length<2?(c.inc?'<p class=\"of3-ql\">'+esc(c.inc[0])+'</p><ul class=\"of3-in\">'+c.inc.slice(1).map(function(x){return'<li>'+esc(x)+'</li>'}).join('')+'</ul>':'')+'<div class=\"of3-q\" hidden style=\"display:none!important\"':'<p class=\"of3-ql\">Quantidade e valor de cada '+uni(c)+'</p><div class=\"of3-q\"')"],
  ['cml-paginas.js', "<button type=\"button\" class=\"of3-add\" data-addc=\"'+c.id+'\">Adicionar tudo à sacola</button>", "'+(c.pick?'<button type=\"button\" class=\"of3-add\" data-pick=\"'+c.it[0][0]+'\">Escolher tamanho e quantidade</button>':'<button type=\"button\" class=\"of3-add\" data-addc=\"'+c.id+'\">'+(c.q.length<2?'Adicionar à sacola':'Adicionar tudo à sacola')+'</button>')+'"],
  ['cml-paginas.js', 'var ar=b.closest(".of3-p");', 'var ar=b.closest(".of3-p,.of3-c");'],
  ['cml-paginas.js', 'if(k==="lar")Q.push(["Vale a pena comprar mais pacotes?","<p>Sim. Em 10 pacotes cada um sai a R$ 33,50 e em 20 pacotes a R$ 32,00. Escolha a quantidade logo abaixo do preço.</p>"]);', ''],
  ['cml-paginas.js', ',289,399,1]];', ',289,399,10]];'],
  ['cml-paginas.js', "'<small>por kit</small></div><div class=\"cx4-qty\"><label>Kits<input type=\"number\" min=\"1\"", "'<small>por kit · mínimo 10</small></div><div class=\"cx4-qty\"><label>Kits<input type=\"number\" min=\"10\""],
  ['cml-paginas.js', 'i.addEventListener("input",function(){var n=Math.max(1,parseInt(i.value,10)||1);b.setAttribute("data-q",String(n))})', 'i.addEventListener("input",function(){var n=Math.max(10,parseInt(i.value,10)||10);b.setAttribute("data-q",String(n))});i.addEventListener("change",function(){if((parseInt(i.value,10)||0)<10)i.value=10})'],
  // 24/11 (Thierry): a pagina de chas nao abre mais com o anuncio do Combo Trio; fica so a lista (o combo ja aparece como produto). O "return" no inicio faz o compactador descartar o resto da funcao
  ['cml-paginas.js', 'function cha(){if(D.querySelector(".cx4-cha"))return;', 'function cha(){return;if(D.querySelector(".cx4-cha"))return;'],
  // home no celular: o sobretitulo do quadro de presentes quebrava em duas linhas; fica "Feito à mão"
  ['cml-paginas.js', '<span class="k">Presentes · feito à mão</span>', '<span class="k">Feito à mão</span>'],
  // v20: a pagina de Presentes corporativos passa a ser o modelo CORPORATIVO do tema (nativo). Sai a montagem por script dos kits de Natal nessa pagina; sem isso o modelo e o script apareceriam juntos
  ['cml-paginas.js', 'function kits(){if(D.querySelector(".cx4-kits"))return;', 'function kits(){return;if(D.querySelector(".cx4-kits"))return;'],
  // v21: perguntas frequentes nativas. As 6 perguntas foram cadastradas no tema (home, pagina e produto); sai o script que apagava as perguntas do tema e montava outras por cima, e o que embrulhava o texto de cada pergunta
  ['extx-13.js', 'function m(){[].forEach.call(document.querySelectorAll(\'[id^="ns-section-faq"]:not([data-cmlf])\')', 'function m(){return;[].forEach.call(document.querySelectorAll(\'[id^="ns-section-faq"]:not([data-cmlf])\')'],
  ['cml-extra.js', 'function faq(){[].forEach.call(D.querySelectorAll(".cml-faq .accordion-item-toggle-text")', 'function faq(){return;[].forEach.call(D.querySelectorAll(".cml-faq .accordion-item-toggle-text")'],
  ['cml-extra.js', '.js-quantity-up,.c4-fq,.cml-rev', '.js-quantity-up,.cml-rev'],
  // 26/11 (Thierry): paginas de cha sem faixas de 1, 2, 3 pacotes (nao ha condicao especial; fica so o campo normal de quantidade) e Laranja sem faixas de volume. As faixas so aparecem quando existe promocao real cadastrada (Compre X, pague Y)
  ['cml-paginas.js', "else if(k===\"lar\"){opts=[[1,\"1 pacote\",brl(pr)],[\"L10\",\"10 pacotes\",brl(33.5)+\" cada\"],[\"L20\",\"20 pacotes\",brl(32)+\" cada\"]]}\nelse if(k===\"misto\"||k===\"fruta\"){opts=[[1,\"1 pacote\",brl(pr)],[2,\"2 pacotes\",brl(pr*2)],[3,\"3 pacotes\",brl(pr*3)]]}", ''],
  // 26/11 (Thierry): comparativo do valor por xicara em toda a linha de chas mistos (preco do produto dividido pelo rendimento: 2 g por xicara). Entra logo abaixo da faixa de beneficios, depois do botao Comprar
  ['cml-paginas.js', "var busy=0;function run(){if(busy)return;busy=1;try{labels();if(isPP()){tiers();strip();faq();bar()}}", "function xic(){if(D.querySelector(\".cx11-xic\"))return;if(kind()!==\"misto\")return;var n=(D.querySelector(\".js-product-name\")||{}).textContent||\"\";if(/combo|kit/i.test(n))return;var g=n.match(/(\\d+)\\s*g\\b/i),pr=price();if(!g||!pr)return;var cups=Math.round(+g[1]/2);if(cups<5)return;var s=D.querySelector(\".cx11-strip\");if(!s)return;var lata=/lata/i.test(n);var x=D.createElement(\"div\");x.className=\"cx11-xic\";x.innerHTML='<p class=\"h\">Quanto custa uma xícara?</p><ul><li><span>Café especial na cafeteria</span><b>R$ 14 a R$ 17</b></li><li><span>Chá na cafeteria</span><b>R$ 7 a R$ 14</b></li><li class=\"on\"><span>Este chá, feito em casa</span><b>'+brl(pr/cups)+'</b></li></ul><p class=\"f\">'+(lata?\"1 lata\":\"1 pacote\")+\" de \"+g[1]+\" g rende \"+(lata?\"cerca de \":\"até \")+cups+' xícaras. Os valores de cafeteria são médias.</p>';s.parentNode.insertBefore(x,s.nextSibling)} var busy=0;function run(){if(busy)return;busy=1;try{labels();if(isPP()){tiers();strip();xic();faq();bar()}}"],
  // 26/11 (Thierry): pagina de destaque com variacao (Laranja): abaixo da escolha da embalagem entra o campo de quantidade (menos, numero, mais), ligado ao campo de quantidade do proprio tema
  ['cml-paginas.js', "pr.parentNode.insertBefore(box,pr.nextSibling);\nbox.addEventListener(\"click\",function(e){var b=e.target.closest(\"button\");if(!b)return;var i=+b.getAttribute(\"data-i\");var y=window.scrollY;", "pr.parentNode.insertBefore(box,pr.nextSibling);\nvar qb=D.createElement(\"div\");qb.className=\"cx17-q\";qb.innerHTML='<span class=\"h\">Quantas embalagens?</span><div class=\"s\"><button type=\"button\" data-d=\"-1\" aria-label=\"Diminuir\">−</button><input type=\"text\" inputmode=\"numeric\" value=\"1\" aria-label=\"Quantidade de embalagens\"><button type=\"button\" data-d=\"1\" aria-label=\"Aumentar\">+</button></div>';box.parentNode.insertBefore(qb,box.nextSibling);var qi=qb.querySelector(\"input\");var qset=function(n){n=Math.max(1,Math.min(99,parseInt(n,10)||1));qi.value=n;[].forEach.call(D.querySelectorAll(\"#ns-section-main_product form.js-product-form input.js-quantity-input,#ns-section-main_product input[name=quantity],.cml-bar .q input\"),function(ni){ni.value=n;ni.dispatchEvent(new Event(\"input\",{bubbles:true}));ni.dispatchEvent(new Event(\"change\",{bubbles:true}))})};qb.addEventListener(\"click\",function(e){var b=e.target.closest(\"button\");if(b)qset((parseInt(qi.value,10)||1)+(+b.getAttribute(\"data-d\")))});qi.addEventListener(\"change\",function(){qset(qi.value)});\nbox.addEventListener(\"click\",function(e){var b=e.target.closest(\"button\");if(!b)return;var i=+b.getAttribute(\"data-i\");var y=window.scrollY;"],
  // 26/11 (Thierry): a pagina saltava ao trocar a embalagem. Causa: ao trocar a variacao o tema rola a tela ate a foto da galeria (scrollIntoView), e o codigo antigo brigava com isso puxando a tela de volta. Agora a rolagem nem acontece (a galeria do tema nao aparece nessas paginas) e a briga saiu
  ['cml-paginas.js', "var y=window.scrollY;var fix=function(){if(Math.abs(window.scrollY-y)>2)window.scrollTo(0,y)};vb[i].click();fix();requestAnimationFrame(fix);setTimeout(fix,60);setTimeout(fix,250);setTimeout(fix,600);", "var sl=[].slice.call(D.querySelectorAll(\"#ns-section-main_product .js-product-slide-link\"));sl.forEach(function(x){x.scrollIntoView=function(){}});vb[i].click();setTimeout(function(){sl.forEach(function(x){delete x.scrollIntoView})},400);"],
  // 26/11: os 6 kits corporativos antigos foram apagados da loja (ok do Thierry); saem da tabela de nomes
  ['cml-paginas.js', '381152450:[PC,"Pausa"],381152499:[PC,"Café da Manhã"],', ''],
  // 26/11 (Thierry): perguntas frequentes acima do "Veja tambem" nas paginas de produto
  ['cml-paginas.js', "var ap=D.querySelector(\"#ns-section-alternative_products\")||sec;if(!ap)return;ap.parentNode.insertBefore(box,ap.nextSibling);", "var ap=D.querySelector(\"#ns-section-alternative_products\")||sec;if(!ap)return;ap.parentNode.insertBefore(box,ap);"],
  // 26/11 (Thierry): avaliacoes nas paginas de destaque. O quadro de avaliacoes do aplicativo ficava dentro da secao do tema que essas paginas nao mostram; passa a entrar no fim da propria pagina de destaque
  ['cml-destaque.js', "function rvRoot() {\n    var r = null;", "function rvRoot() {\n    var r = null; var dw = D.querySelector(\"#cml-dst .dw\"); if (dw && !D.querySelector(\".cml-rev\")) { var mi = [].filter.call(D.querySelectorAll(\"#ns-section-main_product [class*='mi-@container']\"), function (e) { return e.children.length >= 2 && /Avalia/.test(e.textContent); })[0]; if (mi) { var hs = D.createElement(\"div\"); hs.className = \"blk cml-rev\"; dw.appendChild(hs); hs.appendChild(mi); } }"],
  // 26/11 (Thierry): abas da compra rapida com os nomes e a ordem certos, na origem (antes saia "Chas chas mistos" porque o nome antigo era trocado na tela)
  ['extx-01.js', "[[\"Chás blends\",\"/chas/\"],[\"Infusões naturais\",\"/chas/chas-infusoes-naturais/\"],[\"Snacks\",\"/snacks-granolas/snacks-saudaveis/\"],[\"Granolas\",\"/snacks-granolas/granolas/\"],[\"Kits\",\"/kits-presentes/\"],[\"Acessórios\",\"/acessorios/\"],[\"_of\",\"/ofertas/\"]]", "[[\"Chás mistos\",\"/chas/cha-misto/\"],[\"Chá na fruta\",\"/chas/chas-infusoes-naturais/\"],[\"Granolas\",\"/snacks-granolas/granolas/\"],[\"Frutas desidratadas\",\"/snacks-granolas/snacks-saudaveis/\"],[\"Chocoleve\",\"/snacks-granolas/chocoleve/\"],[\"Kits\",\"/kits-presentes/\"],[\"Acessórios\",\"/acessorios/\"],[\"_of\",\"/ofertas/\"]]"],
  // compra rapida: a quantidade de abas deixa de ser fixa em 6 (agora sao 7; a ultima lista e sempre a de ofertas)
  ['extx-01.js', "t[6].forEach(function(t){n[t.id]=1});for(var o=[],r=0;r<6;r++)", "t[t.length-1].forEach(function(t){n[t.id]=1});for(var o=[],r=0;r<t.length-1;r++)"],
  // 26/11 (Thierry): a sacola explica a regra do cashback (so vale em pedido acima de R$ 199, minimo dos cupons gerados pelo Cashing) e mostra quanto falta
  ['cml-paginas.js', "+'</select><span>· grátis a partir de '+brl(meta).replace(\",00\",\"\")+'</span></div>';", "+'</select><span>· grátis a partir de '+brl(meta).replace(\",00\",\"\")+'</span></div>'+'<p class=\"cb\">'+(s.sub>=199?'<b>Cashback liberado:</b> seu saldo já pode ser usado neste pedido':'Cashback: dá para usar em pedidos acima de R$ 199. Faltam <b>'+brl(199-s.sub)+'</b>')+'</p>';"],
  // 24/11 (Thierry): o WhatsApp do site e sempre o oficial, final 1974 (pagina de contato)
  ['extx-13.js', '"tel:+5547992726557","Telefone","(47) 99272-6557"', '"tel:+554791571974","Telefone","(47) 9157-1974"'],
  ['extx-13.js', '"https://wa.me/5547992726557","WhatsApp","(47) 99272-6557 · resposta mais rápida"', '"https://wa.me/554791571974","WhatsApp","(47) 9157-1974 · resposta mais rápida"'],
  // janela "Frete gratis": o valor de R$ 249 vale para o estado de Sao Paulo inteiro (regra cadastrada na loja), nao so para a capital
  ['extx-01.js', '<b>R$ 249</b>São Paulo (capital)</li>', '<b>R$ 249</b>Estado de São Paulo</li>'],
];
// trocas pontuais no visual capturado: [texto antigo, texto novo]
const CSS_TROCAS = [
  // vaos que faltavam: banner da categoria para o bloco do combo (36 -> 72) e do combo para a lista (40 -> 72); destaque do produto para o bloco seguinte (44 -> 72)
  ['.cx4-sec{max-width:1255px;margin:8px auto 40px;', '@media(max-width:767px){.cx4-sec{margin-top:8px!important}}.cx4-sec{max-width:1255px;margin:44px auto 72px;'],
  ['.cml-dst .dw{max-width:1240px;margin:0 auto;padding:28px 32px 8px}', '.cml-dst .dw{max-width:1240px;margin:0 auto;padding:28px 32px 28px}'],
  // Black: o fim da pagina somava 64 px ao vao do rodape (139); agora 75
  ['padding:8px 0 64px', 'padding:8px 0 0'],
  // home: a faixa de informativos somava 24 px ao vao de 72
  ['html.cml-blk body.template-home #ns-section-icon_text{background:#f6efe9!important;padding-bottom:24px!important}', 'html.cml-blk body.template-home #ns-section-icon_text{background:#f6efe9!important;padding-bottom:0!important}'],
  // vaos entre blocos (padrao: 72 px no computador, 48 no celular). Home: as secoes somavam recuo interno ao vao (96, 90, 132) e o Instagram colava no rodape (34); produto: Veja tambem para Duvidas era 92
  ['html.cml-home2 body main>#ns-section-icon_text,html.cml-home2 body main>.c2-rk,html.cml-home2 body main>.cml-nc,html.cml-home2 body main>[id^=ns-section-faq]{margin-bottom:72px!important}', 'html.cml-home2 body main>#ns-section-icon_text,html.cml-home2 body main>.c2-rk,html.cml-home2 body main>.cml-nc,html.cml-home2 body main>[id^=ns-section-faq]{margin-bottom:72px!important;padding-bottom:0!important}html.cml-home2 body main>[id^=ns-section-instagram-feed]{margin-bottom:38px!important}'],
  ['html.cml-home2 body main>#ns-section-icon_text,html.cml-home2 body main>.c2-rk,html.cml-home2 body main>.cml-nc,html.cml-home2 body main>[id^=ns-section-faq]{margin-bottom:44px!important}', 'html.cml-home2 body main>#ns-section-icon_text,html.cml-home2 body main>.c2-rk,html.cml-home2 body main>.cml-nc,html.cml-home2 body main>[id^=ns-section-faq]{margin-bottom:48px!important;padding-bottom:0!important}html.cml-home2 body main>[id^=ns-section-instagram-feed]{margin-bottom:14px!important}'],
  ['.cml-nc{padding:36px 0 20px;', '.cml-nc{padding:0;'],
  ['html body .cx11-faq:not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6){max-width:1120px;margin:72px auto 40px;padding:0 24px}', 'html body .cx11-faq:not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6){max-width:1120px;margin:52px auto 40px;padding:0 24px}'],
  // produto em destaque (pedido do Thierry em 24/11): os blocos da coluna de compra preenchem a largura da coluna. Selos em colunas iguais (4 no computador, 2 no celular), faixa do lote e botao Comprar agora na largura toda; no celular a descricao fica em ate 3 linhas
  ['.cml-dst .chips{display:flex;flex-wrap:wrap;gap:8px;list-style:none;margin:0 0 24px;padding:0}', '.cml-dst .chips{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;list-style:none;margin:0 0 16px;padding:0}'],
  ['.cml-dst .chips li{border:1px solid var(--ln);border-radius:999px;padding:7px 13px;font:400 12.5px/1.2 Poppins,sans-serif;color:var(--ink);background:var(--pn2)}', '.cml-dst .chips li{display:flex;align-items:center;justify-content:center;text-align:center;min-height:42px;border:1px solid var(--ln);border-radius:999px;padding:6px 10px;font:400 12.5px/1.2 Poppins,sans-serif;color:var(--ink);background:var(--pn2)}'],
  ['html body .cml-dst .cx12-lote:not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6){display:inline-flex;align-items:center;gap:8px;margin:0 0 12px;padding:6px 10px;border-radius:6px;', 'html body .cml-dst .cx12-lote:not(#a1):not(#a2):not(#a3):not(#a4):not(#a5):not(#a6){display:flex;width:100%;box-sizing:border-box;align-items:center;gap:8px;margin:0 0 12px;padding:10px 12px;border-radius:10px;'],
  ['.cml-dst .ctas{display:flex;align-items:center;gap:22px;flex-wrap:wrap}', '.cml-dst .ctas{display:flex;align-items:center;gap:22px;flex-wrap:wrap}.cml-dst .dh-txt .ctas .bt{flex:1 1 100%;width:100%}'],
  ['.cml-dst .ld{font-size:15px}', '.cml-dst .ld{font-size:16px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}'],
  // pagina de produto: o texto de apresentacao ficava a 140 px da foto e a 58 px do "Veja tambem"; agora 72 px para cima e para baixo no computador (padrao de vao entre blocos) e cerca de 50 px no celular
  ['html body #ns-section-product_description:not(#a1):not(#a2){padding-top:48px!important;padding-bottom:24px!important}', 'html body #ns-section-product_description:not(#a1):not(#a2){padding-top:36px!important;padding-bottom:40px!important}@media(max-width:767px){html body #ns-section-product_description:not(#a1):not(#a2){padding-top:16px!important;padding-bottom:16px!important}}'],
  // alinhamento no computador (pedido do Thierry em 24/11): tudo comeca na mesma linha da moldura. Foto do produto em destaque encosta no inicio da coluna (ficava centralizada, 108 px para dentro) e cresce de 500 para 620 px
  ['.cml-dst .dh-media{position:relative;width:100%;max-width:500px;justify-self:center}', '.cml-dst .dh-media{position:relative;width:100%;max-width:620px;justify-self:start}'],
  // paginas institucionais: o conteudo usa a largura da moldura (era uma coluna de 1240 px centralizada)
  ['body.template-page:has(.cml-st2) .page-content.user-content,body.template-page .cml-st2{max-width:1240px!important}', 'body.template-page:has(.cml-st2) .page-content.user-content,body.template-page .cml-st2{max-width:none!important}'],
  // Black: perguntas rapidas na largura da moldura do site (era um bloco de 960 px centralizado), em 2 colunas no computador, titulo alinhado ao inicio da coluna
  ['html body #cml-of3 .of3-faq:not(#a1):not(#a2){margin-top:120px!important;max-width:960px!important}', 'html body #cml-of3 .of3-faq:not(#a1):not(#a2){margin-top:72px!important;max-width:none!important}@media(min-width:981px){html body #cml-of3 .of3-faq:not(#a1):not(#a2){display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 32px;align-items:start}html body #cml-of3 .of3-faq:not(#a1):not(#a2)>h2{grid-column:1/-1;text-align:left}}'],
  // categorias: os filtros foram desligados no painel da loja em 24/11 (ok do Thierry); a coluna nativa nao e mais montada, entao sai a regra que a escondia
  ['html.cml-blk body .cml-cgrid.c2-has>.filters-controls-content{display:none!important}', ''],
  // rodape enxuto no celular: sem a segunda margem interna, sem o logo repetido (ja esta no topo), menus sem quebra de linha, bandeiras numa linha so e menos vao entre os blocos
  ['.c7-ft:not(#z1):not(#z2):not(#z3):not(#z4):not(#z5):not(#z6){gap:20px!important;padding:24px 18px!important}', '.c7-ft:not(#z1):not(#z2):not(#z3):not(#z4):not(#z5):not(#z6){gap:14px!important;padding:0!important;grid-template-columns:minmax(0,1fr)!important}'],
  ['.c7-fg:not(#z1):not(#z2):not(#z3):not(#z4):not(#z5):not(#z6){gap:10px 16px!important}', '.c7-fg:not(#z1):not(#z2):not(#z3):not(#z4):not(#z5):not(#z6){gap:10px 16px!important;margin-top:0!important;grid-template-columns:auto minmax(0,1fr)!important}'],
  ['.c7-fp:not(#z1):not(#z2):not(#z3):not(#z4):not(#z5):not(#z6){gap:6px!important;flex-wrap:wrap}', '.c7-fp:not(#z1):not(#z2):not(#z3):not(#z4):not(#z5):not(#z6){gap:6px!important;flex-wrap:wrap;margin-top:0!important;padding-top:12px!important}.c7-ft .cml-fx:not(#z1):not(#z2):not(#z3):not(#z4):not(#z5):not(#z6){margin-top:0!important;padding-top:12px!important;gap:8px 10px!important}.c7-ft .cml-fx .footer-logos-wrapper:not(#z1):not(#z2):not(#z3):not(#z4):not(#z5):not(#z6){display:grid!important;grid-template-columns:repeat(6,minmax(0,1fr))!important;width:100%!important;gap:5px!important}.c7-ft .cml-fx .footer-logos-wrapper img:not(#z1):not(#z2):not(#z3):not(#z4):not(#z5):not(#z6){height:28px!important;width:100%!important;min-width:0!important;max-width:none!important;padding:4px 5px!important;object-fit:contain!important}.c7-ft .cml-fx .footer-copyright:not(#z1):not(#z2):not(#z3):not(#z4):not(#z5):not(#z6){margin-bottom:0!important}'],
  ['.c7-fm:not(#z1):not(#z2):not(#z3):not(#z4):not(#z5):not(#z6){padding:16px!important}', '.c7-fm:not(#z1):not(#z2):not(#z3):not(#z4):not(#z5):not(#z6){padding:14px 16px!important;margin-top:0!important}'],
  ['.c7-fb a img:not(#z1):not(#z2):not(#z3):not(#z4):not(#z5):not(#z6){height:34px!important;width:auto!important}', '.c7-fb a img:not(#z1):not(#z2):not(#z3):not(#z4):not(#z5):not(#z6){display:none!important}'],
  ['.c7-fb h4:not(#z1):not(#z2):not(#z3):not(#z4):not(#z5):not(#z6){font-size:20px!important;margin:8px 0 0!important}', '.c7-fb h4:not(#z1):not(#z2):not(#z3):not(#z4):not(#z5):not(#z6){font-size:20px!important;margin:0!important}'],
  // Black: as fotos dos combos de cha agora nascem certas no cartao (campo "im" do combo); saem as regras que escondiam a foto ate o script trocar
  ['#cml-of3 article[data-c="trx"] .of3-ci:not([data-cx14]) img,#cml-of3 article[data-c="blm"] .of3-ci:not([data-cx14]) img{visibility:hidden}', ''],
  ['#cml-of3 .of3-ci[data-cx14] img{object-fit:cover!important;width:100%!important;height:100%!important}', ''],
  // cartao no celular: nome com ate 3 linhas (a segunda linha dos combos, "Intenso, Serenissimo e Performance", era cortada na tela estreita)
  ['html body .js-item-product .js-item-name:not(#a1):not(#a2){line-height:1.3!important;min-height:2.6em!important;max-height:2.6em;overflow:hidden;display:-webkit-box!important;-webkit-line-clamp:2;-webkit-box-orient:vertical}', 'html body .js-item-product .js-item-name:not(#a1):not(#a2){line-height:1.3!important;min-height:2.6em!important;max-height:2.6em;overflow:hidden;display:-webkit-box!important;-webkit-line-clamp:2;-webkit-box-orient:vertical}@media(max-width:640px){html body .js-item-product .js-item-name:not(#a1):not(#a2){height:auto;max-height:3.9em;-webkit-line-clamp:3}}'],
  // cartao no celular: o sobretitulo comprido ("Presente mais famoso") era cortado com reticencias; agora quebra em ate 2 linhas, com altura reservada para os nomes ficarem alinhados
  ['html body .js-item-product .cx6-ov:not(#a1){min-height:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}', 'html body .js-item-product .cx6-ov:not(#a1){min-height:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}@media(max-width:640px){html body .js-item-product .cx6-ov:not(#a1){min-height:34px;white-space:normal;overflow:visible;text-overflow:clip}}'],
  // app de avaliacoes: o botao de contorno ficava com letra branca em fundo claro (duas regras de cor brigavam). Agora contorno e letra no laranja da marca, fundo branco
  ['[style*="border: 1px solid rgb(249, 148, 76)"]{border-color:#565229!important;background:#f5f7ef!important}', '[style*="border: 1px solid rgb(249, 148, 76)"]{border-color:#a65a14!important;background:#fff!important;color:#a65a14!important}'],
  // contraste (minimo 4,5:1): preco riscado, contagem de avaliacoes e caminho de navegacao saem da transparencia e passam ao cinza #6f6656 (5:1 sobre o fundo claro); preco riscado em 14 px
  ["html.cml-blk body .js-item-product .product-item-price-compare{color:rgba(43,41,22,.5)!important}", "html.cml-blk body .js-item-product .product-item-price-compare{color:#6f6656!important}"],
  ["order:1!important;margin:0!important;font:300 11.5px/1 Poppins,sans-serif!important;color:rgba(43,41,22,.45)!important", "order:1!important;margin:0!important;font:400 14px/1 Poppins,sans-serif!important;color:#6f6656!important"],
  ["html.cml-blk body .cbk-de{font:300 11.5px/1 Poppins,sans-serif!important;color:rgba(43,41,22,.45)!important", "html.cml-blk body .cbk-de{font:400 14px/1 Poppins,sans-serif!important;color:#6f6656!important"],
  ["html.cml-blk body #modal-cart .price-compare{color:rgba(43,41,22,.45)!important}", "html.cml-blk body #modal-cart .price-compare{color:#6f6656!important}"],
  ["html.cml-blk body .breadcrumb a{color:rgba(43,41,22,.65)!important}", "html.cml-blk body .breadcrumb a{color:#6f6656!important}"],
  // paginas de texto: o botao cheio "Falar no WhatsApp" ficava com letra laranja sobre fundo laranja (a cor dos links do texto vencia a do botao); os links do texto deixam de valer para botoes
  ["html.cml-blk body .c6-uc a{", "html.cml-blk body .c6-uc a:not(.c7-bt){"],
  // blocos de combo (chas, kits): botao no laranja padrao do site (era dourado) e letra de 14 px
  ["border-radius:10px;background:#dfae58;color:#0b0a08!important;font:600 14.5px/1 Poppins", "border-radius:10px;background:#a65a14;color:#fff!important;font:600 15px/1 Poppins"],
  [".cx4-btn:hover{background:#d09d45}", ".cx4-btn:hover{background:#8f4c10}"],
  ["height:40px!important;font-size:13px!important;padding:0 10px!important", "height:40px!important;font-size:14px!important;padding:0 10px!important"],
  [".cx4-kits .cx4-qty .cx4-btn{min-height:40px;font-size:13px}", ".cx4-kits .cx4-qty .cx4-btn{min-height:40px;font-size:14px}"],
  // Black, "vale mais levar junto": no computador cada oferta vira um bloco de destaque (foto de um lado, enredo, opcoes de quantidade e conta do outro), no molde das secoes da Chocoleve; no celular segue o carrossel compacto
  [".of3-cb{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}", ".of3-cb{display:grid;grid-template-columns:minmax(0,1fr);gap:64px}"],
  [".of3-c{display:flex;flex-direction:column;border-radius:24px;background:var(--pp);border:1px solid var(--ln);overflow:hidden;box-shadow:0 18px 40px -32px rgba(43,41,22,.45)}", ".of3-c{display:grid;grid-template-columns:minmax(0,560px) minmax(0,1fr);gap:56px;align-items:center;width:100%;max-width:none;margin:0}.of3-c:nth-child(even){grid-template-columns:minmax(0,1fr) minmax(0,560px)}.of3-c:nth-child(even) .of3-ci{order:2}"],
  [".of3-ci{position:relative;display:grid;gap:2px;aspect-ratio:16/10;background:#f6efe9;overflow:hidden}", ".of3-ci{position:relative;display:grid;gap:2px;aspect-ratio:4/3;background:#f6efe9;overflow:hidden;border-radius:16px;border:6px solid #fff;box-shadow:0 18px 40px -32px rgba(43,41,22,.45)}"],
  [".of3-cbd{display:flex;flex-direction:column;gap:6px;flex:1;padding:18px 18px 18px}", ".of3-cbd{display:flex;flex-direction:column;gap:10px;flex:1;padding:0;min-width:0;max-width:640px}"],
  [".of3-c h3{margin:0;font:700 18px/1.25 Poppins,sans-serif;color:var(--ink)}", ".of3-c h3{margin:0;font:700 clamp(22px,2.4vw,32px)/1.15 Poppins,sans-serif;color:var(--ink)}"],
  [".of3-c .ds{margin:0;font:300 13.5px/1.5 Poppins,sans-serif;color:var(--mu)}", ".of3-c .ds{margin:0;max-width:520px;font:400 16px/1.5 Poppins,sans-serif;color:var(--mu)}"],
  ["@media(max-width:980px){.of3-cb{grid-template-columns:repeat(2,minmax(0,1fr))}}", "@media(max-width:980px){.of3-cb{gap:40px}.of3-c,.of3-c:nth-child(even){grid-template-columns:minmax(0,1fr);gap:16px;max-width:560px}.of3-c:nth-child(even) .of3-ci{order:0}}"],
  [".of3-c{flex:0 0 84%;scroll-snap-align:start}", ".of3-c{flex:0 0 84%;scroll-snap-align:start;gap:0;grid-template-rows:auto minmax(0,1fr);align-items:stretch;margin:0;border-radius:16px;background:var(--pp);border:1px solid var(--ln);overflow:hidden}.of3-ci{border:0;border-radius:0;box-shadow:none}.of3-cbd{padding:16px}.of3-add{align-self:stretch;min-width:0}"],
  [".of3-q button{min-height:34px;padding:0 13px;border-radius:999px;border:1px solid var(--ln);background:#fff;color:var(--ink);font:500 12.5px/1 Poppins,sans-serif;cursor:pointer}", ".of3-q button{min-height:56px;padding:0 13px;border-radius:10px;border:1px solid var(--ln);background:#fff;color:var(--ink);font:500 14px/1.2 Poppins,sans-serif;cursor:pointer}.of3-q button b{display:block;font-weight:600}.of3-q button i{display:block;margin-top:3px;font-style:normal;font-weight:400;color:var(--mu)}.of3-q button.on i{color:#fff}.of3-ql{margin:4px 0 -2px;font:500 14px/1.3 Poppins,sans-serif;color:var(--mu)}"],
  ["padding:8px 4px!important;font-size:12.5px!important;text-align:center!important", "padding:10px 6px!important;font-size:14px!important;text-align:center!important"],
  [".of3-ec{display:flex;flex-wrap:wrap;gap:4px 12px;font:400 12.5px/1.4 Poppins,sans-serif;color:var(--mu)}", ".of3-ec{display:flex;flex-wrap:wrap;gap:4px 14px;font:400 14px/1.4 Poppins,sans-serif;color:var(--mu)}"],
  [".of3-add{display:flex;align-items:center;justify-content:center;width:100%;min-height:46px;margin-top:auto;border:0;border-radius:999px;background:var(--or);color:#fff;font:600 14.5px/1 Poppins,sans-serif;cursor:pointer}", ".of3-add{display:flex;align-items:center;justify-content:center;align-self:flex-start;min-width:280px;min-height:50px;margin-top:10px;padding:0 28px;border:0;border-radius:10px;background:var(--or);color:#fff;font:600 15px/1 Poppins,sans-serif;cursor:pointer}"],
  // cantos: as variaveis de canto do padrao antigo (20 e 28 px) passam ao teto de 16 px
  ["--ds-r-md:20px", "--ds-r-md:16px"],
  ["--ds-r-lg:28px", "--ds-r-lg:16px"],
  // categorias: sai a regra que forcava 3 colunas no computador (o tema ja esta configurado para 4, como pede o documento do Thierry)
  ["@media(min-width:1100px){html body .js-product-table.grid-md-4:not(#u1):not(#u2):not(#u3):not(#u4):not(#u5){grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:28px!important}}", ""],
  // nada abaixo de 14 px: avaliacao e etiqueta sobre a foto
  [".cml-avq{font-size:12px!important", ".cml-avq{font-size:14px!important"],
  ["font-weight:400!important;opacity:.78", "font-weight:400!important;opacity:1"],
  [".cx6-ov{display:block;margin:0 0 3px;font:600 10.5px/1.2 Poppins,sans-serif;letter-spacing:.16em;", ".cx6-ov{display:block;margin:0 0 3px;font:600 14px/1.2 Poppins,sans-serif;letter-spacing:.06em;"],
  // a lista nativa de produtos deixa de ser escondida no Encontre seu cha (a pagina nova usa essa lista) e a pagina de presentes antiga deixa de ter regra propria
  ["html:has(link[rel=canonical][href$=\"/encontre-seu-cha/\"]) :is(#ns-section-category_hero,#ns-section-product_list),html:has(link[rel=canonical][href$=\"/ofertas/\"]) :is(#ns-section-category_hero,#ns-section-product_list,#ns-section-divider_1789950202654),html:has(link[rel=canonical][href$=\"/presentes-de-natal/\"]) :is([id^=ns-section-faq],[id^=ns-section-divider]){display:none!important}", "html:has(link[rel=canonical][href$=\"/ofertas/\"]) :is(#ns-section-category_hero,#ns-section-product_list,#ns-section-divider_1789950202654){display:none!important}"],
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
  // barra flutuante no celular: rotulo curto para caber a letra de 14 px
  ['html.cml-dockcb body .c1-dock .lb{font-size:9px;letter-spacing:0}', 'html.cml-dockcb body .c1-dock .lb{font-size:14px;letter-spacing:0}html body .c1-dock .lb i{display:none}'],
  ['.c1-dock .lb{font:300 9px/1 Poppins,sans-serif;letter-spacing:.02em;', '.c1-dock .lb i{font-style:normal}.c1-dock .lb{font:300 14px/1 Poppins,sans-serif;letter-spacing:.02em;'],
  // corporativos (pagina atual da categoria): o bloco de Natal deixa de ser um segundo banner. Fica o banner da categoria; o titulo vira texto e as 3 datas viram moldes claros pequenos
  ['.cx4-nat{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:20px;align-items:center;margin:0 0 18px;padding:clamp(18px,2.6vw,30px);border-radius:16px;background:radial-gradient(110% 120% at 20% 10%,rgb(107,30,42) 0%,rgb(92,24,35) 45%,rgb(74,20,29) 100%);color:#f6efe9}', '.cx4-nat{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.5fr);gap:20px;align-items:center;margin:0 0 20px}'],
  ['.cx4-nat .cx4-k{color:#dfae58}', ''],
  ['.cx4-nat .cx4-h{color:#f6efe9}', ''],
  ['.cx4-nat .cx4-h em{color:#f3d48b}', ''],
  ['.cx4-nat .cx4-lead{margin:0;color:#efe4da}', '.cx4-nat .cx4-lead{margin:0}'],
  ['.cx4-dt{display:grid;gap:8px;margin:0;padding:0;list-style:none}', '.cx4-dt{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:0;padding:0;list-style:none}@media(max-width:767px){.cx4-dt{grid-template-columns:minmax(0,1fr);gap:8px}.cx4-dt li{display:flex;align-items:center;gap:12px}.cx4-dt b{margin-bottom:0}}'],
  ['.cx4-dt li{display:flex;align-items:center;gap:12px;padding:10px 12px;border:1px solid rgba(223,174,88,.35);border-radius:10px;background:rgba(246,239,233,.06)}', '.cx4-dt li{padding:12px 14px;border:1px solid #e8ddd0;border-radius:10px;background:#fffaf5}'],
  ['.cx4-dt b{min-width:74px;font:700 17px/1 Poppins,sans-serif;color:#f3d48b}', '.cx4-dt b{display:block;min-width:74px;margin-bottom:6px;font:700 17px/1 Poppins,sans-serif;color:#a65a14}'],
  ['.cx4-dt span{font:400 13px/1.35 Poppins,sans-serif;color:#efe4da}', '.cx4-dt span{font:400 14px/1.35 Poppins,sans-serif;color:#6f6656}'],
  // corporativos no celular: a etiqueta sobre a foto (112 px) cobria a foto inteira com a letra de 14 px; no celular ela sai
  ['.cx4-kits .cx4-tag{font-size:9px;padding:4px 6px;top:6px;left:6px}', '.cx4-kits .cx4-tag{display:none}'],
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

// textos da campanha na origem (24/11): dez modulos ainda escreviam os textos do Esquenta Black e dois modulos (cml-extra#11 e cml-paginas#22) corrigiam esses textos na tela, em cadeia (20/11 -> 22/11 -> 30/11), com observador na pagina inteira. As mesmas trocas passam a ser feitas aqui, uma vez, no codigo de cada modulo; os dois corretores (e o cml-ui#7, que so enfeitava o titulo do Esquenta) saem pelo modulos.json
{ const R = [[/20\/11\/2026/g, '22/11/2026'], [/(at[eé]\s+)20\/11/gi, '$122/11'], [/20 de novembro/gi, '22 de novembro'],
    [/PREÇOS DE BLACK ANTES DA BLACK/g, 'OS MENORES PREÇOS DO ANO'], [/Preços de Black antes da Black/g, 'Os menores preços do ano'], [/antes da Black/g, 'até 30/11'], [/A Black da Chef começou antes\./g, 'A Black da Chef começou.'],
    [/O Esquenta Black chegou/g, 'A Black Friday chegou'], [/ESQUENTA BLACK/g, 'BLACKFRIDAY NA CHEF'], [/Esquenta Black/g, 'Black Friday'],
    [/Só até 22 de novembro/g, 'De 23 a 30 de novembro'], [/[Aa]té 22 de novembro/g, 'Até 30 de novembro'], [/22\/11\/2026/g, '30/11/2026'],
    [/SÓ ATÉ 22\/11/g, 'SÓ ATÉ 30/11'], [/[Ss]ó até 22\/11/g, 'só até 30/11'], [/ATÉ 22\/11/g, '23 A 30/11'], [/Até 22\/11/g, '23 a 30/11'], [/até 22\/11/g, 'até 30/11'],
    [/Combos com 15% off e 5% (de desconto )?no Pix, enquanto durar o estoque\./g, 'Os menores preços do ano em chás, kits e snacks. Live quinta, 26/11, às 20h.'],
    [/<h1 class="cbk-h1">Esquenta<b>Black<\/b><\/h1>/g, '<h1 class="cbk-h1">Black<b>Friday</b></h1>'],
    [/<p class="c1-ed">edição 2026<\/p><span class="c1-hand">esquenta<\/span>/g, '<p class="c1-ed">23 a 30 de novembro</p><span class="c1-hand">black</span>'], [/ c1-blk">Black<\/h2>/g, ' c1-blk">Friday</h2>'],
    [/<span class="hand">esquenta<\/span><p class="blk" role="heading" aria-level="1">Black<\/p>/g, '<span class="hand">black</span><p class="blk" role="heading" aria-level="1">Friday</p>']];
  const fora = new Set(JSON.parse(fs.readFileSync('modulos.json', 'utf8')).remover || []); let nt = 0; for (const m of mods) { if (fora.has(m.id)) continue; let c = m.code; for (const [a, b] of R) c = c.replace(a, b); if (c !== m.code) { m.code = c; nt++; } }
  console.log('textos da campanha na origem:', nt, 'modulos ajustados'); }
// minifica cada modulo (nomes locais curtos; nomes globais e de propriedades ficam como estao)
for (const m of mods) {
  let r; try { r = await terser(m.code, { ecma: 2019, compress: { passes: 2 }, mangle: { toplevel: false }, format: { comments: false } }); } catch (e) { const pos = e.pos || 0; throw new Error('modulo ' + m.id + ' nao compila: ' + e.message + ' perto de: ' + m.code.slice(Math.max(0, pos - 120), pos + 60)); }
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
  let txt = (g ? '' : ini + (PROF ? PROF_INI : '')) + monta(grupos[g], g ? 'comportamento (' + g + ')' : 'comportamento (nucleo)');
  // cantos na origem, parte 2: os estilos que ainda moram dentro do script (injetados na hora) tambem passam a declarar o canto final.
  // capsula (99px ou mais) vira 10; 17 a 98 vira 16; arco (capsula em cima com canto menor embaixo) vira 16; circulo (largura = altura na mesma regra) e % ficam.
  { let nc = 0; txt = txt.replace(/border-radius:(\s*)((?:[\d.]+(?:px)?)(?: [\d.]+(?:px)?){0,3})/g, (tudo, esp, val, pos) => {
      const ps = val.split(' ').map((x) => parseFloat(x)); const mx = Math.max(...ps); if (!(mx > 16)) return tudo;
      const ini2 = txt.lastIndexOf('{', pos), fim2 = txt.indexOf('}', pos); const corpo = ini2 >= 0 && fim2 > pos && pos - ini2 < 900 ? txt.slice(ini2, fim2) : '';
      const w = /(?:[;{])width:(\d+)px/.exec(corpo), h = /(?:[;{])height:(\d+)px/.exec(corpo); if (w && h && w[1] === h[1] && +w[1] <= 64) return tudo;
      const arco = ps.some((x) => x >= 99) && ps.some((x) => x > 0 && x < 99); const alvo = (x) => (x <= 16 ? x : (x >= 99 && !arco ? 10 : 16));
      nc++; return 'border-radius:' + esp + val.split(' ').map((x) => { const n = parseFloat(x); return n > 16 ? alvo(n) + 'px' : x; }).join(' ');
    }); if (!g) console.log('cantos no script:', nc, 'declaracoes ajustadas'); }
  // contraste, parte 2: texto em preto transparente abaixo de 70% (menos de 4,5:1 sobre o fundo claro) sobe para 70% tambem nos estilos que moram no script
  // letra minima, parte 2: textos de 10 a 13,5 px sobem para 14 px tambem nos estilos que moram no script (regra do site: nada abaixo de 14 px)
  { let nf = 0; txt = txt.replace(/font-size:\s*(9|9\.5|10|10\.5|11|11\.5|12|12\.5|13|13\.5)px/g, () => { nf++; return 'font-size:14px'; }).replace(/(font:[^;}"'`]*?[\s])(9|9\.5|10|10\.5|11|11\.5|12|12\.5|13|13\.5)px\//g, (m, p1) => { nf++; return p1 + '14px/'; }); if (!g) console.log('letra minima no script:', nf, 'textos ajustados'); }
  { let nt = 0; txt = txt.replace(/(^|[^-a-z])color:rgba\(43,41,22,\.(4|45|5|55|6|65)\)/g, (m, p1) => { nt++; return p1 + 'color:rgba(43,41,22,.7)'; }); if (!g) console.log('contraste no script:', nt, 'textos ajustados'); }
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
// faixa do topo: saem todas as camadas antigas (dez estilos empilhados, de campanhas diferentes, um por cima do outro). A faixa passa a ter uma regra unica, no ajustes.css
{ const postcss = (await import('postcss')).default; const root = postcss.parse(css); let nr = 0;
  root.walkRules((r) => { if (r.parent && r.parent.type === 'atrule' && /keyframes/.test(r.parent.name)) return; const fica = r.selectors.filter((sel) => !/\.adbar|\.cx5-bar/.test(sel)); if (!fica.length) { r.remove(); nr++; } else if (fica.length < r.selectors.length) { r.selectors = fica; nr++; } });
  root.walkAtRules((a) => { if (/media|supports/.test(a.name) && a.nodes && a.nodes.length === 0) a.remove(); });
  css = root.toString(); if (nr < 20) throw new Error('faixa do topo: esperava remover ao menos 20 regras, removeu ' + nr); console.log('faixa do topo: regras antigas removidas:', nr);
  const alt = '--announcements-height-negative:-29px'; if (css.split(alt).length < 2) throw new Error('faixa do topo: nao achou a altura usada pelo cabecalho fixo'); css = css.split(alt).join('--announcements-height-negative:-34px'); }
// perguntas frequentes nativas (v21): o visual era preso a classes que um script punha na secao (cml-faq) e na pergunta aberta (cml-open). Passa a valer para a secao nativa de perguntas e para o estado aberto que o proprio tema controla
{ const F = '[id^="ns-section-faq"]', AB = F + ' .accordion-item:has(>.js-accordion-private-content:not([style*="none"])) ';
  const n1 = css.split('.cml-faq .cml-open ').length - 1; css = css.split('.cml-faq .cml-open ').join(AB);
  const n2 = css.split('.cml-faq').length - 1; css = css.split('.cml-faq').join(F);
  if (n1 < 3 || n2 < 20 || css.includes('.cml-open')) throw new Error('perguntas frequentes: troca de seletores inesperada ' + n1 + ' ' + n2);
  console.log('perguntas frequentes: seletores nativos', n1, n2); }
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
// (a regra da barra que era desaninhada aqui saiu junto com as camadas antigas da faixa do topo)
// consultas presas ao html passam a olhar so os filhos diretos (o link canonico fica sempre no head; o body e filho do html): mesmo resultado, sem varrer a pagina inteira
for (const [de, para, min] of [[':has(link[rel=canonical]', ':has(>head>link[rel=canonical]', 5], [':has(body:is(.template-blog', ':has(>body:is(.template-blog', 1]]) { const n = cssFim.split(de).length - 1; if (n < min) throw new Error('consulta direta: esperava ao menos ' + min + ' de ' + de + ', achou ' + n); cssFim = cssFim.split(de).join(para); }
const hasVivo = hasVivas(cssFim);
if (hasVivo.length) throw new Error("site.css ficaria com :has() vivo (fora do alcance do reescritor):\n  " + [...new Set(hasVivo)].join("\n  "));
// cantos na origem: cada declaracao de canto listada em cantos-origem.json troca o valor declarado pelo valor final (10 botao/campo, 6 etiqueta, 16 cartao/foto); substitui o corretor por script
if (fs.existsSync('cantos-origem.json')) {
  const lista = JSON.parse(fs.readFileSync('cantos-origem.json', 'utf8')); const mapa = new Map(lista.map((x) => [x.s + '¦' + x.v + '¦' + x.n, x.t])); const usados = new Set(); const ord = new Map(); let fez = 0;
  const RE = /border(?:-(?:top|bottom)-(?:left|right))?-radius:([^;}]+)/g; let m, saida = '', pos = 0;
  while ((m = RE.exec(cssFim))) {
    const ob = cssFim.lastIndexOf('{', m.index); const st = Math.max(cssFim.lastIndexOf('}', ob), cssFim.lastIndexOf('{', ob - 1)) + 1; const sel = cssFim.slice(st, ob); const val = m[1];
    const ch = sel + '¦' + val; const n = ord.get(ch) || 0; ord.set(ch, n + 1); const t = mapa.get(ch + '¦' + n); if (!t) continue; usados.add(ch + '¦' + n);
    const T = +t; const novo = /%/.test(val) ? T + 'px' + (/!important/.test(val) ? '!important' : '') : val.replace(/([\d.]+)px/g, (x, a) => (+a > T ? T + 'px' : x));
    saida += cssFim.slice(pos, m.index) + m[0].slice(0, m[0].length - val.length) + novo; pos = m.index + m[0].length; fez++;
  }
  cssFim = saida + cssFim.slice(pos); console.log('cantos na origem:', fez, 'de', lista.length, 'trocas aplicadas');
}
// contraste: texto em preto transparente abaixo de 70% (menos de 4,5:1 sobre o fundo claro) sobe para 70% (#2b2916b3, 5,2:1); so a cor do texto, bordas e fundos ficam como estao
// letra minima: textos de 10 a 13,5 px sobem para 14 px (regra do site: nada abaixo de 14 px). Etiquetas e sobretitulos menores que 12 px ficam para revisao caso a caso
{ let nf = 0; cssFim = cssFim.replace(/font-size:\s*(9|9\.5|10|10\.5|11|11\.5|12|12\.5|13|13\.5)px/g, () => { nf++; return 'font-size:14px'; }).replace(/(font:[^;}]*?[\s])(9|9\.5|10|10\.5|11|11\.5|12|12\.5|13|13\.5)px\//g, (m, p1) => { nf++; return p1 + '14px/'; }); console.log('letra minima no estilo:', nf, 'textos ajustados'); }
{ let nt = 0; cssFim = cssFim.replace(/(^|[^-a-z])color:#2b2916(66|6b|73|80|8c|99|9e|a6)(?![0-9a-f])/g, (m, p1) => { nt++; return p1 + 'color:#2b2916b3'; }); console.log('contraste no estilo:', nt, 'textos ajustados'); }
fs.writeFileSync(OUT + '/site.css', '/* Chef Mais Leve: visual do site (v19, 23/11/2026). */\n' + cssFim);
console.log(COV ? '[cobertura] funcoes ' + nFn : '[producao]', '| modulos', mods.length, 'vivos', vivos.length, '| site.css', Math.round(cssMin.length / 1024) + 'KB |', Object.entries(tam).map(([k, v]) => k + ' ' + Math.round(v / 1024) + 'KB').join(', '));
