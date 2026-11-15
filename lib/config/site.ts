/**
 * Central brand/site configuration.
 * Contact details are taken from the official product pamphlets and warranty cards.
 */
export const site = {
  name: "LEIZOUN ENERGY",
  shortName: "LEIZOUN",
  legalName: "LEIZOUN ENERGY LLP",
  tagline: "Lithium Power. Limitless Future.",
  description:
    "Backed by four decades of battery manufacturing expertise, LEIZOUN ENERGY brings a trusted legacy of quality into next-generation LiFePO4 lithium batteries — for home inverters and e-rickshaws.",
  url: "https://www.leizounenergy.com",
  certification: "An ISO 9001:2015 / 14001:2015 Certified Company",

  // Heritage of the parent business (40+ years in lead-acid manufacturing).
  // Add the legacy brand name here if you'd like it referenced on the site.
  legacy: {
    years: "40+",
    decades: "four decades",
    brandName: "", // e.g. "our founding battery brand" — optional
  },

  contact: {
    /** Customer care line. */
    phoneDisplay: "+91 90 10 5000 96",
    // E.164 digits only, used for WhatsApp deep links. Assumes the customer care line is on WhatsApp.
    whatsapp: "919010500096",
    email: "leizounenergyindia@gmail.com",
    address: "Shed No. M-29, Near Sapna Theatre, Kattedan, Hyderabad, Telangana – 500077",
    city: "Hyderabad, Telangana",
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
