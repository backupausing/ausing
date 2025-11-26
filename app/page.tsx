import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Forza l'aggiornamento dei dati a ogni visita (così vedi le modifiche admin subito)
export const revalidate = 0;

export default async function Home() {
  // AGGIUNTO: .eq('is_visible', true)
  const { data: villas } = await supabase
    .from("villas")
    .select("*")
    .eq('is_visible', true); 

  if (!villas) return <div className="p-20 text-center">Caricamento ville...</div>;

  return (
    <div>
      {/* --- HERO SECTION EMOZIONALE --- */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        
        {/* Immagine di Sfondo (Uliveto/Tramonto) */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1505577097223-289524029286?q=80&w=2070&auto=format&fit=crop" 
            alt="Campagna Lucana" 
            className="w-full h-full object-cover"
          />
          {/* Velo scuro per leggere il testo */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Contenuto Hero */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white animate-in fade-in zoom-in duration-1000">
          <span className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-sand/90 mb-4 block">
            Pisticci, Basilicata
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium mb-6 leading-tight">
            L'arte di abitare <br /> <span className="italic text-terracotta">il silenzio.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Una collezione esclusiva di <em>Aus</em>. Dimore autentiche tra gli ulivi secolari e il respiro del mare Ionio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#villas-list" 
              className="px-8 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta/90 transition-all shadow-lg shadow-black/20"
            >
              Scopri le Aus
            </Link>
          </div>
        </div>
      </section>


      {/* --- LISTA VILLE (Dal Database) --- */}
      <section id="villas-list" className="px-6 py-24 max-w-7xl mx-auto bg-cream">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-ionian mb-4">Le Nostre Dimore</h2>
          <div className="w-16 h-1 bg-terracotta mx-auto rounded-full"/>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {villas.map((villa) => (
            <Link href={`/villas/${villa.slug}`} key={villa.id} className="group">
              <div className="bg-white rounded-xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                
                {/* Immagine Card */}
                <div className="aspect-[4/3] relative bg-gray-200 overflow-hidden">
                  <img 
                    src={villa.image} 
                    alt={villa.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-ionian shadow-sm">
                    {villa.price_range}
                  </div>
                </div>

                {/* Contenuto Card */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-serif text-ionian mb-2 group-hover:text-terracotta transition-colors">
                    {villa.name}
                  </h3>
                  <p className="text-ionian/60 line-clamp-3 text-sm mb-6 flex-grow leading-relaxed">
                    {villa.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Host: {villa.host}</span>
                    <span className="text-terracotta font-medium text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Visita <span className="text-lg">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- SEZIONE "MANIFESTO" --- */}
      <section className="py-24 bg-white border-y border-stone-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-serif text-ionian mb-6">La filosofia AUSING</h3>
          <p className="text-lg text-ionian/70 leading-relaxed font-light">
            "Crediamo che il vero lusso sia il tempo. Il tempo di ascoltare il vento tra i calanchi, 
            di osservare la luce che cambia sulle facciate bianche, di riscoprire un'ospitalità fatta di persone, non di algoritmi. 
            Per questo non troverai tasti 'Prenota Subito'. Vogliamo parlarti, conoscerti e accoglierti prima ancora del tuo arrivo."
          </p>
        </div>
      </section>

    </div>
  );
}
