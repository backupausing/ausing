"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Stile base del calendario
import { supabase } from "@/lib/supabase";
import { it } from "date-fns/locale"; // Per averlo in Italiano

export default function AvailabilityCalendar({ villaId }: { villaId: string }) {
  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  useEffect(() => {
    async function fetchAvailability() {
      // Prende tutte le date dalla tabella 'availability' per questa villa
      const { data, error } = await supabase
        .from("availability")
        .select("date")
        .eq("villa_id", villaId);

      if (data) {
        // Convertiamo le stringhe del DB in oggetti Date Javascript
        const dates = data.map((row) => new Date(row.date));
        setBookedDates(dates);
      }
    }

    fetchAvailability();
  }, [villaId]);

  return (
    <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
      <h3 className="font-serif text-xl text-ionian mb-4">Disponibilità</h3>
      <div className="flex justify-center">
        <DayPicker
          mode="default"
          selected={bookedDates} // Evidenzia le date occupate
          modifiers={{ booked: bookedDates }}
          modifiersStyles={{
            booked: { color: "#ef4444", textDecoration: "line-through", opacity: 0.5 }
          }}
          locale={it} // Calendario in Italiano
          disabled={bookedDates} // Impedisce di cliccare sulle date occupate
          styles={{
            caption: { color: "#2C3E50" },
            head_cell: { color: "#E07A5F" }, // Intestazioni color terracotta
          }}
        />
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm justify-center text-ionian/60">
        <span className="w-3 h-3 rounded-full bg-red-500 opacity-50"></span>
        <span>Date occupate</span>
        <span className="w-3 h-3 rounded-full border border-ionian ml-4"></span>
        <span>Libere</span>
      </div>
    </div>
  );
}
