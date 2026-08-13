import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="kicker">
      <span className="gold-line" />
      {children}
    </p>
  );
}

/** Dark page header used by every inner page. */
export function PageHeader({ kicker, title, sub }: { kicker: string; title: ReactNode; sub?: string }) {
  return (
    <div className="bg-ink-2 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-16">
        <Kicker>{kicker}</Kicker>
        <h1 className="font-display text-4xl sm:text-6xl mt-5 max-w-3xl leading-[1.08]">{title}</h1>
        {sub && <p className="text-mist max-w-xl mt-5">{sub}</p>}
      </div>
    </div>
  );
}

export function GoldButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-block bg-gold text-ink text-xs tracking-[0.25em] uppercase font-semibold px-8 py-4 hover:bg-gold-soft transition-colors"
    >
      {children}
    </Link>
  );
}

export function GhostButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-block border border-gold/60 text-gold text-xs tracking-[0.25em] uppercase px-8 py-4 hover:bg-gold hover:text-ink transition-colors"
    >
      {children}
    </Link>
  );
}

// Placeholder figures — confirm real numbers with the client before launch.
export const STATS = [
  { value: "1,200+", label: "Journeys completed" },
  { value: "4.9", label: "Client rating" },
  { value: "24/7", label: "Fleet desk" },
  { value: "98%", label: "On-time arrivals" },
];

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/10 divide-x divide-y lg:divide-y-0 divide-white/10 bg-ink-2">
      {STATS.map((s) => (
        <div key={s.label} className="p-8 text-center">
          <p className="font-display text-4xl text-gold">{s.value}</p>
          <p className="text-[11px] tracking-[0.25em] uppercase text-mist mt-2">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function TrustStrip() {
  const sectors = ["Hotels & Lodges", "Corporate Accounts", "Production Houses", "Weddings & Events", "Government & Delegations"];
  return (
    <div className="border-y border-white/5 bg-ink-2/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        <span className="text-[10px] tracking-[0.3em] uppercase text-mist/60">Trusted across</span>
        {sectors.map((s) => (
          <span key={s} className="text-[11px] tracking-[0.25em] uppercase text-cream/50">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
