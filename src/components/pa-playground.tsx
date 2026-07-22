"use client";

import { useMemo, useState } from "react";

/* Second Brain playground — a compositional simulation.
   Feed it facts (any subset, any order) → the memory graph builds live →
   run operations whose outputs are COMPOSED from exactly what you fed it,
   including honest gaps and cross-fact collisions. Deterministic, no model;
   the live product runs the real one. All data fictional. */

type Cat = "work" | "people" | "rules" | "numbers" | "time";
type Chip = { id: string; label: string; short: string; cat: Cat; x: number; y: number; rel: string[] };

const CHIPS: Chip[] = [
  { id: "venture", label: "Venture: Alder & Ash, a candle studio", short: "venture", cat: "work", x: 20, y: 24, rel: ["goal", "priya", "fridays"] },
  { id: "client", label: "Client: Meridian Textiles, trial order", short: "client", cat: "work", x: 44, y: 14, rel: ["nodiscount", "goal", "sam", "trip"] },
  { id: "priya", label: "Ops lead: Priya, runs the studio", short: "priya", cat: "people", x: 14, y: 48, rel: ["venture", "fridays"] },
  { id: "sam", label: "Advisor: Sam, monthly call", short: "sam", cat: "people", x: 66, y: 22, rel: ["client", "invupdate"] },
  { id: "voice", label: "Voice rule: plain, no exclamation marks", short: "voice", cat: "rules", x: 84, y: 40, rel: ["invupdate"] },
  { id: "nodiscount", label: "Rule: no discounts, ever", short: "no discounts", cat: "rules", x: 62, y: 44, rel: ["client"] },
  { id: "fridays", label: "Ritual: ship on Fridays", short: "fridays", cat: "rules", x: 30, y: 62, rel: ["venture", "priya", "trip"] },
  { id: "goal", label: "Q3 goal: 40 trade inquiries", short: "Q3 goal", cat: "numbers", x: 50, y: 58, rel: ["venture", "client", "email"] },
  { id: "runway", label: "Cash runway: 11 months", short: "runway", cat: "numbers", x: 78, y: 62, rel: ["invupdate", "goal"] },
  { id: "email", label: "Best channel: email, 4.2% reply rate", short: "email", cat: "numbers", x: 36, y: 82, rel: ["goal"] },
  { id: "invupdate", label: "Thursday: investor update due", short: "investor update", cat: "time", x: 62, y: 80, rel: ["runway", "sam", "voice"] },
  { id: "trip", label: "Next week: Jaipur trip", short: "Jaipur trip", cat: "time", x: 86, y: 88, rel: ["client", "fridays"] },
];

const CATS: { key: Cat; name: string }[] = [
  { key: "work", name: "Your work" },
  { key: "people", name: "Your people" },
  { key: "rules", name: "Your rules" },
  { key: "numbers", name: "Your numbers" },
  { key: "time", name: "Your calendar" },
];

const PRESETS: { name: string; ids: string[] }[] = [
  { name: "A launch week", ids: ["venture", "priya", "fridays", "goal"] },
  { name: "A money week", ids: ["invupdate", "runway", "sam", "voice"] },
  { name: "A client push", ids: ["client", "nodiscount", "goal", "email", "trip"] },
];

type OpResult = { lines: string[]; retrieved: string[]; staged: string | null; thin: boolean };

function has(sel: Set<string>, id: string) {
  return sel.has(id);
}

/* ── the composers: outputs derive from the exact selection ── */
function opBrief(sel: Set<string>): OpResult {
  const lines: string[] = [];
  const used: string[] = [];
  let staged: string | null = null;
  if (has(sel, "invupdate")) {
    lines.push(
      has(sel, "voice")
        ? "The investor update is due Thursday. A draft outline is ready, written plain, per your rule."
        : "The investor update is due Thursday. A draft outline is ready.",
    );
    used.push("invupdate");
    if (has(sel, "voice")) used.push("voice");
    staged = staged ?? "Investor update · outline → your review";
  }
  if (has(sel, "trip")) {
    if (has(sel, "fridays")) {
      lines.push(
        has(sel, "priya")
          ? "The Jaipur trip collides with Friday's ship. I suggest shipping Thursday; Priya can confirm capacity."
          : "The Jaipur trip collides with Friday's ship. I suggest shipping Thursday.",
      );
      used.push("trip", "fridays");
      if (has(sel, "priya")) used.push("priya");
      staged = staged ?? "Ship-early plan · Thursday → confirm";
    } else {
      lines.push("Jaipur is next week. Three things need moving before you go; the list is ready.");
      used.push("trip");
    }
  }
  if (has(sel, "goal")) {
    lines.push(
      has(sel, "email")
        ? "Trade inquiries stand at 26 of 40 for Q3. Email still converts best at 4.2 percent; two batches are staged."
        : "Trade inquiries stand at 26 of 40 for Q3.",
    );
    used.push("goal");
    if (has(sel, "email")) {
      used.push("email");
      staged = staged ?? "Email batch · 2 sends → your approval";
    }
  }
  if (has(sel, "client")) {
    lines.push("Meridian has been quiet for 9 days. A nudge is drafted, warm, not needy.");
    used.push("client");
    staged = staged ?? "Nudge to Meridian → your approval";
  }
  if (has(sel, "priya") && !has(sel, "trip")) {
    lines.push("Priya's sync is at 11. Her update is summarized to four lines.");
    used.push("priya");
  }
  if (has(sel, "runway") && !has(sel, "invupdate")) {
    lines.push("Runway holds at 11 months. Nothing unusual in the outflows.");
    used.push("runway");
  }
  if (has(sel, "venture") && lines.length < 4) {
    lines.push("Alder & Ash: batch 214 passed its burn test last night. The reveal post is staged.");
    used.push("venture");
  }
  const thin = lines.length === 0 || sel.size < 3;
  if (lines.length === 0) lines.push("I have almost nothing to work with. Feed me your world on the left, then ask again.");
  else if (sel.size < 3) lines.push("My picture is still thin. The more you feed me, the sharper this gets.");
  return { lines, retrieved: [...new Set(used)], staged, thin };
}

function opMeeting(sel: Set<string>): OpResult {
  if (!has(sel, "client"))
    return {
      lines: ["I do not know this client yet. Feed me the Meridian card on the left and I will prep the whole meeting: history, pricing posture, and an agenda."],
      retrieved: [],
      staged: null,
      thin: true,
    };
  const lines: string[] = ["Meridian, tomorrow. You last spoke 9 days ago about the trial order; he left asking about volume pricing."];
  const used: string[] = ["client"];
  if (has(sel, "nodiscount")) {
    lines.push("He will push on price. Your rule says never discount, so the brief frames added value instead: faster lead time, not a lower number.");
    used.push("nodiscount");
  }
  if (has(sel, "goal")) {
    lines.push("Worth remembering the stakes: this account alone covers 6 of your 40 Q3 inquiries.");
    used.push("goal");
  }
  if (has(sel, "sam")) {
    lines.push("Sam knows their CFO from a past board. An intro note is drafted, waiting on your word.");
    used.push("sam");
  }
  if (has(sel, "trip")) {
    lines.push("You are both in Jaipur next week. I suggest proposing coffee there instead of a follow-up call.");
    used.push("trip");
  }
  if (has(sel, "voice")) {
    lines.push("The whole brief reads plain, no exclamation marks, per your rule.");
    used.push("voice");
  }
  return { lines, retrieved: used, staged: "Meeting brief + agenda → your approval", thin: false };
}

function opReport(sel: Set<string>): OpResult {
  const nums = ["goal", "runway", "email"].filter((id) => has(sel, id));
  if (nums.length === 0)
    return {
      lines: ["I can draft the shape of a weekly report, but without your numbers it is empty calories. Feed me the goal, the runway, or the channel data."],
      retrieved: [],
      staged: null,
      thin: true,
    };
  const lines: string[] = ["Your week, drafted:"];
  const used: string[] = [...nums];
  if (has(sel, "goal")) lines.push("Inquiries: 26 of 40 for the quarter, three added this week.");
  if (has(sel, "email")) lines.push("Email held at a 4.2 percent reply rate; the Tuesday batch outperformed.");
  if (has(sel, "runway")) lines.push("Runway: 11 months, unchanged. One flagged expense, noted inline.");
  if (has(sel, "fridays")) {
    lines.push("Filed to ship Friday, per your ritual.");
    used.push("fridays");
  }
  if (has(sel, "voice")) {
    lines.push("Written plain, per your voice rule.");
    used.push("voice");
  }
  return { lines, retrieved: used, staged: "Weekly report · draft → your review", thin: false };
}

function opForgetting(sel: Set<string>): OpResult {
  const lines: string[] = [];
  const used: string[] = [];
  let staged: string | null = null;
  if (has(sel, "invupdate") && has(sel, "runway")) {
    lines.push("Thursday's update must mention runway; last quarter you forgot it. Already added.");
    used.push("invupdate", "runway");
  }
  if (has(sel, "trip") && has(sel, "fridays")) {
    lines.push("The Jaipur trip eats Friday. Ship Thursday or skip the week; both plans are staged, your call.");
    used.push("trip", "fridays");
    staged = staged ?? "Two ship plans → pick one";
  }
  if (has(sel, "sam")) {
    lines.push("Sam's monthly call is not on the calendar yet. A slot is proposed for Tuesday.");
    used.push("sam");
    staged = staged ?? "Calendar hold · Sam · Tuesday";
  }
  if (has(sel, "client") && has(sel, "email")) {
    lines.push("Meridian never received the case-study email, your best converter. It is queued.");
    used.push("client", "email");
    staged = staged ?? "Case-study email → Meridian";
  }
  if (has(sel, "priya") && has(sel, "venture")) {
    lines.push("Priya asked about the winter line twice. You have not answered; a reply is drafted.");
    used.push("priya", "venture");
    staged = staged ?? "Reply to Priya → your approval";
  }
  const thin = lines.length < 2;
  if (lines.length === 0) lines.push("Little slips past a thin brain. Feed it more of your world and I will catch more.");
  else if (thin) lines.push("That is all I can cross-check from what you have fed me. More world, more catches.");
  return { lines, retrieved: [...new Set(used)], staged, thin };
}

const OPS = [
  { id: "brief", name: "Morning brief", run: opBrief },
  { id: "meeting", name: "Prep the Meridian meeting", run: opMeeting },
  { id: "report", name: "Draft the week's report", run: opReport },
  { id: "forget", name: "What am I forgetting?", run: opForgetting },
] as const;

export function PaPlayground() {
  const [sel, setSel] = useState<Set<string>>(new Set(PRESETS[0].ids));
  const [result, setResult] = useState<OpResult | null>(null);
  const [opName, setOpName] = useState<string>("");
  const [shown, setShown] = useState(0);
  const [touched, setTouched] = useState(false);

  const toggle = (id: string) => {
    setSel((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
    setResult(null);
  };

  const runOp = (op: (typeof OPS)[number]) => {
    const r = op.run(sel);
    setOpName(op.name);
    setResult(r);
    setShown(0);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(99);
      return;
    }
    r.lines.forEach((_, i) => setTimeout(() => setShown((s) => Math.max(s, i + 1)), 260 * (i + 1)));
    setTimeout(() => setShown(99), 260 * (r.lines.length + 1));
  };

  const edges = useMemo(() => {
    const out: [Chip, Chip][] = [];
    for (const c of CHIPS)
      for (const rid of c.rel) {
        const other = CHIPS.find((x) => x.id === rid)!;
        if (c.id < rid && sel.has(c.id) && sel.has(rid)) out.push([c, other]);
      }
    return out;
  }, [sel]);

  const retrievedIds = useMemo(() => new Set(result?.retrieved ?? []), [result]);

  return (
    <div className="card" style={{ padding: 20 }} onPointerDownCapture={() => setTouched(true)}>
      <div className="stamp" style={{ marginBottom: 14 }}>
        COMPOSED FROM YOUR SELECTIONS, DETERMINISTICALLY · FICTIONAL WORLD · THE LIVE PRODUCT RUNS THE REAL MODEL
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20 }}>
        {/* 1 · feed the world */}
        <div>
          <div style={{ fontSize: 13, color: "var(--ghost)", marginBottom: 10 }}>
            1 · Feed it your world. Any facts, any order; combinations matter.
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            {PRESETS.map((p) => {
              const active = sel.size === p.ids.length && p.ids.every((id) => sel.has(id));
              return (
                <button
                  key={p.name}
                  className="chip"
                  data-on={active}
                  onClick={() => {
                    setSel(new Set(p.ids));
                    setResult(null);
                  }}
                >
                  {p.name}
                </button>
              );
            })}
            <button className="chip" data-on={sel.size === 0} onClick={() => { setSel(new Set()); setResult(null); }}>
              start empty
            </button>
          </div>
          {CATS.map((cat) => (
            <div key={cat.key} style={{ marginBottom: 10 }}>
              <div className="stamp" style={{ fontSize: 9, marginBottom: 6 }}>{cat.name.toUpperCase()}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {CHIPS.filter((c) => c.cat === cat.key).map((c) => (
                  <button
                    key={c.id}
                    className="chip"
                    data-on={sel.has(c.id)}
                    onClick={() => toggle(c.id)}
                    style={{ textAlign: "left" }}
                  >
                    {sel.has(c.id) ? "✓ " : "+ "}{c.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 2 · the graph + operations */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ position: "relative", border: "1px solid var(--hairline)", borderRadius: 8, background: "var(--surface-2)", minHeight: 190 }}>
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: 190 }} aria-hidden>
              {edges.map(([a, b]) => (
                <line
                  key={a.id + b.id}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="var(--spectral)" strokeWidth="0.35" opacity="0.55"
                  style={{ transition: "opacity 400ms ease-out" }}
                />
              ))}
              {CHIPS.map((c) => {
                const on = sel.has(c.id);
                const hot = retrievedIds.has(c.id);
                return (
                  <g key={c.id} style={{ opacity: on ? 1 : 0.1, transition: "opacity 300ms ease-out" }}>
                    {hot && <circle cx={c.x} cy={c.y} r="4.4" fill="none" stroke="var(--spectral)" strokeWidth="0.5" opacity="0.7" />}
                    <circle cx={c.x} cy={c.y} r="2.2" fill="var(--spectral)" opacity={hot ? 1 : 0.75} />
                    <text x={c.x} y={c.y - 4} fontSize="3" fill="var(--ghost)" textAnchor="middle" fontFamily="var(--font-mono)">
                      {c.short}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="mono" style={{ position: "absolute", bottom: 6, right: 10, fontSize: 9.5, color: "var(--ghost)" }}>
              {sel.size} NOTES · {edges.length} LINKS{result ? ` · ${result.retrieved.length} RETRIEVED` : ""}
            </div>
          </div>

          <div style={{ fontSize: 13, color: "var(--ghost)" }}>2 · Now work it. Each answer is built from exactly what you fed.</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {OPS.map((op) => (
              <button
                key={op.id}
                className="btn"
                style={{ background: "var(--spectral)", color: "var(--ground)", border: "none", padding: "9px 13px", fontSize: 12 }}
                onClick={() => runOp(op)}
              >
                {op.name}
                {op.id === "report" && !touched && (
                  <span aria-hidden style={{ color: "var(--spectral)" }}>
                    <span className="spot-ring sq" />
                    <span className="tryit-pill below">TRY IT · DRAFT THE REPORT</span>
                  </span>
                )}
              </button>
            ))}
          </div>

          {result && (
            <div className="card" style={{ padding: 14, background: "var(--surface-2)" }}>
              <div className="mono" style={{ fontSize: 9.5, color: "var(--spectral)", letterSpacing: ".12em", marginBottom: 8 }}>
                {opName.toUpperCase()} · RETRIEVED {result.retrieved.length} NOTES
                {result.retrieved.length > 0 && (
                  <span style={{ color: "var(--ghost)" }}> · {result.retrieved.map((id) => CHIPS.find((c) => c.id === id)?.short).join(" · ")}</span>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {result.lines.slice(0, shown).map((l, i) => (
                  <p key={i} style={{ fontSize: 13, lineHeight: 1.6 }}>{l}</p>
                ))}
              </div>
              {shown >= 99 && result.staged && (
                <div className="mono" style={{ fontSize: 10.5, marginTop: 10, borderLeft: "2px solid var(--spectral)", paddingLeft: 8, color: "var(--ghost)" }}>
                  STAGED · {result.staged} · nothing runs without your tap
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
