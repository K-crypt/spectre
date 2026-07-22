/* Chat personas — one per page. Predefined Q&A for the preview widget.
   Every answer is honest, current, and written in full sentences.
   The live product replaces this with the real model + real context. */

export type QA = { q: string; a: string };
export type Persona = {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
  greeting: string;
  qa: QA[];
};

const FREE_TEXT_REPLY =
  "In this preview I answer the set questions below; the live version runs on the real model with real context. Pick one of the questions, or join early access to try the full thing.";

export const FREE_TEXT = FREE_TEXT_REPLY;

export const PERSONAS: Record<string, Persona> = {
  home: {
    id: "home",
    title: "The Spectre",
    subtitle: "Studio guide · preview",
    accent: "var(--brass)",
    greeting:
      "Hello. I can tell you about the studio, the five products, and how early access works. In the live version I would also know your business.",
    qa: [
      {
        q: "What exactly does The Spectre do?",
        a: "We build AI operating teams for businesses: five specialists that run operations, marketing, research, people work, and a second brain that coordinates them. They do the repeatable work, and nothing goes out without your approval.",
      },
      {
        q: "Which product should I start with?",
        a: "It depends on where your week goes. If you run a factory, start with the AI COO. If you own a brand, the AI CMO is live today. If you are the bottleneck yourself, the Second Brain is the one built for you.",
      },
      {
        q: "How does early access work?",
        a: "You leave your email and pick the products that interest you. Each one opens to its list in order of readiness, and we reply to every request within 48 hours, personally.",
      },
      {
        q: "Is my data safe with you?",
        a: "Client data stays under your accounts wherever possible, tokens are stored encrypted, and every outward action passes a human approval gate with a full audit log. This site itself shows no client data at all; every demo runs on fictional datasets.",
      },
      {
        q: "Who is behind this?",
        a: "The Spectre is a House of Dotone company from Jaipur, built by a founder who runs three ventures on these systems in under ten hours a week. The proof pages on this site show the real work.",
      },
    ],
  },
  pa: {
    id: "pa",
    title: "Second Brain",
    subtitle: "Product assistant · preview",
    accent: "var(--spectral)",
    greeting:
      "This is the Second Brain's assistant. In the live product I would already know your world; here I can answer how it works.",
    qa: [
      {
        q: "How is this different from ChatGPT?",
        a: "Chat tools forget you when the tab closes and answer from the internet's average. The Second Brain keeps a compiled memory of your world, retrieves it before every answer, and then actually does the work through your real tools.",
      },
      {
        q: "What happens to what I tell it?",
        a: "It is filed into your private knowledge base as plain, portable text that you can export at any time. Nothing you tell it trains anyone else's model, and nothing leaves without your approval.",
      },
      {
        q: "Can it really act for me?",
        a: "Yes, with one hard rule. It can draft, plan, analyze, and stage anything, but publishing, sending, and spending all wait for your explicit tap. The approval gate is architecture, not a setting.",
      },
      {
        q: "What does early access include?",
        a: "The first cohort gets their second brain built with us directly: your world ingested, your voice calibrated, your tools connected. It opens as onboarding capacity allows, which is why there is a list.",
      },
    ],
  },
  coo: {
    id: "coo",
    title: "AI COO",
    subtitle: "Operations assistant · preview",
    accent: "var(--steel)",
    greeting:
      "This is the operations assistant. In the real product I sit on your live plant data; here I can answer how the AI COO works.",
    qa: [
      {
        q: "What does the AI COO actually monitor?",
        a: "Every zone and machine in your plant: status, speed, material flow, inventory, and alerts, all on one live screen. The point is that a bottleneck becomes visible while it is still cheap to fix.",
      },
      {
        q: "How does order feasibility work?",
        a: "A new inquiry is run through your bill of materials and your live schedule. You get back what to buy, which work orders shift, where the constraint sits, and whether to say yes, before you commit to the buyer.",
      },
      {
        q: "We don't have live data. Can you still help?",
        a: "Yes, and that is honestly most plants. The pilot includes building your data spine: collection on the floor, processing, and the plumbing into your ERP, until the screen tells the truth in real time.",
      },
      {
        q: "What does the pilot include?",
        a: "The live operating picture, the order feasibility engine, alerting with staged decisions, and the data work to feed it all. It is built around one real plant at a time, which is why access opens in order.",
      },
    ],
  },
  cmo: {
    id: "cmo",
    title: "AI CMO",
    subtitle: "Marketing assistant · preview",
    accent: "var(--clay)",
    greeting:
      "This is the marketing assistant. In the live product I would know your brand's voice and numbers; here I can answer how the AI CMO works.",
    qa: [
      {
        q: "What can it run for my brand?",
        a: "Content ideas and drafts, outreach plans with written messages, ad campaigns with honest kill rules, and a weekly digest of your numbers computed in code. You review one staged queue instead of running five tools.",
      },
      {
        q: "Will it sound like us?",
        a: "Yes, because it is calibrated on your real writing and graded against your own rules before anything reaches you. The live deployment runs a luxury export brand today, in a voice its founder signs off on.",
      },
      {
        q: "Does anything publish on its own?",
        a: "No. Every post, message, and ad waits in the approval queue until you tap yes, and every action is logged. That rule has never been broken in production.",
      },
      {
        q: "What proof do you have?",
        a: "Carpetstory, a real rug export house, runs its entire marketing through this system: content, publishing, outreach, ads review, and analytics, with the founder reviewing the work in a few hours a week.",
      },
    ],
  },
  researcher: {
    id: "researcher",
    title: "AI Researcher",
    subtitle: "Research assistant · preview",
    accent: "var(--archive)",
    greeting:
      "This is the research assistant. Here I can answer how a program works; in a live program I would be answering from your library.",
    qa: [
      {
        q: "What does a research program cover?",
        a: "The full map of a decision: your machines or assets, the market, the competition, and the strategy they add up to. It ends with the decisions the evidence forces, ranked, with sources attached.",
      },
      {
        q: "How do you verify the findings?",
        a: "A separate adversarial pass re-checks every load-bearing claim against its sources before delivery, and corrections are made before you read a page. What remains uncertain is flagged in the file rather than smoothed over.",
      },
      {
        q: "What do I receive at the end?",
        a: "A structured library your team can browse and search, not a slide deck. Every chapter ends with its sources and a confidence tag, and the whole thing stays yours.",
      },
      {
        q: "How long does a program take?",
        a: "Days, not weeks, because fleets of specialist agents work in parallel and the verification pass runs as part of the program. The most recent full program was researched, verified, and delivered inside one week.",
      },
    ],
  },
  hr: {
    id: "hr",
    title: "AI HR",
    subtitle: "People assistant · preview",
    accent: "var(--ochre)",
    greeting:
      "This is the people assistant. The HR module is the youngest of the five, so let me be straight about what exists and what is being built.",
    qa: [
      {
        q: "What will the HR module handle?",
        a: "One remembered record per person covering salary, attendance, reviews, and growth; hiring scorecards that weigh culture alongside skill; and a chatbot that employees and managers both use for the everyday questions.",
      },
      {
        q: "What is a design partner?",
        a: "One of two or three companies we build the module with, shaped around their real appraisal cycles and hiring rounds, on favorable terms. If that could be you, say so in the access form and we will talk.",
      },
      {
        q: "How is employee data handled?",
        a: "People data is the most sensitive thing a company holds, so it stays under your control, encrypted, with role-based access and a full audit trail. Those guarantees are being designed in from the start, not patched on.",
      },
      {
        q: "Can it stop people from quitting?",
        a: "It cannot make anyone stay, but it catches the pattern early: overtime creep, pay drifting under your band, attendance sliding near a tenure milestone. You get the warning and a prepared conversation while there is still time to act, which is usually the difference.",
      },
    ],
  },
};

export function personaForPath(pathname: string): Persona {
  const slug = pathname.split("/").filter(Boolean)[0] ?? "";
  return PERSONAS[slug] ?? PERSONAS.home;
}
