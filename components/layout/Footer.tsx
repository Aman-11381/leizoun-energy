import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Seam } from "@/components/ui/Section";
import { site } from "@/lib/config/site";
import { Phone, Mail, MapPin, Clock } from "@/components/icons";

const columns = [
  {
    title: "Products",
    links: [
      { label: "E-Bike Batteries", href: "/products/e-bike" },
      { label: "E-Rickshaw Batteries", href: "/products/e-rickshaw" },
      { label: "Inverter Batteries", href: "/products/inverter" },
      { label: "Built-in UPS", href: "/products/ups" },
      { label: "Industrial Solutions", href: "/products/industrial" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Technology", href: "/technology" },
      { label: "Products", href: "/products" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const certs = ["ISO 9001", "BIS Certified", "CE", "RoHS", "IEC 62133"];

export function Footer() {
  return (
    <footer className="relative border-t border-graphite-500 bg-ink-900">
      <Seam />
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo href={null} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-silver-300">
              {site.tagline} Four decades of battery expertise, now engineered into
              next-generation lithium technology for mobility, solar, home and industry.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-silver-300">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-steel-400" />
                <a href={`tel:${site.contact.phoneDisplay.replace(/\s/g, "")}`} className="hover:text-silver-100">
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-steel-400" />
                <a href={`mailto:${site.contact.email}`} className="hover:text-silver-100">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-steel-400" />
                {site.contact.address}
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-steel-400" />
                {site.contact.hours}
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="md:col-span-3">
              <h3 className="eyebrow mb-5">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-silver-300 transition-colors hover:text-silver-100">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1" />
        </div>

        <div className="mt-14 hairline" />

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {certs.map((c) => (
              <span key={c} className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-steel-400">
                {c}
              </span>
            ))}
          </div>
          <p className="text-xs text-steel-400">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
