import { BUSINESS, PHONE_DISPLAY, waLink } from "../config";

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid sm:grid-cols-3 gap-10">
        <div>
          <p className="tracking-[0.25em] text-sm font-semibold">
            <span className="text-gold">PULSIVE</span>G
          </p>
          <p className="text-mist text-sm mt-3 max-w-xs">
            {BUSINESS.tagline}. {BUSINESS.cities}.
          </p>
        </div>
        <div className="text-sm">
          <p className="text-xs tracking-[0.25em] uppercase text-mist mb-3">Bookings</p>
          <a href={waLink("Hi PulsiveG, I'd like to make a booking.")} target="_blank" rel="noreferrer" className="block text-cream hover:text-gold transition-colors">
            WhatsApp booking line
          </a>
          <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="block text-cream hover:text-gold transition-colors mt-2">
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${BUSINESS.email}`} className="block text-cream hover:text-gold transition-colors mt-2">
            {BUSINESS.email}
          </a>
        </div>
        <div className="text-sm">
          <p className="text-xs tracking-[0.25em] uppercase text-mist mb-3">Service</p>
          <p className="text-mist">Available 24/7 · after-hours rates apply</p>
          <p className="text-mist mt-2">PrDP-licensed chauffeurs · fully insured fleet</p>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-[11px] tracking-[0.2em] uppercase text-mist/60">
        © 2026 {BUSINESS.name} · Site by CultureCollecter
      </div>
    </footer>
  );
}
