/* Chef Mais Leve: menu "Seu espaco" (topo e menu do celular) e cards da home compactos no celular */
(function(){
var d=document;
if(!d.getElementById('cml-se-css')){var st=d.createElement('style');st.id='cml-se-css';st.textContent=[
'#cml-se{position:relative}#cml-se>a{display:inline-flex;align-items:center;gap:7px}',
'.cml-se-v{display:inline-block;width:6px;height:6px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;transform:translateY(-2px) rotate(45deg)}',
'#cml-se .cml-se-p{position:absolute;top:100%;right:-8px;padding-top:12px;display:none;z-index:60}',
'#cml-se:hover .cml-se-p,#cml-se:focus-within .cml-se-p{display:block}',
'.cml-se-b{width:300px;padding:8px;background:#fffaf5;border:1px solid #e8ddd0;border-radius:14px;box-shadow:0 18px 40px -24px rgba(43,41,22,.55)}',
'a.cml-se-i{display:block!important;padding:10px 12px!important;border-radius:10px;text-decoration:none!important;color:#2b2916!important;text-transform:none!important;background:none!important;border:0!important;min-height:0!important}',
'a.cml-se-i:before,a.cml-se-i:after{display:none!important}',
'a.cml-se-i:hover{background:#f6efe9!important}',
'.cml-se-i b{display:block;font:500 14px/1.3 Poppins,sans-serif}',
'.cml-se-i small{display:block;margin-top:2px;font:400 12px/1.3 Poppins,sans-serif;color:#6f6656}',
'#cml-se-m summary{position:relative;list-style:none;cursor:pointer}#cml-se-m summary::-webkit-details-marker{display:none}',
'#cml-se-m summary:after{content:"+";position:absolute;right:16px;top:50%;transform:translateY(-50%);font:400 20px/1 Poppins,sans-serif;color:#a65a14}',
'#cml-se-m details[open] summary:after{content:"−"}#cml-se-m .cml-se-mb{padding:6px 2px 2px}',
'@media(max-width:640px){#cml-hl .cml-hl-g{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}',
'#cml-hl .cml-hl-c{position:relative;min-height:0!important;padding:14px 14px 16px!important;border-radius:14px!important}',
'#cml-hl .cml-hl-c .k{display:block;font-size:9.5px!important;letter-spacing:.14em!important;margin:0 0 6px!important}',
'#cml-hl .cml-hl-c h3,#cml-hl .cml-hl-c h3 *{font-size:16px!important;line-height:1.22!important}#cml-hl .cml-hl-c h3{margin:0!important;padding:0!important}',
'#cml-hl .cml-hl-c p,#cml-hl .cml-hl-c .ar{display:none!important}',
'#cml-hl .cml-hl-c .nv{position:static!important;display:inline-block!important;width:max-content!important;margin:0 0 6px!important;font-size:9px!important;padding:3px 7px!important}}'
].join('');d.head.appendChild(st);}
var L=[['Encontre seu chá','/encontre-seu-cha/','Em 1 minuto'],['Monte seu presente','/presentes-de-natal/','Família e empresas'],['Clube Chef','/clube-chef/','Assinatura mensal'],['Rastrear pedido','/account/','Na sua conta'],['Como funciona o cashback','/politica-de-cashback/','5% de volta em cada compra']];
function H(){return L.map(function(x){return '<a class="cml-se-i" href="'+x[1]+'"><b>'+x[0]+'</b><small>'+x[2]+'</small></a>'}).join('')}
function go(){
 var ul=d.querySelector('.js-nav-desktop-list');
 if(ul&&!d.getElementById('cml-se')){var li=d.createElement('li');li.id='cml-se';li.className='nav-item nav-main-item cml-se';li.innerHTML='<a class="nav-list-link" href="/account/">Seu espaço<i class="cml-se-v"></i></a><div class="cml-se-p"><div class="cml-se-b">'+H()+'</div></div>';ul.appendChild(li)}
 var hb=d.querySelector('#nav-hamburger .nav-list');
 if(hb&&!d.getElementById('cml-se-m')){var m=d.createElement('li');m.id='cml-se-m';m.className='nav-item cml-se-m';m.innerHTML='<details><summary class="nav-list-link">Seu espaço</summary><div class="cml-se-mb">'+H()+'</div></details>';hb.appendChild(m)}
 return !!(d.getElementById('cml-se')&&d.getElementById('cml-se-m'));
}
var n=0;(function t(){var ok=false;try{ok=go()}catch(e){}if(!ok&&++n<40)setTimeout(t,250)})();
})();
