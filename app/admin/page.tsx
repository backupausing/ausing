"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminHome() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const ok = localStorage.getItem("ausing_admin");
    if (!ok) router.replace("/login");
    else setAuth(true);
  }, []);

  if (!auth) return null;

  return (
    <div className="grid gap-4 text-sm">
      <a href="/admin/aus" className="card p-4 hover:bg-sand transition">
        🏡 Gestione Aus
      </a>
      <a href="/admin/calendars" className="card p-4 hover:bg-sand transition">
        📅 Calendari disponibilità
      </a>
      <a href="/admin/reviews" className="card p-4 hover:bg-sand transition">
        ⭐ Recensioni
      </a>
      <a href="/admin/leads" className="card p-4 hover:bg-sand transition">
        📞 Richieste di richiamata
      </a>
    </div>
  );
}
sdaasdsdasadsdaasd