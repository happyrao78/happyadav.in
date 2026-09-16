import profile from '../content/profile.js';
import { Emphasis } from './SectionHead.jsx';
import { ArrowUpRight } from './Icons.jsx';

export default function Contact() {
  const { contact, links } = profile;

  const channels = [
    { label: 'GitHub', value: '@happyrao78', href: links.github },
    { label: 'LinkedIn', value: 'Connect', href: links.linkedin },
    { label: 'Resume', value: 'Download CV', href: profile.resume },
  ];

  return (
    <section className="contact" id="contact">
      <div className="shell">
        <p className="eyebrow" data-reveal>
          {contact.eyebrow}
        </p>
        <h2 className="contact-title" data-reveal style={{ '--i': 1, marginTop: '1.5rem' }}>
          <Emphasis text={contact.title} />
        </h2>
        <p className="contact-body" data-reveal style={{ '--i': 2 }}>
          {contact.body}
        </p>
        <a className="contact-mail link" href={`mailto:${profile.email}`} data-reveal style={{ '--i': 3 }}>
          {profile.email}
        </a>

        <div className="contact-channels" data-reveal style={{ '--i': 4 }}>
          {channels.map((channel) => (
            <a
              className="channel"
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith('http') ? '_blank' : undefined}
              rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <span>
                <span className="channel-label">{channel.label}</span>
                <span className="channel-value" style={{ display: 'block' }}>
                  {channel.value}
                </span>
              </span>
              <ArrowUpRight />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
