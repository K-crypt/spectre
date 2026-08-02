"use client";

/* The hero operations feed — the whole thesis in five seconds:
   systems stage work, the human approves, only then does it move.
   Fictional data by law (footer trust line); labeled DEMONSTRATION.
   Under prefers-reduced-motion the feed renders static. */

import { useEffect, useRef, useState } from "react";

type FeedLine = { dot: string; who: string; text: string };

const LINES: FeedLine[] = [
  { dot: "var(--clay)", who: "AI CMO", text: "caption drafted in your voice" },
  { dot: "var(--steel)", who: "AI COO", text: "rush order simulated · feasible, one bottleneck" },
  { dot: "var(--spectral)", who: "AI PA", text: "inbox triaged · 3 items need you" },
  { dot: "var(--archive)", who: "RESEARCHER", text: "chapter re-verified · 2 claims corrected" },
  { dot: "var(--ochre)", who: "AI HR", text: "appraisal summary drafted" },
  { dot: "var(--clay)", who: "AI CMO", text: "weekly numbers computed · digest ready" },
  { dot: "var(--spectral)", who: "AI PA", text: "follow-up drafted · waiting on one fact" },
];

const VISIBLE = 4;

export function OpsFeed() {
  const [head, setHead] = useState(VISIBLE); // next line to enter
  const [approvedUpTo, setApprovedUpTo] = useState(1); // lines older than this show approved
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;
    const t = setInterval(() => {
      setHead((h) => h + 1);
      setApprovedUpTo((a) => a + 1);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const rows: { line: FeedLine; approved: boolean; key: number }[] = [];
  for (let k = head - VISIBLE; k < head; k++) {
    rows.push({ line: LINES[((k % LINES.length) + LINES.length) % LINES.length], approved: k < approvedUpTo, key: k });
  }

  return (
    <div className="card ops-feed">
      <div className="stamp" style={{ marginBottom: 12 }}>
        THE LOOP · DEMONSTRATION
      </div>
      <div className="ops-rows">
        {rows.map(({ line, approved, key }) => (
          <div key={key} className="ops-row">
            <span className="dot" style={{ background: line.dot }} />
            <span className="mono ops-who">{line.who}</span>
            <span className="ops-text">{line.text}</span>
            <span className={`mono ops-state ${approved ? "ok" : ""}`}>
              {approved ? "approved · executed" : "staged → your tap"}
            </span>
          </div>
        ))}
      </div>
      <div className="mono" style={{ fontSize: 10, color: "var(--ghost)", marginTop: 12 }}>
        NOTHING MOVES WITHOUT THE TAP · EVERY ACTION LOGGED
      </div>
    </div>
  );
}
