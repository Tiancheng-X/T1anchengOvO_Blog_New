import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: encoded } = await params;
  const tag = decodeURIComponent(encoded);
  return { title: `标签：${tag}` };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: encoded } = await params;
  const tag = decodeURIComponent(encoded);
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <div className="container" style={{ padding: "3.5rem 1.25rem 3rem" }}>
      <div className="page-hero">
        <Eyebrow num="TAG">FILTERED</Eyebrow>
        <h1 className="page-hero__title">
          标签：<em style={{ color: "var(--terra)", fontStyle: "italic" }}>{tag}</em>
        </h1>
        <p className="page-hero__sub">共 {posts.length} 篇文章。</p>
      </div>
      <div className="post-grid" style={{ marginTop: "2rem" }}>
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80}>
            <PostCard post={p} />
          </Reveal>
        ))}
      </div>
      <p style={{ marginTop: "2.5rem" }}>
        <Link href="/tags/" className="btn btn--ghost">
          ← 查看全部标签
        </Link>
      </p>
    </div>
  );
}
