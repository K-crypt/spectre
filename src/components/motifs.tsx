/* The five product motifs — 1px schematic line-textures, drawn in currentColor.
   Usage: <Motif kind="pa" size={120} style={{ color: "var(--spectral)", opacity: .2 }} /> */

import type { CSSProperties, ReactElement } from "react";

const paths: Record<string, ReactElement> = {
  pa: (
    <>
      <circle cx="20" cy="30" r="3" />
      <circle cx="55" cy="15" r="3" />
      <circle cx="70" cy="50" r="3" />
      <circle cx="35" cy="65" r="3" />
      <path d="M20 30 Q40 10 55 15 M55 15 Q70 30 70 50 M70 50 Q50 65 35 65 M35 65 Q20 50 20 30" />
    </>
  ),
  coo: (
    <>
      <rect x="12" y="12" width="22" height="16" />
      <rect x="52" y="12" width="26" height="16" />
      <rect x="12" y="52" width="26" height="16" />
      <rect x="56" y="52" width="22" height="16" />
      <path d="M12 40 H78" strokeDasharray="3 3" />
    </>
  ),
  cmo: (
    <>
      <rect x="12" y="12" width="66" height="60" />
      <path d="M12 28 H78 M34 12 V72 M56 12 V72 M12 50 H78" />
      <rect x="36" y="30" width="18" height="18" fill="currentColor" opacity="0.35" stroke="none" />
    </>
  ),
  researcher: (
    <>
      <path d="M18 14 V76 M18 22 H40 M18 34 H52 M18 46 H36 M18 58 H48 M18 70 H32" />
    </>
  ),
  hr: (
    <>
      <circle cx="45" cy="18" r="4" />
      <circle cx="25" cy="45" r="4" />
      <circle cx="65" cy="45" r="4" />
      <circle cx="15" cy="72" r="4" />
      <circle cx="38" cy="72" r="4" />
      <circle cx="55" cy="72" r="4" />
      <circle cx="78" cy="72" r="4" />
      <path d="M45 22 L25 41 M45 22 L65 41 M25 49 L15 68 M25 49 L38 68 M65 49 L55 68 M65 49 L78 68" />
    </>
  ),
};

export function Motif({
  kind,
  size = 90,
  style = {},
}: {
  kind: keyof typeof paths | string;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 90 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      style={{ pointerEvents: "none", ...style }}
      aria-hidden
    >
      {paths[kind] ?? paths.pa}
    </svg>
  );
}
