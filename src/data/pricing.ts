// Pricing locked from R6,000 — positioned premium-entry against the SA
// market (budget V-Class operators ~R3.5k/day; premium peers R7k–R9.85k).
// Full tier math in ECONOMICS.md.

export interface Tier {
  id: string;
  name: string;
  from: number;
  rangeTo: number | null;
  unit: string;
  strap: string;
  includes: string[];
  recommended?: boolean;
}

export const TIERS: Tier[] = [
  {
    id: "transfer",
    name: "Executive Transfer",
    from: 6000,
    rangeTo: 8500,
    unit: "per transfer",
    strap: "Airport & point-to-point. Arrivals, elevated.",
    includes: [
      "Up to 4 hours / 80 km",
      "Meet & greet with name board",
      "Live flight tracking",
      "Bottled water, Wi-Fi, chargers",
      "One vehicle + dedicated chauffeur",
    ],
  },
  {
    id: "fullday",
    name: "Full-Day Signature",
    from: 9500,
    rangeTo: 14000,
    unit: "per day",
    strap: "Your chauffeur on standby, sunrise to last stop.",
    includes: [
      "8 hours / 250 km included",
      "Chauffeur remains on standby",
      "Multi-stop itinerary handled",
      "Refreshments & device charging",
      "Same-day itinerary changes",
    ],
    recommended: true,
  },
  {
    id: "events",
    name: "Events & Weddings",
    from: 15000,
    rangeTo: 35000,
    unit: "per event",
    strap: "The moment they step out — choreographed.",
    includes: [
      "Lead vehicle + optional convoy",
      "Event coordinator on WhatsApp",
      "Red carpet arrival protocol",
      "Décor-ready vehicles (ribbons on request)",
      "Standby through the event",
    ],
  },
  {
    id: "corporate",
    name: "Corporate Retainer",
    from: 48000,
    rangeTo: null,
    unit: "per month",
    strap: "A fleet desk for your company. One invoice.",
    includes: [
      "10 chauffeur-days per month",
      "Priority dispatch, 24/7",
      "Dedicated account manager",
      "Consolidated monthly billing",
      "Preferred chauffeur guaranteed",
    ],
  },
];

export const VEHICLES = [
  { id: "vclass", name: "Mercedes V-Class", note: "The flagship. 6 VIP seats.", premium: 0 },
  { id: "bmw7", name: "BMW 7 Series", note: "Executive sedan. Statement arrivals.", premium: 1500 },
  { id: "bmw5", name: "BMW 5 Series", note: "Corporate workhorse. Sharp & discreet.", premium: 500 },
  { id: "staria", name: "Hyundai Staria", note: "The signature shuttle. 7 seats.", premium: 0 },
  { id: "h1", name: "Hyundai H1", note: "Group & luggage logistics. 8 seats.", premium: 0 },
];

export const RATE_RULES = [
  { rule: "Extra hour beyond inclusion", value: "R1,150 / hr" },
  { rule: "Extra distance beyond inclusion", value: "R14 / km" },
  { rule: "After-hours (22:00–05:00)", value: "+15%" },
  { rule: "Public holidays", value: "+20%" },
  { rule: "Secure your date", value: "50% deposit" },
];

export function formatZAR(n: number): string {
  return "R" + n.toLocaleString("en-ZA");
}
