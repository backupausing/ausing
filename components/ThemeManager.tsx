"use client";

import { useEffect } from "react";
import { themes } from "@/lib/themes";

export default function ThemeManager({ paletteName }: { paletteName: string }) {
  useEffect(() => {
    const theme = themes[paletteName] || themes.classic;
    const root = document.documentElement;

    // Aggiorna le variabili CSS di Tailwind
    // Nota: I colori devono essere in formato HEX per funzionare con la config attuale
    // Ma per sovrascrivere Tailwind al volo usiamo --ionian, --terracotta definiti nel global.css se usassimo variabili.
    // Dato che nel tailwind.config abbiamo messo i colori hardcoded (es. #2C3E50), dobbiamo usare un trucco.
    // TRUCCO: Aggiorniamo le variabili CSS che Tailwind (se configurato con var) userebbe.
    // Ma poiché abbiamo hardcoded i colori nel config precedente, dobbiamo fare un update al CSS.
    
    // PER SEMPLIFICARE LA VITA e far funzionare tutto senza rifare il tailwind config:
    // Inietteremo uno style tag che forza i colori.
    
    const styleId = "dynamic-theme-styles";
    let styleTag = document.getElementById(styleId);
    
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    // Sovrascriviamo le classi di utility principali
    styleTag.innerHTML = `
      :root {
        --bg-cream: ${theme.colors.cream};
        --text-ionian: ${theme.colors.ionian};
        --color-terracotta: ${theme.colors.terracotta};
        --bg-sand: ${theme.colors.sand};
      }
      .bg-cream { background-color: ${theme.colors.cream} !important; }
      .bg-sand\\/30 { background-color: ${theme.colors.sand}4D !important; } /* 4D è 30% alpha */
      .text-ionian { color: ${theme.colors.ionian} !important; }
      .text-terracotta { color: ${theme.colors.terracotta} !important; }
      .bg-terracotta { background-color: ${theme.colors.terracotta} !important; }
      .border-terracotta { border-color: ${theme.colors.terracotta} !important; }
    `;

  }, [paletteName]);

  return null; // Non renderizza nulla a video
}
