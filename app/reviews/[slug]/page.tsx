"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLang } from "@/components/LanguageProvider";
import Link from "next/link";
import classNames from "classnames";

type Villa = {
  id: string;
  slug: string;
  name: any;
};

export default function ReviewPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { locale, t } = useLang();

  const [villa, setVilla] = useState<Villa | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch villa details
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("villas")
        .select("id, slug, name")
        .eq("slug", slug)
        .maybeSingle();

      setVilla(data as any);
    })();
  }, [slug]);

  async function sendReview(e: any) {
    e.preventDefault();
    if (!villa) return;

    setLoading(true);

    await supabase.from("reviews").insert({
      villa_id: villa.id,
      rating,
      comment,
      approved: false
    });

    setLoading(false);
    setSent(true);
    setComment("");
    setRating(5);
  }

  if (!villa) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <p>Caricamento…</p>
      </div>
    );
  }

  const title = villa.name?.[locale] || villa.name?.it;

  return (
    <div className="mx-auto max-w-lg px-4 py-10">

      {/* Breadcrumbs */}
      <p className="text-[11px] text-ionian/60 mb-1">
        <Link href={`/villas/${slug}`} className="hover:underline">
          {title}
        </Link>{" "}
        / {t.leaveReview}
      </p>

      <h1 className="font-serif text-3xl mb-1 text-ionian">
        {t.leaveReview}
      </h1>
      <p className="text-xs text-ionian/70 mb-6">{title}</p>

      {/* Success message */}
      {sent && (
        <div className="rounded-xl border border-sage bg-sage/10 p-4 text-sage text-sm mb-6">
          ⭐ {t.thankYou}  
          <br />
          La recensione verrà pubblicata dopo approvazione.
        </div>
      )}

      {/* Form recensione */}
      <form onSubmit={sendReview} className="space-y-4">

        {/* Rating stars */}
        <div>
          <label className="block text-xs mb-1 text-ionian/70">
            {t.rating}
          </label>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setRating(n)}
                className="text-2xl"
              >
                <span
                  className={classNames(
                    "transition",
                    n <= rating ? "text-terracotta" : "text-sand"
                  )}
                >
                  ★
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-xs mb-1 text-ionian/70">
            {t.comment}
          </label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={5}
            className="w-full rounded-xl border border-sand bg-cream p-3 text-sm"
            placeholder="Come ti sei trovato?"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-terracotta px-5 py-2 text-cream text-sm hover:bg-terracotta/90 transition disabled:opacity-50"
        >
          {loading ? "Invio in corso…" : t.send}
        </button>
      </form>
    </div>
  );
}
