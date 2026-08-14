import { Link } from "react-router-dom";
import { BUSINESS } from "../config";
import heroImg from "../assets/hero-vclass.jpg";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function Hero() {
  return (
    <section className="relative min-h-svh flex items-center justify-center text-center">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Mercedes V-Class at a luxury hotel entrance" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,12,0.55)_0%,rgba(10,10,12,0.82)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
      </div>
      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 pt-28 pb-24">
        <p className="kicker reveal in" style={{ transitionDelay: "50ms" }}>
          {greeting()} — {BUSINESS.cities}
        </p>
        <h1
          className="font-display text-[clamp(2.75rem,8vw,5.5rem)] mt-5 reveal in"
          style={{ transitionDelay: "150ms" }}
        >
          Arrive like it&apos;s
          <br />
          <span className="text-gold">already yours.</span>
        </h1>
        <p
          className="text-mist text-lg sm:text-xl max-w-xl mx-auto mt-7 reveal in"
          style={{ transitionDelay: "280ms" }}
        >
          South Africa&apos;s premium chauffeur fleet. Pick your vehicle, pick your
          chauffeur — and quote yourself an exact price in under a minute.
        </p>
        <div
          className="flex flex-wrap items-center justify-center gap-4 mt-10 reveal in"
          style={{ transitionDelay: "400ms" }}
        >
          <Link to="/book" className="btn-primary">
            Get an Instant Quote
          </Link>
          <Link to="/fleet" className="btn-secondary">
            Explore the Fleet
          </Link>
        </div>
        <p className="text-[13px] text-cream/50 mt-6 reveal in" style={{ transitionDelay: "500ms" }}>
          Rates locked from R6,000 · VIP Transport · Airport Transfers · Corporate · Weddings
        </p>
      </div>
    </section>
  );
}
