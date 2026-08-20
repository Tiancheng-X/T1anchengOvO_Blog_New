import { ReactNode } from "react";

interface EyebrowProps {
  num?: string;
  children: ReactNode;
  className?: string;
}

/**
 * 等宽大写宽字距小标签 + 陶土橙 + 左短横。
 * 用于每个 section 顶部，如 "01 — SELECTED WORKS"。
 */
export function Eyebrow({ num, children, className = "" }: EyebrowProps) {
  return (
    <div className={`eyebrow ${className}`}>
      {num && <span className="eyebrow__num">{num}</span>}
      {num && <span aria-hidden>—</span>}
      <span>{children}</span>
    </div>
  );
}
