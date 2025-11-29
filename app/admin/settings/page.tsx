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
      manifesto_title: formData.get("manifesto_title"),
      manifesto_text: formData.get("manifesto_text"),
      palette_name: formData.get("palette_name"),
      // NUOVI CAMPI TRACCIAMENTO
      google_analytics_id: formData.get("google_analytics_id"),
      microsoft_clarity_id: formData.get("microsoft_clarity_id"),
      updated_at: new Date(),
    };

    const { error } = await supabase.from("settings").update(updates).eq("id", 1);
    setLoading(false);

    if (!error) {
      alert("Impostazioni salvate!");
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
        
        {/* HERO */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">1. Hero (Home Page)</h2>
          <div><label className="text-sm block mb-1">Titolo</label><input name="hero_title" defaultValue={settings.hero_title} className="w-full p-2 border rounded" /></div>
          <div><label className="text-sm block mb-1">Sottotitolo</label><textarea name="hero_subtitle" defaultValue={settings.hero_subtitle} className="w-full p-2 border rounded" /></div>
          <div><label className="text-sm block mb-1">Immagine URL</label><input name="hero_image" defaultValue={settings.hero_image} className="w-full p-2 border rounded" /></div>
        </section>

        {/* MANIFESTO */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">2. Manifesto</h2>
          <div><label className="text-sm block mb-1">Titolo</label><input name="manifesto_title" defaultValue={settings.manifesto_title} className="w-full p-2 border rounded" /></div>
          <div><label className="text-sm block mb-1">Testo</label><textarea name="manifesto_text" defaultValue={settings.manifesto_text} rows={4} className="w-full p-2 border rounded" /></div>
        </section>

        {/* TRACCIAMENTO & GDPR (NUOVO) */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">3. Tracciamento & Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm block mb-1 font-bold">Google Analytics ID (G-XXXXX)</label>
              <input name="google_analytics_id" defaultValue={settings.google_analytics_id} className="w-full p-2 border rounded font-mono text-sm" placeholder="G-..." />
            </div>
            <div>
              <label className="text-sm block mb-1 font-bold">Microsoft Clarity ID</label>
              <input name="microsoft_clarity_id" defaultValue={settings.microsoft_clarity_id} className="w-full p-2 border rounded font-mono text-sm" placeholder="Es. k9v..." />
            </div>
          </div>
          <p className="text-xs text-gray-500">I cookie verranno attivati solo se l'utente accetta il banner GDPR.</p>
        </section>

        {/* PALETTE */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">4. Scegli Stile</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(themes).map(([key, theme]) => (
              <label key={key} className="cursor-pointer relative">
                <input type="radio" name="palette_name" value={key} defaultChecked={settings.palette_name === key} className="peer sr-only"/>
                <div className="p-3 rounded-lg border-2 border-transparent peer-checked:border-black peer-checked:ring-2 ring-offset-2 hover:bg-gray-50">
                  <div className="aspect-square rounded overflow-hidden grid grid-cols-2 h-8 w-full mb-1">
                    <div style={{ backgroundColor: theme.colors.ionian }}></div>
                    <div style={{ backgroundColor: theme.colors.terracotta }}></div>
                  </div>
                  <p className="text-xs text-center">{theme.label}</p>
                </div>
              </label>
            ))}
          </div>
        </section>

        <button type="submit" disabled={loading} className="w-full py-4 bg-terracotta text-white font-bold rounded-lg">
          {loading ? "Salvataggio..." : "Salva Tutto"}
        </button>

      </form>
    </div>
  );
}
