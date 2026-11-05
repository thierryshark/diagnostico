/* CML TEMA MATA v1: Esquenta Black com texturas de mata, motivos desenhados e titulos mais finos. So age com html.cml-blk (todas as paginas menos o Monte seu presente). Para desligar: TEMA_ON=false. */
(function(){try{
var TEMA_ON=true;if(!TEMA_ON)return;
var A='https://cdn.jsdelivr.net/gh/thierryshark/diagnostico@3981a9bf18ab33b039517745e734b133cad87c07/chefmaisleve-midia/tema/';
var css='html.cml-blk body{background-image:url('+A+'ervas.png),radial-gradient(70% 50% at 50% 0%,rgba(52,70,44,.22),rgba(0,0,0,0) 70%)!important;background-size:420px 420px,100% 1400px!important;background-repeat:repeat,no-repeat!important}'
+'html.cml-blk .cml-mt{background-image:url('+A+'ervas.png)!important;background-size:420px 420px!important;background-repeat:repeat!important}'
/* titulos mais finos */
+'html.cml-blk body h1,html.cml-blk body h2,html.cml-blk body h3,html.cml-blk body .h1,html.cml-blk body .h2,html.cml-blk body .section-title,html.cml-blk body .js-product-name{font-weight:600!important;letter-spacing:-.005em}'
+'html.cml-blk body h1 em,html.cml-blk body h2 em,html.cml-blk body h3 em,html.cml-blk body h1 i,html.cml-blk body h2 i,html.cml-blk body h3 i{font-weight:300!important}'
+'html.cml-blk #cml-bko .c1-blk{font-weight:600!important;letter-spacing:-.01em!important;position:relative}'
/* topo: ramos, vagalumes e brilho no dourado */
+'html.cml-blk #cml-bko .esq-emb{display:none!important}'
+'#cml-bko .cmt-ramo{position:absolute;top:-40px;width:min(520px,40vw);aspect-ratio:1400/900;background:url('+A+'ramos.webp) center/contain no-repeat;opacity:.45;pointer-events:none;z-index:1;transform-origin:50% 0;animation:cmtSway 9s ease-in-out infinite alternate}'
+'#cml-bko .cmt-ramo.l{left:-90px}#cml-bko .cmt-ramo.r{right:-90px;transform:scaleX(-1);animation-name:cmtSwayR}'
+'@keyframes cmtSway{0%{transform:rotate(-2deg)}100%{transform:rotate(2deg)}}@keyframes cmtSwayR{0%{transform:scaleX(-1) rotate(-2deg)}100%{transform:scaleX(-1) rotate(2deg)}}'
+'#cml-bko .cmt-vg{position:absolute;width:5px;height:5px;border-radius:50%;background:radial-gradient(circle,#f6ffd0,#d9e88a 45%,rgba(200,220,120,0) 75%);box-shadow:0 0 10px 3px rgba(210,230,140,.35);opacity:0;pointer-events:none;z-index:1;animation:cmtVoa 11s ease-in-out infinite,cmtPisca 4.4s ease-in-out infinite}'
+'@keyframes cmtVoa{0%{transform:translate(0,0)}33%{transform:translate(18px,-30px)}66%{transform:translate(-12px,-60px)}100%{transform:translate(6px,-10px)}}@keyframes cmtPisca{0%,100%{opacity:0}25%{opacity:.85}50%{opacity:.2}75%{opacity:.75}}'
+'#cml-bko .c1-blk[data-cmt]::after{content:attr(data-cmt);position:absolute;inset:0;background-image:linear-gradient(105deg,rgba(255,255,255,0) 38%,rgba(255,240,205,.8) 50%,rgba(255,255,255,0) 62%);background-size:300% 100%;background-repeat:no-repeat;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;pointer-events:none;animation:cmtBrilho 7s ease-in-out infinite}'
+'@keyframes cmtBrilho{0%,55%{background-position:120% 0}85%,100%{background-position:-20% 0}}'
+'#cml-bko .in{position:relative;z-index:2}'
+'@media(max-width:640px){#cml-bko .cmt-ramo{width:240px;top:-20px;opacity:.32}#cml-bko .cmt-ramo.l{left:-80px}#cml-bko .cmt-ramo.r{right:-80px}}'
/* motivo do ingrediente na pagina de produto */
+'html.cml-blk body.template-product #ns-block-product_info.cmt-mot{position:relative;isolation:isolate}'
+'html.cml-blk body.template-product #ns-block-product_info.cmt-mot::before{content:"";position:absolute;inset:-10px -20px auto auto;width:min(560px,100%);height:560px;background:var(--cmt-mot) top right/contain no-repeat;opacity:.13;pointer-events:none;z-index:-1}'
+'@media(max-width:640px){html.cml-blk body.template-product #ns-block-product_info.cmt-mot::before{width:300px;height:300px;inset:0 -10px auto auto;opacity:.11}}'
+'@media (prefers-reduced-motion:reduce){#cml-bko .cmt-ramo,#cml-bko .cmt-vg,#cml-bko .c1-blk[data-cmt]::after{animation:none}#cml-bko .cmt-vg{opacity:.5}}';
var st=document.createElement('style');st.id='cml-tema-mata';st.textContent=css;(document.head||document.documentElement).appendChild(st);
function topo(){var s=document.getElementById('cml-bko');if(!s||s.querySelector('.cmt-ramo'))return !!s;
 if(getComputedStyle(s).position==='static')s.style.position='relative';s.style.overflow='hidden';
 var f=document.createDocumentFragment(),r1=document.createElement('div'),r2=document.createElement('div');r1.className='cmt-ramo l';r2.className='cmt-ramo r';f.appendChild(r1);f.appendChild(r2);
 [[8,38],[14,62],[21,28],[27,52],[73,34],[80,58],[87,26],[92,48],[6,74],[95,70]].forEach(function(p,i){var v=document.createElement('span');v.className='cmt-vg';v.style.left=p[0]+'%';v.style.top=p[1]+'%';v.style.animationDelay='-'+((i*1.7)%9).toFixed(1)+'s,-'+((i*1.1)%4).toFixed(1)+'s';f.appendChild(v)});
 s.insertBefore(f,s.firstChild);var b=s.querySelector('.c1-blk');if(b)b.setAttribute('data-cmt',b.textContent.trim());return true}
var MOT=[[/serenissimo|maturidade|calendula|flowers|delicadeza|ciclo|estetica/,'floral'],[/imuny|quentao/,'especiarias'],[/performance|sport|maternidade|materna|gestacao|lactacao|capsulasdecha|pu-?erh|matcha/,'folhas'],[/intenso|durex|frutas-vermelhas|blueberry/,'frutas-vermelhas'],[/tangerina|laranja|rose/,'citricos'],[/maca/,'maca'],[/abacaxi/,'abacaxi'],[/capim/,'capim-limao'],[/uva/,'uva'],[/granola-salgada/,'granola-salgada'],[/granola-doce/,'granola-doce'],[/lowcarb|low-carb/,'granola-lowcarb'],[/granola-crocante|choconuts/,'choconuts'],[/natal/,'natal']];
function produto(){if(!document.body||!document.body.classList.contains('template-product'))return;var pi=document.getElementById('ns-block-product_info');if(!pi||pi.classList.contains('cmt-mot'))return;
 var h=(location.pathname.split('/produtos/')[1]||'').toLowerCase();for(var i=0;i<MOT.length;i++){if(MOT[i][0].test(h)){pi.style.setProperty('--cmt-mot','url('+A+MOT[i][1]+'-escuro.svg)');pi.classList.add('cmt-mot');return}}}
function mata(){var els=document.querySelectorAll('body section, body footer, body main>div, body .footer-content');for(var i=0;i<els.length;i++){var e=els[i];if(e.classList.contains('cml-mt')||e.offsetHeight<220||e.offsetWidth<Math.min(600,innerWidth*.85))continue;var c=getComputedStyle(e);if(c.backgroundImage!=='none')continue;var m=c.backgroundColor.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);if(!m)continue;if(m[4]!==undefined&&+m[4]<.9)continue;if(+m[1]<40&&+m[2]<40&&+m[3]<40)e.classList.add('cml-mt')}}
function run(){if(!document.documentElement.classList.contains('cml-blk'))return;try{topo()}catch(e){}try{produto()}catch(e){}try{mata()}catch(e){}}
[300,1200,2800,6000].forEach(function(t){setTimeout(run,t)});
}catch(e){}})();
