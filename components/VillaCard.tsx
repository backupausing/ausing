"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";

export default function VillaCard({ villa }) {
  const { locale } = useLang();
  
  const title = villa.name?.[locale] || villa.name?.it;
  const summary = (villa.description?.[locale] || villa.description?.it).slice(0, 80) + "…";
  const image = villa.images?.[0];

  return (
    <Link
      href={`/villas/${villa.slug}`}
      className="block bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
    >
      <div className="aspect-video bg-sand">
        {image && (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold tracking-tight text-ionian mb-1">
          {title}
        </h3>
        <p className="text-xs text-ionian/70">{summary}</p>
      </div>
    </Link>
  );
}
