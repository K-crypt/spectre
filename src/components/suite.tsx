"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ── The suite ────────────────────────────────────────────────────────────
   One house, five specialist systems, one shared context, one human
   authority model — as a single stage rather than five cards.

   The previous version put five information-dense panels side by side, so
   the reader had to compare twenty facts to understand one idea. Here only
   one system is ever speaking: a rail of five indices, one large stage, one
   outcome in six to twelve words, one operating diagram, three signals, one
   status, one link. The other four never disappear — the argument is that
   they share a context, and hiding them would say the opposite.

   Each specialist has one motion signature, and each is an abstract
   operating diagram rather than an illustration: what the system does,
   drawn. Gold marks the intelligence working. The prepared decision stops
   at an oxblood line, which is where the person is.
   ───────────────────────────────────────────────────────────────────────── */

type System = {
  slug: string;
  index: string;
  name: string;
  outcome: string;
  status: string;
  signals: [string, string][];
};

const SYSTEMS: System[] = [
  {
    slug: "pa",
    index: "01",
    name: "AI PA",
    outcome: "Your world, remembered.",
    status: "Running",
    signals: [
      ["41", "read"],
      ["3", "for you"],
      ["2", "staged"],
    ],
  },
  {
    slug: "coo",
    index: "02",
    name: "AI COO",
    outcome: "Test the commitment before making it.",
    status: "Pilot",
    signals: [
      ["120k", "units"],
      ["Line 2", "constraint"],
      ["Conditional", "verdict"],
    ],
  },
  {
    slug: "cmo",
    index: "03",
    name: "AI CMO",
    outcome: "Your brand, carried through every move.",
    status: "Running",
    signals: [
      ["+12%", "saves"],
      ["12", "drafts"],
      ["Ready", "campaign"],
    ],
  },
  {
    slug: "researcher",
    index: "04",
    name: "AI Researcher",
    outcome: "Every claim challenged and sourced.",
    status: "Method proven",
    signals: [
      ["47", "sources"],
      ["18", "re-checked"],
      ["3", "open"],
    ],
  },
  {
    slug: "hr",
    index: "05",
    name: "AI HR",
    outcome: "Every people decision made with memory.",
    status: "Design partner",
    signals: [
      ["+40%", "overtime"],
      ["−9%", "to band"],
      ["Before Fri", "window"],
    ],
  },
];

/* ── The field ────────────────────────────────────────────────────────────
   One intelligence, changing specialist form.

   The five drawings used to be five drawings. They are now one field with
   five configurations: the same frame, the same substrate of faint context
   beneath it, the same gold point where intelligence resolves, and the same
   oxblood boundary at the same x — fixed, in every specialist, because that
   is the one thing about this system that never moves.

   What changes is the structure on the left: which fragments exist and how
   they connect. Switching specialist does not cross-fade two pictures; the
   boundary and the resolving point stay exactly where they were while the
   context reorganises around them, and the configuration you left behind
   remains for a fifth of a second as an echo before it goes.
   ───────────────────────────────────────────────────────────────────────── */

/* The frame every configuration shares. */
const NODE_X = 238;
const NODE_Y = 100;
const EDGE_X = 272;

/* The substrate: context that is always there and almost never visible. It
   lifts a little while the system is preparing and settles back after. */
function Substrate() {
  const pts: [number, number][] = [];
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 11; c++) {
      pts.push([14 + c * 21, 18 + r * 28]);
    }
  }
  return (
    <g className="d-substrate">
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.8" style={{ animationDelay: `${(i % 13) * 40}ms` }} />
      ))}
    </g>
  );
}

/* The two marks that never move. */
function Frame() {
  return (
    <g className="d-frame">
      <circle className="d-node d-node-gold" cx={NODE_X} cy={NODE_Y} r="4" />
      <path className="d-stop" d={`M${EDGE_X} 58 L${EDGE_X} 142`} />
      <circle className="d-node d-node-ox" cx={EDGE_X} cy={NODE_Y} r="3.5" />
    </g>
  );
}

/* The structure of the reasoning, per specialist. Everything here resolves
   toward NODE_X/NODE_Y; nothing crosses the boundary. */
function Structure({ slug }: { slug: string }) {
  if (slug === "pa") {
    /* Threads of context converging on one point. */
    return (
      <g>
        {[26, 58, 90, 122, 154, 186].map((y, i) => (
          <path
            key={y}
            className="d-line"
            style={{ animationDelay: `${i * 80}ms` }}
            d={`M10 ${y} C 108 ${y}, 150 ${NODE_Y + (y - NODE_Y) * 0.16}, ${NODE_X} ${NODE_Y}`}
          />
        ))}
      </g>
    );
  }

  if (slug === "coo") {
    /* Capacity resolving around a constraint, then feeding the point. */
    return (
      <g>
        {Array.from({ length: 21 }, (_, i) => {
          const col = i % 7;
          const row = Math.floor(i / 7);
          const blocked = i === 9 || i === 10 || i === 16;
          return (
            <rect
              key={i}
              className={`d-block ${blocked ? "is-constraint" : ""}`}
              style={{ animationDelay: `${i * 24}ms` }}
              x={12 + col * 25}
              y={44 + row * 34}
              width={19}
              height={25}
              rx={1}
            />
          );
        })}
        <path className="d-line" style={{ animationDelay: "520ms" }} d={`M190 100 L${NODE_X} ${NODE_Y}`} />
      </g>
    );
  }

  if (slug === "cmo") {
    /* Scattered signals gathering into one prepared campaign. */
    return (
      <g>
        {[
          [22, 44], [50, 96], [28, 148], [74, 30], [88, 128], [62, 168],
          [110, 64], [124, 112], [100, 92],
        ].map(([x, y], i) => (
          <circle
            key={i}
            className="d-dot"
            style={{ animationDelay: `${i * 64}ms` }}
            cx={x}
            cy={y}
            r="2.6"
          />
        ))}
        <rect className="d-plate" x="152" y="76" width="46" height="48" rx="2" />
        <path className="d-sweep" style={{ animationDelay: "700ms" }} d={`M198 100 L${NODE_X} ${NODE_Y}`} />
      </g>
    );
  }

  if (slug === "researcher") {
    /* Claims connecting to the sources that verify them. */
    return (
      <g>
        {[54, 100, 146].map((y, i) => (
          <g key={y}>
            <rect
              className="d-claim"
              style={{ animationDelay: `${i * 120}ms` }}
              x="14"
              y={y - 11}
              width="56"
              height="22"
              rx="1"
            />
            <path
              className="d-link"
              style={{ animationDelay: `${i * 120 + 150}ms` }}
              d={`M70 ${y} C 130 ${y}, 170 ${NODE_Y}, ${NODE_X} ${NODE_Y}`}
            />
          </g>
        ))}
      </g>
    );
  }

  /* HR — role and history resolving into one decision brief. */
  return (
    <g>
      {[[46, 74], [82, 52], [118, 88], [154, 38]].map(([y, w], i) => (
        <rect
          key={y}
          className="d-bar"
          style={{ animationDelay: `${i * 100}ms` }}
          x={16}
          y={y - 6}
          width={w}
          height={12}
          rx={1}
        />
      ))}
      <rect className="d-brief" x="150" y="66" width="44" height="68" rx="2" />
      <path className="d-brief-line" style={{ animationDelay: "560ms" }} d={`M194 100 L${NODE_X} ${NODE_Y}`} />
    </g>
  );
}

function Field({ slug, echo }: { slug: string; echo: string | null }) {
  return (
    <svg
      viewBox="0 0 320 200"
      className="sys-diagram"
      aria-hidden
      fill="none"
    >
      <Substrate />
      {/* What you were looking at, on its way out. */}
      {echo && echo !== slug && (
        <g className="d-echo" key={`echo-${echo}`}>
          <Structure slug={echo} />
        </g>
      )}
      <g className="d-structure" key={slug}>
        <Structure slug={slug} />
      </g>
      <Frame />
    </svg>
  );
}

export function Suite() {
  const [active, setActive] = useState(0);
  /* The configuration you just left, kept for a fifth of a second so the
     change reads as one field reorganising rather than two pictures
     swapping. */
  const [echo, setEcho] = useState<string | null>(null);
  const echoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const sys = SYSTEMS[active];

  useEffect(
    () => () => {
      if (echoTimer.current) clearTimeout(echoTimer.current);
    },
    [],
  );

  const select = (next: number) => {
    if (next === active) return;
    setEcho(SYSTEMS[active].slug);
    if (echoTimer.current) clearTimeout(echoTimer.current);
    echoTimer.current = setTimeout(() => setEcho(null), 240);
    setActive(next);
  };

  /* Arrow keys move along the rail once it has focus, the way a set of
     instrument presets would. */
  const onKey = (e: React.KeyboardEvent) => {
    const back = e.key === "ArrowUp" || e.key === "ArrowLeft";
    const fwd = e.key === "ArrowDown" || e.key === "ArrowRight";
    if (!back && !fwd) return;
    e.preventDefault();
    const next = (active + (fwd ? 1 : -1) + SYSTEMS.length) % SYSTEMS.length;
    select(next);
    railRef.current
      ?.querySelectorAll<HTMLButtonElement>("button")
      [next]?.focus();
  };

  return (
    <div className="suite">
      <div
        className="suite-rail"
        role="tablist"
        aria-label="The five systems"
        ref={railRef}
        onKeyDown={onKey}
      >
        {SYSTEMS.map((s, i) => (
          <button
            key={s.slug}
            type="button"
            role="tab"
            id={`sys-tab-${s.slug}`}
            aria-selected={i === active}
            aria-controls="sys-stage"
            tabIndex={i === active ? 0 : -1}
            className={`suite-tab ${i === active ? "is-active" : ""}`}
            onClick={() => select(i)}
          >
            <span className="mono suite-tab-index">{s.index}</span>
            <span className="suite-tab-name">{s.name}</span>
          </button>
        ))}
      </div>

      <div
        className="suite-stage"
        id="sys-stage"
        role="tabpanel"
        aria-labelledby={`sys-tab-${sys.slug}`}
      >
        {/* Keyed on the system so the whole stage resolves into place rather
            than mutating field by field. */}
        <div className="suite-scene" key={sys.slug}>
          {/* The index, cut into the face of the instrument. It gives the
              plane scale and tells you where you are in the five without
              adding another line of type to read. */}
          <span className="suite-plate-index" aria-hidden>
            {sys.index}
          </span>
          <p className="mono suite-status">
            <span className="suite-status-dot" aria-hidden />
            {sys.status}
          </p>
          <h3 className="display suite-outcome">{sys.outcome}</h3>

          <div className="suite-visual">
            <Field slug={sys.slug} echo={echo} />
          </div>

          <dl className="suite-signals">
            {sys.signals.map(([v, l]) => (
              <div key={l}>
                <dt className="mono">{v}</dt>
                <dd className="mono">{l}</dd>
              </div>
            ))}
          </dl>

          <Link className="mono suite-link" href={`/${sys.slug}/`}>
            {sys.name} in detail <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
