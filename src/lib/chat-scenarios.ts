/* Cinematic chat scenarios — one per product. Each follows the same beat:
   user question → visible working steps → reasoned answer → staged actions →
   approval → follow-through. All data fictional; every answer keeps one
   honest caveat, because that is the house register. */

export type Scenario = {
  id: string;
  title: string;
  accent: string;
  user: string;
  working: string[];
  bot: string;
  stagedItems: string[];
  bot2: string;
};

export const SCENARIOS: Record<string, Scenario> = {
  coo: {
    id: "coo",
    title: "AI COO",
    accent: "var(--steel)",
    user: "A buyer wants 40,000 more units in October. Can we take it without hurting the festival order?",
    working: ["reading the live schedule", "exploding the bill of materials", "checking capacity, cell by cell", "checking supplier lead times"],
    bot: "Yes, with one change. Assembly becomes the constraint in week 3, so Tuesday needs its second shift running. Materials are covered except the feed belts: order them by Friday and they arrive with 8 days to spare. The festival order stays on time. Margin on the new run is 2.1 points below your standard, which is worth taking, but that call is yours.",
    stagedItems: ["Purchase order · feed belts · supplier B", "Shift change · assembly · week 3, Tuesdays"],
    bot2: "Done. Both are executed and logged. I will watch week-3 assembly and flag any drift, daily.",
  },
  pa: {
    id: "pa",
    title: "Second Brain",
    accent: "var(--spectral)",
    user: "I'm meeting Rohan from Meridian Textiles tomorrow. What should I know?",
    working: ["searching your memory", "reading the April thread", "checking tomorrow's calendar", "pulling the pricing history"],
    bot: "Three things. You last spoke in April: he took the smaller trial order and you agreed to revisit pricing after the festival season; your note says he negotiates late, not early. His company has been hiring in finishing all month, which usually means volume is coming. And your morning is overloaded, so I have drafted an agenda and put a 20-minute prep block at 8 a.m. One caution: your April price sheet is stale, check the new material costs before you quote.",
    stagedItems: ["Send agenda to Rohan · draft attached", "Calendar · prep block · 8:00 tomorrow"],
    bot2: "Sent and booked. I will brief you again one hour before the meeting.",
  },
  cmo: {
    id: "cmo",
    title: "AI CMO",
    accent: "var(--clay)",
    user: "Sales dipped this week and I don't know why. Should we change anything before the weekend?",
    working: ["computing the week's numbers", "comparing the four-week average", "reading ad-set performance", "checking the content calendar"],
    bot: "Do not touch the creative; the dip is not demand. Reach held and saves rose 12 percent, but story clicks fell after Wednesday's slot moved to 11 p.m. The weekend plan is already your strongest format. I suggest two changes only: stories return to 8 p.m., and the one ad set whose cost per lead drifted 40 percent above your rule gets paused. Everything else earns its keep.",
    stagedItems: ["Story slot · back to 20:00", "Pause ad set · North-2 · CPL breach"],
    bot2: "Both done and logged. If Saturday runs below its average, you will hear from me Sunday morning, with numbers.",
  },
  researcher: {
    id: "researcher",
    title: "AI Researcher",
    accent: "var(--archive)",
    user: "A broker is offering a used lamination line at 60 lakh. Good deal or a trap?",
    working: ["reading the machine's spec sheet", "finding comparable sales", "checking your capacity study", "checking spare-parts supply"],
    bot: "Likely a trap at that price. The same model sold three times this year between 38 and 45 lakh. Your own capacity study says lamination is not your constraint, so this adds output you cannot convert downstream. And spares for this generation come from a single supplier with 90-day leads. If you still want it, the defensible price is under 42, conditional on a parts audit before transfer.",
    stagedItems: ["File the comparison · three listings · to your library", "Draft reply to the broker · decline at 60"],
    bot2: "Filed and drafted. The full comparison, sources attached, is in your library now.",
  },
  hr: {
    id: "hr",
    title: "AI HR",
    accent: "var(--ochre)",
    user: "My best machinist just told me he's thinking of leaving. What do I do?",
    working: ["reading his full record", "comparing pay to band and market", "checking overtime and attendance patterns", "pulling his last two reviews"],
    bot: "Rehan is worth fighting for: three years, 96 percent attendance, two exceeds reviews, and he trained both your juniors. The signs were there, honestly: overtime up 40 percent since March, and his pay slipped 9 percent under your own band after last year's hires. A raise inside the band plus taking Sundays off his plate costs a fraction of replacing him, which typically runs four to six months of salary. One caution: match the raise to the band, not to panic, or you reset every anchor on that shift.",
    stagedItems: ["Retention offer · raise within band + Sunday change", "Conversation guide · tonight, 30 minutes"],
    bot2: "Both are ready. Talk first, paper second: the offer means more if he hears it from you before he reads it.",
  },
};
