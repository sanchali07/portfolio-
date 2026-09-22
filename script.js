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
// Neucha is an outline font, so instead of stroking SVG paths this inks the line
// character by character with a pen nib riding the end of the text.
function setupHandwriting(el) {
  const text = el.textContent;
  el.textContent = '';
  el.classList.add('writing');

  const chars = Array.from(text).map(ch => {
    const span = document.createElement('span');
    span.className = 'hw-ch';
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    el.appendChild(span);
    return { span, isSpace: ch === ' ' };
  });

  const nib = document.createElement('span');
  nib.className = 'hw-nib';
  el.appendChild(nib);

  function write() {
    const box = el.getBoundingClientRect();
    let i = 0;
    nib.classList.add('on');
    (function step() {
      if (i >= chars.length) {
        nib.classList.remove('on');
        setTimeout(() => nib.remove(), 260);
        return;
      }
      const { span, isSpace } = chars[i];
      span.classList.add('inked');
      const r = span.getBoundingClientRect();
      const top = el.getBoundingClientRect();
      nib.style.transform = 'translate(' + (r.right - top.left) + 'px,' + (r.bottom - top.top) + 'px)';
      i++;
      setTimeout(step, isSpace ? 16 : 34);
    })();
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    chars.forEach(c => c.span.classList.add('inked'));
    nib.remove();
    return;
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

// ---------- Ad creatives folder ----------
const folder = document.querySelector('.folder');
if (folder) {
  const grid = document.getElementById('reel-grid');
  const label = folder.querySelector('.folder-label');
  folder.addEventListener('click', () => {
    const isOpen = folder.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      grid.classList.remove('open');
      grid.querySelectorAll('video').forEach(v => { v.pause(); v.muted = true; });
      setTimeout(() => grid.classList.add('stashed'), 380);
      folder.setAttribute('aria-expanded', 'false');
      label.textContent = 'open the folder';
    } else {
      grid.classList.remove('stashed');
      void grid.offsetWidth;
      grid.classList.add('open');
      folder.setAttribute('aria-expanded', 'true');
      label.textContent = 'close the folder';
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
