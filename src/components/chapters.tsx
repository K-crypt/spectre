"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScrollProgress } from "@/components/ui";
import { withBasePath } from "@/lib/base-path";

/* ── The opening ──────────────────────────────────────────────────────────
   One held photograph and one statement, set in the quiet fog at the top of
   the frame so the lit ridge below it stays unobstructed. Everything else on
   the screen is small and wide-tracked.

   An earlier version split the promise to the two far edges of the frame.
   It was a striking gesture and the wrong one here: it read as decoration
   rather than as a sentence, and it straddled the busiest part of the
   picture.

   No dissolve, no scroll-jacking, no camera move — an earlier build had the
   mountains cross-fade into the boardroom as you scrolled and it read as a
   screensaver. The only motion is a slow parallax drift as you leave, so the
   page has weight rather than so it can be noticed.
   ───────────────────────────────────────────────────────────────────────── */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref, "leave");

  return (
    <section ref={ref} className="section island on-dark hero" aria-labelledby="hero-title">
      <div className="hero-art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBasePath("/ridge-1920.webp")}
          srcSet={`${withBasePath("/ridge-1280.webp")} 1280w, ${withBasePath("/ridge-1920.webp")} 1920w, ${withBasePath("/ridge-2560.webp")} 2560w`}
          sizes="100vw"
          width={1920}
          height={823}
          fetchPriority="high"
          decoding="async"
          alt="Layered mountain ridgelines receding into fog at first light"
        />
      </div>
      <div className="hero-scrim" />

      {/* Something is already reading the landscape. Four points in the
          mist, one connection drawn between them, and it is gone before it
          becomes a graphic — about two seconds, once, and never again. It
          should be easy to miss and hard to un-notice. */}
      <svg
        className="hero-trace"
        viewBox="0 0 1440 820"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
        fill="none"
      >
        <path className="ht-link" d="M262 512 L548 430 L906 468 L1214 372" />
        {[
          [262, 512],
          [548, 430],
          [906, 468],
          [1214, 372],
        ].map(([x, y], i) => (
          <circle
            key={i}
            className="ht-point"
            cx={x}
            cy={y}
            r="2.5"
            style={{ animationDelay: `${1900 + i * 190}ms` }}
          />
        ))}
      </svg>

      {/* One statement, one supporting line, one cue. The kicker, the note
          and the second control are gone — three of the five things on this
          screen were saying versions of the same thing. */}
      <div className="hero-block">
        <h1 id="hero-title" className="display hero-headline">
          <span className="hero-line"><span>Automate what can be.</span></span>
          <span className="hero-line"><span>Focus on what can&rsquo;t.</span></span>
        </h1>
        <p className="hero-support">
          Five executive systems prepare the work. You decide what moves.
        </p>
      </div>

      <a className="hero-cue" href="#room" aria-label="Continue">
        <span className="mono">The suite</span>
        <span className="hero-cue-rule" aria-hidden />
      </a>
    </section>
  );
}


/* The crossing lights when it arrives: the second half of the thesis — the
   half that belongs to the reader — settles in as the light comes up. */
export function Dawn({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [lit, setLit] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(true);
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setLit(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLit(true);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      className={`section dawn ${lit ? "is-lit" : ""}`}
      aria-label="The operating rule"
    >
      {children}
    </section>
  );
}

/* One Tuesday, on velvet.
   The desk photograph that used to sit here was fighting its own content:
   pushed dark enough for the copy to read, it went muddy, and it repeated
   imagery the page had already spent. The ground is now a dark velvet with a
   single warm light in it, thrown from where the approval moment sits — so
   the glow is motivated by the scene rather than applied to it. It is drawn
   in CSS, costs nothing, and never moves. */
export function TuesdayGround({ children }: { children: ReactNode }) {
  return (
    <section className="section island on-dark tuesday" id="day">
      <div className="tuesday-velvet" aria-hidden />
      <div className="wrap">{children}</div>
    </section>
  );
}
