document.getElementById('year').textContent = new Date().getFullYear();

// Ad-creative frames: show the video once its file loads; otherwise keep the Instagram link
document.querySelectorAll('.ig-video video').forEach(v => {
  v.addEventListener('loadeddata', () => v.parentElement.classList.add('has-video'));
  v.addEventListener('error', () => v.parentElement.classList.remove('has-video'));
});
