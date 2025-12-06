import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ausing.vercel.app"; // O il tuo dominio finale

  // Rotte statiche sicure
  const routes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/terms`, lastModified: new Date() },
  ];

  try {
    const { data: villas } = await supabase
      .from("villas")
      .select("slug, updated_at")
      .eq("is_visible", true);

    if (!villas) return routes;

    const villaRoutes = villas.map((villa) => ({
      url: `${baseUrl}/villas/${villa.slug}`,
      // Fallback: se updated_at è null, usa la data di oggi
      lastModified: villa.updated_at ? new Date(villa.updated_at) : new Date(),
    }));

    return [...routes, ...villaRoutes];
  } catch (e) {
    // In caso di panico, restituisci almeno la home
    return routes;
  }
}
