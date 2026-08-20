import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { ArrowRight } from "./icons";

interface PostCardProps {
  post: PostMeta;
  bullets?: string[];
}

/**
 * 文章卡片：白卡 rounded-2xl border shadow-soft
 * 悬停 -translate-y-1 + shadow-lift + border 染陶土
 * 结构：标签胶囊 → 衬线标题 → 灰副标题(date) → 简介 → 要点(陶土箭头) → 阅读/日期行
 * 网格 md:grid-cols-2 等高（flex flex-col, 底部 mt-auto 对齐）
 */
export function PostCard({ post, bullets }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}/`} className="post-card lift">
      {post.tags.length > 0 && (
        <div className="post-card__tags">
          {post.tags.slice(0, 3).map((t) => (
            <span key={t} className="tag-pill">{t}</span>
          ))}
        </div>
      )}

      <h3 className="post-card__title">{post.title}</h3>
      <div className="post-card__subtitle">{formatDate(post.date)}</div>

      <p className="post-card__summary">{post.summary}</p>

      {bullets && bullets.length > 0 && (
        <ul className="post-card__bullets">
          {bullets.map((b, i) => (
            <li className="post-card__bullet" key={i}>
              <span className="post-card__bullet-arrow" aria-hidden>
                <ArrowRight width={12} height={12} />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="post-card__foot">
        <span className="post-card__read">
          阅读 <ArrowRight width={12} height={12} />
        </span>
        <time>{formatDate(post.date)}</time>
      </div>
    </Link>
  );
}
