/* Chef Mais Leve: "Seu espaco" como mais uma categoria do menu (topo do computador; no celular o menu ja tem Para voce agora e Sua conta) + cards da home compactos no celular */
(function(){
var d=document;
if(!d.getElementById('cml-se-css')){var st=d.createElement('style');st.id='cml-se-css';st.textContent=[
'#cml-se aside.cml-mm-side{display:none!important}#cml-se .desktop-dropdown-container{flex-wrap:nowrap!important}',
'#cml-se .cml-se-side{flex:0 0 280px;display:block;padding:10px 10px 16px;border-radius:16px;background:#f6efe9;border:1px solid #e8ddd0}',
'#cml-se .cml-se-side img{display:block;width:100%;height:150px;object-fit:cover;border-radius:12px}',
'#cml-se .cml-se-side div{padding:12px 6px 0}',
'#cml-se .cml-se-side .k{display:block;font:600 10px/1 Poppins,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#a65a14}',
'#cml-se .cml-se-side b{display:block;margin-top:8px;font:700 18px/1.2 Poppins,sans-serif;color:#2b2916}#cml-se .cml-se-side b em{font-weight:300}',
'#cml-se .cml-se-side a{display:inline-block;margin-top:10px;font:500 13px/1 Poppins,sans-serif;color:#2b2916!important;border-bottom:1px solid #dfae58;padding-bottom:3px}',
'@media(max-width:640px){#cml-hl .cml-hl-g{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}',
'#cml-hl .cml-hl-c{position:relative;min-height:0!important;padding:14px 14px 16px!important;border-radius:14px!important}',
'#cml-hl .cml-hl-c .k{display:block;font-size:9.5px!important;letter-spacing:.14em!important;margin:0 0 6px!important}',
'#cml-hl .cml-hl-c h3,#cml-hl .cml-hl-c h3 *{font-size:16px!important;line-height:1.22!important}#cml-hl .cml-hl-c h3{margin:0!important;padding:0!important}',
'#cml-hl .cml-hl-c p,#cml-hl .cml-hl-c .ar{display:none!important}',
'#cml-hl .cml-hl-c .nv{position:static!important;display:inline-block!important;width:max-content!important;margin:0 0 6px!important;font-size:9px!important;padding:3px 7px!important}}'
].join('');d.head.appendChild(st);}
var G=[
 ['Descubra',[['Encontre seu chá','/encontre-seu-cha/'],['Monte seu presente','/presentes-de-natal/'],['Clube Chef','/clube-chef/']]],
 ['Sua conta',[['Rastrear pedido','/account/'],['Como funciona o cashback','/politica-de-cashback/']]],
 ['Conteúdo',[['Blog','/blog/']]]
];
var IMG='https://acdn-us.mitiendanube.com/stores/005/060/752/products/aa99458c07b0c03fc664783c439ea3f6-a139cfddb7d8f2170717849861066454-640-0.webp';
function desk(ul){
 var li=d.createElement('li');li.id='cml-se';li.className='nav-item nav-main-item nav-dropdown';
 var cols=G.map(function(g){return '<li class="nav-item"><span class="nav-list-link nav-list-link-heading">'+g[0]+'</span><ul class="list-subitems list-unstyled">'+g[1].map(function(x){return '<li class="nav-item"><a class="nav-list-link" href="'+x[1]+'">'+x[0]+'</a></li>'}).join('')+'</ul></li>'}).join('');
 li.innerHTML='<a class="nav-list-link" href="/encontre-seu-cha/">Seu espaço <svg class="nav-list-link-icon icon-inline"><use xlink:href="#chevron"></use></svg></a>'
  +'<div class="js-desktop-dropdown nav-dropdown-content desktop-dropdown"><div class="container desktop-dropdown-container"><ul class="desktop-list-subitems list-unstyled">'+cols+'</ul>'
  +'<div class="cml-se-side"><img src="'+IMG+'" alt="Chá misto da Chef Mais Leve" loading="lazy" width="280" height="150"><div><span class="k">Em 1 minuto</span><b>Encontre <em>o seu chá</em></b><a href="/encontre-seu-cha/">Começar →</a></div></div></div></div>';
 ul.appendChild(li);
}
function go(){
 var ul=d.querySelector('.js-nav-desktop-list');if(ul&&!d.getElementById('cml-se'))desk(ul);
 return !!d.getElementById('cml-se');
}
var n=0;(function t(){var ok=false;try{ok=go()}catch(e){}if(!ok&&++n<40)setTimeout(t,250)})();
})();
