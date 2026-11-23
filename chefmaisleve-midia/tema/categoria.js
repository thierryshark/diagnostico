/* Chef Mais Leve: cabecalho das vitrines (categorias). Uma fileira de subcategorias + botao Filtrar no celular.
   Substitui a barra antiga (cml-cbar de pilulas + faixa de precos), que vinha do pacote extras. 22/11/2026 */
(function(){
var d=document;
if(!d.getElementById('cml-cat-css')){var s=d.createElement('style');s.id='cml-cat-css';s.textContent=[
'.cml-tabs{display:flex;gap:22px;overflow-x:auto;scrollbar-width:none;margin:0 0 14px;padding:0;border-bottom:1px solid #e8ddd0}',
'.cml-tabs::-webkit-scrollbar{display:none}',
'.cml-tabs a{flex:none;padding:10px 0 9px;margin-bottom:-1px;font:500 14px/1.2 Poppins,sans-serif;color:#6f6656!important;text-decoration:none!important;border-bottom:2px solid transparent;white-space:nowrap}',
'.cml-tabs a.on{color:#2b2916!important;border-color:#565229}',
'#cml-cbar,.cml-cbar{display:none!important}',
'@media(max-width:767px){',
'.c2-cbn .c2-cbt{padding:16px 18px!important;min-height:0!important}',
'.c2-cbn .c2-cbt h1,.c2-cbn .c2-cbt h2{font-size:24px!important;line-height:1.15!important;margin:4px 0 0!important}',
'.c2-cbn .c2-cbt p:not(.k){display:none!important}',
'.c2-cbn{min-height:0!important;margin-bottom:14px!important}',
'.cml-tabs{margin:0 -12px 10px;padding:0 12px;gap:18px}',
'.cml-tabs a{font-size:13.5px}',
'.cx3-view{display:none!important}',
'.cx3-bar{display:flex!important;justify-content:flex-end;margin:0 0 10px!important;padding:0!important;border:0!important;min-height:0!important}',
'.cx3-bar .cx3-fbtn{display:inline-flex!important;align-items:center;gap:6px;height:34px;padding:0 12px;border:1px solid #d9c9b5;border-radius:10px;background:#fffaf5;font:500 13px/1 Poppins,sans-serif;color:#2b2916}',
'.cml-cgrid:not(.cx3-closed) aside.c2-side{display:block!important;position:fixed!important;left:0;right:0;bottom:0;top:auto;z-index:1000;width:auto!important;max-height:72vh;overflow:auto;margin:0!important;background:#fffaf5;border-radius:16px 16px 0 0;padding:18px 18px 28px!important;box-shadow:0 -20px 40px -16px rgba(43,41,22,.45)}',
'}'
].join('');(d.head||d.documentElement).appendChild(s);}
function txt(a){return a.textContent.replace(/\s+/g,' ').replace(/\s*\d+\s*$/,'').trim()}
function dep(h){return h.split('/').length-2}
function tabs(){
 if(!d.body||!d.body.classList.contains('template-category'))return true;
 if(d.getElementById('cml-tabs'))return true;
 var tbl=d.querySelector('.js-product-table'),side=d.querySelector('aside.c2-side');
 if(!tbl||!side)return false;
 var p=location.pathname.replace(/\/?$/,'/'),all={},order=[];
 [].forEach.call(side.querySelectorAll('a[href]'),function(a){var h=a.pathname.replace(/\/?$/,'/');var t=txt(a);if(t&&!all[h]&&/^\/[a-z0-9-]+\/([a-z0-9-]+\/)*$/.test(h)){all[h]=t;order.push(h)}});
 var base=p,kids=order.filter(function(h){return h!==p&&h.indexOf(p)===0&&dep(h)===dep(p)+1});
 if(!kids.length&&dep(p)>1){base=p.split('/').slice(0,-2).join('/')+'/';kids=order.filter(function(h){return h.indexOf(base)===0&&dep(h)===dep(base)+1})}
 if(!kids.length)return true;
 var nav=d.createElement('nav');nav.id='cml-tabs';nav.className='cml-tabs';nav.setAttribute('aria-label','Subcategorias');
 nav.innerHTML='<a href="'+base+'"'+(base===p?' class="on"':'')+'>Todos</a>'+kids.map(function(h){return '<a href="'+h+'"'+(h===p?' class="on"':'')+'>'+all[h]+'</a>'}).join('');
 var bar=d.querySelector('.cx3-bar'),host=bar||tbl;host.parentNode.insertBefore(nav,host);
 var on=nav.querySelector('a.on');if(on&&on!==nav.firstChild)nav.scrollLeft=on.offsetLeft-12;
 var fb=d.querySelector('.cx3-fbtn');if(fb&&window.innerWidth<768)fb.innerHTML='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>Filtrar';
 return true;
}
var n=0;(function t(){var ok=false;try{ok=tabs()}catch(e){ok=true}if(!ok&&++n<40)setTimeout(t,150)})();
})();
