import profile from '../content/profile.js';

export default function LogoStrip() {
  const { logos } = profile;

  return (
    <section className="logos">
      <div className="shell">
        <div className="logos-head" data-reveal>
          <span className="label">{logos.label}</span>
        </div>
        <div className="logos-row" data-reveal style={{ '--i': 1 }}>
          {logos.items.map((item) => (
            <span className="logo-item" key={item.name}>
              <img src={item.src} alt="" aria-hidden="true" loading="lazy" />
              <span>{item.name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
