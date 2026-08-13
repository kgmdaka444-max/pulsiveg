import { PageHeader } from "../components/ui";
import DriversPortal from "../components/DriversPortal";

export default function ChauffeursPage() {
  return (
    <>
      <PageHeader
        kicker="The Chauffeur Portal"
        title={
          <>
            Don&apos;t book a car. <span className="text-gold">Choose your chauffeur.</span>
          </>
        }
        sub="Every PulsiveG chauffeur is PrDP-licensed, vetted and trained in executive protocol. Pick the professional who fits your trip — they'll greet you by name."
      />
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <DriversPortal />
        <p className="text-[12px] text-mist/70 mt-10">
          Preferred chauffeurs are guaranteed for corporate retainer clients and honoured
          for all bookings subject to availability.
        </p>
      </section>
    </>
  );
}
