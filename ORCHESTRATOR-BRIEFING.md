# ORCHESTRATOR BRIEFING — TU3.0 Redesign Sprint

> Этот документ — стартовая точка для оркестратора. Прочитай его перед началом работы.

## Ситуация

Сайт SEO-агентства "Точка Успеха" (tu.by) мигрируется с WordPress/Divi на Next.js 16.
Первая итерация создала рабочий каркас, но **дизайн не соответствует оригиналу** — использовались неправильные шрифты, цвета, компоненты.

Теперь у нас есть:
- **FTP-доступ** к WordPress (скачана Divi-тема + child-тема)
- **Реальный CSS** child-темы с точными значениями дизайна
- **REST API данные** — все 23 страницы + 4 поста + SEO-метаданные
- **Скиллы дизайнера** установлены в `.claude/skills/`
- **Playwright MCP** настроен в `.mcp.json`

## Критические дизайн-значения (из child-темы)

```
Шрифт:     Mulish (NOT Open Sans)
Accent:    #E30613 (RED, NOT blue #2EA3F2)
Body:      font-weight: 300
Headings:  font-weight: 600
H2:        35px / 600 / line-height: 1.4em
H3:        20px / 600  
Кнопки:    border-radius: 40-100px, uppercase, 700, Mulish
Контейнер: max-width: 1440px, width: calc(100% - 300px)
Навигация: sidebar slide-in справа (НЕ горизонтальное меню!)
Ссылки:    color: #E30613
```

Полный CSS child-темы: `reference/divi/divi-child/style.css` (~1500 строк)

## Файлы для работы

```
reference/
  divi/Divi/style.min.css          — Divi base CSS (26KB)
  divi/Divi/style-static.min.css   — Divi modules CSS (824KB)
  divi/divi-child/style.css        — ГЛАВНЫЙ ФАЙЛ — child-тема со всеми кастомными стилями
  divi/divi-child/functions.php    — PHP-функции child-темы
  divi/divi-child/theme-header.php — кастомный header
  api/pages.json                   — 23 страницы (content.rendered = готовый HTML)
  api/posts.json                   — 4 блог-поста
  api/seo-metadata.json            — Yoast SEO данные
  
public/images/                     — 44 скачанных изображения
public/fonts/centurygothic.ttf     — кастомный шрифт с сервера

.claude/skills/                    — скиллы дизайнера
  frontend-design.md               — Anthropic frontend-design skill
  ui-ux-pro-max.md                 — UI/UX Pro Max reasoning engine
  design-system.md                 — Design system generator
  design.md                        — General design skill
  brand.md                         — Brand consistency skill
  ui-styling.md                    — UI styling skill
```

## План работы оркестратора

### Шаг 1: Построить Sprint Plan
Прочитай `.agency-agents/strategy/QUICKSTART.md` и активируй **NEXUS-Sprint** режим.
Назначь агентов на задачи:

### Шаг 2: Запустить агентов последовательно

**Волна 1 — Дизайн-система** (блокирует всё остальное):
| # | Агент | Задача | Вход | Выход |
|---|-------|--------|------|-------|
| 1 | **UX Architect** | Разобрать `divi-child/style.css`, извлечь ВСЕ токены | `reference/divi/divi-child/style.css` | `src/app/globals.css` обновлённый |
| 2 | **UI Designer** | Создать component mapping, specs | child CSS + globals.css | `docs/component-specs.md` |

**Волна 2 — Компоненты** (параллельно):
| # | Агент | Задача | Вход | Выход |
|---|-------|--------|------|-------|
| 3 | **Frontend Dev** | Header (sidebar menu, logo, Mulish) | child CSS + theme-header.php | `src/components/Header.tsx` |
| 4 | **Frontend Dev** | Footer + все карточки | child CSS | `src/components/Footer.tsx`, ServiceCard, BlogCard |
| 5 | **Frontend Dev** | Главная страница + новые компоненты | `api/pages.json` (slug: home) + child CSS | `src/app/page.tsx` |

**Волна 3 — Контент + Страницы** (параллельно):
| # | Агент | Задача | Вход | Выход |
|---|-------|--------|------|-------|
| 6 | **Frontend Dev** | Улучшить Divi-парсер + пере-экспорт контента | `api/pages.json` + XML | `content/pages/*.mdx` |
| 7 | **Frontend Dev** | Все оставшиеся страницы | globals.css + компоненты | `src/app/*/page.tsx` |

**Волна 4 — SEO** :
| # | Агент | Задача | Вход | Выход |
|---|-------|--------|------|-------|
| 8 | **SEO Specialist** | Meta из Yoast, JSON-LD, sitemap | `api/seo-metadata.json` | metadata в каждой странице |

**Волна 5 — QA** :
| # | Агент | Задача | Вход | Выход |
|---|-------|--------|------|-------|
| 9 | **Evidence Collector** | Playwright скриншоты tu.by vs localhost | Playwright MCP | Скриншоты + отчёт |
| 10 | **Brand Guardian** | Визуальное сравнение, чеклист | Скриншоты | PASS/NEEDS WORK |

### Шаг 3: Dev↔QA Loop
Если Evidence Collector находит проблемы → назначить Frontend Dev на фикс → повторить QA.
Максимум 3 итерации на задачу.

### Шаг 4: Финальная сборка
- `npm run build` — без ошибок
- `npm run lint` — без предупреждений
- Git commit + push

## Как использовать скиллы дизайнера

При работе над дизайном, агент-дизайнер должен:
1. Вызвать `/frontend-design` или `/design` — для создания визуально выдающихся компонентов
2. Вызвать `/ui-ux-pro-max` — для генерации дизайн-системы с учётом индустрии (SEO agency)
3. Вызвать `/design-system` — для создания согласованных токенов
4. **НО**: базироваться на `reference/divi/divi-child/style.css` как источнике правды для цветов, шрифтов, отступов

## FTP доступ (если нужно скачать ещё файлы)

```
Host: tu.by
User: pixtheme@tu.by
Pass: @M1sVMgH1a][]e?M
Path: /home/vobrazby/tu.by
```

## Не трогать

- `content/services/*.mdx` — уже хорошие
- `content/blog/*.mdx` — уже хорошие  
- `content/faq/faq-items.json` — уже хороший
- `content/courses/**/*.mdx` — уже хорошие
- `scripts/` — утилиты, не часть сайта
- `.agency-agents/` — определения агентов, не часть сайта
