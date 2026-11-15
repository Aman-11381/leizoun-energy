import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow, Heading, Divider, Seam } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { Check, ArrowRight } from "@/components/icons";
import { site } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
  description:
    "More than 40 years of lead-acid battery manufacturing under the brand Heritor — now taking the next step into lithium battery technology as LEIZOUN ENERGY.",
};

/* Copy is taken from the official company introduction; don't add unverified claims. */

const journey = [
  {
    step: "The Legacy",
    title: `${site.legacy.years} years with ${site.legacy.brand}`,
    body: `More than 40 years in lead-acid battery manufacturing under the brand ${site.legacy.brand} — building deep expertise in battery technology, manufacturing, quality management, market requirements and customer service.`,
  },
  {
    step: "Learning & Adapting",
    title: "Keeping pace with change",
    body: "As technology and customer requirements evolved, we kept ourselves updated with the latest advancements in energy storage — and learned the diverse needs of customers across applications and markets.",
  },
  {
    step: "A Changing World",
    title: "Cleaner, smarter energy",
    body: "The transition towards electric mobility, renewable energy, energy storage and sustainable power systems is creating new opportunities and new expectations.",
  },
  {
    step: site.name,
    title: "The lithium chapter",
    body: "Our next major step: bringing our experience, technical understanding, customer relationships, sales network and market knowledge into lithium battery technology.",
  },
];

const applications = [
  "Electric mobility",
  "Automotive applications",
  "Home and backup energy",
  "Solar energy systems",
  "Commercial and industrial applications",
  "Emerging energy storage requirements",
];

const approach = [
  { n: "01", t: "Understand the customer" },
  { n: "02", t: "Provide the right solution" },
  { n: "03", t: "Maintain consistent quality" },
  { n: "04", t: "Build relationships for the long term" },
];

const considerations = [
  "Battery chemistry",
  "Cell quality",
  "Battery management systems",
  "Charging compatibility",
  "Thermal management",
  "Application suitability",
  "Safety",
  "Performance",
  "Lifecycle considerations",
];

const satisfaction = [
  "Consistent quality",
  "Dependable performance",
  "Technical understanding",
  "Responsive service",
  "Trust",
];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <Section className="pt-32 md:pt-40">
        <Reveal className="max-w-3xl">
          <Eyebrow index="◆">Our Legacy · Our Experience</Eyebrow>
          <Heading as="h1" className="mt-5">
            From a legacy of battery expertise to the future of lithium energy
          </Heading>
          <p className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-silver-300">
            For over four decades, our journey has been built on a strong foundation of expertise,
            trust, quality, and an unwavering commitment to our customers.
          </p>
          <p className="mt-5 leading-relaxed text-silver-300">
            With a rich legacy of more than 40 years in lead-acid battery manufacturing under the
            brand {site.legacy.brand}, we have developed deep expertise in battery technology,
            manufacturing, quality management, market requirements, and customer service. Over the
            years, our commitment to delivering dependable products and serving our customers with
            integrity has remained at the core of everything we do.
          </p>
        </Reveal>
        <RevealGroup className="mt-14 grid grid-cols-2 gap-8 border-t border-graphite-500 pt-8 md:grid-cols-4">
          {[
            { big: site.legacy.years, l: "Years in battery manufacturing" },
            { big: site.legacy.brand, l: "Our lead-acid battery legacy" },
            { big: "Lithium", l: "Our next chapter" },
            { big: "ISO", l: "9001:2015 · 14001:2015 certified" },
          ].map((s) => (
            <RevealItem key={s.l}>
              <p className="font-display text-3xl text-metal">{s.big}</p>
              <p className="mt-2 text-xs text-steel-400">{s.l}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Divider />

      {/* Journey */}
      <Section>
        <Reveal className="mb-12 max-w-2xl">
          <Eyebrow index="01">Our Journey</Eyebrow>
          <Heading as="h2" className="mt-5">
            Shaped by continuous learning and adaptation
          </Heading>
        </Reveal>
        <div className="relative">
          <div className="absolute left-0 top-0 hidden h-px w-full bg-graphite-500 md:block" />
          <RevealGroup className="grid gap-8 md:grid-cols-4">
            {journey.map((j) => (
              <RevealItem key={j.step} className="relative md:pt-10">
                <span className="absolute left-0 top-8 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-volt-500 shadow-[0_0_12px_rgba(0,127,196,0.7)] md:block" />
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-volt-400">{j.step}</p>
                <h3 className="mt-3 font-display text-base text-silver-100">{j.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-400">{j.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Applications */}
      <Section tone="raised">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow index="02">Lithium Applications</Eyebrow>
            <Heading as="h2" className="mt-5">
              Serving the evolving energy needs of our customers
            </Heading>
            <p className="mt-6 leading-relaxed text-silver-300">
              We are bringing together our decades of experience, technical understanding, customer
              relationships, sales network, market knowledge, and passion for serving the evolving
              energy needs of our customers to build a strong presence across the lithium battery
              ecosystem.
            </p>
            <Link
              href="/products"
              className="group mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-silver-200 hover:text-volt-400"
            >
              See our current products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-steel-400">
              Our lithium battery business is focused on
            </p>
            <ul className="mt-6 space-y-3">
              {applications.map((a) => (
                <li key={a} className="flex items-center gap-3 border-b border-graphite-500 pb-3 text-silver-200">
                  <Check className="h-4 w-4 text-volt-400" />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Approach */}
      <Section>
        <Reveal className="mb-12 max-w-2xl">
          <Eyebrow index="03">Our Approach</Eyebrow>
          <Heading as="h2" className="mt-5">
            Our approach remains unchanged
          </Heading>
        </Reveal>
        <RevealGroup className="grid gap-px overflow-hidden rounded-[14px] border border-graphite-500 bg-graphite-500 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((a) => (
            <RevealItem key={a.n} className="surface-lit p-8 md:p-10">
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-volt-400">{a.n}</p>
              <p className="mt-5 font-display text-lg leading-snug text-silver-100">{a.t}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Technical understanding */}
      <Section tone="raised">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <Eyebrow index="04">Technical Understanding</Eyebrow>
            <Heading as="h2" className="mt-5">
              More than supplying batteries
            </Heading>
            <p className="mt-6 leading-relaxed text-silver-300">
              We recognise that lithium battery technology requires a different level of technical
              understanding and attention to detail. Every one of these factors plays an important
              role in delivering a reliable energy solution.
            </p>
            <p className="mt-5 leading-relaxed text-silver-300">
              Therefore, our focus is not merely on supplying batteries. We aim to understand the
              application and help our customers move towards solutions that are{" "}
              <span className="text-silver-100">
                technically suitable, dependable, safe, and commercially practical.
              </span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {considerations.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-3 rounded-[8px] border border-graphite-500 px-4 py-3 text-sm text-silver-200"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-volt-500" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Customer satisfaction */}
      <Section>
        <Reveal className="max-w-3xl">
          <Eyebrow index="05">Customer Satisfaction</Eyebrow>
          <Heading as="h2" className="mt-5">
            Built through more than just a product
          </Heading>
          <p className="mt-6 leading-relaxed text-silver-300">
            Our experience in the battery industry has taught us that customer satisfaction is built
            through:
          </p>
        </Reveal>
        <RevealGroup className="mt-10 flex flex-wrap gap-3">
          {satisfaction.map((s) => (
            <RevealItem
              key={s}
              className="rounded-full border border-graphite-500 px-5 py-2.5 font-display text-sm text-silver-100"
            >
              {s}
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Closing statement */}
      <Section tone="raised">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Seam className="mx-auto mb-12 max-w-xs" />
          <p className="leading-relaxed text-silver-300">
            As we embark on this new chapter, our commitment remains firmly rooted in the values that
            have guided us for the past four decades. We are carrying forward the experience of the
            past, embracing the technology of the future, and working towards a greener and more
            sustainable energy ecosystem.
          </p>
          <div className="mt-12 space-y-3 font-display text-xl leading-snug md:text-2xl">
            <p className="text-silver-300">Our experience gives us the foundation.</p>
            <p className="text-silver-200">Technology gives us the opportunity.</p>
            <p className="text-metal">Our customers give us the purpose.</p>
          </div>
        </Reveal>
      </Section>

      <CtaBand
        title="The next generation of energy"
        subtitle="Carrying forward the experience of the past while embracing the technology of the future — with the same commitment to quality and customer satisfaction."
        primary={{ label: "View Products", href: "/products" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
