// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// One variable flips demo -> prod (plan2.md 1.2). The Cloudflare Pages project
// sets SITE_URL as a build env var; locally it falls back to the demo host.
const SITE_URL = process.env.SITE_URL || "https://demo.jimspaint.com";
const IS_DEMO = SITE_URL !== "https://jimspaint.com";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // No sitemap on the demo host — keep staging out of search (plan2.md 0.2).
  // Generated only for prod; the prod robots.txt advertises it.
  integrations: IS_DEMO ? [] : [sitemap()],
  // Static output (default). Zero client JS unless a page opts in.
  build: {
    // Emit per-page directories (/services/interior/) — clean URLs for the
    // multi-page IA in plan2.md Phase 2.
    format: "directory",
    // Keep all CSS in external files (no inline <style>) so the CSP can stay
    // `style-src 'self'` without 'unsafe-inline' (plan2.md Phase 4).
    inlineStylesheets: "never",
  },
});
