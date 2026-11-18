import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с SEO агентством «Точка Успеха». Минск, info@tu.by, +375296299726.",
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto container-divi">
        {/* Simple heading + text block, matching tu.by/kontakty/ */}
        <h1 className="text-h1 font-semibold text-foreground mb-8">Контакты</h1>

        <div className="text-[16px] text-[var(--foreground-muted)] leading-[1.8] space-y-1 mb-12">
          <p>SEO агентство «Точка Успеха»</p>
          <p>г. Минск, ул. Масюковщина 2Б, офис 90</p>
          <p className="text-[var(--foreground)]">ИП Кононцев, УНП: 192388517</p>
          <p>
            телефон:{" "}
            <a href="tel:+375296299726" className="text-[#E30613] hover:underline">
              +375296299726
            </a>
          </p>
          <p>
            e-mail:{" "}
            <a href="mailto:info@tu.by" className="text-[#E30613] hover:underline">
              info@tu.by
            </a>
          </p>
        </div>

        {/* Map placeholder — Yandex Maps embed */}
        <div className="w-full h-[400px] sm:h-[500px] bg-[var(--surface)] rounded-[var(--radius-lg)] overflow-hidden mb-12">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A7d0e8c7e5c8d8f0e8c7e5c8d8f0e8c&amp;source=constructor&ll=27.487278,53.937897&z=16&pt=27.487278,53.937897,pm2rdm"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            title="Офис SEO агентства Точка Успеха на карте"
          />
        </div>

        {/* Form is now in the Footer ("Задайте вопрос прямо сейчас" section) */}
      </div>
    </div>
  );
}
