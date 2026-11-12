import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../out", import.meta.url)));
let basePath;
try { ({ basePath } = JSON.parse(await readFile(resolve(root, "preview-config.json"), "utf8"))); }
catch { throw new Error("Build the site first with npm run build, or use the supplied review package."); }
const port = Number(process.env.PORT || 4173);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".pdf": "application/pdf", ".bib": "text/plain; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".woff2": "font/woff2" };
const server = createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405).end(); return; }
  try {
    let pathname = decodeURIComponent(new URL(request.url, `http://127.0.0.1:${port}`).pathname);
    if (basePath && pathname === "/") { response.writeHead(302, { Location: `${basePath}/` }).end(); return; }
    if (basePath && pathname === basePath) { response.writeHead(301, { Location: `${basePath}/` }).end(); return; }
    if (basePath && !pathname.startsWith(`${basePath}/`)) { response.writeHead(404).end("Not found"); return; }
    pathname = pathname.slice(basePath.length);
    let path = resolve(root, `.${pathname}`);
    if (path !== root && !path.startsWith(root + sep)) { response.writeHead(403).end(); return; }
    if ((await stat(path)).isDirectory()) path = resolve(path, "index.html");
    const bytes = await readFile(path);
    response.writeHead(200, { "Content-Type": types[extname(path)] || "application/octet-stream", "Content-Length": bytes.length, "Cache-Control": "no-store" });
    response.end(request.method === "HEAD" ? undefined : bytes);
  } catch { response.writeHead(404, { "Content-Type": "text/plain" }).end("Not found"); }
});
server.listen(port, "127.0.0.1", () => console.log(`Local review: http://127.0.0.1:${port}${basePath}/\nPress Ctrl+C to stop.`));
