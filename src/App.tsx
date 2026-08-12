import { useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Fleet from "./components/Fleet";
import DriversPortal from "./components/DriversPortal";
import PricingSection from "./components/PricingSection";
import BookingFlow from "./components/BookingFlow";
import LeadMagnet from "./components/LeadMagnet";
import Footer from "./components/Footer";
import WhatsAppFab from "./components/WhatsAppFab";

export interface BookingSeed {
  tierId?: string;
  driverId?: string;
  vehicleId?: string;
}

export default function App() {
  const [seed, setSeed] = useState<BookingSeed>({});

  const startBooking = (s: BookingSeed) => {
    setSeed((prev) => ({ ...prev, ...s }));
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Nav />
      <main>
        <Hero onBook={() => startBooking({})} />
        <Fleet onPick={(vehicleId) => startBooking({ vehicleId })} />
        <DriversPortal onPick={(driverId) => startBooking({ driverId })} />
        <PricingSection onPick={(tierId) => startBooking({ tierId })} />
        <BookingFlow seed={seed} />
        <LeadMagnet />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
