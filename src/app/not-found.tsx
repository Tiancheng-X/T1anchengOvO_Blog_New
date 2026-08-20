import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(3rem, 8vw, 5rem)",
          color: "var(--accent)",
          marginBottom: "1rem",
        }}
      >
        404
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "1.125rem",
          marginBottom: "2rem",
        }}
      >
        这里什么都没有，可能从未存在过。
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "0.625rem 1.5rem",
          border: "1px solid var(--border)",
          borderRadius: "999px",
          color: "var(--accent)",
        }}
      >
        ← 回首页
      </Link>
    </div>
  );
}
