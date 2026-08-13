import { Link } from "react-router-dom";
import { PageHeader } from "../components/ui";
import { VEHICLES } from "../data/vehicles";

export default function FleetPage() {
  return (
    <>
      <PageHeader
        kicker="The Fleet"
        title={
          <>
            Every vehicle, showroom-ready. <span className="text-gold">Every trip.</span>
          </>
        }
        sub="Showroom condition is a dispatch requirement, not a marketing line. Select a vehicle for full specifications."
      />
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="grid gap-6">
          {VEHICLES.map((v, i) => (
            <Link
              key={v.id}
              to={`/fleet/${v.id}`}
              className={`group grid md:grid-cols-2 border border-white/10 bg-ink-2 hover:border-gold/40 transition-colors overflow-hidden ${
                i % 2 ? "md:[direction:rtl]" : ""
              }`}
            >
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-72 overflow-hidden [direction:ltr]">
                <img
                  src={v.img}
                  alt={v.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-8 sm:p-10 flex flex-col justify-center [direction:ltr]">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold">{v.model}</p>
                <h2 className="font-display text-3xl mt-2">{v.name}</h2>
                <p className="font-display italic text-cream/70 mt-1">{v.tagline}</p>
                <div className="flex flex-wrap gap-x-8 gap-y-2 mt-6">
                  {v.specs.slice(0, 2).map((s) => (
                    <p key={s.label} className="text-sm">
                      <span className="text-mist text-[10px] tracking-[0.2em] uppercase block">{s.label}</span>
                      <span className="text-cream">{s.value}</span>
                    </p>
                  ))}
                </div>
                <p className="text-gold text-[11px] tracking-[0.25em] uppercase mt-8">Full specifications →</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="text-[12px] text-mist/70 mt-10">
          * Custom luxury models available on request through the fleet desk.
        </p>
      </section>
    </>
  );
}
