export type Locale = "it" | "en" | "fr" | "de" | "es";

export const locales: Locale[] = ["it", "en", "fr", "de", "es"];

export const defaultLocale: Locale = "it";

type Messages = {
  heroTitle: string;
  heroSubtitle: string;
  viewVillas: string;  
  aus: string;
  ourAus: string;
  contactUs: string;
  callRequestTitle: string;
  callRequestSubtitle: string;
  name: string;
  phone: string;
  message: string;
  send: string;
  availability: string;
  reviews: string;
  leaveReview: string;
  rating: string;
  comment: string;
  thankYou: string;
  admin: string;
  adminDashboard: string;
  adminReviewsPending: string;
  adminLeads: string;
};

export const messages: Record<Locale, Messages> = {
  it: {
    heroTitle: "Vivi l’accoglienza autentica delle nostre Aus",
    heroSubtitle:
      "Dimore locali immerse tra campagne, ulivi e il mare Ionio: ospitalità vera, stile e tranquillità.",
    viewVillas: "Scopri le Aus",
    aus: "Aus",
    ourAus: "Le Nostre Aus",
    contactUs: "Contattaci",
    callRequestTitle: "Richiedi una richiamata",
    callRequestSubtitle:
      "Lascia il tuo numero: un host ti contatterà per completare la prenotazione.",
    name: "Nome",
    phone: "Telefono",
    message: "Messaggio (opzionale)",
    send: "Invia richiesta",
    availability: "Disponibilità",
    reviews: "Recensioni",
    leaveReview: "Lascia una recensione",
    rating: "Voto",
    comment: "Commento",
    thankYou: "Grazie! La tua richiesta è stata inviata.",
    admin: "Area host",
    adminDashboard: "Dashboard AUSING",
    adminReviewsPending: "Recensioni in attesa",
    adminLeads: "Richieste di richiamata"
  },

  en: {
    heroTitle: "Experience authentic hospitality in our Aus",
    heroSubtitle:
      "Local countryside homes surrounded by olive trees, hills and the Ionian coast. Style, comfort and quiet living.",
    viewVillas: "Discover the Aus",
    aus: "Aus",
    ourAus: "Our Aus",
    contactUs: "Contact Us",
    callRequestTitle: "Request a call back",
    callRequestSubtitle:
      "Leave your number: a host will contact you to complete the booking.",
    name: "Name",
    phone: "Phone",
    message: "Message (optional)",
    send: "Send request",
    availability: "Availability",
    reviews: "Reviews",
    leaveReview: "Leave a review",
    rating: "Rating",
    comment: "Comment",
    thankYou: "Thank you! Your request has been sent.",
    admin: "Host area",
    adminDashboard: "AUSING Dashboard",
    adminReviewsPending: "Pending reviews",
    adminLeads: "Call-back requests"
  },

  fr: {
    heroTitle: "Découvrez l’hospitalité authentique de nos Aus",
    heroSubtitle:
      "Maisons locales entourées d’oliviers, de collines et de la côte ionienne. Style, confort et tranquillité.",
    viewVillas: "Découvrez les Aus",
    aus: "Aus",
    ourAus: "Nos Aus",
    contactUs: "Contactez-nous",
    callRequestTitle: "Demander un rappel",
    callRequestSubtitle:
      "Laissez votre numéro : un hôte vous contactera pour finaliser votre réservation.",
    name: "Nom",
    phone: "Téléphone",
    message: "Message (optionnel)",
    send: "Envoyer la demande",
    availability: "Disponibilités",
    reviews: "Avis",
    leaveReview: "Laisser un avis",
    rating: "Note",
    comment: "Commentaire",
    thankYou: "Merci ! Votre demande a été envoyée.",
    admin: "Espace hôte",
    adminDashboard: "Tableau de bord AUSING",
    adminReviewsPending: "Avis en attente",
    adminLeads: "Demandes de rappel"
  },

  de: {
    heroTitle: "Erlebe echte Gastfreundschaft in unseren Aus",
    heroSubtitle:
      "Lokale Landhäuser, umgeben von Olivenbäumen, Hügeln und der ionischen Küste. Stil, Komfort und Ruhe.",
    viewVillas: "Entdecke die Aus",
    aus: "Aus",
    ourAus: "Unsere Aus",
    contactUs: "Kontakt",
    callRequestTitle: "Rückruf anfordern",
    callRequestSubtitle:
      "Hinterlasse deine Nummer: Ein Gastgeber ruft dich zurück, um die Buchung abzuschließen.",
    name: "Name",
    phone: "Telefon",
    message: "Nachricht (optional)",
    send: "Anfrage senden",
    availability: "Verfügbarkeit",
    reviews: "Bewertungen",
    leaveReview: "Bewertung abgeben",
    rating: "Bewertung",
    comment: "Kommentar",
    thankYou: "Danke! Deine Anfrage wurde gesendet.",
    admin: "Host-Bereich",
    adminDashboard: "AUSING Dashboard",
    adminReviewsPending: "Ausstehende Bewertungen",
    adminLeads: "Rückrufanfragen"
  },

  es: {
    heroTitle: "Vive la auténtica hospitalidad de nuestras Aus",
    heroSubtitle:
      "Casas rurales locales entre olivos, colinas y la costa del mar Jónico. Estilo, calma y comodidad.",
    viewVillas: "Descubre las Aus",
    aus: "Aus",
    ourAus: "Nuestras Aus",
    contactUs: "Contáctanos",
    callRequestTitle: "Solicita una llamada",
    callRequestSubtitle:
      "Deja tu número: un anfitrión se pondrá en contacto contigo para completar la reserva.",
    name: "Nombre",
    phone: "Teléfono",
    message: "Mensaje (opcional)",
    send: "Enviar solicitud",
    availability: "Disponibilidad",
    reviews: "Reseñas",
    leaveReview: "Dejar una reseña",
    rating: "Puntuación",
    comment: "Comentario",
    thankYou: "¡Gracias! Tu solicitud ha sido enviada.",
    admin: "Área de anfitrión",
    adminDashboard: "Panel AUSING",
    adminReviewsPending: "Reseñas pendientes",
    adminLeads: "Solicitudes de llamada"
  }
};
