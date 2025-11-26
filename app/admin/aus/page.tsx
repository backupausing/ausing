"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Villa = {
  id: string;
  slug: string;
  name: any;
};

export default function AusAdminList() {
  const [villas, setVillas] = useState<Villa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("villas")
        .select("id, slug, name")
        .order("slug", { ascending: true });

      setVillas((data as any) || []);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <p>Caricamento Aus…</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Gestione Aus</h2>
      <p className="text-xs text-ionian/70 mb-4">
        Clicca su una Aus per modificare testi, immagini e dettagli.
      </p>

      <div className="space-y-3">
        {villas.map((v) => (
          <a
            key={v.id}
            href={`/admin/aus/${v.id}`}
            className="block card p-4 hover:bg-sand transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">
                  {v.name?.it || v.name?.en || "Aus"}
                </p>
                <p className="text-[11px] text-ionian/60">{v.slug}</p>
              </div>
              <span className="text-[11px] text-terracotta">
                Modifica →
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
