import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand">
          {siteConfig.title}
        </Link>
        <nav className="site-nav">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
