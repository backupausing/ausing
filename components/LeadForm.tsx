"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLang } from "./LanguageProvider";

type Props = {
  villaId: string;
};

export default function LeadForm({ villaId }: Props) {
  const { t } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "");
    const phone = String(formData.get("phone") || "");
    const message = String(formData.get("message") || "");
    const { error } = await supabase.from("leads").insert({
      villa_id: villaId,
      name,
      phone,
      message
    });
    if (error) {
      setError("Errore durante l’invio. Riprova.");
      setStatus("idle");
    } else {
      setStatus("sent");
      e.currentTarget.reset();
    }
  };

  return (
    <div className="card mt-6 p-4">
      <h3 className="font-serif text-lg">{t.callRequestTitle}</h3>
      <p className="mb-3 text-xs text-ionian/70">{t.callRequestSubtitle}</p>

      <form onSubmit={onSubmit} className="space-y-3 text-xs">
        <div>
          <label className="mb-1 block">{t.name}</label>
          <input
            name="name"
            required
            className="w-full rounded-lg border border-sand bg-cream px-2 py-1"
          />
        </div>
        <div>
          <label className="mb-1 block">{t.phone}</label>
          <input
            name="phone"
            required
            className="w-full rounded-lg border border-sand bg-cream px-2 py-1"
          />
        </div>
        <div>
          <label className="mb-1 block">{t.message}</label>
          <textarea
            name="message"
            rows={3}
            className="w-full rounded-lg border border-sand bg-cream px-2 py-1"
          />
        </div>
        {error && <p className="text-xs text-terracotta">{error}</p>}
        <button
          disabled={status !== "idle"}
          className="rounded-full bg-terracotta px-4 py-1 text-xs font-medium text-cream hover:bg-terracotta/90 disabled:opacity-50"
        >
          {status === "sending" ? "…" : t.send}
        </button>
        {status === "sent" && (
          <p className="text-xs text-sage mt-1">{t.thankYou}</p>
        )}
      </form>
    </div>
  );
}
