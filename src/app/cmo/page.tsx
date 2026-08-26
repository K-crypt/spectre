import type { Metadata } from "next";
import { Reveal, Stamp } from "@/components/ui";
import { Motif } from "@/components/motifs";
import { WaitlistForm, Comparison } from "@/components/interactive";
import { CmoPlayground } from "@/components/cmo-playground";
import { ChatShowcase } from "@/components/chat-showcase";
import { SCENARIOS } from "@/lib/chat-scenarios";

export const metadata: Metadata = {
  title: "AI CMO — The Spectre",
  description: "A marketing department that never forgets your brand.",
};

export default function CmoPage() {
  return (
    <main style={{ ["--accent" as string]: "var(--clay)" }}>
      <section className="hairline-b" style={{ position: "relative", overflow: "hidden" }}>
        <Motif kind="cmo" size={420} style={{ position: "absolute", right: -60, top: -40, color: "var(--clay)", opacity: 0.1 }} />
        <div className="wrap" style={{ padding: "96px 24px 72px", position: "relative" }}>
          <Reveal>
            <Stamp>AI CMO · <span style={{ color: "var(--clay)" }}>RUNNING IN PRODUCTION</span></Stamp>
            <h1 className="display" style={{ fontSize: "clamp(38px, 5.5vw, 58px)", maxWidth: "18ch" }}>
              A marketing department that never forgets your brand.
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ color: "var(--ghost)", maxWidth: "58ch", marginTop: 20, fontSize: 16 }}>
              Content, outreach, ads, and the numbers, drafted in your voice and staged
              for one approval pass.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <a href="#access" className="btn btn-hard">Discuss a design partnership</a>
              <a href="#playground" className="btn btn-soft">Open the playground</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="hairline-b" id="playground">
        <div className="wrap" style={{ padding: "72px 24px" }}>
          <Reveal>
            <Stamp>THE CONSOLE</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 8 }}>Your week arrives already staged.</h2>
            <p style={{ color: "var(--ghost)", maxWidth: "58ch", marginBottom: 24 }}>
              Approve posts, kill an ad, accept the analyst&apos;s fix, run an agent,
              and watch every verdict ripple through the system. One number tracks
              what still needs you.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <CmoPlayground />
          </Reveal>
        </div>
      </section>

      <section className="hairline-b">
        <div className="wrap" style={{ padding: "72px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "start" }}>
          <Reveal>
            <Stamp>THE CHAT LAYER</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 16 }}>Ask it a real question.</h2>
            <p style={{ color: "var(--ghost)", maxWidth: "50ch" }}>
              Behind the staged queue sits a marketer you can question. It computes the
              numbers before it answers, and its advice ends in staged actions, never
              in vibes. Watch it read a bad week correctly.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ChatShowcase scenario={SCENARIOS.cmo} />
          </Reveal>
        </div>
      </section>

      <section className="hairline-b">
        <div className="wrap" style={{ padding: "72px 24px" }}>
          <Reveal>
            <Stamp>WHAT IT RUNS</Stamp>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            {[
              ["Content, in your voice", "Ideas, drafts, and visuals calibrated to your brand's rules, graded against your own standards before you ever see them."],
              ["Outreach and ads", "Prospect lists, message drafts, and campaign plans with staged approvals and honest kill rules."],
              ["Numbers with provenance", "Metrics calculated through defined tools on a schedule, assumptions visible, anomalies flagged, and one narrated digest a week."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 60}>
                <div className="card" style={{ padding: 20 }}>
                  <div className="mono" style={{ fontSize: 11, color: "var(--clay)", marginBottom: 10 }}>0{i + 1}</div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{t}</div>
                  <p style={{ color: "var(--ghost)", fontSize: 13 }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="hairline-b">
        <div className="wrap" style={{ padding: "64px 24px", maxWidth: 800 }}>
          <Reveal>
            <Stamp>PROOF</Stamp>
            <p className="display" style={{ fontSize: "clamp(20px, 2.6vw, 26px)", lineHeight: 1.5, maxWidth: "40ch" }}>
              This is not a concept. It runs Carpetstory, a luxury rug export house:
              content, publishing, outreach, ads review, analytics.
            </p>
            <div className="mono" style={{ fontSize: 11, color: "var(--ghost)", marginTop: 14 }}>
              FOUNDER TIME ON MARKETING: ~2.5 HRS/WEEK · AS OF JUL 2026 · CARPETSTORY.ONE
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE OLD WAY */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "80px 24px" }}>
          <Reveal>
            <Stamp>THE OLD WAY, SIDE BY SIDE</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 8 }}>The same task, three ways.</h2>
            <p style={{ color: "var(--ghost)", maxWidth: "56ch", marginBottom: 28 }}>
              Pick something you did last month, and compare.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <Comparison />
          </Reveal>
        </div>
      </section>

      <section id="access">
        <div className="wrap" style={{ padding: "72px 24px" }}>
          <Reveal>
            <Stamp>DESIGN PARTNERSHIP</Stamp>
            <h2 className="display" style={{ fontSize: 30, marginBottom: 24 }}>Configure the first operating rhythm with us.</h2>
            <WaitlistForm preselect="cmo" />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
