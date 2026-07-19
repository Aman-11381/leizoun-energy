import type { Metadata } from "next";
import { Section, Eyebrow, Heading, Divider, Seam } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { CtaBand } from "@/components/sections/CtaBand";
import { StatCounter } from "@/components/ui/StatCounter";
import { Bolt, Shield, Cpu, Gauge, Leaf, Cycle } from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story, mission and manufacturing philosophy behind LEIZOUN ENERGY — engineering next-generation lithium battery technology.",
};

const journey = [
  { year: "Foundation", title: "A vision for cleaner power", body: "Born from the belief that energy should be intelligent, reliable, and clean." },
  { year: "Engineering", title: "Building the platform", body: "Developing a smart BMS and precision manufacturing at the core of every product." },
  { year: "Range", title: "A full product family", body: "From mobility to industrial storage — one standard of quality across five lines." },
  { year: "Future", title: "Scaling the electric era", body: "Expanding capacity, categories, and partnerships for a limitless future." },
];

const values = [
  { icon: Gauge, title: "Performance", body: "We refuse to compromise on power, density, or reliability." },
  { icon: Shield, title: "Safety", body: "Protection is engineered in — never an afterthought." },
  { icon: Cpu, title: "Intelligence", body: "Smart management makes every cell smarter and safer." },
  { icon: Cycle, title: "Longevity", body: "Products designed to last years, not seasons." },
  { icon: Leaf, title: "Responsibility", body: "Cleaner energy for people and the planet." },
  { icon: Bolt, title: "Innovation", body: "We build for the next decade, not the last one." },
];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <Section className="pt-32 md:pt-40">
        <Reveal className="max-w-3xl">
          <Eyebrow index="◆">About LEIZOUN</Eyebrow>
          <Heading as="h1" className="mt-5">
            Engineering the limitless future of energy
          </Heading>
          <p className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-silver-300">
            LEIZOUN ENERGY is a lithium battery technology company built on a simple conviction:
            that power should be intelligent, dependable, and clean. We design and manufacture
            advanced energy systems that move people, protect businesses, and power industry.
          </p>
        </Reveal>
        <RevealGroup className="mt-14 grid grid-cols-2 gap-8 border-t border-graphite-500 pt-8 md:grid-cols-4">
          {[
            { k: 5, s: "+", l: "Product lines" },
            { k: 3000, s: "+", l: "Charge cycles" },
            { k: 260, s: "", l: "Wh/kg density" },
            { k: 100, s: "%", l: "QA tested" },
          ].map((s) => (
            <RevealItem key={s.l}>
              <p className="font-display text-3xl text-metal">
                <StatCounter value={s.k} suffix={s.s} />
              </p>
              <p className="mt-2 text-xs text-steel-400">{s.l}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Divider />

      {/* Mission & Vision */}
      <Section>
        <div className="grid gap-px overflow-hidden rounded-[14px] border border-graphite-500 bg-graphite-500 md:grid-cols-2">
          <Reveal className="surface-lit p-10 md:p-14">
            <Eyebrow index="01">Mission</Eyebrow>
            <p className="mt-6 font-display text-xl leading-relaxed text-silver-100">
              To deliver intelligent, high-performance lithium energy that people and businesses
              can depend on — every day, in every condition.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="surface-lit p-10 md:p-14">
            <Eyebrow index="02">Vision</Eyebrow>
            <p className="mt-6 font-display text-xl leading-relaxed text-silver-100">
              To be the energy technology brand that defines the electric era — powering a
              limitless, sustainable future.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Journey */}
      <Section tone="raised">
        <Reveal className="mb-12 max-w-2xl">
          <Eyebrow index="03">Journey</Eyebrow>
          <Heading as="h2" className="mt-5">
            The road to limitless
          </Heading>
        </Reveal>
        <div className="relative">
          <div className="absolute left-0 top-0 hidden h-px w-full bg-graphite-500 md:block" />
          <RevealGroup className="grid gap-8 md:grid-cols-4">
            {journey.map((j) => (
              <RevealItem key={j.year} className="relative md:pt-10">
                <span className="absolute left-0 top-8 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-volt-500 shadow-[0_0_12px_rgba(30,144,255,0.7)] md:block" />
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-volt-400">{j.year}</p>
                <h3 className="mt-3 font-display text-base text-silver-100">{j.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-400">{j.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Manufacturing & Technology */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ProductVisual slug="industrial" className="aspect-[5/4] w-full rounded-[14px] border border-graphite-500" />
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow index="04">Manufacturing & Technology</Eyebrow>
            <Heading as="h2" className="mt-5">
              Precision, at every step
            </Heading>
            <p className="mt-5 text-[length:var(--text-lead)] leading-relaxed text-silver-300">
              Every LEIZOUN battery is built on grade-A cells, assembled on quality-controlled
              lines, and governed by an intelligent BMS. From incoming inspection to final
              testing, precision is the standard — not the exception.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Grade-A cell sourcing",
                "Smart BMS integration",
                "Automated assembly",
                "Multi-stage QA testing",
                "Thermal & safety validation",
                "Traceable quality control",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-silver-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-volt-500" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Core values */}
      <Section tone="raised">
        <Reveal className="mb-12 max-w-2xl">
          <Seam className="mb-8 max-w-xs" />
          <Eyebrow index="05">Core Values</Eyebrow>
          <Heading as="h2" className="mt-5">
            What we stand for
          </Heading>
        </Reveal>
        <RevealGroup className="grid gap-px overflow-hidden rounded-[12px] border border-graphite-500 bg-graphite-500 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <RevealItem key={v.title} className="group surface-lit p-8 transition-colors hover:bg-ink-700">
              <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-graphite-500 text-silver-300 transition-colors group-hover:border-volt-500/50 group-hover:text-volt-400">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-base text-silver-100">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-silver-300">{v.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaBand
        title="Build the future with us"
        subtitle="Explore our products or start a conversation about partnership."
        primary={{ label: "View Products", href: "/products" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
