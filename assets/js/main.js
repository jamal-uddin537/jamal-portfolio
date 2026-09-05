/**
 * JAMAL UD DIN — PORTFOLIO INTERACTION ENGINE
 * Agency-Grade QA & Interaction Suite
 * ScrollSpy, Canvas FEA Simulator, Theme Controller, Animated Playback, Skill Sync
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTimeWidget();
  initScrollSpy();
  initBackToTop();
  initCursorSpotlight();
  initPortraitTilt();
  initScrollReveal();
  initAnimatedMetrics();
  initOpportunitySwitcher();
  initDiffusionBondingSimulator();
  initClipboardActions();
  initMobileMenu();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Dark / Light)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('jamal-theme');

  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('jamal-theme', newTheme);
      updateThemeIcon(newTheme);

      // Re-render canvas if present to adapt theme colors
      if (typeof window.renderFeaCanvas === 'function') {
        window.renderFeaCanvas();
      }
    });
  }
}

function updateThemeIcon(theme) {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  if (theme === 'light') {
    toggleBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>`;
    toggleBtn.setAttribute('title', 'Switch to Dark Mode');
  } else {
    toggleBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>`;
    toggleBtn.setAttribute('title', 'Switch to Light Mode');
  }
}

/* --------------------------------------------------------------------------
   2. Live Xi'an (UTC+8) Time Clock
   -------------------------------------------------------------------------- */
function initTimeWidget() {
  const timeElem = document.getElementById('xian-time');
  if (!timeElem) return;

  function update() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const xianDate = new Date(utc + (3600000 * 8));
    const hours = String(xianDate.getHours()).padStart(2, '0');
    const minutes = String(xianDate.getMinutes()).padStart(2, '0');
    timeElem.textContent = `${hours}:${minutes} CST`;
  }

  update();
  setInterval(update, 30000);
}

/* --------------------------------------------------------------------------
   3. ScrollSpy & Navigation Tracking
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   4. Floating Back-to-Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const topBtn = document.getElementById('back-to-top-btn');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  }, { passive: true });

  topBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   5. Opportunity & Persona Switcher with Skill Highlighting
   -------------------------------------------------------------------------- */
const OPPORTUNITY_DATA = {
  aerospace: {
    trackKey: 'aerospace',
    title: 'Aerospace & Materials R&D Engineer',
    pitch: 'Delivering microstructural reliability and high-performance joint integrity for mission-critical titanium alloys. Leveraging experimental characterization and thermal-mechanical optimization.',
    deliverables: [
      'Optimization of diffusion bonding parameters (temperature, pressure, dwell time)',
      'Joint reliability testing and microstructural void closure analysis',
      'Advanced materials characterization for aerospace alloys (Ti-60)',
      'Bridging fundamental metallurgy with high-temperature mechanical behavior'
    ],
    skills: [
      'Ti-60 Titanium Alloys', 'Diffusion Bonding', 'Materials Characterization', 
      'Joint Reliability', 'Microstructure Integrity', 'Experimental Design', 'High-Temp Mechanics'
    ]
  },
  simulation: {
    trackKey: 'simulation',
    title: 'CAE & Computational Simulation Engineer',
    pitch: 'Automating high-fidelity finite element workflows and complex thermal-mechanical modeling. Coupling physics-based simulations with Python data extraction pipelines.',
    deliverables: [
      'Abaqus Finite Element Analysis (FEA) for non-linear contact & thermal stress',
      'End-to-end Python scripting to automate simulation jobs and mesh generation',
      'Data extraction, parametric batch sweeps, and automated reporting',
      'Coupling experimental mechanical data with numerical validation models'
    ],
    skills: [
      'Abaqus FEA', 'Python Automation', 'Thermal-Mechanical Modeling',
      'Finite Element Analysis', 'Data Extraction Pipelines', 'Non-linear Contact', 'Data Visualization'
    ]
  },
  physics: {
    trackKey: 'physics',
    title: 'Applied Physics & Research Specialist',
    pitch: 'Deep theoretical and mathematical foundation spanning classical mechanics, thermodynamics, and electromagnetism, applied to cutting-edge physical problems.',
    deliverables: [
      'Rigorous physical modeling of atomic diffusion and thermal energy transfer',
      'Designing reproducible experimental frameworks and error analysis',
      'Solid-state physics analysis and quantum mechanics fundamentals',
      'Scientific literature synthesis and peer-level technical documentation'
    ],
    skills: [
      'Thermodynamics', 'Classical Mechanics', 'Electromagnetism',
      'Quantum Physics', 'Solid-State Physics', 'Optics', 'Mathematical Physics', 'Scientific Writing'
    ]
  },
  education: {
    trackKey: 'education',
    title: 'STEM Educator & Academic Lecturer',
    pitch: 'Inspiring the next generation of engineers and scientists through rigorous, practical, and laboratory-driven physics instruction.',
    deliverables: [
      'Comprehensive physics curricula delivery bridging abstract concepts to real experiments',
      'Classroom leadership, board examination readiness, and targeted student mentorship',
      'Designing hands-on laboratory demonstrations for mechanics, optics, and electronics',
      'Cross-cultural communication with professional English and conversational Arabic'
    ],
    skills: [
      'Curriculum Delivery', 'Laboratory Demonstrations', 'Classroom Leadership',
      'Exam Preparation', 'Student Mentoring', 'Cross-Cultural Communication', 'Bilingual STEM'
    ]
  }
};

function initOpportunitySwitcher() {
  const tabs = document.querySelectorAll('.filter-tab');
  const roleTitle = document.getElementById('opp-role-title');
  const rolePitch = document.getElementById('opp-pitch');
  const deliverablesContainer = document.getElementById('opp-deliverables');
  const skillsContainer = document.getElementById('opp-skills');
  const allSkillChips = document.querySelectorAll('.skill-chip[data-track]');

  if (!tabs.length || !roleTitle) return;

  function renderOpportunity(key) {
    const data = OPPORTUNITY_DATA[key];
    if (!data) return;

    // Update ARIA tab states
    tabs.forEach(tab => {
      const isSelected = tab.getAttribute('data-target') === key;
      tab.classList.toggle('active', isSelected);
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    // Smooth card transition
    const card = document.getElementById('opp-card');
    if (card) {
      card.style.opacity = '0.5';
      card.style.transform = 'translateY(4px)';
    }

    setTimeout(() => {
      roleTitle.textContent = data.title;
      rolePitch.textContent = data.pitch;

      deliverablesContainer.innerHTML = data.deliverables.map(item => `
        <div class="opp-item">
          <span class="opp-item-icon">✓</span>
          <span>${item}</span>
        </div>
      `).join('');

      skillsContainer.innerHTML = data.skills.map(skill => `
        <span class="opp-pill">${skill}</span>
      `).join('');

      if (card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    }, 150);

    // Sync highlight with Skills Matrix
    allSkillChips.forEach(chip => {
      if (chip.getAttribute('data-track') === data.trackKey) {
        chip.classList.add('skill-highlighted');
      } else {
        chip.classList.remove('skill-highlighted');
      }
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');
      renderOpportunity(target);
    });

    // Arrow Key Navigation between tabs
    tab.addEventListener('keydown', (e) => {
      let targetIndex = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        targetIndex = (index + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        targetIndex = (index - 1 + tabs.length) % tabs.length;
      }
      if (targetIndex !== -1) {
        e.preventDefault();
        tabs[targetIndex].focus();
        tabs[targetIndex].click();
      }
    });
  });

  // Default render
  renderOpportunity('aerospace');
}

/* --------------------------------------------------------------------------
   6. Interactive Ti-60 Diffusion Bonding Simulator (Canvas FEA Engine)
   -------------------------------------------------------------------------- */
function initDiffusionBondingSimulator() {
  const canvas = document.getElementById('sim-canvas');
  const tempSlider = document.getElementById('sim-temp');
  const pressSlider = document.getElementById('sim-press');
  const timeSlider = document.getElementById('sim-time');

  const tempVal = document.getElementById('val-temp');
  const pressVal = document.getElementById('val-press');
  const timeVal = document.getElementById('val-time');

  const resBond = document.getElementById('res-bond');
  const resVoid = document.getElementById('res-void');
  const resStatus = document.getElementById('res-status');
  const interfaceReadout = document.getElementById('interface-readout');
  const playBtn = document.getElementById('sim-play-btn');

  if (!canvas || !tempSlider || !pressSlider || !timeSlider) return;
  const ctx = canvas.getContext('2d');

  let isPlaying = false;
  let animFrameId = null;

  // Interactive Mouse Probe Tracking on Canvas
  let mouse = { x: -1, y: -1, active: false };
  const probeTooltip = document.getElementById('sim-probe-tooltip');
  const probeStress = document.getElementById('probe-stress');
  const probePress = document.getElementById('probe-press');
  const probeStrain = document.getElementById('probe-strain');

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;

    if (probeTooltip) {
      probeTooltip.classList.add('active');
      const midY = rect.height / 2;
      const distY = Math.abs(mouse.y - midY);
      const P = parseFloat(pressSlider.value);
      const T = parseFloat(tempSlider.value);
      const curBond = parseFloat(resBond.textContent) || 90;
      const curVoid = 100 - curBond;

      // Local stress concentration near interface & void regions
      const conc = 1 + (curVoid / 100) * 1.8 * Math.exp(-distY / 22);
      const localStressVal = (P * 14.5 * conc).toFixed(1);
      const localPressVal = (P * (1 + 0.9 * Math.exp(-distY / 14))).toFixed(1);

      if (probeStress) probeStress.textContent = `${localStressVal} MPa`;
      if (probePress) probePress.textContent = `${localPressVal} MPa`;
      if (probeStrain) {
        probeStrain.textContent = distY < 14 ? 'Yield / Diffusion' : (distY < 32 ? 'Viscoplastic' : 'Elastic Base');
      }
    }
    calculateBonding();
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.active = false;
    if (probeTooltip) {
      probeTooltip.classList.remove('active');
    }
    calculateBonding();
  });

  // Deterministic Ti-60 Polycrystalline Grain Boundary Network
  const grainBoundaries = [
    // Upper Specimen Grains
    [0.08, 0.12, 0.16, 0.36], [0.16, 0.36, 0.25, 0.18], [0.25, 0.18, 0.34, 0.40],
    [0.34, 0.40, 0.44, 0.15], [0.44, 0.15, 0.52, 0.38], [0.52, 0.38, 0.62, 0.14],
    [0.62, 0.14, 0.72, 0.39], [0.72, 0.39, 0.82, 0.19], [0.82, 0.19, 0.90, 0.41],
    // Near Upper Interface Subgrains
    [0.16, 0.36, 0.20, 0.49], [0.34, 0.40, 0.38, 0.49], [0.52, 0.38, 0.55, 0.49],
    [0.72, 0.39, 0.74, 0.49], [0.90, 0.41, 0.92, 0.49],
    // Lower Specimen Grains
    [0.06, 0.85, 0.14, 0.62], [0.14, 0.62, 0.24, 0.84], [0.24, 0.84, 0.35, 0.59],
    [0.35, 0.59, 0.46, 0.83], [0.46, 0.83, 0.54, 0.61], [0.54, 0.61, 0.65, 0.85],
    [0.65, 0.85, 0.74, 0.62], [0.74, 0.62, 0.84, 0.82], [0.84, 0.82, 0.92, 0.61],
    // Near Lower Interface Subgrains
    [0.14, 0.62, 0.20, 0.51], [0.35, 0.59, 0.38, 0.51], [0.54, 0.61, 0.55, 0.51],
    [0.74, 0.62, 0.74, 0.51], [0.92, 0.61, 0.92, 0.51]
  ];

  function calculateBonding() {
    const T = parseFloat(tempSlider.value); // °C (860 to 940)
    const P = parseFloat(pressSlider.value); // MPa (1.0 to 5.0)
    const t = parseFloat(timeSlider.value);  // min (30 to 120)

    tempVal.textContent = `${T} °C`;
    pressVal.textContent = `${P.toFixed(1)} MPa`;
    timeVal.textContent = `${t} min`;

    // Diffusion bonding empirical kinetics model:
    const T_kelvin = T + 273.15;
    const Q_eff = 145000; // J/mol
    const R = 8.314;
    const k_diff = Math.exp(-Q_eff / (R * T_kelvin)) * 1.85e6;
    
    // Joint contact area approximation (0 to 100%)
    const exponent = -k_diff * Math.pow(P, 0.75) * Math.pow(t, 0.65) * 0.45;
    let bondRatio = (1 - Math.exp(exponent)) * 100;
    
    if (bondRatio > 99.8) bondRatio = 99.8;
    if (bondRatio < 45.0) bondRatio = 45.0;
    
    const voidRatio = (100 - bondRatio);

    let status = 'Optimal Joint';
    let statusColor = '#38bdf8';

    if (T >= 935 && t >= 90) {
      status = 'Grain Coarsening Risk';
      statusColor = '#f59e0b';
    } else if (bondRatio >= 95.0) {
      status = 'High-Integrity Bond';
      statusColor = '#10b981';
    } else if (bondRatio >= 85.0) {
      status = 'Acceptable / Intermediate';
      statusColor = '#38bdf8';
    } else {
      status = 'Under-bonded (Void Risk)';
      statusColor = '#ef4444';
    }

    resBond.textContent = `${bondRatio.toFixed(1)}%`;
    resVoid.textContent = `${voidRatio.toFixed(1)}%`;
    resStatus.textContent = status;
    resStatus.style.color = statusColor;

    if (interfaceReadout) {
      interfaceReadout.textContent = `Abaqus FEA Stress: ${(P * 1.84).toFixed(1)} MPa | Void Closure: ${bondRatio.toFixed(1)}%`;
    }

    drawCanvas(T, P, t, bondRatio, voidRatio, statusColor);
  }

  function drawCanvas(T, P, t, bondRatio, voidRatio, statusColor) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 560;
    const h = rect.height || 200;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const bgPlate = isLight ? '#e2e8f0' : '#131722';
    const meshLine = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.07)';
    const textColor = isLight ? '#0f172a' : '#f1f5f9';
    const mutedColor = isLight ? '#64748b' : '#94a3b8';

    ctx.clearRect(0, 0, w, h);

    const midY = h / 2;
    const plateMargin = 16;
    const plateWidth = w - plateMargin * 2;
    const halfH = (h - 32) / 2;

    // 1. Draw Upper Ti-60 Plate with FEA Mesh
    const topGrad = ctx.createLinearGradient(0, plateMargin, 0, midY);
    topGrad.addColorStop(0, bgPlate);
    topGrad.addColorStop(1, isLight ? '#cbd5e1' : '#1e2433');

    ctx.fillStyle = topGrad;
    ctx.fillRect(plateMargin, plateMargin, plateWidth, halfH);

    // 2. Draw Lower Ti-60 Plate with FEA Mesh
    const botGrad = ctx.createLinearGradient(0, midY, 0, h - plateMargin);
    botGrad.addColorStop(0, isLight ? '#cbd5e1' : '#1e2433');
    botGrad.addColorStop(1, bgPlate);

    ctx.fillStyle = botGrad;
    ctx.fillRect(plateMargin, midY, plateWidth, halfH);

    // 3. Draw Quad Finite Element Mesh Lines
    ctx.strokeStyle = meshLine;
    ctx.lineWidth = 1;

    const cols = 14;
    const colW = plateWidth / cols;
    for (let c = 0; c <= cols; c++) {
      const x = plateMargin + c * colW;
      ctx.beginPath();
      ctx.moveTo(x, plateMargin);
      ctx.lineTo(x, h - plateMargin);
      ctx.stroke();
    }

    const rows = 6;
    const rowH = (h - 32) / rows;
    for (let r = 0; r <= rows; r++) {
      const y = plateMargin + r * rowH;
      ctx.beginPath();
      ctx.moveTo(plateMargin, y);
      ctx.lineTo(w - plateMargin, y);
      ctx.stroke();
    }

    // 3b. Crystalline Grain Boundaries
    ctx.save();
    ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.07)';
    ctx.lineWidth = 1;
    grainBoundaries.forEach(([x1r, y1r, x2r, y2r]) => {
      ctx.beginPath();
      ctx.moveTo(plateMargin + x1r * plateWidth, plateMargin + y1r * (h - 32));
      ctx.lineTo(plateMargin + x2r * plateWidth, plateMargin + y2r * (h - 32));
      ctx.stroke();
    });

    // Solid-State Diffusion Grain Boundary Fusion across Interface (>80% bond)
    if (bondRatio > 80) {
      const fusionAlpha = (bondRatio - 80) / 20;
      ctx.strokeStyle = isLight ? `rgba(16, 185, 129, ${0.45 * fusionAlpha})` : `rgba(56, 189, 248, ${0.45 * fusionAlpha})`;
      ctx.lineWidth = 1.3;
      const bridges = [0.20, 0.38, 0.55, 0.74, 0.92];
      bridges.forEach(xr => {
        const bx = plateMargin + xr * plateWidth;
        ctx.beginPath();
        ctx.moveTo(bx, midY - 6);
        ctx.lineTo(bx, midY + 6);
        ctx.stroke();
      });
    }
    ctx.restore();

    // 4. Draw Interfacial Stress Gradient & Bonding Layer
    const stressHeight = Math.max(2, (P / 5.0) * 16);
    const stressGrad = ctx.createLinearGradient(0, midY - stressHeight, 0, midY + stressHeight);
    
    // Von Mises color mapped from Pressure & Temperature
    const intensity = Math.min(1, (P / 5.0) * 0.6 + ((T - 860) / 80) * 0.4);
    stressGrad.addColorStop(0, 'rgba(37, 99, 235, 0)');
    stressGrad.addColorStop(0.3, `rgba(6, 182, 212, ${0.3 * intensity})`);
    stressGrad.addColorStop(0.5, statusColor);
    stressGrad.addColorStop(0.7, `rgba(6, 182, 212, ${0.3 * intensity})`);
    stressGrad.addColorStop(1, 'rgba(37, 99, 235, 0)');

    ctx.fillStyle = stressGrad;
    ctx.fillRect(plateMargin, midY - stressHeight, plateWidth, stressHeight * 2);

    // 5. Draw Interfacial Micro-Voids (Shrink and close as bondRatio increases)
    const numVoids = 9;
    const voidSpacing = plateWidth / (numVoids + 1);
    const voidFactor = voidRatio / 100; // 0 (closed) to 0.55 (wide)

    ctx.fillStyle = isLight ? '#fbfbf9' : '#080a0f';
    ctx.strokeStyle = 'rgba(255, 94, 54, 0.6)';
    ctx.lineWidth = 1;

    for (let i = 1; i <= numVoids; i++) {
      const vx = plateMargin + i * voidSpacing;
      const rx = Math.max(0, (colW * 0.35) * voidFactor);
      const ry = Math.max(0, 5 * voidFactor);

      if (rx > 0.5 && ry > 0.5) {
        ctx.beginPath();
        ctx.ellipse(vx, midY, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }

    // 6. Plate Text & Coordinate Annotations
    ctx.font = '600 10px JetBrains Mono, monospace';
    ctx.fillStyle = mutedColor;
    ctx.fillText('TI-60 TOP SPECIMEN [ABQ_FEA_SURF_1]', plateMargin + 10, plateMargin + 18);
    ctx.fillText('TI-60 BOT SPECIMEN [ABQ_FEA_SURF_2]', plateMargin + 10, h - plateMargin - 10);

    // 7. Dynamic Corner Status
    ctx.fillStyle = textColor;
    ctx.font = '700 11px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`INTERFACE: ${bondRatio.toFixed(1)}% BONDED`, w - plateMargin - 10, plateMargin + 18);
    ctx.fillStyle = statusColor;
    ctx.fillText(`STATUS: ${resStatus.textContent.toUpperCase()}`, w - plateMargin - 10, h - plateMargin - 10);

    // 8. Crosshair Probe on Hover
    if (mouse.active && mouse.x >= plateMargin && mouse.x <= w - plateMargin && mouse.y >= plateMargin && mouse.y <= h - plateMargin) {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 94, 54, 0.5)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      // Vertical crosshair
      ctx.beginPath();
      ctx.moveTo(mouse.x, plateMargin);
      ctx.lineTo(mouse.x, h - plateMargin);
      ctx.stroke();

      // Horizontal crosshair
      ctx.beginPath();
      ctx.moveTo(plateMargin, mouse.y);
      ctx.lineTo(w - plateMargin, mouse.y);
      ctx.stroke();

      // Target node circle
      ctx.setLineDash([]);
      ctx.fillStyle = '#ff5e36';
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
      ctx.font = '600 9px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`NODE (${Math.round(mouse.x)}, ${Math.round(mouse.y)})`, mouse.x + 8, mouse.y - 8);

      ctx.restore();
    }

    ctx.restore();
  }

  // Exposed for theme toggle re-render
  window.renderFeaCanvas = calculateBonding;

  tempSlider.addEventListener('input', calculateBonding);
  pressSlider.addEventListener('input', calculateBonding);
  timeSlider.addEventListener('input', calculateBonding);

  // Animate Dwell Time Sweep (Play Button)
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (isPlaying) {
        isPlaying = false;
        cancelAnimationFrame(animFrameId);
        playBtn.classList.remove('playing');
        playBtn.innerHTML = '<span>▶ Animate Cycle</span>';
        return;
      }

      isPlaying = true;
      playBtn.classList.add('playing');
      playBtn.innerHTML = '<span>⏸ Pause</span>';

      timeSlider.value = 30;
      let curTime = 30;

      function step() {
        if (!isPlaying) return;
        curTime += 0.6;
        if (curTime > 120) {
          curTime = 120;
          timeSlider.value = curTime;
          calculateBonding();
          isPlaying = false;
          playBtn.classList.remove('playing');
          playBtn.innerHTML = '<span>▶ Replay Cycle</span>';
          return;
        }

        timeSlider.value = curTime;
        calculateBonding();
        animFrameId = requestAnimationFrame(step);
      }

      animFrameId = requestAnimationFrame(step);
    });
  }

  // Window resize observer for canvas sharpness
  window.addEventListener('resize', () => {
    calculateBonding();
  }, { passive: true });

  calculateBonding();
}

/* --------------------------------------------------------------------------
   7. Clipboard Actions with In-Card Visual Feedback & Keyboard Support
   -------------------------------------------------------------------------- */
function initClipboardActions() {
  const copyElements = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toast-notice');

  copyElements.forEach(elem => {
    function executeCopy() {
      const textToCopy = elem.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
        triggerCardFeedback(elem);
      }).catch(() => {
        showToast(`Copied: ${textToCopy}`);
      });
    }

    elem.addEventListener('click', executeCopy);

    // Keyboard support: Enter or Space
    elem.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        executeCopy();
      }
    });
  });

  function triggerCardFeedback(elem) {
    elem.classList.add('copied');
    const icon = elem.querySelector('.c-icon');
    const typeLabel = elem.querySelector('.c-type');

    const originalIconHtml = icon ? icon.innerHTML : '';
    const originalLabel = typeLabel ? typeLabel.textContent : '';

    if (icon) {
      icon.innerHTML = '<svg class="c-action-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    }
    if (typeLabel) typeLabel.textContent = 'Copied to Clipboard!';

    setTimeout(() => {
      elem.classList.remove('copied');
      if (icon) icon.innerHTML = originalIconHtml;
      if (typeLabel) typeLabel.textContent = originalLabel;
    }, 2000);
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }
}

/* --------------------------------------------------------------------------
   8. Mobile Navigation Drawer with Outside Click & Escape Support
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (!menuBtn || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.innerHTML = '&#9776;';
  }

  function openMenu() {
    navLinks.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.innerHTML = '&times;';
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) closeMenu();
    else openMenu();
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   9. Contact Form Handling with In-Form Confirmation & Fallback
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const banner = document.getElementById('form-status-banner');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('c-name').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const subject = document.getElementById('c-subject').value.trim() || 'Opportunity Inquiry via Portfolio';
    const message = document.getElementById('c-message').value.trim();

    if (!name || !email || !message) return;

    const emailBody = `From: ${name} (${email})\n\nSubject: ${subject}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:jamaluddinmajaz@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // Trigger system default mail client
    window.location.href = mailtoUrl;

    // Display in-form feedback banner with direct action options
    if (banner) {
      banner.className = 'form-status-banner show';
      banner.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div><strong>✓ Email client triggered!</strong> If your desktop mail app didn't open automatically, you can use the direct links below:</div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px;">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jamaluddinmajaz@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-thermal); text-decoration: underline; font-weight: 600;">
              Open in Gmail Web ↗
            </a>
            <span style="color: var(--text-muted)">·</span>
            <button type="button" id="copy-inquiry-btn" style="background: none; border: none; color: var(--accent-thermal); text-decoration: underline; font-weight: 600; cursor: pointer; padding: 0;">
              Copy Full Inquiry Details
            </button>
          </div>
        </div>
      `;

      const copyInquiryBtn = document.getElementById('copy-inquiry-btn');
      if (copyInquiryBtn) {
        copyInquiryBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(
            `To: jamaluddinmajaz@gmail.com\nSubject: ${subject}\n${emailBody}`
          ).then(() => {
            copyInquiryBtn.textContent = '✓ Copied Details!';
          });
        });
      }
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      const originalHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>✓ Inquiry Drafted</span>';
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.innerHTML = originalHtml;
        submitBtn.disabled = false;
      }, 4000);
    }
  });
}

/* --------------------------------------------------------------------------
   10. Interactive Ambient Cursor Spotlight
   -------------------------------------------------------------------------- */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursor-spotlight');
  if (!spotlight || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = -600;
  let mouseY = -600;
  let currentX = -600;
  let currentY = -600;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isVisible) {
      spotlight.style.opacity = '1';
      isVisible = true;
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    spotlight.style.opacity = '0';
    isVisible = false;
  });

  function update() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    spotlight.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* --------------------------------------------------------------------------
   11. 3D Interactive Portrait Parallax Tilt
   -------------------------------------------------------------------------- */
function initPortraitTilt() {
  const frame = document.querySelector('.portrait-frame');
  if (!frame || window.matchMedia('(pointer: coarse)').matches) return;

  frame.addEventListener('mousemove', (e) => {
    const rect = frame.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9; // -9deg to +9deg
    const rotateY = ((x - centerX) / centerX) * 9;   // -9deg to +9deg

    frame.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
  });

  frame.addEventListener('mouseleave', () => {
    frame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
}

/* --------------------------------------------------------------------------
   12. Scroll-Triggered Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   13. Animated Hero Metric Highlights
   -------------------------------------------------------------------------- */
function initAnimatedMetrics() {
  const metricItems = document.querySelectorAll('.hero-metrics .metric-item');
  if (!metricItems.length) return;

  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        metricItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('metric-animated');
          }, index * 120);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(hero);
}
