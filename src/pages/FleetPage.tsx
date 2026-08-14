import { Link } from "react-router-dom";
import { PageHeader, Reveal } from "../components/ui";
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
        <div className="grid gap-5">
          {VEHICLES.map((v, i) => (
            <Reveal key={v.id}>
              <Link
                to={`/fleet/${v.id}`}
                className={`card card-hover group grid md:grid-cols-2 overflow-hidden press ${i % 2 ? "md:[direction:rtl]" : ""}`}
              >
                <div className="relative aspect-[16/10] md:aspect-auto md:min-h-72 overflow-hidden [direction:ltr]">
                  <img
                    src={v.img}
                    alt={v.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700"
                    style={{ transitionTimingFunction: "var(--ease-fluid)" }}
                  />
                </div>
                <div className="p-8 sm:p-10 flex flex-col justify-center [direction:ltr]">
                  <p className="text-[12px] font-semibold text-gold uppercase tracking-[0.1em]">{v.model}</p>
                  <h2 className="font-display text-3xl mt-2">{v.name}</h2>
                  <p className="text-cream/60 text-[15px] mt-1">{v.tagline}</p>
                  <div className="flex flex-wrap gap-x-10 gap-y-3 mt-6">
                    {v.specs.slice(0, 2).map((s) => (
                      <p key={s.label}>
                        <span className="text-mist text-[12px] block">{s.label}</span>
                        <span className="text-cream text-[15px] font-medium">{s.value}</span>
                      </p>
                    ))}
                  </div>
                  <p className="link-gold text-[14px] mt-8">Full specifications →</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="text-[13px] text-mist/70 mt-10 text-center">
          Custom luxury models available on request through the fleet desk.
        </p>
      </section>
    </>
  );
}
