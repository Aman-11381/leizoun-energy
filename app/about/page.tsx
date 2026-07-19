import type { Metadata } from "next";
import { Section, Eyebrow, Heading, Divider, Seam } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { CtaBand } from "@/components/sections/CtaBand";
import { Bolt, Shield, Cpu, Gauge, Leaf, Cycle } from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Over 40 years of battery manufacturing expertise, now engineered into lithium technology. The legacy, mission and manufacturing philosophy behind LEIZOUN ENERGY.",
};

const journey = [
  { year: "The Legacy", title: "Four decades of batteries", body: "Over 40 years manufacturing dependable batteries — building deep expertise and lasting customer trust." },
  { year: "The Expertise", title: "Knowledge that compounds", body: "Mastery of battery technology, manufacturing, quality and market needs, backed by an established sales and service network." },
  { year: "The Evolution", title: "Keeping pace with change", body: "Staying ahead as the world moves toward electric mobility, renewable energy and advanced storage." },
  { year: "LEIZOUN ENERGY", title: "The lithium chapter", body: "Carrying our legacy of quality forward into next-generation lithium technology." },
];

const values = [
  { icon: Gauge, title: "Performance", body: "We refuse to compromise on power, density, or reliability." },
  { icon: Shield, title: "Safety", body: "Protection is engineered in — never an afterthought." },
  { icon: Cpu, title: "Intelligence", body: "Smart management makes every cell smarter and safer." },
  { icon: Cycle, title: "Longevity", body: "Products built to last — the standard behind our name for decades." },
  { icon: Leaf, title: "Commitment", body: "Long-term relationships and service, not one-time sales." },
  { icon: Bolt, title: "Innovation", body: "The experience of the past, the technology of the future." },
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
            For over four decades, our journey has been built on quality, expertise, trust, and
            customer commitment. With more than 40 years in battery manufacturing, we&apos;ve
            developed deep knowledge of the technology, the market, and our customers. LEIZOUN
            ENERGY brings that same commitment into advanced lithium technology — for electric
            mobility, automotive, home, solar, commercial and industrial energy.
          </p>
        </Reveal>
        <RevealGroup className="mt-14 grid grid-cols-2 gap-8 border-t border-graphite-500 pt-8 md:grid-cols-4">
          {[
            { big: "40+", l: "Years of expertise" },
            { big: "Trusted", l: "Manufacturing" },
            { big: "Smart", l: "BMS technology" },
            { big: "Long-term", l: "Customer support" },
          ].map((s) => (
            <RevealItem key={s.l}>
              <p className="font-display text-3xl text-metal">{s.big}</p>
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
              To understand each application, provide the right lithium solution, deliver
              consistent quality, and support our customers for the long term.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="surface-lit p-10 md:p-14">
            <Eyebrow index="02">Vision</Eyebrow>
            <p className="mt-6 font-display text-xl leading-relaxed text-silver-100">
              To carry a trusted legacy of battery expertise into the electric era — powering a
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
            Four decades, one commitment
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
              Precision, proven over decades
            </Heading>
            <p className="mt-5 text-[length:var(--text-lead)] leading-relaxed text-silver-300">
              The manufacturing discipline we&apos;ve refined over 40 years now underpins every
              LEIZOUN lithium battery — built on grade-A cells, assembled on quality-controlled
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
        title="The next generation of energy"
        subtitle="Carrying 40 years of expertise into lithium. Explore our products or start a conversation about partnership."
        primary={{ label: "View Products", href: "/products" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
