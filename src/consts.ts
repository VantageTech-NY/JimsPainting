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
  phoneE164: "+18609779536", // for schema/telephone
  // Owner approved listing email (plan2.md 6.5). Obfuscated on the contact page;
  // plain in JSON-LD.
  email: "jim@jimspaint.com",
  region: "CT",
  country: "US",
  // HIC registration provided by owner (plan2.md "Updated information").
  licenseLabel: "CT HIC",
  licenseNumber: "0635666",
  mapsUrl: "https://maps.app.goo.gl/o1sANcZx5fbq9ogX8",
  reviewsUrl: "https://maps.app.goo.gl/o1sANcZx5fbq9ogX8", // "Read more on Google"
  tagline: "Residential & commercial painting in Central Connecticut.",
} as const;

// Real Google-review quotes provided by the owner (plan2.md 3.3 / 5.5).
// Verbatim — do not edit wording without owner sign-off.
export const TESTIMONIALS = [
  {
    quote:
      "My wife and I went back and forth for over a year on whether we should paint our cabinets. After seeing the finished product that Jim gave to us in less than a week we are disappointed we waited so long.",
    author: "Mike D.",
  },
  {
    quote:
      "Jim is truly the best painter I've ever worked with!!! His prices are extremely reasonable, but his work is perfection!",
    author: "Megan L.",
  },
  {
    quote:
      "I hired Jim to paint my two-story foyer and kitchen. His speed, precision and tidiness exceeded my expectations. The results speak for themselves, and I couldn't be happier with the outcome.",
    author: "Alexsandra C.",
  },
] as const;

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

// Canonical service offering — single source of truth for the Home preview,
// the /services/ index, per-service pages (/services/<slug>/), Service schema,
// and llms.txt. Blurbs are DRAFT copy (owner sign-off pending, plan2.md 5.7).
export const SERVICES = [
  {
    slug: "interior",
    title: "Interior painting",
    blurb: "Walls, trim, ceilings, and doors — clean cut lines and tidy work, room by room.",
  },
  {
    slug: "exterior",
    title: "Exterior painting",
    blurb: "Prep, prime, and finish that stands up to Connecticut winters.",
  },
  {
    slug: "cabinets",
    title: "Cabinet refinishing",
    blurb: "A durable, factory-smooth finish that makes tired kitchen cabinets look new.",
  },
  {
    slug: "deck-staining",
    title: "Deck staining",
    blurb: "Cleaning, prep, and stain that protects decks and fences from sun and weather.",
  },
  {
    slug: "board-and-batten",
    title: "Board & batten installation",
    blurb: "Board-and-batten accent walls and exterior siding, installed and finished.",
  },
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
