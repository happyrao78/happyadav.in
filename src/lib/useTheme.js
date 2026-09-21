import { useCallback, useEffect, useState } from 'react';

const KEY = 'hy-theme';

function stored() {
  try {
    const value = localStorage.getItem(KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function systemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Resolves to 'light' or 'dark'. Follows the operating system until the visitor
 * picks one, then remembers that choice. The initial value is also applied by an
 * inline script in index.html so the first paint is never the wrong theme.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(() => stored() || systemTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0e0e0f' : '#fafaf7');
  }, [theme]);

  // Keep following the OS while no explicit choice has been made.
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (!stored()) setThemeState(mq.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    setThemeState((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(KEY, next);
      } catch {
        /* private mode, the choice just does not persist */
      }
      return next;
    });
  }, []);

  return [theme, toggle];
}
