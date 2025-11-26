"use client";

import VillasSection from "@/components/VillasSection";

export default function VillasPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-semibold tracking-tight text-ionian mb-2">
        Le Nostre Aus
      </h1>
      <p className="text-xs text-ionian/70 mb-8 max-w-md">
        Dimore selezionate tra ulivi, colline e mare Ionio.
      </p>

      <VillasSection />
    </div>
  );
}
