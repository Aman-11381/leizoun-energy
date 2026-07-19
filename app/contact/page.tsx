import type { Metadata } from "next";
import { Section, Eyebrow, Heading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { InquiryForm } from "@/components/sections/InquiryForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with LEIZOUN ENERGY. Send an enquiry via WhatsApp or email — distributors, dealers, OEM partners and buyers welcome.",
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
            Whether you&apos;re a distributor, OEM partner, or looking for a premium battery —
            tell us what you need and our team will respond fast.
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
