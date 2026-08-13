import { PageHeader, GoldButton } from "../components/ui";
import { waLink, BUSINESS } from "../config";
import { formatZAR } from "../data/pricing";

const BENEFITS = [
  { title: "10 chauffeur-days / month", body: "An effective day rate ~20% below rack — predictable movement for your executives, priced for utilisation." },
  { title: "Priority dispatch, 24/7", body: "Retainer clients jump the queue. Late flight, early boardroom — the fleet desk holds your slot." },
  { title: "Dedicated account manager", body: "One person who knows your travellers, your preferences and your billing entity." },
  { title: "Consolidated monthly billing", body: "One tax invoice, cost-centre references included. No expense-claim archaeology." },
  { title: "Preferred chauffeur, guaranteed", body: "Your executives get the professional they trust — every time, contractually." },
  { title: "Recurring schedules", body: "Daily commutes, weekly shuttles, roadshow blocks — set once, runs like clockwork." },
];

export default function CorporatePage() {
  return (
    <>
      <PageHeader
        kicker="Corporate & Elite"
        title={
          <>
            A fleet desk for your company. <span className="text-gold">One invoice.</span>
          </>
        }
        sub={`The corporate retainer from ${formatZAR(48000)}/month — built for firms that move people weekly and refuse surprises.`}
      />
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BENEFITS.map((b) => (
            <article key={b.title} className="border border-white/10 bg-ink-2 p-7">
              <h2 className="font-display text-xl">{b.title}</h2>
              <p className="text-mist text-sm mt-3 leading-relaxed">{b.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 border border-gold/40 bg-ink-2 p-8 sm:p-12 flex flex-col sm:flex-row sm:items-center gap-8">
          <div className="flex-1">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold">Open a corporate account</p>
            <h2 className="font-display text-3xl mt-3">Speak to the fleet desk today.</h2>
            <p className="text-mist text-sm mt-3 max-w-lg">
              Tell us your monthly movement and we'll structure a retainer around it —
              or start with ad-hoc bookings on account and upgrade when the volume justifies it.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={waLink(`Hi ${BUSINESS.name}, I'd like to open a corporate account. Company: ___  Est. trips/month: ___`)}
              target="_blank"
              rel="noreferrer"
              className="bg-gold text-ink text-center text-xs tracking-[0.25em] uppercase font-semibold px-8 py-4 hover:bg-gold-soft transition-colors"
            >
              Enquire on WhatsApp
            </a>
            <a
              href={`mailto:${BUSINESS.email}?subject=Corporate account enquiry`}
              className="border border-gold/60 text-gold text-center text-xs tracking-[0.25em] uppercase px-8 py-4 hover:bg-gold hover:text-ink transition-colors"
            >
              Email the desk
            </a>
          </div>
        </div>

        <div className="mt-14">
          <GoldButton to="/pricing">See all pricing tiers →</GoldButton>
        </div>
      </section>
    </>
  );
}
