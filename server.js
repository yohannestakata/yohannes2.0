import { serve } from "bun";
import { join } from "path";

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ttf": "font/ttf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    // Default to index.html if root
    if (path === "/") {
      path = "/index.html";
    }

    // Remove leading slash and serve from src directory
    const filePath = join(process.cwd(), "src", path);
    const file = Bun.file(filePath);

    // Check if file exists
    const exists = await file.exists();
    if (!exists) {
      console.log(`File not found: ${filePath} (requested: ${url.pathname})`);
      return new Response(`File not found: ${url.pathname}`, { status: 404 });
    }

    // Get MIME type from extension
    const ext = path.substring(path.lastIndexOf("."));
    const contentType = mimeTypes[ext] || "application/octet-stream";

    console.log(`Serving: ${path} -> ${filePath}`);
    return new Response(file, {
      headers: {
        "Content-Type": contentType,
      },
    });
  },
});

console.log("Server running at http://localhost:3000");
