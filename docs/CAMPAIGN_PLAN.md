# Phase 7 — First Customer Acquisition Campaign

Built on the real research in `docs/MARKET_INTELLIGENCE.md`. Every fact
about the market/competitors is sourced there. Every fact that would need
to come from Swami and hasn't been confirmed is marked **REQUIRES SWAMI
CONFIRMATION** — none are invented.

## 1. Beachhead market

**BEACHHEAD:** Delhi NCR (Chanakya Place core, extending to Janakpuri/
West Delhi first — not the whole NCR yet, see confidence note)
**CITY/REGION:** Delhi, West Delhi specifically
**INDUSTRY:** Garment manufacturing — shirts/wovens
**BUYER:** Small-to-mid garment unit owner, walk-in or WhatsApp-first buyer
**PRODUCT:** JACK F6 (computerized lockstitch) — already the site's
featured product, matches wovens/shirts which is a real Delhi NCR
specialization
**PRIMARY PROBLEM:** Wrong machine selection / not knowing which model
they actually need
**WHY NOW:** The site's full funnel (Finder → Compare → Quote → WhatsApp
→ lead pipeline) is production-validated (Phase 5) and has zero real
demand pointed at it yet — infrastructure is ready and idle.
**WHY SWAMI:** Real, pre-existing local trust signal (Justdial 4.2★/135
reviews, Google 4.8★/102 reviews, physical Chanakya Place location) that
a new entrant would take years to build.
**WHY WE CAN WIN:** SERP for this category is directory-dominated (Phase
6, Section 6) — Swami's actual website with real Compare/Finder/spec data
is structurally ahead of what's currently ranking.
**CONFIDENCE:** MEDIUM-HIGH on the market choice (scored 23/25 vs
alternatives, Phase 6). LOW on the exact sub-area (Chanakya Place vs
NCR-wide) — **REQUIRES SWAMI CONFIRMATION**: actual delivery/install/
service radius. Everything below assumes Delhi/West Delhi until that's
confirmed; expanding claims to "NCR-wide" before confirming service
coverage would be a real, avoidable overpromise.

## 2. Competitive attack

| Competitor | What's observable | Weakness (observed, not accused) | Swami advantage | Action |
|---|---|---|---|---|
| Sewing Machine World (Karol Bagh) | Multi-brand catalog site, same city | No visible comparison tool, Finder, or live quote system in what was found | Real Compare + Finder + `/request-quote` | Rank for "sewing machine dealer Delhi" with a fuller-featured page |
| Directory listings (IndiaMART/JustDial/TradeIndia pages *for other dealers*) | Rank well structurally, but are template listings, not real content | No buying-guide content, no product depth beyond a price line | The new buying guide + real spec pages | Keep publishing real content directories can't replicate |
| Hyper-local Chanakya Place-area dealers (e.g. listings adjacent to Swami's own address) | Physically nearby, same walk-in catchment | UNKNOWN — no site depth found for these this pass | Swami's actual website presence (most of these appear to have none) | Own the digital channel while competing physically in person |

**Not claimed**: revenue, customer counts, or "better service" for any
competitor — no evidence exists either way.

## 3. Customer problem

**PRIMARY PROBLEM CHOSEN: wrong machine selection.**
- **Why the buyer cares**: a lockstitch/overlock/flatlock mismatch means
  buying equipment that can't actually do the job — real money wasted,
  validated by how central "which model" and "price" queries are to every
  competitor page found (Phase 6).
- **What they do today**: walk into a shop or call a directory-listed
  number and ask, with no way to compare before committing.
- **What they're searching**: "Jack sewing machine price," "industrial
  sewing machine dealer Delhi," "Jack F6 price" (real query *patterns*,
  not verified volumes — see Section 7).
- **What makes them buy**: clear specs, a real person confirming fit
  (Finder does the first pass, WhatsApp/call closes it), local
  availability.
- **What makes them hesitate**: authenticity concerns ("is this genuine
  JACK") and not knowing if the model fits their actual fabric/production
  — both directly answered by the Finder + the new buying guide.

## 4. First money page

**Recommendation: do NOT build a new page.** Per Section 5's own
instruction, the existing `/machines/jack-f6` page already covers hero,
relevant machine, comparison link, quote CTA, WhatsApp. **Improve it**
rather than duplicate it:
- Add a short "Who this machine is for" section (real: shirts/wovens,
  computerized, mid-to-high volume — already true from its own spec data,
  not new invented content).
- Add an FAQ block using the *validated* questions from `/admin/seo`
  once you've confirmed at least 2-3 are real (currently all UNVALIDATED
  — don't publish a "customer FAQ" built entirely on hypotheses).
- Analytics already present and working (Phase 5 validation):
  `page_view`, `product_view`, `whatsapp_click`, `quote_started`,
  `generate_lead` all confirmed firing correctly on this exact page.

**Not building this now** — waiting on the FAQ content specifically,
since it needs validated real questions, not hypothetical ones.

## 5. Existing vs new pages

| Intent | Existing page adequate? | Action |
|---|---|---|
| "which machine do I need" | Yes — Finder | none needed |
| "compare Jack models" | Yes — Compare | none needed |
| "Jack F6 price/specs" | Yes — `/machines/jack-f6` | improve (Section 4) |
| "lockstitch vs overlock" | Yes — new guide, just published | none needed |
| "is this genuine JACK" | **No** — nothing addresses this directly today | Real gap — needs an FAQ answer, blocked on your authorized-dealer documentation (Section 22) |

## 6. First content cluster (5 assets — all from the existing Phase 6 list, sequenced for this beachhead)

1. **Buying guide** — *already published*: "Lockstitch vs Overlock vs
   Flatlock." Internal links: JACK F6, Finder, `/machines`.
2. **Product comparison** — "JACK F6 vs [a second real lockstitch model
   from the catalog, e.g. JACK A4C]." Target buyer: shortlisting garment
   owner. Real info required: none beyond what's already in the catalog —
   **can be written now**.
3. **Application/industry guide** — "What Machines Does a Shirt/Woven
   Factory Actually Need" (Delhi NCR's real specialization per Phase 6).
   Real info required: none — can be written from existing catalog data.
4. **Technical/use-case guide** — "Industrial vs Domestic Sewing
   Machines: What Actually Changes at Production Volume." Real info
   required: none.
5. **FAQ/high-intent guide** — "Is This a Genuine JACK Machine? How to
   Verify Before You Buy." **Blocked**: needs your real authorized-dealer
   documentation/certificate details — REQUIRES SWAMI CONFIRMATION.

Assets 2–4 can be written and published now with zero new Swami facts —
tell me to proceed and I will.

## 7. Google search strategy

| Term pattern | Classification | Confidence pattern is real |
|---|---|---|
| "Jack sewing machine price" | High commercial | HIGH (Phase 6, directory-page structure) |
| "Jack F6 price" | High commercial, product-specific | MEDIUM |
| "industrial sewing machine dealer Delhi" | Local | HIGH |
| "Jack sewing machine dealer near me" | Local | MEDIUM |
| "lockstitch vs overlock machine" | Informational | MEDIUM |
| "which sewing machine for shirt factory" | Commercial research | MEDIUM |

**SEARCH VOLUME NOT VERIFIED** for any term above — no keyword-volume
tool was used or is available. These are pattern classifications from
observed SERP/directory structure, not measured demand.

## 8. Google Business Profile plan

Legitimate actions only, using what's already real:
- Confirm the GBP listing's address, hours, and category match the site
  exactly (I found conflicting review counts across platforms —
  Google 4.8★/102 vs Justdial 4.2★/135 — both real, different platforms,
  worth knowing).
- Add real photos as they're captured (Section 26 of the earlier phase's
  list still applies — showroom, spare-parts wall, a real F6 on your
  floor).
- Enable Google Posts for real updates only (new stock, real events) —
  not fabricated "offers."
- Encourage real reviews after real sales — no incentivized/fake reviews.

## 9. First 5 videos (structure only — do not shoot until Swami confirms availability)

| # | Title | Hook | Machine | CTA |
|---|---|---|---|---|
| 1 | "JACK F6 in 60 seconds" | Real machine running, no voiceover claims beyond visible spec | JACK F6 | Landing: `/machines/jack-f6`, UTM: `youtube/video/jack_f6` |
| 2 | "Lockstitch vs Overlock, shown side by side" | Visual companion to the published guide | F6 + an overlock model | Landing: `/guides/lockstitch-vs-overlock-vs-flatlock` |
| 3 | "Inside Swami Enterprises' Chanakya Place showroom" | Real walkthrough, real trust | — | Landing: `/about` |
| 4 | "How to spot a genuine JACK machine" | Blocked — needs real authorized-dealer facts | — | **REQUIRES SWAMI CONFIRMATION** |
| 5 | "What we service, what we stock" | Real spare parts wall if photographed | — | Blocked on real service/spares facts |

**Videos 1-3 need only a phone and access to the real machines/shop** —
no new facts required, just filming. 4-5 blocked on Section 22 facts.

## 10. First 10 Instagram posts (mix, structure only)

1. F6 machine demo (real footage) — UTM `instagram/social/jack_f6`
2. Comparison carousel: lockstitch/overlock/flatlock (repurposed from
   the published guide — real, zero new facts)
3. "What's actually different: industrial vs domestic machine"
4. Real showroom photo (once captured)
5. Real team/founder photo (once captured — you already have Dinesh's
   real photo on `/about`, reuse it)
6. "Ask us anything" story — genuinely gathers real customer questions
   for `/admin/seo`, doesn't invent them
7. Spare parts wall (once photographed)
8. Behind-the-scenes: a machine being set up/delivered (real, when it
   happens)
9. A real (once available) customer installation photo — **do not post
   until you have one, real, with permission**
10. "New stock" post — only when genuinely true

Every commercial post (1, 2, 4, 7) gets UTM + links to the relevant
product/guide page + WhatsApp CTA. Posts 4, 5, 8, 9 are blocked on real
photos, not fabricable.

## 11. LinkedIn (5 posts, business-outcome framed)

1. "What a Delhi garment unit should check before buying a lockstitch
   machine" (repurposed guide content, professional framing)
2. "Lockstitch vs overlock: the production-line decision, explained"
3. "Setting up a new production line? Here's the actual machine sequence"
   (real, from Section 2 industry data — lockstitch→overlock→flatlock)
4. "We've been an authorized JACK dealer in Delhi since 2015" — real,
   already-verified fact from the site's own About page
5. Blocked: any post claiming service-area/warranty specifics until
   Section 22 confirmed

## 12. Outbound strategy (legitimate only)

- **Company types**: Delhi NCR garment manufacturing units, small export
  houses (per Phase 6 evidence — 43%+ of top exporters based here).
- **Sources**: public business directories already surfaced in research
  (IndiaMART/TradeIndia company listings), AEPC-affiliated public export
  house directories.
- **Decision-maker roles**: owner (small units), procurement/production
  manager (larger units) — role only, no scraped personal contact
  details.
- **Opening message** (WhatsApp/email, real and honest, no fake
  urgency): *"Hi, we're Swami Enterprises, an authorized JACK dealer in
  Delhi since 2015. We work with garment units on lockstitch/overlock
  machine selection and supply — happy to help if you're evaluating
  equipment."*
- **Follow-up**: one follow-up after 3-4 days if no response, then stop
  — no repeated unsolicited contact.
- **Qualification**: what are they producing, current machine situation,
  timeline — same fields already in the quote form.
- **CTA**: WhatsApp conversation or `/request-quote` link.

## 13. Prospect database

Already built (`/admin/seo`, `prospect` kind) — fields already match
what's needed (company, industry, city, website, contact role, source,
status, next follow-up, notes). **No new fields needed.**

## 14. Sales scripts

**First call/WhatsApp** (5 questions max, not an interrogation):
"What are you producing, and roughly what quantity are you planning?
Do you have a machine already, or starting fresh? What's your timeline?"
— three questions covers 80% of qualification; ask more only as the
conversation naturally continues.

**Follow-up** (if no response after quote): "Just checking in on the
[machine] enquiry — happy to answer any questions or send more detail."

**Explicitly not scripted**: anything mentioning specific price, warranty
terms, or delivery timelines — **REQUIRES SWAMI CONFIRMATION** before
any script states these as fact.

## 15. Lead priority score

Already built and live (`api/leads.js`, `computePriority`) —
HIGH/MEDIUM/LOW from quantity≥10, immediate timeline, company name
present. Called **LEAD PRIORITY SCORE** (already named this in the code,
not claimed to predict revenue).

## 16. 30-day campaign

- **Days 1-3 (Foundation)**: You confirm Section 22 facts (warranty,
  service radius, spares). I improve the F6 page (Section 4) and publish
  content assets #2-4 (Section 6) — no new facts needed for those three.
  Owner: you (facts) + me (build). Metric: page live, syntax-verified.
- **Days 4-7 (Content + prospects)**: Film videos #1-3 (Section 9) —
  needs only your phone, no new facts. Start logging real prospects in
  `/admin/seo`. Owner: you (filming/prospects). Metric: 3 videos, 10
  prospects logged.
- **Week 2 (Launch)**: Publish videos with UTM-tagged landing links.
  First LinkedIn posts (#1-4, need no new facts). Owner: you (posting,
  I draft copy on request). Metric: `/admin/intelligence` shows real
  `product_view`/`whatsapp_click` counts for the first time.
- **Week 3 (Optimize)**: Check `/admin/intelligence` funnel — which
  stage is weakest (views without WhatsApp? WhatsApp without quotes?).
  Fix that specific stage. Metric: stage-specific conversion rate,
  real number.
- **Week 4 (Double down)**: Whatever channel/content produced real leads
  in weeks 2-3, do more of exactly that — not more of everything.
  Metric: qualified leads, real count from `/admin/leads`.

## 17. Live measurement

Already built (`/admin/intelligence`) — funnel, product/source/market
breakdowns, all real. Optimizing for qualified leads/quotations, not
likes — matches what the dashboard actually shows (no like/follower
counts tracked anywhere in this system).

## 18. Campaign identity + UTM

**Campaign ID**: `SWAMI_DELHI_F6_2026`
Per the existing `docs/UTM_GUIDE.md` convention:
- Instagram: `utm_source=instagram&utm_medium=social&utm_campaign=swami_delhi_f6_2026&utm_content=<post-specific>`
- YouTube: `utm_source=youtube&utm_medium=video&utm_campaign=swami_delhi_f6_2026&utm_content=<video-specific>`
- LinkedIn: `utm_source=linkedin&utm_medium=social&utm_campaign=swami_delhi_f6_2026&utm_content=<post-specific>`

## 19. Experiments (max 3, only once real traffic exists)

1. "Request a Quote" vs "Get Pricing" — product page CTA text.
2. Product-specific WhatsApp message vs generic — already resolved in
   Phase 5 (product-specific won by default, no A/B needed, it's just
   correct).
3. FAQ present vs absent on the F6 page — once the FAQ exists (Section 4).

**Not running yet** — current traffic is near zero (test data only);
running an experiment now would be statistically meaningless, exactly as
the brief warned against.

## 20. Sales feedback loop

Already has a home: `/admin/leads` notes field for what was learned per
lead, feeding back into `/admin/seo` (validate/add customer questions)
and this document (update beachhead confidence) as real conversations
happen. No new system needed.

## 21. Content moat

Same list as Phase 6's Section 28 — unchanged, still the right long-term
target, still requires real inputs over time, not built in one pass.

## 22. Facts requiring Swami confirmation (blocking items)

1. Real service/delivery radius (Delhi only, or wider NCR?)
2. Exact warranty terms (JACK manufacturer warranty, or anything
   additional from Swami?)
3. Real spare-parts turnaround time
4. Authorized-dealer documentation details (for the authenticity FAQ)
5. A second real lockstitch model to name in the F6 comparison content
   (I can pick one from the existing real catalog myself if you'd rather
   not choose — just say so)

## 23. Final output

**1-18**: see sections above.
**19. What can be launched immediately** (zero new Swami facts needed):
content assets #2-4 (Section 6), videos #1-3 (Section 9, filming only),
LinkedIn posts #1-3 (Section 11), Instagram posts #1-3/#6 (Section 10).
**20. What must wait**: the authenticity FAQ, any warranty/service/
spares content or scripting, videos #4-5, LinkedIn post #4/#5,
Instagram posts #4/#5/#7/#8/#9 — all genuinely blocked on Section 22.

---

## THE EXACT FIRST 10 ACTIONS

1. **Answer Section 22's 5 questions** — everything else compounds from
   this; highest impact, fastest, only real blocker.
2. **Approve content assets #2-4** (Section 6) for me to write now — zero
   new facts needed, ships this week.
3. **Improve the F6 page** (Section 4, minus the FAQ) — I can do this now
   too.
4. **Film videos #1-3** (Section 9) — just your phone and the real shop,
   no script needed beyond "show the machine running."
5. **Confirm/align your Google Business Profile** — highest-leverage
   action that isn't code, since it's already carrying real trust
   (102/135 real reviews across platforms).
6. **Post LinkedIn #1-3** once I draft them — low effort, zero new facts.
7. **Start logging real prospects** in `/admin/seo` as you identify them.
8. **Log real customer questions** in `/admin/seo` as they happen — the
   fastest path to a real FAQ instead of a blocked one.
9. **Watch `/admin/intelligence`** weekly once the above starts producing
   traffic — don't guess, read the real funnel.
10. **Only after 2-3 weeks of real traffic**: pick one experiment from
    Section 19, not before — running it sooner is statistically noise,
    not signal.
