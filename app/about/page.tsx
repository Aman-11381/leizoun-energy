import type { Metadata } from "next";
import { Section, Eyebrow, Heading, Divider } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";

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

      <CtaBand
        title="The next generation of energy"
        subtitle="Carrying 40 years of expertise into lithium. Explore our products or start a conversation about partnership."
        primary={{ label: "View Products", href: "/products" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
