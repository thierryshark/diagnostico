/* Chef Mais Leve: caixa do kit Natal Feliz em 3D com produtos em 3D (girar, abrir, ver cada produto em 360). Uso: import(base+'box3d.js').then(m => m.mount(el, base)) */
import * as THREE from './three.module.min.js';
import { OrbitControls } from './OrbitControls.js';
import { RoomEnvironment } from './RoomEnvironment.js';

const ITEMS = [
  { k: 'laranja', n: 'Laranja Chocoleve', q: '10 fatias', a: '#kit-item-1',
    d: 'Laranja bahia desidratada por cerca de 13 horas, com a borda em chocolate 70%. Crocante e frutada, sem conservantes e sem açúcar adicionado.',
    m: 'Depois da ceia, com café ou chá.' },
  { k: 'tangerina', n: 'Infusão na Tangerina', q: '2 unidades', a: '#kit-item-2',
    d: 'A tangerina inteira, desidratada e recheada com capim-limão, eucalipto, hibisco, maçã, cranberry e laranja. Cada unidade rende 1 litro.',
    m: 'Na jarra ou no bule, para servir à mesa.' },
  { k: 'trouxinha', n: 'Trouxinha de Maçã', q: '6 unidades', a: '#kit-item-3',
    d: 'Lâmina de abacaxi fechada à mão com maçã, cravo e canela. Na água quente, a trouxinha se abre na xícara.',
    m: 'Fim de tarde e noite. Uma por xícara.' },
  { k: 'intenso', n: 'Chá Blend Intenso', q: '40 g', a: '#kit-item-4',
    d: 'Hibisco, folhas de amora, maçã, morango e cranberry. Sabor frutado e cor intensa, sem cafeína. Rende até 20 xícaras.',
    m: 'Qualquer hora, quente ou gelado.' },
  { k: 'infusor', n: 'Infusor inox', q: 'com cabo', a: '#kit-item-5',
    d: 'Infusor de aço inox em formato de pinça: aperta, coloca o blend e mergulha. Sem ervas boiando na xícara.',
    m: 'Companheiro do Chá Blend Intenso.' },
  { k: 'xicara', n: 'Xícara de vidro duplo', q: '250 ml', a: '#kit-item-6',
    d: 'Vidro borossilicato de parede dupla: mantém o chá quente e não esquenta a mão. Deixa ver a cor de cada preparo.',
    m: 'Chás, infusões e café.' }
];
/* posicao final do centro de cada produto (cm), na frente e acima da caixa */
const SPOTS = [[-11.2, 15.5, 1], [0, 20.5, 0], [11.2, 15.5, 1], [-10, 8, 17], [1, 3.4, 19], [10.5, 3.3, 17]];

const CSS = `
.b3{position:relative;width:100%;aspect-ratio:4/5;font-family:Poppins,sans-serif;color:#f6efe9;user-select:none;-webkit-user-select:none;touch-action:pan-y}
.b3 canvas{display:block;width:100%!important;height:100%!important;outline:none;cursor:grab;position:static!important}
.b3 canvas:active{cursor:grabbing}
.b3-hint{position:absolute;left:50%;bottom:4%;transform:translateX(-50%);display:flex;gap:8px;align-items:center;padding:7px 14px;border-radius:999px;background:rgba(20,18,14,.72);border:1px solid rgba(223,174,88,.3);font-size:12px;white-space:nowrap;pointer-events:none;transition:opacity .4s}
.b3-hint b{font-weight:600;color:#dfae58}
.b3-btn{position:absolute;right:3%;top:3%;padding:7px 14px;border-radius:999px;border:1px solid rgba(223,174,88,.45);background:rgba(20,18,14,.6);color:#f6efe9;font:500 12px Poppins,sans-serif;cursor:pointer;opacity:0;pointer-events:none;transition:opacity .4s}
.b3-btn.on{opacity:1;pointer-events:auto}.b3-btn:hover{border-color:#dfae58;color:#dfae58}
.b3-lb{position:absolute;left:0;top:0;text-align:center;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .35s}
.b3-lb b{display:block;font-size:12px;font-weight:600;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.6)}
.b3-lb i{display:block;width:5px;height:5px;margin:0 auto 4px;border-radius:50%;background:#dfae58}
.b3-pop{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(11,10,8,.62);opacity:0;pointer-events:none;transition:opacity .25s;font-family:Poppins,sans-serif;color:#f6efe9}
.b3-pop.on{opacity:1;pointer-events:auto}
.b3-card{position:relative;display:flex;flex-direction:column;width:100%;max-width:380px;max-height:calc(100vh - 32px);max-height:calc(100dvh - 32px);box-sizing:border-box;border-radius:24px;background:#14120e;border:1px solid rgba(223,174,88,.35);box-shadow:0 30px 60px -30px rgba(0,0,0,.8);transform:translateY(12px);transition:transform .25s;overflow:hidden}
.b3-pop.on .b3-card{transform:none}
.b3-x{position:absolute;right:12px;top:12px;z-index:3;width:36px;height:36px;border-radius:50%;border:1px solid rgba(223,174,88,.5);background:rgba(20,18,14,.85);color:#f6efe9;font:400 20px/1 Poppins,sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}
.b3-sc{overflow-y:auto;-webkit-overflow-scrolling:touch;padding:18px 20px 22px;overscroll-behavior:contain}
.b3-v{position:relative;width:100%;height:230px;margin:0 0 10px;border-radius:18px;background:radial-gradient(80% 80% at 50% 40%,#2a2318 0%,#14120e 75%);touch-action:none}
.b3-v canvas{display:block;width:100%!important;height:100%!important;cursor:grab}
.b3-v span{position:absolute;left:50%;bottom:8px;transform:translateX(-50%);font-size:11px;color:rgba(246,239,233,.6);white-space:nowrap;pointer-events:none}
.b3-sc .o{margin:0;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:#dfae58}
.b3-sc h4{margin:4px 0 8px;font-size:19px;font-weight:700;color:#fff;line-height:1.2}.b3-sc h4 i{font-weight:300;color:#f3d48b}
.b3-sc p{margin:0 0 8px;font-size:13.5px;font-weight:300;line-height:1.5;color:rgba(246,239,233,.85)}
.b3-sc .m{font-style:italic;color:#f3d48b}
.b3-sc a.go{display:inline-block;margin-top:6px;padding:10px 20px;border-radius:999px;background:#dfae58;color:#0b0a08;font-size:13px;font-weight:600;text-decoration:none}
.b3-fb{width:100%;height:100%;object-fit:cover;border-radius:24px}
@media(max-width:640px){
 .b3-hint{font-size:11px}.b3-lb b{font-size:10.5px}
 .b3-pop{align-items:flex-end;padding:0}
 .b3-card{max-width:none;border-radius:24px 24px 0 0;max-height:88vh;max-height:88dvh;padding-bottom:env(safe-area-inset-bottom)}
 .b3-v{height:210px}
}
`;
function css(){ if (document.getElementById('b3-css')) return; const s = document.createElement('style'); s.id = 'b3-css'; s.textContent = CSS; document.head.appendChild(s); }
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const backOut = t => { const c = 1.5; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };

/* ---------- fabrica de produtos 3D (medidas em cm, centro na origem) ---------- */
function factory(base, tl){
  const T = (n, srgb = true) => { const t = tl.load(base + n); if (srgb) t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; };
  const cache = {};
  const tex = n => cache[n] || (cache[n] = T(n));
  const card = new THREE.MeshStandardMaterial({ color: 0xf1efea, roughness: 0.55, metalness: 0 });
  const meshTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d'); g.fillStyle = '#000'; g.fillRect(0, 0, 128, 128); g.strokeStyle = '#fff'; g.lineWidth = 2; for (let i = 0; i <= 128; i += 6) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 128); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(128, i); g.stroke(); } const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 2); return t; })();
  const steel = () => new THREE.MeshStandardMaterial({ color: 0xd9dde2, metalness: 1, roughness: 0.28 });
  function cube(k){
    const s = 8.6, side = card;
    const top = new THREE.MeshStandardMaterial({ map: tex(k + '_top.jpg'), roughness: 0.55 });
    const front = new THREE.MeshStandardMaterial({ map: tex(k + '_front.jpg'), roughness: 0.4 });
    const m = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), [side, side, top, side, front, side]);
    const g = new THREE.Group(); g.add(m); g.userData.h = s; return g;
  }
  function pouch(){
    const w = 10.8, h = 15.8, segX = 24, segY = 32;
    const mk = (map, back) => {
      const geo = new THREE.PlaneGeometry(w, h, segX, segY), p = geo.attributes.position;
      for (let i = 0; i < p.count; i++) { const x = p.getX(i) / (w / 2), y = p.getY(i) / (h / 2); const b = 1.1 * Math.sqrt(Math.max(0, 1 - x * x)) * Math.max(0, 1 - Math.pow(Math.abs(y), 6)); p.setZ(i, b); }
      geo.computeVertexNormals();
      const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map, alphaTest: 0.5, transparent: false, roughness: 0.45, metalness: 0.1, side: THREE.FrontSide }));
      if (back) mesh.rotation.y = Math.PI; return mesh;
    };
    const g = new THREE.Group(); g.add(mk(tex('pouch_front.webp'))); g.add(mk(tex('pouch_back.webp'), true)); g.userData.h = h; return g;
  }
  function cup(){
    const pts = [[0, 0.05], [3.0, 0.05], [3.6, 0.4], [4.4, 1.6], [4.7, 3.0], [4.6, 4.6], [4.4, 6.1], [4.35, 6.5], [4.05, 6.5], [4.0, 6.1], [3.9, 4.8], [3.5, 3.1], [2.6, 1.6], [0, 1.3]].map(p => new THREE.Vector2(p[0], p[1]));
    const glass = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0.03, transparent: true, opacity: 0.22, clearcoat: 1, clearcoatRoughness: 0.05, side: THREE.DoubleSide, depthWrite: false, envMapIntensity: 1.6 });
    const body = new THREE.Mesh(new THREE.LatheGeometry(pts, 64), glass);
    const handle = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.32, 14, 40, Math.PI * 1.15), glass);
    handle.position.set(4.6, 3.4, 0); handle.rotation.z = -Math.PI * 0.575;
    const g = new THREE.Group(); body.position.y = -3.25; handle.position.y -= 3.25; g.add(body, handle); body.renderOrder = handle.renderOrder = 3; g.userData.h = 6.5; return g;
  }
  function infusor(){
    const g = new THREE.Group(), st = steel();
    const net = new THREE.MeshStandardMaterial({ color: 0xcfd3d8, metalness: 1, roughness: 0.35, alphaMap: meshTex, transparent: true, side: THREE.DoubleSide, depthWrite: false });
    const ball = new THREE.Mesh(new THREE.SphereGeometry(2.1, 32, 20), net); g.add(ball);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.13, 10, 48), st); ring.rotation.y = Math.PI / 2; g.add(ring);
    const rod = (a, b) => { const v = new THREE.Vector3().subVectors(b, a), len = v.length(); const m = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, len, 10), st); m.position.copy(a).add(b).multiplyScalar(0.5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.normalize()); g.add(m); };
    const pL = new THREE.Vector3(-0.9, 2.3, 0), pR = new THREE.Vector3(0.9, 2.3, 0), hinge = new THREE.Vector3(0, 3.6, 0);
    rod(pL, hinge); rod(pR, hinge);
    const endL = new THREE.Vector3(-0.9, 15, 0), endR = new THREE.Vector3(0.9, 15, 0);
    rod(hinge, endL); rod(hinge, endR);
    const loop = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.12, 10, 32), st); loop.position.set(0, 16, 0); g.add(loop);
    g.children.forEach(c => c.position.y -= 7);
    const outer = new THREE.Group(); outer.add(g); g.rotation.z = -0.95; outer.userData.h = 9; return outer;
  }
  return k => ({ laranja: () => cube('laranja'), tangerina: () => cube('tangerina'), trouxinha: () => cube('trouxinha'), intenso: pouch, xicara: cup, infusor })[k]();
}

function envFor(renderer, scene, intensity){
  const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture; pm.dispose();
  if ('environmentIntensity' in scene) scene.environmentIntensity = intensity;
}

export function mount(root, base){
  if (!root || root.__b3) return; root.__b3 = true; css();
  const wrap = document.createElement('div'); wrap.className = 'b3'; root.innerHTML = ''; root.appendChild(wrap);
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }); }
  catch (e) { wrap.innerHTML = `<img class="b3-fb" src="${base}caixa.jpg" alt="Caixa de madeira do kit Natal Feliz aberta">`; return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.0;
  wrap.appendChild(renderer.domElement);
  wrap.insertAdjacentHTML('beforeend', `<div class="b3-hint"><span>Arraste para girar</span><span>·</span><b>Toque na caixa para abrir</b></div><button type="button" class="b3-btn">Fechar a caixa</button>`);
  const hint = wrap.querySelector('.b3-hint'), btn = wrap.querySelector('.b3-btn');
  wrap.setAttribute('aria-label', 'Caixa de madeira do kit Natal Feliz em 3D. Arraste para girar e toque para abrir.');

  const scene = new THREE.Scene(); envFor(renderer, scene, 0.55);
  const camera = new THREE.PerspectiveCamera(32, 0.8, 1, 500);
  camera.position.set(30, 36, 80);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 8.5, 4); controls.enableZoom = false; controls.enablePan = false; controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minPolarAngle = 0.55; controls.maxPolarAngle = 1.42; controls.autoRotate = true; controls.autoRotateSpeed = 1.1; controls.rotateSpeed = 0.7;

  scene.add(new THREE.HemisphereLight(0xfff6ea, 0x4a3a2a, 0.9));
  const key = new THREE.DirectionalLight(0xfff1dc, 1.6); key.position.set(-30, 50, 40); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffe2b8, 0.6); rim.position.set(40, 20, -40); scene.add(rim);

  const tl = new THREE.TextureLoader();
  const T = n => { const t = tl.load(base + n); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; };
  const tex = { front: T('front.jpg'), back: T('back.jpg'), side: T('side.jpg'), strip: T('strip.jpg'), top: T('lid_top.jpg'), inn: T('lid_in.jpg'), wood: T('wood.jpg') };
  const M = t => new THREE.MeshStandardMaterial({ map: t, roughness: 0.82, metalness: 0, envMapIntensity: 0.4 });
  const mStrip = M(tex.strip), mInner = new THREE.MeshStandardMaterial({ map: tex.wood, color: 0xf3e4cf, roughness: 0.9, envMapIntensity: 0.3 });

  const W = 25, D = 20, Hb = 7, th = 1, Hl = 2;
  const box = new THREE.Group(); scene.add(box);
  const wall = (w, h, d, mats, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mats); m.position.set(x, y, z); box.add(m); return m; };
  wall(W, Hb, th, [mStrip, mStrip, mStrip, mStrip, M(tex.front), mInner], 0, Hb / 2, D / 2 - th / 2);
  wall(W, Hb, th, [mStrip, mStrip, mStrip, mStrip, mInner, M(tex.back)], 0, Hb / 2, -D / 2 + th / 2);
  wall(th, Hb, D - 2 * th, [M(tex.side), mInner, mStrip, mStrip, mStrip, mStrip], W / 2 - th / 2, Hb / 2, 0);
  wall(th, Hb, D - 2 * th, [mInner, M(tex.side), mStrip, mStrip, mStrip, mStrip], -W / 2 + th / 2, Hb / 2, 0);
  wall(W - 2 * th, 0.6, D - 2 * th, new THREE.MeshStandardMaterial({ color: 0x3f5132, roughness: 0.95 }), 0, 0.3, 0);
  const lidPivot = new THREE.Group(); lidPivot.position.set(0, Hb, -D / 2); box.add(lidPivot);
  const lid = new THREE.Mesh(new THREE.BoxGeometry(W + 0.4, Hl, D + 0.4), [mStrip, mStrip, M(tex.top), M(tex.inn), mStrip, mStrip]);
  lid.position.set(0, Hl / 2, D / 2); lidPivot.add(lid);

  const sc = document.createElement('canvas'); sc.width = sc.height = 256; const g = sc.getContext('2d');
  const gr = g.createRadialGradient(128, 128, 10, 128, 128, 128); gr.addColorStop(0, 'rgba(0,0,0,.55)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(52, 46), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.set(0, -0.05, 4); scene.add(shadow);

  const make = factory(base, tl);
  const prods = ITEMS.map((it, i) => {
    const p = make(it.k); p.visible = false; p.traverse(o => { o.userData.prod = i; }); scene.add(p);
    const lb = document.createElement('div'); lb.className = 'b3-lb'; lb.innerHTML = `<i></i><b>${it.n}</b>`; wrap.appendChild(lb); it.lb = lb;
    return p;
  });

  let open = 0, target = 0, t0 = 0, animStart = 0;
  let seek = null;
  function setOpen(v){ target = v ? 1 : 0; animStart = performance.now(); t0 = open; if (v) { const o = camera.position.clone().sub(controls.target), sp = new THREE.Spherical().setFromVector3(o); let th = sp.theta % (Math.PI * 2); if (th > Math.PI) th -= Math.PI * 2; if (th < -Math.PI) th += Math.PI * 2; seek = { from: th, phi: sp.phi, at: performance.now() }; } btn.classList.toggle('on', !!v); hint.style.opacity = v ? 0 : 1; if (v) controls.autoRotate = false; }
  btn.addEventListener('click', () => { setOpen(false); });

  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2(); let down = null;
  const setPtr = e => { const r = renderer.domElement.getBoundingClientRect(); ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ptr, camera); };
  const hitProd = () => { const hs = ray.intersectObjects(prods.filter(p => p.visible), true); return hs.length ? hs[0].object.userData.prod : null; };
  renderer.domElement.addEventListener('pointerdown', e => { down = [e.clientX, e.clientY]; controls.autoRotate = false; seek = null; });
  renderer.domElement.addEventListener('pointerup', e => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) { down = null; return; } down = null;
    setPtr(e); const pi = hitProd();
    if (pi != null && open > 0.9) { showPop(pi); return; }
    if (ray.intersectObject(box, true).length) setOpen(target === 0);
  });
  renderer.domElement.addEventListener('pointermove', e => { setPtr(e); renderer.domElement.style.cursor = (hitProd() != null || ray.intersectObject(box, true).length) ? 'pointer' : ''; });

  /* ---------- pop-up com visualizador 360 ---------- */
  let pop = document.querySelector('.b3-pop');
  if (!pop) { pop = document.createElement('div'); pop.className = 'b3-pop'; pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-modal', 'true'); pop.innerHTML = '<div class="b3-card"><button type="button" class="b3-x" aria-label="Fechar">×</button><div class="b3-sc"></div></div>'; document.body.appendChild(pop); }
  const pc = pop.querySelector('.b3-sc'), px = pop.querySelector('.b3-x');
  let viewer = null;
  function showPop(i){
    const it = ITEMS[i];
    pc.innerHTML = `<div class="b3-v"><span>Arraste para girar 360°</span></div><p class="o">Kit Natal Feliz · ${i + 1} de 7</p><h4>${it.n.replace(/ (\S+)$/, ' <i>$1</i>')}</h4><p>${it.d}</p><p class="m">${it.m}</p><a class="go" href="${it.a}">Ver em detalhe</a>`;
    pc.scrollTop = 0; pop.classList.add('on'); document.documentElement.style.overflow = 'hidden';
    pc.querySelector('.go').addEventListener('click', closePop);
    viewer = mini(pc.querySelector('.b3-v'), it.k);
  }
  function closePop(){ pop.classList.remove('on'); document.documentElement.style.overflow = ''; if (viewer) { viewer(); viewer = null; } }
  px.onclick = closePop;
  pop.addEventListener('click', e => { if (e.target === pop) closePop(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePop(); });

  function mini(el, k){
    let r2; try { r2 = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return () => {}; }
    r2.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); r2.outputColorSpace = THREE.SRGBColorSpace; r2.toneMapping = THREE.ACESFilmicToneMapping;
    el.insertBefore(r2.domElement, el.firstChild);
    const s2 = new THREE.Scene(); envFor(r2, s2, 0.8);
    s2.add(new THREE.HemisphereLight(0xfff6ea, 0x3a2e22, 0.9)); const kl = new THREE.DirectionalLight(0xfff1dc, 1.5); kl.position.set(-10, 20, 15); s2.add(kl);
    const obj = make(k); s2.add(obj);
    const hgt = obj.userData.h || 8;
    const c2 = new THREE.PerspectiveCamera(30, 1, 0.5, 200); c2.position.set(0, hgt * 0.3, hgt * 2.5);
    const oc = new OrbitControls(c2, r2.domElement); oc.target.set(0, 0, 0); oc.enableZoom = false; oc.enablePan = false; oc.enableDamping = true; oc.autoRotate = true; oc.autoRotateSpeed = 2.4;
    r2.domElement.addEventListener('pointerdown', () => { oc.autoRotate = false; });
    let alive = true;
    const fit = () => { const w = el.clientWidth, h = el.clientHeight; if (!w) return; r2.setSize(w, h, false); c2.aspect = w / h; c2.updateProjectionMatrix(); };
    fit(); const ro = new ResizeObserver(fit); ro.observe(el);
    (function lp(){ if (!alive) return; oc.update(); r2.render(s2, c2); requestAnimationFrame(lp); })();
    return () => { alive = false; ro.disconnect(); oc.dispose(); r2.dispose(); if (r2.forceContextLoss) r2.forceContextLoss(); };
  }

  const v = new THREE.Vector3();
  function size(){ const w = wrap.clientWidth, h = wrap.clientHeight; if (!w) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
  new ResizeObserver(size).observe(wrap); size();

  let visible = true;
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) requestAnimationFrame(loop); }, { rootMargin: '100px' }).observe(wrap);
  function loop(now){
    if (!visible) return;
    const dur = target ? 2600 : 1400, p = Math.min(1, (now - animStart) / dur);
    open = t0 + (target - t0) * p;
    lidPivot.rotation.x = -1.95 * ease(Math.min(1, Math.max(0, open / 0.35)));
    prods.forEach((o, i) => {
      const it = ITEMS[i], st = 0.3 + i * 0.09, k = Math.min(1, Math.max(0, (open - st) / 0.28)), e = backOut(k), e2 = ease(k);
      o.visible = k > 0.001;
      const [x, y, z] = SPOTS[i];
      o.position.set(x * e2, 3 + (y - 3) * e, z * e2);
      const s = 0.3 + 0.7 * e2; o.scale.setScalar(s);
      o.rotation.y = (1 - e2) * (i % 2 ? 1.2 : -1.2);
      v.set(o.position.x, o.position.y - (it.k === 'infusor' ? 4.5 : (o.userData.h || 8) / 2) * s - 0.8, o.position.z).project(camera);
      it.lb.style.transform = `translate(${(v.x * .5 + .5) * wrap.clientWidth}px,${(-v.y * .5 + .5) * wrap.clientHeight}px) translate(-50%,0)`;
      it.lb.style.opacity = k > 0.92 ? 1 : 0;
    });
    if (seek) { const q = Math.min(1, (now - seek.at) / 1100), e3 = ease(q), o = camera.position.clone().sub(controls.target), sp = new THREE.Spherical().setFromVector3(o);
      sp.theta = seek.from + (0.38 - seek.from) * e3; sp.phi = seek.phi + (1.08 - seek.phi) * e3; camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(sp)); if (q >= 1) seek = null; }
    const dist = 70 + 30 * Math.min(1, open * 2.2), off = camera.position.clone().sub(controls.target);
    off.setLength(off.length() + (dist - off.length()) * 0.12); camera.position.copy(controls.target).add(off);
    controls.update(); renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}
