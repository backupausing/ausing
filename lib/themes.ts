export type Theme = {
  name: string;
  label: string;
  colors: {
    ionian: string;    // Testi principali (Titoli, paragrafi scuri)
    terracotta: string; // Colore d'accento (Pulsanti, Link, Icone)
    sand: string;      // Sfondi secondari (Footer, Box laterali)
    cream: string;     // Sfondo principale (Pagina intera)
  };
};

export const themes: Record<string, Theme> = {
  // --- I CLASSICI (Rustici / Naturali) ---
  classic: {
    name: "classic",
    label: "Classico Aus",
    colors: { ionian: "#2C3E50", terracotta: "#E07A5F", sand: "#F4F1EA", cream: "#F9F6EF" }
  },
  olive: {
    name: "olive",
    label: "Uliveto Lucano",
    colors: { ionian: "#1A2F1A", terracotta: "#556B2F", sand: "#F0F5F0", cream: "#FAFAF5" }
  },
  sea: {
    name: "sea",
    label: "Profondo Ionio",
    colors: { ionian: "#0F2C40", terracotta: "#006994", sand: "#E6F4F1", cream: "#F0F8FF" }
  },
  sunset: {
    name: "sunset",
    label: "Tramonto Caldo",
    colors: { ionian: "#2D1B1B", terracotta: "#D9534F", sand: "#FFF0E6", cream: "#FFF9F5" }
  },
  earth: {
    name: "earth",
    label: "Terra Cruda",
    colors: { ionian: "#3E2723", terracotta: "#8D6E63", sand: "#EFEBE9", cream: "#F5F5F5" }
  },
  stone: {
    name: "stone",
    label: "Pietra di Matera",
    colors: { ionian: "#263238", terracotta: "#78909C", sand: "#ECEFF1", cream: "#FFFFFF" }
  },
  lavender: {
    name: "lavender",
    label: "Campagna in Fiore",
    colors: { ionian: "#2E2030", terracotta: "#7B68EE", sand: "#F3E5F5", cream: "#FAF5FF" }
  },
  gold: {
    name: "gold",
    label: "Grano e Oro",
    colors: { ionian: "#424242", terracotta: "#DAA520", sand: "#FFF8E1", cream: "#FFFAF0" }
  },
  
  // --- I NUOVI (Moderni / Minimal / Luxury) ---
  
  luxury_noir: {
    name: "luxury_noir",
    label: "Luxury Noir",
    colors: { ionian: "#000000", terracotta: "#D4AF37", sand: "#F5F5F5", cream: "#FFFFFF" }
    // Nero assoluto e Oro, sfondo bianco puro. Molto elegante.
  },
  modern_teal: {
    name: "modern_teal",
    label: "Modern Teal",
    colors: { ionian: "#111827", terracotta: "#0D9488", sand: "#F3F4F6", cream: "#FFFFFF" }
    // Grigio scurissimo e Verde Acqua. Molto corporate e pulito.
  },
  industrial: {
    name: "industrial",
    label: "Industrial",
    colors: { ionian: "#171717", terracotta: "#F97316", sand: "#E5E5E5", cream: "#FFFFFF" }
    // Nero e Arancione sicurezza. Stile loft moderno.
  },
  electric: {
    name: "electric",
    label: "Electric Blue",
    colors: { ionian: "#0F172A", terracotta: "#3B82F6", sand: "#EFF6FF", cream: "#FFFFFF" }
    // Blu elettrico vibrante. Ottimo per dare energia.
  },
  emerald: {
    name: "emerald",
    label: "Emerald City",
    colors: { ionian: "#064E3B", terracotta: "#10B981", sand: "#ECFDF5", cream: "#FFFFFF" }
    // Verde smeraldo brillante su bianco. Fresco e naturale ma moderno.
  },
  berry: {
    name: "berry",
    label: "Bold Berry",
    colors: { ionian: "#4C1D95", terracotta: "#DB2777", sand: "#FAE8FF", cream: "#FFFFFF" }
    // Viola scuro e Fucsia. Per un look audace e diverso.
  },
  monochrome: {
    name: "monochrome",
    label: "Minimalista",
    colors: { ionian: "#000000", terracotta: "#404040", sand: "#E5E5E5", cream: "#FFFFFF" }
    // Tutto bianco, nero e grigio. Super pulito.
  },
  navy_chic: {
    name: "navy_chic",
    label: "Navy & Coral",
    colors: { ionian: "#1E3A8A", terracotta: "#FB7185", sand: "#F1F5F9", cream: "#FFFFFF" }
    // Blu Navy e Corallo. Classico moderno, molto amato nel settore travel.
  },
  slate: {
    name: "slate",
    label: "Ardesia Tech",
    colors: { ionian: "#334155", terracotta: "#64748B", sand: "#F8FAFC", cream: "#FFFFFF" }
    // Grigio bluastro ardesia. Molto soft e riposante.
  },
  cherry: {
    name: "cherry",
    label: "Red Velvet",
    colors: { ionian: "#280505", terracotta: "#DC2626", sand: "#FFF1F2", cream: "#FFFFFF" }
    // Rosso intenso su bianco. Passionale e forte.
  }
};
