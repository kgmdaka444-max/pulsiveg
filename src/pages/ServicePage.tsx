import { Link, Navigate, useParams } from "react-router-dom";
import { Kicker, Reveal, GoldButton, GhostButton } from "../components/ui";
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
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-40 pb-16 w-full">
          <Reveal>
            <Kicker>Service</Kicker>
            <h1 className="font-display text-5xl sm:text-7xl mt-3">{s.name}</h1>
            <p className="text-cream/70 text-xl mt-3">{s.strap}</p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Reveal>
            <p className="text-mist text-lg leading-relaxed max-w-2xl">{s.description}</p>
          </Reveal>
          <Reveal>
            <h2 className="text-[13px] font-semibold text-gold uppercase tracking-[0.1em] mt-12 mb-5">What&apos;s included</h2>
            <ul className="grid sm:grid-cols-2 gap-3 max-w-xl">
              {s.includes.map((i) => (
                <li key={i} className="text-[15px] text-mist flex gap-2.5">
                  <span className="text-gold">—</span> {i}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <h2 className="text-[13px] font-semibold text-gold uppercase tracking-[0.1em] mt-12 mb-5">Recommended vehicles</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
              {s.idealVehicles.map((vid) => {
                const v = vehicleById(vid);
                return v ? (
                  <Link key={vid} to={`/fleet/${v.id}`} className="card card-hover block p-5 press">
                    <p className="text-[15px] font-semibold">{v.name}</p>
                    <p className="text-mist text-[13px] mt-1">{v.specs[0].value}</p>
                  </Link>
                ) : null;
              })}
            </div>
          </Reveal>
        </div>

        <aside>
          <Reveal>
            <div className="card p-8">
              <p className="text-[13px] font-semibold text-mist">Investment</p>
              <p className="mt-2">
                <span className="font-display text-5xl text-gold">{formatZAR(s.fromPrice)}</span>
              </p>
              {tier && (
                <p className="text-mist text-[14px] mt-2">
                  {tier.name} tier · {tier.unit}
                  {tier.rangeTo ? ` · typically up to ${formatZAR(tier.rangeTo)}` : ""}
                </p>
              )}
              <div className="flex flex-col gap-3 mt-8">
                <GoldButton to={`/book?service=${s.tierId}`}>Book this service</GoldButton>
                <GhostButton to="/pricing">Full pricing</GhostButton>
              </div>
            </div>
          </Reveal>
        </aside>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-20">
        <p className="text-[13px] font-semibold text-mist mb-5">Other services</p>
        <div className="flex flex-wrap gap-2.5">
          {SERVICES.filter((x) => x.id !== s.id).map((x) => (
            <Link
              key={x.id}
              to={`/services/${x.id}`}
              className="text-[14px] font-medium text-cream/80 bg-white/[0.07] rounded-full px-5 py-2.5 hover:bg-white/[0.12] transition-colors press"
            >
              {x.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
