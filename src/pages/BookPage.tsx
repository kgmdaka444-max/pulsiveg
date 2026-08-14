import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Kicker } from "../components/ui";
import { DRIVERS } from "../data/drivers";
import { TIERS, formatZAR } from "../data/pricing";
import { VEHICLES } from "../data/vehicles";
import { computeQuote, isInstantQuotable, INCLUSIONS, DEPOSIT_PCT } from "../data/quote";
import { waLink, PHONE_DISPLAY, DEPOSIT_LINK } from "../config";

const STEPS = ["Service", "Vehicle", "Chauffeur", "Details", "Quote"] as const;

interface Details {
  date: string;
  time: string;
  pickup: string;
  dropoff: string;
  name: string;
  phone: string;
  passengers: string;
  notes: string;
}

const EMPTY_DETAILS: Details = { date: "", time: "", pickup: "", dropoff: "", name: "", phone: "", passengers: "", notes: "" };

export default function BookPage() {
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [tierId, setTierId] = useState(params.get("service") ?? "");
  const [vehicleId, setVehicleId] = useState(params.get("vehicle") ?? "");
  const [driverId, setDriverId] = useState(params.get("driver") ?? "any");
  const [d, setD] = useState<Details>(EMPTY_DETAILS);
  const [hours, setHours] = useState(0); // 0 = use tier inclusion
  const [km, setKm] = useState(0);

  const tier = TIERS.find((t) => t.id === tierId);
  const vehicle = VEHICLES.find((v) => v.id === vehicleId);
  const driver = DRIVERS.find((x) => x.id === driverId);
  const quotable = isInstantQuotable(tierId);
  const inc = INCLUSIONS[tierId];

  const ref = useMemo(() => "PG-" + Math.random().toString(36).slice(2, 6).toUpperCase(), []);

  const quote = useMemo(() => {
    if (!quotable || !tier) return null;
    const q = computeQuote({
      tierId,
      vehiclePremium: vehicle?.premium ?? 0,
      date: d.date,
      time: d.time,
      hours: hours || inc.hours,
      km: km || inc.km,
    });
    return q ? { ...q, ref } : null;
  }, [quotable, tier, tierId, vehicle, d.date, d.time, hours, km, inc, ref]);

  const stepValid = [!!tier, !!vehicle, true, !!(d.date && d.pickup && d.name && d.phone), true][step];

  const tripLines = [
    `Service: ${tier?.name ?? "—"}`,
    `Vehicle: ${vehicle?.name ?? "—"}`,
    `Chauffeur: ${driver ? driver.name : "First available"}`,
    `Date: ${d.date || "—"}  Time: ${d.time || "TBC"}`,
    `Passengers: ${d.passengers || "TBC"}`,
    `Pickup: ${d.pickup || "—"}`,
    d.dropoff ? `Drop-off: ${d.dropoff}` : "",
    d.notes ? `Notes: ${d.notes}` : "",
    `Client: ${d.name}  ·  ${d.phone}`,
  ].filter(Boolean);

  const acceptMessage = quote
    ? [
        `🖤 PULSIVEG QUOTE ${quote.ref} — ACCEPTED`,
        "",
        ...tripLines,
        "",
        "QUOTE BREAKDOWN",
        ...quote.lines.map((l) => `· ${l.label}: ${formatZAR(l.amount)}`),
        `TOTAL: ${formatZAR(quote.total)}`,
        `Deposit to secure (50%): ${formatZAR(quote.deposit)}`,
        "",
        "Please confirm availability — I'm ready to secure this booking.",
      ].join("\n")
    : [
        `🖤 PULSIVEG CORPORATE ENQUIRY ${ref}`,
        "",
        ...tripLines,
        "",
        "Requesting a structured retainer quote.",
        "Company: ___",
        "Estimated trips per month: ___",
      ].join("\n");

  const inputCls =
    "w-full rounded-2xl bg-white/[0.06] px-5 py-3.5 text-[15px] text-cream placeholder:text-mist/60 focus:bg-white/[0.1] focus:outline-none transition-colors";
  const cardCls = (active: boolean) =>
    `card p-5 text-left press transition-all ${active ? "ring-1 ring-gold bg-gold/[0.08]" : "hover:bg-white/[0.08]"}`;

  const set = (k: keyof Details) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setD((prev) => ({ ...prev, [k]: e.target.value }));

  return (
    <>
      <div className="band">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-36 pb-14 text-center">
          <Kicker>Instant Quote</Kicker>
          <h1 className="font-display text-5xl sm:text-6xl mt-4">
            Your exact price, <span className="text-gold">in one minute.</span>
          </h1>
          <p className="text-mist text-lg mt-5">
            Answer four quick steps. Get a line-item quote instantly — no callbacks,
            no "we'll get back to you."
          </p>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-12">
        <ol className="flex items-center">
          {STEPS.map((s, i) => (
            <li key={s} className={`flex items-center ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex flex-col items-center gap-2 ${i < step ? "press" : "cursor-default"}`}
              >
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all duration-300 ${
                    i === step
                      ? "bg-gold/15 text-gold ring-1 ring-gold"
                      : i < step
                        ? "bg-gold text-ink"
                        : "bg-white/[0.07] text-mist"
                  }`}
                  style={{ transitionTimingFunction: "var(--ease-fluid)" }}
                >
                  {i < step ? "✓" : i + 1}
                </span>
                <span className={`text-[11px] font-medium ${i === step ? "text-gold" : "text-mist"}`}>{s}</span>
              </button>
              {i < STEPS.length - 1 && (
                <span
                  className={`flex-1 h-px mx-2 mb-6 transition-colors duration-500 ${i < step ? "bg-gold" : "bg-white/10"}`}
                />
              )}
            </li>
          ))}
        </ol>
      </div>

      <section className="max-w-4xl mx-auto px-5 sm:px-8 py-10 pb-24">
        <div key={step} className="step-in">
          {step === 0 && (
            <>
              <h2 className="font-display text-3xl">Select your service</h2>
              <p className="text-mist text-[15px] mt-2">Each experience is tailored to the journey.</p>
              <div className="grid sm:grid-cols-2 gap-3 mt-8">
                {TIERS.map((t) => (
                  <button key={t.id} onClick={() => setTierId(t.id)} className={cardCls(tierId === t.id)}>
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="text-[15px] font-semibold">{t.name}</span>
                      <span className="text-gold font-display text-lg whitespace-nowrap">from {formatZAR(t.from)}</span>
                    </span>
                    <span className="block text-cream/60 text-[14px] mt-2">{t.strap}</span>
                    <span className="block text-mist text-[13px] mt-2">
                      {isInstantQuotable(t.id) ? "Instant online quote" : "Structured by the fleet desk"} · {t.unit}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="font-display text-3xl">Choose your vehicle</h2>
              <p className="text-mist text-[15px] mt-2">Every vehicle dispatched in showroom condition.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
                {VEHICLES.map((v) => (
                  <button key={v.id} onClick={() => setVehicleId(v.id)} className={`${cardCls(vehicleId === v.id)} !p-0 overflow-hidden`}>
                    <span className="block relative aspect-video overflow-hidden">
                      <img src={v.img} alt={v.name} className="absolute inset-0 w-full h-full object-cover opacity-85" />
                    </span>
                    <span className="block p-4">
                      <span className="block text-[15px] font-semibold">{v.name}</span>
                      <span className="block text-mist text-[13px] mt-1">
                        {v.specs[0].value} · {v.specs[1].value}
                      </span>
                      {v.premium > 0 && <span className="block text-gold text-[13px] mt-1">+{formatZAR(v.premium)}</span>}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-display text-3xl">Pick your chauffeur</h2>
              <p className="text-mist text-[15px] mt-2">Optional — "first available" guarantees our best fit on the day.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
                <button onClick={() => setDriverId("any")} className={cardCls(driverId === "any")}>
                  <span className="block text-[15px] font-semibold">First available</span>
                  <span className="block text-mist text-[13px] mt-1">We assign our best fit</span>
                </button>
                {DRIVERS.map((x) => (
                  <button key={x.id} onClick={() => setDriverId(x.id)} className={cardCls(driverId === x.id)}>
                    <span className="block text-[15px] font-semibold">{x.name}</span>
                    <span className="block text-mist text-[13px] mt-1">
                      ★ {x.rating.toFixed(1)} · {x.speciality}
                    </span>
                    <span className="block text-mist/70 text-[13px] mt-1">{x.vehicle}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="font-display text-3xl">Journey details</h2>
              <p className="text-mist text-[15px] mt-2">Your quote is generated instantly from these — nothing goes to a call centre.</p>
              <div className="grid sm:grid-cols-2 gap-3 mt-8">
                <label className="block">
                  <span className="text-[12px] font-medium text-mist block mb-1.5">Date *</span>
                  <input type="date" value={d.date} onChange={set("date")} className={inputCls} />
                </label>
                <label className="block">
                  <span className="text-[12px] font-medium text-mist block mb-1.5">Pickup time</span>
                  <input type="time" value={d.time} onChange={set("time")} className={inputCls} />
                </label>
                <label className="block">
                  <span className="text-[12px] font-medium text-mist block mb-1.5">Pickup *</span>
                  <input value={d.pickup} onChange={set("pickup")} placeholder="Address / airport / hotel" className={inputCls} />
                </label>
                <label className="block">
                  <span className="text-[12px] font-medium text-mist block mb-1.5">Drop-off</span>
                  <input value={d.dropoff} onChange={set("dropoff")} placeholder="Optional" className={inputCls} />
                </label>
                <label className="block">
                  <span className="text-[12px] font-medium text-mist block mb-1.5">Your name *</span>
                  <input value={d.name} onChange={set("name")} placeholder="Full name" className={inputCls} />
                </label>
                <label className="block">
                  <span className="text-[12px] font-medium text-mist block mb-1.5">Mobile number *</span>
                  <input value={d.phone} onChange={set("phone")} placeholder="e.g. 082 123 4567" inputMode="tel" className={inputCls} />
                </label>
                <label className="block">
                  <span className="text-[12px] font-medium text-mist block mb-1.5">Passengers</span>
                  <input value={d.passengers} onChange={set("passengers")} placeholder="e.g. 4" inputMode="numeric" className={inputCls} />
                </label>
                <label className="block">
                  <span className="text-[12px] font-medium text-mist block mb-1.5">Notes</span>
                  <input value={d.notes} onChange={set("notes")} placeholder="Child seat, stops, flight number…" className={inputCls} />
                </label>
              </div>
            </>
          )}

          {step === 4 && quote && tier && (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-display text-3xl">Your quote is ready.</h2>
                <p className="text-[13px] font-semibold text-mist">
                  Ref <span className="text-gold">{quote.ref}</span> · valid 48 hours
                </p>
              </div>

              <div className="card ring-1 ring-gold/50 mt-8 p-7 sm:p-9 text-center">
                <p className="text-[12px] font-medium text-mist">Your locked total</p>
                <p className="font-display text-6xl text-gold mt-2">{formatZAR(quote.total)}</p>
                <p className="text-mist text-[14px] mt-2">
                  Secure it with a {Math.round(DEPOSIT_PCT * 100)}% deposit of{" "}
                  <span className="text-cream font-medium">{formatZAR(quote.deposit)}</span>
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
                  <a href={waLink(acceptMessage)} target="_blank" rel="noreferrer" className="btn-primary !px-8 !py-3.5">
                    Accept & reserve on WhatsApp
                  </a>
                  {DEPOSIT_LINK && (
                    <a href={DEPOSIT_LINK} target="_blank" rel="noreferrer" className="btn-secondary !px-8 !py-3.5">
                      Pay deposit now
                    </a>
                  )}
                </div>
                <p className="text-[12px] text-mist/70 mt-4">
                  The fleet desk only confirms availability — your price is already locked.
                </p>
              </div>

              <div className="card px-6 sm:px-8 mt-5">
                <dl className="divide-y divide-white/[0.07]">
                  {quote.lines.map((l) => (
                    <div key={l.label} className="flex items-baseline justify-between gap-6 py-3.5">
                      <dt className="text-[14px] text-mist">{l.label}</dt>
                      <dd className="text-[15px] text-cream/90 font-medium whitespace-nowrap">{formatZAR(l.amount)}</dd>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="text-[15px] font-semibold">Total</dt>
                    <dd className="text-[17px] text-gold font-semibold">{formatZAR(quote.total)}</dd>
                  </div>
                </dl>
              </div>

              <div className="card p-6 sm:p-8 mt-5">
                <p className="text-[13px] font-semibold text-gold uppercase tracking-[0.1em]">Fine-tune your journey</p>
                <div className="grid sm:grid-cols-2 gap-8 mt-5">
                  <label className="block">
                    <span className="flex justify-between text-[13px] mb-2">
                      <span className="text-mist">Hours on the road</span>
                      <span className="text-cream font-medium">{hours || inc.hours} hrs</span>
                    </span>
                    <input
                      type="range"
                      min={inc.hours}
                      max={14}
                      value={hours || inc.hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full accent-[#d9a96b]"
                    />
                    <span className="text-[11px] text-mist/70">{inc.hours} hrs included</span>
                  </label>
                  <label className="block">
                    <span className="flex justify-between text-[13px] mb-2">
                      <span className="text-mist">Distance</span>
                      <span className="text-cream font-medium">{km || inc.km} km</span>
                    </span>
                    <input
                      type="range"
                      min={inc.km}
                      max={600}
                      step={10}
                      value={km || inc.km}
                      onChange={(e) => setKm(Number(e.target.value))}
                      className="w-full accent-[#d9a96b]"
                    />
                    <span className="text-[11px] text-mist/70">{inc.km} km included</span>
                  </label>
                </div>
                <p className="text-[12px] text-mist/70 mt-4">
                  The total above updates live — what you see is what you pay.
                </p>
              </div>

              <div className="card px-6 sm:px-8 mt-5">
                <dl className="divide-y divide-white/[0.07]">
                  {[
                    ["Vehicle", `${vehicle?.name}`],
                    ["Chauffeur", driver ? `${driver.name} — ★ ${driver.rating.toFixed(1)}` : "First available"],
                    ["Date & time", `${d.date}${d.time ? ` at ${d.time}` : ""}`],
                    ["Route", `${d.pickup}${d.dropoff ? ` → ${d.dropoff}` : ""}`],
                    ["Client", `${d.name} · ${d.phone}`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-6 py-3.5">
                      <dt className="w-28 shrink-0 text-[12px] font-medium text-mist pt-0.5">{k}</dt>
                      <dd className="text-[14px] text-cream/90">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <p className="text-mist/70 text-[13px] mt-5">
                Prefer to talk? Call the fleet desk on {PHONE_DISPLAY} — 24/7.
              </p>
            </>
          )}

          {step === 4 && !quote && (
            <>
              <h2 className="font-display text-3xl">Let&apos;s structure this properly.</h2>
              <p className="text-mist text-[15px] mt-2 max-w-xl">
                Corporate retainers are tailored to your monthly movement — answer two
                questions on WhatsApp and the fleet desk returns a structured quote the same day.
              </p>
              <div className="card ring-1 ring-gold/50 mt-8 p-8 text-center">
                <p className="font-display text-4xl text-gold">from {formatZAR(tier?.from ?? 48000)}/month</p>
                <p className="text-mist text-[14px] mt-2">10 chauffeur-days · priority dispatch · one invoice</p>
                <a href={waLink(acceptMessage)} target="_blank" rel="noreferrer" className="btn-primary !px-8 !py-3.5 mt-6">
                  Request corporate quote
                </a>
              </div>
            </>
          )}
        </div>

        {/* NAV BUTTONS */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className={step === 0 ? "btn-secondary opacity-40 cursor-not-allowed" : "btn-secondary"}
          >
            Back
          </button>
          {step < STEPS.length - 1 && (
            <button
              onClick={() => stepValid && setStep((s) => s + 1)}
              disabled={!stepValid}
              className={stepValid ? "btn-primary !px-9" : "btn-secondary opacity-40 cursor-not-allowed !px-9"}
            >
              {step === 3 ? "Generate my quote" : "Continue"}
            </button>
          )}
        </div>
        {!stepValid && step === 3 && (
          <p className="text-[13px] text-mist/70 mt-3 text-right">Date, pickup, your name and mobile number are required.</p>
        )}
      </section>
    </>
  );
}
