import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPost } from "@/lib/posts";
import { renderMarkdown } from "@/lib/markdown";
import { siteConfig } from "@/config/site";
import { Comments } from "@/components/Comments";
import { formatDateLong } from "@/lib/format";

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
        <h1 className="article__title">{post.title}</h1>
        <div className="article__meta">
          <time>{formatDateLong(post.date)}</time>
          {post.tags.length > 0 && (
            <span>
              {post.tags.map((t) => (
                <span key={t} className="tag-pill" style={{ marginLeft: "0.375rem" }}>
                  {t}
                </span>
              ))}
            </span>
          )}
        </div>
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      <Comments />
    </article>
  );
}
