# UX Specification — tu.by (Точка Успеха)

## 1. Breakpoints & Responsive Strategy

Mobile-first approach. Breakpoints align with Tailwind defaults:

| Breakpoint | Width   | Layout behavior                        |
|------------|---------|---------------------------------------|
| Base       | < 640px | Single column, hamburger menu         |
| `sm`       | 640px   | 2-column grids, stacked hero          |
| `md`       | 768px   | Desktop navigation visible            |
| `lg`       | 1024px  | 3-column grids, wider content area    |
| `xl`       | 1280px  | Max-width container (1280px centered) |

Container: `max-w-7xl` (1280px) with `px-4 sm:px-6 lg:px-8` padding.

---

## 2. Page Layouts

### 2.1 Global Shell

```
┌─────────────────────────────────────┐
│ Header (sticky, z-50)               │
│ [Logo]  [Nav: links...]  [Theme]    │
├─────────────────────────────────────┤
│                                     │
│ <main> (flex-1)                     │
│   Page content here                 │
│                                     │
├─────────────────────────────────────┤
│ Footer                              │
│ [Info] [Nav] [Services] [Contacts]  │
│ [Copyright bar]                     │
└─────────────────────────────────────┘
```

- Body: `min-h-full flex flex-col`
- Main: `flex-1` ensures footer always at bottom
- Header becomes `bg-background/95 backdrop-blur` with shadow on scroll

### 2.2 Home Page (`/`)

```
┌─────────────────────────────────┐
│ Hero Section                    │
│ [Label: SEO агентство]          │
│ [H1: Продвигаем бизнес...]     │
│ [Subtitle]                      │
│ [CTA: Услуги] [CTA: Контакты]  │
├─────────────────────────────────┤
│ Services Grid (3 cols on lg)    │
│ [Card] [Card] [Card]           │
│ [Card] [Card] [Card]           │
├─────────────────────────────────┤
│ CTA Section                     │
│ [H2 + text + button]           │
└─────────────────────────────────┘
```

- Hero: centered, `py-20 sm:py-28 lg:py-36`
- Services: `bg-surface` background, `grid-cols-1 sm:2 lg:3`
- CTA: clean, centered, `max-w-3xl`

### 2.3 Services Listing (`/services`)

```
┌─────────────────────────────────┐
│ Page Header (H1 + description)  │
├─────────────────────────────────┤
│ Services Grid (2 cols on lg)    │
│ [Service Card with icon]  x6   │
└─────────────────────────────────┘
```

### 2.4 Service Detail (`/services/[slug]`)

```
┌─────────────────────────────────┐
│ Breadcrumbs                     │
│ [H1: Service title]             │
│ [Description]                   │
├─────────────────────────────────┤
│ MDX Content (prose styling)     │
│ max-w-3xl, typography plugin    │
├─────────────────────────────────┤
│ Related services sidebar (lg)   │
└─────────────────────────────────┘
```

### 2.5 Blog Listing (`/blog`)

```
┌─────────────────────────────────┐
│ Page Header (H1)                │
│ [Category filters]              │
├─────────────────────────────────┤
│ Post Cards Grid (2 cols on lg)  │
│ [Cover + Title + Excerpt + Date]│
└─────────────────────────────────┘
```

### 2.6 Blog Post (`/blog/[slug]`)

```
┌─────────────────────────────────┐
│ [Cover Image (full width)]      │
│ [H1: Title]                     │
│ [Meta: author, date, category]  │
├─────────────────────────────────┤
│ MDX Content (prose)             │
│ max-w-3xl centered              │
├─────────────────────────────────┤
│ [Tags list]                     │
│ [Related posts]                 │
└─────────────────────────────────┘
```

### 2.7 FAQ Page (`/faq`)

```
┌─────────────────────────────────┐
│ Page Header (H1)                │
├─────────────────────────────────┤
│ Category tabs/filter            │
├─────────────────────────────────┤
│ Accordion items                 │
│ [Question ▸] → [Answer]        │
│ [Question ▸] → [Answer]        │
└─────────────────────────────────┘
```

### 2.8 Courses (`/courses`)

```
┌─────────────────────────────────┐
│ Course Hero (title + desc)      │
├─────────────────────────────────┤
│ Module list (ordered)           │
│ [1. Module title]               │
│ [2. Module title]               │
│ ...                             │
└─────────────────────────────────┘
```

### 2.9 About (`/about`)

```
┌─────────────────────────────────┐
│ Page Header                     │
├─────────────────────────────────┤
│ Company description (MDX)       │
├─────────────────────────────────┤
│ Team Grid (2-4 cols)            │
│ [Photo + Name + Role]           │
└─────────────────────────────────┘
```

### 2.10 Contact (`/contact`)

```
┌─────────────────────────────────┐
│ Page Header                     │
├─────────────────────────────────┤
│ [Contact form]  | [Contact info]│
│  Name            Phone          │
│  Email           Address        │
│  Message         Map/Social     │
│  [Submit]                       │
└─────────────────────────────────┘
```

- Two-column on `lg`, stacked on mobile

---

## 3. Component Hierarchy

```
RootLayout
├── ThemeProvider (next-themes)
│   ├── Header
│   │   ├── Logo (SVG + text)
│   │   ├── DesktopNav (hidden < md)
│   │   ├── ThemeToggle
│   │   └── MobileMenu (hidden >= md)
│   ├── <main>
│   │   └── [Page Content]
│   └── Footer
│       ├── CompanyInfo
│       ├── NavLinks
│       ├── ServiceLinks
│       ├── ContactInfo
│       └── CopyrightBar
```

---

## 4. Color Usage Guidelines

### Primary Blue (`--primary`)
- CTA buttons, links, active states, logo
- Light theme: `#1e40af` (deep blue)
- Dark theme: `#60a5fa` (lighter blue for contrast)

### Accent Teal (`--accent`)
- Secondary highlights, labels, badges
- Light: `#0891b2` / Dark: `#22d3ee`

### Surface layers
- `--background` — page background
- `--surface` — card/section backgrounds
- `--surface-elevated` — elevated cards (hover states)
- `--surface-sunken` — input backgrounds, recessed areas

### Muted tones
- `--muted` — secondary text, icons
- `--muted-foreground` — slightly stronger secondary text
- `--border` — default borders
- `--border-strong` — emphasized borders

### Semantic colors
- `--success` green — positive indicators
- `--warning` amber — alerts, caution
- `--error` red — errors, destructive actions

---

## 5. Typography Usage

| Token        | Size  | Use case                           |
|--------------|-------|------------------------------------|
| `text-display` | 48px | Hero headings only                |
| `text-h1`     | 36px | Page titles                       |
| `text-h2`     | 30px | Section headings                  |
| `text-h3`     | 24px | Card titles, subsections          |
| `text-h4`     | 20px | Small headings, feature titles    |
| `text-body`   | 16px | Body text, paragraphs             |
| `text-small`  | 14px | Nav links, secondary text, labels |
| `text-caption` | 12px | Timestamps, copyright, fine print |

**Font stack:** Geist Sans (loaded via `next/font/google`) → Arial → Helvetica → sans-serif

**Headings:** `font-weight: 700`, `line-height: 1.2`  
**Body:** `line-height: 1.6`

---

## 6. Spacing & Rhythm

Vertical section spacing:
- Hero: `py-20 sm:py-28 lg:py-36`
- Content sections: `py-16 sm:py-20`
- Inner section gaps: `mb-12` for section headers, `gap-6` for grids

Card padding: `p-6`  
Container padding: `px-4 sm:px-6 lg:px-8`

---

## 7. Interactive States

- **Links:** `text-muted-foreground` → `text-primary` on hover
- **Buttons (primary):** `bg-primary` → `bg-primary-hover`, with `shadow-md`
- **Buttons (outline):** `border-border` → `bg-surface-sunken` on hover
- **Cards:** `border-border` → `border-primary/30` + `shadow-lg` on hover
- **Focus:** `outline: 2px solid var(--primary)` with `outline-offset: 2px`
- **Transitions:** `var(--transition-base)` (200ms) for most interactions

---

## 8. Theme Behavior

- Three modes: Light, Dark, System (OS preference)
- Implemented via `next-themes` with `attribute="class"`
- Class `.dark` on `<html>` triggers dark CSS variables
- `suppressHydrationWarning` on `<html>` prevents flash
- Theme preference persisted in `localStorage`
- Toggle cycles: Light → Dark → System → Light
