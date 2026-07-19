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
| `/products` | Catalogue — premium alternating showcase of the 5 category lines |
| `/products/[category]` | Category template (e-bike, e-rickshaw, inverter, ups, industrial) |
| `/about` | Brand story — mission, vision, journey, manufacturing, values |
| `/contact` | Contact + inquiry form |

## Structure

```
app/                     Routes (App Router)
components/
  layout/                Nav, Footer, FloatingEnquire
  sections/              Hero, ProductCard, InquiryForm, CtaBand, InquirySection
  ui/                    Logo, Button, Card, Section/Heading/Eyebrow/Seam/Divider,
                         Reveal (CSS scroll-reveal), StatCounter, ProductVisual
  icons/                 Custom thin-line geometric icon set
lib/
  config/site.ts         Brand + contact configuration (edit for go-live)
  data/products.ts       Product content model + async data-access layer
  utils.ts               cn(), WhatsApp/Email link builders
app/globals.css          Design tokens (Tailwind @theme) + brand utilities
```

## Design system

- **Colors:** `ink-*` / `graphite-*` / `steel/silver-*` neutrals + `volt-*` electric blue
  (used surgically). Brushed-metal gradient via `.text-metal`.
- **Type:** Michroma (display), Inter (body/UI), JetBrains Mono (specs/labels).
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

Product visuals currently use a branded **placeholder** (`components/ui/ProductVisual.tsx`)
labelled `RENDER · PLACEHOLDER`. Swap for real studio renders per the art-direction spec
(studio, black seamless, single rim light, blue-seam reflection). The master logo lives at
`public/brand/leizoun-logo.png`; the header/footer use an SVG monogram in
`components/ui/Logo.tsx`.
