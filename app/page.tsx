import Link from "next/link";
import { villas } from "@/lib/data";

export default function Home() {
  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      <section className="text-center mb-20">
        <h1 className="text-5xl font-serif text-ionian mb-6">
          Vivi l’accoglienza delle nostre Aus
        </h1>
        <p className="text-lg text-ionian/70 max-w-2xl mx-auto">
          Ville locali immerse nella campagna lucana e nella quiete del mare Ionio.
          Nessuna prenotazione automatica, solo contatto umano.
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {villas.map((villa) => (
          <Link href={`/villas/${villa.slug}`} key={villa.id} className="group">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
              <div className="aspect-video relative bg-gray-200">
                {/* Usa <img> standard per semplicità ora, poi metteremo Image di Next */}
                <img src={villa.image} alt={villa.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-serif text-ionian mb-2">{villa.name}</h2>
                <p className="text-ionian/60 line-clamp-2 text-sm">{villa.description}</p>
                <span className="mt-4 inline-block text-terracotta font-medium text-sm">Scopri di più &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
