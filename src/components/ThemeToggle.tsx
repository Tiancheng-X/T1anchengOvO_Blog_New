"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const current =
      (document.documentElement.dataset.theme as Theme) ?? "light";
    setTheme(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore
    }
    setTheme(next);
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label="切换主题"
      title="切换主题"
      type="button"
    >
      {theme === "light" ? "☾" : "☀"}
    </button>
  );
}
