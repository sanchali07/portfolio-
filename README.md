# Portfolio — Sanchali Gupta

A simple, responsive personal portfolio built with plain HTML, CSS and JavaScript. No build step required.

## Structure

- `index.html` — page content (About, Projects, Skills, Contact)
- `style.css` — styling, including light/dark themes
- `script.js` — dark-mode toggle and footer year

## Editing

Content lives in `index.html`. To add links to live work, fill the empty `<div class="links" data-links="…">` blocks (Hyeglo, content project, Desh Ki Dukaan) with `<a href="…" target="_blank" rel="noopener">Label ↗</a>` tags, and set the LinkedIn URL on the `data-link="linkedin"` button in the Contact section.

## Publishing with GitHub Pages

1. Go to the repository **Settings → Pages**.
2. Under *Build and deployment*, choose **Deploy from a branch**, select `main` and `/ (root)`.
3. Save — the site will be live at `https://sanchali07.github.io/portfolio-/` in a minute or two.
