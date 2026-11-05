/* Chef Mais Leve: caixa do kit Natal Feliz em 3D (girar, abrir, ver produtos). Uso: import(base+'box3d.js').then(m => m.mount(el, base)) */
import * as THREE from './three.module.min.js';
import { OrbitControls } from './OrbitControls.js';

const ITEMS = [
  { k: 'laranja', n: 'Laranja Chocoleve', q: '10 fatias', h: 8.6, a: '#kit-item-1',
    d: 'Laranja bahia desidratada por cerca de 13 horas, com a borda em chocolate 70%. Crocante e frutada, sem conservantes e sem açúcar adicionado.',
    m: 'Depois da ceia, com café ou chá.' },
  { k: 'tangerina', n: 'Infusão na Tangerina', q: '2 unidades', h: 8.6, a: '#kit-item-2',
    d: 'A tangerina inteira, desidratada e recheada com capim-limão, eucalipto, hibisco, maçã, cranberry e laranja. Cada unidade rende 1 litro.',
    m: 'Na jarra ou no bule, para servir à mesa.' },
  { k: 'trouxinha', n: 'Trouxinha de Maçã', q: '6 unidades', h: 8.6, a: '#kit-item-3',
    d: 'Lâmina de abacaxi fechada à mão com maçã, cravo e canela. Na água quente, a trouxinha se abre na xícara.',
    m: 'Fim de tarde e noite. Uma por xícara.' },
  { k: 'intenso', n: 'Chá Blend Intenso', q: '40 g', h: 12.5, a: '#kit-item-4',
    d: 'Hibisco, folhas de amora, maçã, morango e cranberry. Sabor frutado e cor intensa, sem cafeína. Rende até 20 xícaras.',
    m: 'Qualquer hora, quente ou gelado.' },
  { k: 'infusor', n: 'Infusor inox', q: 'com cabo', h: 11, a: '#kit-item-5',
    d: 'Infusor de aço inox em formato de pinça: aperta, coloca o blend e mergulha. Sem ervas boiando na xícara.',
    m: 'Companheiro do Chá Blend Intenso.' },
  { k: 'xicara', n: 'Xícara de vidro duplo', q: '250 ml', h: 6.2, a: '#kit-item-6',
    d: 'Vidro borossilicato de parede dupla: mantém o chá quente e não esquenta a mão. Deixa ver a cor de cada preparo.',
    m: 'Chás, infusões e café.' }
];
/* posicoes finais (cm) em arco na frente/acima da caixa */
const SPOTS = [[-11.5, 15.5, 1], [0, 18, 1], [11.5, 15.5, 1], [-11.5, 6.3, 17], [0, 5.6, 19], [11.5, 3.2, 17]];
const ORDER = [0, 1, 2, 3, 4, 5];

const CSS = `
.b3{position:relative;width:100%;aspect-ratio:4/5;font-family:Poppins,sans-serif;color:#f6efe9;user-select:none;-webkit-user-select:none;touch-action:pan-y}
.b3 canvas{display:block;width:100%!important;height:100%!important;outline:none;cursor:grab}
.b3 canvas:active{cursor:grabbing}
.b3-hint{position:absolute;left:50%;bottom:4%;transform:translateX(-50%);display:flex;gap:8px;align-items:center;padding:7px 14px;border-radius:999px;background:rgba(20,18,14,.72);border:1px solid rgba(223,174,88,.3);font-size:12px;font-weight:400;white-space:nowrap;pointer-events:none;transition:opacity .4s}
.b3-hint b{font-weight:600;color:#dfae58}
.b3-btn{position:absolute;right:3%;top:3%;padding:7px 14px;border-radius:999px;border:1px solid rgba(223,174,88,.45);background:rgba(20,18,14,.6);color:#f6efe9;font:500 12px Poppins,sans-serif;cursor:pointer;opacity:0;pointer-events:none;transition:opacity .4s}
.b3-btn.on{opacity:1;pointer-events:auto}.b3-btn:hover{border-color:#dfae58;color:#dfae58}
.b3-lb{position:absolute;left:0;top:0;transform:translate(-50%,0);text-align:center;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .35s}
.b3-lb b{display:block;font-size:12px;font-weight:600;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.6)}
.b3-lb i{display:block;width:5px;height:5px;margin:0 auto 4px;border-radius:50%;background:#dfae58}
.b3-pop{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:6%;background:rgba(11,10,8,.55);opacity:0;pointer-events:none;transition:opacity .3s;z-index:5}
.b3-pop.on{opacity:1;pointer-events:auto}
.b3-card{position:relative;width:100%;max-width:340px;max-height:100%;overflow:auto;box-sizing:border-box;padding:22px 20px 20px;border-radius:24px;background:#14120e;border:1px solid rgba(223,174,88,.35);box-shadow:0 30px 60px -30px rgba(0,0,0,.8);transform:translateY(10px);transition:transform .3s}
.b3-pop.on .b3-card{transform:none}
.b3-card img{display:block;height:120px;width:auto;max-width:100%;margin:0 auto 12px;object-fit:contain}
.b3-card .o{margin:0;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:#dfae58}
.b3-card h4{margin:4px 0 8px;font-size:19px;font-weight:700;color:#fff;line-height:1.2}.b3-card h4 i{font-weight:300;color:#f3d48b}
.b3-card p{margin:0 0 8px;font-size:13.5px;font-weight:300;line-height:1.5;color:rgba(246,239,233,.85)}
.b3-card .m{font-style:italic;color:#f3d48b}
.b3-card .x{position:absolute;right:12px;top:12px;width:32px;height:32px;border-radius:50%;border:1px solid rgba(223,174,88,.4);background:none;color:#f6efe9;font-size:16px;line-height:1;cursor:pointer}
.b3-card .go{display:inline-block;margin-top:6px;padding:9px 18px;border-radius:999px;background:#dfae58;color:#0b0a08;font-size:13px;font-weight:600;text-decoration:none}
.b3-fb{width:100%;height:100%;object-fit:cover;border-radius:24px}
#ns-section-product_description .b3 .b3-card img,.b3 .b3-card img{width:auto!important;height:120px!important;max-width:100%!important;object-fit:contain!important;display:block!important;margin:0 auto 12px!important}
#ns-section-product_description .b3 .b3-card a.go,.b3 .b3-card a.go{position:static!important;left:auto!important;bottom:auto!important;transform:none!important;background:#dfae58!important;color:#0b0a08!important}
#ns-section-product_description .b3 canvas{position:static!important}
@media(max-width:640px){.b3-hint{font-size:11px}.b3-lb b{font-size:10.5px}}
`;

function css(){ if (document.getElementById('b3-css')) return; const s = document.createElement('style'); s.id = 'b3-css'; s.textContent = CSS; document.head.appendChild(s); }
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const backOut = t => { const c = 1.5; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };

export function mount(root, base){
  if (!root || root.__b3) return; root.__b3 = true; css();
  const wrap = document.createElement('div'); wrap.className = 'b3'; root.innerHTML = ''; root.appendChild(wrap);
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }); }
  catch (e) { wrap.innerHTML = `<img class="b3-fb" src="${base}caixa.jpg" alt="Caixa de madeira do kit Natal Feliz aberta">`; return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  wrap.appendChild(renderer.domElement);
  wrap.insertAdjacentHTML('beforeend', `<div class="b3-hint"><span>Arraste para girar</span><span>·</span><b>Toque na caixa para abrir</b></div><button type="button" class="b3-btn">Fechar a caixa</button><div class="b3-pop" role="dialog" aria-modal="true"><div class="b3-card"></div></div>`);
  const hint = wrap.querySelector('.b3-hint'), btn = wrap.querySelector('.b3-btn'), pop = wrap.querySelector('.b3-pop'), card = wrap.querySelector('.b3-card');
  wrap.setAttribute('aria-label', 'Caixa de madeira do kit Natal Feliz em 3D. Arraste para girar e toque para abrir.');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 0.8, 1, 400);
  camera.position.set(30, 36, 80);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 8.5, 4); controls.enableZoom = false; controls.enablePan = false; controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minPolarAngle = 0.55; controls.maxPolarAngle = 1.42; controls.autoRotate = true; controls.autoRotateSpeed = 1.1; controls.rotateSpeed = 0.7;

  scene.add(new THREE.HemisphereLight(0xfff6ea, 0x4a3a2a, 1.35));
  const key = new THREE.DirectionalLight(0xfff1dc, 1.9); key.position.set(-30, 50, 40); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffe2b8, 0.7); rim.position.set(40, 20, -40); scene.add(rim);

  const tl = new THREE.TextureLoader();
  const T = n => { const t = tl.load(base + n); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; };
  const tex = { front: T('front.jpg'), back: T('back.jpg'), side: T('side.jpg'), strip: T('strip.jpg'), top: T('lid_top.jpg'), inn: T('lid_in.jpg'), wood: T('wood.jpg') };
  const M = t => new THREE.MeshStandardMaterial({ map: t, roughness: 0.82, metalness: 0 });
  const mWood = M(tex.wood), mStrip = M(tex.strip), mInner = new THREE.MeshStandardMaterial({ map: tex.wood, color: 0xf3e4cf, roughness: 0.9 });

  /* caixa: 25 x 20 x 7 cm (corpo) + tampa 2 cm */
  const W = 25, D = 20, Hb = 7, th = 1, Hl = 2;
  const box = new THREE.Group(); scene.add(box);
  const wall = (w, h, d, mats, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mats); m.position.set(x, y, z); box.add(m); return m; };
  /* ordem das faces: +x, -x, +y, -y, +z, -z */
  wall(W, Hb, th, [mStrip, mStrip, mStrip, mStrip, M(tex.front), mInner], 0, Hb / 2, D / 2 - th / 2);
  wall(W, Hb, th, [mStrip, mStrip, mStrip, mStrip, mInner, M(tex.back)], 0, Hb / 2, -D / 2 + th / 2);
  wall(th, Hb, D - 2 * th, [M(tex.side), mInner, mStrip, mStrip, mStrip, mStrip], W / 2 - th / 2, Hb / 2, 0);
  wall(th, Hb, D - 2 * th, [mInner, M(tex.side), mStrip, mStrip, mStrip, mStrip], -W / 2 + th / 2, Hb / 2, 0);
  wall(W - 2 * th, 0.6, D - 2 * th, new THREE.MeshStandardMaterial({ color: 0x3f5132, roughness: 0.95 }), 0, 0.3, 0);
  /* papel de seda verde dentro */
  const lidPivot = new THREE.Group(); lidPivot.position.set(0, Hb, -D / 2); box.add(lidPivot);
  const lid = new THREE.Mesh(new THREE.BoxGeometry(W + 0.4, Hl, D + 0.4), [mStrip, mStrip, M(tex.top), M(tex.inn), mStrip, mStrip]);
  lid.position.set(0, Hl / 2, D / 2); lidPivot.add(lid);

  /* sombra de contato */
  const sc = document.createElement('canvas'); sc.width = sc.height = 256; const g = sc.getContext('2d');
  const gr = g.createRadialGradient(128, 128, 10, 128, 128, 128); gr.addColorStop(0, 'rgba(0,0,0,.55)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(46, 38), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = -0.05; scene.add(shadow);

  /* produtos */
  const sprites = [];
  ITEMS.forEach((it, i) => {
    const t = tl.load(base + it.k + '.webp', tx => { const r = tx.image.width / tx.image.height; s.scale.set(it.h * r, it.h, 1); s.userData.ratio = r; });
    t.colorSpace = THREE.SRGBColorSpace;
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false }));
    s.userData = { i, ratio: 1 }; s.visible = false; s.renderOrder = 2; scene.add(s); sprites.push(s);
    const lb = document.createElement('div'); lb.className = 'b3-lb'; lb.innerHTML = `<i></i><b>${it.n}</b>`; wrap.appendChild(lb); it.lb = lb;
  });

  let open = 0, target = 0, t0 = 0, animStart = 0; /* open: 0 fechado, 1 aberto (tampa + produtos) */
  function setOpen(v){ target = v ? 1 : 0; animStart = performance.now(); t0 = open; btn.classList.toggle('on', !!v); hint.style.opacity = v ? 0 : 1; if (v) controls.autoRotate = false; }
  btn.addEventListener('click', () => { closePop(); setOpen(false); });

  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2(); let down = null;
  renderer.domElement.addEventListener('pointerdown', e => { down = [e.clientX, e.clientY]; controls.autoRotate = false; });
  renderer.domElement.addEventListener('pointerup', e => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) { down = null; return; } down = null;
    const r = renderer.domElement.getBoundingClientRect(); ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const hs = ray.intersectObjects(sprites.filter(s => s.visible && s.material.opacity > .6), false);
    if (hs.length) { showPop(hs[0].object.userData.i); return; }
    if (ray.intersectObject(box, true).length) setOpen(target === 0);
  });
  renderer.domElement.addEventListener('pointermove', e => {
    const r = renderer.domElement.getBoundingClientRect(); ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const hit = ray.intersectObjects(sprites.filter(s => s.visible), false).length || ray.intersectObject(box, true).length;
    renderer.domElement.style.cursor = hit ? 'pointer' : '';
  });

  function showPop(i){
    const it = ITEMS[i];
    card.innerHTML = `<button type="button" class="x" aria-label="Fechar">×</button><img src="${base + it.k}.webp" alt="${it.n}"><p class="o">Kit Natal Feliz · ${i + 1} de 7</p><h4>${it.n.replace(/ (\S+)$/, ' <i>$1</i>')}</h4><p>${it.d}</p><p class="m">${it.m}</p><a class="go" href="${it.a}">Ver em detalhe</a>`;
    pop.classList.add('on');
    card.querySelector('.x').onclick = closePop;
    card.querySelector('.go').onclick = ev => { closePop(); };
  }
  function closePop(){ pop.classList.remove('on'); }
  pop.addEventListener('click', e => { if (e.target === pop) closePop(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePop(); });

  const v = new THREE.Vector3();
  function size(){ const w = wrap.clientWidth, h = wrap.clientHeight; if (!w) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
  new ResizeObserver(size).observe(wrap); size();

  let visible = true, last = performance.now();
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) requestAnimationFrame(loop); }, { rootMargin: '100px' }).observe(wrap);
  function loop(now){
    if (!visible) return;
    const dur = target ? 2600 : 1400;
    const p = Math.min(1, (now - animStart) / dur);
    open = t0 + (target - t0) * p;
    /* tampa: primeiros 35% da abertura */
    const lp = ease(Math.min(1, Math.max(0, target ? open / 0.35 : (open - 0.0) / 0.35)));
    lidPivot.rotation.x = -1.95 * lp;
    /* produtos */
    sprites.forEach((s, i) => {
      const it = ITEMS[i], st = 0.3 + ORDER.indexOf(i) * 0.09, k = Math.min(1, Math.max(0, (open - st) / 0.28)), e = backOut(k), e2 = ease(k);
      s.visible = k > 0.001;
      const [x0, y, z0] = SPOTS[i], az = controls.getAzimuthalAngle(), ca = Math.cos(az), sa = Math.sin(az);
      const x = x0 * ca + z0 * sa, z = -x0 * sa + z0 * ca;
      s.position.set(x * e2, 2 + (y - 2) * e, z * e2);
      const sc = 0.35 + 0.65 * e2; s.scale.set(it.h * s.userData.ratio * sc, it.h * sc, 1);
      s.material.opacity = Math.min(1, k * 2.5);
      /* rotulo */
      v.set(s.position.x, s.position.y - it.h * sc / 2 - 0.6, s.position.z).project(camera);
      const W2 = wrap.clientWidth, H2 = wrap.clientHeight;
      it.lb.style.transform = `translate(${(v.x * .5 + .5) * W2}px,${(-v.y * .5 + .5) * H2}px) translate(-50%,0)`;
      it.lb.style.opacity = k > 0.92 ? 1 : 0;
    });
    const dist = 68 + 16 * Math.min(1, open * 2.2), off = camera.position.clone().sub(controls.target);
    off.setLength(off.length() + (dist - off.length()) * 0.12); camera.position.copy(controls.target).add(off);
    controls.update();
    renderer.render(scene, camera);
    last = now; requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}
