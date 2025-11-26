"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();

    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem("ausing_admin", "ok");
      router.push("/admin");
      return;
    }

    setError("Password errata");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="bg-white border border-sand p-6 rounded-xl w-full max-w-xs">
        <h1 className="text-center font-semibold text-lg mb-4">
          Area Riservata
        </h1>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-sand rounded-lg px-3 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-xs text-terracotta text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-terracotta text-cream rounded-lg py-2 text-sm"
          >
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
}
