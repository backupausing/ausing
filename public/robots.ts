import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.ausing.it"; // Il tuo dominio finale

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"], // Protegge l'area riservata dai crawler
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
