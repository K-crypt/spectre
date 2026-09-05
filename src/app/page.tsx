import Link from "next/link";
import type { Metadata } from "next";
import { Reveal, Words } from "@/components/shell/reveal";
import { Counter } from "@/components/shell/counter";
import { Scene } from "@/components/shell/scroll-scene";
import { SystemsStage } from "@/components/sections/systems-stage";
import { Day } from "@/components/sections/day";
import { AccessForm } from "@/components/sections/access-form";
import { JsonLd, organizationLd, canonical } from "@/lib/site";
import { withBasePath } from "@/lib/base-path";

/* ── The home page, in six movements ───────────────────────────────────────

     I    The promise         what this is
     II   The five systems    the roster, at a glance
     III  One working day     the argument, demonstrated
     IV   The crossing        the governing principle, alone on a screen
     V    Proof               three pieces of evidence, each dated
     VI   Access              one decision, one action

   The rule, applied without exception: one dominant statement per movement,
   at most one supporting sentence, one meaningful visual, one action where
   an action is needed. Everything that was explanation now lives on the
   product pages, where a reader has already asked for it.

   The page crosses grounds exactly once. Movements I to III stand on
   graphite, the dawn photograph carries the crossing, and movements V and
   VI stand on paper. The previous build crossed five times, which reads as
   oscillation; once, in one direction, reads as a composition.
   ───────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  alternates: { canonical: canonical("/") },
};

export default function Home() {
  return (
    <main id="main">
      <JsonLd data={organizationLd()} />

      {/* ── I. THE PROMISE ─────────────────────────────────────────────── */}
      <Scene className="hero" mode="leave" aria-labelledby="promise">
        <div className="hero-art" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/ridge-1920.webp")}
            srcSet={`${withBasePath("/ridge-1280.webp")} 1280w, ${withBasePath("/ridge-1920.webp")} 1920w, ${withBasePath("/ridge-2560.webp")} 2560w`}
            sizes="100vw"
            width={1920}
            height={823}
            alt=""
            fetchPriority="high"
          />
        </div>

        <div className="wrap hero-body">
          <Words
            as="h1"
            id="promise"
            className="display-xl hero-title"
            lines={["Automate what can be.", "Focus on what can't."]}
          />
          <Reveal delay={220}>
            <p className="lede hero-lede">
              Five systems that take over the repeatable half of a seat. The
              judgment stays yours.
            </p>
          </Reveal>
          <Reveal delay={320} className="hero-actions">
            <Link className="btn btn-hard" href="#access">
              Request access
            </Link>
            <Link className="btn" href="#systems">
              See the systems
            </Link>
          </Reveal>
      </div>
    </Scene>

      {/* ── II. THE FIVE SYSTEMS ───────────────────────────────────── */}
      <section id="systems" aria-labelledby="systems-title">
        <SystemsStage />
      </section>

      {/* ── III. ONE WORKING DAY ───────────────────────────────────
            A horizontal pan. Scrolling down moves the day left to right
            through its hours, which is the axis a day actually has, and it
            is a different device from the pinned scene above so the page
            does not repeat itself. */}
      <section id="day" aria-labelledby="day-title">
        <Day />
      </section>

      {/* ── IV. THE CROSSING ─────────────────────────────────────────────
          The single ground change, and the governing principle of the
          company standing in it. Nothing else is on this screen. */}
      <Scene className="crossing" aria-labelledby="principle">
        <div className="crossing-art is-maroon" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/crossing-1920.webp")}
            srcSet={`${withBasePath("/crossing-1280.webp")} 1280w, ${withBasePath("/crossing-1920.webp")} 1920w, ${withBasePath("/crossing-2560.webp")} 2560w`}
            sizes="100vw"
            width={1920}
            height={791}
            loading="lazy"
            decoding="async"
            alt=""
          />
        </div>
        <div className="crossing-veil" aria-hidden />

        <div className="crossing-block">
          {/* Lit word by word by the scroll rather than revealed on entry.
              It is the one line on the site worth slowing a reader down
              for, so it is the one place the scroll is spent on reading
              speed instead of on movement. */}
          <Words
            lit
            id="principle"
            className="display-manifesto crossing-thesis"
            lines={["The machine prepares.", "The human decides."]}
          />
          <p className="crossing-note">
            Visible sources. Logged approvals. Reversible actions.
          </p>
        </div>
      </Scene>

      {/* ── V. PROOF ──────────────────────────────────────────────────── */}
      <section className="section has-art" id="proof" aria-labelledby="proof-title">
        {/* Stacked ridgelines fading into fog. The ground plate was tried
            here first and is the wrong shape for the job: everything in it
            is in the dark lower third, which is exactly where a section
            with three columns of figures has to be flat paper. This one
            carries its interest across the whole frame, so the band that
            survives the wash is still a picture. */}
        <div className="section-art" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/plate-researcher-1536.webp")}
            srcSet={`${withBasePath("/plate-researcher-1024.webp")} 1024w, ${withBasePath("/plate-researcher-1536.webp")} 1536w`}
            sizes="100vw"
            width={1536}
            height={768}
            loading="lazy"
            decoding="async"
            alt=""
          />
        </div>
        <div className="wrap">
          <div className="movement-head">
            <Words
              id="proof-title"
              className="display-lg"
              lines={["Built inside", "working businesses."]}
            />
            <Reveal delay={140}>
              <p className="lede">
                Not a roadmap. Three things that have already happened, each one
                dated.
              </p>
            </Reveal>
          </div>

          <Reveal className="proof" stagger>
            <div className="proof-item" style={{ "--i": 0 } as React.CSSProperties}>
              <span className="stamp stamp-ruby">Manufacturing</span>
              {/* The one figure on the page that is a count, so it counts.
                  It runs once, when the reader reaches it, and never past
                  the real number. */}
              <p className="proof-figure">
                About <Counter to={400} duration={1600} />
              </p>
              <p className="proof-said">Machines mapped.</p>
              <p className="proof-note">
                An order is tested against real capacity before the business
                commits to a date.
              </p>
              <span className="stamp proof-asof">Pilot build. Client named on permission.</span>
            </div>

            <div className="proof-item" style={{ "--i": 1 } as React.CSSProperties}>
              <span className="stamp stamp-ruby">Export</span>
              <p className="proof-figure">One live business</p>
              <p className="proof-said">Run through the system.</p>
              <p className="proof-note">
                Brand memory, content, outreach and reporting, in real weekly
                work since July 2026.
              </p>
              <span className="stamp proof-asof">
                <a href="https://carpetstory.one" rel="noopener">
                  Carpetstory
                </a>
                . As of Jul 2026.
              </span>
            </div>

            <div className="proof-item" style={{ "--i": 2 } as React.CSSProperties}>
              <span className="stamp stamp-ruby">Research</span>
              <p className="proof-figure">Every claim</p>
              <p className="proof-said">Challenged, then re-sourced.</p>
              <p className="proof-note">
                Two material claims failed the first pass and were replaced
                before a reader saw them.
              </p>
              <span className="stamp proof-asof">Delivered Jul 2026.</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── VI. ACCESS ────────────────────────────────────────────────── */}
      <section className="section" id="access" aria-labelledby="access-title">
        <div className="wrap">
          <div className="split">
            <div className="movement-head">
              <Words
                id="access-title"
                className="display-lg"
                lines={["Start with one", "serious decision."]}
              />
              <Reveal delay={140}>
                <p className="lede">
                  Bring the workflow you would not delegate. That is the one worth
                  testing first.
                </p>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <AccessForm />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
