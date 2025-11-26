"use client";

import { useEffect, useState } from "react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin";

export default function AdminGuard({
  children
}: {
  children: React.ReactNode;
}) {
  const [ok, setOk] = useState(false);
  const [tried, setTried] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("ausing_admin_ok");
    if (stored === "1") setOk(true);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const pwd = (form.elements.namedItem("password") as HTMLInputElement).value;
    if (pwd === ADMIN_PASSWORD) {
      window.localStorage.setItem("ausing_admin_ok", "1");
      setOk(true);
    } else {
      setTried(true);
    }
  };

  if (!ok) {
    return (
      <div className="mx-auto max-w-sm px-4 py-10">
        <div className="card p-4 text-sm">
          <h1 className="font-serif text-xl mb-2">Login host</h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="mb-1 block text-xs">Password</label>
              <input
                name="password"
                type="password"
                className="w-full rounded-lg border border-sand bg-cream px-2 py-1 text-xs"
              />
            </div>
            {tried && (
              <p className="text-xs text-terracotta">
                Password errata. Riprova.
              </p>
            )}
            <button className="rounded-full bg-terracotta px-4 py-1 text-xs font-medium text-cream">
              Entra
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
