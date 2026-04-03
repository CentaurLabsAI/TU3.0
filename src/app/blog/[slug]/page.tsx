import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MdxContent } from "@/components/MdxContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const dateFormatted = new Date(post.date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-small text-muted" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary transition-colors">Главная</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Блог</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-medium truncate max-w-[200px]">{post.title}</li>
          </ol>
        </nav>

        {/* Cover image */}
        {post.coverImage && (
          <div className="relative aspect-video rounded-(--radius-lg) overflow-hidden mb-8">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          {post.category && (
            <span className="inline-block px-2.5 py-0.5 text-caption font-medium rounded-(--radius-full) bg-accent-light text-accent mb-3">
              {post.category}
            </span>
          )}
          <h1 className="text-h1 font-bold text-foreground leading-tight">{post.title}</h1>
          <div className="mt-4 flex items-center gap-3 text-small text-muted">
            <span>{post.author}</span>
            <span aria-hidden="true">&middot;</span>
            <time dateTime={post.date}>{dateFormatted}</time>
          </div>
        </header>

        {/* Content */}
        <MdxContent source={post.content} />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-border flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-caption font-medium rounded-(--radius-full) bg-surface-sunken text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
