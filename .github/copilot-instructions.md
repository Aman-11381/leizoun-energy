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

- **Marketing site with no backend.** Pages are Server Components by default. Only interactive leaves use `"use client"`: `Nav`, `FloatingEnquire`, `InquiryForm`, and `StatCounter`. Keep client boundaries small and at the leaves.
- **Root layout** (`app/layout.tsx`) loads fonts with `next/font/google` and exposes them as CSS variables (`--font-display-face`, `--font-body-face`, `--font-mono-face`). `app/globals.css` maps these variables to Tailwind font tokens. The layout also renders `Nav`, `Footer`, and `FloatingEnquire` on every page and defines a metadata title template (`%s — LEIZOUN ENERGY`). Pages should set only a short `title`.
- **Product catalogue data layer** (`lib/data/products.ts`):
  - A static `categories` array is the single source of truth.
  - Pages must use the async accessors `getCategories`, `getFeaturedCategories`, and `getCategory(slug)`. Do not import the raw array.
  - Only `getCategorySlugs()` is synchronous, because `generateStaticParams` uses it.
  - This design lets a future CMS or API replace the array by changing only this file.
  - Adding a category requires a matching entry in `iconForSlug` (`components/icons/index.tsx`).
- **Inquiry flow:**
  - `InquiryForm` validates input on the client.
  - It builds prefilled WhatsApp (`wa.me`) or `mailto:` links with `buildWhatsAppLink` and `buildMailtoLink` from `lib/utils.ts`.
  - Its `submit()` function is the single swap point for a future POST endpoint.
- **Brand and contact configuration** lives in `lib/config/site.ts` (`site` and `nav`). It currently holds placeholder contact values. Never hardcode the brand name, phone number, email, or WhatsApp number in components.

## Conventions

- Import modules through the `@/*` path alias, which points to the repository root.
- Use **named exports** for components. Default exports are only for `app/` route files.
- Merge class names with `cn()` from `@/lib/utils` (`clsx` + `tailwind-merge`).
- **Design tokens** are defined in `app/globals.css` under `@theme` (Tailwind v4; there is no `tailwind.config`):
  - Use the brand palette: `ink-*`, `graphite-*`, `steel-*`, `silver-*`, and electric-blue `volt-*`. Use `volt-*` sparingly as an accent.
  - Use the fluid text tokens: `text-display`, `text-h1`, and so on.
  - Use the brand utility classes: `.text-metal`, `.seam`, `.hairline`, `.clip-shear`, `.glass`, `.surface-lit`, `.grid-backdrop`.
  - Prefer these tokens and utilities over arbitrary colors.
- **Page composition:** Build pages from the `components/ui/Section.tsx` primitives (`Section`, `Eyebrow`, `Heading`, `Divider`, `Seam`), `ButtonLink` and `Button`, and the custom thin-line icons in `components/icons`.
- **Motion:**
  - Scroll reveals are CSS-only (`.reveal` + scroll-driven animations). `Reveal`, `RevealGroup`, and `RevealItem` add the class without JavaScript. Their `delay` and `stagger` props are intentionally ignored.
  - Content must remain visible without JavaScript.
  - The `motion` library (`motion/react`) is only for small client widgets such as `StatCounter`, and it must respect `useReducedMotion`.
- **Product images:** Product visuals use the branded placeholder `components/ui/ProductVisual.tsx`, driven by each category's `renderHint` and `accent`.
- **Logos:** Use the official logos in `public/brand/` according to the brand guideline:
  - The secondary (horizontal) logo is for the header and footer. Render it through `Logo` in `components/ui/Logo.tsx`.
  - The primary (vertical) logo is used in `app/opengraph-image.png`.
  - The logo mark is used for `app/icon.png` and `app/apple-icon.png`.
  - Don't recreate logos as SVG or styled text.
