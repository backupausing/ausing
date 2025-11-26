"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminVillasList() {
  const [villas, setVillas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("villas").select("*").then(({ data }) => {
      if (data) setVillas(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8">Caricamento ville...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-ionian">Le Mie Ville</h1>
      </div>

      <div className="grid gap-4">
        {villas.map((villa) => (
          <div key={villa.id} className="bg-white p-6 rounded-xl shadow-sm border border-border flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={villa.image} className="w-16 h-16 object-cover rounded-lg bg-gray-200" alt={villa.name} />
              <div>
                <h3 className="text-xl font-medium text-ionian">{villa.name}</h3>
                <p className="text-sm text-gray-500">Host: {villa.host}</p>
              </div>
            </div>
            
            {/* IL LINK IMPORTANTE: Punta a /admin/villas/[slug] */}
            <Link 
              href={`/admin/villas/${villa.slug}`}
              className="bg-ionian text-white px-5 py-2 rounded-md hover:bg-ionian/90 text-sm font-medium transition-colors"
            >
              Modifica
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
