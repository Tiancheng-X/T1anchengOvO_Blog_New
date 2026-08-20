import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <div
      className="container container--prose"
      style={{
        textAlign: "center",
        padding: "6rem 1.25rem",
      }}
    >
      <Eyebrow num="404" className="not-found-eyebrow">
        LOST
      </Eyebrow>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(4rem, 10vw, 6rem)",
          color: "var(--terra)",
          marginBottom: "1rem",
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        404
      </h1>
      <p
        style={{
          color: "var(--muted)",
          fontSize: "1.125rem",
          marginBottom: "2.25rem",
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
        }}
      >
        这里什么都没有，可能从未存在过。
      </p>
      <Link href="/" className="btn btn--primary">
        回首页 <ArrowRight width={14} height={14} />
      </Link>
    </div>
  );
}
