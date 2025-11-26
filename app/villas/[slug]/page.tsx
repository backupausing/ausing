"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useLang } from "@/components/LanguageProvider";
import CalendarView from "@/components/CalendarView";
import LeadForm from "@/components/LeadForm";
import ReviewList from "@/components/ReviewList";
import Link from "next/link";

type Villa = {
  id: string;
  slug: string;
  name: any;
  description: any;
  images: string[];
  address: string | null;
  map_link: string | null;
};

export default function VillaPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { locale } = useLang();
  const [villa, setVilla] = useState<Villa | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("villas")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      setVilla(data as any);
    })();
  }, [slug]);

  if (!villa) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <p>Caricamento villa…</p>
      </div>
    );
  }

  const title = villa.name?.[locale] || villa.name?.it || "Villa";
  const description =
    villa.description?.[locale] || villa.description?.it || "";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div>
          <div className="card overflow-hidden">
            <div className="aspect-[4/3] bg-sand">
              {villa.images?.[0] && (
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${villa.images[0]})` }}
                />
              )}
            </div>
            <div className="p-4">
              <h1 className="font-serif text-3xl mb-1">{title}</h1>
              <p className="text-xs text-ionian/70 mb-2">{villa.address}</p>
              <p className="text-sm text-ionian/80 whitespace-pre-line">
                {description}
              </p>
              {villa.map_link && (
                <a
                  href={villa.map_link}
                  target="_blank"
                  className="mt-3 inline-block text-xs text-terracotta"
                >
                  Apri su Google Maps →
                </a>
              )}
            </div>
          </div>

          <ReviewList villaId={villa.id} />

          <div className="card mt-4 p-4 text-xs">
            <p>
              Dopo il tuo soggiorno, troverai un QR code sulla porta per lasciare
              una recensione su questa pagina dedicata.
            </p>
            <Link
              href={`/reviews/${villa.slug}`}
              className="mt-2 inline-block text-terracotta"
            >
              Link diretto per recensione →
            </Link>
          </div>
        </div>

        <div>
          <CalendarView villaId={villa.id} />
          <LeadForm villaId={villa.id} />
        </div>
      </div>
    </div>
  );
}
