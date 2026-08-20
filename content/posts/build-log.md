---
title: "搭建记：从 0 到上线的个人博客"
date: "2026-08-21"
tags: ["随笔", "建站"]
summary: "用 Next.js + Cloudflare Pages 搭个人博客的全程复盘。"
draft: false
---

## 1. 起因

很久之前就想搭一个属于自己的博客。

不是为了"做大"，不是为了追流量。只是想把零零碎碎的想法、读过的东西、踩过的坑、做出来的小玩意，归档到一个长在互联网上的地方。社交平台发的字会沉下去，自己站里的字能留下来。

加之上次搭的博客丢了，最近又有重新整理的冲动——这次想做得对一点：技术栈选得稳、视觉风格有自己的偏爱、部署链路透明可复现。

于是就有了这篇搭建记，和这个叫「天成的小窝」的站点。

## 2. 技术选型

最终选了 **Next.js 16 静态导出 + Cloudflare Pages**，一条链路走到底：

- **Next.js 16 + App Router + TypeScript** —— 构建期生成纯静态 HTML，运行时零 JS、零服务器、零函数计算。
- **React 19 Server Components** —— 数据获取和渲染都在构建期完成，发出去的就是已经长好的 HTML。
- **vanilla CSS + CSS 变量** —— 不引 Tailwind / styled-components，所有视觉由一组 token 控制，明暗主题切换等于改一组变量。
- **Markdown 进 git** —— 写文章 = 写文件 + push，没有后台、没有数据库、没有 CMS。
- **Cloudflare Pages** —— git push 即构建即上线，全球 CDN、免费、HTTPS 自动签发。

整套链路的核心承诺是：**零服务器、零成本、git push 即发布**。一篇 Markdown，一次 push，全球可访问。

## 3. 搭建流程

流程并不复杂，但有几个关键节点必须卡住：

1. **初始化** —— 空目录里手动建骨架（`create-next-app` 在非空目录会报错），`npm install next@^16 react@^19 react-dom@^19`，再加 TypeScript 与 types。
2. **三个关键文件**：
   - `next.config.ts` 里 `output: 'export'` —— 这是静态导出的开关。
   - `.nvmrc` 内容 `22` —— Cloudflare 构建机据此选 Node 版本。
   - `app/not-found.tsx` 必须有 —— 不然 Cloudflare 把站点当 SPA，死链返回 200（SEO 灾难）。
3. **内容与渲染依赖**：`gray-matter` 解析 frontmatter，`remark`/`rehype` 管线 + `shiki` 做代码高亮，`@giscus/react` 准备评论。
4. **本地验证**：`npm run dev` 看预览，`npm run build` 验证能否产出 `out/`。
5. **推 GitHub** —— public 仓库（giscus 评论强制 public）。
6. **连 Cloudflare Pages** —— 框架预设选 **Next.js (Static HTML Export)**，Build command `npx next build`，输出目录 `out`，环境变量 `NODE_VERSION=22`。

## 4. 设计语言

DEPLOYMENT.md 原本给的是 vanilla CSS + 双主题的载体，但没指定具体色板与排版。最后选了一套以 **Claude** 交互界面为灵感的视觉规范：

- **暖米白纸张感**主背景 `#FBF9F5`，主文本用深暖灰 `#1F1E1C`，次要文本温和中灰 `#6E6B65`。
- **品牌点缀色** Claude 标志性赤陶红 `#D97757`，悬停态 `#C05621`。
- 卡片用纯白 `#FFFFFF` + 极细边框 `#E8E5DF` + 柔和阴影，`rounded-2xl` 大圆角，hover 时边框渐变为赤陶红 40% 透明、阴影加深。
- **字体**：Hero / 大标题用 Georgia 衬线体，营造人文质感；正文/UI 用系统无衬线体，确保高可读性。不引外部字体，零加载延迟。
- **代码块**复刻 Claude 交互界面：顶部浅灰控制条 + 三圆点（红黄绿）+ 左侧语言名小写 label + 右侧复制按钮，下方是 shiki 双主题高亮。

暗色版本按同一套语言反相：主背景 `#1F1E1C`、卡片 `#2A2825`、文本 `#E8E5DF`、赤陶红不变。

## 5. 踩过的坑

DEPLOYMENT.md §9 列了 10 个坑，挑几个值得记的：

1. **`next build` 报 `ERR_WORKER_INVALID_EXEC_ARGV`** —— Windows 下 `NODE_OPTIONS` 被注入 `--use-system-ca` 导致，解法 `unset NODE_OPTIONS` 再 build。
2. **Cloudflare 部署走了 `wrangler deploy`** —— 误选 Workers/OpenNext 路线。务必用 Pages + **Next.js (Static HTML Export)** 预设，输出 `out`。
3. **死链返回 200**（soft-404）—— 没有 `app/not-found.tsx` 时 Cloudflare 把站点当 SPA。文件必须有，上线后用 `curl` 验证不存在路径返回 404。
4. **react-markdown 接 shiki 报 `runSync finished async`** —— 改用 unified 异步管线 + `await`，不要用同步渲染。

完整清单见 DEPLOYMENT.md §9。

## 6. 上线后感

这一版的「天成的小窝」就这么上线了。

下一篇文章写什么，我还没想好。可能是 AI、可能是游戏、可能是按下一张快门时的某个瞬间。但有一件事是确定的：从这里开始，字会留下来。

如果你看到这里——很荣幸。
