import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { siteConfig } from "@/config/site";
import { PostCard } from "@/components/PostCard";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { StatsStrip } from "@/components/StatsStrip";
import { CodePanel } from "@/components/CodePanel";
import { TextDecode } from "@/components/TextDecode";
import { ArrowRight, ArrowUpRight, PenTool, Book, Camera, Compass } from "@/components/icons";

export default function HomePage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  // stats
  const postCount = posts.length;
  const wordCount = posts.reduce(
    (sum, p) => sum + p.content.replace(/\s+/g, "").length,
    0
  );
  const startYear = 2026;
  const now = new Date();
  const yearsWriting = now.getFullYear() - startYear + 1;
  const tagCount = tags.length;

  // 拆 tagline 为 line-mask 行："写代码 · 读世界 · 记所思"
  const titleLines = [
    { text: "写代码，", em: false, d: 60 },
    { text: "读世界，", em: false, d: 140 },
    { text: "记所思。", em: true, d: 220 },
  ];

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="hero dotgrid">
        <div className="container">
          <div className="hero__grid">
            {/* 左：主张 */}
            <div className="hero__left">
              <Eyebrow num="01">BLOG · WRITINGS</Eyebrow>

              <h1 className="hero__title">
                {titleLines.map((line, i) => (
                  <span className="line-mask" key={i}>
                    <span
                      className="line-mask__inner"
                      style={{ "--d": `${line.d}ms` } as React.CSSProperties}
                    >
                      {line.em ? <em>{line.text}</em> : line.text}
                    </span>
                  </span>
                ))}
              </h1>

              <TextDecode
                as="p"
                className="hero__intro"
                text={`${siteConfig.author} 的个人博客。高三在读，喜欢研究 AI、玩游戏、摄影。这里记代码、记世界、记所思。`}
              />

              <div className="hero__cta">
                <Link href="/posts/" className="btn btn--primary">
                  读文章 <span className="btn__arrow"><ArrowRight width={14} height={14} /></span>
                </Link>
                <Link href="/about/" className="btn btn--ghost">
                  关于我 <ArrowUpRight width={14} height={14} />
                </Link>
              </div>

              <div className="hero__location">
                <span className="hero__location-dot" aria-hidden />
                {siteConfig.author} · China
              </div>
            </div>

            {/* 右：now.ts 代码面板 */}
            <Reveal as="div" delay={260} className="hero__right">
              <CodePanel
                code={
                  <>
                    <span className="com">// now.ts — 此刻在做的事</span>
                    {"\n"}
                    <span className="kw">const</span> <span className="fn">now</span> = {"{"}
                    {"\n"}
                    {"  "}status: <span className="str">'writing'</span>,
                    {"\n"}
                    {"  "}focus: <span className="str">'AI · 前端 · 摄影'</span>,
                    {"\n"}
                    {"  "}reading: <span className="str">'高三课本'</span>,
                    {"\n"}
                    {"  "}building: <span className="str">'这个博客'</span>,
                    {"\n"}
                    {"  "}mood: <span className="str">'curious'</span>,
                    {"\n"}
                    {"}"};
                  </>
                }
                currently={[
                  { icon: <PenTool width={15} height={15} />, text: "写代码与笔记" },
                  { icon: <Book width={15} height={15} />, text: "读高三课本" },
                  { icon: <Camera width={15} height={15} />, text: "出门拍照" },
                  { icon: <Compass width={15} height={15} />, text: "探索新事物" },
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── Stats ───────── */}
      <StatsStrip
        items={[
          { num: `${postCount}`, label: "Articles" },
          { num: `${(wordCount / 1000).toFixed(1)}k`, label: "Words" },
          { num: `${yearsWriting}`, label: "Years" },
          { num: `${tagCount}`, label: "Tags" },
        ]}
      />

      {/* ───────── 最新文章 ───────── */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <Eyebrow num="02">SELECTED WORKS</Eyebrow>
            <h2 className="section__title">
              最新<em>文章</em>
            </h2>
            <p className="section__sub">
              代码、世界、所思——记录值得回看的东西。
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="empty-state">还没有文章，敬请期待。</p>
          ) : (
            <div className="post-grid">
              {posts.map((p, i) => (
                <Reveal key={p.slug} delay={i * 80}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
