# Intelligence Architecture

Priorities 1–3 from the brief only (central event layer, unified
attribution, live dashboard) — 4–10 (Search Console sync, opportunity/
anomaly/experiment engines, order/revenue layer) explicitly postponed per
the brief's own instruction ("if a lower-priority component would delay a
higher-priority one, postpone it") and because most need either paid API
credentials or real order/revenue data that doesn't exist yet.

## Event taxonomy

**Sent to Vercel Analytics + window.dataLayer (everything):** `page_view`,
`search`, `product_view`, `compare_slot_change`, `whatsapp_click`,
`call_click`, `contact_submitted`, `quote_page_view`, `quote_started`,
`generate_lead`, `page_engagement`, `finder_*`.

**Also written to Redis (`api/events.js`, curated subset only):**
`product_view`, `search`, `compare_started`, `whatsapp_click`,
`call_click`, `quote_started`, `generate_lead`, `finder_completed`. This
subset exists solely because Vercel Analytics has no read API on the
current plan — `/admin/intelligence` needs *some* first-party store to
read real counts from, and duplicating Vercel Analytics wholesale would
just fill up the free 30MB Redis tier for no reason. Capped at 5,000
events (oldest trimmed) — plenty for this traffic volume, cheap to store.

**No PII in any event, ever** — not name, phone, email, or company. Only
machine/industry/source/page context.

## Data layer

`window.dataLayer` is pushed on every `track()` call, GTM-compatible
format (`{event: name, ...props}`), never re-initialized after first push.
No GTM container is attached — there's no real GTM ID to put there yet.
This is purely so a future GTM setup is a config change, not a code
change.

## Attribution

- **First-touch** (`localStorage['sw-utm']`): set once per browser,
  never overwritten. "What actually brought this person to us."
- **Last-touch** (`localStorage['sw-utm-last']`): overwritten on every
  visit carrying UTM params, includes `document.referrer`. "What brought
  them back today."
- Both are sent with every lead (`sourceUtm`/`lastTouchSource` fields on
  the lead record). Deliberately kept separate — merging them into one
  "source" field would silently destroy the distinction the brief asked
  for.

## Dashboard: `/admin/intelligence`

Password-gated (same `ADMIN_DASHBOARD_PASSWORD` as `/admin/leads` and
`/admin/seo`). Sections:

- **Today**: leads created today + running totals for qualified/quotation/
  won — the "what needs my attention right now" view.
- **Follow-ups needed**: rule-based alerts, not ML. Rules (all documented
  inline in the code, all configurable by editing the one function):
  NEW lead untouched >24h, follow-up date reached/passed, HIGH-priority
  lead still in NEW.
- **Funnel**: product views → engaged → WhatsApp/call → quote started →
  lead → qualified → quotation → won, with real conversion rates between
  adjacent stages. **Visitor/pageview counts are deliberately absent** —
  showing a fake top-of-funnel number stitched from a different data
  source than the rest would be misleading; a note in the dashboard
  explicitly says to check Vercel Analytics for that.
- **Product demand**: most-viewed vs most-quoted vs won-by-machine —
  kept as three separate lists on purpose, because attention and business
  are not the same thing (the brief's own framing, and correct).
- **Source / market intelligence**: leads/qualified/won broken down by
  UTM source and by city/industry — all computed live from real lead
  records, nothing pre-aggregated or cached.
- **Data source registry**: honest connected/not-connected status for
  every system (see table below) — no fake "syncing..." states.

## Data source registry (as of this phase)

| Source | Status | Note |
|---|---|---|
| Redis (leads + events) | Connected | Live |
| Vercel Analytics | Connected | View in Vercel's own dashboard — no read API on this plan |
| Microsoft Clarity | Connected | View at clarity.microsoft.com |
| Google Search Console | Connected | Sitemap submitted; indexing/query data not synced into this dashboard (would need the Search Console API + OAuth credentials) |
| Google Analytics 4 | Not connected | No property created |
| Google Tag Manager | Not connected | dataLayer is ready; no container attached |
| Order/revenue system | Not connected | Doesn't exist — no real orders to track yet |

## What was explicitly NOT built, and why

- **Search Console API sync**: needs a Google Cloud service account +
  OAuth setup I can't provision without your Google account access. The
  connector interface (where this would plug in) isn't pre-built either —
  building an empty interface with nothing to call it yet is exactly the
  "empty enterprise software" the brief said not to build.
- **Opportunity/anomaly/experiment engines**: these need weeks of real
  traffic and lead history to have anything meaningful to detect. Building
  them against near-zero data would either show nothing (dead UI) or
  invite fabricated-looking output. Revisit once `/admin/intelligence`'s
  funnel numbers are non-trivial.
- **Order/revenue layer**: no order-taking system exists in the business
  today (orders happen offline after a quote). Nothing to connect.
- **Real-time push (WebSockets)**: the brief itself said not to build this
  if polling/refresh is sufficient — it is, at this traffic volume. The
  dashboard reloads on login/refresh; that's adequate.
