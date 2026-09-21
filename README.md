# happyadav.in

Personal site for Happy Yadav, Applied AI Engineer. Single page portfolio plus a
file based blog. React and Vite, no UI framework and no runtime dependencies
beyond React itself.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview
```

## Where the content lives

| What | File |
| --- | --- |
| Every word on the home page | `src/content/profile.js` |
| Blog posts | `src/content/posts/*.md` |
| Company logos, resume PDF, icons, OG image | `public/` |
| robots.txt, manifest, host rewrites | `public/` |
| Design tokens (colour, type, spacing) | `src/styles/tokens.css` |

Nothing in `src/components/` holds copy. To change the site, edit
`src/content/profile.js`.

Two markup helpers work inside any string in that file:

- `_word_` renders in the teal accent
- `*word*` renders in semibold ink

## Publishing a technical blog

The blog currently shows a "dropping soon" state because there are no posts. Drop
a Markdown file into `src/content/posts/` and the whole blog switches on by
itself: index, search, tag filters, reading time and article pages.

These are positioned as technical blogs rather than short notes, so each one
should carry architecture, trade offs and real numbers.

The filename becomes the URL slug, so `latency-budgets.md` is served at
`/#/blog/latency-budgets`.

````markdown
---
title: The latency budget is the product
date: 2026-09-21
summary: One sentence that shows up on the blog index and the home page.
tags: [Voice AI, Latency]
featured: true
---

Your first paragraph.

## A heading

- A list item
- Another one

> A pull quote.

```python
print("fenced code works too")
```
````

Frontmatter keys:

- `title` required
- `date` as `YYYY-MM-DD`, controls ordering (newest first)
- `summary` shown on cards and in the home page preview
- `tags` array, becomes the filter pills on the blog index
- `slug` optional, overrides the filename
- `featured` optional flag for your own use

Supported Markdown: headings, paragraphs, bold, italic, inline code, links,
images, unordered and ordered lists, blockquotes, fenced code blocks and
horizontal rules. Reading time is calculated automatically.

## Logos

`public/logos/` holds the marks used in the "shipped for, backed by and
recognised at" strip and as chips beside each role and award. To add one, drop a
square PNG or SVG in that folder and reference it from `profile.logos.items`,
`profile.experience.roles[].logo` or `profile.recognition.items[].logo`.

Any entry with an empty `logo` falls back to a bordered chip showing the initials
of the first two words, so a missing file never breaks the layout.

## Routing

Real paths, not hash fragments, because search engines and social scrapers treat
`/#/blog` as the same page as `/`.

- `/` home
- `/blog` blog index, or the "cooking" state while empty
- `/blog/<slug>` article

Old `/#/blog` links still work: `upgradeLegacyHash()` in `src/lib/router.js`
rewrites them to the real path before the first render.

## SEO

`npm run build` runs `scripts/postbuild.mjs` after Vite, which does three things:

1. **Prerenders a real HTML file per route** with its own title, description,
   canonical and Open Graph tags. X, WhatsApp, LinkedIn and Slack do not run
   JavaScript, so without this every route would share the home page preview.
   `/blog` ships as `dist/blog/index.html`, each post as
   `dist/blog/<slug>/index.html`.
2. **Generates `sitemap.xml`** from the routes plus every Markdown post, with
   `lastmod` taken from each post's date.
3. **Writes `404.html`** as an SPA fallback for hosts that need one.

Also in place: `robots.txt` naming the sitemap and allowing the preview crawlers
by name, JSON-LD `Person`, `WebSite`, `ProfilePage`, `Organization` (one per
venture) and `BlogPosting` entities from `src/lib/seo.js`, a web manifest, and
`max-image-preview:large` so Google may use the large card.

### Link previews

`public/og.png` is the 1200x630 card used by every platform. To regenerate it,
render an HTML card at that size and screenshot it:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --window-size=1200,630 --screenshot=public/og.png file://$PWD/card.html
```

Keep it under about 300KB or WhatsApp will skip it. The current file is 48KB.

### Deploying

Rewrite configs ship for the common hosts, so no setup is needed:

- Vercel: `vercel.json`
- Netlify and Cloudflare Pages: `public/_redirects`
- GitHub Pages: the generated `dist/404.html`

If you move off `happyadav.in`, change `SITE` in `scripts/postbuild.mjs` and
`seo.siteUrl` in `src/content/profile.js`.

## Sections

`profile.ventures` drives the "Building now" block for rentalease.in and
placeholderworks.com. Add another entry and a third card appears.

Project level figures live on the project itself, in `stats`, and render through
`src/components/StatRow.jsx`. The Impact section stays business only: clients,
volume, efficiency and people. Keep it that way, otherwise the two blur.

## The impact section

`profile.metrics.items` drives the counters. Each entry is a number plus a unit,
kept separate so the value can animate:

```js
{ to: 100, suffix: 'K+', label: 'Conversations handled', line: 'One sentence of context.' }
```

`src/components/Counter.jsx` counts up from zero the first time the card scrolls
into view, once only. Digits are rendered with `tabular-nums` so the card does
not shift while the number grows, the final value is always present for screen
readers, and `prefers-reduced-motion` skips straight to it.

These are business figures on purpose: clients, volume, efficiency, reach and
people. Technical and per project detail belongs in Experience and Selected work.

## Light and dark

The site ships both themes. It follows the operating system until the visitor
uses the toggle in the nav, then remembers that choice in `localStorage` under
`hy-theme`.

Both palettes live in `src/styles/tokens.css`: light on `:root`, dark on
`:root[data-theme="dark"]` and again inside a `prefers-color-scheme` block so the
page is still correct with JavaScript disabled. No component or section
stylesheet contains a hardcoded colour, so adding a theme means adding one token
block.

An inline script in `index.html` stamps the resolved theme on `<html>` before
first paint, so there is no flash of the wrong theme on load. Company logos are
inverted in dark mode through the `--logo-filter` and `--chip-img-filter` tokens
rather than by shipping a second set of files.

## Design notes

The palette and typography follow the 360labs.ai design system.

- Surface: warm off white `#FAFAF7`, with `#F4F4EF` and white for raised cards
- Ink: `#1A1A1A`, muted text `#6C6E6B`, hairlines `#E5E5E5`
- Accent: teal `#2AB09E`
- Interface and display type: Archivo
- Labels, metadata and small caps: Chivo Mono
- Corners: `0.5rem`, `1rem` and full pills, matching the reference

Dark mode keeps the same system inverted: `#0E0E0F` surface, `#F2F1EC` ink and a
brighter teal `#35C4B0` to hold contrast.

The hero wordmark is an inline SVG sized by its `viewBox`, so it spans the shell
exactly at every viewport width rather than being tuned with breakpoints.

Motion is driven by one `IntersectionObserver` in `src/lib/useReveal.js` plus CSS
transitions. Everything collapses cleanly under `prefers-reduced-motion`.
