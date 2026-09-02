/* Every asset on a GitHub Pages project site must carry the /<repo> prefix.
   Miss it on one image and the page still returns 200 — it just renders
   without the photograph, which is how the crossing plate shipped blank.
   Nothing in the type system catches a string literal in a src attribute, so
   the exported HTML is checked instead: if a base path is in force, no asset
   reference may start at the root without it. */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
if (!base) {
  console.log("check-base-path: no base path in force, nothing to check");
  process.exit(0);
}

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (full.endsWith(".html")) files.push(full);
  }
})("out");

/* src/srcset/href pointing at a real asset extension, rooted but unprefixed */
const bad = /(?:src|srcset|href)\s*=\s*"(\/(?!\/)[^"]*?\.(?:webp|png|jpe?g|svg|gif|avif|mp4|webm|css|js|ico|woff2?))/gi;

const misses = [];
for (const file of files) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(bad)) {
    if (!m[1].startsWith(base + "/")) misses.push(`${file}: ${m[1]}`);
  }
}

if (misses.length) {
  console.error(`check-base-path: ${misses.length} asset(s) missing the "${base}" prefix:`);
  for (const miss of misses.slice(0, 20)) console.error("  " + miss);
  process.exit(1);
}
console.log(`check-base-path: every asset in ${files.length} page(s) carries "${base}"`);
