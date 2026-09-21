import profile from '../content/profile.js';
import SectionHead from './SectionHead.jsx';

/** Initials from the first two words, e.g. "Aditya Birla" becomes AB. */
function initials(name) {
  return String(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export default function Recognition() {
  const { recognition, education } = profile;

  return (
    <section className="section" id="recognition">
      <div className="shell">
        <SectionHead eyebrow={recognition.eyebrow} title={recognition.title} />

        <div className="awards">
          {recognition.items.map((item, i) => (
            <article className="award" key={item.event} data-reveal style={{ '--i': Math.min(i, 4) }}>
              <div className="award-id">
                {item.logo ? (
                  <span className="chip">
                    <img src={item.logo} alt="" aria-hidden="true" loading="lazy" />
                  </span>
                ) : (
                  <span className="chip chip--text">{initials(item.event)}</span>
                )}
                <p className="award-place">{item.place}</p>
              </div>
              <p className="award-event">{item.event}</p>
              <p className="award-detail">{item.detail}</p>
            </article>
          ))}
        </div>

        <div className="edu" data-reveal>
          <p className="eyebrow">{education.eyebrow}</p>
          <h3 className="edu-degree">{education.degree}</h3>
          <p className="edu-meta">
            {education.field} &middot; {education.institution}
          </p>
        </div>
      </div>
    </section>
  );
}
