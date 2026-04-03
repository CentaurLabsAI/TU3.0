import Link from "next/link";
import { getAllServices } from "@/lib/services";
import { getAllPosts } from "@/lib/blog";
import { getAllFaqItems } from "@/lib/faq";
import { ServiceCard } from "@/components/ServiceCard";
import { BlogCard } from "@/components/BlogCard";
import { FaqAccordion } from "@/components/FaqAccordion";

export default function Home() {
  const services = getAllServices();
  const posts = getAllPosts().slice(0, 3);
  const faqItems = getAllFaqItems().slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-small font-semibold text-accent uppercase tracking-wider mb-4">
            SEO агентство
          </p>
          <h1 className="text-display font-bold tracking-tight text-foreground leading-tight">
            Продвигаем бизнес{" "}
            <span className="text-primary">в&nbsp;поисковых системах</span>
          </h1>
          <p className="mt-6 text-h4 text-muted leading-relaxed max-w-2xl mx-auto">
            SEO аудит, продвижение, аналитика и&nbsp;контент-стратегия. Прозрачный подход с&nbsp;измеримыми результатами.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center px-6 py-3 rounded-(--radius-lg) bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors shadow-md"
            >
              Наши услуги
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-(--radius-lg) border border-border text-foreground font-semibold hover:bg-surface-sunken transition-colors"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-bold text-foreground">Что мы делаем</h2>
            <p className="mt-3 text-body text-muted max-w-xl mx-auto">
              Полный цикл SEO-услуг для роста вашего бизнеса в интернете
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest posts */}
      {posts.length > 0 && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-bold text-foreground">Последние статьи</h2>
              <p className="mt-3 text-body text-muted max-w-xl mx-auto">
                Полезные материалы по SEO, аналитике и digital-маркетингу
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 rounded-(--radius-lg) border border-border text-foreground font-semibold hover:bg-surface-sunken transition-colors"
              >
                Все статьи
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ preview */}
      {faqItems.length > 0 && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-surface">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-bold text-foreground">Частые вопросы</h2>
            </div>
            <FaqAccordion items={faqItems} />
            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="inline-flex items-center px-6 py-3 rounded-(--radius-lg) border border-border text-foreground font-semibold hover:bg-surface-sunken transition-colors"
              >
                Все вопросы
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold text-foreground">
            Готовы к росту?
          </h2>
          <p className="mt-4 text-body text-muted">
            Закажите бесплатную консультацию и&nbsp;узнайте, как SEO может помочь вашему бизнесу.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center mt-8 px-8 py-3.5 rounded-(--radius-lg) bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors shadow-md"
          >
            Получить консультацию
          </Link>
        </div>
      </section>
    </div>
  );
}
