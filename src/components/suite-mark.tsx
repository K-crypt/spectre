/* ── The suite mark ───────────────────────────────────────────────────────
   The same three facts, in the same order, in the same treatment, at the
   head of every product page: which system this is, what it is responsible
   for, and how mature it actually is.

   It replaces five differently-coloured status stamps. Each page used to
   tint its own status with its own accent, which made five members of one
   suite read as five unrelated products — the one thing the house language
   should never do. Differentiation here comes from the role and the
   vocabulary, not from a colour; the only colour is the shared gold, and
   it means the same thing it means everywhere else on the site.
   ───────────────────────────────────────────────────────────────────────── */

export const SUITE = {
  pa: { name: "AI PA · Second Brain", role: "Executive memory", status: "Running" },
  coo: { name: "AI COO", role: "Operations intelligence", status: "Pilot" },
  cmo: { name: "AI CMO", role: "Marketing intelligence", status: "Running" },
  researcher: {
    name: "AI Researcher",
    role: "Evidence intelligence",
    status: "Method proven",
  },
  hr: { name: "AI HR", role: "People intelligence", status: "Design partner" },
} as const;

export function SuiteMark({ slug }: { slug: keyof typeof SUITE }) {
  const s = SUITE[slug];
  return (
    <p className="suite-mark">
      <span className="mono suite-mark-name">{s.name}</span>
      <span className="mono suite-mark-role">{s.role}</span>
      <span className="mono suite-mark-status">{s.status}</span>
    </p>
  );
}
