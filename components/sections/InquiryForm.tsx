"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/config/site";
import { buildWhatsAppLink, buildMailtoLink, cn } from "@/lib/utils";
import { WhatsApp, Mail, Check, ArrowRight } from "@/components/icons";

type Props = {
  /** Optional product-interest label, included silently in the message. */
  defaultCategory?: string;
  compact?: boolean;
};

/**
 * Channel-agnostic inquiry form. No backend today: submissions compose a
 * pre-filled WhatsApp or Email message. The `submit` abstraction is the
 * single swap point for a future POST endpoint (Next.js API route) — the
 * UI never changes.
 */
export function InquiryForm({ defaultCategory, compact }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<null | "whatsapp" | "email">(null);

  function validate() {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[0-9+\-\s()]{7,}$/.test(phone.trim())) e.phone = "Enter a valid phone number.";
    if (message.trim().length < 5) e.message = "Tell us a little more.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(channel: "whatsapp" | "email") {
    if (!validate()) return;
    const fields = {
      name,
      phone,
      message,
      category: defaultCategory || undefined,
    };
    const href =
      channel === "whatsapp"
        ? buildWhatsAppLink(site.contact.whatsapp, fields)
        : buildMailtoLink(site.contact.email, fields);
    window.open(href, channel === "whatsapp" ? "_blank" : "_self");
    setSent(channel);
  }

  const field =
    "peer w-full rounded-[6px] border border-graphite-500 bg-ink-900/60 px-4 pb-2.5 pt-6 text-sm text-silver-100 placeholder-transparent outline-none transition-colors focus:border-volt-500/70 focus:ring-1 focus:ring-volt-500/40";
  const label =
    "pointer-events-none absolute left-4 top-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-steel-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[0.65rem] peer-focus:tracking-[0.18em] peer-focus:text-volt-400";

  if (sent) {
    return (
      <div className="clip-shear surface-lit flex flex-col items-center gap-4 rounded-[10px] border border-graphite-500 p-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="font-display text-lg text-silver-100">Enquiry ready</h3>
        <p className="max-w-sm text-sm text-silver-300">
          We&apos;ve opened {sent === "whatsapp" ? "WhatsApp" : "your email"} with your
          message pre-filled. Send it and our team will respond shortly.
        </p>
        <button
          onClick={() => setSent(null)}
          className="text-xs uppercase tracking-[0.14em] text-volt-400 hover:text-volt-500"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      className={cn("space-y-4", compact ? "" : "")}
      onSubmit={(e) => {
        e.preventDefault();
        submit("whatsapp");
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <input
            id="name"
            className={field}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
          <label htmlFor="name" className={label}>Name</label>
          {errors.name && <p className="mt-1 text-xs text-error">{errors.name}</p>}
        </div>
        <div className="relative">
          <input
            id="phone"
            className={field}
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="tel"
            autoComplete="tel"
          />
          <label htmlFor="phone" className={label}>Phone Number</label>
          {errors.phone && <p className="mt-1 text-xs text-error">{errors.phone}</p>}
        </div>
      </div>

      <div className="relative">
        <textarea
          id="message"
          className={cn(field, "min-h-[120px] resize-y")}
          placeholder="Inquiry"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <label htmlFor="message" className={label}>Your Inquiry</label>
        {errors.message && <p className="mt-1 text-xs text-error">{errors.message}</p>}
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row">
        <Button type="submit" className="flex-1">
          <WhatsApp className="h-4 w-4" /> Send via WhatsApp
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          onClick={() => submit("email")}
        >
          <Mail className="h-4 w-4" /> Send via Email
        </Button>
      </div>
      <p className="flex items-center gap-2 pt-1 text-xs text-steel-400">
        <ArrowRight className="h-3.5 w-3.5" />
        No account needed — your message opens pre-filled, ready to send.
      </p>
    </form>
  );
}
