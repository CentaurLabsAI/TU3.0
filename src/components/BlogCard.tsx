import Link from "next/link";
import Image from "next/image";
import type { BlogPostMeta } from "@/lib/types";

interface BlogCardProps {
  post: BlogPostMeta;
}

export function BlogCard({ post }: BlogCardProps) {
  const dateFormatted = new Date(post.date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-(--radius-lg) bg-surface-elevated border border-border hover:border-primary/30 hover:shadow-lg transition-all overflow-hidden"
    >
      {post.coverImage && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        {post.category && (
          <span className="inline-block px-2.5 py-0.5 text-caption font-medium rounded-(--radius-full) bg-accent-light text-accent">
            {post.category}
          </span>
        )}
        <h3 className="mt-3 text-h4 font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 text-small text-muted leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        )}
        <p className="mt-3 text-caption text-muted-light">{dateFormatted}</p>
      </div>
    </Link>
  );
}
