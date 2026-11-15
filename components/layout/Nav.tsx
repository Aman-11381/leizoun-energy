"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ButtonLink } from "@/components/ui/Button";
import { nav } from "@/lib/config/site";
import { cn } from "@/lib/utils";
import { Menu, Close } from "@/components/icons";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Close the mobile menu on route change (deferred to avoid synchronous effect setState).
    const id = requestAnimationFrame(() => setMobileOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        mobileOpen
          ? "border-b border-graphite-500 bg-ink-900"
          : scrolled
            ? "glass border-b border-graphite-500/70"
            : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-6 md:px-10">
        <Logo eager className="h-9 md:h-11" />

        <div className="hidden items-center gap-8 lg:flex">
          <nav className="flex items-center gap-1">
            {nav.map((n) => {
              const active = isActive(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors",
                    active ? "text-silver-100" : "text-silver-300 hover:text-silver-100"
                  )}
                >
                  {n.label}
                  {active && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-px bg-volt-500 shadow-[0_0_10px_rgba(0,127,196,0.7)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <ButtonLink href="/contact" size="sm" aria-current={pathname === "/contact" ? "page" : undefined}>
              Enquire
            </ButtonLink>
          </div>
        </div>

        <div className="-mr-2 flex items-center lg:hidden">
          <ThemeToggle />
          <button
            className="flex h-11 w-11 items-center justify-center text-silver-100"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        inert={!mobileOpen}
        className={cn(
          "overflow-y-auto border-t border-graphite-500 bg-ink-900 transition-[max-height,opacity] duration-500 lg:hidden",
          mobileOpen ? "max-h-[calc(100svh-4rem)] opacity-100" : "pointer-events-none max-h-0 border-transparent opacity-0"
        )}
      >
        <nav className="space-y-1 px-6 py-6">
          {nav.map((n) => {
            const active = isActive(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block px-2 py-3 text-sm uppercase tracking-[0.14em]",
                  active ? "text-silver-100" : "text-silver-200"
                )}
              >
                {n.label}
              </Link>
            );
          })}
          <div className="pt-3">
            <ButtonLink href="/contact" className="w-full" size="md">
              Enquire
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
