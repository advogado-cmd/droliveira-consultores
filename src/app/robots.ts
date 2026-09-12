import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/pt/admin", "/en/admin", "/es/admin", "/pt/area-do-cliente", "/en/client-area", "/es/area-del-cliente"] }], sitemap: `${SITE_URL}/sitemap.xml` };
}
