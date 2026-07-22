"use client";

import { useState } from "react";

/* AI Researcher playground — an explorable, redacted research library.
   Fictional stand-in subject (a corrugated-packaging plant); the real program
   is confidential. Structure and method are real; every excerpt is invented. */

type Node = { id: string; label: string; excerpt: string; marks: string[] };

const TREE: { phase: string; nodes: Node[] }[] = [
  {
    phase: "01 · MACHINES",
    nodes: [
      { id: "inv", label: "Inventory & layout", excerpt: "Ground truth from supplier documents and the floor drawing. Three-phase power plan; two discrepancies logged against the quotes.", marks: ["12 sources", "VERIFIED"] },
      { id: "cap", label: "Capacity model", excerpt: "Stage-by-stage math. The corrugator is the funnel at ~410 t/month; converting lines cap the premium mix. Three mix scenarios modeled.", marks: ["capacity math re-run twice", "CORRECTED → VERIFIED"] },
      { id: "gaps", label: "Support & gaps", excerpt: "Utilities not yet purchased gate two lines. A written width confirmation is still owed by one supplier; flagged, not smoothed over.", marks: ["open items stated", "VERIFIED"] },
    ],
  },
  {
    phase: "02 · INDUSTRY",
    nodes: [
      { id: "mkt", label: "Market & regulation", excerpt: "Sizing held as a range, never a point estimate. The recycled-content rule changes buyer behavior from next fiscal; both readings sourced.", marks: ["9 sources", "VERIFIED"] },
      { id: "zoo", label: "Product taxonomy", excerpt: "Forty-one product cards: sizes, structures, price bands, who buys, our fit. Powers the explorer console the client received.", marks: ["41 cards", "VERIFIED"] },
      { id: "unit", label: "Unit economics", excerpt: "Three worked archetype P&Ls. Break-even tonnage computed, then challenged by the verify pass; the freight assumption was corrected.", marks: ["1 claim CORRECTED", "VERIFIED"] },
    ],
  },
  {
    phase: "03 · STRATEGY",
    nodes: [
      { id: "sku", label: "SKU portfolio", excerpt: "Eighteen SKUs in three waves, judged by a three-lens panel: margin, qualification time, machine load. The avoid list is explicit.", marks: ["3-lens judge panel", "VERIFIED"] },
      { id: "cli", label: "Clients & regions", excerpt: "A 300 km year-one map with named prospect entry angles. Long-haul commodity explicitly rejected; the freight math is shown.", marks: ["30+ prospects", "VERIFIED"] },
      { id: "road", label: "Roadmap & not-buys", excerpt: "A ranked capex ladder with payback math, and a not-buy list as long as the buy list. Restraint is a deliverable.", marks: ["12 not-buys", "VERIFIED"] },
    ],
  },
];

export function ResearcherPlayground() {
  const [open, setOpen] = useState<Node>(TREE[0].nodes[1]);
  return (
    <div className="card" style={{ padding: 20 }}>
      <div className="stamp" style={{ marginBottom: 14 }}>
        FICTIONAL STAND-IN SUBJECT · REAL STRUCTURE &amp; METHOD · THE ACTUAL PROGRAM IS CONFIDENTIAL
      </div>
      <div className="rsr-grid">
        <div className="rsr-tree">
          {TREE.map((ph) => (
            <div key={ph.phase} style={{ marginBottom: 14 }}>
              <div className="stamp" style={{ fontSize: 9, marginBottom: 6 }}>{ph.phase}</div>
              {ph.nodes.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setOpen(n)}
                  className="mono"
                  style={{
                    display: "block", width: "100%", textAlign: "left", background: "none",
                    border: "none", cursor: "pointer", fontSize: 12, padding: "5px 6px",
                    borderRadius: 6, color: open.id === n.id ? "var(--ground)" : "var(--ghost)",
                    backgroundColor: open.id === n.id ? "var(--archive)" : "transparent",
                  }}
                >
                  {n.label}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 10 }}>{open.label}</div>
          <p style={{ fontSize: 13.5, color: "var(--ghost)", lineHeight: 1.75, maxWidth: "56ch" }}>{open.excerpt}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
            {open.marks.map((m) => (
              <span key={m} className="badge" style={{ color: m.includes("CORRECTED") ? "var(--clay)" : "var(--archive)", borderColor: "var(--hairline)" }}>
                {m}
              </span>
            ))}
          </div>
          <div className="mono" style={{ fontSize: 10.5, color: "var(--ghost)", marginTop: 16, lineHeight: 1.8 }}>
            THE RULE: every chapter ends with sources and a confidence tag. What stays
            uncertain is flagged in the file, never smoothed over.
          </div>
        </div>
      </div>
    </div>
  );
}
