import { PageHeader, Kicker, StatsBar, GoldButton } from "../components/ui";
import FaqAccordion from "../components/FaqAccordion";

const STANDARDS = [
  {
    title: "Chauffeur vetting",
    body: "PrDP professional permits, criminal and driving-record checks, defensive-driving certification and executive protocol training — before a chauffeur ever wears the PulsiveG name.",
  },
  {
    title: "Vehicle inspections",
    body: "Multi-point inspection and valet before every dispatch. Showroom condition is a requirement, not a courtesy.",
  },
  {
    title: "Insurance & compliance",
    body: "Comprehensive commercial passenger-liability insurance on every vehicle, with operating licences current and auditable.",
  },
  {
    title: "24/7 fleet desk",
    body: "A human answers — day, night, public holiday. Flight tracking, live traffic monitoring and proactive re-routing on every airport job.",
  },
];

export default function WhyUsPage() {
  return (
    <>
      <PageHeader
        kicker="Why PulsiveG"
        title={
          <>
            The standard is the <span className="text-gold">whole product.</span>
          </>
        }
        sub="Luxury clients book on trust. These are the standards that earn it — published, not promised."
      />
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <StatsBar />
        <div className="grid sm:grid-cols-2 gap-4 mt-14">
          {STANDARDS.map((s) => (
            <article key={s.title} className="border border-white/10 bg-ink-2 p-8">
              <h2 className="font-display text-2xl">{s.title}</h2>
              <p className="text-mist text-sm mt-4 leading-relaxed">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="max-w-4xl mx-auto px-5 sm:px-8 pb-24">
        <Kicker>FAQ</Kicker>
        <h2 className="font-display text-4xl sm:text-5xl mt-5">Frequently asked questions</h2>
        <div className="mt-12">
          <FaqAccordion />
        </div>
        <div className="mt-12">
          <GoldButton to="/book">Book your chauffeur →</GoldButton>
        </div>
      </section>
    </>
  );
}
