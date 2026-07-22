import Link from "next/link";
import { Reveal, Stamp, Status, ApproveCard } from "@/components/ui";
import { PRODUCTS_DATA as PRODUCTS } from "@/lib/products";
import { Motif } from "@/components/motifs";
import { Comparison, WaitlistForm } from "@/components/interactive";
import { ChatShowcase } from "@/components/chat-showcase";
import { SCENARIOS } from "@/lib/chat-scenarios";

const TAKE = ["status reports", "first drafts", "monitoring", "follow-ups", "research legwork", "scheduling", "data pulls", "reconciliation"];
const KEEP = ["judgment", "taste", "relationships", "the final call"];

export default function Home() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "96px 24px 72px" }}>
          <Reveal>
            <Stamp>EST. 2026 · JAIPUR · HOUSE OF DOTONE</Stamp>
            <h1 className="display" style={{ fontSize: "clamp(40px, 6vw, 64px)", maxWidth: "18ch" }}>
              Automate what can be. Focus on what can&apos;t.
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ color: "var(--ghost)", maxWidth: "58ch", marginTop: 20, fontSize: 16 }}>
              The Spectre builds AI operating teams for your business. They run the
              repeatable work, and nothing they do goes out without your approval.
            </p>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginTop: 28 }}>
              <a href="#access" className="btn btn-hard">Request early access</a>
              <a href="#systems" className="btn btn-soft">See the systems</a>
            </div>
            <div className="mono" style={{ fontSize: 11, color: "var(--ghost)", marginTop: 16 }}>
              One of these systems already runs a real company&apos;s entire marketing operation.
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DIVISION OF LABOR ── */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "80px 24px" }}>
          <Reveal>
            <Stamp>01 · THE DIVISION</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 32 }}>There are two kinds of work.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            <Reveal>
              <div className="card" style={{ padding: 24 }}>
                <div className="stamp" style={{ marginBottom: 16 }}>THE WORK WE TAKE</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {TAKE.map((t) => (
                    <span key={t} className="chip" style={{ cursor: "default" }}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="card" style={{ padding: 24, borderColor: "var(--brass)" }}>
                <div className="stamp" style={{ marginBottom: 16, color: "var(--brass)" }}>THE WORK YOU KEEP</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {KEEP.map((t) => (
                    <span key={t} className="chip" style={{ cursor: "default", color: "var(--ink)" }}>{t}</span>
                  ))}
                </div>
                <p style={{ color: "var(--ghost)", fontSize: 13, marginTop: 16 }}>
                  That division is the whole idea behind The Spectre.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── THE COMPARISON — the centerpiece ── */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "80px 24px" }}>
          <Reveal>
            <Stamp>02 · WHY US</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 8 }}>The same task, three ways.</h2>
            <p style={{ color: "var(--ghost)", maxWidth: "56ch", marginBottom: 28 }}>
              Pick something you did last month. Then compare who does it, what it
              costs, and what you are left with.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <Comparison />
          </Reveal>
        </div>
      </section>

      {/* ── THE ROSTER ── */}
      <section className="hairline-b" id="systems">
        <div className="wrap" style={{ padding: "80px 24px" }}>
          <Reveal>
            <Stamp>03 · THE ROSTER</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 8 }}>Five specialists, one rule.</h2>
            <p style={{ color: "var(--ghost)", maxWidth: "56ch", marginBottom: 32 }}>
              Each one runs a different side of your operation. None of them acts
              without you.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16 }}>
            {PRODUCTS.map((p, idx) => (
              <Reveal key={p.slug} delay={idx * 60}>
                <Link href={`/${p.slug}/`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="card roster-card">
                    <Motif kind={p.slug} size={72} style={{ position: "absolute", right: -18, top: -18, color: p.accent, opacity: 0.13 }} />
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

      {/* ── THE PHILOSOPHY ── */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "80px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "center" }}>
          <Reveal>
            <Stamp>04 · THE PHILOSOPHY</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 16 }}>The machine proposes. You decide.</h2>
            <p style={{ color: "var(--ghost)", maxWidth: "52ch" }}>
              Every system we build can only stage its work: a draft, a plan, an order,
              a report. Nothing is published, sent, or spent until you tap yes, and
              every action is logged.
            </p>
            <p style={{ marginTop: 12, fontSize: 15 }}>
              That is not a setting we turned on. It is how the architecture works.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ApproveCard
              accent="var(--spectral)"
              payloads={[
                "Weekly digest drafted: 3 anomalies flagged, 2 decisions need you, 14 items ran clean.",
                "Outreach batch staged: 12 drafts in your voice, 3 flagged for your judgment.",
                "Order simulation complete: feasible with one bottleneck. Purchase list ready for sign-off.",
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ── THE CHAT LAYER ── */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "80px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "start" }}>
          <Reveal>
            <Stamp>05 · THE CHAT LAYER</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 16 }}>Ask your business a real question.</h2>
            <p style={{ color: "var(--ghost)", maxWidth: "52ch" }}>
              Every product carries a chatbot that knows its own domain and, in the
              live version, your data. It does not just answer; it checks the real
              numbers, thinks through the constraints, and stages the actions for
              your approval.
            </p>
            <p style={{ marginTop: 12, fontSize: 15 }}>
              Here is the operations one, thinking through a rush order.
            </p>
            <p className="mono" style={{ fontSize: 11, color: "var(--ghost)", marginTop: 16 }}>
              A PREVIEW OF EACH PRODUCT&apos;S BOT IS IN THE CORNER OF ITS PAGE, RIGHT NOW.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ChatShowcase scenario={SCENARIOS.coo} />
          </Reveal>
        </div>
      </section>

      {/* ── PROOF ── */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "80px 24px" }}>
          <Reveal>
            <Stamp>06 · PROOF</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 28 }}>Running today, not promised.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
            <Reveal>
              <div className="card" style={{ padding: 22 }}>
                <div className="stamp" style={{ marginBottom: 10 }}>LIVE CLIENT</div>
                <p style={{ fontSize: 14 }}>
                  <a href="https://carpetstory.one" style={{ color: "var(--ink)" }}>Carpetstory</a>, a luxury rug
                  export house, runs its whole marketing operation through this system:
                  content, publishing, outreach, ads review, and analytics. Its founder
                  reviews the work in a few hours a week.
                </p>
                <div className="mono" style={{ fontSize: 11, color: "var(--ghost)", marginTop: 12 }}>
                  IN PRODUCTION · AS OF JUL 2026
                </div>
              </div>
            </Reveal>
            <Reveal delay={70}>
              <div className="card" style={{ padding: 22 }}>
                <div className="stamp" style={{ marginBottom: 10 }}>PILOT · OPERATIONS</div>
                <p style={{ fontSize: 14, color: "var(--ghost)" }}>
                  A manufacturing plant with about 400 machines, digitized into a live
                  operating picture: every zone, machine, and material flow on one screen.
                </p>
                <div className="mono" style={{ fontSize: 11, color: "var(--ghost)", marginTop: 12 }}>
                  CLIENT NAMED ON PERMISSION · PILOT BUILD
                </div>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="card" style={{ padding: 22 }}>
                <div className="stamp" style={{ marginBottom: 10 }}>RESEARCH PROGRAM</div>
                <p style={{ fontSize: 14, color: "var(--ghost)" }}>
                  A complete market-entry study for an industrial plant: machines,
                  market, competition, and strategy, with every chapter re-verified
                  before it reached the client.
                </p>
                <div className="mono" style={{ fontSize: 11, color: "var(--ghost)", marginTop: 12 }}>
                  DELIVERED JUL 2026 · METHOD ON THE RESEARCHER PAGE
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "96px 24px" }}>
          <Reveal>
            <p className="display" style={{ fontSize: "clamp(24px, 3.4vw, 34px)", lineHeight: 1.45, maxWidth: "36ch" }}>
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

      {/* ── WAITLIST ── */}
      <section id="access">
        <div className="wrap" style={{ padding: "80px 24px" }}>
          <Reveal>
            <Stamp>07 · EARLY ACCESS</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 8 }}>Early access opens in order.</h2>
            <p style={{ color: "var(--ghost)", maxWidth: "52ch", marginBottom: 24 }}>
              Each product opens to its waitlist as it becomes ready. Tell us what you
              would automate first, and we will reply within 48 hours.
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
