"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "./LanguageProvider";

type Villa = {
  id: string;
  slug: string;
  name: Record<string, string>;
  cover?: string | null;
};

export default function VillaCard({ villa }: { villa: Villa }) {
  const { locale } = useLang();

  const title = villa.name?.[locale] || villa.name?.it || "Aus";

  return (
    <Link
      href={`/villas/${villa.slug}`}
      className="block overflow-hidden rounded-xl shadow-md hover:shadow-lg transition"
    >
      {villa.cover && (
        <Image
          src={villa.cover}
          alt={title}
          width={600}
          height={400}
          className="h-48 w-full object-cover"
        />
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </Link>
  );
}
