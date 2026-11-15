import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Official secondary (horizontal) logo — per the brand guideline, used in
 * headers, footers and digital interfaces. The primary (vertical) logo and the
 * standalone mark live in `public/brand/`; the mark drives `app/icon.png`.
 */
export function Logo({
  className,
  href = "/",
  eager = false,
}: {
  className?: string;
  href?: string | null;
  /** Load immediately (above-the-fold header usage). */
  eager?: boolean;
}) {
  const content = (
    <Image
      src="/brand/leizoun-logo-horizontal.png"
      alt="LEIZOUN ENERGY — Lithium Power. Limitless Future."
      width={1600}
      height={286}
      loading={eager ? "eager" : "lazy"}
      className={cn("h-9 w-auto", className)}
    />
  );

  if (href === null) return content;
  return (
    <Link href={href} aria-label="LEIZOUN ENERGY — home" className="inline-flex">
      {content}
    </Link>
  );
}
