import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AUSING - Ville Esclusive a Pisticci",
  description: "Collezione di Aus autentiche tra campagna e mare.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <header className="p-6 flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-bold tracking-tighter text-ionian">AUSING</div>
          <nav className="flex gap-4 text-sm font-medium">
             <a href="/" className="hover:text-terracotta">Home</a>
             <a href="/admin/login" className="hover:text-terracotta">Area Riservata</a>
          </nav>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="py-10 text-center text-sm text-ionian/60 bg-sand/30 mt-20">
          <p>© 2024 AUSING - Pisticci (MT)</p>
        </footer>
      </body>
    </html>
  );
}
