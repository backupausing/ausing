import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function Home() {
  const { data: settings } = await supabase.from("settings").select("*").single();
  const { data: villas } = await supabase.from("villas").select("*").eq('is_visible', true);

  const heroTitle = settings?.hero_title || "L'arte di abitare il silenzio.";
  const heroSubtitle = settings?.hero_subtitle || "Una collezione esclusiva...";
  const heroImage = settings?.hero_image || "https://images.unsplash.com/photo-1505577097223-289524029286?q=80&w=2070&auto=format&fit=crop";
  
  // Defaults per il manifesto se è vuoto
  const manifestoTitle = settings?.manifesto_title || "La filosofia AUSING";
  const manifestoText = settings?.manifesto_text || "Crediamo che il vero lusso sia il tempo...";

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white animate-in fade-in zoom-in duration-1000">
          <span className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-sand/90 mb-4 block">
            Pisticci, Basilicata
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium mb-6 leading-tight">
             <span dangerouslySetInnerHTML={{ __html: heroTitle.replace(/\n/g, "<br/>") }} />
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            {heroSubtitle}
          </p>
          <div className="flex justify-center">
            <Link href="#villas-list" className="px-8 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta/90 transition-all shadow-lg">
              Scopri le Aus
            </Link>
          </div>
        </div>
      </section>

      {/* LISTA VILLE */}
      <section id="villas-list" className="px-6 py-24 max-w-7xl mx-auto bg-cream">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-ionian mb-4">Le Nostre Dimore</h2>
          <div className="w-16 h-1 bg-terracotta mx-auto rounded-full"/>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {villas?.map((villa) => (
            <Link href={`/villas/${villa.slug}`} key={villa.id} className="group">
              <div className="bg-white rounded-xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="aspect-[4/3] relative bg-gray-200 overflow-hidden">
                  <img src={villa.image} alt={villa.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-ionian shadow-sm">{villa.price_range}</div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-serif text-ionian mb-2 group-hover:text-terracotta transition-colors">{villa.name}</h3>
                  <p className="text-ionian/60 line-clamp-3 text-sm mb-6 flex-grow leading-relaxed">{villa.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Host: {villa.host}</span>
                    <span className="text-terracotta font-medium text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">Visita <span className="text-lg">→</span></span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- SEZIONE MANIFESTO DINAMICA --- */}
      <section className="py-24 bg-white border-y border-stone-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-serif text-ionian mb-8">{manifestoTitle}</h3>
          <p className="text-lg text-ionian/70 leading-loose font-light whitespace-pre-wrap">
            {manifestoText}
          </p>
        </div>
      </section>
    </div>
  );
}
