import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import ReviewsSection from "@/components/ReviewsSection";

export const revalidate = 0; // Importante per vedere subito le modifiche fatte in admin

export default async function VillaPage({ params }: { params: { slug: string } }) {
  // Scarica la singola villa dal DB usando lo slug
  const { data: villa } = await supabase
    .from("villas")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!villa) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Image */}
      <div className="h-[50vh] w-full relative bg-gray-200">
        <img 
          src={villa.image} 
          alt={villa.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
          <div className="max-w-7xl mx-auto">
            <Link href="/" className="text-white/80 hover:text-white mb-2 inline-block text-sm">&larr; Torna alle ville</Link>
            <h1 className="text-4xl md:text-5xl font-serif text-white">{villa.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* COLONNA SINISTRA */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-serif text-ionian mb-4">La Struttura</h2>
              <p className="text-lg leading-relaxed text-ionian/80 whitespace-pre-wrap">
                {villa.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-ionian mb-4">Cosa troverai</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {villa.services.map((service: string, index: number) => (
                  <li key={index} className="flex items-center gap-2 text-ionian/70">
                    <span className="w-2 h-2 rounded-full bg-terracotta" />
                    {service}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-sand/30 p-6 rounded-xl border border-border">
              <h3 className="font-serif text-xl text-ionian mb-2">Il tuo Host: {villa.host}</h3>
              <p className="text-sm text-ionian/70">
                {villa.host} si prenderà cura del tuo arrivo e ti darà i migliori consigli locali.
              </p>
            </section>

            <ReviewsSection villaId={villa.id} />
          </div>

          {/* COLONNA DESTRA */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <ContactForm villaId={villa.id} villaName={villa.name} />
              <AvailabilityCalendar villaId={villa.id} />
              <div className="mt-6 text-center text-xs text-ionian/50">
                <p>AUSING garantisce la qualità della struttura.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
