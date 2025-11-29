import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ausing.vercel.app"; // CAMBIARE CON DOMINIO FINALE QUANDO LO AVRAI

  // 1. Prendi tutte le ville visibili
  const { data: villas } = await supabase.from("villas").select("slug, updated_at").eq("is_visible", true);

  const villaUrls = villas?.map((villa) => ({
    url: `${baseUrl}/villas/${villa.slug}`,
    lastModified: new Date(villa.updated_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  })) || [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...villaUrls,
  ];
}
