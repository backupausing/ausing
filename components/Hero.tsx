"use client";

// Attenzione all'import: se LanguageProvider è in components, usa "../components/..." o "@/components/..."
import { useLang } from "./LanguageProvider"; 
import Link from "next/link";

export default function Hero() {
  // Ora t è una funzione sicura
  const { t } = useLang();

  return (
    <section className="py-20 bg-gradient-to-b from-sand/50 to-cream">
      <div className="mx-auto max-w-5xl px-5 text-center">
        {/* Titolo tradotto */}
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-ionian mb-4">
          {t("heroTitle")}
        </h1>

        {/* Sottotitolo tradotto */}
        <p className="text-ionian/70 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
          {t("heroSubtitle")}
        </p>

        {/* Pulsante corretto */}
        <Link
          href="/villas"
          className="inline-flex px-6 py-2 rounded-full bg-terracotta text-white shadow hover:bg-terracotta/90 transition text-sm items-center justify-center font-medium"
        >
          {t("viewVillas")}
        </Link>
      </div>
    </section>
  );
}
