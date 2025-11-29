"use client";

import { useState } from "react";
// Non usiamo più useRouter per il login, è più sicuro il redirect nativo
// import { useRouter } from "next/navigation"; 

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // Stato per evitare click multipli

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); // Blocca il bottone
    setError(false);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // FIX DEL DOPPIO CLICK:
        // window.location.href forza un refresh completo.
        // Assicura che il middleware veda il cookie appena settato immediatamente.
        window.location.href = "/admin"; 
      } else {
        setError(true);
        setLoading(false); // Riabilita il bottone solo se fallisce
      }
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-border max-w-sm w-full text-center">
        <h1 className="text-2xl font-serif text-ionian mb-6">Area Host</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="Password di accesso"
            className="w-full p-3 border rounded-lg bg-background outline-none focus:ring-2 focus:ring-ionian/20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading} // Disabilita input mentre carica
          />
          
          {error && <p className="text-red-500 text-sm animate-pulse">Password errata</p>}
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-ionian text-white py-3 rounded-lg font-medium hover:bg-ionian/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Accesso in corso..." : "Entra"}
          </button>
        </form>
      </div>
    </div>
  );
}
