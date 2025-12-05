import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

// Aggiorna la sitemap al massimo ogni ora (buono per SEO e performance)
export const revalidate = 3600; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.ausing.it";

  // 1. Definiamo le rotte statiche base
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  try {
    // 2. Scarichiamo le ville dal DB in modo sicuro
    const { data: villas, error } = await supabase
      .from("villas")
      .select("slug, updated_at")
      .eq("is_visible", true);

    if (error) {
      console.error("Errore Sitemap Supabase:", error);
      // Se c'è un errore DB, restituiamo almeno le pagine statiche per non rompere la SEO
      return staticRoutes;
    }

    // 3. Generiamo gli URL delle ville
    const villaUrls: MetadataRoute.Sitemap = (villas || []).map((villa) => {
      return {
        url: `${baseUrl}/villas/${villa.slug}`,
        // Controllo di sicurezza sulla data: se manca, usa la data di oggi
        lastModified: villa.updated_at ? new Date(villa.updated_at) : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      };
    });

    // 4. Uniamo tutto
    return [...staticRoutes, ...villaUrls];

  } catch (err) {
    console.error("Errore critico generazione Sitemap:", err);
    return staticRoutes;
  }
}
