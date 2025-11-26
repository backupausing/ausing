"use client";

import { useLang } from "./LanguageProvider";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import VillaCard from "./VillaCard";

export default function VillasSection() {
  const { t } = useLang();
 type Villa = {
  id: string;
  slug: string;
  name: Record<string, string>;
  description: Record<string, string>;
  images: string[];
};

const [villas, setVillas] = useState<Villa[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("villas")
        .select("id, slug, name, description, images");
      setVillas(data || []);
    })();
  }, []);

  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-semibold tracking-tight mb-6 text-ionian">
          {t.ourAus}
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {villas.map((villa: any) => (
            <VillaCard key={villa.id} villa={villa} />
          ))}
        </div>
      </div>
    </section>
  );
}
