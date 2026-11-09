#!/usr/bin/env node
/**
 * Serves the static export in `out/` with the same routing rules as the
 * production Caddyfile (deploy/Caddyfile):
 *   - /work        → out/work.html        (clean URLs)
 *   - /work/       → 308 redirect to /work
 *   - unknown path → out/404.html with status 404
 *
 * Usage: npm run build && npm run preview   (http://localhost:4173)
 */
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "out");
const PORT = Number(process.env.PORT ?? 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

async function fileIfExists(filePath) {
  try {
    const info = await stat(filePath);
    return info.isFile() ? filePath : null;
  } catch {
    return null;
  }
}

function send(res, filePath, status = 200) {
  res.writeHead(status, {
    "Content-Type": TYPES[path.extname(filePath).toLowerCase()] ?? "application/octet-stream",
  });
  createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  let pathname = decodeURIComponent(url.pathname);

  if (pathname.length > 1 && pathname.endsWith("/")) {
    res.writeHead(308, { Location: pathname.slice(0, -1) + url.search });
    return res.end();
  }

  if (pathname === "/") pathname = "/index.html";
  const safe = path.normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const direct = path.join(ROOT, safe);

  const resolved =
    (await fileIfExists(direct)) ??
    (await fileIfExists(`${direct}.html`)) ??
    (await fileIfExists(path.join(direct, "index.html")));

  if (resolved) return send(res, resolved);
  return send(res, path.join(ROOT, "404.html"), 404);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`static preview → http://localhost:${PORT}  (serving ${ROOT})`);
});
