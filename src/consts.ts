// Single source of truth for site-wide config and business data.
// Astro `.astro` frontmatter runs in Node at build time, so process.env works
// here and matches the SITE_URL read in astro.config.mjs (plan2.md 1.2).

export const PROD_URL = "https://jimspaint.com";

export const SITE_URL = process.env.SITE_URL || "https://demo.jimspaint.com";

/** True on any non-prod host — gates noindex headers/meta + sitemap (plan2.md 0.2). */
export const IS_DEMO = SITE_URL !== PROD_URL;

export const BUSINESS = {
  name: "Jim's Quality Painting",
  shortName: "Jim's Quality Painting",
  phone: "(860) 977-9536",
  phoneHref: "tel:+18609779536",
  // HIC registration provided by owner (plan2.md "Updated information").
  licenseLabel: "CT HIC",
  licenseNumber: "0635666",
  mapsUrl: "https://maps.app.goo.gl/o1sANcZx5fbq9ogX8",
  tagline: "Residential & commercial painting in Central Connecticut.",
} as const;

// Paint brands the owner actually uses (service-page copy, about, FAQ).
export const PAINT_BRANDS = ["Benjamin Moore", "Sherwin-Williams"] as const;

// Towns the owner wants to serve (plan2.md "Updated information").
export const SERVICE_TOWNS = [
  "Southington",
  "Berlin",
  "Cheshire",
  "West Hartford",
  "Newington",
  "Wethersfield",
  "Wolcott",
  "Hamden",
  "Farmington",
  "Avon",
] as const;

// Primary nav — drives Header and (later) sitemap (plan2.md Phase 2 IA).
export const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "About", href: "/about/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
] as const;
