// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Dark mode toggle (remembers choice)
const toggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
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
