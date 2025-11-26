"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { locales } from "@/lib/i18n";

export default function Navbar() {
  const { locale, setLocale, t } = useLang();

  return (
    <header className="sticky top-0 z-20 bg-cream/80 backdrop-blur-xl border-b border-sand">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="font-semibold text-lg tracking-tight text-ionian">
          AUSING
        </Link>

        {/* Menu */}
<nav className="flex items-center gap-6 text-sm">
  <Link href="/villas" className="hover:text-terracotta transition">
    {t.aus}
  </Link>
  <Link href="/contact" className="hover:text-terracotta transition">
    {t.contactUs}
  </Link>
  <Link href="/login" className="hover:text-terracotta transition">
    Area riservata
  </Link>

  <select
    value={locale}
    onChange={(e) => setLocale(e.target.value as any)}
    className="rounded-full border border-sand bg-cream px-2 py-1 text-xs"
  >
    {locales.map((l) => (
      <option key={l} value={l}>
        {l.toUpperCase()}
      </option>
    ))}
  </select>
</nav>
      </div>
    </header>
  );
}
