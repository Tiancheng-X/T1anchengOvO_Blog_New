import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/posts/${post.slug}/`} className="post-card">
      <div className="post-card__title">{post.title}</div>
      <div className="post-card__summary">{post.summary}</div>
      <div className="post-card__meta">
        <time>{formatDate(post.date)}</time>
      </div>
      {post.tags.length > 0 && (
        <div className="post-card__tags">
          {post.tags.map((t) => (
            <span key={t} className="tag-pill">
              {t}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
