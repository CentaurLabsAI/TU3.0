# Code Review Report — TU3.0

**Date:** 2026-04-03
**Reviewer:** Code Reviewer (Claude)
**Scope:** All files in `src/`, `mdx-components.tsx`

---

## Summary

Overall quality: **Good**. The codebase is well-structured, follows Next.js 15 App Router conventions correctly, and has a clean component architecture. TypeScript is used properly throughout with `satisfies` for type safety. The design system (CSS custom properties + Tailwind v4) is consistent and dark mode works correctly.

Key issues found were around **accessibility**, **input sanitization**, **dead code**, and **performance** (double file reads). All blockers and suggestions have been fixed.

---

## Issues Found

### Red Blocker — Security: ContactForm lacks input sanitization

**File:** `src/components/ContactForm.tsx`
**Problem:** Form data was logged/submitted without any sanitization. No `maxLength` on inputs allowed arbitrarily large payloads. No `aria-describedby` linking errors to inputs.
**Fix applied:**
- Added `sanitize()` function that trims and strips `<>` characters
- Added `maxLength` to all inputs (name: 100, email: 254, message: 2000)
- Added `aria-describedby` + `aria-invalid` on each input
- Added `role="alert"` and `id` to error messages

### Red Blocker — Accessibility: FaqAccordion missing ARIA attributes

**File:** `src/components/FaqAccordion.tsx`
**Problem:** Accordion buttons had `aria-expanded` but no `aria-controls`. Panels had no `id` or `role="region"`. Screen readers couldn't associate buttons with their content.
**Fix applied:**
- Added `aria-controls` and `id` on buttons
- Added `id`, `role="region"`, `aria-labelledby` on panels

### Red Blocker — Dead code: `projects.ts` and `Project` types unused

**Files:** `src/lib/projects.ts`, `src/lib/types.ts`
**Problem:** `projects.ts` was never imported anywhere in `src/`. The `Project` and `ProjectMeta` types in `types.ts` were only used by the deleted file.
**Fix applied:**
- Deleted `src/lib/projects.ts`
- Removed `Project` and `ProjectMeta` from `src/lib/types.ts`

### Yellow Suggestion — Security: `mdx-components.tsx` spreads arbitrary props on Image

**File:** `mdx-components.tsx`
**Problem:** `{...props}` on `next/image` could pass arbitrary HTML/MDX attributes, potentially causing unexpected behavior.
**Fix applied:** Destructure only `src` and `alt`, discard rest.

### Yellow Suggestion — Performance: double file reads in `getBySlug` functions

**Files:** `src/lib/services.ts`, `src/lib/blog.ts`, `src/lib/courses.ts`
**Problem:** `getServiceBySlug()`, `getPostBySlug()`, `getCourseBySlug()` used `.find()` to locate the file (reading it once), then read the same file again to extract content. With many MDX files this doubles I/O.
**Fix applied:** Refactored all three to use a single `for...of` loop that reads each file once and returns immediately on match.

### Yellow Suggestion — Accessibility: breadcrumb separators read by screen readers

**Files:** `src/app/services/[slug]/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/courses/[slug]/page.tsx`
**Problem:** Breadcrumb `/` separator `<li>` elements were read aloud by screen readers.
**Fix applied:** Added `aria-hidden="true"` to all breadcrumb separator `<li>` elements.

---

## Nit — Observations (not fixed)

### MdxContent uses `format: "md"`

**File:** `src/components/MdxContent.tsx:13`
Content files are `.mdx` but the MDX compiler is set to `format: "md"`. This prevents JSX component usage inside MDX files. If the content is pure markdown this is fine (and safer). If you need JSX components in MDX, change to `format: "mdx"`.

### Footer has hardcoded service links

**File:** `src/components/Footer.tsx:12-19`
The service links in the footer are hardcoded rather than derived from `getAllServices()`. This means adding/removing a service requires updating the footer manually. Since the Footer is a Server Component, it could call `getAllServices()` directly. Low priority since service list changes rarely.

### `console.log` in ContactForm

**File:** `src/components/ContactForm.tsx`
The form submission just logs to console. Marked with `// TODO` — needs a real API endpoint before launch.

---

## What's Working Well

- **TypeScript usage** — Proper interfaces, `satisfies` operator, no `any` types
- **Next.js 15 conventions** — `params: Promise<{slug: string}>` with `await` is correct; `generateStaticParams` and `generateMetadata` are properly async
- **Component architecture** — Clean Server/Client split; only interactive components (`Header`, `ThemeToggle`, `FaqAccordion`, `ContactForm`) are `"use client"`
- **Dark mode** — Comprehensive CSS custom properties with `.dark` class override; `next-themes` configured correctly with `suppressHydrationWarning` on `<html>`
- **SEO** — Complete `sitemap.ts` covering all dynamic routes; `robots.ts` present; metadata on every page with template; semantic heading hierarchy throughout
- **Image optimization** — `next/image` used everywhere with proper `sizes` and `fill`; `sharp` installed; AVIF + WebP formats configured
- **Design system** — Consistent token-based approach via CSS variables + Tailwind v4 `@theme inline`; good typography scale
- **Accessibility foundations** — `lang="ru"` on html, `:focus-visible` global styles, `aria-label` on icon buttons, semantic HTML (`<article>`, `<nav>`, `<header>`, `<footer>`, `<main>`, `<time>`)

---

## Changes Made

| File | Change |
|------|--------|
| `src/components/FaqAccordion.tsx` | Added `aria-controls`, `id`, `role="region"`, `aria-labelledby` |
| `src/components/ContactForm.tsx` | Added `sanitize()`, `maxLength`, `aria-describedby`, `aria-invalid`, `role="alert"` |
| `src/app/services/[slug]/page.tsx` | Added `aria-hidden="true"` to breadcrumb separators |
| `src/app/blog/[slug]/page.tsx` | Added `aria-hidden="true"` to breadcrumb separators |
| `src/app/courses/[slug]/page.tsx` | Added `aria-hidden="true"` to breadcrumb separators |
| `mdx-components.tsx` | Removed `{...props}` spread on `next/image` |
| `src/lib/services.ts` | Refactored `getServiceBySlug` — single file read |
| `src/lib/blog.ts` | Refactored `getPostBySlug` — single file read |
| `src/lib/courses.ts` | Refactored `getCourseBySlug` — single file read |
| `src/lib/projects.ts` | **Deleted** (unused) |
| `src/lib/types.ts` | Removed `Project` and `ProjectMeta` types (unused) |
