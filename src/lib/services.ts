import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Service, ServiceMeta } from "./types";

const DIR = path.join(process.cwd(), "content/services");

function getMdxFiles(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx"));
}

export function getAllServices(): ServiceMeta[] {
  return getMdxFiles()
    .map((filename) => {
      const { data } = matter(fs.readFileSync(path.join(DIR, filename), "utf-8"));
      return {
        title: data.title ?? "",
        slug: data.slug ?? filename.replace(/\.mdx$/, ""),
        description: data.description ?? "",
        order: data.order ?? 0,
        icon: data.icon ?? "",
      } satisfies ServiceMeta;
    })
    .sort((a, b) => a.order - b.order);
}

export function getServiceBySlug(slug: string): Service | null {
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
        icon: data.icon ?? "",
        content,
      };
    }
  }
  return null;
}
