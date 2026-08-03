import type { Metadata } from "next";
import { Reveal, Stamp } from "@/components/ui";
import { Motif } from "@/components/motifs";
import { WaitlistForm, Comparison } from "@/components/interactive";
import { HrPlayground } from "@/components/hr-playground";
import { ChatShowcase } from "@/components/chat-showcase";
import { SCENARIOS } from "@/lib/chat-scenarios";

export const metadata: Metadata = {
  title: "AI HR — The Spectre",
  description: "The people layer: records, reviews, hiring for culture and skill.",
};

export default function HrPage() {
  return (
    <main style={{ ["--accent" as string]: "var(--ochre)" }}>
      <section className="hairline-b" style={{ position: "relative", overflow: "hidden" }}>
        <Motif kind="hr" size={420} style={{ position: "absolute", right: -60, top: -40, color: "var(--ochre)", opacity: 0.1 }} />
        <div className="wrap" style={{ padding: "96px 24px 72px", position: "relative" }}>
          <Reveal>
            <Stamp>AI HR · <span style={{ color: "var(--ochre)" }}>TAKING DESIGN PARTNERS</span></Stamp>
            <h1 className="display" style={{ fontSize: "clamp(36px, 5.2vw, 56px)", maxWidth: "18ch" }}>
              People decisions, made with full memory.
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ color: "var(--ghost)", maxWidth: "58ch", marginTop: 20, fontSize: 16 }}>
              The people layer: records, reviews, hiring for culture and skill, and a
              chatbot both sides actually use.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <a href="#access" className="btn btn-hard">Apply as a design partner</a>
              <a href="#playground" className="btn btn-soft">See the concept</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="hairline-b" id="playground">
        <div className="wrap" style={{ padding: "72px 24px" }}>
          <Reveal>
            <Stamp>01 · THE CONSOLE (CONCEPT)</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 8 }}>The people layer, working.</h2>
            <p style={{ color: "var(--ghost)", maxWidth: "58ch", marginBottom: 24 }}>
              Catch the leaver before the resignation letter, approve an appraisal
              drafted from the real record, weigh two candidates fairly, and answer
              both sides of the chat. Every people decision waits for your tap.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <HrPlayground />
          </Reveal>
        </div>
      </section>

      <section className="hairline-b">
        <div className="wrap" style={{ padding: "72px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "start" }}>
          <Reveal>
            <Stamp>02 · THE CHAT LAYER</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 16 }}>Ask it a real question.</h2>
            <p style={{ color: "var(--ghost)", maxWidth: "50ch" }}>
              People decisions are where memory matters most. It reads the records,
              respects your pay bands, and drafts what you would have written on your
              best day. Watch it handle two raise requests fairly.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ChatShowcase scenario={SCENARIOS.hr} />
          </Reveal>
        </div>
      </section>

      <section className="hairline-b">
        <div className="wrap" style={{ padding: "72px 24px" }}>
          <Reveal>
            <Stamp>03 · WHAT IT WILL RUN</Stamp>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            {[
              ["One remembered record", "Salary, attendance, reviews, growth: every person's history in one place that never forgets context at appraisal time."],
              ["Hiring for culture and skill", "Structured scorecards on both axes, so gut feel becomes a defensible decision trail."],
              ["A chatbot both sides use", "Employees ask about leave and payslips; managers ask who needs attention. Both get answers from the same remembered record."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 60}>
                <div className="card" style={{ padding: 20 }}>
                  <div className="mono" style={{ fontSize: 11, color: "var(--ochre)", marginBottom: 10 }}>0{i + 1}</div>
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
            <Stamp>04 · THE HONEST PART</Stamp>
            <p style={{ fontSize: 15, color: "var(--ghost)", maxWidth: "60ch" }}>
              This module is the youngest of the five. We are building it with two or
              three companies, shaped around their real appraisal cycles and hiring
              rounds, on design-partner terms. If that could be you, say so in the form.
            </p>
          </Reveal>
        </div>
      </section>

      {/* THE OLD WAY */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "80px 24px" }}>
          <Reveal>
            <Stamp>05 · THE OLD WAY, SIDE BY SIDE</Stamp>
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
            <Stamp>06 · DESIGN PARTNERS</Stamp>
            <h2 className="display" style={{ fontSize: 30, marginBottom: 24 }}>We are building this with two or three design partners.</h2>
            <WaitlistForm preselect="hr" />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
