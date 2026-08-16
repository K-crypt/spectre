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
  panelSide: "left" | "right";
  risingImage: string;
  standingImage: string;
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
    risingImage: withBasePath("/table-hr-rising-luxury.webp"),
    standingImage: withBasePath("/table-hr-standing-sharp.webp"),
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
    risingImage: withBasePath("/table-researcher-rising-luxury.webp"),
    standingImage: withBasePath("/table-researcher-standing-sharp.webp"),
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
    risingImage: withBasePath("/table-pa-rising-v2.webp"),
    standingImage: withBasePath("/table-pa-standing-v2.webp"),
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
    risingImage: withBasePath("/table-coo-rising-luxury.webp"),
    standingImage: withBasePath("/table-coo-standing-sharp.webp"),
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
    risingImage: withBasePath("/table-cmo-rising-luxury.webp"),
    standingImage: withBasePath("/table-cmo-standing-sharp.webp"),
    status: "RUNNING IN PRODUCTION",
    claim: "I bring a week of marketing ready for judgment.",
    prompt: "Tomorrow's campaign is already assembled.",
    steps: ["Content checked against brand rules", "Ad spend tested against its kill rule", "4 verdicts routed to you"],
    result: "The post, replies, and ad decision are logged and ready to ship.",
    proof: "This operating rhythm runs Carpetstory's marketing today.",
  },
];

export function RoundTable({ modulesOnly = false }: { modulesOnly?: boolean }) {
  const journeyRef = useRef<HTMLDivElement>(null);
  const riseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeSlug, setActiveSlug] = useState<Seat["slug"] | null>(null);
  const [risePhase, setRisePhase] = useState<"idle" | "rising" | "standing">("idle");
  const [approved, setApproved] = useState(false);
  const [boardReady, setBoardReady] = useState(modulesOnly);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const active = SEATS.find((seat) => seat.slug === activeSlug) ?? null;

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
      setApproved(false);
      setDetailsOpen(false);
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
    setApproved(false);
    setDetailsOpen(false);
  };

  const choose = (slug: Seat["slug"]) => {
    if (riseTimerRef.current) clearTimeout(riseTimerRef.current);
    setActiveSlug(slug);
    setRisePhase("rising");
    setApproved(false);
    setDetailsOpen(false);
    riseTimerRef.current = setTimeout(() => setRisePhase("standing"), 520);
  };

  return (
    <div
      ref={journeyRef}
      className={`rt-experience ${modulesOnly ? "modules-only" : ""} ${boardReady ? "is-boardroom-ready" : ""} ${active ? `has-active active-${active.slug}` : ""} phase-${risePhase}`}
      style={{
        "--rt-accent": active?.accent ?? "var(--spectral)",
        "--active-x": active?.position ?? "50%",
        "--camera-focus-x": active?.position ?? "50%",
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
        <div className="rt-photo-vignette" />

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

        <div className="rt-photo-intro" aria-live="polite">
          <span className="mono">SHARED CONTEXT · SPECIALIST VIEWS</span>
          <strong className="display">Choose who takes the floor.</strong>
          <p>Each module prepares a different part of the same operating picture.</p>
          <em className="mono">SELECT A ROLE BELOW</em>
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
                top: "46%",
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
            <button type="button" className="rt-story-close" onClick={dismiss} aria-label="Close specialist briefing">×</button>
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
            <span className="stamp">THE EXECUTIVE TABLE</span>
            <h3 className="display">Choose who takes the floor.</h3>
            <p>Select a role to see its prepared work and the decision waiting for you.</p>
            <span className="mono">THE MACHINE PROPOSES · THE HUMAN DECIDES</span>
          </div>
        )}
      </article>
      </div>
    </div>
  );
}
