# TU3.0 — Actual Site Structure

> Updated after analyzing WordPress XML export. This is an SEO AGENCY site, not a portfolio.

## Site: tu.by — SEO Агентство "Точка Успеха"

### Navigation Structure

```
Главная (/)
├── Услуги (/services)
│   ├── SEO Аудит (/services/seo-audit)
│   ├── SEO Продвижение (/services/seo-prodvizhenie)
│   ├── Контент-план (/services/kontent-plan)
│   ├── SEO Дашборды (/services/sozdanie-seo-dashbordov)
│   ├── Миграция сайта (/services/migracziya-sajta)
│   └── Семантическое ядро (/services/semanticheskoe-yadro)
├── Блог (/blog)
│   ├── Статья 1 (/blog/alexey-dubrovskiy-ai-ghost)
│   └── Статья 2 (/blog/mikrorazmetka-schema-org)
├── AI Курсы (/courses)
│   ├── AI Main (/courses/ai-main)
│   └── Модули 1-7 (/courses/ai-module-1..7)
├── FAQ (/faq)
├── О нас (/about)
└── Контакты (/contact)
```

### Content Types

| Type | Storage | Count |
|------|---------|-------|
| Services | `content/services/*.mdx` | 6 |
| Blog posts | `content/blog/*.mdx` | 2+ |
| FAQ | `content/faq/faq-items.json` | 20 |
| AI Courses | `content/courses/*.mdx` | 8 |
| Static pages | `content/pages/*.mdx` | 3 (home, about, contact) |

### Team
- Кононцев Владимир — owner
- Надежда
- Евгений  
- Настя Ворса

### Categories
- Искусственный интеллект
- Техническое SEO
