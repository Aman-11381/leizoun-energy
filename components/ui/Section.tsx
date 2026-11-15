import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Consistent page section wrapper with rhythm + optional eyebrow/title. */
export function Section({
  children,
  className,
  containerClassName,
  id,
  tone = "base",
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  tone?: "base" | "raised" | "deep";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 md:py-24 lg:py-28",
        tone === "raised" &&
          "border-y border-graphite-500/60 bg-ink-700 bg-[radial-gradient(70%_70%_at_50%_0%,rgba(0,127,196,0.09),transparent_70%)]",
        tone === "deep" && "border-y border-graphite-500/60 bg-ink-900",
        className
      )}
    >
      <div className={cn("mx-auto w-full max-w-[1280px] px-6 md:px-10", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({
  children,
  index,
  className,
}: {
  children: ReactNode;
  index?: string;
  className?: string;
}) {
  return (
    <span className={cn("eyebrow inline-flex items-center gap-2", className)}>
      {index && <span className="text-volt-500">{index}</span>}
      {index && <span className="h-px w-6 bg-graphite-500" />}
      {children}
    </span>
  );
}

/** Metallic display heading. */
export function Heading({
  children,
  as: Tag = "h2",
  className,
  metal = true,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  metal?: boolean;
}) {
  const size =
    Tag === "h1"
      ? "text-[length:var(--text-h1)]"
      : Tag === "h3"
        ? "text-[length:var(--text-h3)]"
        : "text-[length:var(--text-h2)]";
  return (
    <Tag
      className={cn(
        "font-display leading-[1.1]",
        size,
        metal ? "text-metal" : "text-silver-100",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/** The electric-blue energy seam — the recurring brand signature. */
export function Seam({ className }: { className?: string }) {
  return <div className={cn("seam w-full", className)} aria-hidden />;
}

/** Machined hairline divider. */
export function Divider({ className }: { className?: string }) {
  return <div className={cn("hairline w-full", className)} aria-hidden />;
}
