"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin"); // Password giusta, entra!
      router.refresh();
    } else {
      setError(true);
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
            className="w-full p-3 border rounded-lg bg-background"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">Password errata</p>}
          <button className="w-full bg-ionian text-white py-3 rounded-lg font-medium hover:bg-ionian/90">
            Entra
          </button>
        </form>
      </div>
    </div>
  );
}
