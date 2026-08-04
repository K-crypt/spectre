import { Reveal, Stamp } from "@/components/ui";
import { WaitlistForm } from "@/components/interactive";
import { HeroPhoto, RidgeEcho } from "@/components/atmosphere";
import { RoundTable } from "@/components/roundtable";
import { Day } from "@/components/day";

export default function Home() {
  return (
    <main>
      {/* ── HERO — the company line over white fog ── */}
      <section className="hairline-b hero">
        <HeroPhoto />
        <div className="wrap hero-center">
          <Reveal>
            <h1 className="display hero-line">
              <span style={{ display: "block" }}>Automate what can be.</span>
              <span style={{ display: "block" }}>Focus on what can&apos;t.</span>
            </h1>
          </Reveal>
          <Reveal delay={90}>
            <p className="hero-why">
              Five AI specialists that make your executive team more powerful.
              They prepare the work; your people make the calls.
            </p>
            <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center", flexWrap: "wrap", marginTop: 30 }}>
              <a href="#access" className="btn btn-hard">Request early access</a>
              <a href="#day" className="btn btn-soft">Watch one day</a>
            </div>
            <div className="hero-readouts mono">
              <span>5 SPECIALISTS</span>
              <span>1 RULE — YOUR YES</span>
              <span>3 LIVE OPERATIONS TODAY</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── THE TABLE — the cast ── */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "96px 24px", textAlign: "center" }}>
          <Reveal>
            <Stamp>THE TABLE</Stamp>
            <h2 className="display" style={{ fontSize: "clamp(30px, 4vw, 42px)", marginBottom: 10 }}>
              Your suite, amplified.
            </h2>
            <p style={{ color: "var(--ghost)", maxWidth: "52ch", margin: "0 auto 8px" }}>
              Five specialists prepare the work and wait. They sit with your team,
              not instead of it — and only one line ever leaves the table.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <RoundTable />
          </Reveal>
        </div>
      </section>

      {/* ── THE DAY — the spine ── */}
      <section className="hairline-b" id="day">
        <div className="wrap" style={{ padding: "88px 24px" }}>
          <Reveal>
            <Stamp>ONE DAY</Stamp>
            <h2 className="display" style={{ fontSize: "clamp(30px, 4vw, 42px)", marginBottom: 6 }}>
              A Tuesday, run by the table.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Day />
          </Reveal>
        </div>
      </section>

      {/* ── THE MEANING ── */}
      <section className="hairline-b why-sec">
        <RidgeEcho />
        <div className="wrap" style={{ padding: "110px 24px", position: "relative" }}>
          <Reveal>
            <Stamp>WHY WE BUILD</Stamp>
            <p className="display" style={{ fontSize: "clamp(26px, 3.6vw, 38px)", lineHeight: 1.4, maxWidth: "34ch" }}>
              Some things should never be automated: your judgment, your taste, the
              relationships that carry your name.
              <br />
              <span style={{ color: "var(--ghost)" }}>
                Everything else is workload, and taking workload off you is what we are for.
              </span>
            </p>
          </Reveal>
          <Reveal delay={90}>
            <p style={{ color: "var(--ghost)", fontSize: 15, marginTop: 40, maxWidth: "52ch" }}>
              Built by people who love one thing: solving business problems with
              ingenious use of the newest tech.
            </p>
            <p className="display" style={{ fontSize: "clamp(19px, 2.2vw, 24px)", marginTop: 10, maxWidth: "40ch" }}>
              No good business is run alone. The best help just stopped being only human.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── PROOF — three plates, no boxes ── */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "96px 24px" }}>
          <Reveal>
            <Stamp>PROOF</Stamp>
            <p style={{ color: "var(--ghost)", maxWidth: "52ch", marginBottom: 8 }}>
              The day above is a demonstration. This part is not.
            </p>
          </Reveal>
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
      </section>

      {/* ── ACCESS ── */}
      <section id="access">
        <div className="wrap" style={{ padding: "88px 24px" }}>
          <Reveal>
            <Stamp>EARLY ACCESS</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 8 }}>Early access opens in order.</h2>
            <p style={{ color: "var(--ghost)", maxWidth: "52ch", marginBottom: 24 }}>
              Tell us what you would automate first. We reply within 48 hours.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <WaitlistForm />
            <div className="mono" style={{ fontSize: 11, color: "var(--ghost)", marginTop: 20 }}>
              BUILT AND PROVEN LIVE ON THREE REAL VENTURES. NOW OPENING TO OTHERS.
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
