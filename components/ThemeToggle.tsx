"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((p) => !p)}
      className="rounded-full border border-sage bg-cream px-3 py-1 text-[11px] text-ionian hover:bg-sage hover:text-cream transition"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
