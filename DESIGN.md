# The Spectre — Website Design System

> **Revised 2026-09-05, and this is a real revision, not a note.** The site
> was rebuilt from an empty stylesheet and then taken through six passes
> against three references the owner chose: `lenis.dev`,
> `sports.withgoogle.com/teamusa` and `annnimate.com`. Each of those was
> probed rather than admired: Team USA runs a white ground with headings at
> 210px and one saturated blue; annnimate puts a single hot orange on 299
> elements as a field; lenis.dev carries a WebGL canvas behind 113px type.
>
> **The colour-field experiment was tried and reverted, and that is worth
> recording rather than quietly deleting.** For one pass each system owned a
> saturated full-screen ground and the five ran in sequence. It was a
> correction to a real problem, the page had no presence, and it overshot:
> six deep jewel rooms in a row is a paint chart, and a paint chart is the
> opposite of luxury. The reference sites were misread. What makes them feel
> expensive is not that they are colourful, it is that they are *crafted*.
>
> So §1 and §2 keep their original discipline. What actually changed is the
> execution, and it changed in four places: the leading, the tracking, the
> space, and the pace. Those are recorded below because they are the
> difference between restraint and thinness, and the previous build was
> thin.

Governing plan: `brain/outputs/2026-07-22-spectre-website-plan.md` (round-1 verdicts applied).
Trust research applied throughout: `brain/outputs/2026-07-22-landing-page-trust-research.md` (laws L1–L12).
Preview: open `design-preview.html` in a browser (accents in context).

## 1. Base — the house palette

Bone is the ground. Graphite is the hero and nothing else. The maroon is one
room. That is the whole colour architecture, and its restraint is the point.

The paper was warmed and deepened from `#F4F0E8` to `#F1ECE2`: the old value
was a neutral off-white that read as default stock, and this reads as paper
someone chose.

| Token | Bone (ground) | Graphite | Role |
|---|---|---|---|
| `--ground` | `#F1ECE2` | `#221E1B` | page ground |
| `--ink` | `#1A1613` | `#F1ECE2` | primary text |
| `--ghost` | `#6B645B` | `#A8A098` | secondary text |
| `--hairline` | `rgba(26,24,23,.14)` | `rgba(201,184,154,.17)` | 1px rules |
| `--ruby` | `#6E1F23` | `#8A2D31` | the house maroon |
| `--gold` | `#A98B50` | `#C8A96B` | **state, never decoration** |

**Maroon is a rule, a mark, and exactly one room.** The original rule was
right: across large areas the maroon reads heavy. The single exception is the
manifesto, which stands in a deep oxblood (`#5A171B`) carrying one sentence
and nothing else. That is a book's endpapers, not a coloured section, and it
works precisely because it happens once. Everywhere else the maroon is a
hairline, a label, or the schematic.

**Gold is a state, not a decoration.** Unchanged and non-negotiable. One warm
gold family, and it means exactly one thing: the system is working, or it
wants a person. It lights the staged items in the ledger, the beat of the day
that needs you, and the systems that have come online. If a screen looks
gold, that screen is wrong.

**Grounds have a light source.** Every ground carries a single soft falloff
from a high point. Two stops, no animation, no second hue. This is light, not
a gradient effect, and it is the difference between a colour and a room.

**Surfaces stay unused.** Hairlines and white space still do the work that
cards and panels used to. That rule survived the revision intact.

## 2. The accent family — five marks

One narrow band of desaturated hues, one per system, each appearing as a
single 8px identity mark and nowhere else.

| Product | Name | Value |
|---|---|---|
| AI PA | **Spectral** | `#55507E` |
| AI COO | **Steel** | `#3A5A86` |
| AI CMO | **Clay** | `#883F2B` |
| AI Researcher | **Archive** | `#47664F` |
| AI HR | **Ochre** | `#6F5B33` |

**What tells the five apart is not five colours.** It is one accent held, and
everything else done properly: scale, space, rule weight, and each system's
schematic drawn large in maroon and given room. A page that needs five
colours to distinguish five things has not distinguished them.

**Discipline:**

1. One accent on the site: the maroon. The five hues are identity marks, not
   grounds.
2. Accents never colour body text.
3. Gold is a state and only a state.
4. When in doubt, remove.

## 3. Typography (three registers, L8)

| Register | Face | Use | Sizes |
|---|---|---|---|
| Authority | **Cormorant Garamond** (300–400, italic for claims) | display headlines, the manifesto, pull quotes | manifesto 136 / display 118 / section 74 / panel 45 |
| Clarity | **Instrument Sans** | body, UI, nav, forms | 17 / 15 / 13 |
| Instrument | **Spline Sans Mono** | data, numbers, stamps, status badges, footnote markers | 13 / 11, tabular figures ALWAYS |
| Wordmark | Bicubik (Michroma stand-in) | THE SPECTRE lockup only | — |

Provenance stamps set in mono smallcaps: `EST. 2026 · JAIPUR · HOUSE OF DOTONE` (the Anduril/Column stamp pattern, dossier §2).

## 4. Space, structure, radius

4px grid. Section rhythm: clamp(72px, 8vw, 124px). Content max-width 1120px; reading measure 68ch. Radius: 2px everywhere, 0 on hairline dividers. One scale, applied without exception. Density rule: expert readers reward dense, well-set data over padded air (dossier §7.4) — demos and tables may be dense; marketing sections stay airy.

## 5. Motion — weather, and one camera

Two kinds, and everything is one or the other.

**Weather.** Three ambient loops, all transform-only, all measured in
minutes rather than seconds: the ridge breathes over 96s, the cloud room
drifts over 64s, and the gold state marks pulse at 3.6s. Nobody catches any
of them moving; they only register that the page is not a photograph. The
gold pulse is the one loop that is not weather, and it is allowed because
gold means "the system is working" and this is that being true. DESIGN.md
previously said nothing loops. That was written for a page with no
photography in it, and it is amended here on the owner's call.

**The camera.** Everything else is scroll.

## 5b. Scroll is the camera

One engine, in `src/components/shell/scroll-scene.tsx`. A scene registers and
the engine writes `--p`, a number from 0 to 1, onto it each frame; CSS does
every animation from there through `calc()`. One rAF ticker for the whole
site, all rects read in one pass before any style is written, and only
transform and opacity are ever animated.

Five scenes, each of which has to justify itself in a sentence:

| Scene | What scroll is doing |
|---|---|
| Hero | The ridge falls away slower than the page. |
| Five systems | Pinned for five screens; each screen is one system, and the ground changes with it. |
| One day | The track pans sideways, because a day has that axis. |
| The crossing | The paper ground dissolves in. You arrive in the dark and leave in the light. |
| The manifesto | Lit word by word, so it is read at the speed it is scrolled. |

Entry motion: opacity 0→1 with a 14px rise, and display headlines reveal a
word at a time out of a clipped line, 45ms apart. Nothing loops. Nothing
moves while the reader is still.

**Everything is additive.** The server renders finished markup; the hiding
class is applied on the client, before paint, and only when motion is
allowed. Under `prefers-reduced-motion` no scene registers, `--p` stays 0,
and every rule is written so that 0 means finished rather than not started.
A reader without JavaScript gets the whole page.

## 6. Motif system (the per-product "unique touch")

Each product owns a schematic line-texture. It is no longer a 20–35% mark in
a corner: on a coloured ground it runs to 620px in paper, at true hairline
weight (`vector-effect: non-scaling-stroke`, without which a 90-unit
schematic blown up draws its lines at seven pixels and stops being a
schematic), and in the pinned scene it is wiped in diagonally by scroll. On
its own ground the schematic is structure, not ornament.
- PA: **memory graph** (nodes + arcing links, self-drawing)
- COO: **flow spine** (zones + corridor flow lines, the plant top-view abstracted)
- CMO: **calendar grid** (slots filling, one highlighted)
- Researcher: **file tree** (an index unfolding)
- HR: **org lattice** (people-nodes in ranks)
Motifs are 1px-line schematics. Never illustration, never 3D, never glow (§7.6: schematics beat hype art).

## 7. Imagery

Colour is now the site's primary visual material, and photography is the
secondary one. Zero *decorative* photography, zero raw stock (automatic-fail, dossier §10). Real UI screenshots (fictional data only) + the motif schematics. Numbers set as instrument readouts: mono, tabular, with as-of dates.

**Amendment, 2026-09-05 (e) — ONE REGISTER, FINAL.** The site is a single
cream world. There is no dark room in it any more, including the hero: the
ridge is the same photograph graded up rather than down, with the type in
ink. The nav has no dark state left to switch into.

Settled with it:

- **No colour transition between systems.** A curtain in each system's hue
  was built and cut. The change is carried by the type alone: the name
  clipped up out of its own rule, the rest set under it in reading order.
  What separates five systems is what they say.
- **Exposure, not bleach.** Every plate was lifted into cream and then washed
  again on top, and what survived was fog. Brightness is now at or just under
  1.0 with contrast up, and the washes are pulled back. Definition first.
- **Ink on a photograph needs a field, not a scrim.** A bottom-weighted scrim
  heavy enough to guarantee the type is heavy enough to erase the picture.
  The hero gives the statement a calm left field and leaves the right open
  for the ridge, and the crop was raised so mist rather than rock sits behind
  the words. Display type over photography is set at 400; Cormorant's 300 is
  a paper weight and its thins drop out over texture.
- **Scroll budget.** The systems scene is 300vh, the day 190vh, the crossing
  112dvh. The manifesto lands near the middle of the page rather than in its
  last third. The word-lighting is timed against that geometry and re-timed
  whenever it changes: the block is sticky from the moment its section
  enters, so the lighting starts at progress 0.10 and is complete before the
  block locks.
- **Cloud runs at 13 to 17 seconds.** Land breathes at 84 to 92. Cloud moving
  at the pace of a mountain reads as a still photograph with a bug in it.

**Amendment, 2026-09-05 (b).** Five atmospheric plates were commissioned,
one per system, on the owner's explicit call. They are the same world as the
ridge and the crossing: high cloud, valley mist, dawn on a crest, stacked
ridgelines in fog, an open plateau. Near-monochrome, graded to the same bone,
no subject in any of them, and each drifts on its own timing so the scene is
never quite still.

They exist because the schematics could not carry a screen. A line drawing
swapping is something a reader misses; a photograph dissolving into another
photograph is something they watch. The schematics keep their job on the
product pages' interior sections and lose it as the page's art.

Stored as `public/plate-*-{1024,1536}.webp`. Six plates, twelve files, about
530KB in total. On the home page they serve the descent; on a product page
that system's plate is the ground it opens on.

**Amendment, 2026-09-05.** The crossing plate is graded up into cream rather
than down into the ghost palette, and it moves. Cloud is the one subject a
viewer expects to be moving, and a still frame of it reads as a stock photo
no matter how it is graded. It is the bright passage of the page and the
counterweight to the graphite hero.

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
- **Cursor-follow effects: retired 2026-07-23 ("becoming a distraction"),
  reinstated 2026-09-05 on the owner's call, asked for three times.**

  **The gold.** A warm reflection travels with the pointer in three layers at
  three speeds: a small bright core that keeps up, a wider pool behind it,
  and a slow tail behind that. The lag is the whole point. A circle glued to
  the cursor looks like a widget; something that has to catch up looks like
  it has mass.

  **It is a bead, not a disc.** Warm at the centre, then a ring a shade
  darker than the paper, then nothing. That ring is the whole difference: a
  flat warm circle reads as a stain sitting on top of the page, because light
  with no shade under it has no form. Give the lit area an edge slightly
  darker than the paper around it and the same warmth reads as a highlight
  on a surface.

  **It is painted in warm near-white on `multiply`, not in gold.** That is
  the only blend that puts a golden pool on the ground without recolouring
  the words it crosses, and the reason is arithmetic: multiply is a product,
  so a warm near-white times cream gives a warmer cream, while the same
  colour times near-black ink is still near-black. `overlay` and `screen`
  both looked right on the ground and turned the body copy gold, which is a
  filter rather than a light. The values in the stylesheet are therefore not
  gold; they are the colour a cream page becomes when gold light falls on
  it, which is the thing that actually has to be painted.

  **This is a stated exception to §1**, not a revision of it. Gold still
  means state everywhere else on the site, and nothing else was allowed to
  become decorative alongside it.

  **The foil** stayed from the same pass: the maroon rules carry a specular
  that travels with the light, the way foil stamping catches a tilt. That
  one is not an exception, because it is gold behaving like gold.

  **What was removed:** photographic parallax on pointer move. The owner
  did not want the background moving, and he was right that it competed
  with the reflection.

  The loop starts on the first pointer move and stops itself once the light
  has caught up, so a still mouse costs nothing. Off entirely for coarse
  pointers and for reduced motion.

- Still banned: glassmorphism, neon glow, gradient text in accents, decorative loops.
- **Cursor-follow effects: retired 2026-07-23 ("becoming a distraction"),
  and revisited 2026-09-05 on the owner's call.** The July judgement was
  right about what it killed. A thing that chases the pointer competes with
  the page, and the reader watches the effect instead of reading. What
  replaced it does not chase anything:

  - **Glass.** The photographic plates sit a few pixels behind the page and
    shift against it, sixteen at the front and eight at the back. No text
    moves, no control moves, nothing the reader is trying to hit moves.
  - **Foil.** The maroon rules are stamped rather than printed: a band of
    gold travels along them as the pointer moves, the way foil catches light
    when a card is tilted. The dark button gets the same at the weight of a
    bevel.

  A gold glow following the cursor was asked for and not built, because it
  breaks §1: gold is a state and it means the system is working or it wants
  a person. Painting it across the page as decoration empties that out, and
  a glowing shape trailing a cursor is a trick rather than a finish. Putting
  the specular on the metal keeps the meaning and gets the luxury.

  Both are transform-and-gradient only, both are off for coarse pointers and
  for reduced motion, and both resolve to the page at rest when the pointer
  leaves. `--mx` and `--my` are the only two numbers involved.

**Theme switcher (same round):** manual toggle in nav (`html.light` + localStorage `spectre.site.theme`, pre-paint script in layout, falls back to system scheme). **Logos:** the real bird mark (brand-systems SVG, currentColor) inlined in nav + footer; `spectre-square-black.svg` is the favicon. **Mobile:** product links collapse to a hamburger sheet under 800px; researcher playground collapses to one column under 680px; wide tables scroll in their own container.

## 10. Open for his verdict

1. **Whether the restraint now reads as expensive or still as thin.** That
   was the whole argument of this revision: the problem was never the
   discipline, it was that the discipline was executed with default leading,
   default tracking and default spacing. If it still reads thin, the fault is
   in the craft and not in §1.
2. **The surface grain.** A fine tooth over the whole page at 3%, fixed and
   never animated. Argued as the tooth of the ground the brand claims to be
   printed on rather than as decorative noise, which §7 rules out. One line
   to remove.
3. **The ledger.** The staging rail that follows the reader down the home
   page and ends in one approval. It is the approval doctrine performed
   rather than described, and it is the most persuasive thing on the site,
   which is exactly why its `SCRIPTED DEMONSTRATION` stamp is not
   negotiable.
4. The status-badge wording set.
