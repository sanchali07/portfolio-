document.getElementById('year').textContent = new Date().getFullYear();

// Ad-creative frames: show the video once its file loads; otherwise keep the Instagram link
document.querySelectorAll('.ig-video video').forEach(v => {
  v.addEventListener('loadeddata', () => v.parentElement.classList.add('has-video'));
  v.addEventListener('error', () => v.parentElement.classList.remove('has-video'));
});

// Sound: autoplay must start muted; tapping the speaker unmutes that reel and mutes the others
const soundButtons = document.querySelectorAll('.ig-sound');
soundButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    const ig = btn.closest('.ig');
    const video = ig.querySelector('video');
    const turnOn = video.muted;
    document.querySelectorAll('.ig video').forEach(v => { v.muted = true; });
    soundButtons.forEach(b => { b.setAttribute('aria-pressed', 'false'); b.setAttribute('aria-label', 'Turn sound on'); });
    if (turnOn) {
      video.muted = false; video.volume = 1;
      video.play().catch(() => {});
      btn.setAttribute('aria-pressed', 'true'); btn.setAttribute('aria-label', 'Turn sound off');
    }
  });
});
