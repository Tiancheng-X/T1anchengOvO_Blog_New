import { getAllPosts, getAllTags } from "@/lib/posts";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const urls = [
    siteConfig.url,
    `${siteConfig.url}/posts/`,
    `${siteConfig.url}/tags/`,
    `${siteConfig.url}/archive/`,
    `${siteConfig.url}/about/`,
    ...posts.map((p) => `${siteConfig.url}/posts/${p.slug}/`),
    ...tags.map(
      ({ tag }) => `${siteConfig.url}/tags/${encodeURIComponent(tag)}/`
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u}</loc>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
