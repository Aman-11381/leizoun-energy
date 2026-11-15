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
    "With more than 40 years of lead-acid battery manufacturing under the brand Heritor, LEIZOUN ENERGY is taking the next step into lithium battery technology — starting with LiFePO4 inverter and e-rickshaw batteries.",
  url: "https://www.leizounenergy.com",
  certification: "An ISO 9001:2015 / 14001:2015 Certified Company",

  // From the official company introduction: 40+ years of lead-acid battery manufacturing.
  legacy: {
    years: "40+",
    brand: "Heritor",
  },

  contact: {
    /** Customer care line. */
    phoneDisplay: "+91 90 10 5000 96",
    // E.164 digits only, used for WhatsApp deep links. Assumes the customer care line is on WhatsApp.
    whatsapp: "919010500096",
    email: "leizounenergyindia@gmail.com",
    address: "Shed No. M-29, Near Sapna Theatre, Kattedan, Hyderabad, Telangana – 500077",
    city: "Hyderabad, Telangana",
    postal: {
      street: "Shed No. M-29, Near Sapna Theatre, Kattedan",
      locality: "Hyderabad",
      region: "Telangana",
      code: "500077",
      country: "IN",
    },
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
] as const;
