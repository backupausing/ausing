import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ThemeManager from "@/components/ThemeManager";
import Analytics from "@/components/Analytics"; // <--- 1. IMPORT MANCANTE

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "AUSING - Ville Esclusive a Pisticci",
  description: "Collezione di Aus autentiche tra campagna e mare.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. RECUPERO DATI (Selezioniamo tutto, inclusi gli ID analytics)
  const { data: settings } = await supabase.from("settings").select("*").single();
  const currentPalette = settings?.palette_name || "classic";

  return (
    <html lang="it">
      <ThemeManager paletteName={currentPalette} />

      {/* 3. COMPONENTE ANALYTICS (Inserito qui) */}
      <Analytics 
        gaId={settings?.google_analytics_id || ""} 
        clarityId={settings?.microsoft_clarity_id || ""} 
      />

      <body className={`${inter.variable} ${playfair.variable} font-sans bg-cream text-ionian`}>
        
        {/* HEADER FISSO */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            
            {/* LOGO */}
            <Link href="/" className="text-3xl font-serif font-bold tracking-tighter text-ionian hover:text-terracotta transition-colors">
              AUSING
            </Link>

            <nav className="flex gap-6 text-sm font-medium items-center">
               <Link href="/" className="hover:text-terracotta transition-colors">Home</Link>
               <Link href="/admin" className="px-4 py-2 rounded-full border border-ionian/20 hover:bg-ionian hover:text-white transition-all">
                 Area Riservata
               </Link>
            </nav>
          </div>
        </header>

        {/* CONTENUTO PRINCIPALE */}
        <main className="min-h-screen pt-20">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="py-12 text-center text-sm text-ionian/60 bg-sand/30 border-t border-stone-200 mt-20">
          <p className="font-serif text-lg mb-2">AUSING</p>
          <p>© 2025 Pisticci (MT) - Basilicata, Italia</p>
        </footer>

      </body>
    </html>
  );
}
