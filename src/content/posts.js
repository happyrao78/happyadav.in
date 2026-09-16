import { parseFrontmatter, readingTime } from '../lib/markdown.jsx';

/**
 * Drop a new `.md` file into src/content/posts/ and it appears on the blog.
 * Frontmatter keys: title, date (YYYY-MM-DD), summary, tags [a, b], featured, slug.
 */
const files = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true });

function slugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '');
}

export const posts = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    return {
      slug: data.slug || slugFromPath(path),
      title: data.title || slugFromPath(path),
      date: data.date || '',
      summary: data.summary || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      featured: Boolean(data.featured),
      minutes: readingTime(body),
      body,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();

export function getPost(slug) {
  return posts.find((post) => post.slug === slug) || null;
}

export function formatDate(value) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
