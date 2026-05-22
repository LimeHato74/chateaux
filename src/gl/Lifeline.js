import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════
   Lifeline — Atmospheric 3D Background
   Reacts to mouse. Ambient particles that feel alive.
   NOT a wireframe tube — a luminous cloud of potential.
   ═══════════════════════════════════════════════════════ */

function makeSoftDot() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.15, 'rgba(255,255,255,0.6)');
  g.addColorStop(0.5, 'rgba(200,255,0,0.1)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

export class Lifeline {
  constructor(canvas) {
    this.canvas = canvas;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x1a0f0d, 0.025);

    // Camera
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
    this.camera.position.set(0, 0, 5);

    // State
    this.mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    this.scrollProgress = 0;
    this.pathCurve = null;
    this.nodes = [];
    this.onNodeHover = null;
    this.mode = 'ambient'; // 'ambient' | 'path'
    this.dotTex = makeSoftDot();

    // Ambient particles (always visible)
    this._buildAmbient();

    // Path objects (built on demand)
    this.pathGroup = new THREE.Group();
    this.scene.add(this.pathGroup);

    // Events
    window.addEventListener('resize', this._onResize.bind(this));
    window.addEventListener('mousemove', (e) => {
      this.mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Clock + loop
    this.clock = new THREE.Clock();
    this._animate = this._animate.bind(this);
    this._animate();
  }

  /* ─── Ambient Cloud (Hero Background) ───────────── */
  _buildAmbient() {
    const count = 4000;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute in a wide sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 25;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - 10;
      sizes[i] = 0.3 + Math.random() * 1.5;
      alphas[i] = 0.1 + Math.random() * 0.4;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      color: 0xe85d04, // Deep orange
      size: 0.4,
      map: this.dotTex,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });

    this.ambientParticles = new THREE.Points(geo, mat);
    this.scene.add(this.ambientParticles);
  }

  /* ─── Build Lifeline Path (After AI Match) ──────── */
  buildPath(matchData) {
    // Clear old
    while (this.pathGroup.children.length) {
      this.pathGroup.remove(this.pathGroup.children[0]);
    }

    // Generate curve
    const pts = [];
    const N = 200;
    const len = 150;
    for (let i = 0; i < N; i++) {
      const t = i / N;
      const angle = t * Math.PI * 8; // 4 full spirals
      const r = 1.5 + Math.sin(t * Math.PI * 4) * 1.2;
      pts.push(new THREE.Vector3(
        Math.cos(angle) * r,
        Math.sin(angle) * r + t * 6,
        -t * len
      ));
    }
    this.pathCurve = new THREE.CatmullRomCurve3(pts);

    // Inner core line — thin, glowing
    const tubeGeo = new THREE.TubeGeometry(this.pathCurve, 500, 0.03, 4, false);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0xe85d04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    this.pathGroup.add(new THREE.Mesh(tubeGeo, tubeMat));

    // Outer envelope — wireframe, subtle
    const envGeo = new THREE.TubeGeometry(this.pathCurve, 300, 0.3, 6, false);
    const envMat = new THREE.MeshBasicMaterial({
      color: 0xe85d04,
      wireframe: true,
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending
    });
    this.pathGroup.add(new THREE.Mesh(envGeo, envMat));

    // Path particles — close to the line
    const pCount = 20000;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const t = Math.random();
      const p = this.pathCurve.getPointAt(t);
      const spread = 0.3 + Math.random() * 2.5;
      pPos[i * 3]     = p.x + (Math.random() - 0.5) * spread;
      pPos[i * 3 + 1] = p.y + (Math.random() - 0.5) * spread;
      pPos[i * 3 + 2] = p.z + (Math.random() - 0.5) * spread;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xdc2f02, // Deep red/gold
      size: 0.12,
      map: this.dotTex,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });
    this.pathParticles = new THREE.Points(pGeo, pMat);
    this.pathGroup.add(this.pathParticles);

    // Nodes
    this.nodes = [
      { t: 0.0,  type: 'start',    data: { title: 'Origin', desc: 'Your current coordinates.' } },
      { t: 0.45, type: 'syllabus', data: matchData.syllabus },
      { t: 0.85, type: 'career',  data: matchData.career }
    ];

    // Node markers
    this.nodes.forEach(n => {
      const p = this.pathCurve.getPointAt(n.t);
      // Bright sphere
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      sphere.position.copy(p);
      // Glow
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: this.dotTex,
        color: 0xe85d04,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.8
      }));
      sprite.scale.set(4, 4, 4);
      sphere.add(sprite);
      this.pathGroup.add(sphere);
    });

    this.mode = 'path';
    this.updateCamera(0);
  }

  /* ─── Camera Update (Scroll-Driven) ─────────────── */
  updateCamera(progress) {
    if (!this.pathCurve) return;
    this.scrollProgress = progress;
    const t = Math.max(0.001, Math.min(0.998, progress));

    const pos = this.pathCurve.getPointAt(t);
    const look = this.pathCurve.getPointAt(Math.min(0.999, t + 0.04));

    // Smooth offset for cinematic feel
    this.camera.position.lerp(
      new THREE.Vector3(pos.x + this.mouse.x * 0.5, pos.y + 0.8 + this.mouse.y * 0.3, pos.z + 1.5),
      0.08
    );
    this.camera.lookAt(look);

    // Fire node hover
    let active = null;
    for (const n of this.nodes) {
      if (Math.abs(n.t - t) < 0.06) { active = n; break; }
    }
    if (this.onNodeHover) this.onNodeHover(active);
  }

  /* ─── Resize ────────────────────────────────────── */
  _onResize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  /* ─── Render Loop ───────────────────────────────── */
  _animate() {
    requestAnimationFrame(this._animate);
    const t = this.clock.getElapsedTime();

    // Smooth mouse
    this.mouse.x += (this.mouse.tx - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.ty - this.mouse.y) * 0.05;

    // Ambient mode — camera sways gently with mouse
    if (this.mode === 'ambient') {
      this.camera.position.x += (this.mouse.x * 1.5 - this.camera.position.x) * 0.02;
      this.camera.position.y += (this.mouse.y * 0.8 - this.camera.position.y) * 0.02;
      this.camera.lookAt(0, 0, -10);
    }

    // Subtle rotation of ambient particles
    if (this.ambientParticles) {
      this.ambientParticles.rotation.y = t * 0.02;
      this.ambientParticles.rotation.x = Math.sin(t * 0.01) * 0.05;
    }

    // Path particles shimmer
    if (this.pathParticles) {
      this.pathParticles.rotation.z = Math.sin(t * 0.3) * 0.01;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
