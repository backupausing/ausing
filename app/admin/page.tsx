"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Carica i dati appena apri la pagina
  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false }); // I più recenti in alto
    
    if (data) setLeads(data);
    setLoading(false);
  }

  // Funzione per segnare come "Gestito" (cambia stato)
  async function toggleStatus(id: number, currentStatus: string) {
    const newStatus = currentStatus === "new" ? "contacted" : "new";
    
    // Aggiorna Supabase
    await supabase.from("leads").update({ status: newStatus }).eq("id", id);
    
    // Aggiorna la vista locale
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
  }

  if (loading) return <div>Caricamento richieste...</div>;

  return (
    <div>
      <h1 className="text-3xl font-serif text-ionian mb-8">Richieste di Contatto</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-medium text-gray-500 text-sm">Data</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Nome</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Telefono</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Villa</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Messaggio</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Stato</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => (
              <tr key={lead.id} className={lead.status === "contacted" ? "bg-gray-50 opacity-60" : ""}>
                <td className="p-4 text-sm">
                  {new Date(lead.created_at).toLocaleDateString("it-IT")}
                </td>
                <td className="p-4 font-medium text-ionian">{lead.name}</td>
                <td className="p-4 text-terracotta">{lead.phone}</td>
                <td className="p-4 text-sm text-gray-600">{lead.villa_id}</td>
                <td className="p-4 text-sm text-gray-600 max-w-xs truncate" title={lead.message}>
                  {lead.message || "-"}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => toggleStatus(lead.id, lead.status)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      lead.status === "new"
                        ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                        : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    {lead.status === "new" ? "Da chiamare" : "Già chiamato"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {leads.length === 0 && (
          <div className="p-8 text-center text-gray-400">Nessuna richiesta ricevuta ancora.</div>
        )}
      </div>
    </div>
  );
}
