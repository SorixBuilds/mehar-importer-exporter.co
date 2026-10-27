# Mehar Importer & Exporter Co. — Website Upgrade Report

**Prepared:** 27 Oct 2026 · Static SPA for Hostinger shared hosting
**Repo:** `horizons-export-43897551-…/apps/web` · **Build output:** `dist/apps/web/client/`

---

## 1. Summary

The exported project was a **server-rendered (SSR) e-commerce app** — React Router v8 with `ssr: true`, a PocketBase backend, cart/checkout, and dynamic product loaders. That architecture is **wrong for a quotation-led B2B exporter** and **cannot run on Hostinger shared hosting** (no Node/PocketBase at runtime).

It has been transformed **in place** into a fast, honest, single-page **static marketing site** on the same proven toolchain (Vite + React 19 + TypeScript + Tailwind + framer-motion), built as a **static SPA with prerendered HTML** per route. All retail/SSR scaffolding was removed. A PHP contact endpoint and an Apache `.htaccess` were added for shared hosting.

**Status:** Build ✓, typecheck ✓, lint ✓, functional + responsive + accessibility testing ✓ (in real Chromium). Not yet deployed. `contact.php` could not be executed locally (no PHP runtime on this machine) — it must be tested on the server.

---

## 2. Key architecture decision

| | Before | After |
|---|---|---|
| Rendering | SSR (`ssr: true`) | **Static SPA** (`ssr: false`) + prerender |
| Backend | PocketBase + Node | **None** (static files + one PHP script) |
| Model | Retail cart/checkout | **Quotation-led** (WhatsApp + enquiry form) |
| Routes | shop, category, product, cart, checkout, faq, api/*, resource routes | home, privacy-policy, terms, 404 |
| Output | Node server bundle | `dist/apps/web/client/` → upload to `public_html` |

`react-router.config.ts` now prerenders `/`, `/privacy-policy`, `/terms-and-conditions` to **real HTML files** (full content in the HTML for SEO), plus a `__spa-fallback.html` for any other path handled client-side.

---

## 3. Verified business facts (used site-wide, from the business card)

- WhatsApp / business: **+92 313 8396554** (`wa.me/923138396554`)
- Office landline: **+92 81 2080958**
- Email: **mehar.zaheer403@gmail.com**
- Address: **Office No. 12, Hussain Center, Sarai Namak, Alamdar Road, Quetta, Balochistan, Pakistan**
- Owner/Founder: **Zaheer Abbas**
- Products (9): Red Onions, White Onions, Potatoes, Garlic, Ginger, Lady Finger (Okra), Mangoes, Oranges (Kinnow), Grapes
- Intended markets (labelled as **intended**, not proven): UAE, UK, Europe, Malaysia, Indonesia

The old `data/brand.ts` had **wrong** contact details (wrong address, wrong phone `+92 345 7896554`) — all corrected in `src/data/site.ts`.

---

## 4. Sections built (single page + legal)

Nav → Hero → Trust strip → Products (9 cards) → Export packaging → About (founder) → How We Work → Markets → Contact/Enquiry → Footer. Plus `/privacy-policy`, `/terms-and-conditions`, and a 404.

- **Hero:** cinematic port LCP image, deep-green gradient, staggered headline mask-reveal, rotating product word (Onions→Potatoes→Mangoes→Grapes→Garlic), orange "Request a Quote on WhatsApp" + outline "View Our Products". Nav is transparent over the hero and solidifies to green on scroll.
- **Products:** each card has a real/sourced photo, B2B blurb, a spec row (Grade/Size/Packing/Season = **"Confirmed on enquiry"**, Origin = Pakistan), and a **product-specific prefilled WhatsApp** CTA.
- **Packaging:** showcases the owner's branded export cartons/sacks ("Product of Pakistan").
- **Markets:** intended-markets chips + a lightweight inline-SVG trade-route graphic, clearly labelled **"Intended markets… not a claim of completed shipments."**
- **Contact:** WhatsApp (primary), landline `tel:`, email, address, and a validated enquiry form.

All animations are GPU transform/opacity only and wrapped in `useReducedMotion` → static fallback.

---

## 5. Honesty / no-fabrication notes

- No certifications, export volumes, years in business, or overseas customers are claimed anywhere.
- Product specs are **placeholders** ("Confirmed on enquiry"), never invented values.
- The owner/facility images supplied are **AI-generated brand concept art** (garbled wall text, composite shelves). They are used as **illustrative** imagery with neutral captions (e.g. "Grading & sorting", "Quality inspection") — never captioned as a specific, verifiable Mehar facility. An "images are illustrative" note appears in the Products section and About copy.
- The hero port photo is generic stock-style port imagery (contains third-party shipping-line containers) — used atmospherically, never captioned as "our shipment".

---

## 6. Images — sources & licenses

**Client-supplied** (from the brand-assets folder), optimized to responsive WebP in `src/assets/`:
- Produce: red onion, white onion, potatoes, garlic, ginger, okra, mango.
- Packaging: red-onion carton/sack, kinnow box, potato, ginger, mango, okra.
- Facility/atmosphere: PACKING LINE, CARGO SHIPS & PORT (hero), QUALITY INSPECTION, CONTAINER LOADING, REEFER, WAREHOUSE.
- Logo + favicon + Apple touch icon + OG image.

**Sourced** (two gaps: no grapes photo, no plain-oranges photo). Both from **Pexels — Pexels License: free for commercial use, no attribution required** (verified on the license page at download time):
| Product | Source | License |
|---|---|---|
| Grapes | https://www.pexels.com/photo/fresh-green-grapes-on-rustic-wooden-table-39081548/ | Pexels License (free commercial, no attribution) |
| Oranges | https://www.pexels.com/photo/fresh-oranges-in-cardboard-boxes-at-market-40495543/ | Pexels License (free commercial, no attribution) |

All images: converted to WebP, responsive variants (400/800 for products, 768/1280/1672 for hero, etc.), explicit `width`/`height` to prevent CLS, descriptive `alt`, lazy-loaded below the fold, hero preloaded.

---

## 7. Shared-hosting support files (in `public/`, shipped to the web root)

- **`.htaccess`** — force HTTPS, SPA + prerendered-HTML routing, gzip/brotli, 1-year immutable cache for hashed assets, `no-cache` for HTML, security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS) and a CSP compatible with the bundle, Google Fonts, WhatsApp links and `data:` images.
- **`contact.php`** — validates + sanitizes inputs (header-injection safe), **honeypot** field, **file-based per-IP rate limiting** (5 / 10 min), emails the owner, returns JSON. Swap to PHPMailer/SMTP or Formspree if `mail()` deliverability to Gmail is poor on the host.
- **`robots.txt`** and **`sitemap.xml`** (static).

---

## 8. Tests actually run (real results)

| Check | Result |
|---|---|
| Production build (`react-router build`) | ✅ passes, prerenders 3 routes + SPA fallback |
| TypeScript (`tsc --noEmit`) | ✅ 0 errors (fixed 1 generic-component typing issue) |
| Lint (`oxlint`) | ✅ 0 errors |
| Hydration / console errors (Chromium) | ✅ none (only an expected 501 when POSTing to the Python preview server, which can't run PHP) |
| Enquiry form — empty submit | ✅ 5 inline field errors, blocks submit |
| Enquiry form — valid submit | ✅ POSTs JSON to `/contact.php`, graceful error state on failure |
| Mobile menu | ✅ opens, links stack, **Esc closes**, scroll-locks body, **focus returns to toggle** |
| Legal pages (`/privacy-policy`) | ✅ prerendered, correct title/content |
| Horizontal overflow @ 375px & 1280px | ✅ none |
| Accessibility (DOM audit) | ✅ exactly 1 `<h1>`, correct heading order, all images have `alt` (2 decorative logos empty), all links/buttons named |
| Colour contrast (WCAG AA) | ✅ after fixes: primary button 6.21, WhatsApp button 5.39, spec label 5.49, product k-text 8.64, body 17.2 (all ≥ 4.5) |

**Could NOT test locally:** `contact.php` execution (no PHP CLI on the build machine) and real Core Web Vitals (no Lighthouse/CrUX). See §9 and §12.

---

## 9. Performance (measured payload — CWV to verify on the server)

- Home HTML is **prerendered** (content paints without waiting for JS).
- Hero is the LCP element: **preloaded**, `fetchpriority="high"`, WebP ~**183 KB** (1280w).
- JavaScript (gzipped, all route chunks combined): **~216 KB**; the home page loads a subset (React 19 + React Router + framer-motion). CSS ~**16 KB** gzipped. Total deployable: **~3.6 MB** (mostly images, all lazy except hero).
- No CLS expected (explicit image dimensions, fonts with `display=swap`).

**I have not measured Lighthouse/CrUX scores and will not invent them.** The design targets LCP ≤ 2.5s / INP ≤ 200ms / CLS ≤ 0.1; run Lighthouse against the live HTTPS URL after deploy to confirm, and check PageSpeed Insights/CrUX for field data once traffic exists.

---

## 10. Security & SEO

**Security:** HTTPS forced; security headers + CSP via `.htaccess`; `contact.php` validates/sanitizes server-side with honeypot + rate limiting; no secrets in the client bundle; all external links use `rel="noopener noreferrer"`; no auth/DB added. (CSP uses `'unsafe-inline'` for scripts/styles — required by the router's hydration script and framer-motion inline styles on a static host with no nonce.)

**SEO:** unique `<title>`/meta description per route, one H1/page, canonical + Open Graph + Twitter tags, `Organization` + `ItemList`/`Product` JSON-LD (**no fake ratings/reviews**), `robots.txt`, `sitemap.xml`, product + geo keywords. Set the real production domain in `src/data/site.ts` (`SITE.origin`) and `public/sitemap.xml` / `public/robots.txt` if it differs from `mehar-importer-exporter-co.com`.

---

## 11. Owner confirmations still needed (non-blocking)

1. **Email** — using `mehar.zaheer403@gmail.com` (from the card). Confirm, or supply a domain mailbox (improves deliverability; update `RECIPIENT` in `contact.php` and `SITE.email`).
2. **Product specs** — grade/size/packing/season are shown as "Confirmed on enquiry". Provide real values only if you want them published (we will not fabricate).
3. **Facility imagery** — the supplied owner/warehouse images are AI-generated. If real photos exist, send them to replace the illustrative ones.
4. **Domain** — confirm the final domain so canonical/sitemap/CSP match.

---

## 12. Deployment (Hostinger shared hosting)

**Build**
```bash
cd apps/web
npm run build        # outputs dist/apps/web/client/
```
(If `react-router` fails on a path with spaces, run: `node ../../node_modules/@react-router/dev/bin.cjs build`.)

**Upload**
1. Back up the current `public_html` (download it, or rename to `public_html_backup_YYYYMMDD`) — this is your rollback.
2. Upload the **entire contents of `dist/apps/web/client/`** into `public_html` via FTP/File Manager — including the hidden **`.htaccess`**, **`contact.php`**, `robots.txt`, `sitemap.xml`, `index.html`, the `assets/` folder, and the `privacy-policy/` & `terms-and-conditions/` folders.
3. Ensure `.htaccess` is at the web root (enable "show hidden files" in File Manager).

**Verify on the live site**
- `https://<domain>/` loads over HTTPS (http → https redirect works), hero + all sections render.
- `/privacy-policy` and `/terms-and-conditions` load directly (not just via in-page clicks), and a random URL shows the 404.
- Submit the enquiry form → owner inbox receives the email and the page shows the success state. If mail doesn't arrive, check hosting mail settings / spam, or switch `contact.php` to PHPMailer+SMTP or Formspree.
- Each product's WhatsApp button opens a chat with the prefilled message.
- Run Lighthouse on the live URL and record the real scores.

**Rollback:** restore the backed-up `public_html` (delete the new files, re-upload the backup).

---

## 13. Notable files

**Added:** `src/data/site.ts`, `src/lib/assets.ts`, `src/components/reveal.tsx`, `src/components/home/{hero,trust-strip,products,packaging,about,how-we-work,markets,contact}.tsx`, `src/routes/legal.tsx`, `public/.htaccess`, `public/contact.php`, `public/robots.txt`, `public/sitemap.xml`, `src/assets/*` (optimized images).
**Rewritten:** `src/root.tsx`, `src/routes.ts`, `src/routes/home.tsx`, `src/routes/not-found.tsx`, `src/components/{site-header,site-footer,enquiry-form}.tsx`, `src/index.css`, `react-router.config.ts`.
**Removed (retail/SSR):** all `*.server.ts`, PocketBase client, `api/ecommerce-api.ts`, cart/checkout/shop/category/product/faq/information routes & components, `data/brand.ts`, `data/pages.ts`, dev preview scripts, `public/checkout/`.
