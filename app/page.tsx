import { Hero } from "@/components/sections/Hero";
import { Section, Eyebrow, Heading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/sections/ProductCard";
import { InquirySection } from "@/components/sections/InquirySection";
import { getFeaturedCategories } from "@/lib/data/products";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const advantages = [
  { title: "Zero Maintenance", body: "Both ranges are built on LiFePO4 (lithium iron phosphate) chemistry and need no maintenance." },
  { title: "Inbuilt BMS", body: "Every LEIZOUN battery has a built-in battery management system." },
  { title: "Upgraded Protections", body: "Overcharge, over-discharge and over-current protection on inverter batteries; ten built-in protections on e-rickshaw batteries." },
  { title: "Long Life", body: "Over 2000 cycles on e-rickshaw batteries and up to 7 years' warranty on inverter batteries." },
  { title: "Voltage Booster Switch", body: "Built into every LEIZOUN inverter battery." },
  { title: "Make in India", body: "Made in India by an ISO 9001:2015 / 14001:2015 certified company." },
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
              className="text-sm uppercase tracking-[0.14em] text-silver-200 hover:text-volt-400"
            >
              Full catalogue
            </Link>
          </Reveal>
        </div>
        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {featured.map((c, i) => (
            <RevealItem key={c.slug}>
              <ProductCard category={c} eager={i === 0} />
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
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <RevealItem key={a.title} className="surface-lit rounded-[12px] border border-graphite-500 p-7">
              <span className="font-mono text-xs tracking-[0.2em] text-volt-400">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-base text-silver-100">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-silver-300">{a.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <InquirySection />
    </>
  );
}
