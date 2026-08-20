"use client";

import { useState, ReactNode } from "react";

export interface AccordionItem {
  icon?: ReactNode;
  title: string;
  meta?: string;
  content: ReactNode;
}

/**
 * Claude 风折叠面板：grid-template-rows 0fr→1fr 平滑展开。
 * 头部：图标 + 衬线标题 + 等宽 meta + chevron 旋转。
 * 无 JS 时通过 <details> 原生回退（见 NoJsAccordion）。
 */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="acc-list" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            className={`acc ${isOpen ? "is-open" : ""}`}
            key={i}
          >
            <button
              type="button"
              className="acc__head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {item.icon && <span className="acc__icon" aria-hidden>{item.icon}</span>}
              <span className="acc__title">{item.title}</span>
              {item.meta && <span className="acc__meta">{item.meta}</span>}
              <span className="acc__chevron" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>
            <div className="acc__body">
              <div className="acc__inner">
                <div className="acc__content">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
