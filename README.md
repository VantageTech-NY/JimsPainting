# Jim's Quality Painting — website

Static one-page site for Jim's Quality Painting (https://jimspaint.com). Hosted free on Cloudflare Pages. Built on the Start Bootstrap "Grayscale" theme.

No build step, no server. Editing means changing files in this repo and pushing to `main` — Cloudflare Pages rebuilds and serves automatically.

---

## Stack

- **HTML / Bootstrap 5.2.3** — single-page layout in `index.html`, plus `thanks.html` (form success), `404.html` (not-found).
- **CSS** — `css/styles.css` (source, full theme + Bootstrap, ~247 KB) and `css/styles.min.css` (minified, shipped, ~202 KB). HTML references the `.min` file.
- **JS** — `js/scripts.js` (navbar shrink, scrollspy, mobile collapse, copyright year, email/phone link hydration). Plus Bootstrap bundle from jsdelivr CDN.
- **Form** — handled by [FormSubmit](https://formsubmit.co) (free; sends form to Jim's email).
- **Icons** — inline SVGs (Font Awesome free 6.3.0 paths). No external icon library loaded.
- **Fonts** — Google Fonts: Nunito (400, 700) + Varela Round, with `display=swap`.
- **Hosting** — Cloudflare Pages. `_headers` controls HTTP headers, `_redirects` controls URL redirects.

---

## Deploy

1. Commit and push to `main`.
2. Cloudflare Pages picks up the commit automatically, deploys, and serves at https://jimspaint.com.
3. Pull-request branches get preview URLs (`*.pages.dev`) — useful for testing before merging.

No build command — Pages just publishes the repo root as-is.

---

## Canonical domain

The apex `jimspaint.com` is canonical. `www.jimspaint.com` redirects to apex via `_redirects` (301). All metadata (`sitemap.xml`, `robots.txt`, `<link rel="canonical">`, `og:url`) uses apex.

If www isn't actually routed to Cloudflare Pages, the `_redirects` rule won't fire — handle that case in the Cloudflare dashboard with a redirect rule instead.

---

## Editing content

Most edits happen in `index.html`. Common targets:

| What to change             | Where                                                                 |
| -------------------------- | --------------------------------------------------------------------- |
| Headline / hero text       | `<header class="masthead">`                                            |
| Service descriptions       | The `<!-- Project N: ... -->` rows under `<section id="projects">`     |
| About Us copy              | `<section id="about-us">` → "About Us" col                             |
| Service-area town list     | `<section id="about-us">` → "Service Area" row (also update JSON-LD)   |
| Testimonials               | `<section id="about-us">` → "What Our Clients Say" cards               |
| FAQ                        | `<section id="faq">` → also update the `FAQPage` JSON-LD in `<head>` (and recompute the CSP hash) |
| Phone number               | `js/scripts.js` (`phoneLink` block) — change both `tel:` digits and display string |
| Email                      | `js/scripts.js` (`emailLink` block) — change `user` / `domain` vars    |
| Footer / copyright         | Year is dynamic (set by JS). Brand name is hard-coded in footer.       |
| Maps profile link          | Look for `maps.app.goo.gl/o1sANcZx5fbq9ogX8` (appears in HTML + JSON-LD) |

After editing any town list, copyright text, etc., the page will refresh on next deploy — no rebuild step needed.

### Editing the JSON-LD (structured data)

The `<script type="application/ld+json">` block in `<head>` of `index.html` powers Google's local-business knowledge panel (HousePainter schema).

If you edit it, **you must also recompute the CSP hash** in `_headers` (see "CSP hash" below) — otherwise the script will be blocked by the browser and Google will stop seeing the schema.

Validate the JSON with Google's Rich Results Test: https://search.google.com/test/rich-results

---

## Updating images

Originals live in `assets/img/originals/` (gitignored). The site ships only optimized WebP (and one OG JPG). All site image references use `.webp` paths.

To add or replace an image, on macOS:

```bash
# install once
brew install webp

# from repo root, e.g. replacing the hero
cp /path/to/new-hero.png assets/img/originals/jqp-hero.png
sips --resampleWidth 1600 assets/img/originals/jqp-hero.png --out /tmp/hero.png
cwebp -q 82 /tmp/hero.png -o assets/img/jqp-hero.webp
```

Then in HTML / CSS, update the `width`/`height` attributes to the new intrinsic size (run `sips -g pixelWidth -g pixelHeight assets/img/jqp-hero.webp`).

For the Open Graph image (`assets/img/jqp-open-graph.jpg`), keep it as **JPG at exactly 1200×630** — some social platforms (LinkedIn, older Slack) don't render WebP for OG.

Targets used: photos at q80 WebP, hero/featured at q82. Total image payload should stay under ~1 MB.

---

## CSS

`css/styles.css` is the source (full Bootstrap + theme). `css/styles.min.css` is what the site loads. To regenerate the minified file after editing the source:

```bash
npx --yes clean-css-cli@5 -o css/styles.min.css css/styles.css
```

The masthead background image path lives near line 11072 of `styles.css` — update there if the hero filename ever changes.

---

## Form (FormSubmit)

The "Get a Quote" form posts to `https://formsubmit.co/jim@jimspaint.com`. On success, FormSubmit redirects to `/thanks.html`.

**Activation:** the first time FormSubmit receives a submission for a new email address, FormSubmit sends Jim an activation email. He must click the link before any submissions will be delivered. After activation, submissions arrive normally.

**Anti-scraping note:** the plan suggests swapping the raw-email endpoint (`formsubmit.co/jim@jimspaint.com`) for the random-string version (`formsubmit.co/<hash>`) generated after first activation. Doing that hides Jim's real address from the page source. Current form still uses the raw-email endpoint — switch when convenient.

If FormSubmit ever proves unreliable, the fallback is a Cloudflare Pages Function (`/functions/api/contact.js`) using MailChannels — free on Cloudflare Pages.

---

## Security headers & CSP

Configured in `_headers` (Cloudflare Pages syntax). Includes:

- `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`.
- `Content-Security-Policy` (strict — no `'unsafe-inline'` for scripts).

### CSP hashes — important when editing JSON-LD

The CSP allows two inline scripts: the `HousePainter` JSON-LD and the `FAQPage` JSON-LD in `index.html` head. Each is permitted via its own SHA-256 hash in the `script-src` directive.

If you edit **either** JSON-LD block (even whitespace), recompute both hashes — the order in `_headers` matters less than getting the exact bytes right:

```bash
python3 -c "
import re, hashlib, base64, json
html = open('index.html').read()
for i, b in enumerate(re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', html, re.DOTALL), 1):
    h = base64.b64encode(hashlib.sha256(b.encode('utf-8')).digest()).decode()
    print(f'#{i} {json.loads(b)[\"@type\"]:14s} sha256-{h}')
"
```

Paste both `sha256-...` values into `_headers`, replacing the existing ones inside `script-src`.

If you forget, the browser blocks the affected JSON-LD and Google / AI crawlers stop seeing it — visible in DevTools as a CSP violation in the console.

### Adding new external resources

The CSP whitelist is narrow. If you add a new third-party (analytics, embedded map, etc.), update the matching directive in `_headers`:

| Resource type            | CSP directive       |
| ------------------------ | ------------------- |
| Script (CDN)             | `script-src`        |
| Stylesheet               | `style-src`         |
| Font file                | `font-src`          |
| Image / SVG              | `img-src`           |
| Form POST target         | `form-action`       |
| iframe target            | `frame-src`         |

---

## Analytics

Cloudflare Web Analytics is enabled at the Pages-project level (Cloudflare dashboard → Pages → jimspaint.com → Settings → Web Analytics). Cloudflare auto-injects the beacon script (`https://static.cloudflareinsights.com/beacon.min.js`) into every served page on deploy — no script tag in this repo.

The CSP in `_headers` already whitelists the script source (`script-src https://static.cloudflareinsights.com`) and the beacon POST target (`connect-src https://cloudflareinsights.com`). If Cloudflare ever changes the host or adds another endpoint, look in DevTools Console for the CSP violation and update those directives.

Cloudflare Web Analytics is cookieless and doesn't require a consent banner.

---

## Caching headers

Also in `_headers`:

- `/assets/*` → 1 year, immutable (rename files to bust cache when replacing)
- `/css/*`, `/js/*` → 1 week

Cloudflare Pages also invalidates by ETag on deploy, so a hard rename isn't always needed — but if an image is replaced in-place and looks stale, append a query string or rename it.

---

## SEO

- `sitemap.xml` lists only the homepage. Update `lastmod` (`YYYY-MM-DD`) when content meaningfully changes.
- `robots.txt` allows everything.
- Canonical URL in `<head>` points to apex.
- HousePainter JSON-LD covers areaServed, telephone, image, sameAs.

---

## Outstanding placeholders

Search the codebase for `TODO(jim)` to find inline markers. Currently:

- **Service-area town list** — currently a Hartford County placeholder. Confirm Jim's actual coverage and update both the JSON-LD `areaServed` array (`index.html` head) and the Service Area paragraph (`index.html` body, `<!-- Service Area. TODO(jim) -->`).
- **Street address & opening hours** in JSON-LD — currently only `addressRegion: CT`. Adding `streetAddress` + `postalCode` + `openingHours` unlocks richer Google rich results.

Not yet in code, but on the wishlist:

- **CT HIC registration number** — when available, add to JSON-LD as `identifier` and reference in the planned FAQ section.

---

## Local preview

To preview locally without deploying:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Note: `_headers` and `_redirects` only apply on Cloudflare. CSP violations only show in production / preview deploys.
