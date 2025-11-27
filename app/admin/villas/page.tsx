"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminVillasList() {
  const [villas, setVillas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVillas();
  }, []);

  function loadVillas() {
    // Qui carichiamo TUTTE le ville, anche quelle nascoste, ordinate per creazione
    supabase.from("villas").select("*").order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setVillas(data);
      setLoading(false);
    });
  }

  // Funzione per accendere/spegnere la villa
  async function toggleVisibility(id: string, currentStatus: boolean) {
    const { error } = await supabase
      .from("villas")
      .update({ is_visible: !currentStatus })
      .eq("id", id);
    
    if (!error) {
      // Aggiorna la lista locale senza ricaricare
      setVillas(villas.map(v => v.id === id ? { ...v, is_visible: !currentStatus } : v));
    }
  }

  if (loading) return <div className="p-8">Caricamento ville...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-ionian">Le Mie Ville</h1>
        
        {/* TASTO CREA NUOVA */}
        <Link 
          href="/admin/villas/new" 
          className="bg-terracotta text-white px-6 py-2 rounded-full font-medium hover:bg-terracotta/90 transition-colors shadow-md"
        >
          + Nuova Villa
        </Link>
      </div>

      <div className="grid gap-4">
        {villas.map((villa) => (
          <div key={villa.id} className={`p-6 rounded-xl border flex justify-between items-center transition-all ${
            villa.is_visible ? "bg-white border-border shadow-sm" : "bg-gray-50 border-gray-200 opacity-75 grayscale-[0.5]"
          }`}>
            <div className="flex items-center gap-4">
              <img src={villa.image} className="w-16 h-16 object-cover rounded-lg bg-gray-200" alt={villa.name} />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-medium text-ionian">{villa.name}</h3>
                  {/* Etichetta stato */}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wide ${
                    villa.is_visible ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"
                  }`}>
                    {villa.is_visible ? "Pubblica" : "Nascosta"}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Host: {villa.host}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Switch Visibilità */}
              <button
                onClick={() => toggleVisibility(villa.id, villa.is_visible)}
                className={`text-sm font-medium px-3 py-1 rounded border transition-colors ${
                  villa.is_visible 
                    ? "border-green-200 text-green-700 hover:bg-green-50" 
                    : "border-gray-300 text-gray-600 hover:bg-white"
                }`}
              >
                {villa.is_visible ? "Nascondi" : "Pubblica"}
              </button>

              <Link 
                href={`/admin/villas/${villa.slug}`}
                className="bg-ionian text-white px-5 py-2 rounded-md hover:bg-ionian/90 text-sm font-medium transition-colors"
              >
                Modifica
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
