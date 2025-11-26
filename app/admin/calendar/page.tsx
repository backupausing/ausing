"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Villa = {
  id: string;
  name: any;
};

type Av = {
  id: string;
  date: string;
  status: "free" | "booked";
};

export default function CalendarsAdmin() {
  const [villas, setVillas] = useState<Villa[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [items, setItems] = useState<Av[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newStatus, setNewStatus] = useState<"free" | "booked">("free");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("villas")
        .select("id, name")
        .order("id", { ascending: true });

      setVillas((data as any) || []);
    })();
  }, []);

  useEffect(() => {
    if (!selected) return;
    (async () => {
      const { data } = await supabase
        .from("availability")
        .select("id, date, status")
        .eq("villa_id", selected)
        .order("date", { ascending: true });

      setItems((data as any) || []);
    })();
  }, [selected]);

  const addDate = async () => {
    if (!selected || !newDate) return;

    const { data, error } = await supabase
      .from("availability")
      .insert({
        villa_id: selected,
        date: newDate,
        status: newStatus
      })
      .select()
      .single();

    if (!error && data) {
      setItems((prev) => [...prev, data as any]);
      setNewDate("");
    }
  };

  const toggleStatus = async (id: string, current: "free" | "booked") => {
    const next = current === "free" ? "booked" : "free";
    await supabase
      .from("availability")
      .update({ status: next })
      .eq("id", id);

    setItems((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: next } : d))
    );
  };

  const removeDate = async (id: string) => {
    await supabase.from("availability").delete().eq("id", id);
    setItems((prev) => prev.filter((d) => d.id !== id));
  };

  const selectedVilla = villas.find((v) => v.id === selected);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Gestione Calendari</h2>

      <div className="card p-4 text-sm space-y-3">
        <div>
          <label className="text-xs text-ionian/70">Seleziona Aus</label>
          <select
            className="w-full border border-sand rounded-lg px-2 py-1 text-sm"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">— Seleziona —</option>
            {villas.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name?.it || v.name?.en || v.id}
              </option>
            ))}
          </select>
        </div>

        {selected && (
          <>
            <p className="text-xs text-ionian/70">
              Gestisci le date per:{" "}
              <strong>
                {selectedVilla?.name?.it || selectedVilla?.name?.en}
              </strong>
            </p>

            <div className="flex flex-col md:flex-row gap-2 items-start md:items-end">
              <div className="flex-1">
                <label className="text-xs text-ionian/70">Data</label>
                <input
                  type="date"
                  className="w-full border border-sand rounded-lg px-2 py-1 text-sm"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-ionian/70">Stato</label>
                <select
                  className="border border-sand rounded-lg px-2 py-1 text-sm"
                  value={newStatus}
                  onChange={(e) =>
                    setNewStatus(e.target.value as "free" | "booked")
                  }
                >
                  <option value="free">Libero</option>
                  <option value="booked">Occupato</option>
                </select>
              </div>
              <button
                onClick={addDate}
                className="bg-terracotta text-cream px-4 py-2 rounded-lg text-xs"
              >
                Aggiungi
              </button>
            </div>
          </>
        )}
      </div>

      {selected && (
        <div className="card p-4 text-xs space-y-2">
          <h3 className="text-sm font-semibold mb-2">Date inserite</h3>
          {items.length === 0 && (
            <p className="text-ionian/70">
              Nessuna data inserita per questa Aus.
            </p>
          )}

          <div className="grid md:grid-cols-3 gap-2">
            {items.map((d) => (
              <div
                key={d.id}
                className={`rounded-lg border px-2 py-2 flex flex-col gap-1 ${
                  d.status === "free"
                    ? "border-sage/50 bg-sage/10 text-sage"
                    : "border-terracotta/50 bg-terracotta/10 text-terracotta"
                }`}
              >
                <span className="text-[11px] font-medium">
                  {new Date(d.date).toLocaleDateString("it-IT", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}
                </span>
                <span className="text-[10px] uppercase tracking-wide">
                  {d.status === "free" ? "Libero" : "Occupato"}
                </span>
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => toggleStatus(d.id, d.status)}
                    className="flex-1 border border-white/40 rounded-full px-2 py-[1px]"
                  >
                    Cambia stato
                  </button>
                  <button
                    onClick={() => removeDate(d.id)}
                    className="border border-white/40 rounded-full px-2 py-[1px]"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
