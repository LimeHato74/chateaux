import * as THREE from 'three';
import gsap from 'gsap';

export class Lifeline {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030305, 0.05);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.points = [];
    this.nodes = []; // { index on path, data }
    this.pathCurve = null;
    this.tubeMesh = null;
    this.particles = null;

    this.scrollProgress = 0; // 0 to 1

    this._initGraphics();
    
    window.addEventListener('resize', this._onResize.bind(this));
    
    this.clock = new THREE.Clock();
    this.animate = this.animate.bind(this);
    this.animate();
  }

  _initGraphics() {
    // Ambient light
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pl = new THREE.PointLight(0x00f0ff, 2, 50);
    this.scene.add(pl);
    this.pointLight = pl;
  }

  buildPath(matchData) {
    // Clear old path
    if (this.tubeMesh) this.scene.remove(this.tubeMesh);
    if (this.particles) this.scene.remove(this.particles);

    // Generate Spiral Path
    this.points = [];
    const numPoints = 100;
    const length = 100;
    
    for (let i = 0; i < numPoints; i++) {
      const t = i / numPoints;
      const angle = t * Math.PI * 4; // 2 loops
      const radius = 2 + Math.sin(t * Math.PI * 2) * 1.5;
      
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius + (t * 5); // Rise up
      const z = -t * length; // Move forward in -Z
      
      this.points.push(new THREE.Vector3(x, y, z));
    }

    this.pathCurve = new THREE.CatmullRomCurve3(this.points);

    // Create glowing tube
    const tubeGeo = new THREE.TubeGeometry(this.pathCurve, 200, 0.1, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    this.tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    this.scene.add(this.tubeMesh);

    // Create particles along the path
    const particleCount = 10000;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    
    for(let i=0; i<particleCount; i++) {
      const t = Math.random();
      const pt = this.pathCurve.getPointAt(t);
      // add noise
      pt.x += (Math.random() - 0.5) * 2;
      pt.y += (Math.random() - 0.5) * 2;
      pt.z += (Math.random() - 0.5) * 2;
      
      pPos[i*3] = pt.x;
      pPos[i*3+1] = pt.y;
      pPos[i*3+2] = pt.z;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    
    const pMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    this.particles = new THREE.Points(pGeo, pMat);
    this.scene.add(this.particles);

    // Place Nodes
    this.nodes = [
      { t: 0.0, type: 'start', data: { title: 'Current Node: Japan', desc: 'Your starting coordinate.' } },
      { t: 0.4, type: 'syllabus', data: matchData.syllabus },
      { t: 0.8, type: 'career', data: matchData.career }
    ];

    // Node visual markers
    this.nodes.forEach(n => {
      const pt = this.pathCurve.getPointAt(n.t);
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xff003c })
      );
      mesh.position.copy(pt);
      this.scene.add(mesh);
    });

    // Reset camera
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
