# ADR-002: MDX Files as Content Source

## Status
Accepted

## Context
The site needs a content management strategy for portfolio projects. Content includes structured metadata (title, category, tags) and rich body text with images.

### Options Considered
1. **MDX files in repo** — Markdown + JSX, parsed with `next-mdx-remote` + `gray-matter`
2. **Headless CMS** (Contentful, Sanity, Strapi) — external API-based content
3. **Database** (Postgres, SQLite) — traditional storage

## Decision
MDX files stored in `content/projects/` with frontmatter for metadata.

## Rationale
- **No external dependencies** — content lives in the repo, no API keys or CMS subscriptions
- **Version controlled** — content changes tracked in git alongside code
- **Frontmatter** via `gray-matter` gives typed, structured metadata without a schema layer
- **MDX** allows embedding React components (galleries, callouts) directly in content
- **Developer-friendly** — edit in any text editor, preview via `npm run dev`
- A headless CMS adds operational complexity (auth, webhooks, API rate limits) that a personal portfolio doesn't justify

## Consequences
- **Positive**: Zero runtime dependencies for content, full git history, works offline
- **Negative**: Non-technical users can't edit content without touching the repo; no built-in media library or preview UI
- **Trade-off**: We optimize for developer workflow over non-technical editing. If a CMS becomes necessary later, the MDX→CMS migration is straightforward since the data shape is already defined
