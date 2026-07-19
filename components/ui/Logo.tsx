import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * LEIZOUN "LE" monogram — a clean geometric echo of the master logo:
 * a forward-leaning L cradling a three-blade E, with the middle blade
 * carrying the electric-blue energy seam. Uses the brushed-metal gradient.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 44"
      className={cn("h-8 w-auto", className)}
      role="img"
      aria-label="LEIZOUN ENERGY"
    >
      <defs>
        <linearGradient id="le-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4f7fb" />
          <stop offset="42%" stopColor="#c9d1db" />
          <stop offset="72%" stopColor="#7e8794" />
          <stop offset="100%" stopColor="#3a414c" />
        </linearGradient>
        <linearGradient id="le-volt" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0b6fd6" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#3aa0ff" />
          <stop offset="100%" stopColor="#0b6fd6" stopOpacity="0.2" />
        </linearGradient>
        <filter id="le-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g transform="skewX(-10) translate(6 0)" fill="url(#le-metal)">
        {/* L vertical */}
        <path d="M4 4 h8 v34 h-8 z" />
        {/* E top blade */}
        <path d="M20 4 h28 l-3 8 h-25 z" />
        {/* E middle blade */}
        <path d="M20 17 h22 l-3 8 h-19 z" />
        {/* Shared bottom blade / L foot */}
        <path d="M4 30 h42 l-3 8 h-39 z" />
      </g>
      {/* Blue energy seam on the middle blade */}
      <g transform="skewX(-10) translate(6 0)">
        <rect x="22" y="20.5" width="16" height="1.2" fill="url(#le-volt)" filter="url(#le-glow)" />
      </g>
    </svg>
  );
}

/** Full lockup: monogram + wordmark, for header/footer. */
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
