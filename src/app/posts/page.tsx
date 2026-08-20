import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "文章",
  description: "全部文章列表",
};

export default function PostsPage() {
  const posts = getAllPosts();
  return (
    <div className="container" style={{ padding: "3.5rem 1.25rem 3rem" }}>
      <div className="page-hero">
        <Eyebrow num="08">ALL ARTICLES</Eyebrow>
        <h1 className="page-hero__title">
          全部<em style={{ color: "var(--terra)", fontStyle: "italic" }}>文章</em>
        </h1>
        <p className="page-hero__sub">
          代码、世界、所思——这里按时间倒序排列。
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="empty-state">还没有文章，敬请期待。</p>
      ) : (
        <div className="post-grid" style={{ marginTop: "2.5rem" }}>
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
