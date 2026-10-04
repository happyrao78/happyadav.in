import { useMemo, useState } from 'react';
import { posts, allTags } from '../content/posts.js';
import profile from '../content/profile.js';
import { Emphasis } from '../components/SectionHead.jsx';
import PostCard from '../components/PostCard.jsx';
import { SearchIcon } from '../components/Icons.jsx';

export default function ReadingsIndex() {
  const { readings } = profile;
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
        post.sourceName.toLowerCase().includes(q) ||
        post.body.toLowerCase().includes(q)
      );
    });
  }, [query, tag]);

  // The newest reading leads the grid only on the unfiltered view
  const showLead = tag === 'All' && !query;

  return (
    <div className="page">
      <div className="shell">
        <header className="page-head">
          <p className="eyebrow" data-reveal>
            {readings.eyebrow}
          </p>
          <h1 className="page-title" data-reveal style={{ '--i': 1 }}>
            <Emphasis text={readings.pageTitle} />
          </h1>
          <p className="page-lede" data-reveal style={{ '--i': 2 }}>
            {readings.note}
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="soon" data-reveal>
            <span className="soon-badge">
              <i aria-hidden="true" />
              {readings.badge}
            </span>
            <p className="soon-line">{readings.line}</p>
          </div>
        ) : (
          <>
            <div className="blog-controls">
              <label className="search">
                <SearchIcon />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search readings"
                  aria-label="Search readings"
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
              <div className={`post-grid${showLead ? ' has-lead' : ''}`}>
                {visible.map((post, i) => (
                  <PostCard post={post} index={i} lead={showLead && i === 0} key={post.slug} />
                ))}
              </div>
            ) : (
              <p className="empty">No readings match that search yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
