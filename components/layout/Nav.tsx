"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ButtonLink } from "@/components/ui/Button";
import { ProductShot } from "@/components/ui/ProductShot";
import { nav } from "@/lib/config/site";
import { cn } from "@/lib/utils";
import { ArrowRight, Menu, Close } from "@/components/icons";
import type { ProductCategory } from "@/lib/data/products";

export type NavProduct = Pick<ProductCategory, "slug" | "name" | "tagline" | "image" | "keyStats"> & {
  modelCount: number;
};

export function Nav({ products }: { products: NavProduct[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const productsLink = useRef<HTMLAnchorElement>(null);
  const skipFocusOpen = useRef(false);

  const openProducts = () => {
    clearTimeout(closeTimer.current);
    setProductsOpen(true);
  };
  // Short delay so the pointer can cross the gap between the link and the panel.
  const closeProductsSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProductsOpen(false), 150);
  };
  const closeProducts = () => {
    clearTimeout(closeTimer.current);
    setProductsOpen(false);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

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
      setProductsOpen(false);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        mobileOpen || productsOpen
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
              const isProducts = n.href === "/products" && products.length > 0;
              const link = (
                <Link
                  key={n.href}
                  ref={isProducts ? productsLink : undefined}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  aria-expanded={isProducts ? productsOpen : undefined}
                  aria-controls={isProducts ? "products-panel" : undefined}
                  onMouseEnter={isProducts ? openProducts : closeProducts}
                  onMouseLeave={isProducts ? closeProductsSoon : undefined}
                  className={cn(
                    "relative px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors",
                    active || (isProducts && productsOpen) ? "text-silver-100" : "text-silver-300 hover:text-silver-100"
                  )}
                >
                  {n.label}
                  {active && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-px bg-volt-500 shadow-[0_0_10px_rgba(0,127,196,0.7)]" />
                  )}
                </Link>
              );
              if (!isProducts) return link;
              return (
                // The panel sits inside this wrapper so keyboard focus moves Products → panel → About.
                <div
                  key={n.href}
                  onFocus={() => {
                    if (skipFocusOpen.current) skipFocusOpen.current = false;
                    else openProducts();
                  }}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeProducts();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape" && productsOpen) {
                      closeProducts();
                      skipFocusOpen.current = true;
                      productsLink.current?.focus();
                    }
                  }}
                >
                  {link}
                  <ProductsPanel
                    products={products}
                    open={productsOpen}
                    onMouseEnter={openProducts}
                    onMouseLeave={closeProductsSoon}
                  />
                </div>
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

function ProductsPanel({
  products,
  open,
  onMouseEnter,
  onMouseLeave,
}: {
  products: NavProduct[];
  open: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const totalModels = products.reduce((sum, p) => sum + p.modelCount, 0);
  return (
    <div
      id="products-panel"
      inert={!open}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "absolute inset-x-0 top-full border-b border-graphite-500 bg-ink-900 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.45)]",
        "transition-[opacity,transform,visibility] duration-200 motion-reduce:transition-none",
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
      )}
    >
      <div className="mx-auto grid w-full max-w-[1280px] gap-6 px-6 py-8 md:px-10 lg:grid-cols-[1fr_1fr_15rem]">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="group grid grid-cols-[11rem_1fr] overflow-hidden rounded-[12px] border border-graphite-500 transition-colors hover:border-silver-300/40"
          >
            <ProductShot image={p.image} sizes="176px" padding="p-[5%]" eager className="h-full min-h-[11rem]" />
            <span className="flex flex-col p-5">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-400">{p.tagline}</span>
              <span className="mt-2 font-display text-base leading-snug text-silver-100">{p.name}</span>
              <span className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                {p.keyStats.slice(0, 4).map((s) => (
                  <span key={s.label} className="block">
                    <span className="block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-steel-400">{s.label}</span>
                    <span className="mt-0.5 block text-sm text-silver-100">{s.value}</span>
                  </span>
                ))}
              </span>
              <span className="mt-auto flex items-center gap-2 pt-4 text-[0.7rem] uppercase tracking-[0.18em] text-silver-200 transition-colors group-hover:text-volt-400">
                View {p.modelCount} models
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        ))}

        <div className="flex flex-col justify-between rounded-[12px] border border-graphite-500 p-5">
          <span>
            <span className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-400">Catalogue</span>
            <span className="mt-2 block text-sm leading-relaxed text-silver-200">
              {products.length} LiFePO4 product lines, {totalModels} models.
            </span>
          </span>
          <span className="mt-6 flex flex-col gap-3">
            <Link
              href="/products"
              className="group flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-silver-100 transition-colors hover:text-volt-400"
            >
              Full catalogue
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="group flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-silver-300 transition-colors hover:text-volt-400"
            >
              Help me choose
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}