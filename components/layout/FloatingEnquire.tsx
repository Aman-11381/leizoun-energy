"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/config/site";
import { buildWhatsAppLink } from "@/lib/utils";
import { WhatsApp } from "@/components/icons";

/** Persistent, subtle enquire affordance that appears on scroll. */
export function FloatingEnquire() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = buildWhatsAppLink(site.contact.whatsapp, {
    message: "Hi LEIZOUN ENERGY, I'd like to enquire about your batteries.",
  });

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Enquire on WhatsApp"
      className={`group fixed bottom-6 right-6 z-40 flex items-center gap-3 clip-shear rounded-[8px] border border-graphite-500 glass px-4 py-3 text-sm text-silver-100 transition-all duration-500 hover:border-volt-500/60 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-volt-500/10 text-volt-400">
        <WhatsApp className="h-5 w-5" />
        <span className="absolute inset-0 rounded-full ring-1 ring-volt-500/40 transition-transform duration-500 group-hover:scale-125" />
      </span>
      <span className="hidden pr-1 uppercase tracking-[0.14em] sm:inline">Enquire</span>
    </a>
  );
}
