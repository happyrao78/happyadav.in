import { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown } from './Icons.jsx';

const EDGE = 320;

/**
 * Jump to the top or bottom of any page. "Top" appears once you have scrolled
 * away from it, "bottom" disappears once you reach the end, so neither button
 * ever offers a jump that would do nothing.
 */
export default function ScrollButtons() {
  const [state, setState] = useState({ top: false, bottom: false });

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setState({ top: y > EDGE, bottom: max - y > EDGE });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    // Page height changes when routes or images load
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      observer.disconnect();
    };
  }, []);

  const go = (top) => window.scrollTo({ top: top ? 0 : document.documentElement.scrollHeight, behavior: 'smooth' });

  return (
    <div className="scroll-buttons">
      <button
        type="button"
        className={`scroll-btn${state.top ? ' is-shown' : ''}`}
        onClick={() => go(true)}
        aria-label="Scroll to top"
        title="Scroll to top"
        tabIndex={state.top ? 0 : -1}
      >
        <ArrowUp />
      </button>
      <button
        type="button"
        className={`scroll-btn${state.bottom ? ' is-shown' : ''}`}
        onClick={() => go(false)}
        aria-label="Scroll to bottom"
        title="Scroll to bottom"
        tabIndex={state.bottom ? 0 : -1}
      >
        <ArrowDown />
      </button>
    </div>
  );
}
