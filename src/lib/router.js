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

/**
 * Upgrades old links once, before the app renders: a `#/blog` hash link becomes
 * a real path, and anything under `/blog` moves to `/readings`.
 */
export function upgradeLegacyLinks() {
  const { hash, search, pathname } = window.location;
  let path = hash.startsWith('#/') ? normalise(hash.slice(1)) : normalise(pathname);
  if (path === '/blog' || path.startsWith('/blog/')) path = `/readings${path.slice('/blog'.length)}`;
  if (path !== normalise(pathname) || hash.startsWith('#/')) {
    window.history.replaceState(null, '', path + search + (hash.startsWith('#/') ? '' : hash));
  }
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
  if (route === '/readings') return { page: 'readings' };
  if (route.startsWith('/readings/')) {
    const slug = decodeURIComponent(route.slice('/readings/'.length));
    if (slug) return { page: 'post', slug };
  }
  return { page: 'home' };
}
