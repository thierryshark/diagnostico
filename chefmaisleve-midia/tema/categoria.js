/* Chef Mais Leve: vitrines (categorias), 22/11/2026.
   Fica uma fileira de subcategorias (nav.c2-chips, que ja existe) e, no celular, um botao Filtrar que abre o painel de filtros por baixo.
   Saiu a barra antiga (cml-cbar: pilulas de categorias irmas + faixa de precos), que vinha do pacote extras. */
(function(){
var d=document,N=':not(#b1):not(#b2):not(#b3):not(#b4):not(#b5):not(#b6):not(#b7):not(#b8):not(#b9):not(#b10):not(#b11):not(#b12)';
if(!d.getElementById('cml-cat-css')){var s=d.createElement('style');s.id='cml-cat-css';s.textContent=[
'#cml-cbar,.cml-cbar{display:none!important}',
'aside.c2-side .cml-tree li:has(>.r>a[href$="/account/"]){display:none!important}',
'@media(min-width:768px){',
'.cx3-bar{display:flex!important;align-items:center;gap:16px}',
'.cx3-bar>.product-list-sort-by{margin:0 0 0 auto!important;padding:0!important;text-align:right}',
'.cx3-bar>.product-list-sort-by .form-group{display:flex;align-items:center;gap:10px;margin:0!important}',
'.cx3-bar>.product-list-sort-by .form-label{margin:0!important;font:500 13px/1 Poppins,sans-serif;color:#6f6656}',
'.cx3-bar>.product-list-sort-by select,.cx3-bar>.product-list-sort-by .form-select{height:36px!important;min-height:0!important;padding:0 32px 0 12px!important;border-radius:10px!important;font:500 13px Poppins,sans-serif!important}',
'}',
'@media(max-width:767px){',
'.c2-cbn .c2-cbt{padding:16px 18px!important;min-height:0!important}',
'.c2-cbn .c2-cbt h1,.c2-cbn .c2-cbt h2{font-size:24px!important;line-height:1.15!important;margin:4px 0 0!important}',
'.c2-cbn .c2-cbt p:not(.k){display:none!important}',
'.c2-cbn{min-height:0!important;margin-bottom:12px!important}',
'.cx3-bar{display:none!important}',
'.cml-trow{display:flex;align-items:center;gap:10px;margin:0 0 12px}',
'.cml-trow>nav.c2-chips{flex:1 1 auto;min-width:0;margin:0!important}',
'.cml-fbtn{flex:none;display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 11px;border:1px solid #d9c9b5;border-radius:10px;background:#fffaf5;font:500 13px/1 Poppins,sans-serif;color:#2b2916}',
'body.cml-fo aside.c2-side'+N+'{display:block!important;position:fixed!important;left:0!important;right:0!important;bottom:0!important;top:auto!important;z-index:1001!important;width:auto!important;max-width:none!important;max-height:72vh!important;overflow:auto!important;margin:0!important;background:#fffaf5!important;border-radius:16px 16px 0 0!important;padding:18px 18px 28px!important;box-shadow:0 -20px 40px -16px rgba(43,41,22,.45)!important}',
'.cml-fbk{display:none}body.cml-fo .cml-fbk{display:block;position:fixed;inset:0;z-index:1000;background:rgba(43,41,22,.35)}',
'}'
].join('');(d.head||d.documentElement).appendChild(s);}
function go(){
 if(!d.body||!d.body.classList.contains('template-category'))return true;
 if(window.innerWidth>=768){
  var bar=d.querySelector('.cx3-bar'),so=d.querySelector('.product-list-sort-by');
  if(!bar)return false;
  if(so&&so.parentNode!==bar){var vw=bar.querySelector('.cx3-view');bar.insertBefore(so,vw||null)}
  return true;
 }
 if(d.querySelector('.cml-fbtn'))return true;
 var nav=d.querySelector('nav.c2-chips'),side=d.querySelector('aside.c2-side');
 if(!nav||!side)return false;
 var row=d.createElement('div');row.className='cml-trow';nav.parentNode.insertBefore(row,nav);row.appendChild(nav);
 var fb=d.createElement('button');fb.type='button';fb.className='cml-fbtn';fb.innerHTML='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>Filtrar';row.appendChild(fb);
 var bk=d.createElement('div');bk.className='cml-fbk';d.body.appendChild(bk);
 fb.onclick=function(){d.body.classList.add('cml-fo')};bk.onclick=function(){d.body.classList.remove('cml-fo')};
 return true;
}
var n=0;(function t(){var ok=false;try{ok=go()}catch(e){ok=true}if(!ok&&++n<40)setTimeout(t,150)})();
})();
