/**
 * Central brand/site configuration.
 * Placeholder contact values — swap real ones at go-live.
 */
export const site = {
  name: "LEIZOUN ENERGY",
  shortName: "LEIZOUN",
  tagline: "Lithium Power. Limitless Future.",
  description:
    "LEIZOUN ENERGY engineers next-generation lithium battery technology — high-performance, intelligent, and built to last. E-Bike, E-Rickshaw, Inverter, UPS and Industrial energy solutions.",
  url: "https://leizoun.energy",

  contact: {
    phoneDisplay: "+91 00000 00000",
    // E.164 digits only, used for WhatsApp deep links.
    whatsapp: "910000000000",
    email: "hello@leizoun.energy",
    address: "Industrial Area, India",
    hours: "Mon–Sat · 9:30 AM – 6:30 PM IST",
  },

  social: {
    linkedin: "#",
    instagram: "#",
    youtube: "#",
    x: "#",
  },
} as const;

export const nav = [
  { label: "Products", href: "/products" },
  { label: "Technology", href: "/technology" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
