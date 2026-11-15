import type { Metadata } from "next";
import { Section, Eyebrow, Heading, Divider } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Check } from "@/components/icons";
import { site } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
  description:
    "More than 40 years of lead-acid battery manufacturing under the brand Heritor — now taking the next step into lithium battery technology as LEIZOUN ENERGY.",
};

/* Copy is taken from the official company introduction (compressed version); don't add unverified claims. */

const applications = [
  "Electric mobility",
  "Automotive applications",
  "Home energy",
  "Solar energy systems",
  "Commercial and industrial applications",
  "Emerging energy storage requirements",
];

const approach = [
  "Understand the application",
  "Provide the right solution",
  "Deliver consistent quality",
  "Support our customers for the long term",
];

export default function AboutPage() {
  return (
    <>
      {/* Legacy */}
      <Section className="pt-32 md:pt-40">
        <Reveal className="max-w-3xl">
          <Eyebrow index="◆">Our Legacy · Our Experience</Eyebrow>
          <Heading as="h1" className="mt-5">
            From a legacy of battery expertise to the future of lithium energy
          </Heading>
          <p className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-silver-300">
            For over four decades, our journey has been built on a strong foundation of quality,
            expertise, trust, and customer commitment.
          </p>
          <p className="mt-5 leading-relaxed text-silver-300">
            With more than 40 years of experience in lead-acid battery manufacturing under the brand{" "}
            {site.legacy.brand}, we have developed deep knowledge of battery technology, manufacturing,
            quality, market requirements, and customer needs.
          </p>
        </Reveal>
        <RevealGroup className="mt-14 grid grid-cols-1 gap-8 border-t border-graphite-500 pt-8 sm:grid-cols-3">
          {[
            { big: site.legacy.years, l: "Years in battery manufacturing" },
            { big: site.legacy.brand, l: "Our lead-acid battery legacy" },
            { big: "ISO", l: "9001:2015 · 14001:2015 certified" },
          ].map((s) => (
            <RevealItem key={s.l}>
              <p className="font-display text-3xl text-metal">{s.big}</p>
              <p className="mt-2 text-xs text-steel-400">{s.l}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Lithium */}
      <Section tone="raised">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow index="01">The Next Chapter</Eyebrow>
            <Heading as="h2" className="mt-5">
              The next generation of energy
            </Heading>
            <p className="mt-6 leading-relaxed text-silver-300">
              As the energy landscape continues to evolve, we have consistently kept ourselves updated
              with emerging technologies and changing market requirements. Today, as the world moves
              towards electric mobility, renewable energy, and advanced energy storage, we are taking
              our next significant step into lithium battery technology.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-steel-400">
              Lithium battery applications we serve
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

      <Divider />

      {/* Approach */}
      <Section>
        <Reveal className="mb-12 max-w-2xl">
          <Eyebrow index="02">Our Approach</Eyebrow>
          <Heading as="h2" className="mt-5">
            Our approach remains unchanged
          </Heading>
        </Reveal>
        <RevealGroup className="grid gap-px overflow-hidden rounded-[14px] border border-graphite-500 bg-graphite-500 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((a, i) => (
            <RevealItem key={a} className="surface-lit p-8 md:p-10">
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-volt-400">0{i + 1}</p>
              <p className="mt-5 font-display text-lg leading-snug text-silver-100">{a}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-14 max-w-3xl">
          <p className="leading-relaxed text-silver-300">
            As we embark on this new chapter, we carry forward the experience of the past while
            embracing the technology of the future — with the same commitment to quality and customer
            satisfaction that has guided us for over 40 years.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/products" size="lg">
              View Products
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="secondary">
              Enquire
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}