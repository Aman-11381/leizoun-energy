import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-sm py-4",
};

const variants: Record<Variant, string> = {
  primary:
    "group relative overflow-hidden bg-graphite-600 text-silver-100 border border-graphite-500 hover:border-volt-500/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
  secondary:
    "border border-graphite-500 text-silver-200 hover:text-silver-100 hover:border-silver-300/60 hover:bg-graphite-600/40",
  ghost:
    "text-silver-200 hover:text-silver-100 px-0 border-0",
};

const baseCls =
  "clip-shear inline-flex items-center justify-center gap-2 font-medium uppercase tracking-[0.12em] rounded-[2px] transition-[color,border-color,background-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-800 active:translate-y-px";

function Inner({ variant, children }: { variant: Variant; children: ReactNode }) {
  return (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px translate-y-px bg-gradient-to-r from-transparent via-volt-500 to-transparent opacity-0 shadow-[0_0_18px_rgba(30,144,255,0.6)] transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );
}

type LinkButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className">;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: LinkButtonProps) {
  const external = /^https?:|^mailto:|^tel:/.test(href);
  const cls = cn(baseCls, sizes[size], variants[variant], className);

  if (external) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        <Inner variant={variant}>{children}</Inner>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      <Inner variant={variant}>{children}</Inner>
    </Link>
  );
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ComponentProps<"button">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={cn(baseCls, sizes[size], variants[variant], className)} {...rest}>
      <Inner variant={variant}>{children}</Inner>
    </button>
  );
}
