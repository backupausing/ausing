"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function EditVillaPage({ params }: { params: { slug: string } }) {
  const [villa, setVilla] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Carica i dati della villa
  useEffect(() => {
    supabase.from("villas").select("*").eq("slug", params.slug).single()
      .then(({ data }) => setVilla(data));
  }, [params.slug]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    // Gestione dei servizi (da testo separato da virgola a Array)
    const servicesString = formData.get("services") as string;
    const servicesArray = servicesString.split(",").map(s => s.trim()).filter(s => s !== "");

    const updates = {
      name: formData.get("name"),
      description: formData.get("description"),
      host: formData.get("host"),
      image: formData.get("image"),
      price_range: formData.get("price_range"),
      services: servicesArray
    };

    const { error } = await supabase
      .from("villas")
      .update(updates)
      .eq("id", villa.id);

    setLoading(false);
    
    if (!error) {
      alert("Salvato con successo!");
      router.refresh(); // Aggiorna i dati
      router.push("/admin/villas"); // Torna alla lista
    } else {
      alert("Errore durante il salvataggio: " + error.message);
    }
  }

  if (!villa) return <div className="p-8">Caricamento dati villa...</div>;

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-ionian">&larr; Indietro</button>
        <h1 className="text-3xl font-serif text-ionian">Modifica: {villa.name}</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-border shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Nome Villa</label>
            <input name="name" defaultValue={villa.name} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-terracotta/50 outline-none" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Nome Host</label>
            <input name="host" defaultValue={villa.host} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-terracotta/50 outline-none" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">URL Immagine Principale</label>
          <input name="image" defaultValue={villa.image} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-terracotta/50 outline-none" required />
          <p className="text-xs text-gray-500 mt-1">Copia qui l'indirizzo dell'immagine (es. da Unsplash o altro hosting)</p>
          {villa.image && <img src={villa.image} className="mt-2 h-32 w-full object-cover rounded-lg opacity-80" />}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Fascia Prezzo</label>
          <input name="price_range" defaultValue={villa.price_range} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-terracotta/50 outline-none" placeholder="Es: €€€" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Descrizione Completa</label>
          <textarea name="description" defaultValue={villa.description} rows={8} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-terracotta/50 outline-none" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Servizi (separati da virgola)</label>
          <textarea 
            name="services" 
            defaultValue={villa.services.join(", ")} 
            rows={3} 
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-terracotta/50 outline-none" 
          />
          <p className="text-xs text-gray-500 mt-1">Esempio: Wi-Fi, Piscina, Parcheggio, Vista Mare</p>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
          <button 
            type="button" 
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-700 font-medium"
          >
            Annulla
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 py-2 bg-ionian text-white rounded hover:bg-ionian/90 font-medium shadow-lg shadow-ionian/20"
          >
            {loading ? "Salvataggio..." : "Salva Modifiche"}
          </button>
        </div>

      </form>
    </div>
  );
}
