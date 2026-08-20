import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/config/site";
import { PostCard } from "@/components/PostCard";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <>
      <section className="hero">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__tagline">{siteConfig.tagline}</p>
      </section>
      <section>
        <h2 className="section-title">文章</h2>
        {posts.length === 0 ? (
          <p style={{ color: "var(--text-secondary)" }}>
            还没有文章，敬请期待。
          </p>
        ) : (
          <div className="post-grid">
            {posts.map((p) => (
              <Reveal key={p.slug}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
