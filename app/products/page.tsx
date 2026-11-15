import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow, Heading, Divider } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProductShot } from "@/components/ui/ProductShot";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import { getCategories } from "@/lib/data/products";
import { ArrowRight, iconForFeature, iconForSlug } from "@/components/icons";

export const metadata: Metadata = {
  title: "Product Catalogue",
  description:
    "Explore the LEIZOUN ENERGY range — LiFePO4 lithium inverter batteries (12.8 V, 25.6 V, 51.2 V) and e-rickshaw batteries (51.2 V, 60 V, 64 V · 105 Ah).",
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
            Two LiFePO4 lithium product lines, engineered on four decades of battery expertise —
            each with an inbuilt BMS, zero maintenance, and the quality standard behind our name.
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
                  className="group relative grid overflow-hidden clip-shear rounded-[14px] border border-graphite-500 transition-colors hover:border-silver-300/40 lg:grid-cols-2"
                >
                  <div className={reversed ? "lg:order-2" : ""}>
                    <ProductShot
                      image={c.image}
                      eager={i === 0}
                      className="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[460px]"
                    />
                  </div>
                  <div className={`flex flex-col justify-center p-8 md:p-12 ${reversed ? "lg:order-1" : ""}`}>
                    <div className="mb-4 flex items-center gap-3 text-steel-400">
                      {Icon && <Icon className="h-5 w-5" />}
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.24em]">
                        0{i + 1} — {c.tagline}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl leading-tight text-silver-100">{c.name}</h2>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-silver-300">{c.summary}</p>

                    <dl className="mt-8 grid max-w-md grid-cols-2 gap-x-10 gap-y-5 border-t border-graphite-500 pt-6">
                      {c.keyStats.map((s) => (
                        <div key={s.label} className="flex flex-col-reverse">
                          <dt className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-steel-400">{s.label}</dt>
                          <dd className="whitespace-nowrap font-display text-base text-metal">{s.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {c.features.map((f) => {
                        const FIcon = iconForFeature[f.icon];
                        return (
                          <li
                            key={f.title}
                            className="inline-flex items-center gap-2 rounded-full border border-graphite-500 px-3 py-1 text-[0.7rem] text-steel-400"
                          >
                            <FIcon className="h-3.5 w-3.5" />
                            {f.title}
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-silver-200 transition-colors group-hover:text-volt-400">
                      Explore {c.models.length} models
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
        title="Need a custom configuration?"
        subtitle="Tell us your voltage, backup or range requirement — our team will recommend the right LEIZOUN battery for your application."
        primary={{ label: "Talk to our team", href: "/contact" }}
        secondary={{ label: "About LEIZOUN", href: "/about" }}
      />
    </>
  );
}
