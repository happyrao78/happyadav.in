import profile from '../content/profile.js';
import { Emphasis } from './SectionHead.jsx';

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
      </div>
    </section>
  );
}
