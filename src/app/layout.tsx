import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CopyInit } from "@/components/CopyInit";

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.title} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.title}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.title,
    locale: siteConfig.locale,
    type: "website",
    images: ["/images/og-default.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/og-default.svg"],
  },
  alternates: {
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="site">
          <Header />
          <main className="site-main">{children}</main>
          <Footer />
        </div>
        <CopyInit />
      </body>
    </html>
  );
}
