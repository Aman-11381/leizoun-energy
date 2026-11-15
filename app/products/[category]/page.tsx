import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Section, Eyebrow, Heading, Divider, Seam } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ProductShot } from "@/components/ui/ProductShot";
import { ButtonLink } from "@/components/ui/Button";
import { SpecTable } from "@/components/sections/SpecTable";
import { InquirySection } from "@/components/sections/InquirySection";
import { getCategory, getCategorySlugs, getCategories } from "@/lib/data/products";
import { Check, Shield, ChevronDown, iconForFeature } from "@/components/icons";
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

  const all = await getCategories();
  const others = all.filter((x) => x.slug !== c.slug);

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
        <div className="-mt-3 mb-5">
          <Link href="/products" className="inline-block py-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-steel-400 hover:text-silver-200">
            ← Catalogue
          </Link>
        </div>
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
              <ButtonLink href="#enquire" size="lg">
                Enquire now
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

      {/* Features */}
      <Section>
        <Reveal className="mb-10 max-w-2xl">
          <Eyebrow index="01">Features</Eyebrow>
          <Heading as="h2" className="mt-5">
            Built to outperform
          </Heading>
        </Reveal>
        <RevealGroup className="grid gap-px overflow-hidden rounded-[12px] border border-graphite-500 bg-graphite-500 sm:grid-cols-2 lg:grid-cols-3">
          {c.features.map((f, i) => {
            const FIcon = iconForFeature[f.icon];
            const n = c.features.length;
            const last = i === n - 1;
            // Stretch the final tile so the grid never ends with an empty cell.
            const span = cn(
              last && n % 2 === 1 && "sm:col-span-2",
              last && (n % 3 === 0 ? "lg:col-span-1" : n % 3 === 2 ? "lg:col-span-2" : "lg:col-span-3")
            );
            return (
              <RevealItem key={f.title} className={cn("group surface-lit p-8 transition-colors hover:bg-ink-700", span)}>
                <span className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-volt-500/30 bg-volt-500/[0.06] text-volt-400 transition-colors group-hover:border-volt-500/60">
                  <FIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-base text-silver-100">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-silver-300">{f.body}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* Scene + gallery */}
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
            <Eyebrow index="02">Specifications</Eyebrow>
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

      {/* Protections + applications */}
      <Section tone="raised">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow index="03">Safety</Eyebrow>
            <Heading as="h2" className="mt-5">
              Built-in protections
            </Heading>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {c.protections.map((p) => (
                <li key={p} className="flex items-center gap-3 rounded-[8px] border border-graphite-500 px-4 py-3 text-sm text-silver-200">
                  <Shield className="h-4 w-4 shrink-0 text-volt-400" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow index="04">Applications</Eyebrow>
            <Heading as="h2" className="mt-5">
              Where it works
            </Heading>
            <ul className="mt-8 space-y-3">
              {c.applications.map((a) => (
                <li key={a} className="flex items-center gap-3 border-b border-graphite-500 pb-3 text-silver-200">
                  <Check className="h-4 w-4 text-volt-400" />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Warranty */}
      <Section>
        <Reveal>
          <Seam className="mb-10 max-w-xs" />
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow index="05">Warranty</Eyebrow>
              <Heading as="h2" metal className="mt-5">
                {c.warranty.headline}
              </Heading>
            </div>
            <div>
              <p className="text-[length:var(--text-lead)] leading-relaxed text-silver-300">{c.warranty.summary}</p>
              <details className="group mt-8 rounded-[10px] border border-graphite-500">
                <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm uppercase tracking-[0.14em] text-silver-200 [&::-webkit-details-marker]:hidden">
                  Warranty terms &amp; conditions
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <ol className="list-decimal space-y-3 border-t border-graphite-500 py-5 pl-10 pr-5 text-sm leading-relaxed text-steel-400">
                  {c.warranty.terms.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ol>
              </details>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Other line */}
      {others.length > 0 && (
        <Section tone="raised">
          <Reveal className="mb-10">
            <Eyebrow>Explore more</Eyebrow>
            <Heading as="h2" className="mt-5">
              Also from LEIZOUN
            </Heading>
          </Reveal>
          <RevealGroup className="grid gap-6 md:grid-cols-2">
            {others.map((o) => (
              <RevealItem key={o.slug}>
                <Link
                  href={`/products/${o.slug}`}
                  className="group grid h-full items-center overflow-hidden rounded-[12px] border border-graphite-500 transition-colors hover:border-silver-300/40 sm:grid-cols-[200px_1fr]"
                >
                  <ProductShot image={o.image} sizes="200px" padding="p-[10%]" className="aspect-[4/3] w-full sm:h-full" />
                  <span className="block p-5">
                    <span className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-400">{o.tagline}</span>
                    <span className="mt-2 block font-display text-lg text-silver-100">{o.name}</span>
                    <span className="mt-1 block text-sm text-steel-400">{o.summary}</span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      <InquirySection defaultCategory={c.slug} />
    </>
  );
}
