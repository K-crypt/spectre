"use client";

import { useEffect } from "react";

/* ── THE GOLD ──────────────────────────────────────────────────────────────
   A warm light that travels with the pointer and takes a moment to catch up,
   so it reads as a reflection moving across a surface rather than a dot
   glued to the cursor.

   Three followers, not one. Each lerps toward the pointer at a different
   rate, so the light has a leading core and a slower body trailing behind
   it. That lag is the whole difference between "premium" and "2015 glow":
   a cursor-attached circle looks like a widget, and something that has to
   catch up looks like it has mass.

   Cost control matters here, because this is the one thing on the site that
   runs while the reader is doing nothing:

   - The loop starts on the first pointer move and **stops itself** once all
     three followers have converged on the pointer. A still mouse costs
     nothing.
   - Three custom properties per frame, and CSS does the drawing. No layout,
     no paint outside the composited layer.
   - Off entirely for coarse pointers and for reduced motion.

   DESIGN.md §1 says gold is a state and not a decoration. This is a
   deliberate exception on the owner's call, made three times, and it is
   recorded as one in §9b rather than pretended away.
   ───────────────────────────────────────────────────────────────────────── */

/* Lead, body, and the slow tail behind it. */
const FOLLOW = [0.22, 0.12, 0.07];

export function Pointer() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const root = document.documentElement;
    const pts = FOLLOW.map(() => ({ x: -1, y: -1 }));
    let tx = -1;
    let ty = -1;
    let raf = 0;
    let seeded = false;

    const frame = () => {
      let moving = false;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const dx = tx - p.x;
        const dy = ty - p.y;
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) moving = true;
        p.x += dx * FOLLOW[i];
        p.y += dy * FOLLOW[i];
        root.style.setProperty(`--gx${i}`, `${p.x.toFixed(1)}px`);
        root.style.setProperty(`--gy${i}`, `${p.y.toFixed(1)}px`);
      }
      /* The foil on the maroon rules reads its highlight position from the
         same light, so the two are one effect rather than two. */
      root.style.setProperty(
        "--mx",
        ((pts[1].x / window.innerWidth) * 2 - 1).toFixed(3),
      );
      /* Stops itself once the light has caught up. */
      raf = moving ? requestAnimationFrame(frame) : 0;
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!seeded) {
        /* First sighting: place the light under the pointer rather than
           flying it in from the corner. */
        seeded = true;
        for (const p of pts) {
          p.x = tx;
          p.y = ty;
        }
        root.dataset.gold = "on";
      }
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onLeave = () => {
      delete root.dataset.gold;
      seeded = false;
    };
    const onEnter = () => {
      if (seeded) root.dataset.gold = "on";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      if (raf) cancelAnimationFrame(raf);
      delete root.dataset.gold;
      for (let i = 0; i < FOLLOW.length; i++) {
        root.style.removeProperty(`--gx${i}`);
        root.style.removeProperty(`--gy${i}`);
      }
      root.style.removeProperty("--mx");
    };
  }, []);

  return <div className="gold-light" aria-hidden />;
}
