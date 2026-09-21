import profile from '../content/profile.js';
import SectionHead from './SectionHead.jsx';
import Counter from './Counter.jsx';

export default function Metrics() {
  const { metrics } = profile;

  return (
    <section className="section" id="numbers">
      <div className="shell">
        <SectionHead eyebrow={metrics.eyebrow} title={metrics.title} note={metrics.note} />

        <div className="metrics" data-reveal>
          {metrics.items.map((item) => (
            <article className="metric" key={item.label}>
              <p className="metric-value">
                <span aria-hidden="true">
                  <Counter to={item.to} />
                  {item.suffix ? <em>{item.suffix}</em> : null}
                </span>
                <span className="sr-only">
                  {item.to}
                  {item.suffix}
                </span>
              </p>
              <p className="metric-label">{item.label}</p>
              <p className="metric-line">{item.line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
