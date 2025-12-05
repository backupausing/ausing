import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.ausing.it"; // Il tuo dominio finale

  // 1. Scarichiamo tutte le ville PUBBLICHE (is_visible = true)
  const { data: villas } = await supabase
    .from("villas")
    .select("slug, updated_at")
    .eq("is_visible", true);

  // 2. Creiamo le entry per le ville
  const villaUrls = villas?.map((villa) => ({
    url: `${baseUrl}/villas/${villa.slug}`,
    lastModified: new Date(villa.updated_at), // Google sa quando l'hai modificata l'ultima volta
    changeFrequency: "weekly" as const,
    priority: 0.8,
  })) || [];

  // 3. Definiamo le pagine statiche
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1, // La Home è la più importante
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ];

  // Uniamo tutto
  return [...staticRoutes, ...villaUrls];
}
