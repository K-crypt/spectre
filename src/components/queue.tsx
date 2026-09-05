"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Counter } from "@/components/shell/counter";
import ApproveButton from "@/components/ApproveButton";
import { PRODUCTS_DATA } from "@/lib/products";

/* ── The queue ────────────────────────────────────────────────────────────
   The product is not five specialists. The product is a short list of
   decisions somebody already prepared for you, and one of them is yours to
   make right now. So the page shows that list.

   Everything before this tried to be a picture of the idea — a boardroom, a
   set of portraits, a tab strip of five names — and every one of them needed
   a sentence underneath explaining what to do with it. A queue needs no
   explanation: anyone who has ever had an inbox knows what it is on sight,
   and the argument ("prepared, not executed") is legible in the status
   column before a single row is opened.

   The five are listed first — name, what it is, and whether it has been
   released — so the page reads as a set of products before it reads as a
   demonstration. Opening one expands it in place to show what it
   recommended, what it read that from, and what it still does not know.
   One is open at a time; approving stamps the row and leaves the trail.
   ───────────────────────────────────────────────────────────────────────── */

type Seat = {
  slug: "pa" | "coo" | "cmo" | "researcher" | "hr";
  label: string;
  name: string;
  status: string;
  claim: string;
  prompt: string;
  table: {
    label: string;
    recommendation: string;
    signals: { label: string; value: string }[];
    rationale: string;
    assumption: string;
    sources: string;
    uncertainty: string;
    alternative: string;
  };
};

/* The order the day actually produced them in. */
const AT: Record<string, string> = {
  pa: "07:10",
  researcher: "09:25",
  coo: "10:30",
  cmo: "14:05",
  hr: "16:40",
};
const ORDER = ["pa", "researcher", "coo", "cmo", "hr"];

/* One house, five specialist desks. The role and the domain vocabulary say
   what each desk is responsible for before any decision is opened — a
   visitor should be able to read the lineup and know this is a suite of
   specialist systems rather than five separate tools. */
const DESK: Record<string, { role: string; domain: string[] }> = {
  pa: {
    role: "Executive memory",
    domain: ["priority", "follow-up", "calendar", "context"],
  },
  researcher: {
    role: "Evidence intelligence",
    domain: ["sources", "verification", "conflict", "confidence"],
  },
  coo: {
    role: "Operations intelligence",
    domain: ["capacity", "constraints", "orders", "schedule"],
  },
  cmo: {
    role: "Marketing intelligence",
    domain: ["audience", "content", "campaigns", "performance"],
  },
  hr: {
    role: "People intelligence",
    domain: ["roles", "history", "hiring", "review"],
  },
};

/* Real maturity, short enough to sit in a status column. Nothing here claims
   more than the product page behind it already claims. */
const MATURITY: Record<string, string> = {
  pa: "Running",
  researcher: "Method proven",
  coo: "Pilot",
  cmo: "Running",
  hr: "Design partner",
};

/* The five states an open decision moves through. Gold means the system is
   working; stillness means it has finished and wants a person. */
type Phase = "idle" | "reading" | "reconciling" | "checked" | "ready";

const PHASE_LABEL: Record<Phase, string> = {
  idle: "Prepared",
  reading: "Reading context",
  reconciling: "Reconciling",
  checked: "Evidence checked",
  ready: "Ready for review",
};

/* The product's own name and its one-line description, taken from the
   registry rather than restated here — so what a block calls a specialist is
   always what its page calls it. A visitor who has never heard of any of
   these should be able to read a block and know what it is. */
const PRODUCT = Object.fromEntries(
  PRODUCTS_DATA.map((p) => [p.slug, { name: p.name, claim: p.claim }]),
) as Record<string, { name: string; claim: string }>;

/* The one-line version of each decision — what you would read in a list
   before deciding whether to open it. */
const HEADLINE: Record<string, string> = {
  pa: "Resolve the production clash, then approve two replies",
  researcher: "Release chapter four with two corrected claims",
  coo: "Accept the rush order — with two machines added",
  cmo: "Ship the campaign; pause North-2 if cost drifts again",
  hr: "Open a retention conversation before Friday",
};

const SEATS: Seat[] = [
  {
    slug: "hr",
    label: "AI HR",
    name: "AI HR",
    status: "TAKING DESIGN PARTNERS",
    claim: "I turn a leaving pattern into an early conversation.",
    prompt: "One employee needs you before Friday.",
    table: {
      label: "PEOPLE SIGNAL · RETENTION",
      recommendation: "Hold a retention conversation before Friday; correct workload before discussing compensation.",
      signals: [
        { label: "OVERTIME DRIFT", value: "+40%" },
        { label: "PAY TO BAND", value: "−9%" },
        { label: "READINESS", value: "GUIDE PREPARED" },
      ],
      rationale: "Sustained overtime and pay-band drift appeared together before the employee raised the issue.",
      assumption: "The employee has not already accepted another offer.",
      sources: "Attendance record · pay band · overtime ledger · two reviews",
      uncertainty: "Intent is not known until the conversation happens.",
      alternative: "Open with workload only; defer compensation until the employee states the reason for leaving.",
    },
  },
  {
    slug: "researcher",
    label: "RESEARCHER",
    name: "AI Researcher",
    status: "METHOD PROVEN",
    claim: "I check the study before you have to trust it.",
    prompt: "Chapter four has finished its verification pass.",
    table: {
      label: "EVIDENCE DESK · VERIFICATION",
      recommendation: "Release chapter four with two corrected claims and keep three open questions visible.",
      signals: [
        { label: "SOURCES", value: "47" },
        { label: "CLAIMS RE-CHECKED", value: "18" },
        { label: "OPEN QUESTIONS", value: "3" },
      ],
      rationale: "Two material claims failed the first verification pass and were replaced with stronger sources.",
      assumption: "Distributor reporting is directionally comparable across the three markets.",
      sources: "Primary filings · trade data · expert record · source map",
      uncertainty: "Three market-size assumptions remain sensitive to distributor reporting.",
      alternative: "Hold publication until the three open questions receive independent corroboration.",
    },
  },
  {
    slug: "pa",
    label: "AI PA",
    name: "AI PA · Second Brain",
    status: "RUNNING IN PRODUCTION",
    claim: "I turn forty-one messages into three decisions.",
    prompt: "Your morning arrived before you did.",
    table: {
      label: "EXECUTIVE DESK · MORNING PRIORITIES",
      recommendation: "Resolve the production clash first, approve two replies, and defer the vendor review to Thursday.",
      signals: [
        { label: "MESSAGES READ", value: "41" },
        { label: "CONFLICTS", value: "1" },
        { label: "AWAITING JUDGMENT", value: "3" },
      ],
      rationale: "The production meeting and buyer call share the same decision owner; the buyer deadline is earlier.",
      assumption: "Neither meeting can move without changing the promised response time.",
      sources: "Inbox · calendar · meeting record · priority rules",
      uncertainty: "The vendor has not confirmed whether Thursday still holds.",
      alternative: "Keep the production meeting and delegate the buyer call with a prepared briefing.",
    },
  },
  {
    slug: "coo",
    label: "AI COO",
    name: "AI COO",
    status: "IN PILOT BUILD",
    claim: "I test the rush order before you accept it.",
    prompt: "120,000 units · due in six weeks",
    table: {
      label: "FACTORY COMMAND · ORDER FEASIBILITY",
      recommendation: "Accept the order only with two added machines and a protected week-three maintenance window.",
      signals: [
        { label: "ORDER", value: "120K UNITS" },
        { label: "BOTTLENECK", value: "LINE 2" },
        { label: "FEASIBILITY", value: "CONDITIONAL" },
      ],
      rationale: "Current finishing capacity misses the promised date; two machines recover the gap without overtime dependency.",
      assumption: "Machine delivery and staffing follow the current supplier plan.",
      sources: "BOM · live cell capacity · maintenance plan · supplier lead times",
      uncertainty: "Supplier commissioning is estimated within a five-day range.",
      alternative: "Accept 90,000 units on the original date and stage the balance for the following cycle.",
    },
  },
  {
    slug: "cmo",
    label: "AI CMO",
    name: "AI CMO",
    status: "RUNNING IN PRODUCTION",
    claim: "I bring a week of marketing ready for judgment.",
    prompt: "Tomorrow's campaign is already assembled.",
    table: {
      label: "MARKET DESK · CAMPAIGN READINESS",
      recommendation: "Ship the campaign, restore stories to 20:00, and pause North-2 if its cost rule breaches again.",
      signals: [
        { label: "CUSTOMER SIGNAL", value: "SAVES +12%" },
        { label: "CAMPAIGN", value: "READY" },
        { label: "OUTREACH", value: "12 DRAFTS" },
      ],
      rationale: "Demand signals held; the weakness follows a timing change, while one ad set alone shows cost drift.",
      assumption: "The timing change, not a demand shift, caused the click decline.",
      sources: "Four-week performance · campaign rules · reply history · content calendar",
      uncertainty: "Weekend conversion cannot be known until the first buying window closes.",
      alternative: "Ship organic content only and hold paid spend until Monday's conversion readout.",
    },
  },
];

type Mode = "ready" | "approved" | "modify";

function Signal({ value }: { value: string }) {
  const m = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  if (!m) return <>{value}</>;
  const n = Number(m[2].replace(/,/g, ""));
  if (!Number.isFinite(n) || n === 0) return <>{value}</>;
  return (
    <>
      <Counter to={n} prefix={m[1]} duration={700} />
      {m[3]}
    </>
  );
}

export function Queue() {
  const rows = ORDER.map((slug) => SEATS.find((s) => s.slug === slug) as Seat);
  /* Nothing is open to begin with: the list is the first thing you read. */
  const [open, setOpen] = useState<string | null>(null);
  const [modes, setModes] = useState<Record<string, Mode>>({});
  const [alts, setAlts] = useState<Record<string, boolean>>({});

  /* The open decision's phase, and how many of its context sources have
     resolved. Both reset when a different decision is opened, so the
     sequence is something you watch happen rather than a badge. */
  const [phase, setPhase] = useState<Phase>("idle");
  const [resolved, setResolved] = useState(0);
  const [logged, setLogged] = useState<Record<string, string>>({});
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const openSeat = open ? SEATS.find((s) => s.slug === open) : undefined;
  const sources = openSeat ? openSeat.table.sources.split(" · ") : [];

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (!open) {
      setPhase("idle");
      setResolved(0);
      return;
    }
    /* Already released: there is nothing left to work out, so it opens in
       its resolved state rather than replaying the thinking. */
    if (mode(open) === "approved") {
      setPhase("ready");
      setResolved(99);
      return;
    }
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      /* The states carry meaning, so they still resolve — instantly. */
      setPhase("ready");
      setResolved(99);
      return;
    }

    const count = (SEATS.find((s) => s.slug === open)?.table.sources.split(" · ").length) ?? 4;
    setPhase("reading");
    setResolved(0);
    const at = (ms: number, fn: () => void) =>
      timers.current.push(setTimeout(fn, ms));

    /* One source resolves at a time: this is the context arriving, and it is
       the same list the decision cites underneath. */
    for (let i = 1; i <= count; i++) at(260 + i * 300, () => setResolved(i));
    const readDone = 260 + count * 300;
    at(readDone + 220, () => setPhase("reconciling"));
    at(readDone + 1180, () => setPhase("checked"));
    at(readDone + 1900, () => setPhase("ready"));
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [open]);

  const mode = (slug: string) => modes[slug] ?? "ready";
  const setMode = (slug: string, m: Mode) =>
    setModes((prev) => ({ ...prev, [slug]: m }));
  const approved = ORDER.filter((s) => mode(s) === "approved").length;

  /* Up and down move through the list once something is open. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const i = ORDER.indexOf(open);
      const next = e.key === "ArrowRight" ? i + 1 : i - 1;
      if (next < 0 || next >= ORDER.length) return;
      e.preventDefault();
      setOpen(ORDER[next]);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="queue">
      <div className="queue-head mono">
        <span>Five specialists · one prepared decision each</span>
        <span>
          <b>{approved}</b> of {ORDER.length} released by you
        </span>
      </div>

      {/* The lineup: five vertical cards, side by side, read before opened.
          When one is open the others do not disappear — they step back, so
          the suite stays visible and the reader keeps their place. Same
          room, different lens. */}
      <div className={`lineup ${open ? "has-open" : ""}`} role="list">
        {rows.map((seat, i) => {
          const isOpen = open === seat.slug;
          const m = mode(seat.slug);
          const product = PRODUCT[seat.slug];
          return (
            <div className="lineup-cell" role="listitem" key={seat.slug}>
              <button
                type="button"
                className={`lens ${isOpen ? "is-open" : ""} ${
                  m === "approved" ? "is-approved" : ""
                }`}
                data-tone={seat.slug}
                aria-expanded={isOpen}
                aria-controls="lens-detail"
                onClick={() => {
                  const next = isOpen ? null : seat.slug;
                  setOpen(next);
                  /* the transcript beside the heading follows the lineup */
                  window.dispatchEvent(
                    new CustomEvent("spectre:open", { detail: next }),
                  );
                }}
              >
                <span className="lens-art">
                  <span className="mono lens-at">
                    {AT[seat.slug]} · {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display lens-headline">
                    {HEADLINE[seat.slug]}
                  </span>
                  {/* The three numbers the recommendation was built on. The
                      card was a headline over a screen of empty tint; these
                      are what makes it a product panel rather than a poster,
                      and they count up as the card arrives. */}
                  <span className="lens-signals">
                    {seat.table.signals.map((sig) => (
                      <span key={sig.label} className="lens-signal">
                        <b className="mono">
                          <Signal value={sig.value} />
                        </b>
                        <i className="mono">{sig.label}</i>
                      </span>
                    ))}
                  </span>
                  <span className="mono lens-state">
                    {m === "approved" ? "Approved · logged" : "Prepared · not sent"}
                  </span>
                </span>
                <span className="lens-id">
                  <span className="display lens-name">{product.name}</span>
                  <span className="mono lens-maturity">{MATURITY[seat.slug]}</span>
                </span>
                <span className="mono lens-role">{DESK[seat.slug].role}</span>
                <span className="lens-claim">{product.claim}</span>
                <span className="mono lens-domain" aria-label="Operates on">
                  {DESK[seat.slug].domain.map((d) => (
                    <i key={d}>{d}</i>
                  ))}
                </span>
                <span className="mono lens-more">
                  {isOpen ? "Close" : "See the decision"} <span aria-hidden>→</span>
                </span>
              </button>
              {/* The card shows what it did today; the page behind this link
                  is the whole product — how it works, what it reads, where
                  it stops. Both are one click from the lineup. */}
              <Link className="mono lens-page" href={`/${seat.slug}/`}>
                {product.name} in detail <span aria-hidden>→</span>
              </Link>
            </div>
          );
        })}
      </div>

      {/* One decision opens at a time, full width beneath the lineup, so the
          cards stay a lineup and the evidence gets the room it needs. */}
      {rows
        .filter((seat) => open === seat.slug)
        .map((seat) => {
          const m = mode(seat.slug);
          const alt = alts[seat.slug] ?? false;
          return (
            <div className="lens-detail" id="lens-detail" key={seat.slug}>
              {/* What the system is doing, and the context it is doing it
                  with. The sources are the same ones the decision cites
                  below; here they resolve one at a time, so "reads your
                  whole context" is something you watch rather than a claim. */}
              <div className={`convergence is-${phase}`}>
                <p className="mono conv-status">
                  <span className="conv-dot" aria-hidden />
                  {PHASE_LABEL[phase]}
                </p>
                <ol className="conv-rail" aria-label="Context read for this decision">
                  {sources.map((src, i) => (
                    <li
                      key={src}
                      className={`mono conv-source ${
                        i < resolved ? "is-resolved" : ""
                      } ${i === resolved && phase === "reading" ? "is-active" : ""}`}
                    >
                      <span className="conv-mark" aria-hidden />
                      {src}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rail-body">
                <div>
                  <p className="mono rail-eyebrow">
                    {AT[seat.slug]} · {seat.table.label}
                  </p>
                  <p className="display rail-line">
                    {alt ? seat.table.alternative : seat.table.recommendation}
                  </p>
                  <Link className="mono rail-link" href={`/${seat.slug}/`}>
                    How {seat.name} works <span aria-hidden>→</span>
                  </Link>
                </div>

                <dl className="rail-signals">
                  {seat.table.signals.map((sig) => (
                    <div key={sig.label}>
                      <dt className="mono">{sig.label}</dt>
                      <dd className="mono">
                        <Signal value={sig.value} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Shown by default, never behind a control. */}
              <dl className="rail-evidence">
                <div>
                  <dt className="mono">Why this</dt>
                  <dd>{seat.table.rationale}</dd>
                </div>
                <div>
                  <dt className="mono">Read from</dt>
                  <dd>{seat.table.sources}</dd>
                </div>
                <div>
                  <dt className="mono">Not yet known</dt>
                  <dd>{seat.table.uncertainty}</dd>
                </div>
              </dl>

              {m === "modify" && (
                <fieldset className="rail-alternatives">
                  <legend className="mono">Change the staged instruction</legend>
                  <label>
                    <input
                      type="radio"
                      name={`${seat.slug}-i`}
                      checked={!alt}
                      onChange={() => setAlts((p) => ({ ...p, [seat.slug]: false }))}
                    />
                    <span>
                      <b>As prepared</b>
                      {seat.table.recommendation}
                    </span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`${seat.slug}-i`}
                      checked={alt}
                      onChange={() => setAlts((p) => ({ ...p, [seat.slug]: true }))}
                    />
                    <span>
                      <b>Lower-risk alternative</b>
                      {seat.table.alternative}
                    </span>
                  </label>
                </fieldset>
              )}

              <div className="rail-rail" role="group" aria-label="Decision">
                <span className="mono">
                  {m === "approved"
                    ? "Released by you · attributable · reversible where reversal exists"
                    : phase === "ready"
                      ? "Nothing here has executed"
                      : "The system is still working"}
                </span>
                <div>
                  {/* The same approval control the day uses — one event, one
                      component, one meaning across the site. It cannot be
                      pressed until the system has finished: approving a
                      decision mid-reconciliation is the one lie this page
                      must not tell. */}
                  <ApproveButton
                    disabled={m === "approved" || phase !== "ready"}
                    onApprove={() => {
                      setMode(seat.slug, "approved");
                      const [h, min] = AT[seat.slug].split(":").map(Number);
                      const t = new Date(0, 0, 0, h, min + 1);
                      setLogged((prev) => ({
                        ...prev,
                        [seat.slug]: `${String(t.getHours()).padStart(2, "0")}:${String(
                          t.getMinutes(),
                        ).padStart(2, "0")} · APPROVED BY HUMAN`,
                      }));
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-soft"
                    aria-pressed={m === "modify"}
                    disabled={m === "approved"}
                    onClick={() =>
                      setMode(seat.slug, m === "modify" ? "ready" : "modify")
                    }
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* The trail. It appears where the decision was taken, in the
                  machine's own voice, and it does not go away. */}
              {logged[seat.slug] && (
                <p className="mono rail-audit" role="status">
                  <span className="rail-audit-mark" aria-hidden>
                    ✓
                  </span>
                  {logged[seat.slug]}
                </p>
              )}
            </div>
          );
        })}

      <p className="mono queue-foot" aria-live="polite">
        {approved === 0
          ? "Five decisions prepared. None of them executed."
          : `${approved} released by you. The rest are still waiting.`}
      </p>
    </div>
  );
}
