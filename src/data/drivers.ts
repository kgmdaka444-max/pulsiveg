// PLACEHOLDER PROFILES — replace names/stats with PulsiveG's real
// chauffeurs (and drop headshots into /public/drivers) before launch.

export interface Driver {
  id: string;
  name: string;
  initials: string;
  years: number;
  languages: string[];
  speciality: string;
  vehicle: string;
  rating: number;
  trips: number;
  badges: string[];
}

export const DRIVERS: Driver[] = [
  {
    id: "sipho",
    name: "Sipho Maseko",
    initials: "SM",
    years: 12,
    languages: ["English", "isiZulu"],
    speciality: "Executive & VIP",
    vehicle: "Mercedes V-Class",
    rating: 4.9,
    trips: 2140,
    badges: ["PrDP Licensed", "Defensive Driving", "Discretion Trained"],
  },
  {
    id: "thabo",
    name: "Thabo Nkosi",
    initials: "TN",
    years: 9,
    languages: ["English", "Sesotho"],
    speciality: "Airport Transfers",
    vehicle: "Hyundai Staria",
    rating: 4.8,
    trips: 1780,
    badges: ["PrDP Licensed", "Flight Tracking", "Meet & Greet"],
  },
  {
    id: "ayanda",
    name: "Ayanda Dlamini",
    initials: "AD",
    years: 8,
    languages: ["English", "isiXhosa"],
    speciality: "Weddings & Events",
    vehicle: "Mercedes V-Class",
    rating: 5.0,
    trips: 1320,
    badges: ["PrDP Licensed", "Event Convoy Lead", "Red Carpet Protocol"],
  },
  {
    id: "pieter",
    name: "Pieter van Wyk",
    initials: "PW",
    years: 15,
    languages: ["English", "Afrikaans"],
    speciality: "VIP & Close Protection",
    vehicle: "BMW 7 Series",
    rating: 4.9,
    trips: 2650,
    badges: ["PrDP Licensed", "Security Trained", "Advanced Driving"],
  },
  {
    id: "naledi",
    name: "Naledi Mokoena",
    initials: "NM",
    years: 6,
    languages: ["English", "Setswana"],
    speciality: "Corporate Travel",
    vehicle: "BMW 5 Series",
    rating: 4.8,
    trips: 980,
    badges: ["PrDP Licensed", "Corporate Etiquette", "Punctuality Award"],
  },
  {
    id: "emmanuel",
    name: "Emmanuel Okafor",
    initials: "EO",
    years: 10,
    languages: ["English"],
    speciality: "Long Distance & Logistics",
    vehicle: "Hyundai H1 Shuttle",
    rating: 4.7,
    trips: 1540,
    badges: ["PrDP Licensed", "Inter-city Certified", "Cargo Secure"],
  },
];
