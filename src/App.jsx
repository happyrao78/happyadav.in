import { useEffect } from 'react';
import { useRoute, matchRoute } from './lib/router.js';
import { useReveal } from './lib/useReveal.js';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import BlogIndex from './pages/BlogIndex.jsx';
import BlogPost from './pages/BlogPost.jsx';

export default function App() {
  const route = useRoute();
  const { page, slug } = matchRoute(route);

  // Every route change starts at the top, except an in-page anchor on home.
  useEffect(() => {
    const anchor = page === 'home' && route !== '/' ? document.getElementById(route.slice(1)) : null;
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'auto' });
  }, [route, page]);

  useReveal([route]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="backdrop" aria-hidden="true" />

      <div className="app">
        <Nav page={page} />
        <main id="main">
          {page === 'blog' ? <BlogIndex /> : null}
          {page === 'post' ? <BlogPost slug={slug} /> : null}
          {page === 'home' ? <Home /> : null}
        </main>
        <Footer />
      </div>
    </>
  );
}
