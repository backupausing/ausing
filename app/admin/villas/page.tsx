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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-serif text-ionian">Le Mie Ville</h1>
        
        {/* TASTO CREA NUOVA */}
        <Link 
          href="/admin/villas/new" 
          className="bg-terracotta text-white px-6 py-2 rounded-full font-medium hover:bg-terracotta/90 transition-colors shadow-md w-full sm:w-auto text-center"
        >
          + Nuova Villa
        </Link>
      </div>

      <div className="grid gap-4">
        {villas.map((villa) => (
          <div key={villa.id} className={`p-4 md:p-6 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all ${
            villa.is_visible ? "bg-white border-border shadow-sm" : "bg-gray-50 border-gray-200 opacity-75 grayscale-[0.5]"
          }`}>
            
            {/* Blocco Immagine + Info (Impilati su mobile, affiancati su desktop) */}
            <div className="flex items-start md:items-center gap-4 w-full md:w-auto">
              <img 
                src={villa.image} 
                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg bg-gray-200 shrink-0" 
                alt={villa.name} 
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg md:text-xl font-medium text-ionian truncate">{villa.name}</h3>
                  {/* Etichetta stato */}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wide shrink-0 ${
                    villa.is_visible ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"
                  }`}>
                    {villa.is_visible ? "Pubblica" : "Nascosta"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">Host: {villa.host}</p>
              </div>
            </div>
            
            {/* Blocco Pulsanti (Full width su mobile) */}
            <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
              {/* Switch Visibilità */}
              <button
                onClick={() => toggleVisibility(villa.id, villa.is_visible)}
                className={`flex-1 md:flex-none text-center text-sm font-medium px-4 py-2 rounded border transition-colors ${
                  villa.is_visible 
                    ? "border-green-200 text-green-700 hover:bg-green-50" 
                    : "border-gray-300 text-gray-600 hover:bg-white"
                }`}
              >
                {villa.is_visible ? "Nascondi" : "Pubblica"}
              </button>

              <Link 
                href={`/admin/villas/${villa.slug}`}
                className="flex-1 md:flex-none text-center bg-ionian text-white px-5 py-2 rounded-md hover:bg-ionian/90 text-sm font-medium transition-colors"
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
