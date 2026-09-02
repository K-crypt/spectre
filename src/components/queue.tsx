"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Counter } from "@/components/ui";
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

      {/* The lineup: five vertical cards, side by side, read before opened. */}
      <div className="lineup" role="list">
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
                <span className="display lens-name">{product.name}</span>
                <span className="lens-claim">{product.claim}</span>
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
                    : "Nothing here has executed"}
                </span>
                <div>
                  <button
                    type="button"
                    className="btn btn-hard"
                    onClick={() => setMode(seat.slug, "approved")}
                    disabled={m === "approved"}
                  >
                    Approve
                  </button>
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
