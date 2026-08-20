import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "标签",
  description: "所有标签",
};

export default function TagsPage() {
  const tags = getAllTags();
  return (
    <>
      <h1 className="section-title">标签</h1>
      {tags.length === 0 ? (
        <p style={{ color: "var(--text-secondary)" }}>还没有标签。</p>
      ) : (
        <div className="tag-cloud">
          {tags.map(({ tag, count }) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}/`}>
              {tag}{" "}
              <span style={{ color: "var(--text-secondary)", fontSize: "0.8em" }}>
                ({count})
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
