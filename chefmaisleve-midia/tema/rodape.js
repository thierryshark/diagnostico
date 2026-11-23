/* Chef Mais Leve: rodape compacto + cadastro de membro com nome, WhatsApp e e-mail (vai para o funil "membros" do sistema de gestao).
   Substitui o formulario nativo so de e-mail. 22/11/2026 */
(function(){
var d=document,URL_CAP='https://dzmlyrkzcdqicwfmxnxd.supabase.co/functions/v1/gestao-captura';
if(!d.getElementById('cml-rd-css')){var s=d.createElement('style');s.id='cml-rd-css';s.textContent=[
'#ns-block-newsletter .footer-newsletter-form{display:none!important}',
'.cml-nlf{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;margin-top:10px}',
'.cml-nlf input{width:100%;height:40px;padding:0 12px;border:1px solid rgba(246,239,233,.35);border-radius:10px;background:rgba(246,239,233,.08);color:#f6efe9;font:400 14px Poppins,sans-serif;outline:0}',
'.cml-nlf input::placeholder{color:rgba(246,239,233,.6)}',
'.cml-nlf input:focus{border-color:#dfae58}',
'.cml-nlf .em{grid-column:1/-1}',
'.cml-nlf .hp{position:absolute!important;left:-9999px!important;width:1px;height:1px}',
'.cml-nlf button{grid-column:1/-1;height:42px;border:0;border-radius:10px;background:#dfae58;color:#0b0a08;font:600 14px Poppins,sans-serif;cursor:pointer}',
'.cml-nlf button[disabled]{opacity:.6}',
'.cml-nlf small{grid-column:1/-1;font:400 11px/1.4 Poppins,sans-serif;color:rgba(246,239,233,.65)}',
'.cml-nlf .ok{grid-column:1/-1;font:500 14px/1.4 Poppins,sans-serif;color:#f3d48b}',
'@media(max-width:767px){',
'.c7-ft{gap:20px!important;padding:24px 18px!important}',
'.c7-fb a img{height:34px!important;width:auto!important}',
'.c7-fb h4{font-size:20px!important;margin:8px 0 0!important}',
'.c7-fb p{display:none!important}',
'.c7-fm{padding:16px!important}',
'.c7-fg{gap:10px 16px!important}',
'.c7-fc a{font-size:13.5px!important;line-height:1.3!important;padding:4px 0!important;min-height:0!important}',
'.c7-fc .c7-fe{margin-bottom:4px!important}',
'.c7-fp{gap:6px!important;flex-wrap:wrap}',
'}'
].join('');(d.head||d.documentElement).appendChild(s);}
function so(v){return String(v||'').replace(/\D/g,'').slice(0,13)}
function go(){
 var nl=d.getElementById('ns-block-newsletter');if(!nl)return false;
 if(nl.querySelector('.cml-nlf'))return true;
 var nat=nl.querySelector('form.footer-newsletter-form');
 var f=d.createElement('form');f.className='cml-nlf';f.noValidate=true;
 f.innerHTML='<input name="nome" autocomplete="given-name" placeholder="Seu nome" required>'
  +'<input name="whatsapp" type="tel" inputmode="tel" autocomplete="tel" placeholder="WhatsApp">'
  +'<input class="em" name="email" type="email" autocomplete="email" placeholder="Seu e-mail" required>'
  +'<input class="hp" name="site" tabindex="-1" autocomplete="off" aria-hidden="true">'
  +'<button type="submit">Quero ser membro</button>'
  +'<small>Novidades e lançamentos por e-mail e WhatsApp. Você pode sair quando quiser.</small>';
 (nat&&nat.parentNode||nl).insertBefore(f,nat||null);
 f.addEventListener('submit',function(e){
  e.preventDefault();
  var nome=f.nome.value.trim(),email=f.email.value.trim().toLowerCase(),wa=so(f.whatsapp.value);
  if(!nome){f.nome.focus();return}
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){f.email.focus();return}
  var b=f.querySelector('button');b.disabled=true;b.textContent='Enviando...';
  fetch(URL_CAP,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({funil:'membros',nome:nome,email:email,whatsapp:wa,origem:'rodape do site',consentimento:true,pagina:location.pathname,site:f.site.value})})
   .then(function(r){return r.json()}).then(function(j){
    if(!j||!j.ok)throw 0;
    try{if(nat){var ni=nat.querySelector('input[type=email],input[name*=mail]');if(ni){ni.value=email;var fd=new FormData(nat);fetch(nat.action||location.href,{method:'POST',body:fd,credentials:'same-origin'}).catch(function(){})}}}catch(x){}
    f.innerHTML='<p class="ok">Pronto, '+nome.split(' ')[0].replace(/[<>&"]/g,'')+'! Você já é membro da Chef.</p>';
   }).catch(function(){b.disabled=false;b.textContent='Tentar de novo'});
 });
 return true;
}
var n=0;(function t(){var ok=false;try{ok=go()}catch(e){ok=true}if(!ok&&++n<40)setTimeout(t,200)})();
})();
