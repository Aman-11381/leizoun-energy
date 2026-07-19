import { Hero } from "@/components/sections/Hero";
import { Section, Eyebrow, Heading, Divider } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/sections/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { InquirySection } from "@/components/sections/InquirySection";
import { getFeaturedCategories } from "@/lib/data/products";
import {
  Bolt,
  Shield,
  Cycle,
  Gauge,
  Cpu,
  Leaf,
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

export default async function Home() {
  const featured = await getFeaturedCategories();

  return (
    <>
      <Hero />

      {/* Company introduction / positioning */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Eyebrow index="01">Our Legacy</Eyebrow>
            <Heading as="h2" className="mt-5">
              A legacy of battery expertise. The future of lithium energy.
            </Heading>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-center">
            <p className="text-[length:var(--text-lead)] leading-relaxed text-silver-300">
              For over 40 years, we&apos;ve manufactured dependable batteries and earned the trust
              of customers through quality, expertise, and long-term commitment. LEIZOUN ENERGY is
              our next chapter — bringing that same deep technical knowledge, proven manufacturing,
              and customer service to advanced lithium technology for a fast-electrifying world.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { big: "40+", l: "Years of expertise" },
                { big: "Smart", l: "BMS protection" },
                { big: "Long", l: "Cycle life" },
                { big: "Lighter", l: "Than lead-acid" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-2xl text-metal">{s.big}</p>
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

      {/* Advantages */}
      <Section>
        <Reveal className="mb-12 max-w-2xl">
          <Eyebrow index="03">Why LEIZOUN</Eyebrow>
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

      <CtaBand />

      <InquirySection />
    </>
  );
}
