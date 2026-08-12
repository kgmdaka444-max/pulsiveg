import { DRIVERS } from "../data/drivers";

export default function DriversPortal({ onPick }: { onPick: (driverId: string) => void }) {
  return (
    <section id="drivers" className="bg-ink-2 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
        <p className="kicker">
          <span className="gold-line" />
          The Chauffeur Portal
        </p>
        <h2 className="font-display text-4xl sm:text-5xl mt-5 max-w-2xl">
          Don&apos;t book a car. <span className="text-gold">Choose your chauffeur.</span>
        </h2>
        <p className="text-mist max-w-xl mt-5">
          Every PulsiveG chauffeur is PrDP-licensed, vetted and trained in
          executive protocol. Pick the professional who fits your trip —
          they&apos;ll greet you by name.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {DRIVERS.map((d) => (
            <article key={d.id} className="bg-ink border border-white/5 p-6 flex flex-col hover:border-gold/40 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-soft/40 text-ink font-display text-xl font-bold flex items-center justify-center shrink-0">
                  {d.initials}
                </div>
                <div>
                  <h3 className="font-display text-lg leading-tight">{d.name}</h3>
                  <p className="text-gold text-xs tracking-[0.15em] uppercase mt-0.5">{d.speciality}</p>
                </div>
              </div>
              <dl className="grid grid-cols-3 gap-2 text-center border-y border-white/5 py-4 my-5">
                <div>
                  <dt className="text-[10px] tracking-widest uppercase text-mist">Rating</dt>
                  <dd className="text-gold font-semibold mt-1">★ {d.rating.toFixed(1)}</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-widest uppercase text-mist">Years</dt>
                  <dd className="font-semibold mt-1">{d.years}</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-widest uppercase text-mist">Trips</dt>
                  <dd className="font-semibold mt-1">{d.trips.toLocaleString()}</dd>
                </div>
              </dl>
              <p className="text-sm text-mist">
                {d.vehicle} · {d.languages.join(", ")}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3 mb-6">
                {d.badges.map((b) => (
                  <span key={b} className="text-[10px] tracking-wide uppercase text-cream/70 bg-white/5 px-2 py-1">
                    {b}
                  </span>
                ))}
              </div>
              <button
                onClick={() => onPick(d.id)}
                className="mt-auto border border-gold/60 text-gold text-xs tracking-[0.25em] uppercase py-3 hover:bg-gold hover:text-ink transition-colors cursor-pointer"
              >
                Request {d.name.split(" ")[0]}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
