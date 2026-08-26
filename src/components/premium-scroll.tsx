"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* Revelatio-style inertia without taking over touch, keyboard, or nested panels. */
export function PremiumScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: false,
      prevent: (node) => {
        const style = window.getComputedStyle(node);
        return /(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 2;
      },
    });

    let frame = 0;
    const animate = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
