import profile from '../content/profile.js';
import { Emphasis } from './SectionHead.jsx';
import { ArrowUpRight } from './Icons.jsx';

export default function Contact() {
  const { contact, links, handles } = profile;

  const channels = [
    { label: 'X', value: `@${handles.x}`, href: links.x },
    { label: 'LinkedIn', value: 'Connect', href: links.linkedin },
    { label: 'GitHub', value: handles.github, href: links.github },
    { label: 'Reddit', value: handles.reddit, href: links.reddit },
    { label: 'Resume', value: 'Download PDF', href: profile.resume },
    { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  ];

  return (
    <section className="contact" id="contact">
      <div className="shell">
        <p className="eyebrow" data-reveal>
          {contact.eyebrow}
        </p>
        <h2 className="contact-title" data-reveal style={{ '--i': 1 }}>
          <Emphasis text={contact.title} />
        </h2>
        <p className="contact-body" data-reveal style={{ '--i': 2 }}>
          {contact.body}
        </p>
        <a className="contact-mail link" href={`mailto:${profile.email}`} data-reveal style={{ '--i': 3 }}>
          {profile.email}
        </a>

        <div className="contact-channels" data-reveal style={{ '--i': 4 }}>
          {channels.map((channel) => {
            const external = channel.href.startsWith('http');
            return (
              <a
                className="channel"
                key={channel.label}
                href={channel.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'me noreferrer' : undefined}
              >
                <span>
                  <span className="label">{channel.label}</span>
                  <span className="channel-value">{channel.value}</span>
                </span>
                <ArrowUpRight />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
