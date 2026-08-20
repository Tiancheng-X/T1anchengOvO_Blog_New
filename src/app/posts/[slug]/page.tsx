import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPost } from "@/lib/posts";
import { renderMarkdown } from "@/lib/markdown";
import { siteConfig } from "@/config/site";
import { Comments } from "@/components/Comments";
import { formatDateLong } from "@/lib/format";
import { Eyebrow } from "@/components/Eyebrow";
import { ArrowRight } from "@/components/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${siteConfig.url}/posts/${post.slug}/`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);

  return (
    <article className="article">
      <header className="article__header">
        <Eyebrow num="POST" className="article__eyebrow">
          {post.tags[0] ?? "WRITING"}
        </Eyebrow>
        <h1 className="article__title">{post.title}</h1>
        <div className="article__meta">
          <time>{formatDateLong(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{siteConfig.author}</span>
          {post.tags.length > 0 && (
            <>
              <span aria-hidden>·</span>
              <span className="article__meta-tag">
                {post.tags.join(" / ")}
              </span>
            </>
          )}
        </div>
      </header>

      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />

      <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--line)" }}>
        <Link href="/posts/" className="btn btn--ghost">
          <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}>
            <ArrowRight width={14} height={14} />
          </span>
          回到文章列表
        </Link>
      </div>

      <Comments />
    </article>
  );
}
