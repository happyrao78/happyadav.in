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
