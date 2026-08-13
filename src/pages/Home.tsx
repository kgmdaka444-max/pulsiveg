import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import DriversPortal from "../components/DriversPortal";
import LeadMagnet from "../components/LeadMagnet";
import FaqAccordion from "../components/FaqAccordion";
import { Kicker, StatsBar, TrustStrip, GoldButton, GhostButton } from "../components/ui";
import { VEHICLES } from "../data/vehicles";
import { SERVICES } from "../data/services";
import { formatZAR } from "../data/pricing";
import { waLink } from "../config";

const PILLARS = [
  {
    title: "Zero compromise",
    kicker: "Safety & discretion",
    body: "Every chauffeur is PrDP-licensed, vetted and trained in executive protocol. Every vehicle is inspected before dispatch.",
  },
  {
    title: "Always on time",
    kicker: "24/7 fleet desk",
    body: "We track your flight, monitor traffic and adjust in real time — so you never wait, and you're never late.",
  },
  {
    title: "Locked rates",
    kicker: "No surprises",
    body: "You know the number before the car moves. Base rates lock at booking; overages are published, not improvised.",
  },
  {
    title: "Your chauffeur",
    kicker: "The portal",
    body: "Don't book a car — choose the professional. Pick your chauffeur by rating, speciality and language.",
  },
];

const STEPS = [
  { n: "1", title: "Build your trip", body: "Service, vehicle, chauffeur, details — under 60 seconds in the booking flow." },
  { n: "2", title: "One tap to WhatsApp", body: "Your structured request lands directly with the fleet desk. No forms lost to inboxes." },
  { n: "3", title: "Human confirmation", body: "A real person confirms availability and your locked rate in minutes — not a ticket number." },
  { n: "4", title: "We arrive", body: "Your chauffeur arrives early, greets you by name, and the journey runs exactly as agreed." },
];

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />

      {/* WHY */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
        <Kicker>Why PulsiveG</Kicker>
        <h2 className="font-display text-4xl sm:text-5xl mt-5 max-w-2xl">
          Built for the <span className="text-gold">exceptionally demanding.</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {PILLARS.map((p) => (
            <article key={p.title} className="border border-white/10 bg-ink-2 p-7">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold">{p.kicker}</p>
              <h3 className="font-display text-2xl mt-3">{p.title}</h3>
              <p className="text-mist text-sm mt-4 leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <StatsBar />
        </div>
      </section>

      {/* FLEET PREVIEW */}
      <section className="bg-ink-2 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker>The Fleet</Kicker>
              <h2 className="font-display text-4xl sm:text-5xl mt-5">
                Engineered for <span className="text-gold">every occasion.</span>
              </h2>
            </div>
            <GhostButton to="/fleet">View full fleet</GhostButton>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
            {VEHICLES.slice(0, 4).map((v) => (
              <Link key={v.id} to={`/fleet/${v.id}`} className="group relative aspect-[3/4] overflow-hidden bg-ink">
                <img
                  src={v.img}
                  alt={v.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute bottom-0 p-5">
                  <h3 className="font-display text-xl">{v.name}</h3>
                  <p className="text-mist text-sm mt-1">{v.tagline}</p>
                  <p className="text-gold text-[11px] tracking-[0.25em] uppercase mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    View specifications →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Kicker>Services</Kicker>
            <h2 className="font-display text-4xl sm:text-5xl mt-5">
              Every journey, <span className="text-gold">handled perfectly.</span>
            </h2>
          </div>
          <GhostButton to="/services">All services</GhostButton>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {SERVICES.map((s) => (
            <Link key={s.id} to={`/services/${s.id}`} className="group border border-white/10 bg-ink-2 p-7 hover:border-gold/40 transition-colors">
              <h3 className="font-display text-2xl">{s.name}</h3>
              <p className="font-display italic text-cream/70 mt-1">{s.strap}</p>
              <p className="text-mist text-sm mt-4 leading-relaxed line-clamp-3">{s.description}</p>
              <p className="flex items-baseline justify-between mt-6">
                <span className="text-gold text-[11px] tracking-[0.25em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                  Details →
                </span>
                <span className="text-mist text-xs">from <span className="text-cream">{formatZAR(s.fromPrice)}</span></span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CHAUFFEURS PREVIEW */}
      <section className="bg-ink-2 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <Kicker>The Chauffeur Portal</Kicker>
              <h2 className="font-display text-4xl sm:text-5xl mt-5 max-w-xl">
                Don&apos;t book a car. <span className="text-gold">Choose your chauffeur.</span>
              </h2>
            </div>
            <GhostButton to="/chauffeurs">Meet all six</GhostButton>
          </div>
          <DriversPortal limit={3} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
        <Kicker>How it works</Kicker>
        <h2 className="font-display text-4xl sm:text-5xl mt-5 max-w-2xl">
          Seamless, from first tap <span className="text-gold">to arrival.</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {STEPS.map((s) => (
            <div key={s.n} className="border border-white/10 p-7">
              <p className="font-display text-5xl text-gold/40">{s.n}</p>
              <h3 className="font-display text-xl mt-4">{s.title}</h3>
              <p className="text-mist text-sm mt-3 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <GoldButton to="/book">Start your booking →</GoldButton>
        </div>
      </section>

      {/* EXPERIENCE TRIO */}
      <section className="bg-ink-2 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
          <Kicker>The PulsiveG Experience</Kicker>
          <h2 className="font-display text-4xl sm:text-5xl mt-5 max-w-2xl">
            We don&apos;t simply drive you. <span className="text-gold">We elevate every journey.</span>
          </h2>
          <div className="grid lg:grid-cols-3 gap-4 mt-14">
            <article className="border border-gold/30 bg-ink p-8">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold">Elite Membership</p>
              <p className="text-mist text-sm mt-4 leading-relaxed">
                Priority bookings, preferential transfer rates, monthly billing and your
                preferred chauffeur on standing request. Launching with our corporate desk.
              </p>
              <Link to="/corporate" className="inline-block text-gold text-[11px] tracking-[0.25em] uppercase mt-6 hover:text-gold-soft">
                Explore Elite →
              </Link>
            </article>
            <article className="border border-white/10 bg-ink p-8">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold">Referral Programme</p>
              <p className="text-mist text-sm mt-4 leading-relaxed">
                Introduce a friend or colleague to PulsiveG — you earn travel credit on their
                first completed journey, and they arrive with a welcome discount.
              </p>
              <a
                href={waLink("Hi PulsiveG, I'd like to refer someone to your service.")}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-gold text-[11px] tracking-[0.25em] uppercase mt-6 hover:text-gold-soft"
              >
                Refer & earn →
              </a>
            </article>
            <article className="border border-white/10 bg-ink p-8">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold">Uncompromised Safety</p>
              <p className="text-mist text-sm mt-4 leading-relaxed">
                Vetted professional chauffeurs, multi-point vehicle inspections, comprehensive
                commercial insurance and a 24/7 fleet desk behind every journey.
              </p>
              <Link to="/why-us" className="inline-block text-gold text-[11px] tracking-[0.25em] uppercase mt-6 hover:text-gold-soft">
                Our standards →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 py-24">
        <Kicker>FAQ</Kicker>
        <h2 className="font-display text-4xl sm:text-5xl mt-5">Frequently asked questions</h2>
        <div className="mt-12">
          <FaqAccordion limit={4} />
        </div>
        <Link to="/why-us#faq" className="inline-block text-gold text-[11px] tracking-[0.25em] uppercase mt-8 hover:text-gold-soft">
          All questions →
        </Link>
      </section>

      <LeadMagnet />
    </>
  );
}
