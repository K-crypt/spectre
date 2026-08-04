import type { ReactNode } from "react";
import Link from "next/link";

/* Studio notes — the substantive-thinking layer (trust canon law 12).
   Studio voice, unbylined. Bodies are JSX; keep paragraphs short and claims
   honest — these pages carry the same truth discipline as the rest of the
   site. */

export type Note = {
  slug: string;
  title: string;
  dek: string;
  date: string; // ISO
  stamp: string; // display date
  minutes: number;
  body: ReactNode;
};

export const NOTES: Note[] = [
  {
    slug: "context-is-experience",
    title: "Context is experience. It is what AI is missing.",
    dek: "Skills can be taught. Context can only be lived — and the same is true for machines.",
    date: "2026-08-04",
    stamp: "AUG 2026",
    minutes: 6,
    body: (
      <>
        <p>
          Take two engineers with the same degrees, the same benchmarks, the same
          raw ability. One has spent four years inside your company. The other
          joined on Monday. Nobody in your business would price them the same,
          and nobody can quite write down why.
        </p>
        <p>
          The difference is not skill. Skills are teachable; that is what makes
          them skills. The difference is context: how the company actually
          decides things, which promises matter to which customer, what the
          founder means when a brief says &ldquo;premium,&rdquo; which of the
          five stated priorities is the real one this quarter. Context is the
          thousand unwritten things that make each company itself and not a
          category.
        </p>
        <p>
          We have never solved context transfer elegantly. It cannot be handed
          over in a document, because it was never written as one. A person
          absorbs it: they observe, they act, they get corrected, they fold the
          correction into everything they do next. Context is not a download.
          It is a loop — action, mistake, feedback, iteration — and it never
          stops moving. Freeze it, and it starts going stale the same week.
        </p>
        <p>
          Now look at AI with that lens.
        </p>
        <p>
          Intelligence is no longer the scarce part. The models are brilliant,
          and they are brilliant for everyone at the same price. What they lack
          is exactly what the Monday engineer lacks: your context. And the
          industry&apos;s two standard answers both fail the way the document
          fails. Bolt-on memory dilutes — as it accumulates, retrieval gets
          noisier and the model performs worse, a failure mode the field now
          calls context rot. And the static approach — a folder of your files,
          embedded once — is an archive, not experience. Without a feedback
          loop it is outdated by the time you rely on it.
        </p>
        <p>
          So the framework that explains the two engineers explains the machines
          too: <em>a smart model with living context will beat an equally smart
          model without it, every day, on every task that touches your
          business.</em> Context is the experience of the AI world. It compounds
          the same way, and it decays the same way.
        </p>
        <p>
          This is the problem I took up personally over the last months. The
          answer, mechanically, is unglamorous: memory that is curated rather
          than accumulated; retrieval that is forced before any answer, so the
          system consults what it knows instead of improvising; and above all
          the loop — every action the system takes is logged, reviewed, and
          filed back, so the corrections become part of the context the way a
          senior&apos;s feedback becomes part of an engineer. A system built
          this way is measurably better in month six than in month one. Not
          because the model improved. Because the context did.
        </p>
        <p>
          The end result is very simple to say, because we have all had the
          same shorthand for it since the movies: Jarvis.
        </p>
        <p>
          Ours exists. It runs this studio — three real operations, every day.
          We call it the <Link href="/pa/">AI PA</Link>.
        </p>
      </>
    ),
  },
  {
    slug: "software-becomes-service",
    title: "The future of software is a service, not a product.",
    dek: "When anyone can have code written, owning code stops being the business.",
    date: "2026-08-01",
    stamp: "AUG 2026",
    minutes: 5,
    body: (
      <>
        <p>
          A software product is code, and code is nothing more than a very large
          number of small decisions, made once and then frozen. Which field is
          required. What happens on failure. What the button says. A product is
          those decisions, shipped.
        </p>
        <p>
          Here is the uncomfortable consequence: if an idea can be nailed down
          to an exact sequence of steps, a machine can now follow those steps —
          and lately, it can also write them. Naval Ravikant has been making a
          version of this point for years: once building software costs little
          more than describing it clearly, software itself stops being a moat.
          The frozen decisions that used to take a team a year are becoming
          something anyone can have generated in an afternoon.
        </p>
        <p>
          That does not make software worthless. It moves the value. When
          everyone can have code, the scarce things are the ones that never
          freeze: knowing which system to build, fitting it to one specific
          business, keeping it honest in production, and re-deciding all of it
          as the frontier moves. That is not a product. That is a service —
          delivered by people who live close to the technology, who know what
          this month&apos;s models can and cannot be trusted with, and who
          carry that judgment to businesses that have better things to master.
        </p>
        <p>
          The other half of the future belongs to those businesses themselves.
          A defensible business is becoming a niche you genuinely care about,
          run with an operational edge others cannot copy. Passion picks the
          niche; experience supplies the edge. The technology, increasingly,
          arrives as a service.
        </p>
        <p>
          That is the bet this studio is built on. We do not sell you frozen
          decisions. We install operating systems around your business — sales,
          operations, research, people — and we keep making the next decision
          well, so you do not have to become a technology company to benefit
          from one.
        </p>
      </>
    ),
  },
  {
    slug: "the-approval-gate",
    title: "The machine proposes. You decide.",
    dek: "Trust in AI is not a setting. It has to be architecture.",
    date: "2026-07-28",
    stamp: "JUL 2026",
    minutes: 4,
    body: (
      <>
        <p>
          Every AI vendor will tell you their agent is safe. Ask one question:
          <em> can it act without you?</em> If the honest answer is yes, then
          safety is a behavior — a policy the system is supposed to follow, and
          might. Behaviors have exceptions. Architecture does not.
        </p>
        <p>
          Our systems are built so that acting without you is not switched off
          but structurally absent. Everything a specialist produces — a draft,
          a plan, a purchase list, a report — arrives as a staged proposal.
          It sits there, visible, logged, waiting. The single motion that turns
          a proposal into an action in the world is your approval. We drew the
          whole company as one image: five specialists around a table, and only
          one line leaves it — the one that passes through your seat.
        </p>
        <p>
          This costs something. A gated system will never demo as impressively
          as an agent that sprints off and does forty things unsupervised. We
          accept the trade happily, for two reasons.
        </p>
        <p>
          First, because the people we build for are the people whose names are
          on the work. Judgment, taste, and relationships do not get delegated;
          a system that pretends otherwise is not saving you time, it is
          spending your reputation.
        </p>
        <p>
          Second, because the gate is what makes the system get better. Every
          approval is a signal. Every edit before an approval is a correction.
          Every rejection teaches. A system that acts alone learns nothing from
          you; a system that proposes is in a permanent apprenticeship.
        </p>
        <p>
          One tap a day is not a limitation of the product. It is the product.
        </p>
      </>
    ),
  },
  {
    slug: "computed-not-guessed",
    title: "Computed, never guessed.",
    dek: "Why no number on our systems is ever produced by a language model.",
    date: "2026-07-22",
    stamp: "JUL 2026",
    minutes: 4,
    body: (
      <>
        <p>
          Language models are persuasive with numbers and unreliable at
          producing them. They do not calculate; they perform calculation, the
          way an actor performs surgery. Most of the time the performance is
          close. Close is worthless in operations.
        </p>
        <p>
          So our systems run one strict rule: every figure is computed in code.
          Revenue, reach, feasibility, anomalies — each is the output of a
          query or a program that can be read, tested, and rerun. The language
          model&apos;s job begins after the number exists: it narrates. It says
          what moved, what looks wrong, what deserves your attention. It is
          never the source of the value, only the explanation of it.
        </p>
        <p>
          The same discipline shapes how numbers are shown. Every figure on our
          pages carries an as-of date, because a true number without its time
          is halfway to a false one. Where a claim is a client&apos;s to make,
          it is named on permission or kept anonymous — not decorated.
        </p>
        <p>
          This split — computation for facts, language for meaning — sounds
          obvious written down. It is surprisingly rare in practice, because
          the shortcut is so tempting: the model will happily give you the
          number and the story in one breath. The story will be excellent. The
          number will be an impression.
        </p>
        <p>
          We think the businesses that win with AI will be the ones that keep
          this line bright: machines that are honest about which of their
          outputs are facts and which are judgment, presented to a human who
          owns the final call. It is how our own operations run, every day,
          three ventures at a time.
        </p>
      </>
    ),
  },
];

export function getNote(slug: string) {
  return NOTES.find((n) => n.slug === slug);
}
