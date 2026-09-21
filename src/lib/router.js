import { useEffect, useState } from 'react';

const NAV_EVENT = 'app:navigate';

function normalise(path) {
  if (!path) return '/';
  const clean = path.split('#')[0].split('?')[0];
  if (clean === '' || clean === '/') return '/';
  return clean.endsWith('/') ? clean.slice(0, -1) : clean;
}

function readRoute() {
  return normalise(window.location.pathname);
}

/** Rewrites a legacy `#/blog` link to `/blog` once, before the app renders. */
export function upgradeLegacyHash() {
  const { hash, search } = window.location;
  if (!hash.startsWith('#/')) return;
  const path = normalise(hash.slice(1));
  window.history.replaceState(null, '', path + search);
}

export function useRoute() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const onChange = () => setRoute(readRoute());
    window.addEventListener('popstate', onChange);
    window.addEventListener(NAV_EVENT, onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener(NAV_EVENT, onChange);
    };
  }, []);

  return route;
}

export function navigate(path) {
  const next = normalise(path.startsWith('/') ? path : `/${path}`);
  if (readRoute() === next) return;
  window.history.pushState(null, '', next);
  window.dispatchEvent(new Event(NAV_EVENT));
}

export function matchRoute(route) {
  if (route === '/blog') return { page: 'blog' };
  if (route.startsWith('/blog/')) {
    const slug = decodeURIComponent(route.slice('/blog/'.length));
    if (slug) return { page: 'post', slug };
  }
  return { page: 'home' };
}
