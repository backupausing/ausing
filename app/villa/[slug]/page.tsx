import { villas } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import ContactForm from "@/components/ContactForm"; // Importiamo il form appena creato

// Questa funzione dice a Next.js quali pagine esistono (per la build statica)
export async function generateStaticParams() {
  return villas.map((villa) => ({
    slug: villa.slug,
  }));
}

export default function VillaPage({ params }: { params: { slug: string } }) {
  // 1. Troviamo la villa giusta usando lo slug nell'URL
  const villa = villas.find((v) => v.slug === params.slug);

  // 2. Se non esiste (es. utente scrive url a caso), mostriamo 404
  if (!villa) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Image in alto */}
      <div className="h-[50vh] w-full relative bg-gray-200">
        <img 
          src={villa.image} 
          alt={villa.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" /> {/* Velo scuro per leggere meglio il testo */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
          <div className="max-w-7xl mx-auto">
            <Link href="/" className="text-white/80 hover:text-white mb-2 inline-block text-sm">&larr; Torna alle ville</Link>
            <h1 className="text-4xl md:text-5xl font-serif text-white">{villa.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* COLONNA SINISTRA: Descrizione e Dettagli */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Descrizione */}
            <section>
              <h2 className="text-2xl font-serif text-ionian mb-4">La Struttura</h2>
              <p className="text-lg leading-relaxed text-ionian/80">
                {villa.description}
              </p>
            </section>

            {/* Servizi */}
            <section>
              <h2 className="text-2xl font-serif text-ionian mb-4">Cosa troverai</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {villa.services.map((service, index) => (
                  <li key={index} className="flex items-center gap-2 text-ionian/70">
                    <span className="w-2 h-2 rounded-full bg-terracotta" />
                    {service}
                  </li>
                ))}
              </ul>
            </section>

            {/* Host */}
            <section className="bg-sand/30 p-6 rounded-xl border border-border">
              <h3 className="font-serif text-xl text-ionian mb-2">Il tuo Host: {villa.host}</h3>
              <p className="text-sm text-ionian/70">
                {villa.host} si prenderà cura del tuo arrivo e ti darà i migliori consigli 
                per vivere la zona come un locale.
              </p>
            </section>

          </div>

          {/* COLONNA DESTRA: Sidebar con Form (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ContactForm villaId={villa.id} villaName={villa.name} />
              
              <div className="mt-6 text-center text-xs text-ionian/50">
                <p>AUSING garantisce la qualità della struttura.</p>
                <p>Nessuna commissione nascosta.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
