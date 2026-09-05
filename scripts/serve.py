"""Serve the static export with caching turned off.

`python3 -m http.server` sends Last-Modified and no Cache-Control, so a
browser that has seen the page once will keep serving its own copy and a
rebuild appears to change nothing. This is the same server with no-store on
every response, which is what you want while iterating on a static export.

    python3 scripts/serve.py [port]
"""

import functools
import http.server
import os
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "out")


class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        self.send_header("Pragma", "no-cache")
        super().end_headers()

    # A conditional request would still earn a 304 from the base class, so
    # the validators are dropped before it looks at them. `email.message`
    # headers have no `pop`; `__delitem__` is a no-op when absent.
    def send_head(self):
        del self.headers["If-Modified-Since"]
        del self.headers["If-None-Match"]
        return super().send_head()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
    handler = functools.partial(NoCache, directory=os.path.abspath(ROOT))
    print(f"serving {os.path.abspath(ROOT)} on http://localhost:{port} (no cache)")
    http.server.ThreadingHTTPServer(("", port), handler).serve_forever()
