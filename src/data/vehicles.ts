// Fleet data — spec sheets per vehicle. Replace images with real fleet
// photography after the shoot day (drop into src/assets, update imports).

import heroImg from "../assets/hero-vclass.jpg";
import interiorImg from "../assets/interior.jpg";
import stariaImg from "../assets/staria.jpg";
import airportImg from "../assets/airport.jpg";
import chauffeurImg from "../assets/chauffeur.jpg";
import weddingImg from "../assets/wedding.jpg";

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  tagline: string;
  description: string;
  img: string;
  heroImg: string;
  premium: number; // added to tier base in the wizard estimate
  specs: { label: string; value: string }[];
  amenities: string[];
  included: string[];
  idealFor: string[];
}

export const VEHICLES: Vehicle[] = [
  {
    id: "v-class",
    name: "Mercedes-Benz V-Class",
    model: "V250d Executive",
    tagline: "The flagship. First-class, six seats deep.",
    description:
      "The pinnacle of group luxury travel — a spacious executive cabin with ambient lighting, premium leather and conference-style seating for up to six passengers. The default choice for VIP transfers, corporate delegations and wedding parties.",
    img: interiorImg,
    heroImg: heroImg,
    premium: 0,
    specs: [
      { label: "Capacity", value: "6 passengers" },
      { label: "Luggage", value: "4 large bags" },
      { label: "Engine", value: "2.0L turbo-diesel" },
      { label: "Transmission", value: "9G-Tronic auto" },
    ],
    amenities: ["Complimentary Wi-Fi", "Ambient lighting", "USB-C charging", "Climate control", "Premium audio", "Executive seating"],
    included: ["Meet & greet", "Flight tracking", "Complimentary water", "Luggage assistance"],
    idealFor: ["VIP transport", "Airport transfers", "Corporate groups", "Weddings"],
  },
  {
    id: "staria",
    name: "Hyundai Staria",
    model: "Staria Executive 9",
    tagline: "The signature shuttle. Presence in motion.",
    description:
      "Unmistakable on arrival — the Staria's futuristic silhouette carries up to seven passengers in lounge comfort. The workhorse of premium group shuttles, roadshows and event convoys.",
    img: stariaImg,
    heroImg: stariaImg,
    premium: 0,
    specs: [
      { label: "Capacity", value: "7 passengers" },
      { label: "Luggage", value: "5 large bags" },
      { label: "Engine", value: "2.2L turbo-diesel" },
      { label: "Transmission", value: "8-speed auto" },
    ],
    amenities: ["Complimentary Wi-Fi", "USB charging", "Climate control", "Panoramic glass", "Lounge seating"],
    included: ["Meet & greet", "Flight tracking", "Complimentary water", "Luggage assistance"],
    idealFor: ["Group shuttles", "Events", "Roadshows", "Airport transfers"],
  },
  {
    id: "bmw-7",
    name: "BMW 7 Series",
    model: "740d M Sport",
    tagline: "The statement sedan. Boardroom on wheels.",
    description:
      "For principals who arrive alone and arrive first. Rear executive lounge seating, total discretion, and a cabin engineered for calls, preparation or silence.",
    img: airportImg,
    heroImg: airportImg,
    premium: 1500,
    specs: [
      { label: "Capacity", value: "3 passengers" },
      { label: "Luggage", value: "2 large bags" },
      { label: "Engine", value: "3.0L turbo-diesel" },
      { label: "Transmission", value: "8-speed Steptronic" },
    ],
    amenities: ["Rear executive lounge", "Wi-Fi & wireless charging", "Privacy glass", "Massage seats", "Premium audio"],
    included: ["Meet & greet", "Flight tracking", "Complimentary water", "Newspaper on request"],
    idealFor: ["VIP principals", "Diplomatic transport", "Executive commutes"],
  },
  {
    id: "bmw-5",
    name: "BMW 5 Series",
    model: "520d",
    tagline: "The corporate workhorse. Sharp and discreet.",
    description:
      "Quietly excellent executive transport for daily corporate movement — crisp, comfortable and always presentable.",
    img: chauffeurImg,
    heroImg: chauffeurImg,
    premium: 500,
    specs: [
      { label: "Capacity", value: "3 passengers" },
      { label: "Luggage", value: "2 large bags" },
      { label: "Engine", value: "2.0L turbo-diesel" },
      { label: "Transmission", value: "8-speed Steptronic" },
    ],
    amenities: ["Wi-Fi hotspot", "USB-C charging", "Climate control", "Privacy glass"],
    included: ["Meet & greet", "Flight tracking", "Complimentary water"],
    idealFor: ["Corporate travel", "Airport transfers", "Executive commutes"],
  },
  {
    id: "h1",
    name: "Hyundai H1",
    model: "H1 Multicab",
    tagline: "Group logistics, handled.",
    description:
      "Eight seats plus serious luggage capacity — the dependable mover for crews, delegations, tour groups and luggage-heavy airport runs.",
    img: weddingImg,
    heroImg: weddingImg,
    premium: 0,
    specs: [
      { label: "Capacity", value: "8 passengers" },
      { label: "Luggage", value: "6 large bags" },
      { label: "Engine", value: "2.5L turbo-diesel" },
      { label: "Transmission", value: "Automatic" },
    ],
    amenities: ["USB charging", "Climate control", "Generous luggage bay"],
    included: ["Meet & greet", "Flight tracking", "Complimentary water", "Luggage assistance"],
    idealFor: ["Tour groups", "Crew transport", "Long distance", "Logistics"],
  },
];

export const vehicleById = (id: string) => VEHICLES.find((v) => v.id === id);
