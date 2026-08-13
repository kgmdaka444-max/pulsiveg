import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BUSINESS, PHONE_DISPLAY, waLink } from "../config";

const LINKS = [
  { to: "/fleet", label: "Fleet" },
  { to: "/services", label: "Services" },
  { to: "/chauffeurs", label: "Chauffeurs" },
  { to: "/pricing", label: "Pricing" },
  { to: "/corporate", label: "Corporate" },
  { to: "/why-us", label: "Why Us" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || open || pathname !== "/" ? "bg-ink/95 backdrop-blur border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="tracking-[0.25em] text-sm font-semibold shrink-0">
          <span className="text-gold">PULSIVE</span>G
        </Link>
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-xs tracking-[0.18em] uppercase transition-colors ${
                  isActive ? "text-gold" : "text-mist hover:text-cream"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={waLink(`Hi ${BUSINESS.name}, I'd like to make a booking.`)}
            target="_blank"
            rel="noreferrer"
            className="text-xs tracking-[0.18em] uppercase text-mist hover:text-cream transition-colors"
          >
            WhatsApp
          </a>
          <Link
            to="/book"
            className="bg-gold text-ink text-xs tracking-[0.2em] uppercase font-semibold px-6 py-2.5 hover:bg-gold-soft transition-colors"
          >
            Book Now
          </Link>
        </nav>
        <button className="lg:hidden text-cream text-2xl leading-none" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? "×" : "≡"}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-ink-2 border-t border-white/5 px-6 py-5 flex flex-col gap-4">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className="text-sm tracking-[0.2em] uppercase text-mist">
              {l.label}
            </NavLink>
          ))}
          <Link to="/book" className="bg-gold text-ink text-center text-xs tracking-[0.25em] uppercase font-semibold px-6 py-3.5">
            Book Now
          </Link>
          <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="text-sm tracking-[0.2em] uppercase text-gold">
            {PHONE_DISPLAY}
          </a>
        </div>
      )}
    </header>
  );
}
