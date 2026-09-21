import profile from '../content/profile.js';
import SectionHead from './SectionHead.jsx';
import StatRow from './StatRow.jsx';

export default function Projects() {
  const { projects } = profile;

  return (
    <section className="section" id="projects">
      <div className="shell">
        <SectionHead
          eyebrow={projects.eyebrow}
          title={projects.title}
          note="Designed end to end, from the audio transport up to the evaluation harness."
        />

        <div>
          {projects.items.map((project, i) => (
            <article className="project" key={project.name} data-reveal style={{ '--i': Math.min(i, 2) }}>
              <div className="project-aside">
                <p className="project-year">{project.year}</p>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-tagline">{project.tagline}</p>
                <StatRow items={project.stats} />
                <div className="tags">
                  {project.stack.map((tech) => (
                    <span className="tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="bullets">
                {project.points.map((point, n) => (
                  <li key={n}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
