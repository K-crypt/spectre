"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { withBasePath } from "@/lib/base-path";

type Seat = {
  slug: "pa" | "coo" | "cmo" | "researcher" | "hr";
  label: string;
  name: string;
  accent: string;
  position: string;
  cameraPan: string;
  risingImage: string;
  standingImage: string;
  status: string;
  claim: string;
  prompt: string;
  table: {
    label: string;
    recommendation: string;
    signals: [
      { label: string; value: string },
      { label: string; value: string },
      { label: string; value: string },
    ];
    rationale: string;
    assumption: string;
    sources: string;
    uncertainty: string;
    alternative: string;
  };
};

type DecisionMode = "ready" | "approved" | "modify" | "why";

const SEATS: Seat[] = [
  {
    slug: "hr",
    label: "AI HR",
    name: "AI HR",
    accent: "var(--ochre)",
    position: "9.5%",
    cameraPan: "4px",
    risingImage: withBasePath("/table-hr-rising-luxury.webp"),
    standingImage: withBasePath("/table-hr-standing-sharp.webp"),
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
    accent: "var(--archive)",
    position: "29.4%",
    cameraPan: "2px",
    risingImage: withBasePath("/table-researcher-rising-luxury.webp"),
    standingImage: withBasePath("/table-researcher-standing-sharp.webp"),
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
    accent: "var(--spectral)",
    position: "50.3%",
    cameraPan: "0px",
    risingImage: withBasePath("/table-pa-rising-v2.webp"),
    standingImage: withBasePath("/table-pa-standing-v2.webp"),
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
    accent: "var(--steel)",
    position: "72%",
    cameraPan: "-2px",
    risingImage: withBasePath("/table-coo-rising-luxury.webp"),
    standingImage: withBasePath("/table-coo-standing-sharp.webp"),
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
    accent: "var(--clay)",
    position: "91%",
    cameraPan: "-4px",
    risingImage: withBasePath("/table-cmo-rising-luxury.webp"),
    standingImage: withBasePath("/table-cmo-standing-sharp.webp"),
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

export function RoundTable({ modulesOnly = false }: { modulesOnly?: boolean }) {
  const journeyRef = useRef<HTMLDivElement>(null);
  const riseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeSlug, setActiveSlug] = useState<Seat["slug"] | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<Seat["slug"] | null>(null);
  const [risePhase, setRisePhase] = useState<"idle" | "rising" | "standing">("idle");
  const [decisionMode, setDecisionMode] = useState<DecisionMode>("ready");
  const [alternativeSelected, setAlternativeSelected] = useState(false);
  const [boardReady, setBoardReady] = useState(modulesOnly);
  const active = SEATS.find((seat) => seat.slug === activeSlug) ?? null;
  const hovered = SEATS.find((seat) => seat.slug === hoveredSlug) ?? null;

  useEffect(() => {
    SEATS.flatMap((seat) => [seat.risingImage, seat.standingImage]).forEach((src) => {
      const image = new Image();
      image.src = src;
    });
    return () => {
      if (riseTimerRef.current) clearTimeout(riseTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const journey = journeyRef.current;
    if (!journey) return;

    if (modulesOnly) {
      journey.style.setProperty("--camera-scale", "1");
      journey.style.setProperty("--hero-copy-opacity", "0");
      journey.style.setProperty("--board-controls-opacity", "1");
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let wasReady = false;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));

    const paintCamera = () => {
      frame = 0;
      if (reducedMotion.matches) {
        journey.style.setProperty("--camera-scale", "1");
        journey.style.setProperty("--hero-copy-opacity", "0");
        journey.style.setProperty("--board-controls-opacity", "1");
        if (!wasReady) {
          wasReady = true;
          setBoardReady(true);
        }
        return;
      }

      const rect = journey.getBoundingClientRect();
      const travel = Math.max(1, journey.offsetHeight - window.innerHeight + 60);
      const progress = clamp((-rect.top + 60) / travel);
      const eased = progress * progress * (3 - 2 * progress);
      const cameraScale = 1.56 - eased * .56;
      const heroCopyOpacity = clamp(1 - progress / .32);
      const controlsOpacity = clamp((progress - .58) / .18);
      const ready = progress >= .68;

      journey.style.setProperty("--camera-scale", cameraScale.toFixed(4));
      journey.style.setProperty("--hero-copy-opacity", heroCopyOpacity.toFixed(4));
      journey.style.setProperty("--board-controls-opacity", controlsOpacity.toFixed(4));
      if (ready !== wasReady) {
        wasReady = ready;
        setBoardReady(ready);
      }
    };

    const requestPaint = () => {
      if (!frame) frame = window.requestAnimationFrame(paintCamera);
    };

    paintCamera();
    window.addEventListener("scroll", requestPaint, { passive: true });
    window.addEventListener("resize", requestPaint);
    reducedMotion.addEventListener("change", requestPaint);
    return () => {
      window.removeEventListener("scroll", requestPaint);
      window.removeEventListener("resize", requestPaint);
      reducedMotion.removeEventListener("change", requestPaint);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [modulesOnly]);

  useEffect(() => {
    if (!modulesOnly || !activeSlug) return;

    const dismissWithKeyboard = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (riseTimerRef.current) clearTimeout(riseTimerRef.current);
      setActiveSlug(null);
      setRisePhase("idle");
      setDecisionMode("ready");
      setAlternativeSelected(false);
    };

    document.addEventListener("keydown", dismissWithKeyboard);
    return () => {
      document.removeEventListener("keydown", dismissWithKeyboard);
    };
  }, [activeSlug, modulesOnly]);

  const dismiss = () => {
    if (riseTimerRef.current) clearTimeout(riseTimerRef.current);
    setActiveSlug(null);
    setRisePhase("idle");
    setDecisionMode("ready");
    setAlternativeSelected(false);
  };

  const choose = (slug: Seat["slug"]) => {
    if (riseTimerRef.current) clearTimeout(riseTimerRef.current);
    setActiveSlug(slug);
    setRisePhase("rising");
    setDecisionMode("ready");
    setAlternativeSelected(false);
    riseTimerRef.current = setTimeout(() => setRisePhase("standing"), 520);
  };

  return (
    <div
      ref={journeyRef}
      className={`rt-experience ${modulesOnly ? "modules-only" : ""} ${boardReady ? "is-boardroom-ready" : ""} ${active ? `has-active active-${active.slug}` : ""} ${hovered ? `has-hover hover-${hovered.slug}` : ""} phase-${risePhase}`}
      style={{
        "--rt-accent": active?.accent ?? "var(--spectral)",
        "--active-x": active?.position ?? "50%",
        "--camera-focus-x": active?.position ?? "50%",
        "--room-camera-pan": active?.cameraPan ?? "0px",
        "--hover-accent": hovered?.accent ?? "transparent",
        "--hover-x": hovered?.position ?? "50%",
        "--camera-scale": modulesOnly ? 1 : 1.56,
        "--camera-y": "0%",
        "--hero-copy-opacity": modulesOnly ? 0 : 1,
        "--board-controls-opacity": modulesOnly ? 1 : 0,
      } as CSSProperties}
    >
      <div className="rt-sticky">
      <div className="rt-photo-stage" role="group" aria-label="The mountain view descending into Spectre's operating layer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="rt-photo rt-photo-base" src={withBasePath(modulesOnly ? "/executive-table-master.webp" : "/mountain-table-master-v4.webp")} alt={modulesOnly ? "Five spectral figures seated around a walnut boardroom table above the same mountain range as the landing page" : "Mountain peaks descending into Spectre's operating table"} />
        {modulesOnly && active && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={`${active.slug}-rising`} className="rt-photo rt-photo-transition rt-photo-rise" src={active.risingImage} alt="" aria-hidden />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={`${active.slug}-standing`} className="rt-photo rt-photo-transition rt-photo-standing" src={active.standingImage} alt="" aria-hidden />
            <span className="rt-role-hue" aria-hidden />
          </>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div key={activeSlug ?? "no-selection"} className="rt-selection-focus" aria-hidden />
        {modulesOnly && <span className="rt-hover-color" aria-hidden />}
        <div className="rt-photo-vignette" />

        {modulesOnly && (
          <div className="rt-figure-hotspots" aria-label="Choose an executive from the table">
            {SEATS.map((seat) => (
              <button
                key={seat.slug}
                type="button"
                style={{ "--figure-x": seat.position, "--seat-accent": seat.accent } as CSSProperties}
                onClick={() => choose(seat.slug)}
                onMouseEnter={() => setHoveredSlug(seat.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                onFocus={() => setHoveredSlug(seat.slug)}
                onBlur={() => setHoveredSlug(null)}
                aria-label={`Select ${seat.name} from the executive table`}
                aria-pressed={seat.slug === activeSlug}
              >
                <span>{seat.label}</span>
              </button>
            ))}
          </div>
        )}

        {!modulesOnly && <div className="rt-hero-copy">
          <span className="mono rt-hero-kicker">AN AI OPERATING LAYER FOR FOUNDER-LED BUSINESSES</span>
          <h1 className="display hero-line">
            <span>Your business, finally</span>
            <span>in one operating picture.</span>
          </h1>
          <p className="hero-why">
            Spectre is built around your workflows, trained on your context, and
            designed to turn scattered business information into prepared decisions.
            They prepare. You decide.
          </p>
          <div className="rt-hero-actions">
            <a href="#access" className="btn btn-hard">Discuss a design partnership</a>
            <a href="#factory" className="btn btn-soft">See the 400-machine pilot</a>
          </div>
          <div className="hero-readouts mono">
            <span>BUILT AROUND YOUR WORKFLOWS</span>
            <span>TRAINED ON YOUR CONTEXT</span>
            <span>NOTHING MOVES WITHOUT YOUR YES</span>
          </div>
        </div>}

        {!active && (
          <div className="rt-room-invitation" aria-live="polite">
            <span className="mono">THE EXECUTIVE ROOM · FICTIONAL DEMONSTRATION</span>
            <strong className="display">Summon the specialist the decision requires.</strong>
            <p>Spectre prepares. The human decides.</p>
          </div>
        )}

        {active && (
          <>
            <article className="rt-executive-brief" aria-live="polite">
              <button type="button" className="rt-room-close" onClick={dismiss} aria-label="Close specialist view">×</button>
              <div className="rt-brief-meta mono">
                <span>{active.status}</span>
                <span>{String(SEATS.indexOf(active) + 1).padStart(2, "0")} / 05</span>
              </div>
              <h3 className="display">{active.claim}</h3>
              <p>{active.prompt}</p>
              <Link href={`/${active.slug}/`}>Explore {active.name} <span aria-hidden>→</span></Link>
            </article>

            <section className={`rt-table-interface mode-${decisionMode}`} aria-label={`${active.name} prepared decision`}>
              <header className="rt-table-header mono">
                <span>{active.table.label}</span>
                <span>FICTIONAL DEMO DATA · HUMAN APPROVAL REQUIRED</span>
              </header>

              <div className="rt-table-readout">
                <div className="rt-table-recommendation">
                  <span className="mono">PREPARED RECOMMENDATION</span>
                  <p>{alternativeSelected ? active.table.alternative : active.table.recommendation}</p>
                </div>
                <dl className="rt-table-signals">
                  {active.table.signals.map((signal) => (
                    <div key={signal.label}>
                      <dt className="mono">{signal.label}</dt>
                      <dd>{signal.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rt-table-detail" aria-live="polite">
                {decisionMode === "approved" && (
                  <div className="rt-table-confirmation">
                    <span className="mono">APPROVED BY YOU · EXECUTED · LOGGED</span>
                    <p>The selected instruction has been released. The decision and evidence trail are now attributable.</p>
                  </div>
                )}

                {decisionMode === "modify" && (
                  <fieldset className="rt-table-alternatives">
                    <legend className="mono">MODIFY THE STAGED INSTRUCTION</legend>
                    <label>
                      <input type="radio" name={`${active.slug}-instruction`} checked={!alternativeSelected} onChange={() => setAlternativeSelected(false)} />
                      <span><b>Prepared</b>{active.table.recommendation}</span>
                    </label>
                    <label>
                      <input type="radio" name={`${active.slug}-instruction`} checked={alternativeSelected} onChange={() => setAlternativeSelected(true)} />
                      <span><b>Lower-risk alternative</b>{active.table.alternative}</span>
                    </label>
                  </fieldset>
                )}

                {decisionMode === "why" && (
                  <dl className="rt-table-rationale">
                    <div><dt className="mono">WHY THIS</dt><dd>{active.table.rationale}</dd></div>
                    <div><dt className="mono">ASSUMPTION</dt><dd>{active.table.assumption}</dd></div>
                    <div><dt className="mono">EVIDENCE</dt><dd>{active.table.sources}</dd></div>
                    <div><dt className="mono">UNCERTAINTY</dt><dd>{active.table.uncertainty}</dd></div>
                  </dl>
                )}
              </div>

              <div className="rt-decision-rail" role="group" aria-label="Decision actions">
                <span className="mono rt-decision-boundary">
                  {decisionMode === "approved" ? "DECISION RELEASED BY YOU" : "PREPARED · NOTHING HAS EXECUTED"}
                </span>
                <div>
                  <button type="button" onClick={() => setDecisionMode("approved")} disabled={decisionMode === "approved"}>Approve</button>
                  <button type="button" aria-pressed={decisionMode === "modify"} disabled={decisionMode === "approved"} onClick={() => setDecisionMode(decisionMode === "modify" ? "ready" : "modify")}>Modify</button>
                  <button type="button" aria-pressed={decisionMode === "why"} disabled={decisionMode === "approved"} onClick={() => setDecisionMode(decisionMode === "why" ? "ready" : "why")}>Ask why</button>
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      <div className="rt-role-selector" aria-label="Choose a specialist">
        {SEATS.map((seat) => (
          <button
            key={seat.slug}
            type="button"
            className={seat.slug === activeSlug ? "is-active" : ""}
            style={{ "--seat-accent": seat.accent } as CSSProperties}
            onClick={() => choose(seat.slug)}
            onMouseEnter={() => setHoveredSlug(seat.slug)}
            onMouseLeave={() => setHoveredSlug(null)}
            onFocus={() => setHoveredSlug(seat.slug)}
            onBlur={() => setHoveredSlug(null)}
            aria-pressed={seat.slug === activeSlug}
          >
            {seat.label}
          </button>
        ))}
      </div>
      </div>
    </div>
  );
}
