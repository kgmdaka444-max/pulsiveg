import { Link } from "react-router-dom";
import { BUSINESS } from "../config";
import heroImg from "../assets/hero-vclass.jpg";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning.";
  if (h < 17) return "Good afternoon.";
  return "Good evening.";
}

export default function Hero() {
  return (
    <section className="relative min-h-svh flex items-center">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Mercedes V-Class at a luxury hotel entrance" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-20 w-full">
        <p className="kicker fade-up">
          <span className="gold-line" />
          {greeting()} — {BUSINESS.cities}
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[1.05] mt-6 max-w-4xl fade-up">
          Arrive like it&apos;s <em className="text-gold not-italic">already yours.</em>
        </h1>
        <p className="text-mist text-lg max-w-xl mt-8 fade-up">
          South Africa&apos;s premium chauffeur fleet. Pick your vehicle, pick your
          chauffeur, lock your rate — and confirm on WhatsApp in seconds.
        </p>
        <div className="flex flex-wrap items-center gap-5 mt-10 fade-up">
          <Link
            to="/book"
            className="bg-gold text-ink text-xs tracking-[0.25em] uppercase font-semibold px-8 py-4 hover:bg-gold-soft transition-colors"
          >
            Book Your Chauffeur →
          </Link>
          <Link to="/fleet" className="border border-cream/30 text-cream text-xs tracking-[0.25em] uppercase px-8 py-4 hover:border-gold hover:text-gold transition-colors">
            Explore The Fleet
          </Link>
          <Link to="/pricing" className="text-xs tracking-[0.25em] uppercase text-cream/80 hover:text-gold transition-colors py-4">
            Rates from R6,000
          </Link>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 mt-16 text-[11px] tracking-[0.2em] uppercase text-mist/70">
          <span>VIP Transport</span>
          <span>Airport Transfers</span>
          <span>Corporate Travel</span>
          <span>Weddings & Events</span>
        </div>
      </div>
    </section>
  );
}
