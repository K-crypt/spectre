import { Reveal, Stamp, Headline, Counter } from "@/components/ui";
import { WaitlistForm } from "@/components/interactive";
import { Queue } from "@/components/queue";
import { Day } from "@/components/day";
import { Hero, TuesdayGround, Dawn } from "@/components/chapters";
import { PlantGrid } from "@/components/plant";
import { withBasePath } from "@/lib/base-path";
import { DeskChat } from "@/components/desk-chat";

/* Five chapters. Eleven desktop screens became eight, then five.
   Every chapter states one argument, and nothing on the page exists that
   cannot say which one it is making:

     I    The opening      — what this is, and the room it happens in
     II   The table        — five specialists reading one context
     III  One Tuesday      — the rhythm, and the single moment that is yours
     IV   The pilot        — the proof, before any promise
     V    The ask          — one consequential workflow

   "How it works" and "Why we build" are gone as standalone sections. Their
   arguments survive as single lines inside the chapters that were already
   making them, which is where they were always strongest. */

export default function Home() {
  return (
    <main id="main">
      {/* ── I. THE OPENING ── */}
      <Hero />

      {/* ── II. THE TABLE ── */}
      <section className="section island on-dark desk" id="room" aria-labelledby="room-title">
        <div className="wrap">
          {/* The headline had a screen of empty velvet beside it. It now
              holds the thing being described: one specialist actually
              working — reading, drafting, staging, waiting to be released.
              It follows whichever card is open below it. */}
          <div className="desk-head">
            <Reveal className="sec-head">
              <Stamp>Your queue, this morning</Stamp>
              <Headline
                id="room-title"
                className="sec-title"
                lines={["Everything is ready.", "Nothing has happened."]}
              />
              <span className="sec-claim">
                Five decisions, already prepared. None of them taken.
              </span>
            </Reveal>
            <DeskChat />
          </div>
          <Queue />
        </div>
      </section>

      {/* ── III. ONE TUESDAY ── */}
      <TuesdayGround>
        <div className="tuesday-inner">
          <Reveal className="sec-head plated">
            <Stamp>One Tuesday</Stamp>
            <Headline
              className="sec-title"
              lines={["Everything prepared.", "One thing decided."]}
            />
            <span className="sec-claim">
              The machine works the whole day. You touch it once.
            </span>
            <p className="sec-deck">
              A working day, demonstrated on fictional data. The rhythm is
              real.
            </p>
          </Reveal>
          <Day />
        </div>
      </TuesdayGround>

      {/* ── FIRST LIGHT — the crossing from night to day, with the page's
          thesis standing in it. ── */}
      <Dawn>
        {/* The one place the page has to cross from night to day. A gradient
            did it flatly; this is a photograph whose own tone runs from a
            near-black ridge at the top to sunlit fog at the bottom, so the
            crossing is something that happened rather than something drawn. */}
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
        {/* The two halves are not set the same, because they are not the
            same. The machine's half recedes into the fog it is written on;
            yours lands in full ink. The typography makes the argument the
            sentence is only describing. */}
        <div className="dawn-rule">
          <span>The operating rule</span>
          <p className="dawn-thesis">
            <span className="dawn-machine">The machine prepares.</span>
            <span className="dawn-human">The human decides.</span>
          </p>
          <small>
            Clear permissions · visible sources · logged approvals · reversible
            actions
          </small>
        </div>
      </Dawn>

      {/* ── IV. THE PILOT ── */}
      <section className="section on-stone" id="proof" aria-labelledby="proof-title">
        <div className="wrap">
          <div className="proof-head">
            <Reveal className="sec-head">
              <Stamp>Proof before promise</Stamp>
              <Headline
                id="proof-title"
                className="sec-title"
                lines={["Built inside", "working businesses."]}
              />
              <span className="sec-claim">
                Not a demo lab. A factory, an export house, a study.
              </span>
              <p className="sec-deck">
                Context first, action second — and every number carries the
                date it was true.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <PlantGrid />
            </Reveal>
          </div>

          <Reveal stagger className="ledger">
            <div className="ledger-item">
              <span className="mono ledger-index">01 · MANUFACTURING</span>
              <strong className="display">
                <Counter to={400} prefix="≈" /> machines, mapped.
              </strong>
              <span>
                An order tested against real capacity before the business
                commits to it. In one exercise Spectre surfaced the same
                two-machine requirement management had reached independently —
                and still waited for a human.
              </span>
              <em>PILOT BUILD · CLIENT NAMED ON PERMISSION</em>
            </div>
            <div className="ledger-item">
              <span className="mono ledger-index">02 · EXPORT</span>
              <strong className="display">One live business, run through it.</strong>
              <span>
                Brand memory, content, outreach, ad review and reporting in real
                weekly work — one review queue before anything moves.
              </span>
              <em>
                <a href="https://carpetstory.one">CARPETSTORY ↗</a> · AS OF JUL 2026
              </em>
            </div>
            <div className="ledger-item">
              <span className="mono ledger-index">03 · RESEARCH</span>
              <strong className="display">Every claim challenged, then re-sourced.</strong>
              <span>
                A market-entry study in which two material claims failed the
                first verification pass and were replaced before a reader ever
                saw them.
              </span>
              <em>DELIVERED · JUL 2026</em>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── V. THE ASK ── */}
      <section className="section on-stone" id="access" aria-labelledby="access-title">
        <div className="wrap access-grid">
          <Reveal>
            <Stamp>Private working session</Stamp>
            <Headline
              id="access-title"
              className="sec-title"
              lines={["Start with one", "serious decision."]}
            />
            <span className="sec-claim">
              Bring the workflow you would not delegate.
            </span>
            <p className="sec-deck">
              We map the context, find the decision boundary, and test whether
              a private deployment is justified.
            </p>
            <p className="why-close display-sm">
              Some things should never be automated: your judgment, your taste,
              the relationships that carry your name. Everything else is
              workload — and taking workload off you is what we are for.
            </p>
            <div className="steps" aria-label="How a working session runs">
              {[
                ["01", "Bring it"],
                ["02", "Map it"],
                ["03", "Configure Spectre"],
                ["04", "Run real work"],
                ["05", "Measure the outcome"],
              ].map(([number, label]) => (
                <span key={number}>
                  <b className="mono">{number}</b>
                  {label}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="access-panel">
              <WaitlistForm />
              <p className="mono access-fine">
                SELECTIVE PILOTS · DIRECT FOUNDER INVOLVEMENT · HUMAN APPROVAL BY
                DESIGN
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
