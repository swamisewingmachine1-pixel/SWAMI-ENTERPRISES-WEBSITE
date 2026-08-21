# Real Machine Videos — Plan

No script, no AI-generated footage, no fake demonstrations — just real
machines running, filmed by Swami.

## Where videos go (existing infrastructure, no new code needed)

Every machine page already has a working video slot
(`activeMachine.hasVideo`/`youtubeId` in `Home.dc.html`) — when a real
YouTube ID is added to a machine's data, the video embeds automatically;
until then it honestly shows "Not yet available" (not a broken embed,
not a fake placeholder image). This already exists — confirmed working
in Phase 5's production validation. **No new component needed for videos
1-2 below.**

## Video 1
**Machine**: JACK F6
**Purpose**: Show the machine actually running — speed, stitch
consistency, the thing every "Jack F6 price" searcher can't tell from a
spec sheet.
**Ideal page**: `/machines/jack-f6` (embeds automatically once you give
me the real YouTube ID/URL)
**CTA**: Video description links to `/machines/jack-f6`
**UTM**: `utm_source=youtube&utm_medium=video&utm_campaign=swami_delhi_f6_2026&utm_content=f6_demo`

## Video 2
**Machine**: JACK F6 + JACK 2002G, side by side if possible
**Purpose**: Visual companion to the published comparison guide — real
speed/stitch-length difference, shown not just described.
**Ideal page**: `/guides/jack-f6-vs-jack-2002g`
**CTA**: Video description links to the guide
**UTM**: `utm_source=youtube&utm_medium=video&utm_campaign=swami_delhi_f6_2026&utm_content=f6_vs_2002g`

## Video 3
**Machine**: none specific — real showroom walkthrough
**Purpose**: Trust — showing the real Chanakya Place location.
**Ideal page**: `/about`
**CTA**: Video description links to `/about`
**UTM**: `utm_source=youtube&utm_medium=video&utm_campaign=swami_delhi_f6_2026&utm_content=showroom_walkthrough`

**Not built**: a video embed slot on the About page — it doesn't exist
yet, and per "do not create unnecessary architecture," I'm not adding an
empty slot for a video that doesn't exist yet either. When Video 3 is
real, tell me and I'll add the embed in the same pass — it's a five-
minute addition once there's something real to embed, not worth building
speculatively now.

## How to hand off a real video

Once filmed and uploaded to YouTube (unlisted is fine to start), send me
the video ID or URL and which of the 3 slots it's for — I'll wire it in
same day.
