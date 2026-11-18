import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Блог",
  description: "Статьи о SEO, аналитике, искусственном интеллекте и digital-маркетинге от агентства «Точка Успеха».",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container-divi">
        <div className="text-center mb-12">
          <h1 className="text-h1 font-semibold text-foreground">Блог</h1>
          <p className="mt-3 text-body text-muted max-w-2xl mx-auto">
            Статьи, кейсы и полезные материалы по SEO и digital-маркетингу
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">Статьи скоро появятся.</p>
        )}
      </div>
    </div>
  );
}
