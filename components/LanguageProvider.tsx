"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
// Assicurati che questo percorso sia giusto. 
// Se hai messo il file in 'ausing/lib/translations.ts', questo import funzionerà.
import { messages, type Locale, defaultLocale, locales } from "../lib/translations";

// Definiamo cosa offre il nostro contesto
type LanguageContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string; // Ecco la funzione magica che mancava!
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Partiamo sempre con la lingua di default per non rompere la build sul server
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  // Appena siamo nel browser (client), controlliamo se c'è una lingua salvata
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("lang");
    if (saved && locales.includes(saved as Locale)) {
      setLocaleState(saved as Locale);
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("lang", l);
  };

  // Funzione di traduzione "Blindata"
  const t = (key: string): string => {
    // 1. Cerchiamo il dizionario della lingua corrente
    const currentMessages = messages[locale];
    
    // 2. Se la chiave esiste, la restituiamo
    // @ts-ignore - Ignoriamo TypeScript qui per essere sicuri che funzioni a runtime
    if (currentMessages && currentMessages[key]) {
      // @ts-ignore
      return currentMessages[key];
    }

    // 3. Fallback: Se non c'è nella lingua corrente, proviamo in Inglese o Italiano
    // @ts-ignore
    return messages[defaultLocale][key] || key;
  };

  // Evitiamo problemi di idratazione mostrando il contenuto solo quando siamo sicuri
  // (Opzionale, ma aiuta con Next.js 15)
  if (!mounted) {
    // Possiamo restituire null o children, children è meglio per la SEO
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook aggiornato
export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback di emergenza se usato fuori dal provider
    return { 
      locale: defaultLocale, 
      setLocale: () => {}, 
      t: (k: string) => k 
    };
  }
  return context;
};
