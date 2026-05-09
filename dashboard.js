// ============================================================
//  Ethio-Delala ESTATES — Dashboard JS
// ============================================================

// Local listings (starts with seed data, can add more)
let dashListings = [...PROPERTIES];

document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderRecentGrid();
  renderTable();
  initTabs();
});

function initTabs() {
  document.querySelectorAll('.dash-nav-link[data-tab]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(link.dataset.tab);
    });
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.dash-nav-link').forEach(l => l.classList.remove('active'));
  const tab = document.getElementById('tab-' + tabId);
  if (tab) tab.classList.add('active');
  const link = document.querySelector('[data-tab="' + tabId + '"]');
  if (link) link.classList.add('active');
}

function renderStats() {
  document.getElementById('statTotal').textContent = dashListings.length;
  document.getElementById('statRent').textContent = dashListings.filter(p => p.mode === 'rent').length;
  document.getElementById('statSell').textContent = dashListings.filter(p => p.mode === 'sell').length;
}

function renderRecentGrid() {
  const grid = document.getElementById('recentGrid');
  const recent = dashListings.slice(-4).reverse();
  grid.innerHTML = recent.map(p => `
    <div class="recent-card">
      <img src="${p.image}" alt="${p.title}" loading="lazy" />
      <div class="recent-card-body">
        <h4>${p.title}</h4>
        <p>${p.address}</p>
        <p class="recent-price">${p.mode === 'rent' ? '$'+p.price.toLocaleString()+'/mo' : '$'+p.price.toLocaleString()}</p>
      </div>
    </div>`).join('');
}

function renderTable() {
  const tbody = document.getElementById('listingsTableBody');
  tbody.innerHTML = dashListings.map(p => `
    <tr>
      <td><strong>${p.title}</strong><br/><small style="color:var(--brown-light)">${p.address}</small></td>
      <td style="text-transform:capitalize">${p.type}</td>
      <td><span class="mode-badge mode-${p.mode}">${p.mode === 'rent' ? 'For Rent' : 'For Sale'}</span></td>
      <td>${p.mode === 'rent' ? '$'+p.price.toLocaleString()+'/mo' : '$'+p.price.toLocaleString()}</td>
      <td>${p.beds}</td>
      <td>${p.baths}</td>
      <td>
        <div class="table-actions">
          <button class="tbl-btn tbl-edit" onclick="editListing(${p.id})"><i class="fa-solid fa-pen"></i></button>
          <button class="tbl-btn tbl-del" onclick="deleteListing(${p.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>`).join('');
}

function addListing(e) {
  e.preventDefault();
  const newId = Math.max(...dashListings.map(p => p.id)) + 1;
  const newProp = {
    id: newId,
    title: document.getElementById('fTitle').value,
    address: document.getElementById('fAddress').value,
    mode: document.getElementById('fMode').value,
    type: document.getElementById('fType').value,
    price: parseFloat(document.getElementById('fPrice').value),
    beds: parseInt(document.getElementById('fBeds').value),
    baths: parseInt(document.getElementById('fBaths').value),
    sqft: parseInt(document.getElementById('fSqft').value),
    description: document.getElementById('fDesc').value || 'A beautiful property.',
    image: document.getElementById('fImage').value || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    videoSrc: document.getElementById('fVideo').value || 'https://www.w3schools.com/html/mov_bbb.mp4',
    floorplan: document.getElementById('fFloor').value || 'Details available on request.',
    badge: document.getElementById('fMode').value === 'rent' ? 'For Rent' : 'For Sale',
    rooms: [{ name: 'Living Room', color: '#8B5E3C' }, { name: 'Kitchen', color: '#795548' }],
    hotspots: [{ x: 40, y: 50, label: 'Main Area' }]
  };

  dashListings.push(newProp);
  PROPERTIES.push(newProp);

  renderStats();
  renderRecentGrid();
  renderTable();
  document.getElementById('addForm').reset();
  showDashToast('Listing added successfully! ✦');
  switchTab('listings');
}

function deleteListing(id) {
  if (!confirm('Delete this listing?')) return;
  dashListings = dashListings.filter(p => p.id !== id);
  renderStats();
  renderRecentGrid();
  renderTable();
  showDashToast('Listing removed.');
}

function editListing(id) {
  const p = dashListings.find(x => x.id === id);
  if (!p) return;
  switchTab('add');
  document.getElementById('fTitle').value = p.title;
  document.getElementById('fAddress').value = p.address;
  document.getElementById('fMode').value = p.mode;
  document.getElementById('fType').value = p.type;
  document.getElementById('fPrice').value = p.price;
  document.getElementById('fBeds').value = p.beds;
  document.getElementById('fBaths').value = p.baths;
  document.getElementById('fSqft').value = p.sqft;
  document.getElementById('fDesc').value = p.description;
  document.getElementById('fImage').value = p.image;
  document.getElementById('fVideo').value = p.videoSrc;
  document.getElementById('fFloor').value = p.floorplan;
  showDashToast('Editing: ' + p.title);
}

function showDashToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

