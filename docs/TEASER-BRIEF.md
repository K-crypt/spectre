# The Spectre — "Goes active" teaser

Production brief, 2026-09-04. Planning only. Nothing generated, nothing built,
nothing published.

## What this is

A 20-second teaser announcing that the five systems are opening. Not a company
launch: the site has been live and indexed since 2026-07-22. The message is
that **Spectre goes active** — the suite is switching on, access opens in order.

Destination: `k-crypt.github.io/spectre`.

## The mechanism

`globals.css` §71 already writes this ad:

> GOLD IS A STATE, NOT A DECORATION. One warm gold family, and it means
> exactly one thing: the system is working, or it wants a person.

So the teaser is the doctrine, played straight. Five systems stand named in ink,
dormant. One by one a gold point resolves on each. By the final frame all five
are lit. The film says "the systems are coming online" without a word of copy
claiming it, and it says it in the house's own signal language.

Nothing else is gold. If a frame looks gold, that frame is wrong.

## Colour budget for the whole film

- Ink and ghost for type.
- Maroon for hairlines and the plate numerals `01`–`05`.
- Gold for the five resolve points, and nothing else.
- The five product accents: 8px identity dots only, per `DESIGN.md` §2 rule 2.
  Never a fill, never two accents dominating a frame.

## Shot list — 20 seconds

| # | Time | Ground | Image | Type |
|---|------|--------|-------|------|
| I | 0:00–0:04 | Graphite | Ridge before dawn, near-still, slow pedestal up | `Automate what can be.` |
| II | 0:04–0:14 | Graphite | Ridge pushed far back, near-static | Five plates draw in, 2s apart: numeral, name, identity dot. Gold point resolves on each as it lands |
| III | 0:14–0:17 | Crossing | The dawn plate, light coming up | `The machine prepares. The human decides.` |
| IV | 0:17–0:20 | Paper | The lockup: mark + THE SPECTRE | `COMING SOON`, no URL |

Roster in beat II, names only, per the 2026-09-04 call:

```
01  AI PA
02  AI COO
03  AI CMO
04  AI Researcher
05  AI HR
```

Beat I withholds the second half of the thesis. Beat III pays it off with the
governing principle instead of the matching line — the viewer completes
"focus on what can't" themselves.

## The lockup

The mark and the wordmark are rebuilt natively, not placed as artwork:

- **Bird:** `public/spectre-mark.svg`, a single path at 346×191, drawn in
  `currentColor` so it takes the ground's ink without a second file.
- **Wordmark:** `THE SPECTRE` in Michroma at `0.34em` tracking, the `.wordmark`
  rule at `globals.css:256`. Identical to the supplied lockup, resolution
  independent.

Rendering from source rather than scaling the supplied raster is what keeps the
mark's hairlines crisp at 2160p. At 20 seconds the mark appears twice and only
twice:

1. **Beat I, 0:00.** The bird alone, small, centred, in ghost on graphite.
   No wordmark. It reads as a watermark on the dark, and it is the only thing
   on screen for the first beat's opening moment.
2. **Beat IV, 0:17.** The full lockup on paper, at rest, with `COMING SOON`
   set in Spline Sans Mono smallcaps beneath it. No URL — 2026-09-04 call.

The mark never animates, never draws itself on, never glows. It cuts in and it
holds. `DESIGN.md` §5 permits one signature motion and it belongs to the
plates, not the identity.

**Ground note.** The supplied artboards place the mark on a warm olive-grey
that is not in the token set — the nearest house value, `--stone: #e4ded2`, is
much lighter. The film uses house grounds: graphite `#1A1817` under the ridge,
paper `#F5F1EA` under the end card. If that olive is a deliberate new brand
ground rather than an export background, it needs a token before it appears in
a film.

## The close

`COMING SOON` in mono smallcaps under the lockup, letter-spaced to the
wordmark's discipline, and nothing else. **No URL** — the 2026-09-04 call. The
provenance stamp `A HOUSE OF DOTONE COMPANY · JAIPUR` holds the bottom edge.

This also sidesteps the metadata conflict rather than resolving it: the film
now names no destination, so `layout.tsx:38` declaring `thespectre.one` while
the site deploys to `k-crypt.github.io/spectre` remains an open item for Codex,
just not one that blocks the teaser.

## Division of labour

Magnific generates atmosphere and audio only. It never renders type, UI, the
mark, or anything a viewer could mistake for a product screen.

**Magnific:**
- Three motion plates, each seeded with the site's own photograph as
  `keyframes.start` — the film is literally the website in motion, not a second
  photographic asset.
- A sparse score, 45s, trimmed to 20.
- Two sound events: the resolve tick, and room tone.

**The repo, rendered not generated:**
- Every word of type, in Cormorant Garamond, Instrument Sans and Spline Sans
  Mono, captured from the site's own CSS in the browser pane at 3840×2160.
- The five plates, the numerals, the identity dots, the gold resolves.
- `spectre-mark.svg` on the end card.

AI text rendering cannot be trusted with Cormorant, and generated UI would
violate `DESIGN.md` §7 outright. Both stay out of the model's hands.

## Source stills

| Plate | Source | Native | Ratio |
|---|---|---|---|
| A, B | `public/ridge-2560.webp` | 2560×1097 | 2.33 |
| C | `public/crossing-2560.webp` | 2560×1055 | 2.43 |

Both sit inside Seedance's 0.4–2.5 start-frame limit, so the 16:9 masters seed
directly with no preparation.

**The 9:16 problem.** Seedance derives output aspect from the start frame when
one is supplied, so vertical masters need vertical start frames. Cropping
2560×1097 to 9:16 gives 617×1097 — legal, but it discards the ridgeline sweep
that is the whole point of the photograph. Outpainting with `images_expand`
would keep the composition but manufactures new photographic content from a
sanctioned asset, which needs an explicit call. **Recommendation: crop, and
compose the vertical masters around a tighter, more vertical ridge** rather than
inventing sky. Decision noted below.

## Clips

| ID | Beat | Duration | Motion | Seed |
|---|---|---|---|---|
| A | I | 5s | `pedestalUp`, minimal amplitude | ridge |
| B | II | 10s | `static` with faint atmospheric drift | ridge |
| C | III–IV | 5s | `pushIn`, very slow | crossing |

Five-second clips wherever possible: short clips drift less, and drift on a
photograph the brand owns is the failure mode that kills this.

Model: Seedance 2.0 Pro at 1080p for masters, Seedance 2.0 Mini at 720p for the
draft pass. Prompts constrain to atmosphere only — moving air, shifting light,
no new landforms, no camera travel over terrain, no wildlife, no people.

## Grade

`DESIGN.md` §7 specifies the treatment for this photograph: grayscale ≥0.85 plus
a scrim. Applied in ffmpeg to every generated frame, which forces the footage
into the palette and simultaneously buries the AI-video tells.

## Motion timing

Governed by §71's three named durations, not invented for the film. Reveals
ease-out. Nothing bounces, nothing loops. The gold resolve uses the state
duration, 380ms.

## Audio

Score and sound design, no voice. A voiceover turns this into a SaaS ad and the
brand's whole register is restraint. Score sits under everything; the resolve
tick marks each of the five; room tone carries the crossing.

## Assembly

ffmpeg 8.1.2, already on the machine. Composite type plates over graded
footage, cut, master at 9:16 and 16:9 as equal compositions rather than
reframes, then derive 1:1 from the vertical.

## Cost

Balance at planning time: 303,907 credits. Unlimited mode is **not** active in
this session, so generation draws down credits.

| Item | Unit | Count | Credits |
|---|---|---|---|
| Pro 1080p, 5s | 3,500 | 4 (A, C × 2 masters) | 14,000 |
| Pro 1080p, 10s | 7,000 | 2 (B × 2 masters) | 14,000 |
| Mini 720p drafts | ~700 | 6 | ~4,200 |
| Score, 45s | 80 | 1 | 80 |
| Sound effects | small | 2 | ~200 |
| Rerolls, allow 30% | — | — | ~10,000 |
| **Total** | | | **~42,500** |

About 14% of balance.

## Decisions and risks for Codex

1. **Animating the sanctioned photograph.** Aashrit's 2026-08-03 amendment
   sanctions one still. Putting it in motion is arguably a new asset and needs
   his explicit call before anything is generated. This is the blocking one.
2. **Vertical framing.** Crop, or outpaint. Recommendation above is crop.
3. **Names without statuses.** The roster shows five names and no evidence, per
   the client call. The statuses — two running, one in pilot, one proven, one
   taking partners — were the most credible thing available and are now absent,
   so the teaser leans entirely on atmosphere and the gold mechanism to carry
   trust. Worth a second look before generation.
4. **URL conflict, deferred not solved.** `layout.tsx:38` hard-codes
   `metadataBase` and the OG url to `thespectre.one`; the site deploys to
   `k-crypt.github.io/spectre`. The teaser now carries no URL, so this no
   longer blocks it, but one of the two is still wrong.
5. **Motion drift.** The draft pass on Mini is non-negotiable. A melting
   ridgeline ends the project.

## Settled, 2026-09-04

| Question | Call |
|---|---|
| Length and masters | 20s, 9:16 and 16:9 composed as equal masters |
| Imagery | Animate the site's own stills; photo amendment cleared |
| Audio | Score and sound design, no voice |
| Roster | Names only, no status badges |
| Close | `COMING SOON`, no URL |
| Frame I exposure | Lifted to `brightness(.55)` so the ridgeline reads |
| Alignment | Centred throughout, not the site's left-aligned wrap |
| Olive ground | Left out; graphite and paper only, pending an answer on its origin |
