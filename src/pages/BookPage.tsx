import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Kicker } from "../components/ui";
import { DRIVERS } from "../data/drivers";
import { TIERS, formatZAR } from "../data/pricing";
import { VEHICLES } from "../data/vehicles";
import { waLink, PHONE_DISPLAY } from "../config";

const STEPS = ["Service", "Vehicle", "Chauffeur", "Details", "Review"] as const;

interface Details {
  date: string;
  time: string;
  pickup: string;
  dropoff: string;
  name: string;
  passengers: string;
  notes: string;
}

const EMPTY_DETAILS: Details = { date: "", time: "", pickup: "", dropoff: "", name: "", passengers: "", notes: "" };

export default function BookPage() {
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [tierId, setTierId] = useState(params.get("service") ?? "");
  const [vehicleId, setVehicleId] = useState(params.get("vehicle") ?? "");
  const [driverId, setDriverId] = useState(params.get("driver") ?? "any");
  const [d, setD] = useState<Details>(EMPTY_DETAILS);

  const tier = TIERS.find((t) => t.id === tierId);
  const vehicle = VEHICLES.find((v) => v.id === vehicleId);
  const driver = DRIVERS.find((x) => x.id === driverId);
  const estimate = tier ? tier.from + (vehicle?.premium ?? 0) : null;

  const stepValid = [!!tier, !!vehicle, true, !!(d.date && d.pickup && d.name), true][step];

  const message = useMemo(
    () =>
      [
        "🖤 PULSIVEG BOOKING REQUEST",
        "",
        `Service: ${tier?.name ?? "—"} (from ${tier ? formatZAR(tier.from) : "—"})`,
        `Vehicle: ${vehicle?.name ?? "—"}`,
        `Chauffeur: ${driver ? driver.name : "First available"}`,
        `Date: ${d.date || "—"}  Time: ${d.time || "TBC"}`,
        `Passengers: ${d.passengers || "TBC"}`,
        `Pickup: ${d.pickup || "—"}`,
        d.dropoff ? `Drop-off: ${d.dropoff}` : "",
        d.notes ? `Notes: ${d.notes}` : "",
        `Name: ${d.name || "—"}`,
        "",
        `Estimated from: ${estimate ? formatZAR(estimate) : "—"}`,
        "Please confirm availability & final quote.",
      ]
        .filter((l) => l !== "")
        .join("\n"),
    [tier, vehicle, driver, d, estimate]
  );

  const inputCls =
    "w-full bg-ink border border-white/10 px-4 py-3 text-sm text-cream placeholder:text-mist/50 focus:border-gold focus:outline-none transition-colors";
  const cardCls = (active: boolean) =>
    `p-4 text-left border transition-colors cursor-pointer ${active ? "border-gold bg-ink-3" : "border-white/10 hover:border-white/30"}`;

  const set = (k: keyof Details) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setD((prev) => ({ ...prev, [k]: e.target.value }));

  return (
    <>
      <div className="bg-ink-2 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-32 pb-12 text-center">
          <Kicker>Reservation</Kicker>
          <h1 className="font-display text-4xl sm:text-6xl mt-5">
            Book your <span className="text-gold">journey.</span>
          </h1>
          <p className="text-mist mt-4">
            Five quick steps — then one tap confirms it on WhatsApp with a human, in seconds.
          </p>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-12">
        <ol className="flex items-center">
          {STEPS.map((s, i) => (
            <li key={s} className={`flex items-center ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex flex-col items-center gap-2 ${i < step ? "cursor-pointer" : "cursor-default"}`}
              >
                <span
                  className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm transition-colors ${
                    i === step
                      ? "border-gold text-gold"
                      : i < step
                        ? "bg-gold border-gold text-ink font-semibold"
                        : "border-white/20 text-mist"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </span>
                <span className={`text-[10px] tracking-[0.2em] uppercase ${i === step ? "text-gold" : "text-mist"}`}>{s}</span>
              </button>
              {i < STEPS.length - 1 && <span className={`flex-1 h-px mx-2 mb-6 ${i < step ? "bg-gold" : "bg-white/15"}`} />}
            </li>
          ))}
        </ol>
      </div>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-12 pb-24">
        <div className="border border-white/10 bg-ink-2 p-6 sm:p-10 min-h-96">
          {step === 0 && (
            <>
              <h2 className="font-display text-3xl">Select your service</h2>
              <p className="text-mist text-sm mt-2">Each experience is tailored to the journey.</p>
              <div className="grid sm:grid-cols-2 gap-3 mt-8">
                {TIERS.map((t) => (
                  <button key={t.id} onClick={() => setTierId(t.id)} className={cardCls(tierId === t.id)}>
                    <span className="flex items-baseline justify-between">
                      <span className="text-sm tracking-wider uppercase">{t.name}</span>
                      <span className="text-gold font-display">from {formatZAR(t.from)}</span>
                    </span>
                    <span className="block font-display italic text-cream/70 mt-2">{t.strap}</span>
                    <span className="block text-mist text-xs mt-2">{t.includes[0]} · {t.unit}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="font-display text-3xl">Choose your vehicle</h2>
              <p className="text-mist text-sm mt-2">Every vehicle dispatched in showroom condition.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
                {VEHICLES.map((v) => (
                  <button key={v.id} onClick={() => setVehicleId(v.id)} className={`${cardCls(vehicleId === v.id)} overflow-hidden !p-0`}>
                    <span className="block relative aspect-video overflow-hidden">
                      <img src={v.img} alt={v.name} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                    </span>
                    <span className="block p-4">
                      <span className="block text-sm">{v.name}</span>
                      <span className="block text-mist text-xs mt-1">
                        {v.specs[0].value} · {v.specs[1].value}
                      </span>
                      {v.premium > 0 && <span className="block text-gold text-xs mt-1">+{formatZAR(v.premium)}</span>}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-display text-3xl">Pick your chauffeur</h2>
              <p className="text-mist text-sm mt-2">Optional — "first available" guarantees our best fit on the day.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
                <button onClick={() => setDriverId("any")} className={cardCls(driverId === "any")}>
                  <span className="block text-sm">First available</span>
                  <span className="block text-mist text-xs mt-1">We assign our best fit</span>
                </button>
                {DRIVERS.map((x) => (
                  <button key={x.id} onClick={() => setDriverId(x.id)} className={cardCls(driverId === x.id)}>
                    <span className="block text-sm">{x.name}</span>
                    <span className="block text-mist text-xs mt-1">
                      ★ {x.rating.toFixed(1)} · {x.speciality}
                    </span>
                    <span className="block text-mist/70 text-xs mt-1">{x.vehicle}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="font-display text-3xl">Journey details</h2>
              <p className="text-mist text-sm mt-2">Date, pickup and your name unlock the instant confirmation.</p>
              <div className="grid sm:grid-cols-2 gap-3 mt-8">
                <label className="block">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-mist block mb-1.5">Date *</span>
                  <input type="date" value={d.date} onChange={set("date")} className={inputCls} />
                </label>
                <label className="block">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-mist block mb-1.5">Time</span>
                  <input type="time" value={d.time} onChange={set("time")} className={inputCls} />
                </label>
                <label className="block">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-mist block mb-1.5">Pickup *</span>
                  <input value={d.pickup} onChange={set("pickup")} placeholder="Address / airport / hotel" className={inputCls} />
                </label>
                <label className="block">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-mist block mb-1.5">Drop-off</span>
                  <input value={d.dropoff} onChange={set("dropoff")} placeholder="Optional" className={inputCls} />
                </label>
                <label className="block">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-mist block mb-1.5">Your name *</span>
                  <input value={d.name} onChange={set("name")} placeholder="Full name" className={inputCls} />
                </label>
                <label className="block">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-mist block mb-1.5">Passengers</span>
                  <input value={d.passengers} onChange={set("passengers")} placeholder="e.g. 4" inputMode="numeric" className={inputCls} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-mist block mb-1.5">Notes</span>
                  <textarea value={d.notes} onChange={set("notes")} placeholder="Child seat, multiple stops, flight number…" rows={3} className={inputCls} />
                </label>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="font-display text-3xl">Review your journey</h2>
              <p className="text-mist text-sm mt-2">Everything below lands with the fleet desk exactly as shown.</p>
              <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {[
                  ["Service", `${tier?.name} — from ${tier ? formatZAR(tier.from) : ""} ${tier?.unit ?? ""}`],
                  ["Vehicle", `${vehicle?.name}${vehicle && vehicle.premium > 0 ? ` (+${formatZAR(vehicle.premium)})` : ""}`],
                  ["Chauffeur", driver ? `${driver.name} — ★ ${driver.rating.toFixed(1)}, ${driver.speciality}` : "First available"],
                  ["Date & time", `${d.date}${d.time ? ` at ${d.time}` : " — time TBC"}`],
                  ["Pickup", d.pickup],
                  ["Drop-off", d.dropoff || "—"],
                  ["Passengers", d.passengers || "TBC"],
                  ["Notes", d.notes || "—"],
                  ["Booked by", d.name],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-6 py-3.5">
                    <dt className="w-32 shrink-0 text-[10px] tracking-[0.2em] uppercase text-mist pt-0.5">{k}</dt>
                    <dd className="text-sm text-cream/90">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap items-center justify-between gap-6 mt-8 border border-gold/40 bg-ink p-6">
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-mist">Estimated from</p>
                  <p className="font-display text-4xl text-gold mt-1">{estimate ? formatZAR(estimate) : "—"}</p>
                  <p className="text-mist text-xs mt-1">Final locked quote confirmed on WhatsApp before dispatch.</p>
                </div>
                <a
                  href={waLink(message)}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gold text-ink text-xs tracking-[0.25em] uppercase font-semibold px-10 py-5 hover:bg-gold-soft transition-colors"
                >
                  Confirm on WhatsApp →
                </a>
              </div>
              <p className="text-mist/70 text-xs mt-4">
                Prefer to talk? Call the fleet desk on {PHONE_DISPLAY} — 24/7.
              </p>
            </>
          )}
        </div>

        {/* NAV BUTTONS */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className={`text-xs tracking-[0.25em] uppercase px-8 py-4 border transition-colors ${
              step === 0 ? "border-white/10 text-mist/40 cursor-not-allowed" : "border-white/30 text-cream hover:border-gold hover:text-gold cursor-pointer"
            }`}
          >
            ← Back
          </button>
          {step < STEPS.length - 1 && (
            <button
              onClick={() => stepValid && setStep((s) => s + 1)}
              disabled={!stepValid}
              className={`text-xs tracking-[0.25em] uppercase font-semibold px-10 py-4 transition-colors ${
                stepValid ? "bg-gold text-ink hover:bg-gold-soft cursor-pointer" : "bg-white/10 text-mist cursor-not-allowed"
              }`}
            >
              Continue →
            </button>
          )}
        </div>
        {!stepValid && step === 3 && (
          <p className="text-[12px] text-mist/70 mt-3 text-right">Date, pickup and your name are required.</p>
        )}
      </section>
    </>
  );
}
