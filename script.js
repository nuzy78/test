const body = document.body;
const menuBtn = document.querySelector('[data-menu-toggle]');
const header = document.querySelector('.header');
const toast = document.querySelector('[data-toast]');
const mobileNav = document.querySelector('.mobile-nav');

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

if (menuBtn && header) {
  menuBtn.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// FAQ accordion
[...document.querySelectorAll('[data-faq]')].forEach((item) => {
  const q = item.querySelector('.faq-q');
  q?.addEventListener('click', () => item.classList.toggle('open'));
});

// Product filters / search
const cards = [...document.querySelectorAll('[data-product]')];
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const searchInput = document.querySelector('[data-search]');

function applyFilters() {
  const active = document.querySelector('[data-filter].active')?.dataset.filter || 'all';
  const term = (searchInput?.value || '').trim().toLowerCase();

  cards.forEach((card) => {
    const matchCategory = active === 'all' || card.dataset.category === active;
    const matchSearch = !term || card.dataset.title.includes(term) || card.dataset.tags.includes(term);
    card.style.display = matchCategory && matchSearch ? '' : 'none';
  });

  const visible = cards.some((card) => card.style.display !== 'none');
  const empty = document.querySelector('[data-empty-state]');
  if (empty) empty.style.display = visible ? 'none' : 'block';
}

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilters();
  });
});
searchInput?.addEventListener('input', applyFilters);
applyFilters();

// Demo cart interactions
function addToBag(title) {
  const bag = JSON.parse(localStorage.getItem('luxe-bag') || '[]');
  bag.push(title);
  localStorage.setItem('luxe-bag', JSON.stringify(bag));
  const countEls = document.querySelectorAll('[data-bag-count]');
  countEls.forEach((el) => (el.textContent = bag.length));
  showToast(`${title} added to bag`);
}

document.querySelectorAll('[data-add-to-bag]').forEach((btn) => {
  btn.addEventListener('click', () => addToBag(btn.dataset.addToBag));
});

// Contact form / newsletter demo
[...document.querySelectorAll('form[data-demo-form]')].forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
    showToast('Thanks! Your message was sent.');
  });
});

// Smooth mobile close after click
mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    header?.classList.remove('nav-open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  });
});
