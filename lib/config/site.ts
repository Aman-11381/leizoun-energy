/**
 * Central brand/site configuration.
 * Placeholder contact values — swap real ones at go-live.
 */
export const site = {
  name: "LEIZOUN ENERGY",
  shortName: "LEIZOUN",
  tagline: "Lithium Power. Limitless Future.",
  description:
    "Backed by four decades of battery manufacturing expertise, LEIZOUN ENERGY brings a trusted legacy of quality into next-generation lithium technology — energy solutions for electric mobility, automotive, solar, home, commercial and industrial applications.",
  url: "https://leizoun.energy",

  // Heritage of the parent business (40+ years in lead-acid manufacturing).
  // Add the legacy brand name here if you'd like it referenced on the site.
  legacy: {
    years: "40+",
    decades: "four decades",
    brandName: "", // e.g. "our founding battery brand" — optional
  },

  contact: {
    phoneDisplay: "+91 00000 00000",
    // E.164 digits only, used for WhatsApp deep links.
    whatsapp: "910000000000",
    email: "hello@leizoun.energy",
    address: "Hyderabad, India",
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
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
