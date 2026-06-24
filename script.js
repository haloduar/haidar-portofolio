/* ─── DATA ─── */
const CARDS = [
  {
    id: 'gd',
    tag: '01 / Creative',
    title: 'Graphic\nDesign',
    desc: 'Brand identities, e-book covers, and visual systems that speak before words do.',
    icon: '🎨',
    accentColor: '#E8531A',
    ctaBg: '#E8531A',
    visualType: 'gd',
  },
  {
    id: 'auto',
    tag: '02 / Technical',
    title: 'Work\nAutomation',
    desc: 'n8n, Make.com, and AI pipelines that replace hours of manual work with a single flow.',
    icon: '⚡',
    accentColor: '#3896E8',
    ctaBg: '#3896E8',
    visualType: 'auto',
  },
  // Add more cards here — they'll slot right into the carousel
];

const DATA = {
  gd: {
    eyebrow: 'Creative Work',
    title: 'Graphic Design',
    sub: 'Visual identities that linger long after first glance.',
    accent: '#E8531A',
    tabs: ['All','E-book Covers','Logo & Brand','Social Media','Print'],
    items: {
      'All': [
        { icon:'📖', bg:'linear-gradient(135deg,#1a0500,#3d1500)', title:'Loveprint E-Book', desc:'Nocturnal storybook visual identity for an AI-powered relationship insight product.', tags:['E-book','Print','AI Product'] },
        { icon:'🌿', bg:'linear-gradient(135deg,#050f05,#0d2010)', title:'Herbal Brand Logo', desc:'Minimal wordmark for an organic wellness brand targeting millennial audiences.', tags:['Logo','Brand Identity'] },
        { icon:'🎵', bg:'linear-gradient(135deg,#08050f,#1a0d30)', title:'Music Channel Art', desc:"Visual system for 'Left Unsaid' — a spoken-word YouTube channel.", tags:['YouTube','Motion'] },
        { icon:'📱', bg:'linear-gradient(135deg,#0a0a14,#14142d)', title:'App UI Kit', desc:'Dark-mode component set for a German language learning tracker.', tags:['UI/UX','Design System'] },
        { icon:'✍️', bg:'linear-gradient(135deg,#0f0800,#2a1a00)', title:'Editorial Cover', desc:'Magazine-style cover layout for a creative writing collection.', tags:['Print','Editorial'] },
        { icon:'🔥', bg:'linear-gradient(135deg,#1a0200,#3a0800)', title:'Brand Campaign', desc:'Visual campaign set for a local food startup — 6 social media assets.', tags:['Social','Brand'] },
      ],
    }
  },
  auto: {
    eyebrow: 'Technical Work',
    title: 'Work Automation',
    sub: 'Workflows that run while you sleep.',
    accent: '#3896E8',
    tabs: ['All','n8n Flows','Make.com','AI Pipelines','Web Apps'],
    items: {
      'All': [
        { icon:'⚙️', bg:'linear-gradient(135deg,#000d1a,#001f3d)', title:'Loveprint Pipeline', desc:'Typeform → Make.com → Claude API → PDFMonkey. Generates personalized relationship insight PDFs at scale.', tags:['Make.com','Claude API','PDF'] },
        { icon:'🤖', bg:'linear-gradient(135deg,#000a0a,#001a14)', title:'AI Fallback Flow', desc:'Cascade error-handling: Claude → OpenAI → Groq → Gmail. Zero-downtime AI response delivery.', tags:['n8n','Resilience','Multi-AI'] },
        { icon:'📊', bg:'linear-gradient(135deg,#0a000d,#1a0028)', title:'Airtable CRM Bot', desc:'WhatsApp-triggered automation that logs leads, scores them via AI, and routes to Airtable.', tags:['WhatsApp','CRM','n8n'] },
        { icon:'🧠', bg:'linear-gradient(135deg,#050a00,#0d1a00)', title:'DeutschMate Tracker', desc:'Local HTML web app — three-pillar language learning system.', tags:['HTML','JavaScript','EdTech'] },
        { icon:'📧', bg:'linear-gradient(135deg,#0a0500,#1a0d00)', title:'Email Outreach Bot', desc:'Automated personalized outreach sequences via Gmail + Airtable for B2B prospecting.', tags:['Make.com','Gmail','Automation'] },
        { icon:'🌐', bg:'linear-gradient(135deg,#000814,#001428)', title:'Supabase Dashboard', desc:'Real-time client dashboard built with Supabase + n8n data sync for an Indonesian SME.', tags:['Supabase','n8n','Dashboard'] },
      ],
    }
  },
};

/* ─── CAROUSEL ─── */
let currentIndex = 0;
const CARD_W = 280;
const GAP = 24;

function buildCarousel() {
  const track = document.getElementById('carousel-track');
  const dots = document.getElementById('carousel-dots');
  track.innerHTML = '';
  dots.innerHTML = '';

  // padding so first/last card can be centered
  const padEl = () => { const d = document.createElement('div'); d.style.flexShrink='0'; return d; };

  CARDS.forEach((c, i) => {
    const scene = document.createElement('div');
    scene.className = 'card-scene';
    scene.id = 'scene-' + i;

    const wrap = document.createElement('div');
    wrap.className = 'card-wrap';

    const card = document.createElement('div');
    card.className = 'card card-' + c.visualType;

    // visual
    let visualHTML = '';
    if (c.visualType === 'gd') {
      visualHTML = `<div class="card-visual">
        <div class="graphic-bg"></div>
        <div class="brush"><span></span><span></span><span></span></div>
        <div class="card-visual-graphic"><span class="icon">${c.icon}</span></div>
      </div>`;
    } else {
      visualHTML = `<div class="card-visual">
        <div class="graphic-bg"></div>
        <div class="grid-pat"></div>
        <div class="node-dots" id="nd-${i}"></div>
        <div class="card-visual-graphic"><span class="icon">${c.icon}</span></div>
      </div>`;
    }

    card.innerHTML = `
      ${visualHTML}
      <div class="card-body">
        <span class="card-tag">${c.tag}</span>
        <h2 class="card-title">${c.title.replace('\n','<br>')}</h2>
        <p class="card-desc">${c.desc}</p>
      </div>
      <div class="card-cta" style="background:${c.ctaBg}">→</div>
    `;
    card.onclick = () => { if(i === currentIndex) openInner(c.id); else goTo(i); };

    wrap.appendChild(card);
    scene.appendChild(wrap);
    track.appendChild(scene);

    // dot
    const dot = document.createElement('div');
    dot.className = 'dot' + (i===0?' active':'');
    dot.onclick = () => goTo(i);
    dots.appendChild(dot);
  });

  drawAllNodes();
  applyCarouselState();
}

function goTo(idx) {
  currentIndex = Math.max(0, Math.min(CARDS.length - 1, idx));
  applyCarouselState();
}

function shiftCarousel(dir) { goTo(currentIndex + dir); }

function applyCarouselState() {
  const track = document.getElementById('carousel-track');
  const vp = document.getElementById('carousel-viewport');
  const vpW = vp.offsetWidth;

  // offset: center current card
  const offset = vpW / 2 - (currentIndex * (CARD_W + GAP)) - CARD_W / 2;
  track.style.transform = `translateX(${offset}px)`;

  // classes
  CARDS.forEach((_, i) => {
    const scene = document.getElementById('scene-' + i);
    const diff = i - currentIndex;
    scene.className = 'card-scene';
    if (diff === 0)       scene.classList.add('center');
    else if (diff === -1) scene.classList.add('tilt-left');
    else if (diff === 1)  scene.classList.add('tilt-right');
    else if (diff < -1)   scene.classList.add('far-left');
    else                  scene.classList.add('far-right');
  });

  // dots
  document.querySelectorAll('.dot').forEach((d,i) => {
    d.classList.toggle('active', i === currentIndex);
  });

  // arrows
  document.getElementById('arrow-left').classList.toggle('hidden', currentIndex === 0);
  document.getElementById('arrow-right').classList.toggle('hidden', currentIndex === CARDS.length - 1);
}

// drag / swipe
(function() {
  const vp = document.getElementById('carousel-viewport');
  let startX = 0, isDragging = false, moved = false;
  vp.addEventListener('mousedown', e => { startX = e.clientX; isDragging = true; moved = false; });
  window.addEventListener('mousemove', e => { if (!isDragging) return; if (Math.abs(e.clientX - startX) > 5) moved = true; });
  window.addEventListener('mouseup', e => {
    if (!isDragging) return; isDragging = false;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50) shiftCarousel(dx < 0 ? 1 : -1);
  });
  vp.addEventListener('touchstart', e => { startX = e.touches[0].clientX; moved = false; }, {passive:true});
  vp.addEventListener('touchmove', e => { if (Math.abs(e.touches[0].clientX - startX) > 5) moved = true; }, {passive:true});
  vp.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) shiftCarousel(dx < 0 ? 1 : -1);
  });
  window.addEventListener('resize', () => applyCarouselState());
})();

function drawAllNodes() {
  CARDS.forEach((c, i) => {
    if (c.visualType !== 'auto') return;
    const container = document.getElementById('nd-' + i);
    if (!container) return;
    const positions = [[15,35],[50,25],[90,48],[130,30],[170,44],[210,25],[35,72],[75,62],[115,78],[155,64],[195,74],[25,108],[65,100],[105,118],[145,106],[185,116]];
    positions.forEach(([x,y]) => {
      const dot = document.createElement('div');
      dot.className = 'node-dot';
      dot.style.cssText = `left:${x}px;top:${y}px`;
      container.appendChild(dot);
    });
    for (let j=0;j<positions.length-1;j++) {
      if (Math.random()>.45) {
        const [x1,y1]=positions[j],[x2,y2]=positions[j+1];
        const len=Math.hypot(x2-x1,y2-y1),angle=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
        const line=document.createElement('div');
        line.className='node-line';
        line.style.cssText=`left:${x1}px;top:${y1}px;width:${len}px;transform:rotate(${angle}deg)`;
        container.appendChild(line);
      }
    }
  });
}

/* ─── BG SETTINGS ─── */
let bgType = 'color';

function toggleSettings() {
  document.getElementById('settings-panel').classList.toggle('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('#settings-panel') && !e.target.closest('#settings-btn')) {
    document.getElementById('settings-panel').classList.remove('open');
  }
});

function setBgType(t) {
  bgType = t;
  ['color','image','video'].forEach(x => {
    document.getElementById('radio-'+x).classList.toggle('active', x===t);
  });
  document.getElementById('bg-color-row').style.display = t==='color' ? '' : 'none';
  document.getElementById('bg-url-row').style.display  = t!=='color' ? '' : 'none';
}

function applyBg() {
  const layer = document.getElementById('bg-layer');
  // remove old media
  layer.querySelectorAll('img,video').forEach(el => el.remove());

  if (bgType === 'color') {
    const col = document.getElementById('bg-color-input').value;
    document.body.style.background = col;
    document.documentElement.style.setProperty('--bg', col);
    layer.style.background = col;
  } else {
    const url = document.getElementById('bg-url-input').value.trim();
    if (!url) return;
    if (bgType === 'image') {
      const img = document.createElement('img');
      img.src = url; img.alt = '';
      layer.insertBefore(img, layer.querySelector('#bg-overlay'));
    } else {
      const vid = document.createElement('video');
      vid.src = url; vid.autoplay = true; vid.loop = true; vid.muted = true; vid.playsInline = true;
      layer.insertBefore(vid, layer.querySelector('#bg-overlay'));
    }
  }
  document.getElementById('settings-panel').classList.remove('open');
}

/* ─── INNER PAGE ─── */
let currentSection = null, currentItems = [], modalIndex = 0;

function openInner(section) {
  currentSection = section;
  const d = DATA[section];
  document.getElementById('inner-eyebrow').textContent = d.eyebrow;
  document.getElementById('inner-title').textContent = d.title;
  document.getElementById('inner-sub').textContent = d.sub;

  const tabBar = document.getElementById('tab-bar');
  tabBar.innerHTML = '';
  d.tabs.forEach((t,i) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn'+(i===0?' active':'');
    btn.textContent = t;
    btn.onclick = () => switchTab(t, btn);
    tabBar.appendChild(btn);
  });

  renderGallery(d.items['All']);

  document.getElementById('home').classList.add('exit');
  const inner = document.getElementById('inner-page');
  inner.style.display = 'flex';
  requestAnimationFrame(() => requestAnimationFrame(() => inner.classList.add('visible')));
}

function switchTab(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const items = DATA[currentSection].items[tab] || DATA[currentSection].items['All'];
  renderGallery(items);
}

function renderGallery(items) {
  currentItems = items;
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';
  items.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'gallery-item';
    el.innerHTML = `
      <div class="gallery-thumb" style="background:${item.bg}">
        <span style="font-size:42px;filter:drop-shadow(0 4px 12px rgba(0,0,0,.5))">${item.icon}</span>
      </div>
      <div class="gallery-info"><h4>${item.title}</h4><p>${item.tags[0]}</p></div>
      <div class="gallery-overlay">👁</div>`;
    el.onclick = () => openModal(i);
    grid.appendChild(el);
  });
}

function openModal(idx) { modalIndex = idx; renderModal(); document.getElementById('modal-overlay').classList.add('open'); }

function renderModal() {
  const item = currentItems[modalIndex];
  const d = DATA[currentSection];
  document.getElementById('modal-visual').style.background = item.bg;
  document.getElementById('modal-visual').innerHTML = `<span style="font-size:68px;filter:drop-shadow(0 8px 24px rgba(0,0,0,.6))">${item.icon}</span>`;
  document.getElementById('modal-tag').textContent = d.eyebrow.toUpperCase();
  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('modal-desc').textContent = item.desc;
  document.getElementById('modal-tags').innerHTML = item.tags.map(t=>`<span class="modal-chip">${t}</span>`).join('');
  document.getElementById('modal-counter').textContent = `${modalIndex+1} / ${currentItems.length}`;
  document.getElementById('nav-prev').disabled = modalIndex === 0;
  document.getElementById('nav-next').disabled = modalIndex === currentItems.length-1;
}

function slideModal(dir) { const n=modalIndex+dir; if(n<0||n>=currentItems.length)return; modalIndex=n; renderModal(); }
function closeModal() { document.getElementById('modal-overlay').classList.remove('open'); }
function handleOverlayClick(e) { if(e.target===document.getElementById('modal-overlay'))closeModal(); }

function closeInner() {
  document.getElementById('inner-page').classList.remove('visible');
  document.getElementById('home').classList.remove('exit');
  setTimeout(() => { document.getElementById('inner-page').style.display='none'; }, 420);
}

document.addEventListener('keydown', e => {
  if (e.key==='Escape') {
    if(document.getElementById('modal-overlay').classList.contains('open')) closeModal();
    else if(currentSection) closeInner();
  }
  if(document.getElementById('modal-overlay').classList.contains('open')) {
    if(e.key==='ArrowRight') slideModal(1);
    if(e.key==='ArrowLeft')  slideModal(-1);
  }
  if(e.key==='ArrowRight' && !document.getElementById('modal-overlay').classList.contains('open') && document.getElementById('home').style.display!=='none') shiftCarousel(1);
  if(e.key==='ArrowLeft'  && !document.getElementById('modal-overlay').classList.contains('open') && document.getElementById('home').style.display!=='none') shiftCarousel(-1);
});

/* ─── INIT ─── */
buildCarousel();