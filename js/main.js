/* ============================================================
   MAXNOVA TECH — main.js
   ============================================================ */

const MOON = `<path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>`;
const SUN  = `<circle cx="12" cy="12" r="5"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>`;

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('mnt-theme', theme);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.innerHTML = theme === 'dark' ? SUN : MOON;
}

const savedTheme = localStorage.getItem('mnt-theme') || 'light';
applyTheme(savedTheme);

document.getElementById('themeToggle')?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ── Scrolled nav ─────────────────────────────────────────── */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

/* ── Active nav link ──────────────────────────────────────── */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

/* ── Mobile hamburger ─────────────────────────────────────── */
const hamburger = document.querySelector('.hamburger');
const navList   = document.querySelector('.nav-links');
if (hamburger && navList) {
  hamburger.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    const spans = hamburger.querySelectorAll('span');
    spans[1].style.opacity = open ? '0' : '';
    spans[0].style.transform = open ? 'rotate(45deg) translate(5px, 7px)' : '';
    spans[2].style.transform = open ? 'rotate(-45deg) translate(5px, -7px)' : '';
  });
  navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navList.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    hamburger.querySelectorAll('span').forEach(s => s.style.cssText = '');
  }));
}

/* ── Back to top ──────────────────────────────────────────── */
const btt = document.getElementById('backToTop');
if (btt) {
  window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Reveal on scroll ─────────────────────────────────────── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── Counter animation ────────────────────────────────────── */
const counters = document.querySelectorAll('.stat-count');
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 30);
    countObs.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(c => countObs.observe(c));
