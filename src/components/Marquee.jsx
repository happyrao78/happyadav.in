import profile from '../content/profile.js';

export default function Marquee() {
  const track = [...profile.marquee, ...profile.marquee];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span className="marquee-item" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
