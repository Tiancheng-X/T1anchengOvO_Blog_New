export interface StatItem {
  num: string;
  label: string;
}

/**
 * 2×4 数据条：衬线大数字（陶土橙）+ 等宽小标签。
 */
export function StatsStrip({ items }: { items: StatItem[] }) {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats__grid">
          {items.map((s, i) => (
            <div className="stats__cell" key={i}>
              <div className="stats__num">{s.num}</div>
              <div className="stats__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
