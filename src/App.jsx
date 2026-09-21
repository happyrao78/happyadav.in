import { useEffect } from 'react';
import { useRoute, matchRoute } from './lib/router.js';
import { useReveal } from './lib/useReveal.js';
import { applySeo, applyJsonLd } from './lib/seo.js';
import { posts, getPost } from './content/posts.js';
import profile from './content/profile.js';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import BlogIndex from './pages/BlogIndex.jsx';
import BlogPost from './pages/BlogPost.jsx';

export default function App() {
  const route = useRoute();
  const { page, slug } = matchRoute(route);

  useEffect(() => {
    const { routes } = profile.seo;

    if (page === 'post') {
      const post = getPost(slug);
      applySeo(
        post
          ? {
              path: `/blog/${post.slug}`,
              title: `${post.title} | ${profile.name}`,
              description: post.summary,
              type: 'article',
              published: post.date,
            }
          : { path: route, title: `Not found | ${profile.name}`, description: profile.seo.description },
      );
    } else if (page === 'blog') {
      applySeo({ path: '/blog', ...routes['/blog'] });
    } else {
      applySeo({ path: '/', ...routes['/'] });
    }

    applyJsonLd(posts);
  }, [route, page, slug]);

  // A fresh route starts at the top; an in page fragment wins over that.
  useEffect(() => {
    const target = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'auto' });
  }, [route]);

  useReveal([route]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

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
