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
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || open || pathname !== "/";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background,border-color] duration-300 ${
        solid ? "glass border-b border-white/[0.06]" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between gap-4">
        <Link to="/" className="text-[15px] font-semibold tracking-[0.14em] shrink-0 press">
          <span className="text-gold">PULSIVE</span>G
        </Link>
        <nav className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-[13px] font-medium transition-colors duration-200 ${
                  isActive ? "text-cream" : "text-cream/60 hover:text-cream"
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
            className="text-[13px] font-medium text-cream/60 hover:text-cream transition-colors duration-200"
          >
            WhatsApp
          </a>
          <Link to="/book" className="btn-primary !px-5 !py-1.5 !text-[13px]">
            Book Now
          </Link>
        </nav>
        <button className="lg:hidden text-cream text-2xl leading-none press" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? "×" : "≡"}
        </button>
      </div>
      {open && (
        <div className="lg:hidden glass border-t border-white/[0.06] px-6 py-5 flex flex-col gap-4">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className="text-[15px] font-medium text-cream/80">
              {l.label}
            </NavLink>
          ))}
          <Link to="/book" className="btn-primary">
            Book Now
          </Link>
          <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="text-[15px] font-medium text-gold">
            {PHONE_DISPLAY}
          </a>
        </div>
      )}
    </header>
  );
}
