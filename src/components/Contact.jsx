import profile from '../content/profile.js';
import { Emphasis } from './SectionHead.jsx';
import { Arrow } from './Icons.jsx';

/**
 * Social links deliberately live only in the footer. This block stays on the
 * one thing it is for: getting a message to me.
 */
export default function Contact() {
  const { contact } = profile;

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

        <div className="contact-actions" data-reveal style={{ '--i': 4 }}>
          <a className="btn btn--solid" href={`mailto:${profile.email}`}>
            <span>Send a message</span>
            <Arrow />
          </a>
          <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">
            <span>Resume</span>
          </a>
          <a className="btn" href={`tel:${profile.phone.replace(/\s/g, '')}`}>
            <span>{profile.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
