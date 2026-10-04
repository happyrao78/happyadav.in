import { formatDate } from '../content/posts.js';
import { navigate } from '../lib/router.js';
import { Arrow } from './Icons.jsx';

/** One reading in a grid. The whole card is the link, so the source shows as text here. */
export default function PostCard({ post, lead = false, index = 0 }) {
  const href = `/readings/${post.slug}`;

  return (
    <a
      className={`post-card${lead ? ' post-card--lead' : ''}`}
      href={href}
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
      }}
      data-reveal
      style={{ '--i': Math.min(index, 4) }}
    >
      <p className="post-meta">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>{post.minutes} min read</span>
        {post.sourceName ? <span className="post-via">via {post.sourceName}</span> : null}
      </p>
      <h3 className="post-card-title">{post.title}</h3>
      {post.summary ? <p className="post-card-summary">{post.summary}</p> : null}
      {post.tags.length ? (
        <div className="tags">
          {post.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      ) : null}
      <p className="post-card-go">
        Read <Arrow />
      </p>
    </a>
  );
}
