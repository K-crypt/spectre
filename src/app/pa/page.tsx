import type { Metadata } from "next";
import { Reveal, Stamp, Status, ApproveCard } from "@/components/ui";
import { Motif } from "@/components/motifs";
import { WaitlistForm, Comparison } from "@/components/interactive";
import { PaPlayground } from "@/components/pa-playground";
import { ChatShowcase } from "@/components/chat-showcase";
import { SCENARIOS } from "@/lib/chat-scenarios";

export const metadata: Metadata = {
  title: "AI PA · Second Brain — The Spectre",
  description:
    "A private AI that remembers your world, thinks with your context, and does the actual work. You stay the only one who approves what goes out.",
};

const RETURNS = [
  ["It remembers everything you tell it", "Tell it something once and it is known forever, retrieved at the right moment, and richer every time you use it."],
  ["It takes the repeatable work off your plate", "The recurring operations of your world run as standing systems instead of tasks you have to push uphill."],
  ["It writes in your voice, and gets it right", "It works from your context and your standards, so what reaches your desk is a decision to make, not a draft to rescue."],
  ["It never bluffs, and never acts alone", "Every number is computed in code, so it is true. Nothing is published, sent, or spent until you approve it."],
  ["It gets smarter every single week", "Everything it does is filed back into its memory, so the system you use in month six is better than the one you started with."],
] as const;

const MOATS = [
  ["vs generic AI chat", "Chat forgets you and answers from the internet's average. This retrieves your actual context before every answer. It is built to never answer from thin air."],
  ["vs note-taking second brains", "Those are libraries you still have to run. This one maintains itself and runs the work."],
  ["vs autonomous agents", "Those ask you to trust a black box. Here the approval gate is architecture: the AI can only stage; only you approve; everything is logged."],
  ["vs tool lock-in", "Model-agnostic by design: it has already survived a full model handover. And your memory is plain, portable text you can export any time."],
] as const;

export default function PaPage() {
  return (
    <main style={{ ["--accent" as string]: "var(--spectral)" }}>
      {/* HERO */}
      <section className="hairline-b" style={{ position: "relative", overflow: "hidden" }}>
        <Motif kind="pa" size={420} style={{ position: "absolute", right: -60, top: -40, color: "var(--spectral)", opacity: 0.1 }} />
        <div className="wrap" style={{ padding: "96px 24px 72px", position: "relative" }}>
          <Reveal>
            <Stamp>AI PA · SECOND BRAIN · <span style={{ color: "var(--spectral)" }}>RUNNING IN PRODUCTION</span></Stamp>
            <h1 className="display" style={{ fontSize: "clamp(38px, 5.5vw, 58px)", maxWidth: "17ch" }}>
              Most AI forgets you. This one is you.
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ color: "var(--ghost)", maxWidth: "58ch", marginTop: 20, fontSize: 16 }}>
              A private AI that remembers your world, thinks with your context instead
              of the internet&apos;s, and does the actual work. You stay the only one who
              approves what goes out.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <a href="#access" className="btn btn-hard">Discuss a design partnership</a>
              <a href="#playground" className="btn btn-soft">Try the idea</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PLAYGROUND */}
      <section className="hairline-b" id="playground">
        <div className="wrap" style={{ padding: "80px 24px" }}>
          <Reveal>
            <Stamp>THE PLAYGROUND</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 8 }}>Build a second brain. Then work it.</h2>
            <p style={{ color: "var(--ghost)", maxWidth: "56ch", marginBottom: 28 }}>
              Feed it any combination of facts and watch the memory graph form. Then
              run its operations: every answer is composed from exactly what you fed
              it, and it tells you honestly when it is missing something.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <PaPlayground />
          </Reveal>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "72px 24px", maxWidth: 800 }}>
          <Reveal>
            <Stamp>THE PROBLEM IT REMOVES</Stamp>
            <p className="display" style={{ fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1.45 }}>
              Every AI chat starts from zero. Your knowledge is scattered across a
              dozen tools. And the work that actually matters keeps losing the day to
              the work that merely has to get done.
            </p>
          </Reveal>
        </div>
      </section>

      {/* THE FIVE RETURNS */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "80px 24px" }}>
          <Reveal>
            <Stamp>WHAT IT GIVES BACK</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 28 }}>Five things it gives back.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 14 }}>
            {RETURNS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 60}>
                <div className="card" style={{ padding: 20, minHeight: 150 }}>
                  <div className="mono" style={{ fontSize: 11, color: "var(--spectral)", marginBottom: 10 }}>0{i + 1}</div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{t}</div>
                  <p style={{ color: "var(--ghost)", fontSize: 13 }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* THE CHAT LAYER */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "72px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "start" }}>
          <Reveal>
            <Stamp>THE CHAT LAYER</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 16 }}>Ask it a real question.</h2>
            <p style={{ color: "var(--ghost)", maxWidth: "50ch" }}>
              This is what a second brain sounds like in use: it answers from your own
              history, does the legwork, and stages the follow-ups. Watch it prepare
              tomorrow&apos;s meeting.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ChatShowcase scenario={SCENARIOS.pa} />
          </Reveal>
        </div>
      </section>

      {/* MECHANISM + GATE */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "80px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "start" }}>
          <Reveal>
            <Stamp>HOW IT WORKS</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 16 }}>How it works, in five parts.</h2>
            <ol style={{ color: "var(--ghost)", fontSize: 14, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 10 }}>
              <li><strong style={{ color: "var(--ink)" }}>The memory.</strong> Your world, compiled into a cross-linked knowledge base it keeps clean itself.</li>
              <li><strong style={{ color: "var(--ink)" }}>The retrieval engine.</strong> It searches its own knowledge before every answer. Grounded in you, not the internet&apos;s guesswork.</li>
              <li><strong style={{ color: "var(--ink)" }}>The specialist team.</strong> Encoded procedures for content, outreach, research, and analysis, run the same way every time.</li>
              <li><strong style={{ color: "var(--ink)" }}>The connectors.</strong> Wired to your real tools; reads live data, and on your approval, acts.</li>
              <li><strong style={{ color: "var(--ink)" }}>The backend and the gate.</strong> Exact work runs in real code, numbers the model cannot fabricate. A hard approval gate sits before anything outward.</li>
            </ol>
          </Reveal>
          <Reveal delay={100}>
            <div className="stamp" style={{ marginBottom: 14 }}>THE GATE, LIVE</div>
            <ApproveCard
              accent="var(--spectral)"
              payloads={[
                "Morning brief compiled overnight: 2 decisions, 3 drafts in your voice, numbers computed in code.",
                "Post staged in your voice, graded against your own rules. One tap publishes; none has ever gone out without it.",
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* MOATS */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "80px 24px" }}>
          <Reveal>
            <Stamp>WHY IT&apos;S DIFFERENT</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 28 }}>Where it differs, plainly.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            {MOATS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 60}>
                <div className="card" style={{ padding: 20 }}>
                  <div className="stamp" style={{ marginBottom: 10 }}>{t}</div>
                  <p style={{ fontSize: 13.5, color: "var(--ghost)" }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF + ORIGIN */}
      <section className="hairline-b">
        <div className="wrap" style={{ padding: "80px 24px", maxWidth: 800 }}>
          <Reveal>
            <Stamp>PROOF</Stamp>
            <p className="display" style={{ fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1.45 }}>
              &ldquo;I built this to run three businesses on under ten hours a week.
              It worked. Now I&apos;m opening it up.&rdquo;
            </p>
            <div className="mono" style={{ fontSize: 11, color: "var(--ghost)", marginTop: 16 }}>
              AASHRIT GARG · FOUNDER · RUNS CARPETSTORY.ONE&apos;S MARKETING + HIS OWN BRAND ON THIS SYSTEM · AS OF JUL 2026
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

      {/* WAITLIST */}
      <section id="access">
        <div className="wrap" style={{ padding: "80px 24px" }}>
          <Reveal>
            <Stamp>EARLY ACCESS</Stamp>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 8 }}>
              Everyone gets a second self. Yours starts here.
            </h2>
            <p style={{ color: "var(--ghost)", maxWidth: "52ch", marginBottom: 24 }}>
              Opening to a first cohort as onboarding capacity allows.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <WaitlistForm preselect="pa" />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
