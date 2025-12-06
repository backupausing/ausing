"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactForm({ villaId, villaName }: { villaId: string, villaName: string }) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      villa_id: villaId,
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string, // <--- NUOVO CAMPO
      message: formData.get("message") as string,
    };

    try {
      const { error: supabaseError } = await supabase.from("leads").insert([data]);
      if (supabaseError) throw supabaseError;
      setSent(true);
    } catch (err) {
      console.error(err);
      setError("Si è verificato un errore. Riprova o chiamaci.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="bg-green-50 p-6 rounded-lg text-center border border-green-100">
        <h3 className="text-xl font-serif text-green-800 mb-2">Richiesta Inviata!</h3>
        <p className="text-green-700 text-sm">
          Grazie. L'host di <strong>{villaName}</strong> ti ricontatterà presto.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
      <h3 className="text-xl font-serif text-ionian mb-1">Ti interessa questa Aus?</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Compila il modulo per essere ricontattato dall'host.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ionian mb-1">Nome</label>
          <input name="name" required type="text" className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-terracotta/50 outline-none" placeholder="Il tuo nome" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-ionian mb-1">Telefono</label>
          <input name="phone" required type="tel" className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-terracotta/50 outline-none" placeholder="+39 ..." />
        </div>

        {/* NUOVO INPUT EMAIL */}
        <div>
          <label className="block text-sm font-medium text-ionian mb-1">Email</label>
          <input name="email" type="email" className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-terracotta/50 outline-none" placeholder="nome@email.com" />
        </div>

        <div>
          <label className="block text-sm font-medium text-ionian mb-1">Messaggio (Opzionale)</label>
          <textarea name="message" rows={3} className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-terracotta/50 outline-none resize-none" placeholder="Vorrei sapere se..." />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button disabled={loading} type="submit" className="w-full bg-terracotta hover:bg-terracotta/90 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50">
          {loading ? "Invio..." : "Richiedi Disponibilità"}
        </button>
      </form>
    </div>
  );
}
