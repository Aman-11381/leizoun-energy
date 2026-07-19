import type { Metadata } from "next";
import { Section, Eyebrow, Heading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { getCategories } from "@/lib/data/products";
import { site } from "@/lib/config/site";
import { buildWhatsAppLink } from "@/lib/utils";
import { WhatsApp, Phone, Mail, MapPin, Clock } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with LEIZOUN ENERGY. Send an enquiry via WhatsApp or email — distributors, dealers, OEM partners and buyers welcome.",
};

export default async function ContactPage() {
  const categories = await getCategories();
  const options = categories.map((c) => ({ slug: c.slug, name: c.name }));
  const wa = buildWhatsAppLink(site.contact.whatsapp, {
    message: "Hi LEIZOUN ENERGY, I'd like to make an enquiry.",
  });

  const contactItems = [
    { icon: WhatsApp, label: "WhatsApp", value: site.contact.phoneDisplay, href: wa, accent: true },
    { icon: Phone, label: "Phone", value: site.contact.phoneDisplay, href: `tel:${site.contact.phoneDisplay.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: MapPin, label: "Address", value: site.contact.address },
    { icon: Clock, label: "Hours", value: site.contact.hours },
  ];

  return (
    <Section className="pt-32 md:pt-40">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <Eyebrow index="◆">Contact</Eyebrow>
          <Heading as="h1" className="mt-5">
            Let&apos;s talk energy
          </Heading>
          <p className="mt-6 max-w-md text-[length:var(--text-lead)] leading-relaxed text-silver-300">
            Whether you&apos;re a distributor, OEM partner, or looking for a premium battery — tell
            us what you need. Our team responds fast, with the right technical answer.
          </p>

          <ul className="mt-10 space-y-3">
            {contactItems.map((item) => {
              const Row = (
                <>
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-graphite-500 ${
                      item.accent ? "text-volt-400" : "text-steel-400"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-steel-400">
                      {item.label}
                    </span>
                    <span className="block text-sm text-silver-100">{item.value}</span>
                  </span>
                </>
              );
              return (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="flex items-center gap-4 rounded-[10px] border border-transparent p-2 transition-colors hover:border-graphite-500 hover:bg-graphite-600/40"
                    >
                      {Row}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-2">{Row}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="clip-shear surface-lit rounded-[12px] border border-graphite-500 p-6 md:p-8">
            <p className="mb-6 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-steel-400">
              Send an enquiry
            </p>
            <InquiryForm categoryOptions={options} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
