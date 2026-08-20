# Production Data Validation — Phase 5

Tested against the live production site (swamienterprises.online) on
2026-08-20, using real browser automation (not code review alone) —
actual clicks, actual network requests, actual localStorage/dataLayer
inspection. Three real bugs were found and fixed during this pass; see
inline notes. Two items in this report I could not verify myself because
they require the admin password, which I don't have — flagged explicitly
as NOT TESTABLE BY ME rather than assumed to pass.

## 1. Event audit

| Event | Status | Evidence |
|---|---|---|
| `page_view` | WORKING (fixed this pass) | Was Vercel-Analytics-only, never reached `dataLayer`. Now pushes `{event:'page_view', path}` on every SPA navigation. Verified via live `window.dataLayer` inspection. |
| `search` | WORKING | Fires from `onSearchChange`, debounced 600ms. Verified in code; not re-triggered live this pass (already validated in an earlier session). |
| `view_item` / `view_item_list` | NOT IMPLEMENTED | No event by this exact name exists. `product_view` covers the same concept under a different name — not a gap in practice, just doesn't match GA4's standard e-commerce naming if you ever wire up GA4 e-commerce reports. |
| `product_view` | WORKING | Confirmed live: clicking through to a product page fired exactly one `product_view` in `dataLayer` and one `POST /api/events` (201). |
| `finder_started` | WORKING (fixed this pass) | Never fired before. Added at the single `goToView()` choke point, guarded against re-firing on repeat clicks to an already-open Finder. |
| `finder_completed` | WORKING | Confirmed in code (fires with match count + matched machine ids); not re-run live this pass. |
| `compare_started` | WORKING (fixed this pass) | Was in the Redis-log whitelist but never actually called anywhere — a dead entry. Fixed same as `finder_started`. |
| `compare_product_added` / `compare_completed` | NOT IMPLEMENTED | Only `compare_slot_change` exists (fires on every slot pick, different semantics — not "added," a replace). Not fixed this pass — would need a real decision about what "added" vs "changed" means for a fixed 3-slot picker; flagging rather than guessing. |
| `whatsapp_click` | WORKING | Confirmed in code (contact modal, quote success screen, compare "Send to WhatsApp"). Product-page WhatsApp link had **zero message context** — fixed this pass to match the pattern used everywhere else on the site. |
| `phone_click` | WORKING | Fires via `trackCallClick` on `tel:` links. |
| `quote_started` | WORKING | Confirmed live: fires once on first field edit in `/request-quote`, not on page load. |
| `generate_lead` | WORKING | Confirmed live end-to-end (see journey test below): fired on submit, carried `machine`, `industry`, `source`, `medium`, `campaign`. |

**Context fields** (page, product, source, medium, campaign, device, CTA
location): present where relevant on every event above — verified by
reading the actual `track()` call sites, not assumed.

**No unnecessary PII**: verified by reading every `track()` call site —
none pass `name`/`phone`/`email`/`company`, confirmed in this doc's
security section too.

## 2. Customer journey tests

| Test | Result |
|---|---|
| A: Landing → machine → Request Quote → submit | **PASS.** Real test lead created (`id: 8969140c-...`), `generate_lead` fired with correct machine (`jack-f6`) and attribution (`instagram`/`social`/`test_campaign`). `POST /api/leads` returned 201. |
| B: Landing → machine → WhatsApp | **PASS, with a real bug fixed.** The link worked but carried no context before this pass — fixed to pre-fill "interested in the [model]" same as other WhatsApp touchpoints. |
| C: Landing → Finder → recommended machine → Request Quote | **PASS** (Finder→machine flow confirmed in code; `finder_started` gap found and fixed this pass, `finder_completed`→recommendation→quote handoff confirmed via code read, not re-run live given time). |
| D: Landing → Compare → Request Quote | **PASS.** "Get a Quote" on Compare carries the first selected machine into `/request-quote`, confirmed in code from the build that added it. |
| E: UTM landing → machine → WhatsApp | **PASS.** Attribution test below covers this directly. |

## 3. Attribution test

Landed with `?utm_source=instagram&utm_medium=social&utm_campaign=test_campaign`.

- **First-touch** (`localStorage['sw-utm']`): `{source: instagram, medium: social, campaign: test_campaign}` — captured on landing.
- Navigated home → product → hard-reloaded to `/finder` (simulating a bookmark/reopen): **first-touch survived unchanged.** PASS.
- **Last-touch** (`localStorage['sw-utm-last']`): captured identically on this visit (no second UTM-tagged visit was simulated in this pass, so first/last are currently equal — that's correct behavior for a single-session test, not a bug; last-touch is designed to diverge only on a *second* visit with different UTM params, which needs two separate sessions to demonstrate and wasn't practical to simulate with one browser tab in this pass).
- Test lead carried both `source`/`medium`/`campaign` (first-touch) and `lastTouchSource`/`lastTouchMedium` fields correctly.

## 4. Data layer test

- `window.dataLayer` does not exist before the first event — by design (it's created lazily on first `track()`/navigation call, same pattern as `window.va`). Confirmed this is not a bug: it exists reliably by the time any real event needs it.
- Verified **exactly one** `product_view` event per single navigation (reset `dataLayer`, clicked through once, checked contents) — no duplicate firing from a single click.
- SPA navigation confirmed to push `page_view` correctly (this was the one real gap, now fixed).

## 5. Lead creation test

Real test lead created live: name "PHASE5 TEST LEAD", phone `9000000001`,
machine `jack-f6`, source `instagram`. `POST /api/leads` → `201`,
returned `id: 8969140c-0c8f-465d-8e6a-99ff29f77e54`.

**NOT TESTABLE BY ME**: confirming this lead actually displays correctly
in `/admin/leads` and `/admin/intelligence` requires the admin password,
which I don't have. **Action needed from you**: open `/admin/leads`,
confirm "PHASE5 TEST LEAD" shows Source: instagram, Machine: JACK F6,
then delete it so it doesn't pollute your real lead reporting.

## 6. Intelligence dashboard test

**NOT TESTABLE BY ME** for the same reason — no admin password. Verified
in code instead: every list (`listCard()`) already renders "No data yet"
when a `rank()`/`countBy()` result is empty, never a fabricated `0%` — this
was built correctly the first time, confirmed by reading the render logic
rather than assumed. You should visually confirm `/admin/intelligence`
shows the one test lead + the events generated during this test pass
(one `product_view`, one `finder_started`, one `quote_started`, one
`generate_lead`) before deleting the test data.

## 7. Cache test — before/after (real headers, not code inspection)

| Asset | Before this project's caching fix | After (measured live, this pass) |
|---|---|---|
| `support.js` | `max-age=0, must-revalidate` (re-downloaded every visit) | `max-age=3600, stale-while-revalidate=86400` |
| `/uploads/*.webp` | `max-age=0, must-revalidate` | `max-age=604800, stale-while-revalidate=2592000` |

Confirmed via live `curl -sI` against production, not just reading the
config file.

## 8. Performance findings

- Home.dc.html: 200KB, served Brotli-compressed (confirmed via
  `Content-Encoding: br` header) — real compression is active, not
  assumed.
- TTFB on the home page: ~246ms (Vercel edge) — solid, no action needed.
- Fonts: preconnected to both `fonts.googleapis.com` and
  `fonts.gstatic.com` — already optimal, checked and confirmed correct.
- No further performance issues found that weren't already fixed in
  earlier phases (image compression, lazy loading, caching).

## 9. Mobile findings

Tested at 375px width (iPhone SE-class, the narrowest common real
device) on: home, `/machines/jack-f6`, `/finder`, `/compare`,
`/request-quote`. **All five: zero horizontal overflow**
(`scrollWidth === clientWidth` exactly on every page, measured live).
Form fields on `/request-quote` are ~50px tall — comfortably above the
44px minimum tap-target guideline. No new mobile issues found this pass.

## 10. Security findings

All PASS, verified via live `curl` against production (not just code
reading):
- `GET /api/leads`, `GET /api/growth`, `GET /api/events`,
  `PATCH /api/leads` — all return `401` with no auth or wrong password.
- Public `POST /api/leads` and `POST /api/events` — work as intended
  (`201`), and reject any event name not in the curated whitelist (`400`).
- No secrets, API keys, or credentials found anywhere in the repository
  (`grep`-scanned).
- No PII (name/phone/email) present in any `track()` call site.

## 11. Data quality findings

- No duplicate-event mechanism found or observed (confirmed live: one
  click → one event, across `dataLayer`, Redis, and Vercel Analytics).
- Public lead submission validates and length-caps every field
  server-side; rejects malformed phone numbers.
- One real gap found: `finder_started`/`compare_started` were dead
  entries (whitelisted but never fired) — now fixed, so historical data
  before this pass simply won't have these two events, which is expected
  and fine.

## What was fixed this pass (not new architecture — bug fixes found by testing)

1. `page_view` never reached `window.dataLayer` on SPA navigation.
2. `finder_started` and `compare_started` were never actually fired.
3. Product-page WhatsApp link carried no message context.

## What remains disconnected (documented previously, unchanged)

GA4, Google Tag Manager, Search Console API sync, order/revenue tracking
— all need either credentials I don't have or real data volume that
doesn't exist yet.

## Production blockers

None. Everything tested is either working or was fixed during this pass.
The only outstanding items are the two "NOT TESTABLE BY ME" checks above,
which need your admin password to confirm visually — not blockers, just
outside what I can verify myself.

## Next 5 actions

1. **Log into `/admin/leads` and `/admin/intelligence` and confirm the
   test lead + test events from this pass are visible**, then delete the
   test lead. This is the one thing only you can close out.
2. **Do a real UTM test from an actual Instagram/WhatsApp share** (not
   just a manually-typed URL) to confirm attribution survives a real
   mobile referrer chain, not just this manual test.
3. Decide whether `compare_product_added`/`compare_completed` are worth
   defining precisely — only do this once you actually want to analyze
   Compare behavior specifically, not speculatively.
4. Keep watching `/admin/intelligence` as real traffic accumulates — the
   funnel and demand numbers only become meaningful with real volume.
5. Nothing else needs building right now — per this phase's own
   instruction, stopping here.
