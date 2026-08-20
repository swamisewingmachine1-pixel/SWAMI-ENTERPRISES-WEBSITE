# Growth Architecture

For a developer joining later: this is a single-file client-rendered SPA
(`Home.dc.html`) on a custom runtime, statically hosted on Vercel, with a
couple of serverless functions under `api/` for the lead backend. It is
**not** Next.js and has no server-rendering — every SEO/meta trick below is
done client-side via `document.title`/`<meta>` mutation on route change
(`syncUrl`/`applyPathToState` in `Home.dc.html`), which works because
search engines execute JS on crawl, but is worth knowing if you're used to
framework-level SSR.

## What actually exists today (audited before this phase)

- **Routes**: `/`, `/machines`, `/machines/:id` (34 real products),
  `/industries`, `/solutions`, `/finder`, `/compare`, `/about`,
  `/request-quote`, `/admin/leads`. All client-side, with server-side
  rewrites in `vercel.json` so a hard refresh/deep link still resolves.
- **SEO foundation**: `sitemap.xml`, `robots.txt`, per-route
  title/description/canonical/OG tags, `Organization`+`LocalBusiness`
  JSON-LD always present, `Product` JSON-LD injected on product pages.
- **Product discovery**: site search (Cmd+K style), Machine Finder
  (rule-based recommendation engine over real specs — no ML), Compare
  (2–3 machines side by side, real spec table).
- **Lead system**: `/request-quote` (validated form, WhatsApp delivery,
  machine/industry preselect via query param, UTM-attributed), `api/leads.js`
  (Redis-backed storage, admin-only read/write), `/admin/leads` (pipeline,
  notes, follow-ups, transparent priority scoring, won/lost capture).
- **Analytics**: Vercel Web Analytics (`pageview`, `search`, `product_view`,
  `compare_slot_change`, `whatsapp_click`, `call_click`, `quote_page_view`,
  `quote_started`, `generate_lead`, `page_engagement` for time-on-page,
  `finder_*`), Microsoft Clarity (session recordings/heatmaps).

## What was added this phase

- **Industry ↔ machine internal linking**: the Industries page used to show
  relevant machines as plain comma-separated text; each one is now a real
  clickable link to that machine's product page. Small change, real SEO/UX
  value (internal linking is one of the few purely-technical SEO levers
  that's zero-risk to ship).
- **Admin business intelligence**: `/admin/leads` now shows four ranked
  cards — top requested machines, top industries, top cities, acquisition
  source — computed live from real submitted leads. Empty until real leads
  carry that data; never backfilled with placeholder ranks.

## What was deliberately NOT built this phase, and why

The brief asked for a lot more: per-industry/-solution SEO pages, location
pages, case studies, campaign landing pages, blog content, programmatic
SEO. All were audited and **not built**, on purpose:

- **Per-industry/-solution dedicated routes** (`/industries/garment-manufacturing`
  etc.): the real content backing each industry/solution today is one
  sentence (`industries`/`solutions` arrays in `Home.dc.html`). Splitting
  one sentence across 11 new URLs is a textbook thin/doorway page — exactly
  what the brief itself says not to do. Building these is worth doing
  **once each industry/solution has a real paragraph or two of unique
  content** (specific fabrics, specific production concerns, specific
  machine reasoning) — tell me which one to write first and I'll draft it
  from real machine data, not filler.
- **Location pages** (`/machines/sewing-machine-ludhiana` etc.): zero real
  city-specific content exists beyond the one real Delhi/Chanakya Place
  address already on the About page. Publishing pages for Ludhiana, Surat,
  etc. with no real local information would be exactly the doorway-page
  pattern explicitly ruled out. Not building until there's real local
  business activity (a service visit, a local customer, a distributor
  relationship) to write about.
- **Case studies / testimonials**: zero real customer stories exist yet.
  Not building even the "empty" template — an unpublished, unlinked route
  with nothing in it is dead code, not architecture. The moment there's one
  real customer story, tell me and I'll build the page around it in one
  pass; the data shape is obvious enough not to need pre-building.
- **Campaign landing pages** (`/campaigns/*`): no campaigns are running.
  Same reasoning — build it when there's a real campaign to point it at,
  so the first one built is real and tested end-to-end, not speculative.
- **Blog/educational content**: genuinely valuable, but "quality over
  quantity" cuts against writing this speculatively in one large batch. If
  you want to do this, better as its own focused task — tell me a topic
  ("how to choose a lockstitch machine") and I'll write one real, useful
  article, not a batch of ten.

## Attribution

First-touch UTM (`utm_source`/`utm_medium`/`utm_campaign`) is captured once
per browser on first visit (`localStorage['sw-utm']`, never overwritten by
a later visit) and carried into every lead — visible on the lead detail
panel in `/admin/leads` and in the WhatsApp message text. This is
first-touch only; last-touch/multi-touch attribution would need a real
analytics warehouse, not justified at current traffic volume.

## Lead pipeline

`NEW → CONTACTED → QUALIFIED → QUOTATION → NEGOTIATION → WON/LOST`, plus
quotation metadata (number, price, GST, delivery, validity, payment terms)
and won/lost reason capture. Priority (`HIGH`/`MEDIUM`/`LOW`) is rule-based
and transparent — see `computePriority` in `api/leads.js` — no ML scoring.

## Security

- `/admin/leads` and its API are behind a single shared password
  (`ADMIN_DASHBOARD_PASSWORD`), checked server-side on every request. This
  is not multi-user auth — documented honestly in `docs/ADMIN_SETUP.md`.
- Public `POST /api/leads` validates and length-caps every field
  server-side (never trusts client input as-is), rejects malformed phone
  numbers, and fails closed (no password configured = no admin access,
  not open access).
- No PII (name/phone/email/company) is ever sent to Vercel Analytics or
  Clarity's event layer — only machine/industry/source context. Clarity
  additionally masks form field content by default (its own behavior).

## AI-readiness

The product catalog (`this.machines` in `Home.dc.html`) already has a
consistent shape (id, model, category, applications, specs, etc.) that
could feed a future recommendation layer without restructuring — but no AI
layer exists today, and none was faked. If/when there's a real API budget
for this, the Machine Finder's existing rule-based matching function
(`matchedMachines`) is the natural place to add an AI-assisted layer
alongside the transparent rules, not replacing them.

## External setup still required

Everything above works today except:
- **Search Console**: verified, sitemap resubmitted — check back in a few
  days for "Success" and indexing status.
- **Clarity**: live, needs a couple hours of real traffic before
  recordings/heatmaps show anything.
- Nothing else — Vercel Analytics, the lead backend, and the admin
  dashboard are all fully configured and working as of this phase.
