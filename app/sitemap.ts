import type { MetadataRoute } from "next";
import { site } from "@/lib/config/site";
import { getCategorySlugs } from "@/lib/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/products", ...getCategorySlugs().map((s) => `/products/${s}`), "/about", "/contact"];
  return routes.map((path) => ({
    url: new URL(path, site.url).href,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.startsWith("/products") ? 0.8 : 0.6,
  }));
}
