import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** The real LEIZOUN "LE" mark (transparent PNG). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/leizoun-mark.png"
      alt="LEIZOUN ENERGY"
      width={2396}
      height={1688}
      priority
      className={cn("h-8 w-auto", className)}
    />
  );
}

/** Full brand lockup image (mark + wordmark + tagline). */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/leizoun-logo.png"
      alt="LEIZOUN ENERGY — Lithium Power. Limitless Future."
      width={3886}
      height={2514}
      className={cn("h-auto w-44", className)}
    />
  );
}

/** Header lockup: real mark + wordmark, compact and horizontal. */
export function Logo({
  className,
  withWordmark = true,
  href = "/",
}: {
  className?: string;
  withWordmark?: boolean;
  href?: string | null;
}) {
  const content = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="h-8 w-auto" />
      {withWordmark && (
        <span className="font-display text-[0.95rem] leading-none tracking-[0.14em]">
          <span className="text-metal">LEIZOUN</span>{" "}
          <span className="text-volt-500">ENERGY</span>
        </span>
      )}
    </span>
  );

  if (href === null) return content;
  return (
    <Link href={href} aria-label="LEIZOUN ENERGY — home" className="inline-flex">
      {content}
    </Link>
  );
}
