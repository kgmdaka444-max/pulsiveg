import { Link } from "react-router-dom";
import { PageHeader } from "../components/ui";
import { SERVICES } from "../data/services";
import { formatZAR } from "../data/pricing";

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        kicker="Services"
        title={
          <>
            Every journey, <span className="text-gold">handled perfectly.</span>
          </>
        }
        sub="Six ways we move you — each engineered around the same standard: locked rates, vetted chauffeurs, confirmation in seconds."
      />
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s) => (
            <Link key={s.id} to={`/services/${s.id}`} className="group relative aspect-[4/5] overflow-hidden bg-ink-2">
              <img
                src={s.img}
                alt={s.name}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h2 className="font-display text-2xl">{s.name}</h2>
                <p className="font-display italic text-cream/70 mt-1">{s.strap}</p>
                <p className="text-mist text-xs mt-3">
                  from <span className="text-gold">{formatZAR(s.fromPrice)}</span>
                </p>
                <p className="text-gold text-[11px] tracking-[0.25em] uppercase mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Details →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
