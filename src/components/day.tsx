"use client";

/* ── The day, in four beats ───────────────────────────────────────────────
   Six beats became three, and three are now four — but the change that
   matters is that they no longer arrive together. The chapter used to show
   its whole timeline at once, with message counts and bottlenecks and
   staged purchase lists, which made it a table of contents for a day rather
   than the experience of one.

   Four times, four lines, one object. The world is read, the decision is
   prepared, you release it, and the evening is still yours. Each beat
   arrives as the reader reaches it; the work behind them stays visible and
   steps back, because the argument is that it accumulates.

   The only thing on the screen with any weight is the prepared batch and
   the control that releases it. Fictional data, and the label says so.
   Complete and static under prefers-reduced-motion — everything visible,
   and the approval still works. */

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import ApproveButton from "@/components/ApproveButton";

function Beat({
  index,
  time,
  title,
  children,
  state = "ahead",
  you = false,
}: {
  /* The scroll advances the beats; each one carries its own place in the
     sequence so the CSS can derive its arrival from the chapter's --p. */
  index: number;
  time: string;
  title: string;
  children?: ReactNode;
  /* Where this beat sits relative to where the reader has got to: work
     already done recedes without disappearing, the current beat leads, and
     what has not happened yet stays quiet. */
  state?: "done" | "now" | "ahead";
  you?: boolean;
}) {
  return (
    <div
      className={`beat is-${state} ${you ? "beat-you" : ""}`}
      data-beat={index}
      style={{ "--i": index } as CSSProperties}
    >
      <div className="beat-rail">
        <span className="mono beat-time">{time}</span>
        <span className="beat-dot" />
      </div>
      <div className="beat-body">
        {/* Context gathering into this beat, for as long as it takes the
            beat to become the current one. Three hairlines, no repeat. */}
        <svg className="beat-trace" viewBox="0 0 240 60" aria-hidden fill="none">
          <path className="bt" d="M0 8 C 90 8, 132 30, 216 30" />
          <path className="bt" style={{ animationDelay: "120ms" }} d="M0 30 L216 30" />
          <path className="bt" style={{ animationDelay: "240ms" }} d="M0 52 C 90 52, 132 30, 216 30" />
          <circle className="bt-node" cx="220" cy="30" r="2.4" />
        </svg>
        <p className="beat-title">{title}</p>
        {children}
      </div>
    </div>
  );
}

export function Day() {
  const [approved, setApproved] = useState(false);
  const [reached, setReached] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  /* Four beats, revealed one at a time as the reader moves through them.
     The day used to show its whole timeline at once, which made it a table
     of contents for a day rather than the experience of one. Finished work
     stays on screen and steps back; what has not happened yet waits. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReached(4);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = Number((e.target as HTMLElement).dataset.beat);
          setReached((prev) => (i > prev ? i : prev));
        }
      },
      { rootMargin: "-40% 0px -30% 0px" },
    );
    el.querySelectorAll<HTMLElement>("[data-beat]").forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  const at = (i: number) =>
    reached > i ? "done" : reached === i ? "now" : "ahead";

  return (
    <div
      ref={root}
      className={`day ${approved ? "is-approved" : ""}`}
    >
      <span className="day-rail" aria-hidden />

      <Beat index={1} state={at(1)} time="07:10" title="The world is read." />

      <Beat
        index={2}
        state={at(2)}
        time="10:30"
        title="The decision is prepared."
      />

      <Beat
        index={3}
        state={at(3)}
        time="18:45"
        you
        title="You approve one batch."
      >
        {/* The one physical object on this screen: the prepared work, and
            the boundary it stops at. */}
        <div className="approve">
          <p className="approve-payload">
            14 items, prepared and logged. Nothing has run.
          </p>
          <ApproveButton onApprove={() => setApproved(true)} doneLabel="Released" />
          <p className="mono approve-note" aria-live="polite">
            {approved
              ? "18:46 · RELEASED BY YOU · LOGGED"
              : "18:45 · STAGED BY THE SYSTEM"}
          </p>
        </div>
      </Beat>

      <Beat
        index={4}
        state={at(4)}
        time="19:00"
        title="Your evening is still yours."
      />

      <p className="mono day-label">
        A day, demonstrated on fictional data. The rhythm is real.
      </p>
    </div>
  );
}
