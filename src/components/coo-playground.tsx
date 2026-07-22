"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* AI COO playground — a generated, fictional plant. Scripted simulation.
   Machines follow a real lifecycle (run → changeover/idle → rare jam → recover),
   so only a couple of cells transition at any moment. A selected machine is
   FROZEN while its report is open. Every KPI derives from the actual states.
   The story cell ASSY-04 stays jammed until the feasibility plan is approved. */

type M = { id: string; zone: string; x: number; y: number; w: number; h: number };
type St = { s: "running" | "idle" | "blocked"; left: number; age: number };

const ZONES = [
  { key: "FORM", name: "Forming", x: 6, y: 10, cols: 4, rows: 2, rowGap: 13 },
  { key: "MACH", name: "Machining", x: 6, y: 46, cols: 4, rows: 2, rowGap: 13 },
  { key: "ASSY", name: "Assembly", x: 46, y: 10, cols: 3, rows: 2, rowGap: 13 },
  { key: "PACK", name: "Packing", x: 46, y: 46, cols: 3, rows: 2, rowGap: 13 },
  { key: "DSP", name: "Dispatch", x: 82, y: 16, cols: 1, rows: 2, rowGap: 28 },
] as const;

function machines(): M[] {
  const out: M[] = [];
  for (const z of ZONES) {
    for (let r = 0; r < z.rows; r++)
      for (let c = 0; c < z.cols; c++)
        out.push({
          id: `${z.key}-${String(r * z.cols + c + 1).padStart(2, "0")}`,
          zone: z.name,
          x: z.x + c * 8.6,
          y: z.y + r * z.rowGap,
          w: 7,
          h: 10,
        });
  }
  return out;
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

/* lifecycle transition when a state's planned duration expires */
function nextState(id: string, from: St["s"], salt: number): St {
  const r = hash(`${id}:${salt}`);
  if (from === "running")
    return r < 0.58
      ? { s: "running", left: 5 + Math.floor(r * 9), age: 0 } // re-plan, keeps running
      : r < 0.94
        ? { s: "idle", left: 2 + Math.floor(r * 3), age: 0 } // changeover
        : { s: "blocked", left: 3 + Math.floor(r * 3), age: 0 }; // rare jam
  if (from === "idle")
    return r < 0.9
      ? { s: "running", left: 8 + Math.floor(r * 12), age: 0 }
      : { s: "blocked", left: 3 + Math.floor(r * 2), age: 0 };
  return { s: "idle", left: 1 + Math.floor(r * 2), age: 0 }; // blocked recovers via a short idle
}

function initialStates(ms: M[]): Record<string, St> {
  const out: Record<string, St> = {};
  for (const m of ms) {
    const r = hash(`init:${m.id}`);
    out[m.id] =
      r < 0.82
        ? { s: "running", left: 1 + Math.floor(r * 10), age: Math.floor(r * 9) }
        : { s: "idle", left: 1 + Math.floor(r * 3), age: Math.floor(r * 3) };
  }
  return out;
}

const STATUS_COLORS: Record<string, string> = {
  running: "var(--steel)",
  idle: "var(--ghost)",
  blocked: "var(--clay)",
};

export function CooPlayground() {
  const ms = useMemo(machines, []);
  const [states, setStates] = useState<Record<string, St>>(() => initialStates(ms));
  const [sel, setSel] = useState<M | null>(null);
  const [simStep, setSimStep] = useState(0);
  const [approved, setApproved] = useState(false);
  const selRef = useRef<string | null>(null);
  selRef.current = sel?.id ?? null;
  const tickRef = useRef(0);

  useEffect(() => {
    const t = setInterval(() => {
      tickRef.current += 1;
      const salt = tickRef.current;
      setStates((prev) => {
        const next: Record<string, St> = {};
        for (const id of Object.keys(prev)) {
          const st = prev[id];
          /* freeze the machine whose report is open */
          if (id === selRef.current) {
            next[id] = { ...st, age: st.age + 1 };
            continue;
          }
          next[id] =
            st.left <= 1
              ? nextState(id, st.s, salt)
              : { ...st, left: st.left - 1, age: st.age + 1 };
        }
        return next;
      });
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const status = (m: M): St["s"] => {
    if (m.id === "ASSY-04") return approved ? "running" : "blocked";
    return states[m.id]?.s ?? "running";
  };
  const ageMin = (m: M): number => (states[m.id]?.age ?? 0) + (m.id === "ASSY-04" && !approved ? 6 : 0);

  /* every number derives from the actual states */
  const runningCount = ms.filter((m) => status(m) === "running").length;
  const blockedCount = ms.filter((m) => status(m) === "blocked").length;
  const kpi = {
    thr: (runningCount * 47 + 62).toLocaleString(),
    oee: ((runningCount / ms.length) * 88 + 6).toFixed(1),
    ontime: (97.8 - blockedCount * 0.7).toFixed(1),
    alerts: blockedCount,
  };

  useEffect(() => {
    if (simStep === 1) {
      const t = setTimeout(() => setSimStep(2), 2400);
      return () => clearTimeout(t);
    }
  }, [simStep]);

  return (
    <div className="card" style={{ padding: 20 }}>
      <div className="stamp" style={{ marginBottom: 14 }}>
        GENERATED FICTIONAL PLANT · SCRIPTED SIMULATION · THE PILOT RUNS ON LIVE ERP DATA
      </div>

      {/* KPI strip — derived, not decorative */}
      <div style={{ display: "flex", gap: 26, flexWrap: "wrap", marginBottom: 14 }}>
        {[
          ["UNITS/HR", kpi.thr],
          ["OEE", `${kpi.oee}%`],
          ["ON-TIME", `${kpi.ontime}%`],
          ["ALERTS", String(kpi.alerts)],
        ].map(([k, v]) => (
          <div key={k}>
            <div className="mono" style={{ fontSize: 20 }}>{v}</div>
            <div className="stamp" style={{ fontSize: 9, marginBottom: 0 }}>{k}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
        {/* the plant map */}
        <div>
          <svg viewBox="0 0 100 72" style={{ width: "100%", border: "1px solid var(--hairline)", borderRadius: 8, background: "var(--surface-2)" }}>
            <path d="M4 36 H96" stroke="var(--hairline)" strokeWidth="4" />
            <path d="M4 36 H96" stroke="var(--steel)" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.7">
              <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.6s" repeatCount="indefinite" />
            </path>
            {ZONES.map((z) => (
              <text key={z.key} x={z.x} y={z.y - 2.4} fontSize="2.6" fill="var(--ghost)" fontFamily="var(--font-mono)" letterSpacing="0.3">
                {z.name.toUpperCase()}
              </text>
            ))}
            {ms.map((m) => {
              const s = status(m);
              return (
                <g key={m.id} onClick={() => setSel(m)} style={{ cursor: "pointer" }}>
                  <rect
                    x={m.x} y={m.y} width={m.w} height={m.h} rx="0.8"
                    fill={sel?.id === m.id ? STATUS_COLORS[s] : "transparent"}
                    fillOpacity={sel?.id === m.id ? 0.25 : 0}
                    stroke={STATUS_COLORS[s]}
                    strokeWidth={s === "blocked" ? 0.8 : 0.4}
                    style={{ transition: "stroke 600ms ease-out" }}
                  />
                  <circle cx={m.x + 1.3} cy={m.y + 1.5} r="0.7" fill={STATUS_COLORS[s]}>
                    {s === "running" && <animate attributeName="opacity" values="1;0.4;1" dur="1.4s" repeatCount="indefinite" />}
                  </circle>
                </g>
              );
            })}
          </svg>
          <div className="mono" style={{ fontSize: 10, color: "var(--ghost)", marginTop: 8 }}>
            30 MACHINES · CLICK ANY CELL · <span style={{ color: "var(--steel)" }}>●</span> RUNNING · <span style={{ color: "var(--ghost)" }}>●</span> IDLE · <span style={{ color: "var(--clay)" }}>●</span> BLOCKED
          </div>
        </div>

        {/* drawer + order sim */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: 14, background: "var(--surface-2)" }}>
            {sel ? (
              <>
                <div className="mono" style={{ fontSize: 12, marginBottom: 6 }}>
                  {sel.id} · {sel.zone} · <span style={{ color: STATUS_COLORS[status(sel)] }}>{status(sel).toUpperCase()}</span>
                  <span style={{ color: "var(--ghost)" }}> · held steady while you read</span>
                </div>
                <div style={{ fontSize: 12.5, color: "var(--ghost)", lineHeight: 1.7 }}>
                  Work order WO-4471 · SKU T-118 · Shift B<br />
                  {status(sel) === "running" && <>Speed {88 + Math.floor(hash(`spd:${sel.id}`) * 9)}% · in this state for {ageMin(sel) * 2} min</>}
                  {status(sel) === "idle" && <>Speed 0% · changeover, {ageMin(sel) * 2} min in · restart planned</>}
                  {status(sel) === "blocked" && sel.id !== "ASSY-04" && <>Speed 0% · stopped {ageMin(sel) * 2} min ago · operator on it</>}
                  {sel.id === "ASSY-04" && !approved && (
                    <span style={{ color: "var(--clay)" }}>Speed 0% · feed jam, {ageMin(sel) * 2} min · operator paged. The pending order plan routes around this cell.</span>
                  )}
                  {sel.id === "ASSY-04" && approved && (
                    <span style={{ color: "var(--steel)" }}>Back up: the approved plan rerouted its queue.</span>
                  )}
                </div>
              </>
            ) : (
              <div style={{ fontSize: 12.5, color: "var(--ghost)" }}>
                Click a machine on the map. The jammed cell in Assembly is worth a look,
                and once a machine is open here, its state holds until you close it.
              </div>
            )}
          </div>

          <div className="card" style={{ padding: 14, background: "var(--surface-2)", flex: 1 }}>
            <div className="stamp" style={{ marginBottom: 8 }}>ORDER FEASIBILITY</div>
            <div style={{ fontSize: 12.5, marginBottom: 10 }}>
              New inquiry: <span className="mono">120,000 units · due in 6 weeks</span>
            </div>
            {simStep === 0 && (
              <button className="btn" style={{ background: "var(--steel)", color: "var(--ground)", border: "none", padding: "8px 14px" }} onClick={() => setSimStep(1)}>
                Run feasibility
              </button>
            )}
            {simStep === 1 && (
              <div className="mono" style={{ fontSize: 11, color: "var(--ghost)", lineHeight: 2 }}>
                exploding bill of materials…<br />loading live schedule…<br />checking capacity by cell…
              </div>
            )}
            {simStep >= 2 && (
              <div style={{ fontSize: 12.5, lineHeight: 1.7 }}>
                <div className="mono" style={{ color: "var(--steel)", fontSize: 11, marginBottom: 6 }}>
                  FEASIBLE · 1 CONSTRAINT
                </div>
                Bottleneck: Assembly ASSY-04 in week 4.<br />
                Buy now: bearing set (lead 12d) · feed belt (lead 8d).<br />
                Schedule shift: WO-4471 moves +3 days, still on time.
                <div style={{ marginTop: 10 }}>
                  {!approved ? (
                    <button
                      className="btn"
                      style={{ background: "var(--steel)", color: "var(--ground)", border: "none", padding: "8px 14px" }}
                      onClick={() => setApproved(true)}
                    >
                      Stage the plan → Approve
                    </button>
                  ) : (
                    <span className="mono" style={{ fontSize: 11, color: "var(--ghost)" }}>
                      APPROVED BY YOU · purchase orders staged · schedule committed · ASSY-04 cleared · logged
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
