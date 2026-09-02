"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* AI HR playground — a working concept console. Invented people and numbers.
   The showcase: attrition caught before the resignation, appraisals drafted
   from evidence, hiring compared fairly, onboarding checkpoints, and a
   chatbot both sides use — every people decision staged for the manager. */

type Emp = { id: string; name: string; role: string; tenure: string; att: string; status: string; band: number; spark: number[]; leave: string; last: string };

const EMPS: Emp[] = [
  { id: "rehan", name: "Rehan S.", role: "Master machinist · Shift B", tenure: "3.1 yr", att: "96%", status: "AT RISK", band: 0.34, spark: [96, 97, 95, 96, 94, 93, 96, 95, 92, 93, 91, 92], leave: "9 of 18", last: "Exceeds · trained two juniors this year" },
  { id: "meera", name: "Meera K.", role: "QC lead", tenure: "1.8 yr", att: "98%", status: "REVIEW DUE", band: 0.55, spark: [97, 98, 98, 97, 98, 99, 98, 98, 97, 98, 98, 98], leave: "12 of 18", last: "Meets+ · caught the August defect run" },
  { id: "arjun", name: "Arjun P.", role: "Machinist · Shift A", tenure: "0.4 yr", att: "91%", status: "DAY 30", band: 0.2, spark: [88, 90, 89, 91, 92, 90, 91, 93, 92, 91, 92, 93], leave: "2 of 6", last: "Onboarding · buddy: Rehan" },
  { id: "divya", name: "Divya M.", role: "Dispatch", tenure: "2.5 yr", att: "94%", status: "OK", band: 0.48, spark: [93, 94, 95, 94, 93, 94, 95, 94, 94, 95, 94, 94], leave: "7 of 18", last: "Meets · steady" },
  { id: "sanjay", name: "Sanjay V.", role: "Machinist · Shift A", tenure: "4.2 yr", att: "89%", status: "ON LEAVE", band: 0.61, spark: [92, 91, 90, 89, 90, 88, 89, 90, 88, 87, 89, 88], leave: "1 of 18", last: "Meets · back Monday" },
];

const VIEWS = ["Pulse", "People", "Hiring", "Reviews", "Chat"] as const;
type View = (typeof VIEWS)[number];
const A = "var(--ochre)";
const AUTO_ORDER: View[] = ["Pulse", "People", "Hiring", "Reviews", "Chat"];

const CHAT_QA = {
  employee: [
    { q: "How many leave days do I have left?", a: "You have 9 of 18 left this year, and none of your pending requests overlap the festival freeze. Your July payslip is in your folder; the overtime from the rush order is on it." },
    { q: "Can I get an advance against salary?", a: "Policy allows one advance of up to half a month, repaid over three months. You are eligible. I have prepared the request; it goes to your manager the moment you confirm." },
  ],
  manager: [
    { q: "Who needs my attention this week?", a: "Three people. Rehan is showing a leave-risk pattern worth a conversation before Friday. Meera's appraisal is due, and the draft is ready from her real record. Arjun hits day 30, and his check-in is prepared." },
    { q: "Can I give Meera a raise?", a: "Yes, defensibly. She sits at the 55th percentile of her band with a Meets+ trend, so a raise inside the band works without disturbing your structure. The letter is drafted; nothing is sent until you approve it." },
  ],
} as const;

function Pill({ s }: { s: string }) {
  const map: Record<string, string> = { "AT RISK": "var(--clay)", "REVIEW DUE": A, "DAY 30": A, OK: "var(--ghost)", "ON LEAVE": "var(--ghost)", "CONVERSATION SET": A, DRAFTED: A, ADVANCED: A };
  return <span className="badge" style={{ color: map[s] ?? "var(--ghost)", fontSize: 9 }}>{s}</span>;
}

export function HrPlayground() {
  const [view, setView] = useState<View>("Pulse");
  const [touched, setTouched] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [sel, setSel] = useState<Emp>(EMPS[0]);
  const [talkSet, setTalkSet] = useState(false);
  const [reviewOk, setReviewOk] = useState(false);
  const [day30Ok, setDay30Ok] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [chatSide, setChatSide] = useState<"employee" | "manager">("manager");
  const [chatMsgs, setChatMsgs] = useState<{ q: string; a: string }[]>([]);
  const [chatBusy, setChatBusy] = useState(false);

  const verdictCount = useMemo(() => (talkSet ? 0 : 1) + (reviewOk ? 0 : 1) + (day30Ok ? 0 : 1), [talkSet, reviewOk, day30Ok]);

  /* attract tour, CMO-family: visible-gated, first touch takes over */
  useEffect(() => {
    const el = rootRef.current;
    if (!el || touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver((es) => { for (const e of es) setInView(e.intersectionRatio > 0.3); }, { threshold: [0, 0.3, 0.6] });
    io.observe(el);
    return () => io.disconnect();
  }, [touched]);
  useEffect(() => {
    if (touched || !inView) return;
    const t = setTimeout(() => setView((v) => AUTO_ORDER[(AUTO_ORDER.indexOf(v) + 1) % AUTO_ORDER.length]), 15000);
    return () => clearTimeout(t);
  }, [view, touched, inView]);

  const spot = (label: string, sq = false, edgeR = false) =>
    touched ? null : (
      <span aria-hidden style={{ color: A }}>
        <span className={`spot-ring${sq ? " sq" : ""}`} />
        <span className={`tryit-pill${edgeR ? " edge-r" : ""}`}>TRY IT · {label.toUpperCase()}</span>
      </span>
    );

  const askChat = (qa: { q: string; a: string }) => {
    if (chatBusy || chatMsgs.some((m) => m.q === qa.q)) return;
    setChatBusy(true);
    setChatMsgs((m) => [...m, { q: qa.q, a: "" }]);
    setTimeout(() => {
      setChatMsgs((m) => m.map((x) => (x.q === qa.q ? qa : x)));
      setChatBusy(false);
    }, 700);
  };

  const S = { padding: "14px 16px" } as const;
  const rehanStatus = talkSet ? "CONVERSATION SET" : "AT RISK";

  return (
    <div ref={rootRef} className="card" style={{ padding: 0, overflow: "hidden" }} onPointerDownCapture={() => setTouched(true)}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: "1px solid var(--hairline)", flexWrap: "wrap" }}>
        <span className="mono" style={{ fontSize: 10, letterSpacing: ".14em" }}>AI HR · PEOPLE CONSOLE</span>
        <span className="mono" style={{ fontSize: 8.5, color: "var(--ghost)", letterSpacing: ".1em" }}>CONCEPT · INVENTED PEOPLE &amp; NUMBERS</span>
        <span style={{ flex: 1 }} />
        <span className="badge" style={{ color: A, fontSize: 9 }}>{verdictCount} NEED YOU</span>
        <span className="mono" style={{ fontSize: 9.5, color: "var(--ghost)" }}>● private</span>
      </div>

      <div style={{ display: "flex", minHeight: 400 }}>
        <div style={{ borderRight: "1px solid var(--hairline)", padding: "12px 0", minWidth: 100 }}>
          {VIEWS.map((v) => (
            <button key={v} onClick={() => setView(v)}
              style={{ display: "block", width: "100%", textAlign: "left", background: view === v ? "var(--surface-2)" : "none", border: "none", borderLeft: view === v ? `2px solid ${A}` : "2px solid transparent", color: view === v ? "var(--ink)" : "var(--ghost)", fontSize: 12.5, fontWeight: view === v ? 600 : 400, padding: "8px 14px", cursor: "pointer" }}>
              {v}
            </button>
          ))}
        </div>

        <div key={view} className="view-swap" style={{ flex: 1, minWidth: 0 }}>
          {view === "Pulse" && (
            <div style={S}>
              <h3 className="display" style={{ fontSize: 24, marginBottom: 12 }}>
                {verdictCount === 0 ? "Your people are covered." : `${verdictCount} ${verdictCount === 1 ? "person needs" : "people need"} you before Friday.`}
              </h3>
              {!talkSet && (
                <div style={{ padding: "10px 0", borderTop: "1px solid var(--hairline)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Pill s="AT RISK" />
                    <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>Rehan S. is showing the leaving pattern</span>
                    <button className="btn" style={{ background: A, color: "var(--ground)", border: "none", padding: "6px 11px", fontSize: 11 }} onClick={() => setTalkSet(true)}>
                      Set the conversation{spot("catch this early", true, true)}
                    </button>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--ghost)", margin: "4px 0 0 2px", maxWidth: "62ch" }}>
                    Overtime up 40% since March, attendance drifting, and pay now 9% under your own band after last year's hires. Replacing him would cost four to six months of salary; a conversation costs Friday morning.
                  </p>
                </div>
              )}
              {!reviewOk && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 0", borderTop: "1px solid var(--hairline)" }}>
                  <Pill s="REVIEW DUE" />
                  <span style={{ fontSize: 13, flex: 1 }}>Meera's appraisal is due · draft ready from her real record</span>
                  <button className="btn btn-soft" style={{ padding: "6px 11px", fontSize: 11 }} onClick={() => setReviewOk(true)}>Approve draft</button>
                </div>
              )}
              {!day30Ok && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 0", borderTop: "1px solid var(--hairline)" }}>
                  <Pill s="DAY 30" />
                  <span style={{ fontSize: 13, flex: 1 }}>Arjun hits day 30 · check-in and buddy feedback prepared</span>
                  <button className="btn btn-soft" style={{ padding: "6px 11px", fontSize: 11 }} onClick={() => setDay30Ok(true)}>Schedule it</button>
                </div>
              )}
              {verdictCount === 0 && (
                <p className="mono" style={{ fontSize: 10.5, color: "var(--ghost)", paddingTop: 10, borderTop: "1px solid var(--hairline)" }}>
                  EVERY LETTER, RAISE, AND WARNING WAITS FOR YOUR TAP · ALWAYS
                </p>
              )}
            </div>
          )}

          {view === "People" && (
            <div style={S}>
              <h3 className="display" style={{ fontSize: 24, marginBottom: 10 }}>One remembered record each.</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 14 }}>
                <div>
                  {EMPS.map((e) => (
                    <button key={e.id} onClick={() => setSel(e)}
                      style={{ display: "flex", width: "100%", alignItems: "center", gap: 8, padding: "8px 6px", borderTop: "1px solid var(--hairline)", background: sel.id === e.id ? "var(--surface-2)" : "none", border: "none", borderLeft: sel.id === e.id ? `2px solid ${A}` : "2px solid transparent", cursor: "pointer", textAlign: "left", color: "var(--ink)", position: "relative" }}>
                      <span style={{ fontSize: 12.5, fontWeight: 600, flex: 1 }}>{e.name}<span style={{ color: "var(--ghost)", fontWeight: 400 }}> · {e.tenure}</span></span>
                      <Pill s={e.id === "rehan" ? rehanStatus : e.status} />
                      {e.id === "rehan" && spot("open a record", true)}
                    </button>
                  ))}
                </div>
                <div className="card" style={{ padding: 14, background: "var(--surface-2)" }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{sel.name}</div>
                  <div className="mono" style={{ fontSize: 9.5, color: "var(--ghost)", marginBottom: 8 }}>{sel.role.toUpperCase()} · ATTENDANCE {sel.att} · LEAVE {sel.leave}</div>
                  <div className="mono" style={{ fontSize: 9, color: "var(--ghost)", marginBottom: 3 }}>PAY · POSITION IN BAND</div>
                  <div style={{ height: 4, background: "var(--hairline)", borderRadius: 2, marginBottom: 8, position: "relative" }}>
                    <div style={{ position: "absolute", left: `${sel.band * 100}%`, top: -3, width: 2, height: 10, background: sel.id === "rehan" ? "var(--clay)" : A }} />
                  </div>
                  <div className="mono" style={{ fontSize: 9, color: "var(--ghost)", marginBottom: 3 }}>ATTENDANCE · 12 WEEKS</div>
                  <svg viewBox="0 0 100 20" style={{ width: "100%", height: 34 }} aria-hidden>
                    <polyline points={sel.spark.map((v, i) => `${(i / 11) * 100},${20 - ((v - 85) / 15) * 18}`).join(" ")} fill="none" stroke={A} strokeWidth="1" />
                  </svg>
                  <p style={{ fontSize: 12, color: "var(--ghost)", marginTop: 6 }}>Last review: {sel.last}</p>
                  {sel.id === "rehan" && !talkSet && (
                    <p style={{ fontSize: 11.5, color: "var(--clay)", marginTop: 6 }}>Pattern: overtime +40% · pay slipped to the 34th percentile of the band · classic pre-resignation shape.</p>
                  )}
                  {sel.id === "rehan" && talkSet && (
                    <p className="mono" style={{ fontSize: 10, color: A, marginTop: 6 }}>CONVERSATION SET · FRIDAY 9:00 · GUIDE PREPARED</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {view === "Hiring" && (
            <div style={S}>
              <h3 className="display" style={{ fontSize: 24, marginBottom: 4 }}>Hiring, weighed fairly.</h3>
              <div className="mono" style={{ fontSize: 9.5, color: "var(--ghost)", marginBottom: 12 }}>
                OPEN REQ · MACHINIST, SHIFT B · JD DRAFTED FROM YOUR LAST THREE HIRES THAT WORKED
              </div>
              <div className="mono" style={{ display: "flex", gap: 16, fontSize: 10.5, color: "var(--ghost)", marginBottom: 14, flexWrap: "wrap" }}>
                <span><b style={{ color: "var(--ink)", fontSize: 14 }}>34</b> APPLIED</span>
                <span><b style={{ color: "var(--ink)", fontSize: 14 }}>12</b> SCREENED</span>
                <span><b style={{ color: "var(--ink)", fontSize: 14 }}>4</b> INTERVIEWED</span>
                <span><b style={{ color: A, fontSize: 14 }}>2</b> COMPARED BELOW</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 12 }}>
                {[
                  { n: "Candidate A", c: 8, s: 7, note: "Owns mistakes plainly; ran a two-person cell alone for a year. References confirm.", verdict: "advance" },
                  { n: "Candidate B", c: 5, s: 9, note: "Strongest hands of the four, but two references describe friction with QC.", verdict: "hold" },
                ].map((cd) => (
                  <div key={cd.n} className="card" style={{ padding: 14, background: "var(--surface-2)" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{cd.n}</div>
                    {[["CULTURE", cd.c], ["SKILL", cd.s]].map(([k, v]) => (
                      <div key={k as string} style={{ marginBottom: 6 }}>
                        <div className="mono" style={{ fontSize: 9, color: "var(--ghost)", marginBottom: 3 }}>{k} {v}/10</div>
                        <div style={{ height: 3, background: "var(--hairline)", borderRadius: 2 }}>
                          <div style={{ height: 3, width: `${(v as number) * 10}%`, background: A, borderRadius: 2 }} />
                        </div>
                      </div>
                    ))}
                    <p style={{ fontSize: 11.5, color: "var(--ghost)", margin: "8px 0" }}>{cd.note}</p>
                    {cd.verdict === "advance" ? (
                      advanced ? (
                        <span className="mono" style={{ fontSize: 10, color: A }}>ADVANCED · TRIAL WEEK · OFFER RANGE STAGED</span>
                      ) : (
                        <button className="btn" style={{ background: A, color: "var(--ground)", border: "none", padding: "6px 11px", fontSize: 11 }} onClick={() => setAdvanced(true)}>
                          Advance to trial week
                        </button>
                      )
                    ) : (
                      <span className="mono" style={{ fontSize: 10, color: "var(--ghost)" }}>HOLD · SECOND CONVERSATION, DIFFERENT INTERVIEWER</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="mono" style={{ fontSize: 9.5, color: "var(--ghost)", marginTop: 10 }}>
                SCORES CARRY EVIDENCE, NOT GUT FEEL · THE DECISION TRAIL SURVIVES THE HIRE
              </p>
            </div>
          )}

          {view === "Reviews" && (
            <div style={S}>
              <h3 className="display" style={{ fontSize: 24, marginBottom: 4 }}>Appraisals, from evidence.</h3>
              <div className="mono" style={{ fontSize: 9.5, color: "var(--ghost)", marginBottom: 12 }}>
                3 DUE THIS MONTH · DRAFTS COMPOSED FROM RECORDS, NOT MEMORY · CALIBRATION: SHIFT-B REVIEWS RUN 0.4 HARSH, ADJUSTED
              </div>
              <div className="card" style={{ padding: 14, background: "var(--surface-2)", maxWidth: 560 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Meera K. · QC lead {reviewOk ? <Pill s="DRAFTED" /> : <Pill s="REVIEW DUE" />}</div>
                <p style={{ fontSize: 12.5, color: "var(--ghost)", margin: "8px 0", lineHeight: 1.65 }}>
                  Draft, from her actual year: 98 percent attendance, caught the August
                  defect run before it shipped, trained the weekend QC roster, one late
                  escalation in May, resolved. Recommend Meets-plus and a raise to the
                  60th percentile of the band.
                </p>
                {reviewOk ? (
                  <span className="mono" style={{ fontSize: 10, color: A }}>APPROVED · SENT TO YOU FOR THE HUMAN PARAGRAPH · NOTHING GOES TO MEERA WITHOUT YOU</span>
                ) : (
                  <button className="btn" style={{ background: A, color: "var(--ground)", border: "none", padding: "6px 11px", fontSize: 11 }} onClick={() => setReviewOk(true)}>
                    Approve the draft
                  </button>
                )}
              </div>
            </div>
          )}

          {view === "Chat" && (
            <div style={S}>
              <h3 className="display" style={{ fontSize: 24, marginBottom: 10 }}>One chat, both sides.</h3>
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                {(["manager", "employee"] as const).map((s) => (
                  <button key={s} className="chip" data-on={chatSide === s} onClick={() => { setChatSide(s); setChatMsgs([]); }}>
                    as the {s}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12, minHeight: 120 }}>
                {chatMsgs.map((m) => (
                  <div key={m.q}>
                    <div style={{ fontSize: 12.5, color: "var(--ghost)", marginBottom: 4 }}>You: {m.q}</div>
                    {m.a ? (
                      <div style={{ fontSize: 12.5, borderLeft: `2px solid ${A}`, paddingLeft: 10, lineHeight: 1.6 }}>{m.a}</div>
                    ) : (
                      <span className="chat-dots"><i /><i /><i /></span>
                    )}
                  </div>
                ))}
                {chatMsgs.length === 0 && (
                  <p style={{ fontSize: 12.5, color: "var(--ghost)" }}>
                    {chatSide === "manager"
                      ? "Ask what a manager actually asks. Answers come from the records, and anything that acts waits for your tap."
                      : "Ask what your people actually ask, at 11pm, without waiting for HR to open."}
                  </p>
                )}
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {CHAT_QA[chatSide].map((qa) => (
                  <button key={qa.q} className="chip" onClick={() => askChat(qa)} disabled={chatBusy}>
                    {qa.q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
