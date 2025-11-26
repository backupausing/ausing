"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewVillaPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    
    // Generiamo lo slug e l'ID automaticamente dal nome
    // Es: "Villa Bella" -> "villa-bella"
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Rimuove caratteri strani
      .replace(/(^-|-$)+/g, '');   // Rimuove trattini inizio/fine
    
    // ID univoco (usiamo lo slug + timestamp per essere sicuri)
    const id = `${slug}-${Date.now()}`;

    const servicesString = formData.get("services") as string;
    const servicesArray = servicesString.split(",").map(s => s.trim()).filter(s => s !== "");

    const newVilla = {
      id: id,
      slug: slug,
      name: name,
      description: formData.get("description"),
      host: formData.get("host"),
      image: formData.get("image"),
      price_range: formData.get("price_range"),
      services: servicesArray,
      is_visible: false // Creata nascosta di default!
    };

    const { error } = await supabase.from("villas").insert([newVilla]);

    setLoading(false);
    
    if (!error) {
      alert("Villa creata! È attualmente nascosta, attivala dalla lista.");
      router.push("/admin/villas");
      router.refresh();
    } else {
      alert("Errore: " + error.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-ionian">&larr; Indietro</button>
        <h1 className="text-3xl font-serif text-ionian">Nuova Villa</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-border shadow-sm space-y-6">
        
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Nome Villa</label>
          <input name="name" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-terracotta/50 outline-none" required placeholder="Es. Dimora del Sole" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Nome Host</label>
            <input name="host" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-terracotta/50 outline-none" required placeholder="Es. Marco" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Fascia Prezzo</label>
            <input name="price_range" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-terracotta/50 outline-none" placeholder="Es: €€€" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">URL Immagine</label>
          <input name="image" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-terracotta/50 outline-none" required placeholder="https://..." />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Descrizione</label>
          <textarea name="description" rows={5} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-terracotta/50 outline-none" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Servizi (separati da virgola)</label>
          <textarea name="services" rows={3} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-terracotta/50 outline-none" placeholder="Wi-Fi, Piscina, Parcheggio..." />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 bg-terracotta text-white rounded hover:bg-terracotta/90 font-medium shadow-md"
        >
          {loading ? "Creazione in corso..." : "Crea Villa"}
        </button>

      </form>
    </div>
  );
}
