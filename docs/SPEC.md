# 天成的小窝 — 博客项目 SPEC

> 个人博客静态站点。Next.js 16 静态导出 → GitHub → Cloudflare Pages。
> 本 SPEC 锁定全部设计与内容决策，可直接据此搭建。
> 部署/技术细节参见 `~/Downloads/DEPLOYMENT.md`（已含技术栈、目录、坑清单）。

---

## 1. 项目概述

- **目标**：从空目录 `D:\AAA-TianchengOvO\Blog` 搭建可全球访问、零服务器成本的个人博客。
- **核心流程**：本地写 Markdown → git push → GitHub → Cloudflare Pages 自动构建 → 上线。
- **设计语言**：Claude Design Language（暖米白 + 赤陶红 + 衬线 Hero）。
- **首篇文章**：《搭建记》复盘本次从 0 到上线。

---

## 2. 站点身份

| 字段 | 值 |
|---|---|
| 站点名 (title) | 天成的小窝 |
| 作者 (author) | T1anchengOvO |
| tagline | 写代码 · 读世界 · 记所思 *(默认值，可改)* |
| GitHub | https://github.com/Tiancheng-X |
| Gmail | 363624908h@gmail.com |
| 关于页 bio | "Hi，我是T1anchengOvO，高三在读，喜欢研究AI、玩游戏、摄影，这里是我的个人博客，很荣幸能在这里见到你。" |

写入 `src/config/site.ts`：

```ts
export const siteConfig = {
  title: "天成的小窝",
  author: "T1anchengOvO",
  tagline: "写代码 · 读世界 · 记所思",
  description: "一个高三学生的代码、世界与所思。",
  url: "https://t1anchengovo-blog-new.pages.dev", // 上线后改
  locale: "zh-CN",
  github: "https://github.com/Tiancheng-X",
  email: "mailto:363624908h@gmail.com",
};
```

---

## 3. 基础设施

| 项 | 值 |
|---|---|
| 仓库 | https://github.com/Tiancheng-X/T1anchengOvO_Blog_New (public) |
| 部署平台 | Cloudflare Pages |
| 项目名 | t1anchengovo-blog-new |
| 域名 (v1) | https://t1anchengovo-blog-new.pages.dev |
| 自定义域 | 暂不绑，后续增量 |
| Node 版本 | 22 (.nvmrc) |

---

## 4. 技术栈

完全按 DEPLOYMENT.md §1：

| 层 | 选型 |
|---|---|
| 框架 | Next.js 16 (App Router) + TypeScript, `output: 'export'` |
| 渲染 | React 19 Server Components |
| 样式 | vanilla CSS + CSS 变量（Claude Design Language 配色） |
| 内容 | Markdown + gray-matter |
| 代码高亮 | shiki (rehype-pretty-code) 双主题 |
| 评论 | giscus (@giscus/react, 占位) |
| 部署 | GitHub → Cloudflare Pages (Git 集成) |
| 运行时 | Node 22 |

关键文件（DEPLOYMENT.md §3.2）：
- `next.config.ts`：`output: 'export'` + `trailingSlash: true` + `images.unoptimized: true`
- `.nvmrc`：内容 `22`
- `app/not-found.tsx`：**必须有**，否则 Cloudflare soft-404

---

## 5. 视觉设计规范 — Claude Design Language

### 5.1 配色（CSS 变量）

**亮色 (`:root`)**

| 变量 | 值 | 用途 |
|---|---|---|
| `--bg` | `#FBF9F5` | 主背景（暖米白/纸张感） |
| `--text` | `#1F1E1C` | 主文本（深暖灰） |
| `--text-secondary` | `#6E6B65` | 次要文本（温和中灰） |
| `--accent` | `#D97757` | 品牌点缀（赤陶红） |
| `--accent-hover` | `#C05621` | 强调悬停 |
| `--card` | `#FFFFFF` | 卡片背景 |
| `--border` | `#E8E5DF` | 极细边框 |
| `--shadow` | `0 1px 2px rgba(0,0,0,0.04)` | 柔和阴影 |

**暗色 (`[data-theme="dark"]`)**

| 变量 | 值 |
|---|---|
| `--bg` | `#1F1E1C` |
| `--text` | `#E8E5DF` |
| `--text-secondary` | `#A8A39B` |
| `--accent` | `#D97757` (不变) |
| `--accent-hover` | `#C05621` (不变) |
| `--card` | `#2A2825` |
| `--border` | `#3A3835` |
| `--shadow` | `0 1px 3px rgba(0,0,0,0.3)` |

主题切换：`<html data-theme="light|dark">`，无闪烁脚本在 `layout.tsx` 顶部内联（DEPLOYMENT.md §4 提到）。

### 5.2 字体

| 场景 | 栈 |
|---|---|
| Hero / 大标题 / 站点名 | `Georgia, "Times New Roman", serif` |
| 正文 / UI | `system-ui, -apple-system, "Segoe UI", sans-serif` |
| 代码正文 / 语言 label | `ui-monospace, "SF Mono", Consolas, monospace` |

不引外部字体，零加载延迟。

### 5.3 组件 UI

**卡片（文章列表项、关于页区块）**

```css
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 1rem;            /* rounded-2xl */
  box-shadow: var(--shadow);
  transition: all 300ms ease;
}
.card:hover {
  border-color: rgba(217, 119, 87, 0.4);   /* hover:border-[#D97757]/40 */
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);  /* hover:shadow-md */
}
```

**Header**：毛玻璃 `backdrop-filter: blur(12px)` + 半透明背景 + 底部细边框。

### 5.4 代码块（Claude 风格）

由 `rehype-pretty-code` + shiki 渲染，外加自定义 wrapper：

```
┌─────────────────────────────────────────┐
│ ● ● ●  ts                  [复制]        │  ← 浅灰控制条
├─────────────────────────────────────────┤
│ const x = 1;                             │  ← shiki 高亮
└─────────────────────────────────────────┘
```

- 控制条：`background: var(--border)` 浅化、`padding: 0.5rem 0.75rem`
- 三圆点：红 `#FF5F57` / 黄 `#FEBC2E` / 绿 `#28C840`，直径 12px
- 语言 label：左、小写、`font-family: monospace`、`color: var(--text-secondary)`
- 复制按钮：右、点击复制代码内容到剪贴板
- shiki 双主题：亮色 `github-light`、暗色 `github-dark`，随 `data-theme` 切换

---

## 6. 目录结构

按 DEPLOYMENT.md §4：

```
content/posts/*.md
public/images/
src/
  app/
    layout.tsx           # 根布局 + 无闪烁主题脚本 + Header + Footer + OG/Twitter meta
    page.tsx             # 首页：hero + 文章卡片网格
    not-found.tsx        # 404（必需）
    posts/[slug]/page.tsx
    tags/page.tsx
    tags/[tag]/page.tsx
    archive/page.tsx
    about/page.tsx       # ← 新增（DEPLOYMENT.md 未列）
    feed.xml/route.ts
    sitemap.xml/route.ts
    robots.txt/route.ts
  components/
    Header.tsx           # 毛玻璃导航
    ThemeToggle.tsx
    Reveal.tsx           # 滚动入场动画
    Comments.tsx         # giscus 占位
    CodeBlock.tsx        # Claude 风代码块 wrapper
  config/site.ts
  lib/
    posts.ts             # 数据层
    markdown.ts          # unified 异步渲染管线
    format.ts
  styles/
    tokens.css           # CSS 变量（Claude 配色）
    posts.css
    chrome.css           # Header/footer/全局
    interaction.css      # hover/reveal
    code.css             # Claude 风代码块
```

---

## 7. 页面与路由

### 7.1 首页 `/`
- **Hero**：站点名「天成的小窝」(Georgia serif, 大号) + tagline「写代码 · 读世界 · 记所思」(secondary color, 小号)
- **文章列表**：卡片网格，每卡含标题 / 日期 / tags / summary，hover 效果按 §5.3
- 排除 `draft: true`

### 7.2 文章页 `/posts/[slug]/`
- `generateStaticParams` + `generateMetadata`
- unified 异步管线渲染 Markdown（DEPLOYMENT.md 坑 #6：必须 async）
- giscus 评论（占位，参数 TODO）

### 7.3 标签页 `/tags/` + `/tags/[tag]/`
- 全部标签云 / 单标签文章聚合

### 7.4 归档 `/archive/`
- 按年/月分组的文章时间线

### 7.5 关于 `/about/`（新增）
- bio（§2 中的文本）
- GitHub 链接 + Gmail `mailto:`

### 7.6 404 (not-found.tsx)
- 友好提示 + 回首页链接（DEPLOYMENT.md 坑 #3：必需）

### 7.7 RSS / sitemap / robots
- Route Handler + `export const dynamic = "force-static"`（DEPLOYMENT.md 坑 #7）

---

## 8. 内容

### 8.1 首篇《搭建记》`content/posts/build-log.md`

frontmatter：
```yaml
---
title: "搭建记：从 0 到上线的个人博客"
date: "2026-08-21"
tags: ["随笔", "建站"]
summary: "用 Next.js + Cloudflare Pages 搭个人博客的全程复盘。"
draft: false
---
```

正文 6 节大纲：

1. **起因** — 为啥要博客（自我表达、归档所思、对 Claude 设计语言的偏爱）
2. **技术选型** — Next.js 16 静态导出 + Cloudflare Pages（零服务器、零成本、git push 即发布）
3. **搭建流程** — DEPLOYMENT.md §3-§7 的精简版（init / 三关键文件 / 内容依赖 / 本地验证 / 推 GitHub / 连 Cloudflare）
4. **设计语言** — 从 DEPLOYMENT.md 默认到 Claude 风格的取舍（配色、字体、代码块）
5. **踩过的坑** — DEPLOYMENT.md §9 选 3-4 个：`ERR_WORKER_INVALID_EXEC_ARGV` / `CRYPT_E_REVOCATION_OFFLINE` / soft-404 / unified async
6. **上线后感** — 一两句收尾

### 8.2 后续内容方向

按 bio 推断：AI 研究 / 游戏 / 摄影 / 高三生活 / 编程实践。具体文章后续单独写。

---

## 9. 部署流程

完全按 DEPLOYMENT.md §7：

1. **推 GitHub**（DEPLOYMENT.md §7.1）
   - `git init -b main` → add → commit → remote add → push
   - Windows 坑：`CRYPT_E_REVOCATION_OFFLINE` → `git config --local http.schannelCheckRevoke false`
   - 无 gh CLI → 用 PAT + `credential.helper store`

2. **连 Cloudflare Pages**（DEPLOYMENT.md §7.2）
   - dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
   - 框架预设：**Next.js (Static HTML Export)**（关键！误选 Workers/OpenNext 会走 `wrangler deploy` 错路）
   - Build command: `npx next build`
   - Output directory: `out`
   - 环境变量: `NODE_VERSION=22`

3. **giscus 评论**（DEPLOYMENT.md §7.3，v1 占位，后续补）
   - 仓库 Settings → Discussions 开启
   - 装 giscus App
   - https://giscus.app 拿 4 参数填入 `Comments.tsx`

---

## 10. 占位与后续

| 项 | 状态 |
|---|---|
| giscus REPO/REPO_ID/CATEGORY/CATEGORY_ID | 占位 TODO，仓库上线后补 |
| `site.url` | 先用 `.pages.dev`，上线后改实际域名 |
| 自定义域 | 后续增量，不阻塞 v1 |
| 首篇《搭建记》之外的文章 | 后续单独写 |

---

## 11. 验收标准

v1 上线 = 以下全部满足：

- [ ] `npm run build` 在 `D:\AAA-TianchengOvO\Blog` 通过，产出 `out/`
- [ ] `out/` 含首页 / 文章页 / 标签 / 归档 / 关于 / 404 / feed.xml / sitemap.xml / robots.txt
- [ ] 亮暗主题切换无闪烁
- [ ] 代码块呈现 Claude 风（控制条 + 三圆点 + 语言 label + 复制按钮）
- [ ] 卡片 hover 效果（border #D97757/40 + shadow）
- [ ] 首篇《搭建记》非草稿、可在首页与 `/posts/build-log/` 访问
- [ ] 关于页含 bio + GitHub + Gmail
- [ ] git push 到 `Tiancheng-X/T1anchengOvO_Blog_New`
- [ ] Cloudflare Pages 部署成功，`https://t1anchengovo-blog-new.pages.dev` 可访问
- [ ] `curl` 不存在路径返回 404（非 200）

---

## 12. 范围外（v1 不做）

- 自定义域名（后续增量）
- giscus 实际接入（占位）
- 搜索功能
- 国际化（i18n）
- 文章 TOC（目录侧栏）
- 阅读时长估算
- 多作者

---

_本 SPEC 基于 wayfinder-zh + grilling-zh 两轮访谈生成。fog 已空，可直接进入 Craft 模式搭建。_
