import { useEffect, useState } from "react";
import type { BookingSeed } from "../App";
import { DRIVERS } from "../data/drivers";
import { TIERS, VEHICLES, formatZAR } from "../data/pricing";
import { waLink } from "../config";

export default function BookingFlow({ seed }: { seed: BookingSeed }) {
  const [tierId, setTierId] = useState<string>("");
  const [vehicleId, setVehicleId] = useState<string>("");
  const [driverId, setDriverId] = useState<string>("any");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (seed.tierId) setTierId(seed.tierId);
    if (seed.vehicleId) setVehicleId(seed.vehicleId);
    if (seed.driverId) setDriverId(seed.driverId);
  }, [seed]);

  const tier = TIERS.find((t) => t.id === tierId);
  const vehicle = VEHICLES.find((v) => v.id === vehicleId);
  const driver = DRIVERS.find((d) => d.id === driverId);
  const estimate = tier ? tier.from + (vehicle?.premium ?? 0) : null;
  const ready = !!tier && !!vehicle && date && pickup && name;

  const message = [
    "🖤 PULSIVEG BOOKING REQUEST",
    "",
    `Service: ${tier?.name ?? "—"} (from ${tier ? formatZAR(tier.from) : "—"})`,
    `Vehicle: ${vehicle?.name ?? "—"}`,
    `Chauffeur: ${driver ? driver.name : "First available"}`,
    `Date: ${date || "—"}  Time: ${time || "TBC"}`,
    `Pickup: ${pickup || "—"}`,
    dropoff ? `Drop-off: ${dropoff}` : "",
    `Name: ${name || "—"}`,
    "",
    `Estimated from: ${estimate ? formatZAR(estimate) : "—"}`,
    "Please confirm availability & final quote.",
  ]
    .filter((l) => l !== "")
    .join("\n");

  const inputCls =
    "w-full bg-ink border border-white/10 px-4 py-3 text-sm text-cream placeholder:text-mist/50 focus:border-gold focus:outline-none transition-colors";

  return (
    <section id="book" className="bg-ink-2 border-y border-white/5">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-24">
        <p className="kicker">
          <span className="gold-line" />
          Book Now
        </p>
        <h2 className="font-display text-4xl sm:text-5xl mt-5">
          Confirmed on WhatsApp <span className="text-gold">in seconds.</span>
        </h2>
        <p className="text-mist max-w-xl mt-5">
          Build your trip below. One tap sends it straight to our booking
          line — you get a human confirmation, not a ticket number.
        </p>

        <div className="mt-12 space-y-10">
          <fieldset>
            <legend className="text-xs tracking-[0.25em] uppercase text-gold mb-4">01 — Service</legend>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {TIERS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTierId(t.id)}
                  className={`p-4 text-left border transition-colors cursor-pointer ${
                    tierId === t.id ? "border-gold bg-ink-3" : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <span className="block text-xs tracking-wider uppercase">{t.name}</span>
                  <span className="block text-gold font-display text-lg mt-1">from {formatZAR(t.from)}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xs tracking-[0.25em] uppercase text-gold mb-4">02 — Vehicle</legend>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              {VEHICLES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVehicleId(v.id)}
                  className={`p-4 text-left border transition-colors cursor-pointer ${
                    vehicleId === v.id ? "border-gold bg-ink-3" : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <span className="block text-sm">{v.name}</span>
                  <span className="block text-mist text-xs mt-1">{v.note}</span>
                  {v.premium > 0 && <span className="block text-gold text-xs mt-1">+{formatZAR(v.premium)}</span>}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xs tracking-[0.25em] uppercase text-gold mb-4">03 — Chauffeur</legend>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={() => setDriverId("any")}
                className={`p-4 text-left border transition-colors cursor-pointer ${
                  driverId === "any" ? "border-gold bg-ink-3" : "border-white/10 hover:border-white/30"
                }`}
              >
                <span className="block text-sm">First available</span>
                <span className="block text-mist text-xs mt-1">We assign our best fit</span>
              </button>
              {DRIVERS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDriverId(d.id)}
                  className={`p-4 text-left border transition-colors cursor-pointer ${
                    driverId === d.id ? "border-gold bg-ink-3" : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <span className="block text-sm">{d.name}</span>
                  <span className="block text-mist text-xs mt-1">
                    ★ {d.rating.toFixed(1)} · {d.speciality}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xs tracking-[0.25em] uppercase text-gold mb-4">04 — Trip details</legend>
            <div className="grid sm:grid-cols-2 gap-3">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} aria-label="Date" />
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputCls} aria-label="Time" />
              <input value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="Pickup address / airport" className={inputCls} />
              <input value={dropoff} onChange={(e) => setDropoff(e.target.value)} placeholder="Drop-off (optional)" className={inputCls} />
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={`${inputCls} sm:col-span-2`} />
            </div>
          </fieldset>
        </div>

        <div className="mt-12 border border-gold/40 bg-ink p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex-1">
            <p className="text-xs tracking-[0.25em] uppercase text-mist">Your trip</p>
            <p className="font-display text-2xl mt-2">
              {tier ? tier.name : "Select a service"}
              {vehicle ? ` · ${vehicle.name}` : ""}
            </p>
            <p className="text-mist text-sm mt-1">
              {driver ? `Chauffeur ${driver.name}` : "First available chauffeur"}
              {estimate ? ` · estimated from ${formatZAR(estimate)}` : ""}
            </p>
          </div>
          <a
            href={ready ? waLink(message) : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!ready}
            className={`text-center text-xs tracking-[0.25em] uppercase font-semibold px-8 py-4 transition-colors ${
              ready
                ? "bg-gold text-ink hover:bg-gold-soft cursor-pointer"
                : "bg-white/10 text-mist cursor-not-allowed pointer-events-none"
            }`}
          >
            Confirm on WhatsApp →
          </a>
        </div>
        {!ready && (
          <p className="text-[12px] text-mist/70 mt-3">
            Select a service, vehicle, date, pickup and your name to unlock instant confirmation.
          </p>
        )}
      </div>
    </section>
  );
}
