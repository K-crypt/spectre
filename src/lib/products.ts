export type Product = {
  slug: string;
  name: string;
  short: string;
  accent: string;
  claim: string;
  status: string;
  sub: string;
  bullets: [string, string, string];
};

export const PRODUCTS_DATA: Product[] = [
  {
    slug: "pa",
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
    name: "AI CMO",
    short: "AI CMO",
    accent: "var(--clay)",
    claim: "A marketing department that never forgets your brand.",
    status: "RUNNING IN PRODUCTION",
    sub: "Content, outreach, ads, and the numbers, drafted in your voice and staged for one approval pass.",
    bullets: [
      "Content ideas and drafts calibrated to your brand's voice",
      "Outreach plans and ad campaigns with staged approvals",
      "The numbers computed in code, narrated weekly",
    ],
  },
  {
    slug: "researcher",
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
