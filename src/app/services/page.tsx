import type { Metadata } from "next";
import { getAllServices } from "@/lib/services";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Услуги",
  description: "SEO услуги агентства «Точка Успеха»: аудит, продвижение, аналитика, семантическое ядро, контент-стратегия.",
};

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-h1 font-bold text-foreground">Наши услуги</h1>
          <p className="mt-3 text-body text-muted max-w-2xl mx-auto">
            Полный цикл SEO-услуг для роста вашего бизнеса в интернете
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
