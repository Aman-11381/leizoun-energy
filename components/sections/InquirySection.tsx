import { Section, Eyebrow, Heading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { site } from "@/lib/config/site";
import { getCategories } from "@/lib/data/products";
import { WhatsApp, Mail, Phone } from "@/components/icons";

export async function InquirySection({
  defaultCategory,
  id = "enquire",
}: {
  defaultCategory?: string;
  id?: string;
}) {
  const categories = await getCategories();
  const interest = categories.find((c) => c.slug === defaultCategory)?.name;

  return (
    <Section id={id} tone="raised">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <Eyebrow index="03">Enquiry</Eyebrow>
          <Heading as="h2" className="mt-5">
            Let&apos;s talk energy
          </Heading>
          <p className="mt-5 max-w-md text-[length:var(--text-lead)] leading-relaxed text-silver-300">
            Tell us about your application — product, quantity, or partnership. We&apos;ll help
            you find a solution that is technically suitable, dependable, safe, and commercially
            practical.
          </p>

          <ul className="mt-8 space-y-2 text-sm text-silver-200">
            {[
              { href: `https://wa.me/${site.contact.whatsapp}`, label: "WhatsApp enquiry", Icon: WhatsApp, external: true },
              { href: `tel:${site.contact.phoneDisplay.replace(/\s/g, "")}`, label: site.contact.phoneDisplay, Icon: Phone },
              { href: `mailto:${site.contact.email}`, label: site.contact.email, Icon: Mail },
            ].map(({ href, label, Icon, external }) => (
              <li key={href}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex items-center gap-3 py-1 transition-colors hover:text-silver-100"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-graphite-500 text-steel-400 transition-colors group-hover:border-volt-500/60 group-hover:text-volt-400">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="break-all">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="clip-shear surface-lit rounded-[12px] border border-graphite-500 p-6 md:p-8">
            <InquiryForm interests={categories.map((c) => c.name)} defaultCategory={interest} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
