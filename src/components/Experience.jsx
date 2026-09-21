import { useState } from 'react';
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

function Chip({ logo, name }) {
  if (logo) {
    return (
      <span className="chip">
        <img src={logo} alt="" aria-hidden="true" loading="lazy" />
      </span>
    );
  }
  return <span className="chip chip--text">{initials(name)}</span>;
}

function ProjectAccordion({ projects }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="projects-acc">
      {projects.map((project, i) => {
        const isOpen = open === i;
        return (
          <div className={`acc${isOpen ? ' is-open' : ''}`} key={project.name}>
            <button className="acc-btn" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
              <span className="acc-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="acc-name">{project.name}</span>
              <span className="acc-sign" aria-hidden="true" />
            </button>

            <div className="acc-panel">
              <div>
                <div className="acc-inner">
                  <div className="tags">
                    {project.stack.map((tech) => (
                      <span className="tag" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ul className="bullets">
                    {project.points.map((point, n) => (
                      <li key={n}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Experience() {
  const { experience } = profile;

  return (
    <section className="section" id="work">
      <div className="shell">
        <SectionHead eyebrow={experience.eyebrow} title={experience.title} note={experience.note} />

        <div className="roles">
          {experience.roles.map((role, i) => (
            <article className="role" key={role.company} data-reveal style={{ '--i': Math.min(i, 2) }}>
              <header className="role-head">
                <div className="role-id">
                  <Chip logo={role.logo} name={role.company} />
                  <span className="role-company">{role.company}</span>
                  {role.current ? <span className="badge-now">Now</span> : null}
                </div>
                <h3 className="role-title">{role.title}</h3>
                <div className="role-meta">
                  <span>{role.period}</span>
                  <span>{role.location}</span>
                </div>
              </header>

              {role.summary ? <p className="role-summary">{role.summary}</p> : null}

              {role.projects ? (
                <ProjectAccordion projects={role.projects} />
              ) : (
                <ul className="bullets">
                  {role.points.map((point, n) => (
                    <li key={n}>{point}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
