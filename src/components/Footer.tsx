import { Link } from "react-router-dom";
import { BUSINESS, PHONE_DISPLAY, waLink } from "../config";

const COLS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "Fleet", to: "/fleet" },
      { label: "Services", to: "/services" },
      { label: "Chauffeurs", to: "/chauffeurs" },
      { label: "Why Us", to: "/why-us" },
    ],
  },
  {
    title: "Bookings",
    links: [
      { label: "Book Now", to: "/book" },
      { label: "Pricing", to: "/pricing" },
      { label: "Corporate Accounts", to: "/corporate" },
      { label: "FAQ", to: "/why-us#faq" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="text-[15px] font-semibold tracking-[0.14em]">
            <span className="text-gold">PULSIVE</span>G
          </p>
          <p className="text-mist text-[14px] mt-3 max-w-xs">
            {BUSINESS.tagline}. Premium executive mobility across South Africa.
          </p>
          <p className="text-[12px] text-mist/60 mt-4">{BUSINESS.cities}</p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <p className="text-[13px] font-semibold text-mist mb-4">{c.title}</p>
            {c.links.map((l) => (
              <Link key={l.label} to={l.to} className="block text-[14px] text-cream/75 hover:text-cream transition-colors mt-2.5">
                {l.label}
              </Link>
            ))}
          </div>
        ))}
        <div>
          <p className="text-[13px] font-semibold text-mist mb-4">Contact</p>
          <a href={waLink("Hi PulsiveG, I'd like to make a booking.")} target="_blank" rel="noreferrer" className="block text-[14px] text-cream/75 hover:text-cream transition-colors mt-2.5">
            WhatsApp booking line
          </a>
          <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="block text-[14px] text-cream/75 hover:text-cream transition-colors mt-2.5">
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${BUSINESS.email}`} className="block text-[14px] text-cream/75 hover:text-cream transition-colors mt-2.5">
            {BUSINESS.email}
          </a>
          <p className="text-mist/70 mt-4 text-[12px]">Available 24/7 · after-hours rates apply</p>
        </div>
      </div>
      <div className="border-t border-white/[0.06] py-6 text-center text-[12px] text-mist/60">
        © 2026 {BUSINESS.name} · PrDP-licensed chauffeurs · Fully insured fleet · Site by CultureCollecter
      </div>
    </footer>
  );
}
