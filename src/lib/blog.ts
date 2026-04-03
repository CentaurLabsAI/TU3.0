import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogPostMeta } from "./types";

const DIR = path.join(process.cwd(), "content/blog");

function getMdxFiles(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx"));
}

export function getAllPosts(): BlogPostMeta[] {
  return getMdxFiles()
    .map((filename) => {
      const { data } = matter(fs.readFileSync(path.join(DIR, filename), "utf-8"));
      return {
        title: data.title ?? "",
        slug: data.slug ?? filename.replace(/\.mdx$/, ""),
        date: data.date ?? "",
        author: data.author ?? "",
        category: data.category ?? "",
        tags: data.tags ?? [],
        excerpt: data.excerpt ?? "",
        coverImage: data.coverImage ?? "",
      } satisfies BlogPostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  for (const f of getMdxFiles()) {
    const raw = fs.readFileSync(path.join(DIR, f), "utf-8");
    const { data, content } = matter(raw);
    const fileSlug = data.slug ?? f.replace(/\.mdx$/, "");
    if (fileSlug === slug) {
      return {
        title: data.title ?? "",
        slug: fileSlug,
        date: data.date ?? "",
        author: data.author ?? "",
        category: data.category ?? "",
        tags: data.tags ?? [],
        excerpt: data.excerpt ?? "",
        coverImage: data.coverImage ?? "",
        content,
      };
    }
  }
  return null;
}

export function getPostCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((p) => p.category).filter(Boolean));
  return Array.from(categories).sort();
}
