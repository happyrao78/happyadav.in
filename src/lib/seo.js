import profile from '../content/profile.js';

const { seo, links, handles, name, role } = profile;

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

const absolute = (path) => (/^https?:/.test(path) ? path : seo.siteUrl + path);

/**
 * Writes the title, description, canonical, Open Graph and Twitter tags for a
 * route. Open Graph covers X, WhatsApp, LinkedIn, Slack, Discord, Telegram and
 * Instagram DM previews; they all read the same tags.
 */
export function applySeo({ path = '/', title, description, image, type = 'website', published } = {}) {
  const url = seo.siteUrl + (path === '/' ? '/' : path);
  const img = absolute(image || seo.image);
  const finalTitle = title || seo.title;
  const finalDescription = description || seo.description;

  document.title = finalTitle;
  setMeta('name', 'description', finalDescription);
  setMeta('name', 'author', name);
  setMeta('name', 'keywords', seo.keywords);
  setLink('canonical', url);

  setMeta('property', 'og:type', type);
  setMeta('property', 'og:site_name', name);
  setMeta('property', 'og:title', finalTitle);
  setMeta('property', 'og:description', finalDescription);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:locale', 'en_IN');
  setMeta('property', 'og:image', img);
  setMeta('property', 'og:image:secure_url', img);
  setMeta('property', 'og:image:type', 'image/png');
  setMeta('property', 'og:image:width', '1200');
  setMeta('property', 'og:image:height', '630');
  setMeta('property', 'og:image:alt', seo.imageAlt);

  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', finalTitle);
  setMeta('name', 'twitter:description', finalDescription);
  setMeta('name', 'twitter:image', img);
  setMeta('name', 'twitter:image:alt', seo.imageAlt);
  setMeta('name', 'twitter:site', `@${handles.x}`);
  setMeta('name', 'twitter:creator', `@${handles.x}`);

  if (type === 'article' && published) {
    setMeta('property', 'article:published_time', published);
    setMeta('property', 'article:author', links.linkedin);
  }
}

/** Person and WebSite structured data, so search engines get an entity, not just a page. */
export function applyJsonLd(posts = []) {
  const graph = [
    {
      '@type': 'Person',
      '@id': `${seo.siteUrl}/#person`,
      name,
      url: `${seo.siteUrl}/`,
      jobTitle: role,
      email: `mailto:${profile.email}`,
      image: absolute(seo.image),
      description: seo.description,
      sameAs: [links.github, links.linkedin, links.x, links.reddit],
      knowsAbout: [
        'Applied AI Engineering',
        'Real time voice AI',
        'Conversational AI',
        'Retrieval Augmented Generation',
        'Model Context Protocol',
        'LLM evaluation',
        'WebRTC',
        'FastAPI',
      ],
      alumniOf: { '@type': 'CollegeOrUniversity', name: profile.education.institution },
      worksFor: { '@type': 'Organization', name: profile.experience.roles[0].company },
    },
    {
      '@type': 'WebSite',
      '@id': `${seo.siteUrl}/#website`,
      url: `${seo.siteUrl}/`,
      name,
      description: seo.description,
      inLanguage: 'en',
      publisher: { '@id': `${seo.siteUrl}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${seo.siteUrl}/#profilepage`,
      url: `${seo.siteUrl}/`,
      about: { '@id': `${seo.siteUrl}/#person` },
      isPartOf: { '@id': `${seo.siteUrl}/#website` },
    },
  ];

  profile.ventures.items.forEach((venture) => {
    graph.push({
      '@type': 'Organization',
      name: venture.name,
      url: venture.url,
      description: venture.body,
      founder: { '@id': `${seo.siteUrl}/#person` },
    });
  });

  posts.forEach((post) => {
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${seo.siteUrl}/blog/${post.slug}#post`,
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      url: `${seo.siteUrl}/blog/${post.slug}`,
      author: { '@id': `${seo.siteUrl}/#person` },
      keywords: post.tags.join(', '),
    });
  });

  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  let el = document.getElementById('ld-json');
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'ld-json';
    document.head.appendChild(el);
  }
  el.textContent = json;
}
