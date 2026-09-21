import profile from '../content/profile.js';

export default function Footer() {
  const { links } = profile;

  const social = [
    { label: 'X', href: links.x },
    { label: 'LinkedIn', href: links.linkedin },
    { label: 'GitHub', href: links.github },
    { label: 'Reddit', href: links.reddit },
  ];

  return (
    <footer className="footer">
      <div className="shell footer-row">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <p>{profile.role}</p>
        <p className="footer-social">
          {social.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="me noreferrer">
              {item.label}
            </a>
          ))}
          <a href={`mailto:${profile.email}`}>Email</a>
        </p>
      </div>
    </footer>
  );
}
