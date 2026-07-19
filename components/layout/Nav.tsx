"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { nav } from "@/lib/config/site";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, Close, ArrowUpRight, iconForSlug } from "@/components/icons";

const productLinks = [
  { slug: "e-bike", name: "E-Bike Batteries", tagline: "Lightweight range" },
  { slug: "e-rickshaw", name: "E-Rickshaw Batteries", tagline: "Daily-grind duty" },
  { slug: "inverter", name: "Inverter Batteries", tagline: "Silent backup" },
  { slug: "ups", name: "Built-in UPS", tagline: "Instant continuity" },
  { slug: "industrial", name: "Industrial Solutions", tagline: "Scale energy" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Close menus on route change (deferred to avoid synchronous effect setState).
    const id = requestAnimationFrame(() => {
      setMobileOpen(false);
      setMegaOpen(false);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass border-b border-graphite-500/70" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-6 md:px-10">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setMegaOpen(false)}>
          <div
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
          >
            <Link
              href="/products"
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors",
                pathname.startsWith("/products") ? "text-silver-100" : "text-silver-300 hover:text-silver-100"
              )}
            >
              Products
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", megaOpen && "rotate-180")} />
            </Link>

            {megaOpen && (
              <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3">
                <div className="glass clip-shear grid grid-cols-2 gap-1 rounded-[10px] border border-graphite-500 p-3">
                  {productLinks.map((p) => {
                    const Icon = iconForSlug[p.slug];
                    return (
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        className="group flex items-center gap-3 rounded-[6px] p-3 transition-colors hover:bg-graphite-600"
                      >
                        <span className="flex h-9 w-9 items-center justify-center border border-graphite-500 text-silver-300 group-hover:text-volt-500 group-hover:border-volt-500/50">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm text-silver-100">{p.name}</span>
                          <span className="block text-xs text-steel-400">{p.tagline}</span>
                        </span>
                      </Link>
                    );
                  })}
                  <Link
                    href="/products"
                    className="col-span-2 mt-1 flex items-center justify-between rounded-[6px] border border-graphite-500 px-4 py-3 text-xs uppercase tracking-[0.14em] text-silver-200 transition-colors hover:border-volt-500/50 hover:text-silver-100"
                  >
                    View full catalogue <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {nav
            .filter((n) => n.href !== "/products")
            .map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={cn(
                    "relative px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors",
                    active ? "text-silver-100" : "text-silver-300 hover:text-silver-100"
                  )}
                >
                  {n.label}
                  {active && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-px bg-volt-500 shadow-[0_0_10px_rgba(30,144,255,0.7)]" />
                  )}
                </Link>
              );
            })}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/contact" size="sm">
            Enquire
          </ButtonLink>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center text-silver-100 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <Menu className="hidden" /> : null}
          {mobileOpen ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "glass overflow-hidden border-t border-graphite-500 transition-[max-height,opacity] duration-500 lg:hidden",
          mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-1 px-6 py-6">
          <p className="eyebrow mb-2">Products</p>
          <div className="grid grid-cols-1 gap-1">
            {productLinks.map((p) => {
              const Icon = iconForSlug[p.slug];
              return (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="flex items-center gap-3 rounded-[6px] px-2 py-3 text-silver-200"
                >
                  <Icon className="h-5 w-5 text-steel-400" />
                  {p.name}
                </Link>
              );
            })}
          </div>
          <div className="my-3 hairline" />
          {nav
            .filter((n) => n.href !== "/products")
            .map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="block px-2 py-3 text-sm uppercase tracking-[0.14em] text-silver-200"
              >
                {n.label}
              </Link>
            ))}
          <div className="pt-3">
            <ButtonLink href="/contact" className="w-full" size="md">
              Enquire
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
