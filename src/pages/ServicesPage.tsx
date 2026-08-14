import { Link } from "react-router-dom";
import { PageHeader, Reveal } from "../components/ui";
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
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 70}>
              <Link to={`/services/${s.id}`} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl press">
                <img
                  src={s.img}
                  alt={s.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:opacity-90 group-hover:scale-[1.04] transition-all duration-700"
                  style={{ transitionTimingFunction: "var(--ease-fluid)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <h2 className="font-display text-2xl">{s.name}</h2>
                  <p className="text-cream/60 text-[15px] mt-1">{s.strap}</p>
                  <p className="text-mist text-[13px] mt-3">
                    from <span className="text-gold font-medium">{formatZAR(s.fromPrice)}</span>
                  </p>
                  <p className="link-gold text-[13px] mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Details →
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
