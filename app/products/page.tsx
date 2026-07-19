import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow, Heading, Divider } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import { getCategories } from "@/lib/data/products";
import { ArrowRight, iconForSlug } from "@/components/icons";

export const metadata: Metadata = {
  title: "Product Catalogue",
  description:
    "Explore the LEIZOUN ENERGY range — E-Bike, E-Rickshaw, Inverter, Built-in UPS and Industrial lithium battery solutions.",
};

export default async function ProductsPage() {
  const categories = await getCategories();

  return (
    <>
      <Section className="pt-32 md:pt-40">
        <Reveal className="max-w-3xl">
          <Eyebrow index="◆">Catalogue</Eyebrow>
          <Heading as="h1" className="mt-5">
            The LEIZOUN range
          </Heading>
          <p className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-silver-300">
            Lithium product lines engineered on four decades of battery expertise — each
            purpose-built for its application, unified by intelligent battery management, premium
            cells, and the quality standard behind our name.
          </p>
        </Reveal>
      </Section>

      <Divider />

      <Section className="pt-0">
        <div className="flex flex-col gap-6 md:gap-8">
          {categories.map((c, i) => {
            const Icon = iconForSlug[c.slug];
            const reversed = i % 2 === 1;
            return (
              <Reveal key={c.slug}>
                <Link
                  href={`/products/${c.slug}`}
                  className="group relative grid overflow-hidden clip-shear rounded-[14px] border border-graphite-500 transition-colors hover:border-silver-300/40 md:grid-cols-2"
                >
                  <div className={reversed ? "md:order-2" : ""}>
                    <ProductVisual slug={c.slug} className="h-64 w-full md:h-full md:min-h-[340px]" />
                  </div>
                  <div className={`flex flex-col justify-center p-8 md:p-12 ${reversed ? "md:order-1" : ""}`}>
                    <div className="mb-4 flex items-center gap-3 text-steel-400">
                      {Icon && <Icon className="h-5 w-5" />}
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.24em]">
                        0{i + 1} — {c.tagline}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl leading-tight text-silver-100">{c.name}</h2>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-silver-300">{c.summary}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {c.applications.map((a) => (
                        <span
                          key={a}
                          className="rounded-full border border-graphite-500 px-3 py-1 text-[0.7rem] text-steel-400"
                        >
                          {a}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                      {c.specChips.map((s) => (
                        <div key={s.label}>
                          <span className="font-display text-base text-metal">
                            {s.value}
                            {s.unit ? ` ${s.unit}` : ""}
                          </span>
                          <span className="ml-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-steel-400">
                            {s.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-silver-200 transition-colors group-hover:text-volt-400">
                      Explore {c.name}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                  <span className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-volt-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 flex justify-center">
          <ButtonLink href="/contact" size="lg">
            Request a quote <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </Reveal>
      </Section>

      <CtaBand
        title="Need a tailored solution?"
        subtitle="From single packs to OEM-scale supply, our engineering team will spec the right battery for your application."
        primary={{ label: "Talk to our team", href: "/contact" }}
        secondary={{ label: "About LEIZOUN", href: "/about" }}
      />
    </>
  );
}
