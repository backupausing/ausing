"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLang } from "./LanguageProvider";

type Review = {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
};

export default function ReviewList({ villaId }: { villaId: string }) {
  const { t } = useLang();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("reviews")
        .select("id, rating, comment, created_at")
        .eq("villa_id", villaId)
        .eq("approved", true)
        .order("created_at", { ascending: false });
      setReviews((data as any) || []);
    })();
  }, [villaId]);

  return (
    <div className="card mt-6 p-4">
      <h3 className="font-serif text-lg">{t.reviews}</h3>
      <div className="mt-3 space-y-3 text-xs">
        {reviews.map((r) => (
          <div key={r.id} className="border-b border-sand/70 pb-2">
            <div className="mb-1 text-terracotta">
              {"★".repeat(r.rating)}{" "}
              <span className="text-ionian/50 text-[10px]">
                {new Date(r.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-ionian/80">{r.comment}</p>
          </div>
        ))}
        {reviews.length === 0 && (
          <p className="text-ionian/60 text-xs">
            Non ci sono ancora recensioni per questa villa.
          </p>
        )}
      </div>
    </div>
  );
}
