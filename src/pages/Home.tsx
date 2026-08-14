import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import DriversPortal from "../components/DriversPortal";
import LeadMagnet from "../components/LeadMagnet";
import FaqAccordion from "../components/FaqAccordion";
import { Reveal, SectionHead, StatsBar, TrustStrip, GoldButton, GhostButton } from "../components/ui";
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
  { n: "1", title: "Build your trip", body: "Service, vehicle, chauffeur, details — under 60 seconds in the quote flow." },
  { n: "2", title: "Instant quote", body: "A line-item quote generated on the spot from published rates. No callbacks, no waiting." },
  { n: "3", title: "Accept & secure", body: "One tap reserves it on WhatsApp and locks your price. Pay the deposit and it's done." },
  { n: "4", title: "We arrive", body: "Your chauffeur arrives early, greets you by name, and the journey runs exactly as agreed." },
];

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />

      {/* WHY */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-28">
        <SectionHead
          kicker="Why PulsiveG"
          title={
            <>
              Built for the <span className="text-gold">exceptionally demanding.</span>
            </>
          }
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 70} className="h-full">
              <article className="card card-hover p-7 h-full">
                <p className="text-[12px] font-semibold text-gold uppercase tracking-[0.1em]">{p.kicker}</p>
                <h3 className="font-display text-2xl mt-3">{p.title}</h3>
                <p className="text-mist text-[15px] mt-3 leading-relaxed">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <StatsBar />
        </Reveal>
      </section>

      {/* FLEET PREVIEW */}
      <section className="band py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHead
            kicker="The Fleet"
            title={
              <>
                Engineered for <span className="text-gold">every occasion.</span>
              </>
            }
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
            {VEHICLES.slice(0, 4).map((v, i) => (
              <Reveal key={v.id} delay={i * 70}>
                <Link to={`/fleet/${v.id}`} className="group relative block aspect-[3/4] overflow-hidden rounded-3xl press">
                  <img
                    src={v.img}
                    alt={v.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700"
                    style={{ transitionTimingFunction: "var(--ease-fluid)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <h3 className="font-display text-xl">{v.name}</h3>
                    <p className="text-mist text-[14px] mt-1">{v.tagline}</p>
                    <p className="link-gold text-[13px] mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View specifications →
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-12">
            <GhostButton to="/fleet">View the full fleet</GhostButton>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-28">
        <SectionHead
          kicker="Services"
          title={
            <>
              Every journey, <span className="text-gold">handled perfectly.</span>
            </>
          }
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 60} className="h-full">
              <Link to={`/services/${s.id}`} className="card card-hover group block p-7 h-full press">
                <h3 className="font-display text-2xl">{s.name}</h3>
                <p className="text-cream/60 text-[15px] mt-1">{s.strap}</p>
                <p className="text-mist text-[15px] mt-4 leading-relaxed line-clamp-3">{s.description}</p>
                <p className="flex items-baseline justify-between mt-6">
                  <span className="link-gold text-[14px]">Details →</span>
                  <span className="text-mist text-[13px]">
                    from <span className="text-cream font-medium">{formatZAR(s.fromPrice)}</span>
                  </span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CHAUFFEURS PREVIEW */}
      <section className="band py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHead
            kicker="The Chauffeur Portal"
            title={
              <>
                Don&apos;t book a car. <span className="text-gold">Choose your chauffeur.</span>
              </>
            }
          />
          <div className="mt-14">
            <DriversPortal limit={3} />
          </div>
          <Reveal className="text-center mt-12">
            <GhostButton to="/chauffeurs">Meet all six</GhostButton>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-28">
        <SectionHead
          kicker="How it works"
          title={
            <>
              Seamless, from first tap <span className="text-gold">to arrival.</span>
            </>
          }
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 70} className="h-full">
              <div className="card p-7 h-full">
                <p className="font-display text-5xl text-gold/35">{s.n}</p>
                <h3 className="text-[17px] font-semibold mt-4">{s.title}</h3>
                <p className="text-mist text-[15px] mt-2.5 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-12">
          <GoldButton to="/book">Get your instant quote</GoldButton>
        </Reveal>
      </section>

      {/* EXPERIENCE TRIO */}
      <section className="band py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHead
            kicker="The PulsiveG Experience"
            title={
              <>
                We don&apos;t simply drive you. <span className="text-gold">We elevate every journey.</span>
              </>
            }
          />
          <div className="grid lg:grid-cols-3 gap-4 mt-14">
            <Reveal className="h-full">
              <article className="card card-hover p-8 h-full ring-1 ring-gold/40">
                <p className="text-[12px] font-semibold text-gold uppercase tracking-[0.1em]">Elite Membership</p>
                <p className="text-mist text-[15px] mt-4 leading-relaxed">
                  Priority bookings, preferential transfer rates, monthly billing and your
                  preferred chauffeur on standing request. Launching with our corporate desk.
                </p>
                <Link to="/corporate" className="link-gold inline-block mt-6 text-[14px]">
                  Explore Elite →
                </Link>
              </article>
            </Reveal>
            <Reveal delay={70} className="h-full">
              <article className="card card-hover p-8 h-full">
                <p className="text-[12px] font-semibold text-gold uppercase tracking-[0.1em]">Referral Programme</p>
                <p className="text-mist text-[15px] mt-4 leading-relaxed">
                  Introduce a friend or colleague to PulsiveG — you earn travel credit on their
                  first completed journey, and they arrive with a welcome discount.
                </p>
                <a
                  href={waLink("Hi PulsiveG, I'd like to refer someone to your service.")}
                  target="_blank"
                  rel="noreferrer"
                  className="link-gold inline-block mt-6 text-[14px]"
                >
                  Refer & earn →
                </a>
              </article>
            </Reveal>
            <Reveal delay={140} className="h-full">
              <article className="card card-hover p-8 h-full">
                <p className="text-[12px] font-semibold text-gold uppercase tracking-[0.1em]">Uncompromised Safety</p>
                <p className="text-mist text-[15px] mt-4 leading-relaxed">
                  Vetted professional chauffeurs, multi-point vehicle inspections, comprehensive
                  commercial insurance and a 24/7 fleet desk behind every journey.
                </p>
                <Link to="/why-us" className="link-gold inline-block mt-6 text-[14px]">
                  Our standards →
                </Link>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="max-w-3xl mx-auto px-5 sm:px-8 py-28">
        <SectionHead kicker="FAQ" title="Frequently asked questions" />
        <div className="mt-12">
          <FaqAccordion limit={4} />
        </div>
        <Reveal className="text-center mt-10">
          <Link to="/why-us#faq" className="link-gold text-[15px]">
            All questions →
          </Link>
        </Reveal>
      </section>

      <LeadMagnet />
    </>
  );
}
