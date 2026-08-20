"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 顶栏底部滚动进度条：监听 scroll + rAF 节流。
 * 无 JS 时不可见（width: 0），不影响阅读。
 */
export function Progress() {
  const [progress, setProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    setIsClient(true);
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrolled = doc.scrollTop;
        const height = doc.scrollHeight - doc.clientHeight;
        setProgress(height > 0 ? (scrolled / height) * 100 : 0);
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isClient) return null;

  return (
    <div className="scroll-progress" aria-hidden>
      <div
        className="scroll-progress__bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
