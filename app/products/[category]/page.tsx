import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Eyebrow, Heading, Divider, Seam } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { ButtonLink } from "@/components/ui/Button";
import { InquirySection } from "@/components/sections/InquirySection";
import { getCategory, getCategorySlugs, getCategories } from "@/lib/data/products";
import { ArrowRight, Check, iconForSlug } from "@/components/icons";

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
  };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  const c = await getCategory(category);
  if (!c) notFound();

  const all = await getCategories();
  const others = all.filter((x) => x.slug !== c.slug).slice(0, 3);
  const Icon = iconForSlug[c.slug];

  return (
    <>
      {/* Hero */}
      <Section className="pt-32 md:pt-40">
        <div className="mb-8">
          <Link href="/products" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-steel-400 hover:text-silver-200">
            ← Catalogue
          </Link>
        </div>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>{c.tagline}</Eyebrow>
            <Heading as="h1" className="mt-5">
              {c.name}
            </Heading>
            <p className="mt-6 max-w-lg text-[length:var(--text-lead)] leading-relaxed text-silver-300">
              {c.overview}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              {c.specChips.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-xl text-metal">
                    {s.value}
                    {s.unit ? ` ${s.unit}` : ""}
                  </p>
                  <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-steel-400">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="#enquire" size="lg">
                Enquire about this line <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ProductVisual slug={c.slug} className="aspect-[4/3] w-full rounded-[14px] border border-graphite-500" />
          </Reveal>
        </div>
      </Section>

      <Divider />

      {/* Highlights */}
      <Section>
        <Reveal className="mb-10">
          <Eyebrow index="01">Highlights</Eyebrow>
          <Heading as="h2" className="mt-5">
            Built to outperform
          </Heading>
        </Reveal>
        <RevealGroup className="grid gap-px overflow-hidden rounded-[12px] border border-graphite-500 bg-graphite-500 md:grid-cols-3">
          {c.highlights.map((h) => (
            <RevealItem key={h.title} className="surface-lit p-8">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-steel-400">{h.title}</p>
              <p className="mt-3 font-display text-3xl text-metal">{h.value}</p>
              <p className="mt-3 text-sm text-silver-300">{h.note}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Applications + differentiators */}
      <Section tone="raised">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow index="02">Applications</Eyebrow>
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

          <Reveal delay={0.1}>
            <Eyebrow index="03">Why this line</Eyebrow>
            <Heading as="h2" className="mt-5">
              The LEIZOUN difference
            </Heading>
            <div className="mt-8 space-y-6">
              {c.differentiators.map((d) => (
                <div key={d.title} className="flex items-start gap-4">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border border-graphite-500 text-volt-400">
                    {Icon && <Icon className="h-4 w-4" />}
                  </span>
                  <div>
                    <p className="text-sm text-silver-100">{d.title}</p>
                    <p className="mt-1 text-sm text-steel-400">{d.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Variants placeholder — backend-ready */}
      <Section>
        <Reveal>
          <Seam className="mb-10 max-w-xs" />
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <Eyebrow index="04">Models</Eyebrow>
              <Heading as="h2" className="mt-5">
                Configurations & variants
              </Heading>
              <p className="mt-5 text-silver-300">
                Detailed model-level specifications for this line are available on request. Share
                your voltage, capacity, and application requirements and we&apos;ll recommend the
                right configuration.
              </p>
            </div>
            <ButtonLink href="#enquire" variant="secondary">
              Request specifications
            </ButtonLink>
          </div>
        </Reveal>
      </Section>

      {/* Related */}
      <Section tone="raised">
        <Reveal className="mb-10">
          <Eyebrow>Explore more</Eyebrow>
          <Heading as="h2" className="mt-5">
            Other product lines
          </Heading>
        </Reveal>
        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {others.map((o) => {
            const OIcon = iconForSlug[o.slug];
            return (
              <RevealItem key={o.slug}>
                <Link
                  href={`/products/${o.slug}`}
                  className="group flex h-full items-center gap-4 rounded-[10px] border border-graphite-500 p-5 transition-colors hover:border-silver-300/40"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-graphite-500 text-silver-300 group-hover:text-volt-400">
                    {OIcon && <OIcon className="h-5 w-5" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-silver-100">{o.name}</span>
                    <span className="block text-xs text-steel-400">{o.tagline}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-steel-400 transition-transform group-hover:translate-x-1 group-hover:text-volt-400" />
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <InquirySection defaultCategory={c.slug} />
    </>
  );
}
