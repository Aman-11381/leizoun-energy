import Link from "next/link";
import { Heading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 pt-16">
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt-500/[0.06] blur-[120px]" />
      <div className="relative text-center">
        <p className="font-display text-[length:var(--text-display)] text-metal">404</p>
        <Heading as="h1" metal={false} className="mx-auto mt-2 text-silver-100">
          Signal lost
        </Heading>
        <p className="mx-auto mt-4 max-w-sm text-silver-300">
          The page you&apos;re looking for has powered down or moved.
        </p>
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/">
            Back home <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
        <Link href="/products" className="mt-6 inline-block text-xs uppercase tracking-[0.14em] text-steel-400 hover:text-silver-200">
          Or explore products
        </Link>
      </div>
    </section>
  );
}
