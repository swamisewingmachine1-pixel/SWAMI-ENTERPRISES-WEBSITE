# Prospect Priority Score (not a revenue predictor)

Score out of 100, transparent and rule-based — same principle as the
existing lead priority score in `api/leads.js`.

| Factor | Points | How it's assessed |
|---|---|---|
| Manufacturing evidence | 20 | Real, verifiable evidence the company actually manufactures garments (own factory, stated production capacity) vs just a trading/reseller listing |
| Product fit | 20 | Do they make shirts/wovens (F6's real strength) or knitwear (needs the 3-machine combo)? Direct fit scores higher than adjacent fit |
| Production scale evidence | 15 | Real stated capacity (units/month, employee count) — higher scale suggests real multi-machine demand |
| Potential machine fit | 15 | Can a specific real Swami catalog machine be named with a defensible reason, or does it require sales qualification to know? |
| Geographic/service fit | 10 | Delhi NCR = full points (per the beachhead research); other clusters score lower until service radius is confirmed (`docs/BUSINESS_FACTS_CHECKLIST.md`) |
| Purchase/expansion signal | 10 | Any real, dated evidence of expansion, new capacity, hiring — 0 if none found (never assumed) |
| Contactability | 10 | Real, working public contact route found (phone/email/contact form) vs none found |

**A = 70+, B = 40-69, C = below 40.** This is a priority score for where
to spend outreach effort first — not a prediction that a company will
buy, and not used anywhere as if it were one.

## Machine matching — only from the real catalog

For any prospect, a specific machine is only named when real evidence
supports it (e.g. "shirt manufacturer" → JACK F6 is defensible; "apparel
manufacturer, product mix unclear" → **REQUIRES SALES QUALIFICATION**,
not a guess dressed up as a recommendation).
