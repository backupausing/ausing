"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLang } from "./LanguageProvider";

export default function ReviewForm({ villaId }: { villaId: string }) {
  const { t, locale } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const formData = new FormData(e.currentTarget);
    const rating = Number(formData.get("rating") || 5);
    const comment = String(formData.get("comment") || "");
    const { error } = await supabase.from("reviews").insert({
      villa_id: villaId,
      rating,
      comment,
      language: locale
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
    <form onSubmit={onSubmit} className="space-y-3 text-xs">
      <div>
        <label className="mb-1 block">{t.rating}</label>
        <select
          name="rating"
          className="w-full rounded-lg border border-sand bg-cream px-2 py-1"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} ★
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block">{t.comment}</label>
        <textarea
          name="comment"
          rows={4}
          required
          className="w-full rounded-lg border border-sand bg-cream px-2 py-1"
        />
      </div>
      {error && <p className="text-xs text-terracotta">{error}</p>}
      <button
        disabled={status !== "idle"}
        className="rounded-full bg-terracotta px-4 py-1 text-xs font-medium text-cream hover:bg-terracotta/90 disabled:opacity-50"
      >
        {status === "sending" ? "…" : t.leaveReview}
      </button>
      {status === "sent" && (
        <p className="text-xs text-sage mt-1">
          Grazie! La tua recensione verrà pubblicata dopo approvazione.
        </p>
      )}
    </form>
  );
}
