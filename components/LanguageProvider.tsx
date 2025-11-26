"use client";

import { createContext, useContext, useState } from "react";

const LanguageContext = createContext({
  locale: "it",
  setLocale: (l: string) => {}
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState("it");

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
