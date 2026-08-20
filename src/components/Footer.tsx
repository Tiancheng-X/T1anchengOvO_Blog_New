import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__links">
        <Link href="/feed.xml">RSS</Link>
        <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={siteConfig.email}>Gmail</a>
      </div>
      <div>
        © {new Date().getFullYear()} {siteConfig.author} · {siteConfig.title}
      </div>
    </footer>
  );
}
