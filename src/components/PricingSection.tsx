import { Link } from "react-router-dom";
import { TIERS, RATE_RULES, formatZAR } from "../data/pricing";
import { Reveal } from "./ui";

export default function PricingSection() {
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TIERS.map((t, i) => (
          <Reveal key={t.id} delay={i * 70} className="h-full">
            <article
              className={`card card-hover relative flex flex-col p-7 h-full ${
                t.recommended ? "ring-1 ring-gold/70 bg-gold/[0.06]" : ""
              }`}
            >
              {t.recommended && (
                <span className="absolute -top-3 left-6 bg-gold text-ink text-[11px] font-semibold rounded-full px-3.5 py-1">
                  Most booked
                </span>
              )}
              <h3 className="text-[13px] font-semibold text-mist uppercase tracking-[0.1em]">{t.name}</h3>
              <p className="mt-4">
                <span className="text-[12px] text-mist block">from</span>
                <span className="font-display text-4xl text-gold">{formatZAR(t.from)}</span>
                <span className="text-mist text-[14px]"> {t.unit}</span>
              </p>
              {t.rangeTo && (
                <p className="text-[12px] text-mist mt-1">
                  typical range {formatZAR(t.from)} – {formatZAR(t.rangeTo)}
                </p>
              )}
              <p className="text-cream/85 text-[15px] font-medium mt-4">{t.strap}</p>
              <ul className="mt-5 mb-8 space-y-2.5">
                {t.includes.map((x) => (
                  <li key={x} className="text-[14px] text-mist flex gap-2.5">
                    <span className="text-gold shrink-0">—</span> {x}
                  </li>
                ))}
              </ul>
              <Link to={`/book?service=${t.id}`} className={`${t.recommended ? "btn-primary" : "btn-secondary"} mt-auto !w-full`}>
                Book this
              </Link>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <div className="card p-8 sm:p-10">
          <h3 className="text-[13px] font-semibold text-gold uppercase tracking-[0.1em]">How the pricing works</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">
            {RATE_RULES.map((r) => (
              <div key={r.rule}>
                <p className="text-[13px] text-mist">{r.rule}</p>
                <p className="font-display text-xl text-cream mt-1">{r.value}</p>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-mist/70 mt-6">
            Base rates lock at booking and include the chauffeur, fuel and tolls within inclusion.
            Final quote confirmed on WhatsApp before dispatch.
          </p>
        </div>
      </Reveal>
    </>
  );
}
