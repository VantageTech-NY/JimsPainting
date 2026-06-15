# Jim's Quality Painting — website (2.0)

Static, multi-page site for [Jim's Quality Painting](https://jimspaint.com),
built with [Astro](https://astro.build) and hosted free on Cloudflare. Zero
client-side framework; ships almost no JavaScript.

> **Branches.** The 2.0 site lives on **`demo-v2`** and deploys to
> **demo.jimspaint.com** (staging). The old v1 site is on **`main`** and serves
> production **jimspaint.com** until cutover (see [Cutover](#cutover)). Do all
> 2.0 work on `demo-v2`.

---

## Local development

Requires **Node 22** (see `.nvmrc`).

```bash
npm install
npm run dev       # local dev server at http://localhost:4321
npm run build     # production build to dist/
npm run preview   # serve the built dist/ locally
npm run check     # astro check (type/template diagnostics)
```

By default the site builds for the demo host. To preview a production build:

```bash
SITE_URL=https://jimspaint.com npm run build
```

### `SITE_URL` — one variable flips demo ↔ prod

`SITE_URL` (default `https://demo.jimspaint.com`) drives, at build time:

- canonical + Open Graph URLs and all JSON-LD URLs,
- the `noindex` meta + `X-Robots-Tag` (demo is hidden from search/AI),
- `robots.txt` (demo `Disallow: /`; prod permissive + AI-crawler allows),
- `llms.txt`, the contact form's redirect target,
- the sitemap (generated for **prod only**).

It's set as a build environment variable on the Cloudflare project.

---

## Project structure

```
src/
  consts.ts              Business facts: phone, email, license, towns,
                         SERVICES list, NAV, TESTIMONIALS  ← edit these
  data/
    services.ts          Per-service page copy + photos
    gallery.ts           Before/after gallery pairs
  layouts/BaseLayout.astro   <head>, schema, fonts, header/footer
  components/            Header, Footer, Icon, PhoneIcon, BeforeAfter (slider)
  pages/                 Routes (see below)
  styles/global.css      The whole design system (CSS custom properties)
  assets/photos/         Images processed by astro:assets at build
public/                  Served as-is: _headers, favicons, js/ (enhance.js,
                         gallery.js — small vanilla progressive enhancement)
asests_v2/               Full-res photo originals (not deployed; gitignored)
```

Pages: `/` · `/services/` + `/services/<slug>/` · `/gallery/` · `/about/` ·
`/contact/` · `/thanks/` · `/faq/` · `404`.

---

## Common edits

### Add a gallery before/after pair

1. Drop the two photos in `src/assets/photos/`. If they're `.heic` (iPhone),
   convert to `.jpg` first:
   ```bash
   sips -s format jpeg -s formatOptions 90 input.heic --out output.jpg
   ```
2. Add an entry to `GALLERY` in `src/data/gallery.ts` — import the two images
   and add `{ before, after, alt, cat }` where `cat` is `"exterior"`,
   `"interior"`, or `"cabinets"` (drives the filter).

That's it — the slider and filtering are automatic. `astro:assets` resizes and
converts to WebP at build.

### Add or change a testimonial

Edit `TESTIMONIALS` in `src/consts.ts` — each is `{ quote, author }`. They
render on the home page automatically.

### Edit services or business info

- **Service list / names / blurbs:** `SERVICES` in `src/consts.ts`.
- **Service page copy & photos:** `src/data/services.ts`.
- **Phone, email, license #, towns, paint brands:** `src/consts.ts`.

The contact form emails Jim via [FormSubmit](https://formsubmit.co). The first
real submission triggers a one-time activation email Jim must click before the
form starts delivering.

---

## Deploy

The Cloudflare project (**`jimspainting-v2`**, a Worker serving static assets)
builds from `demo-v2` on every push:

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`
- **Output:** `dist/` (see `wrangler.jsonc`)
- **Env var:** `SITE_URL=https://demo.jimspaint.com`

If a push doesn't deploy, trigger **Create deployment** in the Cloudflare
dashboard (Workers & Pages → jimspainting-v2 → Deployments).

> `_redirects` on Cloudflare static assets only allows **relative** URLs — the
> www→apex redirect must be a Cloudflare Redirect Rule, not `_redirects`.

---

## Cutover

When the owner has signed off on copy, photos, and design, see **Phase 7** in
`plan2.md`. In short: point `jimspaint.com` at this project (or set
`SITE_URL=https://jimspaint.com`), which auto-flips robots/sitemap/noindex, then
submit the sitemap in Search Console.
