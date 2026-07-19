import { Hero } from "@/components/sections/Hero";
import { Section, Eyebrow, Heading, Divider, Seam } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/sections/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { InquirySection } from "@/components/sections/InquirySection";
import { StatCounter } from "@/components/ui/StatCounter";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { getFeaturedCategories } from "@/lib/data/products";
import {
  Bolt,
  Shield,
  Cycle,
  Gauge,
  Cpu,
  Thermometer,
  Leaf,
  Battery,
  ArrowRight,
} from "@/components/icons";
import Link from "next/link";

const advantages = [
  { icon: Gauge, title: "High Performance", body: "Superior power delivery and energy density for demanding real-world duty." },
  { icon: Shield, title: "Safety First", body: "Smart BMS protection against overcharge, overload, and thermal events." },
  { icon: Cycle, title: "Long Lifespan", body: "Thousands of deep cycles with minimal capacity fade over years of use." },
  { icon: Bolt, title: "Fast Charging", body: "Rapid recharge chemistry that keeps vehicles and systems up and running." },
  { icon: Cpu, title: "Intelligent BMS", body: "Per-cell monitoring, balancing, and health reporting built in." },
  { icon: Leaf, title: "Cleaner Energy", body: "Maintenance-free, efficient, and lighter footprint than legacy batteries." },
];

const whyLithium = [
  { value: 4, suffix: "×", label: "Longer cycle life", note: "vs lead-acid" },
  { value: 60, prefix: "−", suffix: "%", label: "Lighter weight", note: "same capacity" },
  { value: 95, suffix: "%", label: "Usable capacity", note: "deep discharge" },
  { value: 0, label: "Maintenance", note: "sealed & clean", isZero: true },
];

const applications = [
  { title: "Electric Mobility", body: "E-bikes, e-rickshaws and light EVs", slug: "e-bike" },
  { title: "Home & Business Backup", body: "Inverters and UPS for clean continuity", slug: "inverter" },
  { title: "Critical Systems", body: "Built-in UPS for sensitive equipment", slug: "ups" },
  { title: "Industrial & Telecom", body: "Scalable energy storage at scale", slug: "industrial" },
];

export default async function Home() {
  const featured = await getFeaturedCategories();

  return (
    <>
      <Hero />

      {/* Company introduction / positioning */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Eyebrow index="01">The Company</Eyebrow>
            <Heading as="h2" className="mt-5">
              Not just batteries. Advanced energy technology.
            </Heading>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-center">
            <p className="text-[length:var(--text-lead)] leading-relaxed text-silver-300">
              LEIZOUN ENERGY engineers intelligent lithium power systems for a fast-electrifying
              world. From high-density mobility packs to industrial energy storage, every product
              is designed around performance, safety, and longevity — and backed by precision
              manufacturing and a smart battery-management platform.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { k: 5, s: "+", l: "Product lines" },
                { k: 3000, s: "+", l: "Charge cycles" },
                { k: 40, s: "+", l: "Applications" },
                { k: 100, s: "%", l: "QA tested" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-2xl text-metal">
                    <StatCounter value={s.k} suffix={s.s} />
                  </p>
                  <p className="mt-1 text-xs text-steel-400">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Divider />

      {/* Featured product categories */}
      <Section>
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow index="02">Product Range</Eyebrow>
            <Heading as="h2" className="mt-5 max-w-xl">
              A lineup engineered for every load
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-silver-200 hover:text-volt-400"
            >
              Full catalogue
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <RevealItem key={c.slug}>
              <ProductCard category={c} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Why lithium */}
      <Section tone="raised">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow index="03">Why Lithium</Eyebrow>
            <Heading as="h2" className="mt-5">
              The physics of a better battery
            </Heading>
            <p className="mt-5 max-w-md text-[length:var(--text-lead)] leading-relaxed text-silver-300">
              Lithium fundamentally outperforms legacy chemistries — more energy in less weight,
              far more cycles, and near-zero maintenance. It&apos;s the foundation of the electric
              future, and of everything we build.
            </p>
            <div className="mt-8">
              <Link
                href="/technology"
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-volt-400 hover:text-volt-500"
              >
                Explore the technology
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-graphite-500 bg-graphite-500">
            {whyLithium.map((w) => (
              <RevealItem key={w.label} className="surface-lit p-6 md:p-8">
                <p className="font-display text-3xl text-metal md:text-4xl">
                  {w.isZero ? (
                    "Zero"
                  ) : (
                    <StatCounter value={w.value} prefix={w.prefix} suffix={w.suffix} />
                  )}
                </p>
                <p className="mt-3 text-sm text-silver-200">{w.label}</p>
                <p className="text-xs text-steel-400">{w.note}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Advantages */}
      <Section>
        <Reveal className="mb-12 max-w-2xl">
          <Eyebrow index="04">Why LEIZOUN</Eyebrow>
          <Heading as="h2" className="mt-5">
            Engineering advantages, built in
          </Heading>
        </Reveal>
        <RevealGroup className="grid gap-px overflow-hidden rounded-[12px] border border-graphite-500 bg-graphite-500 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a) => (
            <RevealItem key={a.title} className="group surface-lit p-8 transition-colors hover:bg-ink-700">
              <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-graphite-500 text-silver-300 transition-colors group-hover:border-volt-500/50 group-hover:text-volt-400">
                <a.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-base text-silver-100">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-silver-300">{a.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Technology highlight */}
      <Section tone="raised">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ProductVisual slug="industrial" className="aspect-[5/4] w-full rounded-[14px] border border-graphite-500" />
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow index="05">Technology</Eyebrow>
            <Heading as="h2" className="mt-5">
              Intelligence in every cell
            </Heading>
            <p className="mt-5 text-[length:var(--text-lead)] leading-relaxed text-silver-300">
              A smart Battery Management System watches every cell — balancing charge, guarding
              against faults, and managing heat for consistent, safe performance in the toughest
              conditions.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: Cpu, t: "Smart BMS", d: "Per-cell monitoring & balancing" },
                { icon: Thermometer, t: "Thermal management", d: "Stable output across climates" },
                { icon: Shield, t: "Multi-layer protection", d: "Overcharge, overload & short-circuit" },
                { icon: Battery, t: "Precision cells", d: "Grade-A cells, rigorously tested" },
              ].map((r) => (
                <li key={r.t} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] border border-graphite-500 text-volt-400">
                    <r.icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm text-silver-100">{r.t}</span>
                    <span className="block text-sm text-steel-400">{r.d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Applications */}
      <Section>
        <Reveal className="mb-12 max-w-2xl">
          <Eyebrow index="06">Applications</Eyebrow>
          <Heading as="h2" className="mt-5">
            Powering how the world moves and works
          </Heading>
        </Reveal>
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {applications.map((a) => (
            <RevealItem key={a.title}>
              <Link
                href={`/products/${a.slug}`}
                className="group relative block h-full overflow-hidden clip-shear rounded-[10px] border border-graphite-500"
              >
                <ProductVisual slug={a.slug} className="h-40 w-full" compact />
                <div className="p-5">
                  <h3 className="font-display text-sm text-silver-100">{a.title}</h3>
                  <p className="mt-2 text-sm text-steel-400">{a.body}</p>
                </div>
                <span className="absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-volt-500 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Strengths / trust band */}
      <Section tone="raised">
        <Seam className="mb-14 max-w-xs" />
        <div className="grid gap-10 md:grid-cols-4">
          {[
            { k: "Precision", l: "Manufacturing", d: "Automated, quality-controlled production lines." },
            { k: "Grade-A", l: "Cells", d: "Only premium cells, individually tested." },
            { k: "Certified", l: "Standards", d: "Built to national and international norms." },
            { k: "Backed", l: "Support", d: "Responsive technical and partner support." },
          ].map((s) => (
            <Reveal key={s.l}>
              <p className="font-display text-2xl text-metal">{s.k}</p>
              <p className="mt-1 text-sm uppercase tracking-[0.14em] text-silver-200">{s.l}</p>
              <p className="mt-3 text-sm text-steel-400">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />

      <InquirySection />
    </>
  );
}
