# Sanchali General Store — portfolio of Sanchali Gupta

A one-page portfolio built with plain HTML, CSS and JavaScript. No build step.

The concept: the portfolio is a hand-drawn shop. Each project is an item on the shelf, the headline numbers are printed as a bill, awards hang framed on the wall, and the contact section is "Place an order".

## Structure

- `index.html` — the whole site: markup, styles and script in one file
- `assets/` — photos, proof screenshots, brand logos and app icons
- `videos/` — reels and the AI ad, loaded only when scrolled into view
- `handoff/` — the content pack (all copy, numbers and links) the site is built from

## Editing

All copy lives in `index.html`. Colours are tokens at the top of the `<style>` block (indigo for text, plus orange and yellow). The Hyeglo reels are Instagram embeds; to make them autoplay like the others, add their MP4s to `videos/` and switch those cards to `<video data-src="…">`.

## Publishing with GitHub Pages

Settings → Pages → Deploy from a branch → `main` / `(root)`. The site goes live at `https://sanchali07.github.io/portfolio-/`.
