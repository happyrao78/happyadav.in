import { useId, useRef, useState } from 'react';

const EDGE = 16;
const WIDTH = 288;

/**
 * A highlighted term that explains itself. The definition opens on hover, on
 * keyboard focus and on tap, and is nudged sideways so it never leaves the
 * screen on a phone.
 */
export default function Term({ label, title, definition }) {
  const ref = useRef(null);
  const id = useId();
  const [open, setOpen] = useState(false);
  const [place, setPlace] = useState({ dx: 0, below: false });

  const show = () => {
    const box = ref.current?.getBoundingClientRect();
    if (box) {
      const width = Math.min(WIDTH, window.innerWidth - EDGE * 2);
      const left = box.left + box.width / 2 - width / 2;
      const right = left + width;
      let dx = 0;
      if (left < EDGE) dx = EDGE - left;
      else if (right > window.innerWidth - EDGE) dx = window.innerWidth - EDGE - right;
      // Too close to the top (the nav sits there), so open below instead
      setPlace({ dx, below: box.top < 170 });
    }
    setOpen(true);
  };

  return (
    <span
      ref={ref}
      className="term"
      tabIndex={0}
      aria-describedby={id}
      onMouseEnter={show}
      onMouseLeave={() => setOpen(false)}
      onFocus={show}
      onBlur={() => setOpen(false)}
      onClick={show}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
    >
      {label}
      <span
        role="tooltip"
        id={id}
        className={`term-tip${open ? ' is-open' : ''}${place.below ? ' is-below' : ''}`}
        style={{ '--dx': `${place.dx}px` }}
      >
        <strong>{title}</strong>
        {definition}
      </span>
    </span>
  );
}
