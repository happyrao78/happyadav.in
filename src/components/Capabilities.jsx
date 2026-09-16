import profile from '../content/profile.js';
import SectionHead from './SectionHead.jsx';

export default function Capabilities() {
  const { capabilities } = profile;

  return (
    <section className="section" id="capabilities">
      <div className="shell">
        <SectionHead
          eyebrow={capabilities.eyebrow}
          title={capabilities.title}
          note="Every one of these has run in production, under load, with real users on the other end."
        />

        <div className="cap-list">
          {capabilities.items.map((item, i) => (
            <article className="cap" key={item.index} data-reveal style={{ '--i': i }}>
              <p className="cap-index">{item.index}</p>
              <h3 className="cap-title">{item.title}</h3>
              <p className="cap-body">{item.body}</p>
              <div className="tags cap-tags">
                {item.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
