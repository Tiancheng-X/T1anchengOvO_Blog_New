"use client";
import { useEffect } from "react";

/**
 * Binds a global click handler that copies code from the nearest
 * `.code-block` when its `.code-block__copy` button is clicked.
 * Renders nothing — side-effect only.
 */
export function CopyInit() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest<HTMLButtonElement>(".code-block__copy");
      if (!btn) return;
      const block = btn.closest(".code-block");
      const pre = block?.querySelector("pre");
      const code = pre?.innerText ?? "";
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(code).then(() => {
        const original = btn.textContent;
        btn.textContent = "已复制";
        btn.style.color = "var(--accent)";
        btn.style.borderColor = "var(--accent)";
        window.setTimeout(() => {
          if (original !== null) {
            btn.textContent = original;
            btn.style.color = "";
            btn.style.borderColor = "";
          }
        }, 1500);
      });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
  return null;
}
