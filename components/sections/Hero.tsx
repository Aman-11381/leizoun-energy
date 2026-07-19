import { ButtonLink } from "@/components/ui/Button";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { ArrowRight } from "@/components/icons";
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
            <span className="h-px w-8 bg-volt-500 shadow-[0_0_10px_rgba(30,144,255,0.7)]" />
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
            Built on four decades of trusted battery manufacturing, {site.name} carries a legacy
            of quality into the lithium era — intelligent, high-performance energy for mobility,
            automotive, solar, home and industry.
          </p>

          <div className="anim-hero mt-9 flex flex-col gap-4 sm:flex-row" style={d("0.32s")}>
            <ButtonLink href="/products" size="lg">
              Explore Products <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="secondary">
              Enquire Now
            </ButtonLink>
          </div>

          <div
            className="anim-hero mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-graphite-500 pt-6"
            style={d("0.42s")}
          >
            {[
              { k: "40+", v: "Years of expertise" },
              { k: "3000+", v: "Charge cycles" },
              { k: "6+", v: "Energy sectors" },
            ].map((s) => (
              <div key={s.v}>
                <p className="font-display text-lg text-silver-100">{s.k}</p>
                <p className="mt-1 text-xs text-steel-400">{s.v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="anim-hero-visual relative">
          <ProductVisual slug="e-bike" className="aspect-[4/5] w-full rounded-[14px] border border-graphite-500" />
        </div>
      </div>
    </section>
  );
}
