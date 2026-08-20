import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Heart, Rss, Github, Mail } from "./icons";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__copy">
          © {new Date().getFullYear()} {siteConfig.author}
        </div>

        <div className="site-footer__links">
          <Link href="/feed.xml">
            <Rss width={13} height={13} style={{ marginRight: "0.3rem", verticalAlign: "-2px" }} />
            RSS
          </Link>
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
            <Github width={13} height={13} style={{ marginRight: "0.3rem", verticalAlign: "-2px" }} />
            GitHub
          </a>
          <a href={siteConfig.email}>
            <Mail width={13} height={13} style={{ marginRight: "0.3rem", verticalAlign: "-2px" }} />
            Email
          </a>
        </div>

        <div className="site-footer__signature">
          Built with <em>warmth</em> and <em>precision</em>
          <span className="site-footer__heart" aria-hidden>
            <Heart width={13} height={13} />
          </span>
        </div>
      </div>
    </footer>
  );
}
