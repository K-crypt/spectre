"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CTA, useScrollProgress } from "@/components/ui";
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

      <div className="hero-block">
        <p className="hero-kicker">Private operating intelligence</p>
        <h1 id="hero-title" className="display hero-headline">
          Automate what can be.
          <br />
          Focus on what can&rsquo;t.
        </h1>
        <p className="hero-claim display">They prepare. You decide.</p>
      </div>

      <div className="hero-foot">
        <p className="hero-note">
          Spectre learns how your company works, connects the context across
          it, and prepares the decisions that follow.
        </p>
        <div className="hero-actions">
          <a href="#room" className="btn btn-hard">
            Meet the table
          </a>
          <a href="#access" className="btn btn-soft">
            {CTA}
          </a>
        </div>
      </div>
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
