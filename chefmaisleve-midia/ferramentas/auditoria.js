(async()=>{await new Promise(r=>setTimeout(r,4000));
// fecha pop-up de cadastro
document.querySelectorAll('.p button,[class*=lead] button').forEach(b=>{if(/×|fechar|close/i.test(b.textContent+b.getAttribute('aria-label')))b.click()});
const W=window,D=document,out={t:[],e:[],b:[],o:[],c:[]};
const sig=e=>e.tagName.toLowerCase()+(e.id&&!/\d{6,}/.test(e.id)?'#'+e.id:'')+[...e.classList].filter(c=>!/^(js-|cmt-|swiper-slide-)/.test(c)).slice(0,2).map(c=>'.'+c).join('');
const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(e).visibility!=='hidden'};
const rgb=s=>(s.match(/[\d.]+/g)||[]).map(Number);
// titulos
D.querySelectorAll('h1,h2,h3,.heading-block,.c4-sig').forEach(h=>{if(!vis(h)||h.closest('#modal-cart,.p'))return;const cs=getComputedStyle(h);const fs=parseFloat(cs.fontSize);if(fs<18)return;const em=h.querySelector('em,i');const txt=h.textContent.trim().replace(/\s+/g,' ').slice(0,40);
 let note='';if(+cs.fontWeight>600)note+=' peso'+cs.fontWeight;if(!em)note+=' sem-italico';else{const ec=getComputedStyle(em);const c=rgb(ec.color);const gold=c[0]>200&&c[1]>150&&c[2]<180&&c[0]-c[2]>40;if(ec.fontStyle!=='italic')note+=' em-nao-italico';if(+ec.fontWeight>300)note+=' em-peso'+ec.fontWeight;if(!gold&&!h.closest('.cmn'))note+=' em-cor'+ec.color}
 if(note)out.t.push(sig(h)+' "'+txt+'"'+note)});
// sobretitulos: textos pequenos em caixa alta
D.querySelectorAll('p,span,small,div').forEach(e=>{if(e.children.length>1||!vis(e))return;const cs=getComputedStyle(e);if(cs.textTransform!=='uppercase')return;const fs=parseFloat(cs.fontSize);if(fs>14||fs<9)return;const t=e.textContent.trim();if(t.length<4||t.length>40)return;const c=rgb(cs.color);const gold=c[0]>180&&c[1]>130&&c[2]<140;if(!gold||parseFloat(cs.letterSpacing)<1)out.e.push(sig(e)+' "'+t.slice(0,25)+'" '+cs.color+' ls'+cs.letterSpacing+' w'+cs.fontWeight)});
// botoes
D.querySelectorAll('button,a,input[type=submit],span[class]').forEach(e=>{if(!vis(e)||e.closest('.adbar,.c1-dock,#cml-qb'))return;const cs=getComputedStyle(e);const r=parseFloat(cs.borderTopLeftRadius);const h=e.offsetHeight;if(h<28||h>70||e.offsetWidth<50||e.offsetWidth>700)return;const bg=rgb(cs.backgroundColor);const solid=bg.length&&(bg[3]===undefined||bg[3]>.6);const gold=solid&&Math.abs(bg[0]-223)<30&&Math.abs(bg[1]-174)<34;
 if(gold&&cs.backgroundImage==='none')out.b.push('ouro-liso '+sig(e)+' "'+e.textContent.trim().slice(0,20)+'"');
 if(solid&&!gold&&bg[0]>200&&bg[1]>200&&bg[2]>200&&/btn|button|comprar/i.test(e.className+e.tagName+e.textContent))out.b.push('branco '+sig(e)+' "'+e.textContent.trim().slice(0,20)+'"');
 if((e.tagName==='BUTTON'||/btn/.test(e.className))&&r<8&&solid)out.b.push('canto-vivo '+sig(e)+' "'+e.textContent.trim().slice(0,20)+'"')});
// vazamento e encostado
const vw=D.documentElement.clientWidth;if(D.documentElement.scrollWidth>vw+1)out.o.push('scroll-lateral '+D.documentElement.scrollWidth+'>'+vw);
D.querySelectorAll('body *').forEach(e=>{if(!vis(e)||e.closest('.swiper-wrapper,.swiper-container,.swiper,[class*=carousel],[class*=slider],.cbk-chips,.c1-dock,#modal-cart,.modal'))return;const r=e.getBoundingClientRect();if(r.right>vw+2&&r.left<vw&&r.width<vw*1.5&&getComputedStyle(e).position!=='fixed')out.o.push('passa-da-tela '+sig(e)+' right'+Math.round(r.right))});
// paineis com fundo e texto encostado
D.querySelectorAll('body *').forEach(e=>{if(!vis(e)||e.children.length===0)return;const cs=getComputedStyle(e);const bg=rgb(cs.backgroundColor);if(!bg.length||(bg[3]!==undefined&&bg[3]<.04))return;if(parseFloat(cs.borderTopLeftRadius)<12)return;const r=e.getBoundingClientRect();if(r.width<120||r.height<40)return;const pl=parseFloat(cs.paddingLeft),pr=parseFloat(cs.paddingRight);if(pl<8||pr<8){const k=sig(e);if(!out.c.includes(k))out.c.push(k+' pad'+pl+'/'+pr)}});
const u=a=>[...new Set(a)];return location.pathname+' w'+vw+'\nTITULOS: '+u(out.t).slice(0,25).join(' | ')+'\nSOBRETIT: '+u(out.e).slice(0,15).join(' | ')+'\nBOTOES: '+u(out.b).slice(0,15).join(' | ')+'\nVAZA: '+u(out.o).slice(0,10).join(' | ')+'\nPAD: '+u(out.c).slice(0,12).join(' | ')})()
