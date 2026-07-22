"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* AI CMO playground — a working miniature of the AI CMO console.
   Data lightly altered from the live deployment (a real rug atelier);
   brand renamed, numbers nudged, people anonymized. Cross-view state:
   verdicts, agent runs, and fixes ripple through the whole console. */

type PostStatus = "pending" | "approved" | "published" | "draft";
type Post = { id: string; day: string; title: string; caption: string; status: PostStatus };

const INITIAL_POSTS: Post[] = [
  { id: "keeps", day: "TUE", title: "The rug keeps this company", caption: "A reading chair, a lamp, and forty knots an inch holding the whole corner together.", status: "published" },
  { id: "real", day: "SAT", title: "The rug is real", caption: "Shot in the workshop at noon, no set dressing. What the phone saw is what ships.", status: "pending" },
  { id: "jewel", day: "MON", title: "The Jewel Box", caption: "A small room that owns two majors: light from the west, and the indigo field rug.", status: "pending" },
  { id: "vault", day: "WED", title: "The Vault № 02 · Indigo & Ash", caption: "One exists. The second number in the vault series, photographed before it leaves.", status: "draft" },
];

const PERF = [
  { title: "The Loom, Before the Rug", chips: ["REEL", "THE HANDS", "BEST REACH"], date: "15 JUL", reach: 241, views: 348, likes: 19, saves: 12, bar: 1.6, tone: "#8a6d4a" },
  { title: "In its home (a sold rug)", chips: ["CAROUSEL", "THE ROOM"], date: "14 JUL", reach: 84, views: 292, likes: 13, saves: 1, bar: 0.5, tone: "#5c5f6e" },
  { title: "The Vault № 01", chips: ["CAROUSEL", "THE PIECE"], date: "6 JUL", reach: 151, views: 441, likes: 28, saves: 5, bar: 1.0, tone: "#6e5a52" },
];

const GRID: { label: string; date: string; tone: string; text?: boolean }[] = [
  { label: "№ 04 · VAULT", date: "AUG 2", tone: "#26221c", text: true },
  { label: "", date: "AUG 4", tone: "#7a6248" },
  { label: "", date: "JUL 31", tone: "#4a5568" },
  { label: "№ 03 · VAULT", date: "JUL 26", tone: "#26221c", text: true },
  { label: "", date: "JUL 25", tone: "#8a7355" },
  { label: "", date: "JUL 23", tone: "#5d4e42" },
];

const KPIS = [
  { key: "sessions", label: "SESSIONS", value: "151", delta: "-8.2%", up: false, series: [78, 86, 34, 158, 141, 52] },
  { key: "visitors", label: "VISITORS", value: "138", delta: "-6.1%", up: false, series: [70, 80, 30, 150, 132, 48] },
  { key: "organic", label: "ORGANIC SEARCH", value: "2", delta: "-90%", up: false, series: [12, 9, 6, 4, 2, 1] },
  { key: "engage", label: "ENGAGEMENT", value: "53.1%", delta: "-11%", up: false, series: [61, 64, 51, 58, 54, 40] },
];

const THREADS = [
  { tier: "ASAP", who: "@h.krout", channel: "IG DM", note: "You approved this follow-up; the API refused the send (policy block). Paste it from the app, or hold for Friday as planned. Your call." },
  { tier: "ASAP", who: "@studio.patti", channel: "IG DM", note: "Reply approved and drafted. Same policy block on the send; the in-app paste has no window limit." },
  { tier: "WHENEVER", who: "J. Garcia", channel: "FB", note: "Phishing, skipped as you marked. Delete and report from the page inbox when convenient; never the link." },
];

const WEEK = [
  { d: "MON", slots: [["9:00", "Cockpit"], ["18:45", "Publish"]] },
  { d: "TUE", slots: [["13:30", "DM window"], ["18:45", "Publish · LI"]] },
  { d: "WED", slots: [["9:00", "Cockpit"], ["18:45", "Publish"]] },
  { d: "THU", slots: [["13:30", "DM window"], ["19:00", "X loop"]] },
  { d: "FRI", slots: [["7:00", "GA4 snapshot", true], ["9:00", "Cockpit"]] },
  { d: "SAT", slots: [["13:30", "DM window"]] },
  { d: "SUN", slots: [["7:00", "Trend scout", true], ["18:45", "Publish"]] },
] as { d: string; slots: [string, string, boolean?][] }[];

const AGENTS = [
  { id: "engine", name: "Content engine", sched: "Mon 20:00", desc: "drafts next week's slate" },
  { id: "scout", name: "Trend scout", sched: "Sun 07:00", desc: "sweeps the week's currents" },
  { id: "analyst", name: "Analyst", sched: "Fri 08:00", desc: "computes the digest in code" },
  { id: "dmdesk", name: "DM desk", sched: "daily 13:30", desc: "drafts replies in your voice" },
];

const VIEWS = ["Today", "Comms", "Content", "Stats", "Ads", "Agents"] as const;
type View = (typeof VIEWS)[number];
const A = "var(--clay)";

function Pill({ s }: { s: string }) {
  const map: Record<string, string> = { PENDING: "var(--ghost)", DRAFT: "var(--ghost)", APPROVED: A, PUBLISHED: A, KEEP: A, "KILL · STAGED": "var(--ochre)", KILLED: "var(--ghost)", ASAP: "var(--clay)", WHENEVER: "var(--ghost)" };
  return <span className="badge" style={{ color: map[s] ?? "var(--ghost)", fontSize: 9 }}>{s}</span>;
}

const AUTO_ORDER: View[] = ["Comms", "Content", "Stats", "Ads", "Agents", "Today"];

export function CmoPlayground() {
  const [view, setView] = useState<View>("Comms");
  const [touched, setTouched] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [ctab, setCtab] = useState<"slate" | "perf">("slate");
  const [kpi, setKpi] = useState(0);
  const [tier, setTier] = useState<"All" | "ASAP" | "WHENEVER">("All");
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [adKilled, setAdKilled] = useState(false);
  const [storyMoved, setStoryMoved] = useState(false);
  const [scout, setScout] = useState<"idle" | "running" | "done">("idle");

  const approvePost = (id: string) => setPosts((p) => p.map((x) => (x.id === id ? { ...x, status: "approved" } : x)));
  const runScout = () => {
    if (scout !== "idle") return;
    setScout("running");
    setTimeout(() => {
      setScout("done");
      setPosts((p) => [...p, { id: "idea", day: "SUN", title: "Quiet floors · the current", caption: "Scout filing: bare floors are over in the design press this week; layered wool is the new restraint. Angle staged.", status: "pending" }]);
    }, 1500);
  };

  const verdictCount = useMemo(() => posts.filter((p) => p.status === "pending").length + (adKilled ? 0 : 1) + (storyMoved ? 0 : 1), [posts, adKilled, storyMoved]);

  /* attract mode: cycle the tabs while visible, until the first interaction */
  useEffect(() => {
    const el = rootRef.current;
    if (!el || touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver((es) => {
      for (const e of es) setInView(e.intersectionRatio > 0.3);
    }, { threshold: [0, 0.3, 0.6] });
    io.observe(el);
    return () => io.disconnect();
  }, [touched]);

  useEffect(() => {
    if (touched || !inView) return;
    const t = setTimeout(() => {
      setView((v) => AUTO_ORDER[(AUTO_ORDER.indexOf(v) + 1) % AUTO_ORDER.length]);
    }, 15000);
    return () => clearTimeout(t);
  }, [view, touched, inView]);
  const S = { padding: "14px 16px" } as const;
  /* render INSIDE the target element: ring hugs it, pill floats above it.
     edgeR = right-aligned targets, so the pill never clips the console edge */
  const spot = (label: string, sq = false, edgeR = false) =>
    touched ? null : (
      <span aria-hidden style={{ color: A }}>
        <span className={`spot-ring${sq ? " sq" : ""}`} />
        <span className={`tryit-pill${edgeR ? " edge-r" : ""}`}>TRY IT · {label.toUpperCase()}</span>
      </span>
    );
  const k = KPIS[kpi];
  const pts = k.series.map((v, i) => `${(i / (k.series.length - 1)) * 100},${28 - (v / Math.max(...k.series)) * 24}`);

  return (
    <div ref={rootRef} className="card" style={{ padding: 0, overflow: "hidden" }} onPointerDownCapture={() => setTouched(true)}>
      {/* top bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: "1px solid var(--hairline)", flexWrap: "wrap" }}>
        <span className="mono" style={{ fontSize: 10, letterSpacing: ".14em" }}>CARPETSTORY · AI CMO CONSOLE</span>
        <span className="mono" style={{ fontSize: 8.5, color: "var(--ghost)", letterSpacing: ".1em" }}>DATA LIGHTLY ALTERED FROM THE LIVE DEPLOYMENT</span>
        <span style={{ flex: 1 }} />
        <span className="badge" style={{ color: "var(--ochre)", fontSize: 9 }}>{verdictCount} AWAITING VERDICT</span>
        <span className="mono" style={{ fontSize: 9.5, color: "var(--ghost)" }}>● synced</span>
      </div>

      <div style={{ display: "flex", minHeight: 400 }}>
        {/* sidebar */}
        <div style={{ borderRight: "1px solid var(--hairline)", padding: "12px 0", minWidth: 104 }}>
          {VIEWS.map((v) => (
            <button key={v} onClick={() => setView(v)}
              style={{ display: "block", width: "100%", textAlign: "left", background: view === v ? "var(--surface-2)" : "none", border: "none", borderLeft: view === v ? `2px solid ${A}` : "2px solid transparent", color: view === v ? "var(--ink)" : "var(--ghost)", fontSize: 12.5, fontWeight: view === v ? 600 : 400, padding: "8px 14px", cursor: "pointer" }}>
              {v}
            </button>
          ))}
        </div>

        <div key={view} className="view-swap" style={{ flex: 1, minWidth: 0 }}>
          {view === "Today" && (
            <div style={S}>
              <h3 className="display" style={{ fontSize: 24, marginBottom: 12 }}>
                {verdictCount === 0 ? "Nothing needs you. Enjoy it." : `${verdictCount} item${verdictCount === 1 ? "" : "s"} need your verdict.`}
              </h3>
              <div style={{ border: "1px solid var(--hairline)", borderRadius: 8, padding: 12, marginBottom: 12 }}>
                <div className="mono" style={{ fontSize: 9.5, color: "var(--ghost)", marginBottom: 6 }}>FOLLOWERS · 4 WEEKS · <span style={{ color: A }}>4,020</span> · +6%</div>
                <svg viewBox="0 0 100 22" style={{ width: "100%", height: 40 }} aria-hidden>
                  <polyline points="0,16 16,15 32,14 48,13 64,11 80,8 100,5" fill="none" stroke={A} strokeWidth="1" />
                  <polyline points="0,16 16,15 32,14 48,13 64,11 80,8 100,5 100,22 0,22" fill={A} opacity="0.08" stroke="none" />
                </svg>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                {[["9:00", "Cockpit", "15 min · the judgment pass"], ["13:30", "DM window", "every reply is the KPI"], ["18:45", "Publish", "one tap ships today's post"], ["20:00", "Engine", "next week drafts itself"]].map(([t, n, d], i) => (
                  <div key={t} className="card" style={{ padding: "8px 12px", background: i === 2 ? "var(--ink)" : "var(--surface-2)", color: i === 2 ? "var(--ground)" : "inherit", flex: "1 1 118px" }}>
                    <div className="mono" style={{ fontSize: 9, opacity: 0.7 }}>{t}</div>
                    <div style={{ fontSize: 12.5, fontWeight: 600 }}>{n}</div>
                    <div style={{ fontSize: 10.5, opacity: 0.65 }}>{d}</div>
                  </div>
                ))}
              </div>
              {posts.filter((p) => p.status === "pending").map((p, i) => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: "1px solid var(--hairline)" }}>
                  <span className="mono" style={{ fontSize: 10, color: "var(--ghost)", width: 32 }}>{p.day}</span>
                  <span style={{ fontSize: 13, flex: 1 }}>{p.title}</span>
                  <button className="btn" style={{ background: A, color: "var(--ground)", border: "none", padding: "6px 11px", fontSize: 11 }} onClick={() => approvePost(p.id)}>Approve{i === 0 && spot("clear a verdict", true, true)}</button>
                </div>
              ))}
              {!adKilled && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: "1px solid var(--hairline)" }}>
                  <span className="mono" style={{ fontSize: 10, color: "var(--ghost)", width: 32 }}>ADS</span>
                  <span style={{ fontSize: 13, flex: 1 }}>Kill the static carousel set · CPL breached your rule</span>
                  <button className="btn btn-soft" style={{ padding: "6px 11px", fontSize: 11 }} onClick={() => setAdKilled(true)}>Approve kill</button>
                </div>
              )}
              {!storyMoved && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: "1px solid var(--hairline)" }}>
                  <span className="mono" style={{ fontSize: 10, color: "var(--ghost)", width: 32 }}>DEC</span>
                  <span style={{ fontSize: 13, flex: 1 }}>Move stories to 20:00 · the 23:00 slot cost you reach</span>
                  <button className="btn btn-soft" style={{ padding: "6px 11px", fontSize: 11 }} onClick={() => setStoryMoved(true)}>Approve</button>
                </div>
              )}
            </div>
          )}

          {view === "Comms" && (
            <div style={S}>
              <h3 className="display" style={{ fontSize: 24, marginBottom: 12 }}>{THREADS.length} threads waiting.</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8, marginBottom: 14 }}>
                <div className="card" style={{ padding: 10, background: "var(--surface-2)" }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>Instagram DMs</div>
                  <div className="mono" style={{ fontSize: 9.5, color: A }}>● LIVE · 2 WAITING</div>
                </div>
                <div className="card" style={{ padding: 10, background: "var(--surface-2)" }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>Messenger</div>
                  <div className="mono" style={{ fontSize: 9.5, color: A }}>● LIVE · 1 FLAGGED</div>
                </div>
                <div className="card" style={{ padding: 10, background: "var(--surface-2)" }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>Email · 3 inboxes</div>
                  <div className="mono" style={{ fontSize: 9.5, color: "var(--ghost)" }}>hello@carpetstory.one · 100%<br />trade@carpetstory.one · 100%</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                {(["All", "ASAP", "WHENEVER"] as const).map((t) => (
                  <button key={t} className="chip" data-on={tier === t} onClick={() => setTier(t)}>
                    {t.toLowerCase()} {t === "All" ? THREADS.length : THREADS.filter((x) => x.tier === t).length}
                    {t === "ASAP" && spot("filter the inbox")}
                  </button>
                ))}
              </div>
              {THREADS.filter((t) => tier === "All" || t.tier === tier).map((t) => (
                <div key={t.who} style={{ padding: "9px 0", borderTop: "1px solid var(--hairline)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Pill s={t.tier} />
                    <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>{t.who}</span>
                    <span className="mono" style={{ fontSize: 9.5, color: "var(--ghost)" }}>{t.channel}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--ghost)", margin: "3px 0 0 2px", maxWidth: "64ch" }}>{t.note}</p>
                </div>
              ))}
              <div className="stamp" style={{ fontSize: 9, margin: "12px 0 6px" }}>THE WEEK</div>
              <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
                {WEEK.map((day) => (
                  <div key={day.d} style={{ minWidth: 86, flex: 1 }}>
                    <div className="mono" style={{ fontSize: 9, color: "var(--ghost)", marginBottom: 4 }}>{day.d}</div>
                    {day.slots.map(([t, n, special]) => (
                      <div key={t + n} style={{ background: special ? "color-mix(in srgb, var(--clay) 14%, var(--surface-2))" : "var(--ink)", color: special ? "var(--ink)" : "var(--ground)", borderRadius: 6, padding: "5px 7px", marginBottom: 4 }}>
                        <div className="mono" style={{ fontSize: 8, opacity: 0.7 }}>{t}</div>
                        <div style={{ fontSize: 10.5, fontWeight: 600 }}>{n}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "Content" && (
            <div style={S}>
              <h3 className="display" style={{ fontSize: 24, marginBottom: 8 }}>The making side.</h3>
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                <button className="chip" data-on={ctab === "slate"} onClick={() => setCtab("slate")}>the slate · {posts.filter((p) => p.status !== "published").length} staged</button>
                <button className="chip" data-on={ctab === "perf"} onClick={() => setCtab("perf")}>
                  performance · 3 measured
                  {spot("open performance")}
                </button>
              </div>
              {ctab === "slate" && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
                  <div className="card" style={{ padding: 0, background: "var(--surface-2)", overflow: "hidden" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "12px 12px 8px" }}>
                      <span style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--ink)", color: "var(--ground)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>CS</span>
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 600 }}>carpetstory</div>
                        <div style={{ fontSize: 10.5, color: "var(--ghost)" }}>Hand-knotted in Jaipur · One artisan. One rug. One signature.</div>
                      </div>
                    </div>
                    <div className="mono" style={{ display: "flex", gap: 14, fontSize: 10, color: "var(--ghost)", padding: "0 12px 10px" }}>
                      <span><b style={{ color: "var(--ink)" }}>168</b> posts</span>
                      <span><b style={{ color: "var(--ink)" }}>4,020</b> followers</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
                      {GRID.map((g, i) => (
                        <div key={i} style={{ aspectRatio: "1", background: g.tone, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {g.text && <span className="mono" style={{ fontSize: 8.5, color: "#c9b99a", letterSpacing: ".08em", textAlign: "center" }}>{g.label}</span>}
                          <span className="mono" style={{ position: "absolute", top: 4, left: 4, fontSize: 7, background: "rgba(0,0,0,.55)", color: "#fff", padding: "2px 4px", borderRadius: 3 }}>{g.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mono" style={{ fontSize: 9.5, color: "var(--ghost)", marginBottom: 6 }}>JULY · {posts.length} · VOICE GATE ON EVERY CAPTION</div>
                    {posts.map((p) => (
                      <div key={p.id} style={{ padding: "8px 0", borderTop: "1px solid var(--hairline)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span className="mono" style={{ fontSize: 10, color: "var(--ghost)", width: 30 }}>{p.day}</span>
                          <span style={{ fontSize: 12.5, fontWeight: 600, flex: 1 }}>{p.title}</span>
                          <Pill s={p.status.toUpperCase()} />
                          {p.status === "pending" && (
                            <button className="btn" style={{ background: A, color: "var(--ground)", border: "none", padding: "4px 9px", fontSize: 10 }} onClick={() => approvePost(p.id)}>Approve</button>
                          )}
                        </div>
                        <p style={{ fontSize: 11.5, color: "var(--ghost)", margin: "3px 0 0 38px", maxWidth: "52ch" }}>{p.caption}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {ctab === "perf" && (
                <div>
                  {PERF.map((r) => (
                    <div key={r.title} className="card" style={{ padding: 12, background: "var(--surface-2)", marginBottom: 8 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                        <span style={{ width: 34, height: 34, borderRadius: 6, background: r.tone, flexShrink: 0 }} />
                        <div style={{ flex: "1 1 200px" }}>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{r.title}</div>
                          <div style={{ display: "flex", gap: 4, marginTop: 3, flexWrap: "wrap" }}>
                            {r.chips.map((c) => (
                              <span key={c} className="badge" style={{ fontSize: 8, color: c === "BEST REACH" ? A : "var(--ghost)" }}>{c}</span>
                            ))}
                            <span className="mono" style={{ fontSize: 9, color: "var(--ghost)", marginLeft: 4 }}>{r.date}</span>
                          </div>
                        </div>
                        <div className="mono" style={{ display: "flex", gap: 14, fontSize: 10.5, color: "var(--ghost)" }}>
                          <span><b style={{ color: A, fontSize: 13 }}>{r.reach}</b><br />REACH</span>
                          <span><b style={{ color: "var(--ink)", fontSize: 13 }}>{r.views}</b><br />VIEWS</span>
                          <span><b style={{ color: "var(--ink)", fontSize: 13 }}>{r.likes}</b><br />LIKES</span>
                          <span><b style={{ color: "var(--ink)", fontSize: 13 }}>{r.saves}</b><br />SAVES</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                        <div style={{ flex: 1, maxWidth: 260, height: 4, background: "var(--hairline)", borderRadius: 2 }}>
                          <div style={{ width: `${Math.min(100, r.bar * 55)}%`, height: 4, background: A, borderRadius: 2 }} />
                        </div>
                        <span className="mono" style={{ fontSize: 9.5, color: "var(--ghost)" }}>{r.bar}× median</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {view === "Stats" && (
            <div style={S}>
              <h3 className="display" style={{ fontSize: 24, marginBottom: 4 }}>The week, computed.</h3>
              <div className="mono" style={{ fontSize: 9.5, color: "var(--ghost)", marginBottom: 10 }}>GA4 · PULLED TODAY 08:00 · EVERY NUMBER COMPUTED IN CODE, NEVER BY THE MODEL</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(108px, 1fr))", gap: 8, marginBottom: 10 }}>
                {KPIS.map((x, i) => (
                  <button key={x.key} onClick={() => setKpi(i)} className="card" style={{ position: "relative", padding: 10, background: "var(--surface-2)", textAlign: "left", cursor: "pointer", border: i === kpi ? `1px solid ${A}` : "1px solid var(--hairline)" }}>
                    <div className="mono" style={{ fontSize: 16, color: i === kpi ? A : "var(--ink)" }}>{x.value}</div>
                    <div className="stamp" style={{ fontSize: 7.5, marginBottom: 2 }}>{x.label}</div>
                    <div className="mono" style={{ fontSize: 9.5, color: "#c96a4a" }}>↓ {x.delta}</div>
                    {i === 2 && spot("click a tile", true)}
                  </button>
                ))}
              </div>
              <div style={{ border: "1px solid var(--hairline)", borderRadius: 8, padding: 12, marginBottom: 12 }}>
                <div className="mono" style={{ fontSize: 9, color: "var(--ghost)", marginBottom: 6 }}>{k.label} PER WEEK · LAST 6 · FINAL WEEK STILL RUNNING</div>
                <svg viewBox="0 0 100 30" style={{ width: "100%", height: 78 }} aria-hidden>
                  <polyline points={pts.slice(0, 5).join(" ")} fill="none" stroke={A} strokeWidth="0.8" />
                  <polyline points={`${pts.slice(0, 5).join(" ")} ${pts[4]}`} fill="none" stroke="none" />
                  <line x1={pts[4].split(",")[0]} y1={pts[4].split(",")[1]} x2={pts[5].split(",")[0]} y2={pts[5].split(",")[1]} stroke={A} strokeWidth="0.8" strokeDasharray="2 2" opacity="0.7" />
                  <polygon points={`${pts.slice(0, 5).join(" ")} ${pts[4].split(",")[0]},30 0,30`} fill={A} opacity="0.07" />
                  {pts.map((p, i) => (
                    <circle key={i} cx={p.split(",")[0]} cy={p.split(",")[1]} r="0.9" fill={A} opacity={i === 5 ? 0.6 : 1} />
                  ))}
                </svg>
              </div>
              <div className="stamp" style={{ fontSize: 9, marginBottom: 8 }}>WHAT TO WORK ON · REGENERATED FROM THE DATA ON EVERY REFRESH</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
                <div className="card" style={{ padding: 12, background: "var(--surface-2)" }}>
                  <span className="badge" style={{ color: "#c96a4a", fontSize: 8.5 }}>DO FIRST</span>
                  <div style={{ fontSize: 12.5, fontWeight: 600, margin: "6px 0 4px" }}>92% of traffic is Direct — attribution is largely blind</div>
                  <p style={{ fontSize: 11.5, color: "var(--ghost)" }}>Put UTM tags on every published link; the engine generates them per post, so this fixes itself going forward.</p>
                  <div className="mono" style={{ fontSize: 9, background: "var(--ground)", border: "1px solid var(--hairline)", borderRadius: 5, padding: "5px 7px", marginTop: 6, overflowX: "auto" }}>
                    ?utm_source=instagram&amp;utm_campaign=&lt;post&gt;
                  </div>
                </div>
                <div className="card" style={{ padding: 12, background: "var(--surface-2)" }}>
                  <span className="badge" style={{ color: "#c96a4a", fontSize: 8.5 }}>DO FIRST</span>
                  <div style={{ fontSize: 12.5, fontWeight: 600, margin: "6px 0 4px" }}>Average rank 29 — page three, where nobody looks</div>
                  <p style={{ fontSize: 11.5, color: "var(--ghost)" }}>Pick one page and one honest query, and make that page genuinely the best answer. One page ranking beats twenty that do not.</p>
                </div>
              </div>
              <div style={{ borderLeft: `2px solid ${A}`, paddingLeft: 10, marginTop: 12, fontSize: 12, color: "var(--ghost)", maxWidth: "56ch" }}>
                ANOMALY · story reach fell 31% after Wednesday&apos;s 23:00 slot.{" "}
                {storyMoved ? (
                  <span className="mono" style={{ fontSize: 9.5, color: A }}>FIX APPROVED · STORIES MOVE TO 20:00 · LOGGED</span>
                ) : (
                  <button className="chip" onClick={() => setStoryMoved(true)}>approve the fix: move stories to 20:00</button>
                )}
              </div>
            </div>
          )}

          {view === "Ads" && (
            <div style={S}>
              <h3 className="display" style={{ fontSize: 24, marginBottom: 4 }}>Ads, with kill rules.</h3>
              <div className="mono" style={{ fontSize: 9.5, color: "var(--ghost)", marginBottom: 12 }}>CS-LEADS-LEAN · ₹600/DAY · RULE: KILL ANY SET 40% OVER TARGET CPL FOR 5 DAYS</div>
              {[
                { name: "Loom reel · the hands", cpl: "₹204", state: "KEEP", note: "under target, scaling candidate" },
                { name: "Static carousel", cpl: "₹418", state: adKilled ? "KILLED" : "KILL · STAGED", note: "breached the rule Wednesday" },
              ].map((ad) => (
                <div key={ad.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderTop: "1px solid var(--hairline)" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>{ad.name}</span>
                  <span className="mono" style={{ fontSize: 11 }}>{ad.cpl} / lead</span>
                  <Pill s={ad.state} />
                  {ad.state === "KILL · STAGED" && (
                    <button className="btn btn-soft" style={{ padding: "5px 10px", fontSize: 10.5 }} onClick={() => setAdKilled(true)}>
                      Approve kill
                      {spot("approve the kill", true, true)}
                    </button>
                  )}
                </div>
              ))}
              <p style={{ fontSize: 12, color: "var(--ghost)", marginTop: 10, maxWidth: "56ch" }}>
                {adKilled
                  ? "Kill executed and logged. Its budget shifts to the reel tomorrow; the ladder to ₹900/day opens if CPL holds under target four weeks."
                  : "Nothing spends a rupee outside the rules, and no rule fires without your tap."}
              </p>
            </div>
          )}

          {view === "Agents" && (
            <div style={S}>
              <h3 className="display" style={{ fontSize: 24, marginBottom: 4 }}>The staff, on schedule.</h3>
              <div className="mono" style={{ fontSize: 9.5, color: "var(--ghost)", marginBottom: 12 }}>EACH AGENT IS A WRITTEN PROCEDURE · RUNS LOG THEMSELVES · TRY THE SCOUT</div>
              {AGENTS.map((ag) => (
                <div key={ag.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderTop: "1px solid var(--hairline)" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{ag.name}</div>
                    <div className="mono" style={{ fontSize: 9.5, color: "var(--ghost)" }}>{ag.sched} · {ag.desc}</div>
                  </div>
                  {ag.id === "scout" ? (
                    scout === "idle" ? (
                      <button className="btn" style={{ background: A, color: "var(--ground)", border: "none", padding: "6px 11px", fontSize: 11 }} onClick={runScout}>
                        Run now
                        {spot("run the scout", true, true)}
                      </button>
                    ) : scout === "running" ? (
                      <span className="mono" style={{ fontSize: 10, color: "var(--ochre)" }}>RUNNING…</span>
                    ) : (
                      <span className="mono" style={{ fontSize: 10, color: A }}>DONE · 3 IDEAS · 1 STAGED</span>
                    )
                  ) : (
                    <span className="mono" style={{ fontSize: 10, color: "var(--ghost)" }}>IDLE</span>
                  )}
                </div>
              ))}
              {scout === "done" && (
                <p style={{ fontSize: 12.5, color: "var(--ghost)", marginTop: 10, maxWidth: "56ch" }}>
                  The scout filed its sweep and staged one idea into the slate. Open{" "}
                  <button className="chip" onClick={() => setView("Content")}>Content</button> to see it waiting for your verdict.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
