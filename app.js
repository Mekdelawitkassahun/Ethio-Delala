// ============================================================
//  ETHIO-DELALA — app.js  (clean rewrite)
// ============================================================

/* ── Global state ── */
let currentMode    = 'rent';
let currentTourProp = null;
let draggedId      = null;
let favourites     = JSON.parse(localStorage.getItem('ed_favs') || '[]');
let heroSlideIdx   = 0;
let testimonialIdx = 0;

/* iframe 360 messaging */
let iframeReady    = false;
let pendingMsg     = null;

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initToggle();
  initFilters();
  renderCards();
  initTourModal();
  initTV();
  initFloorplan();
  initHeroSlider();
  initMortgage();
  renderMapPins();
  renderAgents();
  renderTestimonials();
  updateFavBadge();
  animateCounters();

  /* Receive ready signal from 360 iframe */
  window.addEventListener('message', e => {
    if (e.data && e.data.type === 'tourReady') {
      iframeReady = true;
      if (pendingMsg) { postToFrame(pendingMsg); pendingMsg = null; }
    }
  });
});

/* ── Post message to 360 iframe ── */
function postToFrame(msg) {
  const f = document.getElementById('tour360Frame');
  if (!f) return;
  if (iframeReady) {
    f.contentWindow.postMessage(msg, '*');
  } else {
    pendingMsg = msg;
  }
}

/* ── Send full rooms array to iframe ── */
function initTour360(prop) {
  const rooms = prop.rooms.map(r => ({
    img:      r.img,
    name:     r.name,
    hotspots: prop.hotspots || []
  }));
  postToFrame({ type: 'initTour', rooms: rooms });
}

/* ============================================================
   HERO SLIDER
   ============================================================ */
function initHeroSlider() {
  const imgs = [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80'
  ];
  const slider = document.getElementById('heroBgSlider');
  imgs.forEach((src, i) => {
    const d = document.createElement('div');
    d.className = 'hero-slide' + (i === 0 ? ' active' : '');
    d.style.backgroundImage = "url('" + src + "')";
    slider.appendChild(d);
  });
  setInterval(() => {
    const slides = slider.querySelectorAll('.hero-slide');
    slides[heroSlideIdx].classList.remove('active');
    heroSlideIdx = (heroSlideIdx + 1) % slides.length;
    slides[heroSlideIdx].classList.add('active');
  }, 5000);
  document.getElementById('heroSearch').addEventListener('keydown', e => {
    if (e.key === 'Enter') doHeroSearch();
  });
}

function doHeroSearch() {
  const q = document.getElementById('heroSearch').value.trim().toLowerCase();
  if (!q) return;
  document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    const all = PROPERTIES.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q)
    );
    if (all.length) renderFilteredCards(all);
    else document.getElementById('cardsGrid').innerHTML =
      '<p class="no-results">No properties found for "' + q + '".</p>';
  }, 600);
}

/* ── "Start Touring Now" — opens first sell property tour ── */
function startDemoTour() {
  const demo = PROPERTIES.find(p => p.mode === 'sell') || PROPERTIES[0];
  openTour(demo.id);
}

/* ============================================================
   SIDEBAR
   ============================================================ */
function initSidebar() {
  const ham = document.getElementById('hamburger');
  const sb  = document.getElementById('sidebar');
  const ov  = document.getElementById('sidebarOverlay');
  ham.addEventListener('click', () => {
    sb.classList.toggle('open');
    ov.classList.toggle('active');
    ham.classList.toggle('active');
  });
  ov.addEventListener('click', () => {
    sb.classList.remove('open');
    ov.classList.remove('active');
    ham.classList.remove('active');
  });
  window.addEventListener('scroll', () => {
    let cur = '';
    document.querySelectorAll('section[id],header[id]').forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) cur = s.id;
    });
    document.querySelectorAll('.nav-link').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
    });
  });
}

/* ============================================================
   TOGGLE + FILTERS
   ============================================================ */
function initToggle() {
  document.getElementById('toggleTrack').addEventListener('click', () => {
    currentMode = currentMode === 'rent' ? 'sell' : 'rent';
    updateToggleUI();
    renderCards();
  });
  updateToggleUI();
}

function updateToggleUI() {
  const track = document.getElementById('toggleTrack');
  const thumb = document.getElementById('toggleThumb');
  const rl = document.getElementById('rentLabel');
  const sl = document.getElementById('sellLabel');
  if (currentMode === 'sell') {
    track.classList.add('sell-mode');
    thumb.style.transform = 'translateX(100%)';
    rl.classList.remove('active-label');
    sl.classList.add('active-label');
  } else {
    track.classList.remove('sell-mode');
    thumb.style.transform = 'translateX(0)';
    rl.classList.add('active-label');
    sl.classList.remove('active-label');
  }
}

function initFilters() {
  ['filterType','filterBeds','filterBaths','filterSort'].forEach(id =>
    document.getElementById(id).addEventListener('change', renderCards)
  );
}

function resetFilters() {
  ['filterType','filterBeds','filterBaths','filterSort'].forEach(id =>
    document.getElementById(id).selectedIndex = 0
  );
  renderCards();
}

function getFiltered() {
  const type  = document.getElementById('filterType').value;
  const beds  = document.getElementById('filterBeds').value;
  const baths = document.getElementById('filterBaths').value;
  const sort  = document.getElementById('filterSort').value;
  let list = PROPERTIES.filter(p => p.mode === currentMode);
  if (type  !== 'all') list = list.filter(p => p.type  === type);
  if (beds  !== 'all') list = list.filter(p => p.beds  >= +beds);
  if (baths !== 'all') list = list.filter(p => p.baths >= +baths);
  if (sort === 'price-asc')  list.sort((a,b) => a.price - b.price);
  if (sort === 'price-desc') list.sort((a,b) => b.price - a.price);
  return list;
}

/* ============================================================
   CARDS
   ============================================================ */
function renderCards() { renderFilteredCards(getFiltered()); }

function renderFilteredCards(props) {
  const grid = document.getElementById('cardsGrid');
  if (!props.length) {
    grid.innerHTML = '<p class="no-results">No properties match your filters.</p>';
    return;
  }
  grid.innerHTML = props.map(cardHTML).join('');
  grid.querySelectorAll('.keyring-card').forEach(card => {
    card.querySelector('.flip-btn').addEventListener('click', e => {
      e.stopPropagation(); card.classList.add('flipped');
    });
    card.querySelector('.unflip-btn').addEventListener('click', e => {
      e.stopPropagation(); card.classList.remove('flipped');
    });
    card.setAttribute('draggable', 'true');
    card.addEventListener('dragstart', e => {
      draggedId = card.dataset.id;
      e.dataTransfer.effectAllowed = 'copy';
    });
  });
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.src = en.target.dataset.src; obs.unobserve(en.target); }
      });
    }, { rootMargin: '200px' });
    grid.querySelectorAll('img[data-src]').forEach(img => obs.observe(img));
  } else {
    grid.querySelectorAll('img[data-src]').forEach(img => img.src = img.dataset.src);
  }
}

function fmtPrice(p) {
  return p.mode === 'rent'
    ? '$' + p.price.toLocaleString() + '<span class="price-unit">/mo</span>'
    : '$' + p.price.toLocaleString();
}

function cardHTML(p) {
  const bc    = p.mode === 'rent' ? 'badge-rent' : 'badge-sell';
  const isFav = favourites.includes(p.id);
  const aTags = (p.amenities||[]).slice(0,3).map(a =>
    '<span class="amenity-tag"><i class="fa-solid fa-check"></i> '+a+'</span>').join('');
  const rooms = (p.rooms||[]).map(r =>
    '<span class="room-chip">'+r.name+'</span>').join('');
  const amenAll = (p.amenities||[]).map(a =>
    '<span class="amenity-chip"><i class="fa-solid fa-star"></i> '+a+'</span>').join('');
  return (
    '<div class="keyring-card" data-id="'+p.id+'">' +
      '<div class="keyring-ring"><i class="fa-solid fa-ring"></i></div>' +
      '<div class="card-inner">' +
        '<div class="card-front">' +
          '<div class="card-img-wrap">' +
            '<img data-src="'+p.image+'" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="'+p.title+'" />' +
            '<span class="badge '+bc+'">'+p.badge+'</span>' +
            '<span class="vr-card-badge"><i class="fa-solid fa-vr-cardboard"></i> 360°</span>' +
            '<button class="card-fav-btn '+(isFav?'faved':'')+'" onclick="toggleFav(event,'+p.id+')"><i class="fa-'+(isFav?'solid':'regular')+' fa-heart"></i></button>' +
          '</div>' +
          '<div class="card-body">' +
            '<h3 class="card-title">'+p.title+'</h3>' +
            '<p class="card-address"><i class="fa-solid fa-location-dot"></i> '+p.address+'</p>' +
            '<div class="card-meta">' +
              '<span><i class="fa-solid fa-bed"></i> '+p.beds+'</span>' +
              '<span><i class="fa-solid fa-bath"></i> '+p.baths+'</span>' +
              '<span><i class="fa-solid fa-ruler-combined"></i> '+p.sqft.toLocaleString()+' ft\u00B2</span>' +
              '<span><i class="fa-solid fa-calendar"></i> '+p.yearBuilt+'</span>' +
            '</div>' +
            '<div class="amenity-row">'+aTags+'</div>' +
            '<div class="card-price">'+fmtPrice(p)+'</div>' +
            '<div class="card-actions">' +
              '<button class="flip-btn"><i class="fa-solid fa-rotate"></i> Details</button>' +
              '<button class="enter-tour-btn" onclick="openTour('+p.id+')"><i class="fa-solid fa-vr-cardboard"></i> 360° Tour</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="card-back">' +
          '<button class="unflip-btn"><i class="fa-solid fa-arrow-left"></i></button>' +
          '<h3>'+p.title+'</h3>' +
          '<p class="card-desc">'+p.description+'</p>' +
          '<div class="back-rooms">'+rooms+'</div>' +
          '<div class="back-amenities">'+amenAll+'</div>' +
          '<div class="back-actions">' +
            '<button class="enter-tour-btn full-width" onclick="openTour('+p.id+')"><i class="fa-solid fa-vr-cardboard"></i> Enter 360° Tour</button>' +
            '<button class="enquiry-btn" onclick="openEnquiry('+p.id+')"><i class="fa-solid fa-envelope"></i> Enquire</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
}

/* ============================================================
   VIRTUAL TOUR MODAL
   ============================================================ */
function initTourModal() {
  document.getElementById('tourClose').addEventListener('click', closeTour);
  document.getElementById('tourModal').addEventListener('click', e => {
    if (e.target.id === 'tourModal') closeTour();
  });

  /* When iframe finishes loading, send the current property */
  const iframe = document.getElementById('tour360Frame');
  iframe.addEventListener('load', () => {
    iframeReady = true;
    if (currentTourProp) initTour360(currentTourProp);
  });
}

function openTour(id) {
  const prop = PROPERTIES.find(p => p.id === id);
  if (!prop) return;
  currentTourProp = prop;

  document.getElementById('tourTitle').textContent = prop.title;
  document.getElementById('schedulePropertyName').textContent = prop.title;

  /* Reset iframe ready state so we wait for fresh load */
  iframeReady = false;
  pendingMsg  = null;

  /* Reload iframe fresh for this property */
  const iframe = document.getElementById('tour360Frame');
  iframe.src = 'tour360.html?' + Date.now();   /* cache-bust */

  /* Video */
  const vid = document.getElementById('tourVideo');
  vid.src = prop.videoSrc;
  vid.load();
  document.getElementById('tvProgressFill').style.width = '0%';
  const ov = document.getElementById('tvOverlay');
  ov.style.display = 'flex'; ov.style.opacity = '1';

  /* Floor plan */
  document.getElementById('floorplanContent').innerHTML = buildFloorplanHTML(prop);
  document.getElementById('floorplanMap').classList.remove('open');
  document.getElementById('floorplanToggle').innerHTML = '<i class="fa-solid fa-map"></i> View Floor Plan';

  /* Agent */
  buildTourAgentCard(prop);

  /* Fav icon */
  document.getElementById('favIcon').className =
    favourites.includes(prop.id) ? 'fa-solid fa-heart' : 'fa-regular fa-heart';

  /* Door animation */
  const modal   = document.getElementById('tourModal');
  const frame   = document.getElementById('doorFrame');
  const content = document.getElementById('tourContent');

  modal.style.display = 'flex';
  frame.style.display = 'flex';
  frame.classList.remove('doors-open');
  content.style.display = 'none';
  content.style.opacity = '0';

  setTimeout(() => {
    frame.classList.add('doors-open');
    setTimeout(() => {
      frame.style.display = 'none';
      content.style.display = 'flex';
      setTimeout(() => { content.style.opacity = '1'; }, 30);
    }, 900);
  }, 80);

  document.body.style.overflow = 'hidden';
}

function closeTour() {
  document.getElementById('tourVideo').pause();
  const modal   = document.getElementById('tourModal');
  const content = document.getElementById('tourContent');
  const frame   = document.getElementById('doorFrame');
  content.style.opacity = '0';
  setTimeout(() => {
    content.style.display = 'none';
    frame.style.display = 'flex';
    frame.classList.remove('doors-open');
    setTimeout(() => { modal.style.display = 'none'; }, 700);
  }, 300);
  document.body.style.overflow = '';
}

function buildTourAgentCard(prop) {
  const a = prop.agent;
  if (!a) return;
  document.getElementById('tourAgentCard').innerHTML =
    '<div class="tac-inner">' +
      '<img src="'+a.img+'" alt="'+a.name+'" />' +
      '<div class="tac-info">' +
        '<span class="tac-label">Your Agent</span>' +
        '<strong>'+a.name+'</strong>' +
        '<a href="tel:'+a.phone+'">'+a.phone+'</a>' +
      '</div>' +
      '<a href="tel:'+a.phone+'" class="tac-call"><i class="fa-solid fa-phone"></i> Call</a>' +
    '</div>';
}

/* ============================================================
   TV VIDEO
   ============================================================ */
function initTV() {
  const vid  = document.getElementById('tourVideo');
  const btn  = document.getElementById('tvPlayBtn');
  const ov   = document.getElementById('tvOverlay');
  const fill = document.getElementById('tvProgressFill');
  btn.addEventListener('click', () => {
    vid.play();
    ov.style.opacity = '0';
    setTimeout(() => { ov.style.display = 'none'; }, 400);
  });
  vid.addEventListener('click', () => {
    if (!vid.paused) {
      vid.pause();
      ov.style.display = 'flex';
      setTimeout(() => { ov.style.opacity = '1'; }, 10);
    }
  });
  vid.addEventListener('timeupdate', () => {
    if (vid.duration) fill.style.width = (vid.currentTime / vid.duration * 100) + '%';
  });
  vid.addEventListener('ended', () => {
    ov.style.display = 'flex';
    setTimeout(() => { ov.style.opacity = '1'; }, 10);
    fill.style.width = '0%';
  });
}

/* ============================================================
   FLOOR PLAN
   ============================================================ */
function initFloorplan() {
  document.getElementById('floorplanToggle').addEventListener('click', () => {
    const map = document.getElementById('floorplanMap');
    const btn = document.getElementById('floorplanToggle');
    map.classList.toggle('open');
    btn.innerHTML = map.classList.contains('open')
      ? '<i class="fa-solid fa-map"></i> Hide Floor Plan'
      : '<i class="fa-solid fa-map"></i> View Floor Plan';
  });
}

function buildFloorplanHTML(prop) {
  const colors = ['#D4A373','#C8956C','#B07D5A','#9A6B4B','#8B6347','#7A5230'];
  let html = '<div class="fp-title">'+prop.title+' \u2014 Floor Plan</div><div class="fp-rooms">';
  prop.rooms.forEach((r, i) => {
    html += '<div class="fp-room" style="background:'+colors[i%colors.length]+'20;border-color:'+colors[i%colors.length]+'"><span class="fp-room-name">'+r.name+'</span></div>';
  });
  html += '</div><div class="fp-info">'+prop.floorplan+'</div>';
  return html;
}

/* ============================================================
   SCHEDULE / ENQUIRY
   ============================================================ */
function openSchedule() {
  if (currentTourProp) document.getElementById('schedulePropertyName').textContent = currentTourProp.title;
  document.getElementById('scheduleModal').classList.add('open');
}
function closeSchedule() { document.getElementById('scheduleModal').classList.remove('open'); }
function submitSchedule(e) {
  e.preventDefault(); closeSchedule();
  showToast('Viewing scheduled! We\'ll confirm shortly. \uD83C\uDFE1');
}
function openEnquiry(id) {
  const p = PROPERTIES.find(x => x.id === id);
  if (p) document.getElementById('enquiryPropName').textContent = p.title;
  document.getElementById('enquiryModal').classList.add('open');
}
function closeEnquiry() { document.getElementById('enquiryModal').classList.remove('open'); }
function submitEnquiry(e) {
  e.preventDefault(); closeEnquiry();
  showToast('Message sent! An agent will contact you soon. \u2709\uFE0F');
}

/* ============================================================
   COMPARE
   ============================================================ */
function dropCompare(e, side) {
  e.preventDefault();
  if (!draggedId) return;
  const prop = PROPERTIES.find(p => p.id === parseInt(draggedId));
  if (!prop) return;
  renderCompareTray(side, prop);
}
function renderCompareTray(side, prop) {
  const tray = document.getElementById(side === 'left' ? 'trayLeft' : 'trayRight');
  const amenHTML = (prop.amenities||[]).map(a => '<span>'+a+'</span>').join('');
  tray.innerHTML =
    '<div class="compare-card">' +
      '<img src="'+prop.image+'" alt="'+prop.title+'" />' +
      '<h4>'+prop.title+'</h4>' +
      '<p class="compare-price">'+(prop.mode==='rent'?'$'+prop.price.toLocaleString()+'/mo':'$'+prop.price.toLocaleString())+'</p>' +
      '<div class="compare-details">' +
        '<span><i class="fa-solid fa-bed"></i> '+prop.beds+' Beds</span>' +
        '<span><i class="fa-solid fa-bath"></i> '+prop.baths+' Baths</span>' +
        '<span><i class="fa-solid fa-ruler-combined"></i> '+prop.sqft.toLocaleString()+' ft\u00B2</span>' +
        '<span><i class="fa-solid fa-calendar"></i> Built '+prop.yearBuilt+'</span>' +
      '</div>' +
      '<div class="compare-amenities">'+amenHTML+'</div>' +
      '<button class="enter-tour-btn" onclick="openTour('+prop.id+')"><i class="fa-solid fa-vr-cardboard"></i> 360\u00B0 Tour</button>' +
      '<button class="clear-tray-btn" onclick="clearTray(\''+side+'\')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>';
}
function clearTray(side) {
  const tray = document.getElementById(side==='left'?'trayLeft':'trayRight');
  tray.innerHTML = '<div class="tray-placeholder"><i class="fa-solid fa-arrow-'+(side==='left'?'right':'left')+'"></i> Drop here</div>';
}

/* ============================================================
   MORTGAGE
   ============================================================ */
function initMortgage() { calcMortgage(); }
function calcMortgage() {
  const price = parseFloat(document.getElementById('mPrice').value) || 0;
  const down  = parseFloat(document.getElementById('mDown').value) / 100;
  const rate  = parseFloat(document.getElementById('mRate').value) / 100 / 12;
  const term  = parseInt(document.getElementById('mTerm').value) * 12;
  const loan  = price * (1 - down);
  const monthly = rate > 0
    ? loan * (rate * Math.pow(1+rate,term)) / (Math.pow(1+rate,term) - 1)
    : loan / term;
  const totalCost = monthly * term;
  const totalInt  = totalCost - loan;
  const cur = 'ETB ';
  document.getElementById('mMonthly').textContent  = cur + Math.round(monthly).toLocaleString();
  document.getElementById('mLoan').textContent      = cur + Math.round(loan).toLocaleString();
  document.getElementById('mInterest').textContent  = cur + Math.round(totalInt).toLocaleString();
  document.getElementById('mTotal').textContent     = cur + Math.round(totalCost).toLocaleString();
  const ring = document.getElementById('mRingFill');
  if (ring) ring.style.strokeDashoffset = 314 * (1 - loan / (totalCost || 1));
}

/* ============================================================
   MAP
   ============================================================ */
function renderMapPins() {
  const container = document.getElementById('mapPins');
  if (!container) return;
  const lats = PROPERTIES.map(p => p.lat);
  const lngs = PROPERTIES.map(p => p.lng);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
  PROPERTIES.forEach(p => {
    const xPct = ((p.lng - minLng) / (maxLng - minLng)) * 80 + 10;
    const yPct = ((maxLat - p.lat) / (maxLat - minLat)) * 70 + 10;
    const pin = document.createElement('div');
    pin.className = 'map-pin ' + (p.mode==='rent' ? 'pin-rent' : 'pin-sell');
    pin.style.left = xPct + '%';
    pin.style.top  = yPct + '%';
    pin.innerHTML  = '<span class="pin-price">'+(p.mode==='rent'?'$'+p.price.toLocaleString()+'/mo':'$'+(p.price/1000).toFixed(0)+'k')+'</span>';
    pin.addEventListener('click', () => showMapPopup(p, xPct, yPct));
    container.appendChild(pin);
  });
}
function showMapPopup(prop, x, y) {
  const popup = document.getElementById('mapPopup');
  popup.style.display = 'block';
  popup.style.left = Math.min(x+2, 65) + '%';
  popup.style.top  = Math.max(y-20, 5) + '%';
  popup.innerHTML =
    '<button class="popup-close" onclick="document.getElementById(\'mapPopup\').style.display=\'none\'"><i class="fa-solid fa-xmark"></i></button>' +
    '<img src="'+prop.image+'" alt="'+prop.title+'" />' +
    '<div class="popup-body">' +
      '<h4>'+prop.title+'</h4>' +
      '<p>'+prop.address+'</p>' +
      '<p class="popup-price">'+(prop.mode==='rent'?'$'+prop.price.toLocaleString()+'/mo':'$'+prop.price.toLocaleString())+'</p>' +
      '<button class="enter-tour-btn" onclick="openTour('+prop.id+')"><i class="fa-solid fa-vr-cardboard"></i> 360\u00B0 Tour</button>' +
    '</div>';
}

/* ============================================================
   AGENTS
   ============================================================ */
function renderAgents() {
  const grid = document.getElementById('agentsGrid');
  if (!grid) return;
  const seen = {}, agents = [];
  PROPERTIES.forEach(p => {
    if (p.agent && !seen[p.agent.name]) {
      seen[p.agent.name] = true;
      agents.push(Object.assign({}, p.agent, {
        listings: PROPERTIES.filter(x => x.agent && x.agent.name === p.agent.name).length
      }));
    }
  });
  grid.innerHTML = agents.map(a =>
    '<div class="agent-card">' +
      '<div class="agent-img-wrap"><img src="'+a.img+'" alt="'+a.name+'" /></div>' +
      '<div class="agent-info">' +
        '<h4>'+a.name+'</h4>' +
        '<p class="agent-listings"><i class="fa-solid fa-house"></i> '+a.listings+' listing'+(a.listings!==1?'s':'')+'</p>' +
        '<a href="tel:'+a.phone+'" class="agent-phone"><i class="fa-solid fa-phone"></i> '+a.phone+'</a>' +
      '</div>' +
      '<a href="tel:'+a.phone+'" class="agent-cta">Contact</a>' +
    '</div>'
  ).join('');
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
function renderTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  const dots  = document.getElementById('tDots');
  if (!track) return;
  const total = track.querySelectorAll('.testimonial-card').length;
  dots.innerHTML = Array.from({length: total}, (_,i) =>
    '<button class="t-dot '+(i===0?'active':'')+'" onclick="goTestimonial('+i+')"></button>'
  ).join('');
  setInterval(() => goTestimonial((testimonialIdx + 1) % total), 5000);
}
function goTestimonial(idx) {
  testimonialIdx = idx;
  document.getElementById('testimonialsTrack').style.transform = 'translateX(-'+idx*100+'%)';
  document.querySelectorAll('.t-dot').forEach((d,i) => d.classList.toggle('active', i===idx));
}

/* ============================================================
   FAVOURITES
   ============================================================ */
function toggleFav(e, id) {
  e.stopPropagation();
  const btn = e.currentTarget;
  if (favourites.includes(id)) {
    favourites = favourites.filter(x => x !== id);
    btn.classList.remove('faved');
    btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    showToast('Removed from saved properties.');
  } else {
    favourites.push(id);
    btn.classList.add('faved');
    btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    showToast('Saved to favourites! \u2764\uFE0F');
  }
  localStorage.setItem('ed_favs', JSON.stringify(favourites));
  updateFavBadge();
}
function updateFavBadge() {
  document.getElementById('favCount').textContent = favourites.length;
  document.getElementById('favFab').classList.toggle('has-favs', favourites.length > 0);
}
function openFavDrawer() {
  const drawer = document.getElementById('favDrawer');
  const list   = document.getElementById('favList');
  drawer.classList.add('open');
  if (!favourites.length) { list.innerHTML = '<p class="fav-empty">No saved properties yet.</p>'; return; }
  list.innerHTML = favourites.map(id => {
    const p = PROPERTIES.find(x => x.id === id);
    if (!p) return '';
    return '<div class="fav-item">' +
      '<img src="'+p.image+'" alt="'+p.title+'" />' +
      '<div class="fav-item-info"><strong>'+p.title+'</strong><span>'+(p.mode==='rent'?'$'+p.price.toLocaleString()+'/mo':'$'+p.price.toLocaleString())+'</span></div>' +
      '<button onclick="openTour('+p.id+'); closeFavDrawer()"><i class="fa-solid fa-vr-cardboard"></i></button>' +
      '<button onclick="removeFav('+p.id+')"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>';
  }).join('');
}
function closeFavDrawer() { document.getElementById('favDrawer').classList.remove('open'); }
function removeFav(id) {
  favourites = favourites.filter(x => x !== id);
  localStorage.setItem('ed_favs', JSON.stringify(favourites));
  updateFavBadge(); openFavDrawer();
}
function addToFav() {
  if (!currentTourProp) return;
  const id = currentTourProp.id;
  const icon = document.getElementById('favIcon');
  if (favourites.includes(id)) {
    favourites = favourites.filter(x => x !== id);
    icon.className = 'fa-regular fa-heart';
    showToast('Removed from saved.');
  } else {
    favourites.push(id);
    icon.className = 'fa-solid fa-heart';
    showToast('Saved to favourites! \u2764\uFE0F');
  }
  localStorage.setItem('ed_favs', JSON.stringify(favourites));
  updateFavBadge();
}

/* ============================================================
   SHARE
   ============================================================ */
function shareProp(method) {
  if (!currentTourProp) return;
  const text = 'Check out '+currentTourProp.title+' on Ethio-Delala Real Estate!';
  if (method === 'whatsapp') {
    window.open('https://wa.me/?text='+encodeURIComponent(text+' '+window.location.href));
  } else {
    navigator.clipboard.writeText(window.location.href)
      .then(() => showToast('Link copied! \uD83D\uDD17'));
  }
}

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
function animateCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const raw = el.textContent;
      const target = parseFloat(raw.replace(/[^0-9.]/g,''));
      const suffix = raw.replace(/[0-9.]/g,'');
      let cur = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = (Number.isInteger(target) ? Math.round(cur) : cur.toFixed(1)) + suffix;
        if (cur >= target) clearInterval(timer);
      }, 16);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach(el => obs.observe(el));
}

/* ============================================================
   TOAST
   ============================================================ */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}
