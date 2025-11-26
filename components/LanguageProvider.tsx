"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale, defaultLocale, messages } from "@/lib/i18n";

type LangContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: typeof messages[Locale];
};

const LangContext = createContext<LangContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem("ausing_locale") as Locale | null;
    if (stored) setLocaleState(stored);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("ausing_locale", l);
    }
  };

  return (
    <LangContext.Provider
      value={{
        locale,
        setLocale,
        t: messages[locale]
      }}
    >
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
