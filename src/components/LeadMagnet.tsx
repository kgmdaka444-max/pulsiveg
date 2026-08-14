import { useState } from "react";
import { waLink } from "../config";
import { Reveal } from "./ui";
import chauffeurImg from "../assets/chauffeur.jpg";

export default function LeadMagnet() {
  const [name, setName] = useState("");
  const [need, setNeed] = useState("Airport transfers");

  const msg = `Hi PulsiveG, I'm ${name || "—"}. Please send me the 2026 rate card. I'm mainly interested in: ${need}.`;

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px]">
          <img src={chauffeurImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/80 to-ink/90" />
          <div className="relative px-6 sm:px-16 py-20 text-center">
            <p className="kicker">The Rate Card</p>
            <h2 className="font-display text-4xl sm:text-5xl mt-4">
              Get the full 2026 rate card <span className="text-gold">on WhatsApp.</span>
            </h2>
            <p className="text-mist text-lg mt-5 max-w-lg mx-auto">
              Every vehicle, every route, every package — including corporate retainer
              pricing we don&apos;t publish here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-10 max-w-xl mx-auto">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="flex-1 rounded-full bg-white/[0.08] px-6 py-3.5 text-[15px] text-cream placeholder:text-mist/60 focus:bg-white/[0.12] focus:outline-none transition-colors"
              />
              <select
                value={need}
                onChange={(e) => setNeed(e.target.value)}
                className="rounded-full bg-white/[0.08] px-6 py-3.5 text-[15px] text-cream focus:bg-white/[0.12] focus:outline-none transition-colors appearance-none"
              >
                {["Airport transfers", "Corporate travel", "Weddings & events", "Full-day chauffeur", "Monthly retainer"].map((o) => (
                  <option key={o} className="bg-ink-3">{o}</option>
                ))}
              </select>
              <a
                href={name ? waLink(msg) : undefined}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!name}
                className={name ? "btn-primary" : "btn-secondary opacity-50 pointer-events-none"}
              >
                Send it
              </a>
            </div>
            <p className="text-[12px] text-mist/60 mt-5">No spam. One message, straight from the fleet desk.</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
