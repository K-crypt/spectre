import { Reveal, Stamp, Headline, Counter } from "@/components/ui";
import { WaitlistForm } from "@/components/interactive";
import { Suite } from "@/components/suite";
import { Day } from "@/components/day";
import { Hero, TuesdayGround, Dawn } from "@/components/chapters";
import { withBasePath } from "@/lib/base-path";

/* ── Six scenes ───────────────────────────────────────────────────────────
   The page was a document: every chapter carried a heading, a claim, a deck
   and a body, so five things asked for attention at once and the reader had
   to assemble the argument themselves.

   It is a sequence of scenes now, and each one holds a single idea:

     I    The promise        — what this is
     II   The suite          — five systems, one memory
     III  The system working — a day, in four beats
     IV   Human authority    — the governing principle, almost empty
     V    Proof              — three pieces of evidence
     VI   Private access     — one decision, one action

   The rule applied everywhere: one dominant statement, at most one
   supporting sentence, one meaningful visual, one action if an action is
   needed. Everything that was explanation now lives on the product pages,
   where someone who wants it has already asked for it.
   ───────────────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main id="main">
      {/* ── I. THE PROMISE ── */}
      <Hero />

      {/* ── II. THE SUITE ── */}
      <section
        className="section island on-dark scene scene-suite"
        id="room"
        aria-labelledby="suite-title"
      >
        {/* The ridge again, pushed far back — the same range the opening
            stands on, seen from inside the room. It gives the scene depth
            and a horizon without competing with the instrument in front of
            it, and it costs nothing: the browser already has this file. */}
        <div className="scene-air" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/ridge-1920.webp")}
            srcSet={`${withBasePath("/ridge-1280.webp")} 1280w, ${withBasePath("/ridge-1920.webp")} 1920w`}
            sizes="100vw"
            width={1920}
            height={823}
            loading="lazy"
            decoding="async"
            alt=""
          />
        </div>
        <div className="wrap">
          <Reveal className="scene-head">
            <Headline
              id="suite-title"
              className="scene-title"
              lines={["Five systems.", "One operating memory."]}
            />
            {/* The only place the name is explained, and it is explained by
                the thing underneath it rather than by an adjective. */}
            <p className="scene-line">Present everywhere. Visible when it matters.</p>
          </Reveal>
          <Suite />
        </div>
      </section>

      {/* ── III. THE SYSTEM WORKING ── */}
      <TuesdayGround>
        <div className="tuesday-inner">
          <Reveal className="scene-head">
            <Headline
              className="scene-title"
              lines={["Spectre works all day.", "You touch it once."]}
            />
          </Reveal>
          <Day />
        </div>
      </TuesdayGround>

      {/* ── IV. HUMAN AUTHORITY ──
          The crossing from graphite into ivory, and the governing principle
          of the company standing in it. Nothing else is on this screen. */}
      <Dawn>
        <div className="dawn-art" aria-hidden>
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

        <div className="dawn-rule">
          <p className="dawn-thesis">
            <span className="dawn-machine">The machine prepares.</span>
            <span className="dawn-human">The human decides.</span>
          </p>
          <small>Visible sources. Logged approvals. Reversible actions.</small>
        </div>
      </Dawn>

      {/* ── V. PROOF ── */}
      <section
        className="section on-stone scene scene-proof"
        id="proof"
        aria-labelledby="proof-title"
      >
        <div className="wrap">
          <Reveal className="scene-head">
            <Stamp>Proof before promise</Stamp>
            <Headline
              id="proof-title"
              className="scene-title"
              lines={["Built inside", "working businesses."]}
            />
          </Reveal>

          <Reveal stagger className="ledger">
            <div className="ledger-item">
              <span className="mono ledger-index">Manufacturing</span>
              <strong className="display">
                <Counter to={400} prefix="≈" />
              </strong>
              <span className="ledger-said">Machines mapped.</span>
              <span>An order tested against real capacity before the business commits.</span>
              <em>Pilot build · client named on permission</em>
            </div>
            <div className="ledger-item">
              <span className="mono ledger-index">Export</span>
              <strong className="display">One live business</strong>
              <span className="ledger-said">Run through the system.</span>
              <span>Brand memory, content, outreach and reporting in real weekly work.</span>
              <em>
                <a href="https://carpetstory.one">Carpetstory ↗</a> · as of Jul 2026
              </em>
            </div>
            <div className="ledger-item">
              <span className="mono ledger-index">Research</span>
              <strong className="display">Every claim</strong>
              <span className="ledger-said">Challenged, then re-sourced.</span>
              <span>Two material claims failed the first pass and were replaced before a reader saw them.</span>
              <em>Delivered · Jul 2026</em>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── VI. PRIVATE ACCESS ── */}
      <section
        className="section island on-dark scene scene-access"
        id="access"
        aria-labelledby="access-title"
      >
        <div className="scene-air is-low" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/ridge-1920.webp")}
            srcSet={`${withBasePath("/ridge-1280.webp")} 1280w, ${withBasePath("/ridge-1920.webp")} 1920w`}
            sizes="100vw"
            width={1920}
            height={823}
            loading="lazy"
            decoding="async"
            alt=""
          />
        </div>
        <div className="wrap access-grid">
          <Reveal>
            <Headline
              id="access-title"
              className="scene-title"
              lines={["Start with one", "serious decision."]}
            />
            <p className="scene-line">
              Bring the workflow you would not delegate.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="access-panel">
              <WaitlistForm />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
