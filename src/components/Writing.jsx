import { posts, formatDate } from '../content/posts.js';
import { navigate } from '../lib/router.js';
import profile from '../content/profile.js';
import SectionHead from './SectionHead.jsx';
import { Arrow } from './Icons.jsx';

export default function Writing() {
  const { writing } = profile;
  const latest = posts.slice(0, 3);

  return (
    <section className="section" id="writing">
      <div className="shell">
        <SectionHead eyebrow={writing.eyebrow} title={writing.title} />

        {latest.length ? (
          <>
            <div className="post-grid" data-reveal>
              {latest.map((post) => (
                <a
                  className="post-card"
                  key={post.slug}
                  href={`#/blog/${post.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/blog/${post.slug}`);
                  }}
                >
                  <p className="post-meta">
                    <span>{formatDate(post.date)}</span>
                    <span>{post.minutes} min read</span>
                  </p>
                  <h3 className="post-card-title">{post.title}</h3>
                  <p className="post-card-summary">{post.summary}</p>
                  <p className="post-card-go">
                    Read <Arrow />
                  </p>
                </a>
              ))}
            </div>
            <p style={{ marginTop: '2rem' }} data-reveal>
              <a
                className="btn"
                href="#/blog"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/blog');
                }}
              >
                <span>Read all blogs</span>
                <Arrow />
              </a>
            </p>
          </>
        ) : (
          <div className="soon" data-reveal>
            <span className="soon-badge">
              <i aria-hidden="true" />
              {writing.badge}
            </span>
            <h3 className="soon-title">{writing.heading}</h3>
            <p className="soon-body">{writing.body}</p>
            <div className="soon-topics">
              {writing.topics.map((topic) => (
                <div className="soon-topic" key={topic.title}>
                  <span>{topic.tag}</span>
                  <strong>{topic.title}</strong>
                </div>
              ))}
            </div>
            <p>
              <a
                className="btn"
                href="#/blog"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/blog');
                }}
              >
                <span>Read the blogs</span>
                <Arrow />
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
