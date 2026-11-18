import type { Metadata } from "next";
import Image from "next/image";
import { getAllServices } from "@/lib/services";
import { ServiceListItem } from "@/components/ServiceListItem";

export const metadata: Metadata = {
  title: "Услуги",
  description: "SEO услуги агентства «Точка Успеха»: аудит, продвижение, аналитика, семантическое ядро, контент-стратегия.",
};

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <div className="flex flex-col">
      {/* Intro */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container-divi">
          <h1 className="text-h1 font-semibold text-foreground mb-6">Наше предложение</h1>
          <p className="text-[16px] text-[var(--foreground-muted)] leading-relaxed max-w-3xl">
            С&nbsp;2009&nbsp;года мы помогаем компаниям наращивать органический трафик. Мы внедряем
            стратегии SEO-продвижения, поддерживаем проекты по&nbsp;линкбилдингу и&nbsp;on-page
            оптимизации. Помимо SEO, мы предлагаем услуги по&nbsp;аналитике в&nbsp;Google Analytics
            и&nbsp;Looker Studio.
          </p>
        </div>
      </section>

      {/* Cover photo with red circle */}
      <section className="relative h-[300px] sm:h-[450px] lg:h-[600px] overflow-hidden">
        <Image
          src="/images/hero/homepage-cover.jpg"
          alt="SEO агентство Точка Успеха — наши услуги"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[350px] lg:h-[350px] rounded-full bg-[#E30613] opacity-90" />
        </div>
      </section>

      {/* Services list */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container-divi">
          <h2 className="text-h2 font-semibold text-foreground mb-10">Объём услуг</h2>
          <div className="flex flex-col">
            {services.map((service) => (
              <ServiceListItem key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
