"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { it } from "date-fns/locale";

export default function AdminCalendar() {
  const [villas, setVillas] = useState<any[]>([]);
  const [selectedVillaId, setSelectedVillaId] = useState<string>("");
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. Carica la lista delle ville per il menu a tendina
  useEffect(() => {
    supabase.from("villas").select("id, name").then(({ data }) => {
      if (data) {
        setVillas(data);
        if (data.length > 0) setSelectedVillaId(data[0].id); // Seleziona la prima di default
      }
    });
  }, []);

  // 2. Quando cambia villa, carica le sue date occupate
  useEffect(() => {
    if (!selectedVillaId) return;
    fetchDates(selectedVillaId);
  }, [selectedVillaId]);

  async function fetchDates(villaId: string) {
    setLoading(true);
    const { data } = await supabase
      .from("availability")
      .select("date")
      .eq("villa_id", villaId);
    
    if (data) {
      setBookedDates(data.map(d => new Date(d.date)));
    }
    setLoading(false);
  }

  // 3. Gestisce il click sul giorno (Aggiunge o Rimuove)
  async function handleDayClick(day: Date | undefined) {
    if (!day || !selectedVillaId) return;

    // Formatta la data per il DB (YYYY-MM-DD) per evitare problemi di fuso orario
    // Usiamo toISOString e prendiamo la parte prima della T
    const dateString = day.toLocaleDateString('en-CA'); // en-CA produce YYYY-MM-DD locale-safe

    // Controlliamo se è già selezionata
    const isBooked = bookedDates.some(
      d => d.toLocaleDateString('en-CA') === dateString
    );

    if (isBooked) {
      // RIMUOVI (Libera la data)
      await supabase
        .from("availability")
        .delete()
        .eq("villa_id", selectedVillaId)
        .eq("date", dateString);
      
      // Aggiorna UI locale rimuovendo la data
      setBookedDates(prev => prev.filter(d => d.toLocaleDateString('en-CA') !== dateString));

    } else {
      // AGGIUNGI (Occupa la data)
      await supabase
        .from("availability")
        .insert([{ villa_id: selectedVillaId, date: dateString }]);
      
      // Aggiorna UI locale aggiungendo la data
      setBookedDates(prev => [...prev, day]);
    }
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-serif text-ionian mb-8">Gestione Disponibilità</h1>

      <div className="bg-white p-8 rounded-xl border border-border shadow-sm flex flex-col md:flex-row gap-12">
        
        {/* Colonna Sinistra: Selettore Villa */}
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium mb-2 text-gray-700">Seleziona Villa</label>
          <select 
            value={selectedVillaId}
            onChange={(e) => setSelectedVillaId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-terracotta/50 outline-none"
          >
            {villas.map(v => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800">
            <p className="font-bold mb-1">Come funziona:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Clicca su un giorno per segnarlo come <strong>Occupato</strong> (Rosso).</li>
              <li>Clicca di nuovo per liberarlo.</li>
              <li>Le modifiche sono salvate all'istante.</li>
            </ul>
          </div>
        </div>

        {/* Colonna Destra: Calendario Interattivo */}
        <div className="flex-1 flex justify-center bg-gray-50 rounded-xl p-6 border border-gray-100">
          <DayPicker
            mode="default"
            selected={bookedDates}
            onDayClick={handleDayClick}
            locale={it}
            modifiers={{ booked: bookedDates }}
            modifiersStyles={{
              booked: { 
                backgroundColor: "#E07A5F", 
                color: "white", 
                fontWeight: "bold",
                borderRadius: "50%"
              }
            }}
            styles={{
              head_cell: { color: "#2C3E50", fontSize: "0.9rem" },
              day: { margin: "2px" } // Spazio tra i giorni
            }}
          />
        </div>

      </div>
    </div>
  );
}
