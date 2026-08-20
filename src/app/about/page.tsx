import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "关于",
  description: `关于 ${siteConfig.author}`,
};

export default function AboutPage() {
  return (
    <div className="about">
      <h1 className="about__title">关于</h1>
      <p className="about__bio">
        Hi，我是 T1anchengOvO，高三在读，喜欢研究 AI、玩游戏、摄影，这里是我的个人博客，很荣幸能在这里见到你。
      </p>
      <div className="about__links">
        <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
          GitHub →
        </a>
        <a href={siteConfig.email}>Gmail →</a>
      </div>
    </div>
  );
}
