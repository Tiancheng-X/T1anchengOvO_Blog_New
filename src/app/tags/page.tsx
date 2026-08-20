import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/posts";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "标签",
  description: "所有标签",
};

export default function TagsPage() {
  const tags = getAllTags();
  return (
    <div className="container container--prose" style={{ padding: "3.5rem 1.25rem 3rem" }}>
      <div className="page-hero">
        <Eyebrow num="06">INDEX</Eyebrow>
        <h1 className="page-hero__title">
          全部<em style={{ color: "var(--terra)", fontStyle: "italic" }}>标签</em>
        </h1>
        <p className="page-hero__sub">按主题归类的内容入口。</p>
      </div>
      {tags.length === 0 ? (
        <p className="empty-state">还没有标签。</p>
      ) : (
        <div className="tag-cloud" style={{ marginTop: "1.5rem" }}>
          {tags.map(({ tag, count }) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}/`}>
              {tag}{" "}
              <span style={{ color: "var(--muted)", fontSize: "0.8em" }}>
                ({count})
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
