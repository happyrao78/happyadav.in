import profile from '../content/profile.js';
import SectionHead from './SectionHead.jsx';
import { ArrowUpRight } from './Icons.jsx';

export default function Ventures() {
  const { ventures } = profile;

  return (
    <section className="section" id="building">
      <div className="shell">
        <SectionHead eyebrow={ventures.eyebrow} title={ventures.title} note={ventures.note} />

        <div className="ventures">
          {ventures.items.map((item, i) => (
            <article className="venture" key={item.name} data-reveal style={{ '--i': i }}>
              <header className="venture-head">
                <span className="venture-status">
                  <i aria-hidden="true" />
                  {item.status}
                </span>
                <h3 className="venture-name">{item.name}</h3>
                <a className="venture-domain link" href={item.url} target="_blank" rel="noreferrer">
                  {item.domain}
                  <ArrowUpRight />
                </a>
              </header>

              <p className="venture-punch">{item.punch}</p>
              <p className="venture-body">{item.body}</p>

              <div className="tags">
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
