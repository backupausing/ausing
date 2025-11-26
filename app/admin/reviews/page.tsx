"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    // Carica recensioni e unisce i dati della villa (nome)
    const { data } = await supabase
      .from("reviews")
      .select("*, villas(name)")
      .order("created_at", { ascending: false });
    
    if (data) setReviews(data);
    setLoading(false);
  }

  async function approveReview(id: number) {
    await supabase.from("reviews").update({ is_approved: true }).eq("id", id);
    setReviews(reviews.map(r => r.id === id ? { ...r, is_approved: true } : r));
  }

  async function deleteReview(id: number) {
    if (!confirm("Sei sicuro di voler cancellare questa recensione?")) return;
    await supabase.from("reviews").delete().eq("id", id);
    setReviews(reviews.filter(r => r.id !== id));
  }

  if (loading) return <div className="p-8">Caricamento recensioni...</div>;

  return (
    <div>
      <h1 className="text-3xl font-serif text-ionian mb-8">Moderazione Recensioni</h1>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className={`p-6 rounded-xl border shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start ${
              !review.is_approved ? "bg-orange-50 border-orange-200" : "bg-white border-border"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {!review.is_approved && (
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                    In Attesa
                  </span>
                )}
                <span className="text-sm text-gray-500">
                  Villa: <strong>{review.villas?.name}</strong>
                </span>
                <span className="text-sm text-gray-400">
                  • {new Date(review.created_at).toLocaleDateString("it-IT")}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="font-serif text-lg text-ionian">{review.author_name}</span>
                <span className="text-terracotta text-sm">
                  {"★".repeat(review.rating)}
                </span>
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed">"{review.comment}"</p>
            </div>

            <div className="flex gap-2 shrink-0">
              {!review.is_approved && (
                <button 
                  onClick={() => approveReview(review.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Approva
                </button>
              )}
              <button 
                onClick={() => deleteReview(review.id)}
                className="border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Elimina
              </button>
            </div>
          </div>
        ))}

        {reviews.length === 0 && (
          <p className="text-center text-gray-500 py-10">Nessuna recensione presente.</p>
        )}
      </div>
    </div>
  );
}
