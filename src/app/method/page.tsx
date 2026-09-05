import type { Metadata } from "next";
import { Reveal, Words } from "@/components/shell/reveal";
import { AccessForm } from "@/components/sections/access-form";
import { JsonLd, breadcrumbLd, canonical, OG_IMAGE } from "@/lib/site";

/* ── Method ────────────────────────────────────────────────────────────────
   The page for the reader who has decided the products are interesting and
   now wants to know how the studio works before they write an email.

   It is four questions, answered in the order they get asked on a call:
   what the guarantee actually is, why every demo here is fake on purpose,
   how an engagement is shaped, and what we will not do. The last one is the
   most persuasive section on the site, which is why it is on it.
   ───────────────────────────────────────────────────────────────────────── */

const TITLE = "Method";
const DESCRIPTION =
  "How The Spectre builds: the approval gate as architecture rather than a setting, deterministic demonstrations on fictional data, and engagements shaped around one consequential workflow.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: canonical("method") },
  openGraph: {
    title: `${TITLE} - The Spectre`,
    description: DESCRIPTION,
    url: canonical("method"),
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "The Spectre method" }],
  },
};

const PRINCIPLES: [string, string][] = [
  [
    "The gate is architecture, not a setting",
    "Work is staged as drafts, plans, orders and reports. Nothing is published, sent or spent until a person taps yes, and every release is logged. There is no configuration screen where somebody could turn this off, because there is no code path that goes around it.",
  ],
  [
    "Every demonstration here is fictional, on purpose",
    "The five playgrounds on this site are deterministic simulations: state machines, seeded hashes and compositional logic. They are impressive without faking a model and without exposing anyone's data. Each one says so on its own frame.",
  ],
  [
    "One workflow first, not a platform",
    "An engagement starts with a single consequential workflow, the one you would not delegate. It gets built, run in real weekly work, and judged on whether it survived contact with your business. Breadth comes after that, or it does not come.",
  ],
  [
    "The memory is yours and portable",
    "Whatever a system learns about your world stays exportable text under your own accounts wherever that is possible. The compounding value is the point, and it is not a reason to make you a hostage.",
  ],
];

const REFUSALS = [
  "We do not send, publish or spend on your behalf without a person in the loop, at any price.",
  "We do not show client data in a demonstration, a deck or a case study without written permission.",
  "We do not ship a number without an as-of date, or a claim we have not checked twice.",
];

export default function MethodPage() {
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbLd([
          { name: "The Spectre", path: "/" },
          { name: TITLE, path: "method" },
        ])}
      />

      <section className="section">
        <div className="wrap">
          <div className="movement-head">
            <Words
              as="h1"
              className="display-lg"
              lines={["The machine prepares.", "The human decides."]}
            />
            <Reveal delay={140}>
              <p className="lede">
                That sentence is the whole company. This page is what it costs to
                mean it.
              </p>
            </Reveal>
          </div>

          <Reveal className="claims" stagger>
            {PRINCIPLES.map(([title, body]) => (
              <div className="claim-row" key={title}>
                <span className="claim-mark" aria-hidden />
                <div>
                  <h2 className="display display-sm" style={{ marginBottom: 10 }}>
                    {title}
                  </h2>
                  <p className="body" style={{ color: "var(--ghost)" }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="refusals-title">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <Words id="refusals-title" className="display-lg" lines={["What we", "will not do."]} />
          <Reveal className="flow" delay={120} style={{ marginTop: 32, "--flow": "1.2rem" }}>
            {REFUSALS.map((r) => (
              <p className="body" key={r} style={{ fontSize: "1.08rem" }}>
                {r}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" id="access" aria-labelledby="method-access">
        <div className="wrap">
          <div className="split">
            <div className="movement-head">
              <Words
                id="method-access"
                className="display-lg"
                lines={["Bring the workflow", "you would not delegate."]}
              />
            </div>
            <Reveal delay={160}>
              <AccessForm />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
