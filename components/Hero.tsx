"use client";

import { useLang } from "./LanguageProvider";
import Link from "next/link";

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="py-20 bg-gradient-to-b from-sand/50 to-cream">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-ionian mb-4">
          Vivi l’accoglienza delle nostre Aus
        </h1>

        <p className="text-ionian/70 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
          Ville locali immerse nella campagna lucana e nella quiete del mare Ionio.
        </p>

        <Link
          href="/villas"
          className="inline-flex px-6 py-2 rounded-full bg-terracotta text-cream shadow hover:bg-terracotta/90 transition text-sm"
        >
          {t.viewVillas}
        </Link>
      </div>
    </section>
  );
}
