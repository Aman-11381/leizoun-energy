import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Section, Eyebrow, Heading, Divider } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ProductShot } from "@/components/ui/ProductShot";
import { ButtonLink } from "@/components/ui/Button";
import { SpecTable } from "@/components/sections/SpecTable";
import { getCategory, getCategorySlugs } from "@/lib/data/products";
import { Check, ChevronDown } from "@/components/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/config/site";
import { cn } from "@/lib/utils";

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return getCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const c = await getCategory(category);
  if (!c) return { title: "Product" };
  return {
    title: c.name,
    description: c.summary,
    alternates: { canonical: `/products/${c.slug}` },
    openGraph: { images: [{ url: c.scene.src, width: c.scene.width, height: c.scene.height, alt: c.scene.alt }] },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  const c = await getCategory(category);
  if (!c) notFound();

  // Features are stored in priority order: the first two are shown larger.
  const lead = c.features.slice(0, 2);
  const rest = c.features.slice(2);
  // When protections are already a feature card, skip the separate protection panel.
  const showProtections = !c.features.some((f) => f.icon === "protection");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: c.name,
    description: c.summary,
    image: new URL(c.image.src, site.url).href,
    url: new URL(`/products/${c.slug}`, site.url).href,
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@type": "Organization", name: site.legalName, url: site.url },
    model: c.models.map((m) => m.sku),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      {/* Hero */}
      <Section className="pt-32 md:pt-40">
        <nav aria-label="Breadcrumb" className="-mt-3 mb-5 flex items-center gap-2 py-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-steel-400">
          <Link href="/products" className="hover:text-silver-200">
            Products
          </Link>
          <span aria-hidden>/</span>
          <span className="text-silver-300">{c.shortName}</span>
        </nav>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>{c.tagline}</Eyebrow>
              <span className="rounded-full border border-volt-500/40 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-volt-400">
                {c.chemistry}
              </span>
            </div>
            <Heading as="h1" className="mt-5">
              {c.name}
            </Heading>
            <p className="mt-6 max-w-lg text-[length:var(--text-lead)] leading-relaxed text-silver-300">
              {c.overview}
            </p>
            <dl className="mt-8 grid max-w-md grid-cols-2 gap-x-10 gap-y-6">
              {c.keyStats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-steel-400">{s.label}</dt>
                  <dd className="whitespace-nowrap font-display text-xl text-metal">{s.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contact" size="lg">
                Enquire
              </ButtonLink>
              <ButtonLink href="#specifications" size="lg" variant="secondary">
                View {c.models.length} models
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ProductShot
              image={c.image}
              eager
              padding="p-[4%]"
              className="aspect-[4/3] w-full rounded-[14px] border border-graphite-500"
            />
          </Reveal>
        </div>
      </Section>

      <Divider />

      {/* Photos */}
      <Section tone="raised">
        <Reveal>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[14px] border border-graphite-500 md:aspect-[21/9]">
            <Image src={c.scene.src} alt={c.scene.alt} fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent light:hidden" />
          </div>
        </Reveal>
        {c.gallery.length > 0 && (
          <RevealGroup
            className={cn("mt-6 grid gap-6 sm:grid-cols-2", c.gallery.length % 3 === 0 && "lg:grid-cols-3")}
          >
            {c.gallery.map((g) => (
              <RevealItem key={g.src}>
                <ProductShot
                  image={g}
                  sizes={c.gallery.length % 3 === 0 ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 50vw, 100vw"}
                  className={cn("w-full rounded-[12px] border border-graphite-500", c.gallery.length % 3 === 0 ? "aspect-[4/3]" : "aspect-[16/9]")}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Section>

      {/* Specifications */}
      <Section id="specifications" className="scroll-mt-20">
        <Reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow index="01">Specifications</Eyebrow>
            <Heading as="h2" className="mt-5">
              Choose your model
            </Heading>
          </div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-steel-400">
            {c.models.length} models · {c.chemistry}
          </p>
        </Reveal>
        <Reveal>
          <SpecTable sheet={c.specSheet} models={c.models} />
        </Reveal>
      </Section>

      {/* Features + protection */}
      <Section tone="raised">
        <Reveal className="mb-10 max-w-2xl">
          <Eyebrow index="02">Features</Eyebrow>
          <Heading as="h2" className="mt-5">
            Why choose it
          </Heading>
        </Reveal>

        <RevealGroup className="grid gap-4 md:grid-cols-2">
          {lead.map((f, i) => (
            <RevealItem key={f.title} className="surface-lit rounded-[12px] border border-graphite-500 p-7 md:p-9">
              <span className="font-mono text-xs tracking-[0.2em] text-volt-400">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-h3 text-silver-100">{f.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-silver-300">{f.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        {rest.length > 0 && (
          <RevealGroup className={cn("mt-4 grid gap-4 sm:grid-cols-2", rest.length === 3 && "lg:grid-cols-3")}>
            {rest.map((f, i) => (
              <RevealItem
                key={f.title}
                className={cn(
                  "rounded-[12px] border border-graphite-500 p-6",
                  rest.length === 3 && i === 2 && "sm:col-span-2 lg:col-span-1"
                )}
              >
                <span className="font-mono text-xs tracking-[0.2em] text-steel-400">{String(i + lead.length + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-base text-silver-100">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-300">{f.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        )}

        {showProtections && (
          <Reveal className="mt-4 rounded-[12px] border border-graphite-500 p-6 md:p-8">
            <h3 className="font-display text-base text-silver-100">Built-in protection</h3>
            <ul className="mt-5 grid max-w-3xl gap-x-12 gap-y-3 sm:grid-cols-2">
              {c.protections.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-silver-200">
                  <Check className="h-4 w-4 shrink-0 text-volt-400" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Section>

      {/* Warranty */}
      <Section>
        <Reveal className="max-w-3xl">
          <Eyebrow index="03">Warranty</Eyebrow>
          <Heading as="h2" className="mt-5">
            {c.warranty.headline}
          </Heading>
          <p className="mt-5 leading-relaxed text-silver-300">{c.warranty.summary}</p>
          <details className="group mt-8 rounded-[12px] border border-graphite-500">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm uppercase tracking-[0.14em] text-silver-200 [&::-webkit-details-marker]:hidden">
              Terms &amp; conditions
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <ol className="list-decimal space-y-3 border-t border-graphite-500 py-6 pl-11 pr-6 text-sm leading-relaxed text-steel-400">
              {c.warranty.terms.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ol>
          </details>
          <div className="mt-10">
            <ButtonLink href="/contact" size="lg">
              Enquire
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}