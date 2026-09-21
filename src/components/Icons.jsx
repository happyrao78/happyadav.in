export function Arrow({ className = 'arrow' }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7h11M7.5 2.5 12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ArrowUpRight() {
  return (
    <svg className="arrow" width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M3 10 10 3M4 3h6v6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg className="search-icon" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="4.75" stroke="currentColor" strokeWidth="1.1" />
      <path d="m10.25 10.25 3 3" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function Sun() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="3.1" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M3 3l1.1 1.1M10.9 10.9 12 12M12 3l-1.1 1.1M4.1 10.9 3 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Moon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path
        d="M12.4 9.3A5.4 5.4 0 0 1 5.7 2.6a5.5 5.5 0 1 0 6.7 6.7Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
