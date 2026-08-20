// Comments (giscus) — placeholder for v1.
// TODO: 仓库上线后启用 giscus 评论（DEPLOYMENT.md §7.3）
//   1. 仓库 Settings → Discussions 开启
//   2. 装 giscus App: https://github.com/apps/giscus
//   3. https://giscus.app 填 Tiancheng-X/T1anchengOvO_Blog_New，复制 4 个参数
//   4. 取消下方注释，把 REPO_ID / CATEGORY_ID 替换为实际值

// "use client";
// import Giscus from "@giscus/react";
//
// const REPO = "Tiancheng-X/T1anchengOvO_Blog_New";
// const REPO_ID = "TODO_REPO_ID";
// const CATEGORY = "General";
// const CATEGORY_ID = "TODO_CATEGORY_ID";
//
// export function Comments() {
//   return (
//     <div style={{ marginTop: "3rem" }}>
//       <Giscus
//         repo={REPO as `${string}/${string}`}
//         repoId={REPO_ID}
//         category={CATEGORY}
//         categoryId={CATEGORY_ID}
//         mapping="pathname"
//         strict="0"
//         reactionsEnabled="1"
//         emitMetadata="0"
//         inputPosition="top"
//         theme="preferred_color_scheme"
//         lang="zh-CN"
//       />
//     </div>
//   );
// }

export function Comments() {
  return (
    <div
      style={{
        marginTop: "3rem",
        padding: "1.5rem",
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        color: "var(--text-secondary)",
        textAlign: "center",
        fontSize: "0.875rem",
      }}
    >
      评论系统（giscus）即将上线
    </div>
  );
}
