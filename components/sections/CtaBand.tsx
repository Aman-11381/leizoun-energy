import { ButtonLink } from "@/components/ui/Button";
import { Heading, Seam } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/icons";

export function CtaBand({
  title = "Power your business with LEIZOUN",
  subtitle = "Partner with a next-generation energy manufacturer. Distributors, dealers and OEMs welcome.",
  primary = { label: "Become a Distributor", href: "/contact" },
  secondary = { label: "View Products", href: "/products" },
}: {
  title?: string;
  subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <Seam />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt-500/[0.06] blur-[120px]" />
      <Reveal className="relative mx-auto max-w-3xl px-6 text-center">
        <Heading as="h2" className="mx-auto">
          {title}
        </Heading>
        <p className="mx-auto mt-5 max-w-xl text-[length:var(--text-lead)] text-silver-300">
          {subtitle}
        </p>
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <ButtonLink href={primary.href} size="lg">
            {primary.label} <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href={secondary.href} size="lg" variant="secondary">
            {secondary.label}
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
