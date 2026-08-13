import { Link, Navigate, useParams } from "react-router-dom";
import { Kicker, GoldButton, GhostButton } from "../components/ui";
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
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-40 pb-16 w-full">
          <Kicker>{v.model}</Kicker>
          <h1 className="font-display text-5xl sm:text-7xl mt-4">{v.name}</h1>
          <p className="font-display italic text-cream/80 text-xl mt-3">{v.tagline}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <p className="text-mist leading-relaxed max-w-2xl">{v.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            {v.specs.map((s) => (
              <div key={s.label} className="border border-white/10 bg-ink-2 p-5">
                <p className="text-[10px] tracking-[0.25em] uppercase text-mist">{s.label}</p>
                <p className="font-display text-lg text-cream mt-2">{s.value}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xs tracking-[0.25em] uppercase text-gold mt-12 mb-5">Standard amenities</h2>
          <div className="flex flex-wrap gap-2">
            {v.amenities.map((a) => (
              <span key={a} className="text-sm text-cream/80 bg-white/5 border border-white/10 px-4 py-2">
                {a}
              </span>
            ))}
          </div>

          <h2 className="text-xs tracking-[0.25em] uppercase text-gold mt-12 mb-5">Every journey includes</h2>
          <ul className="grid sm:grid-cols-2 gap-3 max-w-xl">
            {v.included.map((i) => (
              <li key={i} className="text-sm text-mist flex gap-2.5">
                <span className="text-gold">—</span> {i}
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:border-l lg:border-white/10 lg:pl-10">
          <p className="text-xs tracking-[0.25em] uppercase text-mist">Ideal for</p>
          <ul className="mt-4 space-y-2">
            {v.idealFor.map((i) => (
              <li key={i} className="font-display text-lg text-cream/90">{i}</li>
            ))}
          </ul>
          {v.premium > 0 && (
            <p className="text-sm text-mist mt-8">
              Vehicle premium: <span className="text-gold">{formatZAR(v.premium)}</span> above tier base.
            </p>
          )}
          <div className="flex flex-col gap-3 mt-10">
            <GoldButton to={`/book?vehicle=${v.id}`}>Book the {v.name.split(" ").pop()}</GoldButton>
            <GhostButton to="/fleet">View full fleet</GhostButton>
          </div>
        </aside>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-20">
        <p className="text-xs tracking-[0.25em] uppercase text-mist mb-6">More from the fleet</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {VEHICLES.filter((x) => x.id !== v.id)
            .slice(0, 4)
            .map((x) => (
              <Link key={x.id} to={`/fleet/${x.id}`} className="group border border-white/10 bg-ink-2 p-5 hover:border-gold/40 transition-colors">
                <p className="font-display text-lg">{x.name}</p>
                <p className="text-mist text-xs mt-1">{x.tagline}</p>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
