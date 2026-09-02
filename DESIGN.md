# The Spectre — Website Design System v0 (Phase 0 draft, for Aashrit's verdict)

Governing plan: `brain/outputs/2026-07-22-spectre-website-plan.md` (round-1 verdicts applied).
Trust research applied throughout: `brain/outputs/2026-07-22-landing-page-trust-research.md` (laws L1–L12).
Preview: open `design-preview.html` in a browser (accents in context).

> **Updated 2026-09-02.** The palette and type below are current. The previous
> version of this section described a dark-default site with a light theme and
> a nav toggle; that toggle was removed some time ago and the site now has a
> single register. §9b's theme-switcher note is likewise historical.

## 1. Base — the house palette

Paper is the ground; the dark passages are islands inside it, and each one
carries `.on-dark`, which re-declares the same token names rather than adding
new ones. The palette is shared with the studio's other venture, so anything
built for either sits correctly alongside the other.

| Token | Paper (ground) | On dark (islands) | Role |
|---|---|---|---|
| `--ground` | `#F5F1EA` | `#1A1817` | page ground |
| `--surface` | `#FAF7F1` | `#221F1D` | raised surfaces (rarely used — see below) |
| `--ink` | `#1A1817` | `#F5F1EA` | primary text |
| `--ghost` | `#56524E` | `#A8A098` | secondary text (the only neutral) |
| `--hairline` | `rgba(26,24,23,.13)` | `rgba(201,184,154,.16)` | 1px rules — the structural line language |
| `--ruby` | `#6E1F23` | `#8A2D31` | the house maroon: rules, plate numerals, the sigil |
| `--accent-text` | `#6E1F23` | `#C9B89A` (wool) | the accent where it has to carry type |

The maroon is an accent, never a fill: it carries hairline rules, numerals and
initial capitals. Across large areas it reads heavy and cheapens the effect.
On the dark islands it cannot carry small type at 4.5:1 without turning pink,
so wool takes the accent's typographic role there and maroon stays a rule.

**Hairlines, not boxes.** Cards, panels and bordered containers were doing work
that white space and a single 1px rule do better. Surfaces are effectively
unused: `.card`, `.access-panel`, the plant readout and the comparison table
are all a top rule and nothing else.

Flat matte everywhere. No gradients, no glow, no glass, no shadows beyond 1px
hairlines (Linear-look exit, dossier §7.3).

## 2. The accent family (per-product, his round-1 call)

One narrow band — all five sit at similar saturation/lightness so they read as one instrument panel, not a rainbow. Desaturated signal hues; never neon.

| Product | Name | Dark | Light | Semantic |
|---|---|---|---|---|
| AI PA (flagship) | **Spectral** | `#A9A3C9` | `#5B5488` | moonlit, barely-there; the ghost |
| AI COO | **Steel** | `#7C9CBF` | `#3E608C` | industrial calm, flow |
| AI CMO | **Clay** | `#C98A72` | `#9C5237` | warmth, madder nod, brand-craft |
| AI Researcher | **Archive** | `#8FAE94` | `#4E7057` | ledger green, "verified" |
| AI HR | **Ochre** | `#C9AD7C` | `#8C7340` | human warmth, growth |

**Discipline (keeps it premium, off the SaaS-template smell):**
1. **One hue per page.** A product's accent exists only on its own page: motif tint, primary CTA, live indicators, link hover. Never two accents in one viewport.
2. **HOME is near-mono.** The five hues appear only as 8px identity dots + motif strokes on the roster cards. Home's CTAs are ink-on-ground (mono).
3. Accents never color body text. Text is ink or ghost, always (contrast + fluency, L4).
4. Accent usage budget per page: ≤3 element classes (CTA, motif, status/live dot). When in doubt, remove (one-doctrine).

## 3. Typography (three registers, L8)

| Register | Face | Use | Sizes |
|---|---|---|---|
| Authority | **Cormorant Garamond** (300–400, italic for claims) | display headlines, the manifesto, pull quotes | 88 / 50 / 34 |
| Clarity | **Instrument Sans** | body, UI, nav, forms | 17 / 15 / 13 |
| Instrument | **Spline Sans Mono** | data, numbers, stamps, status badges, footnote markers | 13 / 11, tabular figures ALWAYS |
| Wordmark | Bicubik (Michroma stand-in) | THE SPECTRE lockup only | — |

Provenance stamps set in mono smallcaps: `EST. 2026 · JAIPUR · HOUSE OF DOTONE` (the Anduril/Column stamp pattern, dossier §2).

## 4. Space, structure, radius

4px grid. Section rhythm: 128px (desktop) / 80px (mobile). Content max-width 1120px; reading measure 68ch. Radius: 10px cards, 8px buttons, 0 on hairline dividers. Density rule: expert readers reward dense, well-set data over padded air (dossier §7.4) — demos and tables may be dense; marketing sections stay airy.

## 5. Motion (restraint, §7.5)

One signature: **the ghost reveal** — opacity 0→1 + 6px rise, 240ms ease-out, staggered ≤3 elements. Hairlines draw in (180ms) on section entry, once. Simulation motion lives INSIDE playground frames only. Nothing loops decoratively. `prefers-reduced-motion`: all entry motion off, demos start paused. Timing budget: 150–300ms, nothing over 400ms.

## 6. Motif system (the per-product "unique touch")

Each product owns a schematic line-texture, drawn in its accent at 20–35% opacity — hero backdrop, section dividers, and its staged→approve payload card:
- PA: **memory graph** (nodes + arcing links, self-drawing)
- COO: **flow spine** (zones + corridor flow lines, the plant top-view abstracted)
- CMO: **calendar grid** (slots filling, one highlighted)
- Researcher: **file tree** (an index unfolding)
- HR: **org lattice** (people-nodes in ranks)
Motifs are 1px-line schematics. Never illustration, never 3D, never glow (§7.6: schematics beat hype art).

## 7. Imagery

Zero *decorative* photography, zero raw stock (automatic-fail, dossier §10). Real UI screenshots (fictional data only) + the motif schematics. Numbers set as instrument readouts: mono, tabular, with as-of dates.

**Amendment (Aashrit, 2026-08-03):** ONE owned photographic asset is sanctioned — the hero ridgeline photograph (`public/hero-ridge.jpg`, Unsplash License, credit file alongside), on the dossier §7.6 documentary-photography path: self-hosted, graded near-mono into the ghost palette (grayscale ≥0.85 + scrim), used consistently as THE brand atmosphere, never captioned as anything real. Raw/untreated stock and any second decorative photo remain banned; any new photographic asset needs his explicit call.

## 8. Components (Phase-1 set)

Nav (wordmark · 5 products · Method · `ACCESS` button, persistent) · roster card (motif strip, one-line claim, mono status badge, identity dot) · status badge (mono smallcaps: `RUNNING IN PRODUCTION` / `IN PILOT BUILD` / `METHOD PROVEN` / `TAKING DESIGN PARTNERS`) · staged→approve card (payload, APPROVE tap, log line appends) · comparison module (task picker + 3 columns) · waitlist block (email + product chips + one optional field + promise line) · footer ledger (entity, place, legal, the no-mockup trust line) · footnote system (superscript mono markers, as-of dates — the Blackstone discipline, L6).

## 9. Accessibility & performance as trust

WCAG AA on all text (accents are non-text elements; where accent text is unavoidable — badges — use the light-theme deep variants on dark surfaces). Full keyboard nav. `prefers-reduced-motion` honored. Static export, system-font fallbacks, fonts subset + preloaded; target LCP < 1.5s (speed reads as competence, dossier §7.8 — one line, not an SEO exercise).

## 9b. GLOSS AMENDMENT (Aashrit, 2026-07-22 UI round — supersedes the strict-matte lines above)

His call: "a little animations and relevant glossiness would not hurt." Approved gloss layer, applied site-wide:
- **Ambient sheen:** one fixed, breathing radial ghost-glow behind every page (`body::before`, brass+ink at ≤7%, 9s cycle; killed under reduced-motion). Never per-section, never colored loud.
- ~~**Headline sheen:**~~ removed 2026-09-02. It broke on headlines longer than
  two lines — the last line read as disabled — and it put gradient-filled
  transparent text over variable-luminance photography.
- ~~**Button gloss:**~~ removed with the boxes. `.btn` is a rule or a fill, and
  `.btn-hard` on a dark island is a fine border so the photograph shows through.
- ~~**Card hovers:**~~ removed with the boxes. A linked block warms its top rule
  to maroon instead of lifting.
- Still banned: glassmorphism, neon glow, gradient text in accents, decorative loops.
- **Cursor-follow effects: tried and retired (2026-07-23, his call — "becoming a distraction"). Do not re-add in any form.** The ambient breathe + hover states are the complete gloss-motion set.

**Theme switcher (same round):** manual toggle in nav (`html.light` + localStorage `spectre.site.theme`, pre-paint script in layout, falls back to system scheme). **Logos:** the real bird mark (brand-systems SVG, currentColor) inlined in nav + footer; `spectre-square-black.svg` is the favicon. **Mobile:** product links collapse to a hamburger sheet under 800px; researcher playground collapses to one column under 680px; wide tables scroll in their own container.

## 10. Open for his verdict in this draft

1. The five hues themselves (see preview) — tune any hue, keep the band discipline.
2. Brass as house-only signature (footer/wordmark) — in or out.
3. Radius 10px (soft-institutional) vs 2px (sharper, more Anduril) — preview shows both on cards.
4. The status-badge wording set.
