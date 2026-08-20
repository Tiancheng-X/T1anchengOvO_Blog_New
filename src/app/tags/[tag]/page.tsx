import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Reveal } from "@/components/Reveal";

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
    <>
      <h1 className="section-title">
        标签：<span style={{ color: "var(--accent)" }}>{tag}</span>
      </h1>
      <div className="post-grid">
        {posts.map((p) => (
          <Reveal key={p.slug}>
            <PostCard post={p} />
          </Reveal>
        ))}
      </div>
      <p style={{ marginTop: "2rem" }}>
        <Link href="/tags/" style={{ color: "var(--text-secondary)" }}>
          ← 查看全部标签
        </Link>
      </p>
    </>
  );
}
