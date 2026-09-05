import type { ReactNode } from "react";
import { Reveal, Words } from "@/components/shell/reveal";
import { withBasePath } from "@/lib/base-path";
import { ChatShowcase } from "@/components/chat-showcase";
import { AccessForm } from "@/components/sections/access-form";
import { SCENARIOS } from "@/lib/chat-scenarios";
import { PRODUCTS_DATA } from "@/lib/products";
import { PRODUCT_PAGES } from "@/lib/product-pages";
import { JsonLd, productLd, breadcrumbLd } from "@/lib/site";

/* ── The product page ──────────────────────────────────────────────────────
   One template, five instances. The previous build wrote each of these by
   hand, which is why one had five sections and another had nine, and why
   the same "The same task, three ways" module appeared on all five with
   identical copy.

   Five movements, in the order a sceptical reader actually needs them:

     1  What this is        the name, the claim, the status
     2  Drive it            the playground, before any argument is made
     3  Ask it              the chat layer, the same logic in words
     4  What it covers      three claims, as a ladder of rules
     5  The honest part     the limit, stated before it is asked about
     6  Access              the form, with this product preselected

   The playground comes second on purpose. Every one of them is a working,
   deterministic simulation, and it is a stronger argument than any sentence
   above it could be.

   One accent per page, per DESIGN.md §2. It arrives as `--accent` on the
   main element and touches three things: the identity dot, the demo frame's
   top rule, and the claim numerals. It never colours body text and it never
   appears beside another product's accent.
   ───────────────────────────────────────────────────────────────────────── */

export function ProductPage({
  slug,
  playground,
}: {
  slug: string;
  playground: ReactNode;
}) {
  const product = PRODUCTS_DATA.find((p) => p.slug === slug);
  const copy = PRODUCT_PAGES[slug];
  const scenario = SCENARIOS[slug];
  if (!product || !copy) throw new Error(`No product page copy for "${slug}"`);

  const ld = productLd(slug);

  return (
    <main
      id="main"
      style={{ ["--accent" as string]: product.accent }}
    >
      {ld ? <JsonLd data={ld} /> : null}
      <JsonLd
        data={breadcrumbLd([
          { name: "The Spectre", path: "/" },
          { name: product.name, path: slug },
        ])}
      />

      {/* ── 1. WHAT THIS IS ────────────────────────────────────────────
          The page opens on the same ground this system owns in the home
          page's scene. That is the whole point of giving them grounds: a
          reader who scrolled through the clay room and then clicked into
          AI CMO should arrive somewhere they recognise. Five systems that
          each own a colour, and five pages that open in it. */}
      <section
        className="product-open"
        style={
          {
            "--field": product.field,
            "--field-deep": product.fieldDeep,
          } as React.CSSProperties
        }
      >
        {/* The same plate this system stands in on the home page, so a
            reader who scrolled past it and clicked through arrives in
            weather they recognise. */}
        <div className="product-open-art" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath(`/plate-${slug}-1536.webp`)}
            srcSet={`${withBasePath(`/plate-${slug}-1024.webp`)} 1024w, ${withBasePath(`/plate-${slug}-1536.webp`)} 1536w`}
            sizes="100vw"
            width={1536}
            height={768}
            alt=""
            fetchPriority="high"
          />
        </div>

        <div className="wrap product-hero">
          <Reveal className="product-eyebrow">
            <span className="stamp">{product.name}</span>
            <span className="stamp product-status">{product.status}</span>
          </Reveal>

          <Words as="h1" className="display-lg product-title" lines={[copy.h1]} />

          <Reveal delay={120}>
            <p className="lede product-lede">{product.sub}</p>
          </Reveal>

          <Reveal delay={200} className="hero-actions">
            <a className="btn btn-hard" href="#access">
              Request access
            </a>
            <a className="btn" href="#demo">
              Open the demo
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── 2. DRIVE IT ────────────────────────────────────────────────
          The frame carries the fictional-data disclosure on its face, so
          nobody has to hunt a footnote to know what they are looking at. */}
      <section className="section" id="demo" aria-labelledby="demo-title">
        <div className="wrap">
          <div className="movement-head">
            <Words id="demo-title" className="display-lg" lines={[copy.demoTitle]} />
            <Reveal delay={120}>
              <p className="lede">{copy.demoLede}</p>
            </Reveal>
          </div>
          <Reveal className="demo" delay={80}>
            <div className="demo-head">
              <span className="stamp">Scripted showcase · Fictional data</span>
              <span className="stamp">Runs entirely in this browser</span>
            </div>
            <div className="demo-body">{playground}</div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. ASK IT ──────────────────────────────────────────────────
          Split, because the showcase is a tall object and a full-width
          heading above it would push it off the screen. */}
      {scenario ? (
        <section className="section" aria-labelledby="chat-title">
          <div className="wrap">
            <div className="split">
              <div className="movement-head">
                <Words id="chat-title" className="display-lg" lines={[copy.chatTitle]} />
                <Reveal delay={120}>
                  <p className="lede">{copy.chatLede}</p>
                </Reveal>
              </div>
              <Reveal delay={160}>
                <ChatShowcase scenario={scenario} />
              </Reveal>
            </div>
          </div>
        </section>
      ) : null}

      {/* ── 4. WHAT IT COVERS ──────────────────────────────────────────
          Three claims as a ladder of rules. Three equal cards would put
          them in competition with each other; a ladder reads in order. */}
      <section className="section" aria-labelledby="covers-title">
        <div className="wrap">
          <div className="movement-head">
            <Words id="covers-title" className="display-lg" lines={[copy.coversTitle]} />
          </div>
          <Reveal className="claims" stagger>
            {copy.covers.map(([title, body]) => (
              <div className="claim-row" key={title}>
                <span className="claim-mark" aria-hidden />
                <div>
                  <h3 className="display display-sm" style={{ marginBottom: 8 }}>
                    {title}
                  </h3>
                  <p className="body" style={{ color: "var(--ghost)" }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 5. THE HONEST PART ─────────────────────────────────────────
          The limit, in the buyer's terms, before they have to ask for it.
          This section is the reason the rest of the page is believable. */}
      <section className="section" aria-labelledby="honest-title">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <Words id="honest-title" className="display-lg" lines={[copy.honestTitle]} />
          <Reveal delay={120}>
            <p className="body" style={{ marginTop: 28, fontSize: "1.08rem" }}>
              {copy.honest}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 6. ACCESS ──────────────────────────────────────────────────── */}
      <section className="section" id="access" aria-labelledby="access-title">
        <div className="wrap">
          <div className="split">
            <div className="movement-head">
              <Words id="access-title" className="display-lg" lines={[copy.accessTitle]} />
            </div>
            <Reveal delay={160}>
              <AccessForm preselect={slug} />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
