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
          <Eyebrow index="→">Enquiry</Eyebrow>
          <Heading as="h2" className="mt-5">
            Let&apos;s talk energy
          </Heading>
          <p className="mt-5 max-w-md text-[length:var(--text-lead)] leading-relaxed text-silver-300">
            Tell us what you need — product, quantity, or partnership. Backed by decades of
            experience, our team responds fast, with the right technical answer.
          </p>

          <ul className="mt-8 space-y-4 text-sm text-silver-200">
            <li className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-graphite-500 text-volt-400">
                <WhatsApp className="h-4 w-4" />
              </span>
              WhatsApp — fastest response
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-graphite-500 text-steel-400">
                <Phone className="h-4 w-4" />
              </span>
              {site.contact.phoneDisplay}
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-graphite-500 text-steel-400">
                <Mail className="h-4 w-4" />
              </span>
              {site.contact.email}
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="clip-shear surface-lit rounded-[12px] border border-graphite-500 p-6 md:p-8">
            <InquiryForm defaultCategory={interest} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
