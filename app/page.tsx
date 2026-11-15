import { Hero } from "@/components/sections/Hero";
import { Section, Eyebrow, Heading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/sections/ProductCard";
import { InquirySection } from "@/components/sections/InquirySection";
import { getFeaturedCategories } from "@/lib/data/products";
import { Bolt, Shield, Cycle, Cpu, Wrench, Award, ArrowRight } from "@/components/icons";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const advantages = [
  { icon: Wrench, title: "Zero Maintenance", body: "Sealed LiFePO4 packs — no water top-ups, no acid, no routine servicing." },
  { icon: Cpu, title: "Inbuilt BMS", body: "An intelligent battery management system monitors and balances every cell." },
  { icon: Shield, title: "Upgraded Protections", body: "Guards against overcharge, over-discharge, over-current and temperature extremes." },
  { icon: Cycle, title: "Long Life", body: "2000+ cycles on e-rickshaw packs and up to 7 years' warranty on inverter batteries." },
  { icon: Bolt, title: "Voltage Booster", body: "Inverter batteries include a voltage booster switch, as listed in their official specifications." },
  { icon: Award, title: "Make in India", body: "Made in India by an ISO 9001:2015 / 14001:2015 certified company." },
];

export default async function Home() {
  const featured = await getFeaturedCategories();

  return (
    <>
      <Hero />

      {/* Featured product categories */}
      <Section tone="deep">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow index="01">Product Range</Eyebrow>
            <Heading as="h2" className="mt-5 max-w-xl">
              Two lines. One standard.
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
        <RevealGroup className="grid gap-6 md:grid-cols-2">
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
          <Eyebrow index="02">Why LEIZOUN</Eyebrow>
          <Heading as="h2" className="mt-5">
            Engineering advantages, built in
          </Heading>
        </Reveal>
        <RevealGroup className="grid gap-px overflow-hidden rounded-[12px] border border-graphite-500 bg-graphite-500 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a) => (
            <RevealItem key={a.title} className="group surface-lit p-8 transition-colors hover:bg-ink-700">
              <span className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-volt-500/30 bg-volt-500/[0.06] text-volt-400 transition-colors group-hover:border-volt-500/60">
                <a.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-base text-silver-100">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-silver-300">{a.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <InquirySection />
    </>
  );
}
