"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { themes } from "@/lib/themes";

export default function AdminSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.from("settings").select("*").single().then(({ data }) => {
      if (data) setSettings(data);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const updates = {
      hero_title: formData.get("hero_title"),
      hero_subtitle: formData.get("hero_subtitle"),
      hero_image: formData.get("hero_image"),
      manifesto_title: formData.get("manifesto_title"), // <--- NUOVO
      manifesto_text: formData.get("manifesto_text"),   // <--- NUOVO
      palette_name: formData.get("palette_name"),
      updated_at: new Date(),
    };

    const { error } = await supabase.from("settings").update(updates).eq("id", 1);
    setLoading(false);

    if (!error) {
      alert("Sito aggiornato!");
      window.location.reload();
    } else {
      alert("Errore");
    }
  }

  if (!settings) return <div className="p-8">Caricamento...</div>;

  return (
    <div className="max-w-4xl pb-10">
      <h1 className="text-3xl font-serif text-ionian mb-8">Personalizza Sito</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-border space-y-10">
        
        {/* SEZIONE HERO */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">1. Hero (Parte Alta)</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Titolo Principale</label>
            <input name="hero_title" defaultValue={settings.hero_title} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sottotitolo</label>
            <textarea name="hero_subtitle" defaultValue={settings.hero_subtitle} rows={2} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Immagine Sfondo (URL)</label>
            <input name="hero_image" defaultValue={settings.hero_image} className="w-full p-2 border rounded" required />
          </div>
        </section>

        {/* SEZIONE MANIFESTO (NUOVA) */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">2. Manifesto (Parte Bassa)</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Titolo Sezione</label>
            <input name="manifesto_title" defaultValue={settings.manifesto_title} className="w-full p-2 border rounded" placeholder="Es. La filosofia AUSING" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Testo del Manifesto</label>
            <textarea name="manifesto_text" defaultValue={settings.manifesto_text} rows={5} className="w-full p-2 border rounded" placeholder="Scrivi qui il testo sull'albergo diffuso..." />
          </div>
        </section>

        {/* SEZIONE COLORI */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">3. Scegli Stile</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(themes).map(([key, theme]) => (
              <label key={key} className="cursor-pointer relative">
                <input type="radio" name="palette_name" value={key} defaultChecked={settings.palette_name === key} className="peer sr-only"/>
                <div className="p-3 rounded-lg border-2 border-transparent peer-checked:border-black peer-checked:ring-2 ring-offset-2 transition-all hover:bg-gray-50">
                  <div className="aspect-square rounded-md overflow-hidden grid grid-cols-2 h-10 w-full mb-2 shadow-sm">
                    <div style={{ backgroundColor: theme.colors.cream }}></div>
                    <div style={{ backgroundColor: theme.colors.ionian }}></div>
                  </div>
                  <p className="text-xs text-center font-medium">{theme.label}</p>
                </div>
              </label>
            ))}
          </div>
        </section>

        <button type="submit" disabled={loading} className="w-full py-4 bg-terracotta text-white font-bold text-lg rounded-lg hover:opacity-90 transition-opacity">
          {loading ? "Aggiornamento..." : "Salva Modifiche"}
        </button>

      </form>
    </div>
  );
}
