// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

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

// Stats: render final values
document.querySelectorAll('.stat .num').forEach(el => {
  el.textContent = (el.dataset.prefix || '') + el.dataset.count + (el.dataset.suffix || '');
});
