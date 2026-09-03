"use client";

import Link from "next/link";
import { useRef, useState } from "react";

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

/* ── The operating diagrams ───────────────────────────────────────────────
   Five drawings of five different kinds of work. They are deliberately the
   same size, the same weight and the same palette, because they belong to
   one system; what changes is the shape of the reasoning.

   All motion is a one-shot on arrival — nothing here loops. The diagram
   plays once when its system becomes active, then holds its resolved state,
   which is also the state a reduced-motion visitor sees immediately.
   ───────────────────────────────────────────────────────────────────────── */
function Diagram({ slug }: { slug: string }) {
  const common = {
    viewBox: "0 0 320 200",
    className: "sys-diagram",
    "aria-hidden": true as const,
    fill: "none" as const,
  };

  if (slug === "pa") {
    /* Threads of context quietly converging on one point. */
    return (
      <svg {...common}>
        {[26, 58, 90, 122, 154, 186].map((y, i) => (
          <path
            key={y}
            className="d-line"
            style={{ animationDelay: `${i * 90}ms` }}
            d={`M8 ${y} C 110 ${y}, 150 ${100 + (y - 100) * 0.18}, 232 100`}
          />
        ))}
        <circle className="d-node d-node-gold" cx="232" cy="100" r="4" />
        <path className="d-stop" d="M262 66 L262 134" />
        <circle className="d-node d-node-ox" cx="262" cy="100" r="3.5" />
      </svg>
    );
  }

  if (slug === "coo") {
    /* Capacity blocks resolving around one constraint. */
    return (
      <svg {...common}>
        {Array.from({ length: 24 }, (_, i) => {
          const col = i % 8;
          const row = Math.floor(i / 8);
          const blocked = i === 10 || i === 11 || i === 18;
          return (
            <rect
              key={i}
              className={`d-block ${blocked ? "is-constraint" : ""}`}
              style={{ animationDelay: `${i * 26}ms` }}
              x={12 + col * 26}
              y={40 + row * 34}
              width={20}
              height={26}
              rx={1}
            />
          );
        })}
        <path className="d-stop" d="M262 46 L262 154" />
        <circle className="d-node d-node-ox" cx="262" cy="100" r="3.5" />
      </svg>
    );
  }

  if (slug === "cmo") {
    /* Scattered audience signals gathering into one prepared campaign. */
    return (
      <svg {...common}>
        {[
          [24, 42], [52, 96], [30, 150], [78, 30], [92, 128], [66, 168],
          [116, 62], [130, 112], [104, 92],
        ].map(([x, y], i) => (
          <circle
            key={i}
            className="d-dot"
            style={{ animationDelay: `${i * 70}ms` }}
            cx={x}
            cy={y}
            r="2.5"
          />
        ))}
        <path className="d-sweep" d="M150 100 L226 100" />
        <rect className="d-plate" x="188" y="76" width="44" height="48" rx="2" />
        <path className="d-stop" d="M262 66 L262 134" />
        <circle className="d-node d-node-ox" cx="262" cy="100" r="3.5" />
      </svg>
    );
  }

  if (slug === "researcher") {
    /* Claims connecting to the sources that verify them. */
    return (
      <svg {...common}>
        {[54, 100, 146].map((y, i) => (
          <g key={y}>
            <rect
              className="d-claim"
              style={{ animationDelay: `${i * 130}ms` }}
              x="14"
              y={y - 11}
              width="58"
              height="22"
              rx="1"
            />
            <path
              className="d-link"
              style={{ animationDelay: `${i * 130 + 160}ms` }}
              d={`M72 ${y} C 118 ${y}, 132 ${y === 100 ? y : 100}, 178 100`}
            />
          </g>
        ))}
        <circle className="d-node d-node-gold" cx="178" cy="100" r="4" />
        <path className="d-stop" d="M262 66 L262 134" />
        <circle className="d-node d-node-ox" cx="262" cy="100" r="3.5" />
      </svg>
    );
  }

  /* HR — role and history signals resolving into one decision brief. */
  return (
    <svg {...common}>
      {[
        [18, 46, 78], [18, 82, 54], [18, 118, 92], [18, 154, 40],
      ].map(([x, y, w], i) => (
        <rect
          key={y}
          className="d-bar"
          style={{ animationDelay: `${i * 110}ms`, ["--w" as string]: `${w}` }}
          x={x}
          y={y - 6}
          width={w}
          height={12}
          rx={1}
        />
      ))}
      <path className="d-brief-line" d="M132 100 L186 100" />
      <rect className="d-brief" x="186" y="64" width="46" height="72" rx="2" />
      <path className="d-stop" d="M262 66 L262 134" />
      <circle className="d-node d-node-ox" cx="262" cy="100" r="3.5" />
    </svg>
  );
}

export function Suite() {
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const sys = SYSTEMS[active];

  /* Arrow keys move along the rail once it has focus, the way a set of
     instrument presets would. */
  const onKey = (e: React.KeyboardEvent) => {
    const back = e.key === "ArrowUp" || e.key === "ArrowLeft";
    const fwd = e.key === "ArrowDown" || e.key === "ArrowRight";
    if (!back && !fwd) return;
    e.preventDefault();
    const next = (active + (fwd ? 1 : -1) + SYSTEMS.length) % SYSTEMS.length;
    setActive(next);
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
            onClick={() => setActive(i)}
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
            <Diagram slug={sys.slug} />
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
