# Portfolio — Sanchali Gupta

A simple, responsive personal portfolio built with plain HTML, CSS and JavaScript. No build step required.

## Design

Modelled on the Impossible Foods web style (dark canvas, floating pill nav, oversized centred display type with a parenthetical second line, bracket accents, pill CTAs, flat cards, organically masked floating images), translated into the Dunku palette:

| Impossible role | Dunku colour |
|---|---|
| Page canvas | Edible Indigo `#3F3BC6` |
| Card surfaces | deeper indigo `#2E2B9E` |
| Accent (all emphasis, CTAs, display type) | Nazar Battu Yellow `#FFEE04` |
| Body text | Tofu Cream `#FDFBE4` |
| Bracket accents | Crate Magenta `#D9217A` |
| Floating image placeholders | Magenta, Crate Teal, Zesty Tofu, Cream |

Type: Londrina Solid (display), Fredoka (UI, labels, sub-heads), Open Sans (body), Neucha (handwritten asides; stand-in for Orinella Scribble).

### Adding photos
The hero has four `<figure class="float">` slots. Replace each `<div class="ph …">` with `<img src="…" alt="…">`; the organic clip-path mask is applied automatically.

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
