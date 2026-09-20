# Portfolio — Sanchali Gupta

A simple, responsive personal portfolio built with plain HTML, CSS and JavaScript. No build step required.

## Design

Crumpled-paper scrapbook: cream paper with a grain texture, tilted white-bordered photos with paper clips, yellow pinned notes, cut-paper display type. Dunku palette: Zesty Tofu orange for display type, Tofu Cream paper, Nazar Battu Yellow notes, Edible Indigo body text, Crate Magenta for taped-on notes, and teal / orange / indigo photo-backed bands.

Type: Londrina Solid (display), Fredoka (labels), Open Sans (body), Neucha (handwritten notes).

### Adding photos
There are three placeholder slots, each a `<div class="img …">` inside a `<figure class="photo">`:

1. Hero, wide (`.hero-photo`)
2. About, portrait (`.about-photo`)
3. Work panel (`.work-photo`)

Replace the `<div class="img …">…</div>` with `<img src="images/your-file.jpg" alt="…">`. The white border, tilt and paper clip stay as they are.

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
