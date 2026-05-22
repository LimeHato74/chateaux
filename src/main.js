import { castles } from './data/castles.js';

/* ─── Seeded RNG ─────────────────────────────────── */
function makeRng(seed) {
  let s = Math.abs(seed) || 1;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
function clamp(min, val, max) { return Math.min(max, Math.max(min, val)); }

/* ─── App ────────────────────────────────────────── */
class App {
  constructor() {
    this.acts = {
      intro:  document.getElementById('act-intro'),
      gallery: document.getElementById('act-gallery'),
      choose: document.getElementById('act-choose'),
      detail: document.getElementById('act-detail'),
    };
    this.canvas = document.getElementById('dissolution-canvas');

    this.setupIntro();
    this.buildGalleryPanels();
    this.buildChooseGrid();
    this.bindGlobalEvents();
  }

  /* ── Navigation ── */
  goto(actKey) {
    Object.values(this.acts).forEach(el => el.classList.remove('act--active'));
    this.acts[actKey].classList.add('act--active');

    // Reset scroll state for detail view
    if (actKey === 'detail') {
      document.body.classList.add('allow-scroll');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      document.body.classList.remove('allow-scroll');
      document.body.style.overflow = 'hidden';
    }
  }

  /* ═══════════════════════════════════════════════
     ACT I — INTRO
     ═══════════════════════════════════════════════ */
  setupIntro() {
    document.querySelectorAll('.intro-line').forEach(el => {
      const delay = parseInt(el.dataset.delay) || 0;
      el.style.animationDelay = `${delay}ms`;
    });

    const btn = document.getElementById('begin-btn');
    btn.style.animationDelay = `${btn.dataset.delay || 3200}ms`;
    btn.addEventListener('click', () => this.goto('gallery'));
  }

  /* ═══════════════════════════════════════════════
     ACT II — GALLERY (Horizontal Scroll)
     ═══════════════════════════════════════════════ */
  buildGalleryPanels() {
    const container = document.getElementById('castle-panels');

    castles.forEach((castle, i) => {
      const panel = document.createElement('div');
      panel.className = 'panel panel--castle';
      panel.innerHTML = `
        <div class="castle-panel-layout">
          <div class="cp-image-side">
            <img src="${castle.image}" alt="${castle.name}" referrerpolicy="no-referrer" />
            <div class="cp-number">0${i + 1}</div>
          </div>
          <div class="cp-text-side">
            <div class="cp-philosophy">${castle.philosophy}</div>
            <h2 class="cp-name">${castle.name}</h2>
            <p class="cp-question">${castle.question}</p>
            <div class="cp-meta">
              <div class="cp-meta-item">
                <span class="cp-meta-label">Constructed</span>
                <span class="cp-meta-value">${castle.constructed}</span>
              </div>
              <div class="cp-meta-item">
                <span class="cp-meta-label">Style</span>
                <span class="cp-meta-value">${castle.style}</span>
              </div>
              <div class="cp-meta-item">
                <span class="cp-meta-label">Region</span>
                <span class="cp-meta-value">${castle.region}</span>
              </div>
            </div>
          </div>
        </div>
      `;
      container.appendChild(panel);
    });

    const hscroll = document.getElementById('hscroll');
    hscroll.addEventListener('wheel', (e) => {
      // Only horizontal scroll in gallery
      if (this.acts.gallery.classList.contains('act--active')) {
        e.preventDefault();
        hscroll.scrollLeft += e.deltaY * 2;
      }
    }, { passive: false });

    document.getElementById('choose-btn').addEventListener('click', () => {
      this.goto('choose');
    });
  }

  /* ═══════════════════════════════════════════════
     ACT III — CHOOSE YOUR LIFE
     ═══════════════════════════════════════════════ */
  buildChooseGrid() {
    const grid = document.getElementById('choose-grid');

    castles.forEach(castle => {
      const card = document.createElement('div');
      card.className = 'choose-card';
      card.innerHTML = `
        <img src="${castle.image}" alt="${castle.name}" referrerpolicy="no-referrer" />
        <div class="choose-overlay">
          <div class="choose-philosophy">${castle.philosophy}</div>
          <h3 class="choose-name">${castle.name}</h3>
          <div class="choose-year">Est. ${castle.constructed}</div>
        </div>
      `;
      card.addEventListener('click', () => this.openDissolution(castle));
      grid.appendChild(card);
    });
  }

  /* ═══════════════════════════════════════════════
     ACT IV — DISSOLUTION (Procedural Detail)
     ═══════════════════════════════════════════════ */
  openDissolution(castle) {
    this.buildDissolution(castle);
    this.goto('detail');
  }

  buildDissolution(castle) {
    const C = this.canvas;
    C.innerHTML = '';

    const rnd = makeRng(castle.constructed * 7 + castle.id.charCodeAt(0) * 137);
    const P = castle.seedParams;

    const addEl = (tag, cls, delay) => {
      const el = document.createElement(tag);
      el.className = `diss-elem ${cls}`;
      el.style.animationDelay = `${delay}s`;
      C.appendChild(el);
      return el;
    };

    /* 1 — Background image */
    const bg = document.createElement('img');
    bg.className = 'diss-bg';
    bg.src = castle.image;
    bg.referrerPolicy = 'no-referrer';
    C.appendChild(bg);

    /* 2 — Ghost year (fixed pos) */
    const ghost = addEl('div', 'diss-ghost-year', 0.1);
    ghost.textContent = castle.constructed;
    ghost.style.bottom = `${-8 + rnd() * 15}vh`;
    ghost.style.left = `${-5 + rnd() * 15}vw`;

    /* 3 — Decorative rules */
    const nRules = 3 + Math.floor(rnd() * 5 * P.chaos);
    for (let i = 0; i < nRules; i++) {
      const rule = addEl('div', 'diss-rule', 0.2 + rnd() * 0.5);
      // distribute rules along the massive scroll height
      rule.style.top = `${10 + rnd() * 200}vh`; 
      rule.style.left = `${rnd() * 25}vw`;
      rule.style.width = `${25 + rnd() * 55}vw`;
      rule.style.transform = `rotate(${(rnd() - 0.5) * 10 * P.chaos}deg)`;
    }

    /* 4 — Castle name layers */
    const primaryFz = clamp(7, P.scaleVariance * 5 + 4, 20);
    const primary = addEl('div', 'diss-title', 0.4);
    primary.textContent = castle.name.toUpperCase();
    primary.style.fontFamily = P.fontFamily;
    primary.style.fontSize = `${primaryFz}vw`;
    primary.style.left = `${3 + rnd() * 5}vw`;
    primary.style.top = `${10 + rnd() * 10}vh`;

    /* 5 — Philosophy label */
    const philo = addEl('div', 'diss-philosophy', 0.3);
    philo.textContent = castle.philosophy.toUpperCase();
    const philoFz = 4 + rnd() * 5 * P.scaleVariance;
    philo.style.fontSize = `${philoFz}vw`;
    philo.style.top = `${5 + rnd() * 10}vh`;
    philo.style.right = `${2 + rnd() * 8}vw`;
    philo.style.transform = `rotate(${(rnd() - 0.5) * 6}deg)`;

    /* 6 — Description card */
    const card = addEl('div', 'diss-card', 0.8);
    card.innerHTML = `
      <div class="diss-card-label">${castle.region} — ${castle.constructed}</div>
      <div class="diss-card-text">${castle.description}</div>
    `;
    const cardOnRight = rnd() > 0.4;
    card.style[cardOnRight ? 'right' : 'left'] = `${5 + rnd() * 10}vw`;
    card.style.top = `${30 + rnd() * 15}vh`;
    card.style.transform = `rotate(${(rnd() - 0.5) * 3}deg)`;

    /* 7 — Life Simulation Blocks (Morning, Afternoon, Evening) */
    const lifeKeys = ['morning', 'afternoon', 'evening'];
    let currentVp = 70 + rnd() * 20; // Start placing around 70vh

    lifeKeys.forEach((key, idx) => {
      const block = addEl('div', 'life-block', 1.0 + (idx * 0.2));
      block.innerHTML = `
        <div class="life-block-time">${key.toUpperCase()}</div>
        <div class="life-block-desc">${castle.dailyLife[key]}</div>
      `;
      // Zig-zag placement
      const isRight = (idx % 2 === 0);
      block.style[isRight ? 'right' : 'left'] = `${10 + rnd() * 15}vw`;
      block.style.top = `${currentVp}vh`;
      
      currentVp += 35 + rnd() * 15; // move down for next block
    });

    /* 8 — Career / Reality Block */
    currentVp += 20; // Give some breathing room
    
    const career = addEl('div', 'career-block', 1.8);
    let pathsHtml = castle.career.paths.map(p => `
      <div class="career-path">
        <div class="career-path-role">${p.role}</div>
        <div class="career-path-meta">
          <strong>Compensation:</strong> ${p.salary}<br>
          <strong>Trajectory:</strong> ${p.years}
        </div>
      </div>
    `).join('');

    career.innerHTML = `
      <h3 class="career-title">${castle.career.title}</h3>
      <div class="career-grid">
        ${pathsHtml}
      </div>
      <div class="career-reality">
        <div class="career-reality-label">The Reality & Cost</div>
        <div class="career-reality-text">
          <strong>Estimate:</strong> ${castle.career.estimatedCost}<br><br>
          ${castle.career.reality}
        </div>
      </div>
    `;
    
    // Center it somewhat
    career.style.left = `50%`;
    career.style.transform = `translateX(-50%) rotate(${(rnd() - 0.5) * 2}deg)`;
    career.style.top = `${currentVp}vh`;

    /* 9 — Final Question whisper */
    currentVp += 60; // Bottom of the page
    
    const q = addEl('div', 'diss-question', 2.0);
    q.textContent = castle.question;
    q.style.top = `${currentVp}vh`;
    q.style.left = `${15 + rnd() * 20}vw`;
    q.style.transform = `rotate(${(rnd() - 0.5) * 2}deg)`;

    // Adjust canvas height to fit everything
    C.style.minHeight = `${currentVp + 40}vh`;
  }

  bindGlobalEvents() {
    document.getElementById('back-btn').addEventListener('click', () => {
      this.goto('choose');
      setTimeout(() => { this.canvas.innerHTML = ''; }, 1200);
    });

    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (this.acts.detail.classList.contains('act--active')) {
          this.goto('choose');
          setTimeout(() => { this.canvas.innerHTML = ''; }, 1200);
        } else if (this.acts.choose.classList.contains('act--active')) {
          this.goto('gallery');
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => new App());
