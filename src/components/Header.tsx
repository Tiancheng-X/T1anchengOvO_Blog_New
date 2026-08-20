"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./ThemeToggle";
import { Progress } from "./Progress";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 取站名首字母（中文取首字）
  const avatarLetter = siteConfig.title.charAt(0).toUpperCase();

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand" aria-label={siteConfig.title}>
          <span className="site-header__avatar" aria-hidden>{avatarLetter}</span>
          <span>
            <span className="site-header__name">{siteConfig.author}</span>
            <span className="site-header__name-tag">Blog</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="主导航">
          {siteConfig.nav.map((item) => {
            const active = isClient && pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "is-active" : ""}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="site-header__actions">
          <span className="online-pill" title="写作中">
            <span className="online-pill__dot" aria-hidden />
            <span className="online-pill__text">ONLINE</span>
          </span>
          <ThemeToggle />
        </div>
      </div>
      <Progress />
    </header>
  );
}
