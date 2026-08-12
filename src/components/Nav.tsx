import { useEffect, useState } from "react";
import { BUSINESS, PHONE_DISPLAY, waLink } from "../config";

const LINKS = [
  { href: "#fleet", label: "Fleet" },
  { href: "#drivers", label: "Chauffeurs" },
  { href: "#pricing", label: "Pricing" },
  { href: "#book", label: "Book" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="tracking-[0.25em] text-sm font-semibold">
          <span className="text-gold">PULSIVE</span>G
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-xs tracking-[0.2em] uppercase text-mist hover:text-cream transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href={waLink(`Hi ${BUSINESS.name}, I'd like to make a booking.`)}
            target="_blank"
            rel="noreferrer"
            className="border border-gold text-gold text-xs tracking-[0.2em] uppercase px-5 py-2.5 hover:bg-gold hover:text-ink transition-colors"
          >
            WhatsApp Us
          </a>
        </nav>
        <button className="md:hidden text-cream text-2xl leading-none" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? "×" : "≡"}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-ink-2 border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm tracking-[0.2em] uppercase text-mist">
              {l.label}
            </a>
          ))}
          <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="text-sm tracking-[0.2em] uppercase text-gold">
            {PHONE_DISPLAY}
          </a>
        </div>
      )}
    </header>
  );
}
