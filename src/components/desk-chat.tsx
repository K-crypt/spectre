"use client";

import { useEffect, useState } from "react";
import { ChatShowcase } from "@/components/chat-showcase";
import { SCENARIOS } from "@/lib/chat-scenarios";

/* ── The specialist at work, beside the headline ──────────────────────────
   The chapter's heading had a whole screen of empty velvet next to it, and
   an empty screen on a page about a machine that is already working is the
   wrong argument. This is the same scripted showcase the product pages run —
   the one thing on the site that shows a specialist reading, drafting,
   staging and then waiting — set where the emptiness was.

   It follows the lineup: open a card below and the transcript switches to
   that specialist and replays, so the heading, the card and the transcript
   are always talking about the same product. Nothing here is live data; the
   scenarios are fictional and labelled as such inside the card.
   ───────────────────────────────────────────────────────────────────────── */

export function DeskChat() {
  const [slug, setSlug] = useState("pa");

  useEffect(() => {
    const onOpen = (e: Event) => {
      const next = (e as CustomEvent<string | null>).detail;
      if (next && SCENARIOS[next]) setSlug(next);
    };
    window.addEventListener("spectre:open", onOpen);
    return () => window.removeEventListener("spectre:open", onOpen);
  }, []);

  return (
    <div className="desk-chat">
      {/* Keyed on the slug so switching specialists remounts the showcase and
          it plays from the first beat rather than resuming mid-transcript. */}
      <ChatShowcase key={slug} scenario={SCENARIOS[slug]} />
    </div>
  );
}
