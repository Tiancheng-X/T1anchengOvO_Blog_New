"use client";

import Giscus from "@giscus/react";

const REPO = "Tiancheng-X/T1anchengOvO_Blog_New";
const REPO_ID = "R_kgDOT-0Afw";
const CATEGORY = "Announcements";
const CATEGORY_ID = "DIC_kwDOT-0Af84DD0nW";

export function Comments() {
  return (
    <section className="comments" style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--line)" }}>
      <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>
        <span>COMMENTS · GISCUS</span>
      </div>
      <Giscus
        repo={REPO as `${string}/${string}`}
        repoId={REPO_ID}
        category={CATEGORY}
        categoryId={CATEGORY_ID}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="preferred_color_scheme"
        lang="zh-CN"
      />
    </section>
  );
}
