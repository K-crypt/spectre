import { Reveal, Stamp } from "@/components/ui";
import { WaitlistForm } from "@/components/interactive";
import { RidgeEcho } from "@/components/atmosphere";
import { RoundTable } from "@/components/roundtable";
import { Day } from "@/components/day";

export default function Home() {
  return (
    <main>
      {/* ── ONE CONTINUOUS SHOT — mountains descend into the interactive table ── */}
      <section className="hairline-b mountain-journey" id="table">
        <RoundTable />
      </section>

      <div className="landing-lower">
      {/* ── THE DAY — the spine ── */}
      <section className="lower-section day-section" id="day">
        <div className="wrap lower-wrap">
          <Reveal>
            <Stamp>ONE DAY</Stamp>
            <h2 className="display lower-title">
              A Tuesday, run by the table.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Day />
          </Reveal>
        </div>
      </section>

      {/* ── THE MEANING ── */}
      <section className="lower-section why-sec">
        <RidgeEcho />
        <div className="wrap lower-wrap why-wrap">
          <Reveal>
            <Stamp>WHY WE BUILD</Stamp>
            <p className="display why-statement">
              Some things should never be automated: your judgment, your taste, the
              relationships that carry your name.
              <br />
              <span style={{ color: "var(--ghost)" }}>
                Everything else is workload, and taking workload off you is what we are for.
              </span>
            </p>
          </Reveal>
          <Reveal delay={90}>
            <p className="why-note">
              Built by people who love one thing: solving business problems with
              ingenious use of the newest tech.
            </p>
            <p className="display why-close">
              No good business is run alone. The best help just stopped being only human.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── PROOF — three plates, no boxes ── */}
      <section className="lower-section proof-section">
        <div className="wrap lower-wrap">
          <Reveal>
            <Stamp>PROOF</Stamp>
            <p className="lower-deck">
              The day above is a demonstration. This part is not.
            </p>
          </Reveal>
          <div className="proof-grid">
          <Reveal delay={60}>
            <div className="plate">
              <p className="display plate-line">
                A live company&apos;s entire marketing operation.
              </p>
              <div className="mono plate-stamp">
                <a href="https://carpetstory.one" style={{ color: "inherit" }}>CARPETSTORY</a> · LUXURY RUG EXPORT HOUSE · IN PRODUCTION · AS OF JUL 2026
              </div>
            </div>
          </Reveal>
          <Reveal delay={110}>
            <div className="plate">
              <p className="display plate-line">
                ≈400 machines, digitized into one live operating picture.
              </p>
              <div className="mono plate-stamp">MANUFACTURING PILOT · CLIENT NAMED ON PERMISSION · PILOT BUILD</div>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="plate">
              <p className="display plate-line">
                A market-entry study with every chapter re-verified.
              </p>
              <div className="mono plate-stamp">RESEARCH PROGRAM · DELIVERED JUL 2026 · METHOD ON THE RESEARCHER PAGE</div>
            </div>
          </Reveal>
          </div>
        </div>
      </section>

      {/* ── ACCESS ── */}
      <section className="lower-section access-section" id="access">
        <div className="wrap lower-wrap access-grid">
          <div>
          <Reveal>
            <Stamp>EARLY ACCESS</Stamp>
            <h2 className="display lower-title">Early access opens in order.</h2>
            <p className="lower-deck">
              Tell us what you would automate first. We reply within 48 hours.
            </p>
          </Reveal>
          </div>
          <Reveal delay={80}>
            <div className="access-panel">
            <WaitlistForm />
            <div className="mono" style={{ fontSize: 11, color: "var(--ghost)", marginTop: 20 }}>
              BUILT AND PROVEN LIVE ON THREE REAL VENTURES. NOW OPENING TO OTHERS.
            </div>
            </div>
          </Reveal>
        </div>
      </section>
      </div>
    </main>
  );
}
