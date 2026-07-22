"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Mark } from "@/components/mark";
import type { Scenario } from "@/lib/chat-scenarios";

/* Cinematic chat showcase — plays any product scenario once on scroll into
   view; replayable. Stages: 0 idle → 1 user → 2 typing → 3 working →
   4 bot → 5 staged → 6 approved → 7 follow-through/done.
   Reduced-motion users see the finished transcript immediately. */

const STEP_DELAY: number[] = [80, 250, 900, 700, 400, 1100, 1500, 500];

export function ChatShowcase({ scenario }: { scenario: Scenario }) {
  const [stage, setStage] = useState(0);
  const [workingShown, setWorkingShown] = useState(0);
  const [started, setStarted] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* permanent observer with granular thresholds. Two independent gates:
     READY (start): ≥300px of the card is on screen (or 55% of it on short
     viewports) — the viewer can see the opening beat, computed in pixels.
     INVIEW (pause): the card has substantially left (<8% visible). */
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (reduced) {
      setStage(8);
      setWorkingShown(99);
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          setInView(e.intersectionRatio > 0.08);
          const need = Math.min(300, e.boundingClientRect.height * 0.55);
          if (e.intersectionRect.height >= need) setReady(true);
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  /* brief dwell only filters fling-scrolls */
  useEffect(() => {
    if (started || reduced || !ready || !inView) return;
    const t = setTimeout(() => setStarted(true), 120);
    return () => clearTimeout(t);
  }, [ready, inView, started, reduced]);

  /* advance only while visible — scrolling away pauses, returning resumes */
  useEffect(() => {
    if (!started || reduced || stage >= 8 || !inView) return;
    if (stage === 3 && workingShown < scenario.working.length) {
      const t = setTimeout(() => setWorkingShown((w) => w + 1), 620);
      timers.current.push(t);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStage((s) => s + 1), STEP_DELAY[stage] ?? 500);
    timers.current.push(t);
    return () => clearTimeout(t);
  }, [started, stage, workingShown, reduced, inView, scenario.working.length]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const replay = () => {
    timers.current.forEach(clearTimeout);
    setWorkingShown(0);
    setStage(0);
    setStarted(true);
  };

  const done = stage >= 8;
  const a = scenario.accent;

  return (
    <div ref={rootRef} className="card" style={{ padding: 22, maxWidth: 640 }}>
      <div className="chat-head" style={{ borderBottom: "1px solid var(--hairline)", paddingBottom: 12, marginBottom: 14 }}>
        <span style={{ width: 26, height: 26, borderRadius: "50%", border: "1px solid var(--hairline)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: a }}>
          <Mark height={10} />
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 13 }}>{scenario.title} · chat</div>
          <div className="mono" style={{ fontSize: 9.5, color: "var(--ghost)", letterSpacing: ".1em" }}>
            SCRIPTED SHOWCASE · FICTIONAL DATA
          </div>
        </div>
        {done && (
          <button className="theme-btn" onClick={replay} aria-label="Replay" title="Replay">
            <RotateCcw size={14} strokeWidth={1.5} />
          </button>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, minHeight: 330 }}>
        {stage > 1 && (
          <div style={{ alignSelf: "flex-end", maxWidth: "85%", background: a, color: "var(--ground)", borderRadius: "10px 10px 3px 10px", padding: "9px 12px", fontSize: 13, lineHeight: 1.55 }}>
            {scenario.user}
          </div>
        )}
        {stage === 2 && (
          <div style={{ alignSelf: "flex-start" }}><span className="chat-dots"><i /><i /><i /></span></div>
        )}
        {stage >= 3 && (
          <div className="mono" style={{ fontSize: 10.5, color: "var(--ghost)", lineHeight: 2, paddingLeft: 4 }}>
            {scenario.working.slice(0, stage > 3 ? 99 : workingShown).map((l) => (
              <div key={l}>
                <span style={{ color: a }}>✓</span> {l}…
              </div>
            ))}
          </div>
        )}
        {stage > 4 && (
          <div style={{ alignSelf: "flex-start", maxWidth: "92%", background: "var(--surface-2)", border: "1px solid var(--hairline)", borderRadius: "10px 10px 10px 3px", padding: "10px 13px", fontSize: 13, lineHeight: 1.6 }}>
            {scenario.bot}
          </div>
        )}
        {stage > 5 && (
          <div style={{ alignSelf: "flex-start", width: "92%", border: "1px solid var(--hairline)", borderLeft: `2px solid ${a}`, borderRadius: 8, padding: "10px 13px", background: "var(--surface-2)" }}>
            <div className="mono" style={{ fontSize: 9.5, color: stage > 6 ? "var(--ghost)" : a, letterSpacing: ".12em", marginBottom: 8 }}>
              {stage > 6 ? "APPROVED BY YOU · EXECUTED · LOGGED" : `STAGED · ${scenario.stagedItems.length} ACTIONS · AWAITING YOUR TAP`}
            </div>
            {scenario.stagedItems.map((it) => (
              <div key={it} style={{ fontSize: 12.5, lineHeight: 1.7 }}>{it}</div>
            ))}
            {stage === 6 && (
              <span className="btn" style={{ background: a, color: "var(--ground)", border: "none", padding: "7px 13px", marginTop: 8, pointerEvents: "none" }}>
                Approve
              </span>
            )}
          </div>
        )}
        {stage > 7 && (
          <div style={{ alignSelf: "flex-start", maxWidth: "85%", background: "var(--surface-2)", border: "1px solid var(--hairline)", borderRadius: "10px 10px 10px 3px", padding: "9px 12px", fontSize: 13, lineHeight: 1.55 }}>
            {scenario.bot2}
          </div>
        )}
      </div>
    </div>
  );
}
