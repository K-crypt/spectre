/* The hero atmosphere — a spectre in the mist, rendered in the house language:
   layered 1px ridgelines in ghost tones + two slow fog drifts (ambient-sheen
   register, gloss amendment). Pure SVG/CSS, zero image weight, both themes.
   Motion dies under prefers-reduced-motion (globals.css). */

export function Mist() {
  return (
    <div className="mist" aria-hidden>
      <div className="mist-fog mist-fog-a" />
      <div className="mist-fog mist-fog-b" />
      <svg
        className="mist-ridges"
        viewBox="0 0 1440 360"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        {/* far ridge */}
        <path
          opacity="0.09"
          d="M0 208 L96 176 L168 196 L262 148 L340 178 L452 128 L548 168 L660 138 L764 186 L872 150 L986 190 L1102 142 L1208 178 L1310 156 L1440 196"
        />
        {/* mid ridge */}
        <path
          opacity="0.13"
          d="M0 258 L88 232 L196 252 L308 204 L404 240 L512 198 L628 244 L744 210 L848 252 L964 214 L1084 256 L1196 222 L1312 252 L1440 230"
        />
        {/* near ridge */}
        <path
          opacity="0.18"
          d="M0 312 L112 288 L228 306 L352 268 L472 300 L596 262 L716 302 L840 274 L968 308 L1096 276 L1224 306 L1348 284 L1440 300"
        />
        {/* valley floor hairline */}
        <path opacity="0.22" d="M0 348 H1440" />
      </svg>
      <div className="mist-scrim" />
    </div>
  );
}
