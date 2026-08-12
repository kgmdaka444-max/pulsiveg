// ============================================================
// PULSIVEG SITE CONFIG — the only file you need to touch
// to go live for the client.
// ============================================================

// ⚡ PLUG THE CLIENT'S WHATSAPP NUMBER HERE (country code, no +, no spaces)
// e.g. South African mobile 082 123 4567  →  "27821234567"
export const WHATSAPP_NUMBER = "27000000000";

// Shown on the site as the call line (formatted for humans)
export const PHONE_DISPLAY = "+27 00 000 0000";

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
