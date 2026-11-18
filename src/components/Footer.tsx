import Link from "next/link";
import Image from "next/image";
import { ContactForm } from "./ContactForm";

const footerNav = [
  { href: "/", label: "Главная" },
  { href: "/blog", label: "Блог компании" },
  { href: "/about", label: "О нас" },
  { href: "/contact", label: "Контакты" },
  { href: "/privacy-policy", label: "Политика обработки данных" },
];

const services = [
  { href: "/services/seo-prodvizhenie", label: "SEO продвижение" },
  { href: "/services/seo-audit", label: "SEO аудит" },
  { href: "/services/semanticheskoe-yadro", label: "Семантическое ядро" },
  { href: "/services/kontent-plan", label: "Контент-план" },
  { href: "/services/migracziya-sajta", label: "Миграция сайта" },
];

export function Footer() {
  return (
    <footer>
      {/* Section 1: Contact form CTA */}
      <section className="bg-[#2a2a2a] py-16">
        <div className="container-divi">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-[28px] md:text-[36px] font-bold text-white mb-4">
              Задайте вопрос прямо сейчас
            </h2>
            <h4 className="text-[16px] md:text-[18px] text-gray-300 font-normal leading-relaxed">
              Заполните форму и наш консультант свяжется с вами и поможет выбрать
              оптимальное решение SEO активностей для роста вашего бизнеса.
            </h4>
          </div>
          <div className="max-w-3xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Section 2: Footer info */}
      <section className="bg-[#1a1a1a] py-12">
        <div className="container-divi">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Column 1: Company info */}
            <div>
              <h4 className="text-[15px] font-semibold text-white leading-relaxed mb-4">
                Мы – бутиковое SEO-агентство, специализирующееся на оптимизации сайтов.
              </h4>
              <div className="text-[13px] text-gray-400 space-y-1">
                <p>&laquo;Точка Успеха&raquo;, г. Минск, 220124, улица Масюковщина, 2Б, к.90</p>
                <p>ИП Кононцев — УНП: 192388517</p>
                <p>
                  e-mail:{" "}
                  <a
                    href="mailto:info@tu.by"
                    className="text-[#E30613] hover:text-white transition-colors"
                  >
                    info@tu.by
                  </a>
                </p>
              </div>
            </div>

            {/* Column 2: Navigation + Services + AI promo */}
            <div>
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Nav links */}
                <ul className="space-y-2">
                  {footerNav.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-[#E30613] hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                {/* Services links */}
                <ul className="space-y-2">
                  {services.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-[#E30613] hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI course promo */}
              <div className="border-t border-gray-700 pt-4">
                <p className="text-[13px] text-gray-300 leading-relaxed mb-2">
                  🚀 Освойте ИИ бесплатно! 7 модулей о нейросетях, ChatGPT и Prompt Engineering.
                </p>
                <Link
                  href="/courses/ai-main"
                  className="text-[13px] text-[#E30613] hover:text-white transition-colors font-semibold"
                >
                  Начать обучение →
                </Link>
              </div>
            </div>

            {/* Column 3: Big logo */}
            <div className="flex flex-col items-center lg:items-end justify-center">
              <Image
                src="/images/logo/logo-tochka.png"
                alt="Точка Успеха"
                width={300}
                height={250}
                className="w-auto h-auto max-w-[280px] opacity-30"
              />
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 pt-6 border-t border-gray-700 text-center">
            <p className="text-[12px] text-gray-500">
              2009 &ndash; 2026 : SEO Агентство &laquo;Точка успеха&raquo; tu.by
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
