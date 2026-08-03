import Link from "next/link";
import { Reveal, Stamp, Status } from "@/components/ui";
import { PRODUCTS_DATA as PRODUCTS } from "@/lib/products";
import { Motif } from "@/components/motifs";
import { WaitlistForm } from "@/components/interactive";
import { HeroPhoto } from "@/components/atmosphere";
import { OpsFeed } from "@/components/ops-feed";
import { RoundTable } from "@/components/roundtable";

export default function Home() {
  return (
    <main>
      {/* ── HERO — the company line, presented with the weight it deserves ── */}
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
              Built by people who love one thing: solving business problems with
              ingenious use of the newest tech.
            </p>
            <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center", flexWrap: "wrap", marginTop: 30 }}>
              <a href="#access" className="btn btn-hard">Request early access</a>
              <a href="#systems" className="btn btn-soft">See the systems</a>
            </div>
            <div className="mono" style={{ fontSize: 11, color: "var(--ghost)", marginTop: 18 }}>
              One of these systems already runs a real company&apos;s entire marketing operation.
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 01 · WHY — the belief, up front ── */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "104px 24px" }}>
          <Reveal>
            <Stamp>01 · WHY WE BUILD</Stamp>
            <p className="display" style={{ fontSize: "clamp(26px, 3.6vw, 38px)", lineHeight: 1.4, maxWidth: "34ch" }}>
              Some things should never be automated: your judgment, your taste, the
              relationships that carry your name.
              <br />
              <span style={{ color: "var(--ghost)" }}>
                Everything else is workload, and taking workload off you is what we are for.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 02 · HOW — they propose, you decide ── */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "88px 24px" }}>
          <Reveal>
            <Stamp>02 · HOW IT WORKS</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 8 }}>They propose. You decide.</h2>
            <p style={{ color: "var(--ghost)", maxWidth: "52ch", marginBottom: 36 }}>
              Five specialists sit at your table. They prepare the work and wait.
              Nothing leaves without your yes.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 44, alignItems: "center" }}>
            <Reveal delay={80}>
              <RoundTable />
            </Reveal>
            <Reveal delay={140}>
              <OpsFeed />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 03 · WHAT — the five systems ── */}
      <section className="hairline-b" id="systems">
        <div className="wrap" style={{ padding: "80px 24px" }}>
          <Reveal>
            <Stamp>03 · THE SYSTEMS</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 8 }}>Five specialists, one rule.</h2>
            <p style={{ color: "var(--ghost)", maxWidth: "56ch", marginBottom: 32 }}>
              None of them acts without you.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16 }}>
            {PRODUCTS.map((p, idx) => (
              <Reveal key={p.slug} delay={idx * 60}>
                <Link href={`/${p.slug}/`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="card roster-card">
                    <Motif kind={p.slug} size={150} className="motif-face" style={{ color: p.accent }} />
                    <div className="r-name">
                      <span className="dot" style={{ background: p.accent }} />
                      {p.name}
                    </div>
                    <p className="r-claim">{p.claim}</p>
                    <Status>{p.status}</Status>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · PROOF — ledger exhibits ── */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "80px 24px" }}>
          <Reveal>
            <Stamp>04 · PROOF</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 28 }}>Running today, not promised.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
            <Reveal>
              <div className="card exhibit">
                <Motif kind="cmo" size={110} className="exhibit-motif" style={{ color: "var(--clay)" }} />
                <div className="stamp" style={{ marginBottom: 10 }}>LIVE CLIENT</div>
                <div className="readout">1 FOUNDER · A FEW HOURS A WEEK</div>
                <p style={{ fontSize: 14 }}>
                  <a href="https://carpetstory.one" style={{ color: "var(--ink)" }}>Carpetstory</a>, a luxury rug
                  export house, runs its whole marketing operation through this system.
                </p>
                <div className="mono" style={{ fontSize: 11, color: "var(--ghost)", marginTop: 12 }}>
                  IN PRODUCTION · AS OF JUL 2026
                </div>
              </div>
            </Reveal>
            <Reveal delay={70}>
              <div className="card exhibit">
                <Motif kind="coo" size={110} className="exhibit-motif" style={{ color: "var(--steel)" }} />
                <div className="stamp" style={{ marginBottom: 10 }}>PILOT · OPERATIONS</div>
                <div className="readout">≈400 MACHINES · ONE SCREEN</div>
                <p style={{ fontSize: 14, color: "var(--ghost)" }}>
                  A manufacturing plant digitized into a live operating picture: every
                  zone, machine, and material flow.
                </p>
                <div className="mono" style={{ fontSize: 11, color: "var(--ghost)", marginTop: 12 }}>
                  CLIENT NAMED ON PERMISSION · PILOT BUILD
                </div>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="card exhibit">
                <Motif kind="researcher" size={110} className="exhibit-motif" style={{ color: "var(--archive)" }} />
                <div className="stamp" style={{ marginBottom: 10 }}>RESEARCH PROGRAM</div>
                <div className="readout">EVERY CHAPTER RE-VERIFIED</div>
                <p style={{ fontSize: 14, color: "var(--ghost)" }}>
                  A complete market-entry study for an industrial plant: machines,
                  market, competition, and strategy.
                </p>
                <div className="mono" style={{ fontSize: 11, color: "var(--ghost)", marginTop: 12 }}>
                  DELIVERED JUL 2026 · METHOD ON THE RESEARCHER PAGE
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 05 · ACCESS ── */}
      <section id="access">
        <div className="wrap" style={{ padding: "88px 24px" }}>
          <Reveal>
            <Stamp>05 · EARLY ACCESS</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 8 }}>Early access opens in order.</h2>
            <p style={{ color: "var(--ghost)", maxWidth: "52ch", marginBottom: 24 }}>
              Tell us what you would automate first. We reply within 48 hours.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <WaitlistForm />
            <div className="mono" style={{ fontSize: 11, color: "var(--ghost)", marginTop: 20 }}>
              BUILT BY ONE FOUNDER TO RUN THREE VENTURES IN UNDER TEN HOURS A WEEK. NOW OPENING TO OTHERS.
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
