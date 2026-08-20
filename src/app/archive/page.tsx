import type { Metadata } from "next";
import Link from "next/link";
import { getArchive } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "归档",
  description: "按时间归档的全部文章",
};

export default function ArchivePage() {
  const groups = getArchive();
  return (
    <div className="container container--prose" style={{ padding: "3.5rem 1.25rem 3rem" }}>
      <div className="page-hero">
        <Eyebrow num="07">CHRONICLE</Eyebrow>
        <h1 className="page-hero__title">
          时间<em style={{ color: "var(--terra)", fontStyle: "italic" }}>归档</em>
        </h1>
        <p className="page-hero__sub">按年份排列的全部文章。</p>
      </div>
      {groups.length === 0 ? (
        <p className="empty-state">还没有文章。</p>
      ) : (
        <div style={{ marginTop: "2rem" }}>
          {groups.map(({ year, posts }) => (
            <section key={year} className="archive-group">
              <h2 className="archive-group__title">
                {year}{" "}
                <span style={{ color: "var(--muted)", fontSize: "0.7em", fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}>
                  {posts.length} POSTS
                </span>
              </h2>
              {posts.map((p) => (
                <div key={p.slug} className="archive-item">
                  <Link href={`/posts/${p.slug}/`} className="archive-item__title">
                    {p.title}
                  </Link>
                  <time className="archive-item__date">{formatDate(p.date)}</time>
                </div>
              ))}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
