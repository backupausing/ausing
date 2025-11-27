export type Theme = {
  name: string;
  label: string;
  colors: {
    ionian: string;    // Testi scuri / Blu scuro
    terracotta: string; // Accenti / Pulsanti
    sand: string;      // Sfondi secondari
    cream: string;     // Sfondo principale
  };
};

export const themes: Record<string, Theme> = {
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
  night: {
    name: "night",
    label: "Eleganza Notturna",
    colors: { ionian: "#000000", terracotta: "#C0A062", sand: "#1A1A1A", cream: "#121212" } // Questo richiederebbe CSS dark mode avanzato, ma cambierà i colori base
  },
  gold: {
    name: "gold",
    label: "Grano e Oro",
    colors: { ionian: "#424242", terracotta: "#DAA520", sand: "#FFF8E1", cream: "#FFFAF0" }
  },
  minimal: {
    name: "minimal",
    label: "Bianco Assoluto",
    colors: { ionian: "#111111", terracotta: "#333333", sand: "#F5F5F5", cream: "#FFFFFF" }
  }
};
