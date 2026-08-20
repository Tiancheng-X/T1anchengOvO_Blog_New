import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Eyebrow } from "@/components/Eyebrow";
import { Timeline } from "@/components/Timeline";
import { Accordion } from "@/components/Accordion";
import { Reveal } from "@/components/Reveal";
import { Github, Mail, Sparkles, Compass, PenTool, Book } from "@/components/icons";

export const metadata: Metadata = {
  title: "关于",
  description: `关于 ${siteConfig.author}`,
};

const milestones = [
  {
    date: "2026 · NOW",
    title: "搭建个人博客",
    org: "天成的小窝",
    desc: "用 Next.js 16 + Cloudflare Pages 搭了这处自留地，开始把代码、世界与所思写下来。",
  },
  {
    date: "ONGOING",
    title: "高三在读",
    org: "高中",
    desc: "在备考与兴趣之间找平衡，把零碎时间分给代码、AI、游戏和摄影。",
  },
  {
    date: "FOCUS",
    title: "研究方向",
    org: "AI · 前端",
    desc: "对 AI 应用、前端工程化、视觉设计语言有持续兴趣，边做边学。",
  },
];

const principles = [
  {
    icon: <Sparkles width={16} height={16} />,
    title: "温暖是一种功能",
    meta: "WARMTH",
    content: (
      <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
        人记住的是「感觉」而非架构。所以这博客用暖米白纸面、墨黑正文、陶土橙点缀——克制、有人味、可读。
      </p>
    ),
  },
  {
    icon: <Compass width={16} height={16} />,
    title: "先发无聊版本",
    meta: "SHIP THE CALM",
    content: (
      <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
        优先稳定可读的系统，而非聪明的。栅格统一、间距克制、配色不滥用——能长期维护比一时炫酷更重要。
      </p>
    ),
  },
  {
    icon: <PenTool width={16} height={16} />,
    title: "像杂志而非模板",
    meta: "EDITORIAL",
    content: (
      <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
        衬线标题 + 等宽小标签（eyebrow）的层级对比，是这套设计的骨架。工业感与人文感并存。
      </p>
    ),
  },
  {
    icon: <Book width={16} height={16} />,
    title: "动效服务于阅读",
    meta: "RESTRAINT",
    content: (
      <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
        滚动渐显、标题上滑、文字解码——都为引导视线，不抢夺注意力。无 JS / 减弱动效也能完整阅读。
      </p>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="about">
      {/* Hero */}
      <section className="about__hero">
        <div>
          <Eyebrow num="03">ABOUT</Eyebrow>
          <h1 className="about__title">
            我是 <em>{siteConfig.author}</em>。
          </h1>
          <p className="about__bio">
            Hi，我是 <strong>T1anchengOvO</strong>，高三在读，喜欢研究 AI、玩游戏、摄影。
            这里是我的个人博客，很荣幸能在这里见到你。
          </p>
          <div className="about__links">
            <a
              className="about__link"
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="about__link-icon" aria-hidden>
                <Github width={15} height={15} />
              </span>
              GitHub
            </a>
            <a className="about__link" href={siteConfig.email}>
              <span className="about__link-icon" aria-hidden>
                <Mail width={15} height={15} />
              </span>
              Gmail
            </a>
          </div>
        </div>

        <Reveal as="div" delay={150}>
          <div className="now-panel" style={{ marginTop: "1rem" }}>
            <div className="now-panel__bar">
              <span className="now-panel__dots" aria-hidden>
                <span className="now-panel__dot now-panel__dot--red" />
                <span className="now-panel__dot now-panel__dot--yellow" />
                <span className="now-panel__dot now-panel__dot--green" />
              </span>
              <span className="now-panel__file">bio.ts</span>
            </div>
            <pre className="now-panel__code">
              <code>
                <span className="kw">const</span> me = {"{"}
                {"\n  "}name: <span className="str">'T1anchengOvO'</span>,
                {"\n  "}role: <span className="str">'高三在读'</span>,
                {"\n  "}loves: [<span className="str">'AI'</span>, <span className="str">'游戏'</span>, <span className="str">'摄影'</span>],
                {"\n  "}blog: <span className="str">'天成的小窝'</span>,
                {"\n}"};
              </code>
            </pre>
          </div>
        </Reveal>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container container--prose">
          <Eyebrow num="04">MILESTONES</Eyebrow>
          <h2 className="section__title">
            一些<em>节点</em>
          </h2>
          <div style={{ marginTop: "2.5rem" }}>
            <Timeline items={milestones} />
          </div>
        </div>
      </section>

      {/* Principles accordion */}
      <section className="section">
        <div className="container container--prose">
          <Eyebrow num="05">HOW I WRITE</Eyebrow>
          <h2 className="section__title">
            写作<em>原则</em>
          </h2>
          <p className="section__sub" style={{ marginBottom: "2rem" }}>
            这博客背后的几条取舍——决定写什么、怎么写、长什么样。
          </p>
          <Accordion items={principles} />
        </div>
      </section>
    </div>
  );
}
