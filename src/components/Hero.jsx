import profile from '../content/profile.js';
import { Emphasis } from './SectionHead.jsx';
import { Arrow } from './Icons.jsx';

export default function Hero() {
  const { hero, wordmark } = profile;

  return (
    <section className="hero" id="top">
      <div className="shell hero-main">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 className="hero-title">
              {hero.headline.map((line, i) => (
                <span className="hero-line" key={line}>
                  <span style={{ '--i': i }}>
                    <Emphasis text={line} />
                  </span>
                </span>
              ))}
            </h1>
          </div>

          <div className="hero-side">
            <p className="hero-lede">
              <Emphasis text={hero.lede} />
            </p>
            <div className="hero-actions">
              <a className="btn btn--solid" href="#work">
                <span>See the work</span>
                <Arrow />
              </a>
              <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">
                <span>Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-foot">
        <div className="shell">
          <div className="strip">
            {hero.strip.map((item) => (
              <div key={item.label}>
                <span className="label">{item.label}</span>
                <span className="label" style={{ color: 'var(--ink)' }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="shell">
          {/* Sized by viewBox so the wordmark always spans the shell exactly, at any width. */}
          <svg
            className="wordmark"
            viewBox="0 0 1200 142"
            preserveAspectRatio="xMidYMax meet"
            role="img"
            aria-label={profile.name}
          >
            <text
              x="0"
              y="136"
              textLength="1200"
              lengthAdjust="spacing"
              fontSize="186"
              fontWeight="600"
            >
              {wordmark[0]}
              <tspan className="wordmark-dim">{wordmark[1]}</tspan>
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
