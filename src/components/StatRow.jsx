/** Compact figure strip used inside a project, never on the top level cards. */
export default function StatRow({ items }) {
  if (!items || !items.length) return null;

  return (
    <dl className="stat-row">
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.value}</dt>
          <dd>{item.label}</dd>
        </div>
      ))}
    </dl>
  );
}
