/**
 * Post build SEO pass.
 *
 * Social scrapers (X, WhatsApp, LinkedIn, Slack) do not run JavaScript, so a
 * single index.html would give every route the home page preview. This writes a
 * real HTML file per route with the correct head tags, generates sitemap.xml,
 * and drops a 404.html fallback for hosts without rewrite rules.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const postsDir = join(root, 'src', 'content', 'posts');

const SITE = 'https://happyadav.in';
const NAME = 'Happy Yadav';

const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Replaces the content attribute of the first meta tag matching `matcher`. */
function setMeta(html, matcher, content) {
  const re = new RegExp(`<meta[^>]*${matcher}[^>]*>`, 'i');
  if (!re.test(html)) return html;
  return html.replace(re, (tag) => tag.replace(/content="[^"]*"/i, `content="${esc(content)}"`));
}

function setCanonical(html, url) {
  return html.replace(/<link[^>]*rel="canonical"[^>]*>/i, `<link rel="canonical" href="${esc(url)}" />`);
}

function head(html, { title, description, url, type }) {
  let out = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  out = setMeta(out, 'name="description"', description);
  out = setMeta(out, 'property="og:title"', title);
  out = setMeta(out, 'property="og:description"', description);
  out = setMeta(out, 'property="og:url"', url);
  out = setMeta(out, 'property="og:type"', type);
  out = setMeta(out, 'name="twitter:title"', title);
  out = setMeta(out, 'name="twitter:description"', description);
  return setCanonical(out, url);
}

function frontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw.replace(/^﻿/, ''));
  if (!match) return {};
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line.trim());
    if (pair) data[pair[1]] = pair[2].trim().replace(/^['"]|['"]$/g, '');
  }
  return data;
}

const posts = (existsSync(postsDir) ? readdirSync(postsDir) : [])
  .filter((file) => file.endsWith('.md'))
  .map((file) => {
    const data = frontmatter(readFileSync(join(postsDir, file), 'utf8'));
    return {
      slug: data.slug || file.replace(/\.md$/, ''),
      title: data.title || file.replace(/\.md$/, ''),
      description: data.summary || '',
      date: data.date || '',
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

const template = readFileSync(join(dist, 'index.html'), 'utf8');
const today = new Date().toISOString().slice(0, 10);

const routes = [
  {
    path: '/',
    title: `${NAME} | Applied AI Engineer`,
    description:
      'Applied AI Engineer building real time voice agents, multi channel chat systems and LLM evaluation platforms. Live in production across phone, web and WhatsApp.',
    type: 'website',
    priority: '1.0',
    changefreq: 'monthly',
    lastmod: today,
  },
  {
    path: '/blog',
    title: `Technical blogs | ${NAME}`,
    description:
      'Technical deep dives on real time voice systems, agentic pipelines and LLM evaluation, written from what actually shipped.',
    type: 'website',
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: posts[0]?.date || today,
  },
  ...posts.map((post) => ({
    path: `/blog/${post.slug}`,
    title: `${post.title} | ${NAME}`,
    description: post.description,
    type: 'article',
    priority: '0.7',
    changefreq: 'yearly',
    lastmod: post.date || today,
  })),
];

for (const route of routes) {
  const url = SITE + (route.path === '/' ? '/' : route.path);
  const html = head(template, { ...route, url });

  if (route.path === '/') {
    writeFileSync(join(dist, 'index.html'), html);
    writeFileSync(join(dist, '404.html'), html); // GitHub Pages style SPA fallback
  } else {
    const dir = join(dist, route.path.slice(1));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html);
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE}${route.path === '/' ? '/' : route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);

console.log(
  `seo: ${routes.length} route${routes.length === 1 ? '' : 's'} prerendered, sitemap.xml and 404.html written`,
);
