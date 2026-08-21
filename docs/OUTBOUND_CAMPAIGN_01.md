# Campaign: SWAMI_OUTBOUND_DELHINCR_2026

## What was actually researched this pass

**9 real, sourced companies** — not 100. Per the brief's own instruction
("if only 63 are genuinely verified, return 63"), this is what one
research pass with public web search can genuinely verify without
fabricating the rest. Sources for every company are in
`docs/PROSPECT_SOURCES.md`. Scoring model in
`docs/PROSPECT_QUALIFICATION.md`.

| # | Company | City | Evidence | Contact | Source | Priority |
|---|---|---|---|---|---|---|
| 1 | Sai Creations | Sector 63, Noida | Star Export House, 3.5M units/year, 3 facilities, real production evidence | +91 120 4356635, hello@saicreations.co.in | Company website | **A** |
| 2 | New Delhi Export House | Noida | Govt-recognized Export House since 1990, 275k pieces/month, ~$25M turnover | Contact: Shantanu (Manager), via IndiaMART profile | IndiaMART company page | **A** |
| 3 | Bulk T-Shirts Adda | Gandhi Nagar, Delhi | Real address, active manufacturer/dispatch claims | +91-7880618469, sales@bulktshirtsadda.com | Company website | B |
| 4 | Annaya Creations | Delhi | T-shirt manufacturer, custom printed/embroidered | +91-7053066666 | Company website | B |
| 5 | Orient Craft Limited | Gurgaon | Major exporter since 1978, shirts/trousers/dresses/outerwear — well-documented via multiple independent sources | Website unreachable this pass (timeout) — **UNVERIFIED contact route**, needs a direct re-check | Multiple industry sources | B (high fit, contact UNVERIFIED) |
| 6 | Active Fashion India | Delhi | Own manufacturing unit, T-shirts, active since 2004 | Not captured this pass — **UNVERIFIED** | Company website (listed, not fetched) | C |
| 7 | ARM Fashion | Delhi | T-shirts/hoodies/joggers manufacturer | Not captured this pass — **UNVERIFIED** | Company website (listed, not fetched) | C |
| 8 | Vihaan Inc | Delhi | Garment manufacturer, general | Not captured this pass — **UNVERIFIED** | Search snippet only — lowest confidence | C |
| 9 | AEPC Noida (industry body, not a prospect) | Noida | Government-backed export promotion council | 0120-4292609, aepcnoida@aepcindia.com | aepcindia.com | — (channel, not a lead) |

**Machine matching**: #1, #2 make mixed apparel (menswear/womenswear/
kidswear) — REQUIRES SALES QUALIFICATION to name a specific machine, not
guessed. #3, #4, #6, #7 make T-shirts — JACK E4S (overlock) or the
knitwear 3-machine combo is a defensible starting point pending real
qualification, since T-shirts are knitwear. #5 (Orient Craft) makes
shirts/trousers — JACK F6 is directly defensible per the real product
positioning.

## Top prospects for first outreach

Given real evidence quality, start with **#1 (Sai Creations)** and
**#2 (New Delhi Export House)** — both have complete, verified contact
routes and the strongest documented production evidence. #3 and #4 are
second — verified contact, real but smaller companies. #5 needs a
direct contact re-check before outreach (its business case is strong,
its reachability isn't confirmed yet).

## Campaign definition

**Target**: Delhi NCR garment/apparel manufacturers (see ICP ranking,
`docs/PROSPECTING_PLAYBOOK.md`)
**Offer**: no discount/promo — the real offer is "authorized JACK dealer
since 2015, local service" (real, already-verified claims only)
**Product**: JACK F6 primary, knitwear combo (F6+E4S+W4) where product
mix supports it
**Landing pages**: `/machines/jack-f6` for shirt/woven prospects,
`/guides/machines-for-a-knitwear-line` for T-shirt/knit manufacturers
**UTM structure**:
```
utm_source=email&utm_medium=outbound&utm_campaign=swami_delhincr_2026&utm_content=[company_slug]
```
(per `docs/UTM_GUIDE.md` convention, `outbound` as medium since this
campaign doesn't have one yet in that doc — worth adding)

## Analytics/website handoff verification

Landing pages already confirmed working end-to-end in Phase 5's
production validation (machine preselection, `generate_lead`,
`whatsapp_click`, attribution) — no new testing needed, this campaign
just needs real UTM-tagged links pointing at already-working pages.
