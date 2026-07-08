import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { properties } from "@/lib/properties";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/browse", "/how-it-works", "/matchmaker", "/list-property", "/dashboard", "/contact"];
        const dynamic = properties.map((p) => `/property/${p.id}`);
        const urls = [...staticPaths, ...dynamic].map(
          (p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
