document.getElementById('year').textContent = new Date().getFullYear();

// Ad-creative frames: show the video once its file loads; otherwise keep the Instagram link
document.querySelectorAll('.ig-video video, .ai-video video').forEach(v => {
  v.addEventListener('loadeddata', () => v.parentElement.classList.add('has-video'));
  v.addEventListener('error', () => v.parentElement.classList.remove('has-video'));
});

// Load and play a clip only while it is on screen, so the page doesn't pull every video at once
const clips = document.querySelectorAll('.ig-video video, .ai-video video');
if ('IntersectionObserver' in window) {
  const clipWatcher = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting) {
        if (v.preload !== 'auto') { v.preload = 'auto'; v.load(); }
        v.play().catch(() => {});
      } else {
        v.pause();
        if (!v.muted) { v.muted = true; }
      }
    });
  }, { rootMargin: '200px 0px', threshold: 0.25 });
  clips.forEach(v => clipWatcher.observe(v));
} else {
  clips.forEach(v => { v.preload = 'auto'; v.play().catch(() => {}); });
}

// Sound: autoplay must start muted; tapping the speaker unmutes that reel and mutes the others
const soundButtons = document.querySelectorAll('.ig-sound');
soundButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    const video = btn.closest('.ig, .aiv').querySelector('video');
    const turnOn = video.muted;
    document.querySelectorAll('.ig video, .aiv video').forEach(v => { v.muted = true; });
    soundButtons.forEach(b => { b.setAttribute('aria-pressed', 'false'); b.setAttribute('aria-label', 'Turn sound on'); });
    if (turnOn) {
      video.muted = false; video.volume = 1;
      video.play().catch(() => {});
      btn.setAttribute('aria-pressed', 'true'); btn.setAttribute('aria-label', 'Turn sound off');
    }
  });
});

// ---------- Handwriting draw-on ----------
// Neucha is an outline font, so rather than stroking SVG paths this inks the line
// character by character with a pen nib riding the end of the text. With
// data-phrases it loops: writes a line, holds, erases, writes the next.
function setupHandwriting(el) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phrases = el.dataset.phrases
    ? el.dataset.phrases.split('|').map(p => p.trim())
    : [el.textContent.trim()];
  const loop = phrases.length > 1;

  el.textContent = '';
  el.classList.add('writing');
  const ink = document.createElement('span');
  el.appendChild(ink);
  const nib = document.createElement('span');
  nib.className = 'hw-nib';
  el.appendChild(nib);

  if (reduce) { ink.textContent = phrases[0]; nib.remove(); return; }

  let p = 0;
  function place(span) {
    const box = el.getBoundingClientRect();
    const r = span.getBoundingClientRect();
    nib.style.transform = 'translate(' + (r.right - box.left) + 'px,' + (r.bottom - box.top) + 'px)';
  }
  function write() {
    const text = phrases[p];
    const chars = Array.from(text).map(ch => {
      const s = document.createElement('span');
      s.className = 'hw-ch inked';
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      s.style.opacity = '0';
      ink.appendChild(s);
      return { s, space: ch === ' ' };
    });
    nib.classList.add('on');
    let i = 0;
    (function step() {
      if (i >= chars.length) {
        nib.classList.remove('on');
        if (loop) setTimeout(erase, 2200);
        else setTimeout(() => nib.remove(), 260);
        return;
      }
      const { s, space } = chars[i];
      s.style.opacity = '1';
      place(s);
      i++;
      setTimeout(step, space ? 16 : 34);
    })();
  }
  function erase() {
    nib.classList.add('on');
    (function back() {
      const last = ink.lastElementChild;
      if (!last) {
        p = (p + 1) % phrases.length;
        setTimeout(write, 320);
        return;
      }
      last.remove();
      if (ink.lastElementChild) place(ink.lastElementChild);
      setTimeout(back, 16);
    })();
  }

  if (!('IntersectionObserver' in window)) { write(); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { io.unobserve(entry.target); setTimeout(write, 220); }
    });
  }, { threshold: 0.6 });
  io.observe(el);
}

document.querySelectorAll('.handwrite').forEach(setupHandwriting);

// ---------- Scroll reveal ----------
(function () {
  const sel = '.hero-photo, .hero-note, .about-photo, .apps, .strip, .entry, .receipt, .proofs .photo, .shots .photo, .wins .note, .tile, .contact-note, .folder, .blob';
  const items = Array.from(document.querySelectorAll(sel));
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  items.forEach(el => el.classList.add('rv'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      const group = Array.from(entry.target.parentElement.children).indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('in'), Math.min(group, 5) * 70);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  items.forEach(el => io.observe(el));
})();

// ---------- Pointer tilt on the big photos ----------
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll('.hero-photo, .about-photo').forEach(card => {
    const base = getComputedStyle(card).getPropertyValue('--tilt') || '0deg';
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.classList.add('tilting');
      card.style.transform = 'perspective(900px) rotate(' + base + ') rotateY(' + (x * 7).toFixed(2) + 'deg) rotateX(' + (-y * 7).toFixed(2) + 'deg) translateY(-4px)';
    });
    card.addEventListener('pointerleave', () => {
      card.classList.remove('tilting');
      card.style.transform = '';
    });
  });
})();


// ---------- Collapsible clip drawers (folder + blob) ----------
function setupDrawer(btnSelector, gridId, openLabel, closeLabel) {
  const btn = document.querySelector(btnSelector);
  if (!btn) return;
  const grid = document.getElementById(gridId);
  const label = btn.querySelector('.folder-label');
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      grid.classList.remove('open');
      grid.querySelectorAll('video').forEach(v => { v.pause(); v.muted = true; });
      setTimeout(() => grid.classList.add('stashed'), 380);
      btn.setAttribute('aria-expanded', 'false');
      label.textContent = openLabel;
    } else {
      grid.classList.remove('stashed');
      void grid.offsetWidth;
      grid.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      label.textContent = closeLabel;
      grid.querySelectorAll('video').forEach(v => {
        if (v.preload !== 'auto') { v.preload = 'auto'; v.load(); }
      });
      setTimeout(() => {
        grid.querySelectorAll('video').forEach(v => {
          const r = v.getBoundingClientRect();
          if (r.top < innerHeight && r.bottom > 0) v.play().catch(() => {});
        });
      }, 420);
    }
  });
}

setupDrawer('.folder', 'reel-grid', 'open the folder', 'close the folder');
setupDrawer('.blob', 'ai-grid', 'poke it to open', 'poke it to close');
