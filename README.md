# Portfolio — Sanchali Gupta

A simple, responsive personal portfolio built with plain HTML, CSS and JavaScript. No build step required.

## Brand system

Built on the Dunku brand palette and type stack:

| Role | Font | Colours |
|---|---|---|
| Headings | Londrina Solid | Edible Indigo `#3F3BC6`, Nazar Battu Yellow `#FFEE04` |
| Sub-headings / UI | Fredoka | Crate Magenta `#D9217A`, Zesty Tofu `#FF7B00` |
| Body | Open Sans (per the designer's guideline note) | Kadhai Brown `#1F1915` on Tofu Cream `#FDFBE4` |
| Accent / scribbles | Neucha (stand-in for Orinella Scribble, which is a paid font) | Crate Teal `#6BE1FF`, The another Teal `#25A7FF` |

Fonts load from Google Fonts; no font files are bundled. To swap in Orinella Scribble, add its `@font-face` to `style.css` and change `--accentfont`.

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
