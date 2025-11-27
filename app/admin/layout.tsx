"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Non mostrare il menu nella pagina di login
  if (pathname === "/admin/login") return <>{children}</>;

  const menu = [
    { name: "Le Mie Ville", href: "/admin/villas" },
    { name: "Richieste (Leads)", href: "/admin" },
    { name: "Calendario", href: "/admin/calendar" },
    { name: "Recensioni", href: "/admin/reviews" },
    { name: "Impostazioni Sito", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar Laterale */}
      <aside className="w-full md:w-64 bg-ionian text-white p-6 md:min-h-screen shrink-0">
        <h2 className="text-2xl font-serif mb-8">AUSING Admin</h2>
        <nav className="space-y-2">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded transition-colors ${
                pathname === item.href ? "bg-terracotta text-white" : "hover:bg-white/10"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="mt-12 pt-12 border-t border-white/10">
          <Link href="/" className="text-sm text-white/60 hover:text-white">
            &larr; Torna al sito
          </Link>
        </div>
      </aside>

      {/* Contenuto Principale */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
