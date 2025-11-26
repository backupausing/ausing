"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Review = {
  id: number;
  author_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

export default function ReviewsSection({ villaId }: { villaId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Carica le recensioni approvate
  useEffect(() => {
    async function fetchReviews() {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("villa_id", villaId)
        .eq("is_approved", true) // SOLO quelle approvate dall'admin
        .order("created_at", { ascending: false });

      if (data) setReviews(data);
    }
    fetchReviews();
  }, [villaId]);

  // Invia nuova recensione
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    await supabase.from("reviews").insert([{
      villa_id: villaId,
      author_name: formData.get("author_name"),
      rating: Number(formData.get("rating")),
      comment: formData.get("comment"),
      is_approved: false // Di default NON è approvata
    }]);

    setIsSubmitting(false);
    setFormVisible(false);
    setSuccessMsg(true);
  }

  return (
    <div className="mt-16 border-t border-border pt-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif text-ionian">Recensioni degli ospiti</h2>
        <button 
          onClick={() => setFormVisible(!formVisible)}
          className="text-terracotta font-medium hover:underline text-sm"
        >
          {formVisible ? "Chiudi form" : "Scrivi una recensione"}
        </button>
      </div>

      {/* Messaggio di successo dopo invio */}
      {successMsg && (
        <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6 border border-green-200">
          Grazie! La tua recensione è stata inviata ed è in attesa di moderazione.
        </div>
      )}

      {/* Form invio recensione */}
      {formVisible && !successMsg && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-border mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Il tuo Nome</label>
              <input name="author_name" required className="w-full p-2 border rounded bg-cream" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Voto (1-5)</label>
              <select name="rating" className="w-full p-2 border rounded bg-cream">
                <option value="5">5 - Eccellente</option>
                <option value="4">4 - Molto Buono</option>
                <option value="3">3 - Medio</option>
                <option value="2">2 - Scarso</option>
                <option value="1">1 - Pessimo</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">La tua esperienza</label>
            <textarea name="comment" required rows={3} className="w-full p-2 border rounded bg-cream"></textarea>
          </div>
          <button disabled={isSubmitting} className="bg-ionian text-white px-6 py-2 rounded hover:bg-ionian/90">
            {isSubmitting ? "Invio..." : "Invia Recensione"}
          </button>
        </form>
      )}

      {/* Lista Recensioni */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-ionian/60 italic">Ancora nessuna recensione per questa Aus.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white/50 p-6 rounded-xl border border-border/50">
              <div className="flex justify-between items-start mb-2">
                <span className="font-serif text-lg text-ionian">{review.author_name}</span>
                <div className="flex text-terracotta">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
              </div>
              <p className="text-ionian/80 leading-relaxed text-sm">{review.comment}</p>
              <p className="text-xs text-ionian/40 mt-4">{new Date(review.created_at).toLocaleDateString("it-IT")}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
