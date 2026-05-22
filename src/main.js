import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { SemanticEngine } from './ai/SemanticEngine.js';
import { FinanceEngine } from './logic/FinanceEngine.js';
import { Lifeline } from './gl/Lifeline.js';

/* ═══════════════════════════════════════════════════════
   AuraPath — Main Orchestrator
   Cinematic act-based transitions with GSAP
   ═══════════════════════════════════════════════════════ */

class AuraPathApp {
  constructor() {
    this.semanticEngine = new SemanticEngine();
    this.financeEngine = new FinanceEngine();
    this.lifeline = null;
    this.lenis = null;
    this.matchData = null;

    this.dom = {
      cursor:       document.getElementById('cursor'),
      cursorTrail:  document.getElementById('cursor-trail'),
      actHero:      document.getElementById('act-hero'),
      actInput:     document.getElementById('act-input'),
      actLoading:   document.getElementById('act-loading'),
      actResult:    document.getElementById('act-result'),
      btnEnter:     document.getElementById('btn-enter'),
      btnGenerate:  document.getElementById('btn-generate'),
      inputInterest: document.getElementById('interest-input'),
      inputBudget:  document.getElementById('budget-input'),
      loadingLabel: document.getElementById('loading-label'),
      loadingBarFill: document.getElementById('loading-bar-fill'),
      loadingSub:   document.getElementById('loading-sub'),
      resultHud:    document.getElementById('result-hud'),
      resultNode:   document.getElementById('result-node'),
      rnLabel:      document.getElementById('rn-label'),
      rnTitle:      document.getElementById('rn-title'),
      rnDesc:       document.getElementById('rn-desc'),
      panelFinance: document.getElementById('panel-finance'),
      panelCareer:  document.getElementById('panel-career'),
      progressFill: document.getElementById('result-progress-fill'),
      scrollSpacer: document.getElementById('scroll-spacer'),
    };

    this._initCursor();
    this._initHeroAnimations();
    this._bindEvents();
    this._initGL();
  }

  /* ─── Custom Cursor ────────────────────────────────── */
  _initCursor() {
    let cx = 0, cy = 0;
    let tx = 0, ty = 0;

    document.addEventListener('mousemove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
    });

    const updateCursor = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      this.dom.cursor.style.left = `${cx}px`;
      this.dom.cursor.style.top = `${cy}px`;

      // Trail is slower
      this.dom.cursorTrail.style.left = `${cx}px`;
      this.dom.cursorTrail.style.top = `${cy}px`;

      requestAnimationFrame(updateCursor);
    };
    updateCursor();

    // Expand cursor on interactive elements
    document.querySelectorAll('[data-cursor="expand"]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.dom.cursor.classList.add('expanded');
        this.dom.cursorTrail.classList.add('expanded');
      });
      el.addEventListener('mouseleave', () => {
        this.dom.cursor.classList.remove('expanded');
        this.dom.cursorTrail.classList.remove('expanded');
      });
    });
  }

  /* ─── Hero GSAP Entrance ───────────────────────────── */
  _initHeroAnimations() {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.to('.hero-header', {
      opacity: 1, y: 0, duration: 1, ease: 'expo.out'
    })
    .to('.hero-side-nav li', {
      opacity: 0.5, x: 0, duration: 1, ease: 'expo.out', stagger: 0.1
    }, '-=0.8')
    .to('.hero-badge', {
      opacity: 1, y: 0, duration: 0.8, ease: 'expo.out'
    }, '-=0.6')
    .to('.hero-title', {
      opacity: 1, y: 0, duration: 1.2, ease: 'expo.out'
    }, '-=0.6')
    .to('.btn-magnetic', {
      opacity: 1, y: 0, duration: 0.8, ease: 'expo.out'
    }, '-=0.8')
    .to('.hero-scroll-hint', {
      opacity: 0.8, duration: 1, ease: 'power2.out'
    }, '-=0.4');
  }

  /* ─── Bind Events ──────────────────────────────────── */
  _bindEvents() {
    this.dom.btnEnter.addEventListener('click', () => this._goTo('input'));
    this.dom.btnGenerate.addEventListener('click', () => this._handleGenerate());
  }

  /* ─── Init Three.js ────────────────────────────────── */
  _initGL() {
    const canvas = document.getElementById('webgl-canvas');
    this.lifeline = new Lifeline(canvas);
    this.lifeline.onNodeHover = this._handleNodeHover.bind(this);
  }

  /* ─── Act Transitions ──────────────────────────────── */
  _goTo(act) {
    // Hide all acts
    document.querySelectorAll('.act').forEach(el => {
      el.classList.remove('act--visible');
    });

    const target = {
      hero:    this.dom.actHero,
      input:   this.dom.actInput,
      loading: this.dom.actLoading,
      result:  this.dom.actResult,
    }[act];

    // Small delay for the fade-out to breathe
    setTimeout(() => {
      target.classList.add('act--visible');

      // Entrance animations per act
      if (act === 'input') {
        gsap.from('.section-label', { opacity: 0, y: 30, duration: 0.8, ease: 'expo.out', delay: 0.2 });
        gsap.from('.section-title', { opacity: 0, y: 40, duration: 1, ease: 'expo.out', delay: 0.3 });
        gsap.from('.section-body', { opacity: 0, y: 20, duration: 0.8, ease: 'expo.out', delay: 0.5 });
        gsap.from('.field', { opacity: 0, y: 30, duration: 0.8, ease: 'expo.out', stagger: 0.1, delay: 0.4 });
        gsap.from('.btn-generate', { opacity: 0, y: 20, duration: 0.6, ease: 'expo.out', delay: 0.8 });
      }
    }, 500);
  }

  /* ─── Generate Lifeline ────────────────────────────── */
  async _handleGenerate() {
    const interest = this.dom.inputInterest.value.trim();
    const budget = parseFloat(this.dom.inputBudget.value) || 0;

    if (!interest) {
      // Flash the input border
      gsap.to('#interest-input', {
        borderBottomColor: '#ff4d4d', duration: 0.3, yoyo: true, repeat: 1,
        onComplete: () => gsap.set('#interest-input', { borderBottomColor: 'rgba(240,236,230,0.12)' })
      });
      return;
    }

    // Go to loading
    this._goTo('loading');

    // Init AI
    await this.semanticEngine.init((info) => {
      if (info.status === 'progress') {
        this.dom.loadingBarFill.style.width = `${info.progress}%`;
        this.dom.loadingSub.textContent = `${info.file || 'モデル読込中'}...`;
      }
      if (info.status === 'ready') {
        this.dom.loadingLabel.textContent = 'ベクトル解析中';
      }
    });

    this.dom.loadingLabel.textContent = '軌跡を計算中';
    this.dom.loadingSub.textContent = '最適なプログラムとキャリアを照合しています...';
    this.dom.loadingBarFill.style.width = '100%';

    // AI Match
    const matchData = await this.semanticEngine.findMatch(interest);
    const financeData = this.financeEngine.calculate(budget, matchData.syllabus);
    matchData.finance = financeData;
    this.matchData = matchData;

    // Build 3D
    this.lifeline.buildPath(matchData);

    // Transition to result after a beat
    setTimeout(() => {
      this._goTo('result');
      this._setupScrolling();
      setTimeout(() => {
        this.dom.resultHud.classList.add('visible');
      }, 600);
    }, 1200);
  }

  /* ─── Scroll-Driven Experience ─────────────────────── */
  _setupScrolling() {
    // Make sure the spacer is visible and body can scroll
    this.dom.scrollSpacer.style.display = 'block';
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';

    this.lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const tick = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const progress = window.scrollY / maxScroll;
        this.lifeline.updateCamera(progress);
        this.dom.progressFill.style.width = `${progress * 100}%`;
      }
    };

    window.addEventListener('scroll', tick, { passive: true });
    this.lenis.on('scroll', tick);

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    // Scroll to top first
    window.scrollTo(0, 0);
  }

  /* ─── Node Hover Handler ───────────────────────────── */
  _handleNodeHover(nodeInfo) {
    if (!nodeInfo) {
      this.dom.resultNode.classList.remove('visible');
      this.dom.panelFinance.classList.add('hidden');
      this.dom.panelCareer.classList.add('hidden');
      return;
    }

    this.dom.resultNode.classList.add('visible');
    this.dom.panelFinance.classList.add('hidden');
    this.dom.panelCareer.classList.add('hidden');

    if (nodeInfo.type === 'start') {
      this.dom.rnLabel.textContent = 'NODE 00 — 起点';
      this.dom.rnTitle.textContent = 'あなたの現在地';
      this.dom.rnDesc.textContent = 'ここから軌跡が始まります。スクロールして時間を進めてください。';
    }
    else if (nodeInfo.type === 'syllabus') {
      this.dom.rnLabel.textContent = 'NODE 01 — 学術・研究';
      this.dom.rnTitle.textContent = nodeInfo.data.title;
      this.dom.rnDesc.textContent = `${nodeInfo.data.university} — ${nodeInfo.data.description}`;

      // Finance
      const f = this.matchData.finance;
      this.dom.panelFinance.classList.remove('hidden');
      document.getElementById('pf-cost').textContent = `-$${f.monthlyCost}`;
      document.getElementById('pf-schol').textContent = `+$${f.monthlyScholarship}`;
      document.getElementById('pf-job').textContent = `+$${f.monthlyJob}`;
      const net = f.netImpact;
      const netEl = document.getElementById('pf-net');
      netEl.textContent = `${net >= 0 ? '+' : ''}$${net}`;
      netEl.className = net >= 0 ? 'val-pos' : 'val-neg';
    }
    else if (nodeInfo.type === 'career') {
      this.dom.rnLabel.textContent = 'NODE 02 — グローバルキャリア';
      this.dom.rnTitle.textContent = nodeInfo.data.title;
      this.dom.rnDesc.textContent = nodeInfo.data.description;

      // Career
      this.dom.panelCareer.classList.remove('hidden');
      document.getElementById('pc-role').textContent = nodeInfo.data.title;
      document.getElementById('pc-company').textContent = nodeInfo.data.company;
      document.getElementById('pc-salary').textContent = `$${nodeInfo.data.salaryStart.toLocaleString()} / 年`;
    }
  }
}

/* ─── Boot ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  new AuraPathApp();
});
