# AGENT TASK: Design Audit & Modernization Sprint

> Вставь этот промпт в новое контекстное окно Claude Code.
> Перед запуском убедись что `npm run dev` работает на localhost:3000.

---

## ПРОМПТ ДЛЯ НОВОГО ОКНА

```
Ты — NEXUS-оркестратор дизайн-аудита сайта TU3.0 (SEO-агентство "Точка Успеха").

## Контекст

Сайт мигрирован с WordPress/Divi на Next.js 16. Первая итерация дизайна уже сделана:
- Шрифт заменён на Mulish (из Open Sans)
- Primary color заменён на #E30613 (красный, из синего #2EA3F2)
- Header перестроен на sidebar slide-in меню
- Кнопки — pill shape (border-radius: 40px), uppercase, weight 700
- Контейнер — max-width 1440px, width calc(100% - 300px)

Но визуальное соответствие оригиналу tu.by ещё не проверено.

## Твои задачи

### ШАГ 1: Evidence Collection (Playwright MCP)

Используй Playwright MCP инструменты для визуального сравнения.

**1A. Скриншоты оригинала tu.by:**
Открой браузер и сделай скриншоты следующих страниц на tu.by:
- https://tu.by/ (главная)
- https://tu.by/uslugi/ (услуги)
- https://tu.by/blog/ (блог)
- https://tu.by/kontakty/ (контакты)

Для каждой страницы:
1. `browser_navigate` → URL
2. `browser_take_screenshot` → сохрани
3. `browser_snapshot` → получи accessibility tree для структурного анализа

**1B. Скриншоты текущей разработки:**
Открой те же страницы на localhost:3000:
- http://localhost:3000/
- http://localhost:3000/services
- http://localhost:3000/blog
- http://localhost:3000/contact

Для каждой сделай те же 3 шага.

**1C. Мобильная версия:**
Используй `browser_resize` с width=375, height=812 (iPhone) и повтори скриншоты для:
- tu.by главная
- localhost:3000 главная

### ШАГ 2: UX Architect — Анализ и План

После сбора скриншотов, переключись в роль UX Architect (из .agency-agents/design/design-ux-architect.md).

Прочитай:
- `reference/divi/divi-child/style.css` (первые 500 строк) — источник правды по дизайну
- `src/app/globals.css` — текущие дизайн-токены
- `.claude/skills/frontend-design.md` и `.claude/skills/ui-ux-pro-max.md` — навыки дизайнера

Построй **DESIGN AUDIT REPORT** в формате:

```markdown
# Design Audit Report — TU3.0 vs tu.by

## Общая оценка: X/10

## Критические расхождения (блокируют релиз)
| # | Компонент | Что не так | Как в оригинале | Файл для фикса |
|---|-----------|-----------|-----------------|-----------------|

## Средние расхождения (важно, но не блокирует)
| # | Компонент | Что не так | Как в оригинале | Файл для фикса |

## Мелкие доработки (polish)
| # | Компонент | Что не так | Как в оригинале | Файл для фикса |
```

### ШАГ 3: Создай Sub-Agent Tasks

На основе аудита, создай конкретные задачи для параллельных агентов.
Каждая задача — это промпт для **нового контекстного окна** Claude Code.

Формат каждой задачи:

```markdown
## AGENT-TASK-{N}: {Название}
**Роль**: {UI Designer / Frontend Developer / Brand Guardian}
**Приоритет**: {Critical / Medium / Low}
**Файлы для изменения**: {список файлов}

### Что сделать:
{Конкретные инструкции с точными CSS-значениями из child-темы}

### Критерии приёмки:
{Как проверить что задача выполнена}

### Референсы:
- Скриншот оригинала: {описание что на скриншоте}
- CSS из child-темы: {конкретные строки}
```

Сохрани все задачи в файл `DESIGN-SPRINT-TASKS.md` в корне проекта.

### ШАГ 4: Начни выполнение критических задач

После создания плана, начни выполнять задачи с приоритетом **Critical** самостоятельно.
Используй скиллы дизайнера при работе над UI:
- Вызови `/frontend-design` для компонентов
- Вызови `/design` для общих дизайн-решений
- Базируйся на `reference/divi/divi-child/style.css` как источнике правды

## Ключевые файлы проекта

```
reference/divi/divi-child/style.css  — ГЛАВНЫЙ CSS child-темы (источник правды)
reference/divi/divi-child/theme-header.php — кастомный header WordPress
reference/api/pages.json             — контент 23 страниц
reference/api/seo-metadata.json      — Yoast SEO данные

src/app/globals.css                  — дизайн-токены (уже обновлены)
src/app/layout.tsx                   — layout с Mulish шрифтом
src/app/page.tsx                     — главная страница
src/components/Header.tsx            — header с sidebar меню
src/components/Footer.tsx            — footer
src/components/ServiceCard.tsx       — карточка услуги
src/components/BlogCard.tsx          — карточка блога
src/components/FaqAccordion.tsx      — аккордеон FAQ
src/components/ContactForm.tsx       — форма контактов

.claude/skills/                      — скиллы дизайнера (6 файлов)
.agency-agents/design/               — определения design-агентов
```

## Дизайн-токены из child-темы (уже применены, проверь):

```
Шрифт:      Mulish, weight 300 (body), 600 (headings), 700 (buttons)
Primary:    #E30613 (красный)
Ссылки:     #E30613
H2:         35px / 600 / line-height: 1.4em / margin-bottom: 20px
H3:         20px / 600
Кнопки:     border-radius: 40px, uppercase, 700, Mulish, padding: 4px 40px
Контейнер:  max-width: 1440px, width: calc(100% - 300px)
Header:     sidebar slide-in справа, 400px, email | "Меню" toggle
Nav links:  22px, 600, Mulish, hover → #e30613 + translateX(10px)
Footer bg:  #333333
```

## Правила

1. **Evidence-first**: не делай предположений, сначала смотри скриншоты
2. **Child CSS = источник правды**: если сомневаешься, смотри `reference/divi/divi-child/style.css`
3. **Не ломай что работает**: `npm run build` должен проходить после каждого изменения
4. **Не трогай контент**: content/*.mdx файлы уже хорошие
5. **Max 3 итерации**: на каждую задачу максимум 3 попытки фикса
```

---

## Как использовать

1. Запусти `npm run dev` в терминале
2. Открой **новое окно** Claude Code
3. Вставь промпт выше (всё что между тройными бэктиками)
4. Агент начнёт с визуального аудита через Playwright, затем создаст план и выполнит критические задачи
