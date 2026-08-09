/* Hero atmosphere. The homepage now begins inside the same mountain world as
   the interactive table below, so the table can emerge naturally on scroll. */

export function HeroPhoto() {
  return (
    <div className="hero-photo" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-table-camera"
        src="/mountain-table-seated.webp"
        sizes="100vw"
        alt=""
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero-photo-scrim" />
    </div>
  );
}

/* The v2 generative mist — layered 1px ridgelines + fog drifts. */

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

/* RidgeEcho — the hero's ridgeline motif alone (no photo, no fog), for quiet
   section backdrops. Ties the page back to the hero's world. */
export function RidgeEcho() {
  return (
    <svg
      className="ridge-echo"
      viewBox="0 0 1440 200"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
    >
      <path opacity="0.5" d="M0 118 L96 86 L168 106 L262 58 L340 88 L452 38 L548 78 L660 48 L764 96 L872 60 L986 100 L1102 52 L1208 88 L1310 66 L1440 106" />
      <path opacity="0.8" d="M0 168 L88 142 L196 162 L308 114 L404 150 L512 108 L628 154 L744 120 L848 162 L964 124 L1084 166 L1196 132 L1312 162 L1440 140" />
    </svg>
  );
}
