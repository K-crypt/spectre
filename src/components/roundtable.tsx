/* The round table — "assistants to the suite, not the suite."
   Schematic register (DESIGN.md §6): hairline table, five accent seats,
   one visibly senior ink head-seat. Proposal lines travel INWARD to the
   head seat; a single approve pulse; one ink line leaves the table.
   Animation is CSS keyed off the surrounding .reveal.in (globals.css);
   static under prefers-reduced-motion. Server component — no hooks. */

const SEATS = [
  { label: "AI PA", accent: "var(--spectral)", x: 260, y: 64 },
  { label: "AI COO", accent: "var(--steel)", x: 452, y: 118 },
  { label: "AI CMO", accent: "var(--clay)", x: 452, y: 246 },
  { label: "RESEARCHER", accent: "var(--archive)", x: 68, y: 246 },
  { label: "AI HR", accent: "var(--ochre)", x: 68, y: 118 },
];

const HEAD = { x: 260, y: 330 };

export function RoundTable() {
  return (
    <svg
      className="rt"
      viewBox="0 0 520 430"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      role="img"
      aria-label="Five AI specialists seated around a boardroom table; the head seat is yours. Proposals travel to the head seat and nothing leaves without approval."
    >
      {/* the table */}
      <ellipse cx="260" cy="192" rx="168" ry="96" style={{ stroke: "var(--hairline-strong, var(--ghost))", opacity: 0.5 }} />
      <ellipse cx="260" cy="192" rx="168" ry="96" style={{ stroke: "var(--ghost)", opacity: 0.15 }} transform="translate(0 6)" />

      {/* proposal lines: each seat → head seat (drawn in, staggered) */}
      {SEATS.map((s, i) => (
        <path
          key={`p-${s.label}`}
          className="rt-proposal"
          style={{ stroke: s.accent, animationDelay: `${0.5 + i * 0.35}s` }}
          pathLength={1}
          d={`M${s.x} ${s.y + 14} Q 260 ${192 + (s.y < 192 ? 30 : 60)} ${HEAD.x} ${HEAD.y - 26}`}
        />
      ))}

      {/* the five seats */}
      {SEATS.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy={s.y} r="9" style={{ stroke: s.accent }} />
          <circle cx={s.x} cy={s.y} r="3" style={{ fill: s.accent, stroke: "none" }} />
          <text
            x={s.x}
            y={s.y - 18}
            textAnchor="middle"
            className="rt-label"
            style={{ fill: "var(--ghost)", stroke: "none" }}
          >
            {s.label}
          </text>
        </g>
      ))}

      {/* the head seat — senior, ink */}
      <g className="rt-head">
        <rect x={HEAD.x - 26} y={HEAD.y - 20} width="52" height="40" rx="8" style={{ stroke: "var(--ink)", strokeWidth: 1.5 }} />
        <text x={HEAD.x} y={HEAD.y + 5} textAnchor="middle" className="rt-label rt-you" style={{ fill: "var(--ink)", stroke: "none" }}>
          YOU
        </text>
        {/* approve pulse */}
        <circle className="rt-pulse" cx={HEAD.x} cy={HEAD.y} r="26" style={{ stroke: "var(--ink)" }} />
      </g>

      {/* the only line that leaves the table */}
      <path
        className="rt-out"
        pathLength={1}
        d={`M${HEAD.x} ${HEAD.y + 20} V 408`}
        style={{ stroke: "var(--ink)" }}
      />
      <text x={HEAD.x + 10} y={402} className="rt-label" style={{ fill: "var(--ghost)", stroke: "none" }}>
        the only line that leaves
      </text>
    </svg>
  );
}
