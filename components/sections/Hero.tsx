import { ButtonLink } from "@/components/ui/Button";
import { ProductShot } from "@/components/ui/ProductShot";
import { site } from "@/lib/config/site";
import type { CSSProperties } from "react";

const d = (delay: string) => ({ ["--d" as string]: delay } as CSSProperties);

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-16">
      <div className="absolute inset-0 grid-backdrop opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-volt-500/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-800 to-transparent" />

      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-[1280px] items-center gap-12 px-6 py-16 md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="anim-hero eyebrow mb-6 flex items-center gap-3" style={d("0.05s")}>
            <span className="anim-line h-px w-8 bg-volt-500 shadow-[0_0_10px_rgba(0,127,196,0.7)]" />
            40+ Years of Battery Expertise
          </p>

          <h1
            className="anim-hero font-display text-[length:var(--text-display)] leading-[1.05]"
            style={d("0.12s")}
          >
            <span className="text-metal">LITHIUM POWER.</span>
            <br />
            <span className="text-silver-100">LIMITLESS </span>
            <span className="text-volt-500">FUTURE.</span>
          </h1>

          <p
            className="anim-hero mt-7 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-silver-300"
            style={d("0.22s")}
          >
            LiFePO4 lithium batteries for home inverters and e-rickshaws — built on four
            decades of battery expertise, with an inbuilt BMS and zero maintenance.
          </p>

          <div className="anim-hero mt-9 flex flex-col gap-4 sm:flex-row" style={d("0.32s")}>
            <ButtonLink href="/products/inverter" size="lg">
              Inverter Batteries
            </ButtonLink>
            <ButtonLink href="/products/e-rickshaw" size="lg" variant="secondary">
              E-Rickshaw Batteries
            </ButtonLink>
          </div>

          <div
            className="anim-hero mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-graphite-500 pt-6 sm:gap-6"
            style={d("0.42s")}
          >
            {[
              { k: "40+", v: "Years of expertise" },
              { k: "LiFePO4", v: "Lithium chemistry" },
              { k: "Up to 7 yrs", v: "Warranty · T&C apply" },
            ].map((s) => (
              <div key={s.v}>
                <p className="whitespace-nowrap font-display text-sm text-silver-100 sm:text-lg">{s.k}</p>
                <p className="mt-1 text-xs text-steel-400">{s.v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="anim-hero-visual relative">
          <ProductShot
            image={{
              src: "/products/range/range-combo.webp",
              alt: "LEIZOUN lithium e-rickshaw battery and inverter battery side by side",
              width: 1600,
              height: 927,
            }}
            eager
            float
            padding="p-[6%]"
            className="aspect-[4/3] w-full rounded-[14px] border border-graphite-500"
          />
          <p className="mt-4 text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-400">
            {site.certification}
          </p>
        </div>
      </div>
    </section>
  );
}
