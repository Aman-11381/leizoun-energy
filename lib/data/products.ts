/**
 * LEIZOUN ENERGY — Product content model.
 *
 * Single source of truth for the catalogue. Content is transcribed from the
 * official product pamphlets, data sheets and warranty cards. Page components
 * consume the async accessors below, never the raw array — so swapping in a
 * CMS / API `fetch()` later is a one-file change.
 */

export type ProductImage = { src: string; alt: string; width: number; height: number };

/** Keys resolved to icons by `iconForFeature` in `components/icons`. */
export type FeatureIcon =
  | "maintenance"
  | "bms"
  | "booster"
  | "protection"
  | "india"
  | "performance"
  | "backup"
  | "eco"
  | "bluetooth";

export type Feature = { title: string; body: string; icon: FeatureIcon };

export type SpecField = { key: string; label: string };

export type ProductModel = {
  sku: string;
  /** Grouping value for `grouped` spec sheets (e.g. nominal voltage). */
  group?: string;
  specs: Record<string, string>;
};

/**
 * `grouped` — one row per model, grouped by `group` (inverter range).
 * `matrix`  — one row per parameter, one column per model (e-rickshaw data sheet).
 */
export type SpecSheet = {
  layout: "grouped" | "matrix";
  groupLabel?: string;
  fields: SpecField[];
  notes: string[];
};

export type ProductCategory = {
  slug: string;
  name: string;
  /** Short label for menus and compact UI. */
  shortName: string;
  tagline: string;
  /** Card-level short description. */
  summary: string;
  /** One-paragraph overview for the category page. */
  overview: string;
  chemistry: string;
  /** Transparent studio render — the primary product shot. */
  image: ProductImage;
  /** Full-bleed lifestyle scene from the product pamphlet. */
  scene: ProductImage;
  /** Additional transparent renders. */
  gallery: ProductImage[];
  /** Headline figures (hero + cards). */
  keyStats: { label: string; value: string }[];
  features: Feature[];
  protections: string[];
  warranty: { headline: string; summary: string; terms: string[] };
  specSheet: SpecSheet;
  models: ProductModel[];
  featured?: boolean;
};

const warrantyCoverage =
  "From the date of purchase by the original buyer, the warranty covers free repairs or replacements against any manufacturing defects arising solely out of faulty raw material or workmanship and manifesting during normal use of the battery. Water damage is not covered, and the warranty ceases if the battery is broken or mishandled.";

const inverterModels: ProductModel[] = [
  ["12.8 V", "128LE13072", "6 Years*", "2:00 hrs+"],
  ["12.8 V", "128LE15072", "6 Years*", "2:30 hrs+"],
  ["12.8 V", "128LE16084", "7 Years*", "3:00 hrs+"],
  ["12.8 V", "128LE22084", "7 Years*", "4:00 hrs+"],
  ["12.8 V", "128LE26084", "7 Years*", "4:30 hrs+"],
  ["12.8 V", "128LE34084", "7 Years*", "6:00 hrs+"],
  ["25.6 V", "256LE13072", "6 Years*", "4:30 hrs+"],
  ["25.6 V", "256LE15072", "6 Years*", "5:15 hrs"],
  ["25.6 V", "256LE16084", "7 Years*", "6:00 hrs+"],
  ["25.6 V", "256LE22084", "7 Years*", "7:30 hrs+"],
  ["25.6 V", "256LE26084", "7 Years*", "9:00 hrs+"],
  ["25.6 V", "256LE34084", "7 Years*", "12:00 hrs+"],
  ["51.2 V", "512LE13072S", "6 Years*", "9:00 hrs+"],
  ["51.2 V", "512LE16084S", "7 Years*", "12:00 hrs+"],
  ["51.2 V", "512LE26084S", "7 Years*", "18:30 hrs+"],
  ["51.2 V", "512LE34084S", "7 Years*", "25:00 hrs+"],
].map(([group, sku, warranty, backup]) => ({ sku, group, specs: { warranty, backup } }));

/** E-rickshaw data sheet rows: [label, 512LE10536, 608LE10536, 640LE10536]. */
const eRickshawRows: [string, string, string, string][] = [
  ["Parameters", "51.2V 105Ah", "60V 105Ah", "64V 105Ah"],
  ["Nominal Voltage (V)", "51.2", "60", "64"],
  ["Rated Capacity (Ah)", "105", "105", "105"],
  ["Rated Energy (kWh)", "5.37", "6.3", "6.72"],
  ["Recommended Charging Voltage (CV)", "55.2", "65.55", "69"],
  ["Battery Operating Voltage (V)", "58.4", "69.35", "73"],
  ["High Voltage Disconnection (V)", "58.4", "69.35", "73"],
  ["Standard Charging Current (A)", "25", "20", "20"],
  ["Discharging Voltage (V)", "42.4", "50.35", "53"],
  ["Standard Discharging Current (A)", "60", "80", "80"],
  ["Max. Discharging Current (A)", "80", "100", "100"],
  ["Operating Temperature", "0 to 55°C", "0 to 55°C", "0 to 55°C"],
  [
    "Communication Protocol",
    "Fixed: BLE; Optional: CAN, RS485/UART, IOT",
    "Fixed: BLE; Optional: CAN, RS485/UART, IOT",
    "Fixed: BLE; Optional: CAN, RS485/UART, IOT",
  ],
  ["Cycle Life @25°C, 80% DOD, 0.2/0.2C", ">2000+", ">2000+", ">2000+"],
  ["Battery Chemistry", "LiFePO4", "LiFePO4", "LiFePO4"],
  ["Battery Pack", "16S1P", "19S1P", "20S1P"],
  ["IP Rating", "IP 68", "IP 68", "IP 68"],
  ["Weight (Kg)", "47 ±1% (Approx)", "51.500 ±1% (Approx)", "51.500 ±1% (Approx)"],
  ["Dimensions (L × W × H)", "535 × 370 × 215 mm", "595 × 362 × 225 mm", "595 × 362 × 225 mm"],
  ["BMS Configuration", "8S to 24S 80Amp", "8S to 24S 100Amp", "8S to 24S 100Amp"],
  ["Storage Temperature", "0 to 35°C", "0 to 35°C", "0 to 35°C"],
  ["Discharge Operating Temperature", "-20°C to 60°C", "-20°C to 60°C", "-20°C to 60°C"],
];

const eRickshawSkus = ["512LE10536", "608LE10536", "640LE10536"];
const fieldKey = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const categories: ProductCategory[] = [
  {
    slug: "inverter",
    name: "Lithium Inverter Batteries",
    shortName: "Inverter Batteries",
    tagline: "Silent, clean, always ready.",
    summary:
      "LiFePO4 inverter batteries in 12.8 V, 25.6 V and 51.2 V — up to 25 hours of backup at 400 W, zero maintenance and up to 7 years' warranty.",
    overview:
      "A sleek, maintenance-free lithium upgrade for home and business inverters. Every LEIZOUN inverter battery is built on LiFePO4 chemistry with an inbuilt BMS, a voltage booster switch and upgraded protections — available across 16 models in 12.8 V, 25.6 V and 51.2 V systems.",
    chemistry: "LiFePO4",
    image: {
      src: "/products/inverter/inverter-hero.webp",
      alt: "LEIZOUN lithium inverter battery — gloss black front panel with white body",
      width: 1600,
      height: 962,
    },
    scene: {
      src: "/products/inverter/inverter-scene.webp",
      alt: "LEIZOUN lithium inverter battery on an illuminated blue stage",
      width: 1800,
      height: 1071,
    },
    gallery: [
      {
        src: "/products/inverter/inverter-angle.webp",
        alt: "LEIZOUN inverter battery, three-quarter view",
        width: 1600,
        height: 964,
      },
      {
        src: "/products/inverter/inverter-front.webp",
        alt: "LEIZOUN inverter battery, front view",
        width: 1600,
        height: 910,
      },
      {
        src: "/products/inverter/inverter-side.webp",
        alt: "LEIZOUN inverter battery, side view showing the white body",
        width: 1600,
        height: 976,
      },
    ],
    keyStats: [
      { label: "Models", value: "16" },
      { label: "System voltages", value: "12.8–51.2 V" },
      { label: "Backup @ 400 W", value: "Up to 25 hrs" },
      { label: "Warranty", value: "Up to 7 yrs*" },
    ],
    features: [
      { icon: "maintenance", title: "Zero Maintenance", body: "LiFePO4 (lithium iron phosphate) battery that needs no maintenance." },
      { icon: "protection", title: "Upgraded Protections", body: "Overcharge, over-discharge and over-current protection, with cell balancing." },
      { icon: "bms", title: "Inbuilt BMS", body: "A battery management system is built into the battery." },
      { icon: "booster", title: "Voltage Booster Switch", body: "A voltage booster switch is built into the battery." },
      { icon: "india", title: "Make in India", body: "Made in India by an ISO 9001:2015 / 14001:2015 certified company." },
    ],
    protections: [
      "Overcharge Protection",
      "Over-discharge Protection",
      "Over-current Protection",
      "Cell Balance Function",
    ],
    warranty: {
      headline: "6 / 7-year replacement warranty",
      summary: warrantyCoverage,
      terms: [
        "Warranty covers manufacturing defects during the specified warranty period from the date of invoice.",
        "Warranty is valid only for the original purchaser and is non-transferable unless approved by the Company.",
        "The battery must be used with a compatible inverter/charger and within the specified operating limits.",
        "The battery must be installed and operated as per the Company's instructions.",
        "Any unauthorised opening, repair, modification or tampering with the battery or BMS will void the warranty.",
        "Damage due to accident, impact, water, fire, short circuit, surge, wrong wiring or reverse polarity is not covered.",
        "Damage caused by operation outside the specified temperature or environmental conditions is not covered.",
        "Normal battery capacity reduction due to usage and ageing is not covered.",
        "All warranty claims are subject to inspection and approval by the Company or its authorised service representative.",
      ],
    },
    specSheet: {
      layout: "grouped",
      groupLabel: "Nominal voltage",
      fields: [
        { key: "warranty", label: "Warranty" },
        { key: "backup", label: "Backup @ 400 W" },
      ],
      notes: ["*Warranty terms and conditions apply.", "Backup times are indicative at a 400 W load."],
    },
    models: inverterModels,
    featured: true,
  },
  {
    slug: "e-rickshaw",
    name: "Lithium E-Rickshaw Batteries",
    shortName: "E-Rickshaw Batteries",
    tagline: "Built for the daily grind.",
    summary:
      "LiFePO4 traction batteries for e-rickshaws — 51.2 V, 60 V and 64 V at 105 Ah, IP68 rated, 2000+ cycles and a 3-year warranty.",
    overview:
      "Engineered for commercial e-rickshaw duty, LEIZOUN e-rickshaw batteries pair LiFePO4 cells with an inbuilt BMS, built-in Bluetooth (BLE) and IP68 protection. High performance, zero maintenance and long-lasting backup — rated for over 2000 cycles at 80% depth of discharge.",
    chemistry: "LiFePO4",
    image: {
      src: "/products/e-rickshaw/e-rickshaw-hero.webp",
      alt: "LEIZOUN lithium e-rickshaw battery, 51.2V 105Ah, with 3-year warranty label",
      width: 1600,
      height: 1091,
    },
    scene: {
      src: "/products/e-rickshaw/e-rickshaw-scene.webp",
      alt: "LEIZOUN e-rickshaw battery beside an electric rickshaw in a city setting",
      width: 1800,
      height: 1172,
    },
    gallery: [
      {
        src: "/products/e-rickshaw/e-rickshaw-glow.webp",
        alt: "LEIZOUN e-rickshaw battery, front view",
        width: 1600,
        height: 946,
      },
      {
        src: "/products/e-rickshaw/e-rickshaw-top.webp",
        alt: "LEIZOUN e-rickshaw battery, elevated view of the blue top cover",
        width: 1600,
        height: 1158,
      },
    ],
    keyStats: [
      { label: "Capacity", value: "105 Ah" },
      { label: "Nominal voltage", value: "51.2–64 V" },
      { label: "Cycle life", value: "2000+" },
      { label: "Warranty", value: "3 yrs" },
    ],
    features: [
      { icon: "backup", title: "Long Lasting Backup", body: "105 Ah capacity, up to 6.72 kWh of rated energy and over 2000 cycles at 80% depth of discharge." },
      { icon: "performance", title: "High Performance", body: "Up to 100 A maximum discharging current (80 A on the 51.2 V model)." },
      { icon: "maintenance", title: "Zero Maintenance", body: "IP68-rated LiFePO4 battery pack that needs no maintenance." },
      { icon: "bluetooth", title: "Bluetooth Built In", body: "BLE is fixed on every model; CAN, RS485/UART and IoT are optional." },
      { icon: "eco", title: "Eco Friendly", body: "Built on LiFePO4 (lithium iron phosphate) chemistry." },
    ],
    protections: [
      "Cell Over Voltage",
      "Cell Under Voltage",
      "Battery Pack Over Voltage",
      "Battery Pack Under Voltage",
      "Charging Over Current",
      "Discharging Over Current",
      "Over Temperature",
      "Under Temperature",
      "SOC Display",
      "Current Limiting",
    ],
    warranty: {
      headline: "3-year replacement warranty",
      summary: warrantyCoverage,
      terms: [
        "The batteries are warranted against any manufacturing defects arising during the warranty period. This warranty covers only defects resulting from faulty materials or poor workmanship that affect normal use and is in conformity with the respective specifications.",
        "This warranty is applicable only if the batteries are used in accordance with the Company's specified application chart.",
        "The warranty period begins on the date of sale of the battery, as indicated on the warranty card and the sales bill.",
        "This warranty card is issued only at the time of original purchase. It is non-transferable and will not be reissued if lost or damaged.",
        "To validate the warranty, the registration portion of the warranty card must be filled out completely and returned to the Dealer/Distributor/Company from which the battery was purchased. The completed tear-off portion should then be sent to the Company, either by post or through the service station.",
        "In the event of a complaint, the battery must be returned untampered and complete to the Company's authorised Dealer/Distributor/Service Station, along with the warranty card with the barcode intact and the original bill. Delivery of the replaced, repaired or discounted battery will be F.O.R. to the same location.",
        "The service record in the warranty booklet must be filled out regularly by an authorised Dealer/Distributor as proof of specified maintenance. Without this record, a claim may be deemed invalid.",
        "Battery storage capacity gradually decreases with the number of usage cycles. This is normal for any battery and is not covered by the warranty.",
        "If a service battery is issued, it may have to be returned within 15 days; otherwise, the purchaser shall be liable to pay the normal charges per day.",
        "The Company reserves the right to determine whether the battery requires repair, rectification, free replacement or pro-rata settlement. Any defective battery replaced or settled under this warranty becomes the property of the Company, and no scrap rebate will be given for it.",
        "The warranty period on a battery replaced free of charge begins from the date of sale of the original battery, as stated on the original warranty card, and not from the date of replacement.",
        "For batteries purchased on a warranty settlement discount, a fresh warranty applies.",
      ],
    },
    specSheet: {
      layout: "matrix",
      fields: eRickshawRows.map(([label]) => ({ key: fieldKey(label), label })),
      notes: ["Specifications as per the LEIZOUN E-Rickshaw data sheet. Warranty terms and conditions apply."],
    },
    models: eRickshawSkus.map((sku, i) => ({
      sku,
      specs: Object.fromEntries(eRickshawRows.map((row) => [fieldKey(row[0]), row[i + 1]])),
    })),
    featured: true,
  },
];

/* ---- Data-access layer (async — future backend swaps in here) ---- */

export async function getCategories(): Promise<ProductCategory[]> {
  return categories;
}

export async function getFeaturedCategories(): Promise<ProductCategory[]> {
  return categories.filter((c) => c.featured);
}

export async function getCategory(slug: string): Promise<ProductCategory | undefined> {
  return categories.find((c) => c.slug === slug);
}

export function getCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}
