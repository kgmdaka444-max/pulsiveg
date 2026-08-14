import { Link } from "react-router-dom";
import { DRIVERS } from "../data/drivers";
import { Reveal } from "./ui";

export default function DriversPortal({ limit }: { limit?: number }) {
  const drivers = limit ? DRIVERS.slice(0, limit) : DRIVERS;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {drivers.map((d, i) => (
        <Reveal key={d.id} delay={i * 70}>
          <article className="card card-hover p-7 flex flex-col h-full">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold/40 text-ink font-display text-xl flex items-center justify-center shrink-0">
                {d.initials}
              </div>
              <div>
                <h3 className="text-[17px] font-semibold leading-tight">{d.name}</h3>
                <p className="text-gold text-[13px] font-medium mt-0.5">{d.speciality}</p>
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-2 text-center border-y border-white/[0.07] py-4 my-5">
              <div>
                <dt className="text-[11px] text-mist">Rating</dt>
                <dd className="text-gold font-semibold mt-0.5">★ {d.rating.toFixed(1)}</dd>
              </div>
              <div>
                <dt className="text-[11px] text-mist">Years</dt>
                <dd className="font-semibold mt-0.5">{d.years}</dd>
              </div>
              <div>
                <dt className="text-[11px] text-mist">Trips</dt>
                <dd className="font-semibold mt-0.5">{d.trips.toLocaleString()}</dd>
              </div>
            </dl>
            <p className="text-[14px] text-mist">
              {d.vehicle} · {d.languages.join(", ")}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3 mb-6">
              {d.badges.map((b) => (
                <span key={b} className="text-[11px] font-medium text-cream/70 bg-white/[0.07] rounded-full px-3 py-1">
                  {b}
                </span>
              ))}
            </div>
            <Link to={`/book?driver=${d.id}`} className="btn-secondary mt-auto !w-full">
              Request {d.name.split(" ")[0]}
            </Link>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
