import { TIERS, RATE_RULES, formatZAR } from "../data/pricing";

export default function PricingSection({ onPick }: { onPick: (tierId: string) => void }) {
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
      <p className="kicker">
        <span className="gold-line" />
        Investment
      </p>
      <h2 className="font-display text-4xl sm:text-5xl mt-5 max-w-3xl">
        Locked rates. <span className="text-gold">No surprises at the drop-off.</span>
      </h2>
      <p className="text-mist max-w-xl mt-5">
        Premium service, priced like it. Every booking starts from a locked
        base — you know the number before the car moves.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
        {TIERS.map((t) => (
          <article
            key={t.id}
            className={`relative flex flex-col p-7 border ${
              t.recommended ? "border-gold bg-ink-3" : "border-white/10 bg-ink-2"
            }`}
          >
            {t.recommended && (
              <span className="absolute -top-3 left-7 bg-gold text-ink text-[10px] tracking-[0.25em] uppercase font-semibold px-3 py-1">
                Most booked
              </span>
            )}
            <h3 className="text-xs tracking-[0.25em] uppercase text-mist">{t.name}</h3>
            <p className="mt-4">
              <span className="text-[11px] tracking-[0.2em] uppercase text-mist block">from</span>
              <span className="font-display text-4xl text-gold">{formatZAR(t.from)}</span>
              <span className="text-mist text-sm"> {t.unit}</span>
            </p>
            {t.rangeTo && (
              <p className="text-[11px] text-mist mt-1">
                typical range {formatZAR(t.from)} – {formatZAR(t.rangeTo)}
              </p>
            )}
            <p className="font-display italic text-cream/90 mt-4">{t.strap}</p>
            <ul className="mt-5 mb-8 space-y-2.5">
              {t.includes.map((i) => (
                <li key={i} className="text-sm text-mist flex gap-2.5">
                  <span className="text-gold shrink-0">—</span> {i}
                </li>
              ))}
            </ul>
            <button
              onClick={() => onPick(t.id)}
              className={`mt-auto text-xs tracking-[0.25em] uppercase py-3.5 transition-colors cursor-pointer ${
                t.recommended
                  ? "bg-gold text-ink font-semibold hover:bg-gold-soft"
                  : "border border-gold/60 text-gold hover:bg-gold hover:text-ink"
              }`}
            >
              Book this →
            </button>
          </article>
        ))}
      </div>

      <div className="mt-12 border border-white/10 bg-ink-2 p-7 sm:p-9">
        <h3 className="text-xs tracking-[0.25em] uppercase text-gold">How the pricing works</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">
          {RATE_RULES.map((r) => (
            <div key={r.rule}>
              <p className="text-sm text-mist">{r.rule}</p>
              <p className="font-display text-xl text-cream mt-1">{r.value}</p>
            </div>
          ))}
        </div>
        <p className="text-[12px] text-mist/70 mt-6">
          Base rates lock at booking and include the chauffeur, fuel and tolls
          within inclusion. Final quote confirmed on WhatsApp before dispatch.
        </p>
      </div>
    </section>
  );
}
