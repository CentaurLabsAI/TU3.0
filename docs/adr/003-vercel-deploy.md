# ADR-003: Vercel for Deployment

## Status
Accepted

## Context
We need a hosting platform for a statically-generated Next.js portfolio site with image optimization.

### Options Considered
1. **Vercel** — Next.js creator's platform, optimized for Next.js
2. **Netlify** — general-purpose Jamstack hosting
3. **Self-hosted** (VPS with Docker/Nginx)

## Decision
Deploy on Vercel.

## Rationale
- **Zero-config for Next.js** — automatic detection of framework, build settings, and optimizations
- **Edge network** — global CDN with automatic cache invalidation
- **Image optimization** built into Vercel's infrastructure — `next/image` works without self-hosting `sharp`
- **Preview deployments** on every push — useful for reviewing content changes
- **Free tier** is sufficient for a personal portfolio site
- Netlify is a solid alternative but requires additional configuration for Next.js App Router features (middleware, ISR)

## Consequences
- **Positive**: Fastest path to production, automatic HTTPS, preview URLs, analytics
- **Negative**: Vendor lock-in to Vercel's platform; some Next.js features (middleware, ISR) behave differently on other hosts
- **Trade-off**: We accept platform coupling in exchange for operational simplicity. The site is static enough that migrating to another host later would be low-effort
