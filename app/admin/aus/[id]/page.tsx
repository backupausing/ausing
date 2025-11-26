"use client";

import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const LOCALES = ["it", "en", "fr", "de", "es"];

type Villa = {
  id: string;
  slug: string;
  name: Record<string, string>;
  description: Record<string, string>;
  address: string | null;
  phone: string | null;
  map_link: string | null;
  images: string[];
};

export default function AusEditor() {
  const { id } = useParams();
  const [villa, setVilla] = useState<Villa | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("villas")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (data) {
        setVilla({
          ...(data as any),
          images: (data as any).images || [],
          name: (data as any).name || {},
          description: (data as any).description || {}
        });
      }
    })();
  }, [id]);

  if (!villa) return <p>Caricamento Aus…</p>;

  const updateField = (field: keyof Villa, value: any) => {
    setVilla((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateLocaleField = (
    field: "name" | "description",
    lang: string,
    value: string
  ) => {
    setVilla((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: {
          ...(prev as any)[field],
          [lang]: value
        }
      };
    });
  };

  const handleSave = async () => {
    if (!villa) return;
    setSaving(true);
    setMsg("");

    const { error } = await supabase
      .from("villas")
      .update({
        slug: villa.slug,
        name: villa.name,
        description: villa.description,
        address: villa.address,
        phone: villa.phone,
        map_link: villa.map_link,
        images: villa.images
      })
      .eq("id", villa.id);

    setSaving(false);
    if (error) {
      setMsg("Errore durante il salvataggio.");
    } else {
      setMsg("Salvato con successo.");
    }
  };

  const handleImageUpload = async (e: any) => {
    const files: FileList = e.target.files;
    if (!files || !villa) return;

    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      const path = `villa-${villa.id}/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("aus-images")
        .upload(path, file);

      if (!error) {
        const { data } = supabase.storage
          .from("aus-images")
          .getPublicUrl(path);
        if (data?.publicUrl) {
          newUrls.push(data.publicUrl);
        }
      }
    }

    if (newUrls.length > 0) {
      updateField("images", [...villa.images, ...newUrls]);
    }

    e.target.value = "";
  };

  const removeImage = (url: string) => {
    if (!villa) return;
    updateField(
      "images",
      villa.images.filter((img) => img !== url)
    );
  };

  const moveImage = (index: number, dir: -1 | 1) => {
    if (!villa) return;
    const imgs = [...villa.images];
    const target = index + dir;
    if (target < 0 || target >= imgs.length) return;
    const temp = imgs[target];
    imgs[target] = imgs[index];
    imgs[index] = temp;
    updateField("images", imgs);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">
          Modifica Aus: {villa.name?.it || villa.slug}
        </h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-terracotta text-cream text-xs px-4 py-2 rounded-full"
        >
          {saving ? "Salvataggio…" : "Salva modifiche"}
        </button>
      </div>

      {msg && <p className="text-xs text-sage">{msg}</p>}

      {/* Slug + contatti */}
      <div className="card p-4 space-y-3 text-sm">
        <div>
          <label className="text-xs text-ionian/70">Slug</label>
          <input
            className="w-full border border-sand rounded-lg px-2 py-1 text-sm"
            value={villa.slug}
            onChange={(e) => updateField("slug", e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs text-ionian/70">Indirizzo</label>
          <input
            className="w-full border border-sand rounded-lg px-2 py-1 text-sm"
            value={villa.address || ""}
            onChange={(e) => updateField("address", e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs text-ionian/70">Telefono</label>
          <input
            className="w-full border border-sand rounded-lg px-2 py-1 text-sm"
            value={villa.phone || ""}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs text-ionian/70">
            Link Google Maps (facoltativo)
          </label>
          <input
            className="w-full border border-sand rounded-lg px-2 py-1 text-sm"
            value={villa.map_link || ""}
            onChange={(e) => updateField("map_link", e.target.value)}
          />
        </div>
      </div>

      {/* Multilingua */}
      <div className="card p-4 space-y-4 text-sm">
        <h3 className="text-sm font-semibold mb-1">
          Testi multilingua (nome + descrizione)
        </h3>

        {LOCALES.map((lang) => (
          <div
            key={lang}
            className="border border-sand/60 rounded-lg p-3 space-y-2"
          >
            <p className="text-xs font-semibold uppercase text-ionian/70">
              {lang.toUpperCase()}
            </p>
            <div>
              <label className="text-xs text-ionian/70">Nome</label>
              <input
                className="w-full border border-sand rounded-lg px-2 py-1 text-sm"
                value={villa.name?.[lang] || ""}
                onChange={(e) =>
                  updateLocaleField("name", lang, e.target.value)
                }
              />
            </div>
            <div>
              <label className="text-xs text-ionian/70">Descrizione</label>
              <textarea
                className="w-full border border-sand rounded-lg px-2 py-1 text-xs"
                rows={3}
                value={villa.description?.[lang] || ""}
                onChange={(e) =>
                  updateLocaleField("description", lang, e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>

      {/* Immagini */}
      <div className="card p-4 text-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Immagini</h3>
          <label className="text-xs bg-sand px-3 py-1 rounded-full cursor-pointer">
            Aggiungi immagini
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {villa.images.length === 0 && (
          <p className="text-xs text-ionian/70">Nessuna immagine ancora.</p>
        )}

        <div className="grid md:grid-cols-3 gap-3">
          {villa.images.map((url, idx) => (
            <div
              key={url}
              className="border border-sand rounded-lg overflow-hidden text-[11px]"
            >
              <div
                className="aspect-video bg-cover bg-center"
                style={{ backgroundImage: `url(${url})` }}
              />
              <div className="flex items-center justify-between gap-1 px-2 py-2">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => moveImage(idx, -1)}
                    className="px-2 py-[2px] border rounded-full"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(idx, 1)}
                    className="px-2 py-[2px] border rounded-full"
                  >
                    ↓
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="px-2 py-[2px] border border-terracotta text-terracotta rounded-full"
                >
                  Rimuovi
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
