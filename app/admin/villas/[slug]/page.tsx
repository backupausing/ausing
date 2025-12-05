"use client";

import { useEffect, useState, use } from "react"; // <--- Aggiunto 'use'
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

// Next.js 15: params è una Promise anche nei Client Components
export default function EditVillaPage({ params }: { params: Promise<{ slug: string }> }) {
  // Sspacchettiamo i parametri con use()
  const { slug } = use(params);

  const [villa, setVilla] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (slug) {
      supabase.from("villas").select("*").eq("slug", slug).single()
        .then(({ data }) => setVilla(data));
    }
  }, [slug]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const servicesArray = (formData.get("services") as string).split(",").map(s => s.trim()).filter(s => s !== "");
    const galleryString = formData.get("gallery") as string;
    const galleryArray = galleryString.split(/[\n,]+/).map(s => s.trim()).filter(s => s !== "");

    const updates = {
      name: formData.get("name"),
      description: formData.get("description"),
      host: formData.get("host"),
      image: formData.get("image"),
      price_range: formData.get("price_range"),
      services: servicesArray,
      gallery: galleryArray,
      map_url: formData.get("map_url"),
      updated_at: new Date()
    };

    const { error } = await supabase.from("villas").update(updates).eq("id", villa.id);
    setLoading(false);
    
    if (!error) {
      alert("Salvato!");
      router.push("/admin/villas");
    } else {
      alert("Errore: " + error.message);
    }
  }

  if (!villa) return <div className="p-8">Caricamento...</div>;

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-ionian">&larr; Indietro</button>
        <h1 className="text-3xl font-serif text-ionian">Modifica: {villa.name}</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-border space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div><label className="text-sm block mb-1">Nome</label><input name="name" defaultValue={villa.name} className="w-full p-2 border rounded" required /></div>
             <div><label className="text-sm block mb-1">Host</label><input name="host" defaultValue={villa.host} className="w-full p-2 border rounded" required /></div>
        </div>
        
        <div><label className="text-sm block mb-1">Foto Copertina</label><input name="image" defaultValue={villa.image} className="w-full p-2 border rounded" required /></div>
        <div><label className="text-sm block mb-1">Prezzo</label><input name="price_range" defaultValue={villa.price_range} className="w-full p-2 border rounded" required /></div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Link Google Maps</label>
          <input name="map_url" defaultValue={villa.map_url} className="w-full p-2 border rounded" placeholder="Es: https://goo.gl/maps/..." />
        </div>

        <div><label className="text-sm block mb-1">Descrizione</label><textarea name="description" defaultValue={villa.description} rows={5} className="w-full p-2 border rounded" required /></div>
        <div><label className="text-sm block mb-1">Servizi</label><textarea name="services" defaultValue={villa.services?.join(", ")} className="w-full p-2 border rounded" /></div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="block text-sm font-bold mb-2 text-ionian">Galleria Immagini</label>
          <textarea name="gallery" defaultValue={villa.gallery ? villa.gallery.join("\n") : ""} rows={5} className="w-full p-2 border rounded" placeholder={"https://...\nhttps://..."} />
        </div>

        <button type="submit" disabled={loading} className="px-6 py-2 bg-ionian text-white rounded hover:bg-ionian/90 w-full">
          {loading ? "Salvataggio..." : "Salva Modifiche"}
        </button>
      </form>
    </div>
  );
}
