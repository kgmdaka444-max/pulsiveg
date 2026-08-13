import heroImg from "../assets/hero-vclass.jpg";
import interiorImg from "../assets/interior.jpg";
import stariaImg from "../assets/staria.jpg";
import airportImg from "../assets/airport.jpg";
import chauffeurImg from "../assets/chauffeur.jpg";
import weddingImg from "../assets/wedding.jpg";

export interface Service {
  id: string;
  name: string;
  strap: string;
  description: string;
  img: string;
  includes: string[];
  idealVehicles: string[]; // vehicle ids
  tierId: string; // pricing tier this maps to
  fromPrice: number;
}

export const SERVICES: Service[] = [
  {
    id: "vip-transport",
    name: "VIP Transport",
    strap: "Discretion, ritualised.",
    description:
      "Exclusive chauffeur service for high-profile individuals, executives and public figures. Security-conscious routing, total discretion, and chauffeurs trained in VIP protocol.",
    img: chauffeurImg,
    includes: ["Security-trained chauffeur", "Discreet routing & timing", "Privacy glass vehicles", "24/7 availability"],
    idealVehicles: ["bmw-7", "v-class"],
    tierId: "fullday",
    fromPrice: 9500,
  },
  {
    id: "airport-transfers",
    name: "Airport Transfers",
    strap: "Arrivals, elevated.",
    description:
      "First-class transfers to and from every major airport. We track your flight, adjust for delays, and meet you at arrivals with a name board — luggage handled, water cold.",
    img: airportImg,
    includes: ["Live flight tracking", "Meet & greet with name board", "60 min free wait on arrivals", "Luggage assistance"],
    idealVehicles: ["v-class", "staria", "bmw-5"],
    tierId: "transfer",
    fromPrice: 6000,
  },
  {
    id: "corporate-travel",
    name: "Corporate Travel",
    strap: "Your company's fleet desk.",
    description:
      "Reliable executive movement for teams — daily commutes, client shuttles, roadshows and delegations, consolidated onto one monthly invoice with a dedicated account manager.",
    img: heroImg,
    includes: ["Priority dispatch", "Dedicated account manager", "Consolidated monthly billing", "Recurring schedules"],
    idealVehicles: ["bmw-5", "v-class", "staria"],
    tierId: "corporate",
    fromPrice: 48000,
  },
  {
    id: "events-weddings",
    name: "Events & Weddings",
    strap: "The moment they step out — choreographed.",
    description:
      "Coordinated luxury fleet for weddings, galas and productions. Lead vehicle plus convoy, an event coordinator on WhatsApp, and red-carpet arrival protocol.",
    img: weddingImg,
    includes: ["Lead vehicle + optional convoy", "Event coordinator on WhatsApp", "Red carpet protocol", "Décor-ready vehicles"],
    idealVehicles: ["v-class", "staria", "h1"],
    tierId: "events",
    fromPrice: 15000,
  },
  {
    id: "night-out",
    name: "Night Out",
    strap: "Your evening, without the car keys.",
    description:
      "Dinners, shows and celebrations with a chauffeur on standby until the last stop. Arrive together, leave whenever — with peace of mind built in.",
    img: interiorImg,
    includes: ["Chauffeur on standby", "Multi-stop itinerary", "After-hours service", "Safe door-to-door return"],
    idealVehicles: ["v-class", "bmw-7"],
    tierId: "transfer",
    fromPrice: 6000,
  },
  {
    id: "tourism-long-distance",
    name: "Tourism & Long Distance",
    strap: "South Africa, seen properly.",
    description:
      "Private inter-city travel and guided day trips — Johannesburg, Cape Town and everywhere worth stopping in between, with a knowledgeable chauffeur at the wheel.",
    img: stariaImg,
    includes: ["Inter-city certified chauffeurs", "Flexible itineraries", "Luggage & equipment space", "Multi-day options"],
    idealVehicles: ["staria", "h1", "v-class"],
    tierId: "fullday",
    fromPrice: 9500,
  },
];

export const serviceById = (id: string) => SERVICES.find((s) => s.id === id);
