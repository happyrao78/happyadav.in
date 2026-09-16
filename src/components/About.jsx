import profile from '../content/profile.js';
import SectionHead from './SectionHead.jsx';

export default function About() {
  const { about } = profile;

  return (
    <section className="section" id="about">
      <div className="shell">
        <SectionHead eyebrow={about.eyebrow} title={about.title} />

        <div className="about-grid">
          <div className="about-copy">
            {about.paragraphs.map((text, i) => (
              <p key={i} data-reveal style={{ '--i': i }}>
                {text}
              </p>
            ))}
          </div>

          <div className="stats" data-reveal>
            {about.stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
                <p className="stat-note">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
