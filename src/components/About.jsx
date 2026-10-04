import profile from '../content/profile.js';
import SectionHead from './SectionHead.jsx';
import { ArrowUpRight } from './Icons.jsx';

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
                  <dd>
                    {fact.value}
                    {fact.href ? (
                      <a className="about-link link" href={fact.href} target="_blank" rel="me noopener noreferrer">
                        {fact.linkLabel}
                        <ArrowUpRight />
                      </a>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
