"use client";

import { useEffect, useRef, useState } from "react";

/* A figure that counts up once, when the reader reaches it.

   Lifted unchanged from the previous shell because the approval queue
   depends on it and its behaviour was already right: it only ever climbs,
   the final frame is set from the target rather than from the easing so it
   lands exactly on the number, and under reduced motion it renders the
   finished figure and never moves. */
export function Counter({
  to,
  prefix = "",
  duration = 900,
}: {
  to: number;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    let raf = 0;

    /* The count is driven entirely by the frame loop. The previous version
       zeroed the value up front and then waited for the observer, which
       meant that if the observer never delivered (a browser that suppresses
       it, a tab that never rendered) the page sat there reading "About 0".
       Nothing sets zero any more: the first frame writes the first value,
       so the figure is either counting or showing the real number. */
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        if (t >= 1) {
          setValue(to);
          raf = 0;
          return;
        }
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.min(to, Math.ceil(to * eased)));
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    /* Already on screen at mount: count now rather than waiting for a
       crossing that has already happened. */
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) {
      run();
      return () => {
        if (raf) cancelAnimationFrame(raf);
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(el);
          run();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="count">
      {prefix}
      {value.toLocaleString("en-US")}
    </span>
  );
}
