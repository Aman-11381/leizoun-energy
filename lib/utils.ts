import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conditional logic. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Compose a pre-filled WhatsApp deep link (channel decided at implementation). */
export function buildWhatsAppLink(
  phone: string,
  fields: { name?: string; phone?: string; message?: string; category?: string }
) {
  const lines = [
    "New enquiry — LEIZOUN ENERGY",
    fields.name ? `Name: ${fields.name}` : "",
    fields.phone ? `Phone: ${fields.phone}` : "",
    fields.category ? `Interest: ${fields.category}` : "",
    fields.message ? `Message: ${fields.message}` : "",
  ].filter(Boolean);
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${text}`;
}

/** Compose a pre-filled mailto link. */
export function buildMailtoLink(
  email: string,
  fields: { name?: string; phone?: string; message?: string; category?: string }
) {
  const subject = encodeURIComponent(
    `Enquiry from ${fields.name ?? "website"}${fields.category ? ` — ${fields.category}` : ""}`
  );
  const body = encodeURIComponent(
    [
      fields.name ? `Name: ${fields.name}` : "",
      fields.phone ? `Phone: ${fields.phone}` : "",
      fields.category ? `Interest: ${fields.category}` : "",
      "",
      fields.message ?? "",
    ]
      .filter(Boolean)
      .join("\n")
  );
  return `mailto:${email}?subject=${subject}&body=${body}`;
}
