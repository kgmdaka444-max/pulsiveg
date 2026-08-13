// ============================================================
// PULSIVEG SITE CONFIG — the only file you need to touch
// to go live for the client.
// ============================================================

// Client's WhatsApp booking line (country code, no +, no spaces)
export const WHATSAPP_NUMBER = "27658660232";

// Shown on the site as the call line (formatted for humans)
export const PHONE_DISPLAY = "+27 65 866 0232";

export const BUSINESS = {
  name: "PulsiveG",
  tagline: "Luxury Chauffeur & VIP Transport",
  cities: "Johannesburg · Cape Town",
  email: "bookings@pulsiveg.co.za",
  instagram: "https://instagram.com/pulsiveg",
};

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
