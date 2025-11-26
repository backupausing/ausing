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

    // I servizi sono salvati come array, ma nel form li modifichiamo come testo separato da virgola
    const servicesString = formData.get("services") as string;
    const servicesArray = servicesString.split(",").map(s => s.trim()).filter(s => s !== "");

    const updates = {
      name: formData.get("name"),
      description: formData.get("description"),
      host: formData.get("host"),
      image: formData.get("image"), // Per ora URL dell'immagine
      price_range: formData.get("price_range"),
      services: servicesArray
    };

    const { error } = await supabase
      .from("villas")
      .update(updates)
      .eq("id", villa.id);

    setLoading(false);
    if (!error) {
      alert("Villa aggiornata con successo!");
      router.refresh();
      router.push("/admin/villas");
    } else {
      alert("Errore durante l'aggiornamento");
    }
  }

  if (!villa) return <div>Caricamento...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-serif text-ionian mb-8">Modifica: {villa.name}</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-border space-y-6">
        
        <div>
          <label className="block text-sm font-medium mb-1">Nome Villa</label>
          <input name="name" defaultValue={villa.name} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Host</label>
          <input name="host" defaultValue={villa.host} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">URL Immagine</label>
          <input name="image" defaultValue={villa.image} className="w-full p-2 border rounded" required />
          <p className="text-xs text-gray-500 mt-1">Incolla qui il link di una foto (es. da Unsplash)</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fascia Prezzo (€, €€, €€€)</label>
          <input name="price_range" defaultValue={villa.price_range} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descrizione</label>
          <textarea name="description" defaultValue={villa.description} rows={6} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Servizi (separati da virgola)</label>
          <textarea 
            name="services" 
            defaultValue={villa.services.join(", ")} 
            rows={3} 
            className="w-full p-2 border rounded" 
          />
          <p className="text-xs text-gray-500 mt-1">Esempio: Wi-Fi, Piscina, Parcheggio</p>
        </div>

        <div className="pt-4 flex gap-4">
          <button 
            type="button" 
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Annulla
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 py-2 bg-ionian text-white rounded hover:bg-ionian/90"
          >
            {loading ? "Salvataggio..." : "Salva Modifiche"}
          </button>
        </div>

      </form>
    </div>
  );
}
