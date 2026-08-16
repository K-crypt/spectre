import { Reveal, Stamp } from "@/components/ui";
import { WaitlistForm } from "@/components/interactive";
import { RidgeEcho } from "@/components/atmosphere";
import { RoundTable } from "@/components/roundtable";
import { Day } from "@/components/day";
import { withBasePath } from "@/lib/base-path";

export default function Home() {
  return (
    <main>
      {/* ── HERO — the business problem, before the product architecture ── */}
      <section className="mountain-hero hairline-b" aria-labelledby="hero-title">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBasePath("/mountain-hero-scenery.webp")} alt="A quiet mountain range rising through fog at first light" />
        <div className="mountain-hero-scrim" />
        <div className="mountain-hero-copy">
          <span className="mono rt-hero-kicker">SPECTRE · FOR FOUNDER-LED BUSINESSES</span>
          <h1 className="display hero-line" id="hero-title">Automate what can be. Focus on what can&apos;t.</h1>
          <p className="hero-positioning-note">Spectre learns how your company works, connects the context across it, and prepares the decisions that follow.</p>
          <strong className="display">They prepare. You decide.</strong>
          <div className="rt-hero-actions">
            <a href="#access" className="btn btn-hard">Discuss a design partnership</a>
            <a href="#proof" className="btn btn-soft">See the proof</a>
          </div>
          <div className="hero-compact-signal mono">YOUR WORKFLOWS · YOUR CONTEXT · YOUR FINAL YES</div>
        </div>
      </section>

      <div className="landing-lower">
      {/* ── SIGNAL — real-world proof before the product explanation ── */}
      <section className="lower-section signal-section" id="proof" aria-labelledby="signal-title">
        <div className="wrap signal-wrap">
          <Reveal>
            <div className="signal-heading">
              <div>
                <Stamp>OPERATING IN THE REAL WORLD</Stamp>
                <h2 className="display lower-title" id="signal-title">Built inside businesses, not in a demo lab.</h2>
              </div>
              <p className="lower-deck">Three working environments. One principle: understand the business before asking AI to act inside it.</p>
            </div>
          </Reveal>
          <div className="signal-ledger">
            <Reveal delay={50}>
              <a className="signal-item signal-item-lead" href="#factory">
                <span className="mono signal-index">01 · MANUFACTURING PILOT</span>
                <strong className="display">A capacity decision, prepared before commitment.</strong>
                <span>≈400 machines mapped so management can test constraints, purchases, and order promises together.</span>
                <em>View the case study →</em>
              </a>
            </Reveal>
            <Reveal delay={100}>
              <div className="signal-item">
                <span className="mono signal-index">02 · IN PRODUCTION</span>
                <strong className="display">1 live export business</strong>
                <span>running its marketing operation through Spectre</span>
                <em>Carpetstory · as of Jul 2026</em>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="signal-item">
                <span className="mono signal-index">03 · DELIVERED</span>
                <strong className="display">1 verified research program</strong>
                <span>with every load-bearing claim challenged and re-sourced</span>
                <em>Market-entry study · Jul 2026</em>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── THE EXECUTIVE TEAM — one shared operating layer, five specialist modules ── */}
      <section className="lower-section modules-section" id="modules" aria-labelledby="modules-title">
        <div className="wrap modules-heading">
          <Reveal>
            <Stamp>THE EXECUTIVE TEAM</Stamp>
            <h2 className="display lower-title" id="modules-title">Meet the table.</h2>
            <p className="lower-deck">Specialist modules working from one shared company context. Choose a role to see what it prepares—and where human authority begins.</p>
          </Reveal>
        </div>
        <section className="mountain-journey modules-journey" id="table">
          <RoundTable modulesOnly />
        </section>
      </section>

      {/* ── THE DAY — the spine ── */}
      <section className="lower-section day-section" id="day">
        <div className="wrap lower-wrap">
          <Reveal>
            <Stamp>ONE TUESDAY WITH SPECTRE</Stamp>
            <h2 className="display lower-title">A day of prepared work. One point of judgment.</h2>
          </Reveal>
          <Reveal delay={80}>
            <Day />
          </Reveal>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="lower-section how-section" id="how" aria-labelledby="how-title">
        <div className="wrap lower-wrap">
          <Reveal>
            <Stamp>HOW SPECTRE LEARNS THE BUSINESS</Stamp>
            <h2 className="display lower-title" id="how-title">It understands before it acts.</h2>
            <p className="lower-deck">Context, evidence, permissions, and a visible boundary between prepared work and human authority.</p>
          </Reveal>
          <div className="how-grid">
            {[
              ["01", "Understand", "Map the workflow, data, rules, language, exceptions, and decision owner."],
              ["02", "Prepare", "Monitor the work, test scenarios, and assemble a recommendation."],
              ["03", "Explain", "Show the evidence, assumptions, uncertainty, and consequences."],
              ["04", "Stage", "Hold consequential work in a visible, reviewable queue."],
              ["05", "Human decides", "Sending, spending, publishing, and operating changes wait for approval."],
            ].map(([number, title, copy], index) => (
              <Reveal delay={60 + index * 55} key={number}>
                <article className="how-step">
                  <span className="mono">{number}</span>
                  <h3 className="display">{title}</h3>
                  <p>{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={260}>
            <div className="trust-line">
              <span className="mono">THE OPERATING RULE</span>
              <p className="display">The machine prepares. The human decides.</p>
              <small>Clear permissions · visible sources · logged approvals · reversible actions</small>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FACTORY CASE STUDY — the strongest wedge ── */}
      <section className="lower-section factory-section" id="factory" aria-labelledby="factory-title">
        <div
          className="factory-mountain"
          style={{ backgroundImage: `url("${withBasePath("/mountain-table-master-v4.webp")}")` }}
          aria-hidden
        />
        <div className="wrap lower-wrap factory-wrap">
          <Reveal className="factory-copy">
            <Stamp>CASE STUDY · MANUFACTURING</Stamp>
            <h2 className="display factory-title" id="factory-title">From machine data to a decision management could verify.</h2>
            <p className="factory-lede">The pilot maps roughly 400 machines so an order can be tested against capacity before the business commits.</p>
            <p className="factory-body">In one capacity exercise, Spectre surfaced a two-machine requirement that management had independently reached. It is an encouraging pilot result—not a claim of universal accuracy—and the recommendation still waited for human judgment.</p>
            <div className="factory-guardrail mono">PILOT BUILD · CLIENT NAMED ON PERMISSION · NO PURCHASE OR SCHEDULE CHANGE EXECUTES WITHOUT HUMAN APPROVAL</div>
          </Reveal>
          <Reveal delay={100} className="factory-system">
            <div className="system-window">
              <div className="system-top mono"><span>LIVE OPERATING PICTURE</span><span>PILOT / 01</span></div>
              <div className="system-metric"><strong className="display">≈400</strong><span>machines mapped</span></div>
              <div className="system-flow" aria-label="How an order moves through the operating layer">
                <div><span>01</span><strong>ORDER</strong><small>requirements read</small></div>
                <i aria-hidden>→</i>
                <div><span>02</span><strong>CAPACITY</strong><small>constraints tested</small></div>
                <i aria-hidden>→</i>
                <div><span>03</span><strong>PLAN</strong><small>decision staged</small></div>
              </div>
              <div className="system-decision"><span className="mono">READY FOR HUMAN JUDGMENT</span><p>One bottleneck identified. Purchase list and revised schedule prepared. Nothing ordered.</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CARPETSTORY — internal proving ground ── */}
      <section className="lower-section carpet-section" aria-labelledby="carpet-title">
        <div className="wrap lower-wrap carpet-wrap">
          <Reveal>
            <Stamp>CASE STUDY · EXPORT</Stamp>
            <h2 className="display lower-title" id="carpet-title">A live export business, coordinated through shared context.</h2>
            <p className="lower-deck">Carpetstory tests brand memory, content, outreach, ad review, and reporting in real weekly work.</p>
            <a href="https://carpetstory.one" className="mono carpet-link">VISIT CARPETSTORY ↗</a>
          </Reveal>
          <Reveal delay={100}>
            <div className="carpet-ledger">
              <div><span className="mono">01</span><strong>Brand context</strong><small>Voice and commercial judgment remembered</small></div>
              <div><span className="mono">02</span><strong>Work prepared</strong><small>Content, outreach, ads, and numbers assembled</small></div>
              <div><span className="mono">03</span><strong>Founder approval</strong><small>One review queue before anything moves</small></div>
              <p className="mono">IN PRODUCTION · AS OF JUL 2026 · NO CLIENT DATA SHOWN</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── THE MEANING ── */}
      <section className="lower-section why-sec">
        <RidgeEcho />
        <div className="wrap lower-wrap why-wrap">
          <Reveal>
            <Stamp>WHY WE BUILD</Stamp>
            <p className="display why-statement">
              Some things should never be automated: your judgment, your taste, the
              relationships that carry your name.
              <br />
              <span style={{ color: "var(--ghost)" }}>
                Everything else is workload, and taking workload off you is what we are for.
              </span>
            </p>
          </Reveal>
          <Reveal delay={90}>
            <p className="display why-close">
              No good business is run alone. The best help just stopped being only human.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── ACCESS ── */}
      <section className="lower-section access-section" id="access">
        <div className="wrap lower-wrap access-grid">
          <div>
          <Reveal>
            <Stamp>DESIGN PARTNERSHIPS</Stamp>
            <h2 className="display lower-title">Bring one consequential workflow.</h2>
            <p className="lower-deck">A focused engagement, measured against real work—not a generic software rollout.</p>
            <div className="partnership-steps" aria-label="Design partnership process">
              {[
                ["01", "Bring it"],
                ["02", "Map it"],
                ["03", "Configure Spectre"],
                ["04", "Run real work"],
                ["05", "Measure the outcome"],
              ].map(([number, label]) => <span key={number}><b className="mono">{number}</b>{label}</span>)}
            </div>
          </Reveal>
          </div>
          <Reveal delay={80}>
            <div className="access-panel">
            <WaitlistForm />
            <div className="mono" style={{ fontSize: 11, color: "var(--ghost)", marginTop: 20 }}>
              SELECTIVE PILOTS · DIRECT FOUNDER INVOLVEMENT · HUMAN APPROVAL BY DESIGN
            </div>
            </div>
          </Reveal>
        </div>
      </section>
      </div>
    </main>
  );
}
