"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LeadsAdmin() {
type Lead = {
  id: string;
  name: string;
  phone: string;
  message?: string;
  villa_id?: string;
  created_at?: string;
  villa?: {
    name: string;
  };
};

const [leads, setLeads] = useState<Lead[]>([]);


  useEffect(() => {
    supabase
      .from("leads")
      .select("*, villa:villa_id(name)")
      .order("created_at", { ascending: false })
      .then(({ data }) => setLeads(data || []));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Richieste di richiamata</h2>

      <div className="space-y-3">
        {leads.map((l: any) => (
          <div key={l.id} className="card p-4">
            <p className="font-semibold text-ionian text-sm">
              {l.villa?.name?.it || "Aus"}
            </p>
            <p className="text-xs">
              {l.name} – {l.phone}
            </p>
            {l.message && (
              <p className="text-xs text-ionian/70 mt-1">{l.message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
