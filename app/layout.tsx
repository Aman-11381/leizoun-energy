import type { Metadata } from "next";
import { Michroma, Roboto } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/config/site";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { FloatingEnquire } from "@/components/layout/FloatingEnquire";

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
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-ink-800 text-silver-100 antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingEnquire />
      </body>
    </html>
  );
}
