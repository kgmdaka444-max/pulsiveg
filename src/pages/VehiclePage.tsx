import { Link, Navigate, useParams } from "react-router-dom";
import { Kicker, Reveal, GoldButton, GhostButton } from "../components/ui";
import { vehicleById, VEHICLES } from "../data/vehicles";
import { formatZAR } from "../data/pricing";

export default function VehiclePage() {
  const { id } = useParams();
  const v = id ? vehicleById(id) : undefined;
  if (!v) return <Navigate to="/fleet" replace />;

  return (
    <>
      <section className="relative min-h-[70svh] flex items-end">
        <div className="absolute inset-0">
          <img src={v.heroImg} alt={v.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-40 pb-16 w-full">
          <Reveal>
            <Kicker>{v.model}</Kicker>
            <h1 className="font-display text-5xl sm:text-7xl mt-3">{v.name}</h1>
            <p className="text-cream/70 text-xl mt-3">{v.tagline}</p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Reveal>
            <p className="text-mist text-lg leading-relaxed max-w-2xl">{v.description}</p>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            {v.specs.map((s, i) => (
              <Reveal key={s.label} delay={i * 60}>
                <div className="card p-5">
                  <p className="text-[12px] text-mist">{s.label}</p>
                  <p className="font-display text-lg text-cream mt-1.5">{s.value}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="text-[13px] font-semibold text-gold uppercase tracking-[0.1em] mt-12 mb-5">Standard amenities</h2>
            <div className="flex flex-wrap gap-2">
              {v.amenities.map((a) => (
                <span key={a} className="text-[14px] text-cream/85 bg-white/[0.07] rounded-full px-4 py-2">
                  {a}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-[13px] font-semibold text-gold uppercase tracking-[0.1em] mt-12 mb-5">Every journey includes</h2>
            <ul className="grid sm:grid-cols-2 gap-3 max-w-xl">
              {v.included.map((i) => (
                <li key={i} className="text-[15px] text-mist flex gap-2.5">
                  <span className="text-gold">—</span> {i}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <aside>
          <Reveal>
            <div className="card p-8">
              <p className="text-[13px] font-semibold text-mist">Ideal for</p>
              <ul className="mt-4 space-y-2">
                {v.idealFor.map((i) => (
                  <li key={i} className="text-[17px] font-medium text-cream/90">{i}</li>
                ))}
              </ul>
              {v.premium > 0 && (
                <p className="text-[14px] text-mist mt-6">
                  Vehicle premium: <span className="text-gold font-medium">{formatZAR(v.premium)}</span> above tier base.
                </p>
              )}
              <div className="flex flex-col gap-3 mt-8">
                <GoldButton to={`/book?vehicle=${v.id}`}>Book the {v.name.split(" ").pop()}</GoldButton>
                <GhostButton to="/fleet">View full fleet</GhostButton>
              </div>
            </div>
          </Reveal>
        </aside>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-20">
        <p className="text-[13px] font-semibold text-mist mb-6">More from the fleet</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {VEHICLES.filter((x) => x.id !== v.id)
            .slice(0, 4)
            .map((x) => (
              <Link key={x.id} to={`/fleet/${x.id}`} className="card card-hover block p-5 press">
                <p className="text-[15px] font-semibold">{x.name}</p>
                <p className="text-mist text-[13px] mt-1">{x.tagline}</p>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
