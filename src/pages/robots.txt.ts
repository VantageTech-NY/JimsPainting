import type { APIRoute } from "astro";
import { IS_DEMO, SITE_URL } from "../consts";

// Generated per environment (plan2.md 0.2 / 6.1). Demo stays out of all
// indexes; prod allows everyone, names the AI crawlers explicitly, and
// advertises the sitemap. Flipping SITE_URL flips this file at build.
const DEMO = `# DEMO / STAGING — keep this host out of search and AI indexes.
User-agent: *
Disallow: /
`;

const PROD = `User-agent: *
Allow: /

# AI crawlers — explicit allows
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap-index.xml
`;

export const GET: APIRoute = () =>
  new Response(IS_DEMO ? DEMO : PROD, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
