import profile from '../content/profile.js';
import SectionHead from './SectionHead.jsx';

export default function Capabilities() {
  const { capabilities } = profile;

  return (
    <section className="section" id="capabilities">
      <div className="shell">
        <SectionHead eyebrow={capabilities.eyebrow} title={capabilities.title} />

        <div className="cap-list" data-reveal>
          {capabilities.items.map((item) => (
            <article className="cap" key={item.index}>
              <p className="cap-index">{item.index}</p>
              <h3 className="cap-title">{item.title}</h3>
              <p className="cap-body">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
