await new Promise(r=>setTimeout(r,6000)); window.scrollTo(0,document.body.scrollHeight); await new Promise(r=>setTimeout(r,2500)); window.scrollTo(0,0); await new Promise(r=>setTimeout(r,500));
var p=location.pathname,t=document.body.className;var g=p==='/ofertas/'?'o':/encontre-seu-cha|presentes-de-natal/.test(p)?'x':/template-home/.test(t)?'h':/template-product/.test(t)?'p':/template-(category|search)/.test(t)?'c':'u';
var lab=localStorage.getItem('lab').split('');
var href=document.getElementById('cml-site-css').href; var txt=await (await fetch(href)).text(); var sh=new CSSStyleSheet(); sh.replaceSync(txt);
var rs=[];(function w(L){for(var r of L){if(r.type===1)rs.push(r);else if(r.cssRules&&r.type!==7)w(r.cssRules)}})(sh.cssRules);
var DYN=/::?(?:hover|focus-visible|focus-within|focus|active|visited|before|after|placeholder|selection|marker|first-letter|first-line|-webkit-[\w-]+|-moz-[\w-]+|backdrop|file-selector-button|placeholder-shown|autofill)(?![\w-])/g;
var ids=new Map(),nid=0;function els(r){var out=new Set();var parts=r.selectorText.split(/,(?![^()]*\))/);for(var s of parts){var q=s.replace(DYN,'').trim()||'*';try{document.querySelectorAll(q).forEach(e=>{var i=ids.get(e);if(i==null){i=nid++;ids.set(e,i)}out.add(i)})}catch(e){out.add(-1)}}return out}
function fam(p){return p.replace(/^-(webkit|moz|ms)-/,'').replace(/-(top|right|bottom|left|inline|block)(-|$).*/,'').replace(/^(border|margin|padding|inset|font|background|grid|flex|gap|overflow|transition|animation|outline|text-decoration|list-style|place|mask)(-.*)?$/,'$1')}
var E=[],P=[];for(var i=0;i<rs.length;i++){E.push(null);var s=new Set();for(var k=0;k<rs[i].style.length;k++)s.add(fam(rs[i].style[k]));P.push(s)}
function getE(i){if(E[i]==null)E[i]=els(rs[i]);return E[i]}
var dem=[],ch=true,it=0;while(ch&&it<8){ch=false;it++;
for(var i=0;i<rs.length;i++){if(lab[i]!==g)continue;var ei=getE(i);if(!ei.size)continue;var bad=false;
for(var j=i+1;j<rs.length&&!bad;j++){if(lab[j]!=='.')continue;var sh2=false;for(var pp of P[i])if(P[j].has(pp)){sh2=true;break}if(!sh2)continue;var ej=getE(j);if(!ej.size)continue;for(var x of ei)if(x===-1||ej.has(x)||ej.has(-1)){bad=true;break}}
if(bad){lab[i]='.';dem.push(i);ch=true}}}
localStorage.setItem('lab',lab.join(''));var ac=JSON.parse(localStorage.getItem('dem')||'[]').concat(dem);localStorage.setItem('dem',JSON.stringify(ac));
return g+' rebaixadas '+dem.length+' total '+ac.length;
