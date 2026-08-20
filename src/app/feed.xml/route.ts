import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getAllPosts();
  const items = posts
    .map((p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${siteConfig.url}/posts/${p.slug}/</link>
      <guid isPermaLink="true">${siteConfig.url}/posts/${p.slug}/</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeXml(p.summary)}</description>
    </item>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>${siteConfig.locale}</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
