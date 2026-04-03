// ============================================
// Content Types — SEO Agency "Точка Успеха"
// ============================================

/** Service page (SEO audit, promotion, etc.) */
export interface Service {
  title: string;
  slug: string;
  description: string;
  order: number;
  icon: string;
  content: string;
}

export type ServiceMeta = Omit<Service, "content">;

/** Blog post */
export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  coverImage: string;
  content: string;
}

export type BlogPostMeta = Omit<BlogPost, "content">;

/** FAQ item (from JSON, not MDX) */
export interface FaqItem {
  question: string;
  answer: string;
  slug: string;
  category: string;
}

/** Course / module */
export interface Course {
  title: string;
  slug: string;
  description: string;
  order: number;
  content: string;
}

export type CourseMeta = Omit<Course, "content">;
