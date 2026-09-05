"use client";

import { useState } from "react";
import { PRODUCTS_DATA } from "@/lib/products";

/* ── The enquiry ───────────────────────────────────────────────────────────
   A Netlify Form, which is what lets a static export take a submission with
   no backend and no key in the bundle.

   The form name and every field name below are load-bearing: they are the
   column headings in the Netlify submissions table and in whatever reads it
   downstream. They are unchanged from the previous build on purpose. The
   markup around them is new; `design-partner`, `products`, `company`,
   `email`, `first` and `source` are not.

   Labels sit above inputs and every one of them is real. The placeholder is
   an example, never the label.
   ───────────────────────────────────────────────────────────────────────── */

export function AccessForm({ preselect }: { preselect?: string }) {
  const [picked, setPicked] = useState<string[]>(preselect ? [preselect] : []);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  function toggle(slug: string) {
    setPicked((p) => (p.includes(slug) ? p.filter((x) => x !== slug) : [...p, slug]));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set("products", picked.join(", "));
    setState("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="card" style={{ padding: 28, maxWidth: 560 }}>
        <p className="stamp stamp-ruby" style={{ marginBottom: 12 }}>
          Received
        </p>
        <p className="body">
          Thank you. We will read the operation you described and reply personally
          within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      className="form"
      name="design-partner"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
    >
      <input type="hidden" name="form-name" value="design-partner" />
      <p hidden>
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <fieldset className="field" style={{ border: 0, margin: 0, padding: 0 }}>
        <legend className="field-label" style={{ padding: 0 }}>
          Where should the operating layer start?
        </legend>
        <div className="field-chips" style={{ marginTop: 8 }}>
          {PRODUCTS_DATA.map((p) => (
            <button
              key={p.slug}
              type="button"
              className="chip"
              data-on={picked.includes(p.slug)}
              aria-pressed={picked.includes(p.slug)}
              onClick={() => toggle(p.slug)}
            >
              {p.short}
            </button>
          ))}
        </div>
      </fieldset>
      <input type="hidden" name="products" value={picked.join(", ")} />

      <div className="field">
        <label className="field-label" htmlFor="ws-company">
          Company or website
        </label>
        <input
          id="ws-company"
          name="company"
          type="text"
          required
          autoComplete="organization"
          placeholder="Carpetstory, or carpetstory.one"
        />
      </div>

      <div className="field">
        <label className="field-label" htmlFor="ws-email">
          Work email
        </label>
        <input
          id="ws-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
        />
      </div>

      <div className="field">
        <label className="field-label" htmlFor="ws-first">
          Which operation should we understand first?
        </label>
        <input
          id="ws-first"
          name="first"
          type="text"
          required
          placeholder="Order feasibility before we commit to a delivery date"
        />
      </div>

      <input type="hidden" name="source" value="website-private-working-session" />

      <div className="form-foot">
        <span className="mono form-note">ALL FIELDS REQUIRED</span>
        <button className="btn btn-hard" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending" : "Request access"}
        </button>
      </div>

      <p className="mono form-note" style={{ marginTop: -6 }}>
        NO AUTOMATED SALES SEQUENCE. WE REPLY WITHIN 48 HOURS, PERSONALLY.
      </p>

      {state === "error" ? (
        <p className="form-error" role="alert">
          That did not send. Email{" "}
          <a href="mailto:access@thespectre.one" style={{ textDecoration: "underline" }}>
            access@thespectre.one
          </a>{" "}
          instead and we will pick it up from there.
        </p>
      ) : null}
    </form>
  );
}
