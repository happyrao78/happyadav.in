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

          <div className="about-card" data-reveal style={{ '--i': 1 }}>
            <dl>
              {about.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
