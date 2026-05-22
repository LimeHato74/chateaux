import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { SemanticEngine } from './ai/SemanticEngine.js';
import { FinanceEngine } from './logic/FinanceEngine.js';
import { Lifeline } from './gl/Lifeline.js';

class AuraPathApp {
  constructor() {
    this.semanticEngine = new SemanticEngine();
    this.financeEngine = new FinanceEngine();
    this.lifeline = null;
    this.lenis = null;
    
    this.dom = {
      btnGenerate: document.getElementById('btn-generate'),
      inputInterest: document.getElementById('interest-input'),
      inputBudget: document.getElementById('budget-input'),
      screenInput: document.getElementById('screen-input'),
      screenLoading: document.getElementById('screen-loading'),
      screenResult: document.getElementById('screen-result'),
      hud: document.getElementById('hud'),
      statusText: document.getElementById('status-text'),
      progressFill: document.getElementById('progress-fill'),
      loadingDetails: document.getElementById('loading-details'),
      nodeHud: document.getElementById('node-hud'),
      nodeLabel: document.getElementById('node-label'),
      nodeTitle: document.getElementById('node-title'),
      nodeDesc: document.getElementById('node-desc'),
      financeBlock: document.getElementById('finance-block'),
      careerBlock: document.getElementById('career-block'),
      scrollInstruction: document.getElementById('scroll-instruction'),
    };

    this.init();
  }

  async init() {
    // Init GL
    const canvas = document.getElementById('webgl-canvas');
    this.lifeline = new Lifeline(canvas);
    this.lifeline.onNodeHover = this.handleNodeHover.bind(this);

    // Bind UI
    this.dom.btnGenerate.addEventListener('click', this.handleGenerate.bind(this));
  }

  async handleGenerate() {
    const interest = this.dom.inputInterest.value.trim();
    const budget = parseFloat(this.dom.inputBudget.value) || 0;
    if (!interest) {
      alert("Please enter what drives you.");
      return;
    }

    // Transition to loading
    this.dom.screenInput.classList.remove('screen--active');
    this.dom.screenLoading.classList.add('screen--active');
    this.dom.statusText.textContent = "DOWNLOADING...";

    // Init AI with progress callback
    await this.semanticEngine.init((info) => {
      if (info.status === 'progress') {
        this.dom.progressFill.style.width = `${info.progress}%`;
        this.dom.loadingDetails.textContent = `Loading ${info.file}...`;
      }
    });

    this.dom.statusText.textContent = "INFERRING...";
    this.dom.loadingDetails.textContent = "Calculating Multi-Dimensional Vectors...";
    this.dom.progressFill.style.width = `100%`;

    // Perform Semantic Search
    const matchData = await this.semanticEngine.findMatch(interest);
    
    // Perform Finance Calculation
    const financeData = this.financeEngine.calculate(budget, matchData.syllabus);
    
    // Augment match data
    matchData.finance = financeData;

    // Generate 3D Path
    this.lifeline.buildPath(matchData);

    // Setup smooth scrolling
    this.setupScrolling();

    // Transition to result
    setTimeout(() => {
      this.dom.screenLoading.classList.remove('screen--active');
      this.dom.screenResult.classList.add('screen--active');
      this.dom.hud.classList.remove('hidden');
      this.dom.scrollInstruction.classList.remove('hidden');
      document.getElementById('scroll-height').classList.remove('hidden');
      this.dom.statusText.textContent = "ONLINE";
    }, 1000);
  }

  setupScrolling() {
    this.lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const onScroll = (e) => {
      // Hide instruction on first scroll
      if (this.dom.scrollInstruction && window.scrollY > 10) {
        this.dom.scrollInstruction.classList.add('hidden');
      }

      // Calculate progress (0 to 1) based on body height
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      
      this.lifeline.updateCamera(progress);
    };

    // Use native scroll event to drive progress if lenis scroll event isn't firing
    window.addEventListener('scroll', onScroll);
    this.lenis.on('scroll', onScroll);

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });
  }

  handleNodeHover(nodeInfo) {
    if (!nodeInfo) {
      this.dom.nodeHud.classList.remove('visible');
      return;
    }

    this.dom.nodeHud.classList.add('visible');
    
    // Reset blocks
    this.dom.financeBlock.classList.add('hidden');
    this.dom.careerBlock.classList.add('hidden');

    if (nodeInfo.type === 'start') {
      this.dom.nodeLabel.textContent = "NODE: 00 - ORIGIN";
      this.dom.nodeTitle.textContent = "Current Trajectory";
      this.dom.nodeDesc.textContent = "Your journey begins here. Scroll to advance time.";
    } 
    else if (nodeInfo.type === 'syllabus') {
      this.dom.nodeLabel.textContent = "NODE: 01 - ACADEMIA";
      this.dom.nodeTitle.textContent = nodeInfo.data.title;
      this.dom.nodeDesc.textContent = `${nodeInfo.data.university} — ${nodeInfo.data.description}`;
      
      // Show Finance Block
      this.dom.financeBlock.classList.remove('hidden');
      document.getElementById('f-cost').textContent = `-${nodeInfo.data.finance.monthlyCost} ${nodeInfo.data.finance.currency}`;
      document.getElementById('f-schol').textContent = `+${nodeInfo.data.finance.monthlyScholarship} ${nodeInfo.data.finance.currency}`;
      document.getElementById('f-job').textContent = `+${nodeInfo.data.finance.monthlyJob} ${nodeInfo.data.finance.currency}`;
      
      const net = nodeInfo.data.finance.netImpact;
      const netEl = document.getElementById('f-net');
      netEl.textContent = `${net > 0 ? '+' : ''}${net} ${nodeInfo.data.finance.currency}`;
      netEl.className = net >= 0 ? 'f-green total' : 'f-red total';
    }
    else if (nodeInfo.type === 'career') {
      this.dom.nodeLabel.textContent = "NODE: 02 - GLOBAL CAREER";
      this.dom.nodeTitle.textContent = "The Horizon";
      this.dom.nodeDesc.textContent = "Your estimated trajectory post-graduation.";

      // Show Career Block
      this.dom.careerBlock.classList.remove('hidden');
      document.getElementById('c-role').textContent = nodeInfo.data.title;
      document.getElementById('c-company').textContent = nodeInfo.data.company;
      document.getElementById('c-salary').textContent = `${nodeInfo.data.salaryStart.toLocaleString()} ${nodeInfo.data.currency} / yr`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AuraPathApp();
});
