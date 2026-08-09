"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type Seat = {
  slug: "pa" | "coo" | "cmo" | "researcher" | "hr";
  label: string;
  name: string;
  accent: string;
  position: string;
  panelSide: "left" | "right";
  status: string;
  claim: string;
  prompt: string;
  steps: [string, string, string];
  result: string;
  proof: string;
};

const SEATS: Seat[] = [
  {
    slug: "hr",
    label: "AI HR",
    name: "AI HR",
    accent: "var(--ochre)",
    position: "9.5%",
    panelSide: "right",
    status: "TAKING DESIGN PARTNERS",
    claim: "I turn a leaving pattern into an early conversation.",
    prompt: "One employee needs you before Friday.",
    steps: ["Full-year record retrieved", "Overtime and pay drift cross-checked", "Conversation guide prepared"],
    result: "The conversation is staged. No letter or people decision is automated.",
    proof: "The people layer is now opening to design partners.",
  },
  {
    slug: "researcher",
    label: "RESEARCHER",
    name: "AI Researcher",
    accent: "var(--archive)",
    position: "29.4%",
    panelSide: "right",
    status: "METHOD PROVEN",
    claim: "I check the study before you have to trust it.",
    prompt: "Chapter four has finished its verification pass.",
    steps: ["47 sources mapped", "Every material claim challenged", "2 claims corrected and re-sourced"],
    result: "The chapter is verified. Open questions remain visibly flagged.",
    proof: "The method delivered a complete market-entry study in July 2026.",
  },
  {
    slug: "pa",
    label: "AI PA",
    name: "AI PA · Second Brain",
    accent: "var(--spectral)",
    position: "50.3%",
    panelSide: "right",
    status: "RUNNING IN PRODUCTION",
    claim: "I turn forty-one messages into three decisions.",
    prompt: "Your morning arrived before you did.",
    steps: ["41 messages read", "2 replies drafted in your voice", "3 decisions routed to you"],
    result: "The replies are staged. Your calendar fix is ready. Nothing has been sent.",
    proof: "The memory layer already coordinates live operating work.",
  },
  {
    slug: "coo",
    label: "AI COO",
    name: "AI COO",
    accent: "var(--steel)",
    position: "72%",
    panelSide: "left",
    status: "IN PILOT BUILD",
    claim: "I test the rush order before you accept it.",
    prompt: "120,000 units · due in six weeks",
    steps: ["Bill of materials exploded", "Live capacity checked by cell", "1 bottleneck · purchase list staged"],
    result: "The feasible plan is staged. No material has been ordered.",
    proof: "Approximately 400 machines are being mapped into one operating picture.",
  },
  {
    slug: "cmo",
    label: "AI CMO",
    name: "AI CMO",
    accent: "var(--clay)",
    position: "91%",
    panelSide: "left",
    status: "RUNNING IN PRODUCTION",
    claim: "I bring a week of marketing ready for judgment.",
    prompt: "Tomorrow's campaign is already assembled.",
    steps: ["Content checked against brand rules", "Ad spend tested against its kill rule", "4 verdicts routed to you"],
    result: "The post, replies, and ad decision are logged and ready to ship.",
    proof: "This operating rhythm runs Carpetstory's marketing today.",
  },
];

export function RoundTable() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const [activeSlug, setActiveSlug] = useState<Seat["slug"] | null>(null);
  const [approved, setApproved] = useState(false);
  const [boardReady, setBoardReady] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const active = SEATS.find((seat) => seat.slug === activeSlug) ?? null;

  useEffect(() => {
    const journey = journeyRef.current;
    if (!journey) return;

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
  }, []);

  const choose = (slug: Seat["slug"]) => {
    if (slug === activeSlug) return;
    setActiveSlug(slug);
    setApproved(false);
    setDetailsOpen(false);
  };

  return (
    <div
      ref={journeyRef}
      className={`rt-experience ${boardReady ? "is-boardroom-ready" : ""} ${active ? "has-active" : ""}`}
      style={{
        "--rt-accent": active?.accent ?? "var(--spectral)",
        "--active-x": active?.position ?? "50%",
        "--camera-focus-x": active?.position ?? "50%",
        "--camera-scale": 1.56,
        "--camera-y": "0%",
        "--hero-copy-opacity": 1,
        "--board-controls-opacity": 0,
      } as CSSProperties}
    >
      <div className="rt-sticky">
      <div className="rt-photo-stage" role="group" aria-label="The mountain view descending into a table of five AI specialists">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="rt-photo rt-photo-base" src="/mountain-table-master-v4.webp" alt="Mountain peaks descending into a table of five seated AI specialists" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div key={activeSlug ?? "no-selection"} className="rt-selection-focus" aria-hidden />
        <div className="rt-photo-vignette" />

        <div className="rt-hero-copy">
          <h1 className="display hero-line">
            <span>Automate what can be.</span>
            <span>Focus on what can&apos;t.</span>
          </h1>
          <p className="hero-why">
            Five AI specialists that make your executive team more powerful.
            They prepare the work; your people make the calls.
          </p>
          <div className="rt-hero-actions">
            <a href="#access" className="btn btn-hard">Request early access</a>
            <a href="#day" className="btn btn-soft">Watch one day</a>
          </div>
          <div className="hero-readouts mono">
            <span>5 SPECIALISTS</span>
            <span>1 RULE — YOUR YES</span>
            <span>3 LIVE OPERATIONS TODAY</span>
          </div>
        </div>

        <div className="rt-photo-intro" aria-live="polite">
          <span className="mono">{active ? `${active.label} · SELECTED` : "THE TABLE"}</span>
          <strong className="display">Your suite, amplified.</strong>
          <p>Five specialists prepare the work and wait. They sit with your team, not instead of it — and only one line ever leaves the table.</p>
          <em className="mono">{active ? "ONE SPECIALIST HAS THE FLOOR" : "CHOOSE A SPECIALIST"}</em>
        </div>

        {SEATS.map((seat) => {
          const selected = seat.slug === activeSlug;
          return (
            <button
              key={seat.slug}
              type="button"
              className={`rt-person rt-person-${seat.slug} ${selected ? "is-active" : ""}`}
              style={{
                left: seat.position,
                top: selected ? "43%" : "46%",
                "--seat-accent": seat.accent,
              } as CSSProperties}
              onClick={() => choose(seat.slug)}
              aria-pressed={selected}
              aria-label={`Ask ${seat.name} to introduce itself`}
            >
              <span className="rt-person-pulse" aria-hidden />
              <span>{seat.label}</span>
            </button>
          );
        })}
      </div>

      <div className="rt-mobile-picker" aria-label="Choose a specialist">
        {SEATS.map((seat) => (
          <button
            key={seat.slug}
            type="button"
            className={seat.slug === activeSlug ? "is-active" : ""}
            style={{ "--seat-accent": seat.accent } as CSSProperties}
            onClick={() => choose(seat.slug)}
            aria-pressed={seat.slug === activeSlug}
          >
            {seat.label}
          </button>
        ))}
      </div>

      <article className={`rt-story ${active ? `has-profile side-${active.panelSide}` : ""} ${detailsOpen ? "is-expanded" : "is-compact"}`} aria-live="polite">
        {active ? (
          <div key={active.slug} className="rt-profile">
            <div className="rt-story-switcher" aria-label="Change specialist">
              {SEATS.map((seat) => (
                <button
                  key={seat.slug}
                  type="button"
                  className={seat.slug === active.slug ? "is-active" : ""}
                  onClick={() => choose(seat.slug)}
                >
                  {seat.label}
                </button>
              ))}
            </div>
            <div className="rt-story-top">
              <span className="stamp">{active.status}</span>
              <span className="mono rt-story-count">{String(SEATS.indexOf(active) + 1).padStart(2, "0")} / 05</span>
            </div>
            <h3 className="display">{active.claim}</h3>
            <p className="rt-story-prompt">{active.prompt}</p>

            <div className="rt-story-actions">
              <button type="button" className="btn rt-details-toggle" onClick={() => setDetailsOpen((open) => !open)}>
                {detailsOpen ? "Close briefing" : "Open briefing"}
              </button>
              <Link href={`/${active.slug}/`}>Explore {active.name} <span aria-hidden>→</span></Link>
            </div>

            <div className="rt-steps">
              {active.steps.map((step, index) => (
                <div className="rt-step" key={step} style={{ "--step-delay": `${index * 90}ms` } as CSSProperties}>
                  <span className="rt-step-mark">{index + 1}</span>
                  <span>{step}</span>
                  <span className="mono rt-step-state">DONE</span>
                </div>
              ))}
            </div>

            <div className={`rt-decision ${approved ? "is-approved" : ""}`}>
              <div className="mono rt-decision-label">
                {approved ? "APPROVED BY YOU · EXECUTED · LOGGED" : "READY · NOTHING MOVES WITHOUT YOU"}
              </div>
              <p>{active.result}</p>
              {!approved ? (
                <button type="button" className="btn rt-approve" onClick={() => setApproved(true)}>
                  Approve the staged work
                </button>
              ) : (
                <button type="button" className="rt-reset" onClick={() => setApproved(false)}>
                  Replay this decision
                </button>
              )}
            </div>

            <div className="rt-proof">
              <span className="stamp">PROOF</span>
              <p>{active.proof}</p>
              <Link href={`/${active.slug}/`}>Explore {active.name} <span aria-hidden>→</span></Link>
            </div>
          </div>
        ) : (
          <div className="rt-story-empty">
            <span className="stamp">THE CAST</span>
            <h3 className="display">Five specialists. One chair is yours.</h3>
            <p>Choose a label over the table. That specialist will stand, introduce its role, and show the work it has prepared for your decision.</p>
            <span className="mono">THE MACHINE PROPOSES · THE HUMAN DECIDES</span>
          </div>
        )}
      </article>
      </div>
    </div>
  );
}
