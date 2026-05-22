import * as THREE from 'three';
import gsap from 'gsap';

function createSoftCircleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.2, 'rgba(212,175,55,0.8)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

export class Lifeline {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050505, 0.04);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.points = [];
    this.nodes = []; 
    this.pathCurve = null;
    this.tubeMesh = null;
    this.particles = null;

    this.scrollProgress = 0; 
    this.particleTexture = createSoftCircleTexture();

    this._initGraphics();
    
    window.addEventListener('resize', this._onResize.bind(this));
    
    this.clock = new THREE.Clock();
    this.animate = this.animate.bind(this);
    this.animate();
  }

  _initGraphics() {
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const pl = new THREE.PointLight(0xd4af37, 3, 40);
    this.scene.add(pl);
    this.pointLight = pl;
  }

  buildPath(matchData) {
    if (this.tubeMesh) this.scene.remove(this.tubeMesh);
    if (this.particles) this.scene.remove(this.particles);

    this.points = [];
    const numPoints = 150;
    const length = 120;
    
    for (let i = 0; i < numPoints; i++) {
      const t = i / numPoints;
      const angle = t * Math.PI * 6; // 3 loops
      const radius = 2 + Math.sin(t * Math.PI * 3) * 1.5;
      
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius + (t * 8); 
      const z = -t * length; 
      
      this.points.push(new THREE.Vector3(x, y, z));
    }

    this.pathCurve = new THREE.CatmullRomCurve3(this.points);

    // Glowing Tube
    const tubeGeo = new THREE.TubeGeometry(this.pathCurve, 300, 0.08, 6, false);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    this.tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    this.scene.add(this.tubeMesh);

    // Particles
    const particleCount = 15000;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    
    for(let i=0; i<particleCount; i++) {
      const t = Math.random();
      const pt = this.pathCurve.getPointAt(t);
      // More dispersed noise
      pt.x += (Math.random() - 0.5) * 4;
      pt.y += (Math.random() - 0.5) * 4;
      pt.z += (Math.random() - 0.5) * 4;
      
      pPos[i*3] = pt.x;
      pPos[i*3+1] = pt.y;
      pPos[i*3+2] = pt.z;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    
    const pMat = new THREE.PointsMaterial({
      color: 0xffdf00,
      size: 0.2,
      map: this.particleTexture,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.particles = new THREE.Points(pGeo, pMat);
    this.scene.add(this.particles);

    // Place Nodes
    this.nodes = [
      { t: 0.0, type: 'start', data: { title: 'Current Node: Japan', desc: 'Your starting coordinate.' } },
      { t: 0.45, type: 'syllabus', data: matchData.syllabus },
      { t: 0.85, type: 'career', data: matchData.career }
    ];

    this.nodes.forEach(n => {
      const pt = this.pathCurve.getPointAt(n.t);
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      mesh.position.copy(pt);
      
      // Node glow
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: this.particleTexture,
        color: 0xffffff,
        transparent: true,
        blending: THREE.AdditiveBlending
      }));
      glow.scale.set(3, 3, 3);
      mesh.add(glow);
      
      this.scene.add(mesh);
    });

    this.updateCamera(0);
  }

  updateCamera(progress) {
    if (!this.pathCurve) return;
    
    // Clamp progress
    const t = Math.max(0.001, Math.min(0.999, progress));
    
    const currentPoint = this.pathCurve.getPointAt(t);
    const lookAtPoint = this.pathCurve.getPointAt(Math.min(1.0, t + 0.05));

    // Place camera slightly above and behind the current point
    this.camera.position.copy(currentPoint);
    this.camera.position.y += 0.5; // Offset
    
    this.camera.lookAt(lookAtPoint);
    
    // Move light
    this.pointLight.position.copy(currentPoint);
    this.pointLight.position.z -= 2;

    // Check if we are near a node to trigger events
    let activeNode = null;
    for(const n of this.nodes) {
      if (Math.abs(n.t - t) < 0.05) {
        activeNode = n;
        break;
      }
    }

    if (this.onNodeHover) {
      this.onNodeHover(activeNode);
    }
  }

  _onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(this.animate);
    const dt = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    if (this.particles) {
      this.particles.rotation.z = time * 0.1;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
