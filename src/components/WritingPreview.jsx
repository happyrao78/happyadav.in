import { posts, formatDate } from '../content/posts.js';
import { navigate } from '../lib/router.js';
import SectionHead from './SectionHead.jsx';
import { Arrow } from './Icons.jsx';

export default function WritingPreview() {
  const latest = posts.slice(0, 3);
  if (!latest.length) return null;

  return (
    <section className="section" id="writing">
      <div className="shell">
        <SectionHead
          eyebrow="Writing"
          title="Notes from the _build_"
          note="Field notes on latency budgets, privacy layers and the parts of production AI that rarely make it into a README."
        />

        <div className="writing-list">
          {latest.map((post, i) => (
            <a
              className="writing-item"
              key={post.slug}
              href={`#/blog/${post.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/blog/${post.slug}`);
              }}
              data-reveal
              style={{ '--i': i }}
            >
              <p className="writing-date">
                {formatDate(post.date)} &middot; {post.minutes} min
              </p>
              <h3 className="writing-title">{post.title}</h3>
              <p className="writing-summary">{post.summary}</p>
              <span className="writing-go" aria-hidden="true">
                <Arrow />
              </span>
            </a>
          ))}
        </div>

        <p style={{ marginTop: '2.5rem' }} data-reveal>
          <a
            className="btn"
            href="#/blog"
            onClick={(e) => {
              e.preventDefault();
              navigate('/blog');
            }}
          >
            <span>Read all posts</span>
            <Arrow />
          </a>
        </p>
      </div>
    </section>
  );
}
