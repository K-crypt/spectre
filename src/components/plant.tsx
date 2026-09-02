"use client";

import { useEffect, useRef, useState } from "react";

/* ── The live operating picture ───────────────────────────────────────────
   A compact version of the AI COO playground's plant grid, set beside the
   proof headline. Forty cells on a hairline grid, each one a machine, each
   cycling through the same lifecycle the playground uses: running, a short
   changeover, a rare jam, recovery. The counts underneath are derived from
   the cells rather than written down, so the readout is never lying about
   what it is showing.

   It moves only while it is actually on screen, and not at all under
   prefers-reduced-motion — where it renders its final state and stops. That
   is the compromise with DESIGN.md's rule against ambient loops: this is a
   live readout making the section's argument, not decoration, but it still
   must not run in a background tab or against a visitor who asked for calm.

   Fictional data, deterministic from a seed. No client's plant is shown.
   ───────────────────────────────────────────────────────────────────────── */

const COLS = 10;
const ROWS = 4;
const CELLS = COLS * ROWS;

type State = "running" | "idle" | "blocked";

/* A small, well-mixed integer hash. The first version keyed straight off the
   cell index and produced almost no spread across forty cells, so every
   machine seeded to the same state and the grid rendered as one flat block. */
function hash(n: number, salt: number) {
  let h = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h ^ salt, 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function seed(i: number): State {
  const r = hash(i, 7);
  return r < 0.84 ? "running" : r < 0.96 ? "idle" : "blocked";
}

function next(from: State, r: number): State {
  if (from === "running") return r < 0.72 ? "running" : r < 0.96 ? "idle" : "blocked";
  if (from === "idle") return r < 0.88 ? "running" : "blocked";
  return "idle"; /* a jam always recovers through a changeover */
}

export function PlantGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [cells, setCells] = useState<State[]>(() =>
    Array.from({ length: CELLS }, (_, i) => seed(i)),
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setInterval> | undefined;
    let tick = 0;

    const start = () => {
      if (timer) return;
      timer = setInterval(() => {
        tick += 1;
        setCells((prev) => {
          const out = prev.slice();
          /* Two cells move per beat. A whole grid changing at once reads as
             noise; two reads as a plant running. */
          for (let k = 0; k < 2; k++) {
            const i = Math.floor(hash(tick * 31 + k, 11) * CELLS);
            out[i] = next(out[i], hash(tick * 17 + k, 23));
          }
          return out;
        });
      }, 900);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.15 },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", () =>
      document.hidden ? stop() : undefined,
    );
    return () => {
      io.disconnect();
      stop();
    };
  }, []);

  const running = cells.filter((c) => c === "running").length;
  const blocked = cells.filter((c) => c === "blocked").length;

  return (
    <div className="plant" ref={ref}>
      <div className="plant-head mono">
        <span>LIVE OPERATING PICTURE</span>
        <span>PILOT / 01</span>
      </div>

      <div
        className="plant-grid"
        role="img"
        aria-label={`A plant of forty machines: ${running} running, ${blocked} blocked, the rest in changeover.`}
      >
        {cells.map((state, i) => (
          <span key={i} className={`cell is-${state}`} />
        ))}
      </div>

      <dl className="plant-readout">
        <div>
          <dt className="mono">RUNNING</dt>
          <dd className="mono">{running}</dd>
        </div>
        <div>
          <dt className="mono">CHANGEOVER</dt>
          <dd className="mono">{CELLS - running - blocked}</dd>
        </div>
        <div>
          <dt className="mono">BLOCKED</dt>
          <dd className="mono">{blocked}</dd>
        </div>
      </dl>

      <p className="plant-note mono">
        FICTIONAL PLANT · THE BOTTLENECK SHOWS UP WHILE IT IS STILL CHEAP TO FIX
      </p>
    </div>
  );
}
