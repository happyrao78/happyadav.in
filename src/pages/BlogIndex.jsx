import { useMemo, useState } from 'react';
import { posts, allTags, formatDate } from '../content/posts.js';
import { navigate } from '../lib/router.js';
import { Emphasis } from '../components/SectionHead.jsx';
import { SearchIcon, Arrow } from '../components/Icons.jsx';

export default function BlogIndex() {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('All');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesTag = tag === 'All' || post.tags.includes(tag);
      if (!matchesTag) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.tags.join(' ').toLowerCase().includes(q) ||
        post.body.toLowerCase().includes(q)
      );
    });
  }, [query, tag]);

  const open = (slug) => navigate(`/blog/${slug}`);

  return (
    <div className="page">
      <div className="shell">
        <header className="page-head">
          <p className="eyebrow" data-reveal>
            Blog
          </p>
          <h1 className="page-title" data-reveal style={{ '--i': 1 }}>
            <Emphasis text="Notes on _applied_ AI" />
          </h1>
          <p className="page-lede" data-reveal style={{ '--i': 2 }}>
            Long-form writing about real-time voice systems, agentic pipelines and the engineering
            decisions that only show up once something is live.
          </p>
        </header>

        <div className="blog-controls">
          <label className="search">
            <SearchIcon />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts"
              aria-label="Search posts"
            />
          </label>

          <div className="filters">
            {['All', ...allTags].map((item) => (
              <button
                key={item}
                className={`filter${tag === item ? ' is-active' : ''}`}
                onClick={() => setTag(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {visible.length ? (
          <div className="post-grid">
            {visible.map((post, i) => (
              <a
                className={`post-card${i === 0 && tag === 'All' && !query ? ' post-card--lead' : ''}`}
                key={post.slug}
                href={`#/blog/${post.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  open(post.slug);
                }}
                data-reveal
                style={{ '--i': Math.min(i, 4) }}
              >
                <p className="post-meta">
                  <span>{formatDate(post.date)}</span>
                  <span>{post.minutes} min read</span>
                </p>
                <h2 className="post-card-title">{post.title}</h2>
                <p className="post-card-summary">{post.summary}</p>
                <div className="tags">
                  {post.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <p className="post-card-go">
                  Read <Arrow />
                </p>
              </a>
            ))}
          </div>
        ) : (
          <p className="empty">No posts match that search yet.</p>
        )}
      </div>
    </div>
  );
}
