import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Course, CourseMeta } from "./types";

const DIR = path.join(process.cwd(), "content/courses");

function getMdxFiles(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx"));
}

export function getAllCourses(): CourseMeta[] {
  return getMdxFiles()
    .map((filename) => {
      const { data } = matter(fs.readFileSync(path.join(DIR, filename), "utf-8"));
      return {
        title: data.title ?? "",
        slug: data.slug ?? filename.replace(/\.mdx$/, ""),
        description: data.description ?? "",
        order: data.order ?? 0,
      } satisfies CourseMeta;
    })
    .sort((a, b) => a.order - b.order);
}

export function getCourseBySlug(slug: string): Course | null {
  for (const f of getMdxFiles()) {
    const raw = fs.readFileSync(path.join(DIR, f), "utf-8");
    const { data, content } = matter(raw);
    const fileSlug = data.slug ?? f.replace(/\.mdx$/, "");
    if (fileSlug === slug) {
      return {
        title: data.title ?? "",
        slug: fileSlug,
        description: data.description ?? "",
        order: data.order ?? 0,
        content,
      };
    }
  }
  return null;
}
