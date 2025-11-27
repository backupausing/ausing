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
      palette_name: formData.get("palette_name"),
      updated_at: new Date(),
    };

    const { error } = await supabase.from("settings").update(updates).eq("id", 1);
    setLoading(false);

    if (!error) {
      alert("Sito aggiornato! Ricarica la Home per vedere i colori.");
      window.location.reload(); // Ricarica per vedere il tema applicato anche qui
    } else {
      alert("Errore");
    }
  }

  if (!settings) return <div className="p-8">Caricamento impostazioni...</div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-serif text-ionian mb-8">Personalizza Sito</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-border space-y-8">
        
        {/* SEZIONE HERO */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">1. Hero (Home Page)</h2>
          
          <div>
            <label className="block text-sm font-medium mb-1">Titolo Principale</label>
            <input name="hero_title" defaultValue={settings.hero_title} className="w-full p-2 border rounded" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Sottotitolo</label>
            <textarea name="hero_subtitle" defaultValue={settings.hero_subtitle} rows={3} className="w-full p-2 border rounded" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Immagine di Sfondo (URL)</label>
            <input name="hero_image" defaultValue={settings.hero_image} className="w-full p-2 border rounded" required />
            {settings.hero_image && (
              <img src={settings.hero_image} className="mt-2 w-full h-48 object-cover rounded-lg" />
            )}
          </div>
        </section>

        {/* SEZIONE COLORI */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">2. Scegli Stile (Palette)</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(themes).map(([key, theme]) => (
              <label key={key} className="cursor-pointer relative">
                <input 
                  type="radio" 
                  name="palette_name" 
                  value={key} 
                  defaultChecked={settings.palette_name === key}
                  className="peer sr-only"
                />
                <div className="p-3 rounded-lg border-2 border-transparent peer-checked:border-black peer-checked:ring-2 ring-offset-2 transition-all hover:bg-gray-50">
                  <div className="aspect-square rounded-md overflow-hidden grid grid-cols-2 h-20 w-full mb-2 shadow-sm">
                    <div style={{ backgroundColor: theme.colors.cream }}></div>
                    <div style={{ backgroundColor: theme.colors.ionian }}></div>
                    <div style={{ backgroundColor: theme.colors.terracotta }}></div>
                    <div style={{ backgroundColor: theme.colors.sand }}></div>
                  </div>
                  <p className="text-xs text-center font-medium">{theme.label}</p>
                </div>
              </label>
            ))}
          </div>
        </section>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-4 bg-terracotta text-white font-bold text-lg rounded-lg hover:opacity-90 transition-opacity"
        >
          {loading ? "Aggiornamento in corso..." : "Salva e Pubblica Modifiche"}
        </button>

      </form>
    </div>
  );
}
