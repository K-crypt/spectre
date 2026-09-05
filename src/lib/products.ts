export type Product = {
  slug: string;
  name: string;
  short: string;
  accent: string;
  /* The full-bleed ground this system owns, and the tint its schematic is
     drawn in on top of that ground. DESIGN.md §2 defined five hues and then
     spent them on 8px dots; as fields they are what the suite has instead of
     five logos. One hue is ever on screen at a time, so §2's real rule holds
     even though rule 2's "home is near-mono" does not. */
  field: string;
  fieldDeep: string;
  claim: string;
  status: string;
  sub: string;
  bullets: [string, string, string];
};

export const PRODUCTS_DATA: Product[] = [
  {
    slug: "pa",
    field: "#4b466f",
    fieldDeep: "#373354",
    name: "AI PA · Second Brain",
    short: "AI PA",
    accent: "var(--spectral)",
    claim: "A second brain that remembers your world and quietly runs the other four.",
    status: "RUNNING IN PRODUCTION",
    sub: "A private AI that remembers your world, thinks with your context, and does the actual work. You stay the only one who approves what goes out.",
    bullets: [
      "A memory that compounds and maintains itself",
      "Specialists that draft, plan, research, and analyze in your voice",
      "A hard approval gate: nothing outward without your tap",
    ],
  },
  {
    slug: "coo",
    field: "#2f4c73",
    fieldDeep: "#22395a",
    name: "AI COO",
    short: "AI COO",
    accent: "var(--steel)",
    claim: "Watches your whole plant in real time and tests future orders before you commit.",
    status: "IN PILOT BUILD",
    sub: "Every zone, every machine, live on one screen. And when an order inquiry lands: what to buy, what shifts, what blocks, and whether to say yes.",
    bullets: [
      "The live operating picture: bottlenecks visible as they form",
      "Order feasibility before you commit: bill of materials + scheduler",
      "Alerts, reports, and the data spine that keeps it all real-time",
    ],
  },
  {
    slug: "cmo",
    field: "#7c3826",
    fieldDeep: "#5e2819",
    name: "AI CMO",
    short: "AI CMO",
    accent: "var(--clay)",
    claim: "A marketing department that never forgets your brand.",
    status: "RUNNING IN PRODUCTION",
    sub: "Content, outreach, ads, and the numbers, drafted in your voice and staged for one approval pass.",
    bullets: [
      "Content ideas and drafts calibrated to your brand's voice",
      "Outreach plans and ad campaigns with staged approvals",
      "Metrics calculated through defined tools, narrated weekly",
    ],
  },
  {
    slug: "researcher",
    field: "#3c5844",
    fieldDeep: "#2b4132",
    name: "AI Researcher",
    short: "Researcher",
    accent: "var(--archive)",
    claim: "Research at the depth of a diligence committee, delivered in days and verified twice.",
    status: "METHOD PROVEN",
    sub: "Machine-scale research with its own adversarial review. Every claim sourced, checked, and corrected before you read it.",
    bullets: [
      "Full-map studies: machines, market, competition, strategy",
      "Adversarial self-verification before anything reaches you",
      "A structured library you own and can explore",
    ],
  },
  {
    slug: "hr",
    field: "#634f24",
    fieldDeep: "#47391a",
    name: "AI HR",
    short: "AI HR",
    accent: "var(--ochre)",
    claim: "Every people decision, from hiring to growth, made with full memory.",
    status: "TAKING DESIGN PARTNERS",
    sub: "The people layer: records, reviews, hiring for culture and skill, and a chatbot both sides actually use.",
    bullets: [
      "Records to appraisals in one remembered place",
      "Hiring that screens for culture as well as skill",
      "Chatbots managers and employees actually use",
    ],
  },
];
