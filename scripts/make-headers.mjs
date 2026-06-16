// Generates dist/_headers after `astro build`. The noindex X-Robots-Tag is
// emitted only for the demo host — on prod it must be absent so the site can
// be indexed. Mirrors the SITE_URL flip used for robots.txt / sitemap / meta.
import { writeFile } from "node:fs/promises";

const SITE_URL = process.env.SITE_URL || "https://demo.jimspaint.com";
const IS_DEMO = SITE_URL !== "https://jimspaint.com";

const robots = IS_DEMO ? "\n  X-Robots-Tag: noindex, nofollow" : "";

const headers = `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; object-src 'none'; form-action 'self' https://formsubmit.co; frame-ancestors 'none'; base-uri 'self'${robots}

# Astro emits content-hashed assets under /_astro/ — safe to cache forever.
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/js/*
  Cache-Control: public, max-age=86400
`;

await writeFile("dist/_headers", headers);
console.log(`[make-headers] wrote dist/_headers (${IS_DEMO ? "demo: noindex" : "prod: indexable"})`);
