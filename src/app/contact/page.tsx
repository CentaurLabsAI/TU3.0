import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с SEO агентством «Точка Успеха». Минск, info@tu.by, +375296299726.",
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-h1 font-bold text-foreground">Контакты</h1>
          <p className="mt-3 text-body text-muted max-w-2xl mx-auto">
            Расскажите о вашем проекте — мы предложим решение
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-h3 font-bold text-foreground mb-6">Напишите нам</h2>
            <ContactForm />
          </div>

          {/* Contact info */}
          <div>
            <h2 className="text-h3 font-bold text-foreground mb-6">Наши данные</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-small font-medium text-foreground">Адрес</p>
                  <p className="text-small text-muted">г. Минск, ул. Масюковщина 2Б, офис 90</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-small font-medium text-foreground">Телефон</p>
                  <a href="tel:+375296299726" className="text-small text-muted hover:text-primary transition-colors">
                    +375 (29) 629-97-26
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-small font-medium text-foreground">Email</p>
                  <a href="mailto:info@tu.by" className="text-small text-muted hover:text-primary transition-colors">
                    info@tu.by
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <div>
                  <p className="text-small font-medium text-foreground">Реквизиты</p>
                  <p className="text-small text-muted">ИП Кононцев, УНП: 192388517</p>
                </div>
              </div>

              {/* Social */}
              <div className="pt-4 border-t border-border">
                <p className="text-small font-medium text-foreground mb-3">Мы в соцсетях</p>
                <div className="flex gap-3">
                  <a
                    href="https://t.me/tochka_uspeha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-(--radius-md) bg-surface-sunken hover:bg-primary-light hover:text-primary text-muted transition-colors"
                    aria-label="Telegram"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/tochka-uspeha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-(--radius-md) bg-surface-sunken hover:bg-primary-light hover:text-primary text-muted transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
