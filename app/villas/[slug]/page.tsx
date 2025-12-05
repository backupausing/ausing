import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import ReviewsSection from "@/components/ReviewsSection";
import { MapPin } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 0;

// Definizione del tipo per Next.js 15
type Props = {
  params: Promise<{ slug: string }>;
};

// 1. GENERAZIONE METADATI SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // <--- AWAIT QUI (Obbligatorio per Next 15)
  
  const { data: villa } = await supabase.from("villas").select("*").eq("slug", slug).single();

  if (!villa) {
    return { title: "Villa non trovata" };
  }

  return {
    title: `${villa.name} | AUSING`,
    description: villa.description.substring(0, 160) + "...",
    openGraph: {
      title: villa.name,
      description: `Scopri ${villa.name}. Ospitata da ${villa.host}.`,
      images: [villa.image],
      type: "website",
    },
  };
}

// 2. COMPONENTE PAGINA
export default async function VillaPage({ params }: Props) {
  const { slug } = await params; // <--- AWAIT QUI (Obbligatorio per Next 15)

  const { data: villa } = await supabase.from("villas").select("*").eq("slug", slug).single();

  if (!villa) notFound();

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Image */}
      <div className="h-[60vh] w-full relative bg-gray-900">
        <img src={villa.image} alt={villa.name} className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
             <Link href="/" className="text-white/80 hover:text-terracotta mb-4 inline-flex items-center gap-2 text-sm font-medium transition-colors">&larr; Torna alla collezione</Link>
             <h1 className="text-5xl md:text-7xl font-serif text-white mb-2">{villa.name}</h1>
             <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl">{villa.price_range} • {villa.host}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* SINISTRA */}
          <div className="lg:col-span-8 space-y-16">
            <section>
              <h2 className="text-3xl font-serif text-ionian mb-6">L'esperienza</h2>
              <p className="text-lg leading-relaxed text-ionian/80 whitespace-pre-wrap font-light">{villa.description}</p>
            </section>

            {villa.gallery && villa.gallery.length > 0 && (
              <section>
                <h2 className="text-2xl font-serif text-ionian mb-6">Galleria</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {villa.gallery.map((img: string, idx: number) => (
                    <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-stone-200 shadow-sm group">
                      <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={`Galleria ${idx}`} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="border-y border-stone-200 py-10">
              <h2 className="text-2xl font-serif text-ionian mb-6">Caratteristiche & Servizi</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {villa.services?.map((service: string, index: number) => (
                  <li key={index} className="flex items-center gap-3 text-ionian/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-sand/20 p-8 rounded-2xl border border-stone-100 flex items-start gap-6">
              <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center text-terracotta font-serif text-2xl shrink-0">
                {villa.host.charAt(0)}
              </div>
              <div>
                <h3 className="font-serif text-2xl text-ionian mb-2">Ospitato da {villa.host}</h3>
                <p className="text-ionian/70 leading-relaxed">{villa.host} è il custode di questa dimora...</p>
              </div>
            </section>

            {/* BOX MAPPA */}
            {villa.map_url && (
              <section className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm relative h-64 bg-gray-100 group">
                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=40.38,16.56&zoom=10&size=800x400&sensor=false&style=feature:all|saturation:-100')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                  <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg max-w-sm w-full">
                    <div className="flex items-center justify-center mb-3 text-terracotta"><MapPin size={32} /></div>
                    <h3 className="font-serif text-xl text-ionian mb-2">Posizione</h3>
                    <a href={villa.map_url} target="_blank" rel="noopener noreferrer" className="block w-full bg-ionian text-white py-2 rounded-lg font-medium hover:bg-terracotta transition-colors">Ottieni indicazioni stradali →</a>
                  </div>
                </div>
              </section>
            )}

            <ReviewsSection villaId={villa.id} />
          </div>

          {/* DESTRA */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 space-y-8">
              <div className="shadow-xl shadow-stone-200/50 rounded-2xl overflow-hidden">
                <ContactForm villaId={villa.id} villaName={villa.name} />
              </div>
              <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                 <AvailabilityCalendar villaId={villa.id} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
