// Preview password gate (adapted from the Spectre Command dashboard's auth.ts).
// Two ways in:
//   1. HTTP Basic (`curl -u x:$PASS`) — for Claude sessions and checks.
//   2. Browser: minimal styled login → session cookie = SHA-256("spectre-site|"+pass),
//      30 days, HttpOnly. Rotating SITE_PASSWORD invalidates all cookies.
// Launch switch: set env PREVIEW_GATE=off → the gate passes everything through.

const COOKIE = "spectre_site";
const SALT = "spectre-site|";

function env(name: string): string | undefined {
  return (globalThis as unknown as { Netlify?: { env?: { get?: (k: string) => string | undefined } } })
    .Netlify?.env?.get?.(name);
}

function password(): string {
  return env("SITE_PASSWORD") ?? "spectre-preview";
}

async function token(pass: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(SALT + pass));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function cookieValue(request: Request): string {
  const raw = request.headers.get("cookie") ?? "";
  for (const part of raw.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === COOKIE) return v.join("=");
  }
  return "";
}

function basicOk(request: Request, pass: string): boolean {
  const header = request.headers.get("authorization") ?? "";
  if (!header.startsWith("Basic ")) return false;
  try {
    const decoded = atob(header.slice(6));
    return decoded.slice(decoded.indexOf(":") + 1) === pass;
  } catch {
    return false;
  }
}

function loginPage(error = false): Response {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>The Spectre</title><style>
body{background:#0a0a0a;color:#f5f5f3;font:15px/1.6 system-ui;display:grid;place-items:center;min-height:100vh;margin:0}
form{width:min(340px,88vw)}
.wm{letter-spacing:.34em;font-size:13px;margin-bottom:18px}
input{width:100%;background:#111;border:1px solid rgba(255,255,255,.1);border-radius:8px;color:#f5f5f3;padding:12px 14px;font-size:14px;box-sizing:border-box}
button{margin-top:10px;width:100%;background:#f5f5f3;color:#0a0a0a;border:none;border-radius:8px;padding:12px;font-weight:600;cursor:pointer}
.err{color:#c98a72;font-size:12px;margin-top:10px;font-family:monospace}
</style></head><body><form method="POST" action="/__login">
<div class="wm">THE&nbsp;SPECTRE</div>
<input type="password" name="password" placeholder="Password" autofocus>
<button>Enter</button>${error ? '<div class="err">Wrong password.</div>' : ""}
</form></body></html>`;
  return new Response(html, { status: 401, headers: { "content-type": "text/html; charset=utf-8" } });
}

export default async function gate(request: Request, context: { next: () => Promise<Response> }) {
  if (env("PREVIEW_GATE") === "off") return context.next();

  const pass = password();
  const url = new URL(request.url);

  if (url.pathname === "/__login" && request.method === "POST") {
    const form = await request.formData().catch(() => null);
    const attempt = String(form?.get("password") ?? "");
    if (attempt === pass) {
      const t = await token(pass);
      return new Response(null, {
        status: 302,
        headers: {
          location: "/",
          "set-cookie": `${COOKIE}=${t}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`,
        },
      });
    }
    return loginPage(true);
  }

  if (basicOk(request, pass)) return context.next();
  if (cookieValue(request) === (await token(pass))) return context.next();
  return loginPage();
}
