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
    // Scarichiamo le richieste e, grazie alla relazione nel DB, prendiamo anche il nome della villa!
    const { data, error } = await supabase
      .from("leads")
      .select("*, villas(name)") 
      .order("created_at", { ascending: false }); // I più recenti in alto
    
    if (error) console.error("Errore caricamento leads:", error);
    if (data) setLeads(data);
    setLoading(false);
  }

  // Funzione per segnare come "Gestito" (cambia colore)
  async function toggleStatus(id: number, currentStatus: string) {
    const newStatus = currentStatus === "new" ? "contacted" : "new";
    
    // Aggiorna Supabase
    await supabase.from("leads").update({ status: newStatus }).eq("id", id);
    
    // Aggiorna la vista locale subito
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
  }

  if (loading) return <div className="p-8">Caricamento richieste...</div>;

  return (
    <div>
      <h1 className="text-3xl font-serif text-ionian mb-8">Richieste di Contatto</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-medium text-gray-500 text-sm">Data</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Nome Cliente</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Telefono</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Villa Richiesta</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Messaggio</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Azione</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => (
              <tr key={lead.id} className={`transition-colors ${lead.status === "contacted" ? "bg-gray-50/50" : "hover:bg-blue-50/30"}`}>
                <td className="p-4 text-sm whitespace-nowrap text-gray-500">
                  {new Date(lead.created_at).toLocaleDateString("it-IT", { day: '2-digit', month: '2-digit', hour: '2-digit', minute:'2-digit' })}
                </td>
                <td className="p-4 font-medium text-ionian">{lead.name}</td>
                <td className="p-4 font-mono text-terracotta">{lead.phone}</td>
                <td className="p-4 text-sm font-medium text-gray-700">
                  {/* Se la relazione villas(name) funziona mostra il nome, altrimenti l'ID */}
                  {lead.villas?.name || lead.villa_id}
                </td>
                <td className="p-4 text-sm text-gray-600 max-w-xs truncate" title={lead.message}>
                  {lead.message || "-"}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => toggleStatus(lead.id, lead.status)}
                    className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                      lead.status === "new"
                        ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200 shadow-sm"
                        : "bg-gray-100 text-gray-400 border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    {lead.status === "new" ? "DA CHIAMARE" : "Già Chiamato"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {leads.length === 0 && (
          <div className="p-12 text-center text-gray-400 flex flex-col items-center gap-2">
            <span className="text-2xl">📭</span>
            <p>Nessuna richiesta ricevuta ancora.</p>
          </div>
        )}
      </div>
    </div>
  );
}
