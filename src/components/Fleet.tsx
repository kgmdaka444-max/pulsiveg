import interiorImg from "../assets/interior.jpg";
import stariaImg from "../assets/staria.jpg";
import airportImg from "../assets/airport.jpg";
import weddingImg from "../assets/wedding.jpg";

const CARDS = [
  { vehicleId: "vclass", img: interiorImg, title: "Mercedes V-Class", sub: "The flagship. Six VIP seats, executive cabin." },
  { vehicleId: "staria", img: stariaImg, title: "Hyundai Staria", sub: "The signature shuttle. Seven seats, presence." },
  { vehicleId: "bmw7", img: airportImg, title: "BMW Executive Sedans", sub: "7 & 5 Series. Statement arrivals, discreet exits." },
  { vehicleId: "h1", img: weddingImg, title: "Hyundai H1", sub: "Group logistics. Eight seats plus luggage." },
];

export default function Fleet({ onPick }: { onPick: (vehicleId: string) => void }) {
  return (
    <section id="fleet" className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
      <p className="kicker">
        <span className="gold-line" />
        The Fleet
      </p>
      <h2 className="font-display text-4xl sm:text-5xl mt-5 max-w-2xl">
        Every vehicle, showroom-ready. <span className="text-gold">Every trip.</span>
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
        {CARDS.map((c) => (
          <button
            key={c.vehicleId}
            onClick={() => onPick(c.vehicleId)}
            className="group relative text-left aspect-[3/4] overflow-hidden bg-ink-2 cursor-pointer"
          >
            <img
              src={c.img}
              alt={c.title}
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="absolute bottom-0 p-5">
              <h3 className="font-display text-xl">{c.title}</h3>
              <p className="text-mist text-sm mt-1">{c.sub}</p>
              <p className="text-gold text-[11px] tracking-[0.25em] uppercase mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                Book this vehicle →
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
