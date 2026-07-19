import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-reveal wrappers — CSS-only (see globals.css `.reveal`).
 * Content renders visible by default and animates via scroll-driven
 * animations where supported. No JS, no hydration dependency, so content
 * is never hidden on first paint or with JavaScript disabled.
 * The `delay` prop is accepted for API compatibility (staggering is handled
 * by the scroll timeline, so it is a no-op visually but kept for call sites).
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  return <Tag className={cn("reveal", className)}>{children}</Tag>;
}

export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return <div className={className}>{children}</div>;
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
