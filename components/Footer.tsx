export default function Footer() {
  return (
    <footer className="mt-10 border-t border-sand bg-cream/60 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-3 text-xs text-ionian/70">

        <div className="space-y-2">
          <h3 className="text-ionian text-sm font-semibold tracking-tight">AUSING</h3>
          <p>
            Una collezione di Aus tra Pisticci e il mare Ionio.
            Ospitalità locale semplice, autentica e moderna.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-ionian text-sm">Navigazione</h4>
          <ul className="space-y-1">
            <li><a href="/villas" className="hover:underline">Le Nostre Aus</a></li>
            <li><a href="/contact" className="hover:underline">Contattaci</a></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-ionian text-sm">Informazioni</h4>
          <ul className="space-y-1">
            <li>© {new Date().getFullYear()} AUSING</li>
            <li>Pisticci (MT) – Basilicata, Italia</li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
