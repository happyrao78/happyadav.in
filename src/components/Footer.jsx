import profile from '../content/profile.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-row">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <p>{profile.location}</p>
        <p>
          <a href={profile.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          {' · '}
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          {' · '}
          <a href={`mailto:${profile.email}`}>Email</a>
        </p>
      </div>
    </footer>
  );
}
