# LEIZOUN ENERGY — Website

Premium marketing site for LEIZOUN ENERGY, a lithium battery technology company.
**Lithium Power. Limitless Future.**

Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**. Dark-first, derived
entirely from the brand logo (brushed metal, electric-blue energy seam, forward-shear
geometry, Bank-Gothic-style display type).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes prerendered)
npm run lint
```

## Pages

| Route | Description |
|---|---|
| `/` | Landing — hero, positioning, featured products, advantages, strengths, CTA, inquiry |
| `/products` | Catalogue — alternating showcase of the two product lines |
| `/products/[category]` | Product-line page (`inverter`, `e-rickshaw`): features, gallery, model spec table, protections, warranty |
| `/about` | Company story from the official introduction — Heritor legacy, journey, applications, approach, values |
| `/contact` | Contact + inquiry form |

## Structure

```
app/                     Routes (App Router)
components/
  layout/                Nav, Footer, FloatingEnquire
  sections/              Hero, ProductCard, SpecTable, InquiryForm, InquirySection
  ui/                    Logo, Button, Card, Section/Heading/Eyebrow/Seam/Divider,
                         Reveal (CSS scroll-reveal), StatCounter, ProductShot
  icons/                 Custom thin-line geometric icon set
lib/
  config/site.ts         Brand + contact configuration (from the official pamphlets)
  data/products.ts       Product data (from official pamphlets/data sheets) + async data-access layer
  utils.ts               cn(), WhatsApp/Email link builders
app/globals.css          Design tokens (Tailwind @theme) + brand utilities
```

## Design system

- **Colors (from the brand guideline):** Electric Blue `#007FC4` (`volt-500`, used
  surgically), Metallic Silver `#B7B9BC` (`silver-300`), Graphite Black `#101217`
  (`ink-800`, page background), Steel Grey `#6F747A` (`steel-400`), plus derived
  `ink-*` / `graphite-*` / `silver-*` shades. Brushed-metal gradient via `.text-metal`.
- **Type:** Michroma (headlines, titles, numbers), Roboto (body, captions, specs, UI).
- **Signatures:** `.seam` (energy seam), `.hairline`, `.clip-shear` (12° corner), `.glass`,
  `.surface-lit`, `.grid-backdrop`.
- **Motion:** CSS scroll-driven reveals (`.reveal`, progressive-enhancement, no JS
  dependency) + `prefers-reduced-motion` support.

## Backend swap-points (designed in, not built)

The site is frontend-only today but structured so a backend plugs in with **no UI changes**:

1. **Product catalogue** — all pages consume the async accessors in
   `lib/data/products.ts` (`getCategories`, `getCategory`, …). Replace the static array
   with `fetch()` to a CMS/REST/GraphQL API; types stay identical.
2. **Inquiry submission** — `components/sections/InquiryForm.tsx` composes pre-filled
   **WhatsApp** or **Email** messages via `lib/utils.ts`. The `submit()` function is the
   single swap point for a future POST endpoint (Next.js API route → CRM / email service).
3. **Config** — update contact details (phone, WhatsApp number, email, address) in
   `lib/config/site.ts`.

## Assets

Official product renders and pamphlet scenes live in `public/products/` as WebP
(`inverter/`, `e-rickshaw/`, `range/`). They are rendered through
`components/ui/ProductShot.tsx` (transparent render on a lit stage) and referenced from
each category's `image`, `scene` and `gallery` fields in `lib/data/products.ts`.

Official logos (from the brand guideline) live in `public/brand/`:

| File | Logo | Used for |
|---|---|---|
| `leizoun-logo-horizontal.png` | Secondary (horizontal) | Header and footer via `components/ui/Logo.tsx` |
| `leizoun-logo.png` | Primary (vertical) | Social share image (`app/opengraph-image.png`) |
| `leizoun-mark.png` | Logo mark | Favicon (`app/icon.png`) and `app/apple-icon.png` |

The favicon, Apple icon and Open Graph image place the logo on Graphite Black (`#101217`).
