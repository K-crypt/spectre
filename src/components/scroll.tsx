"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* ── One scroll engine ────────────────────────────────────────────────────
   Lenis is the single source of truth for every scroll on the site,
   programmatic ones included. The previous build ran four systems at once
   (native, `scroll-behavior: smooth`, Lenis, and an unimported
   premium-scroll module); they fought each other, anchors overshot their own
   headings, and `scrollIntoView` did nothing at all.

   Weight, not speed: a slightly tighter duration than before, a wheel
   multiplier under 1 so the page has mass, and a touch multiplier over 1
   because fingers expect the page to keep up.

   Disabled entirely under `prefers-reduced-motion` and on coarse pointers,
   where the platform's own momentum beats anything synthesised.
   ───────────────────────────────────────────────────────────────────────── */

const NAV_CONDENSED = 56;

declare global {
  interface Window {
    __lenis?: Lenis;
    spectreScrollTo?: (target: string | HTMLElement) => void;
  }
}

function nativeScrollTo(el: HTMLElement) {
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_CONDENSED - 8;
  window.scrollTo({ top, behavior: "auto" });
}

export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let lenis: Lenis | undefined;
    let frame = 0;

    if (!reduced && !coarse) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.4,
      });
      window.__lenis = lenis;
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }

    /* Every programmatic scroll on the site goes through this. */
    const scrollTo = (target: string | HTMLElement) => {
      const el =
        typeof target === "string"
          ? (document.querySelector(target) as HTMLElement | null)
          : target;
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { offset: -NAV_CONDENSED - 8 });
      else nativeScrollTo(el);
    };
    window.spectreScrollTo = scrollTo;

    /* Intercept in-page anchors globally so no link can fall back to a
       native jump that Lenis would then fight or swallow. */
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      const hash = href.startsWith("#")
        ? href
        : href.startsWith("/#")
          ? href.slice(1)
          : null;
      if (!hash || hash === "#") return;

      const el = document.querySelector(hash) as HTMLElement | null;
      if (!el) return; // a cross-page hash — let the router handle it

      event.preventDefault();
      scrollTo(el);
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    /* A reload starts at the top. Browsers restore the previous scroll
       position by default, which drops a returning visitor into the middle
       of a chapter with no idea where they are. */
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!window.location.hash) window.scrollTo(0, 0);

    /* Honour an incoming hash on arrival, once layout has settled. */
    if (window.location.hash) {
      const target = window.location.hash;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const el = document.querySelector(target) as HTMLElement | null;
          if (el) scrollTo(el);
        }),
      );
    }

    return () => {
      document.removeEventListener("click", onClick);
      if (frame) cancelAnimationFrame(frame);
      lenis?.destroy();
      delete window.__lenis;
      delete window.spectreScrollTo;
    };
  }, []);

  return null;
}

/* Nested scrollers must not fight the page. */
export function lockScroll(locked: boolean) {
  if (typeof window === "undefined") return;
  if (locked) window.__lenis?.stop();
  else window.__lenis?.start();
}
