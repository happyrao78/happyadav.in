import profile from '../content/profile.js';
import { posts } from '../content/posts.js';
import { navigate } from '../lib/router.js';
import SectionHead from './SectionHead.jsx';
import PostCard from './PostCard.jsx';
import { Arrow } from './Icons.jsx';

/** The latest three readings on the home page, or the "soon" card while there are none. */
export default function Readings() {
  const { readings } = profile;
  const latest = posts.slice(0, 3);

  return (
    <section className="section" id="readings">
      <div className="shell">
        <SectionHead eyebrow={readings.eyebrow} title={readings.title} note={readings.note} />

        {latest.length ? (
          <>
            <div className="post-grid post-grid--home" style={{ '--count': latest.length }}>
              {latest.map((post, i) => (
                <PostCard post={post} index={i} key={post.slug} />
              ))}
            </div>
            <div className="readings-more" data-reveal>
              <a
                className="btn"
                href="/readings"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/readings');
                }}
              >
                <span>{readings.all}</span>
                <Arrow />
              </a>
            </div>
          </>
        ) : (
          <div className="soon" data-reveal>
            <span className="soon-badge">
              <i aria-hidden="true" />
              {readings.badge}
            </span>
            <p className="soon-line">{readings.line}</p>
          </div>
        )}
      </div>
    </section>
  );
}
