import type { Metadata } from "next";
import { Reveal, Stamp } from "@/components/ui";
import { Motif } from "@/components/motifs";
import { WaitlistForm, Comparison } from "@/components/interactive";
import { ResearcherPlayground } from "@/components/researcher-playground";
import { ChatShowcase } from "@/components/chat-showcase";
import { SCENARIOS } from "@/lib/chat-scenarios";

export const metadata: Metadata = {
  title: "AI Researcher — The Spectre",
  description: "The diligence a committee would do, at a depth a committee can't.",
};

export default function ResearcherPage() {
  return (
    <main style={{ ["--accent" as string]: "var(--archive)" }}>
      <section className="hairline-b" style={{ position: "relative", overflow: "hidden" }}>
        <Motif kind="researcher" size={420} style={{ position: "absolute", right: -60, top: -40, color: "var(--archive)", opacity: 0.1 }} />
        <div className="wrap" style={{ padding: "96px 24px 72px", position: "relative" }}>
          <Reveal>
            <Stamp>AI RESEARCHER · <span style={{ color: "var(--archive)" }}>METHOD PROVEN</span></Stamp>
            <h1 className="display" style={{ fontSize: "clamp(36px, 5.2vw, 56px)", maxWidth: "19ch" }}>
              The diligence a committee would do, at a depth a committee can&apos;t.
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ color: "var(--ghost)", maxWidth: "58ch", marginTop: 20, fontSize: 16 }}>
              Machine-scale research with its own adversarial review. Every claim
              sourced, checked, and corrected before you read it.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <a href="#access" className="btn btn-hard">Discuss a research program</a>
              <a href="#playground" className="btn btn-soft">Browse a library</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="hairline-b" id="playground">
        <div className="wrap" style={{ padding: "72px 24px" }}>
          <Reveal>
            <Stamp>WHAT A PROGRAM LOOKS LIKE</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 24 }}>You receive a library, not a deck.</h2>
          </Reveal>
          <Reveal delay={80}>
            <ResearcherPlayground />
          </Reveal>
        </div>
      </section>

      <section className="hairline-b">
        <div className="wrap" style={{ padding: "72px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "start" }}>
          <Reveal>
            <Stamp>THE CHAT LAYER</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 16 }}>Ask it a real question.</h2>
            <p style={{ color: "var(--ghost)", maxWidth: "50ch" }}>
              A finished library keeps answering. It checks your own studies before it
              opines, cites what it found, and files the work back. Watch it
              price-check a broker&apos;s offer.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ChatShowcase scenario={SCENARIOS.researcher} />
          </Reveal>
        </div>
      </section>

      <section className="hairline-b">
        <div className="wrap" style={{ padding: "72px 24px", maxWidth: 800 }}>
          <Reveal>
            <Stamp>THE METHOD</Stamp>
            <p style={{ fontSize: 15, color: "var(--ghost)", maxWidth: "60ch", lineHeight: 1.8 }}>
              A real program runs like this: the ground truth is read first, from your
              documents. Then fleets of specialist agents research every chapter in
              parallel, at a depth a human team does not have the hours for. Then the
              part that matters: <span style={{ color: "var(--ink)" }}>we attack our own work.</span> A
              separate adversarial pass re-checks every load-bearing claim against its
              sources, and the corrections are made before you see a page. What stays
              uncertain is flagged, never smoothed over.
            </p>
            <div className="mono" style={{ fontSize: 11, color: "var(--ghost)", marginTop: 16 }}>
              LATEST PROGRAM: DELIVERED JUL 2026 · DOZENS OF AGENTS, THOUSANDS OF OPERATIONS ·
              EVERY CHAPTER RE-VERIFIED · EXACT FIGURES PUBLISH ON CLIENT SIGN-OFF
            </div>
          </Reveal>
        </div>
      </section>

      <section className="hairline-b">
        <div className="wrap" style={{ padding: "72px 24px" }}>
          <Reveal>
            <Stamp>WHAT YOU RECEIVE</Stamp>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            {[
              ["The full map", "Machines or market, competition, strategy: one structured library that answers the question and the ten questions behind it."],
              ["An explorable console", "Not a PDF. A browsable app of the findings your team can search, filter, and return to."],
              ["The decision list", "Every program ends with the decisions it forces, ranked, with the evidence attached to each."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 60}>
                <div className="card" style={{ padding: 20 }}>
                  <div className="mono" style={{ fontSize: 11, color: "var(--archive)", marginBottom: 10 }}>0{i + 1}</div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{t}</div>
                  <p style={{ color: "var(--ghost)", fontSize: 13 }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
            <Stamp>EARLY ACCESS</Stamp>
            <h2 className="display" style={{ fontSize: 30, marginBottom: 24 }}>Design the research program around your decision.</h2>
            <WaitlistForm preselect="researcher" />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
