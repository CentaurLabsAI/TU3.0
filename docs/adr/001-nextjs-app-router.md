# ADR-001: Next.js 15 App Router

## Status
Accepted

## Context
We need a framework for a portfolio site that supports:
- Static/SSG pages for performance
- Dynamic routes for project detail pages
- Image optimization out of the box
- TypeScript support
- Easy deployment to Vercel

### Options Considered
1. **Next.js 15 (App Router)** — React meta-framework with SSG, ISR, server components
2. **Astro** — content-focused static site generator, ships zero JS by default
3. **Gatsby** — React-based SSG with GraphQL data layer

## Decision
Next.js 15 with App Router.

## Rationale
- **Server Components by default** — reduces client JS bundle for a content-heavy portfolio
- **App Router** is the stable, recommended approach in Next.js 15; Pages Router is legacy
- **Built-in image optimization** via `next/image` and `sharp` — critical for a gallery site
- **`generateStaticParams`** makes project detail pages fully static at build time
- **Vercel deployment** is zero-config for Next.js projects
- Astro was a close second but the React ecosystem (component libraries, MDX tooling) is more mature

## Consequences
- **Positive**: Fast builds, great DX, automatic code splitting, image optimization
- **Negative**: Heavier framework than needed for a purely static site; App Router has a learning curve with server vs. client component boundaries
- **Trade-off**: We accept framework complexity in exchange for the React ecosystem and Vercel's deployment pipeline
