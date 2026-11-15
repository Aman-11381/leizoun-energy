import type { Metadata } from "next";
import { Section, Eyebrow, Heading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { Phone, Mail, MapPin } from "@/components/icons";
import { site } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with LEIZOUN ENERGY. Send an enquiry via WhatsApp or email — distributors, dealers and customers welcome.",
};

export default function ContactPage() {
  return (
    <Section className="pt-32 md:pt-40">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <Eyebrow index="◆">Contact</Eyebrow>
          <Heading as="h1" className="mt-5">
            Let&apos;s talk energy
          </Heading>
          <p className="mt-6 max-w-md text-[length:var(--text-lead)] leading-relaxed text-silver-300">
            Whether you&apos;re a distributor, dealer, or looking for a lithium battery for your
            home or e-rickshaw — tell us about your application and we&apos;ll help you find the
            right solution.
          </p>

          <dl className="mt-10 max-w-md space-y-5 border-t border-graphite-500 pt-8">
            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-4 w-4 shrink-0 text-volt-400" />
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-steel-400">Customer care</dt>
                <dd className="mt-1 text-silver-100">
                  <a href={`tel:${site.contact.phoneDisplay.replace(/\s/g, "")}`} className="hover:text-volt-400">
                    {site.contact.phoneDisplay}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-4 w-4 shrink-0 text-volt-400" />
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-steel-400">Email</dt>
                <dd className="mt-1 break-all text-silver-100">
                  <a href={`mailto:${site.contact.email}`} className="hover:text-volt-400">
                    {site.contact.email}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-volt-400" />
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-steel-400">
                  {site.legalName}
                </dt>
                <dd className="mt-1 text-silver-100">{site.contact.address}</dd>
              </div>
            </div>
          </dl>
          <p className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-steel-400">
            {site.certification}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="clip-shear surface-lit rounded-[12px] border border-graphite-500 p-6 md:p-8">
            <p className="mb-6 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-steel-400">
              Send an enquiry
            </p>
            <InquiryForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
