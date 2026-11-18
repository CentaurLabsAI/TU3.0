import Link from "next/link";
import Image from "next/image";
import { getAllServices } from "@/lib/services";
import { ServiceListItem } from "@/components/ServiceListItem";
import { HeroContactForm } from "@/components/HeroContactForm";

const clientLogos = [
  { name: "jrdunn", alt: "JRDunn" },
  { name: "50", alt: "50" },
  { name: "massive", alt: "Massive" },
  { name: "sila", alt: "Sila" },
  { name: "oma", alt: "ОМА" },
];

const partnerLogos = [
  { name: "paxento", alt: "Paxento" },
  { name: "m207", alt: "M207" },
];

const reviews = [
  {
    text: "Сотрудничаем с Владимиром с 2015 года, и за это время он проявил себя как специалист высокого уровня в разных крупных e-commerce проектах. Владимир отлично показал себя не только в SEO, но и как руководитель, проектировщик и специалист по UX. Все задачи, в которых участвовал Владимир, были успешно реализованы и привели к значительному росту поискового трафика. Рекомендую его как профессионала своего дела!",
    author: "Илья Гурков",
    role: "Global Marketing Director, Sam Solutions",
  },
  {
    text: "Мы были очень впечатлены работой Владимира по семантическому ядру для одного из наших проектов. Он нашел реальные точки роста и идеи для развития нашего бизнеса, о которых мы даже не задумывались. Все было выполнено точно и в срок. Рекомендую.",
    author: "Ян Гардиан",
    role: "Marketing Consultant | Full-Stack Developer",
  },
  {
    text: "Было приятно и комфортно работать с Владимиром над несколькими проектами. Он тщательно прорабатывал требования и пожелания клиентов, приходил на встречи подготовленным, подробно объяснял принятые решения и возможные сложности, внимательно относился к обратной связи от коллег и клиентов. Клиенты благодарили его за реализованные успешные проекты. Рекомендую Владимира как высококлассного специалиста!",
    author: "Константин Конюхов",
    role: "Teamlead / React.js & PHP Software Developer",
  },
  {
    text: "Владимир всегда внимательно подходит к требованиям и пожеланиям, быстро отвечает на запросы и соблюдает все сроки. Его профессионализм и внимательность к деталям обеспечивают успех нашим проектам. Рекомендую Владимира как компетентного и надежного специалиста.",
    author: "Сергей Панкевич",
    role: "Head of Development at Paxento, Ltd",
  },
];

export default function Home() {
  const services = getAllServices();

  return (
    <div className="flex flex-col">
      {/* ===== 1. Hero: heading + contact form ===== */}
      <section className="pt-[90px] pb-16 sm:pt-[100px] sm:pb-20 px-4 sm:px-6 lg:px-8 bg-[var(--background)]">
        <div className="mx-auto container-divi">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h1 className="text-[30px] font-light text-[var(--foreground)] leading-tight">
                Бутиковое SEO
                <strong className="block text-[50px] font-semibold leading-[1.4em] pb-5">
                  агентство
                </strong>
              </h1>
              <p className="text-[16px] text-[var(--foreground-muted)] leading-relaxed max-w-md">
                Не используем шаблонные решения, а&nbsp;подбираем стратегию под ваши цели и&nbsp;амбиции.
              </p>
            </div>
            <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] p-6 sm:p-8">
              <h2 className="text-[22px] font-semibold text-[var(--foreground)] mb-4">
                Обсудить проект
              </h2>
              <HeroContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Photo with red circle overlay ===== */}
      <section className="relative h-[350px] sm:h-[450px] lg:h-[700px] overflow-hidden">
        <Image
          src="/images/hero/homepage-cover.jpg"
          alt="SEO агентство Точка Успеха"
          fill
          className="object-cover"
          priority
        />
        {/* Red circle accent — signature tu.by visual element */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[350px] lg:h-[350px] rounded-full bg-[#E30613] opacity-90" />
        </div>
      </section>

      {/* ===== 2. "Услуги SEO продвижения для:" — who we serve ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto container-divi">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h2 className="text-h2 font-semibold text-foreground mb-6">
                Услуги SEO продвижения для:
              </h2>
              <ul className="space-y-2 text-[16px] text-[var(--foreground-muted)] leading-relaxed">
                <li className="relative pl-8 before:absolute before:left-0 before:top-[12px] before:w-[14px] before:h-[1px] before:bg-foreground">интернет-магазинов</li>
                <li className="relative pl-8 before:absolute before:left-0 before:top-[12px] before:w-[14px] before:h-[1px] before:bg-foreground">компаний B2C, продающих услуги через сайт</li>
                <li className="relative pl-8 before:absolute before:left-0 before:top-[12px] before:w-[14px] before:h-[1px] before:bg-foreground">платформ B2B</li>
                <li className="relative pl-8 before:absolute before:left-0 before:top-[12px] before:w-[14px] before:h-[1px] before:bg-foreground">профессиональных и корпоративных блогов</li>
              </ul>
            </div>
            <div className="text-[15px] text-[var(--foreground-muted)] leading-[1.8] space-y-4">
              <p>Экспертная поддержка на всех этапах SEO: от консультаций и аудита до наращивания ссылочной массы.</p>
              <p>Разработка стратегии, учитывающей особенности вашего бизнеса и целевой аудитории.</p>
              <p>Профессиональная поддержка: коммуникация и координация работы разработчиков, настройка удобной и понятной для вас аналитики, SEO дашбордов.</p>
              <p>Надежные методы: гарантируем белое SEO и строгое соблюдение рекомендаций поисковых систем.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. Услуги — list with "Подробнее >" ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="mx-auto container-divi">
          <h2 className="text-h2 font-semibold text-foreground mb-10">Услуги</h2>
          <div className="flex flex-col">
            {services.map((service) => (
              <ServiceListItem key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. Этапы SEO — photo + accordion-style steps ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto container-divi">
          <h2 className="text-h2 font-semibold text-foreground mb-10">
            Этапы поисковой оптимизации в&nbsp;SEO агентстве:
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="relative">
              <Image
                src="/images/hero/steps-to-collaboration.jpg"
                alt="Рабочий ноутбук SEO специалиста"
                width={600}
                height={400}
                className="w-full h-auto"
              />
              {/* Step numbers overlaid */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-[16px] font-semibold text-foreground">
                  <span className="text-[#E30613] text-[20px]">1</span> Аудит
                </div>
                <div className="flex items-center gap-3 text-[16px] font-semibold text-foreground">
                  <span className="text-[#E30613] text-[20px]">2</span> Оптимизация и развитие контента
                </div>
                <div className="flex items-center gap-3 text-[16px] font-semibold text-foreground">
                  <span className="text-[#E30613] text-[20px]">3</span> Линкбилдинг
                </div>
                <div className="flex items-center gap-3 text-[16px] font-semibold text-foreground">
                  <span className="text-[#E30613] text-[20px]">4</span> Консультации и SEO поддержка
                </div>
              </div>
            </div>
            <div className="text-[15px] text-[var(--foreground-muted)] leading-[1.8] space-y-4">
              <p>
                Начинаем с аудита, аналитики, консультаций и анализа ниши.
                Координируем работу копирайтеров и разработчиков.
                Занимаемся комплексной оптимизацией сайта, расширением и
                улучшением контента, контентным маркетингом и линкбилдингом.
              </p>
              <p>
                Все, что мы делаем, направлено на достижение бизнес-целей вашей компании.
              </p>
              <Link href="/contact" className="btn-primary inline-block mt-4">
                Свяжитесь с нами
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. О нас / Команда ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="mx-auto container-divi">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-semibold text-foreground">О нас</h2>
            <p className="mt-3 text-[15px] text-[var(--foreground-muted)] max-w-2xl mx-auto">
              Доверяя заботу о вашем бренде, продукте или сайте, важно знать,
              с&nbsp;кем вы имеете дело. Давайте познакомимся поближе!
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Vladimir */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Image
                src="/images/team/photo_kononcev.png"
                alt="Кононцев Владимир"
                width={180}
                height={180}
                className="rounded-full shrink-0 w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] object-cover"
              />
              <div>
                <h3 className="text-[22px] font-semibold text-foreground mb-2">Кононцев Владимир</h3>
                <p className="text-[14px] text-[var(--foreground-muted)] leading-[1.7]">
                  Практикующий специалист в&nbsp;SEO с&nbsp;2009 года, специализирующийся на крупных E-commerce
                  проектах. Мой опыт включает успешное увеличение трафика, антикризисное SEO, а&nbsp;также
                  полный цикл работы с&nbsp;интернет-магазинами: от&nbsp;проектирования и&nbsp;запуска до
                  достижения стабильной лидогенерации из&nbsp;органического трафика. Реализовал проекты
                  в&nbsp;России, Беларуси, США и&nbsp;Европе.
                </p>
              </div>
            </div>
            {/* Saleyeva */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Image
                src="/images/team/photo_saleyeva.png"
                alt="Салеева"
                width={180}
                height={180}
                className="rounded-full shrink-0 w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] object-cover"
              />
              <div>
                <h3 className="text-[22px] font-semibold text-foreground mb-2">Команда</h3>
                <p className="text-[14px] text-[var(--foreground-muted)] leading-[1.7]">
                  Наша команда — это эксперты в SEO, аналитике, контент-маркетинге и
                  технической оптимизации. Мы работаем вместе, чтобы обеспечить
                  комплексный подход к продвижению вашего бизнеса.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. Партнёры + Клиенты ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto container-divi">
          {/* Partners */}
          <h2 className="text-h2 font-semibold text-foreground mb-8">Наши партнёры</h2>
          <div className="flex flex-wrap items-center gap-8 mb-16">
            {partnerLogos.map((p) => (
              <div key={p.name} className="w-[140px] h-[60px] relative">
                <Image
                  src={`/images/partners/logo-partner-${p.name}.jpg`}
                  alt={`логотип партнера ${p.alt}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Clients */}
          <h2 className="text-h2 font-semibold text-foreground mb-8">Наши клиенты</h2>
          <div className="flex flex-wrap items-center gap-8">
            {clientLogos.map((c) => (
              <div key={c.name} className="w-[120px] h-[60px] relative grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all">
                <Image
                  src={`/images/clients/logo-client-${c.name}.jpg`}
                  alt={`логотип клиента ${c.alt}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. Отзывы ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="mx-auto container-divi">
          <h2 className="text-h2 font-semibold text-foreground mb-10">Отзывы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <div key={review.author} className="bg-[var(--background)] p-6 sm:p-8 rounded-[var(--radius-lg)]">
                <p className="text-[14px] text-[var(--foreground-muted)] leading-[1.7] mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div>
                  <p className="text-[16px] font-semibold text-foreground">{review.author}</p>
                  <p className="text-[13px] text-[var(--muted)]">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
