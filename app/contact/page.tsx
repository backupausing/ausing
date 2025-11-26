"use client";

import { useLang } from "@/components/LanguageProvider";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function ContactPage() {
  const { t } = useLang();
  const [status, setStatus] = useState("idle");

async function sendLead(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setStatus("sending");

  const form = e.currentTarget; // <-- Questo è il form tipizzato correttamente
  const data = new FormData(form);

  await supabase.from("leads").insert({
    name: data.get("name"),
    phone: data.get("phone"),
    message: data.get("message"),
  });

  setStatus("sent");
  form.reset();
}
  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="font-serif text-3xl mb-4 text-ionian">{t.contactUs}</h1>
      <p className="text-ionian/70 text-sm mb-6">
        Lasciaci i tuoi contatti e ti richiamiamo per qualsiasi informazione sulle Aus.
      </p>

      <form onSubmit={sendLead} className="space-y-4 text-sm">
        <input
          name="name"
          required
          placeholder={t.name}
          className="w-full border border-sand rounded-lg px-3 py-2 bg-cream"
        />
        <input
          name="phone"
          required
          placeholder={t.phone}
          className="w-full border border-sand rounded-lg px-3 py-2 bg-cream"
        />
        <textarea
          name="message"
          rows={4}
          placeholder={t.message}
          className="w-full border border-sand rounded-lg px-3 py-2 bg-cream"
        />

        <button
          className="rounded-full bg-terracotta px-5 py-2 text-cream text-sm hover:bg-terracotta/90"
          disabled={status === "sending"}
        >
          {status === "sending" ? "…" : t.send}
        </button>

        {status === "sent" && (
          <p className="text-sage text-xs mt-1">{t.thankYou}</p>
        )}
      </form>
    </div>
  );
}
