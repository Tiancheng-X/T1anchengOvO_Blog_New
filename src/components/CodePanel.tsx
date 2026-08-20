import { ReactNode } from "react";

interface CurrentlyItem {
  icon: ReactNode;
  text: ReactNode;
}

/**
 * Hero 右侧 now.ts 风代码面板：仿代码窗口（三圆点 + 文件名 + 复制位）+ Currently 清单。
 * 静态内容，纯展示。
 */
export function CodePanel({
  code,
  currently,
}: {
  code: ReactNode;
  currently: CurrentlyItem[];
}) {
  return (
    <div className="now-panel">
      <div className="now-panel__bar">
        <span className="now-panel__dots" aria-hidden>
          <span className="now-panel__dot now-panel__dot--red" />
          <span className="now-panel__dot now-panel__dot--yellow" />
          <span className="now-panel__dot now-panel__dot--green" />
        </span>
        <span className="now-panel__file">now.ts</span>
      </div>
      <pre className="now-panel__code">
        <code>{code}</code>
      </pre>
      <div className="now-panel__divider" />
      <div className="now-panel__currently">
        <div className="now-panel__currently-label">Currently</div>
        {currently.map((item, i) => (
          <div className="now-panel__currently-item" key={i}>
            <span className="now-panel__currently-icon" aria-hidden>{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
