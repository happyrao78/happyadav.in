import { useEffect, useRef } from 'react';
import profile from '../content/profile.js';
import { Emphasis } from './SectionHead.jsx';
import { Arrow } from './Icons.jsx';

export default function Hero() {
  const ref = useRef(null);

  // Cursor-following warm spotlight. Skipped for reduced motion and touch.
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!window.matchMedia('(hover: hover)').matches) return undefined;

    const onMove = (e) => {
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      node.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };

    node.addEventListener('pointermove', onMove);
    return () => node.removeEventListener('pointermove', onMove);
  }, []);

  const { hero } = profile;

  return (
    <section className="hero" ref={ref} id="top">
      <div className="hero-spot" aria-hidden="true" />
      <div className="shell hero-grid">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="hero-title">
            {hero.headline.map((line, i) => (
              <span className="hero-line" key={line}>
                <span style={{ '--i': i }}>{line}</span>
              </span>
            ))}
          </h1>
        </div>

        <div className="hero-foot">
          <div>
            <p className="hero-lede">
              <Emphasis text={hero.lede} />
            </p>
            <div className="hero-actions" style={{ marginTop: '2rem' }}>
              <a className="btn btn--solid" href="#work">
                <span>See the work</span>
                <Arrow />
              </a>
              <a className="btn" href={`mailto:${profile.email}`}>
                <span>Email me</span>
              </a>
              <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">
                <span>Resume</span>
              </a>
            </div>
            <p className="hero-status" style={{ marginTop: '1.75rem' }}>
              <i aria-hidden="true" />
              {hero.availability}
            </p>
          </div>

          <p className="hero-scroll" aria-hidden="true">
            <i />
            Scroll
          </p>
        </div>
      </div>
    </section>
  );
}
