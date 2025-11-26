"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import classNames from "classnames";

type Props = {
  villaId: string;
};

type Day = {
  date: string;
  status: "free" | "booked";
};

export default function CalendarView({ villaId }: Props) {
  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("availability")
        .select("date, status")
        .eq("villa_id", villaId)
        .gte("date", new Date().toISOString().slice(0, 10))
        .order("date", { ascending: true });

      setDays((data as any) || []);
    })();
  }, [villaId]);

  return (
    <div className="text-xs">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-serif text-base text-ionian">Disponibilità</h3>
        <div className="flex gap-3 text-[10px] text-ionian/70">
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-sage" /> Libero
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-terracotta" /> Occupato
          </span>
        </div>
      </div>

      {days.length === 0 && (
        <p className="text-ionian/60">
          Le date non sono state ancora inserite. Contatta direttamente l’host
          per verificare disponibilità.
        </p>
      )}

      {days.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {days.map((d) => (
            <div
              key={d.date}
              className={classNames(
                "rounded-xl border px-2 py-2 flex flex-col gap-1",
                d.status === "free"
                  ? "border-sage/50 bg-sage/10 text-sage"
                  : "border-terracotta/40 bg-terracotta/5 text-terracotta/90"
              )}
            >
              <span className="text-[11px] font-medium">
                {new Date(d.date).toLocaleDateString("it-IT", {
                  day: "2-digit",
                  month: "short"
                })}
              </span>
              <span className="text-[10px] uppercase tracking-wide">
                {d.status === "free" ? "Libero" : "Occupato"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
