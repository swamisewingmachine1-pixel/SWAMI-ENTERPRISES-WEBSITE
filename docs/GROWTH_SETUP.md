# Growth / Lead System — Setup Notes

The site is a single-file client-rendered SPA (`Home.dc.html`) on a custom
runtime, hosted as static files on Vercel — not Next.js, no server, no
database. Everything below is built to fit that reality, not to pretend a
backend exists.

## What's implemented

- **`/request-quote`** — real page (`isQuote` view in `Home.dc.html`), with
  grouped fields (Your Details / Requirement), validation (name + phone
  required, email format checked), loading is instant (client-only), success
  state with "WhatsApp us now" / "Back to Machines".
- **Lead delivery**: submitting the form opens a pre-filled WhatsApp message
  to `+91 99713 36656` with every field the visitor entered. No CRM — for a
  single-location dealer, WhatsApp *is* the CRM inbox. `submitQuote` in
  `Home.dc.html` is the single place this logic lives, so swapping it for a
  real backend later means changing one function, not the whole site.
- **Machine/industry preselection**: `/request-quote?machine=jack-f6` or
  `?industry=shirts` preselects the dropdown — validated against the real
  `this.machines` / `this.industries` arrays, so a bad query param is just
  ignored, never trusted as real data.
- **Compare → quote**: "Get a Quote" on `/compare` carries the first selected
  machine into the quote form.
- **UTM capture**: first-touch `utm_source`/`utm_medium`/`utm_campaign` is
  saved to `localStorage` (`sw-utm`) on first visit and never overwritten, so
  a visitor who arrives from Instagram and buys three pages later still shows
  `Source: instagram / social` in the WhatsApp message you receive.
- **CTA differentiation**: "Request a Quote" (high intent) vs "Talk to a
  Specialist" (advisory) vs "Find Your Machine" (discovery) are distinct CTAs
  routed to their own destinations — nav, mobile sticky bar, product pages,
  footer, compare.
- **Analytics events** (via the existing Vercel Web Analytics `track()`
  helper — see below): `quote_page_view`, `quote_started` (fires once, on
  first field interaction, not on page load), `generate_lead` (fires only on
  successful submit, never on validation failure), plus the pre-existing
  `whatsapp_click`, `call_click`, `contact_submitted`, `search`,
  `product_view`, `compare_slot_change`, `finder_*`.
- **No PII to analytics**: none of `quoteName`/`quotePhone`/`quoteEmail`/
  `quoteCompany` are ever passed to `track()` — only machine/industry/source
  context.

## Still requires something from you

**Nothing external is required for the lead system to work today** — it
already delivers real leads to your WhatsApp with zero setup. The items
below are optional upgrades, not blockers.

| What | Where to get it | Env var | Used for |
|---|---|---|---|
| GA4 property (if you want it alongside Vercel Analytics) | analytics.google.com | n/a — would need a new script tag, not currently wired | Deeper funnel reports, Google Ads conversion import |
| Google Tag Manager container | tagmanager.google.com | n/a | Only needed if/when you add Meta Pixel, Google Ads remarketing, etc. — don't set this up until you're actually running paid ads, it's dead weight otherwise |

I did not add a GTM/GA4 script or `.env.example` because there's no real
credential to put in one yet — adding empty placeholder config for services
you're not using would just be clutter. When you're ready to run paid
traffic (Google Ads / Meta), tell me and I'll wire GTM in properly with real
IDs at that point.

## One real bug to fix in the Vercel dashboard

Google Search Console reported `Sitemap could not be read — HTTP 404`. The
actual cause: `swamienterprises.online` (apex, no www) 308-redirects to
`www.swamienterprises.online` at the Vercel level, and your Search Console
property is verified for the non-www version specifically — a sitemap
fetched through a redirect sometimes fails GSC's fetcher.

Fix (Vercel dashboard, ~1 minute): **Project → Settings → Domains** → set
`swamienterprises.online` (the one already verified in Search Console) as
the **Production/Primary domain** instead of `www.swamienterprises.online`.
That removes the redirect for the domain you've already verified. I can't
do this myself — it's a dashboard setting, not a file in the repo.

## Testing done

- Syntax-verified `Home.dc.html`'s embedded script after every change
  (`new Function('DCLogic', ...)`).
- Manually filled and submitted `/request-quote` in-browser, confirmed the
  generated WhatsApp URL decodes to a clean, correctly formatted message.
- Confirmed machine/industry query-param preselection only accepts IDs that
  exist in the real catalog.
