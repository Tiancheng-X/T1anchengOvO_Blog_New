import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  draft: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

function readPostFile(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const date = data.date
    ? new Date(data.date).toISOString().slice(0, 10)
    : "";
  return {
    slug,
    title: data.title ?? slug,
    date,
    tags: Array.isArray(data.tags) ? data.tags : [],
    summary: data.summary ?? "",
    draft: Boolean(data.draft),
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): Post[] {
  return getAllSlugs()
    .map(readPostFile)
    .filter((p): p is Post => p !== null)
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const post = readPostFile(slug);
  if (!post || post.draft) return null;
  return post;
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of getAllPosts()) {
    for (const t of p.tags) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function getArchive(): { year: number; posts: Post[] }[] {
  const groups = new Map<number, Post[]>();
  for (const p of getAllPosts()) {
    const y = new Date(p.date).getFullYear();
    if (!groups.has(y)) groups.set(y, []);
    groups.get(y)!.push(p);
  }
  return Array.from(groups.entries())
    .map(([year, posts]) => ({ year, posts }))
    .sort((a, b) => b.year - a.year);
}
