import type { Metadata } from "next";
import { Section, Eyebrow, Heading, Divider, Seam } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { StatCounter } from "@/components/ui/StatCounter";
import { Cpu, Thermometer, Shield, Battery, Cycle, Leaf, Gauge, Bolt } from "@/components/icons";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Inside LEIZOUN ENERGY — lithium cell chemistry, smart BMS, thermal and safety engineering, and rigorous testing.",
};

const pillars = [
  { icon: Cpu, title: "Smart BMS", body: "A dedicated battery-management system monitors and balances every cell, reports health, and prevents faults before they happen." },
  { icon: Thermometer, title: "Thermal Management", body: "Engineered heat dissipation keeps output stable and safe across demanding temperatures and duty cycles." },
  { icon: Shield, title: "Multi-Layer Safety", body: "Protection against overcharge, over-discharge, overload, short-circuit and thermal runaway — layered by design." },
  { icon: Battery, title: "Grade-A Cells", body: "Only premium, individually tested lithium cells — the foundation of density, longevity and reliability." },
  { icon: Cycle, title: "Cycle Longevity", body: "Optimised chemistry sustains thousands of deep cycles with minimal capacity fade." },
  { icon: Leaf, title: "Clean & Efficient", body: "Maintenance-free operation with higher efficiency and a lighter environmental footprint." },
];

const specs = [
  { k: 260, s: " Wh/kg", l: "Energy density" },
  { k: 3000, s: "+", l: "Charge cycles" },
  { k: 95, s: "%", l: "Round-trip efficiency" },
  { k: 100, s: "%", l: "Factory tested" },
];

export default function TechnologyPage() {
  return (
    <>
      <Section className="pt-32 md:pt-40">
        <Reveal className="max-w-3xl">
          <Eyebrow index="◆">Technology</Eyebrow>
          <Heading as="h1" className="mt-5">
            Intelligence engineered into every cell
          </Heading>
          <p className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-silver-300">
            LEIZOUN energy systems are more than cells in a case. They&apos;re intelligent
            platforms — combining premium chemistry, a smart BMS, thermal control, and layered
            safety, validated by rigorous testing.
          </p>
        </Reveal>
        <RevealGroup className="mt-14 grid grid-cols-2 gap-8 border-t border-graphite-500 pt-8 md:grid-cols-4">
          {specs.map((s) => (
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

      <Section>
        <Reveal className="mb-12 max-w-2xl">
          <Eyebrow index="01">The Platform</Eyebrow>
          <Heading as="h2" className="mt-5">
            Six systems, one standard
          </Heading>
        </Reveal>
        <RevealGroup className="grid gap-px overflow-hidden rounded-[12px] border border-graphite-500 bg-graphite-500 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <RevealItem key={p.title} className="group surface-lit p-8 transition-colors hover:bg-ink-700">
              <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-graphite-500 text-silver-300 transition-colors group-hover:border-volt-500/50 group-hover:text-volt-400">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-base text-silver-100">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-silver-300">{p.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Why lithium technical */}
      <Section tone="raised">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow index="02">Why Lithium</Eyebrow>
            <Heading as="h2" className="mt-5">
              A generational leap over lead-acid
            </Heading>
            <p className="mt-5 max-w-md text-[length:var(--text-lead)] leading-relaxed text-silver-300">
              Lithium chemistry delivers more usable energy, far greater cycle life, faster
              charging, and near-zero maintenance — in a fraction of the weight.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[12px] border border-graphite-500">
              {[
                { m: "Cycle life", lith: "3000+ cycles", lead: "~500 cycles" },
                { m: "Weight", lith: "Up to 60% lighter", lead: "Heavy" },
                { m: "Charging", lith: "Fast", lead: "Slow" },
                { m: "Usable capacity", lith: "~95%", lead: "~50%" },
                { m: "Maintenance", lith: "None", lead: "Regular" },
              ].map((row, i) => (
                <div
                  key={row.m}
                  className={`grid grid-cols-3 items-center gap-2 px-5 py-4 text-sm ${
                    i % 2 ? "bg-ink-800/40" : ""
                  }`}
                >
                  <span className="text-steel-400">{row.m}</span>
                  <span className="text-volt-400">{row.lith}</span>
                  <span className="text-silver-300/70 line-through decoration-graphite-500">{row.lead}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Testing */}
      <Section>
        <Reveal>
          <Seam className="mb-10 max-w-xs" />
          <Eyebrow index="03">Validation</Eyebrow>
          <Heading as="h2" className="mt-5 max-w-2xl">
            Tested to earn your trust
          </Heading>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Gauge, t: "Performance testing", d: "Capacity, output & efficiency verification." },
            { icon: Thermometer, t: "Thermal testing", d: "Behaviour across temperature extremes." },
            { icon: Shield, t: "Safety testing", d: "Overcharge, short-circuit & abuse tolerance." },
            { icon: Bolt, t: "Cycle testing", d: "Long-term durability under repeated use." },
          ].map((v) => (
            <RevealItem key={v.t} className="rounded-[10px] border border-graphite-500 p-6">
              <v.icon className="h-5 w-5 text-volt-400" />
              <h3 className="mt-4 text-sm text-silver-100">{v.t}</h3>
              <p className="mt-2 text-sm text-steel-400">{v.d}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaBand
        title="Ready to build with better energy?"
        subtitle="Explore the product range or talk to our engineering team."
        primary={{ label: "View Products", href: "/products" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
