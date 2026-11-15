"use client";

import { Sun, Moon } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Light/dark switch. The initial theme is set before paint by the inline
 * script in `app/layout.tsx`; icons and labels swap via the `light:` variant,
 * so no React state is needed (and there is nothing to mismatch on hydration).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "flex h-11 w-11 items-center justify-center text-silver-300 transition-colors hover:text-silver-100",
        className
      )}
    >
      <Sun className="h-5 w-5 light:hidden" />
      <Moon className="hidden h-5 w-5 light:block" />
      <span className="sr-only light:hidden">Switch to light mode</span>
      <span className="sr-only hidden light:inline">Switch to dark mode</span>
    </button>
  );
}
