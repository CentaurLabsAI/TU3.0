# TU3.0 — Сайт SEO-агентства «Точка Успеха»

Корпоративный сайт SEO-агентства [tu.by](https://tu.by). Построен на Next.js с MDX-контентом, оптимизирован для поисковых систем.

## Технологии

- **Next.js 16** + React 19 + TypeScript 5
- **Tailwind CSS v4** + next-themes (тёмная тема)
- **MDX** — контент хранится в `content/` как `.mdx` файлы
- **Деплой** — Vercel

## Запуск локально

```bash
npm install
npm run dev
```

Сайт будет доступен на [http://localhost:3000](http://localhost:3000).

### Другие команды

```bash
npm run build    # продакшн-сборка
npm run start    # запуск продакшн-сервера
npm run lint     # проверка кода (ESLint)
```

## Структура проекта

```
src/
  app/              # Страницы (App Router)
    about/          # О компании
    blog/           # Блог (список + [slug])
    contact/        # Контакты
    courses/        # Курсы (список + [slug])
    faq/            # Часто задаваемые вопросы
    services/       # Услуги (список + [slug])
    layout.tsx      # Корневой layout
    page.tsx        # Главная страница
    robots.ts       # robots.txt
    sitemap.ts      # sitemap.xml
  components/       # UI-компоненты (Header, Footer, карточки и т.д.)
  lib/              # Утилиты для загрузки MDX-контента
content/
  blog/             # Статьи блога (.mdx)
  courses/          # Курсы и модули (.mdx)
  faq/              # FAQ (JSON)
  pages/            # Статические страницы (.mdx)
  services/         # Описания услуг (.mdx)
scripts/            # Вспомогательные скрипты (импорт из WordPress)
docs/               # Документация проекта (ADR, спецификации)
```

## Как добавлять контент

### Новая услуга

Создайте файл `content/services/my-service.mdx`:

```mdx
---
title: "Название услуги"
description: "Краткое описание для SEO"
---

Текст описания услуги в формате MDX...
```

### Новая статья в блог

Создайте файл `content/blog/my-article.mdx`:

```mdx
---
title: "Заголовок статьи"
description: "Описание для SEO"
date: "2026-04-03"
---

Текст статьи...
```

### FAQ

Отредактируйте `content/faq/faq-items.json` — добавьте новый объект с полями `question` и `answer`.

## Деплой

Сайт деплоится на **Vercel** автоматически при пуше в ветку `main`. CI (GitHub Actions) проверяет lint и build перед мержем.
