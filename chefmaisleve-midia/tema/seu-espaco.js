/* Chef Mais Leve: "Seu espaco" como mais uma categoria do menu (topo e celular) + cards da home compactos no celular */
(function(){
var d=document;
if(!d.getElementById('cml-se-css')){var st=d.createElement('style');st.id='cml-se-css';st.textContent=[
'#cml-se .cml-se-side{flex:0 0 300px;display:grid;grid-template-columns:110px minmax(0,1fr);gap:16px;align-items:center;padding:14px;border-radius:16px;background:#f6efe9;border:1px solid #e8ddd0}',
'#cml-se .cml-se-side img{display:block;width:110px;height:110px;object-fit:cover;border-radius:12px}',
'#cml-se .cml-se-side .k{display:block;font:600 10px/1 Poppins,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#a65a14}',
'#cml-se .cml-se-side b{display:block;margin-top:8px;font:700 17px/1.2 Poppins,sans-serif;color:#2b2916}#cml-se .cml-se-side b em{font-weight:300}',
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
  +'<div class="cml-se-side"><img src="'+IMG+'" alt="Chá misto da Chef Mais Leve" loading="lazy" width="110" height="110"><div><span class="k">Em 1 minuto</span><b>Encontre <em>o seu chá</em></b><a href="/encontre-seu-cha/">Começar →</a></div></div></div></div>';
 ul.appendChild(li);
}
function mob(hb){
 var src=[].slice.call(hb.children).filter(function(c){return c.classList.contains('item-with-subitems')})[0];
 var m;
 if(src){
  m=src.cloneNode(true);m.id='cml-se-m';
  var modal=m.querySelector('.js-modal-private');var old=modal.id;var nid='nav-panel-cml-se';modal.id=nid;
  [].forEach.call(m.querySelectorAll('[data-target="#'+old+'"]'),function(b){b.setAttribute('data-target','#'+nid)});
  var btn=m.querySelector(':scope>button');[].forEach.call(btn.childNodes,function(n){if(n.nodeType===3&&n.textContent.trim())n.textContent='Seu espaço '});
  if(!/Seu espa/.test(btn.textContent))btn.insertBefore(d.createTextNode('Seu espaço '),btn.firstChild);
  var tt=modal.querySelector('.modal-title');if(tt)tt.textContent='Seu espaço';
  var body=modal.querySelector('.modal-body');
  body.innerHTML=G.map(function(g){return g[1].map(function(x){return '<div class="nav-item"><a class="nav-list-link" href="'+x[1]+'">'+x[0]+'</a></div>'}).join('')}).join('');
 }else{
  m=d.createElement('div');m.id='cml-se-m';m.className='nav-item';m.innerHTML='<a class="nav-list-link" href="/encontre-seu-cha/">Seu espaço</a>';
 }
 hb.appendChild(m);
}
function go(){
 var ul=d.querySelector('.js-nav-desktop-list');if(ul&&!d.getElementById('cml-se'))desk(ul);
 var hb=d.querySelector('#nav-hamburger .nav-list');if(hb&&hb.children.length&&!d.getElementById('cml-se-m'))mob(hb);
 return !!(d.getElementById('cml-se')&&d.getElementById('cml-se-m'));
}
var n=0;(function t(){var ok=false;try{ok=go()}catch(e){}if(!ok&&++n<40)setTimeout(t,250)})();
})();
