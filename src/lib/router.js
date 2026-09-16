import { useEffect, useState } from 'react';

/** Normalises `#/blog/post` into `/blog/post`. Empty hash becomes `/`. */
function readRoute() {
  const raw = window.location.hash.replace(/^#/, '');
  if (!raw || raw === '/') return '/';
  return raw.startsWith('/') ? raw : `/${raw}`;
}

export function useRoute() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const onChange = () => setRoute(readRoute());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

export function navigate(path) {
  const next = path.startsWith('/') ? path : `/${path}`;
  if (readRoute() === next) return;
  window.location.hash = next;
}

/** Matches `/blog`, `/blog/:slug` and `/`. Anything else falls through to home. */
export function matchRoute(route) {
  if (route === '/blog' || route === '/blog/') return { page: 'blog' };
  if (route.startsWith('/blog/')) {
    const slug = decodeURIComponent(route.slice('/blog/'.length));
    if (slug) return { page: 'post', slug };
  }
  return { page: 'home', hash: route !== '/' ? route.slice(1) : '' };
}
