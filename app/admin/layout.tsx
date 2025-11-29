"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") return <>{children}</>;

  const menu = [
    { name: "Richieste", href: "/admin" }, // Accorciato per mobile
    { name: "Ville", href: "/admin/villas" },
    { name: "Review", href: "/admin/reviews" },
    { name: "Calendario", href: "/admin/calendar" },
    { name: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* SIDEBAR: W-full su mobile, W-64 su desktop */}
      <aside className="w-full md:w-64 bg-ionian text-white md:min-h-screen shrink-0 flex flex-col">
        
        {/* Header Sidebar */}
        <div className="p-4 md:p-6 flex justify-between items-center md:block">
          <h2 className="text-xl md:text-2xl font-serif">AUSING Admin</h2>
          {/* Link Home visibile su mobile in alto a destra */}
          <Link href="/" className="md:hidden text-xs text-white/60 border border-white/20 px-2 py-1 rounded">
            Vai al sito
          </Link>
        </div>
        
        {/* Navigazione: Orizzontale scrollabile su mobile, Verticale su desktop */}
        <nav className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 p-2 md:p-4 bg-ionian/50 md:bg-transparent">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap px-4 py-2 rounded text-sm md:text-base transition-colors ${
                pathname === item.href ? "bg-terracotta text-white" : "hover:bg-white/10 text-white/80"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Footer Sidebar (Desktop Only) */}
        <div className="hidden md:block mt-auto p-6 border-t border-white/10">
          <Link href="/" className="text-sm text-white/60 hover:text-white">
            &larr; Torna al sito
          </Link>
        </div>
      </aside>

      {/* CONTENUTO: Padding ridotto su mobile */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
