import type { Metadata } from "next";
import { Reveal, Stamp } from "@/components/ui";
import { Motif } from "@/components/motifs";
import { WaitlistForm, Comparison } from "@/components/interactive";
import { CooPlayground } from "@/components/coo-playground";
import { ChatShowcase } from "@/components/chat-showcase";
import { SCENARIOS } from "@/lib/chat-scenarios";

export const metadata: Metadata = {
  title: "AI COO — The Spectre",
  description: "See your whole plant live. Simulate next month before you promise it.",
};

export default function CooPage() {
  return (
    <main style={{ ["--accent" as string]: "var(--steel)" }}>
      <section className="hairline-b" style={{ position: "relative", overflow: "hidden" }}>
        <Motif kind="coo" size={420} style={{ position: "absolute", right: -60, top: -40, color: "var(--steel)", opacity: 0.1 }} />
        <div className="wrap" style={{ padding: "96px 24px 72px", position: "relative" }}>
          <Reveal>
            <Stamp>AI COO · <span style={{ color: "var(--steel)" }}>IN PILOT BUILD</span></Stamp>
            <h1 className="display" style={{ fontSize: "clamp(36px, 5.2vw, 56px)", maxWidth: "19ch" }}>
              See your whole plant, live. Then test next month before you promise it.
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ color: "var(--ghost)", maxWidth: "58ch", marginTop: 20, fontSize: 16 }}>
              Every zone, every machine, live on one screen. And when an order inquiry
              lands: what to buy, what shifts, what blocks, and whether to say yes.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <a href="#access" className="btn btn-hard">Request early access</a>
              <a href="#playground" className="btn btn-soft">Open the playground</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="hairline-b" id="playground">
        <div className="wrap" style={{ padding: "72px 24px" }}>
          <Reveal>
            <Stamp>THE OPERATING PICTURE</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 24 }}>A plant you can hold in one look.</h2>
          </Reveal>
          <Reveal delay={80}>
            <CooPlayground />
          </Reveal>
        </div>
      </section>

      <section className="hairline-b">
        <div className="wrap" style={{ padding: "72px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "start" }}>
          <Reveal>
            <Stamp>THE CHAT LAYER</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 16 }}>Ask it a real question.</h2>
            <p style={{ color: "var(--ghost)", maxWidth: "50ch" }}>
              The same picture you just explored also answers. On your live data it
              checks the schedule, thinks through the constraints, and stages the
              actions for your tap. Watch it take a rush order.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ChatShowcase scenario={SCENARIOS.coo} />
          </Reveal>
        </div>
      </section>

      <section className="hairline-b">
        <div className="wrap" style={{ padding: "72px 24px" }}>
          <Reveal>
            <Stamp>WHAT THE PILOT COVERS</Stamp>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            {[
              ["The live picture", "Every zone and machine with status, flow, inventory, and alerts. The bottleneck shows up on screen while it is still cheap to fix."],
              ["Order feasibility", "A new inquiry runs through the bill of materials and the live schedule: what to buy, what shifts, what blocks, and whether to commit."],
              ["Decisions, staged", "Alerts and reports arrive triaged. The consequential ones become staged decisions that wait for your tap."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 60}>
                <div className="card" style={{ padding: 20 }}>
                  <div className="mono" style={{ fontSize: 11, color: "var(--steel)", marginBottom: 10 }}>0{i + 1}</div>
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
            <Stamp>THE HONEST PART</Stamp>
            <p style={{ fontSize: 15, color: "var(--ghost)", maxWidth: "60ch" }}>
              A live picture needs live data. Most plants do not have it, so we build
              that too: the collection, the processing, and the plumbing into your ERP,
              until the screen above is telling the truth about your floor in real time.
              The pilot includes it.
            </p>
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
            <Stamp>EARLY ACCESS</Stamp>
            <h2 className="display" style={{ fontSize: 30, marginBottom: 24 }}>Access opens in order of readiness.</h2>
            <WaitlistForm preselect="coo" />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
