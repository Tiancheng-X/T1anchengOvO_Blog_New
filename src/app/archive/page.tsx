import type { Metadata } from "next";
import Link from "next/link";
import { getArchive } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "归档",
  description: "按时间归档的全部文章",
};

export default function ArchivePage() {
  const groups = getArchive();
  return (
    <>
      <h1 className="section-title">归档</h1>
      {groups.length === 0 ? (
        <p style={{ color: "var(--text-secondary)" }}>还没有文章。</p>
      ) : (
        groups.map(({ year, posts }) => (
          <section key={year} className="archive-group">
            <h2 className="archive-group__title">
              {year}{" "}
              <span style={{ color: "var(--text-secondary)", fontSize: "0.85em" }}>
                ({posts.length})
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
        ))
      )}
    </>
  );
}
