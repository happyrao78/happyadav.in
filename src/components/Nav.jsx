import { useEffect, useState } from 'react';
import { navigate } from '../lib/router.js';
import profile from '../content/profile.js';
import { useTheme } from '../lib/useTheme.js';
import { Sun, Moon } from './Icons.jsx';

const SECTIONS = [
  { id: 'numbers', label: 'Impact' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
];

export default function Nav({ page }) {
  const [theme, toggleTheme] = useTheme();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    return () => document.body.classList.remove('is-locked');
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const goToSection = (id) => {
    setOpen(false);
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (page !== 'home') {
      navigate('/');
      window.setTimeout(scroll, 90);
    } else {
      scroll();
    }
  };

  const goHome = () => {
    setOpen(false);
    if (page !== 'home') navigate('/');
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`nav${stuck ? ' is-stuck' : ''}`}>
        <div className="shell">
          <div className="nav-inner">
            <button className="brand" onClick={goHome} aria-label="Back to top">
              <i aria-hidden="true">[</i>
              {profile.name}
              <i aria-hidden="true">]</i>
            </button>

            <nav className="nav-links" aria-label="Sections">
              {SECTIONS.map((item) => (
                <button key={item.id} className="nav-link" onClick={() => goToSection(item.id)}>
                  {item.label}
                </button>
              ))}
              <button
                className={`nav-link${page !== 'home' ? ' is-active' : ''}`}
                onClick={() => {
                  setOpen(false);
                  navigate('/blog');
                }}
              >
                Blog
              </button>
            </nav>

            <div className="nav-actions">
              <a className="btn nav-cta" href={`mailto:${profile.email}`}>
                <span>Contact</span>
              </a>
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
              >
                {theme === 'dark' ? <Sun /> : <Moon />}
              </button>
              <button
                className={`nav-toggle${open ? ' is-open' : ''}`}
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
              >
                <i aria-hidden="true" />
                <i aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`drawer${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <nav>
          {SECTIONS.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                goToSection(item.id);
              }}
            >
              {item.label}
              <span>{String(i + 1).padStart(2, '0')}</span>
            </a>
          ))}
          <a
            href="#/blog"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              navigate('/blog');
            }}
          >
            Blog
            <span>06</span>
          </a>
          <a href={`mailto:${profile.email}`} onClick={() => setOpen(false)}>
            Contact
            <span>07</span>
          </a>
          <a href={profile.resume} onClick={() => setOpen(false)}>
            Resume
            <span>PDF</span>
          </a>
        </nav>
        <p className="drawer-meta">{profile.location}</p>
      </div>
    </>
  );
}
