# The Spectre — Website Design System v0 (Phase 0 draft, for Aashrit's verdict)

Governing plan: `brain/outputs/2026-07-22-spectre-website-plan.md` (round-1 verdicts applied).
Trust research applied throughout: `brain/outputs/2026-07-22-landing-page-trust-research.md` (laws L1–L12).
Preview: open `design-preview.html` in a browser (dark + light strips, accents in context).

## 1. Base (mono, ghost-coded)

| Token | Dark (default) | Light | Role |
|---|---|---|---|
| `--ground` | `#0A0A0A` | `#F7F5F0` (warm paper) | page ground |
| `--surface` | `#111111` | `#FFFFFF` | cards, panels |
| `--ink` | `#F5F5F3` | `#111111` | primary text |
| `--ghost` | `#9A9A9A` | `#6B6B6B` | secondary text (the only neutral, per brand) |
| `--hairline` | `#FFFFFF14` | `#00000012` | 1px rules — the structural line language |
| `--brass` | `#B8944C` | `#8C6F37` | HOUSE signature only: footer sigil, wordmark hover. Never a UI accent. |

Flat matte everywhere. No gradients, no glow, no glass, no shadows beyond 1px hairlines (Linear-look exit, dossier §7.3). Dark is default; light is first-class (warm paper, not clinical white).

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
| Authority | **Fraunces** (300–500, optical) | display headlines, the manifesto, pull quotes | 64 / 44 / 32 |
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

Zero photography. Zero stock (automatic-fail, dossier §10). Real UI screenshots (fictional data only) + the motif schematics. Numbers set as instrument readouts: mono, tabular, with as-of dates.

## 8. Components (Phase-1 set)

Nav (wordmark · 5 products · Method · `ACCESS` button, persistent) · roster card (motif strip, one-line claim, mono status badge, identity dot) · status badge (mono smallcaps: `RUNNING IN PRODUCTION` / `IN PILOT BUILD` / `METHOD PROVEN` / `TAKING DESIGN PARTNERS`) · staged→approve card (payload, APPROVE tap, log line appends) · comparison module (task picker + 3 columns) · waitlist block (email + product chips + one optional field + promise line) · footer ledger (entity, place, legal, the no-mockup trust line) · footnote system (superscript mono markers, as-of dates — the Blackstone discipline, L6).

## 9. Accessibility & performance as trust

WCAG AA on all text (accents are non-text elements; where accent text is unavoidable — badges — use the light-theme deep variants on dark surfaces). Full keyboard nav. `prefers-reduced-motion` honored. Static export, system-font fallbacks, fonts subset + preloaded; target LCP < 1.5s (speed reads as competence, dossier §7.8 — one line, not an SEO exercise).

## 9b. GLOSS AMENDMENT (Aashrit, 2026-07-22 UI round — supersedes the strict-matte lines above)

His call: "a little animations and relevant glossiness would not hurt." Approved gloss layer, applied site-wide:
- **Ambient sheen:** one fixed, breathing radial ghost-glow behind every page (`body::before`, brass+ink at ≤7%, 9s cycle; killed under reduced-motion). Never per-section, never colored loud.
- **Headline sheen:** `h1.display` ink fades down via background-clip. Both themes.
- **Button gloss:** `.btn-hard` carries a top-light gradient; hover = 1px lift + accent-tinted soft shadow.
- **Card hovers:** linked cards lift 2px with border-lighten + soft shadow.
- Still banned: glassmorphism, neon glow, gradient text in accents, decorative loops.
- **Cursor-follow effects: tried and retired (2026-07-23, his call — "becoming a distraction"). Do not re-add in any form.** The ambient breathe + hover states are the complete gloss-motion set.

**Theme switcher (same round):** manual toggle in nav (`html.light` + localStorage `spectre.site.theme`, pre-paint script in layout, falls back to system scheme). **Logos:** the real bird mark (brand-systems SVG, currentColor) inlined in nav + footer; `spectre-square-black.svg` is the favicon. **Mobile:** product links collapse to a hamburger sheet under 800px; researcher playground collapses to one column under 680px; wide tables scroll in their own container.

## 10. Open for his verdict in this draft

1. The five hues themselves (see preview) — tune any hue, keep the band discipline.
2. Brass as house-only signature (footer/wordmark) — in or out.
3. Radius 10px (soft-institutional) vs 2px (sharper, more Anduril) — preview shows both on cards.
4. The status-badge wording set.
