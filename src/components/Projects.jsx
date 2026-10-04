import profile from '../content/profile.js';
import SectionHead from './SectionHead.jsx';
import StatRow from './StatRow.jsx';
import { ArrowUpRight } from './Icons.jsx';

export default function Projects() {
  const { projects } = profile;

  return (
    <section className="section" id="projects">
      <div className="shell">
        <SectionHead eyebrow={projects.eyebrow} title={projects.title} note={projects.note} />

        <div>
          {projects.items.map((project, i) => (
            <article className="project" key={project.name} data-reveal style={{ '--i': Math.min(i, 2) }}>
              <div className="project-aside">
                <p className="project-year">{project.year}</p>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-tagline">{project.tagline}</p>
                {project.url ? (
                  <a className="project-link link" href={project.url} target="_blank" rel="noopener noreferrer">
                    {project.domain}
                    <ArrowUpRight />
                  </a>
                ) : null}
                {project.stats?.length ? <StatRow items={project.stats} /> : null}
                <div className="tags">
                  {project.stack.map((tech) => (
                    <span className="tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-body">
                <div>
                  <p className="label project-label">The problem</p>
                  <p className="project-problem">{project.problem}</p>
                </div>
                <div>
                  <p className="label project-label">What I built</p>
                  <ul className="bullets">
                    {project.points.map((point, n) => (
                      <li key={n}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
