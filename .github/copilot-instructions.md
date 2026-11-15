# Copilot instructions — LEIZOUN ENERGY website

## Important: Next.js version

This project uses **Next.js 16** (App Router), React 19, Tailwind CSS v4, and TypeScript (strict). APIs and conventions may differ from older Next.js versions. Before writing Next.js code, read the relevant guide in `node_modules/next/dist/docs/` and follow any deprecation notices. For example, route `params` is a `Promise` and must be awaited (see `app/products/[category]/page.tsx`).

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # production build; every route is statically prerendered
npm run lint     # ESLint 9 flat config (eslint.config.mjs, eslint-config-next)
npx eslint path/to/file.tsx   # lint a single file
```

There is no test suite. Use `npm run build` to check types and prerendering.

## Architecture

- **Marketing site with no backend.** Pages are Server Components by default. Only interactive leaves use `"use client"`: `Nav`, `FloatingEnquire`, `InquiryForm`, `StatCounter`, and `GridCursorGlow`. Keep client boundaries small and at the leaves.
- **Root layout** (`app/layout.tsx`) loads Michroma and Roboto with `next/font/google` and exposes them as CSS variables (`--font-display-face`, `--font-body-face`). `app/globals.css` maps these variables to Tailwind font tokens; `font-mono` intentionally maps to Roboto because the brand guideline uses Roboto for specs and labels. The layout also renders `Nav`, `Footer`, and `FloatingEnquire` on every page and defines a metadata title template (`%s — LEIZOUN ENERGY`). Pages should set only a short `title`.
- **Product catalogue data layer** (`lib/data/products.ts`):
  - A static `categories` array is the single source of truth.
  - Pages must use the async accessors `getCategories`, `getFeaturedCategories`, and `getCategory(slug)`. Do not import the raw array.
  - Only `getCategorySlugs()` is synchronous, because `generateStaticParams` uses it.
  - This design lets a future CMS or API replace the array by changing only this file.
  - Features are listed in display priority; the product page shows the first two as large cards. A feature's `icon` key is a semantic tag (for example, `protection` hides the separate protections panel) and is not rendered as an icon.
  - A category's `specSheet.layout` controls how `components/sections/SpecTable.tsx` renders its models: `grouped` puts one row per model, grouped by `group` (the inverter range, grouped by voltage); `matrix` puts one row per parameter and one column per model (the e-rickshaw data sheet).
  - Product data is transcribed from the official pamphlets and data sheets. Don't invent specifications such as capacity, dimensions or weight.
- **Inquiry flow:**
  - `InquiryForm` validates input on the client.
  - It builds prefilled WhatsApp (`wa.me`) or `mailto:` links with `buildWhatsAppLink` and `buildMailtoLink` from `lib/utils.ts`.
  - Its `submit()` function is the single swap point for a future POST endpoint.
- **Brand and contact configuration** lives in `lib/config/site.ts` (`site` and `nav`): the brand name, legal name, ISO certification line, customer-care number, WhatsApp number, email and address. It also holds `site.distributorship` (Eastman Power Solutions, for which LEIZOUN is an authorized distributor in Telangana), used by the About page, the footer and the enquiry form's product-interest options. Link to the distributed brand's site; don't reproduce its catalogue. Never hardcode these values in components.

## Conventions

- Import modules through the `@/*` path alias, which points to the repository root.
- Use **named exports** for components. Default exports are only for `app/` route files.
- Merge class names with `cn()` from `@/lib/utils` (`clsx` + `tailwind-merge`).
- **Design tokens** are defined in `app/globals.css` under `@theme` (Tailwind v4; there is no `tailwind.config`):
  - The palette follows the brand guideline: Electric Blue `#007FC4` is `volt-500`, Metallic Silver `#B7B9BC` is `silver-300`, Graphite Black `#101217` is `ink-800` (page background), and Steel Grey `#6F747A` is `steel-400`. Other `ink-*`, `graphite-*`, and `silver-*` shades are derived from these. Use `volt-*` sparingly as an accent, and use `volt-400` for small blue text on dark backgrounds.
  - For colors with opacity in arbitrary values, use the brand RGB values, such as `rgba(0,127,196,…)` for Electric Blue. Don't introduce new hex colors.
  - Use the fluid text tokens: `text-display`, `text-h1`, and so on.
  - Use the brand utility classes: `.text-metal`, `.seam`, `.hairline`, `.clip-shear`, `.glass`, `.surface-lit`, `.grid-backdrop`.
  - Prefer these tokens and utilities over arbitrary colors.
- **Page composition:** Build pages from the `components/ui/Section.tsx` primitives (`Section`, `Eyebrow`, `Heading`, `Divider`, `Seam`), `ButtonLink` and `Button`, and the custom thin-line icons in `components/icons`.
- **Motion:**
  - Scroll reveals are CSS-only (`.reveal` + scroll-driven animations). `Reveal`, `RevealGroup`, and `RevealItem` add the class without JavaScript. Their `delay` and `stagger` props are intentionally ignored.
  - Content must remain visible without JavaScript.
  - Other motion is also CSS-only and lives in `app/globals.css` inside `prefers-reduced-motion: no-preference`: `.anim-hero`/`.anim-hero-visual` (hero entrance), `.anim-line`, `.anim-float` (via `ProductShot`'s `float` prop), and `.anim-page` (page fade, applied by `app/template.tsx`). `ProductShot` zooms slightly when an ancestor `group` is hovered.
  - The `motion` library (`motion/react`) is only for small client widgets such as `StatCounter` and `GridCursorGlow` (the mouse-following grid glow), and it must respect `useReducedMotion`.
  - The home hero background is `HeroBackdrop`: a masked grid (`.grid-lines-mask`) with drifting glows, line pulses, and glowing cells, all on the same 64px grid as `.grid-backdrop`.
- **Product images:** The official renders are WebP files in `public/products/`. Render transparent product shots with `ProductShot` (`components/ui/ProductShot.tsx`, which wraps `next/image` with `fill`), and use `next/image` directly for the opaque pamphlet `scene` banners. In Next 16, use `loading="eager"` or `preload` instead of the deprecated `priority` prop.
- **Logos:** Use the official logos in `public/brand/` according to the brand guideline:
  - The secondary (horizontal) logo is for the header and footer. Render it through `Logo` in `components/ui/Logo.tsx`.
  - The primary (vertical) logo is used in `app/opengraph-image.png`.
  - The logo mark is used for `app/icon.png` and `app/apple-icon.png`.
  - Don't recreate logos as SVG or styled text.
