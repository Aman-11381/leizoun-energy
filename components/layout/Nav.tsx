"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ButtonLink } from "@/components/ui/Button";
import { nav } from "@/lib/config/site";
import { cn } from "@/lib/utils";
import { Menu, Close } from "@/components/icons";
import type { ProductCategory } from "@/lib/data/products";

export type NavProduct = Pick<ProductCategory, "slug" | "shortName"> & {
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
                    "group/link relative px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors",
                    active || (isProducts && productsOpen) ? "text-silver-100" : "text-silver-300 hover:text-silver-100"
                  )}
                >
                  {n.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-4 -bottom-0.5 h-px bg-volt-500 shadow-[0_0_10px_rgba(0,127,196,0.7)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      active ? "scale-x-100" : "scale-x-0 group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100"
                    )}
                  />
                </Link>
              );
              if (!isProducts) return link;
              return (
                // The panel sits inside this wrapper so keyboard focus moves Products → panel → About.
                <div
                  key={n.href}
                  className="relative"
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
  return (
    // pt-2 keeps the hover area continuous between the link and the menu.
    <div
      id="products-panel"
      inert={!open}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "absolute left-0 top-full w-60 pt-2",
        "transition-[opacity,transform,visibility] duration-150 motion-reduce:transition-none",
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
      )}
    >
      <div className="rounded-[8px] border border-graphite-500 bg-ink-900 p-2 shadow-[0_16px_32px_-16px_rgba(0,0,0,0.5)]">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="block rounded-[6px] px-3 py-2.5 transition-colors hover:bg-graphite-600/60"
          >
            <span className="block text-sm text-silver-100">{p.shortName}</span>
            <span className="mt-0.5 block text-xs text-steel-400">{p.modelCount} models</span>
          </Link>
        ))}
        <div className="mx-3 my-1 h-px bg-graphite-500" />
        <Link
          href="/products"
          className="block rounded-[6px] px-3 py-2.5 text-xs uppercase tracking-[0.14em] text-silver-300 transition-colors hover:bg-graphite-600/60 hover:text-silver-100"
        >
          All products
        </Link>
      </div>
    </div>
  );
}