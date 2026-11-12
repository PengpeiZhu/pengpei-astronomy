#!/bin/zsh
# Double-click on macOS to review the supplied build. No npm install is needed.
cd -- "${0:A:h}" || exit 1
python3 - <<'PY'
import json
import webbrowser
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

root = Path('out').resolve()
if not (root / 'index.html').is_file():
    input('No built preview found. Run npm ci and npm run build first. Press Return to close.')
    raise SystemExit(1)
base = json.loads((root / 'preview-config.json').read_text())['basePath']

class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        path = urlsplit(self.path).path
        if base and path in ('/', base):
            self.send_response(302)
            self.send_header('Location', base + '/')
            self.end_headers()
            return
        if base:
            if not path.startswith(base + '/'):
                self.send_error(404)
                return
            self.path = self.path[len(base):]
        super().do_GET()

# Port 0 asks the OS for a free local port and avoids colliding with other previews.
with ThreadingHTTPServer(('127.0.0.1', 0), partial(Handler, directory=str(root))) as server:
    address = f'http://127.0.0.1:{server.server_port}{base}/'
    print(f'Local website review: {address}\nKeep this window open while reviewing. Press Ctrl+C to stop.', flush=True)
    webbrowser.open(address)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
PY
