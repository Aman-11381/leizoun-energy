import type { Metadata } from "next";
import { Michroma, Roboto } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/config/site";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { FloatingEnquire } from "@/components/layout/FloatingEnquire";
import { JsonLd } from "@/components/seo/JsonLd";

const display = Michroma({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
});

const body = Roboto({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});

// Runs before first paint: saved choice wins, otherwise follow the device setting.
// Without JS the site stays dark (the CSS default).
const themeScript = `(function(){try{var d=document.documentElement,m=matchMedia("(prefers-color-scheme: light)"),s=localStorage.getItem("theme");d.dataset.theme=s==="light"||s==="dark"?s:m.matches?"light":"dark";m.addEventListener("change",function(e){var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")d.dataset.theme=e.matches?"light":"dark"})}catch(e){}})()`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "lithium battery",
    "LiFePO4 battery",
    "lithium battery manufacturer Hyderabad",
    "lithium inverter battery",
    "inverter battery",
    "e-rickshaw battery",
    "lithium e-rickshaw battery",
    "LEIZOUN ENERGY",
  ],
  openGraph: {
    type: "website",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: new URL("/icon.png", site.url).href,
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phoneDisplay.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.postal.street,
      addressLocality: site.contact.postal.locality,
      addressRegion: site.contact.postal.region,
      postalCode: site.contact.postal.code,
      addressCountry: site.contact.postal.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.contact.phoneDisplay.replace(/\s/g, ""),
      email: site.contact.email,
      areaServed: "IN",
    },
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-ink-800 text-silver-100 antialiased">
        <a
          href="#main"
          className="sr-only z-[60] rounded-[6px] bg-volt-600 px-4 py-3 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <JsonLd data={orgJsonLd} />
        <Nav />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <FloatingEnquire />
      </body>
    </html>
  );
}
