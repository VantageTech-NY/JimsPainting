import type { APIRoute } from "astro";
import {
  BUSINESS,
  NAV,
  PAINT_BRANDS,
  SERVICES,
  SERVICE_TOWNS,
  SITE_URL,
} from "../consts";

// Generated at build from the single source of truth (plan2.md 6.2): phone,
// services, towns, and one entry per page. Email intentionally omitted.
const pageSummaries: Record<string, string> = {
  "/": "Overview, services, and how to get a free quote.",
  "/services/": "All painting and finishing services.",
  "/gallery/": "Photos of real Central Connecticut projects.",
  "/about/": "Jim's story, 20+ years, licensing and insurance.",
  "/faq/": "Common questions about quotes, prep, paint, and scheduling.",
  "/contact/": "Phone, quote form, and service area.",
};

export const GET: APIRoute = () => {
  const body = `# ${BUSINESS.name}

> ${BUSINESS.tagline} Licensed & insured (${BUSINESS.licenseLabel} #${BUSINESS.licenseNumber}), serving Central Connecticut for over 20 years.

## Services
${SERVICES.map((s) => `- [${s.title}](${SITE_URL}/services/${s.slug}/): ${s.blurb}`).join("\n")}

## Service area
Central Connecticut, including ${SERVICE_TOWNS.join(", ")}.

## Pages
${NAV.map((n) => `- [${n.label}](${SITE_URL}${n.href})${pageSummaries[n.href] ? `: ${pageSummaries[n.href]}` : ""}`).join("\n")}

## Contact
- Phone: ${BUSINESS.phone}
- Quote form: ${SITE_URL}/contact/
- Google Maps: ${BUSINESS.mapsUrl}

## Notes
- We use ${PAINT_BRANDS.join(" and ")} paints.
- Owner-operated. Calls and the quote form are the best ways to reach us.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
