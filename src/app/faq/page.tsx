import type { Metadata } from "next";
import { getAllFaqItems, getFaqCategories } from "@/lib/faq";
import { FaqAccordion } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Часто задаваемые вопросы о SEO продвижении, аудите, семантическом ядре и миграции сайта.",
};

const categoryLabels: Record<string, string> = {
  "q&a": "Общие вопросы",
  "seo-audit": "SEO аудит",
  "semantic core": "Семантическое ядро",
  "site migration": "Миграция сайта",
};

export default function FaqPage() {
  const categories = getFaqCategories();
  const allItems = getAllFaqItems();

  return (
    <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-h1 font-bold text-foreground">Частые вопросы</h1>
          <p className="mt-3 text-body text-muted">
            Ответы на популярные вопросы о наших услугах
          </p>
        </div>

        <div className="space-y-10">
          {categories.map((cat) => {
            const items = allItems.filter((i) => i.category === cat);
            if (items.length === 0) return null;
            return (
              <section key={cat}>
                <h2 className="text-h3 font-bold text-foreground mb-4">
                  {categoryLabels[cat] ?? cat}
                </h2>
                <FaqAccordion items={items} />
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
