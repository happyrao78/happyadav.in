import profile from '../content/profile.js';
import SectionHead from './SectionHead.jsx';

export default function Stack() {
  const { stack } = profile;

  return (
    <section className="section" id="stack">
      <div className="shell">
        <SectionHead eyebrow={stack.eyebrow} title={stack.title} />

        <div className="stack-grid" data-reveal>
          {stack.groups.map((group) => (
            <div className="stack-group" key={group.label}>
              <p className="stack-label">{group.label}</p>
              <div className="tags">
                {group.items.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
