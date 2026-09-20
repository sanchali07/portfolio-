// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Dark mode (remembers choice) ----------
const toggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
}

let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(saved || (prefersDark ? 'dark' : 'light'));

toggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// ---------- Reveal on scroll ----------
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = Array.from(document.querySelectorAll('.reveal'));

if (reduceMotion) {
  revealEls.forEach(el => el.classList.add('in'));
} else {
  let pending = revealEls.slice();
  let ticking = false;
  function revealVisible() {
    ticking = false;
    const limit = window.innerHeight * 0.92;
    pending = pending.filter(el => {
      if (el.getBoundingClientRect().top < limit) { el.classList.add('in'); return false; }
      return true;
    });
    if (!pending.length) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(revealVisible); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  revealVisible();
}

// ---------- Count-up stats ----------
function countUp(el) {
  const target = parseInt(el.dataset.count, 10);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const nums = Array.from(document.querySelectorAll('.stat .num'));
if (reduceMotion) {
  nums.forEach(el => el.textContent = (el.dataset.prefix || '') + el.dataset.count + (el.dataset.suffix || ''));
} else {
  let pendingNums = nums.slice();
  function checkNums() {
    pendingNums = pendingNums.filter(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) { countUp(el); return false; }
      return true;
    });
    if (!pendingNums.length) window.removeEventListener('scroll', checkNums);
  }
  window.addEventListener('scroll', checkNums, { passive: true });
  checkNums();
}
