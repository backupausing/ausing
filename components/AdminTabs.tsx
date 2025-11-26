"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import classNames from "classnames";

type Review = {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  approved: boolean;
  villa: { name: any };
};

type Lead = {
  id: string;
  name: string;
  phone: string;
  message: string;
  created_at: string;
  villa: { name: any };
};

export default function AdminTabs() {
  const [tab, setTab] = useState<"reviews" | "leads">("reviews");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  const loadReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select(
        "id, rating, comment, created_at, approved, villa:villa_id(name)"
      )
      .order("created_at", { ascending: false });

    setReviews((data as any) || []);
  };

  const loadLeads = async () => {
    const { data } = await supabase
      .from("leads")
      .select("id, name, phone, message, created_at, villa:villa_id(name)")
      .order("created_at", { ascending: false });

    setLeads((data as any) || []);
  };

  useEffect(() => {
    loadReviews();
    loadLeads();
  }, []);

  const toggleApprove = async (id: string, approved: boolean) => {
    await supabase.from("reviews").update({ approved }).eq("id", id);
    loadReviews();
  };

  const deleteReview = async (id: string) => {
    await supabase.from("reviews").delete().eq("id", id);
    loadReviews();
  };

  const filteredReviews = reviews.filter((r) => {
    if (filter === "pending") return !r.approved;
    if (filter === "approved") return r.approved;
    return true;
  });

  const pendingCount = reviews.filter((r) => !r.approved).length;
  const approvedCount = reviews.filter((r) => r.approved).length;

  return (
    <div className="card p-4 text-xs">
      {/* tabs */}
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={() => setTab("reviews")}
          className={classNames(
            "rounded-full px-4 py-1 text-[11px]",
            tab === "reviews"
              ? "bg-terracotta text-cream"
              : "bg-sand text-ionian"
          )}
        >
          Recensioni
          <span className="ml-2 rounded-full bg-white/20 px-2 py-[1px] text-[10px]">
            {pendingCount} in attesa
          </span>
        </button>
        <button
          onClick={() => setTab("leads")}
          className={classNames(
            "rounded-full px-4 py-1 text-[11px]",
            tab === "leads"
              ? "bg-terracotta text-cream"
              : "bg-sand text-ionian"
          )}
        >
          Richieste
          <span className="ml-2 rounded-full bg-white/20 px-2 py-[1px] text-[10px]">
            {leads.length}
          </span>
        </button>
      </div>

      {/* Recensioni */}
      {tab === "reviews" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-3 text-[10px] text-ionian/70">
              <span>{approvedCount} approvate</span>
              <span>{pendingCount} in attesa</span>
            </div>
            <div className="flex gap-1 text-[10px]">
              <button
                className={classNames(
                  "px-2 py-1 rounded-full border",
                  filter === "all"
                    ? "bg-sand border-sand"
                    : "border-sand/60"
                )}
                onClick={() => setFilter("all")}
              >
                Tutte
              </button>
              <button
                className={classNames(
                  "px-2 py-1 rounded-full border",
                  filter === "pending"
                    ? "bg-sand border-sand"
                    : "border-sand/60"
                )}
                onClick={() => setFilter("pending")}
              >
                In attesa
              </button>
              <button
                className={classNames(
                  "px-2 py-1 rounded-full border",
                  filter === "approved"
                    ? "bg-sand border-sand"
                    : "border-sand/60"
                )}
                onClick={() => setFilter("approved")}
              >
                Visibili
              </button>
            </div>
          </div>

          {filteredReviews.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-sand p-3 flex flex-col gap-1 bg-cream"
            >
              <div className="flex justify-between gap-2">
                <span className="font-semibold text-[11px]">
                  {r.villa?.name?.it || "Aus"}
                </span>
                <span className="text-[10px] text-ionian/60">
                  {new Date(r.created_at).toLocaleString("it-IT")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-terracotta text-[11px]">
                  {"★".repeat(r.rating)}
                </span>
                <span
                  className={classNames(
                    "rounded-full px-2 py-[1px] text-[9px] uppercase tracking-wide",
                    r.approved
                      ? "bg-sage/20 text-sage border border-sage/40"
                      : "bg-terracotta/10 text-terracotta border border-terracotta/40"
                  )}
                >
                  {r.approved ? "Visibile" : "In attesa"}
                </span>
              </div>
              <p className="text-[11px] text-ionian/80 break-words">
                {r.comment}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => toggleApprove(r.id, !r.approved)}
                  className={classNames(
                    "rounded-full px-3 py-1 text-[10px]",
                    r.approved
                      ? "bg-sand text-ionian"
                      : "bg-sage text-cream"
                  )}
                >
                  {r.approved ? "Nascondi" : "Approva"}
                </button>
                <button
                  onClick={() => deleteReview(r.id)}
                  className="rounded-full px-3 py-1 text-[10px] border border-terracotta text-terracotta"
                >
                  Elimina
                </button>
              </div>
            </div>
          ))}

          {filteredReviews.length === 0 && (
            <p className="text-ionian/60 text-xs">
              Nessuna recensione con questo filtro.
            </p>
          )}
        </div>
      )}

      {/* Leads */}
      {tab === "leads" && (
        <LeadsBlock leads={leads} />
      )}
    </div>
  );
}

function LeadsBlock({ leads }: { leads: Lead[] }) {
  const [query, setQuery] = useState("");

  const filtered = leads.filter((l) => {
    const s = `${l.name} ${l.phone} ${l.message} ${
      l.villa?.name?.it || ""
    }`.toLowerCase();
    return s.includes(query.toLowerCase());
  });

  const exportCSV = () => {
    const header = "Data;Aus;Nome;Telefono;Messaggio\n";
    const rows = filtered
      .map((l) =>
        [
          new Date(l.created_at).toLocaleString("it-IT"),
          (l.villa?.name?.it || "").replace(/;/g, ","),
          (l.name || "").replace(/;/g, ","),
          (l.phone || "").replace(/;/g, ","),
          (l.message || "").replace(/;/g, ",")
        ].join(";")
      )
      .join("\n");

    const blob = new Blob([header + rows], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads-ausing.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 mb-2">
        <input
          className="border border-sand rounded-full px-3 py-1 text-[11px] flex-1"
          placeholder="Filtra per nome, telefono, Aus…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={exportCSV}
          className="px-3 py-1 rounded-full bg-sand text-[11px]"
        >
          Esporta CSV
        </button>
      </div>

      {filtered.map((l) => (
        <div
          key={l.id}
          className="rounded-xl border border-sand p-3 bg-cream flex flex-col gap-1"
        >
          <div className="flex justify-between gap-2">
            <span className="font-semibold text-[11px]">
              {l.villa?.name?.it || "Aus generale"}
            </span>
            <span className="text-[10px] text-ionian/60">
              {new Date(l.created_at).toLocaleString("it-IT")}
            </span>
          </div>
          <p className="text-[11px] text-ionian/80">
            {l.name} – {l.phone}
          </p>
          {l.message && (
            <p className="text-[11px] text-ionian/70 break-words">
              {l.message}
            </p>
          )}
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="text-xs text-ionian/60">
          Nessuna richiesta che corrisponda al filtro.
        </p>
      )}
    </div>
  );
}
