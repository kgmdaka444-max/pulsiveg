import { useState } from "react";
import { waLink } from "../config";
import chauffeurImg from "../assets/chauffeur.jpg";

export default function LeadMagnet() {
  const [name, setName] = useState("");
  const [need, setNeed] = useState("Airport transfers");

  const msg = `Hi PulsiveG, I'm ${name || "—"}. Please send me the 2026 rate card. I'm mainly interested in: ${need}.`;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={chauffeurImg} alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      </div>
      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 py-28 text-center">
        <p className="kicker justify-center">
          <span className="gold-line" />
          The Rate Card
        </p>
        <h2 className="font-display text-4xl sm:text-5xl mt-5">
          Get the full 2026 rate card <span className="text-gold">on WhatsApp.</span>
        </h2>
        <p className="text-mist mt-5 max-w-lg mx-auto">
          Every vehicle, every route, every package — including corporate
          retainer pricing we don&apos;t publish here.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-10 max-w-xl mx-auto">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="flex-1 bg-ink border border-white/15 px-4 py-3.5 text-sm text-cream placeholder:text-mist/50 focus:border-gold focus:outline-none"
          />
          <select
            value={need}
            onChange={(e) => setNeed(e.target.value)}
            className="bg-ink border border-white/15 px-4 py-3.5 text-sm text-cream focus:border-gold focus:outline-none"
          >
            {["Airport transfers", "Corporate travel", "Weddings & events", "Full-day chauffeur", "Monthly retainer"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <a
            href={name ? waLink(msg) : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!name}
            className={`text-xs tracking-[0.25em] uppercase font-semibold px-7 py-4 transition-colors ${
              name ? "bg-gold text-ink hover:bg-gold-soft" : "bg-white/10 text-mist pointer-events-none"
            }`}
          >
            Send it →
          </a>
        </div>
        <p className="text-[11px] text-mist/60 mt-4">No spam. One message, straight from the fleet desk.</p>
      </div>
    </section>
  );
}
