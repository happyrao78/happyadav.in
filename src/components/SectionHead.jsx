/** Renders `_word_` inside a title as display italic. */
export function Emphasis({ text }) {
  return String(text)
    .split(/(_[^_]+_)/)
    .filter(Boolean)
    .map((chunk, i) =>
      /^_[^_]+_$/.test(chunk) ? <em key={i}>{chunk.slice(1, -1)}</em> : <span key={i}>{chunk}</span>,
    );
}

export default function SectionHead({ eyebrow, title, note }) {
  return (
    <header className="section-head">
      <p className="eyebrow" data-reveal>
        {eyebrow}
      </p>
      <h2 className="section-title" data-reveal style={{ '--i': 1 }}>
        <Emphasis text={title} />
      </h2>
      {note ? (
        <p className="section-note" data-reveal style={{ '--i': 2 }}>
          {note}
        </p>
      ) : null}
    </header>
  );
}
