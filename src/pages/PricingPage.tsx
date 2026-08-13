import { PageHeader } from "../components/ui";
import PricingSection from "../components/PricingSection";

export default function PricingPage() {
  return (
    <>
      <PageHeader
        kicker="Investment"
        title={
          <>
            Locked rates. <span className="text-gold">No surprises at the drop-off.</span>
          </>
        }
        sub="Premium service, priced like it. Every booking starts from a locked base — you know the number before the car moves."
      />
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <PricingSection />
      </section>
    </>
  );
}
