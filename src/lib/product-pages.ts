/* ── Product page copy ─────────────────────────────────────────────────────
   One template, five instances. Everything that differs between the five
   product pages lives here, so the template holds no per-product branching
   and the copy can be read and fact-checked in one place.

   The voice is carried over from the previous build deliberately: full
   sentences, no hype fragments, and every claim survives a fact-check. What
   changed is the shape around it, not the argument.

   `honest` is the section that matters most. Each page states the thing a
   buyer would otherwise find out on the call, in the buyer's own terms, and
   states it before they ask.
   ───────────────────────────────────────────────────────────────────────── */

export type ProductPage = {
  /* Distinct from the roster claim: the roster is scanned, this is read. */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  demoTitle: string;
  demoLede: string;
  chatTitle: string;
  chatLede: string;
  coversTitle: string;
  covers: [string, string][];
  honestTitle: string;
  honest: string;
  accessTitle: string;
};

export const PRODUCT_PAGES: Record<string, ProductPage> = {
  pa: {
    h1: "Most AI forgets you. This one is you.",
    metaTitle: "AI PA, the second brain",
    metaDescription:
      "A private AI that remembers your world, thinks with your context, and does the work. Every outward action waits for your approval. Running in production.",
    demoTitle: "Build a second brain. Then work it.",
    demoLede:
      "Feed it any combination of facts and watch the memory graph form. Every answer is composed from exactly what you fed it, and the graph shows what was retrieved.",
    chatTitle: "Ask it a real question.",
    chatLede:
      "This is what a second brain sounds like in use. It answers from your own history, does the legwork, and stages the follow-ups rather than sending them.",
    coversTitle: "What it gives back.",
    covers: [
      ["A memory that compounds", "Your world compiled into a cross-linked knowledge base that it keeps clean itself, so the second year is better than the first."],
      ["Specialists in your voice", "Drafting, planning, research and analysis, run by the four other systems and returned in the register you actually write in."],
      ["A hard approval gate", "Nothing leaves, publishes or spends without your tap, and every release is logged. That is architecture, not a setting."],
    ],
    honestTitle: "The honest part.",
    honest:
      "A second brain is only as good as what it has been told. The first weeks are spent feeding it your world, and that work is real. We do it with you rather than handing you an empty box, but nobody can skip it.",
    accessTitle: "Bring one workflow you would not delegate.",
  },

  coo: {
    h1: "See the whole plant live. Test next month before you promise it.",
    metaTitle: "AI COO, operations intelligence",
    metaDescription:
      "Every zone and machine live on one screen, and order feasibility tested against real capacity before you commit to a date. In pilot build.",
    demoTitle: "A plant you can hold in one look.",
    demoLede:
      "Machines move through a real lifecycle, the KPIs derive from actual machine states, and a blocked line clears when you approve the fix.",
    chatTitle: "Ask it a real question.",
    chatLede:
      "The same picture also answers. It reads the schedule, explodes the bill of materials, checks capacity and lead times, then stages the purchase order and the shift change for a tap.",
    coversTitle: "What the pilot covers.",
    covers: [
      ["The live picture", "Every zone and machine with status, flow, inventory and alerts. The bottleneck shows up on screen while it is still cheap to fix."],
      ["Order feasibility", "A new inquiry runs through the bill of materials and the live schedule: what to buy, what shifts, what blocks, and whether to commit."],
      ["Decisions, staged", "Alerts and reports arrive triaged. The consequential ones become staged decisions that wait for your tap."],
    ],
    honestTitle: "The honest part.",
    honest:
      "A live picture needs live data, and most plants do not have it. So we build that too: the collection, the processing, and the plumbing into your ERP, until the screen is telling the truth about your floor in real time. The pilot includes that work.",
    accessTitle: "Build the first operating picture with us.",
  },

  cmo: {
    h1: "A marketing department that never forgets your brand.",
    metaTitle: "AI CMO, marketing intelligence",
    metaDescription:
      "Content, outreach, ads and the numbers, drafted in your brand's voice and staged for one approval pass. Running in production at a luxury export house.",
    demoTitle: "Your week arrives already staged.",
    demoLede:
      "Approve posts, kill an ad, accept the analyst's fix, run an agent, and watch every verdict ripple through the system. One counter tracks the lot.",
    chatTitle: "Ask it a real question.",
    chatLede:
      "Behind the staged queue sits a marketer you can question. It computes the numbers before it answers, and its advice ends in staged actions rather than opinions.",
    coversTitle: "What it covers.",
    covers: [
      ["Content, calibrated", "Ideas and drafts written against a brand memory, so the fiftieth post sounds like the first one you approved."],
      ["Outreach and ads", "Campaign plans and ad reviews that arrive as proposals with the reasoning attached, staged for a single approval pass."],
      ["Numbers you can check", "Metrics calculated through defined tools rather than estimated in prose, and narrated weekly with the working shown."],
    ],
    honestTitle: "The honest part.",
    honest:
      "This one is not a concept. It runs the marketing operation of Carpetstory, a luxury rug export house, and has since July 2026. The console on this page is a faithful miniature of the one they use, with the numbers lightly altered for public display.",
    accessTitle: "Configure the first operating rhythm with us.",
  },

  researcher: {
    h1: "The diligence a committee would do, at a depth a committee cannot.",
    metaTitle: "AI Researcher, evidence intelligence",
    metaDescription:
      "Machine-scale research with its own adversarial review. Every claim sourced, checked and corrected before you read it. Method proven on a full market-entry study.",
    demoTitle: "You receive a library, not a deck.",
    demoLede:
      "An explorable evidence tree where every claim traces to the source it came from, and the ones that failed verification are visible as failures.",
    chatTitle: "Ask it a real question.",
    chatLede:
      "A finished library keeps answering. It checks your own studies before it opines, cites what it found, and files the new work back into the tree.",
    coversTitle: "What a study contains.",
    covers: [
      ["Full-map coverage", "Machines, market, competition and strategy, mapped rather than sampled, because the gap is usually the thing that matters."],
      ["Adversarial self-verification", "A second pass argues against the first before anything reaches you. Claims that do not survive it are replaced, not softened."],
      ["A library you own", "Structured, explorable and yours. Not a slide deck whose reasoning evaporated when the consultant left."],
    ],
    honestTitle: "The honest part.",
    honest:
      "The method is proven and the delivery is not instant. A full market-entry study took days, not hours, and two material claims failed the first verification pass and had to be re-sourced. That second pass is the reason to use this, and it is also why it takes the time it takes.",
    accessTitle: "Design the research program around your decision.",
  },

  hr: {
    h1: "People decisions, made with full memory.",
    metaTitle: "AI HR, people intelligence",
    metaDescription:
      "Records, reviews, hiring and growth in one remembered place, with a chatbot that answers managers and employees differently. Taking design partners.",
    demoTitle: "The people layer, working.",
    demoLede:
      "Catch the leaver before the resignation letter, approve an appraisal drafted from the real record, weigh two candidates fairly, and answer both sides honestly.",
    chatTitle: "Ask it a real question.",
    chatLede:
      "It reads the records, respects your pay bands, and drafts what you would have written on your best day. Watch it handle two raise conversations that need different answers.",
    coversTitle: "What it covers.",
    covers: [
      ["One remembered record", "Records through appraisals in a single place, so a review is composed from evidence rather than from the last six weeks."],
      ["Hiring for culture and skill", "A pipeline that screens for both, and shows its reasoning for each, so a rejection can be explained."],
      ["Two audiences, one system", "A chatbot that answers a manager and an employee differently, because the same question is not the same question."],
    ],
    honestTitle: "The honest part.",
    honest:
      "This is the least finished of the five. It is taking two or three design partners rather than customers, the roadmap is genuinely open to them, and the console on this page is a design rather than a production screenshot.",
    accessTitle: "We are building this with two or three design partners.",
  },
};
