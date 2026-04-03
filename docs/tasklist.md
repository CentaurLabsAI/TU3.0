# TU3.0 — Task List

> Portfolio Website Migration: WordPress → Next.js 15 + MDX
> Generated from project specification in CLAUDE.md

---

## Phase 1: Foundation

### TASK-1.1: Project Initialization
- **Specialist**: Software Architect
- **Description**: Initialize Next.js 15 project with App Router and TypeScript. Install core dependencies: `tailwindcss`, `@tailwindcss/typography`, `next-mdx-remote`, `gray-matter`.
- **Acceptance Criteria**:
  - `npx create-next-app@latest` executed with App Router, TypeScript, Tailwind CSS
  - All dependencies from tech stack installed and listed in `package.json`
  - `npm run dev` starts without errors
  - TypeScript strict mode enabled in `tsconfig.json`
- **Files to create**: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`
- **Dependencies**: None

### TASK-1.2: Directory Structure & Base Configuration
- **Specialist**: Software Architect
- **Description**: Create project directory structure per spec. Configure Tailwind v4 with typography plugin. Create base layout and `mdx-components.tsx`.
- **Acceptance Criteria**:
  - Directories exist: `content/projects/`, `public/images/projects/`, `src/app/`, `src/components/`, `src/lib/`, `scripts/`, `docs/`
  - Tailwind configured with `@tailwindcss/typography`
  - `mdx-components.tsx` created at project root with basic MDX-to-React mapping
  - Root layout (`src/app/layout.tsx`) renders children with HTML lang attribute
- **Files to create**: `src/app/layout.tsx`, `mdx-components.tsx`, `src/app/globals.css`
- **Files to edit**: `tailwind.config.ts`
- **Dependencies**: TASK-1.1

### TASK-1.3: TypeScript Types & Data Layer
- **Specialist**: Software Architect
- **Description**: Define TypeScript interfaces for Project (matching frontmatter fields from spec). Create utility functions to read MDX files from `content/projects/`, parse frontmatter with `gray-matter`, and return typed data.
- **Acceptance Criteria**:
  - `Project` type includes all frontmatter fields: `title`, `slug`, `date`, `category`, `tags`, `excerpt`, `coverImage`, `gallery`, `client`, `year`, `featured`, `order`
  - `getAllProjects()` — returns sorted list of all projects
  - `getProjectBySlug(slug)` — returns single project with parsed MDX content
  - `getCategories()` — returns unique categories from all projects
  - Functions handle missing files gracefully
- **Files to create**: `src/lib/types.ts`, `src/lib/projects.ts`
- **Dependencies**: TASK-1.2

### TASK-1.4: Architecture Decision Records
- **Specialist**: Software Architect
- **Description**: Document key architectural decisions: why Next.js App Router, why MDX over CMS, content structure approach, image handling strategy.
- **Acceptance Criteria**:
  - ADR files created with decision, context, and consequences
  - Covers: framework choice, content format, deployment platform
- **Files to create**: `docs/adr/001-nextjs-app-router.md`, `docs/adr/002-mdx-content.md`, `docs/adr/003-vercel-deploy.md`
- **Dependencies**: TASK-1.1

---

## Phase 2: Content

### TASK-2.1: WordPress Export Script
- **Specialist**: CMS Developer
- **Description**: Create a Node.js script that exports WordPress posts/projects to MDX files with correct frontmatter structure. Script reads from WordPress export XML and generates MDX files in `content/projects/`.
- **Acceptance Criteria**:
  - Script parses WordPress XML export
  - Generates `.mdx` files with frontmatter matching `Project` type
  - Preserves content formatting (headings, paragraphs, lists, links)
  - Downloads and saves images to `public/images/projects/`
  - Running script produces valid MDX files parseable by `gray-matter`
- **Files to create**: `scripts/wp-export.js`
- **Dependencies**: TASK-1.3

### TASK-2.2: Sample Content & Content Validation
- **Specialist**: CMS Developer
- **Description**: Create 2–3 sample MDX project files for development and testing. Validate that data layer functions correctly parse them.
- **Acceptance Criteria**:
  - At least 2 sample `.mdx` files in `content/projects/` with all frontmatter fields filled
  - Sample images placed in `public/images/projects/`
  - `getAllProjects()` and `getProjectBySlug()` return correct data for samples
  - At least one project has `featured: true`
- **Files to create**: `content/projects/sample-project-1.mdx`, `content/projects/sample-project-2.mdx`
- **Dependencies**: TASK-1.3

---

## Phase 3: Design

### TASK-3.1: Design Tokens & Tailwind Theme
- **Specialist**: UX Architect
- **Description**: Configure Tailwind theme with color palette (light and dark), typography scale, spacing, breakpoints for responsive mobile-first design.
- **Acceptance Criteria**:
  - Light and dark color schemes defined in Tailwind config
  - Typography scale suitable for portfolio (headings, body, captions)
  - Breakpoints configured for mobile-first: `sm`, `md`, `lg`, `xl`
  - CSS custom properties set up for theme switching
- **Files to edit**: `tailwind.config.ts`, `src/app/globals.css`
- **Dependencies**: TASK-1.2

### TASK-3.2: Layout Components — Header & Footer
- **Specialist**: UX Architect
- **Description**: Create Header component with site navigation (Home, Portfolio, About, Contact) and Footer component with social links. Both must be responsive with mobile hamburger menu.
- **Acceptance Criteria**:
  - Header renders navigation links to all 5 pages
  - Mobile: hamburger menu toggles navigation
  - Desktop: horizontal nav bar
  - Footer displays social links
  - Header and Footer integrated into root layout
- **Files to create**: `src/components/Header.tsx`, `src/components/Footer.tsx`
- **Files to edit**: `src/app/layout.tsx`
- **Dependencies**: TASK-3.1

### TASK-3.3: Theme Toggle (Light/Dark)
- **Specialist**: UX Architect
- **Description**: Implement light/dark theme toggle. Persist user preference in `localStorage`. Respect `prefers-color-scheme` as default.
- **Acceptance Criteria**:
  - Toggle button in Header switches between light and dark themes
  - Theme persists across page reloads via `localStorage`
  - Default follows system `prefers-color-scheme`
  - No flash of wrong theme on load (use `<script>` in `<head>` or `next-themes`)
  - All components respect current theme
- **Files to create**: `src/components/ThemeToggle.tsx`, `src/components/ThemeProvider.tsx`
- **Files to edit**: `src/app/layout.tsx`, `src/components/Header.tsx`
- **Dependencies**: TASK-3.1, TASK-3.2

### TASK-3.4: UI Component — Project Card
- **Specialist**: UI Designer
- **Description**: Create a reusable ProjectCard component that displays: cover image (via `next/image`), title, category, excerpt. Used in Portfolio grid and featured projects on Home.
- **Acceptance Criteria**:
  - Renders cover image with `next/image` and proper `sizes` attribute
  - Shows title, category badge, and excerpt
  - Links to `/portfolio/[slug]`
  - Responsive: looks good on mobile and desktop
  - Hover state for interactivity
- **Files to create**: `src/components/ProjectCard.tsx`
- **Dependencies**: TASK-1.3, TASK-3.1

### TASK-3.5: UI Component — Image Gallery
- **Specialist**: UI Designer
- **Description**: Create an ImageGallery component for project detail pages. Displays project `gallery` images in a responsive grid with lightbox or modal on click.
- **Acceptance Criteria**:
  - Renders array of image paths in responsive grid
  - All images use `next/image` with proper sizing
  - Click opens larger image view (modal/lightbox)
  - Navigable with keyboard (Escape to close)
  - Works on mobile (touch-friendly)
- **Files to create**: `src/components/ImageGallery.tsx`
- **Dependencies**: TASK-3.1

### TASK-3.6: UI Component — Contact Form
- **Specialist**: UI Designer
- **Description**: Create ContactForm component with fields: name, email, message. Client-side validation. Form submission handler (can be API route or external service).
- **Acceptance Criteria**:
  - Three fields: name (required), email (required, validated), message (required)
  - Client-side validation with error messages
  - Submit button with loading state
  - Success/error feedback after submission
  - Accessible: labels, aria attributes, focus management
- **Files to create**: `src/components/ContactForm.tsx`
- **Dependencies**: TASK-3.1

### TASK-3.7: UI Component — Category Filter
- **Specialist**: UI Designer
- **Description**: Create CategoryFilter component for Portfolio page. Displays category buttons, filters projects by category without page reload.
- **Acceptance Criteria**:
  - Renders list of categories from project data
  - "All" option to show all projects
  - Active category is visually highlighted
  - Filtering is instant (client-side)
  - Updates URL search params for shareability
- **Files to create**: `src/components/CategoryFilter.tsx`
- **Dependencies**: TASK-1.3, TASK-3.1

---

## Phase 4: Implementation

### TASK-4.1: Home Page
- **Specialist**: Frontend Developer
- **Description**: Implement Home page with: hero section (heading, tagline, CTA button), featured projects grid (projects with `featured: true`), about teaser section with link to About page.
- **Acceptance Criteria**:
  - Hero section with heading, short description, CTA linking to Portfolio
  - Featured projects section showing `ProjectCard` for each `featured: true` project
  - About teaser with brief text and "Learn more" link to `/about`
  - Responsive layout, mobile-first
  - `generateMetadata` exports page title and description
- **Files to create**: `src/app/page.tsx`
- **Dependencies**: TASK-3.2, TASK-3.4, TASK-2.2

### TASK-4.2: Portfolio Page
- **Specialist**: Frontend Developer
- **Description**: Implement Portfolio page with responsive grid of all ProjectCards and CategoryFilter. Grid adapts columns by breakpoint.
- **Acceptance Criteria**:
  - Displays all projects in responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
  - CategoryFilter filters displayed projects
  - Projects sorted by `order` field, then by `date`
  - `generateMetadata` exports page title and description
  - Empty state when no projects match filter
- **Files to create**: `src/app/portfolio/page.tsx`
- **Dependencies**: TASK-3.4, TASK-3.7, TASK-2.2

### TASK-4.3: Project Detail Page
- **Specialist**: Frontend Developer
- **Description**: Implement dynamic project detail page at `/portfolio/[slug]`. Renders full MDX content via `next-mdx-remote`, image gallery, and project metadata (client, year, category, tags).
- **Acceptance Criteria**:
  - Dynamic route `[slug]` resolves project by slug
  - MDX content rendered with `next-mdx-remote` and custom components from `mdx-components.tsx`
  - Project metadata displayed: client, year, category, tags
  - ImageGallery component renders `gallery` images
  - `generateStaticParams` generates paths for all projects
  - `generateMetadata` returns project-specific title, description, OG image
  - 404 for unknown slugs
- **Files to create**: `src/app/portfolio/[slug]/page.tsx`
- **Dependencies**: TASK-1.3, TASK-3.5, TASK-2.2

### TASK-4.4: About Page
- **Specialist**: Frontend Developer
- **Description**: Implement About page with: photo (via `next/image`), biography text, skills list.
- **Acceptance Criteria**:
  - Photo displayed with `next/image`
  - Bio section with formatted text
  - Skills displayed as list or tags
  - Responsive layout
  - `generateMetadata` exports page title and description
- **Files to create**: `src/app/about/page.tsx`
- **Dependencies**: TASK-3.2

### TASK-4.5: Contact Page
- **Specialist**: Frontend Developer
- **Description**: Implement Contact page with ContactForm component and social links section.
- **Acceptance Criteria**:
  - ContactForm rendered and functional
  - Social links displayed (icons + URLs)
  - Form submission handled (API route or external)
  - `generateMetadata` exports page title and description
- **Files to create**: `src/app/contact/page.tsx`
- **Files to edit (if API route needed)**: `src/app/api/contact/route.ts`
- **Dependencies**: TASK-3.2, TASK-3.6

### TASK-4.6: SEO — Sitemap & Robots
- **Specialist**: Frontend Developer
- **Description**: Generate dynamic sitemap.ts listing all pages and project URLs. Create robots.ts allowing indexing.
- **Acceptance Criteria**:
  - `sitemap.ts` generates entries for: Home, Portfolio, About, Contact, and each project detail page
  - `robots.ts` returns proper rules (allow all, link to sitemap)
  - Sitemap URLs are absolute
- **Files to create**: `src/app/sitemap.ts`, `src/app/robots.ts`
- **Dependencies**: TASK-1.3, TASK-4.3

---

## Phase 5: Quality Assurance

### TASK-5.1: Code Review — Architecture & Patterns
- **Specialist**: Code Reviewer
- **Description**: Review entire codebase for: consistent patterns, proper TypeScript usage, component structure, data layer correctness, Next.js best practices (server vs client components).
- **Acceptance Criteria**:
  - No `any` types without justification
  - Server and Client components correctly separated (`"use client"` only where needed)
  - No prop drilling — data fetched where needed
  - Consistent naming conventions across files
  - All images use `next/image`
  - Review report created with findings and fixes
- **Files to create**: `docs/review-report.md`
- **Dependencies**: All Phase 4 tasks

### TASK-5.2: Accessibility Audit
- **Specialist**: Accessibility Auditor
- **Description**: Audit all pages for WCAG 2.1 AA compliance. Check: semantic HTML, keyboard navigation, color contrast, ARIA labels, focus management, alt texts.
- **Acceptance Criteria**:
  - All images have descriptive `alt` text
  - All interactive elements keyboard-accessible
  - Color contrast meets AA ratio (4.5:1 text, 3:1 large)
  - Proper heading hierarchy (h1 → h2 → h3)
  - Form inputs have associated labels
  - Skip-to-content link present
  - Audit report created with findings and fixes
- **Files to create**: `docs/a11y-report.md`
- **Files to edit**: Any components with violations
- **Dependencies**: All Phase 4 tasks

### TASK-5.3: Responsive & Cross-browser Testing
- **Specialist**: Code Reviewer
- **Description**: Test all pages at breakpoints: 320px, 768px, 1024px, 1440px. Verify layout, images, navigation, and forms work correctly.
- **Acceptance Criteria**:
  - No horizontal scrolling at any breakpoint
  - Navigation works on mobile (hamburger menu) and desktop
  - Images don't overflow containers
  - Contact form usable on mobile
  - Gallery lightbox works on touch devices
  - Text is readable at all sizes
- **Dependencies**: All Phase 4 tasks

---

## Phase 6: Deploy

### TASK-6.1: Git Repository Setup
- **Specialist**: DevOps Automator
- **Description**: Initialize Git repo, create `.gitignore` (Node, Next.js, OS files), make initial commit, push to remote.
- **Acceptance Criteria**:
  - Git initialized with proper `.gitignore`
  - `.env*` files excluded from tracking
  - `node_modules/`, `.next/`, `out/` in `.gitignore`
  - Initial commit with clean history
  - Remote repository connected
- **Files to create**: `.gitignore`
- **Dependencies**: TASK-1.1

### TASK-6.2: Vercel Deployment Configuration
- **Specialist**: DevOps Automator
- **Description**: Configure project for Vercel deployment. Set up environment variables if needed. Verify build succeeds on Vercel.
- **Acceptance Criteria**:
  - `vercel.json` created if custom config needed (or defaults work)
  - `npm run build` completes without errors locally
  - Project deployed to Vercel preview URL
  - All pages load correctly on deployed version
  - Images load from `public/` directory
  - OG metadata visible when sharing URL
- **Files to create**: `vercel.json` (if needed)
- **Dependencies**: All Phase 5 tasks, TASK-6.1

### TASK-6.3: Production Deploy & Verification
- **Specialist**: DevOps Automator
- **Description**: Deploy to production domain. Verify all pages, forms, images, theme toggle, and SEO (sitemap, robots) work in production.
- **Acceptance Criteria**:
  - Production URL accessible
  - All 5 pages render correctly
  - Theme toggle works
  - Contact form submits successfully
  - Sitemap accessible at `/sitemap.xml`
  - Robots.txt accessible at `/robots.txt`
  - Lighthouse score: Performance > 90, Accessibility > 90, SEO > 90
- **Dependencies**: TASK-6.2

---

## Task Summary

| Phase | Tasks | Specialists |
|-------|-------|-------------|
| 1. Foundation | 4 tasks | Software Architect |
| 2. Content | 2 tasks | CMS Developer |
| 3. Design | 7 tasks | UX Architect, UI Designer |
| 4. Implementation | 6 tasks | Frontend Developer |
| 5. QA | 3 tasks | Code Reviewer, Accessibility Auditor |
| 6. Deploy | 3 tasks | DevOps Automator |
| **Total** | **25 tasks** | **6 specialists** |

## Dependency Chain (Critical Path)

```
TASK-1.1 → TASK-1.2 → TASK-1.3 → TASK-2.2 → TASK-3.4 → TASK-4.1
                                             → TASK-3.7 → TASK-4.2
                                  → TASK-4.3
                       → TASK-3.1 → TASK-3.2 → TASK-3.3
                                             → TASK-4.4
                                  → TASK-3.5
                                  → TASK-3.6 → TASK-4.5
                                                        → TASK-5.x → TASK-6.2 → TASK-6.3
```
