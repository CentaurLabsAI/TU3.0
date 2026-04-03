import type { MetadataRoute } from "next";
import { getAllServices } from "@/lib/services";
import { getAllPosts } from "@/lib/blog";
import { getAllCourses } from "@/lib/courses";

const BASE_URL = "https://tu.by";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/services`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/courses`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const servicePages: MetadataRoute.Sitemap = getAllServices().map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const coursePages: MetadataRoute.Sitemap = getAllCourses().map((c) => ({
    url: `${BASE_URL}/courses/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...blogPages, ...coursePages];
}
