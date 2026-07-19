/**
 * LEIZOUN ENERGY — Product content model.
 *
 * This is the single source of truth for the catalogue today (static),
 * shaped so a future backend (CMS / REST / GraphQL) can populate the same
 * types with zero UI changes. All page components consume the async
 * accessors below, never the raw array — so swapping in `fetch()` later
 * is a one-file change.
 */

export type Spec = { label: string; value: string; unit?: string };

export type ProductVariant = {
  sku: string;
  name: string;
  specs: Spec[];
};

export type ProductCategory = {
  slug: string;
  name: string;
  /** Short tagline shown on cards. */
  tagline: string;
  /** One-paragraph overview for the category page. */
  overview: string;
  /** Card-level short description. */
  summary: string;
  applications: string[];
  /** Headline spec chips (voltage / capacity ranges etc.). */
  specChips: Spec[];
  /** Highlight tiles on the category page. */
  highlights: { title: string; value: string; note: string }[];
  /** Differentiators for this line. */
  differentiators: { title: string; body: string }[];
  /** Accent used for subtle per-category tinting (kept within brand). */
  accent: "volt" | "silver";
  /** Placeholder art-direction hint until real renders are supplied. */
  renderHint: string;
  /** Populated by future backend; empty for now. */
  variants: ProductVariant[];
  featured?: boolean;
};

const categories: ProductCategory[] = [
  {
    slug: "e-bike",
    name: "E-Bike Batteries",
    tagline: "Lightweight range. Relentless output.",
    summary:
      "High-density lithium packs engineered for electric bicycles and light EVs — more range, less weight, longer life.",
    overview:
      "LEIZOUN E-Bike batteries deliver exceptional energy density in a compact, rugged form. Intelligent cell balancing and a smart BMS protect every ride, while fast-charge chemistry keeps riders moving. Built for real-world vibration, heat, and daily cycling.",
    applications: ["Electric bicycles", "Light EVs", "Delivery fleets", "Scooters"],
    specChips: [
      { label: "Charging", value: "Fast", unit: "" },
      { label: "Weight", value: "Light", unit: "" },
      { label: "Protection", value: "Smart BMS", unit: "" },
    ],
    highlights: [
      { title: "Energy density", value: "High", note: "More range per kilogram" },
      { title: "Fast charge", value: "Rapid", note: "Back on the road faster" },
      { title: "Weight saving", value: "Lighter", note: "vs comparable lead-acid" },
    ],
    differentiators: [
      { title: "Smart BMS", body: "Per-cell monitoring for balanced, protected performance across every ride." },
      { title: "Vibration-hardened", body: "Sealed, shock-resistant housing engineered for daily road use." },
      { title: "Thermal control", body: "Managed heat dissipation for consistent output in Indian climates." },
    ],
    accent: "volt",
    renderHint:
      "Studio render of a sleek e-bike battery pack on black seamless, single rim light, blue seam reflection.",
    variants: [],
    featured: true,
  },
  {
    slug: "e-rickshaw",
    name: "E-Rickshaw Batteries",
    tagline: "Built for the daily grind.",
    summary:
      "Heavy-duty lithium packs for e-rickshaws — deep cycling, high torque delivery, and all-day dependability.",
    overview:
      "Engineered for the demands of commercial e-rickshaw operation, LEIZOUN packs sustain high current draw, deep daily cycling, and long duty hours. Lower running cost, faster charging, and dramatically longer service life than traditional lead-acid.",
    applications: ["Passenger e-rickshaws", "Cargo loaders", "Last-mile transport"],
    specChips: [
      { label: "Duty", value: "Heavy-duty", unit: "" },
      { label: "Cycling", value: "Deep", unit: "" },
      { label: "Charging", value: "Rapid", unit: "" },
    ],
    highlights: [
      { title: "Daily range", value: "Full shift", note: "Sustained high-current output" },
      { title: "Service life", value: "Extended", note: "Far beyond lead-acid" },
      { title: "Running cost", value: "Lower", note: "Reduced cost per kilometre" },
    ],
    differentiators: [
      { title: "Deep-cycle chemistry", body: "Optimised for heavy daily discharge without capacity fade." },
      { title: "High-current BMS", body: "Protects against overload during acceleration and full loads." },
      { title: "Rapid charging", body: "Turnaround between shifts, maximising vehicle uptime." },
    ],
    accent: "volt",
    renderHint:
      "Rugged e-rickshaw battery module, industrial-premium, black background, cool rim light.",
    variants: [],
    featured: true,
  },
  {
    slug: "inverter",
    name: "Inverter Batteries",
    tagline: "Silent, clean, always ready.",
    summary:
      "Lithium inverter and solar batteries for homes and businesses — instant backup, zero maintenance, compact footprint.",
    overview:
      "LEIZOUN inverter batteries replace bulky lead-acid banks with a compact, maintenance-free lithium solution. Faster recharge, deeper usable capacity, and a longer lifespan — ideal for home backup, offices, shops, and pairing with rooftop solar.",
    applications: ["Home backup", "Solar systems", "Retail & offices", "Clinics"],
    specChips: [
      { label: "Maintenance", value: "Zero", unit: "" },
      { label: "Recharge", value: "Fast", unit: "" },
      { label: "Design", value: "Compact", unit: "" },
    ],
    highlights: [
      { title: "Usable capacity", value: "Deep", note: "More usable backup" },
      { title: "Maintenance", value: "Zero", note: "No topping up, ever" },
      { title: "Footprint", value: "Compact", note: "Wall-friendly design" },
    ],
    differentiators: [
      { title: "Maintenance-free", body: "Sealed lithium chemistry — no water top-up, no acid, no fumes." },
      { title: "Fast recharge", body: "Rides through short grid windows between outages." },
      { title: "Long lifespan", body: "Years of daily cycling with minimal capacity loss." },
    ],
    accent: "silver",
    renderHint:
      "Clean wall-mounted inverter battery, minimal, premium electronics aesthetic, black backdrop.",
    variants: [],
    featured: true,
  },
  {
    slug: "ups",
    name: "Built-in UPS Batteries",
    tagline: "Uninterrupted, by design.",
    summary:
      "Integrated lithium UPS solutions delivering seamless, instant power continuity for critical loads.",
    overview:
      "LEIZOUN built-in UPS batteries provide instantaneous switchover and stable power for sensitive equipment. Integrated intelligence, compact packaging, and a long maintenance-free life make them ideal for networking, POS, and critical infrastructure.",
    applications: ["Networking & servers", "POS systems", "Security systems", "Critical loads"],
    specChips: [
      { label: "Switchover", value: "Instant", unit: "" },
      { label: "Protection", value: "Smart BMS", unit: "" },
      { label: "Operation", value: "Silent", unit: "" },
    ],
    highlights: [
      { title: "Switchover", value: "Instant", note: "Seamless to the load" },
      { title: "Integration", value: "Built-in BMS", note: "Smart, self-protecting" },
      { title: "Lifespan", value: "Extended", note: "Long service life" },
    ],
    differentiators: [
      { title: "Seamless continuity", body: "Instant switchover protects sensitive electronics from dropouts." },
      { title: "Integrated intelligence", body: "On-board BMS manages health, safety, and reporting." },
      { title: "Compact & silent", body: "Fits tight installs with clean, fanless operation." },
    ],
    accent: "silver",
    renderHint:
      "Integrated UPS battery unit, sleek matte + metal, status LED echoing blue seam, black studio.",
    variants: [],
  },
  {
    slug: "industrial",
    name: "Industrial Battery Solutions",
    tagline: "Energy infrastructure at scale.",
    summary:
      "Custom-engineered lithium systems for industrial, telecom, renewable and energy-storage applications.",
    overview:
      "For large buyers and OEM partners, LEIZOUN designs and manufactures industrial-grade lithium systems — scalable, monitored, and built to specification. Telecom backup, solar and renewable storage, and heavy-duty applications with enterprise reliability and support.",
    applications: ["Telecom towers", "Solar & renewable storage", "OEM integration", "Heavy machinery"],
    specChips: [
      { label: "Voltage", value: "Custom", unit: "" },
      { label: "Capacity", value: "Scalable", unit: "" },
      { label: "Config", value: "Made-to-spec", unit: "" },
    ],
    highlights: [
      { title: "Scale", value: "Modular", note: "Grows with your load" },
      { title: "Monitoring", value: "Remote BMS", note: "Fleet-level visibility" },
      { title: "Support", value: "OEM-grade", note: "Engineering partnership" },
    ],
    differentiators: [
      { title: "Made-to-spec", body: "Chemistry, form factor, and BMS tailored to your application." },
      { title: "Remote telemetry", body: "Monitor health and performance across deployed fleets." },
      { title: "Partnership model", body: "Dedicated engineering and supply support for OEMs and large buyers." },
    ],
    accent: "volt",
    renderHint:
      "Modular industrial battery rack, precision-engineered, cool cinematic light, factory-clean.",
    variants: [],
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
