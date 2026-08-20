export interface TimelineItem {
  date: string;
  title: string;
  org?: string;
  desc?: string;
}

/**
 * 左侧细线 + 陶土圆点（首节点实心，其余描边环）+ pl-10 留白。
 */
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <div className="timeline__item" key={i}>
          <span className="timeline__dot" aria-hidden />
          <div className="timeline__date">{item.date}</div>
          <div className="timeline__title">{item.title}</div>
          {item.org && <div className="timeline__org">{item.org}</div>}
          {item.desc && <div className="timeline__desc">{item.desc}</div>}
        </div>
      ))}
    </div>
  );
}
