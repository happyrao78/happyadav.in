# happyadav.in

Personal site for Happy Yadav, Applied AI Engineer. Single page portfolio plus a
file-based blog. React and Vite, no UI framework and no runtime dependencies
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
| Resume PDF and favicon | `public/` |
| Design tokens (colour, type, spacing) | `src/styles/tokens.css` |

Nothing in `src/components/` holds copy. To change the site, edit
`src/content/profile.js`.

## Publishing a blog post

Drop a Markdown file into `src/content/posts/`. The filename becomes the URL
slug, so `latency-budgets.md` is served at `/#/blog/latency-budgets`.

````markdown
---
title: The latency budget is the product
date: 2026-08-18
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

- `title` — required
- `date` — `YYYY-MM-DD`, controls ordering (newest first)
- `summary` — shown on cards and in the home page preview
- `tags` — array, becomes the filter pills on the blog index
- `slug` — optional, overrides the filename
- `featured` — optional flag for your own use

Supported Markdown: headings, paragraphs, bold, italic, inline code, links,
images, unordered and ordered lists, blockquotes, fenced code blocks and
horizontal rules. Reading time is calculated automatically.

## Routing

Hash based, so the site deploys to any static host with no rewrite rules.

- `/` home
- `/#/blog` blog index with search and tag filters
- `/#/blog/<slug>` article

## Design notes

- Display type: Instrument Serif, with its italic used as the accent voice
- Interface type: Inter
- Labels and metadata: JetBrains Mono
- Palette: near-black `#08080A`, warm paper `#ECE8E1`, sand accent `#D8B384`

Motion is driven by one `IntersectionObserver` in `src/lib/useReveal.js` and CSS
transitions. Everything collapses cleanly under `prefers-reduced-motion`.
