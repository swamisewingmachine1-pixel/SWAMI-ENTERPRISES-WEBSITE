# Swami Enterprises — Next.js rebuild (in progress)

Real Next.js 16 app with server-side static generation, built on the `nextjs-rebuild`
branch so nothing here touches the live site until it's reviewed and ready.

## What's real and working right now
- All 39 machines statically generated as real, individually-crawlable pages
  (`/machines/[id]`) with unique `<title>`, meta description, and Open Graph image per
  machine — genuine server-rendered HTML, not client-only JS.
- Real specs, real detail photos, real embedded YouTube videos (where the manufacturer
  has one), real related-machines — same data as the live site, ported from it.
- A real `sitemap.xml` listing every page.
- Homepage and machines catalogue.

## What has NOT been ported yet (honest gap list)
- The cinematic scroll hero, Machine Finder, Compare tool, and site search from the
  live site — none of that exists here yet. This is a data + SEO foundation first.
- Analytics events (the live site has these wired to Vercel Web Analytics; not yet
  re-added here).
- Visual polish/animation — current styling is a clean but plain pass in `globals.css`,
  not a rebuild of the live site's design system.

## Running it
```
cd nextjs
npm install
npm run build && npm start   # production build, matches what Vercel would deploy
# or
npm run dev                  # dev server with hot reload
```

## Deploying
Not yet wired to Vercel. To preview: create a new Vercel project (or add this as a
second project) pointing at this repo, branch `nextjs-rebuild`, with **Root Directory**
set to `nextjs/`. Vercel auto-detects Next.js — no other config needed.
