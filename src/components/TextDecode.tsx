"use client";

import { useEffect, useRef, useState } from "react";

interface TextDecodeProps {
  text: string;
  as?: "span" | "h1" | "h2" | "p";
  className?: string;
  duration?: number;
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/\\|+-*<>?!@#$%";

/**
 * 文字「解码」动效：随机字形 scramble → 落定到目标文本。
 * JS 门控：无 JS 或 reduced-motion 时直接显示最终文本。
 */
export function TextDecode({ text, as = "span", className = "", duration = 780 }: TextDecodeProps) {
  const Tag = as;
  const [display, setDisplay] = useState(text);
  const [isClient, setIsClient] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    setIsClient(true);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(text);
      return;
    }

    const start = performance.now();
    const len = text.length;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // 每帧解锁更多字符（从左到右）
      const locked = Math.floor(progress * len);
      let out = "";
      for (let i = 0; i < len; i++) {
        const ch = text[i];
        if (i < locked || ch === " ") {
          out += ch;
        } else {
          out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }
      setDisplay(out);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, duration]);

  // 服务端 / 首屏渲染纯文本，避免 hydration mismatch
  if (!isClient) {
    return <Tag className={`decode ${className}`}>{text}</Tag>;
  }

  return <Tag className={`decode ${className}`}>{display}</Tag>;
}
