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
'.cx3-bar{display:none!important}',
'.cml-trow{display:flex;align-items:center;gap:10px;margin:0 -12px 10px;padding:0 12px;border-bottom:1px solid #e8ddd0}',
'.cml-trow .cml-tabs{flex:1 1 auto;min-width:0;margin:0;padding:0;border:0}',
'.cml-fbtn{flex:none;display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 11px;border:1px solid #d9c9b5;border-radius:10px;background:#fffaf5;font:500 13px/1 Poppins,sans-serif;color:#2b2916}',
'body.cml-fo aside.c2-side{display:block!important;position:fixed!important;left:0;right:0;bottom:0;top:auto!important;z-index:1001;width:auto!important;max-width:none!important;max-height:72vh;overflow:auto;margin:0!important;background:#fffaf5;border-radius:16px 16px 0 0;padding:18px 18px 28px!important;box-shadow:0 -20px 40px -16px rgba(43,41,22,.45)}',
'.cml-fbk{display:none}body.cml-fo .cml-fbk{display:block;position:fixed;inset:0;z-index:1000;background:rgba(43,41,22,.35)}',
'}'
].join('');(d.head||d.documentElement).appendChild(s);}
function txt(a){return a.textContent.replace(/\s+/g,' ').replace(/\s*\d+\s*$/,'').trim()}
function tabs(){
 if(!d.body||!d.body.classList.contains('template-category'))return true;
 if(d.getElementById('cml-tabs'))return true;
 var tbl=d.querySelector('.js-product-table'),side=d.querySelector('aside.c2-side');
 if(!tbl||!side)return false;
 var p=location.pathname.replace(/\/?$/,'/');
 function hp(a){return a.pathname.replace(/\/?$/,'/')}
 var cur=[].filter.call(side.querySelectorAll('.cml-tree li > .r > a[href]'),function(a){return hp(a)===p&&a.getAttribute('href').indexOf('?')<0})[0];
 if(!cur)return true;
 var li=cur.closest('li'),list=null,base=null;
 var sub=li.querySelector(':scope > ul');
 if(sub&&sub.children.length){list=sub;base=cur}
 else{var pl=li.parentElement&&li.parentElement.closest('li');if(pl){list=li.parentElement;base=pl.querySelector(':scope > .r > a')}}
 if(!list||!base)return true;
 var kids=[].map.call(list.querySelectorAll(':scope > li > .r > a[href]'),function(a){return [hp(a),txt(a)]});
 if(!kids.length)return true;
 var bp=hp(base);
 var nav=d.createElement('nav');nav.id='cml-tabs';nav.className='cml-tabs';nav.setAttribute('aria-label','Subcategorias');
 nav.innerHTML='<a href="'+bp+'"'+(bp===p?' class="on"':'')+'>Todos</a>'+kids.map(function(k){return '<a href="'+k[0]+'"'+(k[0]===p?' class="on"':'')+'>'+k[1]+'</a>'}).join('');
 var bar=d.querySelector('.cx3-bar'),host=bar||tbl;host.parentNode.insertBefore(nav,host);
 var on=nav.querySelector('a.on');if(on&&on!==nav.firstChild)nav.scrollLeft=on.offsetLeft-12;
 if(window.innerWidth<768){
  var row=d.createElement('div');row.className='cml-trow';nav.parentNode.insertBefore(row,nav);row.appendChild(nav);
  var fb=d.createElement('button');fb.type='button';fb.className='cml-fbtn';fb.innerHTML='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>Filtrar';row.appendChild(fb);
  var bk=d.createElement('div');bk.className='cml-fbk';d.body.appendChild(bk);
  fb.onclick=function(){d.body.classList.add('cml-fo')};bk.onclick=function(){d.body.classList.remove('cml-fo')};
 }
 return true;
}
var n=0;(function t(){var ok=false;try{ok=tabs()}catch(e){ok=true}if(!ok&&++n<40)setTimeout(t,150)})();
})();
