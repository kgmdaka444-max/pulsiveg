import { Link, Navigate, useParams } from "react-router-dom";
import { Kicker, GoldButton, GhostButton } from "../components/ui";
import { serviceById, SERVICES } from "../data/services";
import { vehicleById } from "../data/vehicles";
import { TIERS, formatZAR } from "../data/pricing";

export default function ServicePage() {
  const { id } = useParams();
  const s = id ? serviceById(id) : undefined;
  if (!s) return <Navigate to="/services" replace />;
  const tier = TIERS.find((t) => t.id === s.tierId);

  return (
    <>
      <section className="relative min-h-[60svh] flex items-end">
        <div className="absolute inset-0">
          <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-40 pb-16 w-full">
          <Kicker>Service</Kicker>
          <h1 className="font-display text-5xl sm:text-7xl mt-4">{s.name}</h1>
          <p className="font-display italic text-cream/80 text-xl mt-3">{s.strap}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <p className="text-mist leading-relaxed max-w-2xl text-lg">{s.description}</p>
          <h2 className="text-xs tracking-[0.25em] uppercase text-gold mt-12 mb-5">What's included</h2>
          <ul className="grid sm:grid-cols-2 gap-3 max-w-xl">
            {s.includes.map((i) => (
              <li key={i} className="text-sm text-mist flex gap-2.5">
                <span className="text-gold">—</span> {i}
              </li>
            ))}
          </ul>
          <h2 className="text-xs tracking-[0.25em] uppercase text-gold mt-12 mb-5">Recommended vehicles</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
            {s.idealVehicles.map((vid) => {
              const v = vehicleById(vid);
              return v ? (
                <Link key={vid} to={`/fleet/${v.id}`} className="group border border-white/10 bg-ink-2 p-5 hover:border-gold/40 transition-colors">
                  <p className="font-display">{v.name}</p>
                  <p className="text-mist text-xs mt-1">{v.specs[0].value}</p>
                </Link>
              ) : null;
            })}
          </div>
        </div>

        <aside className="lg:border-l lg:border-white/10 lg:pl-10">
          <p className="text-xs tracking-[0.25em] uppercase text-mist">Investment</p>
          <p className="mt-3">
            <span className="font-display text-5xl text-gold">{formatZAR(s.fromPrice)}</span>
          </p>
          {tier && (
            <p className="text-mist text-sm mt-2">
              {tier.name} tier · {tier.unit}
              {tier.rangeTo ? ` · typical range up to ${formatZAR(tier.rangeTo)}` : ""}
            </p>
          )}
          <div className="flex flex-col gap-3 mt-10">
            <GoldButton to={`/book?service=${s.tierId}`}>Book this service</GoldButton>
            <GhostButton to="/pricing">Full pricing</GhostButton>
          </div>
        </aside>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-20">
        <p className="text-xs tracking-[0.25em] uppercase text-mist mb-6">Other services</p>
        <div className="flex flex-wrap gap-3">
          {SERVICES.filter((x) => x.id !== s.id).map((x) => (
            <Link key={x.id} to={`/services/${x.id}`} className="text-sm text-cream/80 border border-white/10 px-4 py-2 hover:border-gold/50 hover:text-gold transition-colors">
              {x.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
